// CreateForm.js
import React, {useState} from 'react';
import BodyText from '@enact/sandstone/BodyText';
import Input from '@enact/sandstone/Input';
import Button from '@enact/sandstone/Button';

const CreateForm = ({currentSelectedDate, postObj, triggerNotification, onClose}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim() !== '') {
      // Save event
      postObj({title, date: currentSelectedDate});
      triggerNotification({message: 'Event created!'});
      setTitle('');
      if (onClose) onClose();
    }
  };

  return (
    <div>
      <BodyText>
        New Event for {currentSelectedDate.toLocaleDateString()}
      </BodyText>
      <Input
        placeholder="Event title"
        value={title}
        onChange={({value}) => setTitle(value)}
      />
      <Button onClick={handleSubmit}>Add Event</Button>
      <Button onClick={onClose} color="neutral">Cancel</Button>
    </div>
  );
};

export default CreateForm;
