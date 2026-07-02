const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'aicamppics');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const W = 1600, H = 1200;

// ── COLOR PALETTE ──────────────────────────────
const C = {
  sky: '#87CEEB', skyTop: '#5BA4CF', skyBot: '#C5E8F7',
  wall: '#F7F3ED', wallWarm: '#FAF6F0', floor: '#E8E0D5',
  wood: '#C4A882', woodDark: '#8B6F4E',
  green: '#7CB342', greenDark: '#558B2F', grass: '#8BC34A',
  brick: '#D4A574', brickDark: '#B8784A',
  accent: '#FF7043', accentDark: '#E64A19',
  blue: '#42A5F5', blueDark: '#1E88E5',
  purple: '#AB47BC', purpleDark: '#8E24AA',
  teal: '#26A69A', tealDark: '#00897B',
  gold: '#FFCA28', goldDark: '#FFB300',
  white: '#FFFFFF', offwhite: '#FFFDE7',
  text: '#3E2723', textLight: '#5D4037',
  grey: '#BDBDBD', greyLight: '#EEEEEE',
  window: '#E3F2FD',
  night: '#1A237E', nightSky: '#283593',
  sunset: '#FF8A65', sunsetLight: '#FFCCBC',
  red: '#EF5350',
};

// ── SKIN TONES (diverse) ───────────────────────
const SKIN = [
  '#FDDCB5', // light East Asian / fair
  '#E8B88A', // medium East Asian / Latino
  '#D4A574', // tan / South Asian
  '#C68642', // brown / Middle Eastern
  '#A0724A', // deep brown / South Asian dark
  '#8D5524', // dark brown / Black
  '#6B3A2A', // deep dark / Black dark
  '#F5D0A9', // pale / White fair
  '#E0AC69', // olive / Latino
];

// ── HAIR COLORS ────────────────────────────────
const HAIR = ['#1A1A1A','#3E2723','#5D4037','#795548','#FFB74D','#FF8A65','#D84315','#212121','#4E342E'];

// ── SVG UTILITIES ──────────────────────────────
function svg(content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${content}</svg>`;
}

function rect(x,y,w,h,fill,opacity=1) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" opacity="${opacity}"/>`;
}

function circle(cx,cy,r,fill) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function ellipse(cx,cy,rx,ry,fill) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>`;
}

function svgPath(d,fill,stroke=null,sw=1) {
  const s = stroke ? ` stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"` : '';
  return `<path d="${d}" fill="${fill}"${s}/>`;
}

function text(x,y,content,size=24,fill=C.text,anchor='middle',bold=false) {
  const w = bold ? ' font-weight="bold"' : '';
  return `<text x="${x}" y="${y}" font-family="system-ui, sans-serif" font-size="${size}" fill="${fill}" text-anchor="${anchor}"${w}>${content}</text>`;
}

function gradDef(id, c1, c2, vertical=true) {
  const y2 = vertical ? '100%' : '0%';
  const x2 = vertical ? '0%' : '100%';
  return `<linearGradient id="${id}" x1="0%" y1="0%" x2="${x2}" y2="${y2}"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient>`;
}

// ── REUSABLE COMPONENTS ────────────────────────

function gradients() {
  return `
    ${gradDef('gSky', C.skyTop, C.skyBot)}
    ${gradDef('gWarm', C.sunset, C.sunsetLight)}
    ${gradDef('gNight', C.night, C.nightSky)}
    ${gradDef('gGrass', C.green, C.grass)}
    ${gradDef('gWall', C.wall, C.wallWarm)}
    ${gradDef('gBlue', C.blue, C.blueDark)}
    ${gradDef('gTeal', C.teal, C.tealDark)}
    ${gradDef('gGold', C.gold, C.goldDark)}
    ${gradDef('gPurple', C.purple, C.purpleDark)}
  `;
}

// Generate a diverse character
// opts: { x, y, skin, hair, hairColor, shirt, gender, pose, scale }
function makeCharacter(opts = {}) {
  const {
    x = 800, y = 600,
    skin = SKIN[Math.floor(Math.random() * SKIN.length)],
    hair = Math.floor(Math.random() * 5),
    hairColor = HAIR[Math.floor(Math.random() * HAIR.length)],
    shirt = [C.blue, C.accent, C.teal, C.purple, C.green, C.red, C.gold][Math.floor(Math.random() * 7)],
    gender = Math.random() > 0.5 ? 'f' : 'm',
    pose = 'stand',
    scale = 1,
  } = opts;

  const s = scale;
  const headR = 28 * s;
  const cx = x, cy = y;
  const headY = cy - 80 * s;
  const bodyY = headY + headR + 2;

  let parts = '';

  // Body / shirt
  parts += svgPath(`M${cx - 30*s} ${bodyY} L${cx - 35*s} ${bodyY + 70*s} Q${cx - 30*s} ${bodyY + 75*s} ${cx - 20*s} ${bodyY + 75*s} L${cx + 20*s} ${bodyY + 75*s} Q${cx + 30*s} ${bodyY + 75*s} ${cx + 35*s} ${bodyY + 70*s} L${cx + 30*s} ${bodyY} Z`, shirt);

  // Arms
  const armColor = skin;
  // Left arm
  if (pose === 'wave') {
    parts += svgPath(`M${cx - 28*s} ${bodyY + 5*s} Q${cx - 45*s} ${bodyY - 15*s} ${cx - 40*s} ${bodyY - 35*s}`, null, armColor, 10*s);
  } else if (pose === 'point') {
    parts += svgPath(`M${cx - 28*s} ${bodyY + 5*s} Q${cx - 45*s} ${bodyY - 10*s} ${cx - 50*s} ${bodyY - 30*s}`, null, armColor, 10*s);
  } else {
    parts += svgPath(`M${cx - 28*s} ${bodyY + 5*s} Q${cx - 40*s} ${bodyY + 20*s} ${cx - 32*s} ${bodyY + 55*s}`, null, armColor, 10*s);
  }
  // Right arm
  if (pose === 'hold') {
    parts += svgPath(`M${cx + 28*s} ${bodyY + 5*s} Q${cx + 42*s} ${bodyY + 10*s} ${cx + 38*s} ${bodyY + 30*s}`, null, armColor, 10*s);
  } else if (pose === 'present') {
    parts += svgPath(`M${cx + 28*s} ${bodyY + 5*s} Q${cx + 45*s} ${bodyY - 15*s} ${cx + 38*s} ${bodyY - 30*s}`, null, armColor, 10*s);
  } else {
    parts += svgPath(`M${cx + 28*s} ${bodyY + 5*s} Q${cx + 40*s} ${bodyY + 20*s} ${cx + 32*s} ${bodyY + 55*s}`, null, armColor, 10*s);
  }

  // Legs
  parts += rect(cx - 18*s, bodyY + 72*s, 14*s, 50*s, '#3E2723');
  parts += rect(cx + 2*s, bodyY + 72*s, 14*s, 50*s, '#3E2723');

  // Shoes
  parts += ellipse(cx - 11*s, bodyY + 124*s, 12*s, 7*s, '#212121');
  parts += ellipse(cx + 9*s, bodyY + 124*s, 12*s, 7*s, '#212121');

  // Neck
  parts += rect(cx - 8*s, bodyY - 10*s, 16*s, 14*s, skin);

  // Head
  parts += ellipse(cx, headY, headR, headR * 1.1, skin);

  // Hair
  if (hair === 0) { // short hair
    parts += svgPath(`M${cx - headR - 3*s} ${headY} Q${cx - headR} ${headY - headR*1.2} ${cx} ${headY - headR*1.15} Q${cx + headR} ${headY - headR*1.2} ${cx + headR + 3*s} ${headY} L${cx + headR} ${headY - 5*s} Q${cx} ${headY - headR*1.3} ${cx - headR} ${headY - 5*s} Z`, hairColor);
  } else if (hair === 1) { // long straight hair
    parts += svgPath(`M${cx - headR - 2*s} ${headY} Q${cx - headR} ${headY - headR*1.2} ${cx} ${headY - headR*1.15} Q${cx + headR} ${headY - headR*1.2} ${cx + headR + 2*s} ${headY} L${cx + headR + 4*s} ${headY + 30*s} L${cx + headR} ${headY + 28*s} L${cx - headR} ${headY + 28*s} L${cx - headR - 4*s} ${headY + 30*s} Z`, hairColor);
  } else if (hair === 2) { // curly / afro
    parts += circle(cx, headY - headR*0.3, headR*1.25, hairColor);
    parts += circle(cx - headR*0.7, headY - headR*0.1, headR*0.7, hairColor);
    parts += circle(cx + headR*0.7, headY - headR*0.1, headR*0.7, hairColor);
    parts += circle(cx, headY - headR*0.9, headR*0.7, hairColor);
  } else if (hair === 3) { // bun / tied up
    parts += svgPath(`M${cx - headR - 2*s} ${headY} Q${cx - headR} ${headY - headR*1.2} ${cx} ${headY - headR*1.15} Q${cx + headR} ${headY - headR*1.2} ${cx + headR + 2*s} ${headY} Z`, hairColor);
    parts += circle(cx, headY - headR*1.2, 14*s, hairColor);
  } else { // medium wavy
    parts += svgPath(`M${cx - headR - 2*s} ${headY} Q${cx - headR} ${headY - headR*1.15} ${cx} ${headY - headR*1.1} Q${cx + headR} ${headY - headR*1.15} ${cx + headR + 2*s} ${headY} L${cx + headR + 3*s} ${headY + 16*s} L${cx - headR - 3*s} ${headY + 16*s} Z`, hairColor);
  }

  // Face - eyes
  parts += circle(cx - 9*s, headY - 3*s, 3.5*s, C.text);
  parts += circle(cx + 9*s, headY - 3*s, 3.5*s, C.text);
  // eye shine
  parts += circle(cx - 8*s, headY - 5*s, 1.2*s, C.white);
  parts += circle(cx + 10*s, headY - 5*s, 1.2*s, C.white);

  // Eyebrows
  parts += svgPath(`M${cx - 15*s} ${headY - 12*s} Q${cx - 9*s} ${headY - 16*s} ${cx - 4*s} ${headY - 12*s}`, null, hairColor, 2.5*s);
  parts += svgPath(`M${cx + 4*s} ${headY - 12*s} Q${cx + 9*s} ${headY - 16*s} ${cx + 15*s} ${headY - 12*s}`, null, hairColor, 2.5*s);

  // Nose
  parts += svgPath(`M${cx} ${headY - 2*s} Q${cx - 3*s} ${headY + 5*s} ${cx} ${headY + 6*s}`, null, skin.replace('F','E').replace('D','C').replace('8','7'), 2*s);

  // Mouth (smile)
  parts += svgPath(`M${cx - 8*s} ${headY + 8*s} Q${cx} ${headY + 18*s} ${cx + 8*s} ${headY + 8*s}`, null, '#D84315', 2.5*s);

  return parts;
}

