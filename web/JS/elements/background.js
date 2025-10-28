// =============================
// HERO NETWORK BACKGROUND
// =============================

// Canvas setup
const canvas = document.getElementById('hero-background');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// =============================
// CONFIG
// =============================
const PARTICLE_COUNT = 100;     // número de partículas
const PARTICLE_RADIUS = 2.5;    // tamaño fijo
const SPEED = 0.6;              // velocidad base
const MAX_DISTANCE = 200;       // distancia máxima para conectar
const LINE_OPACITY = 0.15;      // transparencia de las líneas

// =============================
// PARTICLE CLASS
// =============================
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        const angle = Math.random() * Math.PI * 2;
        const speed = SPEED + Math.random() * 0.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebote en bordes
        if (this.x <= 0 || this.x >= width) this.vx *= -1;
        if (this.y <= 0 || this.y >= height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(163, 196, 243, 0.7)";
        ctx.fill();
    }
}

// =============================
// INIT
// =============================
const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

// =============================
// HELPER FUNCTIONS
// =============================
function distanceSq(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy;
}

// Comprueba que 3 puntos no sean casi colineales
function isNearlyCollinear(a, b, c, tolerance = 0.0001) {
    const area = Math.abs(
        a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)
    );
    return area < tolerance;
}

// =============================
// DRAW CONNECTIONS
// =============================
function drawConnections() {
    const maxDistSq = MAX_DISTANCE * MAX_DISTANCE;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];

        // Buscar las dos más cercanas
        const nearest = particles
            .map((q, j) => ({ j, d: distanceSq(p, q) }))
            .filter((o) => o.j !== i && o.d < maxDistSq)
            .sort((a, b) => a.d - b.d)
            .slice(0, 4); // tomamos algunas para verificar triángulos

        let links = [];

        for (let a = 0; a < nearest.length && links.length < 2; a++) {
            const pa = particles[nearest[a].j];
            for (let b = a + 1; b < nearest.length; b++) {
                const pb = particles[nearest[b].j];
                if (!isNearlyCollinear(p, pa, pb)) {
                    links.push([pa, pb]);
                    break;
                }
            }
        }

        // Dibujar líneas hacia esas partículas
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = `rgba(163,196,243,${LINE_OPACITY})`;
        links.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.closePath();
            ctx.stroke();
        });
    }
}

// =============================
// ANIMATE
// =============================
function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) p.move();
    drawConnections();
    for (const p of particles) p.draw();
    requestAnimationFrame(animate);
}

animate();

// =============================
// RESIZE
// =============================
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
