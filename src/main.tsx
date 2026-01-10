import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Disable browser's automatic scroll restoration on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

// Reset scroll to top immediately on page load
window.scrollTo(0, 0)

// Disable Ctrl+scroll zoom
document.addEventListener('wheel', (e) => {
  if (e.ctrlKey) {
    e.preventDefault()
  }
}, { passive: false })

// Disable Ctrl+Plus/Minus zoom
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
    e.preventDefault()
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
