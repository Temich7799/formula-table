import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../shared/api';
import { API_ENDPOINTS } from '../../../shared/api/endpoints';
import { TableItem } from '../model/types';

const getTableData = async (): Promise<TableItem[]> => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.TABLE_DATA);
  return data;
};

export const useGetTableDataQuery = () => {
  return useQuery({
    queryKey: ['tableData'],
    queryFn: getTableData
  });
};
