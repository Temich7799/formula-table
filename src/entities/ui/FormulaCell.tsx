import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

interface FormulaCellProps {
  value: string;
  onChange: (newValue: string) => void;
}

const FormulaCell = ({ value, onChange }: FormulaCellProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      fullWidth
      size="small"
      value={value || ''}
      variant="outlined"
      onChange={handleChange}
    />
  );
};

export default FormulaCell;
