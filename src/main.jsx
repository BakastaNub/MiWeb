import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = 'https://use.fontawesome.com/releases/v6.4.2/css/all.css'
document.head.appendChild(link)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
