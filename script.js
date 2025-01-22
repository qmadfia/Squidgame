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
    this.type = type;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    
    switch (this.type) {
      case "star":
        ctx.moveTo(this.x, this.y);
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(this.x + this.radius * Math.cos(i * Math.PI * 2 / 5), this.y + this.radius * Math.sin(i * Math.PI * 2 / 5));
        }
        break;
      case "light":
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        break;
      case "spiral":
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + Math.cos(this.velocity.angle) * this.radius, this.y + Math.sin(this.velocity.angle) * this.radius);
        break;
      case "fire":
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        break;
      case "dust":
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        break;
      case "wave":
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        break;
      case "snow":
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        break;
      case "water":
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        break;
      case "explosion":
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        break;
      default:
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    }

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01; // fade out
    this.velocity.y += 0.02; // gravity

    this.draw();
  }
}

function spawnParticles(x, y, count, type) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    particles.push(new Particle(x, y, Math.random() * 5 + 2, color, {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
      angle: angle,
    }, type));
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
  const types = ["star", "light", "spiral", "fire", "dust", "wave", "snow", "water", "explosion"];
  spawnParticles(event.clientX, event.clientY, 50, types[Math.floor(Math.random() * types.length)]);
});

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
