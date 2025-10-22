// Importazione delle dipendenze necessarie per React
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// ✅ CORRETTO: Importazione del componente Clock dal file Clock.jsx
import Clock from './Clock.jsx'  // <-- Cambiato qui!

// Resto del codice rimane uguale...


// Definizione di un elemento JSX come costante
// Questo è un elemento React che può essere riutilizzato
const happy = <h2>Sono felice di imparare React!</h2>

// Definizione del componente principale App
// Questo è un functional component (componente funzionale)
function App() {
  // Il componente restituisce JSX che descrive la struttura dell'interfaccia
  return (
    <div className="App">
      {/* Header dell'applicazione */}
      <header>
        <h1>Benvenuto nella mia App React!</h1>
        <p>Questa è una applicazione React funzionale</p>
      </header>

      {/* Contenuto principale dell'applicazione */}
      <main>
        <section>
          <h2>Sezione principale</h2>
          {/* Inserimento dell'elemento JSX definito sopra */}
          {happy}
          {/* Inclusione del componente Clock importato */}
          <Clock show country="Italy" timezone="Europe/Rome" />

          <Clock show country="USA" timezone="America/New_York" />
      

          <p>Qui puoi aggiungere il contenuto della tua applicazione.</p>
        </section>
      </main>

      {/* Footer dell'applicazione */}
      <footer>
        <p>&copy; 2025 La mia App React</p>
      </footer>
    </div>
  );
}

// Esportazione del componente come export di default
// Questo permette di importarlo in altri file
export default App
