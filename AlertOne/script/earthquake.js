const crackCanvas = document.getElementById('crackCanvas');
const dustCanvas = document.getElementById('dustCanvas');
const crackCtx = crackCanvas.getContext('2d');
const dustCtx = dustCanvas.getContext('2d');

crackCanvas.width = dustCanvas.width = window.innerWidth;
crackCanvas.height = dustCanvas.height = window.innerHeight;

// --- Пукнатини ---
function random(min,max){ return Math.random()*(max-min)+min; }

class Crack {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.segments=[];
        const len=random(80,200);
        const angle=random(0,Math.PI*2);
        this.segments.push({x:this.x,y:this.y,len,angle});
    }
    draw(){
        crackCtx.strokeStyle = `rgba(139,69,19,1)`; // кафяв цвят
        crackCtx.lineWidth = 2;
        this.segments.forEach(seg=>{
            crackCtx.beginPath();
            crackCtx.moveTo(seg.x,seg.y);
            const x2 = seg.x + seg.len * Math.cos(seg.angle);
            const y2 = seg.y + seg.len * Math.sin(seg.angle);
            crackCtx.lineTo(x2,y2);
            crackCtx.stroke();
            // странични клони
            if(Math.random()>0.6){
                const branchLen = seg.len*0.4;
                const branchAngle = seg.angle + random(-Math.PI/4, Math.PI/4);
                crackCtx.beginPath();
                crackCtx.moveTo(x2,y2);
                crackCtx.lineTo(x2 + branchLen * Math.cos(branchAngle), y2 + branchLen * Math.sin(branchAngle));
                crackCtx.stroke();
            }
        });
    }
}

// Статични пукнатини
let cracks=[];
for(let i=0;i<35;i++){
    cracks.push(new Crack(random(0,crackCanvas.width), random(0,crackCanvas.height)));
}
cracks.forEach(c=>c.draw());

// --- Прашинки ---
class Dust {
    constructor(){
        this.x=random(0,dustCanvas.width);
        this.y=random(0,dustCanvas.height);
        this.size=random(1,3);
        this.speed=random(0.1,0.6);
        this.opacity=random(0.1,0.4);
    }
    update(){
        this.y+=this.speed;
        if(this.y>dustCanvas.height){
            this.y=0;
            this.x=random(0,dustCanvas.width);
        }
    }
    draw(){
        dustCtx.fillStyle=`rgba(255,255,255,${this.opacity})`;
        dustCtx.beginPath();
        dustCtx.arc(this.x,this.y,this.size,0,Math.PI*2);
        dustCtx.fill();
    }
}

let dusts=[];
for(let i=0;i<150;i++){
    dusts.push(new Dust());
}

// --- Анимация прашинки ---
function animateDust(){
    dustCtx.clearRect(0,0,dustCanvas.width,dustCanvas.height);
    dusts.forEach(d=>{d.update(); d.draw();});
    requestAnimationFrame(animateDust);
}

animateDust();

// --- Resize ---
window.addEventListener('resize', ()=>{
    crackCanvas.width=dustCanvas.width=window.innerWidth;
    crackCanvas.height=dustCanvas.height=window.innerHeight;
});
