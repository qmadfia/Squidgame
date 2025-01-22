const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, radius, color, angleSpeed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = angleSpeed;
    this.baseX = x;
    this.baseY = y;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.angle += this.angleSpeed;
    this.x = this.baseX + Math.sin(this.angle) * 50;
    this.y = this.baseY + Math.cos(this.angle) * 50;
    this.draw();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 200; i++) {
    const radius = Math.random() * 5 + 2;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    const angleSpeed = (Math.random() - 0.5) * 0.05;
    particles.push(new Particle(x, y, radius, color, angleSpeed));
  }
}

function animate() {
  ctx.fillStyle = "rgba(30, 30, 47, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => particle.update());
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
