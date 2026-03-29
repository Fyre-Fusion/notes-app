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
  renderWeaponGrid("guessGrid",  WEAPONS,               w => { selGuessB  = w; checkBReady(); });
  renderWeaponGrid("weaponGrid", getAvailableWeapons(), w => { selWeaponB = w; checkBReady(); });
  renderShieldGrid("shieldGrid", v => { selShieldB = v; checkBReady(); });
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
    showScreen("screen-game");
    renderGame();
    // In online mode, B needs to wait for A's move again
    if (gameMode === "online" && onlineRole === "B") {
      showOnlineWaiting("Waiting for " + gs.names.A + " to choose…");
      startBPolling();
    }
  }
}

// ══════════════════════════════════════════════
// ROUND END
// ══════════════════════════════════════════════
function endRound() {
  document.getElementById("roNameA").textContent = gs.names.A;
  document.getElementById("roNameB").textContent = gs.names.B;
  document.getElementById("roHpA").textContent   = `${gs.hpA} HP`;
  document.getElementById("roHpB").textContent   = `${gs.hpB} HP`;

  const lastRound = (gs.round >= TOTAL_ROUNDS && !gs.isSuddenDeath) || gs.isSuddenDeath;

  if (lastRound) {
    if (gs.hpA === gs.hpB && !gs.isSuddenDeath) {
      document.getElementById("roLabel").textContent   = "It's a Tie!";
      document.getElementById("roNextBtn").textContent = "⚡ Begin Sudden Death →";
      showScreen("screen-roundover");
    } else {
      showGameOver();
    }
  } else {
    document.getElementById("roLabel").textContent   = `Round ${gs.round} Complete`;
    document.getElementById("roNextBtn").textContent = `Begin Round ${gs.round + 1} →`;
    showScreen("screen-roundover");
  }
}

function startNextRound() {
  if (gs.hpA === gs.hpB && gs.round >= TOTAL_ROUNDS) gs.isSuddenDeath = true;
  else gs.round++;
  gs.shot = 1; gs.phase = "A"; gs.usedWeapons = []; gs.pendingA = null;
  showScreen("screen-game");
  renderGame();
  // In online mode, B needs to wait for A's move
  if (gameMode === "online" && onlineRole === "B") {
    showOnlineWaiting("Waiting for " + gs.names.A + " to choose…");
    startBPolling();
  }
}