// ── BACKGROUND HELPERS ─────────────────────────

function skyBg() {
  return rect(0,0,W,H,'url(#gSky)');
}

function indoorBg(wallColor = C.wall, floorColor = C.floor) {
  return rect(0,0,W,H*0.75,wallColor) + rect(0,H*0.75,W,H*0.25,floorColor);
}

function windowRect(x,y,w,h) {
  return `
    ${rect(x,y,w,h,C.window)}
    ${rect(x+2,y+2,w-4,h-4,C.skyTop,0.3)}
    ${svgPath(`M${x+w/2} ${y} L${x+w/2} ${y+h} M${x} ${y+h/2} L${x+w} ${y+h/2}`,null,C.greyLight,3)}
  `;
}

function floorShadow(cx, cy, rx, ry) {
  return ellipse(cx, cy, rx, ry, C.text, 0.08);
}

// ── ROBOT PROP ─────────────────────────────────
function robotProp(x, y, scale = 1) {
  const s = scale;
  let parts = '';
  // body
  parts += rect(x-20*s, y-25*s, 40*s, 35*s, C.blue);
  parts += rect(x-15*s, y-30*s, 30*s, 8*s, C.blueDark);
  // wheels
  parts += circle(x-12*s, y+18*s, 10*s, C.grey);
  parts += circle(x+12*s, y+18*s, 10*s, C.grey);
  parts += circle(x-12*s, y+18*s, 4*s, C.greyLight);
  parts += circle(x+12*s, y+18*s, 4*s, C.greyLight);
  // eyes/sensors
  parts += circle(x-6*s, y-12*s, 5*s, C.teal);
  parts += circle(x+6*s, y-12*s, 5*s, C.teal);
  parts += circle(x-5*s, y-13*s, 2*s, C.white);
  parts += circle(x+7*s, y-13*s, 2*s, C.white);
  // arm
  parts += svgPath(`M${x+18*s} ${y-10*s} L${x+30*s} ${y-20*s}`, null, C.blueDark, 5*s);
  parts += circle(x+30*s, y-22*s, 4*s, C.accent);
  return parts;
}

// ── LAPTOP PROP ────────────────────────────────
function laptopProp(x, y, scale = 1) {
  const s = scale;
  return `
    ${rect(x-25*s, y-15*s, 50*s, 32*s, C.greyLight)}  <!-- screen -->
    ${rect(x-23*s, y-13*s, 46*s, 28*s, C.blueDark, 0.8)}  <!-- display -->
    ${rect(x-28*s, y+17*s, 56*s, 5*s, C.grey)}  <!-- keyboard base -->
    ${rect(x-26*s, y+22*s, 52*s, 4*s, C.greyDark || '#616161')}  <!-- bottom -->
  `;
}

// ── TABLE PROP ─────────────────────────────────
function table(x, y, w, h) {
  return rect(x, y, w, h, C.wood) + rect(x, y+h-3, w, 6, C.woodDark);
}

// ── BOOK PROP ──────────────────────────────────
function book(x, y, w, h, color) {
  return rect(x, y, w, h, color) + rect(x, y, 4, h, C.text, 0.2);
}

// ── BACKPACK / BAG PROP ────────────────────────
function backpack(x, y, scale = 1) {
  const s = scale;
  return `
    ${rect(x-15*s, y-20*s, 30*s, 38*s, C.accent)}
    ${rect(x-13*s, y-18*s, 26*s, 15*s, C.accent, 0.6)}
    ${svgPath(`M${x-10*s} ${y-20*s} Q${x} ${y-35*s} ${x+10*s} ${y-20*s}`, null, C.accentDark, 4*s)}
  `;
}

// ── SCENE BUILDERS ─────────────────────────────

function sceneDay01() {
  // Welcome dinner - indoor banquet hall, evening
  let s = '';
  s += rect(0,0,W,H,'#2C1654'); // night bg
  s += gradDef('gNight1','#1A237E','#2C1654');
  s += rect(0,0,W,H,'url(#gNight1)');
  s += rect(0,0,W,H*0.8,C.wallWarm,0.95);
  s += rect(0,H*0.8,W,H*0.2,C.floor);

  // Windows showing evening sky
  s += windowRect(100, 60, 180, 250);
  s += windowRect(320, 60, 180, 250);
  s += windowRect(1100, 60, 180, 250);
  s += windowRect(1320, 60, 180, 250);

  // Banner
  s += rect(450, 30, 700, 60, C.accent, 0.85);
  s += text(800, 70, '✨ AI + Robotics Summer Camp ✨', 28, C.white, 'middle', true);

  // Dining tables with white cloths
  s += rect(150, 750, 500, 20, C.wood);
  s += rect(140, 740, 520, 14, C.white, 0.9);
  s += rect(900, 700, 500, 20, C.wood);
  s += rect(890, 690, 520, 14, C.white, 0.9);

  // Food on tables
  s += circle(250, 735, 20, C.accent); s += circle(350, 735, 18, C.gold);
  s += circle(450, 735, 22, C.green); s += circle(550, 735, 16, C.red);
  s += circle(1000, 685, 20, C.accent); s += circle(1100, 685, 18, C.gold);
  s += circle(1200, 685, 22, C.teal);

  // Characters greeting each other - diverse group
  s += floorShadow(300, 870, 40, 10);
  s += makeCharacter({x:300, y:780, skin:SKIN[7], hair:1, hairColor:HAIR[4], shirt:C.accent, pose:'wave', scale:1.1});
  s += floorShadow(500, 870, 40, 10);
  s += makeCharacter({x:500, y:780, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.teal, pose:'stand', scale:1.1});
  s += floorShadow(700, 870, 40, 10);
  s += makeCharacter({x:700, y:780, skin:SKIN[2], hair:3, hairColor:HAIR[2], shirt:C.purple, pose:'wave', scale:1.05});
  s += floorShadow(1050, 820, 40, 10);
  s += makeCharacter({x:1050, y:730, skin:SKIN[0], hair:4, hairColor:HAIR[1], shirt:C.blue, pose:'stand', scale:1.05});
  s += floorShadow(1200, 820, 40, 10);
  s += makeCharacter({x:1200, y:730, skin:SKIN[3], hair:1, hairColor:HAIR[5], shirt:C.green, pose:'hold', scale:1.05});

  // Backpacks on floor
  s += backpack(180, 860, 0.7);
  s += backpack(620, 860, 0.7);

  // Warm string lights
  for (let i = 0; i < 16; i++) {
    s += circle(100 + i*95, 30, 6, C.gold);
    s += circle(100 + i*95, 30, 3, C.white, 0.7);
  }

  return s;
}

