// ══════════════════════════════════════════════
// CONFIG
// ══════════════════════════════════════════════
const SUPABASE_URL = "https://gcanfgcumemeeisvlwfx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYW5mZ2N1bWVtZWVpc3Zsd2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTU2MjEsImV4cCI6MjA5MDE3MTYyMX0.7SfvfFfguaoSi58N9cuP26I-f4qYLgIXwLseUWBnQw4";
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// ══════════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════════
const WEAPONS = [
  { name: "TNT",        emoji: "💣", dmg: 11 },
  { name: "Odachi",     emoji: "🗡️",  dmg: 11 },
  { name: "Axe",        emoji: "🪓", dmg: 10 },
  { name: "Kusarigama", emoji: "⛓️",  dmg: 10 },
  { name: "Mace",       emoji: "🔨", dmg: 9  },
  { name: "Spear",      emoji: "🔰",  dmg: 9  },
  { name: "Bow",        emoji: "🏹", dmg: 8  },
  { name: "Musket",     emoji: "🔫", dmg: 8  },
  { name: "Sword",      emoji: "⚔️",  dmg: 7  },
  { name: "Katana",     emoji: "🥷",  dmg: 7  },
  { name: "Trident",    emoji: "🔱", dmg: 6  },
  { name: "Crossbow",   emoji: "🎯", dmg: 5  },
];

const SHIELD_VALUES   = [5, 6, 7, 8, 9, 10, 11];
const MAX_HP          = 30;
const SHOTS_PER_ROUND = 6;
const TOTAL_ROUNDS    = 3;
const USERNAME_REGEX  = /^[a-zA-Z0-9_]{3,15}$/;
const SESSION_KEY     = "klocvork_session";

const TOKENS_WIN        = 10;
const TOKENS_LOSS       = 2;
const POTION_COST       = 15;
const POTION_HEAL       = 10;
const BOSS_HP_MAX       = 60;
const BOSS_TOKENS       = 20;
const SPECIAL_CHANCE    = 0.001;
const SPECIAL_WINS_NEED = 3;
const SPECIAL_TOKENS    = 30;

// ══════════════════════════════════════════════
// SESSION
// ══════════════════════════════════════════════
let currentUser = null;

function saveSession(u)  { currentUser = u; try { localStorage.setItem(SESSION_KEY, JSON.stringify(u)); } catch(e) {} }
function loadSession()   { try { const r = localStorage.getItem(SESSION_KEY); return r ? JSON.parse(r) : null; } catch(e) { return null; } }
function clearSession()  { currentUser = null; try { localStorage.removeItem(SESSION_KEY); } catch(e) {} }

// ══════════════════════════════════════════════
// TOKENS
// ══════════════════════════════════════════════
let localTokens  = 0;
let localPotions = 0;

async function loadTokenData() {
  if (!currentUser) { localTokens = 0; localPotions = 0; updateTokenDisplay(); return; }
  try {
    const { data } = await db.from("players").select("tokens, potions").eq("id", currentUser.id).maybeSingle();
    localTokens  = data?.tokens  ?? 0;
    localPotions = data?.potions ?? 0;
  } catch(e) {}
  updateTokenDisplay();
}

async function saveTokenData() {
  if (!currentUser) return;
  try { await db.from("players").update({ tokens: localTokens, potions: localPotions }).eq("id", currentUser.id); } catch(e) {}
}

function updateTokenDisplay() {
  document.querySelectorAll(".token-count").forEach(el => el.textContent = localTokens + " \uD83E\uDE99");
  document.querySelectorAll(".potion-count").forEach(el => el.textContent = localPotions + " \uD83E\uDDEA");
}

async function awardTokens(amount, reason) {
  localTokens += amount;
  updateTokenDisplay();
  await saveTokenData();
  showToast("+" + amount + " \uD83E\uDE99 " + reason, "gold");
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
  const saved = loadSession();
  if (saved) { currentUser = saved; updateUserPill(); loadTokenData(); showScreen("screen-mode"); }
});

// ══════════════════════════════════════════════
// SCREEN NAV
// ══════════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => { s.classList.remove("active"); s.style.display = ""; });
  const el = document.getElementById(id);
  el.classList.add("active");
  el.style.display = "flex";
}

// ══════════════════════════════════════════════
// RULEBOOK
// ══════════════════════════════════════════════
function showRulebook() { document.getElementById("modal-rulebook").classList.remove("hidden"); }
function hideRulebook() { document.getElementById("modal-rulebook").classList.add("hidden"); }
function closeRulebookIfOutside(e) { if (e.target === document.getElementById("modal-rulebook")) hideRulebook(); }

// ══════════════════════════════════════════════
// SHOP
// ══════════════════════════════════════════════
function showShop() { renderShopUI(); document.getElementById("modal-shop").classList.remove("hidden"); }
function hideShop() { document.getElementById("modal-shop").classList.add("hidden"); }
function closeShopIfOutside(e) { if (e.target === document.getElementById("modal-shop")) hideShop(); }

function renderShopUI() {
  document.getElementById("shopTokenBalance").textContent = localTokens;
  document.getElementById("shopPotionOwned").textContent  = localPotions;
  const btn = document.getElementById("shopBuyBtn");
  const canBuy = currentUser && localTokens >= POTION_COST && localPotions < 9;
  btn.disabled = !canBuy;
  btn.textContent = localPotions >= 9 ? "Max Potions (9)" : "Buy Potion \u2014 " + POTION_COST + " \uD83E\uDE99";
}

