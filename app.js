// ─────────────────────────────────────────────
// CONFIG — move to .env and add to .gitignore!
// ─────────────────────────────────────────────
const SUPABASE_URL = "https://gcanfgcumemeeisvlwfx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYW5mZ2N1bWVtZWVpc3Zsd2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTU2MjEsImV4cCI6MjA5MDE3MTYyMX0.7SfvfFfguaoSi58N9cuP26I-f4qYLgIXwLseUWBnQw4";

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── State ───────────────────────────────────
let isSignUp = false;
const MAX_NOTE_LENGTH = 3000;

// ─── DOM refs ────────────────────────────────
const $ = id => document.getElementById(id);

// ─── Init ─────────────────────────────────────
window.addEventListener("DOMContentLoaded", async () => {
  // Set today's date in header
  const dateEl = $("todayDate");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-IN", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
  }

  const { data: { session } } = await client.auth.getSession();
  if (session) showNotesScreen(session.user);

  client.auth.onAuthStateChange((_event, session) => {
    if (session) showNotesScreen(session.user);
    else showLoginScreen();
  });

  $("noteInput").addEventListener("input", () => {
    const len = $("noteInput").value.length;
    $("charCount").textContent = `${len} / ${MAX_NOTE_LENGTH}`;
    $("charCount").style.color = len > MAX_NOTE_LENGTH * 0.9 ? "var(--danger)" : "";
  });
});

// ─── Screen helpers ──────────────────────────
function showLoginScreen() {
  $("loginScreen").style.display = "flex";
  $("notesScreen").classList.add("hidden");
}

function showNotesScreen(user) {
  $("loginScreen").style.display = "none";
  $("notesScreen").classList.remove("hidden");

  // Email display
  $("userEmail").textContent = user.email;

  // Avatar initials
  const initials = user.email.slice(0, 2).toUpperCase();
  $("userAvatar").textContent = initials;

  fetchNotes();
}

// ─── Auth helpers ─────────────────────────────
function setAuthLoading(loading) {
  $("authBtn").disabled = loading;
  $("authBtnText").textContent = loading
    ? (isSignUp ? "Creating account…" : "Signing in…")
    : "Continue →";
  $("authBtnSpinner").classList.toggle("hidden", !loading);
}

function setAuthError(msg) {
  $("authError").textContent = msg;
}

// ─── Toggle login / signup ───────────────────
function toggleMode() {
  isSignUp = !isSignUp;
  $("authTitle").textContent      = isSignUp ? "Create account" : "Sign in";
  $("authSubtitle").textContent   = isSignUp ? "Join and start capturing your thoughts." : "Welcome back. Your notes await.";
  $("toggleText").textContent     = isSignUp ? "Already have an account?" : "No account yet?";
  $("toggleLink").textContent     = isSignUp ? "Sign in" : "Create one";
  $("passwordInput").autocomplete = isSignUp ? "new-password" : "current-password";
  setAuthError("");
}

// ─── Auth ─────────────────────────────────────
async function handleAuth() {
  const email    = $("emailInput").value.trim();
  const password = $("passwordInput").value;

  if (!email || !password) { setAuthError("Please fill in all fields."); return; }
  if (password.length < 6) { setAuthError("Password must be at least 6 characters."); return; }

  setAuthLoading(true);
  setAuthError("");

  try {
    let error;
    if (isSignUp) {
      ({ error } = await client.auth.signUp({ email, password }));
      if (!error) {
        setAuthLoading(false);
        setAuthError("Check your email to confirm your account, then sign in.");
        return;
      }
    } else {
      ({ error } = await client.auth.signInWithPassword({ email, password }));
    }
    if (error) setAuthError(error.message);
  } catch (err) {
    setAuthError("Something went wrong. Please try again.");
    console.error("Auth error:", err);
  } finally {
    setAuthLoading(false);
  }
}

// ─── Logout ──────────────────────────────────
async function logout() {
  await client.auth.signOut();
}

// ─── Fetch notes ─────────────────────────────
async function fetchNotes() {
  $("notesError").textContent = "";

  const { data: { user } } = await client.auth.getUser();
  if (!user) return;

  const { data, error } = await client
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) {
    $("notesError").textContent = "Failed to load notes. Please refresh.";
    console.error("Fetch error:", error);
    return;
  }

  // Update note count in sidebar
  $("noteCount").textContent = `${data.length} ${data.length === 1 ? "note" : "notes"}`;

  renderNotes(data);
}

