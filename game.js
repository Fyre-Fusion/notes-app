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
  {name:"Hira-shuriken",emoji:"💠",dmg:5,tier:1,cost:0},{name:"Senban-shuriken",emoji:"🌟",dmg:5,tier:1,cost:0},
  {name:"Makibishi",emoji:"🔘",dmg:6,tier:1,cost:0},{name:"Tekagi",emoji:"🤚",dmg:6,tier:1,cost:0},
  {name:"Bo-shuriken",emoji:"📍",dmg:7,tier:1,cost:0},{name:"Kaiken",emoji:"🔺",dmg:7,tier:1,cost:0},
  {name:"Manriki-gusari",emoji:"⛓️",dmg:8,tier:1,cost:0},{name:"Chigiriki",emoji:"🔩",dmg:8,tier:1,cost:0},
  {name:"Kusarigama",emoji:"🔗",dmg:9,tier:1,cost:0},{name:"Nunchaku",emoji:"🔄",dmg:9,tier:1,cost:0},
  {name:"Xiphos",emoji:"🗡️",dmg:6,tier:1,cost:0},{name:"Kopis",emoji:"⚔️",dmg:7,tier:1,cost:0},
  {name:"Makaira",emoji:"🌙",dmg:8,tier:1,cost:0},{name:"Falcata",emoji:"🔱",dmg:8,tier:1,cost:0},
  {name:"Dory",emoji:"📌",dmg:7,tier:1,cost:0},{name:"Akontion",emoji:"🎯",dmg:6,tier:1,cost:0},
  {name:"Labrys",emoji:"🪓",dmg:9,tier:1,cost:0},{name:"Cestus",emoji:"🥊",dmg:6,tier:1,cost:0},
  {name:"Sling",emoji:"🪃",dmg:5,tier:1,cost:0},{name:"Sica",emoji:"🔪",dmg:7,tier:1,cost:0},
  {name:"Krypteia Dagger",emoji:"🌑",dmg:6,tier:1,cost:0},
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
  // T6
  {name:"Gentuga Tensho",emoji:"🌠",dmg:16,tier:6,cost:1000},
  {name:"Atom Scythe",emoji:"⚛️",dmg:15,tier:6,cost:1000},
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
};

function getShieldValues(weaponList){const s=new Set(weaponList.map(w=>w.dmg));return[...s].sort((a,b)=>a-b);}
let WEAPONS=ALL_WEAPONS.filter(w=>STARTER_WEAPON_NAMES.includes(w.name));
let SHIELD_VALUES=getShieldValues(WEAPONS);

