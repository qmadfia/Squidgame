const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    const radius = Math.random() * 5 + 2;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    const velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
    };
    particles.push(new Particle(x, y, radius, color, velocity));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