function sceneDay02() {
  // Team building - bright hall, circle activity
  let s = indoorBg();
  s += windowRect(50, 40, 250, 200);
  s += windowRect(1300, 40, 250, 200);

  // Floor circle mat
  s += ellipse(800, 780, 350, 120, C.teal, 0.12);
  s += ellipse(800, 780, 280, 90, C.teal, 0.08);

  // Team flags/banners on wall
  s += rect(200, 150, 120, 180, C.accent, 0.15);
  s += rect(340, 150, 120, 180, C.blue, 0.15);
  s += rect(480, 150, 120, 180, C.purple, 0.15);
  s += text(260, 260, 'TEAM', 18, C.accentDark);
  s += text(400, 260, 'ROBOT', 18, C.blueDark);
  s += text(540, 260, 'CODE', 18, C.purpleDark);

  // Whiteboard
  s += rect(1000, 100, 500, 300, C.white);
  s += rect(1000, 100, 500, 6, C.greyLight);
  s += text(1250, 250, 'Team Icebreaker! 🎉', 28, C.accent, 'middle', true);
  s += text(1250, 300, 'Find your robot buddy...', 20, C.textLight);

  // Robotics kits on side table
  s += table(60, 650, 250, 15);
  s += rect(70, 580, 80, 70, C.blue, 0.7);
  s += rect(170, 590, 80, 60, C.teal, 0.7);
  s += text(110, 620, 'Kit', 14, C.white);
  s += text(210, 625, 'Kit', 14, C.white);

  // Students in circle - diverse
  const poses = ['stand','wave','stand','wave','hold','stand'];
  const shirts = [C.accent, C.blue, C.green, C.purple, C.teal, C.gold];
  const skins = [SKIN[0], SKIN[5], SKIN[2], SKIN[7], SKIN[3], SKIN[1]];
  const hairs = [3, 2, 1, 4, 0, 1];
  const hColors = [HAIR[1], HAIR[0], HAIR[2], HAIR[4], HAIR[5], HAIR[3]];

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI/2;
    const cx = 800 + Math.cos(angle) * 200;
    const cy = 760 + Math.sin(angle) * 60;
    s += floorShadow(cx, cy+100, 35, 8);
    s += makeCharacter({x:cx, y:cy+10, skin:skins[i], hair:hairs[i], hairColor:hColors[i], shirt:shirts[i], pose:poses[i], scale:0.95});
  }

  return s;
}

function sceneDay03() {
  // Classroom - robotics foundations
  let s = indoorBg(C.wall, C.floor);
  s += windowRect(60, 50, 220, 180);
  s += windowRect(1320, 50, 220, 180);

  // Projector screen
  s += rect(500, 40, 600, 340, C.white);
  s += rect(495, 35, 610, 10, C.greyLight);
  s += text(800, 200, '🤖 Robot Structure', 36, C.text, 'middle', true);
  s += text(800, 260, 'Motors · Sensors · Control Logic', 24, C.textLight);
  // Robot diagram on screen
  s += rect(650, 290, 80, 60, C.blue, 0.3);
  s += circle(690, 360, 15, C.grey);
  s += circle(690, 360, 6, C.greyLight);

  // Instructor
  s += floorShadow(250, 870, 30, 8);
  s += makeCharacter({x:250, y:780, skin:SKIN[0], hair:3, hairColor:HAIR[1], shirt:'#37474F', pose:'present', scale:1.05});

  // Workbenches
  for (let i = 0; i < 3; i++) {
    const bx = 400 + i * 380;
    s += table(bx-100, 700, 200, 12);
    s += robotProp(bx, 680, 0.7);
    s += rect(bx+50, 650, 60, 45, C.greyLight, 0.7);
    s += text(bx, 760, 'Build Station', 14, C.textLight);
  }

  // Students at benches - diverse
  s += floorShadow(500, 830, 30, 8);
  s += makeCharacter({x:520, y:740, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.accent, pose:'hold', scale:0.95});
  s += floorShadow(850, 830, 30, 8);
  s += makeCharacter({x:850, y:740, skin:SKIN[2], hair:1, hairColor:HAIR[2], shirt:C.green, pose:'stand', scale:0.95});
  s += floorShadow(1200, 830, 30, 8);
  s += makeCharacter({x:1200, y:740, skin:SKIN[7], hair:4, hairColor:HAIR[4], shirt:C.purple, pose:'hold', scale:0.95});

  // Student with tablet
  s += rect(1130, 600, 70, 90, C.greyLight, 0.8);
  s += rect(1135, 605, 60, 80, C.blueDark, 0.7);

  return s;
}

function sceneDay04() {
  // Robot testing lab
  let s = indoorBg(C.wall, '#D7CCC8');
  s += windowRect(50, 50, 200, 180);
  s += windowRect(1350, 50, 200, 180);

  // Testing arena
  s += rect(350, 550, 900, 350, C.white, 0.85);
  s += rect(350, 550, 900, 4, C.grey);
  s += rect(350, 896, 900, 4, C.grey);
  s += rect(350, 550, 4, 350, C.grey);
  s += rect(1246, 550, 4, 350, C.grey);
  // Arena markings
  s += svgPath(`M400 725 L1200 725 M800 600 L800 850`, null, C.greyLight, 2);
  s += circle(800, 725, 60, null, C.greyLight, 2);

  // Obstacles
  s += rect(600, 680, 50, 50, C.accent, 0.4);
  s += rect(950, 750, 40, 40, C.teal, 0.4);

  // Robot on field
  s += robotProp(700, 720, 1.0);

  // "TESTING" sign
  s += rect(550, 520, 200, 40, C.accent);
  s += text(650, 548, '🤖 TESTING ARENA', 18, C.white, 'middle', true);

  // Students observing
  s += floorShadow(500, 940, 30, 8);
  s += makeCharacter({x:500, y:860, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.blue, pose:'hold', scale:1.0});
  s += floorShadow(1050, 940, 30, 8);
  s += makeCharacter({x:1050, y:860, skin:SKIN[0], hair:1, hairColor:HAIR[1], shirt:C.accent, pose:'point', scale:1.0});

  // Student with tablet tracking data
  s += floorShadow(800, 940, 30, 8);
  s += makeCharacter({x:780, y:860, skin:SKIN[2], hair:3, hairColor:HAIR[3], shirt:C.purple, pose:'stand', scale:1.0});
  s += rect(820, 780, 55, 75, C.greyLight, 0.9);
  s += rect(825, 785, 45, 65, C.blue, 0.6);
  s += rect(830, 795, 35, 4, C.teal); s += rect(830, 805, 30, 4, C.teal); s += rect(830, 815, 40, 4, C.teal);

  return s;
}

function sceneDay05() {
  // Computer Vision Lab
  let s = indoorBg(C.wall, C.floor);
  s += windowRect(60, 40, 200, 160);

  // Whiteboard with CV concepts
  s += rect(1050, 80, 480, 320, C.white);
  s += rect(1050, 80, 480, 5, C.greyLight);
  s += text(1290, 130, '🧠 Computer Vision', 24, C.text, 'middle', true);
  s += text(1290, 180, 'Object Detection', 18, C.blueDark);
  s += text(1290, 220, 'Image Classification', 18, C.accentDark);
  s += text(1290, 260, 'Neural Networks', 18, C.purpleDark);
  s += text(1290, 320, 'Data Bias · Ethics · Fairness', 16, C.textLight);
  // Simple NN diagram
  for (let i = 0; i < 4; i++) s += circle(1120 + i*55, 330, 10, C.blue, 0.5);
  for (let i = 0; i < 3; i++) s += circle(1147 + i*55, 360, 10, C.accent, 0.5);
  for (let i = 0; i < 4; i++) s += circle(1120 + i*55, 390, 10, C.green, 0.5);

  // Camera setup on desk
  s += table(200, 680, 500, 15);
  s += rect(400, 600, 40, 30, C.grey, 0.8);
  s += circle(420, 595, 8, '#212121');
  s += circle(420, 595, 3, C.blue, 0.6);

  // Laptop with detection display
  s += rect(500, 630, 120, 75, C.greyLight, 0.9);
  s += rect(505, 635, 110, 60, C.blueDark, 0.7);
  // Bounding boxes on screen
  s += rect(520, 645, 25, 20, C.accent, 0.5);
  s += rect(565, 655, 30, 25, C.accent, 0.5);
  s += text(558, 710, 'Live Detection', 12, C.textLight);

  // Students
  s += floorShadow(350, 870, 30, 8);
  s += makeCharacter({x:350, y:780, skin:SKIN[2], hair:1, hairColor:HAIR[2], shirt:C.teal, pose:'hold', scale:1.0});
  s += floorShadow(600, 870, 30, 8);
  s += makeCharacter({x:600, y:780, skin:SKIN[7], hair:4, hairColor:HAIR[4], shirt:C.accent, pose:'point', scale:1.0});
  s += floorShadow(900, 870, 30, 8);
  s += makeCharacter({x:900, y:780, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.purple, pose:'stand', scale:1.0});

  return s;
}

function sceneDay06() {
  // Engineering Workshop Studio
  let s = rect(0,0,W,H,'#ECEFF1');
  s += rect(0,H*0.78,W,H*0.22,'#BCAAA4');

  // Pegboard / tool wall
  s += rect(30, 50, 350, 800, C.brick, 0.3);
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 10; j++) {
      s += circle(70 + i*55, 90 + j*75, 4, C.brickDark);
    }
  }
  // Tools on wall
  s += svgPath(`M100 150 L100 220 L90 225 L110 225 Z`, C.grey);
  s += svgPath(`M200 130 L200 250 L190 255 L210 255 Z`, C.grey);
  s += rect(280, 120, 60, 15, C.accent);

  // Workbenches
  s += table(350, 750, 550, 18);
  s += table(900, 680, 500, 18);

  // Robot parts on benches
  s += robotProp(500, 700, 0.8);
  s += rect(430, 710, 60, 40, C.grey, 0.6);
  s += circle(680, 700, 20, C.grey);
  s += rect(960, 640, 80, 40, C.teal, 0.6);
  s += circle(1080, 650, 15, C.grey);
  s += rect(1150, 645, 60, 30, C.blue, 0.5);

  // Whiteboard with designs
  s += rect(50, 860, 350, 250, C.white);
  s += rect(50, 860, 350, 5, C.greyLight);
  s += text(225, 900, 'Chassis Design v2', 18, C.blueDark, 'middle', true);
  s += rect(100, 930, 120, 70, C.greyLight);
  s += circle(160, 965, 15, C.grey);
  s += circle(160, 965, 6, C.greyLight);
  s += text(225, 1020, 'Strategy Notes', 16, C.textLight);
  s += text(225, 1060, '→ Improve grip', 14, C.textLight);
  s += text(225, 1085, '→ Reduce weight', 14, C.textLight);

  // Students
  s += floorShadow(500, 930, 30, 8);
  s += makeCharacter({x:500, y:840, skin:SKIN[3], hair:0, hairColor:HAIR[1], shirt:C.accent, pose:'hold', scale:1.0});
  s += floorShadow(750, 930, 30, 8);
  s += makeCharacter({x:750, y:840, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.green, pose:'stand', scale:1.0});
  s += floorShadow(1050, 860, 30, 8);
  s += makeCharacter({x:1050, y:770, skin:SKIN[7], hair:1, hairColor:HAIR[4], shirt:C.purple, pose:'hold', scale:1.0});
  s += floorShadow(1300, 860, 30, 8);
  s += makeCharacter({x:1300, y:770, skin:SKIN[2], hair:3, hairColor:HAIR[5], shirt:C.blue, pose:'point', scale:1.0});

  // Laptops
  s += laptopProp(680, 720, 0.8);
  s += laptopProp(1250, 660, 0.7);

  return s;
}