const MAX_HP=30,SHOTS_PER_ROUND=6,TOTAL_ROUNDS=3;
const USERNAME_REGEX=/^[a-zA-Z0-9_]{3,15}$/;
const SESSION_KEY="klocvork_session";
const TOKENS_WIN=200,TOKENS_LOSS=50,POTION_COST=15,POTION_HEAL=10;
const BOSS_HP_MAX=60,BOSS_TOKENS=300,SPECIAL_CHANCE=0.001,SPECIAL_WINS_NEED=3,SPECIAL_TOKENS=30;
const TRAIT_ROLL_COST=500,CLAN_REROLL_COST=4000,CLAN_UPGRADE_COST=1000;

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
const LEVEL_XP_THRESHOLDS=(()=>{
  const arr=[0];
  let cum=0;
  for(let i=2;i<=MAX_LEVEL;i++){cum+=Math.floor(100*Math.pow(1.06,i-2));arr.push(cum);}
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
const XP_BASE_RATE=1.18;
function getXpForAction(action,lvl){
  const base={win:50,loss:15,boss:80,special:30,shot:2};
  return Math.round((base[action]||5)*Math.pow(XP_BASE_RATE,Math.min((lvl||1)-1,50)));
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
};
const CLAN_KEYS=["exorcist","eclipse","hydros","vulcryn"];
const ALL_CLAN_KEYS=["exorcist","eclipse","hydros","vulcryn","thunder","shadow"];
const ROLL_ONLY_CLANS=["thunder","shadow"];
function getRandomClan(){return CLAN_KEYS[Math.floor(Math.random()*CLAN_KEYS.length)];}
function getRandomRollClan(){return ALL_CLAN_KEYS[Math.floor(Math.random()*ALL_CLAN_KEYS.length)];}

// ══════════════════════════════════════════════
// RACES SYSTEM
// ══════════════════════════════════════════════
const RACES = {
  human:        {name:"Human Race",        emoji:"🧑",  color:"#94a3b8", chance:0.50, lore:"Resilient and adaptable warriors forged by will alone.",        perks:["+10% coin bonus from all sources","Faster clan upgrade (5% off)","Balanced stats in all areas"]},
  oni:          {name:"Oni Race",           emoji:"👹",  color:"#f43f5e", chance:0.20, lore:"Demonic warriors of raw power and unstoppable fury.",           perks:["+2 base damage on all attacks","Opponent starts with 1 less HP per round","+1 dmg for every 3 HP lost (Berserker Blood)"]},
  heavenly:     {name:"Heavenly Race",      emoji:"✨",  color:"#facc15", chance:0.10, lore:"Chosen by the divine — rare, radiant, and untouchable.",        perks:["Divine Shield: 15% chance to negate all damage","+25% XP from all actions","Perfect blocks restore 2 HP (Blessed)"]},
  supernatural: {name:"Supernatural Race", emoji:"👻",  color:"#a855f7", chance:0.20, lore:"Beings beyond the mortal realm, bending fate itself.",          perks:["Phase Shift: 20% dodge per round","Soul sight: see opponent shield hint once per match","Cursed aura: enemy trait effectiveness -10%"]},
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
  // 4 new materials
  {id:"spirit_fragment",name:"Spirit Fragment",emoji:"👻",rarity:"Mythic",shopCost:10000,shopChance:0.005},
  {id:"antimatter_shard",name:"Anti-Matter Shard",emoji:"🌌",rarity:"Mythic",shopCost:35000,shopChance:0.001},
  {id:"fusion_element_x",name:"Fusion Element X",emoji:"🔷",rarity:"Epic",shopCost:1300,shopChance:0.25,shopCostType:"tokens"},
  {id:"fusion_element_y",name:"Fusion Element Y",emoji:"🔶",rarity:"Epic",shopCost:1700,shopChance:0.20,shopCostType:"tokens"},
];

// ══════════════════════════════════════════════
// TRAITS — 100 total (80 rollable + 20 craftable)
// ══════════════════════════════════════════════
const ALL_TRAITS=[
  // Mythic rollable (0% — these need crafting)
  {name:"Phantom Strike",emoji:"👻",rarity:"Mythic",chance:0,desc:"Attack ignores shields entirely."},
  {name:"Soul Rend",emoji:"💀",rarity:"Mythic",chance:0,desc:"Deals double damage on perfect matches."},
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
  {id:"all_t1",name:"T1 Complete",emoji:"🥉",desc:"Own all Tier 1 starter weapons",check:(s,l,c,owned)=>ALL_WEAPONS.filter(w=>w.tier===1).every(w=>owned.includes(w.name))},
  {id:"divine_weapon",name:"Divine Arsenal",emoji:"🌠",desc:"Own the Gentuga Tensho",check:(s,l,c,owned)=>owned.includes("Gentuga Tensho")},
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
let playerClan=null;       // {key, version}
let playerRace=null;       // race key string
let playerMaterials={};    // {mat_id: count}
let playerAccessories=[];  // [acc_id, ...]
let equippedAccessory=null;
let playerAchievements={}; // {ach_id: true}
let playerStats=defaultStats();
let dailyQuests=null;
let dailyQuestKey="";

function defaultStats(){return{wins:0,losses:0,perfectBlocks:0,bossKills:0,weaponsBought:0,traitsCrafted:0,tradesCompleted:0,dailyCompleted:0,totalTokensEarned:0,onlineWins:0,rankedWins:0,rankedLosses:0,rankedRating:1000,tournamentsWon:0,tournamentsPlayed:0,itemsRolled:0,materialsSold:0,fusionsPerformed:0,traitsRolled:0,clanUpgrades:0,accessoriesOwned:0,totalShots:0,totalDamageDealt:0,totalRoundsPlayed:0,consecutiveWins:0,maxConsecutiveWins:0};}

function loadInventoryFromData(data){
  localTokens=data?.tokens??0; localPotions=data?.potions??0; localXP=data?.xp??0;
  try{const ow=data?.owned_weapons;ownedWeapons=ow?JSON.parse(ow):[...STARTER_WEAPON_NAMES];STARTER_WEAPON_NAMES.forEach(n=>{if(!ownedWeapons.includes(n))ownedWeapons.push(n);});}catch(e){ownedWeapons=[...STARTER_WEAPON_NAMES];}
  try{const ml=data?.loadout;if(ml){myLoadout=JSON.parse(ml).filter(n=>ownedWeapons.includes(n));if(myLoadout.length>LOADOUT_SIZE)myLoadout=myLoadout.slice(0,LOADOUT_SIZE);}else{myLoadout=ownedWeapons.slice(0,LOADOUT_SIZE);}}catch(e){myLoadout=ownedWeapons.slice(0,LOADOUT_SIZE);}
  try{weaponTraits=data?.weapon_traits?JSON.parse(data.weapon_traits):{};}catch(e){weaponTraits={};}
  try{playerClan=data?.clan?JSON.parse(data.clan):null;}catch(e){playerClan=null;}
  try{playerRace=data?.race||null;}catch(e){playerRace=null;}
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
  if(data){loadInventoryFromData(data);_dbLoadedOnce=true;}
  else if(!_dbLoadedOnce){showToast("⚠️ Could not reach server. Progress may not load.","red");}
  // If _dbLoadedOnce already true and fetch failed: silently keep in-memory state (NO WIPE)
  updateTokenDisplay();
}

let _saveQueue=Promise.resolve(); // serialise saves — no overlapping writes
function saveTokenData(){
  if(!currentUser)return Promise.resolve();
  // Chain onto existing queue so rapid calls never race
  _saveQueue=_saveQueue.then(async()=>{
    const payload={
      tokens:localTokens,potions:localPotions,owned_weapons:JSON.stringify(ownedWeapons),
      loadout:JSON.stringify(myLoadout),xp:localXP,weapon_traits:JSON.stringify(weaponTraits),
      clan:JSON.stringify(playerClan),race:playerRace,materials:JSON.stringify(playerMaterials),
      accessories:JSON.stringify(playerAccessories),equipped_accessory:equippedAccessory,
      achievements:JSON.stringify(playerAchievements),stats:JSON.stringify(playerStats),
      daily_quests:JSON.stringify({key:dailyQuestKey,quests:dailyQuests}),
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
  if(localTokens<CLAN_REROLL_COST){showToast(`Need ${CLAN_REROLL_COST} 🪙!`,"red");return;}
  if(!confirm(`Reroll clan for ${CLAN_REROLL_COST} 🪙? Resets to V1!`))return;
  localTokens-=CLAN_REROLL_COST;
  const newKey=getRandomRollClan();playerClan={key:newKey,version:1};
  const c=CLANS[newKey];
  showToast(`${c.emoji} You joined ${c.name}!`,"gold");
  await saveTokenData();updateTokenDisplay();renderClanUI();
}

// ══════════════════════════════════════════════
// SHOP
// ══════════════════════════════════════════════

// ══════════════════════════════════════════════
// ITEM ROLL (every 2 hours)
// ══════════════════════════════════════════════
const ITEM_ROLL_COOLDOWN_MS = 2 * 60 * 60 * 1000; // 2 hours
const ITEM_ROLL_KEY = "klocvork_lastroll";

// Build rollable pool from CRAFTING_MATERIALS using shopChance as weight
function buildItemRollPool(){
  // All mats with shopChance get included; others default to 5% weight
  return CRAFTING_MATERIALS.map(m=>({mat:m, weight: m.shopChance!=null ? m.shopChance : 0.05}));
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
  <div class="all-races-title">All Races</div>
  <div class="race-all-grid">`;

  for(const[key,r] of Object.entries(RACES)){
    const isMine=key===myRaceKey;
    html+=`<div class="race-card ${isMine?"race-mine":""}" style="border-color:${r.color}44">
      <div class="race-card-header" style="color:${r.color}">${r.emoji} ${r.name}
        ${isMine?`<span class="race-mine-tag" style="background:${r.color}22;border-color:${r.color}44;color:${r.color}">Your Race</span>`:""}
        <span class="race-chance-tag">${(r.chance*100).toFixed(0)}% chance</span>
      </div>
      <div class="race-card-lore">${r.lore}</div>
      <div class="race-card-perks">`;
    r.perks.forEach(p=>{html+=`<div class="rcp-item">✦ ${p}</div>`;});
    html+=`</div></div>`;
  }
  html+=`</div>
  <p style="font-size:11px;color:var(--text3);text-align:center;margin-top:16px">Races are assigned at account creation. Each race is permanent.</p>`;
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
    <button class="shop-tab-btn${shopTab==="mats"?" active":""}" onclick="setShopTab('mats')">📦 Rare Mats</button>
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
    // Mats are items you collect and can SELL for coins — show sellable materials
    const sellableMats=CRAFTING_MATERIALS.filter(m=>m.shopCost);
    let html=bal+`<div style="display:flex;flex-direction:column;gap:14px">
    <p class="shop-hint" style="text-align:left">These are rare materials you can <strong>sell</strong> for coins. Collect them from battles, daily quests, and the item roll!</p>`;
    for(const mat of sellableMats){
      const have=playerMaterials[mat.id]||0;
      const sellPrice=mat.shopCost;
      const c=RARITY_COLORS[mat.rarity]||"#94a3b8";
      html+=`<div class="shop-item-card">
        <div class="shop-item-icon">${mat.emoji}</div>
        <div class="shop-item-info">
          <div class="shop-item-name" style="color:${c}">${mat.name} <span style="font-size:10px;opacity:0.6">${mat.rarity}</span></div>
          <div class="shop-item-desc">You have: <strong>${have}</strong></div>
          <div class="shop-item-cost">Sell value: ${sellPrice} 🪙 each</div>
        </div>
        <button class="btn-primary" onclick="sellMaterial('${mat.id}');renderShopUI();" ${have>0&&currentUser?"":"disabled"}>Sell 1 (${sellPrice} 🪙)</button>
      </div>`;
    }
    html+=`</div>`;body.innerHTML=html;
  }else{
    let html=bal+`<div class="weapon-shop-list">`;
    for(let t=1;t<=6;t++){
      const ti=TIER_INFO[t],tier_weapons=ALL_WEAPONS.filter(w=>w.tier===t);
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
      [1,2,3,4,5,6].map(t=>{
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
  const code=genTradeCode();
  tradeRoomCode=code;tradeRoomRole="A";
  try{
    const{error}=await db.from("trade_rooms").insert({
      code,player_a:currentUser.id,player_a_name:currentUser.username,
      status:"waiting",offer_a:null,offer_b:null
    });
    if(error){
      // Table might not exist — show instructions
      document.getElementById("tradeRoomError").innerHTML=`⚠️ trade_rooms table not found. Add it in Supabase: <code>CREATE TABLE trade_rooms (id uuid DEFAULT gen_random_uuid() PRIMARY KEY, code text UNIQUE, player_a text, player_a_name text, player_b text, player_b_name text, status text DEFAULT 'waiting', offer_a text, offer_b text, created_at timestamptz DEFAULT now());</code>`;
      return;
    }
  }catch(e){
    // Fallback: use localStorage-based local room for demo
    localStorage.setItem("tradeRoom_"+code,JSON.stringify({code,player_a:currentUser.id,player_a_name:currentUser.username,status:"waiting",offer_a:null,offer_b:null}));
  }
  document.getElementById("tradeRoomCode").textContent=code;
  document.getElementById("tradeRoomLobby").classList.add("hidden");
  document.getElementById("tradeRoomWaiting").classList.remove("hidden");
  // Poll for partner
  tradeRoomPoll=setInterval(async()=>{
    try{
      const{data}=await db.from("trade_rooms").select("*").eq("code",code).maybeSingle();
      if(data&&data.status==="active"&&data.player_b){
        clearInterval(tradeRoomPoll);tradeRoomPoll=null;
        document.getElementById("tradeRoomWaiting").classList.add("hidden");
        startTradeRoomSession(data);
      }
    }catch(e){}
  },2000);
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
  // Poll for opponent offer
  tradeRoomPoll=setInterval(pollTradeRoom,2000);
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
    el.textContent="Waiting for opponent to select items…";return;
  }
  let html="";
  if(offer.weapons?.length)html+=offer.weapons.map(n=>{const w=ALL_WEAPONS.find(x=>x.name===n);return`<div class="tra-offer-item">${w?.emoji||"⚔"} ${n}</div>`;}).join("");
  if(offer.mats?.length)html+=offer.mats.map(m=>{const mat=CRAFTING_MATERIALS.find(x=>x.id===m.id);return`<div class="tra-offer-item">${mat?.emoji||"📦"} ${mat?.name||m.id} ×${m.qty}</div>`;}).join("");
  if(offer.accs?.length)html+=offer.accs.map(id=>{const acc=ALL_ACCESSORIES.find(x=>x.id===id);return`<div class="tra-offer-item">${acc?.emoji||"💍"} ${acc?.name||id}</div>`;}).join("");
  if(offer.accepted)html+=`<div class="tra-offer-accepted">✓ Accepted!</div>`;
  el.innerHTML=html;
  const acceptBtn=document.getElementById("traAcceptBtn");
  // Show accept button as long as trade not yet completed and opponent has sent something
  if(acceptBtn){
    const hasItems=offer&&(offer.weapons?.length||offer.mats?.length||offer.accs?.length);
    acceptBtn.style.display=(hasItems&&!_tradeCompleted)?"":"none";
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
  if(btn){btn.disabled=true;btn.textContent="Sending…";}
  try{
    const{error}=await db.from("trade_rooms").update({[offerKey]:JSON.stringify(offerData)}).eq("code",tradeRoomCode);
    if(error){showToast("Failed: "+error.message,"red");if(btn){btn.disabled=false;btn.textContent="Send Offer";}return;}
    showToast("✓ Offer sent!","green");
    const statusEl=document.getElementById("traStatus");
    if(statusEl)statusEl.textContent="Offer sent. Waiting for opponent to accept…";
    if(btn){btn.textContent="✓ Offer Sent";} // keep disabled — they can re-send to update
    // Show accept button in case opponent already sent their offer
    const{data}=await db.from("trade_rooms").select("*").eq("code",tradeRoomCode).maybeSingle();
    if(data){const oppKey=tradeRoomRole==="A"?"offer_b":"offer_a";const oppOffer=data[oppKey]?JSON.parse(data[oppKey]):null;renderOpponentOffer(oppOffer);}
  }catch(e){showToast("Failed to send offer.","red");if(btn){btn.disabled=false;btn.textContent="Send Offer";}}
}

let _tradeCompleted=false; // guard against double-complete
async function acceptTrade(){
  if(!tradeRoomCode){showToast("Not in a trade room!","red");return;}
  if(_tradeCompleted)return;
  const offerKey=tradeRoomRole==="A"?"offer_a":"offer_b";
  const otherKey=tradeRoomRole==="A"?"offer_b":"offer_a";
  const btn=document.getElementById("traAcceptBtn");
  if(btn){btn.disabled=true;btn.textContent="Accepting…";}
  try{
    // Always re-fetch fresh data before accepting
    const{data}=await db.from("trade_rooms").select("*").eq("code",tradeRoomCode).maybeSingle();
    if(!data){showToast("Room not found.","red");return;}
    if(data.status==="completed"){
      if(!_tradeCompleted){_tradeCompleted=true;clearInterval(tradeRoomPoll);tradeRoomPoll=null;completeTrade(data);}
      return;
    }
    // Build my offer: use what's in DB if already sent, else use local selection
    let myOffer=data[offerKey]?JSON.parse(data[offerKey]):{...myTradeOffer,accepted:false};
    myOffer.accepted=true;
    await db.from("trade_rooms").update({[offerKey]:JSON.stringify(myOffer)}).eq("code",tradeRoomCode);
    // Re-fetch to check if other side already accepted
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
      showToast("✓ Accepted! Waiting for opponent…","green");
      const statusEl=document.getElementById("traStatus");
      if(statusEl)statusEl.textContent="You accepted! Waiting for opponent…";
      if(btn){btn.disabled=true;btn.textContent="✓ Accepted";}
    }
  }catch(e){
    showToast("Failed to accept: "+e.message,"red");
    if(btn){btn.disabled=false;btn.textContent="✓ Accept Trade";}
  }
}

function completeTrade(data){
  try{
    const offerA=data.offer_a?JSON.parse(data.offer_a):{weapons:[],mats:[],accs:[]};
    const offerB=data.offer_b?JSON.parse(data.offer_b):{weapons:[],mats:[],accs:[]};
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
  {title:"⚔ Welcome to KlocVork Arena!",body:"A strategic weapon & shield battle game. Two players fight in 3 rounds, 6 shots each. Most HP at the end wins!"},
  {title:"🗡️ How Combat Works",body:"Each turn, secretly pick a weapon and a shield value. Your shield should match your opponent's weapon damage. Damage = |Your Shield − Enemy Weapon|. A perfect block = 0 damage!"},
  {title:"⚜️ Clans",body:"You're assigned a random clan on signup: Exorcist 🌿, Eclipse 🌑, Hydros 💧, or Vulcryn 🔥. Each clan has 4 versions (V1–V4) with increasing power. Upgrade with coins!"},
  {title:"✨ Traits & Crafting",body:"Roll traits onto weapons for special bonuses (500 🪙 each). 20 special traits are craftable only — collect materials from daily quests to craft them!"},
  {title:"📅 Daily Quests",body:"Check your 3 daily quests every day for coins and crafting materials. Tap the 📅 Daily button on your profile card. Quests reset at midnight!"},
  {title:"🤝 Trading Hub",body:"List weapons you don't need. Other players browse the Market and buy them — you earn coins from every sale!"},
  {title:"🏅 Achievements & Levels",body:"Earn XP from every match and level up all the way to Lv.1000! Complete 25 achievements for glory. Check your profile card to track progress. Good luck, warrior!"},
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
function updateUserPill(){const btn=document.getElementById("logoutBtn");if(btn)btn.style.display=currentUser?"":"none";}

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
  gameMode=mode;restoreTurnPanel();
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
    potionsA:localPotions,potionsB:localPotions,specialScoreA:0,specialScoreB:0};
}
let SHIELD_VALUES_A=[],SHIELD_VALUES_B=[];

function initGame(mode,names){
  WEAPONS=myLoadout.map(n=>ALL_WEAPONS.find(w=>w.name===n)).filter(Boolean);
  if(!WEAPONS.length)WEAPONS=ALL_WEAPONS.filter(w=>STARTER_WEAPON_NAMES.includes(w.name));
  SHIELD_VALUES=getShieldValues(WEAPONS);SHIELD_VALUES_A=SHIELD_VALUES;SHIELD_VALUES_B=SHIELD_VALUES;
  const n=names||{A:currentUser?currentUser.username:"Player A",B:mode==="ai"?"🤖 The Machine":"Player B"};
  gs=freshGameState(n);specialActive=false;specialGuesserNow="A";
  renderGame();initEmojiChat();
}

// AI auto-pick weapon and shield for "vs AI" mode
function aiMakeChoice(){
  // Pick a weapon (prefer higher tier/damage)
  const avail=WEAPONS.filter(w=>!gs.usedWeapons.includes(w.name));
  const pool=avail.length>0?avail:WEAPONS;
  // Weighted random — higher dmg = more likely
  const totalDmg=pool.reduce((s,w)=>s+w.dmg,0);
  let r=Math.random()*totalDmg,aiWeapon=pool[pool.length-1];
  for(const w of pool){r-=w.dmg;if(r<=0){aiWeapon=w;break;}}
  // Pick shield — try to counter playerA's last weapon if known, else random
  const shields=SHIELD_VALUES_B.length?SHIELD_VALUES_B:getShieldValues(WEAPONS);
  const aiShield=shields[Math.floor(Math.random()*shields.length)];
  return{weapon:aiWeapon,shield:aiShield,potion:false};
}

// ══════════════════════════════════════════════
// BOSS BATTLE
// ══════════════════════════════════════════════
let bossHp=BOSS_HP_MAX;
function initBossGame(){
  bossHp=BOSS_HP_MAX;
  WEAPONS=myLoadout.map(n=>ALL_WEAPONS.find(w=>w.name===n)).filter(Boolean);
  if(!WEAPONS.length)WEAPONS=ALL_WEAPONS.filter(w=>STARTER_WEAPON_NAMES.includes(w.name));
  SHIELD_VALUES=getShieldValues(WEAPONS);
  gs=freshGameState({A:currentUser?currentUser.username:"Player A",B:"Player B"});
  renderBossGame();initEmojiChat();
}
function renderBossGame(){
  document.getElementById("gsRound").textContent="⚔ Boss Battle";
  document.getElementById("gsShot").textContent="Boss HP: "+bossHp+"/"+BOSS_HP_MAX;
  document.getElementById("hpNameA").textContent=gs.names.A;document.getElementById("hpNameB").textContent=gs.names.B;
  updateHPBars();renderAvailableWeapons();hideOnlineWaiting();
  if(gs.phase==="A")renderPlayerATurn(true);else renderPlayerBTurn(true);
}
function resolveBossShot(cA,cB){
  const bW=WEAPONS[Math.floor(Math.random()*WEAPONS.length)];
  const bS=SHIELD_VALUES[Math.floor(Math.random()*SHIELD_VALUES.length)];
  const dmgBossFromA=cA.weapon?Math.abs(bS-cA.weapon.dmg):0;
  const dmgBossFromB=cB.weapon?Math.abs(bS-cB.weapon.dmg):0;
  const dmgToA=cA.shield!=null?Math.abs(cA.shield-bW.dmg):bW.dmg;
  const dmgToB=cB.shield!=null?Math.abs(cB.shield-bW.dmg):bW.dmg;
  const prevHp=bossHp;bossHp=Math.max(0,bossHp-dmgBossFromA-dmgBossFromB);
  if(!cA.potion)gs.hpA=Math.max(0,gs.hpA-dmgToA);else gs.hpA=Math.min(MAX_HP,gs.hpA+POTION_HEAL);
  if(!cB.potion)gs.hpB=Math.max(0,gs.hpB-dmgToB);else gs.hpB=Math.min(MAX_HP,gs.hpB+POTION_HEAL);
  let killingBlow=null;
  if(bossHp===0&&prevHp>0){killingBlow=(prevHp-dmgBossFromA)<=0?"A":"B";}
  showBossResult(cA,cB,bW,bS,dmgToA,dmgToB,dmgBossFromA,dmgBossFromB,killingBlow);
}
function showBossResult(cA,cB,bW,bS,dmgA,dmgB,dmgBA,dmgBB,killingBlow){
  document.getElementById("rdNameA").textContent=gs.names.A;document.getElementById("rdNameB").textContent=gs.names.B;
  document.getElementById("rdWeaponA").textContent=cA.potion?"🧪 Healed":(cA.weapon.emoji+" "+cA.weapon.name+" → "+dmgBA+" dmg to Boss");
  document.getElementById("rdWeaponB").textContent=cB.potion?"🧪 Healed":(cB.weapon.emoji+" "+cB.weapon.name+" → "+dmgBB+" dmg to Boss");
  document.getElementById("rdShieldA").textContent=cA.potion?"+"+POTION_HEAL+" HP":"🛡 "+cA.shield;
  document.getElementById("rdShieldB").textContent=cB.potion?"+"+POTION_HEAL+" HP":"🛡 "+cB.shield;
  const eA=document.getElementById("rdDmgA"),eB=document.getElementById("rdDmgB");
  eA.className=(dmgA===0||cA.potion)?"rd-dmg no-dmg":"rd-dmg";
  eA.textContent=cA.potion?"+"+POTION_HEAL+" HP 🧪":(dmgA===0?"✦ Perfect Block!":"−"+dmgA+" HP");
  eB.className=(dmgB===0||cB.potion)?"rd-dmg no-dmg":"rd-dmg";
  eB.textContent=cB.potion?"+"+POTION_HEAL+" HP 🧪":(dmgB===0?"✦ Perfect Block!":"−"+dmgB+" HP");
  const hpEl=document.getElementById("resultHpSummary"),nBtn=document.getElementById("resultNextBtn");
  if(bossHp<=0){
    const winner=killingBlow==="A"?gs.names.A:gs.names.B;
    hpEl.innerHTML="🏆 "+winner+" landed the killing blow! Boss defeated!";
    nBtn.textContent="Claim Reward →";nBtn.onclick=()=>claimBossReward(killingBlow);
  }else if(gs.hpA<=0&&gs.hpB<=0){
    hpEl.innerHTML="💀 Both players fell. Boss survives with "+bossHp+" HP.";
    nBtn.textContent="Retreat →";nBtn.onclick=()=>showScreen("screen-mode");
  }else{
    hpEl.innerHTML=bW.emoji+" Boss: "+bW.name+" (Shield "+bS+") | Boss HP: <strong>"+bossHp+"</strong>/"+BOSS_HP_MAX+" | "+gs.names.A+": "+gs.hpA+" HP | "+gs.names.B+": "+gs.hpB+" HP";
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
function nextBossShot(){gs.shot++;gs.phase="A";showScreen("screen-game");renderBossGame();}

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
  <button class="btn-confirm" id="confirmBtn" onclick="confirmChoice()" disabled>Confirm →</button><p id="gameError" class="form-error"></p>`;
}

let selWeaponA=null,selShieldA=null,usingPotionA=false;
function renderPlayerATurn(isBoss){
  selWeaponA=null;selShieldA=null;usingPotionA=false;
  const badge=document.getElementById("turnBadge"),phase=document.getElementById("turnPhase");
  if(badge)badge.textContent=gs.names.A+"'s Turn";
  if(phase)phase.textContent=isBoss?"Choose your weapon & shield to attack the Boss!":"Choose your weapon & shield — hidden from your opponent.";
  const cb=document.getElementById("confirmBtn");if(cb)cb.disabled=true;
  renderWeaponGrid("weaponGrid",WEAPONS,w=>{selWeaponA=w;usingPotionA=false;checkAReady();});
  renderShieldGrid("shieldGrid",SHIELD_VALUES_A.length?SHIELD_VALUES_A:getShieldValues(WEAPONS),v=>{selShieldA=v;checkAReady();},null);
  renderPotionRow("potionRow","A");
}
function checkAReady(){const cb=document.getElementById("confirmBtn");if(cb)cb.disabled=!(usingPotionA||(selWeaponA&&selShieldA!==null));}

let selWeaponB=null,selShieldB=null,usingPotionB=false;
function renderPlayerBTurn(isBoss){
  selWeaponB=null;selShieldB=null;usingPotionB=false;
  const badge=document.getElementById("turnBadge"),phase=document.getElementById("turnPhase");
  if(badge)badge.textContent=gs.names.B+"'s Turn";
  const aWeapon=gs.pendingA&&gs.pendingA.weapon?gs.pendingA.weapon:null;
  // No hints about perfect blocks — just "pick your weapon & shield"
  if(phase)phase.textContent=isBoss?"Choose weapon & shield to attack the Boss!":"Pick your weapon & shield.";
  const cb=document.getElementById("confirmBtn");if(cb)cb.disabled=true;
  const bAvail=isBoss?WEAPONS:WEAPONS.filter(w=>w.name!==(gs.pendingA&&gs.pendingA.weapon?gs.pendingA.weapon.name:null));
  renderWeaponGrid("weaponGrid",bAvail,w=>{selWeaponB=w;usingPotionB=false;checkBReady();});
  // No perfect-counter highlight hint shown
  renderShieldGrid("shieldGrid",SHIELD_VALUES_B.length?SHIELD_VALUES_B:getShieldValues(WEAPONS),v=>{selShieldB=v;checkBReady();},null);
  renderPotionRow("potionRow","B");
}
function checkBReady(){const cb=document.getElementById("confirmBtn");if(cb)cb.disabled=!(usingPotionB||(selWeaponB&&selShieldB!==null));}

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
    const btn=document.createElement("button");btn.className="weapon-btn";btn.style.position="relative";
    btn.innerHTML=`<span>${w.emoji} ${w.name}${trait?` <span class='weapon-trait-dot' title='${trait.name}: ${trait.desc}'>${trait.emoji}</span>`:""}</span><span class='weapon-dmg'>${w.dmg} dmg</span><span class='weapon-tier' style='background:${ti.color}22;color:${ti.color};border:1px solid ${ti.color}44'>T${w.tier}</span>`;
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
    if(!usingPotionA&&(!selWeaponA||selShieldA===null))return;
    gs.pendingA={weapon:selWeaponA,shield:selShieldA,potion:usingPotionA};
    const cb=document.getElementById("confirmBtn");
    if(cb){cb.classList.add("locked-in");cb.textContent="✓ Locked In";cb.disabled=true;}
    if(gameMode==="hotseat"){
      document.getElementById("passTitle").textContent="Pass to "+gs.names.B;
      document.getElementById("passSubtitle").textContent=gs.names.A+" has locked their choice. Hand the device over.";
      showScreen("screen-pass");
    }else if(gameMode==="ai"){
      // AI auto-makes its choice immediately
      gs.phase="B";
      if(usingPotionA){gs.potionsA=Math.max(0,gs.potionsA-1);if(currentUser){localPotions=Math.max(0,localPotions-1);saveTokenData();}}
      const aiChoice=aiMakeChoice();
      resolveShot(gs.pendingA,aiChoice);
    }else{gs.phase="B";renderGame();}
  }else{
    if(!usingPotionB&&(!selWeaponB||selShieldB===null))return;
    if(usingPotionB){gs.potionsB=Math.max(0,gs.potionsB-1);if(currentUser){localPotions=Math.max(0,localPotions-1);saveTokenData();updateDailyQuest("potion");}}
    if(gs.pendingA?.potion){gs.potionsA=Math.max(0,gs.potionsA-1);if(currentUser){localPotions=Math.max(0,localPotions-1);}}
    resolveShot(gs.pendingA,{weapon:selWeaponB,shield:selShieldB,potion:usingPotionB});
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
  if(!cA.potion&&!cB.potion){
    dmgToB=Math.abs(cB.shield-cA.weapon.dmg);
    dmgToA=Math.abs(cA.shield-cB.weapon.dmg);
  }else if(cA.potion&&!cB.potion){dmgToA=0;dmgToB=Math.round(cB.weapon.dmg/2);}
  else if(!cA.potion&&cB.potion){dmgToB=0;dmgToA=Math.round(cA.weapon.dmg/2);}

  if(dmgToA===0&&!cA.potion){playerStats.perfectBlocks=(playerStats.perfectBlocks||0)+1;updateDailyQuest("perfectBlock");if(currentUser)saveTokenData();}

  if(!cA.potion)gs.hpA=Math.max(0,gs.hpA-dmgToA);else gs.hpA=Math.min(MAX_HP,gs.hpA+POTION_HEAL);
  if(!cB.potion)gs.hpB=Math.max(0,gs.hpB-dmgToB);else gs.hpB=Math.min(MAX_HP,gs.hpB+POTION_HEAL);
  if(cA.weapon&&!gs.usedWeapons.includes(cA.weapon.name))gs.usedWeapons.push(cA.weapon.name);
  if(cB.weapon&&!gs.usedWeapons.includes(cB.weapon.name))gs.usedWeapons.push(cB.weapon.name);
  if(currentUser){awardXP("shot");updateDailyQuest("shot");playerStats.totalShots=(playerStats.totalShots||0)+1;}
  // Track T4 use for daily quest
  if((cA.weapon&&cA.weapon.tier>=4)||(cB.weapon&&cB.weapon.tier>=4))updateDailyQuest("useT4");
  showShotResult(cA,cB,dmgToA,dmgToB);
}

function showShotResult(cA,cB,dmgA,dmgB){
  document.getElementById("rdNameA").textContent=gs.names.A;document.getElementById("rdNameB").textContent=gs.names.B;
  document.getElementById("rdWeaponA").textContent=cA.potion?"🧪 Healed":((cA.weapon?.emoji||"")+" "+(cA.weapon?.name||"—"));
  document.getElementById("rdWeaponB").textContent=cB.potion?"🧪 Healed":((cB.weapon?.emoji||"")+" "+(cB.weapon?.name||"—"));
  document.getElementById("rdShieldA").textContent=cA.potion?"+"+POTION_HEAL+" HP":"🛡 "+cA.shield;
  document.getElementById("rdShieldB").textContent=cB.potion?"+"+POTION_HEAL+" HP":"🛡 "+cB.shield;
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
  if(gameMode==="online"){
    if(onlineRole==="A"){showScreen("screen-game");renderGame();db.from("game_rooms").update({turn_status:"a_choosing",move_a:null,move_b:null,state:JSON.stringify(gs)}).eq("code",onlineRoom);}
    else{showScreen("screen-game");document.getElementById("gsRound").textContent=gs.isSuddenDeath?"⚡ Sudden Death":"Round "+gs.round+" / "+TOTAL_ROUNDS;document.getElementById("gsShot").textContent="Shot 1 / "+SHOTS_PER_ROUND;updateHPBars();renderAvailableWeapons();showOnlineWaiting("Waiting for "+gs.names.A+" to choose…");}
  }else{showScreen("screen-game");gs.phase="A";renderGame();}
}

// ══════════════════════════════════════════════
// GAME OVER
// ══════════════════════════════════════════════
async function showGameOver(){
  const finalA=gs.totalHpA||gs.hpA,finalB=gs.totalHpB||gs.hpB;
  const aWins=finalA>finalB,tie=finalA===finalB;
  document.getElementById("goEmblem").textContent=tie?"🤝":"🏆";
  document.getElementById("goNameA").textContent=gs.names.A;document.getElementById("goNameB").textContent=gs.names.B;
  document.getElementById("goHpA").textContent=gs.isSuddenDeath?gs.hpA+" HP":(gs.totalHpA||gs.hpA)+" HP total";
  document.getElementById("goHpB").textContent=gs.isSuddenDeath?gs.hpB+" HP":(gs.totalHpB||gs.hpB)+" HP total";
  if(tie){document.getElementById("goResult").textContent="It's a Draw!";document.getElementById("goSubtitle").textContent="Both warriors fought with equal fury.";}
  else{const w=aWins?gs.names.A:gs.names.B;document.getElementById("goResult").textContent=w+" Wins!";document.getElementById("goSubtitle").textContent=aWins?gs.names.B+" has been defeated.":gs.names.A+" has been defeated.";}

  if(currentUser&&gameMode!=="boss"){
    const isWin=!tie&&aWins;
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
    await awardXP(isWin?"win":"loss");
    const xpGained=getXpForAction(isWin?"win":"loss",getCurrentLevelNum(localXP));
    const goXp=document.getElementById("goXpAward");
    if(goXp)goXp.innerHTML=`<span class="go-xp-badge">+${xpGained} XP ✨ Lv.${getCurrentLevelNum(localXP)}</span>`;
    if(!tie){if(aWins)await awardTokens(TOKENS_WIN,"Victory!");else await awardTokens(TOKENS_LOSS,"Better luck next time.");}
    else await awardTokens(TOKENS_LOSS,"Draw.");
    checkAchievements();
    if(isWin&&Math.random()<0.08)dropRandomAccessory();
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
// AUTH PARTICLES
// ══════════════════════════════════════════════
function spawnAuthParticles(){
  // Floating emoji particles disabled (change 1)
  // const container=document.getElementById("authParticles");if(!container)return;
  // ...
}

// ══════════════════════════════════════════════
// DB MIGRATION HELPER — paste this in Supabase SQL Editor
// ══════════════════════════════════════════════
// ALTER TABLE players ADD COLUMN IF NOT EXISTS clan text;
// ALTER TABLE players ADD COLUMN IF NOT EXISTS materials text;
// ALTER TABLE players ADD COLUMN IF NOT EXISTS accessories text;
// ALTER TABLE players ADD COLUMN IF NOT EXISTS equipped_accessory text;
// ALTER TABLE players ADD COLUMN IF NOT EXISTS achievements text;
// ALTER TABLE players ADD COLUMN IF NOT EXISTS stats text;
// ALTER TABLE players ADD COLUMN IF NOT EXISTS daily_quests text;
// CREATE TABLE IF NOT EXISTS trade_listings (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   seller_id text, seller_name text, weapon_name text, ask_price integer,
//   status text DEFAULT 'active', buyer_id text, buyer_name text,
//   created_at timestamptz DEFAULT now()
// );


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
    let query;
    if(lbTab==="wins")       query=await db.from("players").select("username,stats,xp").limit(50);
    else if(lbTab==="ranked")query=await db.from("players").select("username,stats,xp").limit(50);
    else if(lbTab==="level") query=await db.from("players").select("username,xp").order("xp",{ascending:false}).limit(50);
    else                     query=await db.from("players").select("username,tokens").order("tokens",{ascending:false}).limit(50);

    const {data,error}=query;
    if(error||!data){body.innerHTML+="<p class='lb-err'>Failed to load leaderboard.</p>";return;}

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
// RANKED MODE
// ══════════════════════════════════════════════
let rankedRoom=null,rankedRole=null,rankedPoll=null;

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
  try{
    // Remove any stale entry first
    await db.from("ranked_queue").delete().eq("player_id",userId);
    // Add to queue
    await db.from("ranked_queue").insert({player_id:userId,player_name:userName,rating,joined_at:new Date().toISOString()});
    // Poll for a match
    rankedPoll=setInterval(checkRankedQueue,2000);
  }catch(e){
    document.getElementById("rankedQueueStatus").textContent="Queue unavailable. Run migration.sql.";
  }
}

async function checkRankedQueue(){
  if(!currentUser)return;
  try{
    const{data}=await db.from("ranked_queue").select("*").order("joined_at",{ascending:true}).limit(10);
    if(!data||data.length<2)return;
    const me=data.find(p=>p.player_id===currentUser.id);
    if(!me)return;
    // Find closest rating opponent
    const others=data.filter(p=>p.player_id!==currentUser.id);
    if(!others.length)return;
    others.sort((a,b)=>Math.abs(a.rating-(playerStats.rankedRating||1000))-Math.abs(b.rating-(playerStats.rankedRating||1000)));
    const opponent=others[0];
    // Only the player who joined FIRST creates the room (avoid race)
    if(me.joined_at<=opponent.joined_at){
      clearInterval(rankedPoll);rankedPoll=null;
      // Remove both from queue
      await db.from("ranked_queue").delete().in("player_id",[currentUser.id,opponent.player_id]);
      // Create game room
      const code=genCode();
      const initState=freshGameState({A:currentUser.username,B:opponent.player_name});
      await db.from("game_rooms").insert({code,player_a:currentUser.id,player_a_name:currentUser.username,state:JSON.stringify(initState),status:"active",turn_status:"a_choosing",move_a:null,move_b:null,last_result:null});
      // Write match code for opponent to find
      await db.from("ranked_queue").insert({player_id:"match_"+opponent.player_id,player_name:code,rating:0,joined_at:new Date().toISOString()}).catch(()=>{});
      gameMode="ranked";rankedRoom=code;rankedRole="A";
      onlineRoom=code;onlineRole="A";
      startOnlineGame({state:JSON.stringify(initState)},"A");
      subscribeToRoom(code);startGamePoll();
    }else{
      // Wait for match code written by the other player
      const matchEntry=data.find(p=>p.player_id==="match_"+currentUser.id);
      if(matchEntry){
        clearInterval(rankedPoll);rankedPoll=null;
        await db.from("ranked_queue").delete().eq("player_id","match_"+currentUser.id);
        const code=matchEntry.player_name;
        const{data:roomData}=await db.from("game_rooms").select("*").eq("code",code).maybeSingle();
        if(roomData){
          gameMode="ranked";rankedRoom=code;rankedRole="B";
          onlineRoom=code;onlineRole="B";
          const roomState=JSON.parse(roomData.state);roomState.names.B=currentUser.username;
          await db.from("game_rooms").update({player_b:currentUser.id,player_b_name:currentUser.username,state:JSON.stringify(roomState)}).eq("code",code);
          startOnlineGame({state:JSON.stringify(roomState)},"B");
          subscribeToRoom(code);startGamePoll();
        }
      }
    }
  }catch(e){console.warn("ranked queue check error",e);}
}

async function leaveRankedQueue(){
  if(rankedPoll){clearInterval(rankedPoll);rankedPoll=null;}
  if(currentUser){try{await db.from("ranked_queue").delete().eq("player_id",currentUser.id);}catch(e){}}
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