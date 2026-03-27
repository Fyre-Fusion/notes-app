// ─────────────────────────────────────────────
// CONFIG — move these to a .env file and add
// .env to .gitignore. Never commit real keys!
// ─────────────────────────────────────────────
const SUPABASE_URL = "https://gcanfgcumemeeisvlwfx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYW5mZ2N1bWVtZWVpc3Zsd2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTU2MjEsImV4cCI6MjA5MDE3MTYyMX0.7SfvfFfguaoSi58N9cuP26I-f4qYLgIXwLseUWBnQw4";

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── State ───────────────────────────────────
let isSignUp = false;
const MAX_NOTE_LENGTH = 1000;

// ─── DOM refs ────────────────────────────────
const loginScreen    = () => document.getElementById("loginScreen");
const notesScreen    = () => document.getElementById("notesScreen");
const emailInput     = () => document.getElementById("emailInput");
const passwordInput  = () => document.getElementById("passwordInput");
const authError      = () => document.getElementById("authError");
const authBtn        = () => document.getElementById("authBtn");
const authBtnText    = () => document.getElementById("authBtnText");
const authBtnSpinner = () => document.getElementById("authBtnSpinner");
const noteInput      = () => document.getElementById("noteInput");
const saveBtn        = () => document.getElementById("saveBtn");
const saveBtnText    = () => document.getElementById("saveBtnText");
const saveBtnSpinner = () => document.getElementById("saveBtnSpinner");
const notesContainer = () => document.getElementById("notesContainer");
const notesError     = () => document.getElementById("notesError");
const emptyState     = () => document.getElementById("emptyState");
const charCount      = () => document.getElementById("charCount");

// ─── Init ─────────────────────────────────────
window.addEventListener("DOMContentLoaded", async () => {
  const { data: { session } } = await client.auth.getSession();
  if (session) {
    showNotesScreen(session.user);
  }

  // Keep session state in sync across tabs
  client.auth.onAuthStateChange((_event, session) => {
    if (session) {
      showNotesScreen(session.user);
    } else {
      showLoginScreen();
    }
  });

  // Character counter for note input
  noteInput().addEventListener("input", () => {
    const len = noteInput().value.length;
    charCount().textContent = `${len} / ${MAX_NOTE_LENGTH}`;
    charCount().style.color = len > MAX_NOTE_LENGTH * 0.9 ? "#c0392b" : "";
  });
});

// ─── Auth helpers ────────────────────────────
function showLoginScreen() {
  loginScreen().style.display = "flex";
  notesScreen().classList.add("hidden");
}

function showNotesScreen(user) {
  loginScreen().style.display = "none";
  notesScreen().classList.remove("hidden");
  document.getElementById("userEmail").textContent = user.email;
  fetchNotes();
}

function setAuthLoading(loading) {
  authBtn().disabled = loading;
  authBtnText().textContent = loading
    ? (isSignUp ? "Creating account…" : "Signing in…")
    : (isSignUp ? "Create Account" : "Sign In");
  authBtnSpinner().classList.toggle("hidden", !loading);
}

function setAuthError(msg) {
  authError().textContent = msg;
}

// ─── Toggle login / signup ───────────────────
function toggleMode() {
  isSignUp = !isSignUp;
  document.getElementById("authTitle").textContent   = isSignUp ? "Create account" : "Welcome back";
  document.getElementById("toggleText").textContent  = isSignUp ? "Already have an account?" : "Don't have an account?";
  document.getElementById("toggleLink").textContent  = isSignUp ? "Sign In" : "Sign Up";
  authBtnText().textContent                          = isSignUp ? "Create Account" : "Sign In";
  passwordInput().autocomplete = isSignUp ? "new-password" : "current-password";
  setAuthError("");
}

