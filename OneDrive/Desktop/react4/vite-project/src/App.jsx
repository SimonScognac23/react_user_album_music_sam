import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  return (  // ritorna il codice JSX che definisce la struttura dell'interfaccia utente
    // Dobbiamo avere sempre un elemento padre che racchiude tutti gli altri elementi
    // Il tag padre deve inglobare tutto il codice JSX, posso usare anche un framgment <>
    // Un framgment è un elemento vuoto che non viene renderizzato nel DOM
    // Oppure react.fragment che è la stessa cosa
    <div className="App">
      <h1>My first React App</h1>
    </div>


  );
}

export default App;
