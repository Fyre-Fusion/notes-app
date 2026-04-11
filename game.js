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
  { name:"Shuriken",emoji:"⭐",dmg:5,tier:1,cost:0},{name:"Kunai",emoji:"🔪",dmg:5,tier:1,cost:0},
  {name:"Kama",emoji:"🌙",dmg:6,tier:1,cost:0},{name:"Tekko",emoji:"🥊",dmg:6,tier:1,cost:0},
  {name:"Sai",emoji:"🔱",dmg:7,tier:1,cost:0},{name:"Fukiya",emoji:"🎋",dmg:7,tier:1,cost:0},
  {name:"Tessen",emoji:"🪭",dmg:8,tier:1,cost:0},{name:"Jitte",emoji:"🔀",dmg:8,tier:1,cost:0},
  {name:"Hanbo",emoji:"🪄",dmg:9,tier:1,cost:0},{name:"Rokushakubo",emoji:"🎴",dmg:9,tier:1,cost:0},
  {name:"Kanabo",emoji:"🏏",dmg:10,tier:1,cost:0},{name:"Tetsubo",emoji:"🪵",dmg:10,tier:1,cost:0},
  // T2
  {name:"Katana",emoji:"🥷",dmg:10,tier:2,cost:80},{name:"Kodachi",emoji:"🗡️",dmg:10,tier:2,cost:80},
  {name:"Yari",emoji:"📌",dmg:10,tier:2,cost:80},{name:"Naginata",emoji:"🌀",dmg:10,tier:2,cost:80},
  {name:"Tachi",emoji:"🌊",dmg:11,tier:2,cost:80},{name:"Uchigatana",emoji:"🌸",dmg:11,tier:2,cost:80},
  {name:"Ono",emoji:"🪓",dmg:11,tier:2,cost:80},{name:"Nagamaki",emoji:"🌿",dmg:11,tier:2,cost:80},
  {name:"Manriki",emoji:"⛓️",dmg:10,tier:2,cost:80},{name:"Chokuto",emoji:"🗡️",dmg:11,tier:2,cost:80},
  {name:"Sarissa",emoji:"🔱",dmg:11,tier:2,cost:80},{name:"Kontos",emoji:"🏇",dmg:10,tier:2,cost:80},
  {name:"Mace",emoji:"🔨",dmg:10,tier:2,cost:80},{name:"Bow & Arrow",emoji:"🏹",dmg:11,tier:2,cost:80},
  {name:"Kestros",emoji:"🎯",dmg:11,tier:2,cost:80},{name:"Rhomphaia",emoji:"⚔️",dmg:11,tier:2,cost:80},
  // T3
  {name:"Nodachi",emoji:"🌑",dmg:11,tier:3,cost:200},{name:"Kyoketsu-shoge",emoji:"🕸️",dmg:11,tier:3,cost:200},
  {name:"Hoko Yari",emoji:"☄️",dmg:12,tier:3,cost:200},{name:"Jumonji Yari",emoji:"✚",dmg:12,tier:3,cost:200},
  {name:"Sankaku Yari",emoji:"🔻",dmg:12,tier:3,cost:200},{name:"Sasaho Yari",emoji:"🪬",dmg:12,tier:3,cost:200},
  {name:"Odachi",emoji:"⚡",dmg:12,tier:3,cost:200},{name:"Yumi",emoji:"🏹",dmg:12,tier:3,cost:200},
  {name:"Hankyu",emoji:"🎯",dmg:11,tier:3,cost:200},{name:"Daikyu",emoji:"🎑",dmg:12,tier:3,cost:200},
  // T4
  {name:"Kabutowari",emoji:"👑",dmg:13,tier:4,cost:400},{name:"Hachiwari",emoji:"💎",dmg:13,tier:4,cost:400},
  {name:"Kusari-fundo",emoji:"💫",dmg:13,tier:4,cost:400},{name:"Shikomizue",emoji:"🐍",dmg:13,tier:4,cost:400},
  {name:"Gunbai",emoji:"🛡️",dmg:13,tier:4,cost:400},{name:"Tanegashima",emoji:"🔫",dmg:13,tier:4,cost:400},
  {name:"Wakizashi",emoji:"🩸",dmg:13,tier:4,cost:400},{name:"Tanto",emoji:"🌙",dmg:13,tier:4,cost:400},
  {name:"Masakari",emoji:"🐉",dmg:13,tier:4,cost:400},{name:"Kanemuchi",emoji:"🔥",dmg:13,tier:4,cost:400},
  // T5
  {name:"Metsubushi",emoji:"💥",dmg:14,tier:5,cost:800},{name:"Bisento",emoji:"🐲",dmg:14,tier:5,cost:800},
  {name:"Sasumata",emoji:"🦅",dmg:14,tier:5,cost:800},{name:"Makura Yari",emoji:"🌙",dmg:14,tier:5,cost:800},
  {name:"Kiseru",emoji:"🪬",dmg:14,tier:5,cost:800},{name:"Naginata-kamayari",emoji:"🌀",dmg:14,tier:5,cost:800},
  {name:"Jutte",emoji:"⚜️",dmg:14,tier:5,cost:800},{name:"Kaginawa",emoji:"🪝",dmg:14,tier:5,cost:800},
  {name:"Teporenki",emoji:"🔱",dmg:14,tier:5,cost:800},{name:"Shinobi-zue",emoji:"🌿",dmg:14,tier:5,cost:800},
  // T6 — Divine weapons (dmg 15, cost 1200)
  {name:"Atom Scythe",emoji:"⚛️",dmg:15,tier:6,cost:1200},
  {name:"Void Reaper",emoji:"🌀",dmg:15,tier:6,cost:1200},
  {name:"Eclipse Blade",emoji:"🌑",dmg:15,tier:6,cost:1200},
  {name:"Celestial Bow",emoji:"🏹",dmg:15,tier:6,cost:1200},
  {name:"Solar Spear",emoji:"☀️",dmg:15,tier:6,cost:1200},
  {name:"Lunar Scimitar",emoji:"🌙",dmg:15,tier:6,cost:1200},
  {name:"Draconic Lance",emoji:"🐉",dmg:15,tier:6,cost:1200},
  {name:"Storm Halberd",emoji:"⛈️",dmg:15,tier:6,cost:1200},
  {name:"Phoenix Blade",emoji:"🔥",dmg:15,tier:6,cost:1200},
  {name:"Abyssal Katana",emoji:"🕳️",dmg:15,tier:6,cost:1200},
  {name:"Titan Crusher",emoji:"⚙️",dmg:15,tier:6,cost:1200},
  {name:"Astral Dagger",emoji:"✨",dmg:15,tier:6,cost:1200},
  // T7 — Transcendent (dmg 17+, ultra rare)
  {name:"Getsuga Tensho",emoji:"🌠",dmg:18,tier:7,cost:2500},
  {name:"Void Emperor Blade",emoji:"🫥",dmg:17,tier:7,cost:2500},
  {name:"Singularity Edge",emoji:"💫",dmg:17,tier:7,cost:2500},
];

const STARTER_WEAPON_NAMES = ["Shuriken","Kunai","Kama","Tekko","Sai","Fukiya","Tessen","Jitte","Hanbo","Rokushakubo","Kanabo","Tetsubo"];
const LOADOUT_SIZE = 12;
const TIER_INFO = {
  1:{name:"Starter",color:"#9b92c8",glow:"rgba(155,146,200,0.3)"},
  2:{name:"Iron",color:"#94a3b8",glow:"rgba(148,163,184,0.3)"},
  3:{name:"Steel",color:"#22d3ee",glow:"rgba(34,211,238,0.3)"},
  4:{name:"Shadow",color:"#a855f7",glow:"rgba(168,85,247,0.3)"},
  5:{name:"Legendary",color:"#facc15",glow:"rgba(250,204,21,0.35)"},
  6:{name:"Divine",color:"#ff6b35",glow:"rgba(255,107,53,0.4)"},
  7:{name:"Transcendent",color:"#ffffff",glow:"rgba(255,255,255,0.45)"},
};

function getShieldValues(weaponList){const s=new Set(weaponList.map(w=>w.dmg));return[...s].sort((a,b)=>a-b);}
// Returns shield values for player X, ALWAYS including a shield to block opponent's weapon if known
function getShieldValuesForPlayer(myWeapons, opponentWeapon){
  const vals=new Set(myWeapons.map(w=>w.dmg));
  // Always ensure a shield value that perfectly blocks the opponent's weapon exists
  if(opponentWeapon)vals.add(opponentWeapon.dmg);
  return[...vals].sort((a,b)=>a-b);
}
let WEAPONS=ALL_WEAPONS.filter(w=>STARTER_WEAPON_NAMES.includes(w.name));
let SHIELD_VALUES=getShieldValues(WEAPONS);

const MAX_HP=30,SHOTS_PER_ROUND=6,TOTAL_ROUNDS=3;
const USERNAME_REGEX=/^[a-zA-Z0-9_]{3,15}$/;
const SESSION_KEY="klocvork_session";
const TOKENS_WIN=200,TOKENS_LOSS=50,POTION_COST=15,POTION_HEAL=10;
const BOSS_HP_MAX=300,BOSS_TOKENS=900,SPECIAL_CHANCE=0.001,SPECIAL_WINS_NEED=3,SPECIAL_TOKENS=30;
const TRAIT_ROLL_COST=500,CLAN_REROLL_COST=4000,CLAN_UPGRADE_COST=1000,RACE_REROLL_COST=3000;

// ══════════════════════════════════════════════
// ACCESSORIES (random drops)
// ══════════════════════════════════════════════
const ALL_ACCESSORIES=[
  {id:"acc_crown",name:"Gold Crown",emoji:"👑",rarity:"Legendary",desc:"+5% coin bonus per win"},
  {id:"acc_cloak",name:"Shadow Cloak",emoji:"🌑",rarity:"Epic",desc:"+1 dmg on your first shot per match"},
  {id:"acc_ring",name:"Steel Ring",emoji:"💍",rarity:"Rare",desc:"+1 HP at start of each round"},
  {id:"acc_amulet",name:"Void Amulet",emoji:"🔮",rarity:"Epic",desc:"20% chance to avoid 1 damage"},
  {id:"acc_gauntlet",name:"Iron Gauntlet",emoji:"🦾",rarity:"Uncommon",desc:"+1 shield effectiveness"},
  {id:"acc_tome",name:"Battle Tome",emoji:"📖",rarity:"Uncommon",desc:"+10 XP per match"},
  {id:"acc_feather",name:"Phoenix Feather",emoji:"🪶",rarity:"Legendary",desc:"Revive with 5 HP once per match"},
  {id:"acc_gem",name:"Chaos Gem",emoji:"💎",rarity:"Mythic",desc:"Random bonus each round"},
  {id:"acc_chain",name:"Soul Chain",emoji:"⛓️",rarity:"Rare",desc:"Enemy heals 1 less from potions"},
  {id:"acc_mask",name:"War Mask",emoji:"🎭",rarity:"Common",desc:"+5 coins per perfect block"},
];

// ══════════════════════════════════════════════
// LEVEL SYSTEM — 1000 levels, no names, just Lv.N
// ══════════════════════════════════════════════
const MAX_LEVEL=1000;
// Pre-compute cumulative XP thresholds for all 1000 levels
// Formula: each level costs floor(9000 * 1.02^(level-2)) XP; cumulative sum = threshold
const LEVEL_XP_THRESHOLDS=(()=>{
  const arr=[0];
  let cum=0;
  for(let i=2;i<=MAX_LEVEL;i++){cum+=Math.floor(9000*Math.pow(1.02,i-2));arr.push(cum);}
  return arr;
})();

function getCurrentLevelNum(xp){
  let lvl=1;
  for(let i=1;i<MAX_LEVEL;i++){if(xp>=LEVEL_XP_THRESHOLDS[i])lvl=i+1;else break;}
  return Math.min(lvl,MAX_LEVEL);
}
function getLevelColor(l){
  if(l>=900)return"#ff6b35";if(l>=700)return"#facc15";if(l>=500)return"#a855f7";
  if(l>=300)return"#22d3ee";if(l>=100)return"#4ade80";if(l>=50)return"#94a3b8";return"#9b92c8";
}
function getLevelBadge(l){
  if(l>=900)return"💠";if(l>=700)return"👑";if(l>=500)return"🔱";
  if(l>=300)return"🏆";if(l>=100)return"🛡️";if(l>=50)return"⚔️";return"🥉";
}
const XP_BASE_RATE=1.04;
function getXpForAction(action,lvl){
  const base={win:120,loss:30,boss:200,special:60,shot:4};
  const capLvl=action==="shot"?Math.min((lvl||1)-1,8):Math.min((lvl||1)-1,30);
  return Math.round((base[action]||10)*Math.pow(XP_BASE_RATE,capLvl));
}

// ══════════════════════════════════════════════
// CLAN SYSTEM
// ══════════════════════════════════════════════
const CLANS={
  exorcist:{name:"Exorcist Clan",emoji:"🌿",color:"#4ade80",lore:"Masters of purification and holy strikes.",
    versions:{
      1:{name:"Seeker",buff:"+1 dmg on first shot per round"},
      2:{name:"Warden",buff:"+2 dmg on first shot per round"},
      3:{name:"Arch Exorcist",buff:"+2 dmg + lifesteal 1 HP on first shot"},
      4:{name:"Divine Purger",buff:"HOLY FLAME: First shot ignores enemy shield entirely",special:true},
    }},
  eclipse:{name:"Eclipse Clan",emoji:"🌑",color:"#a855f7",lore:"Shadow walkers who manipulate fate and darkness.",
    versions:{
      1:{name:"Eclipsen",buff:"10% chance to dodge 1 damage"},
      2:{name:"Lunar Night",buff:"20% chance to dodge 1 damage"},
      3:{name:"Night Sentinal",buff:"25% dodge + enemy sees wrong shield hint"},
      4:{name:"Lunar Regent",buff:"VOID WALK: 35% dodge + first shot always crits",special:true},
    }},
  hydros:{name:"Hydros Clan",emoji:"💧",color:"#22d3ee",lore:"Fluid warriors who flow like water around every strike.",
    versions:{
      1:{name:"Tideborn",buff:"Potions heal +2 extra HP"},
      2:{name:"Riverblood",buff:"Potions heal +4 extra HP"},
      3:{name:"Current Binder",buff:"Potions heal +5 HP + recover 1 shield point"},
      4:{name:"Leviathan",buff:"DEEP SURGE: Potions heal +8 HP + deal 3 dmg to enemy",special:true},
    }},
  vulcryn:{name:"Vulcryn Clan",emoji:"🔥",color:"#ff6b35",lore:"Forge-born warriors who burn hotter the longer they fight.",
    versions:{
      1:{name:"Ember Flame",buff:"Deal +1 dmg when HP < 15"},
      2:{name:"Inferno Knight",buff:"Deal +2 dmg when HP < 15"},
      3:{name:"Pyroclast",buff:"+2 dmg below 15 HP + 5% lifesteal"},
      4:{name:"Helltide",buff:"ERUPTION: +3 dmg all shots + every 3rd shot burns enemy for -2 HP next turn",special:true},
    }},
  thunder:{name:"Thunder Clan",emoji:"⚡",color:"#facc15",lore:"Storm-born warriors who strike with the fury of lightning.",rollOnly:true,
    versions:{
      1:{name:"Stormborn",buff:"+1 dmg on every even-numbered shot"},
      2:{name:"Thunderstrike",buff:"+2 dmg on every even-numbered shot"},
      3:{name:"Tempest Knight",buff:"+2 dmg every even shot + 15% chance to stun (enemy loses 1 shield pt)"},
      4:{name:"Thunder God",buff:"LIGHTNING SURGE: Every shot has 25% chance to deal +3 bonus dmg + chain lightning -2 HP",special:true},
    }},
  shadow:{name:"Shadow Clan",emoji:"🌑",color:"#7c3aed",lore:"Unseen assassins who manipulate darkness and strike from the void.",rollOnly:true,
    versions:{
      1:{name:"Shade",buff:"10% chance to deal double damage"},
      2:{name:"Phantom",buff:"20% chance to deal double damage"},
      3:{name:"Wraith",buff:"25% double dmg chance + opponent cannot see your weapon choice"},
      4:{name:"Shadow Sovereign",buff:"VOID EXECUTION: 35% double dmg + first shot each round auto-crits",special:true},
    }},
  spirit:{name:"Spirit Clan",emoji:"👻",color:"#b8aaff",lore:"Transcendent warriors who channel the power of pure spirit energy beyond mortal limits. The rarest clan of all — only the chosen few may wield spirit energy.",rollOnly:true,
    versions:{
      1:{name:"Wisp",buff:"+1 dmg on every shot + 10% chance to negate damage taken"},
      2:{name:"Specter",buff:"+2 dmg on every shot + 20% chance to negate damage taken"},
      3:{name:"Phantom Lord",buff:"+2 dmg + 25% negate + weapon ignores 2 shield points"},
      4:{name:"Spirit Sovereign",buff:"SPIRIT SURGE: +3 dmg all shots + 35% negate + every 3rd shot deals DOUBLE damage",special:true},
    }},
};
const CLAN_KEYS=["exorcist","eclipse","hydros","vulcryn"];
const ALL_CLAN_KEYS=["exorcist","eclipse","hydros","vulcryn","thunder","shadow","spirit"];
const ROLL_ONLY_CLANS=["thunder","shadow","spirit"];
function getRandomClan(){return CLAN_KEYS[Math.floor(Math.random()*CLAN_KEYS.length)];}
function getRandomRollClan(){return ALL_CLAN_KEYS[Math.floor(Math.random()*ALL_CLAN_KEYS.length)];}

// ══════════════════════════════════════════════
// RACES SYSTEM
// ══════════════════════════════════════════════
const RACES = {
  human:        {name:"Human Race",        emoji:"🧑",  color:"#94a3b8", chance:0.50, lore:"Resilient and adaptable warriors forged by will alone.",        perks:["+10% coin bonus from all sources","Faster clan upgrade (5% off)","Balanced stats in all areas"],
    v4ability:{name:"Bullseye",emoji:"🎯",desc:"Ignores opponent's shield AND potion this shot. Once per round.",cooldown:"round"}},
  oni:          {name:"Oni Race",           emoji:"👹",  color:"#f43f5e", chance:0.20, lore:"Demonic warriors of raw power and unstoppable fury.",           perks:["+2 base damage on all attacks","Opponent starts with 1 less HP per round","+1 dmg for every 3 HP lost (Berserker Blood)"],
    v4ability:{name:"Lifesteal",emoji:"🩸",desc:"Drains opponent HP to completely fill your own HP. Once per round.",cooldown:"round"}},
  heavenly:     {name:"Heavenly Race",      emoji:"✨",  color:"#facc15", chance:0.10, lore:"Chosen by the divine — rare, radiant, and untouchable.",        perks:["Divine Shield: 15% chance to negate all damage","+25% XP from all actions","Perfect blocks restore 2 HP (Blessed)"],
    v4ability:{name:"God's Grace",emoji:"🌟",desc:"Perfect counter this shot AND regain ALL your HP. Once per round.",cooldown:"round"}},
  supernatural: {name:"Supernatural Race", emoji:"👻",  color:"#a855f7", chance:0.20, lore:"Beings beyond the mortal realm, bending fate itself.",          perks:["Phase Shift: 20% dodge per round","Soul sight: see opponent shield hint once per match","Cursed aura: enemy trait effectiveness -10%"],
    v4ability:{name:"EnMagicked",emoji:"🌀",desc:"Perfect counter + weapon bypasses 50% of shield + bonus damage scales with missing HP. Once per match.",cooldown:"match"}},
  fluxion:  {name:"Fluxion",        emoji:"🌌",  color:"#ffffff", chance:0,    lore:"A being beyond existence itself. Admin-only. Cannot be obtained through normal means.",perks:["Reality bends to your will","All abilities are enhanced","Beyond all classification"],
    v4ability:{name:"Inversion Rift",emoji:"💥",desc:"Reality collapses — instantly ends the match. Once per match.",cooldown:"match",endGame:true},adminOnly:true},
};
const RACE_KEYS = ["human","oni","heavenly","supernatural"];

function getRandomRace(){
  const r=Math.random(); let cum=0;
  for(const key of RACE_KEYS){cum+=RACES[key].chance;if(r<cum)return key;}
  return "human";
}

// ══════════════════════════════════════════════
// CRAFTING MATERIALS (34 types)
// ══════════════════════════════════════════════
const CRAFTING_MATERIALS=[
  {id:"iron_shard",name:"Iron Shard",emoji:"🔩",rarity:"Common"},{id:"shadow_dust",name:"Shadow Dust",emoji:"🌑",rarity:"Common"},
  {id:"flame_crystal",name:"Flame Crystal",emoji:"🔥",rarity:"Uncommon"},{id:"frost_shard",name:"Frost Shard",emoji:"❄️",rarity:"Uncommon"},
  {id:"lightning_core",name:"Lightning Core",emoji:"⚡",rarity:"Rare"},{id:"void_essence",name:"Void Essence",emoji:"🌀",rarity:"Rare"},
  {id:"soul_fragment",name:"Soul Fragment",emoji:"💀",rarity:"Epic"},{id:"dragon_scale",name:"Dragon Scale",emoji:"🐉",rarity:"Epic"},
  {id:"starlight",name:"Starlight Dust",emoji:"✨",rarity:"Legendary"},{id:"blood_crystal",name:"Blood Crystal",emoji:"🩸",rarity:"Common"},
  {id:"bone_powder",name:"Bone Powder",emoji:"🦴",rarity:"Common"},{id:"thunder_gem",name:"Thunder Gem",emoji:"💎",rarity:"Uncommon"},
  {id:"wind_feather",name:"Wind Feather",emoji:"🪶",rarity:"Common"},{id:"earth_clay",name:"Sacred Clay",emoji:"🏺",rarity:"Common"},
  {id:"spirit_ink",name:"Spirit Ink",emoji:"🖋️",rarity:"Uncommon"},{id:"sunstone",name:"Sunstone",emoji:"☀️",rarity:"Rare"},
  {id:"moonbeam",name:"Moonbeam Shard",emoji:"🌙",rarity:"Uncommon"},{id:"poison_vial",name:"Poison Vial",emoji:"🧪",rarity:"Rare"},
  {id:"cursed_rune",name:"Cursed Rune",emoji:"🔮",rarity:"Epic"},{id:"phoenix_ash",name:"Phoenix Ash",emoji:"🪹",rarity:"Legendary"},
  {id:"titan_ore",name:"Titan Ore",emoji:"⚙️",rarity:"Rare"},{id:"mana_crystal",name:"Mana Crystal",emoji:"💠",rarity:"Uncommon"},
  {id:"war_medal",name:"War Medal",emoji:"🏅",rarity:"Common"},{id:"dark_essence",name:"Dark Essence",emoji:"🫀",rarity:"Rare"},
  {id:"chaos_shard",name:"Chaos Shard",emoji:"🌪️",rarity:"Epic"},{id:"time_dust",name:"Time Dust",emoji:"⌛",rarity:"Legendary"},
  {id:"spider_silk",name:"Spider Silk",emoji:"🕸️",rarity:"Common"},{id:"ember_core",name:"Ember Core",emoji:"🪨",rarity:"Uncommon"},
  {id:"tide_pearl",name:"Tide Pearl",emoji:"🐚",rarity:"Rare"},{id:"eclipse_shard",name:"Eclipse Shard",emoji:"🌘",rarity:"Epic"},

  // ── Extended Material Catalogue (300 total) ──
  // Fire/Lava materials
  {id:"lava_core",name:"Lava Core",emoji:"🌋",rarity:"Rare"},
  {id:"magma_shard",name:"Magma Shard",emoji:"🔴",rarity:"Uncommon"},
  {id:"inferno_gem",name:"Inferno Gem",emoji:"💎",rarity:"Epic"},
  {id:"cinder_dust",name:"Cinder Dust",emoji:"🔥",rarity:"Common"},
  {id:"volcanic_ash",name:"Volcanic Ash",emoji:"🌑",rarity:"Common"},
  {id:"fire_opal",name:"Fire Opal",emoji:"🟠",rarity:"Rare"},
  {id:"hellstone",name:"Hellstone",emoji:"⬛",rarity:"Epic"},
  {id:"blaze_crystal",name:"Blaze Crystal",emoji:"🔶",rarity:"Rare"},
  // Ice/Water materials
  {id:"glacier_shard",name:"Glacier Shard",emoji:"🧊",rarity:"Common"},
  {id:"deep_sea_pearl",name:"Deep Sea Pearl",emoji:"🫧",rarity:"Rare"},
  {id:"cryo_gem",name:"Cryo Gem",emoji:"💠",rarity:"Epic"},
  {id:"tidal_essence",name:"Tidal Essence",emoji:"🌊",rarity:"Uncommon"},
  {id:"frozen_heart",name:"Frozen Heart",emoji:"❄️",rarity:"Rare"},
  {id:"ocean_tear",name:"Ocean Tear",emoji:"💧",rarity:"Common"},
  {id:"blizzard_core",name:"Blizzard Core",emoji:"🌨️",rarity:"Epic"},
  {id:"permafrost",name:"Permafrost",emoji:"🟦",rarity:"Uncommon"},
  // Lightning materials
  {id:"storm_crystal",name:"Storm Crystal",emoji:"⚡",rarity:"Rare"},
  {id:"thunder_scale",name:"Thunder Scale",emoji:"🐉",rarity:"Epic"},
  {id:"static_dust",name:"Static Dust",emoji:"✨",rarity:"Common"},
  {id:"arc_fragment",name:"Arc Fragment",emoji:"🌩️",rarity:"Uncommon"},
  {id:"plasma_shard",name:"Plasma Shard",emoji:"🔵",rarity:"Rare"},
  {id:"bolt_essence",name:"Bolt Essence",emoji:"💛",rarity:"Uncommon"},
  // Nature/Earth materials
  {id:"ancient_bark",name:"Ancient Bark",emoji:"🪵",rarity:"Common"},
  {id:"vine_silk",name:"Vine Silk",emoji:"🌿",rarity:"Common"},
  {id:"petal_dust",name:"Petal Dust",emoji:"🌸",rarity:"Uncommon"},
  {id:"forest_gem",name:"Forest Gem",emoji:"💚",rarity:"Rare"},
  {id:"earthshaker_ore",name:"Earthshaker Ore",emoji:"🪨",rarity:"Epic"},
  {id:"root_crystal",name:"Root Crystal",emoji:"🌱",rarity:"Uncommon"},
  {id:"mosstone",name:"Mosstone",emoji:"🍀",rarity:"Common"},
  {id:"terra_shard",name:"Terra Shard",emoji:"🏔️",rarity:"Rare"},
  // Dark/Shadow materials
  {id:"nightmare_dust",name:"Nightmare Dust",emoji:"🌑",rarity:"Uncommon"},
  {id:"shadow_gem",name:"Shadow Gem",emoji:"🖤",rarity:"Rare"},
  {id:"void_crystal",name:"Void Crystal",emoji:"🔮",rarity:"Epic"},
  {id:"dusk_shard",name:"Dusk Shard",emoji:"🌘",rarity:"Uncommon"},
  {id:"phantom_ore",name:"Phantom Ore",emoji:"👻",rarity:"Rare"},
  {id:"soul_ash",name:"Soul Ash",emoji:"💀",rarity:"Common"},
  {id:"abyss_gem",name:"Abyss Gem",emoji:"🌀",rarity:"Epic"},
  {id:"hex_rune",name:"Hex Rune",emoji:"🔯",rarity:"Uncommon"},
  // Celestial/Light materials
  {id:"starcore",name:"Starcore",emoji:"⭐",rarity:"Rare"},
  {id:"moonstone",name:"Moonstone",emoji:"🌙",rarity:"Uncommon"},
  {id:"sunbeam_shard",name:"Sunbeam Shard",emoji:"☀️",rarity:"Rare"},
  {id:"nova_dust",name:"Nova Dust",emoji:"💫",rarity:"Uncommon"},
  {id:"cosmos_gem",name:"Cosmos Gem",emoji:"🌌",rarity:"Epic"},
  {id:"aurora_crystal",name:"Aurora Crystal",emoji:"🌈",rarity:"Rare"},
  {id:"celestine",name:"Celestine",emoji:"✨",rarity:"Legendary"},
  {id:"radiance_core",name:"Radiance Core",emoji:"💡",rarity:"Epic"},
  // Metal/Ore materials
  {id:"mithril_ore",name:"Mithril Ore",emoji:"🪩",rarity:"Rare"},
  {id:"orichalcum",name:"Orichalcum",emoji:"🟡",rarity:"Epic"},
  {id:"darksteel",name:"Darksteel",emoji:"⬛",rarity:"Rare"},
  {id:"ironwood",name:"Ironwood",emoji:"🪚",rarity:"Common"},
  {id:"cobalt_ingot",name:"Cobalt Ingot",emoji:"🔹",rarity:"Uncommon"},
  {id:"moonsilver",name:"Moonsilver",emoji:"🌕",rarity:"Rare"},
  {id:"adamantite",name:"Adamantite",emoji:"🔷",rarity:"Legendary"},
  {id:"war_iron",name:"War Iron",emoji:"⚙️",rarity:"Common"},
  // Arcane/Magic materials
  {id:"mana_shard",name:"Mana Shard",emoji:"🔮",rarity:"Common"},
  {id:"arcane_dust",name:"Arcane Dust",emoji:"✨",rarity:"Uncommon"},
  {id:"spell_core",name:"Spell Core",emoji:"💜",rarity:"Rare"},
  {id:"rift_essence",name:"Rift Essence",emoji:"🌀",rarity:"Epic"},
  {id:"enchant_stone",name:"Enchant Stone",emoji:"🪬",rarity:"Uncommon"},
  {id:"hex_crystal",name:"Hex Crystal",emoji:"🔯",rarity:"Rare"},
  {id:"runic_shard",name:"Runic Shard",emoji:"🔱",rarity:"Uncommon"},
  {id:"mystic_orb",name:"Mystic Orb",emoji:"🔮",rarity:"Epic"},
  // Beast/Monster materials
  {id:"wolf_fang",name:"Wolf Fang",emoji:"🐺",rarity:"Common"},
  {id:"dragon_bone",name:"Dragon Bone",emoji:"🦴",rarity:"Epic"},
  {id:"phoenix_feather",name:"Phoenix Feather",emoji:"🪶",rarity:"Legendary"},
  {id:"serpent_venom",name:"Serpent Venom",emoji:"🐍",rarity:"Rare"},
  {id:"bear_claw",name:"Bear Claw",emoji:"🐻",rarity:"Common"},
  {id:"griffin_talon",name:"Griffin Talon",emoji:"🦅",rarity:"Rare"},
  {id:"basilisk_eye",name:"Basilisk Eye",emoji:"👁️",rarity:"Epic"},
  {id:"hydra_scale",name:"Hydra Scale",emoji:"🐉",rarity:"Legendary"},
  // Plant/Herb materials
  {id:"nightshade",name:"Nightshade",emoji:"🌿",rarity:"Uncommon"},
  {id:"bloodvine",name:"Bloodvine",emoji:"🍀",rarity:"Rare"},
  {id:"sunflower_core",name:"Sunflower Core",emoji:"🌻",rarity:"Common"},
  {id:"thornwood",name:"Thornwood",emoji:"🌵",rarity:"Common"},
  {id:"lotus_dust",name:"Lotus Dust",emoji:"🪷",rarity:"Uncommon"},
  {id:"mandrake_root",name:"Mandrake Root",emoji:"🌱",rarity:"Rare"},
  {id:"hex_herb",name:"Hex Herb",emoji:"🍃",rarity:"Uncommon"},
  {id:"ghost_flower",name:"Ghost Flower",emoji:"🌸",rarity:"Epic"},
  // Energy materials
  {id:"ki_fragment",name:"Ki Fragment",emoji:"💠",rarity:"Uncommon"},
  {id:"chi_crystal",name:"Chi Crystal",emoji:"🔵",rarity:"Rare"},
  {id:"aura_shard",name:"Aura Shard",emoji:"🟣",rarity:"Uncommon"},
  {id:"spirit_energy",name:"Spirit Energy",emoji:"👻",rarity:"Rare"},
  {id:"life_essence",name:"Life Essence",emoji:"💚",rarity:"Common"},
  {id:"death_energy",name:"Death Energy",emoji:"💀",rarity:"Rare"},
  {id:"balance_stone",name:"Balance Stone",emoji:"⚖️",rarity:"Epic"},
  {id:"primal_core",name:"Primal Core",emoji:"🌟",rarity:"Epic"},
  // Celestial bodies
  {id:"meteor_shard",name:"Meteor Shard",emoji:"☄️",rarity:"Rare"},
  {id:"comet_dust",name:"Comet Dust",emoji:"💫",rarity:"Uncommon"},
  {id:"astral_ore",name:"Astral Ore",emoji:"🌌",rarity:"Epic"},
  {id:"nebula_dust",name:"Nebula Dust",emoji:"🌠",rarity:"Uncommon"},
  {id:"supernova_core",name:"Supernova Core",emoji:"💥",rarity:"Legendary"},
  {id:"black_hole_shard",name:"Black Hole Shard",emoji:"🕳️",rarity:"Mythic"},
  {id:"quasar_gem",name:"Quasar Gem",emoji:"🔭",rarity:"Legendary"},
  {id:"pulsar_crystal",name:"Pulsar Crystal",emoji:"📡",rarity:"Epic"},
  // Blood/Life
  {id:"iron_blood",name:"Iron Blood",emoji:"🩸",rarity:"Common"},
  {id:"cursed_blood",name:"Cursed Blood",emoji:"❤️",rarity:"Rare"},
  {id:"golden_blood",name:"Golden Blood",emoji:"💛",rarity:"Legendary"},
  {id:"silver_blood",name:"Silver Blood",emoji:"🩶",rarity:"Uncommon"},
  {id:"dragon_blood",name:"Dragon Blood",emoji:"🩺",rarity:"Epic"},
  {id:"celestial_blood",name:"Celestial Blood",emoji:"✨",rarity:"Mythic"},
  {id:"void_blood",name:"Void Blood",emoji:"🖤",rarity:"Epic"},
  {id:"holy_water",name:"Holy Water",emoji:"💧",rarity:"Rare"},
  // Crystals
  {id:"amethyst_shard",name:"Amethyst Shard",emoji:"💜",rarity:"Uncommon"},
  {id:"ruby_fragment",name:"Ruby Fragment",emoji:"❤️",rarity:"Rare"},
  {id:"sapphire_core",name:"Sapphire Core",emoji:"💙",rarity:"Rare"},
  {id:"emerald_dust",name:"Emerald Dust",emoji:"💚",rarity:"Uncommon"},
  {id:"obsidian_shard",name:"Obsidian Shard",emoji:"⬛",rarity:"Common"},
  {id:"crystal_heart",name:"Crystal Heart",emoji:"💎",rarity:"Epic"},
  {id:"prismatic_gem",name:"Prismatic Gem",emoji:"🌈",rarity:"Legendary"},
  {id:"onyx_core",name:"Onyx Core",emoji:"🖤",rarity:"Uncommon"},
  // Tech/Arcane
  {id:"nano_shard",name:"Nano Shard",emoji:"🔬",rarity:"Rare"},
  {id:"quantum_core",name:"Quantum Core",emoji:"⚛️",rarity:"Mythic"},
  {id:"circuit_ore",name:"Circuit Ore",emoji:"🔌",rarity:"Uncommon"},
  {id:"energy_cell",name:"Energy Cell",emoji:"🔋",rarity:"Common"},
  {id:"data_crystal",name:"Data Crystal",emoji:"💾",rarity:"Rare"},
  {id:"plasma_core",name:"Plasma Core",emoji:"🌡️",rarity:"Epic"},
  {id:"tech_dust",name:"Tech Dust",emoji:"⚙️",rarity:"Common"},
  {id:"void_chip",name:"Void Chip",emoji:"🖥️",rarity:"Epic"},
  // Mythic extras
  {id:"infinity_shard",name:"Infinity Shard",emoji:"♾️",rarity:"Mythic"},
  {id:"genesis_core",name:"Genesis Core",emoji:"🌍",rarity:"Mythic"},
  {id:"omega_crystal",name:"Omega Crystal",emoji:"🔱",rarity:"Mythic"},
  {id:"alpha_ore",name:"Alpha Ore",emoji:"🅰️",rarity:"Mythic"},
  {id:"eternity_gem",name:"Eternity Gem",emoji:"⏳",rarity:"Mythic"},
  // Seasonal/Event
  {id:"harvest_grain",name:"Harvest Grain",emoji:"🌾",rarity:"Common"},
  {id:"snow_crystal",name:"Snow Crystal",emoji:"❄️",rarity:"Uncommon"},
  {id:"storm_seed",name:"Storm Seed",emoji:"🌩️",rarity:"Rare"},
  {id:"sun_petal",name:"Sun Petal",emoji:"🌸",rarity:"Common"},
  {id:"moon_flower",name:"Moon Flower",emoji:"🌙",rarity:"Uncommon"},
  {id:"void_seed",name:"Void Seed",emoji:"🌑",rarity:"Epic"},
  // War/Weapon byproducts
  {id:"shattered_blade",name:"Shattered Blade",emoji:"⚔️",rarity:"Common"},
  {id:"war_trophy",name:"War Trophy",emoji:"🏆",rarity:"Uncommon"},
  {id:"cursed_medal",name:"Cursed Medal",emoji:"🏅",rarity:"Rare"},
  {id:"battle_scar",name:"Battle Scar",emoji:"🩹",rarity:"Common"},
  {id:"champion_crest",name:"Champion Crest",emoji:"👑",rarity:"Epic"},
  {id:"warlord_seal",name:"Warlord Seal",emoji:"🔰",rarity:"Legendary"},
  {id:"eternal_trophy",name:"Eternal Trophy",emoji:"🥇",rarity:"Mythic"},
  {id:"glory_fragment",name:"Glory Fragment",emoji:"🌟",rarity:"Rare"},
  // Misc rare
  {id:"time_crystal",name:"Time Crystal",emoji:"⌚",rarity:"Legendary"},
  {id:"fate_thread",name:"Fate Thread",emoji:"🧵",rarity:"Epic"},
  {id:"destiny_shard",name:"Destiny Shard",emoji:"🎯",rarity:"Legendary"},
  {id:"prophecy_stone",name:"Prophecy Stone",emoji:"🔮",rarity:"Epic"},
  {id:"chaos_gem",name:"Chaos Gem",emoji:"🌀",rarity:"Rare"},
  {id:"order_crystal",name:"Order Crystal",emoji:"📐",rarity:"Rare"},
  {id:"harmony_bead",name:"Harmony Bead",emoji:"📿",rarity:"Uncommon"},
  {id:"discord_shard",name:"Discord Shard",emoji:"💢",rarity:"Uncommon"},
  // Poison/Toxic
  {id:"toxic_slime",name:"Toxic Slime",emoji:"🟢",rarity:"Common"},
  {id:"acid_core",name:"Acid Core",emoji:"🧪",rarity:"Uncommon"},
  {id:"plague_dust",name:"Plague Dust",emoji:"☣️",rarity:"Rare"},
  {id:"venom_crystal",name:"Venom Crystal",emoji:"🐍",rarity:"Epic"},
  {id:"blight_shard",name:"Blight Shard",emoji:"🦠",rarity:"Uncommon"},
  {id:"poison_gem",name:"Poison Gem",emoji:"💚",rarity:"Rare"},
  // Divine/Holy
  {id:"divine_light",name:"Divine Light",emoji:"🌟",rarity:"Legendary"},
  {id:"angel_feather",name:"Angel Feather",emoji:"🪶",rarity:"Epic"},
  {id:"holy_rune",name:"Holy Rune",emoji:"✝️",rarity:"Rare"},
  {id:"blessing_stone",name:"Blessing Stone",emoji:"🙏",rarity:"Uncommon"},
  {id:"sacred_ash",name:"Sacred Ash",emoji:"⚱️",rarity:"Rare"},
  {id:"miracle_shard",name:"Miracle Shard",emoji:"💫",rarity:"Epic"},
  {id:"seraph_core",name:"Seraph Core",emoji:"😇",rarity:"Legendary"},
  {id:"purity_crystal",name:"Purity Crystal",emoji:"🤍",rarity:"Rare"},
  // Demonic
  {id:"demon_horn",name:"Demon Horn",emoji:"😈",rarity:"Epic"},
  {id:"hellfire_core",name:"Hellfire Core",emoji:"🔥",rarity:"Rare"},
  {id:"sin_shard",name:"Sin Shard",emoji:"😡",rarity:"Uncommon"},
  {id:"corruption_gem",name:"Corruption Gem",emoji:"🖤",rarity:"Epic"},
  {id:"brimstone",name:"Brimstone",emoji:"🪨",rarity:"Uncommon"},
  {id:"devil_dust",name:"Devil Dust",emoji:"👿",rarity:"Rare"},
  // Weather
  {id:"rain_crystal",name:"Rain Crystal",emoji:"🌧️",rarity:"Common"},
  {id:"wind_shard",name:"Wind Shard",emoji:"💨",rarity:"Common"},
  {id:"fog_essence",name:"Fog Essence",emoji:"🌫️",rarity:"Uncommon"},
  {id:"hail_stone",name:"Hail Stone",emoji:"🌨️",rarity:"Uncommon"},
  {id:"rainbow_shard",name:"Rainbow Shard",emoji:"🌈",rarity:"Rare"},
  {id:"tornado_core",name:"Tornado Core",emoji:"🌪️",rarity:"Epic"},
  {id:"aurora_shard",name:"Aurora Shard",emoji:"🌅",rarity:"Rare"},
  {id:"cyclone_gem",name:"Cyclone Gem",emoji:"🌀",rarity:"Uncommon"},
  // Ocean/Sea
  {id:"coral_shard",name:"Coral Shard",emoji:"🪸",rarity:"Common"},
  {id:"sea_glass",name:"Sea Glass",emoji:"🫧",rarity:"Common"},
  {id:"abyssal_pearl",name:"Abyssal Pearl",emoji:"🔵",rarity:"Rare"},
  {id:"kraken_ink",name:"Kraken Ink",emoji:"🐙",rarity:"Epic"},
  {id:"mermaid_scale",name:"Mermaid Scale",emoji:"🧜",rarity:"Rare"},
  {id:"leviathan_core",name:"Leviathan Core",emoji:"🌊",rarity:"Legendary"},
  {id:"sea_crystal",name:"Sea Crystal",emoji:"💎",rarity:"Uncommon"},
  {id:"ocean_shard",name:"Ocean Shard",emoji:"🌊",rarity:"Common"},
  // Space
  {id:"void_matter",name:"Void Matter",emoji:"🌌",rarity:"Legendary"},
  {id:"dark_matter",name:"Dark Matter",emoji:"⬛",rarity:"Mythic"},
  {id:"antimatter",name:"Antimatter",emoji:"💥",rarity:"Mythic"},
  {id:"cosmic_dust",name:"Cosmic Dust",emoji:"🌠",rarity:"Uncommon"},
  {id:"stellar_core",name:"Stellar Core",emoji:"⭐",rarity:"Epic"},
  {id:"galactic_shard",name:"Galactic Shard",emoji:"🌌",rarity:"Rare"},
  {id:"neutron_ore",name:"Neutron Ore",emoji:"⚛️",rarity:"Legendary"},
  {id:"space_crystal",name:"Space Crystal",emoji:"🔭",rarity:"Rare"},
  // Undead
  {id:"grave_dust",name:"Grave Dust",emoji:"⚰️",rarity:"Common"},
  {id:"bone_shard",name:"Bone Shard",emoji:"🦷",rarity:"Common"},
  {id:"lich_core",name:"Lich Core",emoji:"💀",rarity:"Legendary"},
  {id:"wraith_essence",name:"Wraith Essence",emoji:"👻",rarity:"Epic"},
  {id:"undead_ore",name:"Undead Ore",emoji:"☠️",rarity:"Rare"},
  {id:"necro_dust",name:"Necro Dust",emoji:"🕯️",rarity:"Uncommon"},
  {id:"spirit_shard",name:"Spirit Shard",emoji:"🌫️",rarity:"Rare"},
  {id:"death_crystal",name:"Death Crystal",emoji:"💀",rarity:"Epic"},
  // Special materials
  {id:"spirit_fragment",name:"Spirit Fragment",emoji:"👻",rarity:"Mythic",shopCost:10000,shopChance:0.005},
  {id:"antimatter_shard",name:"Anti-Matter Shard",emoji:"🌌",rarity:"Mythic",shopCost:35000,shopChance:0.001},
  {id:"fusion_element_x",name:"Fusion Element X",emoji:"🔷",rarity:"Epic",shopCost:1300,shopChance:0.25,shopCostType:"tokens"},
  {id:"fusion_element_y",name:"Fusion Element Y",emoji:"🔶",rarity:"Epic",shopCost:1700,shopChance:0.20,shopCostType:"tokens"},
];

// ══════════════════════════════════════════════
// TRAITS — 100 total (80 rollable + 20 craftable)
// ══════════════════════════════════════════════
const ALL_TRAITS=[
  // Mythic rollable (0.01% — near-impossible roll, intended via crafting)
  {name:"Phantom Strike",emoji:"👻",rarity:"Mythic",chance:0.01,desc:"Attack ignores shields entirely."},
  {name:"Soul Rend",emoji:"💀",rarity:"Mythic",chance:0.01,desc:"Deals double damage on perfect matches."},
  // Legendary
  {name:"Eternal Flame",emoji:"🔥",rarity:"Legendary",chance:0.10,desc:"+2 bonus damage on every attack."},
  {name:"Frostbite",emoji:"❄️",rarity:"Legendary",chance:0.10,desc:"Enemy loses 1 HP per shot passively."},
  {name:"Dragon's Wrath",emoji:"🐉",rarity:"Legendary",chance:0.08,desc:"+3 dmg when you have full HP."},
  {name:"Eclipse Blade",emoji:"🌑",rarity:"Legendary",chance:0.08,desc:"25% chance to deal double damage."},
  {name:"Celestial Forge",emoji:"🌟",rarity:"Legendary",chance:0.09,desc:"+15 coins per perfect block."},
  // Epic
  {name:"Thunder Veil",emoji:"⚡",rarity:"Epic",chance:0.50,desc:"+1 shield effectiveness."},
  {name:"Void Edge",emoji:"🌑",rarity:"Epic",chance:0.50,desc:"25% chance to ignore enemy shield."},
  {name:"Blood Pact",emoji:"🩸",rarity:"Epic",chance:0.75,desc:"Lifesteal: +3 HP per hit."},
  {name:"Voidwalker",emoji:"🌀",rarity:"Epic",chance:0.60,desc:"Once per round: negate all damage."},
  {name:"Storm Caster",emoji:"🌩️",rarity:"Epic",chance:0.55,desc:"+2 dmg on every 3rd shot."},
  {name:"Soul Drain",emoji:"💀",rarity:"Epic",chance:0.65,desc:"Each kill restores 5 HP."},
  {name:"Chaos Nova",emoji:"🌪️",rarity:"Epic",chance:0.50,desc:"15% chance to deal 3 bonus dmg."},
  {name:"Midnight Veil",emoji:"🌘",rarity:"Epic",chance:0.55,desc:"Shield accuracy +2 range."},
  // Rare
  {name:"Iron Will",emoji:"🛡️",rarity:"Rare",chance:1.00,desc:"Reduce incoming damage by 1."},
  {name:"War Cry",emoji:"😤",rarity:"Rare",chance:1.00,desc:"+1 damage when HP < 15."},
  {name:"Mystic Guard",emoji:"🔮",rarity:"Rare",chance:1.50,desc:"Perfect block heals +3 HP."},
  {name:"Serpent's Bite",emoji:"🐍",rarity:"Rare",chance:1.50,desc:"First attack each round +2 dmg."},
  {name:"Dragon Scale",emoji:"🐉",rarity:"Rare",chance:2.00,desc:"Damage cap reduced by 1."},
  {name:"Phoenix Guard",emoji:"🪶",rarity:"Rare",chance:1.20,desc:"Once per match: survive lethal at 1 HP."},
  {name:"Runic Shield",emoji:"🔱",rarity:"Rare",chance:1.30,desc:"Perfect blocks give +1 shield next turn."},
  {name:"Titan's Grip",emoji:"🦾",rarity:"Rare",chance:1.40,desc:"+1 dmg with T5+ weapons."},
  {name:"War Horn",emoji:"📯",rarity:"Rare",chance:1.60,desc:"+50 coins if you win the match."},
  {name:"Spectral Bond",emoji:"👁️",rarity:"Rare",chance:1.80,desc:"See opponent's last used weapon."},
  // Uncommon
  {name:"Shadow Step",emoji:"🌙",rarity:"Uncommon",chance:3.00,desc:"50% chance to dodge 1 damage."},
  {name:"Eagle Eye",emoji:"🦅",rarity:"Uncommon",chance:3.00,desc:"See enemy's shield range hint."},
  {name:"Berserker",emoji:"💢",rarity:"Uncommon",chance:3.50,desc:"Damage +1 for each wound taken."},
  {name:"Crystal Guard",emoji:"💎",rarity:"Uncommon",chance:4.00,desc:"Block values ±1 also count as perfect."},
  {name:"Fortune's Blade",emoji:"🍀",rarity:"Uncommon",chance:4.00,desc:"+10 coins per perfect block."},
  {name:"Blood Rush",emoji:"💉",rarity:"Uncommon",chance:3.20,desc:"+1 max HP each round (stacks)."},
  {name:"Arcane Flow",emoji:"🌊",rarity:"Uncommon",chance:3.60,desc:"+1 dmg every 2 consecutive hits."},
  {name:"Stone Skin",emoji:"🪨",rarity:"Uncommon",chance:3.80,desc:"Incoming dmg capped at 8."},
  {name:"Spirit Lance",emoji:"🏹",rarity:"Uncommon",chance:4.20,desc:"+2 dmg on shots 4, 5, and 6."},
  {name:"Twin Fang",emoji:"🐍",rarity:"Uncommon",chance:3.40,desc:"10% chance to strike twice."},
  {name:"Wraithborn",emoji:"👻",rarity:"Uncommon",chance:3.70,desc:"First hit taken is reduced by 3."},
  {name:"Momentum",emoji:"🌀",rarity:"Uncommon",chance:3.90,desc:"+0.5 dmg stacking per consecutive hit."},
  // Common (44 rollable common traits to reach 80 total rollable)
  {name:"Veteran's Mark",emoji:"🎖️",rarity:"Common",chance:5.00,desc:"+5 XP per shot with this weapon."},
  {name:"Quickdraw",emoji:"⚡",rarity:"Common",chance:6.00,desc:"No cooldown on weapon reuse."},
  {name:"Forged in Fire",emoji:"🔨",rarity:"Common",chance:6.00,desc:"+3 HP at round start."},
  {name:"Blessed Edge",emoji:"✨",rarity:"Common",chance:7.00,desc:"+1 dmg on odd-numbered shots."},
  {name:"Bane of Knights",emoji:"⚔️",rarity:"Common",chance:7.00,desc:"+2 dmg against shielded opponents."},
  {name:"Ghost Armor",emoji:"👻",rarity:"Common",chance:8.00,desc:"First hit each match deals 0 damage to you."},
  {name:"Relic's Echo",emoji:"🏺",rarity:"Common",chance:8.00,desc:"Legacy: a mark of history on your blade."},
  {name:"Battle Rhythm",emoji:"🥁",rarity:"Common",chance:5.50,desc:"+1 dmg if you hit 3 shots in a row."},
  {name:"Coin Hoarder",emoji:"🪙",rarity:"Common",chance:6.50,desc:"+25 coins on win."},
  {name:"Shield Savvy",emoji:"🛡️",rarity:"Common",chance:7.50,desc:"+5 XP for perfect blocks."},
  {name:"Warrior's Pride",emoji:"💪",rarity:"Common",chance:6.80,desc:"+3 XP per shot regardless of outcome."},
  {name:"Last Stand",emoji:"🗡️",rarity:"Common",chance:5.80,desc:"+2 dmg when below 10 HP."},
  {name:"Hunter's Instinct",emoji:"🦊",rarity:"Common",chance:7.20,desc:"+1 dmg against the same weapon used twice."},
  {name:"Ironclad",emoji:"🔒",rarity:"Common",chance:6.20,desc:"-1 incoming dmg from T1 weapons."},
  {name:"Adrenaline",emoji:"❤️",rarity:"Common",chance:5.30,desc:"+2 HP when you deal 10+ dmg in a shot."},
  {name:"Warlord's Decree",emoji:"👑",rarity:"Common",chance:6.60,desc:"+1 dmg for each round you've won."},
  {name:"Duelist's Honor",emoji:"🤺",rarity:"Common",chance:7.80,desc:"+20 coins if you win without using potions."},
  {name:"Shield Ripper",emoji:"🔓",rarity:"Common",chance:5.70,desc:"+2 dmg if opponent used same shield last turn."},
  {name:"Arena Savant",emoji:"📜",rarity:"Common",chance:6.10,desc:"+8 XP per match victory."},
  {name:"Bloodhound",emoji:"🐕",rarity:"Common",chance:5.90,desc:"+1 dmg for each HP difference."},
  {name:"Fortune Smiles",emoji:"😊",rarity:"Common",chance:7.40,desc:"5% chance for free potion each match."},
  {name:"Steel Resolve",emoji:"⚙️",rarity:"Common",chance:6.30,desc:"+1 dmg with any T2+ weapon."},
  {name:"Grizzled Veteran",emoji:"🧔",rarity:"Common",chance:5.60,desc:"+10 XP per perfect block."},
  {name:"Cunning Blade",emoji:"🗡️",rarity:"Common",chance:7.90,desc:"+1 dmg against opponents above 20 HP."},
  {name:"Relentless",emoji:"💨",rarity:"Common",chance:5.40,desc:"+1 dmg per round after round 1."},
  {name:"Iron Heart",emoji:"🫀",rarity:"Common",chance:6.70,desc:"+2 max HP permanently (this match)."},
  {name:"Quick Reflexes",emoji:"🌪️",rarity:"Common",chance:5.20,desc:"10% chance to halve incoming damage."},
  {name:"Blade Dancer",emoji:"🩰",rarity:"Common",chance:7.60,desc:"+1 dmg when using T3+ weapons."},
  {name:"Endurance",emoji:"🏃",rarity:"Common",chance:6.00,desc:"-1 dmg taken per round (stacks)."},
  {name:"Stalwart",emoji:"🏰",rarity:"Common",chance:5.10,desc:"First 3 HP lost each match is negated."},
  {name:"Sharpshooter",emoji:"🎯",rarity:"Common",chance:7.30,desc:"+2 dmg on shots 1 and 2 each round."},
  {name:"Reaper's Touch",emoji:"☠️",rarity:"Common",chance:5.00,desc:"+1 dmg when opponent is below half HP."},
  {name:"Tempered Steel",emoji:"🔧",rarity:"Common",chance:6.40,desc:"+1 dmg with any equipped weapon."},
  {name:"Scavenger",emoji:"🦅",rarity:"Common",chance:5.80,desc:"+10 coins per shot dealt."},
  {name:"Wrath",emoji:"💢",rarity:"Common",chance:6.90,desc:"+1 dmg for every 5 HP lost this match."},
  {name:"Gambler's Eye",emoji:"🎲",rarity:"Common",chance:7.10,desc:"20% chance for +2 bonus dmg on any hit."},
  {name:"Silent Step",emoji:"🤫",rarity:"Common",chance:5.50,desc:"Opponent can't see your previous shield."},
  {name:"Oath of Steel",emoji:"⚔️",rarity:"Common",chance:6.20,desc:"+2 dmg in sudden death rounds."},
  {name:"Blood Money",emoji:"💰",rarity:"Common",chance:7.00,desc:"+30 coins on a round win."},
  {name:"Titan Slayer",emoji:"🪓",rarity:"Common",chance:5.30,desc:"+2 dmg against T5+ weapon users."},
  {name:"Berserker's Howl",emoji:"🐺",rarity:"Common",chance:6.80,desc:"+1 dmg if you lost the previous shot."},
  {name:"Arcane Ward",emoji:"🔵",rarity:"Common",chance:7.50,desc:"5% chance to block all damage."},
  {name:"Path of Steel",emoji:"⚙️",rarity:"Common",chance:5.70,desc:"+3 XP when you deal a perfect block."},
  // ══ 20 NEW ROLLABLE TRAITS ══
  // Legendary
  {name:"Void Emperor",emoji:"🌌",rarity:"Legendary",chance:0.09,desc:"Every 3rd hit deals +4 bonus void damage."},
  {name:"Sunburst",emoji:"☀️",rarity:"Legendary",chance:0.08,desc:"When HP falls below 10, deal double damage on next hit."},
  // Epic
  {name:"Shadow Clone",emoji:"👥",rarity:"Epic",chance:0.60,desc:"15% chance to attack twice in one shot."},
  {name:"Titan's Resolve",emoji:"🗿",rarity:"Epic",chance:0.55,desc:"After taking 10+ dmg in a round, gain +2 dmg for remainder."},
  {name:"Rune Cascade",emoji:"🔮",rarity:"Epic",chance:0.50,desc:"Gain +1 shield range every 2 perfect blocks."},
  // Rare
  {name:"Assassin's Focus",emoji:"🕵️",rarity:"Rare",chance:1.00,desc:"First shot each round ignores 1 shield point."},
  {name:"Battle Hunger",emoji:"🐗",rarity:"Rare",chance:1.30,desc:"Gain +1 HP for every 3 dmg dealt."},
  {name:"Echo Strike",emoji:"🔁",rarity:"Rare",chance:1.50,desc:"20% chance to repeat last weapon's bonus dmg."},
  {name:"Thunderclap",emoji:"⛈️",rarity:"Rare",chance:1.20,desc:"+2 dmg on shots 2 and 5 each round."},
  {name:"Spectral Armor",emoji:"🌫️",rarity:"Rare",chance:1.70,desc:"10% chance to completely negate incoming damage."},
  // Uncommon
  {name:"Windwalker",emoji:"🌬️",rarity:"Uncommon",chance:3.00,desc:"Incoming damage reduced by 1 on even-numbered shots."},
  {name:"Mark of Fury",emoji:"😡",rarity:"Uncommon",chance:3.50,desc:"+0.5 dmg per shot lost this round, resets on round win."},
  {name:"Silver Edge",emoji:"🥈",rarity:"Uncommon",chance:3.20,desc:"+1 dmg when opponent has more HP than you."},
  {name:"Tenacity",emoji:"🏋️",rarity:"Uncommon",chance:4.00,desc:"After losing a round, start next with +5 bonus HP."},
  {name:"Ghost Shroud",emoji:"🕶️",rarity:"Uncommon",chance:3.80,desc:"First 2 hits each match deal 1 less damage to you."},
  // Common
  {name:"Forge Master",emoji:"🔨",rarity:"Common",chance:5.50,desc:"+5 XP per shot regardless of outcome."},
  {name:"Iron Nerves",emoji:"🧠",rarity:"Common",chance:6.00,desc:"+15 coins for each round survived at under 10 HP."},
  {name:"Blade Ward",emoji:"🛡️",rarity:"Common",chance:7.00,desc:"10% chance to reduce incoming damage by 2."},
  {name:"Combat Focus",emoji:"🎯",rarity:"Common",chance:5.80,desc:"+1 dmg if this weapon wasn't used in the last 2 shots."},
  {name:"Lucky Edge",emoji:"🍀",rarity:"Common",chance:7.50,desc:"8% chance to add +2 bonus dmg on any hit."},
  // ══ CRAFTABLE TRAITS (20) ══
  {name:"Hellfire Surge",emoji:"🌋",rarity:"Mythic",chance:0,craftable:true,
   recipe:{flame_crystal:5,dragon_scale:3,chaos_shard:2},desc:"Every 2nd shot deals +4 bonus fire damage."},
  {name:"Abyssal Armor",emoji:"🌊",rarity:"Mythic",chance:0,craftable:true,
   recipe:{tide_pearl:5,void_essence:3,dark_essence:2},desc:"Reduce all incoming damage by 2."},
  {name:"Temporal Shift",emoji:"⌛",rarity:"Mythic",chance:0,craftable:true,
   recipe:{time_dust:3,mana_crystal:5,starlight:2},desc:"Once per match, replay your last shot."},
  {name:"Soulbind",emoji:"🫀",rarity:"Legendary",chance:0,craftable:true,
   recipe:{soul_fragment:4,spirit_ink:3,blood_crystal:4},desc:"Lifesteal 5 HP per kill."},
  {name:"Runic Eruption",emoji:"🌋",rarity:"Legendary",chance:0,craftable:true,
   recipe:{cursed_rune:3,ember_core:4,titan_ore:3},desc:"+3 dmg on shots in the last round."},
  {name:"Arctic Veil",emoji:"❄️",rarity:"Epic",chance:0,craftable:true,
   recipe:{frost_shard:5,moonbeam:3,wind_feather:3},desc:"20% chance to freeze opponent (skip shield)."},
  {name:"Bloodbound Armor",emoji:"🩸",rarity:"Epic",chance:0,craftable:true,
   recipe:{blood_crystal:6,iron_shard:4,bone_powder:3},desc:"+1 dmg for every 5 HP you've lost this match."},
  {name:"Thunder Stride",emoji:"⚡",rarity:"Epic",chance:0,craftable:true,
   recipe:{lightning_core:4,thunder_gem:4,wind_feather:2},desc:"+2 dmg + 10% dodge on every odd-numbered shot."},
  {name:"Void Resonance",emoji:"🌀",rarity:"Epic",chance:0,craftable:true,
   recipe:{void_essence:5,eclipse_shard:3,shadow_dust:4},desc:"25% chance to deal double damage."},
  {name:"Solar Wrath",emoji:"☀️",rarity:"Rare",chance:0,craftable:true,
   recipe:{sunstone:4,flame_crystal:3,starlight:2},desc:"+2 dmg on the 1st and 6th shots each round."},
  {name:"Moon's Embrace",emoji:"🌙",rarity:"Rare",chance:0,craftable:true,
   recipe:{moonbeam:5,spirit_ink:3,shadow_dust:3},desc:"Perfect blocks also deal 2 dmg to opponent."},
  {name:"Venom Coat",emoji:"🐍",rarity:"Rare",chance:0,craftable:true,
   recipe:{poison_vial:4,spider_silk:4,bone_powder:3},desc:"Opponent loses 1 HP for 2 turns after being hit."},
  {name:"Ancient Rune",emoji:"🔮",rarity:"Rare",chance:0,craftable:true,
   recipe:{cursed_rune:3,earth_clay:4,war_medal:3},desc:"All trait effects on this weapon deal +1 bonus."},
  {name:"Steel Juggernaut",emoji:"⚙️",rarity:"Uncommon",chance:0,craftable:true,
   recipe:{titan_ore:4,iron_shard:5,earth_clay:3},desc:"+2 dmg with T3+ weapons."},
  {name:"Spirit Walk",emoji:"🪶",rarity:"Uncommon",chance:0,craftable:true,
   recipe:{wind_feather:5,spirit_ink:4,moonbeam:2},desc:"Immune to the first hit of each round."},
  {name:"Battle Surge",emoji:"💪",rarity:"Uncommon",chance:0,craftable:true,
   recipe:{war_medal:5,iron_shard:4,mana_crystal:2},desc:"+1 dmg per shot, resets each round."},
  {name:"Ember Strike",emoji:"🔥",rarity:"Common",chance:0,craftable:true,
   recipe:{ember_core:4,flame_crystal:3,iron_shard:3},desc:"+1 fire damage on every hit."},
  {name:"Tidal Force",emoji:"💧",rarity:"Common",chance:0,craftable:true,
   recipe:{tide_pearl:3,blood_crystal:4,bone_powder:3},desc:"+2 HP from potions."},
  {name:"Eclipse Mark",emoji:"🌘",rarity:"Common",chance:0,craftable:true,
   recipe:{eclipse_shard:3,shadow_dust:4,dark_essence:2},desc:"15% chance to ignore incoming damage."},
  {name:"Stone Fist",emoji:"🪨",rarity:"Common",chance:0,craftable:true,
   recipe:{earth_clay:5,iron_shard:4,bone_powder:3},desc:"+1 dmg on all attacks for the whole match."},
];

function rollTrait(){
  const rollable=ALL_TRAITS.filter(t=>t.chance>0&&!t.craftable);
  const total=rollable.reduce((s,t)=>s+t.chance,0);
  const r=Math.random()*total; let cum=0;
  for(const t of rollable){cum+=t.chance;if(r<cum)return t;}
  return rollable[rollable.length-1];
}

// ══════════════════════════════════════════════
// ACHIEVEMENTS (100)
// ══════════════════════════════════════════════
const ACHIEVEMENTS=[
  // ── WINS ──
  {id:"first_win",name:"First Blood",emoji:"🗡️",desc:"Win your first match",check:s=>s.wins>=1},
  {id:"wins_5",name:"Street Fighter",emoji:"🥊",desc:"Win 5 matches",check:s=>s.wins>=5},
  {id:"wins_10",name:"Seasoned Warrior",emoji:"⚔️",desc:"Win 10 matches",check:s=>s.wins>=10},
  {id:"wins_25",name:"Battle-Hardened",emoji:"🛡️",desc:"Win 25 matches",check:s=>s.wins>=25},
  {id:"wins_50",name:"Veteran",emoji:"🌟",desc:"Win 50 matches",check:s=>s.wins>=50},
  {id:"wins_100",name:"Warlord",emoji:"👑",desc:"Win 100 matches",check:s=>s.wins>=100},
  {id:"wins_250",name:"Conqueror",emoji:"🔱",desc:"Win 250 matches",check:s=>s.wins>=250},
  {id:"wins_500",name:"Destroyer",emoji:"💀",desc:"Win 500 matches",check:s=>s.wins>=500},
  {id:"wins_1000",name:"Eternal Champion",emoji:"🌠",desc:"Win 1,000 matches",check:s=>s.wins>=1000},
  // ── PERFECT BLOCKS ──
  {id:"perfect_1",name:"Deflector",emoji:"🔄",desc:"Get your first perfect block",check:s=>s.perfectBlocks>=1},
  {id:"perfect_10",name:"Shield Savant",emoji:"🛡️",desc:"Get 10 perfect blocks",check:s=>s.perfectBlocks>=10},
  {id:"perfect_50",name:"Untouchable",emoji:"💎",desc:"Get 50 perfect blocks",check:s=>s.perfectBlocks>=50},
  {id:"perfect_100",name:"Mirror Wall",emoji:"🪞",desc:"Get 100 perfect blocks",check:s=>s.perfectBlocks>=100},
  {id:"perfect_250",name:"Ghost Armor",emoji:"👻",desc:"Get 250 perfect blocks",check:s=>s.perfectBlocks>=250},
  {id:"perfect_500",name:"Absolute Defense",emoji:"🏰",desc:"Get 500 perfect blocks",check:s=>s.perfectBlocks>=500},
  // ── BOSS ──
  {id:"boss_kill",name:"Slayer",emoji:"💀",desc:"Kill the boss",check:s=>s.bossKills>=1},
  {id:"boss_kill_5",name:"Boss Hunter",emoji:"🏆",desc:"Kill the boss 5 times",check:s=>s.bossKills>=5},
  {id:"boss_kill_10",name:"Warlord Bane",emoji:"⚔️",desc:"Kill the boss 10 times",check:s=>s.bossKills>=10},
  {id:"boss_kill_25",name:"Legend Slayer",emoji:"🌋",desc:"Kill the boss 25 times",check:s=>s.bossKills>=25},
  // ── LEVELS ──
  {id:"level_10",name:"Rising Star",emoji:"⭐",desc:"Reach level 10",check:(s,lvl)=>lvl>=10},
  {id:"level_25",name:"Adept",emoji:"🌙",desc:"Reach level 25",check:(s,lvl)=>lvl>=25},
  {id:"level_50",name:"Champion",emoji:"🌟",desc:"Reach level 50",check:(s,lvl)=>lvl>=50},
  {id:"level_100",name:"Legend",emoji:"💠",desc:"Reach level 100",check:(s,lvl)=>lvl>=100},
  {id:"level_200",name:"Mythwalker",emoji:"🔱",desc:"Reach level 200",check:(s,lvl)=>lvl>=200},
  {id:"level_500",name:"Transcendent",emoji:"✨",desc:"Reach level 500",check:(s,lvl)=>lvl>=500},
  {id:"level_1000",name:"Immortal",emoji:"🌠",desc:"Reach level 1000 (MAX)",check:(s,lvl)=>lvl>=1000},
  // ── WEAPONS ──
  {id:"buy_weapon",name:"Arms Dealer",emoji:"🛒",desc:"Purchase your first weapon",check:s=>s.weaponsBought>=1},
  {id:"buy_5",name:"Collector",emoji:"🗡️",desc:"Buy 5 weapons",check:s=>s.weaponsBought>=5},
  {id:"buy_10",name:"Arsenal Owner",emoji:"⚔️",desc:"Buy 10 weapons",check:s=>s.weaponsBought>=10},
  {id:"buy_25",name:"Armory",emoji:"🏰",desc:"Buy 25 weapons",check:s=>s.weaponsBought>=25},
  {id:"all_t1",name:"Iron Arsenal",emoji:"🥉",desc:"Own all Tier 2 weapons",check:(s,l,c,owned)=>ALL_WEAPONS.filter(w=>w.tier===2).every(w=>owned.includes(w.name))},
  {id:"divine_weapon",name:"Divine Arsenal",emoji:"🌠",desc:"Own the Getsuga Tensho",check:(s,l,c,owned)=>owned.includes("Getsuga Tensho")},
  {id:"own_t6",name:"Atomic Forge",emoji:"⚛️",desc:"Own the Atom Scythe",check:(s,l,c,owned)=>owned.includes("Atom Scythe")},
  {id:"fused_first",name:"Alchemist",emoji:"⚗️",desc:"Perform your first weapon fusion",check:s=>(s.fusionsPerformed||0)>=1},
  {id:"fused_5",name:"Master Alchemist",emoji:"🔮",desc:"Perform 5 weapon fusions",check:s=>(s.fusionsPerformed||0)>=5},
  // ── CLAN ──
  {id:"clan_v2",name:"Clan Adept",emoji:"🌿",desc:"Reach V2 in your clan",check:(s,l,clan)=>clan&&clan.version>=2},
  {id:"clan_v3",name:"Clan Elite",emoji:"🌙",desc:"Reach V3 in your clan",check:(s,l,clan)=>clan&&clan.version>=3},
  {id:"clan_v4",name:"Clan Master",emoji:"⚜️",desc:"Reach V4 in your clan",check:(s,l,clan)=>clan&&clan.version===4},
  {id:"clan_upgrades_3",name:"Devoted Warrior",emoji:"🔥",desc:"Upgrade your clan 3 times",check:s=>(s.clanUpgrades||0)>=3},
  // ── TRAITS ──
  {id:"craft_first",name:"Crafter",emoji:"🔨",desc:"Craft your first trait",check:s=>s.traitsCrafted>=1},
  {id:"craft_5",name:"Master Crafter",emoji:"🏭",desc:"Craft 5 traits",check:s=>s.traitsCrafted>=5},
  {id:"craft_10",name:"Forge Lord",emoji:"⚙️",desc:"Craft 10 traits",check:s=>s.traitsCrafted>=10},
  {id:"mythic_trait",name:"Mythic Bearer",emoji:"🔮",desc:"Obtain any Mythic trait",check:(s,l,c,o,wt)=>Object.values(wt).some(t=>t&&t.rarity==="Mythic")},
  {id:"legendary_trait",name:"Legendary Edge",emoji:"🌟",desc:"Obtain any Legendary trait",check:(s,l,c,o,wt)=>Object.values(wt).some(t=>t&&t.rarity==="Legendary")},
  {id:"traits_rolled_10",name:"Gambler",emoji:"🎲",desc:"Roll traits 10 times",check:s=>(s.traitsRolled||0)>=10},
  {id:"traits_rolled_50",name:"High Roller",emoji:"🃏",desc:"Roll traits 50 times",check:s=>(s.traitsRolled||0)>=50},
  // ── ECONOMY ──
  {id:"tokens_1000",name:"Wealthy",emoji:"💰",desc:"Earn 1,000 total coins",check:s=>s.totalTokensEarned>=1000},
  {id:"tokens_10000",name:"Mogul",emoji:"🤑",desc:"Earn 10,000 total coins",check:s=>s.totalTokensEarned>=10000},
  {id:"tokens_50000",name:"Tycoon",emoji:"💎",desc:"Earn 50,000 total coins",check:s=>s.totalTokensEarned>=50000},
  {id:"tokens_100000",name:"King of Coin",emoji:"👑",desc:"Earn 100,000 total coins",check:s=>s.totalTokensEarned>=100000},
  {id:"trade_first",name:"Trader",emoji:"🤝",desc:"Complete your first trade",check:s=>s.tradesCompleted>=1},
  {id:"trade_10",name:"Merchant",emoji:"🏪",desc:"Complete 10 trades",check:s=>s.tradesCompleted>=10},
  {id:"sold_mats_5",name:"Scrap Dealer",emoji:"🔩",desc:"Sell 5 materials",check:s=>(s.materialsSold||0)>=5},
  {id:"sold_mats_25",name:"Black Market",emoji:"💼",desc:"Sell 25 materials",check:s=>(s.materialsSold||0)>=25},
  // ── ONLINE ──
  {id:"online_win",name:"Online Victor",emoji:"🌐",desc:"Win your first online match",check:s=>s.onlineWins>=1},
  {id:"online_wins_10",name:"Net Warrior",emoji:"🌐",desc:"Win 10 online matches",check:s=>s.onlineWins>=10},
  {id:"online_wins_50",name:"Digital Slayer",emoji:"💻",desc:"Win 50 online matches",check:s=>s.onlineWins>=50},
  // ── RANKED ──
  {id:"ranked_first",name:"Ranked Rookie",emoji:"🏅",desc:"Play your first ranked match",check:s=>(s.rankedWins||0)+(s.rankedLosses||0)>=1},
  {id:"ranked_win_1",name:"Ranked Victor",emoji:"🥇",desc:"Win your first ranked match",check:s=>(s.rankedWins||0)>=1},
  {id:"ranked_win_10",name:"Ranked Warrior",emoji:"🏆",desc:"Win 10 ranked matches",check:s=>(s.rankedWins||0)>=10},
  {id:"ranked_win_50",name:"Ranked Elite",emoji:"🔱",desc:"Win 50 ranked matches",check:s=>(s.rankedWins||0)>=50},
  {id:"rated_1100",name:"Climber",emoji:"📈",desc:"Reach 1100 ranked rating",check:s=>(s.rankedRating||1000)>=1100},
  {id:"rated_1250",name:"Contender",emoji:"⚡",desc:"Reach 1250 ranked rating",check:s=>(s.rankedRating||1000)>=1250},
  {id:"rated_1500",name:"Grandmaster",emoji:"💠",desc:"Reach 1500 ranked rating",check:s=>(s.rankedRating||1000)>=1500},
  // ── TOURNAMENT ──
  {id:"tourney_first",name:"Tournament Debut",emoji:"🎪",desc:"Enter your first tournament",check:s=>(s.tournamentsPlayed||0)>=1},
  {id:"tourney_win",name:"Tournament Champion",emoji:"🏆",desc:"Win a tournament",check:s=>(s.tournamentsWon||0)>=1},
  {id:"tourney_wins_3",name:"Serial Champion",emoji:"👑",desc:"Win 3 tournaments",check:s=>(s.tournamentsWon||0)>=3},
  // ── DAILY / GRIND ──
  {id:"daily_3",name:"Dedicated",emoji:"📅",desc:"Complete 3 daily quests",check:s=>s.dailyCompleted>=3},
  {id:"daily_7",name:"Devoted",emoji:"📅",desc:"Complete 7 daily quests",check:s=>s.dailyCompleted>=7},
  {id:"daily_30",name:"Iron Routine",emoji:"🗓️",desc:"Complete 30 daily quests",check:s=>s.dailyCompleted>=30},
  {id:"daily_100",name:"Ascetic",emoji:"🧘",desc:"Complete 100 daily quests",check:s=>s.dailyCompleted>=100},
  {id:"item_roll_1",name:"Lucky Draw",emoji:"🎲",desc:"Perform your first item roll",check:s=>(s.itemsRolled||0)>=1},
  {id:"item_roll_10",name:"Fortune Seeker",emoji:"🎰",desc:"Perform 10 item rolls",check:s=>(s.itemsRolled||0)>=10},
  // ── COMBAT STATS ──
  {id:"shots_100",name:"Trigger Happy",emoji:"🎯",desc:"Fire 100 shots total",check:s=>(s.totalShots||0)>=100},
  {id:"shots_500",name:"Bullet Storm",emoji:"💥",desc:"Fire 500 shots total",check:s=>(s.totalShots||0)>=500},
  {id:"shots_1000",name:"Unstoppable Force",emoji:"⚡",desc:"Fire 1,000 shots total",check:s=>(s.totalShots||0)>=1000},
  {id:"rounds_50",name:"Seasoned",emoji:"🌀",desc:"Play 50 rounds",check:s=>(s.totalRoundsPlayed||0)>=50},
  {id:"rounds_200",name:"Arena Regular",emoji:"🏟️",desc:"Play 200 rounds",check:s=>(s.totalRoundsPlayed||0)>=200},
  {id:"streak_3",name:"Hot Streak",emoji:"🔥",desc:"Win 3 matches in a row",check:s=>(s.maxConsecutiveWins||0)>=3},
  {id:"streak_5",name:"Unstoppable",emoji:"💫",desc:"Win 5 matches in a row",check:s=>(s.maxConsecutiveWins||0)>=5},
  {id:"streak_10",name:"God Mode",emoji:"🌠",desc:"Win 10 matches in a row",check:s=>(s.maxConsecutiveWins||0)>=10},
  // ── ACCESSORIES ──
  {id:"acc_first",name:"Accessorized",emoji:"💍",desc:"Equip your first accessory",check:s=>(s.accessoriesOwned||0)>=1},
  {id:"acc_5",name:"Fashionista",emoji:"👑",desc:"Own 5 accessories",check:s=>(s.accessoriesOwned||0)>=5},
  {id:"acc_all",name:"Full Set",emoji:"🌟",desc:"Own all 10 accessories",check:s=>(s.accessoriesOwned||0)>=10},
  // ── MISC / SECRET ──
  {id:"first_loss",name:"Baptism of Fire",emoji:"🔥",desc:"Lose your first match",check:s=>s.losses>=1},
  {id:"loss_10",name:"Punching Bag",emoji:"🥊",desc:"Lose 10 matches",check:s=>s.losses>=10},
  {id:"use_potion",name:"Medic",emoji:"🧪",desc:"Use a potion in battle",check:s=>s.wins+s.losses>=1},
  {id:"thunder_clan",name:"Storm Rider",emoji:"⚡",desc:"Join the Thunder Clan",check:(s,l,clan)=>clan&&clan.key==="thunder"},
  {id:"shadow_clan",name:"Void Walker",emoji:"🌑",desc:"Join the Shadow Clan",check:(s,l,clan)=>clan&&clan.key==="shadow"},
  {id:"heavenly_race",name:"Celestial Born",emoji:"✨",desc:"Be of the Heavenly Race",check:(s,l,c,o,wt,race)=>race==="heavenly"},
  {id:"supernatural_race",name:"Beyond Mortal",emoji:"👻",desc:"Be of the Supernatural Race",check:(s,l,c,o,wt,race)=>race==="supernatural"},
];

// ══════════════════════════════════════════════
// DAILY QUESTS
// ══════════════════════════════════════════════
const DAILY_TEMPLATES=[
  {id:"dq_win1",desc:"Win 1 match",type:"win",target:1,reward:{coins:100,mats:["iron_shard","shadow_dust"]}},
  {id:"dq_win3",desc:"Win 3 matches",type:"win",target:3,reward:{coins:250,mats:["flame_crystal","blood_crystal","mana_crystal"]}},
  {id:"dq_block5",desc:"Get 5 perfect blocks",type:"perfectBlock",target:5,reward:{coins:100,mats:["wind_feather","moonbeam"]}},
  {id:"dq_potion",desc:"Use 2 potions in matches",type:"potion",target:2,reward:{coins:80,mats:["tide_pearl","blood_crystal"]}},
  {id:"dq_boss",desc:"Participate in a boss battle",type:"boss",target:1,reward:{coins:150,mats:["dragon_scale","ember_core"]}},
  {id:"dq_shot20",desc:"Play 20 shots total",type:"shot",target:20,reward:{coins:100,mats:["iron_shard","war_medal"]}},
  {id:"dq_online",desc:"Play 1 online match",type:"online",target:1,reward:{coins:120,mats:["lightning_core","spirit_ink"]}},
  {id:"dq_t4weapon",desc:"Use a T4+ weapon in battle",type:"useT4",target:1,reward:{coins:130,mats:["void_essence","chaos_shard"]}},
];
function generateDailyQuests(){
  return[...[...DAILY_TEMPLATES].sort(()=>Math.random()-0.5).slice(0,3)].map(q=>({...q,progress:0,completed:false,claimed:false}));
}
function getDailyQuestKey(){const d=new Date();return`daily_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;}

// ══════════════════════════════════════════════
// SESSION
// ══════════════════════════════════════════════
let currentUser=null;
function saveSession(u){currentUser=u;try{localStorage.setItem(SESSION_KEY,JSON.stringify(u));}catch(e){}}
function loadSession(){try{const r=localStorage.getItem(SESSION_KEY);return r?JSON.parse(r):null;}catch(e){return null;}}
function clearSession(){currentUser=null;try{localStorage.removeItem(SESSION_KEY);}catch(e){}}

// ══════════════════════════════════════════════
// INVENTORY STATE
// ══════════════════════════════════════════════
let localTokens=0,localPotions=0,localXP=0;
let ownedWeapons=[...STARTER_WEAPON_NAMES];
let myLoadout=[...STARTER_WEAPON_NAMES.slice(0,LOADOUT_SIZE)];
let weaponTraits={};
let weaponResonance={};        // {weaponName: resonanceLevel 0-700}
let playerClan=null;       // {key, version}
let playerRace=null;       // race key string
let playerMaterials={};    // {mat_id: count}
let playerAccessories=[];  // [acc_id, ...]
let equippedAccessory=null;
let playerAchievements={}; // {ach_id: true}
let playerStats=defaultStats();
let dailyQuests=null;
let dailyQuestKey="";

function defaultStats(){return{wins:0,losses:0,perfectBlocks:0,bossKills:0,weaponsBought:0,traitsCrafted:0,tradesCompleted:0,dailyCompleted:0,totalTokensEarned:0,onlineWins:0,rankedWins:0,rankedLosses:0,rankedRating:1000,tournamentsWon:0,tournamentsPlayed:0,itemsRolled:0,materialsSold:0,fusionsPerformed:0,traitsRolled:0,clanUpgrades:0,accessoriesOwned:0,totalShots:0,totalDamageDealt:0,totalRoundsPlayed:0,consecutiveWins:0,maxConsecutiveWins:0,dailyStreak:0,lastStreakDate:''};}

function loadInventoryFromData(data){
  localTokens=data?.tokens??0; localPotions=data?.potions??0; localXP=data?.xp??0;
  try{const ow=data?.owned_weapons;ownedWeapons=ow?JSON.parse(ow):[...STARTER_WEAPON_NAMES];STARTER_WEAPON_NAMES.forEach(n=>{if(!ownedWeapons.includes(n))ownedWeapons.push(n);});}catch(e){ownedWeapons=[...STARTER_WEAPON_NAMES];}
  // Restore fused weapons back into ALL_WEAPONS so they work after reload
  try{const fw=data?.fused_weapons;if(fw){const fusedArr=JSON.parse(fw);fusedArr.forEach(w=>{if(w&&w.name&&!ALL_WEAPONS.find(x=>x.name===w.name)){ALL_WEAPONS.push(w);}});}}catch(e){}
  try{const ml=data?.loadout;if(ml){myLoadout=JSON.parse(ml).filter(n=>ownedWeapons.includes(n));if(myLoadout.length>LOADOUT_SIZE)myLoadout=myLoadout.slice(0,LOADOUT_SIZE);}else{myLoadout=ownedWeapons.slice(0,LOADOUT_SIZE);}}catch(e){myLoadout=ownedWeapons.slice(0,LOADOUT_SIZE);}
  try{weaponTraits=data?.weapon_traits?JSON.parse(data.weapon_traits):{};}catch(e){weaponTraits={};}
  try{weaponResonance=data?.weapon_resonance?JSON.parse(data.weapon_resonance):{};}catch(e){weaponResonance={};}
  try{playerClan=data?.clan?JSON.parse(data.clan):null;}catch(e){playerClan=null;}
  try{playerRace=data?.race||null;}catch(e){playerRace=null;}
  // Restore item roll time from DB (so cooldown persists across devices/sessions)
  try{
    const dbRoll=data?.last_roll_time;
    if(dbRoll&&parseInt(dbRoll)>getLastRollTime()){setLastRollTime(parseInt(dbRoll));}
  }catch(e){}
  try{playerMaterials=data?.materials?JSON.parse(data.materials):{};}catch(e){playerMaterials={};}
  try{playerAccessories=data?.accessories?JSON.parse(data.accessories):[];}catch(e){playerAccessories=[];}
  try{equippedAccessory=data?.equipped_accessory||null;}catch(e){equippedAccessory=null;}
  try{playerAchievements=data?.achievements?JSON.parse(data.achievements):{};}catch(e){playerAchievements={};}
  try{playerStats=data?.stats?JSON.parse(data.stats):defaultStats();}catch(e){playerStats=defaultStats();}
  // Daily quests
  const todayKey=getDailyQuestKey();
  try{
    const dq=data?.daily_quests?JSON.parse(data.daily_quests):null;
    if(dq&&dq.key===todayKey){dailyQuests=dq.quests;dailyQuestKey=todayKey;}
    else{dailyQuests=generateDailyQuests();dailyQuestKey=todayKey;}
  }catch(e){dailyQuests=generateDailyQuests();dailyQuestKey=todayKey;}
}

let _dbLoadedOnce=false;
function updateRankedRating(won){
  const k=32;
  const rating=playerStats.rankedRating||1000;
  const opponentRating=1000; // default opponent rating
  const expected=1/(1+Math.pow(10,(opponentRating-rating)/400));
  const change=Math.round(k*(won?1:0-expected));
  playerStats.rankedRating=Math.max(0,rating+change);
  showToast((won?"📈":"📉")+" Ranked Rating: "+(playerStats.rankedRating)+(won?" (+"+change+")":" ("+change+")"),"info");
}
async function loadTokenData(){
  if(!currentUser){
    localTokens=0;localPotions=0;localXP=0;
    ownedWeapons=[...STARTER_WEAPON_NAMES];myLoadout=[...STARTER_WEAPON_NAMES.slice(0,LOADOUT_SIZE)];
    weaponTraits={};playerClan=null;playerRace=null;playerMaterials={};playerAccessories=[];equippedAccessory=null;playerAchievements={};playerStats=defaultStats();dailyQuests=null;
    _dbLoadedOnce=false;updateTokenDisplay();return;
  }
  let data=null;
  for(let attempt=0;attempt<3;attempt++){
    try{
      const res=await db.from("players").select("*").eq("id",currentUser.id).maybeSingle();
      if(res.data){data=res.data;break;}
      if(res.error)console.warn("[load] attempt",attempt+1,res.error.message);
    }catch(e){console.warn("[load] attempt",attempt+1,e);}
    if(attempt<2)await new Promise(r=>setTimeout(r,700*(attempt+1)));
  }
  if(data){loadInventoryFromData(data);_dbLoadedOnce=true;checkDailyStreak();}
  else if(!_dbLoadedOnce){showToast("⚠️ Could not reach server. Progress may not load.","red");}
  // If _dbLoadedOnce already true and fetch failed: silently keep in-memory state (NO WIPE)
  updateTokenDisplay();
}

let _saveQueue=Promise.resolve(); // serialise saves — no overlapping writes
function saveTokenData(){
  if(!currentUser)return Promise.resolve();
  // Chain onto existing queue so rapid calls never race
  _saveQueue=_saveQueue.then(async()=>{
    const fusedWeaponsList = ALL_WEAPONS.filter(w=>w.fused===true);
    const payload={
      tokens:localTokens,potions:localPotions,owned_weapons:JSON.stringify(ownedWeapons),
      loadout:JSON.stringify(myLoadout),xp:localXP,weapon_traits:JSON.stringify(weaponTraits),
      weapon_resonance:JSON.stringify(weaponResonance),
      clan:JSON.stringify(playerClan),race:playerRace,materials:JSON.stringify(playerMaterials),
      accessories:JSON.stringify(playerAccessories),equipped_accessory:equippedAccessory,
      achievements:JSON.stringify(playerAchievements),stats:JSON.stringify(playerStats),
      daily_quests:JSON.stringify({key:dailyQuestKey,quests:dailyQuests}),
      last_roll_time:getLastRollTime(),
      fused_weapons:JSON.stringify(fusedWeaponsList),
    };
    for(let attempt=0;attempt<3;attempt++){
      try{
        const{error}=await db.from("players").update(payload).eq("id",currentUser.id);
        if(!error)return; // success
        console.warn("[save] attempt",attempt+1,"DB error:",error.message);
      }catch(e){console.warn("[save] attempt",attempt+1,"exception:",e);}
      if(attempt<2)await new Promise(r=>setTimeout(r,400*(attempt+1)));
    }
    // All 3 attempts failed — cache locally so next save gets it
    console.error("[save] Failed to save after 3 attempts. XP/tokens held in memory.");
  });
  return _saveQueue;
}

// ══════════════════════════════════════════════
// UPDATE UI
// ══════════════════════════════════════════════
function updateTokenDisplay(){
  document.querySelectorAll(".token-count").forEach(el=>el.textContent=localTokens);
  document.querySelectorAll(".potion-count").forEach(el=>el.textContent=localPotions);
  const lvl=getCurrentLevelNum(localXP);
  const color=getLevelColor(lvl),badge=getLevelBadge(lvl);
  const thisXp=LEVEL_XP_THRESHOLDS[lvl-1]||0;
  const nextXp=lvl<MAX_LEVEL?LEVEL_XP_THRESHOLDS[lvl]:null;
  const prog=nextXp?Math.round(((localXP-thisXp)/(nextXp-thisXp))*100):100;

  const set=(id,fn)=>{const el=document.getElementById(id);if(el)fn(el);};
  set("pcUsername",el=>el.textContent=currentUser?currentUser.username:"Guest");
  set("pcAvatar",el=>el.textContent=badge);
  set("pcAvatarRing",el=>el.style.boxShadow=`0 0 0 3px ${color}55, 0 0 20px ${color}33`);
  set("pcLvlBadge",el=>el.textContent="");
  set("pcLvlName",el=>{el.textContent=`Lv.${lvl}`;el.style.color=color;});
  set("pcXpBar",el=>{el.style.width=prog+"%";el.style.background=`linear-gradient(90deg,${color},${color}cc)`;el.style.boxShadow=`0 0 10px ${color}66`;});
  set("pcXpText",el=>el.textContent=lvl>=MAX_LEVEL?"MAX LEVEL":`${localXP} / ${nextXp}`);
  set("pcTokens",el=>el.textContent=localTokens);
  set("pcPotions",el=>el.textContent=localPotions);

  // Clan badge
  const cb=document.getElementById("pcClanBadge");
  if(cb){
    if(playerClan&&CLANS[playerClan.key]){
      const c=CLANS[playerClan.key],ver=c.versions[playerClan.version];
      cb.style.display="flex";
      let badgeHtml=`<span style="color:${c.color}">${c.emoji} ${c.name}</span><span class="clan-version-chip" style="color:${c.color};border-color:${c.color}44">V${playerClan.version} — ${ver.name}</span>`;
      if(playerRace&&RACES[playerRace]){const rc=RACES[playerRace];badgeHtml+=`<span class="race-chip" style="color:${rc.color};border-color:${rc.color}44">${rc.emoji} ${rc.name}</span>`;}
      cb.innerHTML=badgeHtml;
    }else{cb.style.display="none";}
  }
  updateUserPill();
  checkAchievements();
}

async function awardTokens(amount,reason){
  localTokens+=amount;
  if(amount>0)playerStats.totalTokensEarned=(playerStats.totalTokensEarned||0)+amount;
  updateTokenDisplay();
  if(reason)showToast("+"+amount+" 🪙  "+reason,"gold");
  await saveTokenData();
}

async function awardXP(action){
  const lvlBefore=getCurrentLevelNum(localXP);
  const gained=getXpForAction(action,lvlBefore);
  localXP+=gained;
  const lvlAfter=getCurrentLevelNum(localXP);
  if(lvlAfter>lvlBefore)showToast(`🎉 Level Up! Lv.${lvlAfter}`,"gold");
  updateTokenDisplay();
  await saveTokenData();
}

function addMaterial(matId,count){playerMaterials[matId]=(playerMaterials[matId]||0)+count;}

// ══════════════════════════════════════════════
// WEAPON RESONANCE (mastery system — max 700)
// ══════════════════════════════════════════════
const RESONANCE_MAX=700;
const RESONANCE_MILESTONES=[50,150,300,500,700];
function getResonanceBonus(weaponName){
  const r=weaponResonance[weaponName]||0;
  if(r>=700)return 5; if(r>=500)return 4;
  if(r>=300)return 3; if(r>=150)return 2;
  if(r>=50) return 1; return 0;
}
function gainResonance(weaponName){
  if(!currentUser||!weaponName)return;
  const prev=weaponResonance[weaponName]||0;
  if(prev>=RESONANCE_MAX)return;
  const next=Math.min(RESONANCE_MAX,prev+1);
  weaponResonance[weaponName]=next;
  // Notify on milestones
  if(RESONANCE_MILESTONES.includes(next)){
    const bonus=getResonanceBonus(weaponName);
    showToast(`🔮 ${weaponName} Resonance ${next}! Bonus: +${bonus} dmg`,"gold");
  }
  if(next%100===0&&next>0&&!RESONANCE_MILESTONES.includes(next)){
    showToast(`🔮 ${weaponName} Resonance: ${next}/700`,"info");
  }
}

// ══════════════════════════════════════════════
// DAILY LOGIN STREAK
// ══════════════════════════════════════════════
function checkDailyStreak(){
  if(!currentUser)return;
  const today=new Date().toISOString().slice(0,10);
  const last=playerStats.lastStreakDate||'';
  if(last===today)return; // already claimed today
  const yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10);
  if(last===yesterday){
    playerStats.dailyStreak=(playerStats.dailyStreak||0)+1;
  }else{
    playerStats.dailyStreak=1; // streak broken or first login
  }
  playerStats.lastStreakDate=today;
  const streak=playerStats.dailyStreak;
  let coins=0,xp=0,mats=[];
  if(streak>=30){coins=2000;xp=1000;mats=['void_essence','chaos_shard','titan_ore'];}
  else if(streak>=21){coins=1000;xp=500;mats=['eclipse_shard','dragon_scale'];}
  else if(streak>=14){coins=600;xp=250;mats=['flame_crystal','void_essence'];}
  else if(streak>=7) {coins=300;xp=100;mats=['flame_crystal','blood_crystal'];}
  else if(streak>=3) {coins=150;xp=50; mats=['iron_shard','mana_crystal'];}
  else               {coins=75;        mats=['iron_shard'];}
  localTokens+=coins;
  if(coins>0)playerStats.totalTokensEarned=(playerStats.totalTokensEarned||0)+coins;
  if(xp>0)localXP+=xp;
  mats.forEach(m=>addMaterial(m,1));
  showToast(`🔥 Day ${streak} Streak! +${coins}🪙${xp?` +${xp}XP`:''}${mats.length?' +mats':''}${streak>=7?' 🌟':''}${streak>=30?' 🏆':''}`, 'gold');
  updateTokenDisplay();
  saveTokenData();
}

// ══════════════════════════════════════════════
// ACHIEVEMENT REWARDS (coins + xp + mats on unlock)
// ══════════════════════════════════════════════
const ACHIEVEMENT_REWARDS={
  // Easy
  first_win:{coins:100,xp:50,mats:['iron_shard']},
  perfect_1:{coins:100,xp:50,mats:['iron_shard']},
  first_loss:{coins:50,xp:25},
  use_potion:{coins:50,xp:25},
  buy_weapon:{coins:100,xp:50},
  craft_first:{coins:100,xp:50,mats:['iron_shard']},
  daily_3:{coins:100,xp:50,mats:['iron_shard']},
  shots_100:{coins:100,xp:50,mats:['iron_shard']},
  rounds_50:{coins:100,xp:50,mats:['iron_shard']},
  item_roll_1:{coins:50,xp:25},
  ranked_first:{coins:100,xp:50,mats:['iron_shard']},
  acc_first:{coins:100,xp:50},
  online_win:{coins:100,xp:50},
  boss_kill:{coins:150,xp:75,mats:['ember_core']},
  tourney_first:{coins:100,xp:50},
  fused_first:{coins:100,xp:50},
  traits_rolled_10:{coins:100,xp:50},
  legendary_trait:{coins:150,xp:75,mats:['starlight']},
  tokens_1000:{coins:100,xp:50},
  trade_first:{coins:100,xp:50},
  sold_mats_5:{coins:100,xp:50},
  level_10:{coins:150,xp:75,mats:['iron_shard','blood_crystal']},
  thunder_clan:{coins:100,xp:50,mats:['lightning_core']},
  shadow_clan:{coins:100,xp:50,mats:['shadow_dust']},
  loss_10:{coins:75,xp:30},
  // Medium
  wins_5:{coins:300,xp:150,mats:['blood_crystal']},
  wins_10:{coins:300,xp:150,mats:['blood_crystal','iron_shard']},
  perfect_10:{coins:300,xp:150,mats:['wind_feather']},
  boss_kill_5:{coins:300,xp:150,mats:['dragon_scale']},
  level_25:{coins:300,xp:150,mats:['flame_crystal']},
  level_50:{coins:300,xp:150,mats:['flame_crystal','mana_crystal']},
  buy_5:{coins:250,xp:125,mats:['iron_shard']},
  buy_10:{coins:300,xp:150,mats:['blood_crystal']},
  clan_v2:{coins:300,xp:150,mats:['spirit_ink']},
  craft_5:{coins:300,xp:150,mats:['iron_shard','ember_core']},
  traits_rolled_50:{coins:300,xp:150,mats:['mana_crystal']},
  tokens_10000:{coins:300,xp:150,mats:['blood_crystal']},
  trade_10:{coins:300,xp:150,mats:['iron_shard']},
  online_wins_10:{coins:300,xp:150,mats:['lightning_core']},
  ranked_win_1:{coins:300,xp:150,mats:['war_medal']},
  rated_1100:{coins:300,xp:150,mats:['war_medal']},
  daily_7:{coins:300,xp:150,mats:['blood_crystal']},
  shots_500:{coins:300,xp:150,mats:['iron_shard']},
  streak_3:{coins:300,xp:150,mats:['flame_crystal']},
  item_roll_10:{coins:250,xp:100},
  acc_5:{coins:300,xp:150,mats:['moonbeam']},
  fused_5:{coins:300,xp:150,mats:['ember_core']},
  tourney_win:{coins:400,xp:200,mats:['war_medal','starlight']},
  clan_upgrades_3:{coins:300,xp:150,mats:['spirit_ink']},
  heavenly_race:{coins:200,xp:100,mats:['starlight']},
  supernatural_race:{coins:200,xp:100,mats:['shadow_dust']},
  sold_mats_25:{coins:250,xp:125,mats:['iron_shard']},
  // Hard
  wins_25:{coins:600,xp:300,mats:['flame_crystal','void_essence']},
  wins_50:{coins:600,xp:300,mats:['dragon_scale','mana_crystal']},
  perfect_50:{coins:600,xp:300,mats:['wind_feather','moonbeam']},
  boss_kill_10:{coins:600,xp:300,mats:['dragon_scale','ember_core']},
  level_100:{coins:600,xp:300,mats:['void_essence','chaos_shard']},
  buy_25:{coins:600,xp:300,mats:['blood_crystal','iron_shard']},
  clan_v3:{coins:600,xp:300,mats:['spirit_ink','shadow_dust']},
  craft_10:{coins:600,xp:300,mats:['ember_core','mana_crystal']},
  mythic_trait:{coins:1000,xp:500,mats:['chaos_shard','void_essence']},
  tokens_50000:{coins:600,xp:300,mats:['titan_ore']},
  online_wins_50:{coins:600,xp:300,mats:['lightning_core','wind_feather']},
  ranked_win_10:{coins:600,xp:300,mats:['war_medal','blood_crystal']},
  rated_1250:{coins:600,xp:300,mats:['eclipse_shard','war_medal']},
  daily_30:{coins:600,xp:300,mats:['blood_crystal','mana_crystal']},
  rounds_200:{coins:600,xp:300,mats:['iron_shard','ember_core']},
  shots_1000:{coins:600,xp:300,mats:['iron_shard','war_medal']},
  streak_5:{coins:600,xp:300,mats:['flame_crystal','lightning_core']},
  acc_all:{coins:800,xp:400,mats:['moonbeam','void_essence']},
  tourney_wins_3:{coins:800,xp:400,mats:['war_medal','eclipse_shard']},
  all_t1:{coins:800,xp:400,mats:['iron_shard','blood_crystal','ember_core']},
  // Epic
  wins_100:{coins:1500,xp:750,mats:['void_essence','chaos_shard','dragon_scale']},
  wins_250:{coins:1500,xp:750,mats:['eclipse_shard','void_essence','titan_ore']},
  perfect_100:{coins:1500,xp:750,mats:['moonbeam','wind_feather','spirit_ink']},
  boss_kill_25:{coins:1500,xp:750,mats:['dragon_scale','chaos_shard','titan_ore']},
  level_200:{coins:1500,xp:750,mats:['void_essence','eclipse_shard','starlight']},
  own_t6:{coins:1500,xp:750,mats:['ember_core','titan_ore','chaos_shard']},
  clan_v4:{coins:1500,xp:750,mats:['spirit_ink','shadow_dust','void_essence']},
  tokens_100000:{coins:1500,xp:750,mats:['titan_ore','eclipse_shard']},
  ranked_win_50:{coins:1500,xp:750,mats:['war_medal','eclipse_shard','chaos_shard']},
  rated_1500:{coins:2000,xp:1000,mats:['void_essence','eclipse_shard','titan_ore']},
  daily_100:{coins:1500,xp:750,mats:['blood_crystal','flame_crystal','mana_crystal']},
  streak_10:{coins:2000,xp:1000,mats:['lightning_core','flame_crystal','chaos_shard']},
  divine_weapon:{coins:2000,xp:1000,mats:['void_essence','chaos_shard','eclipse_shard']},
  // Legendary
  wins_500:{coins:3000,xp:1500,mats:['void_essence','chaos_shard','eclipse_shard','titan_ore']},
  wins_1000:{coins:5000,xp:2500,mats:['void_essence','chaos_shard','eclipse_shard','titan_ore','dragon_scale']},
  perfect_250:{coins:3000,xp:1500,mats:['moonbeam','wind_feather','void_essence']},
  perfect_500:{coins:5000,xp:2500,mats:['moonbeam','eclipse_shard','void_essence']},
  level_500:{coins:3000,xp:1500,mats:['eclipse_shard','void_essence','chaos_shard']},
  level_1000:{coins:5000,xp:2500,mats:['titan_ore','eclipse_shard','void_essence','chaos_shard','dragon_scale']},
};

// ══════════════════════════════════════════════
// ACHIEVEMENTS
// ══════════════════════════════════════════════
function checkAchievements(){
  if(!currentUser)return;
  const lvl=getCurrentLevelNum(localXP);
  let newUnlocked=false;
  for(const a of ACHIEVEMENTS){
    if(playerAchievements[a.id])continue;
    try{
      if(a.check(playerStats,lvl,playerClan,ownedWeapons,weaponTraits,playerRace)){
        playerAchievements[a.id]=true;newUnlocked=true;
        showToast(`🏅 Achievement: ${a.name}!`,"gold");
        // Award coins/xp/mats based on difficulty
        const rew=ACHIEVEMENT_REWARDS[a.id];
        if(rew){
          if(rew.coins){localTokens+=rew.coins;playerStats.totalTokensEarned=(playerStats.totalTokensEarned||0)+rew.coins;showToast(`+${rew.coins}🪙 ${a.name} reward`,"gold");}
          if(rew.xp){localXP+=rew.xp;}
          if(rew.mats){rew.mats.forEach(m=>addMaterial(m,1));}
          updateTokenDisplay();
        }
      }
    }catch(e){}
  }
  if(newUnlocked)saveTokenData();
}

// ══════════════════════════════════════════════
// DAILY QUEST PROGRESS
// ══════════════════════════════════════════════
function updateDailyQuest(type,count=1){
  if(!dailyQuests)return;
  let changed=false;
  for(const q of dailyQuests){
    if(q.completed||q.claimed)continue;
    if(q.type===type){
      q.progress=Math.min(q.progress+count,q.target);
      if(q.progress>=q.target){q.completed=true;changed=true;showToast(`📅 Quest done: ${q.desc}!`,"green");}
    }
  }
  if(changed)saveTokenData();
}

// ══════════════════════════════════════════════
// LEVEL PANEL
// ══════════════════════════════════════════════
function showLevelPanel(){renderLevelBody();document.getElementById("modal-level").classList.remove("hidden");}
function hideLevelPanel(){document.getElementById("modal-level").classList.add("hidden");}
function closeLevelIfOutside(e){if(e.target===document.getElementById("modal-level"))hideLevelPanel();}

function renderLevelBody(){
  const body=document.getElementById("levelBody"); if(!body)return;
  const lvl=getCurrentLevelNum(localXP),color=getLevelColor(lvl),badge=getLevelBadge(lvl);
  const thisXp=LEVEL_XP_THRESHOLDS[lvl-1]||0,nextXp=lvl<MAX_LEVEL?LEVEL_XP_THRESHOLDS[lvl]:null;
  const prog=nextXp?Math.round(((localXP-thisXp)/(nextXp-thisXp))*100):100;

  let html=`<div class="level-hero" style="border-color:${color}44">
    <div class="lh-badge">${badge}</div>
    <div class="lh-name" style="color:${color}">Lv.${lvl}</div>
    <div class="lh-xp">${localXP} XP</div>
    <div class="lh-bar-wrap"><div class="lh-bar" style="width:${prog}%;background:${color}"></div></div>
    <div class="lh-sub">${nextXp?(nextXp-localXP)+" XP to Lv."+(lvl+1):"🎊 MAX LEVEL!"}</div>
  </div>
  <div class="level-info-box"><p>XP compounds with level. Formula: <code>base × 1.18^(level-1)</code></p></div>`;

  // Show nearby levels
  const start=Math.max(1,lvl-3),end=Math.min(MAX_LEVEL,lvl+8);
  html+=`<div class="level-grid">`;
  for(let l=start;l<=end;l++){
    const unlocked=localXP>=(LEVEL_XP_THRESHOLDS[l-1]||0);
    const isCur=l===lvl;const c=getLevelColor(l);
    html+=`<div class="level-card ${unlocked?"unlocked":"locked"} ${isCur?"current":""}" style="${isCur?`border-color:${c};box-shadow:0 0 16px ${c}33`:""}">
      <div class="lc-badge">${getLevelBadge(l)}</div>
      <div class="lc-level" style="color:${unlocked?c:"var(--text3)"}">Lv.${l}</div>
      <div class="lc-xp">${LEVEL_XP_THRESHOLDS[l-1]||0} XP</div>
      ${isCur?"<div class='lc-current'>← You</div>":""}
      ${unlocked&&!isCur?"<div class='lc-done'>✓</div>":""}
    </div>`;
  }
  html+=`</div><div class="level-xp-table"><div class="lxt-title">XP Rewards</div>
  <table class="lxt-table"><tr><th>Action</th><th>Base XP</th><th>At Lv.${lvl}</th></tr>
  <tr><td>Win</td><td>50</td><td>${getXpForAction("win",lvl)}</td></tr>
  <tr><td>Loss</td><td>15</td><td>${getXpForAction("loss",lvl)}</td></tr>
  <tr><td>Boss kill</td><td>80</td><td>${getXpForAction("boss",lvl)}</td></tr>
  <tr><td>Per shot</td><td>2</td><td>${getXpForAction("shot",lvl)}</td></tr>
  </table></div>`;
  body.innerHTML=html;
}

// ══════════════════════════════════════════════
// RULEBOOK
// ══════════════════════════════════════════════
function showRulebook(){document.getElementById("modal-rulebook").classList.remove("hidden");}
function hideRulebook(){document.getElementById("modal-rulebook").classList.add("hidden");}
function closeRulebookIfOutside(e){if(e.target===document.getElementById("modal-rulebook"))hideRulebook();}

// ══════════════════════════════════════════════
// TRAIT SHOP
// ══════════════════════════════════════════════
const RARITY_COLORS={"Mythic":"#ff6b35","Legendary":"#facc15","Epic":"#a855f7","Rare":"#22d3ee","Uncommon":"#4ade80","Common":"#94a3b8"};

function showTraitShop(){renderTraitUI();document.getElementById("modal-trait").classList.remove("hidden");}
function hideTraitShop(){document.getElementById("modal-trait").classList.add("hidden");}
function closeTraitIfOutside(e){if(e.target===document.getElementById("modal-trait"))hideTraitShop();}

function renderTraitUI(){
  const body=document.getElementById("traitBody");if(!body)return;
  const rollable=ALL_TRAITS.filter(t=>t.chance>0&&!t.craftable);
  const craftable=ALL_TRAITS.filter(t=>t.craftable);

  let html=`<div class="trait-intro"><div class="trait-intro-text">
    <p>Roll a random trait onto any owned weapon for <strong>500 🪙</strong>. 20 special traits are <strong>craftable only</strong>.</p>
    <div class="trait-balance">Balance: <span style="color:#facc15">${localTokens}</span> 🪙</div>
  </div></div>
  <div class="trait-rarity-legend">`;
  for(const r of["Mythic","Legendary","Epic","Rare","Uncommon","Common"]){
    html+=`<span class="trl-chip" style="color:${RARITY_COLORS[r]};border-color:${RARITY_COLORS[r]}44">${r}</span>`;
  }
  html+=`</div><div class="trait-all-title">Rollable Traits (${rollable.length})</div><div class="trait-grid">`;
  for(const t of rollable){
    const c=RARITY_COLORS[t.rarity]||"#94a3b8";
    html+=`<div class="trait-card" style="border-color:${c}33">
      <div class="tc-emoji">${t.emoji}</div><div class="tc-name" style="color:${c}">${t.name}</div>
      <div class="tc-rarity" style="color:${c}88">${t.rarity}</div>
      <div class="tc-chance">${t.chance===0?"Craft only":t.chance.toFixed(2)+"%"}</div>
      <div class="tc-desc">${t.desc}</div>
    </div>`;
  }
  html+=`</div><div class="trait-all-title" style="color:#facc15">🔨 Craftable Traits (${craftable.length})</div><div class="trait-grid">`;
  for(const t of craftable){
    const c=RARITY_COLORS[t.rarity]||"#94a3b8";
    html+=`<div class="trait-card" style="border-color:${c}33">
      <div class="tc-emoji">${t.emoji}</div><div class="tc-name" style="color:${c}">${t.name}</div>
      <div class="tc-rarity" style="color:${c}88">${t.rarity}</div>
      <div class="tc-chance">Craftable ⚒️</div><div class="tc-desc">${t.desc}</div>
    </div>`;
  }
  html+=`</div><div class="trait-roll-section"><div class="trait-roll-title">🎲 Roll on a Weapon</div><div class="trait-weapons-list">`;
  const rollableWeapons=ownedWeapons.map(n=>ALL_WEAPONS.find(w=>w.name===n)).filter(Boolean);
  for(const w of rollableWeapons){
    const ti=TIER_INFO[w.tier]||TIER_INFO[1],existing=weaponTraits[w.name];
    const canAfford=localTokens>=TRAIT_ROLL_COST&&currentUser;
    html+=`<div class="trait-weapon-row">
      <div class="twr-weapon"><span class="twr-emoji">${w.emoji}</span><span class="twr-name">${w.name}</span><span class="twr-tier" style="color:${ti.color}">T${w.tier}</span></div>
      ${existing?`<div class="twr-trait" style="color:${RARITY_COLORS[existing.rarity]||"#94a3b8"}88">${existing.emoji} ${existing.name} <span class="twr-rarity">${existing.rarity}</span></div>`:"<div class='twr-no-trait'>No trait</div>"}
      <button class="twr-roll-btn" onclick="rollTraitOnWeapon('${w.name.replace(/'/g,"\\'")}',this)" ${canAfford?"":"disabled"}>🎲 Roll (500 🪙)</button>
    </div>`;
  }
  html+=`</div></div>`;
  body.innerHTML=html;
}

async function rollTraitOnWeapon(weaponName,btnEl){
  if(!currentUser){showToast("Sign in to roll traits!","red");return;}
  if(localTokens<TRAIT_ROLL_COST){showToast("Need 500 🪙","red");return;}
  localTokens-=TRAIT_ROLL_COST;updateTokenDisplay();
  if(btnEl){btnEl.disabled=true;btnEl.textContent="Rolling...";}
  setTimeout(async()=>{
    const trait=rollTrait();weaponTraits[weaponName]=trait;playerStats.traitsRolled=(playerStats.traitsRolled||0)+1;await saveTokenData();
    showToast(`${trait.emoji} ${trait.name} — ${trait.rarity}!`,trait.rarity==="Mythic"||trait.rarity==="Legendary"?"gold":"info");
    renderTraitUI();
  },800);
}

// ══════════════════════════════════════════════
// CRAFTING TABLE
// ══════════════════════════════════════════════
function showCraftingTable(){renderCraftingUI();document.getElementById("modal-crafting").classList.remove("hidden");}
function hideCraftingTable(){document.getElementById("modal-crafting").classList.add("hidden");}
function closeCraftingIfOutside(e){if(e.target===document.getElementById("modal-crafting"))hideCraftingTable();}

function renderCraftingUI(){
  const body=document.getElementById("craftingBody");if(!body)return;
  const craftable=ALL_TRAITS.filter(t=>t.craftable);

  let html=`<div class="craft-mat-inventory"><div class="craft-mat-title">📦 Your Materials</div><div class="craft-mat-grid">`;
  for(const mat of CRAFTING_MATERIALS){
    const count=playerMaterials[mat.id]||0;
    html+=`<div class="craft-mat-chip ${count>0?"has-mats":""}">
      <span class="cmc-emoji">${mat.emoji}</span><span class="cmc-name">${mat.name}</span><span class="cmc-count">${count}</span>
    </div>`;
  }
  html+=`</div></div><div class="craft-section-title">🔨 Craftable Traits</div>`;

  for(const t of craftable){
    const c=RARITY_COLORS[t.rarity]||"#94a3b8";
    const recipe=t.recipe||{};
    const canCraft=currentUser&&Object.entries(recipe).every(([id,qty])=>(playerMaterials[id]||0)>=qty);
    html+=`<div class="craft-recipe-card" style="border-color:${c}33">
      <div class="crc-header">
        <span class="crc-emoji">${t.emoji}</span>
        <div><div class="crc-name" style="color:${c}">${t.name}</div><div class="crc-rarity" style="color:${c}88">${t.rarity}</div><div class="crc-desc">${t.desc}</div></div>
      </div>
      <div class="crc-recipe">
        ${Object.entries(recipe).map(([id,qty])=>{
          const mat=CRAFTING_MATERIALS.find(m=>m.id===id);
          const have=playerMaterials[id]||0,ok=have>=qty;
          return`<span class="crc-mat ${ok?"ok":"missing"}">${mat?.emoji||"?"} ${mat?.name||id} ${have}/${qty}</span>`;
        }).join("")}
      </div>`;
    if(currentUser){
      const safe=t.name.replace(/[\s']/g,"_");
      html+=`<div class="crc-actions">
        <select class="crc-weapon-select" id="crcW_${safe}">
          <option value="">— Pick weapon to apply —</option>
          ${ownedWeapons.map(n=>`<option value="${n}">${n}</option>`).join("")}
        </select>
        <button class="crc-craft-btn" onclick="craftTrait('${t.name.replace(/'/g,"\\'")}','${safe}')" ${canCraft?"":"disabled"}>🔨 Craft</button>
      </div>`;
    }
    html+=`</div>`;
  }
  body.innerHTML=html;
}

async function craftTrait(traitName,safeName){
  const trait=ALL_TRAITS.find(t=>t.name===traitName);if(!trait)return;
  const el=document.getElementById(`crcW_${safeName}`);
  if(!el||!el.value){showToast("Select a weapon first!","red");return;}
  const weaponName=el.value;
  const recipe=trait.recipe||{};
  for(const[id,qty]of Object.entries(recipe)){if((playerMaterials[id]||0)<qty){showToast("Not enough materials!","red");return;}}
  for(const[id,qty]of Object.entries(recipe)){playerMaterials[id]=(playerMaterials[id]||0)-qty;}
  weaponTraits[weaponName]=trait;
  playerStats.traitsCrafted=(playerStats.traitsCrafted||0)+1;
  await saveTokenData();
  showToast(`${trait.emoji} ${trait.name} crafted onto ${weaponName}!`,"gold");
  checkAchievements();renderCraftingUI();
}

// ══════════════════════════════════════════════
// DAILY QUESTS UI
// ══════════════════════════════════════════════
function showDailyQuests(){renderDailyUI();document.getElementById("modal-daily").classList.remove("hidden");}
function hideDailyQuests(){document.getElementById("modal-daily").classList.add("hidden");}
function closeDailyIfOutside(e){if(e.target===document.getElementById("modal-daily"))hideDailyQuests();}

function renderDailyUI(){
  const body=document.getElementById("dailyBody");if(!body)return;
  if(!currentUser){body.innerHTML=`<p style="color:var(--text2);text-align:center;padding:24px">Sign in for daily quests!</p>`;return;}
  if(!dailyQuests||dailyQuests.length===0){dailyQuests=generateDailyQuests();dailyQuestKey=getDailyQuestKey();}
  let html=`<div class="daily-header"><p>Complete 3 daily quests for coins and crafting materials. Resets at midnight!</p></div>`;
  dailyQuests.forEach((q,i)=>{
    const pct=Math.round((q.progress/q.target)*100);
    html+=`<div class="daily-quest-card ${q.completed?"dq-done":""} ${q.claimed?"dq-claimed":""}">
      <div class="dq-main">
        <div class="dq-title">${q.desc}</div>
        <div class="dq-progress-wrap"><div class="dq-progress-bar" style="width:${pct}%"></div></div>
        <div class="dq-sub">${q.progress} / ${q.target}</div>
        <div class="dq-reward"><span style="color:#facc15">+${q.reward.coins} 🪙</span>
          ${q.reward.mats.map(m=>{const mat=CRAFTING_MATERIALS.find(x=>x.id===m);return mat?`<span>${mat.emoji} ${mat.name}</span>`:""}).join(" ")}
        </div>
      </div>
      ${q.completed&&!q.claimed?`<button class="btn-primary" style="font-size:11px;padding:8px 14px" onclick="claimDailyQuest(${i})">Claim!</button>`:""}
      ${q.claimed?`<div class="dq-claimed-badge">✓ Claimed</div>`:""}
    </div>`;
  });
  body.innerHTML=html;
}

async function claimDailyQuest(idx){
  if(!dailyQuests||!dailyQuests[idx])return;
  const q=dailyQuests[idx];if(!q.completed||q.claimed)return;
  q.claimed=true;localTokens+=q.reward.coins;
  q.reward.mats.forEach(m=>addMaterial(m,1));
  playerStats.dailyCompleted=(playerStats.dailyCompleted||0)+1;
  await saveTokenData();
  showToast(`+${q.reward.coins} 🪙 + materials!`,"gold");
  renderDailyUI();checkAchievements();
}

// ══════════════════════════════════════════════
// ACHIEVEMENTS UI
// ══════════════════════════════════════════════
function showAchievements(){renderAchievementsUI();document.getElementById("modal-achievements").classList.remove("hidden");}
function hideAchievements(){document.getElementById("modal-achievements").classList.add("hidden");}
function closeAchievementsIfOutside(e){if(e.target===document.getElementById("modal-achievements"))hideAchievements();}

function renderAchievementsUI(){
  const body=document.getElementById("achievementsBody");if(!body)return;
  const done=ACHIEVEMENTS.filter(a=>playerAchievements[a.id]).length;
  let html=`<div class="ach-header">${done} / ${ACHIEVEMENTS.length} Unlocked</div><div class="ach-grid">`;
  for(const a of ACHIEVEMENTS){
    const isDone=!!playerAchievements[a.id];
    html+=`<div class="ach-card ${isDone?"ach-done":"ach-locked"}">
      <div class="ach-emoji">${a.emoji}</div>
      <div class="ach-name">${a.name}</div>
      <div class="ach-desc">${a.desc}</div>
      ${isDone?"<div class='ach-check'>✓</div>":""}
    </div>`;
  }
  html+=`</div>`;body.innerHTML=html;
}

// ══════════════════════════════════════════════
// CLAN PANEL
// ══════════════════════════════════════════════
function showClanPanel(){renderClanUI();document.getElementById("modal-clan").classList.remove("hidden");}
function hideClanPanel(){document.getElementById("modal-clan").classList.add("hidden");}
function closeClanIfOutside(e){if(e.target===document.getElementById("modal-clan"))hideClanPanel();}

function renderClanUI(){
  const body=document.getElementById("clanBody");if(!body)return;
  if(!currentUser){body.innerHTML=`<p style="color:var(--text2);text-align:center;padding:24px">Sign in to access clan features!</p>`;return;}
  if(!playerClan){body.innerHTML=`<p style="color:var(--text2);text-align:center;padding:24px">No clan assigned. Try logging out and back in!</p>`;return;}

  const clan=CLANS[playerClan.key];if(!clan)return;
  const v=playerClan.version,ver=clan.versions[v];

  let html=`<div class="clan-hero" style="border-color:${clan.color}44">
    <div class="clan-emoji" style="color:${clan.color}">${clan.emoji}</div>
    <div class="clan-name" style="color:${clan.color}">${clan.name}</div>
    <div class="clan-lore">${clan.lore}</div>
    <div class="clan-version-tag" style="background:${clan.color}22;border-color:${clan.color}44">V${v} — ${ver.name}</div>
    <div class="clan-buff">${ver.buff}</div>
    ${ver.special?`<div class="clan-special-badge">⚡ V4 Special Ability Active!</div>`:""}
  </div>
  <div class="clan-versions">`;
  for(let vv=1;vv<=4;vv++){
    const vver=clan.versions[vv],unlocked=v>=vv,isCur=vv===v;
    html+=`<div class="clan-ver-card ${unlocked?"unlocked":""} ${isCur?"current":""}">
      <div class="cvc-header" style="color:${unlocked?clan.color:"var(--text3)"}">V${vv} — ${vver.name}</div>
      <div class="cvc-buff">${vver.buff}</div>
      ${vver.special?`<div class="cvc-special">⚡ Special</div>`:""}
    </div>`;
  }
  html+=`</div>`;

  if(v<4){
    const nextVer=clan.versions[v+1];
    html+=`<div class="clan-upgrade-section">
      <div class="clan-upgrade-title">Upgrade to V${v+1} — ${nextVer.name}</div>
      <div class="clan-upgrade-req"><span class="cur-cost">💰 ${CLAN_UPGRADE_COST} 🪙 required</span></div>
      <button class="btn-primary" onclick="upgradeClan()" ${localTokens>=CLAN_UPGRADE_COST?"":"disabled"}>
        ${localTokens>=CLAN_UPGRADE_COST?`Upgrade (${CLAN_UPGRADE_COST} 🪙)`:`Need ${CLAN_UPGRADE_COST} 🪙`}
      </button>
    </div>`;
  }

  html+=`<div class="clan-reroll-section">
    <div class="clan-reroll-info">Don't like your clan? Reroll for ${CLAN_REROLL_COST} 🪙. Warning: resets your version to V1!<br><span style="color:#facc15;font-size:11px">⚡ Thunder &amp; Shadow clans can only be obtained via reroll!</span></div>
    <button class="btn-ghost" onclick="rerollClan()" ${localTokens>=CLAN_REROLL_COST?"":"disabled"}>🎲 Reroll Clan (${CLAN_REROLL_COST} 🪙)</button>
  </div>
  <div class="all-clans-title">All Clans</div><div class="clan-all-grid">`;
  for(const[key,c]of Object.entries(CLANS)){
    const rollBadge=c.rollOnly?` <span style="font-size:9px;background:${c.color}22;border:1px solid ${c.color}44;padding:2px 6px;border-radius:6px;letter-spacing:0.5px">🎲 ROLL ONLY</span>`:"";
    html+=`<div class="clan-info-card" style="border-color:${c.color}44">
      <div class="cic-header" style="color:${c.color}">${c.emoji} ${c.name}${rollBadge}</div>
      <div class="cic-lore">${c.lore}</div>
      <div class="cic-v4" style="color:${c.color}">V4: ${c.versions[4].buff}</div>
    </div>`;
  }
  html+=`</div>`;body.innerHTML=html;
}

async function upgradeClan(){
  if(!playerClan||playerClan.version>=4){showToast("Already at max version!","info");return;}
  if(localTokens<CLAN_UPGRADE_COST){showToast(`Need ${CLAN_UPGRADE_COST} 🪙!`,"red");return;}
  if(!confirm(`Upgrade to V${playerClan.version+1} for ${CLAN_UPGRADE_COST} 🪙?`))return;
  localTokens-=CLAN_UPGRADE_COST;playerClan.version++;playerStats.clanUpgrades=(playerStats.clanUpgrades||0)+1;
  const clan=CLANS[playerClan.key];
  showToast(`${clan.emoji} V${playerClan.version} — ${clan.versions[playerClan.version].name} unlocked!`,"gold");
  await saveTokenData();updateTokenDisplay();renderClanUI();
  if(playerClan.version===4)checkAchievements();
}

async function rerollClan(){
  if(!currentUser){showToast("Sign in to reroll clan!","red");return;}
  if(localTokens<CLAN_REROLL_COST){showToast(`Need ${CLAN_REROLL_COST} 🪙!`,"red");return;}
  if(!confirm(`Reroll clan for ${CLAN_REROLL_COST} 🪙? Resets to V1!`))return;
  localTokens-=CLAN_REROLL_COST;
  const newKey=getRandomRollClan();playerClan={key:newKey,version:1};
  const c=CLANS[newKey];
  showToast(`${c.emoji} You joined ${c.name}!`,"gold");
  updateTokenDisplay();
  const result=await saveTokenData();
  renderClanUI();
  updateTokenDisplay();
}

// ══════════════════════════════════════════════
// SHOP
// ══════════════════════════════════════════════

// ══════════════════════════════════════════════
// ITEM ROLL (every 2 hours)
// ══════════════════════════════════════════════
const ITEM_ROLL_COOLDOWN_MS = 2 * 60 * 60 * 1000; // 2 hours
const ITEM_ROLL_KEY = "klocvork_lastroll";

// Build rollable pool from ALL CRAFTING_MATERIALS using rarity-based weights
function buildItemRollPool(){
  const rarityWeight={"Mythic":0.5,"Legendary":1,"Epic":3,"Rare":8,"Uncommon":18,"Common":35};
  return CRAFTING_MATERIALS.map(m=>({mat:m, weight: m.shopChance!=null ? m.shopChance*100 : (rarityWeight[m.rarity]||5)}));
}

function rollRandomMaterial(){
  const pool = buildItemRollPool();
  const total = pool.reduce((s,p)=>s+p.weight,0);
  let r = Math.random()*total;
  for(const p of pool){r-=p.weight;if(r<=0)return p.mat;}
  return pool[pool.length-1].mat;
}

function getLastRollTime(){
  try{const v=localStorage.getItem(ITEM_ROLL_KEY);return v?parseInt(v):0;}catch(e){return 0;}
}
function setLastRollTime(t){try{localStorage.setItem(ITEM_ROLL_KEY,String(t));}catch(e){}}

function getNextRollMs(){
  const last=getLastRollTime();
  const next=last+ITEM_ROLL_COOLDOWN_MS;
  return Math.max(0,next-Date.now());
}

function canRollNow(){return getNextRollMs()===0;}

function formatRollCooldown(){
  const ms=getNextRollMs();if(ms<=0)return "Ready!";
  const h=Math.floor(ms/3600000),m=Math.floor((ms%3600000)/60000),s=Math.floor((ms%60000)/1000);
  return h>0?`${h}h ${m}m`:`${m}m ${s}s`;
}

async function performItemRoll(){
  if(!currentUser){showToast("Sign in to roll items!","red");return;}
  if(!canRollNow()){showToast(`Next roll in ${formatRollCooldown()}`,"info");return;}
  const mat=rollRandomMaterial();
  addMaterial(mat.id,1);
  playerStats.itemsRolled=(playerStats.itemsRolled||0)+1;
  setLastRollTime(Date.now());
  await saveTokenData();
  const c=RARITY_COLORS[mat.rarity]||"#94a3b8";
  showToast(`🎲 Item Roll: ${mat.emoji} ${mat.name}!`,mat.rarity==="Mythic"||mat.rarity==="Legendary"?"gold":"green");
  renderItemRollUI();
}

function showItemRoll(){renderItemRollUI();document.getElementById("modal-itemroll").classList.remove("hidden");}
function hideItemRoll(){document.getElementById("modal-itemroll").classList.add("hidden");}
function closeItemRollIfOutside(e){if(e.target===document.getElementById("modal-itemroll"))hideItemRoll();}

let _rollCountdownInterval=null;
function renderItemRollUI(){
  const body=document.getElementById("itemRollBody");if(!body)return;
  if(_rollCountdownInterval)clearInterval(_rollCountdownInterval);

  const pool=buildItemRollPool();
  const totalWeight=pool.reduce((s,p)=>s+p.weight,0);

  function buildHTML(){
    const ready=canRollNow();
    const cdText=formatRollCooldown();
    let html=`<div class="iroll-header">
      <div class="iroll-clock">${ready?"🎲":"⏳"}</div>
      <div class="iroll-title">${ready?"Item Roll Ready!":"Next Roll In"}</div>
      <div class="iroll-countdown" id="irollCountdown">${ready?"Now!":cdText}</div>
      <button class="btn-primary" onclick="performItemRoll()" ${ready&&currentUser?"":"disabled"} style="margin-top:8px">
        ${ready?"🎲 Roll Now":"Cooling down…"}
      </button>
      <p class="shop-hint" style="margin-top:8px">Roll a random crafting material every 2 hours!</p>
    </div>
    <div class="iroll-pool-title">Drop Table</div>
    <div class="iroll-pool-grid">`;
    const sorted=[...pool].sort((a,b)=>b.weight-a.weight);
    for(const p of sorted){
      const pct=(p.weight/totalWeight*100).toFixed(1);
      const c=RARITY_COLORS[p.mat.rarity]||"#94a3b8";
      html+=`<div class="iroll-pool-row">
        <span class="iroll-emoji">${p.mat.emoji}</span>
        <span class="iroll-name" style="color:${c}">${p.mat.name}</span>
        <span class="iroll-rarity" style="color:${c}88">${p.mat.rarity}</span>
        <span class="iroll-pct">${pct}%</span>
        <span class="iroll-have">×${playerMaterials[p.mat.id]||0}</span>
      </div>`;
    }
    html+=`</div>`;
    return html;
  }

  body.innerHTML=buildHTML();
  // Live countdown
  _rollCountdownInterval=setInterval(()=>{
    const el=document.getElementById("irollCountdown");
    if(!el){clearInterval(_rollCountdownInterval);return;}
    if(canRollNow()){clearInterval(_rollCountdownInterval);renderItemRollUI();}
    else el.textContent=formatRollCooldown();
  },1000);
}

// ══════════════════════════════════════════════
// RACE PANEL
// ══════════════════════════════════════════════
function showRacePanel(){renderRaceUI();document.getElementById("modal-race").classList.remove("hidden");}
function hideRacePanel(){document.getElementById("modal-race").classList.add("hidden");}
function closeRaceIfOutside(e){if(e.target===document.getElementById("modal-race"))hideRacePanel();}

function renderRaceUI(){
  const body=document.getElementById("raceBody");if(!body)return;
  if(!currentUser){body.innerHTML=`<p style="color:var(--text2);text-align:center;padding:24px">Sign in to view your race!</p>`;return;}

  const myRaceKey=playerRace||"human";
  const myRace=RACES[myRaceKey];

  let html=`<div class="race-hero" style="border-color:${myRace.color}44;background:${myRace.color}0a">
    <div class="race-emoji" style="color:${myRace.color}">${myRace.emoji}</div>
    <div class="race-name" style="color:${myRace.color}">${myRace.name}</div>
    <div class="race-lore">${myRace.lore}</div>
    <div class="race-perks">`;
  myRace.perks.forEach(p=>{html+=`<div class="race-perk">✦ ${p}</div>`;});
  html+=`</div></div>
  <div class="race-reroll-section">
    <div class="race-reroll-info">Want a different race? Reroll for <strong style="color:#facc15">${RACE_REROLL_COST} 🪙</strong>.<br>
    <span style="color:#facc15;font-size:11px">Chances: Human 50% · Supernatural 20% · Oni 20% · Heavenly 10%</span></div>
    <button class="btn-ghost race-reroll-btn" onclick="rerollRace()" ${localTokens>=RACE_REROLL_COST&&currentUser?"":"disabled"}>🎲 Reroll Race (${RACE_REROLL_COST} 🪙)</button>
  </div>
  <div class="all-races-title">All Races</div>
  <div class="race-all-grid">`;

  for(const[key,r] of Object.entries(RACES)){
    const isMine=key===myRaceKey;
    const borderColor=r.adminOnly?"rgba(255,255,255,0.3)":r.color+"44";
    const glowStyle=r.adminOnly?"box-shadow:0 0 20px rgba(255,255,255,0.2),0 0 40px rgba(255,255,255,0.1)":"";
    html+=`<div class="race-card ${isMine?"race-mine":""} ${r.adminOnly?"race-admin":""}" style="border-color:${borderColor};${glowStyle}">
      <div class="race-card-header" style="color:${r.color}">${r.emoji} ${r.name}
        ${isMine?`<span class="race-mine-tag" style="background:${r.color}22;border-color:${r.color}44;color:${r.color}">Your Race</span>`:""}
        ${r.adminOnly?`<span class="race-admin-tag">👑 Admin Only</span>`:`<span class="race-chance-tag">${(r.chance*100).toFixed(0)}% chance</span>`}
      </div>
      <div class="race-card-lore">${r.lore}</div>
      <div class="race-card-perks">`;
    r.perks.forEach(p=>{html+=`<div class="rcp-item">✦ ${p}</div>`;});
    if(r.v4ability){
      const abColor=r.adminOnly?"#ffffff":r.color;
      html+=`<div class="rcp-v4ability" style="border-color:${abColor}44;background:${abColor}0a">
        <span class="rcp-v4label" style="color:${abColor}">${r.v4ability.emoji} ${r.v4ability.name}</span>
        <span class="rcp-v4cd">${r.v4ability.cooldown==="match"?"Once/match":"Once/round"}</span>
        <div class="rcp-v4desc">${r.v4ability.desc}</div>
      </div>`;
    }
    html+=`</div></div>`;
  }
  html+=`</div>`;
  body.innerHTML=html;
}

async function rerollRace(){
  if(!currentUser){showToast("Sign in to reroll race!","red");return;}
  if(localTokens<RACE_REROLL_COST){showToast(`Need ${RACE_REROLL_COST} 🪙!`,"red");return;}
  if(!confirm(`Reroll your race for ${RACE_REROLL_COST} 🪙?`))return;
  localTokens-=RACE_REROLL_COST;
  const newKey=getRandomRace();
  playerRace=newKey;
  const r=RACES[newKey];
  showToast(`${r.emoji} You are now ${r.name}!`,"gold");
  await saveTokenData();updateTokenDisplay();renderRaceUI();
}

// ══════════════════════════════════════════════
// INVENTORY PANEL
// ══════════════════════════════════════════════
function showInventory(){renderInventoryUI();document.getElementById("modal-inventory").classList.remove("hidden");}
function hideInventory(){document.getElementById("modal-inventory").classList.add("hidden");}
function closeInventoryIfOutside(e){if(e.target===document.getElementById("modal-inventory"))hideInventory();}

let invTab="weapons";
function setInvTab(tab){invTab=tab;renderInventoryUI();}

function renderInventoryUI(){
  const body=document.getElementById("inventoryBody");if(!body)return;

  const tabs=`<div class="inv-tabs">
    <button class="inv-tab${invTab==="weapons"?" active":""}" onclick="setInvTab('weapons')">⚔️ Weapons (${ownedWeapons.length})</button>
    <button class="inv-tab${invTab==="mats"?" active":""}" onclick="setInvTab('mats')">📦 Materials</button>
    <button class="inv-tab${invTab==="accs"?" active":""}" onclick="setInvTab('accs')">💍 Accessories (${playerAccessories.length})</button>
  </div>`;

  let html=tabs;

  if(invTab==="weapons"){
    if(!ownedWeapons.length){html+=`<div class="inv-empty">No weapons yet. Buy some in the 🛒 Shop!</div>`;body.innerHTML=html;return;}
    const byTier={};
    ownedWeapons.forEach(n=>{const w=ALL_WEAPONS.find(x=>x.name===n);if(!w)return;(byTier[w.tier]=byTier[w.tier]||[]).push(w);});
    html+=`<div class="inv-summary">
      <span class="inv-sum-chip">⚔️ ${ownedWeapons.length} owned</span>
      <span class="inv-sum-chip">✓ ${myLoadout.length} equipped</span>
      <span class="inv-sum-chip">🔱 ${Object.values(weaponTraits).length} traits</span>
    </div><div class="inv-weapons-list">`;
    for(let t=1;t<=6;t++){
      if(!byTier[t])continue;
      const ti=TIER_INFO[t];
      html+=`<div class="inv-tier-header" style="color:${ti.color}">T${t} ${ti.name} <span style="opacity:0.6;font-size:11px">(${byTier[t].length})</span></div>
      <div class="inv-weapon-grid">`;
      for(const w of byTier[t]){
        const isEquipped=myLoadout.includes(w.name),trait=weaponTraits[w.name];
        html+=`<div class="inv-weapon-card ${isEquipped?"inv-equipped":""}">
          <div class="inv-w-emoji">${w.emoji}</div>
          <div class="inv-w-name">${w.name}</div>
          <div class="inv-w-dmg" style="color:${ti.color}">${w.dmg} dmg</div>
          ${trait?`<div class="inv-w-trait" style="color:${RARITY_COLORS[trait.rarity]||"#94a3b8"}">${trait.emoji} ${trait.name}</div>`:`<div class="inv-w-trait inv-no-trait">No trait</div>`}
          <div class="inv-w-status">${isEquipped?`<span style="color:var(--green)">✓ Equipped</span>`:`<span style="color:var(--text3)">In storage</span>`}</div>
          ${!STARTER_WEAPON_NAMES.includes(w.name)?`<button class="inv-sell-btn" onclick="promptSellWeapon('${w.name.replace(/'/g,"\'")}')">Sell</button>`:""}
        </div>`;
      }
      html+=`</div>`;
    }
    html+=`</div>`;
  }else if(invTab==="mats"){
    const allHave=CRAFTING_MATERIALS.filter(m=>(playerMaterials[m.id]||0)>0);
    const totalMats=Object.values(playerMaterials).reduce((s,v)=>s+(v||0),0);
    html+=`<div class="inv-summary">
      <span class="inv-sum-chip">📦 ${allHave.length} types collected</span>
      <span class="inv-sum-chip">🔢 ${totalMats} total</span>
    </div>`;
    if(!allHave.length){html+=`<div class="inv-empty">No materials yet. Try the 🎲 Item Roll or complete daily quests!</div>`;body.innerHTML=html;return;}
    const rarityOrder=["Mythic","Legendary","Epic","Rare","Uncommon","Common"];
    html+=`<div class="inv-mats-list">`;
    for(const rarity of rarityOrder){
      const mats=CRAFTING_MATERIALS.filter(m=>m.rarity===rarity&&(playerMaterials[m.id]||0)>0);
      if(!mats.length)continue;
      const c=RARITY_COLORS[rarity]||"#94a3b8";
      html+=`<div class="inv-mat-rarity-row"><span class="inv-mat-rarity-label" style="color:${c}">${rarity}</span><div class="inv-mat-chips">`;
      for(const m of mats){
        const have=playerMaterials[m.id]||0;
        html+=`<div class="inv-mat-chip" title="${m.name} — ${rarity}">
          <span class="imc-emoji">${m.emoji}</span>
          <span class="imc-name" style="color:${c}">${m.name}</span>
          <span class="imc-count">×${have}</span>
          ${m.shopCost?`<button class="imc-sell" onclick="sellMaterial('${m.id}');renderInventoryUI();" ${have>0&&currentUser?"":"disabled"}>Sell ${m.shopCost}🪙</button>`:""}
        </div>`;
      }
      html+=`</div></div>`;
    }
    html+=`</div>`;
    // Show empty slots too
    const allEmpty=CRAFTING_MATERIALS.filter(m=>!(playerMaterials[m.id]||0));
    if(allEmpty.length){
      html+=`<details class="inv-empty-mats"><summary style="color:var(--text3);font-size:12px;cursor:pointer">▾ ${allEmpty.length} materials not yet collected</summary><div class="inv-mat-chips inv-mat-chips-empty">`;
      for(const m of allEmpty){const c=RARITY_COLORS[m.rarity]||"#94a3b8";html+=`<div class="inv-mat-chip inv-mat-missing"><span class="imc-emoji" style="opacity:0.3">${m.emoji}</span><span class="imc-name" style="color:${c};opacity:0.4">${m.name}</span><span class="imc-count" style="opacity:0.3">×0</span></div>`;}
      html+=`</div></details>`;
    }
  }else{
    html+=`<div class="inv-summary"><span class="inv-sum-chip">💍 ${playerAccessories.length} owned</span>${equippedAccessory?`<span class="inv-sum-chip">✓ 1 equipped</span>`:""}</div>`;
    if(!playerAccessories.length){html+=`<div class="inv-empty">No accessories yet. Win battles to get random drops!</div>`;body.innerHTML=html;return;}
    html+=`<div class="inv-accs-grid">`;
    for(const id of playerAccessories){
      const acc=ALL_ACCESSORIES.find(x=>x.id===id);if(!acc)continue;
      const isEq=equippedAccessory===id,c=RARITY_COLORS[acc.rarity]||"#94a3b8";
      html+=`<div class="inv-acc-card ${isEq?"inv-acc-equipped":""}">
        <div class="inv-acc-emoji">${acc.emoji}</div>
        <div class="inv-acc-name">${acc.name}</div>
        <div class="inv-acc-rarity" style="color:${c}">${acc.rarity}</div>
        <div class="inv-acc-desc">${acc.desc}</div>
        <button class="inv-acc-btn ${isEq?"inv-acc-btn-on":""}" onclick="toggleAccessory('${id}');renderInventoryUI()">${isEq?"✓ Equipped":"Equip"}</button>
      </div>`;
    }
    html+=`</div>`;
  }
  body.innerHTML=html;
}

let shopTab="potions";
function showShop(){shopTab="potions";renderShopUI();document.getElementById("modal-shop").classList.remove("hidden");}
function hideShop(){document.getElementById("modal-shop").classList.add("hidden");}
function closeShopIfOutside(e){if(e.target===document.getElementById("modal-shop"))hideShop();}
function setShopTab(t){shopTab=t;renderShopUI();}

function renderShopUI(){
  const body=document.getElementById("shopBody");if(!body)return;
  const bal=`<div class="shop-balance">
    <div class="shop-bal-item"><span class="shop-bal-label">Tokens</span><span class="shop-bal-value">${localTokens}</span> 🪙</div>
    <div class="shop-bal-item"><span class="shop-bal-label">Potions</span><span class="shop-bal-value">${localPotions}</span> 🧪</div>
  </div>
  <div class="shop-tabs">
    <button class="shop-tab-btn${shopTab==="potions"?" active":""}" onclick="setShopTab('potions')">🧪 Potions</button>
    <button class="shop-tab-btn${shopTab==="weapons"?" active":""}" onclick="setShopTab('weapons')">⚔️ Weapons</button>
    <button class="shop-tab-btn${shopTab==="accessories"?" active":""}" onclick="setShopTab('accessories')">💍 Accessories</button>
    <button class="shop-tab-btn${shopTab==="mats"?" active":""}" onclick="setShopTab('mats')">📦 Materials</button>
  </div>`;

  if(shopTab==="potions"){
    const canBuy=currentUser&&localTokens>=POTION_COST&&localPotions<9;
    body.innerHTML=bal+`<div class="shop-item-card">
      <div class="shop-item-icon">🧪</div>
      <div class="shop-item-info">
        <div class="shop-item-name">Health Potion</div>
        <div class="shop-item-desc">Use in combat to restore +${POTION_HEAL} HP instead of attacking. Max 9.</div>
        <div class="shop-item-cost">15 🪙 each</div>
      </div>
      <button class="btn-primary" onclick="buyPotion()" ${canBuy?"":"disabled"}>${localPotions>=9?"Max (9)":"Buy — 15 🪙"}</button>
    </div>
    <p class="shop-hint">Earn tokens: +200 per win · +50 per loss · +300 boss kill · +30 special round.</p>`;
  }else if(shopTab==="accessories"){
    let html=bal+`<div class="weapon-shop-list"><p class="shop-hint" style="text-align:left;margin-bottom:8px">Accessories drop randomly in battles (8–15% chance on win/boss kill). Equip one for passive bonuses!</p><div class="ws-tier-grid">`;
    for(const acc of ALL_ACCESSORIES){
      const owned=playerAccessories.includes(acc.id),equipped=equippedAccessory===acc.id;
      const c=RARITY_COLORS[acc.rarity]||"#94a3b8";
      html+=`<div class="ws-weapon-card ${owned?"ws-owned":""} ${equipped?"ws-equipped":""}">
        <div class="ws-weapon-emoji">${acc.emoji}</div>
        <div class="ws-weapon-name">${acc.name}</div>
        <div class="ws-weapon-dmg" style="color:${c}">${acc.rarity}</div>
        <div style="font-size:10px;color:var(--text3);text-align:center;line-height:1.3;margin:2px 0">${acc.desc}</div>
        ${owned?`<button class="ws-btn ${equipped?"ws-btn-equipped":"ws-btn-equip"}" onclick="toggleAccessory('${acc.id}')">${equipped?"✓ Equipped":"Equip"}</button>`:`<div style="font-size:9px;color:var(--text3);margin-top:4px">🔒 Drop from battle</div>`}
      </div>`;
    }
    html+=`</div></div>`;body.innerHTML=html;
  }else if(shopTab==="mats"){
    let html=bal+`<div class="craft-mat-section">
    <p class="shop-hint" style="text-align:left;margin-bottom:8px">All crafting materials (${CRAFTING_MATERIALS.length} total). Collect via 🎲 Item Roll, daily quests, and battles!</p>
    <div class="mat-searchbar-wrap">
      <input class="mat-searchbar" id="matSearchInput" type="text" placeholder="🔍 Search materials…" oninput="filterMatsDisplay()" autocomplete="off" spellcheck="false"/>
      <div class="mat-search-count" id="matSearchCount">${CRAFTING_MATERIALS.length} materials</div>
    </div>
    <div id="matDisplayArea" class="craft-mat-full-grid"></div></div>`;
    body.innerHTML=html;
    filterMatsDisplay();
    return;
  }else{
    let html=bal+`<div class="weapon-shop-list">`;
    for(let t=1;t<=7;t++){
      const ti=TIER_INFO[t]||TIER_INFO[6],tier_weapons=ALL_WEAPONS.filter(w=>w.tier===t);
      html+=`<div class="ws-tier-header" style="color:${ti.color};border-color:${ti.color}20">
        <span class="ws-tier-badge" style="background:${ti.color}22;border-color:${ti.color}44;color:${ti.color}">T${t}</span>
        ${ti.name}${t===1?" — Free Starter":""}
      </div><div class="ws-tier-grid">`;
      tier_weapons.forEach(w=>{
        const owned=ownedWeapons.includes(w.name),equipped=myLoadout.includes(w.name);
        const canAfford=localTokens>=w.cost,trait=weaponTraits[w.name];
        html+=`<div class="ws-weapon-card ${owned?"ws-owned":""} ${equipped?"ws-equipped":""}" data-weapon="${w.name}">
          <div class="ws-weapon-emoji">${w.emoji}</div>
          <div class="ws-weapon-name">${w.name}</div>
          <div class="ws-weapon-dmg" style="color:${ti.color}">${w.dmg} dmg</div>
          ${trait?`<div class="ws-weapon-trait" title="${trait.desc}">${trait.emoji}</div>`:""}
          ${owned
            ?`<button class="ws-btn ${equipped?"ws-btn-equipped":"ws-btn-equip"}" onclick="toggleEquip('${w.name.replace(/'/g,"\\'")}')"> ${equipped?"✓ On":"Equip"}</button>`
            :`<button class="ws-btn ws-btn-buy" onclick="buyWeapon('${w.name.replace(/'/g,"\\'")}')" ${canAfford&&currentUser?"":"disabled"}>${w.cost} 🪙</button>`}
        </div>`;
      });
      html+=`</div>`;
    }
    html+=`</div><p class="shop-hint">Max ${LOADOUT_SIZE} weapons equipped.</p>`;body.innerHTML=html;
  }
}

async function buyPotion(){
  if(!currentUser){showToast("Sign in to buy potions!","red");return;}
  if(localTokens<POTION_COST){showToast("Not enough tokens!","red");return;}
  if(localPotions>=9){showToast("Max 9 potions!","red");return;}
  localTokens-=POTION_COST;localPotions+=1;
  updateTokenDisplay();await saveTokenData();renderShopUI();showToast("Potion purchased! 🧪","green");
}

async function buyWeapon(name){
  const w=ALL_WEAPONS.find(x=>x.name===name);if(!w)return;
  if(!currentUser){showToast("Sign in to buy weapons!","red");return;}
  if(ownedWeapons.includes(name)){showToast("Already owned!","info");return;}
  if(localTokens<w.cost){showToast("Not enough tokens!","red");return;}
  localTokens-=w.cost;ownedWeapons.push(name);
  playerStats.weaponsBought=(playerStats.weaponsBought||0)+1;
  updateTokenDisplay();await saveTokenData();renderShopUI();
  showToast(w.emoji+" "+w.name+" unlocked!","gold");checkAchievements();
}

// FIX: toggleEquip preserves order — append to end, never reinsert mid-array
function toggleEquip(name){
  if(!ownedWeapons.includes(name))return;
  if(myLoadout.includes(name)){
    if(myLoadout.length<=1){showToast("Must have at least 1 weapon!","red");return;}
    myLoadout=myLoadout.filter(n=>n!==name);
    showToast((ALL_WEAPONS.find(w=>w.name===name)?.emoji||"")+" "+name+" unequipped","info");
  }else{
    if(myLoadout.length>=LOADOUT_SIZE){showToast("Max "+LOADOUT_SIZE+" weapons! Unequip one first.","red");return;}
    myLoadout=[...myLoadout,name]; // append at end — fixes weird placement bug
    showToast((ALL_WEAPONS.find(w=>w.name===name)?.emoji||"")+" "+name+" equipped!","green");
  }
  saveTokenData();renderShopUI();
}

function toggleAccessory(accId){
  if(!playerAccessories.includes(accId))return;
  if(equippedAccessory===accId){equippedAccessory=null;showToast("Accessory unequipped","info");}
  else{equippedAccessory=accId;const acc=ALL_ACCESSORIES.find(a=>a.id===accId);showToast(`${acc?.emoji} ${acc?.name} equipped!`,"green");}
  saveTokenData();renderShopUI();
}

// ══════════════════════════════════════════════
// ARSENAL PANEL
// ══════════════════════════════════════════════
let arsenalFilter=0;
function showArsenal(){arsenalFilter=0;renderArsenalPanel();showScreen("screen-arsenal");}
function hideArsenal(){showScreen("screen-mode");}
function setArsenalFilter(t){arsenalFilter=t;renderArsenalPanel();}

function renderArsenalPanel(){
  const equipped=myLoadout.length,remaining=LOADOUT_SIZE-equipped;
  const el=document.getElementById("arsenalEquippedCount");
  if(el)el.textContent=equipped+" / "+LOADOUT_SIZE+" equipped";
  const hint=document.getElementById("arsenalHint");
  if(hint){hint.textContent=remaining>0?"Select "+remaining+" more to fill your loadout.":"Loadout full! Unequip to swap.";hint.style.color=remaining===0?"var(--green)":"var(--text2)";}
  const sp=document.getElementById("arsenalShieldPreview");
  if(sp){
    const sv=getShieldValues(myLoadout.map(n=>ALL_WEAPONS.find(w=>w.name===n)).filter(Boolean));
    sp.innerHTML=sv.map(v=>{
      const blockers=ALL_WEAPONS.filter(w=>w.dmg===v&&myLoadout.includes(w.name));
      const ti=TIER_INFO[blockers[0]?.tier||1];
      return`<div class="arsenal-shield-chip" title="Blocks: ${blockers.map(w=>w.name).join(", ")}" style="border-color:${ti.color};color:${ti.color};box-shadow:0 0 8px ${ti.glow}">${v}</div>`;
    }).join("");
  }
  const fb=document.getElementById("arsenalFilterBar");
  if(fb){
    fb.innerHTML=`<button class="af-tab${arsenalFilter===0?" active":""}" onclick="setArsenalFilter(0)">All</button>`+
      [1,2,3,4,5,6,7].map(t=>{
        const ti=TIER_INFO[t],oc=ALL_WEAPONS.filter(w=>w.tier===t&&ownedWeapons.includes(w.name)).length;
        if(!oc)return"";
        return`<button class="af-tab${arsenalFilter===t?" active":""}" onclick="setArsenalFilter(${t})" style="${arsenalFilter===t?`background:${ti.color}22;color:${ti.color};border-color:${ti.color}`:""}">T${t} ${ti.name}</button>`;
      }).join("");
  }
  const grid=document.getElementById("arsenalGrid");if(!grid)return;
  grid.innerHTML="";
  const filtered=arsenalFilter===0
    ?ownedWeapons.map(n=>ALL_WEAPONS.find(w=>w.name===n)).filter(Boolean)
    :ALL_WEAPONS.filter(w=>w.tier===arsenalFilter&&ownedWeapons.includes(w.name));

  // Sort: equipped first (keep original order), then by tier
  const equippedOnes=filtered.filter(w=>myLoadout.includes(w.name));
  const notEquipped=filtered.filter(w=>!myLoadout.includes(w.name)).sort((a,b)=>a.tier-b.tier||a.dmg-b.dmg);
  const sorted=[...equippedOnes,...notEquipped];

  if(sorted.length===0){
    grid.innerHTML=`<div class="arsenal-empty">No weapons owned in this tier.<br><button class="btn-ghost" onclick="showShopFromArsenal()">🛒 Go to Shop</button></div>`;return;
  }
  sorted.forEach(w=>{
    const isEquipped=myLoadout.includes(w.name),ti=TIER_INFO[w.tier],trait=weaponTraits[w.name];
    const card=document.createElement("div");
    card.className="arsenal-card"+(isEquipped?" arsenal-equipped":"");
    card.innerHTML=`
      <div class="arsenal-tier-dot" style="background:${ti.color}" title="T${w.tier} ${ti.name}"></div>
      <div class="arsenal-card-emoji">${w.emoji}</div>
      <div class="arsenal-card-name">${w.name}</div>
      <div class="arsenal-card-dmg" style="color:${ti.color}">${w.dmg} dmg</div>
      ${trait?`<div class="arsenal-trait-tag" title="${trait.desc}">${trait.emoji} ${trait.name}</div>`:""}
      <button class="arsenal-equip-btn ${isEquipped?"equipped":""}" onclick="arsenalToggle('${w.name.replace(/'/g,"\\'")}')">
        ${isEquipped?"✓ Equipped":"+ Equip"}</button>`;
    grid.appendChild(card);
  });

  const locked=ALL_WEAPONS.filter(w=>!ownedWeapons.includes(w.name)&&(arsenalFilter===0||w.tier===arsenalFilter));
  if(locked.length){
    const section=document.createElement("div");section.className="arsenal-locked-section";
    section.innerHTML=`<div class="arsenal-locked-label">🔒 Not Yet Unlocked</div>`;
    locked.forEach(w=>{
      const ti=TIER_INFO[w.tier];const card=document.createElement("div");card.className="arsenal-card arsenal-locked";
      card.innerHTML=`<div class="arsenal-tier-dot" style="background:${ti.color}60"></div>
        <div class="arsenal-card-emoji" style="opacity:0.4">${w.emoji}</div>
        <div class="arsenal-card-name" style="opacity:0.5">${w.name}</div>
        <div class="arsenal-card-dmg" style="color:${ti.color}80">${w.dmg} dmg</div>
        <button class="arsenal-equip-btn buy" onclick="showShopFromArsenal()">${w.cost} 🪙</button>`;
      section.appendChild(card);
    });grid.appendChild(section);
  }
}

function arsenalToggle(name){
  const w=ALL_WEAPONS.find(x=>x.name===name);if(!w||!ownedWeapons.includes(name))return;
  if(myLoadout.includes(name)){
    if(myLoadout.length<=1){showToast("Must keep at least 1 weapon!","red");return;}
    myLoadout=myLoadout.filter(n=>n!==name);showToast(w.emoji+" "+name+" unequipped","info");
  }else{
    if(myLoadout.length>=LOADOUT_SIZE){showToast("Max "+LOADOUT_SIZE+" weapons! Unequip one first.","red");return;}
    myLoadout=[...myLoadout,name]; // FIX: append at end
    showToast(w.emoji+" "+name+" equipped!","green");
  }
  saveTokenData();renderArsenalPanel();
}
function showShopFromArsenal(){hideArsenal();showScreen("screen-mode");setTimeout(()=>showShop(),50);}
function showSettings(){showArsenal();}
function hideSettings(){hideArsenal();}

// ══════════════════════════════════════════════
// TRADE ROOMS SYSTEM
// ══════════════════════════════════════════════
let tradeRoomCode=null,tradeRoomRole=null,tradeRoomPoll=null;
let tradeOfferTab="weapons",myTradeOffer={weapons:[],mats:[],accs:[]};

function showTradingHub(){
  tradeRoomCode=null;tradeRoomRole=null;myTradeOffer={weapons:[],mats:[],accs:[]};_tradeCompleted=false;
  showScreen("screen-trading");
  document.getElementById("tradeRoomLobby").classList.remove("hidden");
  document.getElementById("tradeRoomWaiting").classList.add("hidden");
  document.getElementById("tradeRoomActive").classList.add("hidden");
  document.getElementById("tradeRoomError").textContent="";
}

function genTradeCode(){return Math.random().toString(36).substring(2,8).toUpperCase();}

async function createTradeRoom(){
  if(!currentUser){showToast("Sign in to create trade rooms!","red");return;}
  const errEl=document.getElementById("tradeRoomError");errEl.textContent="";
  const code=genTradeCode();
  tradeRoomCode=code;tradeRoomRole="A";
  try{
    const{error}=await db.from("trade_rooms").insert({
      code,player_a:currentUser.id,player_a_name:currentUser.username,
      status:"waiting",offer_a:null,offer_b:null
    });
    if(error){
      errEl.innerHTML=`⚠️ trade_rooms table not found. Add it in Supabase: <code>CREATE TABLE trade_rooms (id uuid DEFAULT gen_random_uuid() PRIMARY KEY, code text UNIQUE, player_a text, player_a_name text, player_b text, player_b_name text, status text DEFAULT 'waiting', offer_a text, offer_b text, created_at timestamptz DEFAULT now());</code>`;
      tradeRoomCode=null;return;
    }
  }catch(e){errEl.textContent="Connection error. Try again.";tradeRoomCode=null;return;}
  document.getElementById("tradeRoomCode").textContent=code;
  document.getElementById("tradeRoomLobby").classList.add("hidden");
  document.getElementById("tradeRoomWaiting").classList.remove("hidden");
  // Fast poll (700ms) for partner joining
  tradeRoomPoll=setInterval(async()=>{
    try{
      const{data}=await db.from("trade_rooms").select("*").eq("code",code).maybeSingle();
      if(data&&data.status==="active"&&data.player_b){
        clearInterval(tradeRoomPoll);tradeRoomPoll=null;
        document.getElementById("tradeRoomWaiting").classList.add("hidden");
        startTradeRoomSession(data);
      }
    }catch(e){}
  },700);
}

async function joinTradeRoom(){
  if(!currentUser){showToast("Sign in to join trade rooms!","red");return;}
  const code=document.getElementById("tradeJoinCode").value.trim().toUpperCase();
  const errEl=document.getElementById("tradeRoomError");errEl.textContent="";
  if(!code||code.length!==6){errEl.textContent="Enter a valid 6-character code.";return;}
  try{
    const{data,error}=await db.from("trade_rooms").select("*").eq("code",code).maybeSingle();
    if(error||!data){errEl.textContent="Room not found.";return;}
    if(data.status!=="waiting"){errEl.textContent="Room is full or closed.";return;}
    await db.from("trade_rooms").update({player_b:currentUser.id,player_b_name:currentUser.username,status:"active"}).eq("code",code);
    tradeRoomCode=code;tradeRoomRole="B";
    document.getElementById("tradeRoomLobby").classList.add("hidden");
    startTradeRoomSession({...data,player_b:currentUser.id,player_b_name:currentUser.username,status:"active"});
  }catch(e){errEl.textContent="Failed to join. Try again.";}
}

function startTradeRoomSession(data){
  document.getElementById("traRoomCode").textContent=data.code;
  const myName=tradeRoomRole==="A"?data.player_a_name:data.player_b_name;
  const partnerName=tradeRoomRole==="A"?data.player_b_name:data.player_a_name;
  document.getElementById("traPlayerA").textContent=myName+" (You)";
  document.getElementById("traPlayerB").textContent=partnerName||"Partner";
  document.getElementById("tradeRoomActive").classList.remove("hidden");
  myTradeOffer={weapons:[],mats:[],accs:[]};_tradeCompleted=false;
  setTradeOfferTab("weapons");
  // Fast poll (700ms) for live offer updates
  tradeRoomPoll=setInterval(pollTradeRoom,700);
}

async function pollTradeRoom(){
  if(!tradeRoomCode)return;
  try{
    const{data}=await db.from("trade_rooms").select("*").eq("code",tradeRoomCode).maybeSingle();
    if(!data)return;
    if(data.status==="completed"||data.status==="cancelled"){
      clearInterval(tradeRoomPoll);tradeRoomPoll=null;
      if(data.status==="completed"&&!_tradeCompleted){_tradeCompleted=true;completeTrade(data);}
      else if(data.status==="cancelled"){showToast("Trade room closed.","info");showTradingHub();}
      return;
    }
    // Show opponent's offer
    const opponentOfferKey=tradeRoomRole==="A"?"offer_b":"offer_a";
    const raw=data[opponentOfferKey];
    const opponentOffer=raw?JSON.parse(raw):null;
    renderOpponentOffer(opponentOffer);
    // Check if both accepted
    if(data.offer_a&&data.offer_b){
      const offerA=JSON.parse(data.offer_a),offerB=JSON.parse(data.offer_b);
      if(offerA.accepted&&offerB.accepted&&!_tradeCompleted){
        _tradeCompleted=true;
        clearInterval(tradeRoomPoll);tradeRoomPoll=null;
        completeTrade(data);
      }
    }
  }catch(e){}
}

function renderOpponentOffer(offer){
  const el=document.getElementById("traOpponentOffer");if(!el)return;
  if(!offer||(!offer.weapons?.length&&!offer.mats?.length&&!offer.accs?.length)){
    el.innerHTML=`<div class="tra-waiting-pulse"><div class="tra-pulse-dot"></div>Waiting for opponent's offer…</div>`;
    const acceptBtn=document.getElementById("traAcceptBtn");
    if(acceptBtn)acceptBtn.style.display="none";
    return;
  }
  let html=`<div class="tra-offer-items">`;
  if(offer.weapons?.length)html+=offer.weapons.map(n=>{const w=ALL_WEAPONS.find(x=>x.name===n);const ti=TIER_INFO[w?.tier||1];return`<div class="tra-offer-item"><span>${w?.emoji||"⚔"}</span><span>${n}</span><span style="color:${ti.color};font-size:10px">T${w?.tier||"?"} · ${w?.dmg||"?"}dmg</span></div>`;}).join("");
  if(offer.mats?.length)html+=offer.mats.map(m=>{const mat=CRAFTING_MATERIALS.find(x=>x.id===m.id);const c=RARITY_COLORS[mat?.rarity]||"#94a3b8";return`<div class="tra-offer-item"><span>${mat?.emoji||"📦"}</span><span style="color:${c}">${mat?.name||m.id}</span><span>×${m.qty}</span></div>`;}).join("");
  if(offer.accs?.length)html+=offer.accs.map(id=>{const acc=ALL_ACCESSORIES.find(x=>x.id===id);const c=RARITY_COLORS[acc?.rarity]||"#94a3b8";return`<div class="tra-offer-item"><span>${acc?.emoji||"💍"}</span><span style="color:${c}">${acc?.name||id}</span></div>`;}).join("");
  html+=`</div>`;
  if(offer.accepted)html+=`<div class="tra-offer-accepted">✓ Opponent accepted!</div>`;
  el.innerHTML=html;
  const acceptBtn=document.getElementById("traAcceptBtn");
  if(acceptBtn){
    const hasItems=offer&&(offer.weapons?.length||offer.mats?.length||offer.accs?.length);
    acceptBtn.style.display=(hasItems&&!_tradeCompleted)?"inline-flex":"none";
  }
}

function setTradeOfferTab(tab){
  tradeOfferTab=tab;
  document.querySelectorAll(".tra-tab").forEach(b=>b.classList.remove("active"));
  const el=document.getElementById("traTab"+tab.charAt(0).toUpperCase()+tab.slice(1));
  if(el)el.classList.add("active");
  renderTradeOfferGrid();
}

function renderTradeOfferGrid(){
  const grid=document.getElementById("traOfferGrid");if(!grid)return;
  grid.innerHTML="";
  if(tradeOfferTab==="weapons"){
    const tradeable=ownedWeapons.filter(n=>ALL_WEAPONS.find(w=>w.name===n)); // all owned weapons are tradeable
    if(!tradeable.length){grid.innerHTML=`<p style="color:var(--text3);font-style:italic;font-size:13px">No weapons to trade.</p>`;return;}
    tradeable.forEach(n=>{
      const w=ALL_WEAPONS.find(x=>x.name===n);if(!w)return;
      const ti=TIER_INFO[w.tier],selected=myTradeOffer.weapons.includes(n);
      const card=document.createElement("div");card.className="tra-item-card"+(selected?" selected":"");
      card.innerHTML=`<div class="tra-item-emoji">${w.emoji}</div><div class="tra-item-name">${n}</div><div class="tra-item-sub" style="color:${ti.color}">T${w.tier} · ${w.dmg} dmg</div>`;
      card.onclick=()=>{
        if(selected){myTradeOffer.weapons=myTradeOffer.weapons.filter(x=>x!==n);}
        else{myTradeOffer.weapons.push(n);}
        renderTradeOfferGrid();renderMyTradeSelected();
      };
      grid.appendChild(card);
    });
  }else if(tradeOfferTab==="mats"){
    const hasMats=CRAFTING_MATERIALS.filter(m=>(playerMaterials[m.id]||0)>0);
    if(!hasMats.length){grid.innerHTML=`<p style="color:var(--text3);font-style:italic;font-size:13px">No materials to trade.</p>`;return;}
    hasMats.forEach(m=>{
      const have=playerMaterials[m.id]||0;
      const existing=myTradeOffer.mats.find(x=>x.id===m.id);
      const offeredQty=existing?existing.qty:0;
      const card=document.createElement("div");card.className="tra-item-card"+(offeredQty>0?" selected":"");
      card.innerHTML=`<div class="tra-item-emoji">${m.emoji}</div><div class="tra-item-name">${m.name}</div><div class="tra-item-sub">Have: ${have}</div>
      <div class="tra-qty-row">
        <button onclick="event.stopPropagation();adjustMatOffer('${m.id}','${m.name}','${m.emoji}',-1)">-</button>
        <span>${offeredQty}</span>
        <button onclick="event.stopPropagation();adjustMatOffer('${m.id}','${m.name}','${m.emoji}',1)">+</button>
      </div>`;
      grid.appendChild(card);
    });
  }else{
    const accs=playerAccessories; // ALL accessories tradeable — equipped ones auto-unequip on trade
    if(!accs.length){grid.innerHTML=`<p style="color:var(--text3);font-style:italic;font-size:13px">No accessories to trade.</p>`;return;}
    accs.forEach(id=>{
      const acc=ALL_ACCESSORIES.find(x=>x.id===id);if(!acc)return;
      const selected=myTradeOffer.accs.includes(id);
      const c=RARITY_COLORS[acc.rarity]||"#94a3b8";
      const card=document.createElement("div");card.className="tra-item-card"+(selected?" selected":"");
      card.innerHTML=`<div class="tra-item-emoji">${acc.emoji}</div><div class="tra-item-name">${acc.name}</div><div class="tra-item-sub" style="color:${c}">${acc.rarity}</div>`;
      card.onclick=()=>{
        if(selected){myTradeOffer.accs=myTradeOffer.accs.filter(x=>x!==id);}
        else{myTradeOffer.accs.push(id);}
        renderTradeOfferGrid();renderMyTradeSelected();
      };
      grid.appendChild(card);
    });
  }
}

function adjustMatOffer(id,name,emoji,delta){
  const have=playerMaterials[id]||0;
  const existing=myTradeOffer.mats.find(x=>x.id===id);
  let qty=(existing?existing.qty:0)+delta;
  qty=Math.max(0,Math.min(have,qty));
  if(existing){if(qty===0)myTradeOffer.mats=myTradeOffer.mats.filter(x=>x.id!==id);else existing.qty=qty;}
  else if(qty>0){myTradeOffer.mats.push({id,name,emoji,qty});}
  renderTradeOfferGrid();renderMyTradeSelected();
}

function renderMyTradeSelected(){
  const el=document.getElementById("traSelectedOffer");if(!el)return;
  const items=[];
  myTradeOffer.weapons.forEach(n=>{const w=ALL_WEAPONS.find(x=>x.name===n);items.push(`${w?.emoji||"⚔"} ${n}`);});
  myTradeOffer.mats.forEach(m=>items.push(`${m.emoji} ${m.name} ×${m.qty}`));
  myTradeOffer.accs.forEach(id=>{const acc=ALL_ACCESSORIES.find(x=>x.id===id);items.push(`${acc?.emoji||"💍"} ${acc?.name||id}`);});
  el.innerHTML=items.length?items.map(i=>`<span class="tra-sel-chip">${i}</span>`).join(""):"— Nothing selected —";
}

async function sendTradeOffer(){
  if(!tradeRoomCode){showToast("Not in a trade room!","red");return;}
  const hasItems=myTradeOffer.weapons.length||myTradeOffer.mats.length||myTradeOffer.accs.length;
  if(!hasItems){showToast("Select at least one item to offer!","red");return;}
  const offerKey=tradeRoomRole==="A"?"offer_a":"offer_b";
  const offerData={...myTradeOffer,accepted:false};
  const btn=document.getElementById("traSendOfferBtn");
  const statusEl=document.getElementById("traStatus");
  if(btn){btn.disabled=true;btn.textContent="Sending…";}
  try{
    const{error}=await db.from("trade_rooms").update({[offerKey]:JSON.stringify(offerData)}).eq("code",tradeRoomCode);
    if(error){showToast("Failed: "+error.message,"red");if(btn){btn.disabled=false;btn.textContent="Update Offer";}return;}
    if(btn){btn.disabled=false;btn.textContent="✏️ Update Offer";}// allow re-sending to update offer
    showToast("✓ Offer sent! Select theirs & accept when ready.","green");
    if(statusEl)statusEl.innerHTML=`<span style="color:var(--green)">✓ Offer sent.</span> Waiting for opponent's offer…`;
    // Immediately check if opponent already has an offer waiting
    const{data}=await db.from("trade_rooms").select("*").eq("code",tradeRoomCode).maybeSingle();
    if(data){
      const oppKey=tradeRoomRole==="A"?"offer_b":"offer_a";
      const oppOffer=data[oppKey]?JSON.parse(data[oppKey]):null;
      renderOpponentOffer(oppOffer);
      if(oppOffer&&(oppOffer.weapons?.length||oppOffer.mats?.length||oppOffer.accs?.length)){
        if(statusEl)statusEl.innerHTML=`<span style="color:var(--green)">✓ Offer sent.</span> <span style="color:#facc15">Opponent offer ready — review & accept!</span>`;
      }
    }
  }catch(e){showToast("Failed to send offer.","red");if(btn){btn.disabled=false;btn.textContent="Send Offer";}}
}

let _tradeCompleted=false; // guard against double-complete
async function acceptTrade(){
  if(!tradeRoomCode){showToast("Not in a trade room!","red");return;}
  if(_tradeCompleted)return;
  const offerKey=tradeRoomRole==="A"?"offer_a":"offer_b";
  const otherKey=tradeRoomRole==="A"?"offer_b":"offer_a";
  const btn=document.getElementById("traAcceptBtn");
  const statusEl=document.getElementById("traStatus");
  if(btn){btn.disabled=true;btn.textContent="Accepting…";}
  try{
    // Re-fetch fresh data
    const{data}=await db.from("trade_rooms").select("*").eq("code",tradeRoomCode).maybeSingle();
    if(!data){showToast("Room not found.","red");return;}
    if(data.status==="completed"){
      if(!_tradeCompleted){_tradeCompleted=true;clearInterval(tradeRoomPoll);tradeRoomPoll=null;completeTrade(data);}
      return;
    }
    // Use DB offer if already sent, else use local selection
    let myOffer=data[offerKey]?JSON.parse(data[offerKey]):{...myTradeOffer,accepted:false};
    // Null-safe normalise shape
    if(!myOffer.weapons)myOffer.weapons=[];
    if(!myOffer.mats)myOffer.mats=[];
    if(!myOffer.accs)myOffer.accs=[];
    if(!myOffer.weapons.length&&!myOffer.mats.length&&!myOffer.accs.length){
      showToast("Send your offer first before accepting!","red");
      if(btn){btn.disabled=false;btn.textContent="✓ Accept Trade";}return;
    }
    myOffer.accepted=true;
    await db.from("trade_rooms").update({[offerKey]:JSON.stringify(myOffer)}).eq("code",tradeRoomCode);
    // Re-fetch to check if both accepted
    const{data:fresh}=await db.from("trade_rooms").select("*").eq("code",tradeRoomCode).maybeSingle();
    if(!fresh)return;
    const otherOffer=fresh[otherKey]?JSON.parse(fresh[otherKey]):null;
    if(otherOffer&&otherOffer.accepted){
      if(!_tradeCompleted){
        _tradeCompleted=true;
        await db.from("trade_rooms").update({status:"completed"}).eq("code",tradeRoomCode);
        clearInterval(tradeRoomPoll);tradeRoomPoll=null;
        completeTrade({
          offer_a:tradeRoomRole==="A"?JSON.stringify(myOffer):fresh.offer_a,
          offer_b:tradeRoomRole==="B"?JSON.stringify(myOffer):fresh.offer_b,
        });
      }
    }else{
      showToast("✓ Accepted! Waiting for opponent to accept…","green");
      if(statusEl)statusEl.innerHTML=`<span style="color:var(--green)">✓ You accepted!</span> Waiting for opponent to accept…`;
      if(btn){btn.disabled=true;btn.textContent="✓ Accepted — waiting…";}
    }
  }catch(e){
    showToast("Failed to accept: "+e.message,"red");
    if(btn){btn.disabled=false;btn.textContent="✓ Accept Trade";}
  }
}

function completeTrade(data){
  try{
    let offerA=data.offer_a?JSON.parse(data.offer_a):{weapons:[],mats:[],accs:[]};
    let offerB=data.offer_b?JSON.parse(data.offer_b):{weapons:[],mats:[],accs:[]};
    if(!offerA.weapons)offerA.weapons=[];if(!offerA.mats)offerA.mats=[];if(!offerA.accs)offerA.accs=[];
    if(!offerB.weapons)offerB.weapons=[];if(!offerB.mats)offerB.mats=[];if(!offerB.accs)offerB.accs=[];
    const myOffer=tradeRoomRole==="A"?offerA:offerB;
    const theirOffer=tradeRoomRole==="A"?offerB:offerA;
    // Remove my offered items
    myOffer.weapons?.forEach(n=>{
      ownedWeapons=ownedWeapons.filter(x=>x!==n);
      myLoadout=myLoadout.filter(x=>x!==n);
    });
    myOffer.mats?.forEach(m=>{
      if(m&&m.id)playerMaterials[m.id]=Math.max(0,(playerMaterials[m.id]||0)-(m.qty||1));
    });
    myOffer.accs?.forEach(id=>{
      playerAccessories=playerAccessories.filter(x=>x!==id);
      if(equippedAccessory===id)equippedAccessory=null; // auto-unequip if traded
    });
    // Add their offered items
    theirOffer.weapons?.forEach(n=>{if(n&&!ownedWeapons.includes(n))ownedWeapons.push(n);});
    theirOffer.mats?.forEach(m=>{if(m&&m.id)playerMaterials[m.id]=(playerMaterials[m.id]||0)+(m.qty||1);});
    theirOffer.accs?.forEach(id=>{if(id&&!playerAccessories.includes(id))playerAccessories.push(id);});
    playerStats.tradesCompleted=(playerStats.tradesCompleted||0)+1;
    saveTokenData();checkAchievements();
    showToast("Trade completed! 🤝","gold");
  }catch(e){
    console.error("completeTrade error:",e);
    showToast("Trade error — please check your inventory.","red");
  }
  setTimeout(()=>showTradingHub(),1500);
}

function cancelTradeRoom(){
  if(tradeRoomPoll){clearInterval(tradeRoomPoll);tradeRoomPoll=null;}
  if(tradeRoomCode){try{db.from("trade_rooms").update({status:"cancelled"}).eq("code",tradeRoomCode).then(()=>{});}catch(e){}}
  tradeRoomCode=null;tradeRoomRole=null;
  document.getElementById("tradeRoomWaiting").classList.add("hidden");
  document.getElementById("tradeRoomLobby").classList.remove("hidden");
}

function leaveTradeRoom(){
  if(tradeRoomPoll){clearInterval(tradeRoomPoll);tradeRoomPoll=null;}
  if(tradeRoomCode){try{db.from("trade_rooms").update({status:"cancelled"}).eq("code",tradeRoomCode).then(()=>{});}catch(e){}}
  tradeRoomCode=null;tradeRoomRole=null;
  showTradingHub();
}

function copyTradeCode(){
  const code=document.getElementById("tradeRoomCode")?.textContent||"";
  navigator.clipboard.writeText(code).catch(()=>{});
  showToast("Code copied!","green");
}

async function loadOffers(){
  const container=document.getElementById("offersContainer");if(!container)return;
  try{
    const{data}=await db.from("trade_listings").select("*").eq("buyer_id",currentUser.id).eq("status","sold").limit(20);
    if(!data||data.length===0){container.innerHTML=`<p style="color:var(--text3);font-style:italic">No completed trades.</p>`;return;}
    container.innerHTML=`<p style="font-size:13px;color:var(--text2);margin-bottom:12px">Weapons you've purchased:</p>`+data.map(l=>{
      const w=ALL_WEAPONS.find(x=>x.name===l.weapon_name);
      return`<div class="trade-card"><div class="trade-weapon">${w?.emoji||"⚔"} ${l.weapon_name}</div><div class="trade-price" style="color:var(--green)">Bought for ${l.ask_price} 🪙 from ${l.seller_name}</div></div>`;
    }).join("");
  }catch(e){container.innerHTML=`<p style="color:var(--red)">Failed to load.</p>`;}
}

async function buyListing(listingId,weaponName,price,sellerId){
  if(localTokens<price){showToast("Not enough coins!","red");return;}
  if(ownedWeapons.includes(weaponName)){showToast("You already own this!","info");return;}
  try{
    const{error}=await db.from("trade_listings").update({status:"sold",buyer_id:currentUser.id,buyer_name:currentUser.username}).eq("id",listingId).eq("status","active");
    if(error){showToast("Trade failed: "+error.message,"red");return;}
    localTokens-=price;ownedWeapons.push(weaponName);
    playerStats.tradesCompleted=(playerStats.tradesCompleted||0)+1;
    updateTokenDisplay();await saveTokenData();
    showToast(`⚔ ${weaponName} added to arsenal!`,"gold");
    renderTradingHub();
  }catch(e){showToast("Trade error: "+e.message,"red");}
}

// ══════════════════════════════════════════════
// DISCORD & TUTORIAL
// ══════════════════════════════════════════════
function showDiscordPrompt(){
  if(confirm("Join our Discord community? You'll be taken to discord.gg/bBkNVKxvru")){
    window.open("https://discord.gg/bBkNVKxvru","_blank");
  }
}

const TUTORIAL_STEPS=[
  {title:"⚔ Welcome to Arena of Supremacy!",body:`<p>Arena of Supremacy is a <strong>deep strategic battle game</strong> where every decision matters. Two fighters duel across 3 rounds, 6 shots each. The player with more HP when the rounds end wins!</p><p>You choose a <strong>weapon</strong> (to attack) and a <strong>shield value</strong> (to defend) — secretly, simultaneously. No luck, pure strategy.</p><div class="tut-tip">💡 <strong>Tip:</strong> This is NOT random. Study your opponent's patterns and outthink them every shot.</div>`},
  {title:"🗡️ Core Combat Formula",body:`<p>Every shot resolves with simple math:</p><div class="tut-formula">Damage you deal = |Your Weapon Dmg − Enemy Shield|</div><div class="tut-formula">Damage you take = |Your Shield − Enemy Weapon Dmg|</div><p><strong>Perfect Block</strong> = pick a shield value that exactly matches the enemy's weapon damage. They deal 0 damage to you!</p><p><strong>Example:</strong> Enemy has a 12-dmg sword. You pick Shield 12 → 0 damage taken. You pick Shield 8 → 4 damage taken. You pick Shield 15 → 3 damage taken.</p><div class="tut-tip">💡 Shield hints: When it's your turn after the opponent locks in, a <span style="color:#5fffc0">highlighted shield</span> shows the perfect counter.</div>`},
  {title:"🧱 HP, Rounds & Victory",body:`<p>Each player starts with <strong>30 HP</strong> per round. There are 3 rounds, 6 shots each. You do NOT recover HP between rounds.</p><p><strong>Round wins</strong> go to the player with more HP after 6 shots. <strong>Match wins</strong> go to whoever wins 2 of 3 rounds (or most total HP in a draw).</p><p><strong>Sudden Death:</strong> If rounds are tied 1–1 and HP is equal after round 3, an extra sudden death round begins — first to take any damage loses!</p><div class="tut-tip">💡 Don't go all-out early. Managing HP across all 3 rounds is key to winning the match.</div>`},
  {title:"🧪 Potions — Use Them Wisely",body:`<p>Instead of attacking, you can use a <strong>Health Potion</strong> to restore +10 HP. This skips your weapon & shield selection entirely.</p><p>Potions cost <strong>15 🪙</strong> in the shop and you can hold up to 9. They're shared across all rounds.</p><p><strong>When to use:</strong> If your HP drops dangerously low and you believe the opponent will attack big next shot — a potion can swing the round.</p><div class="tut-tip">💡 <strong>Mind games:</strong> Opponents expect you to attack. Healing when they shield-bluff can turn the tide.</div>`},
  {title:"⚜️ Clans — Your Power Identity",body:`<p>On signup, you're assigned a clan: <strong>🌿 Exorcist</strong>, <strong>🌑 Eclipse</strong>, <strong>💧 Hydros</strong>, or <strong>🔥 Vulcryn</strong>. Each has 4 upgrade versions (V1–V4).</p><ul class="tut-list"><li><strong>Exorcist:</strong> First shot each round ignores enemy shield (V4)</li><li><strong>Eclipse:</strong> 35% dodge + first shot crits (V4)</li><li><strong>Hydros:</strong> Potions heal +8 HP and deal damage (V4)</li><li><strong>Vulcryn:</strong> +3 dmg all shots + burn every 3rd (V4)</li></ul><p>Rare roll-only clans: <strong>⚡ Thunder</strong>, <strong>🌑 Shadow</strong>, and the ultra-rare <strong>👻 Spirit Clan</strong> (best in game!).</p><div class="tut-tip">💡 Upgrade your clan with 1,000 🪙 per version. Reroll for 4,000 🪙 — chance at Thunder, Shadow, or Spirit!</div>`},
  {title:"👻 Spirit Clan — The Rarest Clan",body:`<p><strong>Spirit Clan</strong> is the best and rarest clan in the game. You can only get it by rerolling clans — it has no guaranteed path.</p><div class="tut-clan-card" style="border:1px solid #b8aaff44;padding:12px;border-radius:8px;background:#b8aaff0a"><p style="color:#b8aaff">👻 Spirit Clan Versions:</p><ul class="tut-list"><li><strong>V1 Wisp:</strong> +1 dmg every shot + 10% negate damage</li><li><strong>V2 Specter:</strong> +2 dmg every shot + 20% negate</li><li><strong>V3 Phantom Lord:</strong> +2 dmg + 25% negate + ignore 2 shield pts</li><li><strong>V4 Spirit Sovereign:</strong> SPIRIT SURGE — +3 dmg + 35% negate + every 3rd shot DOUBLES</li></ul></div><div class="tut-tip">💡 Spirit Clan is especially powerful in Boss Battle where the damage negate makes you nearly unkillable at V4.</div>`},
  {title:"🌍 Races — Passive Bonuses & Ultimate Abilities",body:`<p>Alongside your clan, you're assigned a <strong>Race</strong> on signup. Races give passive perks AND a powerful ability usable in combat.</p><ul class="tut-list"><li><strong>🧑 Human (50%):</strong> +10% coins, balanced stats. Ultimate: Bullseye — ignore shield AND potion this shot</li><li><strong>👹 Oni (20%):</strong> +2 base damage, enemy starts with -1 HP. Ultimate: Lifesteal — drain enemy HP to fill yours</li><li><strong>✨ Heavenly (10%):</strong> 15% divine shield, +25% XP. Ultimate: God's Grace — perfect counter + regain ALL HP</li><li><strong>👻 Supernatural (20%):</strong> 20% phase dodge, soul sight. Ultimate: EnMagicked — perfect counter + bypass 50% shield</li></ul><p>Use race abilities strategically — they have round or match cooldowns!</p>`},
  {title:"✨ Weapon Traits & Resonance",body:`<p><strong>Traits</strong> are passive bonuses attached to weapons. Roll them for 500 🪙, or craft them using materials.</p><p>Traits range from <span style="color:#94a3b8">Common</span> to <span style="color:#ff6b35">Mythic</span>. Examples: <em>"Every 3rd hit deals +4 void damage"</em>, <em>"15% chance to attack twice"</em>.</p><p><strong>Weapon Resonance</strong> is a mastery system — the more you use a weapon, the higher its resonance (max 700). At milestones (50, 150, 300, 500, 700) you gain permanent +1 to +5 bonus damage with that weapon!</p><div class="tut-tip">💡 Specialize! Pick 3–4 favourite weapons and grind their resonance to max for devastating bonuses.</div>`},
  {title:"🔨 Crafting, Fusion & Sets",body:`<p><strong>Crafting:</strong> Collect materials from daily quests and item rolls, then craft exclusive Mythic traits unavailable via rolling.</p><p><strong>Fusion:</strong> Combine two weapons into a super-weapon — takes the higher tier +1 and higher damage +2. Consumes both source weapons!</p><p><strong>Weapon Sets:</strong> Equip 2+ weapons from a set to unlock bonuses. Equip all 4 for the full power. Example: Moon Slayer Set gives 30% dodge + +3 dmg to all shots at 4 pieces!</p><div class="tut-tip">💡 Plan your loadout around a set bonus for a major edge in every battle.</div>`},
  {title:"💀 Boss Battle — Solo Mode",body:`<p>Boss Battle pits <strong>you alone</strong> against the mighty <strong>Warlord</strong> — a hyper-intelligent AI with <strong>300 HP</strong>.</p><p>The Boss uses adaptive AI: it <strong>learns your weapon patterns</strong> after a few shots and begins predicting your choices. It has an 80% chance to perfectly counter your predicted weapon!</p><p>To win, you must vary your weapons, bait the boss into wrong shields, and use potions strategically. A perfect block against the boss deals ZERO damage to you.</p><div class="tut-tip">💡 Never use the same weapon 3 shots in a row — the boss will predict it. Alternate between high-damage and deceptive weapons.</div>`},
  {title:"🏅 Ranked, Tournament & Online",body:`<p><strong>Online:</strong> Share a 6-character room code with a friend and battle in real-time.</p><p><strong>Ranked:</strong> Matchmake with players near your rating (starts at 1000). Win = +rating, Loss = −rating. Climb to 1500+ for Grandmaster!</p><p><strong>Tournament:</strong> 4 or 8 player brackets. Single elimination — beat everyone to claim the 500 🪙 prize. Quitting = instant disqualification.</p><div class="tut-tip">💡 Ranked and Tournament rewards are the best way to farm coins fast. A tournament win gives 500 🪙 in one run!</div>`},
  {title:"🪙 Economy & Daily Quests",body:`<p><strong>Earning coins:</strong> Win = +200 🪙, Loss = +50 🪙, Boss kill = +300 🪙. Complete daily quests for bonus coins and crafting materials.</p><p><strong>Daily Streak:</strong> Log in every day to build your streak. At Day 7: +300 🪙 bonus. Day 14: +600. Day 30: +2000 🪙 + rare materials!</p><p><strong>Item Roll:</strong> Every 2 hours, roll a random crafting material for free. Don't miss it!</p><div class="tut-tip">💡 Priority spending: buy T4–T5 weapons first (big damage jumps), then upgrade your clan, then roll traits on your best weapons.</div>`},
  {title:"🏆 Achievements & Levels",body:`<p>Earn <strong>XP</strong> from every match, shot, and win. Level up from 1 all the way to <strong>Lv.1000</strong>! Higher levels mean more XP per action.</p><p>There are <strong>60+ achievements</strong> across combat, trading, ranked, and progression. Each rewards coins, XP, and rare materials.</p><p>Special achievements like <em>"Grandmaster"</em> (1500 rating) or <em>"Spirit Sovereign"</em> (own Spirit V4) are the hardest — and most rewarding.</p><div class="tut-tip">💡 You are now ready, Warrior. Good luck in the Arena. May the strongest fighter prevail! ⚔</div>`},
];
let tutStep=0;
function showTutorial(){tutStep=0;renderTutStep();showScreen("screen-tutorial");}
function renderTutStep(){
  const step=TUTORIAL_STEPS[tutStep];
  document.getElementById("tutStepIndicator").textContent=`${tutStep+1} / ${TUTORIAL_STEPS.length}`;
  document.getElementById("tutContent").innerHTML=`<div class="tut-step"><div class="tut-step-title">${step.title}</div><div class="tut-step-body">${step.body}</div></div>`;
  document.getElementById("tutPrevBtn").style.visibility=tutStep>0?"visible":"hidden";
  document.getElementById("tutNextBtn").textContent=tutStep===TUTORIAL_STEPS.length-1?"Start Playing! →":"Next →";
  const dots=document.getElementById("tutDots");
  if(dots)dots.innerHTML=TUTORIAL_STEPS.map((_,i)=>`<div class="tut-dot ${i===tutStep?"active":""}"></div>`).join("");
}
function tutNext(){if(tutStep<TUTORIAL_STEPS.length-1){tutStep++;renderTutStep();}else{showScreen("screen-mode");}}
function tutPrev(){if(tutStep>0){tutStep--;renderTutStep();}}

// ══════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════
let authMode="login";
function setAuthTab(mode){
  authMode=mode;
  document.getElementById("tabLogin").classList.toggle("active",mode==="login");
  document.getElementById("tabSignup").classList.toggle("active",mode==="signup");
  document.getElementById("authSubmitText").textContent=mode==="login"?"Enter the Arena":"Create Account";
  document.getElementById("authError").textContent="";document.getElementById("authError").className="form-error";
  document.getElementById("authPassword").autocomplete=mode==="login"?"current-password":"new-password";
}
function setAuthLoading(on){
  document.getElementById("authSubmit").disabled=on;
  document.getElementById("authSubmitSpinner").classList.toggle("hidden",!on);
  document.getElementById("authSubmitText").textContent=on?"…":(authMode==="login"?"Enter the Arena":"Create Account");
}
function setAuthError(msg,ok=false){
  const el=document.getElementById("authError");el.textContent=msg;el.className=ok?"form-success":"form-error";
}
async function hashPassword(password){
  const encoder=new TextEncoder();
  const data=encoder.encode(password+"klocvork_salt_2024");
  const hashBuffer=await crypto.subtle.digest("SHA-256",data);
  return Array.from(new Uint8Array(hashBuffer)).map(b=>b.toString(16).padStart(2,"0")).join("");
}
async function signUp(username,password){
  if(!USERNAME_REGEX.test(username)){setAuthError("Username: 3–15 chars, letters/numbers/underscores only.");return;}
  if(password.length<6){setAuthError("Password must be at least 6 characters.");return;}
  setAuthLoading(true);
  try{
    const{data:ex}=await db.from("players").select("id").eq("username",username.toLowerCase()).maybeSingle();
    if(ex){setAuthError("Username already taken.");return;}
    const hashed=await hashPassword(password);
    const assignedClan=getRandomClan();
    const assignedRace=getRandomRace();
    const{data,error}=await db.from("players").insert({
      username:username.toLowerCase(),password_hash:hashed,tokens:0,potions:0,xp:0,
      clan:JSON.stringify({key:assignedClan,version:1}),race:assignedRace,
      stats:JSON.stringify(defaultStats()),
    }).select("id,username").single();
    if(error){setAuthError("Sign up failed: "+error.message);return;}
    const raceData=RACES[assignedRace];
    setAuthError(`Account created! Clan: ${CLANS[assignedClan].emoji} ${CLANS[assignedClan].name} · Race: ${raceData.emoji} ${raceData.name}!`,true);
    setTimeout(()=>{saveSession({id:data.id,username:data.username});updateUserPill();loadTokenData().then(()=>showScreen("screen-mode"));},1000);
  }catch(e){setAuthError("Something went wrong.");}
  finally{setAuthLoading(false);}
}
async function signIn(username,password){
  if(!username||!password){setAuthError("Fill in all fields.");return;}
  setAuthLoading(true);
  try{
    const{data}=await db.from("players").select("id,username,password_hash").eq("username",username.toLowerCase()).maybeSingle();
    if(!data){setAuthError("Username not found.");return;}
    if(await hashPassword(password)!==data.password_hash){setAuthError("Incorrect password.");return;}
    saveSession({id:data.id,username:data.username});updateUserPill();await loadTokenData();showScreen("screen-mode");
  }catch(e){setAuthError("Something went wrong.");}
  finally{setAuthLoading(false);}
}
function handleAuth(){
  const u=document.getElementById("authUsername").value.trim();
  const p=document.getElementById("authPassword").value;
  if(authMode==="signup")signUp(u,p);else signIn(u,p);
}
function playAsGuest(){
  clearSession();
  localTokens=0;localPotions=0;localXP=0;weaponTraits={};playerClan=null;playerMaterials={};playerAccessories=[];equippedAccessory=null;playerAchievements={};playerStats=defaultStats();
  ownedWeapons=[...STARTER_WEAPON_NAMES];myLoadout=[...STARTER_WEAPON_NAMES.slice(0,LOADOUT_SIZE)];
  dailyQuests=null;updateUserPill();updateTokenDisplay();showScreen("screen-mode");
}
function logout(){clearSession();localTokens=0;localPotions=0;localXP=0;weaponTraits={};playerClan=null;playerRace=null;updateUserPill();updateTokenDisplay();showScreen("screen-auth");}

// ── Profile Picture System ──
const PROFILE_PICS=[
  "⚔️","🗡️","🛡️","👑","🔥","💧","🌿","🌑","⚡","👻",
  "🐉","🌀","💎","🌙","☀️","🦅","🐺","🦁","🐍","🦊",
  "🔮","⚜️","🏹","🌸","💀","🌊","🌪️","🌟","🪬","🧿"
];
let profilePic = null; // stored per session, loaded from localStorage
function loadProfilePic(){try{const s=localStorage.getItem("klocvork_pic");profilePic=s||null;}catch(e){profilePic=null;}}
function saveProfilePic(pic){profilePic=pic;try{localStorage.setItem("klocvork_pic",pic);}catch(e){}}
loadProfilePic();

let _catalogOpen=false;
function toggleUserCatalog(){
  _catalogOpen=!_catalogOpen;
  const cat=document.getElementById("userCatalog");
  if(cat)cat.classList.toggle("uc-open",_catalogOpen);
  if(_catalogOpen)renderUserCatalog();
}
function closeUserCatalog(){_catalogOpen=false;const cat=document.getElementById("userCatalog");if(cat)cat.classList.remove("uc-open");}

function renderUserCatalog(){
  const grid=document.getElementById("ucPicsGrid");
  const dispEl=document.getElementById("ucAvatarDisplay");
  const unEl=document.getElementById("ucUsername");
  if(dispEl)dispEl.textContent=profilePic||"⚔️";
  if(unEl)unEl.textContent=currentUser?currentUser.username:"Player";
  if(!grid)return;
  grid.innerHTML=PROFILE_PICS.map((p,i)=>`<button class="uc-pic-btn ${(profilePic||"⚔️")===p?"uc-pic-selected":""}" onclick="setProfilePic('${p}')">${p}</button>`).join("");
}

function setProfilePic(pic){
  saveProfilePic(pic);
  renderUserCatalog();
  updateUserPill();
  const dispEl=document.getElementById("ucAvatarDisplay");
  if(dispEl)dispEl.textContent=pic;
}

// Close catalog on outside click
document.addEventListener("click",function(e){
  if(_catalogOpen&&!e.target.closest(".user-info-wrap"))closeUserCatalog();
});

function updateUserPill(){
  // Legacy logoutBtn hidden (replaced by user info)
  const btn=document.getElementById("logoutBtn");if(btn)btn.style.display="none";
  // New user info wrap
  const wrap=document.getElementById("userInfoWrap");
  const nameEl=document.getElementById("userInfoName");
  const avatarEl=document.getElementById("userInfoAvatar");
  if(wrap){wrap.style.display=currentUser?"":"none";}
  if(nameEl)nameEl.textContent=currentUser?currentUser.username:"";
  if(avatarEl)avatarEl.textContent=profilePic||"⚔️";
}

// ══════════════════════════════════════════════
// SCREEN / TOAST
// ══════════════════════════════════════════════
function showScreen(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));const el=document.getElementById(id);if(el)el.classList.add("active");}
let toastTimer=null;
function showToast(msg,type="info"){
  let t=document.getElementById("toast");
  if(!t){t=document.createElement("div");t.id="toast";t.className="toast";document.body.appendChild(t);}
  t.textContent=msg;t.className="toast toast-"+type;t.classList.add("toast-show");
  if(toastTimer)clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove("toast-show"),3000);
}

// ══════════════════════════════════════════════
// MODE SELECT
// ══════════════════════════════════════════════
let gameMode=null;
function selectMode(mode){
  gameMode=mode;_gameOverFired=false;restoreTurnPanel();
  if(mode==="online")showScreen("screen-lobby");
  else if(mode==="ranked"){showRankedLobby();}
  else if(mode==="tournament"){showTournamentLobby();}
  else if(mode==="boss"){initBossGame();showScreen("screen-game");}
  else{initGame(mode);showScreen("screen-game");}
}

// ══════════════════════════════════════════════
// GAME STATE
// ══════════════════════════════════════════════
let gs={};
function freshGameState(names){
  return{hpA:MAX_HP,hpB:MAX_HP,round:1,shot:1,phase:"A",usedWeapons:[],pendingA:null,
    isSuddenDeath:false,names:names||{A:"Player A",B:"Player B"},totalHpA:0,totalHpB:0,
    potionsA:localPotions,potionsB:localPotions,specialScoreA:0,specialScoreB:0,
    raceAbilityAUsedRound:false,raceAbilityBUsedRound:false,
    raceAbilityAUsedMatch:false,raceAbilityBUsedMatch:false};
}
let SHIELD_VALUES_A=[],SHIELD_VALUES_B=[];
let AI_WEAPONS=[]; // AI's own weapon pool — never shares with Player A

// Build AI weapon pool: randomly sampled from T1-T3, does NOT use player's loadout
function buildAIWeapons(){
  const tier1=ALL_WEAPONS.filter(w=>w.tier===1);
  const tier2=ALL_WEAPONS.filter(w=>w.tier===2);
  const tier3=ALL_WEAPONS.filter(w=>w.tier===3);
  // Pick 4 random T1, 4 T2, 4 T3 for a fair 12-weapon AI loadout
  function pick(arr,n){const s=[...arr].sort(()=>Math.random()-0.5);return s.slice(0,Math.min(n,s.length));}
  return[...pick(tier1,4),...pick(tier2,4),...pick(tier3,4)];
}

function initGame(mode,names){
  _gameOverFired=false;
  // Player A: use their actual loadout
  WEAPONS=myLoadout.map(n=>ALL_WEAPONS.find(w=>w.name===n)).filter(Boolean);
  if(!WEAPONS.length)WEAPONS=ALL_WEAPONS.filter(w=>STARTER_WEAPON_NAMES.includes(w.name));
  SHIELD_VALUES_A=getShieldValues(WEAPONS);
  // AI / Player B: separate weapon pool
  if(mode==="ai"){
    AI_WEAPONS=buildAIWeapons();
    // B's shield values derived from AI's weapons, but also must be able to block player A's weapons
    SHIELD_VALUES_B=getShieldValuesForPlayer(AI_WEAPONS,null);
  }else{
    AI_WEAPONS=[];
    SHIELD_VALUES_B=SHIELD_VALUES_A; // hotseat: same set
  }
  SHIELD_VALUES=SHIELD_VALUES_A;
  const n=names||{A:currentUser?currentUser.username:"Player A",B:mode==="ai"?"🤖 The Machine":"Player B"};
  gs=freshGameState(n);specialActive=false;specialGuesserNow="A";
  renderGame();initEmojiChat();
}

// AI auto-pick weapon and shield for "vs AI" mode
function aiMakeChoice(){
  // AI uses its OWN weapon pool — never picks from player A's loadout
  const aiPool=AI_WEAPONS.length?AI_WEAPONS:ALL_WEAPONS.filter(w=>w.tier<=2);
  const avail=aiPool.filter(w=>!gs.usedWeapons.includes(w.name));
  const pool=avail.length>0?avail:aiPool;
  // Weighted random — higher dmg = more likely
  const totalDmg=pool.reduce((s,w)=>s+w.dmg,0);
  let r=Math.random()*totalDmg,aiWeapon=pool[pool.length-1];
  for(const w of pool){r-=w.dmg;if(r<=0){aiWeapon=w;break;}}
  // Shield: try to perfectly block player A's pending weapon if visible
  const aW=gs.pendingA&&gs.pendingA.weapon?gs.pendingA.weapon:null;
  const aiShieldVals=getShieldValuesForPlayer(aiPool,aW);
  // 40% chance AI tries to perfectly block, 60% random
  let aiShield;
  if(aW&&Math.random()<0.40){
    aiShield=aW.dmg; // perfect block attempt
  }else{
    aiShield=aiShieldVals[Math.floor(Math.random()*aiShieldVals.length)];
  }
  return{weapon:aiWeapon,shield:aiShield,potion:false,raceAbility:false};
}

// ══════════════════════════════════════════════
// BOSS BATTLE — SOLO MODE
// ══════════════════════════════════════════════
let bossHp=BOSS_HP_MAX;
// Boss AI memory — tracks player patterns for adaptive strategy
let bossMemory={weaponHistory:[],shieldHistory:[],damageDealt:0,shotsTotal:0,consecutivePerfectBlocks:0};

function initBossGame(){
  _gameOverFired=false;
  bossHp=BOSS_HP_MAX;
  bossMemory={weaponHistory:[],shieldHistory:[],damageDealt:0,shotsTotal:0,consecutivePerfectBlocks:0};
  WEAPONS=myLoadout.map(n=>ALL_WEAPONS.find(w=>w.name===n)).filter(Boolean);
  if(!WEAPONS.length)WEAPONS=ALL_WEAPONS.filter(w=>STARTER_WEAPON_NAMES.includes(w.name));
  SHIELD_VALUES_A=getShieldValues(WEAPONS);
  gs=freshGameState({A:currentUser?currentUser.username:"Player",B:"The Warlord"});
  gs.hpB=MAX_HP; // solo: player has normal HP, boss has separate bossHp tracker
  renderBossGame();initEmojiChat();
}

// Smart boss AI — uses player history, picks optimal counter
function bossAIMakeChoice(playerWeapon){
  bossMemory.shotsTotal++;
  const bossPool=ALL_WEAPONS.filter(w=>w.tier>=3&&!w.fused);
  const pool=bossPool.length?bossPool:ALL_WEAPONS;

  // SMART: predict player's likely weapon based on history
  // If player has a pattern, boss counters it
  let predictedPlayerWeapon=playerWeapon;
  if(!predictedPlayerWeapon&&bossMemory.weaponHistory.length>=3){
    // Find most frequently used weapon in recent 5 shots
    const recent=bossMemory.weaponHistory.slice(-5);
    const freq={};recent.forEach(w=>{freq[w]=(freq[w]||0)+1;});
    const topWeaponName=Object.entries(freq).sort((a,b)=>b[1]-a[1])[0][0];
    predictedPlayerWeapon=WEAPONS.find(w=>w.name===topWeaponName)||null;
  }

  // Boss weapon selection: weighted by damage, but avoids weapons that got perfect-blocked recently
  const recentlyBlocked=bossMemory.weaponHistory.slice(-3);
  const preferredPool=pool.filter(w=>!recentlyBlocked.includes(w.name))||pool;
  const totalDmg=preferredPool.reduce((s,w)=>s+w.dmg,0);
  let r=Math.random()*totalDmg,bW=preferredPool[preferredPool.length-1];
  for(const w of preferredPool){r-=w.dmg;if(r<=0){bW=w;break;}}

  // SMART SHIELD: Boss has 80% chance to perfectly counter predicted player weapon
  // Also 15% chance to pick a random high-value shield to be unpredictable
  let bS;
  const allShieldVals=[...new Set(ALL_WEAPONS.filter(w=>!w.fused).map(w=>w.dmg))].sort((a,b)=>a-b);
  if(predictedPlayerWeapon&&Math.random()<0.80){
    bS=predictedPlayerWeapon.dmg; // boss perfectly counters player's predicted weapon
  }else if(Math.random()<0.15){
    // Unpredictable: pick a high-value shield
    bS=allShieldVals[allShieldVals.length-1-Math.floor(Math.random()*3)];
  }else{
    bS=allShieldVals[Math.floor(Math.random()*allShieldVals.length)];
  }

  return{weapon:bW,shield:bS};
}

function renderBossGame(){
  document.getElementById("gsRound").textContent="💀 Boss Battle";
  document.getElementById("gsShot").textContent="Boss HP: "+bossHp+"/"+BOSS_HP_MAX;
  document.getElementById("hpNameA").textContent=gs.names.A;
  document.getElementById("hpNameB").textContent="💀 Warlord";
  updateHPBars();renderAvailableWeapons();hideOnlineWaiting();
  renderPlayerATurn(true);
}

function resolveBossShot(cA){
  const bossChoice=bossAIMakeChoice(cA.weapon);
  const bW=bossChoice.weapon, bS=bossChoice.shield;

  // Update boss memory with player's choice
  if(cA.weapon){bossMemory.weaponHistory.push(cA.weapon.name);}
  if(cA.shield!=null){bossMemory.shieldHistory.push(cA.shield);}

  // Damage calc: player vs boss
  const dmgBossFromPlayer=cA.weapon?Math.abs(bS-cA.weapon.dmg):0;
  const dmgToPlayer=cA.shield!=null?Math.abs(cA.shield-bW.dmg):bW.dmg;

  // Spirit clan bonus for boss
  let spiritBonus=0;
  if(playerClan&&playerClan.key==="spirit"){
    const v=playerClan.version;
    spiritBonus=v>=4?3:v>=2?2:1;
    // Negate chance
    const negateChance=v>=4?0.35:v>=3?0.25:v>=2?0.20:0.10;
    if(Math.random()<negateChance&&dmgToPlayer>0){
      showToast("👻 Spirit Clan negated damage!","gold");
      // dmgToPlayer = 0 handled below with flag
      const prevHp=bossHp;bossHp=Math.max(0,bossHp-dmgBossFromPlayer-spiritBonus);
      if(!cA.potion)gs.hpA=gs.hpA; // damage negated
      else gs.hpA=Math.min(MAX_HP,gs.hpA+POTION_HEAL);
      showBossSoloResult(cA,bW,bS,0,dmgBossFromPlayer+spiritBonus,prevHp);
      return;
    }
  }

  const prevHp=bossHp;
  bossHp=Math.max(0,bossHp-dmgBossFromPlayer-spiritBonus);
  if(!cA.potion)gs.hpA=Math.max(0,gs.hpA-dmgToPlayer);
  else gs.hpA=Math.min(MAX_HP,gs.hpA+POTION_HEAL);

  if(dmgToPlayer===0)bossMemory.consecutivePerfectBlocks++;
  else bossMemory.consecutivePerfectBlocks=0;
  bossMemory.damageDealt+=dmgToPlayer;

  showBossSoloResult(cA,bW,bS,dmgToPlayer,dmgBossFromPlayer+spiritBonus,prevHp);
}

function showBossSoloResult(cA,bW,bS,dmgToPlayer,dmgTowardsBoss,prevBossHp){
  document.getElementById("rdNameA").textContent=gs.names.A;
  document.getElementById("rdNameB").textContent="💀 Warlord";
  document.getElementById("rdWeaponA").textContent=cA.potion?"🧪 Healed":(cA.weapon.emoji+" "+cA.weapon.name+" → "+dmgTowardsBoss+" dmg to Boss");
  document.getElementById("rdWeaponB").textContent=bW.emoji+" "+bW.name+" (Boss Attack)";
  document.getElementById("rdShieldA").textContent=cA.potion?"+"+POTION_HEAL+" HP":"🛡 "+cA.shield;
  document.getElementById("rdShieldB").textContent="🛡 Boss Shield: "+bS;
  const eA=document.getElementById("rdDmgA"),eB=document.getElementById("rdDmgB");
  eA.className=(dmgToPlayer===0||cA.potion)?"rd-dmg no-dmg":"rd-dmg";
  eA.textContent=cA.potion?"+"+POTION_HEAL+" HP 🧪":(dmgToPlayer===0?"✦ Perfect Block!":"−"+dmgToPlayer+" HP");
  eB.className=dmgTowardsBoss>0?"rd-dmg no-dmg":"rd-dmg";
  eB.textContent=dmgTowardsBoss>0?"💥 −"+dmgTowardsBoss+" Boss HP":"🛡 Boss blocked!";

  const hpEl=document.getElementById("resultHpSummary"),nBtn=document.getElementById("resultNextBtn");
  if(bossHp<=0){
    hpEl.innerHTML="🏆 "+gs.names.A+" SLEW THE WARLORD!";
    nBtn.textContent="Claim Reward →";nBtn.onclick=()=>claimBossReward("A");
  }else if(gs.hpA<=0){
    hpEl.innerHTML="💀 You fell. The Warlord survives with "+bossHp+" HP.";
    nBtn.textContent="Retreat →";nBtn.onclick=()=>showScreen("screen-mode");
  }else{
    hpEl.innerHTML=bW.emoji+" Warlord used "+bW.name+` (Shield ${bS}) | Boss HP: <strong>`+bossHp+"</strong>/"+BOSS_HP_MAX+" | Your HP: "+gs.hpA;
    nBtn.textContent="Next Shot →";nBtn.onclick=nextBossShot;
  }
  showScreen("screen-result");
}

async function claimBossReward(winner){
  if(currentUser){
    await awardTokens(BOSS_TOKENS,"Boss Kill!");await awardXP("boss");
    playerStats.bossKills=(playerStats.bossKills||0)+1;await saveTokenData();
    checkAchievements();updateDailyQuest("boss");
    if(Math.random()<0.15)dropRandomAccessory();
  }
  showScreen("screen-mode");
}
function nextBossShot(){gs.shot++;renderBossGame();showScreen("screen-game");}


function dropRandomAccessory(){
  const unowned=ALL_ACCESSORIES.filter(a=>!playerAccessories.includes(a.id));if(!unowned.length)return;
  const dropped=unowned[Math.floor(Math.random()*unowned.length)];
  playerAccessories.push(dropped.id);playerStats.accessoriesOwned=(playerStats.accessoriesOwned||0)+1;saveTokenData();
  showToast(`💍 Accessory Drop: ${dropped.emoji} ${dropped.name}!`,"gold");
}

// ══════════════════════════════════════════════
// RENDER GAME
// ══════════════════════════════════════════════
function renderGame(){
  document.getElementById("gsRound").textContent=gs.isSuddenDeath?"⚡ Sudden Death":"Round "+gs.round+" / "+TOTAL_ROUNDS;
  document.getElementById("gsShot").textContent="Shot "+gs.shot+" / "+SHOTS_PER_ROUND;
  document.getElementById("hpNameA").textContent=gs.names.A;document.getElementById("hpNameB").textContent=gs.names.B;
  updateHPBars();renderAvailableWeapons();hideOnlineWaiting();
  if(!specialActive&&Math.random()<SPECIAL_CHANCE){triggerSpecialShot();return;}
  // In AI mode, only ever show Player A's turn
  if(gs.phase==="A")renderPlayerATurn(false);
  else if(gameMode==="ai"){
    // Should not normally reach here, but guard against it
    gs.phase="A";renderPlayerATurn(false);
  }else renderPlayerBTurn(false);
}
function updateHPBars(){
  const pA=Math.max(0,gs.hpA/MAX_HP*100),pB=Math.max(0,gs.hpB/MAX_HP*100);
  const bA=document.getElementById("hpBarA"),bB=document.getElementById("hpBarB");
  bA.style.width=pA+"%";bB.style.width=pB+"%";
  document.getElementById("hpNumA").textContent=gs.hpA;document.getElementById("hpNumB").textContent=gs.hpB;
  bA.style.background=pA>50?"var(--green)":pA>25?"#facc15":"var(--red)";
  bA.style.boxShadow=pA>50?"0 0 8px var(--green-glow)":pA>25?"0 0 8px rgba(250,204,21,0.3)":"0 0 8px var(--red-glow)";
  bB.style.background=pB>50?"var(--green)":pB>25?"#facc15":"var(--red)";
  bB.style.boxShadow=pB>50?"0 0 8px var(--green-glow)":pB>25?"0 0 8px rgba(250,204,21,0.3)":"0 0 8px var(--red-glow)";
  bA.classList.toggle("low-hp",pA<=30&&pA>0);bB.classList.toggle("low-hp",pB<=30&&pB>0);
}
function renderAvailableWeapons(){
  const list=document.getElementById("availableWeaponsList");list.innerHTML="";
  WEAPONS.forEach(w=>{
    const c=document.createElement("span");c.className="aw-chip"+(gs.usedWeapons.includes(w.name)?" used":"");
    const trait=weaponTraits[w.name];c.textContent=w.emoji+" "+w.name+(trait?" "+trait.emoji:"");
    list.appendChild(c);
  });
}
function showOnlineWaiting(msg){
  document.getElementById("onlineWaitingText").textContent=msg||"Waiting for opponent…";
  document.getElementById("onlineWaitingOverlay").classList.remove("hidden");
  document.getElementById("turnPanel").style.display="none";
}
function hideOnlineWaiting(){
  document.getElementById("onlineWaitingOverlay").classList.add("hidden");
  document.getElementById("turnPanel").style.display="";
}

// ══════════════════════════════════════════════
// SPECIAL SHOT
// ══════════════════════════════════════════════
let specialActive=false,specialGuesserNow="A",specialHiddenWeapon=null;
function triggerSpecialShot(){specialActive=true;showToast("✨ SPECIAL SHOT triggered!","gold");renderSpecialTurn();}
function renderSpecialTurn(){
  specialHiddenWeapon=WEAPONS[Math.floor(Math.random()*WEAPONS.length)];
  const guesser=specialGuesserNow,targetName=guesser==="A"?gs.names.B:gs.names.A,meName=guesser==="A"?gs.names.A:gs.names.B;
  const myScore=guesser==="A"?gs.specialScoreA:gs.specialScoreB,theirScore=guesser==="A"?gs.specialScoreB:gs.specialScoreA;
  const panel=document.getElementById("turnPanel");
  panel.innerHTML=`<div class="turn-header"><div class="turn-player-badge special-badge">✨ Special Shot — ${meName}'s Turn</div><div class="turn-phase">Guess ${targetName}'s hidden weapon! Score: ${meName} <strong>${myScore}</strong> — ${targetName} <strong>${theirScore}</strong> (first to ${SPECIAL_WINS_NEED} wins 🪙${SPECIAL_TOKENS})</div></div>
  <div class="choice-section"><label class="choice-label">Guess ${targetName}'s Weapon</label><div class="weapon-grid" id="specialGuessGrid"></div></div>
  <button class="btn-confirm" id="confirmBtn" onclick="confirmSpecialGuess()" disabled>Submit Guess →</button><p id="gameError" class="form-error"></p>`;
  window._specialSel=null;
  renderWeaponGrid("specialGuessGrid",WEAPONS,function(w){window._specialSel=w;const cb=document.getElementById("confirmBtn");if(cb)cb.disabled=false;});
}
function confirmSpecialGuess(){
  const guessed=window._specialSel;if(!guessed)return;
  const correct=guessed.name===specialHiddenWeapon.name,guesser=specialGuesserNow;
  if(correct){if(guesser==="A")gs.specialScoreA++;else gs.specialScoreB++;showToast("✅ Correct! "+specialHiddenWeapon.emoji+" "+specialHiddenWeapon.name,"green");}
  else{showToast("❌ Wrong! It was "+specialHiddenWeapon.emoji+" "+specialHiddenWeapon.name,"red");}
  if(gs.specialScoreA>=SPECIAL_WINS_NEED||gs.specialScoreB>=SPECIAL_WINS_NEED){endSpecialRound();return;}
  specialGuesserNow=guesser==="A"?"B":"A";
  if(gameMode==="hotseat"){document.getElementById("passTitle").textContent="Pass to "+(specialGuesserNow==="A"?gs.names.A:gs.names.B);document.getElementById("passSubtitle").textContent="Next: Special Shot guess.";showScreen("screen-pass");}
  else renderSpecialTurn();
}
async function endSpecialRound(){
  const aWon=gs.specialScoreA>=SPECIAL_WINS_NEED,winnerName=aWon?gs.names.A:gs.names.B;
  showToast("🏆 "+winnerName+" wins the Special Round! +"+SPECIAL_TOKENS+" 🪙","gold");
  if(aWon&&currentUser){await awardTokens(SPECIAL_TOKENS,"Special Round Win!");await awardXP("special");}
  gs.specialScoreA=0;gs.specialScoreB=0;specialActive=false;specialGuesserNow="A";
  restoreTurnPanel();setTimeout(()=>{gs.phase="A";renderGame();},1500);
}

// ══════════════════════════════════════════════
// TURN PANEL
// ══════════════════════════════════════════════
function restoreTurnPanel(){
  const tp=document.getElementById("turnPanel");if(!tp)return;
  tp.innerHTML=`<div class="turn-header"><div class="turn-player-badge" id="turnBadge">Player A's Turn</div><div class="turn-phase" id="turnPhase">Choose your weapon & shield</div></div>
  <div class="choice-section"><label class="choice-label">Your Weapon</label><div class="weapon-grid" id="weaponGrid"></div></div>
  <div class="choice-section"><label class="choice-label">Shield Points <span class="shield-hint">(5–15)</span></label><div class="shield-grid" id="shieldGrid"></div></div>
  <div class="choice-section" id="potionRow"></div>
  <div class="choice-section" id="raceAbilityRowA"></div>
  <div class="choice-section" id="raceAbilityRowB" style="display:none"></div>
  <button class="btn-confirm" id="confirmBtn" onclick="confirmChoice()" disabled>Confirm →</button><p id="gameError" class="form-error"></p>`;
}

let selWeaponA=null,selShieldA=null,usingPotionA=false,usingRaceAbilityA=false;
let selWeaponB=null,selShieldB=null,usingPotionB=false,usingRaceAbilityB=false;

function getRaceAbility(player){
  const race=player==="A"?playerRace:(gameMode==="hotseat"?playerRace:null);
  if(!race)return null;
  const r=RACES[race];if(!r||!r.v4ability)return null;
  const clanV4=(playerClan&&playerClan.version>=4)||race==="fluxion";
  if(!clanV4)return null;
  const usedRound=player==="A"?gs.raceAbilityAUsedRound:gs.raceAbilityBUsedRound;
  const usedMatch=player==="A"?gs.raceAbilityAUsedMatch:gs.raceAbilityBUsedMatch;
  const cd=r.v4ability.cooldown;
  const used=(cd==="round"&&usedRound)||(cd==="match"&&usedMatch);
  return{...r.v4ability,available:!used,race};
}

function renderRaceAbilityRow(rowId,player){
  const row=document.getElementById(rowId);if(!row)return;
  const ab=getRaceAbility(player);
  if(!ab){row.innerHTML="";return;}
  const using=player==="A"?usingRaceAbilityA:usingRaceAbilityB;
  const r=RACES[ab.race];
  row.innerHTML=`<label class="choice-label" style="color:${r.color}">⚡ Race Ability${ab.cooldown==="match"?" (Once per match)":" (Once per round)"}</label>
  <button class="btn-race-ability${using?" race-ability-active":""}" id="raceAbilityBtn${player}"
    onclick="toggleRaceAbility('${player}')" ${ab.available?"":"disabled"} style="border-color:${r.color};color:${ab.available?(using?"#fff":r.color):"var(--text3)"}">
    ${ab.emoji} ${ab.name} ${ab.available?"":"(Used)"}
    <div class="rab-desc">${ab.desc}</div>
  </button>`;
}

function toggleRaceAbility(player){
  if(player==="A"){
    usingRaceAbilityA=!usingRaceAbilityA;
    if(usingRaceAbilityA){usingPotionA=false;selWeaponA=null;selShieldA=null;}
    renderRaceAbilityRow("raceAbilityRowA","A");checkAReady();
  }else{
    usingRaceAbilityB=!usingRaceAbilityB;
    if(usingRaceAbilityB){usingPotionB=false;selWeaponB=null;selShieldB=null;}
    renderRaceAbilityRow("raceAbilityRowB","B");checkBReady();
  }
}

function renderPlayerATurn(isBoss){
  selWeaponA=null;selShieldA=null;usingPotionA=false;usingRaceAbilityA=false;
  const badge=document.getElementById("turnBadge"),phase=document.getElementById("turnPhase");
  if(badge)badge.textContent=gs.names.A+"'s Turn";
  if(phase)phase.textContent=isBoss?"Choose your weapon & shield to attack the Boss!":"Choose your weapon & shield — hidden from your opponent.";
  const cb=document.getElementById("confirmBtn");if(cb)cb.disabled=true;
  renderWeaponGrid("weaponGrid",WEAPONS,w=>{selWeaponA=w;usingPotionA=false;usingRaceAbilityA=false;checkAReady();});
  renderShieldGrid("shieldGrid",SHIELD_VALUES_A.length?SHIELD_VALUES_A:getShieldValues(WEAPONS),v=>{selShieldA=v;checkAReady();},null);
  renderPotionRow("potionRow","A");
  renderRaceAbilityRow("raceAbilityRowA","A");
}
function checkAReady(){const cb=document.getElementById("confirmBtn");if(cb)cb.disabled=!(usingPotionA||usingRaceAbilityA||(selWeaponA&&selShieldA!==null));}


function renderPlayerBTurn(isBoss){
  selWeaponB=null;selShieldB=null;usingPotionB=false;usingRaceAbilityB=false;
  const badge=document.getElementById("turnBadge"),phase=document.getElementById("turnPhase");
  if(badge)badge.textContent=gs.names.B+"'s Turn";
  if(phase)phase.textContent=isBoss?"Choose weapon & shield to attack the Boss!":"Pick your weapon & shield.";
  const cb=document.getElementById("confirmBtn");if(cb)cb.disabled=true;
  // In hotseat: B picks from same loadout (WEAPONS) minus A's chosen weapon (secret)
  // In online: B has their own loadout (handled separately)
  const bPool=WEAPONS; // always use the shared loadout for local modes
  const bAvail=isBoss?bPool:bPool.filter(w=>w.name!==(gs.pendingA&&gs.pendingA.weapon?gs.pendingA.weapon.name:null));
  renderWeaponGrid("weaponGrid",bAvail,w=>{selWeaponB=w;usingPotionB=false;usingRaceAbilityB=false;checkBReady();});
  // Shield hint: if A's pending weapon exists, highlight the perfect counter shield for B
  const aW=gs.pendingA&&gs.pendingA.weapon?gs.pendingA.weapon:null;
  const perfectShield=aW?aW.dmg:null;
  // Always include a block option for opponent's weapon (critical for T7 weapons like Getsuga)
  const bShieldVals=getShieldValuesForPlayer(WEAPONS,aW);
  renderShieldGrid("shieldGrid",bShieldVals,v=>{selShieldB=v;checkBReady();},perfectShield);
  renderPotionRow("potionRow","B");
  renderRaceAbilityRow("raceAbilityRowB","B");
}
function checkBReady(){const cb=document.getElementById("confirmBtn");if(cb)cb.disabled=!(usingPotionB||usingRaceAbilityB||(selWeaponB&&selShieldB!==null));}

function renderPotionRow(rowId,player){
  const row=document.getElementById(rowId);if(!row)return;
  const count=player==="A"?gs.potionsA:gs.potionsB;
  if(!count||count<=0){row.innerHTML="";return;}
  row.innerHTML=`<label class="choice-label">Potions (${count} left)</label><button class="btn-potion" id="potionBtn${player}" onclick="togglePotion('${player}')">🧪 Use Potion (+${POTION_HEAL} HP)</button>`;
}
function togglePotion(player){
  if(player==="A"){
    usingPotionA=!usingPotionA;if(usingPotionA){selWeaponA=null;selShieldA=null;}
    const btn=document.getElementById("potionBtnA");if(btn)btn.classList.toggle("potion-active",usingPotionA);
    document.querySelectorAll("#weaponGrid .weapon-btn").forEach(b=>b.classList.toggle("weapon-dimmed",usingPotionA));
    document.querySelectorAll("#shieldGrid .shield-btn").forEach(b=>b.classList.toggle("weapon-dimmed",usingPotionA));
    checkAReady();
  }else{
    usingPotionB=!usingPotionB;if(usingPotionB){selWeaponB=null;selShieldB=null;}
    const btn=document.getElementById("potionBtnB");if(btn)btn.classList.toggle("potion-active",usingPotionB);
    document.querySelectorAll("#weaponGrid .weapon-btn").forEach(b=>b.classList.toggle("weapon-dimmed",usingPotionB));
    document.querySelectorAll("#shieldGrid .shield-btn").forEach(b=>b.classList.toggle("weapon-dimmed",usingPotionB));
    checkBReady();
  }
}

function renderWeaponGrid(gridId,weapons,onSelect){
  const grid=document.getElementById(gridId);if(!grid)return;
  grid.innerHTML="";
  weapons.forEach(w=>{
    const ti=TIER_INFO[w.tier]||TIER_INFO[1],trait=weaponTraits[w.name];
    const res=weaponResonance[w.name]||0;
    const resBonus=getResonanceBonus(w.name);
    const resColor=res>=700?"#ff6b35":res>=500?"#a855f7":res>=300?"#facc15":res>=150?"#22d3ee":res>=50?"#4ade80":"#5fffc0";
    const resHtml=res>0?` <span class='weapon-res' style='color:${resColor};font-size:10px;font-weight:700' title='Resonance: ${res}/700${resBonus?` (+${resBonus} dmg)`:""}'>🔮${res}</span>`:"";
    const btn=document.createElement("button");btn.className="weapon-btn";btn.style.position="relative";
    if(res>=700)btn.style.boxShadow=`0 0 8px ${resColor}88`;
    btn.innerHTML=`<span>${w.emoji} ${w.name}${resHtml}${trait?` <span class='weapon-trait-dot' title='${trait.name}: ${trait.desc}'>${trait.emoji}</span>`:""}</span><span class='weapon-dmg'>${w.dmg+resBonus} dmg</span><span class='weapon-tier' style='background:${ti.color}22;color:${ti.color};border:1px solid ${ti.color}44'>T${w.tier}</span>`;
    btn.onclick=function(){grid.querySelectorAll(".weapon-btn").forEach(b=>b.classList.remove("selected"));btn.classList.add("selected");onSelect(w);};
    grid.appendChild(btn);
  });
}
function renderShieldGrid(gridId,values,onSelect,perfectValue){
  const grid=document.getElementById(gridId);if(!grid)return;
  grid.innerHTML="";
  values.forEach(v=>{
    const btn=document.createElement("button");btn.className="shield-btn";
    if(v===perfectValue)btn.classList.add("perfect-counter");
    btn.textContent=v;
    btn.onclick=function(){grid.querySelectorAll(".shield-btn").forEach(b=>b.classList.remove("selected"));btn.classList.add("selected");onSelect(v);};
    grid.appendChild(btn);
  });
}

// ══════════════════════════════════════════════
// CONFIRM CHOICE
// ══════════════════════════════════════════════
function confirmChoice(){
  if(gameMode==="online"){confirmOnlineChoice();return;}
  if(gs.phase==="A"){
    if(!usingPotionA&&!usingRaceAbilityA&&(!selWeaponA||selShieldA===null))return;
    gs.pendingA={weapon:selWeaponA,shield:selShieldA,potion:usingPotionA,raceAbility:usingRaceAbilityA};
    if(usingRaceAbilityA){const ab=getRaceAbility("A");if(ab&&ab.cooldown==="round")gs.raceAbilityAUsedRound=true;if(ab&&ab.cooldown==="match")gs.raceAbilityAUsedMatch=true;}
    const cb=document.getElementById("confirmBtn");
    if(cb){cb.classList.add("locked-in");cb.textContent="✓ Locked In";cb.disabled=true;}
    if(gameMode==="hotseat"){
      document.getElementById("passTitle").textContent="Pass to "+gs.names.B;
      document.getElementById("passSubtitle").textContent=gs.names.A+" has locked their choice. Hand the device over.";
      showScreen("screen-pass");
    }else if(gameMode==="ai"){
      gs.phase="B";
      if(usingPotionA){gs.potionsA=Math.max(0,gs.potionsA-1);if(currentUser){localPotions=Math.max(0,localPotions-1);saveTokenData();}}
      const aiChoice=aiMakeChoice();
      resolveShot(gs.pendingA,aiChoice);
    }else if(gameMode==="boss"){
      // SOLO boss mode: player A only, boss AI responds
      if(usingPotionA){gs.potionsA=Math.max(0,gs.potionsA-1);if(currentUser){localPotions=Math.max(0,localPotions-1);saveTokenData();updateDailyQuest("potion");}}
      resolveBossShot(gs.pendingA);
    }else{gs.phase="B";renderGame();}
  }else{
    if(!usingPotionB&&!usingRaceAbilityB&&(!selWeaponB||selShieldB===null))return;
    if(usingRaceAbilityB){const ab=getRaceAbility("B");if(ab&&ab.cooldown==="round")gs.raceAbilityBUsedRound=true;if(ab&&ab.cooldown==="match")gs.raceAbilityBUsedMatch=true;}
    if(usingPotionB){gs.potionsB=Math.max(0,gs.potionsB-1);if(currentUser){localPotions=Math.max(0,localPotions-1);saveTokenData();updateDailyQuest("potion");}}
    if(gs.pendingA?.potion){gs.potionsA=Math.max(0,gs.potionsA-1);if(currentUser){localPotions=Math.max(0,localPotions-1);}}
    resolveShot(gs.pendingA,{weapon:selWeaponB,shield:selShieldB,potion:usingPotionB,raceAbility:usingRaceAbilityB});
  }
}
function continueAfterPass(){
  if(gameMode==="boss"){showScreen("screen-game");renderBossGame();}
  else if(specialActive){showScreen("screen-game");renderSpecialTurn();}
  else{showScreen("screen-game");if(gs.phase==="B"){restoreTurnPanel();renderPlayerBTurn(false);}else renderGame();}
}

// ══════════════════════════════════════════════
// RESOLVE SHOT
// ══════════════════════════════════════════════
function resolveShot(cA,cB){
  let dmgToA=0,dmgToB=0;

  // ── Race ability resolution ──
  if(cA.raceAbility){
    const ab=getRaceAbility("A");const race=playerRace||"human";
    if(race==="human"||race==="fluxion"){
      if(race==="fluxion"){ triggerInversionRift("A"); return; }
      // Bullseye: ignore shield, ignore potion
      dmgToB=(cA.weapon?cA.weapon.dmg:0);
      dmgToA=0;
      showToast("🎯 Bullseye! Shield & potion ignored!","gold");
    }else if(race==="oni"){
      // Lifesteal: drain opponent HP to fill own
      const stolen=gs.hpB;gs.hpB=0;gs.hpA=Math.min(MAX_HP,gs.hpA+stolen);
      showToast("🩸 Lifesteal! Drained "+stolen+" HP!","gold");
      finishShot(cA,cB,0,0);return;
    }else if(race==="heavenly"){
      // God's Grace: perfect counter + full HP restore
      dmgToA=0;dmgToB=0;gs.hpA=MAX_HP;
      showToast("🌟 God's Grace! Full HP restored!","gold");
      finishShot(cA,cB,0,0);return;
    }else if(race==="supernatural"){
      // EnMagicked: perfect counter + 50% shield bypass + missing HP bonus
      const missingHp=MAX_HP-gs.hpA;const bonusDmg=Math.floor(missingHp*0.5);
      dmgToA=0;
      if(cB.potion){dmgToB=0;}else{
        const shieldEffect=Math.floor(Math.abs(cB.shield-cA.weapon.dmg)*0.5);
        dmgToB=Math.max(1,(cA.weapon?cA.weapon.dmg:0)-shieldEffect+bonusDmg);
      }
      showToast("🌀 EnMagicked! +"+bonusDmg+" bonus dmg from missing HP!","gold");
    }
    if(!cB.potion&&cA.weapon)gs.hpB=Math.max(0,gs.hpB-dmgToB);
    gs.hpA=Math.max(0,gs.hpA-dmgToA);
    finishShot(cA,cB,dmgToA,dmgToB);return;
  }
  if(cB.raceAbility){
    // B used a race ability
    const race=(gameMode==="hotseat")?playerRace:"human"; // B's race in hotseat
    if(race==="fluxion"){
      triggerInversionRift("B"); return;
    }else if(race==="oni"){
      const stolen=gs.hpA;gs.hpA=0;gs.hpB=Math.min(MAX_HP,gs.hpB+stolen);
      showToast("🩸 Lifesteal!","gold");finishShot(cA,cB,0,0);return;
    }else if(race==="heavenly"){
      dmgToB=0;dmgToA=0;gs.hpB=MAX_HP;showToast("🌟 God's Grace!","gold");finishShot(cA,cB,0,0);return;
    }else if(race==="human"){
      dmgToA=cB.weapon?cB.weapon.dmg:0;dmgToB=0;showToast("🎯 Bullseye!","gold");
    }else if(race==="supernatural"){
      const missingHp=MAX_HP-gs.hpB;const bonusDmg=Math.floor(missingHp*0.5);
      dmgToB=0;dmgToA=cA.potion?0:Math.max(1,(cB.weapon?cB.weapon.dmg:0)+bonusDmg);
      showToast("🌀 EnMagicked!","gold");
    }
    if(!cA.potion)gs.hpA=Math.max(0,gs.hpA-dmgToA);
    finishShot(cA,cB,dmgToA,dmgToB);return;
  }

  // ── Normal shot resolution ──
  if(!cA.potion&&!cB.potion){
    dmgToB=Math.abs(cB.shield-cA.weapon.dmg);
    dmgToA=Math.abs(cA.shield-cB.weapon.dmg);
    // Resonance bonus — pierces through (even a perfect block gets +res bonus)
    if(cA.weapon&&currentUser){const rb=getResonanceBonus(cA.weapon.name);dmgToB+=rb;}
  }else if(cA.potion&&!cB.potion){dmgToA=0;dmgToB=Math.round(cB.weapon.dmg/2);}
  else if(!cA.potion&&cB.potion){dmgToB=0;dmgToA=Math.round(cA.weapon.dmg/2);}

  if(dmgToA===0&&!cA.potion){playerStats.perfectBlocks=(playerStats.perfectBlocks||0)+1;updateDailyQuest("perfectBlock");if(currentUser)saveTokenData();}

  if(!cA.potion)gs.hpA=Math.max(0,gs.hpA-dmgToA);else gs.hpA=Math.min(MAX_HP,gs.hpA+POTION_HEAL);
  if(!cB.potion)gs.hpB=Math.max(0,gs.hpB-dmgToB);else gs.hpB=Math.min(MAX_HP,gs.hpB+POTION_HEAL);
  if(cA.weapon&&!gs.usedWeapons.includes(cA.weapon.name))gs.usedWeapons.push(cA.weapon.name);
  if(cB.weapon&&!gs.usedWeapons.includes(cB.weapon.name))gs.usedWeapons.push(cB.weapon.name);
  if(currentUser){
    if(cA.weapon)gainResonance(cA.weapon.name);
    awardXP("shot");updateDailyQuest("shot");playerStats.totalShots=(playerStats.totalShots||0)+1;
  }
  finishShot(cA,cB,dmgToA,dmgToB);
}
function finishShot(cA,cB,dmgToA,dmgToB){
  if(cA.weapon&&!gs.usedWeapons.includes(cA.weapon.name))gs.usedWeapons.push(cA.weapon.name);
  if(cB.weapon&&!gs.usedWeapons.includes(cB.weapon.name))gs.usedWeapons.push(cB.weapon.name);
  if(currentUser){awardXP("shot");updateDailyQuest("shot");playerStats.totalShots=(playerStats.totalShots||0)+1;}
  // Track T4 use for daily quest
  if((cA.weapon&&cA.weapon.tier>=4)||(cB.weapon&&cB.weapon.tier>=4))updateDailyQuest("useT4");
  showShotResult(cA,cB,dmgToA,dmgToB);
}

function showShotResult(cA,cB,dmgA,dmgB){
  document.getElementById("rdNameA").textContent=gs.names.A;document.getElementById("rdNameB").textContent=gs.names.B;
  document.getElementById("rdWeaponA").textContent=cA.raceAbility?(getRaceAbility("A")?.emoji||"⚡")+" "+(getRaceAbility("A")?.name||"Race Ability"):cA.potion?"🧪 Healed":((cA.weapon?.emoji||"")+" "+(cA.weapon?.name||"—"));
  document.getElementById("rdWeaponB").textContent=cB.raceAbility?"⚡ Race Ability":cB.potion?"🧪 Healed":((cB.weapon?.emoji||"")+" "+(cB.weapon?.name||"—"));
  document.getElementById("rdShieldA").textContent=cA.raceAbility?"—":cA.potion?"+"+POTION_HEAL+" HP":"🛡 "+cA.shield;
  document.getElementById("rdShieldB").textContent=cB.raceAbility?"—":cB.potion?"+"+POTION_HEAL+" HP":"🛡 "+cB.shield;
  const eA=document.getElementById("rdDmgA"),eB=document.getElementById("rdDmgB");
  eA.className=(dmgA===0||cA.potion)?"rd-dmg no-dmg":"rd-dmg";
  eA.textContent=cA.potion?"+"+POTION_HEAL+" HP 🧪":(dmgA===0?"✦ Perfect Block!":"−"+dmgA+" HP");
  eB.className=(dmgB===0||cB.potion)?"rd-dmg no-dmg":"rd-dmg";
  eB.textContent=cB.potion?"+"+POTION_HEAL+" HP 🧪":(dmgB===0?"✦ Perfect Block!":"−"+dmgB+" HP");
  document.getElementById("resultHpSummary").innerHTML=gs.names.A+": <strong>"+gs.hpA+" HP</strong> | "+gs.names.B+": <strong>"+gs.hpB+" HP</strong>";
  showScreen("screen-result");
}

function nextAfterResult(){
  gs.pendingA=null;gs.phase="A";
  if(gameMode==="boss"){nextBossShot();return;}
  if(gs.hpA<=0||gs.hpB<=0||gs.shot>=SHOTS_PER_ROUND){endRound();}
  else{
    gs.shot++;
    if(gameMode==="online"){
      if(onlineRole==="A"){showScreen("screen-game");renderGame();db.from("game_rooms").update({turn_status:"a_choosing",move_a:null,move_b:null,state:JSON.stringify(gs)}).eq("code",onlineRoom);}
      else{showScreen("screen-game");document.getElementById("gsShot").textContent="Shot "+gs.shot+" / "+SHOTS_PER_ROUND;updateHPBars();renderAvailableWeapons();showOnlineWaiting("Waiting for "+gs.names.A+" to choose…");}
    }else{showScreen("screen-game");renderGame();}
  }
}

function endRound(){
  gs.totalHpA=(gs.totalHpA||0)+gs.hpA;gs.totalHpB=(gs.totalHpB||0)+gs.hpB;
  const lastRound=(gs.round>=TOTAL_ROUNDS&&!gs.isSuddenDeath)||gs.isSuddenDeath;
  document.getElementById("roNameA").textContent=gs.names.A;document.getElementById("roNameB").textContent=gs.names.B;
  if(lastRound){
    if(gs.isSuddenDeath){document.getElementById("roHpA").textContent=gs.hpA+" HP";document.getElementById("roHpB").textContent=gs.hpB+" HP";}
    else{document.getElementById("roHpA").textContent=gs.totalHpA+" HP total";document.getElementById("roHpB").textContent=gs.totalHpB+" HP total";}
    if(gs.totalHpA===gs.totalHpB&&!gs.isSuddenDeath){document.getElementById("roLabel").textContent="It's a Tie after 3 Rounds!";document.getElementById("roNextBtn").textContent="⚡ Begin Sudden Death →";showScreen("screen-roundover");setTimeout(playRoundWinAnimation,100);}
    else showGameOver();
  }else{
    document.getElementById("roHpA").textContent=gs.hpA+" HP  (total: "+gs.totalHpA+")";
    document.getElementById("roHpB").textContent=gs.hpB+" HP  (total: "+gs.totalHpB+")";
    document.getElementById("roLabel").textContent="Round "+gs.round+" Complete";
    document.getElementById("roNextBtn").textContent="Begin Round "+(gs.round+1)+" →";
    showScreen("screen-roundover");
    setTimeout(playRoundWinAnimation,100);
  }
}

function startNextRound(){
  if(gs.totalHpA===gs.totalHpB&&gs.round>=TOTAL_ROUNDS)gs.isSuddenDeath=true;else gs.round++;
  gs.hpA=MAX_HP;gs.hpB=MAX_HP;gs.shot=1;gs.phase="A";gs.usedWeapons=[];gs.pendingA=null;
  // Reset round-based race abilities
  gs.raceAbilityAUsedRound=false;gs.raceAbilityBUsedRound=false;
  if(gameMode==="online"){
    if(onlineRole==="A"){showScreen("screen-game");renderGame();db.from("game_rooms").update({turn_status:"a_choosing",move_a:null,move_b:null,state:JSON.stringify(gs)}).eq("code",onlineRoom);}
    else{showScreen("screen-game");document.getElementById("gsRound").textContent=gs.isSuddenDeath?"⚡ Sudden Death":"Round "+gs.round+" / "+TOTAL_ROUNDS;document.getElementById("gsShot").textContent="Shot 1 / "+SHOTS_PER_ROUND;updateHPBars();renderAvailableWeapons();showOnlineWaiting("Waiting for "+gs.names.A+" to choose…");}
  }else{showScreen("screen-game");gs.phase="A";renderGame();}
}

// ══════════════════════════════════════════════
// GAME OVER
// ══════════════════════════════════════════════
let _gameOverFired=false; // prevent double-fire
async function showGameOver(){
  if(_gameOverFired)return; _gameOverFired=true;
  const finalA=gs.totalHpA||gs.hpA,finalB=gs.totalHpB||gs.hpB;
  const aWins=finalA>finalB,tie=finalA===finalB;
  document.getElementById("goEmblem").textContent=tie?"🤝":"🏆";
  document.getElementById("goNameA").textContent=gs.names.A;document.getElementById("goNameB").textContent=gs.names.B;
  document.getElementById("goHpA").textContent=gs.isSuddenDeath?gs.hpA+" HP":(gs.totalHpA||gs.hpA)+" HP total";
  document.getElementById("goHpB").textContent=gs.isSuddenDeath?gs.hpB+" HP":(gs.totalHpB||gs.hpB)+" HP total";
  if(tie){document.getElementById("goResult").textContent="It's a Draw!";document.getElementById("goSubtitle").textContent="Both warriors fought with equal fury.";}
  else{const w=aWins?gs.names.A:gs.names.B;document.getElementById("goResult").textContent=w+" Wins!";document.getElementById("goSubtitle").textContent=aWins?gs.names.B+" has been defeated.":gs.names.A+" has been defeated.";}

  if(currentUser&&gameMode!=="boss"){
    // In AI/hotseat mode, A is always the local player
    // In online/ranked, A is whoever has onlineRole==="A"
    const localIsA=(gameMode!=="online"&&gameMode!=="ranked")||onlineRole==="A";
    const isWin=!tie&&(localIsA?aWins:!aWins);
    if(isWin){
      playerStats.wins=(playerStats.wins||0)+1;
      playerStats.consecutiveWins=(playerStats.consecutiveWins||0)+1;
      playerStats.maxConsecutiveWins=Math.max(playerStats.maxConsecutiveWins||0,playerStats.consecutiveWins);
      if(gameMode==="online")playerStats.onlineWins=(playerStats.onlineWins||0)+1;
      if(gameMode==="ranked"){playerStats.rankedWins=(playerStats.rankedWins||0)+1;updateRankedRating(true);}
      updateDailyQuest("win");if(gameMode==="online"||gameMode==="ranked")updateDailyQuest("online");
    }else{
      playerStats.losses=(playerStats.losses||0)+1;
      playerStats.consecutiveWins=0;
      if(gameMode==="ranked"){playerStats.rankedLosses=(playerStats.rankedLosses||0)+1;updateRankedRating(false);}
    }
    playerStats.totalRoundsPlayed=(playerStats.totalRoundsPlayed||0)+TOTAL_ROUNDS;
    // Calculate XP and tokens THEN save once — prevents race condition double-saves
    const lvlBefore=getCurrentLevelNum(localXP);
    const xpGained=getXpForAction(isWin?"win":"loss",lvlBefore);
    localXP+=xpGained;
    const lvlAfter=getCurrentLevelNum(localXP);
    if(lvlAfter>lvlBefore)showToast(`🎉 Level Up! Lv.${lvlAfter}`,"gold");
    const coinsGained=tie?TOKENS_LOSS:(aWins?TOKENS_WIN:TOKENS_LOSS);
    const coinReason=tie?"Draw.":(aWins?"Victory!":"Better luck next time.");
    localTokens+=coinsGained;
    if(coinsGained>0)playerStats.totalTokensEarned=(playerStats.totalTokensEarned||0)+coinsGained;
    showToast("+"+coinsGained+" 🪙  "+coinReason,"gold");
    const goXp=document.getElementById("goXpAward");
    if(goXp)goXp.innerHTML=`<span class="go-xp-badge">+${xpGained} XP ✨ Lv.${lvlAfter}</span>`;
    updateTokenDisplay();
    // Show screen immediately — save in background so no lag
    showScreen("screen-gameover");destroyEmojiChat();
    saveTokenData().then(()=>{ checkAchievements(); if(isWin&&Math.random()<0.08)dropRandomAccessory(); });
    return;
  }
  showScreen("screen-gameover");destroyEmojiChat();
  const flash=document.createElement("div");flash.className="go-flash "+(tie?"draw":"win");document.body.appendChild(flash);setTimeout(()=>flash.remove(),800);
  if(!tie){
    const colors=["#a855f7","#c084fc","#22d3ee","#4ade80","#facc15","#f43f5e"];
    const cx=window.innerWidth/2,cy=window.innerHeight/2;
    for(let i=0;i<28;i++){
      const p=document.createElement("div");p.className="go-particle";
      const angle=(Math.PI*2*i)/28+(Math.random()-0.5)*0.4,dist=120+Math.random()*180;
      const tx=Math.cos(angle)*dist,ty=Math.sin(angle)*dist-60;
      p.style.cssText=`left:${cx-4}px;top:${cy-4}px;background:${colors[i%colors.length]};--tx:${tx}px;--ty:${ty}px;--dur:${0.7+Math.random()*0.6}s;--delay:${Math.random()*0.15}s;box-shadow:0 0 6px ${colors[i%colors.length]};`;
      document.body.appendChild(p);setTimeout(()=>p.remove(),1500);
    }
  }
}
// playAgain kept for internal use but removed from game over screen
function playAgain(){restoreTurnPanel();initGame(gameMode);showScreen("screen-game");}

// ══════════════════════════════════════════════
// WIN ROUND ANIMATIONS
// ══════════════════════════════════════════════
function playRoundWinAnimation(){
  const container=document.getElementById("roundoverParticles");if(!container)return;
  container.innerHTML="";
  const colors=["#a855f7","#c084fc","#22d3ee","#4ade80","#facc15","#f43f5e","#ff6b35","#fff"];
  const cx=window.innerWidth/2,cy=window.innerHeight/2;
  for(let i=0;i<40;i++){
    const p=document.createElement("div");p.className="ro-particle-burst";
    const angle=(Math.PI*2*i)/40+(Math.random()-0.5)*0.5;
    const dist=80+Math.random()*220;
    const tx=Math.cos(angle)*dist,ty=Math.sin(angle)*dist-80;
    const color=colors[Math.floor(Math.random()*colors.length)];
    const size=4+Math.random()*8;
    p.style.cssText=`position:fixed;left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;background:${color};border-radius:50%;pointer-events:none;z-index:20;box-shadow:0 0 8px ${color};--tx:${tx}px;--ty:${ty}px;--dur:${0.6+Math.random()*0.7}s;--delay:${Math.random()*0.12}s;animation:ro-particle-fly var(--dur) var(--delay) ease-out forwards;`;
    container.appendChild(p);
    setTimeout(()=>p.remove(),1500);
  }
  // Trophy bounce
  const trophy=document.getElementById("roTrophy");
  if(trophy){trophy.style.display="block";trophy.classList.remove("ro-trophy-bounce");void trophy.offsetWidth;trophy.classList.add("ro-trophy-bounce");}
}

function confirmQuit(){
  if(confirm("Quit and return to the menu?")){
    // FIX: notify opponent if online
    if(gameMode==="online"&&onlineRoom){db.from("game_rooms").update({status:"abandoned"}).eq("code",onlineRoom).then(()=>{});}
    cleanupOnline();destroyEmojiChat();restoreTurnPanel();showScreen("screen-mode");
  }
}

// ══════════════════════════════════════════════
// ONLINE MULTIPLAYER
// ══════════════════════════════════════════════
var onlineRoom=null,onlineSub=null,onlineRole=null,lobbyPoll=null;
var lastHandledKey="",resultShownForKey="";

function startGamePoll(){if(lobbyPoll){clearInterval(lobbyPoll);lobbyPoll=null;}lastHandledKey="";lobbyPoll=setInterval(pollTick,1500);}

async function pollTick(){
  if(!onlineRoom){clearInterval(lobbyPoll);lobbyPoll=null;return;}
  var data;
  try{var res=await db.from("game_rooms").select("turn_status,state,last_result,status,move_a").eq("code",onlineRoom).maybeSingle();data=res.data;}catch(e){return;}
  if(!data)return;

  // Opponent quit — kick us back to menu with message
  if(data.status==="abandoned"){
    clearInterval(lobbyPoll);lobbyPoll=null;cleanupOnline();destroyEmojiChat();restoreTurnPanel();
    showScreen("screen-mode");
    // Show prominent overlay message
    showOpponentLeftMessage();
    return;
  }

  const ts=data.turn_status;
  const stateObj=data.state?(()=>{try{return JSON.parse(data.state);}catch(e){return null;}})():null;
  const round=stateObj?stateObj.round:gs.round,shot=stateObj?stateObj.shot:gs.shot;
  const key=round+"-"+shot+"-"+ts;
  if(key===lastHandledKey)return;

  if(onlineRole==="B"){
    if(ts==="b_choosing"){
      const isWaiting=!document.getElementById("onlineWaitingOverlay").classList.contains("hidden");
      if(isWaiting){
        lastHandledKey=key;
        if(stateObj){gs.names=stateObj.names||gs.names;gs.usedWeapons=stateObj.usedWeapons||gs.usedWeapons;gs.potionsA=stateObj.potionsA!=null?stateObj.potionsA:gs.potionsA;gs.potionsB=stateObj.potionsB!=null?stateObj.potionsB:gs.potionsB;}
        activateBTurn();
      }
    }else if(ts==="resolved"){
      const onResult=document.getElementById("screen-result").classList.contains("active");
      if(!onResult&&stateObj&&data.last_result&&resultShownForKey!==key){
        lastHandledKey=key;resultShownForKey=key;
        try{const result=JSON.parse(data.last_result);gs.hpA=stateObj.hpA;gs.hpB=stateObj.hpB;gs.usedWeapons=stateObj.usedWeapons;gs.names=stateObj.names;gs.round=stateObj.round;gs.shot=stateObj.shot;gs.isSuddenDeath=stateObj.isSuddenDeath;gs.totalHpA=stateObj.totalHpA||gs.totalHpA;gs.totalHpB=stateObj.totalHpB||gs.totalHpB;gs.potionsA=stateObj.potionsA!=null?stateObj.potionsA:gs.potionsA;gs.potionsB=stateObj.potionsB!=null?stateObj.potionsB:gs.potionsB;showShotResult(result.cA,result.cB,result.dmgA,result.dmgB);}catch(e){}
      }
    }
    // FIX: Handle new round starting (a_choosing with new round)
    if(ts==="a_choosing"&&stateObj&&stateObj.round>gs.round){
      if(!document.getElementById("onlineWaitingOverlay")?.classList.contains("hidden"))return;
      lastHandledKey=key;gs.round=stateObj.round;gs.shot=1;gs.hpA=stateObj.hpA;gs.hpB=stateObj.hpB;gs.usedWeapons=[];gs.pendingA=null;
      document.getElementById("gsRound").textContent=gs.isSuddenDeath?"⚡ Sudden Death":"Round "+gs.round+" / "+TOTAL_ROUNDS;
      document.getElementById("gsShot").textContent="Shot 1 / "+SHOTS_PER_ROUND;
      updateHPBars();renderAvailableWeapons();showScreen("screen-game");showOnlineWaiting("Waiting for "+gs.names.A+" to choose…");
    }
  }

  if(onlineRole==="A"){
    if(ts==="resolved"){
      const onResultA=document.getElementById("screen-result").classList.contains("active");
      if(!onResultA&&stateObj&&data.last_result&&resultShownForKey!==key){
        lastHandledKey=key;resultShownForKey=key;
        try{const rA=JSON.parse(data.last_result);gs.hpA=stateObj.hpA;gs.hpB=stateObj.hpB;gs.usedWeapons=stateObj.usedWeapons;gs.names=stateObj.names;gs.round=stateObj.round;gs.shot=stateObj.shot;gs.isSuddenDeath=stateObj.isSuddenDeath;gs.totalHpA=stateObj.totalHpA||gs.totalHpA;gs.totalHpB=stateObj.totalHpB||gs.totalHpB;gs.potionsA=stateObj.potionsA!=null?stateObj.potionsA:gs.potionsA;gs.potionsB=stateObj.potionsB!=null?stateObj.potionsB:gs.potionsB;showShotResult(rA.cA,rA.cB,rA.dmgA,rA.dmgB);}catch(e){}
      }
    }
  }
}

function cleanupOnline(){
  if(lobbyPoll){clearInterval(lobbyPoll);lobbyPoll=null;}
  if(onlineSub){onlineSub.unsubscribe();onlineSub=null;}
  onlineRoom=null;onlineRole=null;lastHandledKey="";resultShownForKey="";
}

function showOpponentLeftMessage(){
  const overlay=document.createElement("div");
  overlay.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:20px;";
  overlay.innerHTML=`<div style="font-size:3rem">👋</div>
    <div style="font-family:var(--font-d);font-size:1.8rem;color:#f43f5e;text-shadow:0 0 20px rgba(244,63,94,0.5);">Opponent left.</div>
    <div style="font-size:14px;color:var(--text2);font-style:italic;">You have been returned to the main menu.</div>
    <button class="btn-primary" onclick="this.parentNode.remove()">OK</button>`;
  document.body.appendChild(overlay);
  setTimeout(()=>{if(overlay.parentNode)overlay.remove();},6000);
}
function genCode(){return Math.random().toString(36).substring(2,8).toUpperCase();}

async function createRoom(){
  const code=genCode(),userId=currentUser?currentUser.id:("guest_"+Math.random().toString(36).slice(2,8));
  const errEl=document.getElementById("lobbyError");errEl.textContent="";
  const aName=currentUser?currentUser.username:"Player A";
  const initState=freshGameState({A:aName,B:"Player B"});
  const ins=await db.from("game_rooms").insert({code,player_a:userId,player_a_name:aName,state:JSON.stringify(initState),status:"waiting",turn_status:"a_choosing",move_a:null,move_b:null,last_result:null});
  if(ins.error){const isSM=ins.error.message&&(ins.error.message.includes("last_result")||ins.error.message.includes("turn_status")||ins.error.message.includes("last_emoji"));errEl.innerHTML=isSM?"⚠️ DB schema outdated. Run <strong>migration.sql</strong> in Supabase SQL Editor, then refresh.":"Failed to create room: "+ins.error.message;return;}
  onlineRoom=code;onlineRole="A";
  document.getElementById("roomCodeDisplay").textContent=code;
  document.getElementById("lobbyCreate").classList.add("hidden");document.getElementById("lobbyWaiting").classList.remove("hidden");
  subscribeToRoom(code);
  lobbyPoll=setInterval(async()=>{
    const r=await db.from("game_rooms").select("status,state").eq("code",code).maybeSingle();
    if(!r.data)return;
    if(r.data.status==="active"&&!document.getElementById("screen-game").classList.contains("active")){clearInterval(lobbyPoll);lobbyPoll=null;startOnlineGame(r.data,"A");startGamePoll();}
  },2000);
}

async function joinRoom(){
  const code=document.getElementById("joinCode").value.trim().toUpperCase();
  const errEl=document.getElementById("lobbyError");errEl.textContent="";
  if(!code||code.length!==6){errEl.textContent="Enter a valid 6-character code.";return;}
  const res=await db.from("game_rooms").select("*").eq("code",code).maybeSingle();
  if(res.error||!res.data){errEl.textContent="Room not found.";return;}
  if(res.data.status!=="waiting"){errEl.textContent="Room is already full or in progress.";return;}
  const userId=currentUser?currentUser.id:("guest_"+Math.random().toString(36).slice(2,8));
  const bName=currentUser?currentUser.username:"Player B";
  const roomState=JSON.parse(res.data.state);roomState.names.B=bName;
  const ue=await db.from("game_rooms").update({player_b:userId,player_b_name:bName,status:"active",turn_status:"a_choosing",state:JSON.stringify(roomState)}).eq("code",code);
  if(ue.error){const isSM=ue.error.message&&(ue.error.message.includes("last_result")||ue.error.message.includes("turn_status")||ue.error.message.includes("last_emoji"));errEl.innerHTML=isSM?"⚠️ DB schema outdated. Run <strong>migration.sql</strong> in Supabase SQL Editor, then refresh.":"Failed to join room: "+ue.error.message;return;}
  onlineRoom=code;onlineRole="B";startOnlineGame({state:JSON.stringify(roomState)},"B");subscribeToRoom(code);startGamePoll();
}

function startOnlineGame(row,role){
  gameMode="online";gs=JSON.parse(row.state);gs.phase="A";showScreen("screen-game");initEmojiChat();
  if(role==="A")renderGame();
  else{document.getElementById("gsRound").textContent="Round "+gs.round+" / "+TOTAL_ROUNDS;document.getElementById("gsShot").textContent="Shot "+gs.shot+" / "+SHOTS_PER_ROUND;document.getElementById("hpNameA").textContent=gs.names.A;document.getElementById("hpNameB").textContent=gs.names.B;updateHPBars();renderAvailableWeapons();showOnlineWaiting("Waiting for "+gs.names.A+" to choose…");}
}
function subscribeToRoom(code){
  if(onlineSub)onlineSub.unsubscribe();
  onlineSub=db.channel("room_"+code).on("postgres_changes",{event:"UPDATE",schema:"public",table:"game_rooms",filter:"code=eq."+code},()=>pollTick()).subscribe();
}

function confirmOnlineChoice(){
  if(onlineRole==="A"){if(!usingPotionA&&(!selWeaponA||selShieldA===null)){document.getElementById("gameError").textContent="Pick a weapon and shield first!";return;}submitOnlineMoveA();}
  else{if(!usingPotionB&&(!selWeaponB||selShieldB===null)){document.getElementById("gameError").textContent="Pick a weapon and shield first!";return;}submitOnlineMoveB();}
}

async function submitOnlineMoveA(){
  if(usingPotionA){gs.potionsA=Math.max(0,gs.potionsA-1);localPotions=Math.max(0,localPotions-1);saveTokenData();updateTokenDisplay();}
  const move=JSON.stringify({weapon:selWeaponA,shield:selShieldA,potion:usingPotionA});
  const r=await db.from("game_rooms").update({move_a:move,turn_status:"b_choosing",state:JSON.stringify(gs)}).eq("code",onlineRoom);
  if(r.error){document.getElementById("gameError").textContent="Failed to submit move. Try again.";return;}
  showOnlineWaiting("Locked in. Waiting for "+gs.names.B+"…");
}

async function submitOnlineMoveB(){
  const res=await db.from("game_rooms").select("move_a,state").eq("code",onlineRoom).maybeSingle();
  if(res.error||!res.data||!res.data.move_a){document.getElementById("gameError").textContent="Could not read opponent's move. Try again.";return;}
  const cA=JSON.parse(res.data.move_a);
  const cB=usingPotionB?{weapon:null,shield:selShieldB,potion:true}:{weapon:selWeaponB,shield:selShieldB,potion:false};
  let dmgToA=0,dmgToB=0;
  if(!cA.potion&&!cB.potion){dmgToB=Math.abs(cB.shield-cA.weapon.dmg);dmgToA=Math.abs(cA.shield-cB.weapon.dmg);}
  else if(cA.potion&&!cB.potion){dmgToA=0;dmgToB=Math.round(cB.weapon.dmg/2);}
  else if(!cA.potion&&cB.potion){dmgToB=0;dmgToA=Math.round(cA.weapon.dmg/2);}
  if(!cA.potion)gs.hpA=Math.max(0,gs.hpA-dmgToA);else gs.hpA=Math.min(MAX_HP,gs.hpA+POTION_HEAL);
  if(!cB.potion)gs.hpB=Math.max(0,gs.hpB-dmgToB);else gs.hpB=Math.min(MAX_HP,gs.hpB+POTION_HEAL);
  if(usingPotionB){gs.potionsB=Math.max(0,gs.potionsB-1);localPotions=Math.max(0,localPotions-1);saveTokenData();updateTokenDisplay();}
  if(cA.weapon&&!gs.usedWeapons.includes(cA.weapon.name))gs.usedWeapons.push(cA.weapon.name);
  if(cB.weapon&&!gs.usedWeapons.includes(cB.weapon.name))gs.usedWeapons.push(cB.weapon.name);
  gs.phase="A";gs.pendingA=null;
  const result={cA,cB,dmgA:dmgToA,dmgB:dmgToB};
  const roundShotKey=gs.round+"-"+gs.shot+"-resolved";
  const upd=await db.from("game_rooms").update({move_a:null,move_b:null,turn_status:"resolved",state:JSON.stringify(gs),last_result:JSON.stringify(result)}).eq("code",onlineRoom);
  if(upd.error){document.getElementById("gameError").textContent="Failed to submit move. Try again.";return;}
  resultShownForKey=roundShotKey;lastHandledKey=roundShotKey;showShotResult(result.cA,result.cB,result.dmgA,result.dmgB);
}

function activateBTurn(){
  gs.phase="B";showScreen("screen-game");
  document.getElementById("gsRound").textContent=gs.isSuddenDeath?"⚡ Sudden Death":"Round "+gs.round+" / "+TOTAL_ROUNDS;
  document.getElementById("gsShot").textContent="Shot "+gs.shot+" / "+SHOTS_PER_ROUND;
  document.getElementById("hpNameA").textContent=gs.names.A;document.getElementById("hpNameB").textContent=gs.names.B;
  updateHPBars();renderAvailableWeapons();hideOnlineWaiting();
  restoreTurnPanel();renderPlayerBTurn(false);
}
async function cancelRoom(){
  if(lobbyPoll){clearInterval(lobbyPoll);lobbyPoll=null;}
  if(onlineRoom)await db.from("game_rooms").delete().eq("code",onlineRoom);
  if(onlineSub){onlineSub.unsubscribe();onlineSub=null;}onlineRoom=null;
  document.getElementById("lobbyCreate").classList.remove("hidden");document.getElementById("lobbyWaiting").classList.add("hidden");
}
function copyRoomCode(){
  navigator.clipboard.writeText(onlineRoom||"").catch(()=>{});
  const btn=document.querySelector(".btn-copy");btn.textContent="Copied!";setTimeout(()=>btn.textContent="Copy",1500);
}

// ══════════════════════════════════════════════
// EMOJI CHAT
// ══════════════════════════════════════════════
const EMOJI_CATEGORIES=[
  {label:"⚔️",title:"Combat",emojis:["⚔️","🗡️","🛡️","🏹","🔱","💥","🩸","💀","👑","🔥","⚡","💫","🌀","🌪️","🌊","❄️","🧪","🪄","🧲","🪃","💣","🏴‍☠️","⚜️","🗺️","🎯","🔮","🪬","🧿","☄️","🌋","🔩","⚙️","🔧","🪛","🔨","🪝","⛓️","🧨","🎆"]},
  {label:"😂",title:"Reactions",emojis:["😂","😤","😈","🤣","😭","👀","🫡","💪","🤡","😏","🥶","👋","🙏","😱","🤙","😎","🫠","🤬","🥳","😵","🤯","😇","🥺","🤫","🤐","😜","🤩","😮","🫢","😬","🙄","🥴","😡","🤑","🫵","🤌","✌️","🤘","🫶","🖤","💀","😑","😒","😔","😣","😤","😩","😫","🤮","🤢","😐","🫤","😶","🙃","🥱","😴","🤥","👿","😾","🙀","😿","😸","😹","😻","🐱","🤝","🤜","🤛","👊","✊","🤞","🤙","🫳","🫴","👆","👇","☝️","🫵","🤟","🤙","🦾","🫂"]},
  {label:"🐉",title:"Creatures",emojis:["🐉","🦅","🐍","🐺","🦁","🐻","🦊","🦄","🐲","🦂","🦋","🦎","🐯","🐗","🦉","🦚","🦜","🐝","🦟","🦗","🦈","🐙","🦑","🐊","🦁","🐅","🦬","🦏","🦛","🐘","🦒","🦦","🦫","🦥","🐓","🦃","🦩","🕊️","🦤","🪹","🐸","🦖","🦕","🦠","🐞","🪲","🐛","🦋","🐌","🐜","🪳","🕷️","🦟"]},
  {label:"🌟",title:"Symbols",emojis:["🌟","💎","🏆","🎯","🔮","🎲","🏅","✨","💠","🔱","⚜️","🌙","🌠","🎭","🎪","🎰","🃏","🎴","♟️","🧿","🔔","💣","🧨","🎆","🎇","🌈","⭐","🌤️","🌩️","🌊","🪐","🌌","🌀","💫","🔯","⚡","☀️","🌒","🌓","🌔","🌕","🌖","🌗","🌘","🌙","🌛","🌜","🌝","🌞","🏵️","🎗️","🎖️","🎀","🎁","🎊","🎉","🎈","🎐","🎑","🧧","🪄","🎠","🎡","🎢","🎟️","🎫"]},
  {label:"👻",title:"Spooky",emojis:["👻","💀","🦴","🩸","🕯️","🔮","🌑","🕷️","🕸️","🦇","⚰️","🪦","🩻","👁️","🌚","🧟","🧛","🧙","🧝","🧜","🧚","👹","👺","👿","😈","☠️","🤡","👾","🎃","🏚️","🌫️","🌑","🌒","🌘","🔒","🗝️","🔑","⛓️","🩹","🩺","🧬","☣️"]},
  {label:"🌿",title:"Nature",emojis:["🌿","🌱","🌲","🌳","🌴","🌵","🎋","🎍","🍀","🍁","🍂","🍃","🌾","💐","🌸","🌺","🌻","🌹","🥀","🌷","🍄","🌾","🌊","🏔️","⛰️","🗻","🏕️","🌋","🏜️","🏝️","🌅","🌄","🌠","🌌","🌃","🌉","🌁","🌫️","🌈","⛅","🌤️","🌦️","🌧️","⛈️","🌩️","🌨️","❄️","💨","🌬️","🌀","🌈","🌂","☂️","🌡️","☀️","🌙","⭐","💫","✨"]},
  {label:"💰",title:"Loot",emojis:["💰","🪙","💎","👑","🏆","🎁","🎀","💍","🧣","🎖️","🏅","🥇","🥈","🥉","🎗️","📦","🗃️","🧰","🪤","🎭","🎪","🎲","🃏","🎴","🀄","🧩","🪆","🪅","🎠","🎡","🎢","🛍️","🛒","📊","📈","📉","🧾","💹","💵","💴","💶","💷","🏦","💳","🪙"]},
];
let chatPanelOpen=false,emojiChatSub=null,unreadCount=0,activeCatIndex=0,chatHistory=[];

function initEmojiChat(){
  chatHistory=[];unreadCount=0;chatPanelOpen=false;
  const chatEl=document.getElementById("emojiChat");if(chatEl)chatEl.style.display="flex";
  const win=document.getElementById("ecpWindow");if(win)win.classList.add("hidden");
  const log=document.getElementById("emojiChatLog");if(log)log.innerHTML="";
  const badge=document.getElementById("ecpUnread");if(badge){badge.textContent="0";badge.style.display="none";}
  buildCategoryTabs();buildEmojiGrid(0);
  if(gameMode==="online"&&onlineRoom){
    subscribeEmojiChannel(onlineRoom);
    const s=document.getElementById("ecpStatus");if(s){s.textContent="● Live";s.style.color="var(--green)";}
  }else{const s=document.getElementById("ecpStatus");if(s){s.textContent="● Local";s.style.color="var(--cyan)";}}
}
function destroyEmojiChat(){
  const el=document.getElementById("emojiChat");if(el)el.style.display="none";
  if(emojiChatSub){emojiChatSub.unsubscribe();emojiChatSub=null;}
  chatPanelOpen=false;chatHistory=[];unreadCount=0;
}
function buildCategoryTabs(){
  const cats=document.getElementById("ecpCats");if(!cats)return;cats.innerHTML="";
  EMOJI_CATEGORIES.forEach((cat,i)=>{
    const btn=document.createElement("button");btn.className="ecp-cat-btn"+(i===activeCatIndex?" active":"");
    btn.textContent=cat.label;btn.title=cat.title;btn.onclick=()=>{activeCatIndex=i;buildCategoryTabs();buildEmojiGrid(i);};cats.appendChild(btn);
  });
}
function buildEmojiGrid(catIndex){
  const grid=document.getElementById("emojiPicker");if(!grid)return;grid.innerHTML="";
  const cat=EMOJI_CATEGORIES[catIndex];if(!cat)return;
  cat.emojis.forEach(emoji=>{
    const btn=document.createElement("button");btn.className="ecp-emoji-btn";btn.textContent=emoji;
    btn.onclick=()=>sendChatEmoji(emoji);grid.appendChild(btn);
  });
}
// FIX: toggleChatPanel properly resets unread badge
function toggleChatPanel(){
  chatPanelOpen=!chatPanelOpen;
  const win=document.getElementById("ecpWindow"),toggle=document.getElementById("emojiChatToggle");
  if(win)win.classList.toggle("hidden",!chatPanelOpen);
  if(chatPanelOpen){
    unreadCount=0;
    const badge=document.getElementById("ecpUnread");
    if(badge){badge.style.display="none";badge.textContent="0";}
    if(toggle)toggle.classList.remove("has-new");
    setTimeout(()=>{const log=document.getElementById("emojiChatLog");if(log)log.scrollTop=log.scrollHeight;},50);
  }
}
function sendChatEmoji(emoji){
  let senderName;
  if(gameMode==="online")senderName=onlineRole==="A"?gs.names.A:gs.names.B;
  else senderName=(gs.phase==="B")?gs.names.B:gs.names.A;
  animateSentEmoji(emoji);appendEmojiMsg(senderName,emoji,false);
  if(gameMode==="online"&&onlineRoom){
    db.from("game_rooms").update({last_emoji:JSON.stringify({from:senderName,emoji,ts:Date.now()})}).eq("code",onlineRoom).then(res=>{
      if(res.error&&res.error.message&&res.error.message.includes("last_emoji"))showToast("⚠️ Run migration.sql to enable realtime chat!","red");
    });
  }
}
function animateSentEmoji(emoji){
  const toggle=document.getElementById("emojiChatToggle");if(!toggle)return;
  const rect=toggle.getBoundingClientRect();const burst=document.createElement("div");
  burst.className="ecp-burst";burst.textContent=emoji;
  burst.style.left=rect.left+rect.width/2+"px";burst.style.top=rect.top+"px";
  document.body.appendChild(burst);setTimeout(()=>burst.remove(),700);
}
function appendEmojiMsg(sender,emoji,isOpponent){
  const entry={sender,emoji,isOpponent,ts:Date.now()};chatHistory.push(entry);
  const log=document.getElementById("emojiChatLog");if(!log)return;
  // FIX: check for grouping against the correct last bubble (not just array)
  const prev=chatHistory[chatHistory.length-2];
  const shouldGroup=prev&&prev.sender===sender&&(entry.ts-prev.ts)<8000;
  if(shouldGroup){
    const lastBubble=log.querySelector(".ecm-bubble:last-child .ecm-emojis");
    if(lastBubble){
      const span=document.createElement("span");span.className="ecm-emoji-item";span.textContent=emoji;
      span.style.animation="ecp-emoji-pop .35s cubic-bezier(.17,.67,.3,1.4) both";lastBubble.appendChild(span);
      log.scrollTop=log.scrollHeight;return;
    }
  }
  const bubble=document.createElement("div");bubble.className="ecm-bubble"+(isOpponent?" ecm-opponent":" ecm-self");
  const senderEl=document.createElement("div");senderEl.className="ecm-sender";senderEl.textContent=sender;
  const emojisRow=document.createElement("div");emojisRow.className="ecm-emojis";
  const emojiSpan=document.createElement("span");emojiSpan.className="ecm-emoji-item";emojiSpan.textContent=emoji;
  emojisRow.appendChild(emojiSpan);
  const timeEl=document.createElement("div");timeEl.className="ecm-time";
  const d=new Date();timeEl.textContent=d.getHours().toString().padStart(2,"0")+":"+d.getMinutes().toString().padStart(2,"0");
  bubble.appendChild(senderEl);bubble.appendChild(emojisRow);bubble.appendChild(timeEl);log.appendChild(bubble);
  log.scrollTop=log.scrollHeight;
  if(!chatPanelOpen&&isOpponent){
    unreadCount++;const badge=document.getElementById("ecpUnread"),toggle=document.getElementById("emojiChatToggle");
    if(badge){badge.textContent=unreadCount>9?"9+":String(unreadCount);badge.style.display="flex";}
    if(toggle)toggle.classList.add("has-new");
    showFloatingPreview(sender,emoji);
  }
}
let floatPreviewTimer=null;
function showFloatingPreview(sender,emoji){
  let preview=document.getElementById("ecpFloatPreview");
  if(!preview){preview=document.createElement("div");preview.id="ecpFloatPreview";preview.className="ecp-float-preview";preview.onclick=()=>{toggleChatPanel();preview.remove();};document.body.appendChild(preview);}
  preview.innerHTML=`<span class="efp-sender">${sender}</span><span class="efp-emoji">${emoji}</span>`;
  preview.classList.remove("efp-hide");
  if(floatPreviewTimer)clearTimeout(floatPreviewTimer);
  floatPreviewTimer=setTimeout(()=>{preview.classList.add("efp-hide");setTimeout(()=>{if(preview.parentNode)preview.remove();},400);},3500);
}
let typingTimer=null;
function showTypingIndicator(name){
  const el=document.getElementById("ecpTyping"),nameEl=document.getElementById("ecpTypingName");
  if(!el)return;if(nameEl)nameEl.textContent=name;el.style.display="flex";
  if(typingTimer)clearTimeout(typingTimer);typingTimer=setTimeout(()=>{el.style.display="none";},2500);
}
function subscribeEmojiChannel(code){
  if(emojiChatSub){emojiChatSub.unsubscribe();emojiChatSub=null;}
  let lastEmojiTs=0;
  emojiChatSub=db.channel("emoji_"+code).on("postgres_changes",{event:"UPDATE",schema:"public",table:"game_rooms",filter:"code=eq."+code},payload=>{
    try{
      const raw=payload.new&&payload.new.last_emoji;if(!raw)return;
      const data=JSON.parse(raw);if(!data||!data.ts||data.ts<=lastEmojiTs)return;
      const myName=onlineRole==="A"?gs.names.A:gs.names.B;if(data.from===myName)return;
      lastEmojiTs=data.ts;showTypingIndicator(data.from);
      setTimeout(()=>{const el=document.getElementById("ecpTyping");if(el)el.style.display="none";appendEmojiMsg(data.from,data.emoji,true);},420);
    }catch(e){}
  }).subscribe();
}
function toggleEmojiPicker(){toggleChatPanel();}

// ══════════════════════════════════════════════
// WEAPON FUSION MACHINE
// ══════════════════════════════════════════════
let fusionWeapon1=null,fusionWeapon2=null;

function showFusionMachine(){renderFusionUI();document.getElementById("modal-fusion").classList.remove("hidden");}
function hideFusionMachine(){document.getElementById("modal-fusion").classList.add("hidden");}
function closeFusionIfOutside(e){if(e.target===document.getElementById("modal-fusion"))hideFusionMachine();}

function renderFusionUI(){
  const body=document.getElementById("fusionBody");if(!body)return;
  const hasFX=(playerMaterials["fusion_element_x"]||0)>0;
  const hasFY=(playerMaterials["fusion_element_y"]||0)>0;
  const canFuse=fusionWeapon1&&fusionWeapon2&&fusionWeapon1!==fusionWeapon2&&hasFX&&hasFY&&currentUser;

  let html=`<div class="fusion-intro">
    <p>Select two weapons from your arsenal, then consume <strong>🔷 Fusion Element X</strong> and <strong>🔶 Fusion Element Y</strong> to fuse them into a new super-weapon!</p>
    <div class="fusion-mats-check">
      <span class="${hasFX?"fusion-mat-ok":"fusion-mat-missing"}">🔷 Fusion Element X: ${playerMaterials["fusion_element_x"]||0}</span>
      <span class="${hasFY?"fusion-mat-ok":"fusion-mat-missing"}">🔶 Fusion Element Y: ${playerMaterials["fusion_element_y"]||0}</span>
    </div>
  </div>
  <div class="fusion-slots">
    <div class="fusion-slot" id="fusionSlot1">
      <div class="fusion-slot-label">Weapon 1</div>
      ${fusionWeapon1?`<div class="fusion-slot-weapon">${(ALL_WEAPONS.find(w=>w.name===fusionWeapon1)?.emoji||"⚔")} ${fusionWeapon1}</div><button class="btn-ghost-sm" onclick="setFusionSlot(1,null)">✕</button>`:`<div class="fusion-slot-empty">— Select —</div>`}
    </div>
    <div class="fusion-cross">⚗️</div>
    <div class="fusion-slot" id="fusionSlot2">
      <div class="fusion-slot-label">Weapon 2</div>
      ${fusionWeapon2?`<div class="fusion-slot-weapon">${(ALL_WEAPONS.find(w=>w.name===fusionWeapon2)?.emoji||"⚔")} ${fusionWeapon2}</div><button class="btn-ghost-sm" onclick="setFusionSlot(2,null)">✕</button>`:`<div class="fusion-slot-empty">— Select —</div>`}
    </div>
  </div>
  <div class="fusion-weapon-list">
    <div class="fusion-wl-title">Your Weapons</div>
    <div class="fusion-wl-grid">`;
  ownedWeapons.forEach(n=>{
    const w=ALL_WEAPONS.find(x=>x.name===n);if(!w)return;
    const ti=TIER_INFO[w.tier];
    const sel=(fusionWeapon1===n||fusionWeapon2===n);
    html+=`<div class="fusion-wl-card ${sel?"fusion-wl-selected":""}" onclick="pickFusionWeapon('${n.replace(/'/g,"\\'")}')">
      <span style="font-size:1.3rem">${w.emoji}</span>
      <span class="fusion-wl-name">${n}</span>
      <span class="fusion-wl-tier" style="color:${ti.color}">T${w.tier}</span>
    </div>`;
  });
  html+=`</div></div>
  ${canFuse?`<div class="fusion-preview"><div class="fusion-preview-title">Fusion Result Preview</div><div class="fusion-preview-name">${getFusedWeaponName(fusionWeapon1,fusionWeapon2)}</div><div class="fusion-preview-sub">Combines traits, takes higher tier + bonus damage.</div></div>`:""}
  <button class="btn-primary" onclick="performFusion()" ${canFuse?"":"disabled"} style="width:100%;margin-top:8px">⚗️ Fuse Weapons!</button>
  <p style="font-size:11px;color:var(--text3);text-align:center;margin-top:8px">Both source weapons will be consumed. Get them from your arsenal first!</p>`;
  body.innerHTML=html;
}

function getFusedWeaponName(w1,w2){
  const parts1=w1.split(" "),parts2=w2.split(" ");
  return parts1[0]+" "+parts2[parts2.length-1]+" [Fused]";
}

function setFusionSlot(slot,name){
  if(slot===1)fusionWeapon1=name;else fusionWeapon2=name;
  renderFusionUI();
}

function pickFusionWeapon(name){
  if(fusionWeapon1===name){fusionWeapon1=null;}
  else if(fusionWeapon2===name){fusionWeapon2=null;}
  else if(!fusionWeapon1){fusionWeapon1=name;}
  else if(!fusionWeapon2){fusionWeapon2=name;}
  else{showToast("Clear a slot first!","red");}
  renderFusionUI();
}

async function performFusion(){
  if(!currentUser){showToast("Sign in to fuse!","red");return;}
  if(!fusionWeapon1||!fusionWeapon2||fusionWeapon1===fusionWeapon2){showToast("Select two different weapons!","red");return;}
  if((playerMaterials["fusion_element_x"]||0)<1){showToast("Need 🔷 Fusion Element X!","red");return;}
  if((playerMaterials["fusion_element_y"]||0)<1){showToast("Need 🔶 Fusion Element Y!","red");return;}
  if(!ownedWeapons.includes(fusionWeapon1)||!ownedWeapons.includes(fusionWeapon2)){showToast("You don't own both weapons!","red");return;}

  const w1=ALL_WEAPONS.find(w=>w.name===fusionWeapon1);
  const w2=ALL_WEAPONS.find(w=>w.name===fusionWeapon2);
  if(!w1||!w2){showToast("Invalid weapons!","red");return;}

  // Build fused weapon
  const fusedTier=Math.min(6,Math.max(w1.tier,w2.tier)+1);
  const fusedDmg=Math.min(16,Math.max(w1.dmg,w2.dmg)+2);
  const fusedName=getFusedWeaponName(fusionWeapon1,fusionWeapon2);
  const fusedEmoji="⚗️";
  const fusedWeapon={name:fusedName,emoji:fusedEmoji,dmg:fusedDmg,tier:fusedTier,cost:0,fused:true};

  // Consume materials
  playerMaterials["fusion_element_x"]=Math.max(0,(playerMaterials["fusion_element_x"]||0)-1);
  playerMaterials["fusion_element_y"]=Math.max(0,(playerMaterials["fusion_element_y"]||0)-1);

  // Remove source weapons from owned (keep in ALL_WEAPONS reference)
  ownedWeapons=ownedWeapons.filter(n=>n!==fusionWeapon1&&n!==fusionWeapon2);
  myLoadout=myLoadout.filter(n=>n!==fusionWeapon1&&n!==fusionWeapon2);

  // Add fused weapon (inject into ALL_WEAPONS array for this session and save to owned)
  if(!ALL_WEAPONS.find(w=>w.name===fusedName)){ALL_WEAPONS.push(fusedWeapon);}
  ownedWeapons.push(fusedName);
  myLoadout.push(fusedName);

  // Inherit traits
  const trait1=weaponTraits[fusionWeapon1];
  const trait2=weaponTraits[fusionWeapon2];
  if(trait1||trait2){weaponTraits[fusedName]=trait1||trait2;}
  delete weaponTraits[fusionWeapon1];delete weaponTraits[fusionWeapon2];

  fusionWeapon1=null;fusionWeapon2=null;
  playerStats.fusionsPerformed=(playerStats.fusionsPerformed||0)+1;
  await saveTokenData();
  showToast(`⚗️ ${fusedName} forged! T${fusedTier} · ${fusedDmg} dmg`,"gold");
  renderFusionUI();
}


// ══════════════════════════════════════════════
// SELL WEAPONS
// ══════════════════════════════════════════════
let _sellPendingWeapon = null;

function promptSellWeapon(weaponName){
  if(!currentUser){showToast("Sign in to sell weapons!","red");return;}
  const w = ALL_WEAPONS.find(x=>x.name===weaponName);
  if(!w){showToast("Weapon not found!","red");return;}
  if(STARTER_WEAPON_NAMES.includes(weaponName)){showToast("Can't sell starter weapons!","red");return;}
  const sellPrice = Math.floor(w.cost * 0.4) || 20;

  // Build confirm overlay
  let overlay = document.getElementById('sellConfirmOverlay');
  if(overlay) overlay.remove();
  overlay = document.createElement('div');
  overlay.id = 'sellConfirmOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;';
  overlay.innerHTML = `<div style="background:var(--surface2);border:1px solid var(--border2);border-radius:12px;padding:28px 32px;max-width:340px;width:90%;text-align:center;">
    <div style="font-size:2.5rem;margin-bottom:8px">${w.emoji}</div>
    <div style="font-family:var(--font-d);font-size:1.1rem;color:var(--text);margin-bottom:4px">${w.name}</div>
    <div style="color:#facc15;font-size:0.9rem;margin-bottom:16px">Sell for <strong>${sellPrice} 🪙</strong>?</div>
    <div style="color:var(--text3);font-size:0.75rem;margin-bottom:20px">This is ${Math.round(w.cost*0.4) || 20}% of purchase price. Cannot be undone.</div>
    <div style="display:flex;gap:12px;justify-content:center;">
      <button class="btn-primary" onclick="confirmSellWeapon('${weaponName.replace(/'/g,"\'")}',${sellPrice})">✓ Sell</button>
      <button class="btn-ghost" onclick="document.getElementById('sellConfirmOverlay').remove()">Cancel</button>
    </div>
  </div>`;
  document.body.appendChild(overlay);
}

async function confirmSellWeapon(weaponName, sellPrice){
  const overlay = document.getElementById('sellConfirmOverlay');
  if(overlay) overlay.remove();
  if(!currentUser){showToast("Sign in to sell!","red");return;}
  if(!ownedWeapons.includes(weaponName)){showToast("You don't own that weapon!","red");return;}
  if(STARTER_WEAPON_NAMES.includes(weaponName)){showToast("Can't sell starter weapons!","red");return;}

  // Remove from owned and loadout
  ownedWeapons = ownedWeapons.filter(n=>n!==weaponName);
  myLoadout = myLoadout.filter(n=>n!==weaponName);
  if(myLoadout.length===0) myLoadout = [...STARTER_WEAPON_NAMES.slice(0,1)];

  localTokens += sellPrice;
  playerStats.materialsSold = (playerStats.materialsSold||0) + 1;
  updateTokenDisplay();
  await saveTokenData();
  showToast(`${ALL_WEAPONS.find(w=>w.name===weaponName)?.emoji||"⚔"} Sold ${weaponName} for ${sellPrice} 🪙!`,"gold");
  // Re-render whichever UI is open
  if(!document.getElementById('modal-shop').classList.contains('hidden')) renderShopUI();
  if(!document.getElementById('modal-inventory').classList.contains('hidden')) renderInventoryUI();
}

async function sellMaterial(matId){
  if(!currentUser){showToast("Sign in to sell materials!","red");return;}
  const mat=CRAFTING_MATERIALS.find(m=>m.id===matId);if(!mat||!mat.shopCost)return;
  if((playerMaterials[matId]||0)<=0){showToast("No "+mat.name+" to sell!","red");return;}
  playerMaterials[matId]=(playerMaterials[matId]||0)-1;
  localTokens+=mat.shopCost;
  playerStats.materialsSold=(playerStats.materialsSold||0)+1;
  updateTokenDisplay();await saveTokenData();
  showToast(`${mat.emoji} Sold ${mat.name} for ${mat.shopCost} 🪙!`,"gold");
}


// Material shop functions (buying special mats)
async function buySpecialMaterial(matId){
  if(!currentUser){showToast("Sign in first!","red");return;}
  const mat=CRAFTING_MATERIALS.find(m=>m.id===matId);if(!mat||!mat.shopCost)return;
  if(mat.shopCostType==="tokens"){
    if(localTokens<mat.shopCost){showToast(`Need ${mat.shopCost} 🪙!`,"red");return;}
    if(Math.random()>mat.shopChance){showToast(`${mat.emoji} No luck this time! Try again.`,"red");localTokens-=Math.floor(mat.shopCost*0.1);updateTokenDisplay();await saveTokenData();return;}
    localTokens-=mat.shopCost;playerMaterials[matId]=(playerMaterials[matId]||0)+1;
    updateTokenDisplay();await saveTokenData();showToast(`${mat.emoji} ${mat.name} obtained!`,"gold");
  }else{
    // $-cost (simulated as large token cost)
    if(localTokens<mat.shopCost){showToast(`Need ${mat.shopCost} 🪙!`,"red");return;}
    if(Math.random()>mat.shopChance){showToast(`${mat.emoji} ${mat.name}: Not this time…`,"red");localTokens-=Math.floor(mat.shopCost*0.02);updateTokenDisplay();await saveTokenData();return;}
    localTokens-=mat.shopCost;playerMaterials[matId]=(playerMaterials[matId]||0)+1;
    updateTokenDisplay();await saveTokenData();showToast(`${mat.emoji} ${mat.name} obtained!`,"gold");
  }
}



// ══════════════════════════════════════════════
// CHEST SYSTEM — 7 Tiers
// ══════════════════════════════════════════════
const CHEST_TIERS = [
  {
    id:"common_chest", name:"Common Chest", emoji:"📦", tier:1, cost:200,
    color:"#94a3b8", desc:"Basic chest with common drops.",
    rewards:{coins:[20,80], mats:["Common","Common"], weaponChance:0.05, traitChance:0}
  },
  {
    id:"iron_chest", name:"Iron Chest", emoji:"🔒", tier:2, cost:500,
    color:"#a0aec0", desc:"Sturdy iron chest. Better material odds.",
    rewards:{coins:[50,150], mats:["Common","Uncommon"], weaponChance:0.08, traitChance:0.02}
  },
  {
    id:"shadow_chest", name:"Shadow Chest", emoji:"🌑", tier:3, cost:1000,
    color:"#a855f7", desc:"Forged in darkness. Rare material chance.",
    rewards:{coins:[100,300], mats:["Uncommon","Rare"], weaponChance:0.12, traitChance:0.05}
  },
  {
    id:"void_chest", name:"Void Chest", emoji:"🌀", tier:4, cost:2000,
    color:"#22d3ee", desc:"Contains fragments of the void.",
    rewards:{coins:[200,600], mats:["Rare","Epic"], weaponChance:0.18, traitChance:0.10}
  },
  {
    id:"dragon_chest", name:"Dragon Chest", emoji:"🐉", tier:5, cost:4000,
    color:"#ff6b35", desc:"Scales of ancient dragons seal this chest.",
    rewards:{coins:[400,1200], mats:["Epic","Legendary"], weaponChance:0.25, traitChance:0.20}
  },
  {
    id:"celestial_chest", name:"Celestial Chest", emoji:"✨", tier:6, cost:8000,
    color:"#facc15", desc:"Blessed by the stars themselves.",
    rewards:{coins:[800,2500], mats:["Legendary","Epic"], weaponChance:0.35, traitChance:0.35}
  },
  {
    id:"supreme_chest", name:"Supreme Chest", emoji:"💠", tier:7, cost:15000,
    color:"#ffffff", desc:"Only the mightiest can afford this. Mythic guaranteed.",
    rewards:{coins:[2000,6000], mats:["Mythic","Legendary"], weaponChance:0.50, traitChance:0.60}
  },
];

function showChestShop(){renderChestUI();document.getElementById("modal-chests").classList.remove("hidden");}
function hideChestShop(){document.getElementById("modal-chests").classList.add("hidden");}
function closeChestIfOutside(e){if(e.target===document.getElementById("modal-chests"))hideChestShop();}

function renderChestUI(){
  const body=document.getElementById("chestsBody");if(!body)return;
  let html=`<div class="chest-intro">
    <p>Open chests to earn coins, materials, weapons and traits! Higher tier = better rewards.</p>
    <div class="shop-balance"><div class="shop-bal-item"><span class="shop-bal-label">Balance</span><span class="shop-bal-value">${localTokens}</span> 🪙</div></div>
  </div><div class="chest-grid">`;

  for(const chest of CHEST_TIERS){
    const canAfford = currentUser && localTokens >= chest.cost;
    html+=`<div class="chest-card" style="border-color:${chest.color}44;--chest-color:${chest.color}">
      <div class="chest-emoji" style="text-shadow:0 0 20px ${chest.color}">${chest.emoji}</div>
      <div class="chest-name" style="color:${chest.color}">${chest.name}</div>
      <div class="chest-tier-badge" style="background:${chest.color}22;border:1px solid ${chest.color}44;color:${chest.color}">Tier ${chest.tier}</div>
      <div class="chest-desc">${chest.desc}</div>
      <div class="chest-rewards">
        <div class="cr-item">🪙 ${chest.rewards.coins[0]}–${chest.rewards.coins[1]}</div>
        <div class="cr-item">📦 ${chest.rewards.mats[0]} + ${chest.rewards.mats[1]}</div>
        ${chest.rewards.weaponChance>0?`<div class="cr-item">⚔️ ${Math.round(chest.rewards.weaponChance*100)}% weapon</div>`:""}
        ${chest.rewards.traitChance>0?`<div class="cr-item">✨ ${Math.round(chest.rewards.traitChance*100)}% trait</div>`:""}
      </div>
      <button class="btn-primary" style="width:100%;margin-top:8px" onclick="openChest('${chest.id}')" ${canAfford?"":"disabled"}>${chest.cost} 🪙</button>
    </div>`;
  }
  html+=`</div>`;
  body.innerHTML=html;
}

async function openChest(chestId){
  if(!currentUser){showToast("Sign in to open chests!","red");return;}
  const chest=CHEST_TIERS.find(c=>c.id===chestId);if(!chest)return;
  if(localTokens<chest.cost){showToast(`Need ${chest.cost} 🪙!`,"red");return;}

  localTokens-=chest.cost;
  updateTokenDisplay();

  const results=[];

  // Coins
  const coins=chest.rewards.coins[0]+Math.floor(Math.random()*(chest.rewards.coins[1]-chest.rewards.coins[0]));
  localTokens+=coins;results.push(`🪙 +${coins} coins`);

  // Materials (2 drops)
  for(const rarityTarget of chest.rewards.mats){
    const pool=CRAFTING_MATERIALS.filter(m=>m.rarity===rarityTarget);
    if(pool.length){
      const mat=pool[Math.floor(Math.random()*pool.length)];
      addMaterial(mat.id,1);
      results.push(`${mat.emoji} ${mat.name}`);
    }
  }

  // Bonus weapon chance
  if(Math.random()<chest.rewards.weaponChance){
    const tierTarget=Math.min(7,chest.tier+Math.floor(Math.random()*2));
    const candidates=ALL_WEAPONS.filter(w=>w.tier===tierTarget&&!ownedWeapons.includes(w.name));
    if(candidates.length){
      const w=candidates[Math.floor(Math.random()*candidates.length)];
      ownedWeapons.push(w.name);
      results.push(`⚔️ ${w.emoji} ${w.name}!`);
    }
  }

  // Trait scroll chance
  if(Math.random()<chest.rewards.traitChance){
    const trait=rollTrait();
    const owned=ownedWeapons.filter(n=>!weaponTraits[n]);
    if(owned.length){
      const wName=owned[Math.floor(Math.random()*owned.length)];
      weaponTraits[wName]=trait;
      results.push(`${trait.emoji} ${trait.name} trait!`);
    }
  }

  playerStats.totalTokensEarned=(playerStats.totalTokensEarned||0)+coins;
  updateTokenDisplay();
  await saveTokenData();

  // Show result overlay
  const overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;';
  overlay.innerHTML=`<div style="font-size:4rem;animation:chestPop 0.5s ease-out">${chest.emoji}</div>
    <div style="font-family:var(--font-d);font-size:1.4rem;color:${chest.color}">Chest Opened!</div>
    <div style="display:flex;flex-direction:column;gap:8px;align-items:center">${results.map(r=>`<div style="font-size:1rem;color:var(--text);background:var(--surface2);padding:8px 20px;border-radius:8px;border:1px solid var(--border2)">${r}</div>`).join('')}</div>
    <button class="btn-primary" onclick="this.parentNode.remove();renderChestUI()">✓ Claim</button>`;
  document.head.insertAdjacentHTML('beforeend','<style>@keyframes chestPop{0%{transform:scale(0) rotate(-20deg);opacity:0}70%{transform:scale(1.2) rotate(5deg)}100%{transform:scale(1) rotate(0);opacity:1}}</style>');
  document.body.appendChild(overlay);
}

// ══════════════════════════════════════════════
// SETS SYSTEM (like Blox Fruits sets)
// ══════════════════════════════════════════════
const WEAPON_SETS = [
  {
    id:"moon_slayer", name:"Moon Slayer Set", emoji:"🌙",
    color:"#a855f7",
    desc:"The ancient lunar arsenal. Favored by assassins under the crescent moon.",
    weapons:["Lunar Scimitar","Nodachi","Eclipse Blade","Abyssal Katana"],
    bonus2:"🌙 Lunar Edge: +2 dmg on every shot when HP < 20",
    bonus4:"🌑 Eclipse Form: 30% dodge chance + all shots deal +3 bonus dmg",
    lore:"Forged under 1000 moons by the Eclipse Clan's ancestors.",
  },
  {
    id:"storm_sovereign", name:"Storm Sovereign Set", emoji:"⚡",
    color:"#facc15",
    desc:"Channel the fury of storms with every strike.",
    weapons:["Storm Halberd","Odachi","Daikyu","Kusarigama"],
    bonus2:"⚡ Static Field: +2 dmg on odd shots",
    bonus4:"🌩️ Thundergod's Wrath: 25% chance every shot to deal +5 bonus lightning dmg",
    lore:"Worn by the legendary Thunder Generals who once shook the heavens.",
  },
  {
    id:"void_emperor", name:"Void Emperor Set", emoji:"🌀",
    color:"#22d3ee",
    desc:"Weapons from beyond the veil of reality.",
    weapons:["Void Reaper","Void Emperor Blade","Singularity Edge","Atom Scythe"],
    bonus2:"🌀 Void Touch: 15% chance to ignore enemy shield",
    bonus4:"💫 Singularity: First shot each round guaranteed perfect block + 3x dmg",
    lore:"Created by the first Fluxion, these weapons warp space itself.",
  },
  {
    id:"dragon_sovereign", name:"Dragon Sovereign Set", emoji:"🐉",
    color:"#ff6b35",
    desc:"Carry the power of ancient dragons into battle.",
    weapons:["Draconic Lance","Phoenix Blade","Masakari","Bisento"],
    bonus2:"🐉 Dragon's Blood: +3 HP at start of each round",
    bonus4:"🔥 Dragonfire: Every 2nd shot burns enemy for -2 HP next turn + lifesteal 2 HP",
    lore:"Tempered in dragon fire and cooled in their blood.",
  },
  {
    id:"celestial_archer", name:"Celestial Archer Set", emoji:"🏹",
    color:"#4ade80",
    desc:"Precision instruments for the divine marksman.",
    weapons:["Celestial Bow","Yumi","Daikyu","Kestros"],
    bonus2:"🏹 Eagle Eye: Always see opponent's shield range",
    bonus4:"☄️ Heaven's Arrow: Ranged weapons deal +4 dmg + 20% chance to pierce all shields",
    lore:"Gifted to the greatest archers by the Heavenly Race.",
  },
  {
    id:"shadow_phantom", name:"Shadow Phantom Set", emoji:"👻",
    color:"#7c3aed",
    desc:"Strike from the shadows before your foe can react.",
    weapons:["Shikomizue","Metsubushi","Kyoketsu-shoge","Ninja"],
    bonus2:"👻 Phase: 20% chance to dodge any attack",
    bonus4:"🌑 Phantom Strike: First 2 shots each round cannot be blocked",
    lore:"The Shadow Clan's deadliest operatives carried these weapons.",
  },
];

function getActiveSetBonuses(){
  const bonuses=[];
  for(const set of WEAPON_SETS){
    const owned=set.weapons.filter(n=>myLoadout.includes(n));
    if(owned.length>=2)bonuses.push({set,count:owned.length,bonus:owned.length>=4?set.bonus4:set.bonus2});
  }
  return bonuses;
}

function showSetsPanel(){renderSetsUI();document.getElementById("modal-sets").classList.remove("hidden");}
function hideSetsPanel(){document.getElementById("modal-sets").classList.add("hidden");}
function closeSetsIfOutside(e){if(e.target===document.getElementById("modal-sets"))hideSetsPanel();}

function renderSetsUI(){
  const body=document.getElementById("setsBody");if(!body)return;
  const active=getActiveSetBonuses();

  let html=`<div class="sets-intro">
    <p>Equip <strong>2 or more</strong> weapons from a set to unlock bonuses. Equip all <strong>4</strong> for the full power!</p>
    ${active.length?`<div class="sets-active-banner">⚡ ${active.length} Active Set Bonus${active.length>1?"es":""}</div>`:""}
  </div>`;

  for(const set of WEAPON_SETS){
    const ownedInSet=set.weapons.filter(n=>ownedWeapons.includes(n));
    const equippedInSet=set.weapons.filter(n=>myLoadout.includes(n));
    const isActive=equippedInSet.length>=2;
    const isFull=equippedInSet.length>=4;

    html+=`<div class="set-card ${isActive?"set-active":""} ${isFull?"set-full":""}">
      <div class="set-header" style="color:${set.color}">
        <span class="set-emoji">${set.emoji}</span>
        <span class="set-name">${set.name}</span>
        <span class="set-progress" style="background:${set.color}22;border:1px solid ${set.color}44;color:${set.color}">${equippedInSet.length}/4 equipped</span>
      </div>
      <div class="set-desc">${set.desc}</div>
      <div class="set-lore">${set.lore}</div>
      <div class="set-bonuses">
        <div class="set-bonus ${equippedInSet.length>=2?"sb-active":"sb-locked"}">
          <span class="sb-req" style="color:${set.color}">2 pieces:</span> ${set.bonus2}
        </div>
        <div class="set-bonus ${equippedInSet.length>=4?"sb-active":"sb-locked"}">
          <span class="sb-req" style="color:${set.color}">4 pieces:</span> ${set.bonus4}
        </div>
      </div>
      <div class="set-weapons-list">`;
    for(const wName of set.weapons){
      const w=ALL_WEAPONS.find(x=>x.name===wName);
      const isOwned=ownedWeapons.includes(wName);
      const isEquipped=myLoadout.includes(wName);
      html+=`<div class="set-weapon-row ${isEquipped?"swt-equipped":isOwned?"swt-owned":"swt-missing"}">
        <span>${w?.emoji||"⚔"} ${wName}</span>
        <span class="swt-status">${isEquipped?"✓ Equipped":isOwned?"Owned":"🔒 Not owned"}</span>
        ${isOwned&&!isEquipped&&myLoadout.length<LOADOUT_SIZE?`<button class="btn-ghost-sm" onclick="arsenalToggle('${wName.replace(/'/g,"\'")}');renderSetsUI()">Equip</button>`:""}
      </div>`;
    }
    html+=`</div></div>`;
  }
  body.innerHTML=html;
}


// ══════════════════════════════════════════════
// MATERIALS SEARCHBAR
// ══════════════════════════════════════════════
function filterMatsDisplay(){
  const area = document.getElementById('matDisplayArea');
  const countEl = document.getElementById('matSearchCount');
  if(!area) return;
  const q = (document.getElementById('matSearchInput')?.value||'').toLowerCase().trim();
  const rarityOrder = ["Mythic","Legendary","Epic","Rare","Uncommon","Common"];
  let totalShown = 0;
  let html = '';
  for(const rarity of rarityOrder){
    let mats = CRAFTING_MATERIALS.filter(m=>m.rarity===rarity);
    if(q) mats = mats.filter(m=>m.name.toLowerCase().includes(q)||m.rarity.toLowerCase().includes(q)||m.id.includes(q));
    if(!mats.length) continue;
    totalShown += mats.length;
    const c = RARITY_COLORS[rarity]||"#94a3b8";
    html += `<div class="cmat-rarity-group"><div class="cmat-rarity-label" style="color:${c};border-color:${c}44">${rarity} (${mats.length})</div><div class="cmat-rarity-grid">`;
    for(const mat of mats){
      const have = playerMaterials[mat.id]||0;
      html += `<div class="cmat-card ${have>0?"cmat-has":"cmat-empty"}">
        <div class="cmat-emoji">${mat.emoji}</div>
        <div class="cmat-name" style="color:${c}">${mat.name}</div>
        <div class="cmat-count ${have>0?"cmat-count-has":""}">×${have}</div>
        ${mat.shopCost?`<div class="cmat-sell-btn-wrap"><button class="cmat-sell-btn" onclick="sellMaterial('${mat.id}');filterMatsDisplay();" ${have>0&&currentUser?"":"disabled"}>Sell ${mat.shopCost}🪙</button></div>`:""}
      </div>`;
    }
    html += `</div></div>`;
  }
  if(!totalShown) html = `<div style="color:var(--text3);text-align:center;padding:24px;grid-column:1/-1">No materials found for "${q}"</div>`;
  area.innerHTML = html;
  if(countEl) countEl.textContent = q ? `${totalShown} results` : `${CRAFTING_MATERIALS.length} materials`;
}

// ══════════════════════════════════════════════
// AUTH PARTICLES
// ══════════════════════════════════════════════
function spawnAuthParticles(){
  // Floating emoji particles disabled (change 1)
  // const container=document.getElementById("authParticles");if(!container)return;
  // ...
}

// ══════════════════════════════════════════════
// DB MIGRATION HELPER — see migration.sql in project root
// ══════════════════════════════════════════════


// ══════════════════════════════════════════════
// GLOBAL LEADERBOARD
// ══════════════════════════════════════════════
function showLeaderboard(){renderLeaderboardUI();document.getElementById("modal-leaderboard").classList.remove("hidden");}
function hideLeaderboard(){document.getElementById("modal-leaderboard").classList.add("hidden");}
function closeLeaderboardIfOutside(e){if(e.target===document.getElementById("modal-leaderboard"))hideLeaderboard();}

let lbTab="wins";
function setLbTab(t){lbTab=t;renderLeaderboardUI();}

async function renderLeaderboardUI(){
  const body=document.getElementById("leaderboardBody");if(!body)return;
  body.innerHTML=`<div class="lb-tabs">
    <button class="lb-tab${lbTab==="wins"?" active":""}" onclick="setLbTab('wins')">⚔️ Wins</button>
    <button class="lb-tab${lbTab==="ranked"?" active":""}" onclick="setLbTab('ranked')">🏅 Ranked</button>
    <button class="lb-tab${lbTab==="level"?" active":""}" onclick="setLbTab('level')">⭐ Level</button>
    <button class="lb-tab${lbTab==="tokens"?" active":""}" onclick="setLbTab('tokens')">🪙 Coins</button>
  </div><div class="lb-loading">Loading…</div>`;

  try{
    // Fetch all players with needed fields, sort client-side (stats is JSON so can't DB-sort)
    const {data,error}=await db.from("players").select("username,stats,xp,tokens").limit(200);
    if(error){body.innerHTML=`<div class="lb-tabs">
      <button class="lb-tab${lbTab==="wins"?" active":""}" onclick="setLbTab('wins')">⚔️ Wins</button>
      <button class="lb-tab${lbTab==="ranked"?" active":""}" onclick="setLbTab('ranked')">🏅 Ranked</button>
      <button class="lb-tab${lbTab==="level"?" active":""}" onclick="setLbTab('level')">⭐ Level</button>
      <button class="lb-tab${lbTab==="tokens"?" active":""}" onclick="setLbTab('tokens')">🪙 Coins</button>
    </div><p class='lb-err'>Could not load: ${error.message}<br><small>Make sure RLS policy allows SELECT on players table.</small></p>`;return;}
    if(!data||data.length===0){body.innerHTML+="<p class='lb-err'>No players found.</p>";return;}

    let rows=data.map(p=>{
      let stats={};try{stats=p.stats?JSON.parse(p.stats):{};}catch(e){}
      const lvl=getCurrentLevelNum(p.xp||0);
      return{
        username:p.username,
        wins:stats.wins||0,
        rankedRating:stats.rankedRating||1000,
        level:lvl,
        tokens:p.tokens||0,
        xp:p.xp||0,
      };
    });

    if(lbTab==="wins")        rows.sort((a,b)=>b.wins-a.wins);
    else if(lbTab==="ranked") rows.sort((a,b)=>b.rankedRating-a.rankedRating);
    else if(lbTab==="level")  rows.sort((a,b)=>b.xp-a.xp);
    else                      rows.sort((a,b)=>b.tokens-a.tokens);

    let html=`<div class="lb-tabs">
      <button class="lb-tab${lbTab==="wins"?" active":""}" onclick="setLbTab('wins')">⚔️ Wins</button>
      <button class="lb-tab${lbTab==="ranked"?" active":""}" onclick="setLbTab('ranked')">🏅 Ranked</button>
      <button class="lb-tab${lbTab==="level"?" active":""}" onclick="setLbTab('level')">⭐ Level</button>
      <button class="lb-tab${lbTab==="tokens"?" active":""}" onclick="setLbTab('tokens')">🪙 Coins</button>
    </div><div class="lb-list">`;

    rows.forEach((row,i)=>{
      const isMe=currentUser&&row.username===currentUser.username;
      const rank=i+1;
      const rankEmoji=rank===1?"🥇":rank===2?"🥈":rank===3?"🥉":`#${rank}`;
      let value="";
      if(lbTab==="wins")        value=`${row.wins} wins`;
      else if(lbTab==="ranked") value=`${row.rankedRating} pts`;
      else if(lbTab==="level")  value=`Lv.${row.level}`;
      else                      value=`${row.tokens} 🪙`;
      html+=`<div class="lb-row${isMe?" lb-me":""}">
        <div class="lb-rank">${rankEmoji}</div>
        <div class="lb-name">${isMe?"<strong>"+row.username+"</strong>":row.username}</div>
        <div class="lb-value">${value}</div>
      </div>`;
    });
    html+=`</div>`;
    body.innerHTML=html;
  }catch(e){body.innerHTML="<p class='lb-err'>Error: "+e.message+"</p>";}
}

// ══════════════════════════════════════════════
// ══════════════════════════════════════════════
// RANKED MODE — robust matchmaking
// ══════════════════════════════════════════════
let rankedRoom=null,rankedRole=null,rankedPoll=null;
let _rankedJoinedAt=null; // track when we joined to detect stale queue

function showRankedLobby(){
  if(!currentUser){showToast("Sign in to play ranked!","red");showScreen("screen-mode");return;}
  document.getElementById("rankedQueueStatus").textContent="Searching for opponent…";
  document.getElementById("rankedRatingDisplay").textContent="Your Rating: "+(playerStats.rankedRating||1000);
  showScreen("screen-ranked");
  joinRankedQueue();
}

function leaveRankedLobby(){
  leaveRankedQueue();
  showScreen("screen-mode");
}

async function joinRankedQueue(){
  const userId=currentUser.id,userName=currentUser.username;
  const rating=playerStats.rankedRating||1000;
  _rankedJoinedAt=new Date().toISOString();
  try{
    // Clean up stale entries for this player (including old match_ sentinel rows)
    await db.from("ranked_queue").delete().eq("player_id",userId);
    await db.from("ranked_queue").delete().eq("player_id","match_"+userId);
    // Insert fresh queue entry
    const{error}=await db.from("ranked_queue").insert({
      player_id:userId,player_name:userName,rating,
      joined_at:_rankedJoinedAt,match_code:null
    });
    if(error){
      document.getElementById("rankedQueueStatus").textContent="⚠️ Queue unavailable — check Supabase migration.";
      return;
    }
    document.getElementById("rankedQueueStatus").textContent="Searching for opponent…";
    rankedPoll=setInterval(checkRankedQueue,1000);
  }catch(e){
    document.getElementById("rankedQueueStatus").textContent="Connection error. Try again.";
  }
}

async function checkRankedQueue(){
  if(!currentUser){clearInterval(rankedPoll);rankedPoll=null;return;}
  try{
    // 1. Check if we've already been matched (opponent wrote our match_code)
    const{data:myRow}=await db.from("ranked_queue").select("*").eq("player_id",currentUser.id).maybeSingle();
    if(!myRow){
      // We got deleted — probably matched by opponent; scan for a match row
      clearInterval(rankedPoll);rankedPoll=null;
      await _rankedLookupMatchCode();
      return;
    }
    if(myRow.match_code){
      // Opponent already wrote our match code — join as B
      clearInterval(rankedPoll);rankedPoll=null;
      await db.from("ranked_queue").delete().eq("player_id",currentUser.id);
      await _rankedJoinRoom(myRow.match_code,"B");
      return;
    }

    // 2. Look for eligible opponents
    const{data:queue}=await db.from("ranked_queue")
      .select("*").is("match_code",null)
      .order("joined_at",{ascending:true}).limit(20);
    if(!queue||queue.length<2)return;

    const others=queue.filter(p=>p.player_id!==currentUser.id&&!p.player_id.startsWith("match_"));
    if(!others.length)return;

    // Pick closest-rating opponent
    others.sort((a,b)=>Math.abs(a.rating-(playerStats.rankedRating||1000))-Math.abs(b.rating-(playerStats.rankedRating||1000)));
    const opponent=others[0];
    const me=queue.find(p=>p.player_id===currentUser.id);
    if(!me)return;

    // Earliest joiner becomes host (avoid race conditions)
    if(me.joined_at>opponent.joined_at)return; // wait for opponent to create

    clearInterval(rankedPoll);rankedPoll=null;

    // Create the game room
    const code=genCode();
    const initState=freshGameState({A:currentUser.username,B:opponent.player_name});
    const{error:roomErr}=await db.from("game_rooms").insert({
      code,player_a:currentUser.id,player_a_name:currentUser.username,
      state:JSON.stringify(initState),status:"active",
      turn_status:"a_choosing",move_a:null,move_b:null,last_result:null
    });
    if(roomErr){
      // Room insert failed (race condition) — restart search
      document.getElementById("rankedQueueStatus").textContent="Retrying matchmaking…";
      rankedPoll=setInterval(checkRankedQueue,1500);
      return;
    }

    // Write match code onto opponent's queue row so they can find the room
    await db.from("ranked_queue").update({match_code:code}).eq("player_id",opponent.player_id);
    // Remove self from queue
    await db.from("ranked_queue").delete().eq("player_id",currentUser.id);

    // Start game as A
    gameMode="ranked";rankedRoom=code;rankedRole="A";
    onlineRoom=code;onlineRole="A";
    showToast("🏅 Ranked match found!","gold");
    startOnlineGame({state:JSON.stringify(initState)},"A");
    subscribeToRoom(code);startGamePoll();

  }catch(e){console.warn("ranked queue check error",e);}
}

async function _rankedLookupMatchCode(){
  // Fallback: poll for match_code written on our row before it was deleted
  // Try up to 10 times at 500ms intervals
  let attempts=0;
  const poll=setInterval(async()=>{
    attempts++;
    if(attempts>10){clearInterval(poll);showToast("Ranked match timed out. Try again.","red");showScreen("screen-mode");return;}
    try{
      // Look for our row re-added or any row with our player_id
      const{data}=await db.from("ranked_queue").select("*").eq("player_id",currentUser.id).maybeSingle();
      if(data&&data.match_code){
        clearInterval(poll);
        await db.from("ranked_queue").delete().eq("player_id",currentUser.id);
        await _rankedJoinRoom(data.match_code,"B");
      }
    }catch(e){}
  },500);
}

async function _rankedJoinRoom(code,role){
  try{
    const{data:roomData}=await db.from("game_rooms").select("*").eq("code",code).maybeSingle();
    if(!roomData){showToast("Ranked room not found.","red");showScreen("screen-mode");return;}
    gameMode="ranked";rankedRoom=code;rankedRole=role;
    onlineRoom=code;onlineRole=role;
    const roomState=JSON.parse(roomData.state);
    if(role==="B"){
      roomState.names.B=currentUser.username;
      await db.from("game_rooms").update({player_b:currentUser.id,player_b_name:currentUser.username,state:JSON.stringify(roomState)}).eq("code",code);
    }
    showToast("🏅 Ranked match found!","gold");
    startOnlineGame({state:JSON.stringify(roomState)},role);
    subscribeToRoom(code);startGamePoll();
  }catch(e){showToast("Failed to join ranked room.","red");showScreen("screen-mode");}
}

async function leaveRankedQueue(){
  if(rankedPoll){clearInterval(rankedPoll);rankedPoll=null;}
  if(currentUser){
    try{await db.from("ranked_queue").delete().eq("player_id",currentUser.id);}catch(e){}
    try{await db.from("ranked_queue").delete().eq("player_id","match_"+currentUser.id);}catch(e){}
  }
}

// ══════════════════════════════════════════════
// TOURNAMENT MODE
// ══════════════════════════════════════════════
let tourneySize=4,tourneyPoll=null,myTourneyId=null,tourneyPhase="idle";

function showTournamentLobby(){
  if(!currentUser){showToast("Sign in to join tournaments!","red");showScreen("screen-mode");return;}
  showScreen("screen-tournament");
  renderTournamentLobby();
}

function renderTournamentLobby(){
  const body=document.getElementById("tourneyLobbyBody");if(!body)return;
  body.innerHTML=`
    <div class="tourney-intro">
      <div class="tourney-icon">🏆</div>
      <div class="tourney-title">Tournament Mode</div>
      <div class="tourney-sub">Choose your bracket size. Once all players join, you'll be matched automatically. Quit = disqualification.</div>
    </div>
    <div class="tourney-size-row">
      <button class="tourney-size-btn${tourneySize===4?" active":""}" onclick="setTourneySize(4)">4 Players</button>
      <button class="tourney-size-btn${tourneySize===8?" active":""}" onclick="setTourneySize(8)">8 Players</button>
    </div>
    <button class="btn-primary" style="width:100%" onclick="joinTournament()">Join Tournament (${tourneySize} players)</button>
    <button class="btn-ghost" style="width:100%;margin-top:8px" onclick="showScreen('screen-mode')">← Back</button>`;
}

function setTourneySize(n){tourneySize=n;renderTournamentLobby();}

async function joinTournament(){
  if(!currentUser){showToast("Sign in first!","red");return;}
  const userId=currentUser.id,userName=currentUser.username;
  const body=document.getElementById("tourneyLobbyBody");
  try{
    // Remove old entry
    await db.from("tournament_queue").delete().eq("player_id",userId);
    await db.from("tournament_queue").insert({player_id:userId,player_name:userName,bracket_size:tourneySize,joined_at:new Date().toISOString(),status:"waiting"});
    myTourneyId=userId;
    body.innerHTML=`<div class="tourney-waiting">
      <div class="tourney-w-icon">⏳</div>
      <div class="tourney-w-title">Waiting for players…</div>
      <div id="tourneyPlayerList" class="tourney-player-list"></div>
      <div class="tourney-w-sub">Tournament starts when ${tourneySize} players join.</div>
      <button class="btn-ghost" onclick="leaveTournament()">Leave Queue</button>
    </div>`;
    playerStats.tournamentsPlayed=(playerStats.tournamentsPlayed||0)+1;
    await saveTokenData();
    tourneyPoll=setInterval(checkTournamentQueue,2500);
  }catch(e){
    body.innerHTML=`<p style="color:var(--red)">Tournament queue unavailable. Run migration.sql.</p>
    <button class="btn-ghost" onclick="showScreen('screen-mode')">Back</button>`;
  }
}

async function checkTournamentQueue(){
  try{
    const{data}=await db.from("tournament_queue").select("*").eq("bracket_size",tourneySize).eq("status","waiting").order("joined_at",{ascending:true});
    if(!data)return;
    // Update player list display
    const listEl=document.getElementById("tourneyPlayerList");
    if(listEl)listEl.innerHTML=data.map((p,i)=>`<div class="tq-player"><span class="tq-num">${i+1}</span><span class="tq-name">${p.player_name}${p.player_id===currentUser.id?" (You)":""}</span></div>`).join("");
    if(data.length<tourneySize)return;
    // We have enough players — first joiner orchestrates
    const me=data.find(p=>p.player_id===currentUser.id);if(!me)return;
    const isOrchestrator=data[0].player_id===currentUser.id;
    clearInterval(tourneyPoll);tourneyPoll=null;
    if(isOrchestrator){
      // Mark all as "matched"
      await db.from("tournament_queue").update({status:"matched"}).in("player_id",data.slice(0,tourneySize).map(p=>p.player_id));
      // Shuffle and create pairs
      const players=[...data.slice(0,tourneySize)].sort(()=>Math.random()-0.5);
      const pairs=[];
      for(let i=0;i<players.length;i+=2)pairs.push([players[i],players[i+1]]);
      // Create game rooms for each pair and write matchups to tournament_matches table
      for(const [pA,pB] of pairs){
        const code=genCode();
        const initState=freshGameState({A:pA.player_name,B:pB.player_name});
        await db.from("game_rooms").insert({code,player_a:pA.player_id,player_a_name:pA.player_name,state:JSON.stringify(initState),status:"active",turn_status:"a_choosing",move_a:null,move_b:null,last_result:null}).catch(()=>{});
        // Write matchup for both players to discover
        await db.from("tournament_queue").update({match_code:code}).eq("player_id",pA.player_id).catch(()=>{});
        await db.from("tournament_queue").update({match_code:code}).eq("player_id",pB.player_id).catch(()=>{});
      }
    }
    // All players: poll until match_code appears for them
    let attempts=0;
    const waitForMatch=setInterval(async()=>{
      attempts++;if(attempts>20){clearInterval(waitForMatch);showToast("Tournament match not found.","red");showScreen("screen-mode");return;}
      const{data:myRow}=await db.from("tournament_queue").select("match_code,status").eq("player_id",currentUser.id).maybeSingle();
      if(myRow&&myRow.match_code){
        clearInterval(waitForMatch);
        const code=myRow.match_code;
        const{data:roomData}=await db.from("game_rooms").select("*").eq("code",code).maybeSingle();
        if(!roomData){showToast("Room not found.","red");showScreen("screen-mode");return;}
        const isA=roomData.player_a===currentUser.id;
        gameMode="tournament";
        onlineRoom=code;onlineRole=isA?"A":"B";
        const roomState=JSON.parse(roomData.state);
        if(!isA){roomState.names.B=currentUser.username;await db.from("game_rooms").update({player_b:currentUser.id,player_b_name:currentUser.username,state:JSON.stringify(roomState)}).eq("code",code);}
        showToast("🏆 Tournament match starting!","gold");
        startOnlineGame({state:JSON.stringify(roomState)},isA?"A":"B");
        subscribeToRoom(code);startGamePoll();
      }
    },1500);
  }catch(e){console.warn("tournament queue check",e);}
}

async function leaveTournament(){
  if(tourneyPoll){clearInterval(tourneyPoll);tourneyPoll=null;}
  if(currentUser){try{await db.from("tournament_queue").delete().eq("player_id",currentUser.id);}catch(e){}}
  showScreen("screen-mode");
}

// Tournament disqualification on quit
const _origConfirmQuit=window.confirmQuit;
// Override confirmQuit to handle tournament DQ
function confirmQuit(){
  if(gameMode==="tournament"){
    if(!confirm("Quitting a tournament match will DISQUALIFY you. Are you sure?"))return;
    showToast("❌ Disqualified from tournament","red");
  }else if(!confirm("Quit and return to the menu?")){return;}
  if(gameMode==="online"||gameMode==="ranked"||gameMode==="tournament"){
    db.from("game_rooms").update({status:"abandoned"}).eq("code",onlineRoom).then(()=>{});
  }
  cleanupOnline();destroyEmojiChat();restoreTurnPanel();showScreen("screen-mode");
}

// Award tournament win bonus
async function checkTournamentWin(){
  if(gameMode!=="tournament")return;
  playerStats.tournamentsWon=(playerStats.tournamentsWon||0)+1;
  await awardTokens(500,"Tournament Win! 🏆");
  showToast("🏆 Tournament Victory! +500 🪙","gold");
  await saveTokenData();checkAchievements();
}

// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════
(async function init(){
  spawnAuthParticles();
  const session=loadSession();
  if(session){
    currentUser=session;updateUserPill();
    await loadTokenData();showScreen("screen-mode");
  }else{
    showScreen("screen-auth");
  }
})();
// ══════════════════════════════════════════════
// SCREEN SHAKE UTILITY
// ══════════════════════════════════════════════
function triggerScreenShake(intensity=15, duration=600){
  const el = document.getElementById('screen-game') || document.body;
  let start = null;
  const keyframes = [
    {transform:`translate(${intensity}px,${intensity/2}px) rotate(${intensity/8}deg)`},
    {transform:`translate(-${intensity}px,${intensity/2}px) rotate(-${intensity/8}deg)`},
    {transform:`translate(${intensity/2}px,-${intensity}px) rotate(${intensity/12}deg)`},
    {transform:`translate(-${intensity/2}px,${intensity}px) rotate(-${intensity/12}deg)`},
    {transform:`translate(${intensity/3}px,-${intensity/3}px)`},
    {transform:'translate(0,0) rotate(0)'},
  ];
  if(el.animate){
    const anim = el.animate(keyframes, {duration, easing:'ease-out', iterations:1});
    anim.onfinish = ()=>{ el.style.transform = ''; };
  }
}

// ══════════════════════════════════════════════
// INVERSION RIFT — end match with shake
// ══════════════════════════════════════════════
function triggerInversionRift(byPlayer){
  // Screen shake
  triggerScreenShake(20, 700);
  // Flash overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:white;z-index:99999;pointer-events:none;animation:inversionFlash 0.6s ease-out forwards;';
  document.head.insertAdjacentHTML('beforeend',`<style>@keyframes inversionFlash{0%{opacity:1}100%{opacity:0}}</style>`);
  document.body.appendChild(overlay);
  setTimeout(()=>overlay.remove(), 700);

  showToast('💥 INVERSION RIFT! Reality ends!','gold');

  // Force HP to 0 for loser
  if(byPlayer==='A'){ gs.hpB=0; gs.totalHpB=0; }
  else { gs.hpA=0; gs.totalHpA=0; }

  _gameOverFired=false;
  setTimeout(()=>showGameOver(), 800);
}