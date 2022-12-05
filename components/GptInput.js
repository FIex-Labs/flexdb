import React, { useState } from 'react'

export const GptInput = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>GPT Input</button>
      {isOpen && props.children}
    </div>
  )
}