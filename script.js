const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class HorrorAmoeba {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 150;
    this.color = `hsla(${Math.random() * 40 + 0}, 60%, ${Math.random() * 20 + 10}%, 0.9)`; // Dark horror theme colors
    this.points = [];
    this.alpha = 0.5;
  }

  addPoints() {
    const numPoints = 12;
    this.points = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const distance = this.size + Math.random() * 40 - 20; // More jagged edges
      const x = this.x + Math.cos(angle) * distance;
      const y = this.y + Math.sin(angle) * distance;
      this.points.push({ x, y });
    }
  }

  update() {
    this.x += (mouse.x - this.x) * 0.05; // Smooth follow effect
    this.y += (mouse.y - this.y) * 0.05;
    this.addPoints();
    this.draw();
  }

  draw() {
    // Outer glow effect (like eerie mist)
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'rgba(255, 0, 0, 0.5)'; // Red glow for horror vibe

    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.closePath();

    ctx.fillStyle = this.color;
    ctx.fill();

    // Reset shadow for other elements
    ctx.shadowBlur = 0;
  }
}

const amoeba = new HorrorAmoeba(mouse.x, mouse.y);

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Semi-transparent black background for trailing effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  amoeba.update();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
