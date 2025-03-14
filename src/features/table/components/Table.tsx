import { DataGrid, GridColDef, GridRenderEditCellParams, useGridApiRef } from '@mui/x-data-grid';
import FormulaCell from '../../formula/components/FormulaCell';
import { TableItem } from '../model/types';

interface TableProps {
  rows: TableItem[];
  loading: boolean;
}

const Table = (props: TableProps) => {
  const apiRef = useGridApiRef();

  const handleFormulaChange = (params: GridRenderEditCellParams, newValue: string) => {
    params.api.setEditCellValue({
      id: params.id,
      field: params.field,
      value: newValue
    });
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    {
      field: 'value',
      headerName: 'Input',
      width: 200,
      editable: true,
      renderCell: (params) => params.value || '-',
      renderEditCell: (params) => {
        return (
          <FormulaCell
            value={String(params.value)}
            onChange={(newValue) => handleFormulaChange(params, newValue)}
          />
        );
      }
    },
    {
      field: 'inputs',
      headerName: 'Value',
      width: 130,
      renderCell: (params) => params.value || '-'
    }
  ];

  return (
    <DataGrid
      apiRef={apiRef}
      columns={columns}
      pageSizeOptions={[5, 10, 25]}
      sx={{
        '.MuiDataGrid-cell--editing': {
          width: '70%'
        },
        '.MuiAutocomplete-root, .MuiAutocomplete-root .MuiFormControl-root, .MuiInputBase-root': {
          width: '100%',
          height: '100%'
        }
      }}
      {...props}
    />
  );
};

export default Table;
