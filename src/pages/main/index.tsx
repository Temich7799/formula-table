import { useGetTableDataQuery } from '../../features/table/api';
import Table from '../../features/table/components/Table';

const MainPage = () => {
  const { data: rows = [], isLoading } = useGetTableDataQuery();
  return <Table loading={isLoading} rows={rows} />;
};

export default MainPage;
