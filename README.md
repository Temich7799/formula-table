To start the development server, run:

```sh
npm run dev
```

This will start the Vite development server on `http://localhost:3000`.

## Usage Instructions

### Value Input Guide

- **Column References**:
  - Start typing a column name or category to open the suggestion dropdown
  - Use arrow keys and click to select from the dropdown
  - Note: Enter key selection currently have UX issues

- **Mathematical Operations**:
  - Use any standard mathematical operators for calculations (+, -, *, /, etc.)
  - Example: `column1 + column2 * 2`

- **Formulas**:
  - Start with an opening parenthesis '(' to begin formula input
  - Note: Formula input feature is under development

- **Tag Removal**:
  - Use Backspace key to remove selected tags or references

## Features Implemented

- **Table Component**: Data fetching and management using React Query
- **Editable Math Field**: Basic mathematical expression editing
- **FSD Architecture**: Initial implementation of feature-sliced structure

## Features to Implement

- Complete formula validation and suggestion system
- Add real-time calculation updates in the table
- Styling and UX issues
- Implement state management for complex calculations