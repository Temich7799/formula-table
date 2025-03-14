import React from 'react';
import { EditableMathField as ReactMathQuillField } from 'react-mathquill';
import { Box, styled } from '@mui/material';

interface EditableMathFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const StyledMathFieldContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  '& .mq-editable-field': {
    minHeight: '36px',
    width: '100%',
    padding: '5px 10px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    '&.mq-focused': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      padding: '4px 9px'
    },
    '&[data-placeholder]:empty:before': {
      content: 'attr(data-placeholder)',
      color: theme.palette.text.disabled
    }
  }
}));

const EditableMathField: React.FC<EditableMathFieldProps> = ({
  value,
  onChange,
  placeholder = 'Enter formula'
}) => {
  const handleChange = (mathField: any) => {
    onChange(mathField.latex());
  };

  return (
    <StyledMathFieldContainer>
      <ReactMathQuillField
        config={{
          spaceBehavesLikeTab: true
        }}
        latex={value || ''}
        mathquillDidMount={(mathField) => {
          const element = mathField.el();
          if (element) {
            element.setAttribute('data-placeholder', placeholder);
          }
        }}
        onChange={handleChange}
      />
    </StyledMathFieldContainer>
  );
};

export default EditableMathField;
