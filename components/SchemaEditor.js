import React, { useState } from 'react'

export const SchemaEditor = (props) => {
  const [value, setValue] = useState(props.value)

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      props.onEnter(value)
    }
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
    />
  )
}