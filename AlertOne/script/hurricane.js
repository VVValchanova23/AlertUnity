const canvas = document.getElementById('hurricaneCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class WindLine {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 100 + 50;
        this.speed = Math.random() * 2 + 1; // по-бавно движение
        this.opacity = Math.random() * 0.3 + 0.1;
        this.thickness = Math.random() * 2 + 0.5;
        this.color = `rgba(0, ${Math.floor(150 + Math.random() * 100)}, 0, ${this.opacity})`;
        this.sway = Math.random() * 2;
    }
    update() {
        this.x += this.speed;
        this.y += Math.sin(this.x * 0.01) * this.sway;
        if (this.x - this.length > canvas.width) this.x = -this.length;
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length, this.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness;
        ctx.stroke();
    }
}

const windLines = [];
for (let i = 0; i < 200; i++) windLines.push(new WindLine());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    windLines.forEach(line => { line.update(); line.draw(); });
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
