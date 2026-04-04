// ══════════════════════════════════════════════
// CONFIG
// ══════════════════════════════════════════════
const SUPABASE_URL = "https://gcanfgcumemeeisvlwfx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYW5mZ2N1bWVtZWVpc3Zsd2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTU2MjEsImV4cCI6MjA5MDE3MTYyMX0.7SfvfFfguaoSi58N9cuP26I-f4qYLgIXwLseUWBnQw4";
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// ══════════════════════════════════════════════
// WEAPON CATALOGUE
// ══════════════════════════════════════════════
const ALL_WEAPONS = [
  // ── TIER 1 – Starter (free) ──
  { name: "Shuriken",         emoji: "⭐", dmg: 5,  tier: 1, cost: 0    },
  { name: "Kunai",            emoji: "🔪", dmg: 5,  tier: 1, cost: 0    },
  { name: "Kama",             emoji: "🌙", dmg: 6,  tier: 1, cost: 0    },
  { name: "Tekko",            emoji: "🥊", dmg: 6,  tier: 1, cost: 0    },
  { name: "Sai",              emoji: "🔱", dmg: 7,  tier: 1, cost: 0    },
  { name: "Fukiya",           emoji: "🎋", dmg: 7,  tier: 1, cost: 0    },
  { name: "Tessen",           emoji: "🪭", dmg: 8,  tier: 1, cost: 0    },
  { name: "Jitte",            emoji: "🔀", dmg: 8,  tier: 1, cost: 0    },
  { name: "Hanbo",            emoji: "🪄", dmg: 9,  tier: 1, cost: 0    },
  { name: "Rokushakubo",      emoji: "🎴", dmg: 9,  tier: 1, cost: 0    },
  { name: "Kanabo",           emoji: "🏏", dmg: 10, tier: 1, cost: 0    },
  { name: "Tetsubo",          emoji: "🪵", dmg: 10, tier: 1, cost: 0    },
  // T1 extras
  { name: "Hira-shuriken",    emoji: "💠", dmg: 5,  tier: 1, cost: 0    },
  { name: "Senban-shuriken",  emoji: "🌟", dmg: 5,  tier: 1, cost: 0    },
  { name: "Makibishi",        emoji: "🔘", dmg: 6,  tier: 1, cost: 0    },
  { name: "Tekagi",           emoji: "🤚", dmg: 6,  tier: 1, cost: 0    },
  { name: "Bo-shuriken",      emoji: "📍", dmg: 7,  tier: 1, cost: 0    },
  { name: "Kaiken",           emoji: "🔺", dmg: 7,  tier: 1, cost: 0    },
  { name: "Manriki-gusari",   emoji: "⛓️", dmg: 8,  tier: 1, cost: 0    },
  { name: "Chigiriki",        emoji: "🔩", dmg: 8,  tier: 1, cost: 0    },
  { name: "Kusarigama",       emoji: "🔗", dmg: 9,  tier: 1, cost: 0    },
  { name: "Nunchaku",         emoji: "🔄", dmg: 9,  tier: 1, cost: 0    },
  // ── New Greek T1 ──
  { name: "Xiphos",           emoji: "🗡️", dmg: 6,  tier: 1, cost: 0    },
  { name: "Kopis",            emoji: "⚔️", dmg: 7,  tier: 1, cost: 0    },
  { name: "Makaira",          emoji: "🌙", dmg: 8,  tier: 1, cost: 0    },
  { name: "Falcata",          emoji: "🔱", dmg: 8,  tier: 1, cost: 0    },
  { name: "Dory",             emoji: "📌", dmg: 7,  tier: 1, cost: 0    },
  { name: "Akontion",         emoji: "🎯", dmg: 6,  tier: 1, cost: 0    },
  { name: "Labrys",           emoji: "🪓", dmg: 9,  tier: 1, cost: 0    },
  { name: "Cestus",           emoji: "🥊", dmg: 6,  tier: 1, cost: 0    },
  { name: "Sling",            emoji: "🪃", dmg: 5,  tier: 1, cost: 0    },
  { name: "Sica",             emoji: "🔪", dmg: 7,  tier: 1, cost: 0    },
  { name: "Krypteia Dagger",  emoji: "🌑", dmg: 6,  tier: 1, cost: 0    },

  // ── TIER 2 – Iron (80🪙) ──
  { name: "Katana",           emoji: "🥷", dmg: 10, tier: 2, cost: 80   },
  { name: "Kodachi",          emoji: "🗡️", dmg: 10, tier: 2, cost: 80   },
  { name: "Yari",             emoji: "📌", dmg: 10, tier: 2, cost: 80   },
  { name: "Naginata",         emoji: "🌀", dmg: 10, tier: 2, cost: 80   },
  { name: "Tachi",            emoji: "🌊", dmg: 11, tier: 2, cost: 80   },
  { name: "Uchigatana",       emoji: "🌸", dmg: 11, tier: 2, cost: 80   },
  { name: "Ono",              emoji: "🪓", dmg: 11, tier: 2, cost: 80   },
  { name: "Nagamaki",         emoji: "🌿", dmg: 11, tier: 2, cost: 80   },
  { name: "Manriki",          emoji: "⛓️", dmg: 10, tier: 2, cost: 80   },
  { name: "Chokuto",          emoji: "🗡️", dmg: 11, tier: 2, cost: 80   },
  // New Greek T2
  { name: "Sarissa",          emoji: "🔱", dmg: 11, tier: 2, cost: 80   },
  { name: "Kontos",           emoji: "🏇", dmg: 10, tier: 2, cost: 80   },
  { name: "Mace",             emoji: "🔨", dmg: 10, tier: 2, cost: 80   },
  { name: "Bow & Arrow",      emoji: "🏹", dmg: 11, tier: 2, cost: 80   },
  { name: "Kestros",          emoji: "🎯", dmg: 11, tier: 2, cost: 80   },
  { name: "Rhomphaia",        emoji: "⚔️", dmg: 11, tier: 2, cost: 80   },

  // ── TIER 3 – Steel (200🪙) ──
  { name: "Nodachi",          emoji: "🌑", dmg: 11, tier: 3, cost: 200  },
  { name: "Kyoketsu-shoge",   emoji: "🕸️", dmg: 11, tier: 3, cost: 200  },
  { name: "Hoko Yari",        emoji: "☄️", dmg: 12, tier: 3, cost: 200  },
  { name: "Jumonji Yari",     emoji: "✚",  dmg: 12, tier: 3, cost: 200  },
  { name: "Sankaku Yari",     emoji: "🔻", dmg: 12, tier: 3, cost: 200  },
  { name: "Sasaho Yari",      emoji: "🪬", dmg: 12, tier: 3, cost: 200  },
  { name: "Odachi",           emoji: "⚡", dmg: 12, tier: 3, cost: 200  },
  { name: "Yumi",             emoji: "🏹", dmg: 12, tier: 3, cost: 200  },
  { name: "Hankyu",           emoji: "🎯", dmg: 11, tier: 3, cost: 200  },
  { name: "Daikyu",           emoji: "🎑", dmg: 12, tier: 3, cost: 200  },

  // ── TIER 4 – Shadow (400🪙) ──
  { name: "Kabutowari",       emoji: "👑", dmg: 13, tier: 4, cost: 400  },
  { name: "Hachiwari",        emoji: "💎", dmg: 13, tier: 4, cost: 400  },
  { name: "Kusari-fundo",     emoji: "💫", dmg: 13, tier: 4, cost: 400  },
  { name: "Shikomizue",       emoji: "🐍", dmg: 13, tier: 4, cost: 400  },
  { name: "Gunbai",           emoji: "🛡️", dmg: 13, tier: 4, cost: 400  },
  { name: "Tanegashima",      emoji: "🔫", dmg: 13, tier: 4, cost: 400  },
  { name: "Wakizashi",        emoji: "🩸", dmg: 13, tier: 4, cost: 400  },
  { name: "Tanto",            emoji: "🌙", dmg: 13, tier: 4, cost: 400  },
  { name: "Masakari",         emoji: "🐉", dmg: 13, tier: 4, cost: 400  },
  { name: "Kanemuchi",        emoji: "🔥", dmg: 13, tier: 4, cost: 400  },

  // ── TIER 5 – Legendary (800🪙) ──
  { name: "Metsubushi",       emoji: "💥", dmg: 14, tier: 5, cost: 800  },
  { name: "Bisento",          emoji: "🐲", dmg: 14, tier: 5, cost: 800  },
  { name: "Sasumata",         emoji: "🦅", dmg: 14, tier: 5, cost: 800  },
  { name: "Makura Yari",      emoji: "🌙", dmg: 14, tier: 5, cost: 800  },
  { name: "Kiseru",           emoji: "🪬", dmg: 14, tier: 5, cost: 800  },
  { name: "Naginata-kamayari",emoji: "🌀", dmg: 14, tier: 5, cost: 800  },
  { name: "Jutte",            emoji: "⚜️", dmg: 14, tier: 5, cost: 800  },
  { name: "Kaginawa",         emoji: "🪝", dmg: 14, tier: 5, cost: 800  },
  { name: "Teporenki",        emoji: "🔱", dmg: 14, tier: 5, cost: 800  },
  { name: "Shinobi-zue",      emoji: "🌿", dmg: 14, tier: 5, cost: 800  },

  // ── TIER 6 – Divine (1000🪙) ──
  { name: "Gentuga Tensho",   emoji: "🌠", dmg: 15, tier: 6, cost: 1000 },
];

const STARTER_WEAPON_NAMES = [
  "Shuriken","Kunai","Kama","Tekko","Sai","Fukiya",
  "Tessen","Jitte","Hanbo","Rokushakubo","Kanabo","Tetsubo",
];
const LOADOUT_SIZE = 12; // MAX 12 weapons equipped

const TIER_INFO = {
  1: { name: "Starter",   color: "#9b92c8", glow: "rgba(155,146,200,0.3)" },
  2: { name: "Iron",      color: "#94a3b8", glow: "rgba(148,163,184,0.3)" },
  3: { name: "Steel",     color: "#22d3ee", glow: "rgba(34,211,238,0.3)"  },
  4: { name: "Shadow",    color: "#a855f7", glow: "rgba(168,85,247,0.3)"  },
  5: { name: "Legendary", color: "#facc15", glow: "rgba(250,204,21,0.35)" },
  6: { name: "Divine",    color: "#ff6b35", glow: "rgba(255,107,53,0.4)"  },
};

function getShieldValues(weaponList) {
  const dmgSet = new Set(weaponList.map(w => w.dmg));
  return [...dmgSet].sort((a, b) => a - b);
}

let WEAPONS = ALL_WEAPONS.filter(w => STARTER_WEAPON_NAMES.includes(w.name));
let SHIELD_VALUES = getShieldValues(WEAPONS);

const MAX_HP          = 30;
const SHOTS_PER_ROUND = 6;
const TOTAL_ROUNDS    = 3;
const USERNAME_REGEX  = /^[a-zA-Z0-9_]{3,15}$/;
const SESSION_KEY     = "klocvork_session";

const TOKENS_WIN        = 200;
const TOKENS_LOSS       = 50;
const POTION_COST       = 15;
const POTION_HEAL       = 10;
const BOSS_HP_MAX       = 60;
const BOSS_TOKENS       = 300;
const SPECIAL_CHANCE    = 0.001;
const SPECIAL_WINS_NEED = 3;
const SPECIAL_TOKENS    = 30;
const TRAIT_ROLL_COST   = 500;

// ══════════════════════════════════════════════
// LEVEL SYSTEM
// ══════════════════════════════════════════════
const LEVELS = [
  { level: 1,  name: "Rookie",       badge: "🥉", xpRequired: 0,    color: "#9b92c8" },
  { level: 2,  name: "Brawler",      badge: "🗡️", xpRequired: 100,  color: "#94a3b8" },
  { level: 3,  name: "Duelist",      badge: "⚔️", xpRequired: 250,  color: "#22d3ee" },
  { level: 4,  name: "Warrior",      badge: "🛡️", xpRequired: 500,  color: "#4ade80" },
  { level: 5,  name: "Knight",       badge: "🏅", xpRequired: 900,  color: "#a855f7" },
  { level: 6,  name: "Champion",     badge: "🏆", xpRequired: 1500, color: "#c084fc" },
  { level: 7,  name: "Warlord",      badge: "👑", xpRequired: 2400, color: "#facc15" },
  { level: 8,  name: "Blade Master", badge: "🔱", xpRequired: 3700, color: "#ff6b35" },
  { level: 9,  name: "Overlord",     badge: "🌟", xpRequired: 5500, color: "#f43f5e" },
  { level: 10, name: "Grandmaster",  badge: "💠", xpRequired: 8000, color: "#00ffff" },
];

const XP_BASE_RATE = 1.18; // compound interest multiplier per level

function getXpForAction(action, playerLevel) {
  const base = { win: 50, loss: 15, boss: 80, special: 30, shot: 2 };
  const b = base[action] || 5;
  return Math.round(b * Math.pow(XP_BASE_RATE, (playerLevel || 1) - 1));
}

function getCurrentLevel(xp) {
  let lvl = LEVELS[0];
  for (const l of LEVELS) { if (xp >= l.xpRequired) lvl = l; }
  return lvl;
}

function getNextLevel(xp) {
  const cur = getCurrentLevel(xp);
  return LEVELS.find(l => l.level === cur.level + 1) || null;
}

