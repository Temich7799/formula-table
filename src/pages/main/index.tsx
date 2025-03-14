import { DataGrid, GridColDef, GridRenderEditCellParams, useGridApiRef } from '@mui/x-data-grid';
import { useGetTableDataQuery } from '../../features/table/api';
import FormulaCell from '../../entities/ui/FormulaCell';

const MainPage = () => {
  const apiRef = useGridApiRef();
  const { data: rows = [], isLoading } = useGetTableDataQuery();

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
      loading={isLoading}
      pageSizeOptions={[5, 10, 25]}
      rows={rows}
      sx={{
        '& .MuiDataGrid-cell--editing, .MuiAutocomplete-root': {
          width: '100%'
        }
      }}
    />
  );
};

export default MainPage;
