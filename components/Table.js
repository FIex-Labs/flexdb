import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../styles/Table.module.css'
import { useMemo, useState } from "react"
import { GridContext } from './GridContext'
import { CustomHeader } from "./CustomHeader"
import { SetLeftFeature } from "ag-grid-community"

export default function Table() {
  // const containerStyle = useMemo(() => ({ width: '100vw', height: '100vh' }), [])
  const gridStyle = useMemo(() => ({ height: '90vh', width: '100vw' }), [])

  const [editingHeaderId, setEditingHeaderId] = useState(null)

  const unfocusColumn = (colId = null) => {
    setEditingHeaderId(colId);
  }

  const emptyRows = Array.from({length: 100}, () => ({}))
  const [rowData, setRowData] = useState(emptyRows)

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "",
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
      cellStyle: {border: 'solid', borderColor: '#F0F0F0', borderRightWidth: '1px', borderLeftWidth: '1px', borderTopWidth: '1px', borderBottomWidth: '0px'},
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
    // onCellValueChanged: (params) => {
    //   console.log(params.data)
    // },
    onFirstDataRendered: (params) => {
      params.api.sizeColumnsToFit();
    },
  }

  return (
    <div >
      <div style={gridStyle} className="ag-theme-alpine">
        <GridContext.Provider value={{editingHeaderId, unfocusColumn}}>
        <button onClick={() => unfocusColumn('c1')}>rename c1</button>
        <button onClick={() => unfocusColumn('c2')}>rename c2</button>
        <button onClick={() => unfocusColumn('c3')}>rename c3</button>
          <AgGridReact
            gridOptions={gridOptions}
          
          />
        </GridContext.Provider>
      </div>
    </div>
  )
}