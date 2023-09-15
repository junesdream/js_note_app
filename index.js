//Referenzen auf DOM-Elemente
const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

// Holen der gespeicherte Notizen und erstellen
getNotes().forEach((note) => {
	const noteEl = createNoteEl(note.id, note.content);
	appEl.insertBefore(noteEl, btnEl);
});

//Erstellt ein Textarea-Element für eine Notiz mit gegebener id und content
function createNoteEl(id, content){
	// Sie fügt Klassen und Platzhalter hinzu, setzt den Inhalt und fügt Ereignislistener hinzu
	const element = document.createElement("textarea");
	element.classList.add("note");
	element.placeholder = "Empty Note";
	element.value = content;

	//Eventlsitener, um eine Notiz beim Doppelklicken zu löschen
	element.addEventListener("dblclick", () => {
		const warning = confirm("Do you want to delete this note?");
		if (warning) {
			deleteNote(id, element);
		}
	});

	//Eventlsitener, um den Inhalt einer Notiz zu aktualisieren
	element.addEventListener("input", () => {
		updateNote(id, element.value);
	});

	return element;
}

// Löscht eine Notiz anhand ihrer ID und aktualisiert die Anzeige
function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);
    saveNote(notes);
    appEl.removeChild(element);
}

// Aktualisiert den Inhalt einer Notiz anhand ihrer ID
function updateNote(id, content) {
	const notes = getNotes();
	const target = notes.filter((note) => note.id == id)[0];
	target.content = content;
	saveNote(notes);
}

// Fügt eine neue leere Notiz hinzu und speichert sie.
function addNote(){
    const notes = getNotes();
	// Erstellt ein Objekt 'noteObj' mit einer zufälligen ID und leerem Inhalt
	//Zufällige ID wird durch Math.floor(Math.random() * 100000) generiert
	const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl);

  notes.push(noteObj);

  saveNote(notes);
}

// Speichert die Notizen im localstorage
function saveNote(notes){
    localStorage.setItem("note-app", JSON.stringify(notes))
}

// Holt die gespeicherten Notizen aus dem localstorage
function getNotes() {
	return JSON.parse(localStorage.getItem("note-app") || "[]");
}
// Eventlistner, um eine neue Notiz hinzuzufügen
btnEl.addEventListener("click", addNote);
