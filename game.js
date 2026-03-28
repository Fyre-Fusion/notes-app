// ══════════════════════════════════════════════
// CONFIG
// ══════════════════════════════════════════════
const SUPABASE_URL = "https://gcanfgcumemeeisvlwfx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYW5mZ2N1bWVtZWVpc3Zsd2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTU2MjEsImV4cCI6MjA5MDE3MTYyMX0.7SfvfFfguaoSi58N9cuP26I-f4qYLgIXwLseUWBnQw4";
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// ══════════════════════════════════════════════
// GAME CONSTANTS
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
const SHIELD_VALUES    = [5, 6, 7, 8, 9, 10, 11];
const MAX_HP           = 30;
const SHOTS_PER_ROUND  = 6;
const TOTAL_ROUNDS     = 3;
const USERNAME_REGEX   = /^[a-zA-Z0-9_]{3,15}$/;
const SESSION_KEY      = "klocvork_session";

// ══════════════════════════════════════════════
// SESSION — stored in localStorage
// ══════════════════════════════════════════════
let currentUser = null; // { id, username }

function saveSession(user) {
  currentUser = user;
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(user)); } catch(e) {}
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function clearSession() {
  currentUser = null;
  try { localStorage.removeItem(SESSION_KEY); } catch(e) {}
}

// ══════════════════════════════════════════════
// SIMPLE PASSWORD HASHING
// Uses SHA-256 via Web Crypto API — no bcrypt
// dependency needed, good enough for this app
// ══════════════════════════════════════════════
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "klocvork_salt_2025");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// ══════════════════════════════════════════════
// AUTH STATE
// ══════════════════════════════════════════════
let authMode = "login";

// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════
window.addEventListener("DOMContentLoaded", () => {
  const saved = loadSession();
  if (saved) {
    currentUser = saved;
    updateUserPill();
    showScreen("screen-mode");
  }
});

// ══════════════════════════════════════════════
// SCREEN NAV
// ══════════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active");
    s.style.display = "";
  });
  const el = document.getElementById(id);
  el.classList.add("active");
  el.style.display = "flex";
}

// ══════════════════════════════════════════════
// AUTH UI
// ══════════════════════════════════════════════
function setAuthTab(mode) {
  authMode = mode;
  document.getElementById("tabLogin").classList.toggle("active", mode === "login");
  document.getElementById("tabSignup").classList.toggle("active", mode === "signup");
  document.getElementById("authSubmitText").textContent =
    mode === "login" ? "Enter the Arena" : "Create Account";
  const errEl = document.getElementById("authError");
  errEl.textContent = "";
  errEl.className = "form-error";
  document.getElementById("authPassword").autocomplete =
    mode === "login" ? "current-password" : "new-password";
}

function setAuthLoading(on) {
  document.getElementById("authSubmit").disabled = on;
  document.getElementById("authSubmitSpinner").classList.toggle("hidden", !on);
  document.getElementById("authSubmitText").textContent = on ? "…"
    : authMode === "login" ? "Enter the Arena" : "Create Account";
}

function setAuthError(msg, isSuccess = false) {
  const el = document.getElementById("authError");
  el.textContent = msg;
  el.className = isSuccess ? "form-success" : "form-error";
}

// ══════════════════════════════════════════════
// SIGN UP
// ══════════════════════════════════════════════
async function signUp(username, password) {
  // Validate username format
  if (!USERNAME_REGEX.test(username)) {
    setAuthError("Username: 3–15 chars, letters/numbers/underscores only.");
    return;
  }
  if (password.length < 6) {
    setAuthError("Password must be at least 6 characters.");
    return;
  }

  setAuthLoading(true);

  try {
    // Check if username already taken
    const { data: existing } = await db
      .from("players")
      .select("id")
      .eq("username", username.toLowerCase())
      .maybeSingle();

    if (existing) {
      setAuthError("Username is already taken. Try another.");
      return;
    }

    const hashed = await hashPassword(password);

    const { data, error } = await db
      .from("players")
      .insert({ username: username.toLowerCase(), password_hash: hashed })
      .select("id, username")
      .single();

    if (error) { setAuthError("Sign up failed: " + error.message); return; }

    setAuthError("Account created! Signing you in…", true);
    setTimeout(() => {
      saveSession({ id: data.id, username: data.username });
      updateUserPill();
      showScreen("screen-mode");
    }, 800);

  } catch(e) {
    setAuthError("Something went wrong. Please try again.");
    console.error(e);
  } finally {
    setAuthLoading(false);
  }
}