async function buyPotion() {
  if (!currentUser) { showToast("Sign in to buy potions!", "red"); return; }
  if (localTokens < POTION_COST) { showToast("Not enough tokens!", "red"); return; }
  if (localPotions >= 9) { showToast("Max 9 potions!", "red"); return; }
  localTokens  -= POTION_COST;
  localPotions += 1;
  updateTokenDisplay();
  await saveTokenData();
  renderShopUI();
  showToast("Potion purchased! \uD83E\uDDEA", "green");
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
  document.getElementById("authSubmitText").textContent = on ? "\u2026" : (authMode === "login" ? "Enter the Arena" : "Create Account");
}

function setAuthError(msg, ok) {
  const el = document.getElementById("authError");
  el.textContent = msg;
  el.className = ok ? "form-success" : "form-error";
}

async function signUp(username, password) {
  if (!USERNAME_REGEX.test(username)) { setAuthError("Username: 3\u201315 chars, letters/numbers/underscores only."); return; }
  if (password.length < 6) { setAuthError("Password must be at least 6 characters."); return; }
  setAuthLoading(true);
  try {
    const { data: ex } = await db.from("players").select("id").eq("username", username.toLowerCase()).maybeSingle();
    if (ex) { setAuthError("Username already taken."); return; }
    const hashed = await hashPassword(password);
    const { data, error } = await db.from("players")
      .insert({ username: username.toLowerCase(), password_hash: hashed, tokens: 0, potions: 0 })
      .select("id, username").single();
    if (error) { setAuthError("Sign up failed: " + error.message); return; }
    setAuthError("Account created! Signing you in\u2026", true);
    setTimeout(() => {
      saveSession({ id: data.id, username: data.username });
      updateUserPill(); loadTokenData(); showScreen("screen-mode");
    }, 800);
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
    updateUserPill();
    await loadTokenData();
    showScreen("screen-mode");
  } catch(e) { setAuthError("Something went wrong."); }
  finally { setAuthLoading(false); }
}

function handleAuth() {
  const u = document.getElementById("authUsername").value.trim();
  const p = document.getElementById("authPassword").value;
  if (authMode === "signup") signUp(u, p); else signIn(u, p);
}

function playAsGuest() { clearSession(); localTokens = 0; localPotions = 0; updateUserPill(); updateTokenDisplay(); showScreen("screen-mode"); }
function logout()      { clearSession(); localTokens = 0; localPotions = 0; updateUserPill(); updateTokenDisplay(); showScreen("screen-auth"); }

