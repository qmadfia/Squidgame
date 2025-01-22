const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 5;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.alpha = 1;
  }

  update() {
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Attract particles toward the mouse
    if (distance < 100) {
      this.speedX = dx * 0.02;
      this.speedY = dy * 0.02;
    }

    // Move particles and fade them
    this.x -= this.speedX;
    this.y -= this.speedY;
    this.alpha -= 0.01;
    if (this.alpha <= 0) this.alpha = 1;

    this.draw();
  }

  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.push(new Particle(mouse.x, mouse.y));

  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    }
    particle.update();
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