// ══════════════════════════════════════════════
// SIGN IN
// ══════════════════════════════════════════════
async function signIn(username, password) {
  if (!username || !password) { setAuthError("Fill in all fields."); return; }

  setAuthLoading(true);

  try {
    const { data, error } = await db
      .from("players")
      .select("id, username, password_hash")
      .eq("username", username.toLowerCase())
      .maybeSingle();

    if (error || !data) { setAuthError("Username not found."); return; }

    const hashed = await hashPassword(password);
    if (hashed !== data.password_hash) {
      setAuthError("Incorrect password.");
      return;
    }

    saveSession({ id: data.id, username: data.username });
    updateUserPill();
    showScreen("screen-mode");

  } catch(e) {
    setAuthError("Something went wrong. Please try again.");
    console.error(e);
  } finally {
    setAuthLoading(false);
  }
}

// ══════════════════════════════════════════════
// HANDLE AUTH (dispatch)
// ══════════════════════════════════════════════
function handleAuth() {
  const username = document.getElementById("authUsername").value.trim();
  const password = document.getElementById("authPassword").value;
  if (authMode === "signup") signUp(username, password);
  else signIn(username, password);
}

// ══════════════════════════════════════════════
// GUEST
// ══════════════════════════════════════════════
function playAsGuest() {
  currentUser = null;
  clearSession();
  updateUserPill();
  showScreen("screen-mode");
}

// ══════════════════════════════════════════════
// LOGOUT
// ══════════════════════════════════════════════
function logout() {
  clearSession();
  updateUserPill();
  showScreen("screen-auth");
}

