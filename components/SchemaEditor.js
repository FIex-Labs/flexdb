import React, { useState } from 'react'
import styles from '../styles/SchemaEditor.module.css'

export const SchemaEditor = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div>
      {/* <button onClick={() => setIsOpen(!isOpen)} onKeyDown={handleKeyDown}>Schema Editor</button> */}
      {/* {isOpen && props.children} */}
      {props.children}
    </div>
  )
}