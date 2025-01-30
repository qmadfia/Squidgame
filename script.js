// vapor.js
const canvas = document.getElementById('blissCanvas');
const ctx = canvas.getContext('2d');
const simplex = new SimplexNoise();
const audio = document.getElementById('synthwave');
const terminal = document.querySelector('.terminal-text');

let vibe = 80;
let mouse = { x: 0, y: 0, down: false };
let particles = [];
let frame = 0;

class VaporParticle {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.pos = {
      x: initial ? Math.random() * canvas.width : mouse.x,
      y: initial ? Math.random() * canvas.height : mouse.y
    };
    this.vel = {
      x: (Math.random() - 0.5) * (vibe/20),
      y: (Math.random() - 0.5) * (vibe/20)
    };
    this.hue = (frame + Math.random() * 20) % 360;
    this.size = Math.random() * (3 + vibe/20);
    this.life = 1;
    this.decay = 0.01 + Math.random() * 0.02;
  }

  update() {
    this.pos.x += this.vel.x + simplex.noise2D(this.pos.x * 0.01, frame * 0.01) * 2;
    this.pos.y += this.vel.y + simplex.noise2D(this.pos.y * 0.01, frame * 0.01) * 2;
    this.hue = (this.hue + vibe/100) % 360;
    this.life -= this.decay;
    
    if(this.life <= 0 || this.outOfBounds()) this.reset();
  }

  outOfBounds() {
    return this.pos.x < -50 || this.pos.x > canvas.width + 50 || 
           this.pos.y < -50 || this.pos.y > canvas.height + 50;
  }

  draw() {
    ctx.fillStyle = `hsl(${this.hue}, 70%, 60%, ${this.life})`;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class VaporEffect {
  constructor() {
    this.pyramidRot = 0;
    this.gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    this.gradient.addColorStop(0, '#ff71ce');
    this.gradient.addColorStop(1, '#01cdfe');
  }

  drawBackground() {
    ctx.fillStyle = this.gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw floating pyramids
    ctx.strokeStyle = `hsla(${frame % 360}, 70%, 60%, 0.3)`;
    for(let i = 0; i < 5; i++) {
      this.drawPyramid(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        30 + vibe/2,
        frame * 0.02 + i
      );
    }
  }

  drawPyramid(x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size, size);
    ctx.lineTo(-size, size);
    ctx.closePath();
    ctx.stroke();
    
    ctx.restore();
  }

  update() {
    this.gradient = ctx.createLinearGradient(
      Math.sin(frame * 0.02) * canvas.width, 
      Math.cos(frame * 0.02) * canvas.height, 
      canvas.width, 
      canvas.height
    );
    this.gradient.addColorStop(0, `hsl(${frame % 360}, 70%, 60%)`);
    this.gradient.addColorStop(1, `hsl(${(frame + 120) % 360}, 70%, 60%)`);
  }
}

const effect = new VaporEffect();

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Initialize particles
  for(let i = 0; i < 500; i++) {
    particles.push(new VaporParticle());
  }
  
  audio.volume = 0.5;
  audio.play();
  
  // Start vibe check
  setInterval(vibeCheck, 1000);
}

function vibeCheck() {
  const messages = [
    "POSITIVE VIBES RISING...",
    "SYNTHWAVE OPTIMIZED",
    "RETRO FUTURE SECURED",
    "A E S T H E T I C  MAXIMIZED"
  ];
  
  terminal.textContent = messages[Math.floor(Math.random() * messages.length)];
  
  if(vibe >= 100) {
    document.querySelector('.bliss-modal').classList.remove('hidden');
    audio.playbackRate = 1.5;
  }
}

function updateUI() {
  // Update color dots
  document.querySelector('.pulsating').style.animation = 
    `pulse ${1 - (vibe/100)}s infinite`;
  
  // Update bliss meter
  document.getElementById('blissMeter').textContent = 
    `${Math.min(vibe + 20, 100)}% HAPPINESS`;
}

function animate() {
  ctx.globalCompositeOperation = 'source-over';
  effect.drawBackground();
  
  ctx.globalCompositeOperation = 'lighter';
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  effect.update();
  frame++;
  updateUI();
  requestAnimationFrame(animate);
}

// Event Listeners
document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

document.getElementById('vibeRange').addEventListener('input', e => {
  vibe = e.target.value;
  audio.volume = vibe/100;
});

document.querySelector('.chill-btn').addEventListener('click', () => {
  document.querySelector('.bliss-modal').classList.add('hidden');
  vibe = 80;
  audio.playbackRate = 1.0;
  document.getElementById('vibeRange').value = 80;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Initialize
init();
animate();
