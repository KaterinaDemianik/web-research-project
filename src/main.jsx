import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = new URL('service-worker.js', import.meta.env.BASE_URL).toString()
      navigator.serviceWorker.register(swUrl).catch(() => {})
    })
  }
}

if (import.meta.env.PROD) {
  registerSW()
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
