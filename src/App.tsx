import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;