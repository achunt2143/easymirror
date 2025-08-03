import React, {Component} from 'react';
import NotesBase from './NotesBase';     // updated import path/name
import NotesService from './NotesService'; // updated import path/name

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: NotesService.getNotes(),
      popupOpen: false,
      currentNoteText: '',
      editing: false,
      editingNoteId: null
    };
  }

  openPopup = (note) => {
    if (note) {
      this.setState({
        popupOpen: true,
        editing: true,
        editingNoteId: note.id,
        currentNoteText: note.text
      });
    } else {
      this.setState({
        popupOpen: true,
        editing: false,
        editingNoteId: null,
        currentNoteText: ''
      });
    }
  };

  closePopup = () => {
    this.setState({
      popupOpen: false,
      editing: false,
      editingNoteId: null,
      currentNoteText: ''
    });
  };

  changeNoteText = (ev) => {
    this.setState({currentNoteText: ev.value});
  };

  saveNote = () => {
    const {editing, editingNoteId, currentNoteText} = this.state;
    const trimmed = currentNoteText.trim();
    if (trimmed === '') return;
    if (editing) {
      NotesService.updateNote(editingNoteId, trimmed);
    } else {
      NotesService.addNote(trimmed);
    }
    this.setState({
      notes: NotesService.getNotes(),
      popupOpen: false,
      editing: false,
      editingNoteId: null,
      currentNoteText: ''
    });
  };

  deleteNote = () => {
    const {editingNoteId} = this.state;
    if (editingNoteId) {
      NotesService.deleteNote(editingNoteId);
      this.setState({
        notes: NotesService.getNotes(),
        popupOpen: false,
        editing: false,
        editingNoteId: null,
        currentNoteText: ''
      });
    }
  };

  cancelNote = () => {
    this.closePopup();
  };

  render() {
    return (
      <NotesBase
        notes={this.state.notes}
        popupOpen={this.state.popupOpen}
        currentNoteText={this.state.currentNoteText}
        editing={this.state.editing}
        onOpenPopup={this.openPopup}
        onClosePopup={this.closePopup}
        onChangeNoteText={this.changeNoteText}
        onSaveNote={this.saveNote}
        onDeleteNote={this.deleteNote}
        onCancelNote={this.cancelNote}
      />
    );
  }
}

export default Notes;
