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
  { name: "Axe",      emoji: "🪓", dmg: 10 },
  { name: "Bow",      emoji: "🏹", dmg: 8  },
  { name: "Sword",    emoji: "⚔️",  dmg: 7  },
  { name: "Crossbow", emoji: "🎯", dmg: 5  },
  { name: "Trident",  emoji: "🔱", dmg: 6  },
  { name: "Mace",     emoji: "🔨", dmg: 9  },
  { name: "TNT",      emoji: "💣", dmg: 11 },
];
const SHIELD_VALUES   = [5, 6, 7, 8, 9, 10, 11];
const MAX_HP          = 30;
const SHOTS_PER_ROUND = 6;
const TOTAL_ROUNDS    = 3;
const USERNAME_REGEX  = /^[a-zA-Z0-9_]{3,15}$/;
const SESSION_KEY     = "klocvork_session";

// ══════════════════════════════════════════════
// SESSION
// ══════════════════════════════════════════════
let currentUser = null;

function saveSession(u)  { currentUser = u; try { localStorage.setItem(SESSION_KEY, JSON.stringify(u)); } catch(e) {} }
function loadSession()   { try { const r = localStorage.getItem(SESSION_KEY); return r ? JSON.parse(r) : null; } catch(e) { return null; } }
function clearSession()  { currentUser = null; try { localStorage.removeItem(SESSION_KEY); } catch(e) {} }

// ══════════════════════════════════════════════
// PASSWORD HASHING (SHA-256 + salt)
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
  if (saved) { currentUser = saved; updateUserPill(); showScreen("screen-mode"); }
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
// RULEBOOK — IDs match index.html "modal-rulebook"
// ══════════════════════════════════════════════
function showRulebook() { document.getElementById("modal-rulebook").classList.remove("hidden"); }
function hideRulebook() { document.getElementById("modal-rulebook").classList.add("hidden"); }
function closeRulebookIfOutside(e) { if (e.target === document.getElementById("modal-rulebook")) hideRulebook(); }

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

function setAuthError(msg, ok = false) {
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
      .insert({ username: username.toLowerCase(), password_hash: hashed })
      .select("id, username").single();
    if (error) { setAuthError("Sign up failed: " + error.message); return; }
    setAuthError("Account created! Signing you in…", true);
    setTimeout(() => { saveSession({ id: data.id, username: data.username }); updateUserPill(); showScreen("screen-mode"); }, 800);
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
    showScreen("screen-mode");
  } catch(e) { setAuthError("Something went wrong."); }
  finally { setAuthLoading(false); }
}

function handleAuth() {
  const u = document.getElementById("authUsername").value.trim();
  const p = document.getElementById("authPassword").value;
  if (authMode === "signup") signUp(u, p); else signIn(u, p);
}

function playAsGuest() { clearSession(); updateUserPill(); showScreen("screen-mode"); }
function logout()      { clearSession(); updateUserPill(); showScreen("screen-auth"); }

