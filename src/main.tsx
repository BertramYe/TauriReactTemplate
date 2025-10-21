import App from './App';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "@pheralb/toast";



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster theme={'system'} position={'bottom-right'} />
  </StrictMode>
)