// ══════════════════════════════════════════════
// GAME OVER
// ══════════════════════════════════════════════
function showGameOver() {
  const aWins = gs.hpA > gs.hpB, tie = gs.hpA === gs.hpB;
  document.getElementById("goEmblem").textContent   = tie ? "🤝" : "🏆";
  document.getElementById("goNameA").textContent    = gs.names.A;
  document.getElementById("goNameB").textContent    = gs.names.B;
  document.getElementById("goHpA").textContent      = `${gs.hpA} HP`;
  document.getElementById("goHpB").textContent      = `${gs.hpB} HP`;
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

// Polling helper for Player B — starts a poll to detect A's move for the current shot
function startBPolling() {
  if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
  lobbyPoll = setInterval(async () => {
    const { data } = await db.from("game_rooms").select("move_a, move_b, state").eq("code", onlineRoom).maybeSingle();
    if (data?.move_a && !data.move_b) {
      clearInterval(lobbyPoll); lobbyPoll = null;
      if (!document.getElementById("onlineWaitingOverlay").classList.contains("hidden")) {
        let names = null;
        if (data.state) { try { const s = JSON.parse(data.state); names = s.names || null; } catch(e) {} }
        activateBTurn(names);
      }
    }
  }, 2000);
}

function cleanupOnline() {
  if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
  if (onlineSub) { onlineSub.unsubscribe(); onlineSub = null; }
  onlineRoom = null; onlineRole = null;
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
    player_a: userId,
    player_a_name: aName,
    state: JSON.stringify(initState),
    status: "waiting",
    move_a: null,
    move_b: null,
  });

  if (error) { errEl.textContent = "Failed to create room: " + error.message; return; }

  onlineRoom = code; onlineRole = "A";
  document.getElementById("roomCodeDisplay").textContent = code;
  document.getElementById("lobbyCreate").classList.add("hidden");
  document.getElementById("lobbyWaiting").classList.remove("hidden");
  subscribeToRoom(code);

  // Polling fallback in case realtime misses the join event
  lobbyPoll = setInterval(async () => {
    const { data } = await db.from("game_rooms").select("status, state").eq("code", code).maybeSingle();
    if (data?.status === "active") {
      clearInterval(lobbyPoll); lobbyPoll = null;
      startOnlineGame(data, "A");
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
  // BUG FIX 1: only set B's name — A's name already in state from createRoom
  roomState.names.B = bName;

  const { error: ue } = await db.from("game_rooms").update({
    player_b: userId,
    player_b_name: bName,
    status: "active",
    state: JSON.stringify(roomState),
  }).eq("code", code);

  if (ue) { errEl.textContent = "Failed to join room."; return; }

  onlineRoom = code; onlineRole = "B";
  startOnlineGame({ state: JSON.stringify(roomState) }, "B");
  subscribeToRoom(code);  // subscribe AFTER onlineRole is set and game is started

  // Polling fallback: if A's move arrives before realtime subscription is ready
  lobbyPoll = setInterval(async () => {
    const { data } = await db.from("game_rooms").select("move_a, move_b, state").eq("code", code).maybeSingle();
    if (data?.move_a && !data.move_b) {
      clearInterval(lobbyPoll); lobbyPoll = null;
      if (!document.getElementById("onlineWaitingOverlay").classList.contains("hidden")) {
        let names = null;
        if (data.state) { try { const s = JSON.parse(data.state); names = s.names || null; } catch(e) {} }
        activateBTurn(names);
      }
    }
  }, 2000);
}

function startOnlineGame(row, role) {
  gameMode = "online";
  gs = JSON.parse(row.state);
  showScreen("screen-game");
  gs.phase = "A";
  renderGame();
  if (role === "B") {
    // B waits for A to move first
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

function activateBTurn(namesOverride) {
  if (namesOverride) gs.names = namesOverride;
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

function handleOnlineUpdate(row) {
  // Room became active → start game for Player A
  if (row.status === "active" && onlineRole === "A") {
    if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
    if (!document.getElementById("screen-game").classList.contains("active")) {
      startOnlineGame(row, "A");
    }
    return;
  }

  // Both moves present → resolve shot on BOTH devices
  if (row.move_a && row.move_b) {
    if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
    const mA = JSON.parse(row.move_a);
    const mB = JSON.parse(row.move_b);
    if (row.state) { try { const s = JSON.parse(row.state); if (s.usedWeapons) gs.usedWeapons = s.usedWeapons; } catch(e) {} }
    gs.pendingA = mA;
    gs.phase = "B";
    resolveShot(mA, mB.choice, mB.guess);
    // Only Player A clears moves to avoid race condition
    if (onlineRole === "A") {
      db.from("game_rooms").update({ move_a: null, move_b: null, state: JSON.stringify(gs) }).eq("code", onlineRoom);
    }
    return;
  }

  // A submitted → show B's turn on B's device (realtime path)
  if (row.move_a && !row.move_b && onlineRole === "B") {
    if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
    // Only activate if B is still waiting (prevents double-render)
    if (!document.getElementById("onlineWaitingOverlay").classList.contains("hidden")) {
      let names = null;
      if (row.state) { try { const s = JSON.parse(row.state); names = s.names || null; } catch(e) {} }
      activateBTurn(names);
    }
    return;
  }
}

// BUG FIX 2: submitOnlineMoveA locks UI immediately with waiting overlay
async function submitOnlineMoveA() {
  const move = JSON.stringify({ weapon: selWeaponA, shield: selShieldA });
  const { error } = await db.from("game_rooms").update({ move_a: move }).eq("code", onlineRoom);
  if (error) { document.getElementById("gameError").textContent = "Failed to submit move. Try again."; return; }
  showOnlineWaiting("Locked in. Waiting for " + gs.names.B + "…");
}

async function submitOnlineMoveB() {
  const move = JSON.stringify({ choice: { weapon: selWeaponB, shield: selShieldB }, guess: selGuessB });
  const { error } = await db.from("game_rooms").update({ move_b: move }).eq("code", onlineRoom);
  if (error) { document.getElementById("gameError").textContent = "Failed to submit move. Try again."; return; }
  showOnlineWaiting("Locked in. Waiting for resolution…");
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