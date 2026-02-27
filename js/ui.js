// js/ui.js
import { G } from './main.js';
import { UPGRADES, RELICS, POTIONS, SIGILS } from './data.js';
import { pixelBurst } from './vfx.js';
import { CHECKS } from './recognition.js';

// ---- SHOP LOGIC ----
export function openShop() {
    if (G.screen !== 'game') return;
    G.paused = true;
    document.getElementById('paused').style.display = 'none'; 
    document.getElementById('sg-val').textContent = G.gold;
    renderShopTab(G.shopTab || 'upgrades');
    document.getElementById('shop-ov').style.display = 'flex';
}

export function closeShop() {
    document.getElementById('shop-ov').style.display = 'none';
    G.paused = false;
    G.lastTime = performance.now(); 
}

export function shopTab(name, btn) {
    G.shopTab = name;
    document.querySelectorAll('.sh-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderShopTab(name);
}

export function renderShopTab(name) {
    // Paste your original renderShopTab logic here
}

export function buyUpgrade(id, cost, sigil, btn) {
    // Paste your original buyUpgrade logic here
}

export function buyRelic(id, cost) {
    // Paste your original buyRelic logic here
}

export function buyPotion(id, cost) {
    // Paste your original buyPotion logic here
}

// ---- CHALLENGE LOGIC ----
let cUpg = null, cPts = [], cTimer = 1, cTimerId = null, cAttempts = 3, cDrawing = false;

export function startChallenge(u) { /* Paste original startChallenge */ }
export function renderPips(total, remaining) { /* Paste original renderPips */ }
export function startChalTimer() { /* Paste original startChalTimer */ }
export function submitChallenge() { /* Paste original submitChallenge */ }
export function chalFail(r) { /* Paste original chalFail */ }
export function clearChallenge() { /* Paste original clearChallenge */ }
export function cancelChallenge() { /* Paste original cancelChallenge */ }
export function renderUpgBadges() { /* Paste original renderUpgBadges */ }

// ---- HUD LOGIC ----
export function updateHeartsUI() { /* Paste original updateHeartsUI */ }
export function updateHUD() { /* Paste original updateHUD */ }
export function updateSpeedBadge() { /* Paste original updateSpeedBadge */ }
export function updateStreak() { /* Paste original updateStreak */ }
export function updateEnemyStatusUI() { /* Paste original updateEnemyStatusUI */ }
export function drawSigilHint(key) { drawSigilToCanvas(key, document.getElementById('sigil-preview'), 62); }

export function drawSigilToCanvas(key, canvas, sz) {
    const c = canvas.getContext('2d'); c.clearRect(0, 0, sz, sz);
    const sig = SIGILS[key]; if (!sig) return;
    c.strokeStyle = sig.color; c.lineWidth = 2.5; c.lineCap = 'round'; c.lineJoin = 'round'; c.shadowBlur = 8; c.shadowColor = sig.color;
    sig.preview(c, sz);
}

// ---- FX / FEEDBACK ----
export function showFb(t, type) { /* Paste original showFb */ }
export function showWaveAnn(w) { /* Paste original showWaveAnn */ }
export function shakeGame() { /* Paste original shakeGame */ }

// Make critical functions globally accessible for inline HTML elements
window.openShop = openShop;
window.closeShop = closeShop;
window.shopTab = shopTab;
window.buyUpgrade = buyUpgrade;
window.buyRelic = buyRelic;
window.buyPotion = buyPotion;
window.clearChallenge = clearChallenge;
window.submitChallenge = submitChallenge;
window.cancelChallenge = cancelChallenge;
