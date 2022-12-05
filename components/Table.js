import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import gridStyles from '../styles/Table.module.css'
import navBarStyles from '../styles/NavBar.module.css'
import { useMemo, useState } from "react"
import { GridContext } from './GridContext'
import { CustomHeader } from "./CustomHeader"
import { SchemaEditor } from "./SchemaEditor"
import { GptInput } from "./GptInput"

export default function Table() {
  const gridStyle = useMemo(() => ({ height: '90vh', width: '100vw' }), [])

  const [editingHeaderId, setEditingHeaderId] = useState(null)



  const toggleHeaderFocus = (colId = null) => {
    setEditingHeaderId(colId);
  }

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
      suppressSizeToFit: true,
      width: 70
    },
    {
      headerName: "Blank",
      field: "c1",
    },
    {
      headerName: "Blank",
      field: "c2",
    },
    {
      headerName: "Blank",
      field: "c3",
    },
  ])

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      cellStyle: {border: 'solid', borderColor: '#F0F0F0', borderRightWidth: '1px', borderLeftWidth: '1px', borderTopWidth: '0px', borderBottomWidth: '0px'},
      resizable: true,
      // sortable: true,
      suppressSizeToFit: false,
    }
  }, [])

  const components = useMemo(() => {
    return {
      agColumnHeader: CustomHeader,
    };
  }, [])
  
  const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: defaultColDef,
    rowData: rowData,
    singleClickEdit: true,
    components: components,
    onCellValueChanged: (params) => {
      // console.log(params.data)
    },
    onFirstDataRendered: (params) => {
      params.api.sizeColumnsToFit();
    },
  }

  return (
    <div style={gridStyle} className={`${gridStyles.agthemealpine} ag-theme-alpine`}>
      <GridContext.Provider value={{editingHeaderId, toggleHeaderFocus, setColumnDefs}}>
        <div className={navBarStyles.navBar}>
          <SchemaEditor>
            {columnDefs.map((colDef) => {
              if (colDef.field === 'row_id') {
                return null
              }
              return (
                <div key={colDef.field} className={navBarStyles.header}>
                  <div>{colDef.headerName}</div>
                  <button onClick={() => toggleHeaderFocus(colDef.field)}>rename {colDef.headerName}</button>
                </div>
              )
            })}
            <button>Add Column</button>
          </SchemaEditor>
          <GptInput></GptInput>
        </div>
        <AgGridReact
          gridOptions={gridOptions}
        />
      </GridContext.Provider>
    </div>
  )
}