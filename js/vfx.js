// js/vfx.js
import { MAGIC_CIRCLES, SPR, PAL } from './data.js';

export let vfxParticles = [];
export let activeMagicCircle = null;
let particles = [];

const vfxCanvas = document.getElementById('vfx-canvas');
const vfxCtx = vfxCanvas.getContext('2d');
const PC = document.getElementById('pcanvas');
const px2 = PC.getContext('2d');

export function setActiveMagicCircle(circle) { activeMagicCircle = circle; }
export function resizePC() { PC.width = window.innerWidth; PC.height = window.innerHeight; }

export function drawSprite(ctx, key, frame, scale, cx, cy) {
    const s = SPR[key]; if (!s) return;
    const pal = PAL[s.p], rows = s.f[frame % s.f.length];
    const R = rows.length, C = rows[0].length;
    const ox = cx - (C * scale) / 2, oy = cy - (R * scale) / 2;
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            const i = parseInt(rows[r][c], 16); if (!i) continue;
            ctx.fillStyle = pal[i] || '#fff';
            ctx.fillRect(ox + c * scale, oy + r * scale, scale, scale);
        }
    }
}

export function drawMagicCircle(wx, wy, sigilKey, age, maxAge) {
    // Paste your original drawMagicCircle function body here
}

export function spawnElementalBeam(wx, wy, ex, ey, element, col) {
    // Paste your original spawnElementalBeam function body here
}

export function updateVFX(dt) {
    // Paste your original updateVFX function body here
}

export function renderVFX(battleCanvasWidth, battleCanvasHeight) {
    vfxCtx.clearRect(0, 0, vfxCanvas.width, vfxCanvas.height);
    const W = battleCanvasWidth, H = battleCanvasHeight;
    const wiz_x = W - 60, wiz_y = H * 0.72;
    if (activeMagicCircle) drawMagicCircle(wiz_x, wiz_y, activeMagicCircle.sigilKey, activeMagicCircle.age, activeMagicCircle.maxAge);
    
    // Paste the rest of your renderVFX loop here
}

export function pixelBurst(n, col, center = false, ex = 0, ey = 0, rect = null) {
    let cx, cy;
    if (center) { cx = window.innerWidth / 2; cy = window.innerHeight / 2; }
    else { cx = rect.left + ex * rect.width; cy = rect.top + ey * rect.height; }
    for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 8;
        particles.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2, life: 1, decay: 0.016 + Math.random() * 0.022, sz: 2 + Math.random() * 5, col });
    }
}

export function animParticles() {
    px2.clearRect(0, 0, PC.width, PC.height);
    particles = particles.filter(p => p.life > 0);
    for (const p of particles) {
        px2.globalAlpha = p.life; px2.fillStyle = p.col; px2.shadowBlur = 7; px2.shadowColor = p.col;
        const s = p.sz * p.life; px2.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.life -= p.decay;
    }
    px2.globalAlpha = 1; px2.shadowBlur = 0;
    requestAnimationFrame(animParticles);
}

// Start the global pixel burst loop
animParticles();
