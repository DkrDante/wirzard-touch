// js/data.js

export const PAL = {
  wraith: [null,'#c0a0ff','#8060d0','#4020a0','#ffffff','#e0d0ff','#200050'],
  drake:  [null,'#ff6030','#cc3000','#ff9060','#ffd080','#801000','#ffee60'],
  imp:    [null,'#ffe030','#b0a000','#fff080','#80ff00','#505000','#ffffff'],
  lich:   [null,'#a0e0ff','#3080c0','#e0ffff','#ffffff','#104080','#6030ff'],
  hydra:  [null,'#40ff60','#008020','#80ff80','#ffff00','#004010','#20a040'],
  golem:  [null,'#ff3030','#800000','#ff8060','#cc6040','#400000','#ffcc80'],
  titan:  [null,'#8040ff','#4000c0','#c080ff','#ffffff','#200060','#ff80ff'],
  chaos:  [null,'#ff8000','#cc4000','#ffcc00','#ff0080','#801000','#ffffff'],
  boss:   [null,'#ff0000','#880000','#ff6040','#ffcc00','#400000','#ffffff','#ff40ff'],
};

export const SPR = {
  wraith: { p: 'wraith', f: [ /* Paste your wraith frames here */ ] },
  drake:  { p: 'drake',  f: [ /* Paste your drake frames here */ ] },
  imp:    { p: 'imp',    f: [ /* Paste your imp frames here */ ] },
  lich:   { p: 'lich',   f: [ /* Paste your lich frames here */ ] },
  hydra:  { p: 'hydra',  f: [ /* Paste your hydra frames here */ ] },
  golem:  { p: 'golem',  f: [ /* Paste your golem frames here */ ] },
  titan:  { p: 'titan',  f: [ /* Paste your titan frames here */ ] },
  chaos:  { p: 'chaos',  f: [ /* Paste your chaos frames here */ ] },
  boss:   { p: 'boss',   f: [ /* Paste your boss frames here */ ] },
};

export const SIGILS = {
  circle:   { name: 'Orb of Binding', desc: 'Draw a circle',       color: '#cc88ff', preview: (c, s) => { c.beginPath(); c.arc(s / 2, s / 2, s * .38, 0, Math.PI * 2); c.stroke(); } },
  triangle: { name: 'Blade of Three', desc: 'Draw a triangle',     color: '#ff6030', preview: (c, s) => { c.beginPath(); c.moveTo(s / 2, s * .1); c.lineTo(s * .9, s * .88); c.lineTo(s * .1, s * .88); c.closePath(); c.stroke(); } },
  zigzag:   { name: 'Fork of Storms', desc: 'Draw a Z / zigzag',   color: '#ffe030', preview: (c, s) => { c.beginPath(); c.moveTo(s * .85, s * .12); c.lineTo(s * .15, s * .44); c.lineTo(s * .85, s * .56); c.lineTo(s * .15, s * .88); c.stroke(); } },
  cross:    { name: 'Ward of Light',  desc: 'Draw a + cross',      color: '#30ccff', preview: (c, s) => { c.beginPath(); c.moveTo(s / 2, s * .1); c.lineTo(s / 2, s * .9); c.moveTo(s * .1, s / 2); c.lineTo(s * .9, s / 2); c.stroke(); } },
  spiral:   { name: 'Eternal Coil',   desc: 'Draw a tight spiral', color: '#40ff80', preview: (c, s) => { /* Paste spiral code */ } },
  vee:      { name: "Viper's Fang",   desc: 'Draw a V',            color: '#ccff40', preview: (c, s) => { c.beginPath(); c.moveTo(s * .1, s * .12); c.lineTo(s / 2, s * .86); c.lineTo(s * .9, s * .12); c.stroke(); } },
  infinity: { name: 'Endless Loop',   desc: 'Draw a figure-8',     color: '#ff40cc', preview: (c, s) => { /* Paste infinity code */ } },
  arrow:    { name: 'Dire Arrow',     desc: 'Draw an arrow',       color: '#ff3030', preview: (c, s) => { c.beginPath(); c.moveTo(s * .1, s / 2); c.lineTo(s * .88, s / 2); c.moveTo(s * .64, s * .26); c.lineTo(s * .88, s / 2); c.lineTo(s * .64, s * .74); c.stroke(); } },
  star5:    { name: 'Pentagram',      desc: '5-pointed star',      color: '#ffdd00', preview: (c, s) => { /* Paste pentagram code */ } },
  omega:    { name: 'Omega Rune',     desc: 'Draw Omega shape',    color: '#8040ff', preview: (c, s) => { /* Paste omega code */ } },
  eight:    { name: 'Figure Eight',   desc: 'Two stacked loops',   color: '#40ffcc', preview: (c, s) => { /* Paste eight code */ } },
};

export const ENEMIES = [
  { name: 'Phantom Wraith',  sprite: 'wraith', sigil: 'circle',   hp: 1, baseSpeed: 0.016, gold: 20, color: '#cc88ff', isBoss: false },
  { name: 'Fire Drake',      sprite: 'drake',  sigil: 'triangle', hp: 2, baseSpeed: 0.018, gold: 30, color: '#ff6030', isBoss: false },
  /* ... Paste the rest of your ENEMIES ... */
];

export const BOSSES = [
  { name: 'THE DEATH WARDEN', sprite: 'boss', sigil: 'circle',   hp: 12, baseSpeed: 0.007, gold: 200, color: '#ff2020', isBoss: true, ability: 'Regens 1 HP if not hit for 4s' },
  /* ... Paste the rest of your BOSSES ... */
];

export const UPGRADES = [ /* Paste your UPGRADES array */ ];
export const RELICS = [ /* Paste your RELICS array */ ];
export const POTIONS = [ /* Paste your POTIONS array */ ];
export const EVENTS = [ /* Paste your EVENTS array */ ];
export const MAGIC_CIRCLES = { /* Paste your MAGIC_CIRCLES object */ };
export const SPELL_VFX = { /* Paste your SPELL_VFX object */ };
