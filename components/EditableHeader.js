// import { forwardRef } from "react";
// import { baseComponentWrapper } from "ag-grid-react/lib/baseComponentWrapper";
import React, { useEffect, useRef, useState } from 'react';

const EditableHeader = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.displayName);

  function onKeyDown(e) {
    if (e.keyCode === 13) {
      // Enter key
      setIsEditing(false);
    } else if (e.keyCode === 27) {
      // Esc key
      setIsEditing(false);
      setValue(props.displayName);
    }
  }

  function onClick() {
    setIsEditing(true);
  }

  function onBlur() {
    setIsEditing(false);
  }

  function getValue() {
    return value;
  }

  if (isEditing) {
    return (
      <input
        // ref={ref}
        className="editable-header"
        ref={input => input && input.focus()}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    );
  } else {
    return (
      <span
        ref={ref}
        className="editable-header"
        onClick={onClick}
      >
        {value}
      </span>
    );
  }
}

// EditableHeader.displayName = "EditableHeader"

// const EditableHeaderWrapper = baseComponentWrapper({
//   component: EditableHeader
// })

export default EditableHeader