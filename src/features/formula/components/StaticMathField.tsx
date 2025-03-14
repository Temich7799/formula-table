import React from 'react';
import { StaticMathField as ReactMathQuillStatic } from 'react-mathquill';
import { Box, styled } from '@mui/material';

interface StaticMathFieldProps {
  children: string;
}

const StyledMathFieldContainer = styled(Box)(({ theme }) => ({
  '& .mq-math-mode': {
    fontSize: '16px',
    color: 'inherit',
    border: 'none',
    padding: '2px 0',
    background: 'transparent',
    '& .mq-root-block': {
      display: 'flex',
      alignItems: 'center'
    }
  }
}));

const StaticMathField: React.FC<StaticMathFieldProps> = ({ children }) => {
  return (
    <StyledMathFieldContainer>
      <ReactMathQuillStatic>{children}</ReactMathQuillStatic>
    </StyledMathFieldContainer>
  );
};

export default StaticMathField;