// ══════════════════════════════════════════════
// USER PILL
// ══════════════════════════════════════════════
function updateUserPill() {
  const pill    = document.getElementById("userPill");
  const logoutBtn = document.getElementById("logoutBtn");
  if (!pill) return;
  if (currentUser) {
    pill.textContent = `⚔ ${currentUser.username}`;
    if (logoutBtn) logoutBtn.style.display = "";
  } else {
    pill.textContent = "Playing as Guest";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}

// ══════════════════════════════════════════════
// MODE SELECT
// ══════════════════════════════════════════════
let gameMode = null;

function selectMode(mode) {
  gameMode = mode;
  if (mode === "online") {
    showScreen("screen-lobby");
  } else {
    initGame(mode);
    showScreen("screen-game");
  }
}

// ══════════════════════════════════════════════
// GAME STATE
// ══════════════════════════════════════════════
let gs = {};

function freshGameState(names) {
  return {
    hpA: MAX_HP,
    hpB: MAX_HP,
    round: 1,
    shot: 1,
    phase: "A",
    usedWeapons: [],
    pendingA: null,
    isSuddenDeath: false,
    names: names || { A: "Player A", B: "Player B" },
  };
}

function initGame(mode, names) {
  // Use logged-in username as player A name where relevant
  const resolvedNames = names || {
    A: currentUser ? currentUser.username : "Player A",
    B: mode === "ai" ? "The Machine" : "Player B",
  };
  gs = freshGameState(resolvedNames);
  renderGame();
}

// ══════════════════════════════════════════════
// GAME RENDER
// ══════════════════════════════════════════════
function renderGame() {
  const roundLabel = gs.isSuddenDeath ? "Sudden Death" : `Round ${gs.round} / ${TOTAL_ROUNDS}`;
  document.getElementById("gsRound").textContent = roundLabel;
  document.getElementById("gsShot").textContent  = `Shot ${gs.shot} / ${SHOTS_PER_ROUND}`;
  document.getElementById("hpNameA").textContent = gs.names.A;
  document.getElementById("hpNameB").textContent = gs.names.B;
  updateHPBars();
  renderAvailableWeapons();
  if (gs.phase === "A") renderPlayerATurn();
  else renderPlayerBTurn();
}

function updateHPBars() {
  const pctA = Math.max(0, gs.hpA / MAX_HP * 100);
  const pctB = Math.max(0, gs.hpB / MAX_HP * 100);
  document.getElementById("hpBarA").style.width = pctA + "%";
  document.getElementById("hpBarB").style.width = pctB + "%";
  document.getElementById("hpNumA").textContent = gs.hpA;
  document.getElementById("hpNumB").textContent = gs.hpB;
  const barA = document.getElementById("hpBarA");
  barA.style.background = pctA > 50 ? "var(--green2)" : pctA > 25 ? "var(--gold)" : "var(--red2)";
}

function renderAvailableWeapons() {
  const list = document.getElementById("availableWeaponsList");
  list.innerHTML = "";
  WEAPONS.forEach(w => {
    const chip = document.createElement("span");
    chip.className = "aw-chip" + (gs.usedWeapons.includes(w.name) ? " used" : "");
    chip.textContent = `${w.emoji} ${w.name}`;
    list.appendChild(chip);
  });
}

function getAvailableWeapons() {
  return WEAPONS.filter(w => !gs.usedWeapons.includes(w.name));
}

// ── Player A turn ──────────────────────────
let selWeaponA = null, selShieldA = null;

function renderPlayerATurn() {
  selWeaponA = null; selShieldA = null;
  document.getElementById("turnBadge").textContent  = `${gs.names.A}'s Turn`;
  document.getElementById("turnPhase").textContent  = "Choose your weapon & shield — hidden from your opponent.";
  document.getElementById("guessSection").classList.add("hidden");
  document.getElementById("confirmBtn").disabled = true;
  renderWeaponGrid("weaponGrid", getAvailableWeapons(), w => { selWeaponA = w; checkAReady(); });
  renderShieldGrid("shieldGrid", v => { selShieldA = v; checkAReady(); });
}
function checkAReady() {
  document.getElementById("confirmBtn").disabled = !(selWeaponA && selShieldA !== null);
}

// ── Player B turn ──────────────────────────
let selWeaponB = null, selShieldB = null, selGuessB = null;

function renderPlayerBTurn() {
  selWeaponB = null; selShieldB = null; selGuessB = null;
  document.getElementById("turnBadge").textContent  = `${gs.names.B}'s Turn`;
  document.getElementById("turnPhase").textContent  = "Guess your opponent's weapon, then choose yours & your shield.";
  document.getElementById("guessSection").classList.remove("hidden");
  document.getElementById("confirmBtn").disabled = true;
  renderWeaponGrid("guessGrid", WEAPONS, w => { selGuessB = w; checkBReady(); });
  renderWeaponGrid("weaponGrid", getAvailableWeapons(), w => { selWeaponB = w; checkBReady(); });
  renderShieldGrid("shieldGrid", v => { selShieldB = v; checkBReady(); });
}
function checkBReady() {
  document.getElementById("confirmBtn").disabled = !(selWeaponB && selShieldB !== null && selGuessB);
}

// ── Grid builders ──────────────────────────
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
// ══════════════════════════════════════════════
function confirmChoice() {
  if (gs.phase === "A") {
    gs.pendingA = { weapon: selWeaponA, shield: selShieldA };
    gs.phase = "B";
    if (gameMode === "hotseat") {
      showPassScreen();
    } else if (gameMode === "ai") {
      resolveAITurn();
    } else if (gameMode === "online") {
      submitOnlineMoveA();
    }
  } else {
    if (gameMode === "online") {
      submitOnlineMoveB();
    } else {
      resolveShot(gs.pendingA, { weapon: selWeaponB, shield: selShieldB }, selGuessB);
    }
  }
}

// ══════════════════════════════════════════════
// PASS SCREEN
// ══════════════════════════════════════════════
function showPassScreen() {
  document.getElementById("passTitle").textContent    = `Pass to ${gs.names.B}`;
  document.getElementById("passSubtitle").textContent =
    `${gs.names.A} has locked in their choice.\nHand the device to ${gs.names.B}.`;
  showScreen("screen-pass");
}

function continueAfterPass() {
  showScreen("screen-game");
  renderPlayerBTurn();
  document.getElementById("turnBadge").textContent = `${gs.names.B}'s Turn`;
  document.getElementById("turnPhase").textContent = "Guess your opponent's weapon, then choose yours & shield.";
}

// ══════════════════════════════════════════════
// AI TURN
// ══════════════════════════════════════════════
function resolveAITurn() {
  const available = getAvailableWeapons();
  const notA = available.filter(w => w.name !== gs.pendingA.weapon.name);
  const aiWeapon = (notA.length > 0 ? notA : available)[Math.floor(Math.random() * (notA.length > 0 ? notA.length : available.length))];
  const aiShield = SHIELD_VALUES[Math.floor(Math.random() * SHIELD_VALUES.length)];
  const aiGuess  = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
  resolveShot(gs.pendingA, { weapon: aiWeapon, shield: aiShield }, aiGuess);
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

  const guessCorrect = guessB && guessB.name === choiceA.weapon.name;
  showShotResult(choiceA, choiceB, dmgToA, dmgToB, guessB, guessCorrect);
}

// ══════════════════════════════════════════════
// SHOT RESULT SCREEN
// ══════════════════════════════════════════════
function showShotResult(choiceA, choiceB, dmgToA, dmgToB, guessB, guessCorrect) {
  document.getElementById("rdNameA").textContent   = gs.names.A;
  document.getElementById("rdNameB").textContent   = gs.names.B;
  document.getElementById("rdWeaponA").textContent = `${choiceA.weapon.emoji} ${choiceA.weapon.name} (${choiceA.weapon.dmg})`;
  document.getElementById("rdWeaponB").textContent = `${choiceB.weapon.emoji} ${choiceB.weapon.name} (${choiceB.weapon.dmg})`;
  document.getElementById("rdShieldA").textContent = `🛡 Shield: ${choiceA.shield}`;
  document.getElementById("rdShieldB").textContent = `🛡 Shield: ${choiceB.shield}`;

  const dmgElA = document.getElementById("rdDmgA");
  const dmgElB = document.getElementById("rdDmgB");
  dmgElA.textContent = dmgToA === 0 ? "✦ Perfect Block!" : `−${dmgToA} HP`;
  dmgElB.textContent = dmgToB === 0 ? "✦ Perfect Block!" : `−${dmgToB} HP`;
  dmgElA.className = "rd-dmg" + (dmgToA === 0 ? " no-dmg" : "");
  dmgElB.className = "rd-dmg" + (dmgToB === 0 ? " no-dmg" : "");

  const guessEl = document.getElementById("resultGuess");
  if (guessB) {
    guessEl.textContent = guessCorrect
      ? `✅ ${gs.names.B} guessed correctly! (${guessB.emoji} ${guessB.name})`
      : `❌ ${gs.names.B} guessed ${guessB.emoji} ${guessB.name} — it was ${choiceA.weapon.emoji} ${choiceA.weapon.name}`;
  } else {
    guessEl.textContent = "";
  }

  document.getElementById("resultHpSummary").textContent =
    `${gs.names.A}: ${gs.hpA} HP  ·  ${gs.names.B}: ${gs.hpB} HP`;

  const isLastShot = gs.shot >= SHOTS_PER_ROUND;
  document.getElementById("resultNextBtn").textContent = isLastShot ? "End Round →" : "Next Shot →";
  showScreen("screen-result");
}

function nextAfterResult() {
  if (gs.shot >= SHOTS_PER_ROUND) {
    endRound();
  } else {
    gs.shot++;
    gs.phase = "A";
    showScreen("screen-game");
    renderGame();
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

  const isLastRound = (gs.round >= TOTAL_ROUNDS && !gs.isSuddenDeath) || gs.isSuddenDeath;

  if (isLastRound) {
    if (gs.hpA === gs.hpB && !gs.isSuddenDeath) {
      document.getElementById("roLabel").textContent   = "It's a Tie! Sudden Death Awaits";
      document.getElementById("roNextBtn").textContent = "Begin Sudden Death →";
      showScreen("screen-roundover");
    } else {
      showGameOver();
      return;
    }
  } else {
    document.getElementById("roLabel").textContent   = `Round ${gs.round} Complete`;
    document.getElementById("roNextBtn").textContent = `Begin Round ${gs.round + 1} →`;
    showScreen("screen-roundover");
  }
}

function startNextRound() {
  if (gs.hpA === gs.hpB && gs.round >= TOTAL_ROUNDS) {
    gs.isSuddenDeath = true;
  } else {
    gs.round++;
  }
  gs.shot = 1;
  gs.phase = "A";
  gs.usedWeapons = [];
  gs.pendingA = null;
  showScreen("screen-game");
  renderGame();
}

// ══════════════════════════════════════════════
// GAME OVER
// ══════════════════════════════════════════════
function showGameOver() {
  const aWins = gs.hpA > gs.hpB;
  const tie   = gs.hpA === gs.hpB;
  document.getElementById("goEmblem").textContent   = tie ? "🤝" : "🏆";
  document.getElementById("goNameA").textContent    = gs.names.A;
  document.getElementById("goNameB").textContent    = gs.names.B;
  document.getElementById("goHpA").textContent      = `${gs.hpA} HP`;
  document.getElementById("goHpB").textContent      = `${gs.hpB} HP`;
  if (tie) {
    document.getElementById("goResult").textContent   = "It's a Draw!";
    document.getElementById("goSubtitle").textContent = "Both warriors fought with equal fury.";
  } else {
    const winner = aWins ? gs.names.A : gs.names.B;
    document.getElementById("goResult").textContent   = `${winner} Wins!`;
    document.getElementById("goSubtitle").textContent = aWins
      ? `${gs.names.B} has been defeated.`
      : `${gs.names.A} has been defeated.`;
  }
  showScreen("screen-gameover");
}

function playAgain() { initGame(gameMode); showScreen("screen-game"); }

function confirmQuit() {
  if (confirm("Quit and return to the menu?")) {
    if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
    if (onlineSub) { onlineSub.unsubscribe(); onlineSub = null; }
    showScreen("screen-mode");
  }
}

// ══════════════════════════════════════════════
// ONLINE MULTIPLAYER
// ══════════════════════════════════════════════
let onlineRoom = null, onlineSub = null, onlineRole = null, lobbyPoll = null;

function genCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function createRoom() {
  const code   = genCode();
  const userId = currentUser?.id || ("guest_" + Math.random().toString(36).slice(2, 8));
  const errEl  = document.getElementById("lobbyError");
  errEl.textContent = "";

  const { error } = await db.from("game_rooms").insert({
    code, player_a: userId,
    state: JSON.stringify(freshGameState()), status: "waiting",
  });
  if (error) { errEl.textContent = "Failed to create room: " + error.message; return; }

  onlineRoom = code; onlineRole = "A";
  document.getElementById("roomCodeDisplay").textContent = code;
  document.getElementById("lobbyCreate").classList.add("hidden");
  document.getElementById("lobbyWaiting").classList.remove("hidden");
  subscribeToRoom(code);
  // Polling fallback in case realtime misses the join event
  lobbyPoll = setInterval(async () => {
    const { data } = await db.from("game_rooms").select("status, state").eq("code", code).single();
    if (data && data.status === "active") {
      clearInterval(lobbyPoll); lobbyPoll = null;
      gs = JSON.parse(data.state);
      if (currentUser) gs.names.A = currentUser.username;
      initGame("online", gs.names);
      showScreen("screen-game");
    }
  }, 2000);
}

async function joinRoom() {
  const code  = document.getElementById("joinCode").value.trim().toUpperCase();
  const errEl = document.getElementById("lobbyError");
  errEl.textContent = "";
  if (!code || code.length !== 6) { errEl.textContent = "Enter a valid 6-character code."; return; }

  const { data, error } = await db.from("game_rooms").select("*").eq("code", code).single();
  if (error || !data) { errEl.textContent = "Room not found."; return; }
  if (data.status !== "waiting") { errEl.textContent = "Room is already full."; return; }

  const userId    = currentUser?.id || ("guest_" + Math.random().toString(36).slice(2, 8));
  const roomState = JSON.parse(data.state);

  // Set player B's name from their username if logged in
  if (currentUser) roomState.names.B = currentUser.username;

  await db.from("game_rooms").update({
    player_b: userId, status: "active",
    state: JSON.stringify(roomState),
  }).eq("code", code);

  onlineRoom = code; onlineRole = "B";
  gs = roomState;
  initGame("online", gs.names);
  subscribeToRoom(code);
  showScreen("screen-game");
}

function subscribeToRoom(code) {
  if (onlineSub) onlineSub.unsubscribe();
  onlineSub = db.channel(`room:${code}`)
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "game_rooms", filter: `code=eq.${code}` },
      payload => handleOnlineUpdate(payload.new))
    .subscribe();
}

