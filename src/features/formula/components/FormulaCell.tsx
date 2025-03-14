import React, { useState, useCallback } from 'react';
import { TextField, Autocomplete, Chip, useTheme } from '@mui/material';
import { parseFormulaToTokens } from '../lib';
import EditableMathField from './EditableMathField';
import StaticMathField from './StaticMathField';
import { useGetTableDataQuery } from '../../table/api';

const mathOperatorRegex = /[+\-*/^]/;

const openingParenthesisRegex = /\(/;

const closingParenthesisRegex = /\)/;

interface FormulaCellProps {
  value: string;
  onChange: (newValue: string) => void;
}

const FormulaCell: React.FC<FormulaCellProps> = ({ value, onChange }) => {
  const theme = useTheme();
  const [tags, setTags] = useState<string[]>(() => parseFormulaToTokens(value));

  const [inputValue, setInputValue] = useState('');
  const [showMathField, setShowMathField] = useState(false);
  const [mathExpression, setMathExpression] = useState('');
  const [currentExpression, setCurrentExpression] = useState('');

  const { data: tableData = [] } = useGetTableDataQuery();

  const tableValues = tableData.reduce((acc: string[], row) => {
    if (row.name && row.name !== '-') acc.push(row.name);
    if (row.category && row.category !== '-') acc.push(String(row.category));
    return acc;
  }, []);

  const formulaOptions = tableValues.map((val) => `#${val}`);

  const handleDelete = useCallback(
    (tag: string) => {
      const newTags = tags.filter((t) => t !== tag);
      setTags(newTags);
      onChange(newTags.join(''));
    },
    [tags, onChange]
  );

  const handleTagsChange = useCallback(
    (event: any, newTags: string[]) => {
      setTags(newTags);
      onChange(newTags.join(''));
      setInputValue('');
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);

      setCurrentExpression(value);

      if (openingParenthesisRegex.test(value)) {
        console.log('Parenthesis detected:', value);
        setShowMathField(true);
        setMathExpression(value);
        setInputValue('');
        setCurrentExpression('');
        return;
      }

      if (closingParenthesisRegex.test(value) && value.includes('(')) {
        const completeExpression = value;
        const newTags = [...tags, completeExpression];
        setTags(newTags);
        onChange(newTags.join(''));
        setInputValue('');
        setCurrentExpression('');
        return;
      }

      if (mathOperatorRegex.test(value)) {
        const newTokens = parseFormulaToTokens(value);

        if (newTokens.length > 0) {
          const newTags = [...tags, ...newTokens];
          setTags(newTags);
          onChange(newTags.join(''));
          setInputValue('');
          setCurrentExpression('');
        }
      }
    },
    [tags, onChange]
  );

  const handleMathFieldChange = useCallback(
    (latex: string) => {
      if (latex) {
        const newTags = [...tags, latex];
        setTags(newTags);
        onChange(newTags.join(''));
      }
      setShowMathField(false);
      setMathExpression('');
    },
    [tags, onChange]
  );

  const handleInputChangeForAutocomplete = useCallback(
    (event: React.SyntheticEvent, newInputValue: string) => {
      setInputValue(newInputValue);
    },
    []
  );

  const shouldShowOptions = !mathOperatorRegex.test(inputValue);

  const filteredOptions =
    shouldShowOptions && inputValue
      ? formulaOptions.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))
      : [];

  return (
    <Autocomplete
      freeSolo
      multiple
      inputValue={inputValue}
      options={filteredOptions}
      renderInput={(params) => {
        // const InputProps = {
        //   ...params.InputProps,
        //   endAdornment: showMathField && (
        //     <EditableMathField
        //       placeholder="Enter math formula"
        //       value={mathExpression}
        //       onChange={handleMathFieldChange}
        //     />
        //   )
        // };
        return (
          <TextField
            {...params}
            // InputProps={InputProps}
            sx={{ '& .MuiOutlinedInput-root': { padding: '0 !important' } }}
            onChange={handleInputChange}
          />
        );
      }}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          // const isFormula =
          //   !option.startsWith('#') && (option.includes('(') || mathOperatorRegex.test(option));

          const chipProps = getTagProps({ index });

          return (
            <Chip
              {...chipProps}
              key={option + index}
              // label={isFormula ? <StaticMathField>{option}</StaticMathField> : option}
              label={option}
              sx={{
                background: option.startsWith('#') ? theme.palette.primary.main : 'transparent',
                color: option.startsWith('#') ? theme.palette.primary.contrastText : 'inherit',
                border: 'none',
                '& .MuiChip-deleteIcon': { display: 'none' },
                '&:hover': {
                  background: option.startsWith('#') ? theme.palette.primary.dark : 'transparent'
                },
                padding: 0,
                height: 'auto',
                '& .MuiChip-label': { padding: '0 4px' }
              }}
              onDelete={() => handleDelete(option)}
            />
          );
        })
      }
      value={tags}
      onChange={handleTagsChange}
      onInputChange={handleInputChangeForAutocomplete}
    />
  );
};

export default FormulaCell;