function sceneDay07() {
  // Road trip - university campus
  let s = skyBg();
  // Campus buildings
  s += rect(0, 350, 500, 650, C.brick, 0.6);
  s += rect(0, 300, 500, 60, C.brickDark, 0.7);
  for (let i = 0; i < 10; i++) {
    s += windowRect(50 + i*48, 380, 30, 50);
  }
  for (let i = 0; i < 10; i++) {
    s += windowRect(50 + i*48, 480, 30, 50);
  }
  s += rect(480, 350, 30, 650, C.brickDark, 0.5);
  // University sign
  s += rect(50, 580, 200, 80, C.white, 0.85);
  s += text(150, 635, '🏛️ University', 20, C.text, 'middle', true);

  // Modern building
  s += rect(900, 400, 700, 600, '#CFD8DC', 0.7);
  s += rect(900, 350, 700, 60, '#90A4AE', 0.8);
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 10; j++) {
      s += windowRect(930 + j*65, 420 + i*55, 40, 40);
    }
  }

  // Trees
  s += circle(560, 600, 80, C.green, 0.7);
  s += rect(555, 600, 10, 100, C.woodDark);
  s += circle(830, 580, 70, C.greenDark, 0.7);
  s += rect(825, 580, 10, 90, C.woodDark);

  // Path/walkway
  s += ellipse(800, 950, 700, 40, '#D7CCC8', 0.7);

  // Students walking - diverse
  s += floorShadow(350, 930, 35, 8);
  s += makeCharacter({x:350, y:840, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.accent, pose:'stand', scale:1.05});
  s += floorShadow(550, 930, 35, 8);
  s += makeCharacter({x:550, y:840, skin:SKIN[0], hair:1, hairColor:HAIR[1], shirt:C.blue, pose:'point', scale:1.0});
  s += floorShadow(750, 930, 35, 8);
  s += makeCharacter({x:750, y:840, skin:SKIN[7], hair:4, hairColor:HAIR[4], shirt:C.green, pose:'stand', scale:1.05});
  s += floorShadow(950, 930, 35, 8);
  s += makeCharacter({x:950, y:840, skin:SKIN[2], hair:3, hairColor:HAIR[3], shirt:C.purple, pose:'wave', scale:1.0});
  s += floorShadow(1150, 930, 35, 8);
  s += makeCharacter({x:1150, y:840, skin:SKIN[3], hair:0, hairColor:HAIR[5], shirt:C.teal, pose:'stand', scale:1.05});

  // Cameras
  s += rect(320, 780, 35, 25, C.text);
  s += circle(355, 785, 8, '#424242');
  s += rect(680, 780, 35, 25, C.text);

  return s;
}

function sceneDay08() {
  // Scenic landmark - cultural
  let s = skyBg();

  // Pagoda / traditional building
  s += rect(550, 250, 500, 30, C.brickDark);
  s += rect(580, 200, 440, 55, C.brick, 0.8);
  s += rect(600, 160, 400, 45, C.brick, 0.7);
  s += rect(620, 120, 360, 45, C.brick, 0.6);
  // Roof curves
  s += svgPath(`M500 250 Q550 220 600 250 Q650 220 700 250 Q750 220 800 250`, C.accentDark, null, 0);
  s += svgPath(`M530 200 Q580 170 630 200 Q680 170 730 200 Q780 170 830 200`, C.accentDark, null, 0);
  // Roof tips
  s += svgPath(`M800 120 Q850 80 900 70`, null, C.accentDark, 4);

  // Ground
  s += ellipse(800, 900, 750, 40, C.grass, 0.6);
  s += rect(0, 850, W, 350, C.grass, 0.5);
  s += rect(0, 870, W, 330, C.greenDark, 0.4);

  // Trees
  s += circle(200, 600, 90, C.green, 0.6);
  s += rect(195, 600, 10, 120, C.woodDark);
  s += circle(280, 580, 65, C.greenDark, 0.6);
  s += rect(275, 580, 10, 100, C.woodDark);
  s += circle(1350, 620, 80, C.green, 0.6);
  s += rect(1345, 620, 10, 110, C.woodDark);

  // Cloud wisps
  s += ellipse(400, 100, 120, 30, C.white, 0.5);
  s += ellipse(1100, 80, 100, 25, C.white, 0.4);

  // Path
  s += ellipse(800, 920, 550, 25, '#D7CCC8', 0.5);

  // Students exploring
  s += floorShadow(500, 905, 35, 8);
  s += makeCharacter({x:500, y:815, skin:SKIN[2], hair:1, hairColor:HAIR[1], shirt:C.accent, pose:'point', scale:1.05});
  s += floorShadow(700, 905, 35, 8);
  s += makeCharacter({x:700, y:815, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.blue, pose:'stand', scale:1.0});
  s += floorShadow(900, 905, 35, 8);
  s += makeCharacter({x:900, y:815, skin:SKIN[7], hair:3, hairColor:HAIR[4], shirt:C.green, pose:'hold', scale:1.05});
  s += floorShadow(1100, 905, 35, 8);
  s += makeCharacter({x:1100, y:815, skin:SKIN[0], hair:4, hairColor:HAIR[5], shirt:C.purple, pose:'wave', scale:1.0});

  // Map & camera
  s += rect(650, 740, 60, 45, C.white, 0.8);
  s += rect(655, 745, 50, 35, '#FFF9C4', 0.6);
  s += rect(850, 745, 35, 25, C.text);

  return s;
}

function sceneDay09() {
  // Library study scene
  let s = rect(0,0,W,H,'#EFEBE9');
  s += rect(0, H*0.78, W, H*0.22, '#8D6E63');

  // Bookshelves
  for (let i = 0; i < 5; i++) {
    s += rect(50 + i*140, 80, 120, 700, C.wood, 0.5);
    s += rect(50 + i*140, 80, 120, 8, C.woodDark);
    for (let j = 0; j < 7; j++) {
      s += rect(60 + i*140, 100 + j*95, 100, 80, C.woodDark, 0.2);
      s += book(65 + i*140, 105 + j*95, 12, 70, C.blue);
      s += book(78 + i*140, 110 + j*95, 10, 65, C.accent);
      s += book(90 + i*140, 108 + j*95, 14, 68, C.green);
      s += book(105 + i*140, 112 + j*95, 10, 60, C.purple);
      s += book(116 + i*140, 106 + j*95, 8, 72, C.teal);
    }
  }

  // Arched windows
  s += svgPath(`M650 60 L650 300 L850 300 L850 60 Q750 0 650 60 Z`, C.window, null, 0);
  s += svgPath(`M650 60 L650 300 L850 300 L850 60 Q750 0 650 60 Z`, null, C.greyLight, 3);

  // Large study table
  s += table(300, 730, 1000, 20);
  s += rect(300, 710, 1000, 22, C.wood, 0.4);

  // Books & laptops on table
  s += book(350, 690, 18, 80, C.accent);
  s += book(380, 695, 15, 70, C.blue);
  s += laptopProp(550, 700, 0.9);
  s += book(700, 685, 20, 85, C.teal);
  s += laptopProp(850, 700, 0.9);
  s += book(1000, 692, 16, 75, C.purple);

  // Warm lamp light
  s += circle(1100, 650, 60, C.gold, 0.15);
  s += ellipse(1100, 650, 80, 50, C.gold, 0.08);

  // Students - diverse, studious
  s += floorShadow(500, 910, 30, 8);
  s += makeCharacter({x:500, y:820, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.blue, pose:'hold', scale:1.0});
  s += floorShadow(700, 910, 30, 8);
  s += makeCharacter({x:700, y:820, skin:SKIN[0], hair:1, hairColor:HAIR[1], shirt:C.accent, pose:'stand', scale:1.0});
  s += floorShadow(900, 910, 30, 8);
  s += makeCharacter({x:900, y:820, skin:SKIN[2], hair:3, hairColor:HAIR[3], shirt:C.green, pose:'point', scale:1.0});
  s += floorShadow(1100, 910, 30, 8);
  s += makeCharacter({x:1100, y:820, skin:SKIN[7], hair:4, hairColor:HAIR[4], shirt:C.purple, pose:'stand', scale:1.0});

  // Potted plant
  s += rect(1400, 740, 40, 50, C.brickDark);
  s += circle(1420, 720, 30, C.green, 0.7);
  s += circle(1405, 710, 20, C.greenDark, 0.6);

  return s;
}

