import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

interface CellProps {
  value: string | number;
  onChange: (newValue: string | number) => void;
}

const Cell = ({ value, onChange }: CellProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      fullWidth
      className="cell-input"
      size="small"
      value={value}
      variant="outlined"
      onChange={handleChange}
    />
  );
};

export default Cell;
