import kind from '@enact/core/kind';
import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import VirtualList from '@enact/sandstone/VirtualList';
import Item from '@enact/sandstone/Item';
import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';
import Input from '@enact/sandstone/Input';

import css from './Notes.module.less'; // updated to Notes.module.less

const itemSize = 72;

const NotesBase = kind({
  name: 'NotesBase',

  handlers: {
    onOpenPopup: (ev, {onOpenPopup, note}) => {
      if (onOpenPopup) onOpenPopup(ev);
    },
    onClosePopup: (ev, {onClosePopup}) => {
      if (onClosePopup) onClosePopup();
    },
    onChangeNoteText: (ev, {onChangeNoteText}) => {
      if (onChangeNoteText) onChangeNoteText(ev);
    },
    onSaveNote: (ev, {onSaveNote}) => {
      if (onSaveNote) onSaveNote();
    },
    onDeleteNote: (ev, {onDeleteNote}) => {
      if (onDeleteNote) onDeleteNote();
    },
    onCancelNote: (ev, {onCancelNote}) => {
      if (onCancelNote) onCancelNote();
    }
  },

  render: ({
    notes,
    popupOpen,
    currentNoteText,
    editing,
    onOpenPopup,
    onClosePopup,
    onChangeNoteText,
    onSaveNote,
    onDeleteNote,
    onCancelNote,
    ...rest
  }) => (
    <Panel className={css.panelContainer} {...rest}>
      <Header title={`\nNotes`} slotAfter={
        <Button icon="plus" onClick={() => onOpenPopup(null)}>
          Add Note
        </Button>
      }/>

      <VirtualList
        dataSize={notes.length}
        itemSize={itemSize}
        itemRenderer={({index, ...props}) => {
          const note = notes[index];
          return (
            <Item
              key={note.id}
              {...props}
              onClick={() => onOpenPopup(note)}
              className={css.noteItem}
            >
              <span className={css.noteText}>{note.text}</span>
            </Item>
          );
        }}
      />

      <Popup
        open={popupOpen}
        onClose={onClosePopup}
        spotlightRestrict="self-only"
        spotlightModal
        scrimType="translucent"
        className={css.popupContainer}
      >
        <div className={css.popupContent}>
          <Input
            placeholder="Enter note text"
            value={currentNoteText}
            onChange={onChangeNoteText}
            autoFocus={popupOpen}
          />
          <div className={css.popupButtons}>
            <Button onClick={onSaveNote} spotlightDefault>
              {editing ? 'Save' : 'Add'}
            </Button>
            {editing && (
              <Button onClick={onDeleteNote} color="danger" icon="trash">
                Delete
              </Button>
            )}
            <Button onClick={onCancelNote}>
              Cancel
            </Button>
          </div>
        </div>
      </Popup>
    </Panel>
  )
});

export default NotesBase;
