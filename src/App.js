import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Box from '@mui/material/Box';
import XLSX from 'sheetjs-style';
import Button from '@mui/material/Button';

export default function ExportData() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 5,
    maxColumns: 6,
  });
  console.log(data);
  const handleExport = (data) => {
    const filetype =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blobExcel = new Blob([excelBuffer], { type: filetype });
    console.log(blobExcel);
    const bloburl = URL.createObjectURL(blobExcel);
    console.log(bloburl);
    const link = document.createElement('a');
    link.href = bloburl;
    link.download = 'data';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ height: 380, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid {...data} />
          <Button
            variant="outlined"
            size="small"
            onClick={handleExport}
            style={{ m: 2, cursor: 'pointer' }}
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}
