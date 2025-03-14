import MainPage from '../pages/main';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
