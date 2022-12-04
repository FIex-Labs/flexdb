import React, { useRef, useMemo } from 'react'
import Table from './Table'
import { SchemaEditor } from './SchemaEditor'
import { GptInput } from './GptInput'
import { GridContext } from './GridContext'

export default function Engine(props) {
  const containerStyle = useMemo(() => ({ width: '100vw', height: '100vh' }), [])

  return (
    <div style={containerStyle}>
      <SchemaEditor></SchemaEditor>
      <GptInput></GptInput>
      <Table></Table>
    </div>
  )
}