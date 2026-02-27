# 🧙 Wizard Touch — Sigil Slayer

A fast-paced HTML5 canvas game where you **draw magical sigils** to defeat approaching monsters before they breach your defenses.

Enemies grow faster with every kill. Bosses emerge every 5 waves. Precision and speed determine survival.

---

## 🎮 Game Overview

### Core Idea
- Enemies approach from the left.
- Each enemy requires a specific **sigil**.
- You draw the correct shape using mouse or trackpad.
- If correct → spell activates, damage dealt.
- If wrong → combo resets and pressure increases.

### Progression System
- Waves increase every 3 kills.
- Enemy speed scales with total kills.
- Bosses appear every 5 waves with unique mechanics.
- Gold earned per kill scales with combo and events.

---

## 🧩 Core Features

### ✍️ Gesture-Based Spell Casting
- Custom stroke recognition engine.
- Normalization + resampling + angle variation logic.
- Recognizes shapes like:
  - Circle
  - Triangle
  - Zigzag
  - Cross
  - Spiral
  - Infinity
  - Arrow
  - Vee
  - Star
  - Omega
  - Figure Eight

---

### 👾 Enemy System
- Progressive enemy pool unlock per wave.
- Each enemy binds to a required sigil.
- Status effects supported:
  - Frozen
  - Poisoned
  - Slowed
  - Burned

#### Boss Abilities
- Regeneration if not hit
- Speed increase below 50% HP
- Mid-fight sigil switching

---

### ⚔️ Combat Mechanics
- Knockback system
- Combo multiplier
- Kill streak bonus
- Speed scaling multiplier
- Spell-specific elemental VFX

---

### 🛒 Shop System (The Forge)

#### Upgrades (Passive)
- Rune of Power → Double damage
- Time Coil → Slow enemies
- Gold Curse → Gold multiplier
- Arcane Ward → Shield per wave
- Force Blast → Stronger knockback
- Combo Keeper → Combo retention

#### Relics
- Bloodstone → Chance to restore life
- Swift Ring → Instant first cast
- Dark Grimoire → Random wave bonus
- Gold Badge → Bonus gold every 5 kills
- Venom Glyph → Apply poison on hit

#### Potions (One-use)
- Life Draught → Restore 1 life
- Gold Rush → +80 gold
- Freeze Bomb → Freeze enemy
- Haste Elixir → Slow time

Some upgrades require completing a **Sigil Challenge** under time pressure.

---

## 🌩 Arena Events

Randomly triggered modifiers:

- Gold Rain  
- Kill Frenzy (3× gold)  
- Slow Field  
- Boss Warning  

Events temporarily change risk and reward balance.

---

## 🖥 Technical Architecture

### Rendering
- Dual canvas system:
  - Battle canvas
  - VFX canvas
- Additional particle overlay canvas
- Pixel-art sprite system using palette encoding

### Gesture Recognition Engine
1. Normalize stroke coordinates
2. Resample into fixed-length point array
3. Calculate angle deltas
4. Detect:
   - Rotation magnitude
   - Corner count
   - Direction changes
   - Loop behavior

No external libraries used.

### Game Loop
- `requestAnimationFrame`
- Delta-time based movement
- Independent VFX update pipeline
- Event timers and status tick system

### State Model
Single global game object managing:
- Player stats
- Enemy state
- Status effects
- Upgrades and relic sets
- Active event flags
- Combat modifiers

---

## 🎯 Controls

| Action | Key |
|--------|------|
| Draw | Mouse / Trackpad |
| Cast | Space / Enter |
| Clear | C |
| Shop | U |
| Close Overlay | Escape |

---

## 🏆 Scoring System

Score is based on:
- Base kill value  
- Combo multiplier  
- Event multiplier  
- Boss bonuses  
- Streak bonuses  

Speed multiplier increases over time, making late-game progressively harder.

---

## 🚀 Running the Game

No build tools required.

1. Save as `index.html`
2. Open in a modern browser
3. Click **BEGIN RITUAL**

Works fully offline.

---

## 🧠 Design Philosophy

This project combines:
- Pattern recognition under pressure
- Progressive difficulty scaling
- Risk-reward economy loops
- Visual spell feedback reinforcement
- Skill-based upgrade unlocking

Built entirely with:
- Vanilla JavaScript
- HTML5 Canvas API
- Custom sprite rendering
- Custom physics and VFX
- No external frameworks

---

## 📈 Possible Extensions

- Multiplayer spell duels
- Procedural sigil generation
- LocalStorage save system
- Leaderboard backend
- PWA conversion
- Touch optimization
- Accessibility mode with larger sigils

---

## 📜 License

Open for modification and experimentation.  
Standalone browser game with no external dependencies.