function updateUserPill() {
  const pill = document.getElementById("userPill");
  const btn  = document.getElementById("logoutBtn");
  if (!pill) return;
  if (currentUser) {
    pill.textContent = "\u2694 " + currentUser.username;
    if (btn) btn.style.display = "";
    const mw = document.getElementById("modeWelcome");
    if (mw) mw.textContent = "Welcome, " + currentUser.username;
  } else {
    pill.textContent = "Playing as Guest";
    if (btn) btn.style.display = "none";
  }
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

function initGame(mode, names) {
  const n = names || {
    A: currentUser ? currentUser.username : "Player A",
    B: mode === "ai" ? "The Machine" : "Player B",
  };
  gs = freshGameState(n);
  specialActive = false;
  specialGuesserNow = "A";
  renderGame();
}

// ══════════════════════════════════════════════
// BOSS BATTLE
// ══════════════════════════════════════════════
let bossHp = BOSS_HP_MAX;

function initBossGame() {
  bossHp = BOSS_HP_MAX;
  const n = { A: currentUser ? currentUser.username : "Player A", B: "Player B" };
  gs = freshGameState(n);
  renderBossGame();
}

function renderBossGame() {
  document.getElementById("gsRound").textContent = "\u2694 Boss Battle";
  document.getElementById("gsShot").textContent  = "Boss HP: " + bossHp + "/" + BOSS_HP_MAX;
  document.getElementById("hpNameA").textContent = gs.names.A;
  document.getElementById("hpNameB").textContent = gs.names.B;
  updateHPBars();
  renderAvailableWeapons();
  hideOnlineWaiting();
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
  if (bossHp === 0 && prevHp > 0) {
    killingBlow = (prevHp - dmgBossFromA) <= 0 ? "A" : "B";
  }

  showBossResult(choiceA, choiceB, bossWeapon, bossShield, dmgToA, dmgToB, dmgBossFromA, dmgBossFromB, killingBlow);
}

function showBossResult(cA, cB, bossW, bossS, dmgA, dmgB, dmgBA, dmgBB, killingBlow) {
  document.getElementById("rdNameA").textContent = gs.names.A;
  document.getElementById("rdNameB").textContent = gs.names.B;
  document.getElementById("rdWeaponA").textContent = cA.potion ? "\uD83E\uDDEA Healed" : (cA.weapon.emoji + " " + cA.weapon.name + " \u2192 " + dmgBA + " dmg to Boss");
  document.getElementById("rdWeaponB").textContent = cB.potion ? "\uD83E\uDDEA Healed" : (cB.weapon.emoji + " " + cB.weapon.name + " \u2192 " + dmgBB + " dmg to Boss");
  document.getElementById("rdShieldA").textContent = cA.potion ? "+"+POTION_HEAL+" HP" : "\uD83D\uDEE1 " + cA.shield;
  document.getElementById("rdShieldB").textContent = cB.potion ? "+"+POTION_HEAL+" HP" : "\uD83D\uDEE1 " + cB.shield;

  const eA = document.getElementById("rdDmgA");
  const eB = document.getElementById("rdDmgB");
  eA.className = (dmgA === 0 || cA.potion) ? "rd-dmg no-dmg" : "rd-dmg";
  eA.textContent = cA.potion ? "+"+POTION_HEAL+" HP \uD83E\uDDEA" : (dmgA === 0 ? "\u2746 Perfect Block!" : "\u2212"+dmgA+" HP");
  eB.className = (dmgB === 0 || cB.potion) ? "rd-dmg no-dmg" : "rd-dmg";
  eB.textContent = cB.potion ? "+"+POTION_HEAL+" HP \uD83E\uDDEA" : (dmgB === 0 ? "\u2746 Perfect Block!" : "\u2212"+dmgB+" HP");

  const hpEl  = document.getElementById("resultHpSummary");
  const nBtn  = document.getElementById("resultNextBtn");

  if (bossHp <= 0) {
    const winner = killingBlow === "A" ? gs.names.A : gs.names.B;
    hpEl.innerHTML = "\uD83C\uDFC6 " + winner + " landed the killing blow! Boss defeated!";
    nBtn.textContent = "Claim Reward \u2192";
    nBtn.onclick = () => claimBossReward(killingBlow);
  } else if (gs.hpA <= 0 && gs.hpB <= 0) {
    hpEl.innerHTML = "\uD83D\uDC80 Both players fell. Boss survives with " + bossHp + " HP.";
    nBtn.textContent = "Retreat \u2192";
    nBtn.onclick = () => showScreen("screen-mode");
  } else {
    hpEl.innerHTML = bossW.emoji + " Boss: " + bossW.name + " (Shield " + bossS + ") &nbsp;|&nbsp; Boss HP: <strong>" + bossHp + "</strong>/" + BOSS_HP_MAX + " &nbsp;|&nbsp; " + gs.names.A + ": " + gs.hpA + " HP &nbsp;|&nbsp; " + gs.names.B + ": " + gs.hpB + " HP";
    nBtn.textContent = "Next Shot \u2192";
    nBtn.onclick = nextBossShot;
  }
  showScreen("screen-result");
}

async function claimBossReward(winner) {
  if (winner === "A" && currentUser) await awardTokens(BOSS_TOKENS, "Boss Kill!");
  else if (winner === "B" && currentUser) await awardTokens(BOSS_TOKENS, "Boss Kill!");
  showScreen("screen-mode");
}

function nextBossShot() {
  gs.shot++; gs.phase = "A";
  showScreen("screen-game");
  renderBossGame();
}

// ══════════════════════════════════════════════
// RENDER (normal game)
// ══════════════════════════════════════════════
function renderGame() {
  document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "\u26A1 Sudden Death" : "Round " + gs.round + " / " + TOTAL_ROUNDS;
  document.getElementById("gsShot").textContent  = "Shot " + gs.shot + " / " + SHOTS_PER_ROUND;
  document.getElementById("hpNameA").textContent = gs.names.A;
  document.getElementById("hpNameB").textContent = gs.names.B;
  updateHPBars();
  renderAvailableWeapons();
  hideOnlineWaiting();

  // 0.1% chance special shot
  if (!specialActive && Math.random() < SPECIAL_CHANCE) {
    triggerSpecialShot();
    return;
  }

  if (gs.phase === "A") renderPlayerATurn(false);
  else renderPlayerBTurn(false);
}

function updateHPBars() {
  const pctA = Math.max(0, gs.hpA / MAX_HP * 100);
  const pctB = Math.max(0, gs.hpB / MAX_HP * 100);
  const barA = document.getElementById("hpBarA");
  const barB = document.getElementById("hpBarB");
  barA.style.width = pctA + "%";
  barB.style.width = pctB + "%";
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
    c.textContent = w.emoji + " " + w.name;
    list.appendChild(c);
  });
}

