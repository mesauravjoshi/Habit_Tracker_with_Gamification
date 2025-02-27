import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Components/Context/AuthContext.jsx'
import { ArchiveProvider } from './Components/Context/ArchiveContext';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // </StrictMode>,
  <AuthProvider>
    <ArchiveProvider>
    <App />
    </ArchiveProvider>
  </AuthProvider>,
)
