// EventsList.js
import React from 'react';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';

const EventsList = ({events = [], deleteEvent, year, month, date, createNewEvent, onClose}) => {
  return (
    <div>
      <BodyText>Events on {date}-{month}-{year}:</BodyText>
      {(!events || events.length === 0) ? (
        <BodyText>No events for this day.</BodyText>
      ) : (
        events.map((event, idx) => (
          <div key={idx} style={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
            <span style={{flex: 1}}>{event.title}</span>
            <Button size="small" icon="closex" onClick={() => deleteEvent(event, date, month, year)}>Delete</Button>
          </div>
        ))
      )}
      <Button onClick={createNewEvent} style={{marginRight: 6}}>Add Another Event</Button>
      <Button onClick={onClose} color="neutral">Close</Button>
    </div>
  );
};

export default EventsList;
