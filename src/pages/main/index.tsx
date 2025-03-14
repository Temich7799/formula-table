import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { useGetTableDataQuery } from '../../features/table/api';
import FormulaCell from '../../entities/ui/FormulaCell';

const MainPage = () => {
  const apiRef = useGridApiRef();
  const { data: rows = [], isLoading } = useGetTableDataQuery();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    {
      field: 'value',
      headerName: 'Input',
      width: 130,
      editable: true,
      renderCell: (params) => {
        if (!params.value) return '-';
        return params.value;
      },
      renderEditCell: (params) => (
        <FormulaCell
          value={params.value || ''}
          onChange={(newValue) => {
            params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue });
          }}
        />
      )
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
    />
  );
};

export default MainPage;
