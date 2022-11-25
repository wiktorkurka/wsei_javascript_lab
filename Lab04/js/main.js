const localStorageKey = "savedNotes"
const defaultNoteColor = "#f0e34d"

function saveNotes(noteObj) {
    let jsonString = JSON.stringify(noteObj);
    localStorage.setItem(localStorageKey);
}

function loadNotes() {
    let localData = localStorage.getItem(localStorageKey);
    try {
        return JSON.parse(localData);
    } catch(e) {
        console.log("[Error] Unable to parse savedNotes");
    }
    finally {
        return [];
    }
}

function displayNotes() {
    let noteContainer = document.getElementById('note_container');
    let templateElement = document.getElementById('note_template');

    noteContainer.innerHTML = null

    notes.forEach(note => {
        let noteElement = templateElement.cloneNode(true)

        noteElement.querySelector("p[name=note-title]").innerText = note['title']
        noteElement.querySelector("p[name=note-content]").innerText = note['content']
        noteElement.querySelector("p[name=note-date]").innerText = note['date']

        noteElement.setAttribute('id', note['id']);
        noteElement.removeAttribute('hidden');

        noteContainer.appendChild(noteElement);
    });
}

function createNote(){
    let creator = document.getElementById("note_creator");

    // Jak mi się będzie chciało to poddać inputy sanityzacji, bo XSS
    let note = {
        "id": notes.length,
        "title": creator.querySelector("input[name=note_title]").value,
        "content": creator.querySelector("textarea[name=note_content]").value,
        "color": creator.querySelector("input[name=note_color]").value,
        "date": Date.now()
    }

    notes.push(note)
    localStorage.setItem(localStorageKey, JSON.stringify(notes))
    
    displayNotes()
}

var notes = loadNotes();
document.querySelector("input[name=note_color]").value = defaultNoteColor
document.querySelector("input[name=save_note]").addEventListener('click', createNote);

displayNotes();