function showOnlineWaiting(msg) {
  document.getElementById("onlineWaitingText").textContent = msg || "Waiting for opponent\u2026";
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
let specialActive = false;
let specialGuesserNow = "A";
let specialHiddenWeapon = null;

function triggerSpecialShot() {
  specialActive = true;
  showToast("\u2728 SPECIAL SHOT triggered!", "gold");
  renderSpecialTurn();
}

function renderSpecialTurn() {
  specialHiddenWeapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
  const guesser   = specialGuesserNow;
  const targetName = guesser === "A" ? gs.names.B : gs.names.A;
  const meName     = guesser === "A" ? gs.names.A : gs.names.B;
  const myScore    = guesser === "A" ? gs.specialScoreA : gs.specialScoreB;
  const theirScore = guesser === "A" ? gs.specialScoreB : gs.specialScoreA;

  const panel = document.getElementById("turnPanel");
  panel.innerHTML =
    '<div class="turn-header">' +
      '<div class="turn-player-badge special-badge">\u2728 Special Shot \u2014 ' + meName + '\'s Turn</div>' +
      '<div class="turn-phase">Guess ' + targetName + '\'s hidden weapon! &nbsp; Score: ' + meName + ' <strong>' + myScore + '</strong> \u2014 ' + targetName + ' <strong>' + theirScore + '</strong> &nbsp; (first to ' + SPECIAL_WINS_NEED + ' wins \uD83E\uDE99' + SPECIAL_TOKENS + ')</div>' +
    '</div>' +
    '<div class="choice-section">' +
      '<label class="choice-label">Guess ' + targetName + '\'s Weapon</label>' +
      '<div class="weapon-grid" id="specialGuessGrid"></div>' +
    '</div>' +
    '<button class="btn-confirm" id="confirmBtn" onclick="confirmSpecialGuess()" disabled>Submit Guess \u2192</button>' +
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
  const correct  = guessed.name === specialHiddenWeapon.name;
  const guesser  = specialGuesserNow;

  if (correct) {
    if (guesser === "A") gs.specialScoreA++; else gs.specialScoreB++;
    showToast("\u2705 Correct! " + specialHiddenWeapon.emoji + " " + specialHiddenWeapon.name, "green");
  } else {
    showToast("\u274C Wrong! It was " + specialHiddenWeapon.emoji + " " + specialHiddenWeapon.name, "red");
  }

  if (gs.specialScoreA >= SPECIAL_WINS_NEED || gs.specialScoreB >= SPECIAL_WINS_NEED) {
    endSpecialRound();
    return;
  }

  // Alternate guesser
  specialGuesserNow = guesser === "A" ? "B" : "A";

  if (gameMode === "hotseat") {
    // Show pass screen so they can hand the device
    document.getElementById("passTitle").textContent    = "Pass to " + (specialGuesserNow === "A" ? gs.names.A : gs.names.B);
    document.getElementById("passSubtitle").textContent = "Next: " + (specialGuesserNow === "A" ? gs.names.A : gs.names.B) + " makes a Special Shot guess.";
    showScreen("screen-pass");
  } else {
    renderSpecialTurn();
  }
}

async function endSpecialRound() {
  const aWon = gs.specialScoreA >= SPECIAL_WINS_NEED;
  const winnerName = aWon ? gs.names.A : gs.names.B;
  showToast("\uD83C\uDFC6 " + winnerName + " wins the Special Round! +" + SPECIAL_TOKENS + " \uD83E\uDE99", "gold");
  if (aWon && currentUser) await awardTokens(SPECIAL_TOKENS, "Special Round Win!");
  gs.specialScoreA = 0; gs.specialScoreB = 0;
  specialActive = false; specialGuesserNow = "A";
  restoreTurnPanel();
  setTimeout(function() { gs.phase = "A"; renderGame(); }, 1500);
}

// ══════════════════════════════════════════════
// TURN PANEL — restore standard HTML after special shot overwrites it
// ══════════════════════════════════════════════
function restoreTurnPanel() {
  const tp = document.getElementById("turnPanel");
  if (!tp) return;
  tp.innerHTML =
    '<div class="turn-header">' +
      '<div class="turn-player-badge" id="turnBadge">Player A\'s Turn</div>' +
      '<div class="turn-phase" id="turnPhase">Choose your weapon &amp; shield</div>' +
    '</div>' +
    '<div class="choice-section">' +
      '<label class="choice-label">Your Weapon</label>' +
      '<div class="weapon-grid" id="weaponGrid"></div>' +
    '</div>' +
    '<div class="choice-section">' +
      '<label class="choice-label">Shield Points <span class="shield-hint">(5\u201311)</span></label>' +
      '<div class="shield-grid" id="shieldGrid"></div>' +
    '</div>' +
    '<div class="choice-section" id="potionRow"></div>' +
    '<button class="btn-confirm" id="confirmBtn" onclick="confirmChoice()" disabled>Confirm \u2192</button>' +
    '<p id="gameError" class="form-error"></p>';
}

// ══════════════════════════════════════════════
// PLAYER A TURN
// ══════════════════════════════════════════════
let selWeaponA = null, selShieldA = null, usingPotionA = false;

function renderPlayerATurn(isBoss) {
  selWeaponA = null; selShieldA = null; usingPotionA = false;
  const badge = document.getElementById("turnBadge");
  const phase = document.getElementById("turnPhase");
  if (badge) badge.textContent = gs.names.A + "'s Turn";
  if (phase) phase.textContent = isBoss
    ? "Choose your weapon & shield to attack the Boss!"
    : "Choose your weapon & shield \u2014 hidden from your opponent.";
  const cb = document.getElementById("confirmBtn");
  if (cb) cb.disabled = true;
  renderWeaponGrid("weaponGrid", WEAPONS, function(w) { selWeaponA = w; usingPotionA = false; checkAReady(); });
  renderShieldGrid("shieldGrid", function(v) { selShieldA = v; checkAReady(); });
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
  const badge = document.getElementById("turnBadge");
  const phase = document.getElementById("turnPhase");
  if (badge) badge.textContent = gs.names.B + "'s Turn";
  if (phase) phase.textContent = isBoss
    ? "Choose your weapon & shield to attack the Boss!"
    : "Pick your weapon &amp; shield.";
  const cb = document.getElementById("confirmBtn");
  if (cb) cb.disabled = true;
  const bAvail = isBoss ? WEAPONS : WEAPONS.filter(function(w) { return w.name !== (gs.pendingA && gs.pendingA.weapon ? gs.pendingA.weapon.name : null); });
  renderWeaponGrid("weaponGrid", bAvail, function(w) { selWeaponB = w; usingPotionB = false; checkBReady(); });
  renderShieldGrid("shieldGrid", function(v) { selShieldB = v; checkBReady(); });
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
  row.innerHTML =
    '<label class="choice-label">Potions (' + count + ' left)</label>' +
    '<button class="btn-potion" id="potionBtn' + player + '" onclick="togglePotion(\'' + player + '\')">'+
      '\uD83E\uDDEA Use Potion (+' + POTION_HEAL + ' HP)' +
    '</button>';
}

function togglePotion(player) {
  if (player === "A") {
    usingPotionA = !usingPotionA;
    if (usingPotionA) { selWeaponA = null; selShieldA = null; }
    const btn = document.getElementById("potionBtnA");
    if (btn) btn.classList.toggle("potion-active", usingPotionA);
    document.querySelectorAll("#weaponGrid .weapon-btn").forEach(function(b) { b.classList.toggle("weapon-dimmed", usingPotionA); });
    document.querySelectorAll("#shieldGrid .shield-btn").forEach(function(b) { b.classList.toggle("weapon-dimmed", usingPotionA); });
    checkAReady();
  } else {
    usingPotionB = !usingPotionB;
    if (usingPotionB) { selWeaponB = null; selShieldB = null; }
    const btn = document.getElementById("potionBtnB");
    if (btn) btn.classList.toggle("potion-active", usingPotionB);
    document.querySelectorAll("#weaponGrid .weapon-btn").forEach(function(b) { b.classList.toggle("weapon-dimmed", usingPotionB); });
    document.querySelectorAll("#shieldGrid .shield-btn").forEach(function(b) { b.classList.toggle("weapon-dimmed", usingPotionB); });
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
    const btn = document.createElement("button");
    btn.className = "weapon-btn";
    btn.innerHTML = "<span>" + w.emoji + " " + w.name + "</span><span class=\"weapon-dmg\">" + w.dmg + " dmg</span>";
    btn.onclick = function() {
      grid.querySelectorAll(".weapon-btn").forEach(function(b) { b.classList.remove("selected"); });
      btn.classList.add("selected");
      onSelect(w);
    };
    grid.appendChild(btn);
  });
}