// ─── Auth ────────────────────────────────────
async function handleAuth() {
  const email    = emailInput().value.trim();
  const password = passwordInput().value;

  if (!email || !password) {
    setAuthError("Please fill in all fields.");
    return;
  }

  if (password.length < 6) {
    setAuthError("Password must be at least 6 characters.");
    return;
  }

  setAuthLoading(true);
  setAuthError("");

  try {
    let error;

    if (isSignUp) {
      ({ error } = await client.auth.signUp({ email, password }));
      if (!error) {
        setAuthError(""); // Clear any old error
        // Supabase may auto-confirm or require email verification
        // onAuthStateChange will handle the session if auto-confirmed
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
  // onAuthStateChange will call showLoginScreen()
}

// ─── Notes CRUD ──────────────────────────────
async function fetchNotes() {
  notesError().textContent = "";

  const { data: { user } } = await client.auth.getUser();
  if (!user) return;

  const { data, error } = await client
    .from("notes")
    .select("*")
    .eq("user_id", user.id)           // Only fetch this user's notes
    .order("created_at", { ascending: false });

  if (error || !data) {
    notesError().textContent = "Failed to load notes. Please refresh.";
    console.error("Fetch error:", error);
    return;
  }

  renderNotes(data);
}

function renderNotes(notes) {
  const container = notesContainer();
  // Clear existing notes but keep the empty-state element
  Array.from(container.querySelectorAll(".note")).forEach(n => n.remove());

  if (notes.length === 0) {
    emptyState().classList.remove("hidden");
    return;
  }

  emptyState().classList.add("hidden");

  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";
    div.dataset.id = note.id;

    // Note content — contenteditable for inline editing
    const p = document.createElement("p");
    p.className = "note-content";
    p.contentEditable = "true";
    p.textContent = note.content;       // textContent avoids XSS
    p.setAttribute("aria-label", "Note content, click to edit");
    p.setAttribute("spellcheck", "true");

    // Show save button when content changes
    p.addEventListener("input", () => {
      saveNoteBtn.classList.add("visible");
    });

    // Formatted creation date
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

    // Per-note Save button (only visible when edited)
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
        note.content = newContent;     // Update local reference
        saveNoteBtn.classList.remove("visible");
      }
      saveNoteBtn.textContent = "Save";
      saveNoteBtn.disabled = false;
    });

    // Delete button with confirmation
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      if (confirm("Delete this note? This can't be undone.")) {
        deleteNote(note.id, div);
      }
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

async function addNote() {
  const input = noteInput();
  const content = input.value.trim();

  if (!content) return;

  if (content.length > MAX_NOTE_LENGTH) {
    notesError().textContent = `Note is too long (max ${MAX_NOTE_LENGTH} characters).`;
    return;
  }

  notesError().textContent = "";

  // Get current user id to associate note
  const { data: { user } } = await client.auth.getUser();
  if (!user) return;

  saveBtn().disabled = true;
  saveBtnText().textContent = "Saving…";
  saveBtnSpinner().classList.remove("hidden");

  const { error } = await client.from("notes").insert([{
    content,
    user_id: user.id
  }]);

  saveBtn().disabled = false;
  saveBtnText().textContent = "Save Note";
  saveBtnSpinner().classList.add("hidden");

  if (error) {
    notesError().textContent = "Failed to save note. Please try again.";
    console.error("Insert error:", error);
    return;
  }

  input.value = "";
  charCount().textContent = `0 / ${MAX_NOTE_LENGTH}`;
  fetchNotes();
}

async function updateNote(id, content) {
  const { error } = await client.from("notes")
    .update({ content })
    .eq("id", id);

  if (error) {
    console.error("Update error:", error);
    notesError().textContent = "Failed to update note.";
    return false;
  }
  return true;
}

async function deleteNote(id, el) {
  // Optimistically remove from DOM
  el.style.opacity = "0.4";
  el.style.pointerEvents = "none";

  const { error } = await client.from("notes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    notesError().textContent = "Failed to delete note.";
    el.style.opacity = "";
    el.style.pointerEvents = "";
    return;
  }

  el.remove();

  // Show empty state if no notes left
  if (!notesContainer().querySelector(".note")) {
    emptyState().classList.remove("hidden");
  }
}