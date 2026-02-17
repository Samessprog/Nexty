import '@/lib/amplify'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/i18n'
import '@/index.css'
import App from '@/App'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
