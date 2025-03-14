import React, { useState } from 'react';
import { TextField, Autocomplete, Chip, Popover, MenuItem } from '@mui/material';

const formulaOptions = ['x', 'y', 'z', '+', '-', '*', '/', '^', '(', ')'];

interface FormulaCellProps {
  value: string;
  onChange: (newValue: string) => void;
}

const FormulaCell: React.FC<FormulaCellProps> = ({ value, onChange }) => {
  const [tags, setTags] = useState<string[]>(value.split(' '));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleDelete = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onChange(newTags.join(' '));
  };

  const handleTagClick = (event: React.MouseEvent<HTMLElement>, tag: string) => {
    setSelectedTag(tag);
    setAnchorEl(event.currentTarget);
  };

  const handleTagsChange = (event: any, newTags: string[]) => {
    setTags(newTags);
    onChange(newTags.join(' '));
    setInputValue('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.endsWith(' ')) {
      const newTag = value.trim();
      if (newTag) {
        const newTags = [...tags, newTag];
        setTags(newTags);
        onChange(newTags.join(' '));
        setInputValue('');
      }
    }
  };

  return (
    <>
      <Autocomplete
        freeSolo
        multiple
        inputValue={inputValue}
        options={formulaOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ '& .MuiOutlinedInput-root': { padding: '0 !important' } }}
            onChange={handleInputChange}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option}
              label={option}
              sx={{
                background: 'transparent',
                border: 'none',
                '& .MuiChip-deleteIcon': { display: 'none' },
                '&:hover': { background: 'transparent' },
                padding: 0,
                height: 'auto',
                '& .MuiChip-label': { padding: '0 4px' }
              }}
              onClick={(event) => handleTagClick(event, option)}
              onDelete={() => handleDelete(option)}
            />
          ))
        }
        value={tags}
        onChange={handleTagsChange}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => console.log(`Editing ${selectedTag}`)}>Edit</MenuItem>
        <MenuItem onClick={() => selectedTag && handleDelete(selectedTag)}>Delete</MenuItem>
      </Popover>
    </>
  );
};

export default FormulaCell;
