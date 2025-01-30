// app.js
const canvas = document.getElementById('amoebaCanvas');
const ctx = canvas.getContext('2d');
const simplex = new SimplexNoise();
const audioElement = document.getElementById('ambientSound');
const debugLog = document.getElementById('debugLog');

let mouse = { x: 0, y: 0, down: false };
let particles = [];
let amoebas = [];
let toxicity = 75;
let systemTime = 0;

class BioAmoeba {
  constructor() {
    this.baseSize = 150;
    this.position = { x: canvas.width/2, y: canvas.height/2 };
    this.velocity = { x: 0, y: 0 };
    this.tentacles = [];
    this.noiseOffset = Math.random() * 1000;
    this.hue = Math.random() * 40;
    
    this.generateTentacles();
  }

  generateTentacles() {
    this.tentacles = [];
    const tentacleCount = 8 + Math.floor(toxicity/20);
    
    for(let i = 0; i < tentacleCount; i++) {
      this.tentacles.push({
        angle: (i / tentacleCount) * Math.PI * 2,
        length: this.baseSize * (0.8 + Math.random() * 0.4),
        noiseSeed: Math.random() * 1000
      });
    }
  }

  update() {
    const noise = simplex.noise3D(this.noiseOffset, systemTime * 0.001, toxicity * 0.01);
    this.velocity.x = (mouse.x - this.position.x) * 0.02 + noise * 2;
    this.velocity.y = (mouse.y - this.position.y) * 0.02 + noise * 2;
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.noiseOffset += 0.02;
    
    this.draw();
  }

  draw() {
    ctx.save();
    ctx.filter = 'url(#turbulence)';
    ctx.beginPath();
    
    this.tentacles.forEach((tentacle, i) => {
      const angle = tentacle.angle + simplex.noise3D(
        tentacle.noiseSeed, 
        systemTime * 0.005, 
        i * 0.1
      ) * 0.5;
      
      const x = this.position.x + Math.cos(angle) * tentacle.length;
      const y = this.position.y + Math.sin(angle) * tentacle.length;
      
      if(i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    
    ctx.closePath();
    ctx.fillStyle = `hsla(${this.hue}, 70%, 30%, 0.4)`;
    ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.restore();
  }
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.pos = {
      x: mouse.x + (Math.random() - 0.5) * 50,
      y: mouse.y + (Math.random() - 0.5) * 50
    };
    this.vel = { x: 0, y: 0 };
    this.life = 1;
    this.decay = 0.02 + Math.random() * 0.03;
    this.size = Math.random() * 3 + 1;
    this.angle = Math.random() * Math.PI * 2;
  }

  update() {
    this.vel.x += Math.cos(this.angle) * 0.1;
    this.vel.y += Math.sin(this.angle) * 0.1;
    
    this.pos.x += this.vel.x * (toxicity * 0.1);
    this.pos.y += this.vel.y * (toxicity * 0.1);
    this.life -= this.decay;
    
    if(this.life <= 0) this.reset();
  }

  draw() {
    ctx.fillStyle = `hsla(${toxicity * 2}, 70%, 50%, ${this.life})`;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Initialize amoebas
  for(let i = 0; i < 3; i++) {
    amoebas.push(new BioAmoeba());
  }
  
  // Initialize particles
  for(let i = 0; i < 500; i++) {
    particles.push(new Particle());
  }
  
  audioElement.volume = 0.3;
  audioElement.play();
}

function updateUI() {
  const leds = document.querySelectorAll('.led');
  const activeLeds = Math.floor(toxicity / 33);
  
  leds.forEach((led, i) => {
    led.classList.toggle('active', i < activeLeds);
  });
  
  document.querySelector('.pulsating').style.animation = 
    `pulse ${1 - (toxicity/100)}s infinite`;
}

function logDebug() {
  debugLog.textContent = `
    SYSTEM STATUS:
    FPS: ${Math.round(getFPS())}
    PARTICLES: ${particles.length}
    TOXICITY: ${toxicity}%
    MOUSE: [${Math.round(mouse.x)}, ${Math.round(mouse.y)}]
  `;
}

const getFPS = (() => {
  let last = performance.now();
  let frames = 0;
  return () => {
    const now = performance.now();
    frames++;
    if(now > last + 1000) {
      last = now;
      frames = 0;
    }
    return (1000 / (now - last)) * frames;
  };
})();

function animate() {
  ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  amoebas.forEach(amoeba => amoeba.update());
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  systemTime += 16;
  updateUI();
  logDebug();
  requestAnimationFrame(animate);
}

// Event Listeners
document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

document.getElementById('toxicityRange').addEventListener('input', e => {
  toxicity = e.target.value;
  amoebas.forEach(amoeba => amoeba.generateTentacles());
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.querySelector('.emergency-btn').addEventListener('click', () => {
  document.querySelector('.emergency-modal').classList.add('hidden');
  toxicity = 0;
  document.getElementById('toxicityRange').value = 0;
});

// Initialization
init();
animate();
