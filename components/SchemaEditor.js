import React, { useState } from 'react'
import styles from '../styles/SchemaEditor.module.css'

export const SchemaEditor = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Schema Editor</button>
      {isOpen && props.children}
    </div>
  )
}