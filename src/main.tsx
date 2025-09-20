import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from './components/ui/Toast/toast.tsx';
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer, toast } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-middle'>
            <App />
      </Toaster>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
