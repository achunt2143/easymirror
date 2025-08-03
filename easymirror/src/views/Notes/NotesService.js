// Rename file NotesService.js

const initialNotes = [
  {id: '1', text: 'Buy groceries'},
  {id: '2', text: 'Call Alice at 3pm'},
  {id: '3', text: 'Finish project report'},
];
let nextId = 4;

const NotesService = {
  getNotes() {
    return initialNotes;
  },
  addNote(text) {
    const newNote = {id: String(nextId++), text};
    initialNotes.push(newNote);
    return newNote;
  },
  updateNote(id, text) {
    const note = initialNotes.find(n => n.id === id);
    if (note) note.text = text;
    return note;
  },
  deleteNote(id) {
    const idx = initialNotes.findIndex(n => n.id === id);
    if (idx !== -1) initialNotes.splice(idx, 1);
  }
};

export default NotesService;
