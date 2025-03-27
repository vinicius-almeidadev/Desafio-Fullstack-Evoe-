import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.scss'
import App from './App.tsx'
// PrimeReact CSS
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
