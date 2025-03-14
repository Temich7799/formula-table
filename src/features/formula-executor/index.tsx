import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { evaluateFormula } from '../../shared/lib/formula-parser';
import { Stack, TextField } from '@mui/material';

interface FormulaExecutorProps {
  formula: string;
  onResult: (result: any) => void;
}

const FormulaExecutor = ({ formula, onResult }: FormulaExecutorProps) => {
  const handleEvaluate = () => {
    try {
      const result = evaluateFormula(formula);
      onResult(result);
    } catch (error) {
      console.error('Error evaluating formula:', error);
      onResult('Error');
    }
  };

  useEffect(() => {
    handleEvaluate();
  }, [formula]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'formula', headerName: 'Formula', width: 150 },
    { field: 'result', headerName: 'Result', width: 150 }
  ];

  const rows = [{ id: 1, formula: formula, result: evaluateFormula(formula) }];

  return (
    <Stack sx={{ height: 400, width: '100%' }}>
      <DataGrid disableRowSelectionOnClick columns={columns} pageSizeOptions={[5]} rows={rows} />
      <TextField value={formula} />
    </Stack>
  );
};

export default FormulaExecutor;
