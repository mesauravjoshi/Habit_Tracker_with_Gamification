import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { ArchiveProvider } from './Context/ArchiveContext'
import { StreaXPProvider } from './Context/Strea&XPContext.jsx'
import { ThemeProvider } from './Context/ThemeProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <ArchiveProvider>
          <StreaXPProvider>
              <App />
          </StreaXPProvider>
        </ArchiveProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
)
