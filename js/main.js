// js/main.js
import { PAL, SPR, SIGILS, ENEMIES, BOSSES, EVENTS, SPELL_VFX } from './data.js';
import { CHECKS } from './recognition.js';
import { initInput, clearCanvas, resizeDraw } from './input.js';
import { updateHeartsUI, updateHUD, updateSpeedBadge, updateStreak, updateEnemyStatusUI, drawSigilHint, showFb, showWaveAnn, shakeGame, closeShop, cancelChallenge } from './ui.js';
import { drawSprite, drawMagicCircle, spawnElementalBeam, updateVFX, renderVFX, pixelBurst, setActiveMagicCircle, resizePC } from './vfx.js';

export const G = {
  screen: 'splash', lives: 3, maxLives: 3, score: 0, gold: 0, combo: 1, wave: 1, kills: 0, totalKills: 0,
  streak: 0, maxStreak: 10, speedMult: 1.0, paused: false,
  enemy: null, enemyHp: 0, enemyMaxHp: 0, ex: 0, ey: 0, eFrame: 0, eFT: 0, eFlash: false, eFlashT: 0, eDead: false,
  shieldUsed: false, upgrades: new Set(), relics: new Set(), inventory: [], pts: [],
  comboTimer: null, loopId: null, lastTime: 0, activeEvent: null, eventTimer: 0,
  bossRegenTimer: 0, bossLastHit: 0, enemyStatus: {}, freezeTimer: 0, hasteTimer: 0,
  nextBossWave: 5, pendingBoss: false, shopTab: 'upgrades'
};

const BC = document.getElementById('battle-canvas');
const bx = BC.getContext('2d');
export let arenaCoins = [];

function resizeBattle() {
    const w = document.getElementById('battle-wrap');
    BC.width = w.clientWidth; BC.height = w.clientHeight;
    document.getElementById('vfx-canvas').width = w.clientWidth;
    document.getElementById('vfx-canvas').height = w.clientHeight;
}

export function drawBG() { /* Paste original drawBG code */ }
export function drawWizard() { /* Paste original drawWizard code */ }
export function drawEnemyOnBattle(dt) { /* Paste original drawEnemyOnBattle code */ }
export function drawBattleStroke() { /* Paste original drawBattleStroke code */ }

// ---- GAME LOOP ----
function renderFrame(ts) {
    const dt = Math.min((ts - G.lastTime) / 1000, 0.1);
    G.lastTime = ts;
    if (G.screen !== 'game' || G.paused) { G.loopId = requestAnimationFrame(renderFrame); return; }
    
    resizeBattle();
    bx.clearRect(0, 0, BC.width, BC.height);
    drawBG(); drawWizard(); drawBattleStroke();

    // Paste the rest of your original renderFrame loop here ...
    
    updateVFX(dt); 
    renderVFX(BC.width, BC.height);
    G.loopId = requestAnimationFrame(renderFrame);
}

// ---- ENTITY MANAGEMENT ----
export function spawnEnemy() { /* Paste original spawnEnemy code */ }
export function spawnBoss() { /* Paste original spawnBoss code */ }
export function setEnemy(e) { /* Paste original setEnemy code */ }
export function updateEnemyHP() { /* Paste original updateEnemyHP code */ }
export function dealDamage(dmg, knockback = true) { /* Paste original dealDamage code */ }
export function killEnemy() { /* Paste original killEnemy code */ }
export function enemyReached() { /* Paste original enemyReached code */ }
export function bumpCombo() { /* Paste original bumpCombo code */ }
export function triggerEvent(id) { /* Paste original triggerEvent code */ }
export function endEvent() { /* Paste original endEvent code */ }

// ---- SPELLCASTING ----
export function castSpell() {
    if (G.screen !== 'game' || !G.enemy || G.eDead || G.paused) return;
    if (G.pts.length < 8) { showFb('TOO SHORT', 'miss'); clearCanvas(); return; }

    const chk = CHECKS[G.enemy.sigil];
    const pass = chk ? chk(G.pts) : false;
    const sig = SIGILS[G.enemy.sigil];

    if (pass) {
        setActiveMagicCircle({ sigilKey: G.enemy.sigil, age: 0, maxAge: 1.8 });
        const vfxDef = SPELL_VFX[G.enemy.sigil];
        if (vfxDef) spawnElementalBeam(BC.width - 60, BC.height * 0.72, G.ex * BC.width, G.ey * BC.height, vfxDef.element, sig.color);

        const dmg = G.upgrades.has('doubledmg') ? 2 : 1;
        dealDamage(dmg, true);
        if (G.relics.has('venomglyph') && !G.eDead) G.enemyStatus.poisoned = 4;
        
        pixelBurst(20, sig.color, false, G.ex, G.ey, BC.getBoundingClientRect());

        if (!G.eDead) {
            showFb(vfxDef ? vfxDef.label : 'HIT', 'hit');
            G.streak = Math.min(G.streak + 1, G.maxStreak);
            G.score += 60 * G.combo * (G.activeEvent === 'frenzy' ? 3 : 1);
            bumpCombo(); updateHUD(); updateStreak();
        }
    } else {
        if (!G.upgrades.has('combo')) G.streak = 0;
        showFb('WRONG SIGIL', 'miss');
        if (!G.upgrades.has('combo')) G.combo = 1;
        updateHUD(); updateStreak(); shakeGame();
    }
    clearCanvas();
}

// ---- STATE MANAGEMENT ----
export function doGameOver() {
    G.screen = 'gameover';
    document.getElementById('go-stats').innerHTML = `WAVE: ${G.wave}  SCORE: ${G.score}<br>SLAIN: ${G.kills}  BEST STREAK: ${G.streak}<br>SPEED: x${G.speedMult.toFixed(1)}`;
    document.getElementById('go').style.display = 'flex';
}

export function restartGame() {
    document.getElementById('go').style.display = 'none';
    arenaCoins = []; 
    // Paste the rest of your restartGame logic here, making sure to update G properties rather than reassigning the whole object:
    G.lives = 3; G.score = 0; // etc...
    spawnEnemy();
}

export function initGame() {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('game').style.display = 'flex';
    G.screen = 'game';
    resizeBattle(); resizeDraw();
    updateHeartsUI(); updateHUD(); updateSpeedBadge(); updateStreak();
    G.lastTime = performance.now();
    G.loopId = requestAnimationFrame(renderFrame);
    spawnEnemy();
}

// Setup Keyboard & Init
initInput();
document.getElementById('startBtn').addEventListener('click', initGame);
document.getElementById('clearBtn').addEventListener('click', clearCanvas);
document.getElementById('castBtn').addEventListener('click', castSpell);

document.addEventListener('keydown', e => {
    if (G.screen !== 'game') return;
    if (e.key === 'c' || e.key === 'C') clearCanvas();
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); castSpell(); }
    if ((e.key === 'u' || e.key === 'U') && !document.getElementById('shop-ov').style.display.includes('flex')) { window.openShop(); }
    else if ((e.key === 'u' || e.key === 'U')) { closeShop(); }
    if (e.key === 'Escape') { closeShop(); cancelChallenge(); }
});

window.addEventListener('resize', () => { resizeBattle(); resizeDraw(); resizePC(); });
window.restartGame = restartGame;