function sceneDay10() {
  // Outdoor sports field
  let s = skyBg();
  s += rect(0, 600, W, 600, 'url(#gGrass)');

  // Field lines
  s += rect(0, 800, W, 2, C.white, 0.4);
  s += rect(700, 600, 2, 200, C.white, 0.3);

  // Campus buildings distant
  s += rect(100, 400, 800, 210, '#CFD8DC', 0.5);
  s += rect(1000, 380, 600, 230, '#B0BEC5', 0.5);

  // Trees
  s += circle(950, 480, 100, C.green, 0.6);
  s += rect(945, 480, 10, 80, C.woodDark);
  s += circle(150, 500, 80, C.greenDark, 0.6);
  s += rect(145, 500, 10, 70, C.woodDark);

  // Clouds
  s += ellipse(300, 80, 150, 35, C.white, 0.6);
  s += ellipse(1000, 60, 120, 30, C.white, 0.5);

  // Ground shadow
  s += ellipse(800, 900, 600, 60, C.greenDark, 0.2);

  // Students playing - frisbee action
  s += floorShadow(300, 890, 30, 8);
  s += makeCharacter({x:300, y:800, skin:SKIN[1], hair:1, hairColor:HAIR[2], shirt:C.accent, pose:'wave', scale:1.1}); // Latino boy jumping for frisbee
  s += floorShadow(600, 890, 30, 8);
  s += makeCharacter({x:600, y:800, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.blue, pose:'stand', scale:1.05});
  s += floorShadow(900, 890, 30, 8);
  s += makeCharacter({x:900, y:800, skin:SKIN[0], hair:3, hairColor:HAIR[1], shirt:C.teal, pose:'wave', scale:1.05});

  // Sitting on grass
  s += floorShadow(1150, 920, 40, 10);
  s += makeCharacter({x:1150, y:830, skin:SKIN[2], hair:4, hairColor:HAIR[4], shirt:C.purple, pose:'stand', scale:0.85});
  s += floorShadow(1350, 920, 35, 8);
  s += makeCharacter({x:1350, y:830, skin:SKIN[7], hair:1, hairColor:HAIR[3], shirt:C.green, pose:'stand', scale:0.85});

  // Frisbee in air
  s += ellipse(450, 720, 25, 10, C.accent);
  s += ellipse(450, 720, 20, 7, C.accentDark);

  // Soccer ball
  s += circle(1050, 870, 20, C.white);
  for (let i = 0; i < 5; i++) {
    const a = i * Math.PI * 0.8;
    s += svgPath(`M${1050 + Math.cos(a)*15} ${870 + Math.sin(a)*15} L${1050 - Math.cos(a)*15} ${870 - Math.sin(a)*15}`, null, C.grey, 2);
  }

  return s;
}

function sceneDay11() {
  // Sensor calibration lab
  let s = indoorBg('#ECEFF1', '#CFD8DC');

  // Sensor posters on wall
  s += rect(50, 50, 350, 200, C.white);
  s += rect(50, 50, 350, 5, C.greyLight);
  s += text(225, 90, '📡 Sensor Types', 20, C.text, 'middle', true);
  s += text(225, 130, '• Ultrasonic Distance', 16, C.blueDark);
  s += text(225, 160, '• Infrared Line Tracker', 16, C.accentDark);
  s += text(225, 190, '• Camera / Vision', 16, C.purpleDark);

  // Calibration station
  s += table(300, 700, 700, 15);

  // Robot with sensors
  s += robotProp(550, 650, 1.0);
  // Ultrasonic sensor on robot
  s += circle(570, 615, 6, C.accent);
  s += circle(570, 615, 2, C.white);

  // Calibration target
  s += rect(850, 600, 80, 120, C.white);
  s += rect(850, 600, 80, 3, C.grey);
  s += circle(890, 630, 10, C.red);
  s += circle(890, 660, 8, C.blue);
  s += circle(890, 690, 6, C.green);

  // Measurement lines
  s += svgPath(`M620 660 L620 720`, null, C.accent, 2);
  s += text(620, 740, '30cm', 12, C.accent);

  // Oscilloscope / display
  s += rect(1000, 580, 180, 120, '#263238');
  s += rect(1010, 590, 160, 100, '#1B5E20', 0.8);
  s += svgPath(`M1015 640 Q1050 600 1090 650 Q1130 700 1165 620`, null, C.teal, 2);

  // Students
  s += floorShadow(450, 870, 30, 8);
  s += makeCharacter({x:450, y:780, skin:SKIN[7], hair:4, hairColor:HAIR[4], shirt:C.blue, pose:'hold', scale:1.0});
  s += floorShadow(750, 870, 30, 8);
  s += makeCharacter({x:750, y:780, skin:SKIN[0], hair:1, hairColor:HAIR[1], shirt:C.accent, pose:'point', scale:1.0});

  // Clipboard / notes
  s += rect(420, 740, 60, 80, C.white, 0.9);
  s += rect(423, 745, 54, 3, C.greyLight);
  s += rect(423, 755, 40, 2, C.greyLight);
  s += rect(423, 765, 35, 2, C.greyLight);
  s += rect(423, 775, 45, 2, C.greyLight);

  // Laptop with data
  s += laptopProp(1050, 700, 0.8);

  return s;
}

function sceneDay12() {
  // Design Review / Judging
  let s = indoorBg(C.wallWarm, C.floor);

  // Review table
  s += table(200, 650, 1200, 20);
  s += rect(190, 640, 1220, 12, C.wood, 0.3);

  // Robot on table
  s += robotProp(500, 610, 1.1);

  // Engineering notebook
  s += rect(750, 600, 150, 90, C.white);
  s += rect(755, 605, 140, 80, '#FFF9C4', 0.5);
  s += rect(760, 612, 80, 3, C.greyLight);
  s += rect(760, 622, 100, 3, C.greyLight);
  s += rect(760, 632, 90, 3, C.greyLight);

  // Evaluation sheets
  s += rect(950, 600, 120, 85, C.white);
  s += rect(955, 605, 110, 4, C.accent);
  s += text(1010, 630, 'Score: ___/100', 14, C.textLight);
  s += text(1010, 655, 'Design: ___/25', 12, C.textLight);
  s += text(1010, 675, 'Build: ___/25', 12, C.textLight);

  // Presenter student
  s += floorShadow(350, 830, 30, 8);
  s += makeCharacter({x:350, y:740, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.accent, pose:'present', scale:1.05});

  // Mentors/judges
  s += floorShadow(850, 830, 30, 8);
  s += makeCharacter({x:850, y:740, skin:SKIN[0], hair:3, hairColor:HAIR[1], shirt:'#37474F', pose:'stand', scale:1.05});
  s += floorShadow(1100, 830, 30, 8);
  s += makeCharacter({x:1100, y:740, skin:SKIN[7], hair:1, hairColor:HAIR[4], shirt:'#455A64', pose:'hold', scale:1.0});

  // Other students observing
  s += floorShadow(1300, 830, 30, 8);
  s += makeCharacter({x:1300, y:740, skin:SKIN[2], hair:4, hairColor:HAIR[3], shirt:C.green, pose:'stand', scale:0.95});
  s += floorShadow(550, 830, 30, 8);
  s += makeCharacter({x:550, y:740, skin:SKIN[3], hair:0, hairColor:HAIR[5], shirt:C.purple, pose:'stand', scale:0.95});

  // "REVIEW DAY" on screen
  s += rect(50, 80, 350, 180, C.white);
  s += text(225, 180, '🔍 Design Review', 24, C.accentDark, 'middle', true);

  return s;
}

function sceneDay13() {
  // Final Presentation
  let s = rect(0,0,W,H,'#1A1A2E');
  s += rect(0,0,W,H*0.6,'#2D2D44',0.5);

  // Stage
  s += rect(100, 500, 1400, 20, C.wood);
  s += rect(100, 500, 1400, 8, C.woodDark);
  s += rect(100, 500, 1400, 400, '#263238', 0.4);

  // Stage lights
  s += circle(800, 20, 400, C.gold, 0.08);
  s += svgPath(`M800 20 L400 500 L1200 500 Z`, C.gold, 0.04);

  // Presentation screen
  s += rect(450, 100, 700, 380, C.white);
  s += rect(445, 95, 710, 10, C.greyLight);
  s += text(800, 280, '🤖 Final Showcase', 38, C.accentDark, 'middle', true);
  s += text(800, 340, 'Engineering · Design · Teamwork', 24, C.textLight);
  s += rect(550, 380, 250, 60, C.blue, 0.3);
  s += text(675, 420, 'Demo Video', 20, C.blueDark);

  // Podium
  s += rect(300, 430, 120, 100, C.wood);
  s += laptopProp(360, 415, 0.7);

  // Presenting team
  s += floorShadow(550, 580, 30, 8);
  s += makeCharacter({x:550, y:490, skin:SKIN[0], hair:1, hairColor:HAIR[1], shirt:C.accent, pose:'present', scale:1.05});
  s += floorShadow(750, 580, 30, 8);
  s += makeCharacter({x:750, y:490, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.blue, pose:'stand', scale:1.05});
  s += floorShadow(950, 580, 30, 8);
  s += makeCharacter({x:950, y:490, skin:SKIN[2], hair:3, hairColor:HAIR[5], shirt:C.teal, pose:'hold', scale:1.0});

  // Robot on stage
  s += robotProp(1150, 470, 0.9);

  // Audience (silhouettes in dark)
  for (let i = 0; i < 10; i++) {
    s += circle(200 + i*140, 900, 22, '#424242');
    s += rect(178 + i*140, 920, 44, 50, '#424242');
  }

  // Banner
  s += rect(500, 480, 600, 35, C.gold, 0.85);
  s += text(800, 505, 'AI + ROBOTICS · FINAL SHOWCASE', 20, C.text, 'middle', true);

  return s;
}