function renderShieldGrid(gridId, onSelect) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = "";
  const weaponByVal = {};
  WEAPONS.forEach(function(w) { weaponByVal[w.dmg] = w.emoji + " " + w.name; });
  SHIELD_VALUES.forEach(function(v) {
    const btn = document.createElement("button");
    btn.className = "shield-btn";
    btn.textContent = v;
    if (weaponByVal[v]) btn.setAttribute("data-weapon", "blocks " + weaponByVal[v]);
    btn.onclick = function() {
      grid.querySelectorAll(".shield-btn").forEach(function(b) { b.classList.remove("selected"); });
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
      gs.potionsA = Math.max(0, gs.potionsA - 1);
      gs.hpA = Math.min(MAX_HP, gs.hpA + POTION_HEAL);
      localPotions = Math.max(0, localPotions - 1);
      saveTokenData();
      updateTokenDisplay();
      gs.pendingA = { weapon: null, shield: null, potion: true };
    } else {
      gs.pendingA = { weapon: selWeaponA, shield: selShieldA, potion: false };
    }

    cb.classList.add("locked-in");
    cb.textContent = usingPotionA ? "\u2713 Potion Used!" : "\u2713 Locked In!";
    setTimeout(function() { cb.classList.remove("locked-in"); cb.textContent = "Confirm \u2192"; }, 600);

    if (gameMode === "hotseat") {
      setTimeout(function() { gs.phase = "B"; showPassScreen(); }, 400);
    } else if (gameMode === "ai") {
      gs.phase = "B"; resolveAITurn();
    } else if (gameMode === "boss") {
      gs.phase = "B"; renderBossGame();
    } else if (gameMode === "online") {
      submitOnlineMoveA();
    }
  } else {
    // Phase B
    if (usingPotionB) {
      gs.potionsB = Math.max(0, gs.potionsB - 1);
      gs.hpB = Math.min(MAX_HP, gs.hpB + POTION_HEAL);
    }

    if (gameMode === "boss") {
      const cA = gs.pendingA;
      const cB = usingPotionB ? { weapon: null, shield: selShieldB, potion: true } : { weapon: selWeaponB, shield: selShieldB, potion: false };
      resolveBossShot(cA, cB);
    } else if (gameMode === "online") {
      submitOnlineMoveB();
    } else {
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
  if (specialActive) {
    // Restore panel then render special turn for the other player
    restoreTurnPanel();
    renderSpecialTurn();
    return;
  }
  if (gameMode === "boss") { renderBossGame(); return; }
  document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "\u26A1 Sudden Death" : "Round " + gs.round + " / " + TOTAL_ROUNDS;
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
  const pool = WEAPONS.filter(function(w) { return w.name !== pendingName; });
  const aiW  = pool[Math.floor(Math.random() * pool.length)];
  const aiS  = SHIELD_VALUES[Math.floor(Math.random() * SHIELD_VALUES.length)];
  resolveShot(gs.pendingA, { weapon: aiW, shield: aiS, potion: false });
}

// ══════════════════════════════════════════════
// SHOT RESOLUTION
// ══════════════════════════════════════════════
function resolveShot(choiceA, choiceB) {
  var dmgToA = 0, dmgToB = 0;
  if (!choiceA.potion && !choiceB.potion) {
    dmgToB = Math.abs(choiceB.shield - choiceA.weapon.dmg);
    dmgToA = Math.abs(choiceA.shield - choiceB.weapon.dmg);
  } else if (choiceA.potion && !choiceB.potion) {
    // A healed; B still attacks A (A's shield is undefined — take partial dmg)
    dmgToA = Math.round(choiceB.weapon.dmg / 2);
    dmgToB = 0;
  } else if (!choiceA.potion && choiceB.potion) {
    dmgToB = Math.round(choiceA.weapon.dmg / 2);
    dmgToA = 0;
  }

  // Potion HP already applied in confirmChoice
  if (!choiceA.potion) gs.hpA = Math.max(0, gs.hpA - dmgToA);
  if (!choiceB.potion) gs.hpB = Math.max(0, gs.hpB - dmgToB);

  if (choiceA.weapon && !gs.usedWeapons.includes(choiceA.weapon.name)) gs.usedWeapons.push(choiceA.weapon.name);
  if (choiceB.weapon && !gs.usedWeapons.includes(choiceB.weapon.name)) gs.usedWeapons.push(choiceB.weapon.name);

  gs.phase = "A"; gs.pendingA = null;
  showShotResult(choiceA, choiceB, dmgToA, dmgToB);
}

// ══════════════════════════════════════════════
// SHOT RESULT SCREEN
// ══════════════════════════════════════════════
function showShotResult(cA, cB, dmgA, dmgB) {
  document.getElementById("rdNameA").textContent = gs.names.A;
  document.getElementById("rdNameB").textContent = gs.names.B;

  if (cA.potion) {
    document.getElementById("rdWeaponA").textContent = "\uD83E\uDDEA Potion Used";
    document.getElementById("rdShieldA").textContent = "+" + POTION_HEAL + " HP healed";
  } else {
    document.getElementById("rdWeaponA").textContent = cA.weapon.emoji + " " + cA.weapon.name + " (" + cA.weapon.dmg + ")";
    document.getElementById("rdShieldA").textContent = "\uD83D\uDEE1 Shield: " + cA.shield;
  }
  if (cB.potion) {
    document.getElementById("rdWeaponB").textContent = "\uD83E\uDDEA Potion Used";
    document.getElementById("rdShieldB").textContent = "+" + POTION_HEAL + " HP healed";
  } else {
    document.getElementById("rdWeaponB").textContent = cB.weapon.emoji + " " + cB.weapon.name + " (" + cB.weapon.dmg + ")";
    document.getElementById("rdShieldB").textContent = "\uD83D\uDEE1 Shield: " + cB.shield;
  }

  // Clone to re-trigger animation
  var eA = document.getElementById("rdDmgA");
  var eB = document.getElementById("rdDmgB");
  [eA, eB].forEach(function(el) { var clone = el.cloneNode(true); el.parentNode.replaceChild(clone, el); });

  setTimeout(function() {
    var fa = document.getElementById("rdDmgA");
    var fb = document.getElementById("rdDmgB");
    animateDmgEl(fa, dmgA, dmgA === 0, cA.potion);
    animateDmgEl(fb, dmgB, dmgB === 0, cB.potion);
  }, 10);

  document.getElementById("resultHpSummary").textContent = gs.names.A + ": " + gs.hpA + " HP  \u00B7  " + gs.names.B + ": " + gs.hpB + " HP";
  var nBtn = document.getElementById("resultNextBtn");
  nBtn.textContent = gs.shot >= SHOTS_PER_ROUND ? "End Round \u2192" : "Next Shot \u2192";
  nBtn.onclick = nextAfterResult;
  showScreen("screen-result");
}

function animateDmgEl(el, finalVal, isPerfect, isHeal) {
  if (isHeal) { el.className = "rd-dmg no-dmg"; el.textContent = "+" + POTION_HEAL + " HP \uD83E\uDDEA"; return; }
  el.className = "rd-dmg" + (isPerfect ? " no-dmg" : "");
  if (isPerfect) { el.textContent = "\u2746 Perfect Block!"; return; }
  el.textContent = "\u22120 HP";
  var duration = 600, steps = 20, interval = duration / steps, current = 0;
  var timer = setInterval(function() {
    current = Math.min(current + Math.ceil(finalVal / steps), finalVal);
    el.textContent = "\u2212" + current + " HP";
    if (current >= finalVal) clearInterval(timer);
  }, interval);
}

function nextAfterResult() {
  if (gs.shot >= SHOTS_PER_ROUND) { endRound(); return; }
  gs.shot++; gs.phase = "A";
  if (gameMode === "online") {
    if (onlineRole === "A") {
      showScreen("screen-game"); renderGame();
      db.from("game_rooms").update({ turn_status: "a_choosing", move_a: null, move_b: null }).eq("code", onlineRoom);
    } else {
      showScreen("screen-game");
      document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "\u26A1 Sudden Death" : "Round " + gs.round + " / " + TOTAL_ROUNDS;
      document.getElementById("gsShot").textContent  = "Shot " + gs.shot + " / " + SHOTS_PER_ROUND;
      updateHPBars(); renderAvailableWeapons();
      showOnlineWaiting("Waiting for " + gs.names.A + " to choose\u2026");
    }
  } else {
    showScreen("screen-game"); renderGame();
  }
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
    if (gs.isSuddenDeath) {
      document.getElementById("roHpA").textContent = gs.hpA + " HP";
      document.getElementById("roHpB").textContent = gs.hpB + " HP";
    } else {
      document.getElementById("roHpA").textContent = gs.totalHpA + " HP total";
      document.getElementById("roHpB").textContent = gs.totalHpB + " HP total";
    }
    if (gs.totalHpA === gs.totalHpB && !gs.isSuddenDeath) {
      document.getElementById("roLabel").textContent   = "It's a Tie after 3 Rounds!";
      document.getElementById("roNextBtn").textContent = "\u26A1 Begin Sudden Death \u2192";
      showScreen("screen-roundover");
    } else { showGameOver(); }
  } else {
    document.getElementById("roHpA").textContent = gs.hpA + " HP  (total: " + gs.totalHpA + ")";
    document.getElementById("roHpB").textContent = gs.hpB + " HP  (total: " + gs.totalHpB + ")";
    document.getElementById("roLabel").textContent   = "Round " + gs.round + " Complete";
    document.getElementById("roNextBtn").textContent = "Begin Round " + (gs.round + 1) + " \u2192";
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
      db.from("game_rooms").update({ turn_status: "a_choosing", move_a: null, move_b: null }).eq("code", onlineRoom);
    } else {
      showScreen("screen-game");
      document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "\u26A1 Sudden Death" : "Round " + gs.round + " / " + TOTAL_ROUNDS;
      document.getElementById("gsShot").textContent  = "Shot " + gs.shot + " / " + SHOTS_PER_ROUND;
      updateHPBars(); renderAvailableWeapons();
      showOnlineWaiting("Waiting for " + gs.names.A + " to choose\u2026");
    }
  } else { showScreen("screen-game"); renderGame(); }
}

