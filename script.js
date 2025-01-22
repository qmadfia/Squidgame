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
    this.alpha = 1; // Opacity for fading
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha; // Set opacity
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Simulate gravity
    this.velocity.y += 0.02;

    // Slow fading
    this.alpha -= 0.01;

    this.draw();
  }
}

function spawnParticles(x, y, count) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    particles.push(
      new Particle(
        x,
        y,
        Math.random() * 5 + 2,
        `hsl(${Math.random() * 360}, 50%, 50%)`,
        {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        }
      )
    );
  }
}

function animate() {
  ctx.fillStyle = "rgba(30, 30, 47, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter((particle) => particle.alpha > 0); // Remove faded particles
  particles.forEach((particle) => particle.update());

  requestAnimationFrame(animate);
}

canvas.addEventListener("click", (event) => {
  spawnParticles(event.clientX, event.clientY, 50); // Spawn particles on click
});

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