function sceneDay14() {
  // Road Trip 2A - cheerful, looking forward
  let s = skyBg();
  s += rect(0, 650, W, 550, 'url(#gGrass)');

  // University campus distant
  s += rect(200, 400, 1200, 260, '#B0BEC5', 0.6);
  s += rect(300, 350, 1000, 60, '#90A4AE', 0.7);

  // Pathway
  s += ellipse(800, 880, 700, 30, '#D7CCC8', 0.5);

  // Trees
  s += circle(150, 520, 90, C.green, 0.6);
  s += rect(145, 520, 10, 100, C.woodDark);
  s += circle(1450, 500, 80, C.greenDark, 0.6);
  s += rect(1445, 500, 10, 90, C.woodDark);

  // Golden light particles
  for (let i = 0; i < 15; i++) {
    s += circle(300 + Math.random()*1000, 200 + Math.random()*400, 2 + Math.random()*3, C.gold, 0.4);
  }

  // Students - cheerful group walking forward
  s += floorShadow(400, 860, 40, 10);
  s += makeCharacter({x:400, y:770, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.accent, pose:'wave', scale:1.1});
  s += floorShadow(600, 860, 40, 10);
  s += makeCharacter({x:600, y:770, skin:SKIN[0], hair:1, hairColor:HAIR[1], shirt:C.blue, pose:'stand', scale:1.1});
  s += floorShadow(800, 860, 40, 10);
  s += makeCharacter({x:800, y:770, skin:SKIN[7], hair:3, hairColor:HAIR[4], shirt:C.green, pose:'wave', scale:1.1});
  s += floorShadow(1000, 860, 40, 10);
  s += makeCharacter({x:1000, y:770, skin:SKIN[2], hair:4, hairColor:HAIR[3], shirt:C.purple, pose:'point', scale:1.05});
  s += floorShadow(1200, 860, 40, 10);
  s += makeCharacter({x:1200, y:770, skin:SKIN[3], hair:0, hairColor:HAIR[5], shirt:C.teal, pose:'stand', scale:1.1});

  // Arms linked
  s += svgPath(`M432 740 Q530 730 600 740`, null, C.accent, 3);
  s += svgPath(`M832 740 Q930 730 1000 740`, null, C.purple, 3);

  return s;
}

function sceneDay15() {
  // Road Trip 2B - scenic overlook, gazing at horizon
  let s = skyBg();
  s += gradDef('gSunset','#FF8A65','#FFCCBC');
  s += rect(0, 450, W, 250, 'url(#gSunset)', 0.3);

  // Mountains distant
  s += svgPath(`M0 600 L200 350 L400 480 L600 300 L800 450 L1000 280 L1200 420 L1400 320 L1600 550 L1600 800 L0 800 Z`, '#90A4AE', 0.5);
  s += svgPath(`M0 650 L300 450 L500 550 L700 400 L900 520 L1100 380 L1300 500 L1600 420 L1600 800 L0 800 Z`, '#78909C', 0.4);

  // Scenic viewpoint railing
  s += rect(0, 720, W, 8, C.wood);
  s += rect(100, 720, 8, 80, C.wood);
  s += rect(500, 720, 8, 80, C.wood);
  s += rect(900, 720, 8, 80, C.wood);
  s += rect(1300, 720, 8, 80, C.wood);
  s += rect(0, 800, W, 400, C.grass, 0.7);

  // Clouds
  s += ellipse(300, 120, 180, 40, C.white, 0.5);
  s += ellipse(1200, 100, 140, 35, C.white, 0.4);

  // Sun glow
  s += circle(800, 500, 60, C.gold, 0.5);
  s += circle(800, 500, 100, C.gold, 0.2);
  s += circle(800, 500, 160, C.gold, 0.1);

  // Students at viewpoint - happy, gazing
  s += floorShadow(400, 790, 35, 8);
  s += makeCharacter({x:400, y:700, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.accent, pose:'point', scale:1.05});
  s += floorShadow(600, 790, 35, 8);
  s += makeCharacter({x:600, y:700, skin:SKIN[0], hair:3, hairColor:HAIR[1], shirt:C.blue, pose:'wave', scale:1.05});
  s += floorShadow(800, 790, 35, 8);
  s += makeCharacter({x:800, y:700, skin:SKIN[7], hair:1, hairColor:HAIR[4], shirt:C.green, pose:'stand', scale:1.0});
  s += floorShadow(1000, 790, 35, 8);
  s += makeCharacter({x:1000, y:700, skin:SKIN[1], hair:4, hairColor:HAIR[3], shirt:C.purple, pose:'stand', scale:1.05});
  s += floorShadow(1200, 790, 35, 8);
  s += makeCharacter({x:1200, y:700, skin:SKIN[2], hair:1, hairColor:HAIR[5], shirt:C.teal, pose:'point', scale:1.05});

  // Cameras
  s += rect(550, 640, 35, 25, C.text);
  s += rect(900, 640, 35, 25, C.text);

  // Group photo pose
  s += svgPath(`M760 690 Q800 670 840 690`, null, C.accentDark, 3);

  return s;
}

function sceneDay16() {
  // Dorm lobby - cozy evening social
  let s = rect(0,0,W,H,'#3E2723');
  s += rect(0,0,W,H*0.8,'#5D4037',0.7);
  s += rect(0,H*0.78,W,H*0.22,C.floor);

  // Warm atmosphere glow
  s += circle(800, 300, 500, '#FF8A65', 0.08);

  // String lights
  for (let i = 0; i < 12; i++) {
    s += svgPath(`M${80 + i*125} 20 Q${80 + i*125 + 60} 60 ${80 + i*125 + 120} 20`, null, C.gold, 1.5);
    s += circle(80 + i*125, 20, 5, C.gold, 0.8);
    s += circle(80 + i*125, 20, 2, C.white, 0.9);
  }

  // Big window showing night
  s += rect(600, 80, 400, 250, C.night, 0.5);
  s += rect(600, 80, 400, 6, C.wood);
  s += circle(750, 180, 20, C.gold, 0.5); // moon
  for (let i = 0; i < 8; i++) {
    s += circle(650 + Math.random()*300, 120 + Math.random()*180, 1.5, C.white, 0.5);
  }

  // Sofas
  s += rect(80, 600, 400, 100, C.accent, 0.5);
  s += rect(80, 600, 400, 15, C.accent, 0.7);
  s += rect(400, 600, 60, 120, C.accent, 0.5);
  s += rect(80, 720, 460, 25, C.accentDark, 0.5);

  s += rect(1000, 650, 500, 90, C.teal, 0.5);
  s += rect(1000, 650, 500, 12, C.teal, 0.7);
  s += rect(1000, 650, 40, 110, C.teal, 0.5);
  s += rect(1000, 760, 540, 20, C.tealDark, 0.5);

  // Coffee table
  s += table(550, 700, 200, 12);
  s += rect(580, 675, 40, 25, C.white, 0.7); // drink
  s += rect(660, 680, 30, 20, C.accent, 0.5); // snack

  // Floor lamp
  s += rect(1400, 400, 8, 300, C.grey);
  s += svgPath(`M1396 400 Q1404 350 1430 340 L1450 340 Q1480 350 1412 400 Z`, C.gold, 0.7);
  s += circle(1420, 500, 120, C.gold, 0.06);

  // Students on sofas - diverse, with laptops
  s += floorShadow(250, 810, 40, 10);
  s += makeCharacter({x:250, y:710, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.blue, pose:'hold', scale:1.0});
  s += laptopProp(240, 680, 0.7);
  s += floorShadow(450, 810, 35, 8);
  s += makeCharacter({x:450, y:710, skin:SKIN[0], hair:1, hairColor:HAIR[1], shirt:C.gold, pose:'stand', scale:1.0});

  s += floorShadow(1150, 830, 35, 8);
  s += makeCharacter({x:1150, y:740, skin:SKIN[2], hair:3, hairColor:HAIR[5], shirt:C.purple, pose:'hold', scale:0.95});
  s += laptopProp(1130, 710, 0.65);
  s += floorShadow(1350, 830, 35, 8);
  s += makeCharacter({x:1350, y:740, skin:SKIN[7], hair:4, hairColor:HAIR[4], shirt:C.accent, pose:'stand', scale:0.95});

  // Beanbag
  s += ellipse(750, 780, 55, 35, C.green, 0.5);

  // Backpacks on floor
  s += backpack(180, 800, 0.6);
  s += backpack(1300, 810, 0.6);

  return s;
}