// ══════════════════════════════════════════════
// GAME OVER
// ══════════════════════════════════════════════
async function showGameOver() {
  var finalA = gs.totalHpA || gs.hpA;
  var finalB = gs.totalHpB || gs.hpB;
  var aWins = finalA > finalB, tie = finalA === finalB;
  document.getElementById("goEmblem").textContent   = tie ? "\uD83E\uDD1D" : "\uD83C\uDFC6";
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

  if (currentUser && gameMode !== "boss") {
    if (!tie) { if (aWins) await awardTokens(TOKENS_WIN, "Victory!"); else await awardTokens(TOKENS_LOSS, "Better luck next time."); }
    else await awardTokens(TOKENS_LOSS, "Draw.");
  }

  showScreen("screen-gameover");

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
    cleanupOnline(); restoreTurnPanel(); showScreen("screen-mode");
  }
}

// ══════════════════════════════════════════════
// ONLINE MULTIPLAYER
// ══════════════════════════════════════════════
var onlineRoom = null, onlineSub = null, onlineRole = null, lobbyPoll = null;
var lastHandledKey = "";

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
        if (stateObj) { gs.names = stateObj.names || gs.names; gs.usedWeapons = stateObj.usedWeapons || gs.usedWeapons; }
        activateBTurn();
      }
    } else if (ts === "resolved") {
      var onResult = document.getElementById("screen-result").classList.contains("active");
      if (!onResult && stateObj && data.last_result) {
        lastHandledKey = key;
        try {
          var result = JSON.parse(data.last_result);
          gs.hpA = stateObj.hpA; gs.hpB = stateObj.hpB;
          gs.usedWeapons = stateObj.usedWeapons; gs.names = stateObj.names;
          gs.round = stateObj.round; gs.shot = stateObj.shot;
          gs.isSuddenDeath = stateObj.isSuddenDeath;
          gs.totalHpA = stateObj.totalHpA || gs.totalHpA;
          gs.totalHpB = stateObj.totalHpB || gs.totalHpB;
          showShotResult(result.cA, result.cB, result.dmgA, result.dmgB);
        } catch(e) {}
      }
    }
  }

  if (onlineRole === "A") {
    if (ts === "resolved") {
      var onResultA = document.getElementById("screen-result").classList.contains("active");
      if (!onResultA && stateObj && data.last_result) {
        lastHandledKey = key;
        try {
          var resultA = JSON.parse(data.last_result);
          gs.hpA = stateObj.hpA; gs.hpB = stateObj.hpB;
          gs.usedWeapons = stateObj.usedWeapons; gs.names = stateObj.names;
          gs.round = stateObj.round; gs.shot = stateObj.shot;
          gs.isSuddenDeath = stateObj.isSuddenDeath;
          gs.totalHpA = stateObj.totalHpA || gs.totalHpA;
          gs.totalHpB = stateObj.totalHpB || gs.totalHpB;
          showShotResult(resultA.cA, resultA.cB, resultA.dmgA, resultA.dmgB);
        } catch(e) {}
      }
    }
  }
}

