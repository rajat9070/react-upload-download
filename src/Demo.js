import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import XLSX from 'sheetjs-style';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
];

const rowsvalue = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo() {
  const handleExport = (rowsvalue) => {
    const filetype =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const ws = XLSX.utils.json_to_sheet(rowsvalue);
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

  const onUpload = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.onload = (event) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          resolve(
            workbook.SheetNames.map((sheet) => {
              return XLSX.utils.sheet_to_row_object_array(
                workbook.Sheets[sheet]
              );
            })
          );
        };
      } else {
        reject('Error in importExcel function');
      }
    });
  };

  return (
    <div>
      <Box sx={{ height: 365, width: '100%', mb: 2 }}>
        <DataGrid rows={rowsvalue} columns={columns} pageSize={5} />
      </Box>
      <Box>
        <div>
          <Stack spacing={5} direction="row">
            <Button variant="outlined" onClick={() => handleExport(rowsvalue)}>
              download
            </Button>
            <section>
              <input
                type="file"
                id="fileUploadButton"
                style={{ display: 'none' }}
                onChange={onUpload}
              />
              <InputLabel htmlFor={'fileUploadButton'}>
                <Button variant="outlined" component="span">
                  Upload
                </Button>
              </InputLabel>
            </section>
          </Stack>
        </div>
      </Box>
    </div>
  );
}
