import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Stack, TextField } from '@mui/material';

interface CellEditorProps {
  cellId: string;
  initialValue: string;
  onSave: (id: string, value: string) => void;
}

const CellEditor = ({ cellId, initialValue, onSave }: CellEditorProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(cellId, value);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'value', headerName: 'Value', width: 150, editable: true }
  ];

  const rows = [{ id: cellId, value: value }];

  return (
    <Stack>
      <TextField value={value} onBlur={handleSave} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={handleSave}>Save</Button>
      <Box sx={{ height: 300, width: '100%' }}>
        <DataGrid disableRowSelectionOnClick columns={columns} pageSizeOptions={[5]} rows={rows} />
      </Box>
    </Stack>
  );
};

export default CellEditor;