function cleanupOnline() {
  if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
  if (onlineSub) { onlineSub.unsubscribe(); onlineSub = null; }
  onlineRoom = null; onlineRole = null; lastHandledKey = "";
}

function genCode() { return Math.random().toString(36).substring(2,8).toUpperCase(); }

async function createRoom() {
  var code   = genCode();
  var userId = currentUser ? currentUser.id : ("guest_" + Math.random().toString(36).slice(2,8));
  var errEl  = document.getElementById("lobbyError");
  errEl.textContent = "";

  var aName     = currentUser ? currentUser.username : "Player A";
  var initState = freshGameState({ A: aName, B: "Player B" });

  var ins = await db.from("game_rooms").insert({
    code: code, player_a: userId, player_a_name: aName,
    state: JSON.stringify(initState), status: "waiting",
    turn_status: "a_choosing", move_a: null, move_b: null, last_result: null,
  });

  if (ins.error) {
    var isSM = ins.error.message && (ins.error.message.includes("last_result") || ins.error.message.includes("turn_status"));
    errEl.innerHTML = isSM ? "\u26A0\uFE0F DB schema outdated. Run <strong>migration.sql</strong> in Supabase SQL Editor, then refresh." : "Failed to create room: " + ins.error.message;
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
  var code  = document.getElementById("joinCode").value.trim().toUpperCase();
  var errEl = document.getElementById("lobbyError");
  errEl.textContent = "";
  if (!code || code.length !== 6) { errEl.textContent = "Enter a valid 6-character code."; return; }

  var res = await db.from("game_rooms").select("*").eq("code", code).maybeSingle();
  if (res.error || !res.data) { errEl.textContent = "Room not found."; return; }
  if (res.data.status !== "waiting") { errEl.textContent = "Room is already full or in progress."; return; }

  var userId    = currentUser ? currentUser.id : ("guest_" + Math.random().toString(36).slice(2,8));
  var bName     = currentUser ? currentUser.username : "Player B";
  var roomState = JSON.parse(res.data.state);
  roomState.names.B = bName;

  var ue = await db.from("game_rooms").update({
    player_b: userId, player_b_name: bName, status: "active",
    turn_status: "a_choosing", state: JSON.stringify(roomState),
  }).eq("code", code);

  if (ue.error) {
    var isSM = ue.error.message && (ue.error.message.includes("last_result") || ue.error.message.includes("turn_status"));
    errEl.innerHTML = isSM ? "\u26A0\uFE0F DB schema outdated. Run <strong>migration.sql</strong> in Supabase SQL Editor, then refresh." : "Failed to join room: " + ue.error.message;
    return;
  }

  onlineRoom = code; onlineRole = "B";
  startOnlineGame({ state: JSON.stringify(roomState) }, "B");
  subscribeToRoom(code); startGamePoll();
}

function startOnlineGame(row, role) {
  gameMode = "online";
  gs = JSON.parse(row.state);
  gs.phase = "A";
  showScreen("screen-game");
  if (role === "A") { renderGame(); }
  else {
    document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "\u26A1 Sudden Death" : "Round " + gs.round + " / " + TOTAL_ROUNDS;
    document.getElementById("gsShot").textContent  = "Shot " + gs.shot + " / " + SHOTS_PER_ROUND;
    document.getElementById("hpNameA").textContent = gs.names.A;
    document.getElementById("hpNameB").textContent = gs.names.B;
    updateHPBars(); renderAvailableWeapons();
    showOnlineWaiting("Waiting for " + gs.names.A + " to choose\u2026");
  }
}

function subscribeToRoom(code) {
  if (onlineSub) onlineSub.unsubscribe();
  onlineSub = db.channel("room_" + code)
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "game_rooms", filter: "code=eq." + code }, function() { pollTick(); })
    .subscribe();
}