// ══════════════════════════════════════════════
// TRAIT SYSTEM
// ══════════════════════════════════════════════
const ALL_TRAITS = [
  { name: "Phantom Strike",   emoji: "👻", rarity: "Mythic",    chance: 0.00, desc: "Attack ignores shields entirely." },
  { name: "Soul Rend",        emoji: "💀", rarity: "Mythic",    chance: 0.00, desc: "Deals double damage on perfect matches." },
  { name: "Eternal Flame",    emoji: "🔥", rarity: "Legendary", chance: 0.10, desc: "+2 bonus damage on every attack." },
  { name: "Frostbite",        emoji: "❄️", rarity: "Legendary", chance: 0.10, desc: "Enemy loses 1 HP per shot passively." },
  { name: "Thunder Veil",     emoji: "⚡", rarity: "Epic",      chance: 0.50, desc: "+1 shield effectiveness." },
  { name: "Void Edge",        emoji: "🌑", rarity: "Epic",      chance: 0.50, desc: "25% chance to ignore enemy shield." },
  { name: "Blood Pact",       emoji: "🩸", rarity: "Epic",      chance: 0.75, desc: "Lifesteal: +3 HP per hit." },
  { name: "Iron Will",        emoji: "🛡️", rarity: "Rare",      chance: 1.00, desc: "Reduce incoming damage by 1." },
  { name: "War Cry",          emoji: "😤", rarity: "Rare",      chance: 1.00, desc: "+1 damage when HP < 15." },
  { name: "Mystic Guard",     emoji: "🔮", rarity: "Rare",      chance: 1.50, desc: "Perfect block heals +3 HP." },
  { name: "Serpent's Bite",   emoji: "🐍", rarity: "Rare",      chance: 1.50, desc: "First attack each round +2 dmg." },
  { name: "Dragon Scale",     emoji: "🐉", rarity: "Rare",      chance: 2.00, desc: "Damage cap reduced by 1." },
  { name: "Shadow Step",      emoji: "🌙", rarity: "Uncommon",  chance: 3.00, desc: "50% chance to dodge 1 damage." },
  { name: "Eagle Eye",        emoji: "🦅", rarity: "Uncommon",  chance: 3.00, desc: "See enemy's shield range hint." },
  { name: "Berserker",        emoji: "💢", rarity: "Uncommon",  chance: 3.50, desc: "Damage +1 for each wound taken." },
  { name: "Crystal Guard",    emoji: "💎", rarity: "Uncommon",  chance: 4.00, desc: "Block values ±1 also count as perfect." },
  { name: "Fortune's Blade",  emoji: "🍀", rarity: "Uncommon",  chance: 4.00, desc: "+10 coins per perfect block." },
  { name: "Momentum",         emoji: "🌀", rarity: "Common",    chance: 5.00, desc: "+0.5 dmg stacking per consecutive hit." },
  { name: "Veteran's Mark",   emoji: "🎖️", rarity: "Common",    chance: 5.00, desc: "+5 XP per shot with this weapon." },
  { name: "Quickdraw",        emoji: "⚡", rarity: "Common",    chance: 6.00, desc: "No cooldown on weapon reuse." },
  { name: "Forged in Fire",   emoji: "🔨", rarity: "Common",    chance: 6.00, desc: "+3 HP at round start." },
  { name: "Blessed Edge",     emoji: "✨", rarity: "Common",    chance: 7.00, desc: "+1 dmg on odd-numbered shots." },
  { name: "Bane of Knights",  emoji: "⚔️", rarity: "Common",    chance: 7.00, desc: "+2 dmg against shielded opponents." },
  { name: "Ghost Armor",      emoji: "👻", rarity: "Common",    chance: 8.00, desc: "First hit each match deals 0 damage to you." },
  { name: "Relic's Echo",     emoji: "🏺", rarity: "Common",    chance: 8.00, desc: "Legacy: a mark of history on your blade." },
];

function rollTrait() {
  const r = Math.random() * 100;
  let cumulative = 0;
  for (const t of ALL_TRAITS) {
    cumulative += t.chance;
    if (r < cumulative) return t;
  }
  // Fallback to last common trait
  return ALL_TRAITS[ALL_TRAITS.length - 1];
}

// ══════════════════════════════════════════════
// SESSION
// ══════════════════════════════════════════════
let currentUser = null;
function saveSession(u)  { currentUser = u; try { localStorage.setItem(SESSION_KEY, JSON.stringify(u)); } catch(e) {} }
function loadSession()   { try { const r = localStorage.getItem(SESSION_KEY); return r ? JSON.parse(r) : null; } catch(e) { return null; } }
function clearSession()  { currentUser = null; try { localStorage.removeItem(SESSION_KEY); } catch(e) {} }

// ══════════════════════════════════════════════
// INVENTORY
// ══════════════════════════════════════════════
let localTokens   = 0;
let localPotions  = 0;
let localXP       = 0;
let ownedWeapons  = [...STARTER_WEAPON_NAMES];
let myLoadout     = [...STARTER_WEAPON_NAMES.slice(0, LOADOUT_SIZE)];
let weaponTraits  = {}; // { weaponName: { name, emoji, rarity, desc } }

function loadInventoryFromData(data) {
  localTokens  = data?.tokens  ?? 0;
  localPotions = data?.potions ?? 0;
  localXP      = data?.xp ?? 0;
  try {
    const ow = data?.owned_weapons;
    ownedWeapons = ow ? JSON.parse(ow) : [...STARTER_WEAPON_NAMES];
    STARTER_WEAPON_NAMES.forEach(n => { if (!ownedWeapons.includes(n)) ownedWeapons.push(n); });
  } catch(e) { ownedWeapons = [...STARTER_WEAPON_NAMES]; }
  try {
    const ml = data?.loadout;
    if (ml) {
      myLoadout = JSON.parse(ml);
      myLoadout = myLoadout.filter(n => ownedWeapons.includes(n));
      // ensure max 12
      if (myLoadout.length > LOADOUT_SIZE) myLoadout = myLoadout.slice(0, LOADOUT_SIZE);
    } else {
      myLoadout = ownedWeapons.slice(0, LOADOUT_SIZE);
    }
  } catch(e) { myLoadout = ownedWeapons.slice(0, LOADOUT_SIZE); }
  try {
    const wt = data?.weapon_traits;
    weaponTraits = wt ? JSON.parse(wt) : {};
  } catch(e) { weaponTraits = {}; }
}

async function loadTokenData() {
  if (!currentUser) {
    localTokens = 0; localPotions = 0; localXP = 0;
    ownedWeapons = [...STARTER_WEAPON_NAMES];
    myLoadout = [...STARTER_WEAPON_NAMES.slice(0, LOADOUT_SIZE)];
    weaponTraits = {};
    updateTokenDisplay(); return;
  }
  try {
    const { data } = await db.from("players").select("tokens, potions, owned_weapons, loadout, xp, weapon_traits").eq("id", currentUser.id).maybeSingle();
    loadInventoryFromData(data);
  } catch(e) {}
  updateTokenDisplay();
}

async function saveTokenData() {
  if (!currentUser) return;
  try {
    await db.from("players").update({
      tokens: localTokens,
      potions: localPotions,
      owned_weapons: JSON.stringify(ownedWeapons),
      loadout: JSON.stringify(myLoadout),
      xp: localXP,
      weapon_traits: JSON.stringify(weaponTraits),
    }).eq("id", currentUser.id);
  } catch(e) {}
}

function updateTokenDisplay() {
  // Update all .token-count and .potion-count spans
  document.querySelectorAll(".token-count").forEach(el => el.textContent = localTokens);
  document.querySelectorAll(".potion-count").forEach(el => el.textContent = localPotions);

  const lvl = getCurrentLevel(localXP);
  const next = getNextLevel(localXP);
  const prog = next ? Math.round(((localXP - lvl.xpRequired) / (next.xpRequired - lvl.xpRequired)) * 100) : 100;

  // ── Profile card on main menu ──
  const pcUsername  = document.getElementById("pcUsername");
  const pcAvatar    = document.getElementById("pcAvatar");
  const pcAvatarRing= document.getElementById("pcAvatarRing");
  const pcLvlBadge  = document.getElementById("pcLvlBadge");
  const pcLvlName   = document.getElementById("pcLvlName");
  const pcLvlNum    = document.getElementById("pcLvlNum");
  const pcXpBar     = document.getElementById("pcXpBar");
  const pcXpText    = document.getElementById("pcXpText");
  const pcTokens    = document.getElementById("pcTokens");
  const pcPotions   = document.getElementById("pcPotions");
  const pcLevelTag  = document.getElementById("pcLevelTag");

  if (pcUsername)   pcUsername.textContent  = currentUser ? currentUser.username : "Guest";
  if (pcAvatar)     pcAvatar.textContent    = lvl.badge;
  if (pcAvatarRing) pcAvatarRing.style.boxShadow = `0 0 0 3px ${lvl.color}55, 0 0 20px ${lvl.color}33`;
  if (pcLvlBadge)   pcLvlBadge.textContent  = lvl.badge;
  if (pcLvlName)    { pcLvlName.textContent = lvl.name; pcLvlName.style.color = lvl.color; }
  if (pcLvlNum)     { pcLvlNum.textContent  = "Lv." + lvl.level; pcLvlNum.style.color = lvl.color + "99"; }
  if (pcXpBar)      { pcXpBar.style.width   = prog + "%"; pcXpBar.style.background = `linear-gradient(90deg, ${lvl.color}, ${lvl.color}cc)`; pcXpBar.style.boxShadow = `0 0 10px ${lvl.color}66`; }
  if (pcXpText)     pcXpText.textContent    = localXP + (next ? " / " + next.xpRequired : " (MAX)");
  if (pcTokens)     pcTokens.textContent    = localTokens;
  if (pcPotions)    pcPotions.textContent   = localPotions;
  if (pcLevelTag)   pcLevelTag.style.borderColor = lvl.color + "44";

  // Update user pill
  updateUserPill();
}

async function awardTokens(amount, reason) {
  localTokens += amount;
  updateTokenDisplay();
  await saveTokenData();
  showToast("+" + amount + " 🪙 " + reason, "gold");
}

async function awardXP(action) {
  const lvl = getCurrentLevel(localXP);
  const xpGain = getXpForAction(action, lvl.level);
  const prevLvl = lvl.level;
  localXP += xpGain;
  const newLvl = getCurrentLevel(localXP);
  updateTokenDisplay();
  await saveTokenData();
  showToast("+" + xpGain + " XP ✨", "info");
  if (newLvl.level > prevLvl) {
    setTimeout(() => {
      showToast("🎉 LEVEL UP! " + newLvl.badge + " " + newLvl.name + "!", "gold");
    }, 500);
  }
}

function showToast(msg, type) {
  type = type || "info";
  const t = document.createElement("div");
  t.className = "toast toast-" + type;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => { requestAnimationFrame(() => { t.classList.add("toast-show"); }); });
  setTimeout(() => { t.classList.remove("toast-show"); setTimeout(() => t.remove(), 400); }, 2800);
}

// ══════════════════════════════════════════════
// PASSWORD HASHING
// ══════════════════════════════════════════════
async function hashPassword(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw + "klocvork_salt_2025"));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
}

// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════
let authMode = "login";

window.addEventListener("DOMContentLoaded", () => {
  spawnAuthParticles();
  const saved = loadSession();
  if (saved) { currentUser = saved; updateUserPill(); loadTokenData(); showScreen("screen-mode"); }
});