function handleOnlineUpdate(row) {
  if (row.status === "active" && onlineRole === "A") {
    if (lobbyPoll) { clearInterval(lobbyPoll); lobbyPoll = null; }
    gs = JSON.parse(row.state);
    if (currentUser) gs.names.A = currentUser.username;
    initGame("online", gs.names);
    showScreen("screen-game");
  }
  if (row.move_a && row.move_b) {
    const moveA = JSON.parse(row.move_a);
    const moveB = JSON.parse(row.move_b);
    gs.pendingA = moveA;
    resolveShot(moveA, moveB.choice, moveB.guess);
    db.from("game_rooms").update({ move_a: null, move_b: null }).eq("code", onlineRoom);
  } else if (row.move_a && onlineRole === "B" && !row.move_b) {
    gs.phase = "B";
    showScreen("screen-game");
    renderPlayerBTurn();
  }
}

async function submitOnlineMoveA() {
  const move = JSON.stringify({ weapon: selWeaponA, shield: selShieldA });
  await db.from("game_rooms").update({ move_a: move }).eq("code", onlineRoom);
  document.getElementById("turnPhase").textContent = "Waiting for opponent…";
  document.getElementById("confirmBtn").disabled = true;
}

async function submitOnlineMoveB() {
  const move = JSON.stringify({ choice: { weapon: selWeaponB, shield: selShieldB }, guess: selGuessB });
  await db.from("game_rooms").update({ move_b: move }).eq("code", onlineRoom);
  document.getElementById("turnPhase").textContent = "Waiting for resolution…";
  document.getElementById("confirmBtn").disabled = true;
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