async function submitOnlineMoveA() {
  var move = JSON.stringify({ weapon: selWeaponA, shield: selShieldA, potion: usingPotionA });
  var r = await db.from("game_rooms").update({ move_a: move, turn_status: "b_choosing" }).eq("code", onlineRoom);
  if (r.error) { document.getElementById("gameError").textContent = "Failed to submit move. Try again."; return; }
  showOnlineWaiting("Locked in. Waiting for " + gs.names.B + "\u2026");
}

async function submitOnlineMoveB() {
  var res = await db.from("game_rooms").select("move_a, state").eq("code", onlineRoom).maybeSingle();
  if (res.error || !res.data || !res.data.move_a) { document.getElementById("gameError").textContent = "Could not read opponent's move. Try again."; return; }

  var mA = JSON.parse(res.data.move_a);
  var cA = mA;
  var cB = usingPotionB ? { weapon: null, shield: selShieldB, potion: true } : { weapon: selWeaponB, shield: selShieldB, potion: false };

  var dmgToA = 0, dmgToB = 0;
  if (!cA.potion && !cB.potion) {
    dmgToB = Math.abs(cB.shield - cA.weapon.dmg);
    dmgToA = Math.abs(cA.shield - cB.weapon.dmg);
  } else if (cA.potion && !cB.potion) {
    dmgToA = Math.round(cB.weapon.dmg / 2); dmgToB = 0;
  } else if (!cA.potion && cB.potion) {
    dmgToB = Math.round(cA.weapon.dmg / 2); dmgToA = 0;
  }

  if (!cA.potion) gs.hpA = Math.max(0, gs.hpA - dmgToA);
  else gs.hpA = Math.min(MAX_HP, gs.hpA + POTION_HEAL);
  if (!cB.potion) gs.hpB = Math.max(0, gs.hpB - dmgToB);
  else gs.hpB = Math.min(MAX_HP, gs.hpB + POTION_HEAL);

  if (cA.weapon && !gs.usedWeapons.includes(cA.weapon.name)) gs.usedWeapons.push(cA.weapon.name);
  if (cB.weapon && !gs.usedWeapons.includes(cB.weapon.name)) gs.usedWeapons.push(cB.weapon.name);
  gs.phase = "A"; gs.pendingA = null;

  var result = { cA: cA, cB: cB, dmgA: dmgToA, dmgB: dmgToB };
  var upd = await db.from("game_rooms").update({
    move_a: null, move_b: null, turn_status: "resolved",
    state: JSON.stringify(gs), last_result: JSON.stringify(result),
  }).eq("code", onlineRoom);

  if (upd.error) { document.getElementById("gameError").textContent = "Failed to submit move. Try again."; return; }
  showShotResult(result.cA, result.cB, result.dmgA, result.dmgB);
}

function activateBTurn() {
  gs.phase = "B";
  showScreen("screen-game");
  document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "\u26A1 Sudden Death" : "Round " + gs.round + " / " + TOTAL_ROUNDS;
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