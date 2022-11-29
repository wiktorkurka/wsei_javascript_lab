const localStorageKey = 'savedNotes'
const defaultNoteColor = '#f0e34d'

var notes;

function loadNotes() {
    let localData = localStorage.getItem(localStorageKey);
    let notes = JSON.parse(localData);
    return notes == null ? [] : notes
}

function saveNotes() {
    let jsonString = JSON.stringify(notes);
    localStorage.setItem(localStorageKey, jsonString);
}

function displayNotes() {
    let noteContainer = document.getElementById('note_container');
    let templateElement = document.getElementById('note_template');

    noteContainer.innerHTML = null

    let index = 0
    notes.forEach(note => {
        let noteElement = templateElement.cloneNode(true)

        noteElement.querySelector('p[name=note-title]').innerText = note['title']
        noteElement.querySelector('p[name=note-content]').innerText = note['content']

        let timestamp = new Date(note['timestamp']);
        let date = timestamp.getDate() +
            '-' + (timestamp.getMonth() + 1) +
            '-' + timestamp.getFullYear() +
            ' ' + timestamp.getHours() +
            ':' + timestamp.getMinutes();

        noteElement.querySelectorAll('img[class=note-icon]').forEach(element => {
            element.setAttribute('id', index);
        });

        noteElement.querySelector('img[name=pin_note]').addEventListener('click', (e) => { pinNote(e.target.getAttribute('id')) });
        noteElement.querySelector('img[name=delete_note]').addEventListener('click', (e) => { deleteNote(e.target.getAttribute('id')) });

        noteElement.setAttribute('class', 'note');
        noteElement.setAttribute('style', `background-color: ${note['color']};`);

        noteElement.querySelector('p[name=note-date]').innerText = date

        noteContainer.appendChild(noteElement);

        noteElement.removeAttribute('hidden');

        index++;
    });
}

function createNote() {
    let creator = document.getElementById('note_creator');

    // Jak mi się będzie chciało to poddać inputy sanityzacji, bo XSS
    let note = {
        'title': creator.querySelector('input[name=note_title]').value,
        'content': creator.querySelector('textarea[name=note_content]').value,
        'color': creator.querySelector('input[name=note_color]').value,
        'timestamp': Date.now(),
    }

    notes.push(note)

    saveNotes()
    displayNotes()
}

function deleteNote(id) {
    console.log(id)
    notes.splice(id, 1);
    saveNotes();
    displayNotes();
}

function pinNote(id) {
    console.log(id)
    let note = notes.splice(id, 1)[0];
    notes.splice(0, 0, note);
    saveNotes();
    displayNotes();
}

notes = loadNotes();
document.querySelector('input[name=note_color]').value = defaultNoteColor
document.querySelector('input[name=save_note]').addEventListener('click', createNote);

displayNotes();
