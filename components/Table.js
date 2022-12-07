import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import gridStyles from '../styles/Table.module.css'
import navBarStyles from '../styles/NavBar.module.css'
import schemaEditorStyles from '../styles/SchemaEditor.module.css'
import gptInputStyles from '../styles/GptInput.module.css'

import { useMemo, useState, useRef } from "react"
import { GridContext } from './GridContext'
import { CustomHeader } from "./CustomHeader"
import { SchemaEditor } from "./SchemaEditor"
import { GptInput } from "./GptInput"

export default function Table() {
  const gridStyle = useMemo(() => ({ height: '90vh', width: '100vw' }), [])

  const [editingHeaderId, setEditingHeaderId] = useState(null)
  let colId = useRef(1)

  const toggleHeaderFocus = (colId = null) => {
    setEditingHeaderId(colId)
  }

  const [newColText, setNewColText] = useState("");
  const emptyRows = Array.from({length: 100}, () => ({}))
  const [rowData, setRowData] = useState(emptyRows)

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "",
      field: "row_id",
      valueGetter: "node.rowIndex + 1",
      editable: false,
      sortable: false,
      resizable: false,
      pinned: 'left',
      // suppressSizeToFit: true,
      width: 70
    },
    {
      headerName: "Blank",
      field: "1",
    },
    {
      headerName: "Blank",
      field: "2",
    },
    {
      headerName: "Blank",
      field: "3",
    },
  ])

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      cellStyle: {border: 'solid', borderColor: '#F0F0F0', borderRightWidth: '1px', borderLeftWidth: '1px', borderTopWidth: '0px', borderBottomWidth: '0px'},
      resizable: true,
      // sortable: true,
      // suppressSizeToFit: false,
    }
  }, [])

  const components = useMemo(() => {
    return {
      agColumnHeader: CustomHeader,
    };
  }, [])
  
  const gridOptions = {
    defaultColDef: defaultColDef,
    rowData: rowData,
    singleClickEdit: true,
    components: components,
    // maxWidth: 20,
    width: 50,
    
    onCellValueChanged: (params) => {
      // console.log(params.data)
    },
    onFirstDataRendered: (params) => {
      // params.api.sizeColumnsToFit()
      colId.current = params.columnApi.getAllGridColumns().length - 1
    },
    onGridColumnsChanged: (params) => {
      // params.api.sizeColumnsToFit()
    }
  }

  const addColumn = () => {
    if (newColText.length === 0) {
      return
    }
    colId.current += 1
    let cols = columnDefs;
    let newCols = [...cols, { headerName: newColText, field: colId.current.toString() }]
    setColumnDefs(newCols)
    setNewColText("")
  }

  const deleteColumn = (colIdString) => {
    let cols = columnDefs
    let newCols = cols.filter((col) => col.field !== colIdString)
    setColumnDefs(newCols)
  }

  const handleChange = (event) => {
    setNewColText(event.target.value)
  }

  const [isOpen, setIsOpen] = useState(false)

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div style={gridStyle} className={`${gridStyles.agthemealpine} ag-theme-alpine`}>
      <GridContext.Provider value={{editingHeaderId, toggleHeaderFocus, setColumnDefs}}>
        <div className={navBarStyles.navBar}>
          <SchemaEditor>
            <button onClick={() => setIsOpen(!isOpen)}>Schema Editor</button>
            {isOpen && 
            <div className={schemaEditorStyles.menu} onKeyDown={handleKeyDown}>
              <input type="text" value={newColText} onChange={handleChange}/>
              <button onClick={addColumn}>Add Column</button>
              <div>{columnDefs.length - 1} Columns</div>
              {columnDefs.map((colDef) => {
                if (colDef.field === 'row_id') {
                  return null
                }
                return (
                  <div key={colDef.field} className={navBarStyles.header}>
                    <div>{colDef.headerName}</div>
                    <button onClick={() => toggleHeaderFocus(colDef.field)}>Edit</button>
                    <button onClick={() => deleteColumn(colDef.field)}>Delete</button>
                  </div>
                )
              })}
            </div>
            }
          </SchemaEditor>
          <GptInput>
            <div className={gptInputStyles.menu}>
              <input type="text" placeholder="Enter your query" />
              <button>Submit</button>
            </div>
          </GptInput>
        </div>
        <AgGridReact
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          colResizeDefault={'shift'}
        />
      </GridContext.Provider>
    </div>
  )
}