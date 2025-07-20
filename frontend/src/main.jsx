import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Components/Context/AuthContext.jsx'
import { ArchiveProvider } from './Components/Context/ArchiveContext'
import { StreaXPProvider } from './Components/Context/Strea&XPContext.jsx'
import { BrowserRouter } from 'react-router-dom'  // ✅ Import BrowserRouter
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>  {/* ✅ Wrap everything inside */}
    <AuthProvider>
      <ArchiveProvider>
        <StreaXPProvider>
          <App />
        </StreaXPProvider>
      </ArchiveProvider>
    </AuthProvider>
  </BrowserRouter>
)
