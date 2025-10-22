// Importa StrictMode da React - un componente che aiuta a rilevare problemi nel codice
import { StrictMode } from 'react'

// Importa createRoot da react-dom/client - API React 18 per creare il root dell'app
import { createRoot } from 'react-dom/client'

// Importa gli stili CSS globali dell'applicazione
import './index.css'

// Importa il componente principale App dalla cartella corrente
import App from './App.jsx'

// Trova l'elemento HTML con id="root" e crea un root React
// document.getElementById('root') cerca il <div id="root"></div> in index.html
createRoot(document.getElementById('root')).render(
  // StrictMode è un wrapper che attiva controlli aggiuntivi in sviluppo
  <StrictMode>
    {/* Qui viene renderizzato il componente principale App */}
    <App />
  </StrictMode>,
)