function sceneDay17() {
  // Robot Competition - dynamic, action
  let s = rect(0,0,W,H,'#1A1A2E');
  s += rect(0,0,W,H*0.6,'#263238',0.5);

  // Arena
  s += rect(100, 450, 1400, 450, '#37474F');
  s += rect(100, 450, 1400, 5, C.teal);
  s += rect(100, 895, 1400, 5, C.teal);
  s += rect(100, 450, 5, 450, C.teal);
  s += rect(1495, 450, 5, 450, C.teal);

  // Arena markings
  s += rect(800, 450, 3, 450, C.white, 0.2);
  s += circle(800, 675, 120, null, C.white, 0.15);
  s += svgPath(`M300 450 L300 900 M500 450 L500 900 M1100 450 L1100 900 M1300 450 L1300 900`, null, C.white, 0.08);

  // Obstacles
  s += rect(450, 600, 50, 50, C.accent, 0.5);
  s += rect(1100, 700, 45, 45, C.teal, 0.5);
  s += circle(700, 800, 20, C.gold, 0.5);

  // LED strips around arena
  s += rect(100, 445, 1400, 5, C.teal);
  s += rect(100, 900, 1400, 5, C.teal);

  // Scoreboard
  s += rect(550, 60, 500, 120, '#212121');
  s += rect(555, 65, 490, 110, '#263238');
  s += text(800, 100, '🤖 ROBOTICS COMPETITION', 28, C.gold, 'middle', true);
  s += text(650, 155, 'TEAM A: 85', 24, C.teal, 'middle', true);
  s += text(950, 155, 'TEAM B: 72', 24, C.accent, 'middle', true);

  // Motion lines for speed
  s += svgPath(`M200 580 L300 580 M180 600 L280 600 M220 560 L290 560`, null, C.white, 1.5);

  // Robot 1 - in action
  s += robotProp(450, 680, 1.1);
  // Motion lines
  s += svgPath(`M410 650 L350 650 M415 670 L360 670 M415 690 L370 690`, null, C.teal, 2);

  // Robot 2
  s += robotProp(1150, 720, 1.0);
  s += svgPath(`M1190 690 L1240 690 M1190 710 L1250 710`, null, C.accent, 2);

  // Student competitors
  s += floorShadow(300, 940, 30, 8);
  s += makeCharacter({x:300, y:850, skin:SKIN[0], hair:1, hairColor:HAIR[1], shirt:C.accent, pose:'hold', scale:1.05});

  s += floorShadow(1300, 940, 30, 8);
  s += makeCharacter({x:1300, y:850, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.blue, pose:'point', scale:1.05});

  // Tablet with telemetry
  s += rect(1250, 780, 55, 70, C.greyLight, 0.9);
  s += rect(1255, 785, 45, 60, '#1B5E20', 0.7);
  s += text(1277, 810, 'SPD', 10, C.teal);
  s += text(1277, 830, '85%', 12, C.teal, 'middle', true);

  // Cheering crowd silhouettes
  for (let i = 0; i < 20; i++) {
    const cx = 120 + i * 70;
    s += circle(cx, 400, 16, '#546E7A');
    s += rect(cx-15, 415, 30, 40, '#546E7A');
  }

  // Spotlight effects
  s += svgPath(`M800 200 L300 450 L1300 450 Z`, C.gold, 0.03);

  // Confetti
  for (let i = 0; i < 30; i++) {
    const cx = 200 + Math.random() * 1200;
    const cy = 300 + Math.random() * 500;
    const colors = [C.accent, C.teal, C.gold, C.blue, C.purple, C.green];
    s += rect(cx, cy, 6, 8, colors[Math.floor(Math.random()*colors.length)], 0.6);
  }

  return s;
}

function sceneDay18() {
  // Science & Technology Museum
  let s = rect(0,0,W,H,'#ECEFF1');
  s += rect(0,0,W,H*0.2,'#37474F');
  s += rect(0,H*0.78,W,H*0.22,'#78909C');

  // Museum ceiling architecture
  s += svgPath(`M0 0 L300 240 L800 300 L1300 240 L1600 0 Z`, '#455A64', 0.3);
  s += rect(500, 80, 600, 8, C.white, 0.3);

  // Holographic globe exhibit
  s += circle(400, 550, 80, C.blue, 0.12);
  s += circle(400, 550, 60, C.blue, 0.15);
  s += circle(400, 550, 40, C.teal, 0.2);
  s += svgPath(`M400 470 Q440 550 400 630 M360 510 Q400 550 440 590 M360 590 Q400 550 440 510`, null, C.white, 0.3);
  s += rect(380, 630, 40, 50, C.grey);
  s += circle(400, 630, 8, C.blue, 0.5);

  // Big touchscreen display
  s += rect(850, 300, 500, 380, '#263238');
  s += rect(860, 310, 480, 360, '#1565C0', 0.7);
  s += text(1100, 450, '🤖 AI + Robotics', 28, C.white, 'middle', true);
  s += text(1100, 500, 'History of Artificial Intelligence', 18, C.white, 'middle', false);
  s += rect(900, 530, 300, 8, C.teal, 0.6);
  s += rect(900, 550, 220, 6, C.accent, 0.5);
  s += rect(900, 570, 350, 6, C.green, 0.5);
  s += circle(1080, 590, 30, C.white, 0.3);
  s += text(1080, 596, '▶', 20, C.white);

  // Humanoid robot exhibit
  s += rect(1300, 500, 60, 90, C.greyLight, 0.7);
  s += circle(1330, 480, 25, C.greyLight, 0.7);
  s += circle(1320, 475, 4, C.teal);
  s += circle(1340, 475, 4, C.teal);
  s += rect(1310, 590, 40, 60, C.grey, 0.4);
  s += rect(1310, 590, 40, 5, C.grey);

  // Students exploring
  s += floorShadow(400, 870, 30, 8);
  s += makeCharacter({x:400, y:780, skin:SKIN[1], hair:4, hairColor:HAIR[2], shirt:C.accent, pose:'point', scale:1.0});
  s += floorShadow(600, 870, 30, 8);
  s += makeCharacter({x:600, y:780, skin:SKIN[2], hair:3, hairColor:HAIR[5], shirt:C.purple, pose:'stand', scale:1.0});
  s += floorShadow(1000, 870, 30, 8);
  s += makeCharacter({x:1000, y:780, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.blue, pose:'hold', scale:1.0});
  s += floorShadow(1200, 870, 30, 8);
  s += makeCharacter({x:1200, y:780, skin:SKIN[7], hair:1, hairColor:HAIR[4], shirt:C.green, pose:'wave', scale:1.0});
  s += floorShadow(1400, 870, 30, 8);
  s += makeCharacter({x:1400, y:780, skin:SKIN[3], hair:0, hairColor:HAIR[1], shirt:C.teal, pose:'stand', scale:1.0});

  return s;
}

function sceneDay19() {
  // Farewell Dinner & Awards
  let s = rect(0,0,W,H,'#1A1A2E');
  s += rect(0,0,W,H,'#2D1B4E',0.7);
  s += rect(0, H*0.8, W, H*0.2, C.floor);

  // Chandeliers
  for (let i = 0; i < 5; i++) {
    const cx = 200 + i * 320;
    s += circle(cx, 80, 50, C.gold, 0.1);
    s += circle(cx, 80, 25, C.gold, 0.2);
    s += svgPath(`M${cx} 0 L${cx-40} 60`, null, C.gold, 1);
    s += svgPath(`M${cx} 0 L${cx+40} 60`, null, C.gold, 1);
  }

  // Stage with banner
  s += rect(400, 300, 800, 30, C.woodDark);
  s += rect(400, 300, 800, 250, '#3E2723', 0.5);
  s += rect(500, 260, 600, 50, C.gold, 0.85);
  s += text(800, 295, '🏆 CLOSING CEREMONY', 28, C.text, 'middle', true);

  // Mentor on stage giving award
  s += floorShadow(600, 610, 30, 8);
  s += makeCharacter({x:600, y:520, skin:SKIN[0], hair:3, hairColor:HAIR[1], shirt:'#37474F', pose:'stand', scale:1.1});

  // Student receiving certificate
  s += floorShadow(850, 610, 30, 8);
  s += makeCharacter({x:850, y:520, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.accent, pose:'hold', scale:1.1});

  // Certificate being handed
  s += rect(730, 440, 100, 70, C.white, 0.9);
  s += rect(735, 445, 90, 4, C.gold);
  s += text(780, 475, 'Certificate', 14, C.textLight);
  s += text(780, 495, 'of Excellence', 12, C.textLight);

  // Medal
  s += circle(900, 435, 12, C.gold);
  s += circle(900, 435, 8, C.goldDark);
  s += text(900, 440, '★', 10, C.white);

  // Round dining tables with guests
  for (let t = 0; t < 3; t++) {
    const tx = 250 + t * 550;
    s += ellipse(tx, 850, 120, 30, C.wood, 0.4);
    s += ellipse(tx, 845, 130, 28, C.white, 0.4);

    const skins = [[SKIN[2],SKIN[7],SKIN[1]],[SKIN[3],SKIN[0],SKIN[5]],[SKIN[7],SKIN[2],SKIN[3]]];
    for (let g = 0; g < 3; g++) {
      const angle = (g/3)*Math.PI - Math.PI/2;
      s += circle(tx + Math.cos(angle)*90, 810 + Math.sin(angle)*20, 14, skins[t][g]);
    }
  }

  // Confetti / celebration
  for (let i = 0; i < 40; i++) {
    const cx = Math.random() * W;
    const cy = 200 + Math.random() * 600;
    const colors = [C.gold, C.accent, C.teal, C.blue, C.purple, C.green, C.red];
    s += rect(cx, cy, 4, 7, colors[Math.floor(Math.random()*colors.length)], 0.7);
  }

  // Warm glow
  s += circle(800, 500, 500, C.gold, 0.06);

  return s;
}

