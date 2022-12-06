import React, { useState, useRef } from 'react'
import { GridContext } from './GridContext'

export const CustomHeader = (props) => {
  const [value, setValue] = useState(props.displayName)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleKeyPress = (event, toggleHeaderFocus, setColumnDefs) => {
    if (event.key == 'Enter') {
      if (value.length === 0) {
        toggleHeaderFocus()
        return
      }
      let cols = props.api.getColumnDefs()
      let currentColumnId = props.column.getColId()
      let newCols = []

      cols.forEach((colDef) => {
        if (colDef.colId == currentColumnId) {
          newCols.push({ ...colDef, headerName: value })
        } else {
          newCols.push({ ...colDef })
        }
      });

      setColumnDefs(newCols)
      props.api.setColumnDefs(newCols)
      toggleHeaderFocus()
      // Refreshes header but only changes one column header
      // props.column.getColDef().headerName = value
      // props.api.refreshHeader()
    }
  }

  return (
    <GridContext.Consumer>
      { ({ editingHeaderId, toggleHeaderFocus, setColumnDefs }) => {
        let column = null;
        if (editingHeaderId === props.column.getColId()) {
          column = (
            <input
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyPress(e, toggleHeaderFocus, setColumnDefs)}
            />
          )
        } else {
          column = <div className="customHeaderLabel">{props.displayName}</div>
        }
        return column
      }}
    </GridContext.Consumer>
  )
}
