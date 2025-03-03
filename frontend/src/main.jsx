import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Components/Context/AuthContext.jsx'
import { ArchiveProvider } from './Components/Context/ArchiveContext';
import { StreaXPProvider } from './Components/Context/Strea&XPContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ArchiveProvider>
      <StreaXPProvider>
        <App />
      </StreaXPProvider>
    </ArchiveProvider>
  </AuthProvider>,
)
