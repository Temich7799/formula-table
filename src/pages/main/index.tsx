import { DataGrid } from '@mui/x-data-grid';
import { useGetTableDataQuery } from '../../features/table/api';

const MainPage = () => {
  const { data: rows = [], isLoading } = useGetTableDataQuery();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    {
      field: 'value',
      headerName: 'Value',
      width: 130,
      renderCell: (params) => {
        if (params.value === '') return '-';
        return params.value;
      }
    },
    {
      field: 'inputs',
      headerName: 'Inputs',
      width: 130,
      renderCell: (params) => params.value || '-'
    }
  ];

  return (
    <DataGrid
      checkboxSelection
      disableRowSelectionOnClick
      columns={columns}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25]}
      rows={rows}
    />
  );
};

export default MainPage;