function spawnAuthParticles() {
  const el = document.getElementById("authParticles");
  if (!el) return;
  const symbols = ["⚔", "🛡", "⭐", "💠", "🔱", "🌙", "🔥"];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement("div");
    p.className = "auth-particle";
    p.textContent = symbols[i % symbols.length];
    p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*8}s;animation-duration:${8+Math.random()*6}s;opacity:${0.05+Math.random()*0.1};font-size:${1+Math.random()*2}rem;`;
    el.appendChild(p);
  }
}

// ══════════════════════════════════════════════
// SCREEN NAV
// ══════════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => { s.classList.remove("active"); s.style.display = ""; });
  const el = document.getElementById(id);
  el.classList.add("active");
  el.style.display = "flex";
  emojiPickerOpen = false;
  const picker = document.getElementById("emojiPicker");
  if (picker) picker.classList.add("hidden");
}

// ══════════════════════════════════════════════
// RULEBOOK
// ══════════════════════════════════════════════
function showRulebook() { document.getElementById("modal-rulebook").classList.remove("hidden"); }
function hideRulebook() { document.getElementById("modal-rulebook").classList.add("hidden"); }
function closeRulebookIfOutside(e) { if (e.target === document.getElementById("modal-rulebook")) hideRulebook(); }

// ══════════════════════════════════════════════
// LEVEL PANEL
// ══════════════════════════════════════════════
function showLevelPanel() { renderLevelUI(); document.getElementById("modal-level").classList.remove("hidden"); }
function hideLevelPanel() { document.getElementById("modal-level").classList.add("hidden"); }
function closeLevelIfOutside(e) { if (e.target === document.getElementById("modal-level")) hideLevelPanel(); }

function renderLevelUI() {
  const body = document.getElementById("levelBody");
  if (!body) return;
  const curLvl = getCurrentLevel(localXP);
  const nextLvl = getNextLevel(localXP);
  const prog = nextLvl ? Math.round(((localXP - curLvl.xpRequired) / (nextLvl.xpRequired - curLvl.xpRequired)) * 100) : 100;

  let html = `
  <div class="level-hero" style="border-color:${curLvl.color}33">
    <div class="lh-badge" style="color:${curLvl.color};text-shadow:0 0 20px ${curLvl.color}55">${curLvl.badge}</div>
    <div class="lh-name" style="color:${curLvl.color}">${curLvl.name}</div>
    <div class="lh-level">Level ${curLvl.level}</div>
    <div class="lh-xp">${localXP} XP</div>
    <div class="lh-bar-wrap">
      <div class="lh-bar" style="width:${prog}%;background:${curLvl.color};box-shadow:0 0 12px ${curLvl.color}66"></div>
    </div>
    <div class="lh-sub">${nextLvl ? (nextLvl.xpRequired - localXP) + ' XP to ' + nextLvl.name : 'Maximum Level Reached! 🎊'}</div>
  </div>
  <div class="level-info-box">
    <p>XP uses <strong>compound interest</strong> — higher level = more XP per action.<br>
    Formula: <code>XP = base × ${XP_BASE_RATE}<sup>level-1</sup></code></p>
  </div>
  <div class="level-grid">`;

  for (const l of LEVELS) {
    const unlocked = localXP >= l.xpRequired;
    const isCur = l.level === curLvl.level;
    html += `<div class="level-card ${unlocked ? 'unlocked' : 'locked'} ${isCur ? 'current' : ''}" style="${isCur ? `border-color:${l.color};box-shadow:0 0 16px ${l.color}33` : ''}">
      <div class="lc-badge">${l.badge}</div>
      <div class="lc-name" style="color:${unlocked ? l.color : 'var(--text3)'}">${l.name}</div>
      <div class="lc-level" style="color:${unlocked ? l.color+'99' : 'var(--text3)'}">Lv. ${l.level}</div>
      <div class="lc-xp" style="color:var(--text3)">${l.xpRequired} XP</div>
      ${isCur ? '<div class="lc-current">← You</div>' : ''}
      ${unlocked && !isCur ? '<div class="lc-done">✓</div>' : ''}
    </div>`;
  }

  html += `</div>
  <div class="level-xp-table">
    <div class="lxt-title">XP Rewards (compound interest multiplied per level)</div>
    <table class="lxt-table">
      <tr><th>Action</th><th>Base XP</th><th>At Lv.${curLvl.level}</th></tr>
      <tr><td>Win a match</td><td>50</td><td>${getXpForAction('win', curLvl.level)}</td></tr>
      <tr><td>Lose a match</td><td>15</td><td>${getXpForAction('loss', curLvl.level)}</td></tr>
      <tr><td>Boss kill</td><td>80</td><td>${getXpForAction('boss', curLvl.level)}</td></tr>
      <tr><td>Special round</td><td>30</td><td>${getXpForAction('special', curLvl.level)}</td></tr>
      <tr><td>Per shot</td><td>2</td><td>${getXpForAction('shot', curLvl.level)}</td></tr>
    </table>
  </div>`;

  body.innerHTML = html;
}

// ══════════════════════════════════════════════
// TRAIT SHOP
// ══════════════════════════════════════════════
function showTraitShop() { renderTraitUI(); document.getElementById("modal-trait").classList.remove("hidden"); }
function hideTraitShop() { document.getElementById("modal-trait").classList.add("hidden"); }
function closeTraitIfOutside(e) { if (e.target === document.getElementById("modal-trait")) hideTraitShop(); }

function renderTraitUI() {
  const body = document.getElementById("traitBody");
  if (!body) return;

  const RARITY_COLORS = {
    "Mythic": "#ff6b35", "Legendary": "#facc15", "Epic": "#a855f7",
    "Rare": "#22d3ee", "Uncommon": "#4ade80", "Common": "#94a3b8"
  };

  let html = `
  <div class="trait-intro">
    <div class="trait-intro-text">
      <p>Roll a <strong>random trait</strong> onto any weapon you own for <strong>500 🪙</strong>.<br>
      Each weapon can hold one trait at a time. Re-rolling replaces the existing trait.</p>
      <div class="trait-balance">Balance: <span style="color:#facc15">${localTokens}</span> 🪙</div>
    </div>
  </div>
  <div class="trait-rarity-legend">`;

  const rarities = ["Mythic","Legendary","Epic","Rare","Uncommon","Common"];
  for (const r of rarities) {
    html += `<span class="trl-chip" style="color:${RARITY_COLORS[r]};border-color:${RARITY_COLORS[r]}44">${r}</span>`;
  }
  html += `</div>`;

  // All traits preview
  html += `<div class="trait-all-title">All 25 Traits</div>
  <div class="trait-grid">`;
  for (const t of ALL_TRAITS) {
    const c = RARITY_COLORS[t.rarity] || "#94a3b8";
    html += `<div class="trait-card" style="border-color:${c}33">
      <div class="tc-emoji">${t.emoji}</div>
      <div class="tc-name" style="color:${c}">${t.name}</div>
      <div class="tc-rarity" style="color:${c}88">${t.rarity}</div>
      <div class="tc-chance">${t.chance === 0 ? '0.00%' : t.chance.toFixed(2)+'%'}</div>
      <div class="tc-desc">${t.desc}</div>
    </div>`;
  }
  html += `</div>`;

  // Roll section — show equipped weapons
  html += `<div class="trait-roll-section">
    <div class="trait-roll-title">🎲 Roll on a Weapon</div>
    <div class="trait-weapons-list">`;

  const rollableWeapons = ownedWeapons.map(n => ALL_WEAPONS.find(w => w.name === n)).filter(Boolean);
  for (const w of rollableWeapons) {
    const ti = TIER_INFO[w.tier] || TIER_INFO[1];
    const existing = weaponTraits[w.name];
    const canAfford = localTokens >= TRAIT_ROLL_COST && currentUser;
    html += `<div class="trait-weapon-row">
      <div class="twr-weapon">
        <span class="twr-emoji">${w.emoji}</span>
        <span class="twr-name">${w.name}</span>
        <span class="twr-tier" style="color:${ti.color}">T${w.tier}</span>
      </div>
      ${existing ? `<div class="twr-trait" style="color:${RARITY_COLORS[existing.rarity] || '#94a3b8'}88">
        ${existing.emoji} ${existing.name} <span class="twr-rarity">${existing.rarity}</span>
      </div>` : '<div class="twr-no-trait">No trait</div>'}
      <button class="twr-roll-btn" onclick="rollTraitOnWeapon('${w.name.replace(/'/g,"\\'")}', this)" ${canAfford ? '' : 'disabled'}>
        🎲 Roll (500 🪙)
      </button>
    </div>`;
  }

  html += `</div></div>`;
  body.innerHTML = html;
}

async function rollTraitOnWeapon(weaponName, btnEl) {
  if (!currentUser) { showToast("Sign in to roll traits!", "red"); return; }
  if (localTokens < TRAIT_ROLL_COST) { showToast("Not enough tokens! Need 500 🪙", "red"); return; }

  localTokens -= TRAIT_ROLL_COST;
  updateTokenDisplay();

  // Animate
  if (btnEl) { btnEl.disabled = true; btnEl.textContent = "Rolling..."; }

  // Reveal after short delay
  setTimeout(async () => {
    const trait = rollTrait();
    weaponTraits[weaponName] = trait;
    await saveTokenData();

    const RARITY_COLORS = { "Mythic": "#ff6b35", "Legendary": "#facc15", "Epic": "#a855f7", "Rare": "#22d3ee", "Uncommon": "#4ade80", "Common": "#94a3b8" };
    const c = RARITY_COLORS[trait.rarity] || "#94a3b8";
    showToast(`${trait.emoji} ${trait.name} — ${trait.rarity}!`, trait.rarity === "Mythic" || trait.rarity === "Legendary" ? "gold" : "info");

    renderTraitUI();
  }, 800);
}

// ══════════════════════════════════════════════
// SHOP
// ══════════════════════════════════════════════
let shopTab = "potions";

function showShop() { shopTab = "potions"; renderShopUI(); document.getElementById("modal-shop").classList.remove("hidden"); }
function hideShop() { document.getElementById("modal-shop").classList.add("hidden"); }
function closeShopIfOutside(e) { if (e.target === document.getElementById("modal-shop")) hideShop(); }
function setShopTab(t) { shopTab = t; renderShopUI(); }

function renderShopUI() {
  const body = document.getElementById("shopBody");
  if (!body) return;
  const bal = `<div class="shop-balance">
    <div class="shop-bal-item"><span class="shop-bal-label">Tokens</span><span class="shop-bal-value" id="shopTokenBalance">${localTokens}</span> 🪙</div>
    <div class="shop-bal-item"><span class="shop-bal-label">Potions</span><span class="shop-bal-value" id="shopPotionOwned">${localPotions}</span> 🧪</div>
  </div>
  <div class="shop-tabs">
    <button class="shop-tab-btn${shopTab==='potions'?' active':''}" onclick="setShopTab('potions')">🧪 Potions</button>
    <button class="shop-tab-btn${shopTab==='weapons'?' active':''}" onclick="setShopTab('weapons')">⚔️ Weapons</button>
  </div>`;

  if (shopTab === "potions") {
    const canBuy = currentUser && localTokens >= POTION_COST && localPotions < 9;
    body.innerHTML = bal + `
    <div class="shop-item-card">
      <div class="shop-item-icon">🧪</div>
      <div class="shop-item-info">
        <div class="shop-item-name">Health Potion</div>
        <div class="shop-item-desc">Use during combat instead of attacking to restore +${POTION_HEAL} HP. Max 9.</div>
        <div class="shop-item-cost">15 🪙 each</div>
      </div>
      <button class="btn-primary" onclick="buyPotion()" ${canBuy?'':'disabled'}>${localPotions>=9?'Max Potions (9)':'Buy — 15 🪙'}</button>
    </div>
    <p class="shop-hint">Earn tokens: +200 per win, +50 per loss, +300 boss kill, +30 special round.</p>`;
  } else {
    let html = bal + `<div class="weapon-shop-list">`;
    const maxTier = 6;
    for (let t = 1; t <= maxTier; t++) {
      const ti = TIER_INFO[t];
      const tier_weapons = ALL_WEAPONS.filter(w => w.tier === t);
      html += `<div class="ws-tier-header" style="color:${ti.color};border-color:${ti.color}20">
        <span class="ws-tier-badge" style="background:${ti.color}22;border-color:${ti.color}44;color:${ti.color}">T${t}</span>
        ${ti.name}${t===1?' — Free Starter':''}
      </div><div class="ws-tier-grid">`;
      tier_weapons.forEach(w => {
        const owned = ownedWeapons.includes(w.name);
        const equipped = myLoadout.includes(w.name);
        const canAfford = localTokens >= w.cost;
        const trait = weaponTraits[w.name];
        html += `<div class="ws-weapon-card ${owned?'ws-owned':''} ${equipped?'ws-equipped':''}" data-weapon="${w.name}">
          <div class="ws-weapon-emoji">${w.emoji}</div>
          <div class="ws-weapon-name">${w.name}</div>
          <div class="ws-weapon-dmg" style="color:${ti.color}">${w.dmg} dmg</div>
          ${trait ? `<div class="ws-weapon-trait" title="${trait.desc}">${trait.emoji}</div>` : ''}
          ${owned
            ? `<button class="ws-btn ${equipped?'ws-btn-equipped':'ws-btn-equip'}" onclick="toggleEquip('${w.name.replace(/'/g,"\\'")}')"> ${equipped?'✓ On':'Equip'}</button>`
            : `<button class="ws-btn ws-btn-buy" onclick="buyWeapon('${w.name.replace(/'/g,"\\'")}'")" ${canAfford&&currentUser?'':'disabled'}>${w.cost} 🪙</button>`
          }
        </div>`;
      });
      html += `</div>`;
    }
    html += `</div><p class="shop-hint">Max ${LOADOUT_SIZE} weapons equipped. Shield values come from opponent's equipped weapons. New dmg = new shield for opponent.</p>`;
    body.innerHTML = html;
  }
}

async function buyPotion() {
  if (!currentUser) { showToast("Sign in to buy potions!", "red"); return; }
  if (localTokens < POTION_COST) { showToast("Not enough tokens!", "red"); return; }
  if (localPotions >= 9) { showToast("Max 9 potions!", "red"); return; }
  localTokens -= POTION_COST; localPotions += 1;
  updateTokenDisplay(); await saveTokenData(); renderShopUI();
  showToast("Potion purchased! 🧪", "green");
}

async function buyWeapon(name) {
  const w = ALL_WEAPONS.find(x => x.name === name);
  if (!w) return;
  if (!currentUser) { showToast("Sign in to buy weapons!", "red"); return; }
  if (ownedWeapons.includes(name)) { showToast("Already owned!", "info"); return; }
  if (localTokens < w.cost) { showToast("Not enough tokens!", "red"); return; }
  localTokens -= w.cost;
  ownedWeapons.push(name);
  updateTokenDisplay(); await saveTokenData(); renderShopUI();
  showToast(w.emoji + " " + w.name + " unlocked!", "gold");
}

function toggleEquip(name) {
  if (!ownedWeapons.includes(name)) return;
  if (myLoadout.includes(name)) {
    if (myLoadout.length <= 1) { showToast("Must have at least 1 weapon!", "red"); return; }
    myLoadout = myLoadout.filter(n => n !== name);
    showToast(ALL_WEAPONS.find(w=>w.name===name)?.emoji + " " + name + " unequipped", "info");
  } else {
    if (myLoadout.length >= LOADOUT_SIZE) { showToast("Max " + LOADOUT_SIZE + " weapons equipped! Unequip one first.", "red"); return; }
    myLoadout.push(name);
    showToast(ALL_WEAPONS.find(w=>w.name===name)?.emoji + " " + name + " equipped!", "green");
  }
  saveTokenData(); renderShopUI();
}

// ══════════════════════════════════════════════
// ARSENAL PANEL
// ══════════════════════════════════════════════
let arsenalFilter = 0;

function showArsenal() { arsenalFilter = 0; renderArsenalPanel(); showScreen("screen-arsenal"); }
function hideArsenal() { showScreen("screen-mode"); }
function setArsenalFilter(t) { arsenalFilter = t; renderArsenalPanel(); }

