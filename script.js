canvas=document.getElementById("canvas1");
const ctx=canvas.getContext('2d');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;



const explosions=[];

class Explosions{
    constructor(x,y){
      
        this.spriteHeight=179;
        this.spriteWidth=200;
        this.width=this.spriteWidth*0.7;
        this.height=this.spriteHeight*0.7;
        this.x=x;
        this.y=y; 
        this.image=new Image();
        this.image.src="boom.png";
        this.frame=0;
        this.timer=0;
        this.angle=Math.random()*6.2;
        this.sound=new Audio();
        this.sound.src="explode.wav";
    }


    update(){
        if(this.frame===0)
        this.sound.play(); 
        this.timer++;
        if(this.timer%10===0)
            this.frame++;
    }

    draw(){
    ctx.save();
   ctx.translate(this.x,this.y);
    ctx.rotate(this.angle);
        ctx.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,0-this.width/2,0-this.height/2,this.width,this.height);
ctx.restore();
    }
}




window.addEventListener('click',function(e){
createAnimation(e);

});

function createAnimation(e){
    let positionX=e.x;
    let positionY=e.y;
  
  explosions.push(new Explosions(positionX,positionY));
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<explosions.length;i++){
       
        explosions[i].update();
        explosions[i].draw();

        if(explosions[i].frame>5){
            explosions.splice(i,1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();