function sceneDay20() {
  // Airport departure
  let s = rect(0,0,W,H,'#E8EAF6');
  s += rect(0, H*0.8, W, H*0.2, '#B0BEC5');

  // Terminal architecture
  s += rect(0, 0, W, 150, '#37474F', 0.3);
  s += svgPath(`M0 150 L200 60 L600 80 L1000 50 L1400 70 L1600 150 Z`, '#ECEFF1', 0.5);

  // Large windows
  s += windowRect(50, 100, 350, 500);
  s += windowRect(450, 100, 350, 500);
  s += windowRect(850, 100, 350, 500);
  s += windowRect(1250, 100, 350, 500);

  // Airport interior light
  s += rect(0, 150, W, H-150, C.white, 0.4);

  // Plane visible through windows
  s += svgPath(`M120 400 L300 350 L500 350 L400 420 Z`, C.white, 0.8);
  s += ellipse(350, 360, 160, 20, C.white, 0.7);
  s += ellipse(350, 360, 140, 14, '#E3F2FD', 0.6);

  // Departure board
  s += rect(50, 600, 300, 160, '#212121');
  s += rect(55, 605, 290, 150, '#263238');
  s += text(200, 635, 'DEPARTURES', 18, C.gold, 'middle', true);
  s += text(120, 670, 'CX888  TOKYO', 16, C.white);
  s += text(120, 700, 'UA858  SF', 16, C.white);
  s += text(120, 730, 'BA168  LONDON', 16, C.white);
  s += text(250, 670, 'BOARDING', 14, C.green);
  s += text(250, 700, 'ON TIME', 14, C.white);
  s += text(250, 730, 'DELAYED', 14, C.accent);

  // Gate sign
  s += rect(650, 160, 300, 80, C.blue);
  s += text(800, 210, 'GATE B24', 32, C.white, 'middle', true);

  // Main character - girl with luggage at gate
  s += floorShadow(750, 870, 40, 12);
  s += makeCharacter({x:750, y:770, skin:SKIN[0], hair:1, hairColor:HAIR[1], shirt:C.accent, pose:'stand', scale:1.15});

  // Rolling suitcase
  s += rect(820, 830, 35, 55, C.purple, 0.8);
  s += rect(818, 830, 39, 8, C.purpleDark);
  s += circle(828, 890, 6, C.grey);
  s += circle(848, 890, 6, C.grey);
  s += rect(835, 820, 5, 20, C.grey);

  // Camp t-shirt
  s += text(760, 820, 'CAMP', 10, C.white, 'middle', true);

  // Other students in background (blurred/smaller)
  s += floorShadow(1100, 870, 25, 6);
  s += makeCharacter({x:1100, y:780, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.blue, pose:'wave', scale:0.8});
  s += floorShadow(1300, 870, 25, 6);
  s += makeCharacter({x:1300, y:780, skin:SKIN[2], hair:3, hairColor:HAIR[5], shirt:C.green, pose:'stand', scale:0.8});

  // Luggage in background
  s += rect(1080, 830, 25, 40, C.blue, 0.7);
  s += rect(1280, 835, 20, 35, C.accent, 0.7);

  // Morning light rays
  for (let i = 0; i < 8; i++) {
    s += svgPath(`M${400 + i*120} 100 L${350 + i*120} 800 L${450 + i*120} 800 Z`, C.gold, 0.03);
  }

  return s;
}

function sceneHero() {
  // Hero image - diverse group around workbench
  let s = rect(0, 0, W, H, '#ECEFF1');
  s += rect(0, 0, W, H, C.wallWarm, 0.5);

  // Windows showing campus
  s += windowRect(50, 80, 350, 350);
  s += windowRect(1200, 80, 350, 350);

  // Modern lab background
  s += rect(0, H*0.7, W, H*0.3, C.floor);

  // Large workbench
  s += table(200, 650, 1200, 25);
  s += rect(190, 640, 1220, 12, C.wood, 0.3);

  // Robot on workbench (centerpiece)
  s += rect(700, 520, 200, 120, C.blue, 0.8);
  s += rect(720, 500, 160, 25, C.blueDark);
  s += circle(740, 660, 25, C.grey);
  s += circle(860, 660, 25, C.grey);
  s += circle(740, 660, 10, C.greyLight);
  s += circle(860, 660, 10, C.greyLight);
  s += circle(780, 560, 12, C.teal);
  s += circle(820, 560, 12, C.teal);
  s += circle(778, 558, 5, C.white);
  s += circle(818, 558, 5, C.white);
  // Robot arm
  s += svgPath(`M890 540 L960 470`, null, C.blueDark, 8);
  s += circle(960, 465, 10, C.accent);

  // Laptops & tools on bench
  s += laptopProp(400, 620, 0.9);
  s += laptopProp(1100, 620, 0.85);
  s += rect(550, 600, 80, 60, C.greyLight, 0.7);
  s += rect(900, 610, 50, 40, C.accent, 0.4);

  // Team of 5 diverse students
  s += floorShadow(350, 850, 40, 12);
  s += makeCharacter({x:350, y:750, skin:SKIN[0], hair:3, hairColor:HAIR[1], shirt:C.accent, pose:'hold', scale:1.2}); // East Asian girl - coding

  s += floorShadow(550, 850, 40, 12);
  s += makeCharacter({x:550, y:750, skin:SKIN[5], hair:2, hairColor:HAIR[0], shirt:C.teal, pose:'stand', scale:1.2}); // Black boy

  s += floorShadow(750, 850, 40, 12);
  s += makeCharacter({x:750, y:750, skin:SKIN[7], hair:4, hairColor:HAIR[4], shirt:C.purple, pose:'point', scale:1.15}); // White girl

  s += floorShadow(950, 850, 40, 12);
  s += makeCharacter({x:950, y:750, skin:SKIN[2], hair:1, hairColor:HAIR[5], shirt:C.green, pose:'stand', scale:1.2}); // South Asian boy

  s += floorShadow(1150, 850, 40, 12);
  s += makeCharacter({x:1150, y:750, skin:SKIN[3], hair:1, hairColor:HAIR[3], shirt:C.blue, pose:'present', scale:1.15}); // Middle Eastern girl

  // Tablet
  s += rect(1100, 680, 55, 70, C.greyLight, 0.9);
  s += rect(1105, 685, 45, 60, C.white, 0.8);
  s += text(1127, 715, '📊', 20);

  // Top copy space area
  s += rect(0, 0, W, 200, C.text, 0.08);

  // Inspirational feel - warm light
  s += circle(800, 200, 800, C.gold, 0.05);

  return s;
}

// ── MAIN GENERATOR ─────────────────────────────
const SCENES = {
  'day-01.png': sceneDay01,
  'day-02.png': sceneDay02,
  'day-03.png': sceneDay03,
  'day-04.png': sceneDay04,
  'day-05.png': sceneDay05,
  'day-06.png': sceneDay06,
  'day-07.png': sceneDay07,
  'day-08.png': sceneDay08,
  'day-09.png': sceneDay09,
  'day-10.png': sceneDay10,
  'day-11.png': sceneDay11,
  'day-12.png': sceneDay12,
  'day-13.png': sceneDay13,
  'day-14.png': sceneDay14,
  'day-15.png': sceneDay15,
  'day-16.png': sceneDay16,
  'day-17.png': sceneDay17,
  'day-18.png': sceneDay18,
  'day-19.png': sceneDay19,
  'day-20.png': sceneDay20,
  'hero-ai-robotics.png': sceneHero,
};

async function renderScene(name, sceneFn) {
  const body = gradients() + sceneFn();
  const svgString = svg(body);

  // Remove the old file first
  const outPath = path.join(OUT, name);
  try { fs.unlinkSync(outPath); } catch(e) {}

  await sharp(Buffer.from(svgString))
    .png({ compressionLevel: 6 })
    .resize(W, H, { fit: 'fill' })
    .toFile(outPath);

  const stats = fs.statSync(outPath);
  console.log(`  ✅ ${name} (${(stats.size / 1024).toFixed(1)} KB)`);
}

async function main() {
  console.log('🎨 Generating Cartoon-Style Illustrations\n');
  console.log(`Style: Modern flat illustration, diverse characters`);
  console.log(`Size: ${W}×${H}px`);
  console.log(`Output: ${OUT}\n`);

  const entries = Object.entries(SCENES);
  let done = 0;

  for (const [name, fn] of entries) {
    console.log(`[${done + 1}/${entries.length}] ${name}`);
    await renderScene(name, fn);
    done++;
  }

  console.log(`\n🎉 Complete! ${done} illustrations generated.`);
  console.log(`📂 ${OUT}`);

  // List
  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.png')).sort();
  files.forEach(f => {
    const stats = fs.statSync(path.join(OUT, f));
    console.log(`   ${stats.size > 1000 ? '✅' : '⚠️'} ${f} (${(stats.size/1024).toFixed(1)} KB)`);
  });
}

main().catch(console.error);