function renderArsenalPanel() {
  const equipped = myLoadout.length;
  const remaining = LOADOUT_SIZE - equipped;
  const el = document.getElementById("arsenalEquippedCount");
  if (el) el.textContent = equipped + " / " + LOADOUT_SIZE + " equipped";
  const hint = document.getElementById("arsenalHint");
  if (hint) {
    if (remaining > 0) hint.textContent = "Select " + remaining + " more to fill your loadout.";
    else hint.textContent = "Loadout full! Unequip to swap.";
    hint.style.color = remaining === 0 ? "var(--green)" : "var(--text2)";
  }
  const shieldPreview = document.getElementById("arsenalShieldPreview");
  if (shieldPreview) {
    const shieldVals = getShieldValues(myLoadout.map(n => ALL_WEAPONS.find(w => w.name === n)).filter(Boolean));
    shieldPreview.innerHTML = shieldVals.map(v => {
      const blockers = ALL_WEAPONS.filter(w => w.dmg === v && myLoadout.includes(w.name));
      const ti = TIER_INFO[blockers[0]?.tier || 1];
      return `<div class="arsenal-shield-chip" title="Blocks: ${blockers.map(w=>w.name).join(", ")}" style="border-color:${ti.color};color:${ti.color};box-shadow:0 0 8px ${ti.glow}">${v}</div>`;
    }).join("");
  }
  const filterBar = document.getElementById("arsenalFilterBar");
  if (filterBar) {
    filterBar.innerHTML = `<button class="af-tab${arsenalFilter===0?' active':''}" onclick="setArsenalFilter(0)">All</button>` +
      [1,2,3,4,5,6].map(t => {
        const ti = TIER_INFO[t];
        const ownedCount = ALL_WEAPONS.filter(w => w.tier === t && ownedWeapons.includes(w.name)).length;
        if (!ownedCount) return "";
        return `<button class="af-tab${arsenalFilter===t?' active':''}" onclick="setArsenalFilter(${t})" style="${arsenalFilter===t?`background:${ti.color}22;color:${ti.color};border-color:${ti.color}`:''}">T${t} ${ti.name}</button>`;
      }).join("");
  }
  const grid = document.getElementById("arsenalGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const filtered = arsenalFilter === 0
    ? ownedWeapons.map(n => ALL_WEAPONS.find(w => w.name === n)).filter(Boolean)
    : ALL_WEAPONS.filter(w => w.tier === arsenalFilter && ownedWeapons.includes(w.name));
  filtered.sort((a, b) => {
    const ae = myLoadout.includes(a.name) ? 0 : 1;
    const be = myLoadout.includes(b.name) ? 0 : 1;
    if (ae !== be) return ae - be;
    if (a.tier !== b.tier) return a.tier - b.tier;
    return a.dmg - b.dmg;
  });
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="arsenal-empty">No weapons owned in this tier yet.<br><button class="btn-ghost" onclick="showShopFromArsenal()">🛒 Go to Shop</button></div>`;
    return;
  }
  filtered.forEach(w => {
    const isEquipped = myLoadout.includes(w.name);
    const ti = TIER_INFO[w.tier];
    const trait = weaponTraits[w.name];
    const card = document.createElement("div");
    card.className = "arsenal-card" + (isEquipped ? " arsenal-equipped" : "");
    card.innerHTML = `
      <div class="arsenal-tier-dot" style="background:${ti.color}" title="T${w.tier} ${ti.name}"></div>
      <div class="arsenal-card-emoji">${w.emoji}</div>
      <div class="arsenal-card-name">${w.name}</div>
      <div class="arsenal-card-dmg" style="color:${ti.color}">${w.dmg} dmg</div>
      ${trait ? `<div class="arsenal-trait-tag" title="${trait.desc}">${trait.emoji} ${trait.name}</div>` : ''}
      <button class="arsenal-equip-btn ${isEquipped ? 'equipped' : ''}" onclick="arsenalToggle('${w.name.replace(/'/g,"\\'")}')">
        ${isEquipped ? '✓ Equipped' : '+ Equip'}
      </button>`;
    grid.appendChild(card);
  });
  const locked = ALL_WEAPONS.filter(w => !ownedWeapons.includes(w.name) && (arsenalFilter === 0 || w.tier === arsenalFilter));
  if (locked.length) {
    const section = document.createElement("div");
    section.className = "arsenal-locked-section";
    section.innerHTML = `<div class="arsenal-locked-label">🔒 Not Yet Unlocked</div>`;
    locked.forEach(w => {
      const ti = TIER_INFO[w.tier];
      const card = document.createElement("div");
      card.className = "arsenal-card arsenal-locked";
      card.innerHTML = `
        <div class="arsenal-tier-dot" style="background:${ti.color}60"></div>
        <div class="arsenal-card-emoji" style="opacity:0.4">${w.emoji}</div>
        <div class="arsenal-card-name" style="opacity:0.5">${w.name}</div>
        <div class="arsenal-card-dmg" style="color:${ti.color}80">${w.dmg} dmg</div>
        <button class="arsenal-equip-btn buy" onclick="showShopFromArsenal()">${w.cost} 🪙</button>`;
      section.appendChild(card);
    });
    grid.appendChild(section);
  }
}

function arsenalToggle(name) {
  const w = ALL_WEAPONS.find(x => x.name === name);
  if (!w || !ownedWeapons.includes(name)) return;
  if (myLoadout.includes(name)) {
    if (myLoadout.length <= 1) { showToast("Must keep at least 1 weapon!", "red"); return; }
    myLoadout = myLoadout.filter(n => n !== name);
    showToast(w.emoji + " " + name + " unequipped", "info");
  } else {
    if (myLoadout.length >= LOADOUT_SIZE) { showToast("Max " + LOADOUT_SIZE + " weapons! Unequip one first.", "red"); return; }
    myLoadout.push(name);
    showToast(w.emoji + " " + name + " equipped!", "green");
  }
  saveTokenData(); renderArsenalPanel();
}

function showShopFromArsenal() { hideArsenal(); showScreen("screen-mode"); setTimeout(() => showShop(), 50); }
function showSettings() { showArsenal(); }
function hideSettings() { hideArsenal(); }
function settingsToggleWeapon(name, checked) {
  if (checked) {
    if (myLoadout.length >= LOADOUT_SIZE) { showToast("Max " + LOADOUT_SIZE + " weapons!", "red"); return; }
    myLoadout.push(name);
  } else {
    if (myLoadout.length <= 1) { showToast("Must have at least 1 weapon!", "red"); return; }
    myLoadout = myLoadout.filter(n => n !== name);
  }
  saveTokenData(); renderArsenalPanel();
}

// ══════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════
function setAuthTab(mode) {
  authMode = mode;
  document.getElementById("tabLogin").classList.toggle("active", mode === "login");
  document.getElementById("tabSignup").classList.toggle("active", mode === "signup");
  document.getElementById("authSubmitText").textContent = mode === "login" ? "Enter the Arena" : "Create Account";
  document.getElementById("authError").textContent = "";
  document.getElementById("authError").className = "form-error";
  document.getElementById("authPassword").autocomplete = mode === "login" ? "current-password" : "new-password";
}

function setAuthLoading(on) {
  document.getElementById("authSubmit").disabled = on;
  document.getElementById("authSubmitSpinner").classList.toggle("hidden", !on);
  document.getElementById("authSubmitText").textContent = on ? "…" : (authMode === "login" ? "Enter the Arena" : "Create Account");
}

function setAuthError(msg, ok) {
  const el = document.getElementById("authError");
  el.textContent = msg;
  el.className = ok ? "form-success" : "form-error";
}

async function signUp(username, password) {
  if (!USERNAME_REGEX.test(username)) { setAuthError("Username: 3–15 chars, letters/numbers/underscores only."); return; }
  if (password.length < 6) { setAuthError("Password must be at least 6 characters."); return; }
  setAuthLoading(true);
  try {
    const { data: ex } = await db.from("players").select("id").eq("username", username.toLowerCase()).maybeSingle();
    if (ex) { setAuthError("Username already taken."); return; }
    const hashed = await hashPassword(password);
    const { data, error } = await db.from("players")
      .insert({ username: username.toLowerCase(), password_hash: hashed, tokens: 0, potions: 0, xp: 0 })
      .select("id, username").single();
    if (error) { setAuthError("Sign up failed: " + error.message); return; }
    setAuthError("Account created! Signing you in…", true);
    setTimeout(() => { saveSession({ id: data.id, username: data.username }); updateUserPill(); loadTokenData(); showScreen("screen-mode"); }, 800);
  } catch(e) { setAuthError("Something went wrong."); }
  finally { setAuthLoading(false); }
}

async function signIn(username, password) {
  if (!username || !password) { setAuthError("Fill in all fields."); return; }
  setAuthLoading(true);
  try {
    const { data } = await db.from("players").select("id, username, password_hash").eq("username", username.toLowerCase()).maybeSingle();
    if (!data) { setAuthError("Username not found."); return; }
    if (await hashPassword(password) !== data.password_hash) { setAuthError("Incorrect password."); return; }
    saveSession({ id: data.id, username: data.username });
    updateUserPill(); await loadTokenData(); showScreen("screen-mode");
  } catch(e) { setAuthError("Something went wrong."); }
  finally { setAuthLoading(false); }
}

function handleAuth() {
  const u = document.getElementById("authUsername").value.trim();
  const p = document.getElementById("authPassword").value;
  if (authMode === "signup") signUp(u, p); else signIn(u, p);
}

function playAsGuest() { clearSession(); localTokens = 0; localPotions = 0; localXP = 0; weaponTraits = {}; updateUserPill(); updateTokenDisplay(); showScreen("screen-mode"); }
function logout() { clearSession(); localTokens = 0; localPotions = 0; localXP = 0; weaponTraits = {}; updateUserPill(); updateTokenDisplay(); showScreen("screen-auth"); }

function updateUserPill() {
  const btn = document.getElementById("logoutBtn");
  if (btn) btn.style.display = currentUser ? "" : "none";
}

// ══════════════════════════════════════════════
// MODE SELECT
// ══════════════════════════════════════════════
let gameMode = null;

function selectMode(mode) {
  gameMode = mode;
  restoreTurnPanel();
  if (mode === "online")   { showScreen("screen-lobby"); }
  else if (mode === "boss"){ initBossGame(); showScreen("screen-game"); }
  else                     { initGame(mode); showScreen("screen-game"); }
}

// ══════════════════════════════════════════════
// GAME STATE
// ══════════════════════════════════════════════
let gs = {};

function freshGameState(names) {
  return {
    hpA: MAX_HP, hpB: MAX_HP,
    round: 1, shot: 1, phase: "A",
    usedWeapons: [], pendingA: null,
    isSuddenDeath: false,
    names: names || { A: "Player A", B: "Player B" },
    totalHpA: 0, totalHpB: 0,
    potionsA: localPotions,
    potionsB: localPotions,
    specialScoreA: 0, specialScoreB: 0,
  };
}

// ── Shield values are derived from OPPONENT's loadout ──
// For now in local modes, both players share the same pool.
// Shield values come from the match weapon pool dmg values.
function buildShieldValuesForPlayer(playerWeapons, opponentWeapons) {
  // Shields available to a player = damage values from OPPONENT's equipped weapons
  const dmgSet = new Set(opponentWeapons.map(w => w.dmg));
  return [...dmgSet].sort((a, b) => a - b);
}

let SHIELD_VALUES_A = []; // shields available to player A (from B's weapons)
let SHIELD_VALUES_B = []; // shields available to player B (from A's weapons)

function initGame(mode, names) {
  WEAPONS = myLoadout.map(n => ALL_WEAPONS.find(w => w.name === n)).filter(Boolean);
  if (!WEAPONS.length) WEAPONS = ALL_WEAPONS.filter(w => STARTER_WEAPON_NAMES.includes(w.name));
  // In local games, both players have same weapons so shields are symmetric
  SHIELD_VALUES = getShieldValues(WEAPONS);
  SHIELD_VALUES_A = SHIELD_VALUES;
  SHIELD_VALUES_B = SHIELD_VALUES;
  const n = names || {
    A: currentUser ? currentUser.username : "Player A",
    B: mode === "ai" ? "The Machine" : "Player B",
  };
  gs = freshGameState(n);
  specialActive = false; specialGuesserNow = "A";
  renderGame(); initEmojiChat();
}

// ══════════════════════════════════════════════
// BOSS BATTLE
// ══════════════════════════════════════════════
let bossHp = BOSS_HP_MAX;

function initBossGame() {
  bossHp = BOSS_HP_MAX;
  WEAPONS = myLoadout.map(n => ALL_WEAPONS.find(w => w.name === n)).filter(Boolean);
  if (!WEAPONS.length) WEAPONS = ALL_WEAPONS.filter(w => STARTER_WEAPON_NAMES.includes(w.name));
  SHIELD_VALUES = getShieldValues(WEAPONS);
  const n = { A: currentUser ? currentUser.username : "Player A", B: "Player B" };
  gs = freshGameState(n);
  renderBossGame(); initEmojiChat();
}

function renderBossGame() {
  document.getElementById("gsRound").textContent = "⚔ Boss Battle";
  document.getElementById("gsShot").textContent  = "Boss HP: " + bossHp + "/" + BOSS_HP_MAX;
  document.getElementById("hpNameA").textContent = gs.names.A;
  document.getElementById("hpNameB").textContent = gs.names.B;
  updateHPBars(); renderAvailableWeapons(); hideOnlineWaiting();
  if (gs.phase === "A") renderPlayerATurn(true);
  else renderPlayerBTurn(true);
}

function resolveBossShot(choiceA, choiceB) {
  const bossWeapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
  const bossShield = SHIELD_VALUES[Math.floor(Math.random() * SHIELD_VALUES.length)];
  const dmgBossFromA = choiceA.weapon ? Math.abs(bossShield - choiceA.weapon.dmg) : 0;
  const dmgBossFromB = choiceB.weapon ? Math.abs(bossShield - choiceB.weapon.dmg) : 0;
  const dmgToA = choiceA.shield != null ? Math.abs(choiceA.shield - bossWeapon.dmg) : bossWeapon.dmg;
  const dmgToB = choiceB.shield != null ? Math.abs(choiceB.shield - bossWeapon.dmg) : bossWeapon.dmg;
  const prevHp = bossHp;
  bossHp = Math.max(0, bossHp - dmgBossFromA - dmgBossFromB);
  if (!choiceA.potion) gs.hpA = Math.max(0, gs.hpA - dmgToA);
  else gs.hpA = Math.min(MAX_HP, gs.hpA + POTION_HEAL);
  if (!choiceB.potion) gs.hpB = Math.max(0, gs.hpB - dmgToB);
  else gs.hpB = Math.min(MAX_HP, gs.hpB + POTION_HEAL);
  let killingBlow = null;
  if (bossHp === 0 && prevHp > 0) { killingBlow = (prevHp - dmgBossFromA) <= 0 ? "A" : "B"; }
  showBossResult(choiceA, choiceB, bossWeapon, bossShield, dmgToA, dmgToB, dmgBossFromA, dmgBossFromB, killingBlow);
}

function showBossResult(cA, cB, bossW, bossS, dmgA, dmgB, dmgBA, dmgBB, killingBlow) {
  document.getElementById("rdNameA").textContent = gs.names.A;
  document.getElementById("rdNameB").textContent = gs.names.B;
  document.getElementById("rdWeaponA").textContent = cA.potion ? "🧪 Healed" : (cA.weapon.emoji + " " + cA.weapon.name + " → " + dmgBA + " dmg to Boss");
  document.getElementById("rdWeaponB").textContent = cB.potion ? "🧪 Healed" : (cB.weapon.emoji + " " + cB.weapon.name + " → " + dmgBB + " dmg to Boss");
  document.getElementById("rdShieldA").textContent = cA.potion ? "+" + POTION_HEAL + " HP" : "🛡 " + cA.shield;
  document.getElementById("rdShieldB").textContent = cB.potion ? "+" + POTION_HEAL + " HP" : "🛡 " + cB.shield;
  const eA = document.getElementById("rdDmgA"), eB = document.getElementById("rdDmgB");
  eA.className = (dmgA === 0 || cA.potion) ? "rd-dmg no-dmg" : "rd-dmg";
  eA.textContent = cA.potion ? "+" + POTION_HEAL + " HP 🧪" : (dmgA === 0 ? "✦ Perfect Block!" : "−" + dmgA + " HP");
  eB.className = (dmgB === 0 || cB.potion) ? "rd-dmg no-dmg" : "rd-dmg";
  eB.textContent = cB.potion ? "+" + POTION_HEAL + " HP 🧪" : (dmgB === 0 ? "✦ Perfect Block!" : "−" + dmgB + " HP");
  const hpEl = document.getElementById("resultHpSummary");
  const nBtn = document.getElementById("resultNextBtn");
  if (bossHp <= 0) {
    const winner = killingBlow === "A" ? gs.names.A : gs.names.B;
    hpEl.innerHTML = "🏆 " + winner + " landed the killing blow! Boss defeated!";
    nBtn.textContent = "Claim Reward →";
    nBtn.onclick = () => claimBossReward(killingBlow);
  } else if (gs.hpA <= 0 && gs.hpB <= 0) {
    hpEl.innerHTML = "💀 Both players fell. Boss survives with " + bossHp + " HP.";
    nBtn.textContent = "Retreat →";
    nBtn.onclick = () => showScreen("screen-mode");
  } else {
    hpEl.innerHTML = bossW.emoji + " Boss: " + bossW.name + " (Shield " + bossS + ") | Boss HP: <strong>" + bossHp + "</strong>/" + BOSS_HP_MAX + " | " + gs.names.A + ": " + gs.hpA + " HP | " + gs.names.B + ": " + gs.hpB + " HP";
    nBtn.textContent = "Next Shot →";
    nBtn.onclick = nextBossShot;
  }
  showScreen("screen-result");
}

async function claimBossReward(winner) {
  if (currentUser) {
    await awardTokens(BOSS_TOKENS, "Boss Kill!");
    await awardXP("boss");
  }
  showScreen("screen-mode");
}

function nextBossShot() { gs.shot++; gs.phase = "A"; showScreen("screen-game"); renderBossGame(); }

// ══════════════════════════════════════════════
// RENDER (normal game)
// ══════════════════════════════════════════════
function renderGame() {
  document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "⚡ Sudden Death" : "Round " + gs.round + " / " + TOTAL_ROUNDS;
  document.getElementById("gsShot").textContent  = "Shot " + gs.shot + " / " + SHOTS_PER_ROUND;
  document.getElementById("hpNameA").textContent = gs.names.A;
  document.getElementById("hpNameB").textContent = gs.names.B;
  updateHPBars(); renderAvailableWeapons(); hideOnlineWaiting();
  if (!specialActive && Math.random() < SPECIAL_CHANCE) { triggerSpecialShot(); return; }
  if (gs.phase === "A") renderPlayerATurn(false);
  else renderPlayerBTurn(false);
}

function updateHPBars() {
  const pctA = Math.max(0, gs.hpA / MAX_HP * 100);
  const pctB = Math.max(0, gs.hpB / MAX_HP * 100);
  const barA = document.getElementById("hpBarA"), barB = document.getElementById("hpBarB");
  barA.style.width = pctA + "%"; barB.style.width = pctB + "%";
  document.getElementById("hpNumA").textContent = gs.hpA;
  document.getElementById("hpNumB").textContent = gs.hpB;
  barA.style.background = pctA > 50 ? "var(--green)" : pctA > 25 ? "#facc15" : "var(--red)";
  barA.style.boxShadow  = pctA > 50 ? "0 0 8px var(--green-glow)" : pctA > 25 ? "0 0 8px rgba(250,204,21,0.3)" : "0 0 8px var(--red-glow)";
  barB.style.background = pctB > 50 ? "var(--green)" : pctB > 25 ? "#facc15" : "var(--red)";
  barB.style.boxShadow  = pctB > 50 ? "0 0 8px var(--green-glow)" : pctB > 25 ? "0 0 8px rgba(250,204,21,0.3)" : "0 0 8px var(--red-glow)";
  barA.classList.toggle("low-hp", pctA <= 30 && pctA > 0);
  barB.classList.toggle("low-hp", pctB <= 30 && pctB > 0);
}

function renderAvailableWeapons() {
  const list = document.getElementById("availableWeaponsList");
  list.innerHTML = "";
  WEAPONS.forEach(w => {
    const c = document.createElement("span");
    c.className = "aw-chip" + (gs.usedWeapons.includes(w.name) ? " used" : "");
    const trait = weaponTraits[w.name];
    c.textContent = w.emoji + " " + w.name + (trait ? " " + trait.emoji : "");
    list.appendChild(c);
  });
}

function showOnlineWaiting(msg) {
  document.getElementById("onlineWaitingText").textContent = msg || "Waiting for opponent…";
  document.getElementById("onlineWaitingOverlay").classList.remove("hidden");
  document.getElementById("turnPanel").style.display = "none";
}
function hideOnlineWaiting() {
  document.getElementById("onlineWaitingOverlay").classList.add("hidden");
  document.getElementById("turnPanel").style.display = "";
}

// ══════════════════════════════════════════════
// SPECIAL SHOT
// ══════════════════════════════════════════════
let specialActive = false, specialGuesserNow = "A", specialHiddenWeapon = null;

function triggerSpecialShot() {
  specialActive = true;
  showToast("✨ SPECIAL SHOT triggered!", "gold");
  renderSpecialTurn();
}

function renderSpecialTurn() {
  specialHiddenWeapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
  const guesser = specialGuesserNow;
  const targetName = guesser === "A" ? gs.names.B : gs.names.A;
  const meName     = guesser === "A" ? gs.names.A : gs.names.B;
  const myScore    = guesser === "A" ? gs.specialScoreA : gs.specialScoreB;
  const theirScore = guesser === "A" ? gs.specialScoreB : gs.specialScoreA;
  const panel = document.getElementById("turnPanel");
  panel.innerHTML =
    '<div class="turn-header">' +
      '<div class="turn-player-badge special-badge">✨ Special Shot — ' + meName + '\'s Turn</div>' +
      '<div class="turn-phase">Guess ' + targetName + '\'s hidden weapon! Score: ' + meName + ' <strong>' + myScore + '</strong> — ' + targetName + ' <strong>' + theirScore + '</strong> (first to ' + SPECIAL_WINS_NEED + ' wins 🪙' + SPECIAL_TOKENS + ')</div>' +
    '</div>' +
    '<div class="choice-section"><label class="choice-label">Guess ' + targetName + '\'s Weapon</label>' +
      '<div class="weapon-grid" id="specialGuessGrid"></div></div>' +
    '<button class="btn-confirm" id="confirmBtn" onclick="confirmSpecialGuess()" disabled>Submit Guess →</button>' +
    '<p id="gameError" class="form-error"></p>';
  window._specialSel = null;
  renderWeaponGrid("specialGuessGrid", WEAPONS, function(w) {
    window._specialSel = w;
    const cb = document.getElementById("confirmBtn");
    if (cb) cb.disabled = false;
  });
}

function confirmSpecialGuess() {
  const guessed = window._specialSel;
  if (!guessed) return;
  const correct = guessed.name === specialHiddenWeapon.name;
  const guesser = specialGuesserNow;
  if (correct) {
    if (guesser === "A") gs.specialScoreA++; else gs.specialScoreB++;
    showToast("✅ Correct! " + specialHiddenWeapon.emoji + " " + specialHiddenWeapon.name, "green");
  } else {
    showToast("❌ Wrong! It was " + specialHiddenWeapon.emoji + " " + specialHiddenWeapon.name, "red");
  }
  if (gs.specialScoreA >= SPECIAL_WINS_NEED || gs.specialScoreB >= SPECIAL_WINS_NEED) { endSpecialRound(); return; }
  specialGuesserNow = guesser === "A" ? "B" : "A";
  if (gameMode === "hotseat") {
    document.getElementById("passTitle").textContent    = "Pass to " + (specialGuesserNow === "A" ? gs.names.A : gs.names.B);
    document.getElementById("passSubtitle").textContent = "Next: Special Shot guess.";
    showScreen("screen-pass");
  } else { renderSpecialTurn(); }
}

async function endSpecialRound() {
  const aWon = gs.specialScoreA >= SPECIAL_WINS_NEED;
  const winnerName = aWon ? gs.names.A : gs.names.B;
  showToast("🏆 " + winnerName + " wins the Special Round! +" + SPECIAL_TOKENS + " 🪙", "gold");
  if (aWon && currentUser) { await awardTokens(SPECIAL_TOKENS, "Special Round Win!"); await awardXP("special"); }
  gs.specialScoreA = 0; gs.specialScoreB = 0; specialActive = false; specialGuesserNow = "A";
  restoreTurnPanel();
  setTimeout(function() { gs.phase = "A"; renderGame(); }, 1500);
}

// ══════════════════════════════════════════════
// TURN PANEL RESTORE
// ══════════════════════════════════════════════
function restoreTurnPanel() {
  const tp = document.getElementById("turnPanel");
  if (!tp) return;
  tp.innerHTML =
    '<div class="turn-header">' +
      '<div class="turn-player-badge" id="turnBadge">Player A\'s Turn</div>' +
      '<div class="turn-phase" id="turnPhase">Choose your weapon & shield</div>' +
    '</div>' +
    '<div class="choice-section"><label class="choice-label">Your Weapon</label><div class="weapon-grid" id="weaponGrid"></div></div>' +
    '<div class="choice-section"><label class="choice-label">Shield Points <span class="shield-hint">(5–15)</span></label><div class="shield-grid" id="shieldGrid"></div></div>' +
    '<div class="choice-section" id="potionRow"></div>' +
    '<button class="btn-confirm" id="confirmBtn" onclick="confirmChoice()" disabled>Confirm →</button>' +
    '<p id="gameError" class="form-error"></p>';
}

// ══════════════════════════════════════════════
// PLAYER A TURN
// ══════════════════════════════════════════════
let selWeaponA = null, selShieldA = null, usingPotionA = false;

function renderPlayerATurn(isBoss) {
  selWeaponA = null; selShieldA = null; usingPotionA = false;
  const badge = document.getElementById("turnBadge"), phase = document.getElementById("turnPhase");
  if (badge) badge.textContent = gs.names.A + "'s Turn";
  if (phase) phase.textContent = isBoss ? "Choose your weapon & shield to attack the Boss!" : "Choose your weapon & shield — hidden from your opponent.";
  const cb = document.getElementById("confirmBtn");
  if (cb) cb.disabled = true;
  renderWeaponGrid("weaponGrid", WEAPONS, function(w) { selWeaponA = w; usingPotionA = false; checkAReady(); });
  // Shield values for A = dmg values from WEAPONS (opponent B's potential weapons)
  renderShieldGrid("shieldGrid", SHIELD_VALUES_A.length ? SHIELD_VALUES_A : getShieldValues(WEAPONS), function(v) { selShieldA = v; checkAReady(); }, null);
  renderPotionRow("potionRow", "A");
}
function checkAReady() {
  const cb = document.getElementById("confirmBtn");
  if (cb) cb.disabled = !(usingPotionA || (selWeaponA && selShieldA !== null));
}

// ══════════════════════════════════════════════
// PLAYER B TURN
// ══════════════════════════════════════════════
let selWeaponB = null, selShieldB = null, usingPotionB = false;

function renderPlayerBTurn(isBoss) {
  selWeaponB = null; selShieldB = null; usingPotionB = false;
  const badge = document.getElementById("turnBadge"), phase = document.getElementById("turnPhase");
  if (badge) badge.textContent = gs.names.B + "'s Turn";
  const aWeapon = gs.pendingA && gs.pendingA.weapon ? gs.pendingA.weapon : null;
  if (phase) phase.textContent = isBoss ? "Choose your weapon & shield to attack the Boss!" :
    aWeapon ? gs.names.A + " locked in. Pick weapon & shield — shield " + aWeapon.dmg + " perfectly counters!" : "Pick your weapon & shield.";
  const cb = document.getElementById("confirmBtn");
  if (cb) cb.disabled = true;
  const bAvail = isBoss ? WEAPONS : WEAPONS.filter(function(w) { return w.name !== (gs.pendingA && gs.pendingA.weapon ? gs.pendingA.weapon.name : null); });
  renderWeaponGrid("weaponGrid", bAvail, function(w) { selWeaponB = w; usingPotionB = false; checkBReady(); });
  renderShieldGrid("shieldGrid", SHIELD_VALUES_B.length ? SHIELD_VALUES_B : getShieldValues(WEAPONS), function(v) { selShieldB = v; checkBReady(); }, aWeapon ? aWeapon.dmg : null);
  renderPotionRow("potionRow", "B");
}
function checkBReady() {
  const cb = document.getElementById("confirmBtn");
  if (cb) cb.disabled = !(usingPotionB || (selWeaponB && selShieldB !== null));
}

// ══════════════════════════════════════════════
// POTION ROW
// ══════════════════════════════════════════════
function renderPotionRow(rowId, player) {
  const row = document.getElementById(rowId);
  if (!row) return;
  const count = player === "A" ? gs.potionsA : gs.potionsB;
  if (!count || count <= 0) { row.innerHTML = ""; return; }
  row.innerHTML = '<label class="choice-label">Potions (' + count + ' left)</label>' +
    '<button class="btn-potion" id="potionBtn' + player + '" onclick="togglePotion(\'' + player + '\')">' +
    '🧪 Use Potion (+' + POTION_HEAL + ' HP)</button>';
}

function togglePotion(player) {
  if (player === "A") {
    usingPotionA = !usingPotionA;
    if (usingPotionA) { selWeaponA = null; selShieldA = null; }
    const btn = document.getElementById("potionBtnA");
    if (btn) btn.classList.toggle("potion-active", usingPotionA);
    document.querySelectorAll("#weaponGrid .weapon-btn").forEach(b => b.classList.toggle("weapon-dimmed", usingPotionA));
    document.querySelectorAll("#shieldGrid .shield-btn").forEach(b => b.classList.toggle("weapon-dimmed", usingPotionA));
    checkAReady();
  } else {
    usingPotionB = !usingPotionB;
    if (usingPotionB) { selWeaponB = null; selShieldB = null; }
    const btn = document.getElementById("potionBtnB");
    if (btn) btn.classList.toggle("potion-active", usingPotionB);
    document.querySelectorAll("#weaponGrid .weapon-btn").forEach(b => b.classList.toggle("weapon-dimmed", usingPotionB));
    document.querySelectorAll("#shieldGrid .shield-btn").forEach(b => b.classList.toggle("weapon-dimmed", usingPotionB));
    checkBReady();
  }
}

// ══════════════════════════════════════════════
// GRID BUILDERS
// ══════════════════════════════════════════════
function renderWeaponGrid(gridId, weapons, onSelect) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = "";
  weapons.forEach(function(w) {
    const ti = TIER_INFO[w.tier] || TIER_INFO[1];
    const trait = weaponTraits[w.name];
    const btn = document.createElement("button");
    btn.className = "weapon-btn";
    btn.style.position = "relative";
    btn.innerHTML =
      "<span>" + w.emoji + " " + w.name + (trait ? " <span class='weapon-trait-dot' title='" + trait.name + ": " + trait.desc + "'>" + trait.emoji + "</span>" : "") + "</span>" +
      "<span class='weapon-dmg'>" + w.dmg + " dmg</span>" +
      "<span class='weapon-tier' style='background:" + ti.color + "22;color:" + ti.color + ";border:1px solid " + ti.color + "44'>T" + w.tier + "</span>";
    btn.onclick = function() {
      grid.querySelectorAll(".weapon-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      onSelect(w);
    };
    grid.appendChild(btn);
  });
}

function renderShieldGrid(gridId, shieldValues, onSelect, perfectCounterDmg) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = "";
  const weaponByVal = {};
  WEAPONS.forEach(function(w) {
    if (!weaponByVal[w.dmg]) weaponByVal[w.dmg] = [];
    weaponByVal[w.dmg].push(w.emoji + " " + w.name);
  });
  shieldValues.forEach(function(v) {
    const btn = document.createElement("button");
    const isPerfect = (perfectCounterDmg !== null && perfectCounterDmg !== undefined && v === perfectCounterDmg);
    btn.className = "shield-btn" + (isPerfect ? " perfect-counter" : "");
    btn.textContent = v;
    if (isPerfect) btn.title = "Perfect counter — blocks opponent's weapon!";
    else if (weaponByVal[v] && weaponByVal[v].length) btn.setAttribute("data-weapon", "blocks " + weaponByVal[v].join(", "));
    btn.onclick = function() {
      grid.querySelectorAll(".shield-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      onSelect(v);
    };
    grid.appendChild(btn);
  });
}

// ══════════════════════════════════════════════
// CONFIRM CHOICE
// ══════════════════════════════════════════════
function confirmChoice() {
  const cb = document.getElementById("confirmBtn");
  if (!cb) return;
  cb.disabled = true;
  if (gs.phase === "A") {
    if (usingPotionA) {
      if (gameMode !== "online") {
        gs.potionsA = Math.max(0, gs.potionsA - 1);
        gs.hpA = Math.min(MAX_HP, gs.hpA + POTION_HEAL);
        localPotions = Math.max(0, localPotions - 1);
        saveTokenData(); updateTokenDisplay();
      }
      gs.pendingA = { weapon: null, shield: null, potion: true };
    } else {
      gs.pendingA = { weapon: selWeaponA, shield: selShieldA, potion: false };
    }
    cb.classList.add("locked-in");
    cb.textContent = usingPotionA ? "✓ Potion Used!" : "✓ Locked In!";
    setTimeout(function() { cb.classList.remove("locked-in"); cb.textContent = "Confirm →"; }, 600);
    if (gameMode === "hotseat") { setTimeout(function() { gs.phase = "B"; showPassScreen(); }, 400); }
    else if (gameMode === "ai") { gs.phase = "B"; resolveAITurn(); }
    else if (gameMode === "boss") { gs.phase = "B"; renderBossGame(); }
    else if (gameMode === "online") { submitOnlineMoveA(); }
  } else {
    if (usingPotionB) {
      if (gameMode !== "online") {
        gs.potionsB = Math.max(0, gs.potionsB - 1);
        gs.hpB = Math.min(MAX_HP, gs.hpB + POTION_HEAL);
        localPotions = Math.max(0, localPotions - 1);
        saveTokenData(); updateTokenDisplay();
      }
    }
    if (gameMode === "boss") {
      const cA = gs.pendingA;
      const cB = usingPotionB ? { weapon: null, shield: selShieldB, potion: true } : { weapon: selWeaponB, shield: selShieldB, potion: false };
      resolveBossShot(cA, cB);
    } else if (gameMode === "online") { submitOnlineMoveB(); }
    else {
      const cB = usingPotionB ? { weapon: null, shield: selShieldB, potion: true } : { weapon: selWeaponB, shield: selShieldB, potion: false };
      resolveShot(gs.pendingA, cB);
    }
  }
}

// ══════════════════════════════════════════════
// PASS SCREEN
// ══════════════════════════════════════════════
function showPassScreen() {
  document.getElementById("passTitle").textContent    = "Pass to " + gs.names.B;
  document.getElementById("passSubtitle").textContent = gs.names.A + " has locked their choice. Hand the device to " + gs.names.B + ".";
  showScreen("screen-pass");
}

function continueAfterPass() {
  showScreen("screen-game");
  if (specialActive) { restoreTurnPanel(); renderSpecialTurn(); return; }
  if (gameMode === "boss") { renderBossGame(); return; }
  document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "⚡ Sudden Death" : "Round " + gs.round + " / " + TOTAL_ROUNDS;
  document.getElementById("gsShot").textContent  = "Shot " + gs.shot + " / " + SHOTS_PER_ROUND;
  document.getElementById("hpNameA").textContent = gs.names.A;
  document.getElementById("hpNameB").textContent = gs.names.B;
  updateHPBars(); renderAvailableWeapons();
  renderPlayerBTurn(false);
}

// ══════════════════════════════════════════════
// AI TURN
// ══════════════════════════════════════════════
function resolveAITurn() {
  const pendingName = gs.pendingA && gs.pendingA.weapon ? gs.pendingA.weapon.name : null;
  const pool = WEAPONS.filter(w => w.name !== pendingName);
  const aiW = pool[Math.floor(Math.random() * pool.length)];
  const aiS = SHIELD_VALUES[Math.floor(Math.random() * SHIELD_VALUES.length)];
  resolveShot(gs.pendingA, { weapon: aiW, shield: aiS, potion: false });
}

// ══════════════════════════════════════════════
// SHOT RESOLUTION
// ══════════════════════════════════════════════
function resolveShot(choiceA, choiceB) {
  var dmgToA = 0, dmgToB = 0;
  if (!choiceA.potion && !choiceB.potion) {
    // Shield from OPPONENT's weapons
    dmgToB = Math.abs(choiceB.shield - choiceA.weapon.dmg);
    dmgToA = Math.abs(choiceA.shield - choiceB.weapon.dmg);
  } else if (choiceA.potion && !choiceB.potion) {
    dmgToA = Math.round(choiceB.weapon.dmg / 2); dmgToB = 0;
  } else if (!choiceA.potion && choiceB.potion) {
    dmgToB = Math.round(choiceA.weapon.dmg / 2); dmgToA = 0;
  }
  if (!choiceA.potion) gs.hpA = Math.max(0, gs.hpA - dmgToA);
  if (!choiceB.potion) gs.hpB = Math.max(0, gs.hpB - dmgToB);
  if (choiceA.weapon && !gs.usedWeapons.includes(choiceA.weapon.name)) gs.usedWeapons.push(choiceA.weapon.name);
  if (choiceB.weapon && !gs.usedWeapons.includes(choiceB.weapon.name)) gs.usedWeapons.push(choiceB.weapon.name);
  gs.phase = "A"; gs.pendingA = null;
  // Award shot XP
  if (currentUser) awardXP("shot");
  showShotResult(choiceA, choiceB, dmgToA, dmgToB);
}

// ══════════════════════════════════════════════
// SHOT RESULT SCREEN
// ══════════════════════════════════════════════
function showShotResult(cA, cB, dmgA, dmgB) {
  document.getElementById("rdNameA").textContent = gs.names.A;
  document.getElementById("rdNameB").textContent = gs.names.B;
  if (cA.potion) { document.getElementById("rdWeaponA").textContent = "🧪 Potion Used"; document.getElementById("rdShieldA").textContent = "+" + POTION_HEAL + " HP healed"; }
  else { document.getElementById("rdWeaponA").textContent = cA.weapon.emoji + " " + cA.weapon.name + " (" + cA.weapon.dmg + ")"; document.getElementById("rdShieldA").textContent = "🛡 Shield: " + cA.shield; }
  if (cB.potion) { document.getElementById("rdWeaponB").textContent = "🧪 Potion Used"; document.getElementById("rdShieldB").textContent = "+" + POTION_HEAL + " HP healed"; }
  else { document.getElementById("rdWeaponB").textContent = cB.weapon.emoji + " " + cB.weapon.name + " (" + cB.weapon.dmg + ")"; document.getElementById("rdShieldB").textContent = "🛡 Shield: " + cB.shield; }
  var eA = document.getElementById("rdDmgA"), eB = document.getElementById("rdDmgB");
  [eA, eB].forEach(function(el) { var clone = el.cloneNode(true); el.parentNode.replaceChild(clone, el); });
  setTimeout(function() {
    var fa = document.getElementById("rdDmgA"), fb = document.getElementById("rdDmgB");
    animateDmgEl(fa, dmgA, dmgA === 0, cA.potion);
    animateDmgEl(fb, dmgB, dmgB === 0, cB.potion);
  }, 10);
  document.getElementById("resultHpSummary").textContent = gs.names.A + ": " + gs.hpA + " HP  ·  " + gs.names.B + ": " + gs.hpB + " HP";
  var nBtn = document.getElementById("resultNextBtn");
  nBtn.textContent = gs.shot >= SHOTS_PER_ROUND ? "End Round →" : "Next Shot →";
  nBtn.onclick = nextAfterResult;
  showScreen("screen-result");
}

function animateDmgEl(el, finalVal, isPerfect, isHeal) {
  if (isHeal) { el.className = "rd-dmg no-dmg"; el.textContent = "+" + POTION_HEAL + " HP 🧪"; return; }
  el.className = "rd-dmg" + (isPerfect ? " no-dmg" : "");
  if (isPerfect) { el.textContent = "✦ Perfect Block!"; return; }
  el.textContent = "−0 HP";
  var duration = 600, steps = 20, interval = duration / steps, current = 0;
  var timer = setInterval(function() {
    current = Math.min(current + Math.ceil(finalVal / steps), finalVal);
    el.textContent = "−" + current + " HP";
    if (current >= finalVal) clearInterval(timer);
  }, interval);
}

function nextAfterResult() {
  if (gs.shot >= SHOTS_PER_ROUND) { endRound(); return; }
  if (gameMode === "online") {
    if (onlineRole === "A") {
      gs.shot++; gs.phase = "A"; showScreen("screen-game"); renderGame();
      db.from("game_rooms").update({ turn_status: "a_choosing", move_a: null, move_b: null, state: JSON.stringify(gs) }).eq("code", onlineRoom);
    } else {
      gs.phase = "A"; showScreen("screen-game");
      document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "⚡ Sudden Death" : "Round " + gs.round + " / " + TOTAL_ROUNDS;
      document.getElementById("gsShot").textContent  = "Shot " + gs.shot + " / " + SHOTS_PER_ROUND;
      updateHPBars(); renderAvailableWeapons();
      showOnlineWaiting("Waiting for " + gs.names.A + " to choose…");
    }
  } else { gs.shot++; gs.phase = "A"; showScreen("screen-game"); renderGame(); }
}

// ══════════════════════════════════════════════
// ROUND END
// ══════════════════════════════════════════════
function endRound() {
  gs.totalHpA = (gs.totalHpA || 0) + gs.hpA;
  gs.totalHpB = (gs.totalHpB || 0) + gs.hpB;
  var lastRound = (gs.round >= TOTAL_ROUNDS && !gs.isSuddenDeath) || gs.isSuddenDeath;
  document.getElementById("roNameA").textContent = gs.names.A;
  document.getElementById("roNameB").textContent = gs.names.B;
  if (lastRound) {
    if (gs.isSuddenDeath) { document.getElementById("roHpA").textContent = gs.hpA + " HP"; document.getElementById("roHpB").textContent = gs.hpB + " HP"; }
    else { document.getElementById("roHpA").textContent = gs.totalHpA + " HP total"; document.getElementById("roHpB").textContent = gs.totalHpB + " HP total"; }
    if (gs.totalHpA === gs.totalHpB && !gs.isSuddenDeath) {
      document.getElementById("roLabel").textContent = "It's a Tie after 3 Rounds!";
      document.getElementById("roNextBtn").textContent = "⚡ Begin Sudden Death →";
      showScreen("screen-roundover");
    } else { showGameOver(); }
  } else {
    document.getElementById("roHpA").textContent = gs.hpA + " HP  (total: " + gs.totalHpA + ")";
    document.getElementById("roHpB").textContent = gs.hpB + " HP  (total: " + gs.totalHpB + ")";
    document.getElementById("roLabel").textContent = "Round " + gs.round + " Complete";
    document.getElementById("roNextBtn").textContent = "Begin Round " + (gs.round + 1) + " →";
    showScreen("screen-roundover");
  }
}

function startNextRound() {
  if (gs.totalHpA === gs.totalHpB && gs.round >= TOTAL_ROUNDS) gs.isSuddenDeath = true;
  else gs.round++;
  gs.hpA = MAX_HP; gs.hpB = MAX_HP;
  gs.shot = 1; gs.phase = "A"; gs.usedWeapons = []; gs.pendingA = null;
  if (gameMode === "online") {
    if (onlineRole === "A") {
      showScreen("screen-game"); renderGame();
      db.from("game_rooms").update({ turn_status: "a_choosing", move_a: null, move_b: null, state: JSON.stringify(gs) }).eq("code", onlineRoom);
    } else {
      showScreen("screen-game");
      document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "⚡ Sudden Death" : "Round " + gs.round + " / " + TOTAL_ROUNDS;
      document.getElementById("gsShot").textContent  = "Shot " + gs.shot + " / " + SHOTS_PER_ROUND;
      updateHPBars(); renderAvailableWeapons();
      showOnlineWaiting("Waiting for " + gs.names.A + " to choose…");
    }
  } else { showScreen("screen-game"); renderGame(); }
}

// ══════════════════════════════════════════════
// GAME OVER
// ══════════════════════════════════════════════
async function showGameOver() {
  var finalA = gs.totalHpA || gs.hpA, finalB = gs.totalHpB || gs.hpB;
  var aWins = finalA > finalB, tie = finalA === finalB;
  document.getElementById("goEmblem").textContent   = tie ? "🤝" : "🏆";
  document.getElementById("goNameA").textContent    = gs.names.A;
  document.getElementById("goNameB").textContent    = gs.names.B;
  document.getElementById("goHpA").textContent      = gs.isSuddenDeath ? gs.hpA + " HP" : (gs.totalHpA || gs.hpA) + " HP total";
  document.getElementById("goHpB").textContent      = gs.isSuddenDeath ? gs.hpB + " HP" : (gs.totalHpB || gs.hpB) + " HP total";
  if (tie) {
    document.getElementById("goResult").textContent   = "It's a Draw!";
    document.getElementById("goSubtitle").textContent = "Both warriors fought with equal fury.";
  } else {
    var w = aWins ? gs.names.A : gs.names.B;
    document.getElementById("goResult").textContent   = w + " Wins!";
    document.getElementById("goSubtitle").textContent = aWins ? gs.names.B + " has been defeated." : gs.names.A + " has been defeated.";
  }

  // XP and tokens
  if (currentUser && gameMode !== "boss") {
    const xpAction = !tie && aWins ? "win" : "loss";
    await awardXP(xpAction);
    const xpGained = getXpForAction(xpAction, getCurrentLevel(localXP).level);
    const goXp = document.getElementById("goXpAward");
    if (goXp) goXp.innerHTML = `<span class="go-xp-badge">+${xpGained} XP ✨ ${getCurrentLevel(localXP).badge} ${getCurrentLevel(localXP).name}</span>`;
    if (!tie) { if (aWins) await awardTokens(TOKENS_WIN, "Victory!"); else await awardTokens(TOKENS_LOSS, "Better luck next time."); }
    else await awardTokens(TOKENS_LOSS, "Draw.");
  }

  showScreen("screen-gameover");
  destroyEmojiChat();

  var flash = document.createElement("div");
  flash.className = "go-flash " + (tie ? "draw" : "win");
  document.body.appendChild(flash);
  setTimeout(function() { flash.remove(); }, 800);

  if (!tie) {
    var colors = ["#a855f7","#c084fc","#22d3ee","#4ade80","#facc15","#f43f5e"];
    var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    for (var i = 0; i < 28; i++) {
      var p = document.createElement("div");
      p.className = "go-particle";
      var angle = (Math.PI * 2 * i) / 28 + (Math.random() - 0.5) * 0.4;
      var dist  = 120 + Math.random() * 180;
      var tx = Math.cos(angle) * dist, ty = Math.sin(angle) * dist - 60;
      p.style.cssText = "left:"+(cx-4)+"px;top:"+(cy-4)+"px;background:"+colors[i%colors.length]+";--tx:"+tx+"px;--ty:"+ty+"px;--dur:"+(0.7+Math.random()*0.6)+"s;--delay:"+(Math.random()*0.15)+"s;box-shadow:0 0 6px "+colors[i%colors.length]+";";
      document.body.appendChild(p);
      setTimeout(function() { p.remove(); }, 1500);
    }
  }
}

function playAgain() { restoreTurnPanel(); initGame(gameMode); showScreen("screen-game"); }

function confirmQuit() {
  if (confirm("Quit and return to the menu?")) {
    cleanupOnline(); destroyEmojiChat(); restoreTurnPanel(); showScreen("screen-mode");
  }
}

// ══════════════════════════════════════════════
// ONLINE MULTIPLAYER
// ══════════════════════════════════════════════
var onlineRoom = null, onlineSub = null, onlineRole = null, lobbyPoll = null;
var lastHandledKey = "", resultShownForKey = "";

function startGamePoll() {
  if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
  lastHandledKey = "";
  lobbyPoll = setInterval(pollTick, 1500);
}

async function pollTick() {
  if (!onlineRoom) { clearInterval(lobbyPoll); lobbyPoll = null; return; }
  var data;
  try {
    var res = await db.from("game_rooms").select("turn_status, state, last_result, status").eq("code", onlineRoom).maybeSingle();
    data = res.data;
  } catch(e) { return; }
  if (!data) return;
  var ts = data.turn_status;
  var stateObj = data.state ? (function() { try { return JSON.parse(data.state); } catch(e) { return null; } })() : null;
  var round = stateObj ? stateObj.round : gs.round;
  var shot  = stateObj ? stateObj.shot  : gs.shot;
  var key   = round + "-" + shot + "-" + ts;
  if (key === lastHandledKey) return;

  if (onlineRole === "B") {
    if (ts === "b_choosing") {
      var waiting = !document.getElementById("onlineWaitingOverlay").classList.contains("hidden");
      if (waiting) {
        lastHandledKey = key;
        if (stateObj) { gs.names = stateObj.names || gs.names; gs.usedWeapons = stateObj.usedWeapons || gs.usedWeapons; gs.potionsA = stateObj.potionsA != null ? stateObj.potionsA : gs.potionsA; gs.potionsB = stateObj.potionsB != null ? stateObj.potionsB : gs.potionsB; }
        activateBTurn();
      }
    } else if (ts === "resolved") {
      var onResult = document.getElementById("screen-result").classList.contains("active");
      if (!onResult && stateObj && data.last_result && resultShownForKey !== key) {
        lastHandledKey = key; resultShownForKey = key;
        try {
          var result = JSON.parse(data.last_result);
          gs.hpA = stateObj.hpA; gs.hpB = stateObj.hpB; gs.usedWeapons = stateObj.usedWeapons;
          gs.names = stateObj.names; gs.round = stateObj.round; gs.shot = stateObj.shot;
          gs.isSuddenDeath = stateObj.isSuddenDeath;
          gs.totalHpA = stateObj.totalHpA || gs.totalHpA; gs.totalHpB = stateObj.totalHpB || gs.totalHpB;
          gs.potionsA = stateObj.potionsA != null ? stateObj.potionsA : gs.potionsA;
          gs.potionsB = stateObj.potionsB != null ? stateObj.potionsB : gs.potionsB;
          showShotResult(result.cA, result.cB, result.dmgA, result.dmgB);
        } catch(e) {}
      }
    }
  }
  if (onlineRole === "A") {
    if (ts === "resolved") {
      var onResultA = document.getElementById("screen-result").classList.contains("active");
      if (!onResultA && stateObj && data.last_result && resultShownForKey !== key) {
        lastHandledKey = key; resultShownForKey = key;
        try {
          var resultA = JSON.parse(data.last_result);
          gs.hpA = stateObj.hpA; gs.hpB = stateObj.hpB; gs.usedWeapons = stateObj.usedWeapons;
          gs.names = stateObj.names; gs.round = stateObj.round; gs.shot = stateObj.shot;
          gs.isSuddenDeath = stateObj.isSuddenDeath;
          gs.totalHpA = stateObj.totalHpA || gs.totalHpA; gs.totalHpB = stateObj.totalHpB || gs.totalHpB;
          gs.potionsA = stateObj.potionsA != null ? stateObj.potionsA : gs.potionsA;
          gs.potionsB = stateObj.potionsB != null ? stateObj.potionsB : gs.potionsB;
          showShotResult(resultA.cA, resultA.cB, resultA.dmgA, resultA.dmgB);
        } catch(e) {}
      }
    }
  }
}

function cleanupOnline() {
  if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
  if (onlineSub) { onlineSub.unsubscribe(); onlineSub = null; }
  onlineRoom = null; onlineRole = null; lastHandledKey = ""; resultShownForKey = "";
}

function genCode() { return Math.random().toString(36).substring(2,8).toUpperCase(); }

async function createRoom() {
  var code = genCode();
  var userId = currentUser ? currentUser.id : ("guest_" + Math.random().toString(36).slice(2,8));
  var errEl = document.getElementById("lobbyError");
  errEl.textContent = "";
  var aName     = currentUser ? currentUser.username : "Player A";
  var initState = freshGameState({ A: aName, B: "Player B" });
  var ins = await db.from("game_rooms").insert({
    code: code, player_a: userId, player_a_name: aName,
    state: JSON.stringify(initState), status: "waiting",
    turn_status: "a_choosing", move_a: null, move_b: null, last_result: null,
  });
  if (ins.error) {
    var isSM = ins.error.message && (ins.error.message.includes("last_result") || ins.error.message.includes("turn_status") || ins.error.message.includes("last_emoji"));
    errEl.innerHTML = isSM ? "⚠️ DB schema outdated. Run <strong>migration.sql</strong> in Supabase SQL Editor, then refresh." : "Failed to create room: " + ins.error.message;
    return;
  }
  onlineRoom = code; onlineRole = "A";
  document.getElementById("roomCodeDisplay").textContent = code;
  document.getElementById("lobbyCreate").classList.add("hidden");
  document.getElementById("lobbyWaiting").classList.remove("hidden");
  subscribeToRoom(code);
  lobbyPoll = setInterval(async function() {
    var r = await db.from("game_rooms").select("status, state").eq("code", code).maybeSingle();
    if (!r.data) return;
    if (r.data.status === "active" && !document.getElementById("screen-game").classList.contains("active")) {
      clearInterval(lobbyPoll); lobbyPoll = null;
      startOnlineGame(r.data, "A"); startGamePoll();
    }
  }, 2000);
}

async function joinRoom() {
  var code = document.getElementById("joinCode").value.trim().toUpperCase();
  var errEl = document.getElementById("lobbyError");
  errEl.textContent = "";
  if (!code || code.length !== 6) { errEl.textContent = "Enter a valid 6-character code."; return; }
  var res = await db.from("game_rooms").select("*").eq("code", code).maybeSingle();
  if (res.error || !res.data) { errEl.textContent = "Room not found."; return; }
  if (res.data.status !== "waiting") { errEl.textContent = "Room is already full or in progress."; return; }
  var userId = currentUser ? currentUser.id : ("guest_" + Math.random().toString(36).slice(2,8));
  var bName  = currentUser ? currentUser.username : "Player B";
  var roomState = JSON.parse(res.data.state);
  roomState.names.B = bName;
  var ue = await db.from("game_rooms").update({
    player_b: userId, player_b_name: bName, status: "active",
    turn_status: "a_choosing", state: JSON.stringify(roomState),
  }).eq("code", code);
  if (ue.error) {
    var isSM = ue.error.message && (ue.error.message.includes("last_result") || ue.error.message.includes("turn_status") || ue.error.message.includes("last_emoji"));
    errEl.innerHTML = isSM ? "⚠️ DB schema outdated. Run <strong>migration.sql</strong> in Supabase SQL Editor, then refresh." : "Failed to join room: " + ue.error.message;
    return;
  }
  onlineRoom = code; onlineRole = "B";
  startOnlineGame({ state: JSON.stringify(roomState) }, "B");
  subscribeToRoom(code); startGamePoll();
}

function startOnlineGame(row, role) {
  gameMode = "online"; gs = JSON.parse(row.state); gs.phase = "A";
  showScreen("screen-game"); initEmojiChat();
  if (role === "A") { renderGame(); }
  else {
    document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "⚡ Sudden Death" : "Round " + gs.round + " / " + TOTAL_ROUNDS;
    document.getElementById("gsShot").textContent  = "Shot " + gs.shot + " / " + SHOTS_PER_ROUND;
    document.getElementById("hpNameA").textContent = gs.names.A;
    document.getElementById("hpNameB").textContent = gs.names.B;
    updateHPBars(); renderAvailableWeapons();
    showOnlineWaiting("Waiting for " + gs.names.A + " to choose…");
  }
}

function subscribeToRoom(code) {
  if (onlineSub) onlineSub.unsubscribe();
  onlineSub = db.channel("room_" + code)
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "game_rooms", filter: "code=eq." + code }, function() { pollTick(); })
    .subscribe();
}

async function submitOnlineMoveA() {
  if (usingPotionA) {
    gs.potionsA = Math.max(0, gs.potionsA - 1);
    localPotions = Math.max(0, localPotions - 1);
    saveTokenData(); updateTokenDisplay();
  }
  var move = JSON.stringify({ weapon: selWeaponA, shield: selShieldA, potion: usingPotionA });
  var r = await db.from("game_rooms").update({ move_a: move, turn_status: "b_choosing", state: JSON.stringify(gs) }).eq("code", onlineRoom);
  if (r.error) { document.getElementById("gameError").textContent = "Failed to submit move. Try again."; return; }
  showOnlineWaiting("Locked in. Waiting for " + gs.names.B + "…");
}

async function submitOnlineMoveB() {
  var res = await db.from("game_rooms").select("move_a, state").eq("code", onlineRoom).maybeSingle();
  if (res.error || !res.data || !res.data.move_a) { document.getElementById("gameError").textContent = "Could not read opponent's move. Try again."; return; }
  var mA = JSON.parse(res.data.move_a);
  var cA = mA;
  var cB = usingPotionB ? { weapon: null, shield: selShieldB, potion: true } : { weapon: selWeaponB, shield: selShieldB, potion: false };
  var dmgToA = 0, dmgToB = 0;
  if (!cA.potion && !cB.potion) {
    dmgToB = Math.abs(cB.shield - cA.weapon.dmg); dmgToA = Math.abs(cA.shield - cB.weapon.dmg);
  } else if (cA.potion && !cB.potion) { dmgToA = Math.round(cB.weapon.dmg / 2); dmgToB = 0; }
  else if (!cA.potion && cB.potion) { dmgToB = Math.round(cA.weapon.dmg / 2); dmgToA = 0; }
  if (!cA.potion) gs.hpA = Math.max(0, gs.hpA - dmgToA);
  else gs.hpA = Math.min(MAX_HP, gs.hpA + POTION_HEAL);
  if (!cB.potion) gs.hpB = Math.max(0, gs.hpB - dmgToB);
  else gs.hpB = Math.min(MAX_HP, gs.hpB + POTION_HEAL);
  if (usingPotionB) { gs.potionsB = Math.max(0, gs.potionsB - 1); localPotions = Math.max(0, localPotions - 1); saveTokenData(); updateTokenDisplay(); }
  if (cA.weapon && !gs.usedWeapons.includes(cA.weapon.name)) gs.usedWeapons.push(cA.weapon.name);
  if (cB.weapon && !gs.usedWeapons.includes(cB.weapon.name)) gs.usedWeapons.push(cB.weapon.name);
  gs.phase = "A"; gs.pendingA = null;
  var result = { cA: cA, cB: cB, dmgA: dmgToA, dmgB: dmgToB };
  var newState = JSON.stringify(gs);
  var roundShotKey = gs.round + "-" + gs.shot + "-resolved";
  var upd = await db.from("game_rooms").update({
    move_a: null, move_b: null, turn_status: "resolved",
    state: newState, last_result: JSON.stringify(result),
  }).eq("code", onlineRoom);
  if (upd.error) { document.getElementById("gameError").textContent = "Failed to submit move. Try again."; return; }
  resultShownForKey = roundShotKey; lastHandledKey = roundShotKey;
  showShotResult(result.cA, result.cB, result.dmgA, result.dmgB);
}

function activateBTurn() {
  gs.phase = "B"; showScreen("screen-game");
  document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "⚡ Sudden Death" : "Round " + gs.round + " / " + TOTAL_ROUNDS;
  document.getElementById("gsShot").textContent  = "Shot " + gs.shot + " / " + SHOTS_PER_ROUND;
  document.getElementById("hpNameA").textContent = gs.names.A;
  document.getElementById("hpNameB").textContent = gs.names.B;
  updateHPBars(); renderAvailableWeapons(); hideOnlineWaiting();
  renderPlayerBTurn(false);
}

async function cancelRoom() {
  if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
  if (onlineRoom) await db.from("game_rooms").delete().eq("code", onlineRoom);
  if (onlineSub) { onlineSub.unsubscribe(); onlineSub = null; }
  onlineRoom = null;
  document.getElementById("lobbyCreate").classList.remove("hidden");
  document.getElementById("lobbyWaiting").classList.add("hidden");
}

function copyRoomCode() {
  navigator.clipboard.writeText(onlineRoom || "").catch(function() {});
  var btn = document.querySelector(".btn-copy");
  btn.textContent = "Copied!";
  setTimeout(function() { btn.textContent = "Copy"; }, 1500);
}


// ══════════════════════════════════════════════
// FULL EMOJI CHAT — PANEL + REALTIME
// ══════════════════════════════════════════════

const EMOJI_CATEGORIES = [
  {
    label: "⚔️", title: "Combat",
    emojis: ["⚔️","🗡️","🛡️","🏹","🔱","💥","🩸","💀","👑","🔥","⚡","💫","🌀","🌪️","🌊","❄️","🧪","🪄"]
  },
  {
    label: "😂", title: "Reactions",
    emojis: ["😂","😤","😈","🤣","😭","👀","🫡","💪","🤡","😏","🥶","👋","🙏","😱","🤙","😎","🫠","🤬","🥳","😵","🤯","😇","🥺","🤫","🤐","😜","🤩","😮","🫢","😬","🙄","🥴","😤","😡","🤑","🫵","🖕","🤌","🤏","✌️","🤘","🫶","🫀","🧠","👁️","🦷","🦴","💀","🫦","🤲"]
  },
  {
    label: "🐉", title: "Creatures",
    emojis: ["🐉","🦅","🐍","🐺","🦁","🐻","🦊","🦄","🐲","🦂","🦋","🦎","🦁","🐯","🐗","🦅","🦆","🦉","🦚","🦜","🐦‍⬛","🐝","🦟","🦗"]
  },
  {
    label: "🌟", title: "Symbols",
    emojis: ["🌟","💎","🏆","🎯","🔮","🎲","🏅","✨","💠","🔱","⚜️","🌙","🌠","🎭","🎪","🎰","🃏","🎴","♟️","🧿","🔔","💣","🧨","🎆","🎇"]
  },
  {
    label: "👻", title: "Spooky",
    emojis: ["👻","💀","🦴","🩸","🕯️","🔮","🌑","🌒","🌓","🌔","🌕","🕷️","🕸️","🦇","🐚","⚰️","🪦","🩻","🫀","🧠","🦾","🫁","👁️","🫦","🌚"]
  }
];

let chatPanelOpen = false;
let emojiChatSub = null;
let emojiPickerOpen = false; // kept for compat
let unreadCount = 0;
let activeCatIndex = 0;
// Full persistent message history for this session
let chatHistory = [];

// ── INIT ──────────────────────────────────────
function initEmojiChat() {
  chatHistory = [];
  unreadCount = 0;
  chatPanelOpen = false;

  const chatEl = document.getElementById("emojiChat");
  if (chatEl) chatEl.style.display = "flex";

  // Reset panel state
  const win = document.getElementById("ecpWindow");
  if (win) win.classList.add("hidden");

  const log = document.getElementById("emojiChatLog");
  if (log) log.innerHTML = "";

  const unreadBadge = document.getElementById("ecpUnread");
  if (unreadBadge) { unreadBadge.textContent = "0"; unreadBadge.style.display = "none"; }

  // Build category tabs
  buildCategoryTabs();
  // Build first emoji grid
  buildEmojiGrid(0);

  // Subscribe for online mode
  if (gameMode === "online" && onlineRoom) {
    subscribeEmojiChannel(onlineRoom);
    const statusEl = document.getElementById("ecpStatus");
    if (statusEl) { statusEl.textContent = "● Live"; statusEl.style.color = "var(--green)"; }
  } else {
    const statusEl = document.getElementById("ecpStatus");
    if (statusEl) { statusEl.textContent = "● Local"; statusEl.style.color = "var(--cyan)"; }
  }
}

function destroyEmojiChat() {
  const chatEl = document.getElementById("emojiChat");
  if (chatEl) chatEl.style.display = "none";
  if (emojiChatSub) { emojiChatSub.unsubscribe(); emojiChatSub = null; }
  chatPanelOpen = false;
  chatHistory = [];
  unreadCount = 0;
}

// ── CATEGORY TABS ─────────────────────────────
function buildCategoryTabs() {
  const cats = document.getElementById("ecpCats");
  if (!cats) return;
  cats.innerHTML = "";
  EMOJI_CATEGORIES.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.className = "ecp-cat-btn" + (i === activeCatIndex ? " active" : "");
    btn.textContent = cat.label;
    btn.title = cat.title;
    btn.onclick = () => { activeCatIndex = i; buildCategoryTabs(); buildEmojiGrid(i); };
    cats.appendChild(btn);
  });
}

// ── EMOJI GRID ────────────────────────────────
function buildEmojiGrid(catIndex) {
  const grid = document.getElementById("emojiPicker");
  if (!grid) return;
  grid.innerHTML = "";
  const cat = EMOJI_CATEGORIES[catIndex];
  if (!cat) return;
  cat.emojis.forEach(emoji => {
    const btn = document.createElement("button");
    btn.className = "ecp-emoji-btn";
    btn.textContent = emoji;
    btn.onclick = () => sendChatEmoji(emoji);
    grid.appendChild(btn);
  });
}

// ── TOGGLE PANEL ─────────────────────────────
function toggleChatPanel() {
  chatPanelOpen = !chatPanelOpen;
  const win = document.getElementById("ecpWindow");
  const toggle = document.getElementById("emojiChatToggle");
  if (win) win.classList.toggle("hidden", !chatPanelOpen);
  if (chatPanelOpen) {
    // Reset unread
    unreadCount = 0;
    const badge = document.getElementById("ecpUnread");
    if (badge) { badge.style.display = "none"; badge.textContent = "0"; }
    if (toggle) toggle.classList.remove("has-new");
    // Scroll log to bottom
    setTimeout(() => {
      const log = document.getElementById("emojiChatLog");
      if (log) log.scrollTop = log.scrollHeight;
    }, 50);
  }
}

// legacy compat (old code calls toggleEmojiPicker)
function toggleEmojiPicker() { toggleChatPanel(); }

// ── SEND EMOJI ────────────────────────────────
function sendChatEmoji(emoji) {
  let senderName;
  if (gameMode === "online") {
    senderName = onlineRole === "A" ? gs.names.A : gs.names.B;
  } else {
    senderName = (gs.phase === "B") ? gs.names.B : gs.names.A;
  }

  // Animate the button briefly
  animateSentEmoji(emoji);

  appendEmojiMsg(senderName, emoji, false);

  if (gameMode === "online" && onlineRoom) {
    db.from("game_rooms").update({
      last_emoji: JSON.stringify({ from: senderName, emoji: emoji, ts: Date.now() })
    }).eq("code", onlineRoom).then(res => {
      if (res.error && res.error.message && res.error.message.includes("last_emoji")) {
        showToast("⚠️ Run migration.sql to enable realtime chat!", "red");
      }
    });
  }
}

function animateSentEmoji(emoji) {
  // Show a floating emoji burst from the send button
  const toggle = document.getElementById("emojiChatToggle");
  if (!toggle) return;
  const rect = toggle.getBoundingClientRect();
  const burst = document.createElement("div");
  burst.className = "ecp-burst";
  burst.textContent = emoji;
  burst.style.left = rect.left + rect.width / 2 + "px";
  burst.style.top  = rect.top  + "px";
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 700);
}

// ── APPEND MESSAGE ────────────────────────────
function appendEmojiMsg(sender, emoji, isOpponent) {
  // Push to history
  const entry = { sender, emoji, isOpponent, ts: Date.now() };
  chatHistory.push(entry);

  const log = document.getElementById("emojiChatLog");
  if (!log) return;

  // Check if we should group with previous message (same sender, within 8s)
  const prev = chatHistory[chatHistory.length - 2];
  const shouldGroup = prev && prev.sender === sender && (entry.ts - prev.ts) < 8000;

  if (shouldGroup) {
    // Add emoji to the last message bubble's emoji row
    const lastBubble = log.querySelector(".ecm-bubble:last-child .ecm-emojis");
    if (lastBubble) {
      const span = document.createElement("span");
      span.className = "ecm-emoji-item";
      span.textContent = emoji;
      span.style.animation = "ecp-emoji-pop .35s cubic-bezier(.17,.67,.3,1.4) both";
      lastBubble.appendChild(span);
      log.scrollTop = log.scrollHeight;
      return;
    }
  }

  // New bubble
  const bubble = document.createElement("div");
  bubble.className = "ecm-bubble" + (isOpponent ? " ecm-opponent" : " ecm-self");

  const senderEl = document.createElement("div");
  senderEl.className = "ecm-sender";
  senderEl.textContent = sender;

  const emojisRow = document.createElement("div");
  emojisRow.className = "ecm-emojis";

  const emojiSpan = document.createElement("span");
  emojiSpan.className = "ecm-emoji-item";
  emojiSpan.textContent = emoji;
  emojisRow.appendChild(emojiSpan);

  const timeEl = document.createElement("div");
  timeEl.className = "ecm-time";
  const d = new Date();
  timeEl.textContent = d.getHours().toString().padStart(2,"0") + ":" + d.getMinutes().toString().padStart(2,"0");

  bubble.appendChild(senderEl);
  bubble.appendChild(emojisRow);
  bubble.appendChild(timeEl);
  log.appendChild(bubble);

  log.scrollTop = log.scrollHeight;

  // Unread badge if panel is closed
  if (!chatPanelOpen && isOpponent) {
    unreadCount++;
    const badge = document.getElementById("ecpUnread");
    const toggle = document.getElementById("emojiChatToggle");
    if (badge) { badge.textContent = unreadCount > 9 ? "9+" : String(unreadCount); badge.style.display = "flex"; }
    if (toggle) toggle.classList.add("has-new");

    // Show floating preview popup
    showFloatingPreview(sender, emoji);
  }
}

// ── FLOATING PREVIEW (when panel is closed) ──
let floatPreviewTimer = null;
function showFloatingPreview(sender, emoji) {
  let preview = document.getElementById("ecpFloatPreview");
  if (!preview) {
    preview = document.createElement("div");
    preview.id = "ecpFloatPreview";
    preview.className = "ecp-float-preview";
    preview.onclick = () => { toggleChatPanel(); preview.remove(); };
    document.body.appendChild(preview);
  }
  preview.innerHTML = `<span class="efp-sender">${sender}</span><span class="efp-emoji">${emoji}</span>`;
  preview.classList.remove("efp-hide");
  if (floatPreviewTimer) clearTimeout(floatPreviewTimer);
  floatPreviewTimer = setTimeout(() => {
    preview.classList.add("efp-hide");
    setTimeout(() => { if (preview.parentNode) preview.remove(); }, 400);
  }, 3500);
}

// ── TYPING INDICATOR ─────────────────────────
let typingTimer = null;
function showTypingIndicator(name) {
  const el = document.getElementById("ecpTyping");
  const nameEl = document.getElementById("ecpTypingName");
  if (!el) return;
  if (nameEl) nameEl.textContent = name;
  el.style.display = "flex";
  if (typingTimer) clearTimeout(typingTimer);
  typingTimer = setTimeout(() => { el.style.display = "none"; }, 2500);
}

// ── REALTIME SUBSCRIPTION ─────────────────────
function subscribeEmojiChannel(code) {
  if (emojiChatSub) { emojiChatSub.unsubscribe(); emojiChatSub = null; }
  let lastEmojiTs = 0;

  emojiChatSub = db.channel("emoji_" + code)
    .on("postgres_changes", {
      event: "UPDATE", schema: "public", table: "game_rooms", filter: "code=eq." + code
    }, payload => {
      try {
        const raw = payload.new && payload.new.last_emoji;
        if (!raw) return;
        const data = JSON.parse(raw);
        if (!data || !data.ts || data.ts <= lastEmojiTs) return;
        const myName = onlineRole === "A" ? gs.names.A : gs.names.B;
        if (data.from === myName) return;
        lastEmojiTs = data.ts;
        // Show typing for 400ms then reveal
        showTypingIndicator(data.from);
        setTimeout(() => {
          const el = document.getElementById("ecpTyping");
          if (el) el.style.display = "none";
          appendEmojiMsg(data.from, data.emoji, true);
        }, 420);
      } catch(e) {}
    })
    .subscribe();
}