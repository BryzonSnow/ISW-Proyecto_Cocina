import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SnackbarProvider } from "./components/SnackbarContext.jsx"; // Importa el SnackbarProvider
import '@fontsource/newsreader';
import '@fontsource/newsreader/400.css'; 
import '@fontsource/newsreader/700.css'; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </StrictMode>
);
