// js/input.js
import { castSpell, clearDraw } from './main.js';
import { G } from './main.js';
import { SIGILS } from './data.js';

const DC = document.getElementById('draw-canvas');
const dx = DC.getContext('2d');
let drawing = false;

export function resizeDraw() {
    const wrap = document.getElementById('draw-wrap');
    DC.width = wrap.clientWidth;
    DC.height = wrap.clientHeight;
}

function getPos(e) {
    const r = DC.getBoundingClientRect();
    if(e.touches) return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
    return { x: e.clientX - r.left, y: e.clientY - r.top };
}

export function initInput() {
    DC.addEventListener('mousedown', startDrawing);
    DC.addEventListener('mousemove', draw);
    DC.addEventListener('mouseup', endDrawing);
    DC.addEventListener('mouseleave', endDrawing);

    DC.addEventListener('touchstart', e => { e.preventDefault(); startDrawing(e); }, { passive: false });
    DC.addEventListener('touchmove', e => { e.preventDefault(); draw(e); }, { passive: false });
    DC.addEventListener('touchend', e => { e.preventDefault(); endDrawing(e); }, { passive: false });
}

function startDrawing(e) {
    if (G.screen !== 'game' || G.paused) return;
    drawing = true;
    const p = getPos(e);
    G.pts = [[p.x, p.y]];
    dx.clearRect(0, 0, DC.width, DC.height);
    dx.beginPath();
    dx.moveTo(p.x, p.y);
}

function draw(e) {
    if (!drawing) return;
    const p = getPos(e);
    const col = G.enemy ? SIGILS[G.enemy.sigil].color : '#ffd700';
    G.pts.push([p.x, p.y]);
    
    dx.strokeStyle = col;
    dx.lineWidth = 3;
    dx.lineCap = 'round';
    dx.lineJoin = 'round';
    dx.shadowBlur = 14;
    dx.shadowColor = col;
    
    dx.lineTo(p.x, p.y);
    dx.stroke();
    dx.shadowBlur = 0;
    dx.beginPath();
    dx.moveTo(p.x, p.y);
}

function endDrawing() {
    if (drawing) {
        drawing = false;
        if (G.pts.length > 10) setTimeout(castSpell, 60);
    }
}

export function clearCanvas() {
    dx.clearRect(0, 0, DC.width, DC.height);
    G.pts = [];
}
