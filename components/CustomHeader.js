import React, { useState } from 'react'
import { GridContext } from './GridContext'

export const CustomHeader = (props) => {
  const [value, setValue] = useState(props.displayName)

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleKeyPress = (event, unfocusColumn) => {
    if (event.key == 'Enter') {
      props.column.getColDef().headerName = value
      props.column.getColDef().id = value
      props.column.getColDef().key = value

      props.api.refreshHeader()
      unfocusColumn();
    }
  }

  return (
    <GridContext.Consumer>
      { ({ editingHeaderId, unfocusColumn }) => {
        let column = null;
        if (editingHeaderId === props.column.getColId()) {
          column = (
            <input
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyPress(e, unfocusColumn)}
            />
          )
        } else {
          column = <div className="customHeaderLabel">{props.displayName}</div>;
        }
        return column
      }}
    </GridContext.Consumer>
  )
}
