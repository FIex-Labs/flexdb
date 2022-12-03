import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../styles/Table.module.css'
import { useMemo, useState } from "react"

export default function Table() {
  const containerStyle = useMemo(() => ({ width: '100vh', height: '100vw' }), []);
  const gridStyle = useMemo(() => ({ height: '100vh', width: '100vw' }), []);

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "",
      valueGetter: "node.rowIndex + 1",
      editable: false,
      sortable: false,
      resizable: false,
      suppressSizeToFit: true,
      width: 70
    },
    {
      headerName: "Make",
      field: "make",
    },
    {
      headerName: "Model",
      field: "model",
    },
    {
      headerName: "Price",
      field: "price",
    },
  ])


  // const [rowData, setRowData] = useState([
  //   Array.from({length: 100}, () => ({make: "", model: "", price: ""}))
  // ])

  const rowData = Array.from({length: 100}, () => ({make: "", model: "", price: ""}));
  
  const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      editable: true,
      cellStyle: {border: 'solid', borderColor: '#F0F0F0', borderRightWidth: '1px', borderLeftWidth: '1px', borderTopWidth: '1px', borderBottomWidth: '0px'},
      resizable: true,
      // sortable: true,
      suppressSizeToFit: false,
    },
    rowData: rowData,
    singleClickEdit: true,
    onCellValueChanged: (params) => {
      console.log(params.data)
    },
    onFirstDataRendered: (params) => {
      params.api.sizeColumnsToFit();
    },
  }

  return (
    <div  style={containerStyle}> 
      <div style={gridStyle} className="ag-theme-alpine">

        <AgGridReact
          gridOptions={gridOptions}
        />
      </div>
    </div>
  )
}