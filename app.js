const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYW5mZ2N1bWVtZWVpc3Zsd2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTU2MjEsImV4cCI6MjA5MDE3MTYyMX0.7SfvfFfguaoSi58N9cuP26I-f4qYLgIXwLseUWBnQw4";

// FIX 1: Use the correct global — supabasejs CDN exposes `supabase`, not `window.supabase`
const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

window.onload = fetchNotes;

async function fetchNotes() {
  const { data, error } = await client
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  // FIX 2: Guard against null data on error
  if (error || !data) {
    console.error("Failed to fetch notes:", error);
    return;
  }

  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  data.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";

    // FIX 3 & 4: Use textContent instead of innerHTML to avoid XSS
    // and prevent double-encoding in contenteditable
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

  const { error } = await client.from("notes").insert([{ content }]);
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