const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, radius, color, velocity, type) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
    this.type = type; // 'circle' or 'triangle'
    this.angle = Math.random() * Math.PI * 2;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();

    if (this.type === 'circle') {
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    } else if (this.type === 'triangle') {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.radius * Math.cos(this.angle), this.y + this.radius * Math.sin(this.angle));
      ctx.lineTo(this.x + this.radius * Math.cos(this.angle + Math.PI * 2 / 3), this.y + this.radius * Math.sin(this.angle + Math.PI * 2 / 3));
    }

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.y += 0.05; // gravity
    this.alpha -= 0.015; // fade out
    this.draw();
  }
}

function spawnParticles(x, y, count) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    const type = Math.random() > 0.5 ? 'circle' : 'triangle';
    particles.push(
      new Particle(
        x,
        y,
        Math.random() * 5 + 2,
        `hsl(${Math.random() * 360}, 50%, 50%)`,
        {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
        type
      )
    );
  }
}

function animate() {
  ctx.fillStyle = "rgba(30, 30, 47, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter((particle) => particle.alpha > 0);
  particles.forEach((particle) => particle.update());

  requestAnimationFrame(animate);
}

canvas.addEventListener("click", (event) => {
  spawnParticles(event.clientX, event.clientY, 100);
});

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