// ─── Render notes ────────────────────────────
function renderNotes(notes) {
  const container = $("notesContainer");
  Array.from(container.querySelectorAll(".note")).forEach(n => n.remove());

  if (notes.length === 0) {
    $("emptyState").classList.remove("hidden");
    return;
  }
  $("emptyState").classList.add("hidden");

  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";
    div.dataset.id = note.id;

    const p = document.createElement("p");
    p.className = "note-content";
    p.contentEditable = "true";
    p.textContent = note.content;
    p.setAttribute("spellcheck", "true");

    p.addEventListener("input", () => saveNoteBtn.classList.add("visible"));

    const date = new Date(note.created_at);
    const dateStr = date.toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const dateEl = document.createElement("span");
    dateEl.className = "note-date";
    dateEl.textContent = dateStr;

    const actions = document.createElement("div");
    actions.className = "note-actions";

    const saveNoteBtn = document.createElement("button");
    saveNoteBtn.className = "save-note-btn";
    saveNoteBtn.textContent = "Save";
    saveNoteBtn.addEventListener("click", async () => {
      const newContent = p.textContent.trim();
      if (!newContent) {
        alert("Note can't be empty.");
        p.textContent = note.content;
        saveNoteBtn.classList.remove("visible");
        return;
      }
      saveNoteBtn.textContent = "Saving…";
      saveNoteBtn.disabled = true;
      const ok = await updateNote(note.id, newContent);
      if (ok) {
        note.content = newContent;
        saveNoteBtn.classList.remove("visible");
      }
      saveNoteBtn.textContent = "Save";
      saveNoteBtn.disabled = false;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      if (confirm("Delete this note? This can't be undone.")) deleteNote(note.id, div);
    });

    actions.appendChild(saveNoteBtn);
    actions.appendChild(deleteBtn);
    meta.appendChild(dateEl);
    meta.appendChild(actions);
    div.appendChild(p);
    div.appendChild(meta);
    container.appendChild(div);
  });
}

// ─── Add note ────────────────────────────────
async function addNote() {
  const input   = $("noteInput");
  const content = input.value.trim();

  if (!content) return;
  if (content.length > MAX_NOTE_LENGTH) {
    $("notesError").textContent = `Note is too long (max ${MAX_NOTE_LENGTH} characters).`;
    return;
  }

  $("notesError").textContent = "";
  const { data: { user } } = await client.auth.getUser();
  if (!user) return;

  $("saveBtn").disabled = true;
  $("saveBtnText").textContent = "Saving…";
  $("saveBtnSpinner").classList.remove("hidden");

  const { error } = await client.from("notes").insert([{ content, user_id: user.id }]);

  $("saveBtn").disabled = false;
  $("saveBtnText").textContent = "Save note";
  $("saveBtnSpinner").classList.add("hidden");

  if (error) {
    $("notesError").textContent = "Failed to save note. Please try again.";
    console.error("Insert error:", error);
    return;
  }

  input.value = "";
  $("charCount").textContent = `0 / ${MAX_NOTE_LENGTH}`;
  fetchNotes();
}

// ─── Update note ─────────────────────────────
async function updateNote(id, content) {
  const { error } = await client.from("notes").update({ content }).eq("id", id);
  if (error) {
    console.error("Update error:", error);
    $("notesError").textContent = "Failed to update note.";
    return false;
  }
  return true;
}

// ─── Delete note ─────────────────────────────
async function deleteNote(id, el) {
  el.style.opacity = "0.4";
  el.style.pointerEvents = "none";

  const { error } = await client.from("notes").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    $("notesError").textContent = "Failed to delete note.";
    el.style.opacity = "";
    el.style.pointerEvents = "";
    return;
  }

  el.remove();
  if (!$("notesContainer").querySelector(".note")) {
    $("emptyState").classList.remove("hidden");
  }

  // Update count
  const current = parseInt($("noteCount").textContent) || 0;
  const newCount = Math.max(0, current - 1);
  $("noteCount").textContent = `${newCount} ${newCount === 1 ? "note" : "notes"}`;
}