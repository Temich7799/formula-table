import { EditableMathField as ReactMathQuillField } from 'react-mathquill';
import { Box, styled } from '@mui/material';

interface EditableMathFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const StyledMathFieldContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  '& .mq-editable-field': {
    textarea: {
      width: '100%'
    },
    height: '100%',
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

const EditableMathField: React.FC<EditableMathFieldProps> = ({ value, onChange }) => {
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
        onChange={handleChange}
      />
    </StyledMathFieldContainer>
  );
};

export default EditableMathField;
