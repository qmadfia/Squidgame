const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Amoeba {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 150;
    this.color = `hsla(${Math.random() * 360}, 70%, 60%, 0.7)`; // Vaporwave color
    this.points = [];
    this.alpha = 0.5;
  }

  addPoints() {
    const numPoints = 12;
    this.points = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const distance = this.size + Math.random() * 20 - 10;
      const x = this.x + Math.cos(angle) * distance;
      const y = this.y + Math.sin(angle) * distance;
      this.points.push({ x, y });
    }
  }

  update() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.addPoints();
    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const amoeba = new Amoeba(mouse.x, mouse.y);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  amoeba.update();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
