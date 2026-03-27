const SUPABASE_URL = "https://gcanfgcumemeeisvlwfx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYW5mZ2N1bWVtZWVpc3Zsd2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTU2MjEsImV4cCI6MjA5MDE3MTYyMX0.7SfvfFfguaoSi58N9cuP26I-f4qYLgIXwLseUWBnQw4";

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

let isSignUpMode = false;

// ─── AUTH STATE ───────────────────────────────────────────────
// On page load, check if user is already logged in
window.onload = async () => {
  const { data: { session } } = await client.auth.getSession();
  if (session) {
    showNotesScreen(session.user);
  }
};

// Toggle between Login and Sign Up
function toggleMode() {
  isSignUpMode = !isSignUpMode;
  document.getElementById("authTitle").textContent = isSignUpMode ? "Sign Up" : "Login";
  document.getElementById("toggleText").textContent = isSignUpMode ? "Already have an account?" : "Don't have an account?";
  document.getElementById("toggleLink").textContent = isSignUpMode ? "Login" : "Sign Up";
  document.getElementById("authError").textContent = "";
}

// Handle login or signup
async function handleAuth() {
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value;
  const errorEl = document.getElementById("authError");
  errorEl.textContent = "";

  if (!email || !password) {
    errorEl.textContent = "Please enter both email and password.";
    return;
  }

  if (isSignUpMode) {
    const { data, error } = await client.auth.signUp({ email, password });
    if (error) { errorEl.textContent = error.message; return; }
    // Supabase sends a confirmation email by default
    errorEl.style.color = "green";
    errorEl.textContent = "Account created! Check your email to confirm.";
  } else {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) { errorEl.textContent = error.message; return; }
    showNotesScreen(data.user);
  }
}

async function logout() {
  await client.auth.signOut();
  document.getElementById("notesScreen").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("emailInput").value = "";
  document.getElementById("passwordInput").value = "";
}

function showNotesScreen(user) {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("notesScreen").style.display = "block";
  document.getElementById("userEmail").textContent = user.email;
  fetchNotes();
}

// ─── NOTES ────────────────────────────────────────────────────
async function fetchNotes() {
  const { data, error } = await client
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Failed to fetch notes:", error);
    return;
  }

  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  data.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";

    const p = document.createElement("p");
    p.contentEditable = "true";
    p.textContent = note.content;
    p.addEventListener("blur", () => updateNote(note.id, p.textContent));

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.addEventListener("click", () => deleteNote(note.id));

    div.appendChild(p);
    div.appendChild(btn);
    container.appendChild(div);
  });
}

async function addNote() {
  const input = document.getElementById("noteInput");
  const content = input.value.trim();
  if (!content) return;

  const { data: { user } } = await client.auth.getUser();

  const { error } = await client.from("notes").insert([{
    content,
    user_id: user.id   // attach note to logged-in user
  }]);

  if (error) { console.error("Insert failed:", error); return; }
  input.value = "";
  fetchNotes();
}

async function updateNote(id, content) {
  const { error } = await client.from("notes")
    .update({ content })
    .eq("id", id);
  if (error) console.error("Update failed:", error);
}

async function deleteNote(id) {
  const { error } = await client.from("notes")
    .delete()
    .eq("id", id);
  if (error) { console.error("Delete failed:", error); return; }
  fetchNotes();
}