function updateUserPill() {
  const pill = document.getElementById("userPill");
  const btn  = document.getElementById("logoutBtn");
  if (!pill) return;
  if (currentUser) {
    pill.textContent = `⚔ ${currentUser.username}`;
    if (btn) btn.style.display = "";
    const mw = document.getElementById("modeWelcome");
    if (mw) mw.textContent = `Welcome, ${currentUser.username}`;
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
  if (mode === "online") { showScreen("screen-lobby"); }
  else { initGame(mode); showScreen("screen-game"); }
}

// ══════════════════════════════════════════════
// GAME STATE
// ══════════════════════════════════════════════
let gs = {};

function freshGameState(names) {
  return {
    hpA: MAX_HP, hpB: MAX_HP,
    round: 1, shot: 1,
    phase: "A",
    usedWeapons: [],
    pendingA: null,
    isSuddenDeath: false,
    names: names || { A: "Player A", B: "Player B" },
    totalHpA: 0, totalHpB: 0, // cumulative HP remaining after each round
  };
}

function initGame(mode, names) {
  const n = names || {
    A: currentUser ? currentUser.username : "Player A",
    B: mode === "ai" ? "The Machine" : "Player B",
  };
  gs = freshGameState(n);
  renderGame();
}

// ══════════════════════════════════════════════
// RENDER
// ══════════════════════════════════════════════
function renderGame() {
  document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "⚡ Sudden Death" : `Round ${gs.round} / ${TOTAL_ROUNDS}`;
  document.getElementById("gsShot").textContent  = `Shot ${gs.shot} / ${SHOTS_PER_ROUND}`;
  document.getElementById("hpNameA").textContent = gs.names.A;
  document.getElementById("hpNameB").textContent = gs.names.B;
  updateHPBars();
  renderAvailableWeapons();
  hideOnlineWaiting();
  if (gs.phase === "A") renderPlayerATurn();
  else renderPlayerBTurn();
}

// BUG FIX: both HP bars get dynamic color
function updateHPBars() {
  const pctA = Math.max(0, gs.hpA / MAX_HP * 100);
  const pctB = Math.max(0, gs.hpB / MAX_HP * 100);
  const barA = document.getElementById("hpBarA");
  const barB = document.getElementById("hpBarB");
  barA.style.width = pctA + "%";
  barB.style.width = pctB + "%";
  document.getElementById("hpNumA").textContent = gs.hpA;
  document.getElementById("hpNumB").textContent = gs.hpB;
  // A bar: green=healthy, yellow=warning, red=critical
  barA.style.background = pctA > 50 ? "var(--green)" : pctA > 25 ? "#facc15" : "var(--red)";
  barA.style.boxShadow  = pctA > 50 ? "0 0 8px var(--green-glow)" : pctA > 25 ? "0 0 8px rgba(250,204,21,0.3)" : "0 0 8px var(--red-glow)";
  // B bar same logic
  barB.style.background = pctB > 50 ? "var(--green)" : pctB > 25 ? "#facc15" : "var(--red)";
  barB.style.boxShadow  = pctB > 50 ? "0 0 8px var(--green-glow)" : pctB > 25 ? "0 0 8px rgba(250,204,21,0.3)" : "0 0 8px var(--red-glow)";
}

function renderAvailableWeapons() {
  const list = document.getElementById("availableWeaponsList");
  list.innerHTML = "";
  WEAPONS.forEach(w => {
    const c = document.createElement("span");
    c.className = "aw-chip" + (gs.usedWeapons.includes(w.name) ? " used" : "");
    c.textContent = `${w.emoji} ${w.name}`;
    list.appendChild(c);
  });
}

function getAvailableWeapons() { return WEAPONS.filter(w => !gs.usedWeapons.includes(w.name)); }

// Online waiting overlay
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
// PLAYER A TURN
// ══════════════════════════════════════════════
let selWeaponA = null, selShieldA = null;

function renderPlayerATurn() {
  selWeaponA = null; selShieldA = null;
  document.getElementById("turnBadge").textContent = `${gs.names.A}'s Turn`;
  document.getElementById("turnPhase").textContent = "Choose your weapon & shield — hidden from your opponent.";
  // BUG FIX 3: always hide guessSection on A's turn
  document.getElementById("guessSection").classList.add("hidden");
  document.getElementById("confirmBtn").disabled = true;
  renderWeaponGrid("weaponGrid", getAvailableWeapons(), w => { selWeaponA = w; checkAReady(); });
  renderShieldGrid("shieldGrid", v => { selShieldA = v; checkAReady(); });
}
function checkAReady() { document.getElementById("confirmBtn").disabled = !(selWeaponA && selShieldA !== null); }

// ══════════════════════════════════════════════
// PLAYER B TURN
// BUG FIX 3: weaponGrid = B's weapon (available only)
//            guessGrid  = B's guess at A's weapon (all 7, shown in guessSection)
//            These are separate grids — no double row.
// ══════════════════════════════════════════════
let selWeaponB = null, selShieldB = null, selGuessB = null;

function renderPlayerBTurn() {
  selWeaponB = null; selShieldB = null; selGuessB = null;
  document.getElementById("turnBadge").textContent = `${gs.names.B}'s Turn`;
  document.getElementById("turnPhase").textContent = "Guess your opponent's weapon, then pick yours & your shield.";
  document.getElementById("guessSection").classList.remove("hidden");
  document.getElementById("confirmBtn").disabled = true;
  // guessGrid always shows ALL 7 weapons (opponent could have picked any, including "used" ones from prior shots)
  renderWeaponGrid("guessGrid",  WEAPONS,               w => { selGuessB  = w; checkBReady(); });
  // weaponGrid shows only available (unused) weapons for B's own pick
  renderWeaponGrid("weaponGrid", getAvailableWeapons(), w => { selWeaponB = w; checkBReady(); });
  renderShieldGrid("shieldGrid", v => { selShieldB = v; checkBReady(); });

  // Visual hint: mark guess grid weapons that are already used this round
  const guessGrid = document.getElementById("guessGrid");
  guessGrid.querySelectorAll(".weapon-btn").forEach(btn => {
    const wName = btn.querySelector("span")?.textContent?.split(" ").slice(1).join(" ");
    if (gs.usedWeapons.includes(wName)) {
      btn.style.opacity = "0.55";
      btn.title = "Already used this round — but you can still guess it";
    }
  });
}
function checkBReady() { document.getElementById("confirmBtn").disabled = !(selWeaponB && selShieldB !== null && selGuessB); }

// ══════════════════════════════════════════════
// GRID BUILDERS
// ══════════════════════════════════════════════
function renderWeaponGrid(gridId, weapons, onSelect) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = "";
  weapons.forEach(w => {
    const btn = document.createElement("button");
    btn.className = "weapon-btn";
    btn.innerHTML = `<span>${w.emoji} ${w.name}</span><span class="weapon-dmg">${w.dmg} dmg</span>`;
    btn.onclick = () => {
      grid.querySelectorAll(".weapon-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      onSelect(w);
    };
    grid.appendChild(btn);
  });
}

function renderShieldGrid(gridId, onSelect) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = "";
  SHIELD_VALUES.forEach(v => {
    const btn = document.createElement("button");
    btn.className = "shield-btn";
    btn.textContent = v;
    btn.onclick = () => {
      grid.querySelectorAll(".shield-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      onSelect(v);
    };
    grid.appendChild(btn);
  });
}

// ══════════════════════════════════════════════
// CONFIRM CHOICE
// BUG FIX 2: online Player A — don't set gs.phase="B" locally.
// Just submit the move and show waiting. DB drives the transition.
// ══════════════════════════════════════════════
function confirmChoice() {
  if (gs.phase === "A") {
    gs.pendingA = { weapon: selWeaponA, shield: selShieldA };
    if (gameMode === "hotseat") {
      gs.phase = "B";
      showPassScreen();
    } else if (gameMode === "ai") {
      gs.phase = "B";
      resolveAITurn();
    } else if (gameMode === "online") {
      submitOnlineMoveA(); // phase stays "A" locally; DB drives transition
    }
  } else {
    if (gameMode === "online") submitOnlineMoveB();
    else resolveShot(gs.pendingA, { weapon: selWeaponB, shield: selShieldB }, selGuessB);
  }
}

// ══════════════════════════════════════════════
// PASS SCREEN (hot seat)
// ══════════════════════════════════════════════
function showPassScreen() {
  document.getElementById("passTitle").textContent    = `Pass to ${gs.names.B}`;
  document.getElementById("passSubtitle").textContent = `${gs.names.A} has locked their choice. Hand the device to ${gs.names.B}.`;
  showScreen("screen-pass");
}

function continueAfterPass() {
  showScreen("screen-game");
  document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "⚡ Sudden Death" : `Round ${gs.round} / ${TOTAL_ROUNDS}`;
  document.getElementById("gsShot").textContent  = `Shot ${gs.shot} / ${SHOTS_PER_ROUND}`;
  document.getElementById("hpNameA").textContent = gs.names.A;
  document.getElementById("hpNameB").textContent = gs.names.B;
  updateHPBars();
  renderAvailableWeapons();
  // BUG FIX 3: call renderPlayerBTurn directly — never renderGame here
  renderPlayerBTurn();
}

// ══════════════════════════════════════════════
// AI TURN
// ══════════════════════════════════════════════
function resolveAITurn() {
  const avail = getAvailableWeapons();
  const notA  = avail.filter(w => w.name !== gs.pendingA.weapon.name);
  const pool  = notA.length > 0 ? notA : avail;
  const aiW   = pool[Math.floor(Math.random() * pool.length)];
  const aiS   = SHIELD_VALUES[Math.floor(Math.random() * SHIELD_VALUES.length)];
  const aiG   = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
  resolveShot(gs.pendingA, { weapon: aiW, shield: aiS }, aiG);
}

// ══════════════════════════════════════════════
// SHOT RESOLUTION
// ══════════════════════════════════════════════
function resolveShot(choiceA, choiceB, guessB) {
  const dmgToB = Math.abs(choiceB.shield - choiceA.weapon.dmg);
  const dmgToA = Math.abs(choiceA.shield - choiceB.weapon.dmg);
  gs.hpA = Math.max(0, gs.hpA - dmgToA);
  gs.hpB = Math.max(0, gs.hpB - dmgToB);
  if (!gs.usedWeapons.includes(choiceA.weapon.name)) gs.usedWeapons.push(choiceA.weapon.name);
  if (!gs.usedWeapons.includes(choiceB.weapon.name)) gs.usedWeapons.push(choiceB.weapon.name);
  gs.phase = "A";
  gs.pendingA = null;
  showShotResult(choiceA, choiceB, dmgToA, dmgToB, guessB, guessB && guessB.name === choiceA.weapon.name);
}

// ══════════════════════════════════════════════
// SHOT RESULT SCREEN
// ══════════════════════════════════════════════
function showShotResult(cA, cB, dmgA, dmgB, guessB, correct) {
  document.getElementById("rdNameA").textContent   = gs.names.A;
  document.getElementById("rdNameB").textContent   = gs.names.B;
  document.getElementById("rdWeaponA").textContent = `${cA.weapon.emoji} ${cA.weapon.name} (${cA.weapon.dmg})`;
  document.getElementById("rdWeaponB").textContent = `${cB.weapon.emoji} ${cB.weapon.name} (${cB.weapon.dmg})`;
  document.getElementById("rdShieldA").textContent = `🛡 Shield: ${cA.shield}`;
  document.getElementById("rdShieldB").textContent = `🛡 Shield: ${cB.shield}`;

  const eA = document.getElementById("rdDmgA");
  const eB = document.getElementById("rdDmgB");
  eA.textContent = dmgA === 0 ? "✦ Perfect Block!" : `−${dmgA} HP`;
  eB.textContent = dmgB === 0 ? "✦ Perfect Block!" : `−${dmgB} HP`;
  eA.className = "rd-dmg" + (dmgA === 0 ? " no-dmg" : "");
  eB.className = "rd-dmg" + (dmgB === 0 ? " no-dmg" : "");

  const gEl = document.getElementById("resultGuess");
  if (guessB) {
    gEl.textContent = correct
      ? `✅ ${gs.names.B} guessed correctly! (${guessB.emoji} ${guessB.name})`
      : `❌ ${gs.names.B} guessed ${guessB.emoji} ${guessB.name} — it was ${cA.weapon.emoji} ${cA.weapon.name}`;
  } else { gEl.textContent = ""; }

  document.getElementById("resultHpSummary").textContent = `${gs.names.A}: ${gs.hpA} HP  ·  ${gs.names.B}: ${gs.hpB} HP`;
  document.getElementById("resultNextBtn").textContent   = gs.shot >= SHOTS_PER_ROUND ? "End Round →" : "Next Shot →";
  showScreen("screen-result");
}

function nextAfterResult() {
  if (gs.shot >= SHOTS_PER_ROUND) { endRound(); }
  else {
    gs.shot++; gs.phase = "A";
    if (gameMode === "online") {
      if (onlineRole === "A") {
        showScreen("screen-game");
        renderGame();
        // Reset turn_status FIRST, then start polling — prevents stale "resolved" re-triggering result screen
        db.from("game_rooms").update({ turn_status: "a_choosing", move_a: null, move_b: null }).eq("code", onlineRoom)
          .then(() => startAPolling());
      } else {
        // B: show waiting without rendering turn panel
        bTurnReady = false; // must see a_choosing again before acting
        showScreen("screen-game");
        document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "⚡ Sudden Death" : `Round ${gs.round} / ${TOTAL_ROUNDS}`;
        document.getElementById("gsShot").textContent  = `Shot ${gs.shot} / ${SHOTS_PER_ROUND}`;
        document.getElementById("hpNameA").textContent = gs.names.A;
        document.getElementById("hpNameB").textContent = gs.names.B;
        updateHPBars();
        renderAvailableWeapons();
        showOnlineWaiting("Waiting for " + gs.names.A + " to choose…");
        startBPolling();
      }
    } else {
      showScreen("screen-game");
      renderGame();
    }
  }
}

// ══════════════════════════════════════════════
// ROUND END
// ══════════════════════════════════════════════
function endRound() {
  // Accumulate HP remaining this round into totals
  gs.totalHpA = (gs.totalHpA || 0) + gs.hpA;
  gs.totalHpB = (gs.totalHpB || 0) + gs.hpB;

  const lastRound = (gs.round >= TOTAL_ROUNDS && !gs.isSuddenDeath) || gs.isSuddenDeath;

  document.getElementById("roNameA").textContent = gs.names.A;
  document.getElementById("roNameB").textContent = gs.names.B;

  if (lastRound) {
    if (gs.isSuddenDeath) {
      // Sudden death: winner is whoever had more HP this round
      document.getElementById("roHpA").textContent = `${gs.hpA} HP`;
      document.getElementById("roHpB").textContent = `${gs.hpB} HP`;
    } else {
      // Show cumulative totals on final round
      document.getElementById("roHpA").textContent = `${gs.totalHpA} HP total`;
      document.getElementById("roHpB").textContent = `${gs.totalHpB} HP total`;
    }

    if (gs.totalHpA === gs.totalHpB && !gs.isSuddenDeath) {
      document.getElementById("roLabel").textContent   = "It's a Tie after 3 Rounds!";
      document.getElementById("roNextBtn").textContent = "⚡ Begin Sudden Death →";
      showScreen("screen-roundover");
    } else {
      showGameOver();
    }
  } else {
    document.getElementById("roHpA").textContent = `${gs.hpA} HP  (total: ${gs.totalHpA})`;
    document.getElementById("roHpB").textContent = `${gs.hpB} HP  (total: ${gs.totalHpB})`;
    document.getElementById("roLabel").textContent   = `Round ${gs.round} Complete`;
    document.getElementById("roNextBtn").textContent = `Begin Round ${gs.round + 1} →`;
    showScreen("screen-roundover");
  }
}

function startNextRound() {
  if (gs.totalHpA === gs.totalHpB && gs.round >= TOTAL_ROUNDS) gs.isSuddenDeath = true;
  else gs.round++;
  // Reset HP to full for each new round; totals are preserved in totalHpA/totalHpB
  gs.hpA = MAX_HP; gs.hpB = MAX_HP;
  gs.shot = 1; gs.phase = "A"; gs.usedWeapons = []; gs.pendingA = null;
  if (gameMode === "online") {
    if (onlineRole === "A") {
      showScreen("screen-game");
      renderGame();
      // Update DB first, then start polling — prevents stale "resolved" re-triggering result screen
      db.from("game_rooms").update({ turn_status: "a_choosing", move_a: null, move_b: null }).eq("code", onlineRoom)
        .then(() => startAPolling());
    } else {
      showScreen("screen-game");
      bTurnReady = false; // must see a_choosing again before acting
      document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "⚡ Sudden Death" : `Round ${gs.round} / ${TOTAL_ROUNDS}`;
      document.getElementById("gsShot").textContent  = `Shot ${gs.shot} / ${SHOTS_PER_ROUND}`;
      document.getElementById("hpNameA").textContent = gs.names.A;
      document.getElementById("hpNameB").textContent = gs.names.B;
      updateHPBars();
      renderAvailableWeapons();
      showOnlineWaiting("Waiting for " + gs.names.A + " to choose…");
      startBPolling();
    }
  } else {
    showScreen("screen-game");
    renderGame();
  }
}

// ══════════════════════════════════════════════
// GAME OVER
// ══════════════════════════════════════════════
function showGameOver() {
  // Winner is determined by cumulative HP across all rounds
  const finalA = gs.totalHpA || gs.hpA;
  const finalB = gs.totalHpB || gs.hpB;
  const aWins = finalA > finalB, tie = finalA === finalB;
  document.getElementById("goEmblem").textContent   = tie ? "🤝" : "🏆";
  document.getElementById("goNameA").textContent    = gs.names.A;
  document.getElementById("goNameB").textContent    = gs.names.B;
  document.getElementById("goHpA").textContent      = gs.isSuddenDeath ? `${gs.hpA} HP` : `${gs.totalHpA || gs.hpA} HP total`;
  document.getElementById("goHpB").textContent      = gs.isSuddenDeath ? `${gs.hpB} HP` : `${gs.totalHpB || gs.hpB} HP total`;
  if (tie) {
    document.getElementById("goResult").textContent   = "It's a Draw!";
    document.getElementById("goSubtitle").textContent = "Both warriors fought with equal fury.";
  } else {
    const w = aWins ? gs.names.A : gs.names.B;
    document.getElementById("goResult").textContent   = `${w} Wins!`;
    document.getElementById("goSubtitle").textContent = aWins ? `${gs.names.B} has been defeated.` : `${gs.names.A} has been defeated.`;
  }
  showScreen("screen-gameover");
}

function playAgain() { initGame(gameMode); showScreen("screen-game"); }

function confirmQuit() {
  if (confirm("Quit and return to the menu?")) {
    cleanupOnline();
    showScreen("screen-mode");
  }
}

// ══════════════════════════════════════════════
// ONLINE MULTIPLAYER
// ══════════════════════════════════════════════
let onlineRoom = null, onlineSub = null, onlineRole = null, lobbyPoll = null;
let bTurnReady = false; // set true only after we see turn_status=a_choosing post-join

// ── Polling for Player B: watches for b_choosing and resolved ──
// seenAChoosing prevents acting on a stale "resolved" from the previous shot
function startBPolling() {
  if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
  let seenAChoosing = false;
  lobbyPoll = setInterval(async () => {
    if (!onlineRoom) { clearInterval(lobbyPoll); lobbyPoll = null; return; }
    const { data } = await db.from("game_rooms")
      .select("turn_status, state, last_result")
      .eq("code", onlineRoom).maybeSingle();
    if (!data) return;

    if (data.turn_status === "a_choosing") {
      seenAChoosing = true; // mark that the new shot cycle has begun
      return;
    }

    if (data.turn_status === "b_choosing" && seenAChoosing) {
      clearInterval(lobbyPoll); lobbyPoll = null;
      if (!document.getElementById("onlineWaitingOverlay").classList.contains("hidden")) {
        if (data.state) { try { const s = JSON.parse(data.state); gs.names = s.names || gs.names; } catch(e) {} }
        activateBTurn();
      }
      return;
    }

    if (data.turn_status === "resolved" && seenAChoosing) {
      clearInterval(lobbyPoll); lobbyPoll = null;
      const onResult = document.getElementById("screen-result").classList.contains("active");
      if (!onResult) {
        try {
          const newGs = JSON.parse(data.state);
          const result = JSON.parse(data.last_result);
          gs.hpA = newGs.hpA; gs.hpB = newGs.hpB;
          gs.usedWeapons = newGs.usedWeapons; gs.names = newGs.names;
          gs.round = newGs.round; gs.shot = newGs.shot; gs.isSuddenDeath = newGs.isSuddenDeath;
          showShotResult(result.cA, result.cB, result.dmgA, result.dmgB, result.guessB, result.correct);
        } catch(e) {}
      }
    }
  }, 2000);
}

// ── Polling for Player A: watches for resolved shots after game starts ──
function startAPolling() {
  if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
  // Snapshot the shot number at poll-start; only act on "resolved" for THIS shot
  const pollingShotSnapshot = gs.shot;
  // Brief delay so DB update to a_choosing propagates before we start reading
  setTimeout(() => {
    if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
    lobbyPoll = setInterval(async () => {
      if (!onlineRoom) { clearInterval(lobbyPoll); lobbyPoll = null; return; }
      const { data } = await db.from("game_rooms")
        .select("turn_status, state, last_result")
        .eq("code", onlineRoom).maybeSingle();
      if (!data) return;

      if (data.turn_status === "resolved") {
        const onResult = document.getElementById("screen-result").classList.contains("active");
        if (!onResult) {
          try {
            const newGs = JSON.parse(data.state);
            // Only handle if it matches the shot we're waiting on
            if (newGs.shot !== pollingShotSnapshot) return;
            const result = JSON.parse(data.last_result);
            gs.hpA = newGs.hpA; gs.hpB = newGs.hpB;
            gs.usedWeapons = newGs.usedWeapons; gs.names = newGs.names;
            gs.round = newGs.round; gs.shot = newGs.shot; gs.isSuddenDeath = newGs.isSuddenDeath;
            clearInterval(lobbyPoll); lobbyPoll = null;
            showShotResult(result.cA, result.cB, result.dmgA, result.dmgB, result.guessB, result.correct);
          } catch(e) {}
        }
      }
    }, 2000);
  }, 600);
}

function cleanupOnline() {
  if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
  if (onlineSub) { onlineSub.unsubscribe(); onlineSub = null; }
  onlineRoom = null; onlineRole = null; bTurnReady = false;
}

function genCode() { return Math.random().toString(36).substring(2,8).toUpperCase(); }

async function createRoom() {
  const code   = genCode();
  const userId = currentUser?.id || ("guest_" + Math.random().toString(36).slice(2,8));
  const errEl  = document.getElementById("lobbyError");
  errEl.textContent = "";

  const aName     = currentUser ? currentUser.username : "Player A";
  const initState = freshGameState({ A: aName, B: "Player B" });

  const { error } = await db.from("game_rooms").insert({
    code,
    player_a:      userId,
    player_a_name: aName,
    state:         JSON.stringify(initState),
    status:        "waiting",
    turn_status:   "a_choosing",
    move_a:        null,
    move_b:        null,
    last_result:   null,
  });

  if (error) {
    const isSchemaMissing = error.message?.includes('last_result') || error.message?.includes('turn_status');
    errEl.innerHTML = isSchemaMissing
      ? '⚠️ DB schema outdated. Run <strong>migration.sql</strong> in Supabase SQL Editor, then refresh.'
      : 'Failed to create room: ' + error.message;
    return;
  }

  onlineRoom = code; onlineRole = "A";
  document.getElementById("roomCodeDisplay").textContent = code;
  document.getElementById("lobbyCreate").classList.add("hidden");
  document.getElementById("lobbyWaiting").classList.remove("hidden");
  subscribeToRoom(code);

  // Polling fallback for Player A — handles: room activation + resolved shots
  lobbyPoll = setInterval(async () => {
    const { data } = await db.from("game_rooms")
      .select("status, turn_status, state, last_result")
      .eq("code", code).maybeSingle();
    if (!data) return;

    if (data.status === "active" && !document.getElementById("screen-game").classList.contains("active")) {
      clearInterval(lobbyPoll); lobbyPoll = null;
      startOnlineGame(data, "A");
      // Start a persistent poll for A throughout the game
      startAPolling();
      return;
    }
    if (data.turn_status === "resolved") {
      clearInterval(lobbyPoll); lobbyPoll = null;
      const onResult = document.getElementById("screen-result").classList.contains("active");
      if (!onResult) {
        try {
          const newGs = JSON.parse(data.state);
          const result = JSON.parse(data.last_result);
          gs.hpA = newGs.hpA; gs.hpB = newGs.hpB;
          gs.usedWeapons = newGs.usedWeapons; gs.names = newGs.names;
          gs.round = newGs.round; gs.shot = newGs.shot; gs.isSuddenDeath = newGs.isSuddenDeath;
          showShotResult(result.cA, result.cB, result.dmgA, result.dmgB, result.guessB, result.correct);
        } catch(e) {}
      }
    }
  }, 2500);
}

async function joinRoom() {
  const code  = document.getElementById("joinCode").value.trim().toUpperCase();
  const errEl = document.getElementById("lobbyError");
  errEl.textContent = "";
  if (!code || code.length !== 6) { errEl.textContent = "Enter a valid 6-character code."; return; }

  const { data, error } = await db.from("game_rooms").select("*").eq("code", code).maybeSingle();
  if (error || !data) { errEl.textContent = "Room not found."; return; }
  if (data.status !== "waiting") { errEl.textContent = "Room is already full or in progress."; return; }

  const userId    = currentUser?.id || ("guest_" + Math.random().toString(36).slice(2,8));
  const bName     = currentUser ? currentUser.username : "Player B";
  const roomState = JSON.parse(data.state);
  roomState.names.B = bName;

  const { error: ue } = await db.from("game_rooms").update({
    player_b:      userId,
    player_b_name: bName,
    status:        "active",
    turn_status:   "a_choosing",
    state:         JSON.stringify(roomState),
  }).eq("code", code);

  if (ue) {
    const isSchemaMissing = ue.message?.includes('last_result') || ue.message?.includes('turn_status');
    errEl.innerHTML = isSchemaMissing
      ? '⚠️ DB schema outdated. Run <strong>migration.sql</strong> in Supabase SQL Editor, then refresh.'
      : 'Failed to join room: ' + ue.message;
    return;
  }

  onlineRoom = code; onlineRole = "B";
  bTurnReady = true; // room starts as a_choosing, so B is ready for the first shot
  startOnlineGame({ state: JSON.stringify(roomState) }, "B");
  subscribeToRoom(code); // subscribe AFTER onlineRole is set

  // Persistent polling fallback for B throughout the game
  startBPolling();
}

// ══════════════════════════════════════════════
// ONLINE STATE MACHINE
// ══════════════════════════════════════════════
// turn_status values:
//   "a_choosing"   → A's turn; B waits
//   "b_choosing"   → B's turn; A waits
//   "resolved"     → shot result written into state; both show result screen
// ══════════════════════════════════════════════

function startOnlineGame(row, role) {
  gameMode = "online";
  gs = JSON.parse(row.state);
  gs.phase = "A";
  showScreen("screen-game");
  if (role === "A") {
    renderGame();
  } else {
    // B: just update status bar and HP — do NOT render turn panel
    document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "⚡ Sudden Death" : `Round ${gs.round} / ${TOTAL_ROUNDS}`;
    document.getElementById("gsShot").textContent  = `Shot ${gs.shot} / ${SHOTS_PER_ROUND}`;
    document.getElementById("hpNameA").textContent = gs.names.A;
    document.getElementById("hpNameB").textContent = gs.names.B;
    updateHPBars();
    renderAvailableWeapons();
    showOnlineWaiting("Waiting for " + gs.names.A + " to choose…");
  }
}

function subscribeToRoom(code) {
  if (onlineSub) onlineSub.unsubscribe();
  onlineSub = db.channel("room_" + code)
    .on("postgres_changes", {
      event: "UPDATE", schema: "public", table: "game_rooms", filter: `code=eq.${code}`
    }, payload => handleOnlineUpdate(payload.new))
    .subscribe();
}

// Unified handler — driven entirely by turn_status field
function handleOnlineUpdate(row) {
  if (!onlineRole) return; // not in a game yet (lobby)

  const ts = row.turn_status;

  // ── Room just became active → start Player A ──
  if (row.status === "active" && onlineRole === "A" && ts === "a_choosing") {
    if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
    if (!document.getElementById("screen-game").classList.contains("active")) {
      startOnlineGame(row, "A");
      startAPolling();
    }
    return;
  }

  // ── A locked in → B's turn ──
  if (ts === "b_choosing" && onlineRole === "B" && bTurnReady) {
    if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
    if (!document.getElementById("onlineWaitingOverlay").classList.contains("hidden")) {
      if (row.state) { try { const s = JSON.parse(row.state); gs.names = s.names || gs.names; } catch(e) {} }
      activateBTurn();
    }
    return;
  }

  // Track when A's turn begins so we know B's turn is valid next
  if (ts === "a_choosing" && onlineRole === "B") {
    bTurnReady = true;
    return;
  }

  // ── Shot resolved → show result on BOTH devices ──
  if (ts === "resolved" && (onlineRole === "A" || bTurnReady)) {
    if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
    // Only process if we're still waiting (not already on result screen)
    const onResult = document.getElementById("screen-result").classList.contains("active");
    if (!onResult) {
      try {
        const newGs = JSON.parse(row.state);
        const result = JSON.parse(row.last_result);
        // Guard: if the resolved state's shot is behind what we already have, skip it (stale event)
        if (newGs.shot < gs.shot) return;
        // Sync the full game state from DB
        gs.hpA = newGs.hpA; gs.hpB = newGs.hpB;
        gs.usedWeapons = newGs.usedWeapons;
        gs.names = newGs.names;
        gs.round = newGs.round; gs.shot = newGs.shot;
        gs.isSuddenDeath = newGs.isSuddenDeath;
        showShotResult(result.cA, result.cB, result.dmgA, result.dmgB, result.guessB, result.correct);
      } catch(e) { console.error("Failed to parse resolved state", e); }
    }
    return;
  }
}

async function submitOnlineMoveA() {
  const move = JSON.stringify({ weapon: selWeaponA, shield: selShieldA });
  // Write move_a and advance turn_status to b_choosing
  const { error } = await db.from("game_rooms")
    .update({ move_a: move, turn_status: "b_choosing" })
    .eq("code", onlineRoom);
  if (error) { document.getElementById("gameError").textContent = "Failed to submit move. Try again."; return; }
  showOnlineWaiting("Locked in. Waiting for " + gs.names.B + "…");
}

async function submitOnlineMoveB() {
  // Read move_a, compute result, write everything atomically
  const { data, error: fetchErr } = await db.from("game_rooms")
    .select("move_a, state")
    .eq("code", onlineRoom)
    .maybeSingle();
  if (fetchErr || !data?.move_a) {
    document.getElementById("gameError").textContent = "Could not read opponent's move. Try again.";
    return;
  }

  const mA = JSON.parse(data.move_a);
  const choiceB = { weapon: selWeaponB, shield: selShieldB };
  const guessB  = selGuessB;

  // Compute damage
  const dmgToB = Math.abs(choiceB.shield - mA.weapon.dmg);
  const dmgToA = Math.abs(mA.shield - choiceB.weapon.dmg);
  const correct = guessB && guessB.name === mA.weapon.name;

  // Advance local game state
  gs.hpA = Math.max(0, gs.hpA - dmgToA);
  gs.hpB = Math.max(0, gs.hpB - dmgToB);
  if (!gs.usedWeapons.includes(mA.weapon.name))       gs.usedWeapons.push(mA.weapon.name);
  if (!gs.usedWeapons.includes(choiceB.weapon.name))  gs.usedWeapons.push(choiceB.weapon.name);
  gs.phase    = "A";
  gs.pendingA = null;

  const result = { cA: mA, cB: { weapon: choiceB.weapon, shield: choiceB.shield }, dmgA: dmgToA, dmgB: dmgToB, guessB, correct };

  const { error } = await db.from("game_rooms").update({
    move_a:      null,
    move_b:      null,
    turn_status: "resolved",
    state:       JSON.stringify(gs),
    last_result: JSON.stringify(result),
  }).eq("code", onlineRoom);

  if (error) { document.getElementById("gameError").textContent = "Failed to submit move. Try again."; return; }

  // Show result immediately on B's device (don't wait for realtime echo)
  showShotResult(result.cA, result.cB, result.dmgA, result.dmgB, result.guessB, result.correct);
}

function activateBTurn() {
  gs.phase = "B";
  showScreen("screen-game");
  document.getElementById("gsRound").textContent = gs.isSuddenDeath ? "⚡ Sudden Death" : `Round ${gs.round} / ${TOTAL_ROUNDS}`;
  document.getElementById("gsShot").textContent  = `Shot ${gs.shot} / ${SHOTS_PER_ROUND}`;
  document.getElementById("hpNameA").textContent = gs.names.A;
  document.getElementById("hpNameB").textContent = gs.names.B;
  updateHPBars();
  renderAvailableWeapons();
  hideOnlineWaiting();
  renderPlayerBTurn();
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
  navigator.clipboard.writeText(onlineRoom || "").catch(() => {});
  const btn = document.querySelector(".btn-copy");
  btn.textContent = "Copied!";
  setTimeout(() => btn.textContent = "Copy", 1500);
}