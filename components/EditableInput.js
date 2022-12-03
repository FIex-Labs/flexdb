import React, { useState } from 'react';

export default function EditableInput() {
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  function handleClick() {
    setIsEditing(true);
  }

  function handleBlur() {
    setIsEditing(false);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      setIsEditing(false);
    }
  }

  return (
    <div onClick={handleClick} onBlur={handleBlur} onKeyPress={handleKeyPress}>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
      ) : (
        <span>{inputValue}</span>
      )}
    </div>
  );
}



