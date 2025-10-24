// ============================================================================
// 📦 SEZIONE IMPORTAZIONI
// ============================================================================
// In questa sezione importiamo tutte le librerie e i file necessari

import { useState, useEffect } from 'react'
// Importiamo due "Hook" fondamentali dalla libreria React:
// - useState: permette di creare variabili che React "osserva" e ri-renderizza quando cambiano
// - useEffect: permette di eseguire codice in risposta a eventi (es. caricamento componente)

import reactLogo from './assets/react.svg'
// Importiamo l'immagine del logo React dalla cartella assets
// (Non usata in questo esempio, ma disponibile per uso futuro)

import viteLogo from '/vite.svg'
// Importiamo l'immagine del logo Vite dalla cartella pubblica
// (Non usata in questo esempio, ma disponibile per uso futuro)

import './App.css'
// Importiamo il foglio di stile CSS per dare aspetto grafico al componente
// Tutti gli stili definiti in App.css verranno applicati a questo componente




// ============================================================================
// 📚 DOCUMENTAZIONE: CONCETTI FONDAMENTALI DI REACT
// ============================================================================

// ----------------------------------------------------------------------------
// Concetto 1️⃣: Cosa sono gli HOOKS?
// ----------------------------------------------------------------------------
// Gli Hook sono funzioni speciali di React che iniziano con "use" (es. useState, useEffect)
// Permettono di "agganciare" funzionalità avanzate ai componenti funzionali:
// - Gestire lo stato (useState)
// - Eseguire effetti collaterali (useEffect)
// - Gestire il contesto (useContext)
// - E molti altri...
//
// STORIA: Prima degli Hook (introdotti in React 16.8 nel 2019), solo i 
// "componenti classe" potevano avere uno stato interno. Gli Hook hanno 
// semplificato molto il codice React!

// ----------------------------------------------------------------------------
// Concetto 2️⃣: Cosa sono i COMPONENTI?
// ----------------------------------------------------------------------------
// Un componente React è un "pezzo riutilizzabile" di interfaccia utente (UI)
// Pensalo come un mattoncino LEGO 🧱:
// - Ogni componente ha una funzione specifica (es. bottone, form, lista)
// - Puoi combinare più componenti per creare interfacce complesse
// - Puoi riutilizzare lo stesso componente in più parti dell'app
//
// TIPI DI COMPONENTI:
// - Componenti funzionali: semplici funzioni JavaScript che restituiscono JSX
// - Componenti classe: classi ES6 (approccio più vecchio, meno usato oggi)

// ----------------------------------------------------------------------------
// Concetto 3️⃣: Come funziona useState?
// ----------------------------------------------------------------------------
// useState è un Hook che permette di creare una "variabile di stato"
//
// SINTASSI:
// const [variabile, setVariabile] = useState(valoreIniziale)
//
// SPIEGAZIONE:
// - "variabile" = contiene il valore CORRENTE dello stato
// - "setVariabile" = funzione per AGGIORNARE lo stato
// - "valoreIniziale" = il valore di partenza (es. 0, "", [], {})
//
// IMPORTANTE: Quando chiami setVariabile(nuovoValore), React:
// 1. Aggiorna il valore della variabile
// 2. Ri-renderizza (ri-disegna) automaticamente il componente
// 3. Mostra i nuovi dati sullo schermo




// ============================================================================
// 🎯 COMPONENTE PRINCIPALE: App
// ============================================================================
// Questo è il componente "radice" dell'applicazione
// È una funzione JavaScript che restituisce JSX (simile a HTML)

function App() {
  
  
  // ==========================================================================
  // 📡 SEZIONE 1: CONFIGURAZIONE ENDPOINT API
  // ==========================================================================
  // Gli endpoint sono gli "indirizzi web" da cui scarichiamo i dati
  // In questo caso usiamo JSONPlaceholder, un'API di test gratuita
  
  const photoUrl = 'https://jsonplaceholder.typicode.com/photos?_limit=10'
  // URL per ottenere un elenco di FOTO
  // "_limit=10" limita i risultati a solo 10 foto (invece di centinaia)
  
  const albumUrl = 'https://jsonplaceholder.typicode.com/albums?_limit=10'
  // URL per ottenere un elenco di ALBUM
  // Ogni album può contenere più foto
  
  const userUrl = 'https://jsonplaceholder.typicode.com/users?_limit=10'
  // URL per ottenere un elenco di UTENTI
  // Gli utenti sono i "proprietari" degli album e delle foto
  
  
  
  
  // ==========================================================================
  // 💾 SEZIONE 2: DICHIARAZIONE DELLO STATO (State Management)
  // ==========================================================================
  // Qui dichiariamo tutte le variabili di stato del componente
  // Lo "stato" è l'insieme dei dati che possono cambiare nel tempo
  
  // ⚠️ REGOLA FONDAMENTALE DEGLI HOOK:
  // Gli Hook devono SEMPRE essere chiamati:
  // - All'interno della funzione principale del componente
  // - Nello stesso ordine ad ogni render
  // - MAI dentro cicli, condizioni o funzioni annidate
  
  // --------------------------------------------------------------------------
  // Stato 1️⃣: PHOTOS (Foto)
  // --------------------------------------------------------------------------
  const [photos, setPhotos] = useState([])
  // SPIEGAZIONE RIGA PER RIGA:
  // - photos = variabile che CONTIENE l'array delle foto
  // - setPhotos = funzione per MODIFICARE l'array delle foto
  // - useState([]) = inizializza photos come array VUOTO []
  //
  // CICLO DI VITA:
  // 1. Inizialmente: photos = []
  // 2. Dopo fetch: setPhotos(datiDalServer) → photos = [{foto1}, {foto2}, ...]
  // 3. React ri-renderizza il componente e mostra le foto
  
  // --------------------------------------------------------------------------
  // Stato 2️⃣: ALBUMS (Album)
  // --------------------------------------------------------------------------
  const [albums, setAlbums] = useState([])
  // albums = variabile che contiene l'array degli album (inizialmente vuoto)
  // setAlbums = funzione per aggiornare l'array degli album
  // Funziona esattamente come photos, ma per i dati degli album
  
  // --------------------------------------------------------------------------
  // Stato 3️⃣: USERS (Utenti)
  // --------------------------------------------------------------------------
  const [users, setUsers] = useState([])
  // users = variabile che contiene l'array degli utenti (inizialmente vuoto)
  // setUsers = funzione per aggiornare l'array degli utenti
  // Funziona esattamente come photos, ma per i dati degli utenti
  
  
  
  
  // ==========================================================================
  // ⚡ SEZIONE 3: EFFETTI COLLATERALI (Side Effects)
  // ==========================================================================
  // In questa sezione usiamo useEffect per caricare i dati dalle API
  // quando il componente viene montato (appare per la prima volta)
  
  useEffect(() => {
    // useEffect è un Hook che esegue codice in risposta a eventi specifici
    // In questo caso: "quando il componente appare per la prima volta"
    
    
    // ------------------------------------------------------------------------
    // 📸 Funzione Asincrona 1: getPhotos
    // ------------------------------------------------------------------------
    // Questa funzione scarica i dati delle FOTO dall'API
    
    const getPhotos = async () => {
      // "async" rende questa funzione asincrona
      // Significa che può "aspettare" operazioni che richiedono tempo (es. fetch)
      // senza bloccare il resto del programma
      
      try {
        // "try" avvia un blocco di codice che potrebbe generare errori
        // Se tutto va bene, il codice qui dentro viene eseguito normalmente
        
        // PASSO 1: Richiesta HTTP al server
        const response = await fetch(photoUrl)
        // fetch(photoUrl) = invia una richiesta GET all'URL delle foto
        // "await" = "aspetta che fetch finisca prima di continuare"
        // response = oggetto che contiene la risposta del server
        //            (include header, status code, body, ecc.)
        
        // PASSO 2: Conversione della risposta in JSON
        const data = await response.json()
        // response.json() = trasforma il corpo della risposta (formato JSON)
        //                   in un oggetto/array JavaScript utilizzabile
        // "await" = "aspetta che la conversione sia completata"
        // data = ora contiene l'array di 10 foto [{...}, {...}, ...]
        
        // PASSO 3: Salvataggio dei dati nello stato
        setPhotos(data)
        // Chiamiamo setPhotos per aggiornare la variabile "photos"
        // Questo:
        // 1. Aggiorna photos con i nuovi dati
        // 2. Dice a React: "photos è cambiato, ri-renderizza il componente!"
        // 3. React ri-esegue la funzione App() e mostra le foto
        
      } catch (error) {
        // "catch" cattura qualsiasi errore che si verifica nel blocco "try"
        // Esempi di errori:
        // - Nessuna connessione internet
        // - Server non raggiungibile (errore 500, 404, ecc.)
        // - Formato JSON non valido
        // - URL sbagliato
        
        console.error('Errore nel caricamento delle foto:', error)
        // Stampiamo l'errore nella console del browser (F12)
        // Questo è fondamentale per il debugging (trovare e risolvere problemi)
        // In produzione, potresti voler mostrare un messaggio all'utente
      }
      
    }
    // Fine della definizione della funzione getPhotos
    // NOTA: definire una funzione NON la esegue! Dobbiamo chiamarla più avanti
    
    
    // ------------------------------------------------------------------------
    // 📚 Funzione Asincrona 2: getAlbums
    // ------------------------------------------------------------------------
    // Questa funzione scarica i dati degli ALBUM dall'API
    // Funziona esattamente come getPhotos, ma per gli album
    
    const getAlbums = async () => {
      // Funzione asincrona per caricare gli album
      
      try {
        // Tentativo di caricare i dati
        
        const response = await fetch(albumUrl)
        // Inviamo una richiesta GET all'URL degli album
        // Aspettiamo la risposta del server
        
        const data = await response.json()
        // Convertiamo la risposta in un array JavaScript
        // Aspettiamo che la conversione sia completata
        
        setAlbums(data)
        // Salviamo i dati nello stato "albums"
        // React ri-renderizza il componente
        
      } catch (error) {
        // Se qualcosa va storto, gestiamo l'errore
        
        console.error('Errore nel caricamento degli album:', error)
        // Stampiamo l'errore nella console per il debugging
      }
      
    }
    // Fine della definizione della funzione getAlbums
    
    
    // ------------------------------------------------------------------------
    // 👥 Funzione Asincrona 3: getUsers
    // ------------------------------------------------------------------------
    // Questa funzione scarica i dati degli UTENTI dall'API
    // Funziona esattamente come getPhotos e getAlbums, ma per gli utenti
    
    const getUsers = async () => {
      // Funzione asincrona per caricare gli utenti
      
      try {
        // Tentativo di caricare i dati
        
        const response = await fetch(userUrl)
        // Inviamo una richiesta GET all'URL degli utenti
        // Aspettiamo la risposta del server
        
        const data = await response.json()
        // Convertiamo la risposta in un array JavaScript
        // Aspettiamo che la conversione sia completata
        
        setUsers(data)
        // Salviamo i dati nello stato "users"
        // React ri-renderizza il componente
        
      } catch (error) {
        // Se qualcosa va storto, gestiamo l'errore
        
        console.error('Errore nel caricamento degli utenti:', error)
        // Stampiamo l'errore nella console per il debugging
      }
      
    }
    // Fine della definizione della funzione getUsers
    
    
    // ------------------------------------------------------------------------
    // 🚀 Esecuzione delle Funzioni
    // ------------------------------------------------------------------------
    // Ora che abbiamo DEFINITO le tre funzioni, le CHIAMIAMO per eseguirle
    
    getPhotos()
    // Chiama getPhotos() → scarica le foto dall'API
    
    getAlbums()
    // Chiama getAlbums() → scarica gli album dall'API
    
    getUsers()
    // Chiama getUsers() → scarica gli utenti dall'API
    
    // ⚡ NOTA IMPORTANTE:
    // Queste tre chiamate vengono eseguite in PARALLELO (contemporaneamente)
    // Non aspettano l'una l'altra, quindi il caricamento è più veloce!
    // Se volessimo eseguirle in sequenza, dovremmo usare "await" prima di ogni chiamata
    
  }, [])
  // ⚠️ ARRAY DELLE DIPENDENZE: [] (vuoto)
  // Questa è la parte PIÙ IMPORTANTE di useEffect!
  //
  // SPIEGAZIONE:
  // - [] vuoto = "esegui questo useEffect SOLO UNA VOLTA"
  //              precisamente: dopo il primo render del componente
  //
  // ALTERNATIVE (da NON usare in questo caso):
  // - Nessun array = useEffect si esegue AD OGNI RENDER
  //                  → LOOP INFINITO! ⚠️ Da evitare!
  // - [photos] = useEffect si esegue quando "photos" cambia
  //              → Utile per "reagire" a cambiamenti di dati specifici
  // - [photos, albums] = useEffect si esegue quando "photos" O "albums" cambiano
  //
  // PERCHÉ [] IN QUESTO CASO?
  // Vogliamo caricare i dati solo all'inizio, non ogni volta che qualcosa cambia!
  
  
  
  
  // ==========================================================================








  

  // ============================================================================
// 🎨 SEZIONE 4: RENDERING (Interfaccia Utente)
// ============================================================================
// Questa sezione definisce COSA viene visualizzato sullo schermo
// Usiamo JSX, una sintassi simile a HTML ma con "superpoteri" JavaScript


return (
  // ┌─────────────────────────────────────────────────────────────────────┐
  // │ RETURN                                                              │
  // ├─────────────────────────────────────────────────────────────────────┤
  // │ La keyword "return" restituisce il JSX che verrà mostrato           │
  // │ nel browser. Tutto ciò che è qui dentro diventerà HTML visibile.    │
  // └─────────────────────────────────────────────────────────────────────┘
  
  
  <>
    {/* 
      ┌───────────────────────────────────────────────────────────────────┐
      │ FRAGMENT REACT: <> </>                                            │
      ├───────────────────────────────────────────────────────────────────┤
      │ Un Fragment è un "contenitore invisibile" che permette di         │
      │ restituire più elementi JSX senza aggiungere un <div> inutile     │
      │ nel DOM (Document Object Model = struttura HTML della pagina).    │
      │                                                                    │
      │ FORMA COMPLETA:    <React.Fragment> </React.Fragment>             │
      │ FORMA ABBREVIATA:  <> </>  (quella che usiamo qui)                │
      │                                                                    │
      │ PERCHÉ È UTILE?                                                   │
      │ React richiede che un componente restituisca UN SOLO elemento     │
      │ radice. Se vogliamo restituire più elementi (h1, form, ul...),    │
      │ dobbiamo racchiuderli in qualcosa. Il Fragment lo fa senza        │
      │ aggiungere nodi extra nel DOM.                                    │
      │                                                                    │
      │ ESEMPIO SENZA FRAGMENT (❌ errore):                               │
      │   return (                                                        │
      │     <h1>Titolo</h1>                                               │
      │     <p>Paragrafo</p>  ← Errore! Due elementi alla radice         │
      │   )                                                               │
      │                                                                    │
      │ ESEMPIO CON DIV (✅ funziona ma aggiunge un div inutile):        │
      │   return (                                                        │
      │     <div>              ← Questo div finisce nel DOM              │
      │       <h1>Titolo</h1>                                             │
      │       <p>Paragrafo</p>                                            │
      │     </div>                                                        │
      │   )                                                               │
      │                                                                    │
      │ ESEMPIO CON FRAGMENT (✅ perfetto, nessun elemento extra):       │
      │   return (                                                        │
      │     <>                ← Invisibile nel DOM                       │
      │       <h1>Titolo</h1>                                             │
      │       <p>Paragrafo</p>                                            │
      │     </>                                                           │
      │   )                                                               │
      └───────────────────────────────────────────────────────────────────┘
    */}
    
    
    
    
    {/* ====================================================================
        📋 SEZIONE 1: Titolo Principale della Pagina
        ==================================================================== */}
    
    <h1>Albums</h1>
    {/* 
      ┌───────────────────────────────────────────────────────────────────┐
      │ ELEMENTO H1 (Heading 1)                                           │
      ├───────────────────────────────────────────────────────────────────┤
      │ H1 = il titolo più importante della pagina (heading di livello 1) │
      │ In una pagina dovrebbe esserci UN SOLO H1 (best practice SEO).    │
      │                                                                    │
      │ GERARCHÌA DEI TITOLI:                                             │
      │ H1 → titolo principale (più grande e importante)                  │
      │ H2 → sotto-titoli di sezione                                      │
      │ H3 → sotto-sotto-titoli                                           │
      │ ... fino a H6 (raramente usato)                                   │
      │                                                                    │
      │ In questo caso mostra semplicemente il testo "Albums".            │
      └───────────────────────────────────────────────────────────────────┘
    */}
    
    
    
    
    {/* ====================================================================
        📝 SEZIONE 2: Form per Selezionare un Album
        ==================================================================== */}
    
    <form>
      {/* 
        ┌─────────────────────────────────────────────────────────────────┐
        │ ELEMENTO FORM                                                   │
        ├─────────────────────────────────────────────────────────────────┤
        │ FORM = contenitore per elementi di input dell'utente:          │
        │ - <input>    → campi di testo, checkbox, radio button, ecc.    │
        │ - <select>   → menu a tendina (dropdown)                       │
        │ - <textarea> → area di testo multi-riga                        │
        │ - <button>   → pulsanti                                        │
        │                                                                 │
        │ FUNZIONALITÀ CLASSICHE DI UN FORM (non usate in questo esempio):│
        │ - action="url" → dove inviare i dati quando si fa "submit"    │
        │ - method="POST" → come inviare i dati (POST/GET)              │
        │ - onSubmit={funzione} → cosa fare quando l'utente invia il form│
        │                                                                 │
        │ In questo caso, il form contiene solo un <select> per         │
        │ scegliere un album. Non c'è logica di invio (per ora).        │
        └─────────────────────────────────────────────────────────────────┘
      */}
      
      
      <div>
        {/* 
          ┌───────────────────────────────────────────────────────────────┐
          │ ELEMENTO DIV                                                  │
          ├───────────────────────────────────────────────────────────────┤
          │ DIV = contenitore generico senza significato semantico.      │
          │ Serve per raggruppare altri elementi per scopi di layout     │
          │ o stile CSS.                                                  │
          │                                                               │
          │ In questo caso raggruppa la <label> e il <select>.           │
          └───────────────────────────────────────────────────────────────┘
        */}
        
        
        {/* --------------------------------------------------------------
            🏷️ Label (Etichetta) per il Select
            -------------------------------------------------------------- */}
        
        <label htmlFor="album">
          {/* 
            ┌─────────────────────────────────────────────────────────────┐
            │ ELEMENTO LABEL                                              │
            ├─────────────────────────────────────────────────────────────┤
            │ LABEL = etichetta testuale che descrive un campo di input. │
            │                                                             │
            │ ATTRIBUTO htmlFor:                                          │
            │ - Collega questa label a un elemento di input specifico    │
            │ - In HTML normale si usa "for", ma in React si usa         │
            │   "htmlFor" perché "for" è una keyword riservata in JS     │
            │   (usata nei cicli: for(let i=0; i<10; i++))               │
            │                                                             │
            │ COME FUNZIONA IL COLLEGAMENTO:                             │
            │ <label htmlFor="album"> → cerca un elemento con id="album" │
            │ <select id="album">     → questo è l'elemento collegato    │
            │                                                             │
            │ VANTAGGI DEL COLLEGAMENTO:                                 │
            │ 1. USABILITÀ:                                              │
            │    Quando l'utente clicca sulla label, il focus va         │
            │    automaticamente sul <select> associato. Rende più       │
            │    facile interagire, specialmente su dispositivi mobili.  │
            │                                                             │
            │ 2. ACCESSIBILITÀ:                                          │
            │    Gli screen reader (lettori di schermo per non vedenti)  │
            │    leggono la label quando l'utente naviga sul campo.      │
            │    Esempio: "Scegli un album: menu a tendina"              │
            │                                                             │
            │ ESEMPIO PRATICO:                                           │
            │ Prova a cliccare sulle parole "Scegli un album:" →         │
            │ il menu a tendina si aprirà automaticamente!               │
            └─────────────────────────────────────────────────────────────┘
          */}
          
          Scegli un album:
          {/* Questo è il testo visibile della label */}
          
        </label>
        
        
        
        
        {/* --------------------------------------------------------------
            📋 Select (Menu a Tendina) per gli Album
            -------------------------------------------------------------- */}
        
        <select name="album" id="album">
          {/* 
            ┌─────────────────────────────────────────────────────────────┐
            │ ELEMENTO SELECT (Menu a Tendina / Dropdown)                │
            ├─────────────────────────────────────────────────────────────┤
            │ SELECT = crea un menu a tendina dove l'utente può          │
            │ scegliere una sola opzione tra molte.                      │
            │                                                             │
            │ ATTRIBUTI:                                                  │
            │                                                             │
            │ 1. name="album"                                             │
            │    - Nome del campo, usato quando si invia il form a un    │
            │      server o quando si gestisce il form con JavaScript    │
            │    - Se il form viene inviato, i dati saranno: album=5     │
            │      (dove 5 è il value dell'opzione selezionata)          │
            │                                                             │
            │ 2. id="album"                                               │
            │    - Identificatore UNICO di questo elemento nella pagina  │
            │    - Collegato alla label tramite htmlFor="album"          │
            │    - Può essere usato anche in CSS o JavaScript per        │
            │      selezionare questo specifico elemento                 │
            │                                                             │
            │ FUNZIONAMENTO:                                             │
            │ Quando l'utente clicca sul select:                         │
            │ 1. Si apre un elenco di opzioni                            │
            │ 2. L'utente clicca su un'opzione                           │
            │ 3. Il menu si chiude e mostra l'opzione scelta             │
            │                                                             │
            │ Le opzioni (<option>) vengono generate dinamicamente       │
            │ dall'array "albums" usando il metodo .map()                │
            └─────────────────────────────────────────────────────────────┘
          */}
          
          
          
          
          {/* ------------------------------------------------------------
              🔄 Iterazione (Ciclo) sull'Array "albums"
              ------------------------------------------------------------ */}
          
          {albums.map(album => (
            // ┌───────────────────────────────────────────────────────────┐
            // │ METODO .map()                                             │
            // ├───────────────────────────────────────────────────────────┤
            // │ .map() è un metodo degli array che:                      │
            // │ 1. CICLA su ogni elemento dell'array                     │
            // │ 2. ESEGUE una funzione per ogni elemento                 │
            // │ 3. RESTITUISCE un nuovo array con i risultati            │
            // │                                                           │
            // │ SINTASSI:                                                 │
            // │ array.map(elemento => {                                   │
            // │   // codice da eseguire per ogni elemento                │
            // │   return risultato;                                       │
            // │ })                                                        │
            // │                                                           │
            // │ PARAMETRI:                                                │
            // │ - album = l'elemento CORRENTE del ciclo                  │
            // │           (un oggetto con proprietà: id, title, userId)  │
            // │                                                           │
            // │ ESEMPIO CON DATI REALI:                                  │
            // │ Se albums = [                                             │
            // │   {id: 1, title: "Album Vacanze", userId: 1},            │
            // │   {id: 2, title: "Album Compleanno", userId: 1},         │
            // │   {id: 3, title: "Album Natale", userId: 2}              │
            // │ ]                                                         │
            // │                                                           │
            // │ Allora .map() esegue la funzione 3 volte:                │
            // │                                                           │
            // │ PRIMA ITERAZIONE:                                        │
            // │   album = {id: 1, title: "Album Vacanze", userId: 1}     │
            // │   Crea: <option value="1" key="1">Album Vacanze</option> │
            // │                                                           │
            // │ SECONDA ITERAZIONE:                                      │
            // │   album = {id: 2, title: "Album Compleanno", userId: 1}  │
            // │   Crea: <option value="2" key="2">                       │
            // │           Album Compleanno                                │
            // │         </option>                                         │
            // │                                                           │
            // │ TERZA ITERAZIONE:                                        │
            // │   album = {id: 3, title: "Album Natale", userId: 2}      │
            // │   Crea: <option value="3" key="3">Album Natale</option>  │
            // │                                                           │
            // │ RISULTATO FINALE:                                        │
            // │ Vengono create 3 opzioni nel menu a tendina, una per     │
            // │ ogni album nell'array.                                   │
            // └───────────────────────────────────────────────────────────┘
            
            
            <option value={album.id} key={album.id}>
              {/* 
                ┌───────────────────────────────────────────────────────┐
                │ ELEMENTO OPTION                                       │
                ├───────────────────────────────────────────────────────┤
                │ OPTION = una singola voce nel menu a tendina.        │
                │ Ogni <option> rappresenta una scelta possibile.      │
                │                                                       │
                │ ATTRIBUTI:                                            │
                │                                                       │
                │ 1. value={album.id}                                   │
                │    - Il VALORE che verrà inviato quando l'utente     │
                │      seleziona questa opzione                        │
                │    - Le graffe {} ci permettono di inserire          │
                │      JavaScript dentro JSX                           │
                │    - album.id = l'ID dell'album corrente (es. 1, 2..)│
                │                                                       │
                │    ESEMPIO:                                           │
                │    Se album.id = 5                                    │
                │    Diventa: <option value="5">                       │
                │                                                       │
                │    Quando l'utente seleziona questa opzione, il      │
                │    <select> avrà value = 5                           │
                │                                                       │
                │ 2. key={album.id}                                     │
                │    - Identificatore UNICO per React                  │
                │    - OBBLIGATORIO quando si usa .map()               │
                │    - Aiuta React a capire quale elemento è cambiato │
                │                                                       │
                │    PERCHÉ È IMPORTANTE?                              │
                │    Immagina di avere 100 album. Se aggiungi un album│
                │    alla posizione 50, senza key React dovrebbe       │
                │    ri-renderizzare TUTTI i 100 elementi. Con key,    │
                │    React sa che solo 1 elemento è nuovo e           │
                │    ri-renderizza solo quello → PERFORMANCE!          │
                │                                                       │
                │    ⚠️ REGOLE PER key:                                │
                │    - Deve essere UNICO tra gli elementi fratelli     │
                │    - Deve essere STABILE (sempre lo stesso per lo    │
                │      stesso elemento)                                │
                │    - NON usare l'indice del .map() come key se       │
                │      l'ordine può cambiare (album.id è perfetto!)    │
                │                                                       │
                │ CONTENUTO DELL'OPTION:                               │
                │ {album.title}                                         │
                │ - Questo è il TESTO VISIBILE nel menu a tendina      │
                │ - Le graffe {} dicono a JSX: "questo è JavaScript,   │
                │   eseguilo e mostra il risultato"                    │
                │ - album.title = il titolo dell'album (es. "Vacanze") │
                │                                                       │
                │ ESEMPIO COMPLETO:                                    │
                │ Se album = {                                          │
                │   id: 5,                                              │
                │   title: "Album di Vacanze",                         │
                │   userId: 1                                           │
                │ }                                                     │
                │                                                       │
                │ L'HTML generato sarà:                                │
                │ <option value="5" key="5">                           │
                │   Album di Vacanze                                    │
                │ </option>                                             │
                │                                                       │
                │ COSA VEDE L'UTENTE:                                  │
                │ Nel menu a tendina apparirà: "Album di Vacanze"      │
                │                                                       │
                │ COSA OTTIENE IL CODICE:                              │
                │ Se l'utente la seleziona, il <select> avrà value="5" │
                └───────────────────────────────────────────────────────┘
              */}
              
              {album.title}
              {/* 
                Mostra il titolo dell'album come testo dell'opzione
                Esempio: "Album Vacanze", "Album Compleanno", ecc.
              */}
              
            </option>
            
          ))}
          {/* 
            ┌───────────────────────────────────────────────────────────┐
            │ FINE DEL CICLO .map()                                     │
            ├───────────────────────────────────────────────────────────┤
            │ A questo punto, tutte le opzioni sono state create.      │
            │ Il menu a tendina conterrà un'<option> per ogni album    │
            │ presente nell'array "albums".                            │
            └───────────────────────────────────────────────────────────┘
          */}
          
        </select>
        {/* Fine del <select> */}
        
      </div>
      {/* Fine del <div> che contiene label e select */}
      
    </form>
    {/* Fine del <form> */}
    
    
    
    
    {/* ====================================================================
        👥 SEZIONE 3: Lista degli Utenti
        ==================================================================== */}
    
    <h2>Users</h2>
    {/* 
      ┌───────────────────────────────────────────────────────────────────┐
      │ ELEMENTO H2 (Heading 2)                                           │
      ├───────────────────────────────────────────────────────────────────┤
      │ H2 = titolo di secondo livello, usato per le sezioni della pagina │
      │ Gerarchicamente sotto l'H1, ma sopra H3, H4, ecc.                 │
      │                                                                    │
      │ In questo caso indica l'inizio della sezione "Utenti".            │
      └───────────────────────────────────────────────────────────────────┘
    */}
    
    
    <ul>
      {/* 
        ┌─────────────────────────────────────────────────────────────────┐
        │ ELEMENTO UL (Unordered List)                                    │
        ├─────────────────────────────────────────────────────────────────┤
        │ UL = lista NON ordinata (senza numeri).                        │
        │ Ogni elemento della lista avrà un "bullet point" (pallino).    │
        │                                                                 │
        │ DIFFERENZA CON <OL>:                                           │
        │ <ul> → lista con pallini: • elemento 1, • elemento 2          │
        │ <ol> → lista con numeri:  1. elemento 1, 2. elemento 2        │
        │                                                                 │
        │ Gli elementi della lista sono definiti con <li> (list item).   │
        └─────────────────────────────────────────────────────────────────┘
      */}
      
      
      
      
      {/* ------------------------------------------------------------------
          🔄 Iterazione (Ciclo) sull'Array "users"
          ------------------------------------------------------------------ */}
      
      {users.map(user => (
        // ┌───────────────────────────────────────────────────────────────┐
        // │ CICLO CON .map() SULL'ARRAY "users"                           │
        // ├───────────────────────────────────────────────────────────────┤
        // │ Stesso funzionamento del .map() precedente, ma questa volta   │
        // │ cicliamo sull'array "users" invece che su "albums".           │
        // │                                                                │
        // │ PARAMETRO:                                                     │
        // │ - user = l'utente CORRENTE del ciclo                          │
        // │          (un oggetto con: id, name, email, username, phone...) │
        // │                                                                │
        // │ ESEMPIO:                                                       │
        // │ Se users = [                                                   │
        // │   {id: 1, name: "Mario Rossi", email: "mario@email.com"...},  │
        // │   {id: 2, name: "Lucia Verdi", email: "lucia@email.com"...}   │
        // │ ]                                                              │
        // │                                                                │
        // │ Allora verranno creati 2 elementi <li>, uno per Mario e       │
        // │ uno per Lucia, con tutte le loro informazioni.                │
        // └───────────────────────────────────────────────────────────────┘
        
        
        <li key={user.id}>
          {/* 
            ┌─────────────────────────────────────────────────────────────┐
            │ ELEMENTO LI (List Item)                                     │
            ├─────────────────────────────────────────────────────────────┤
            │ LI = un singolo elemento della lista.                      │
            │ Tutto ciò che è dentro <li> </li> rappresenta UN utente.   │
            │                                                             │
            │ ATTRIBUTO key:                                              │
            │ key={user.id} → identificatore unico per React             │
            │ Stesse regole del key visto prima con gli album.           │
            └─────────────────────────────────────────────────────────────┘
          */}
          
          
          
          
          {/* ------------------------------------------------------------
              📝 Visualizzazione del Nome Utente
              ------------------------------------------------------------ */}
          
          <strong>{user.name}</strong>
          {/* 
            ┌─────────────────────────────────────────────────────────────┐
            │ ELEMENTO STRONG                                             │
            ├─────────────────────────────────────────────────────────────┤
            │ STRONG = testo con importanza semantica, mostrato in        │
            │ grassetto (bold).                                           │
            │                                                             │
            │ DIFFERENZA TRA <strong> E <b>:                              │
            │ <strong> → grassetto + significato di "importante"         │
            │              (migliore per accessibilità e SEO)             │
            │ <b>      → solo grassetto visivo, senza significato        │
            │              semantico                                      │
            │                                                             │
            │ CONTENUTO:                                                  │
            │ {user.name} = nome completo dell'utente                     │
            │ Esempio: "Leanne Graham", "Ervin Howell", ecc.             │
            │                                                             │
            │ Le graffe {} servono per "entrare" in modalità JavaScript  │
            │ dentro JSX e accedere alla proprietà "name" dell'oggetto   │
            │ "user".                                                     │
            └─────────────────────────────────────────────────────────────┘
          */}
          
          
          
          
          {' - '}
          {/* 
            ┌─────────────────────────────────────────────────────────────┐
            │ SEPARATORE VISIVO                                           │
            ├─────────────────────────────────────────────────────────────┤
            │ {' - '} = una stringa JavaScript che contiene " - "        │
            │                                                             │
            │ PERCHÉ LE GRAFFE E GLI APICI?                              │
            │ In JSX, se vuoi inserire del testo normale, puoi scrivere: │
            │ - Direttamente: <div>Testo</div>                           │
            │ - Con JS: <div>{'Testo'}</div>                             │
            │                                                             │
            │ In questo caso usiamo {' - '} per essere espliciti che     │
            │ vogliamo uno spazio prima e dopo il trattino.              │
            │                                                             │
            │ RISULTATO VISIVO:                                          │
            │ Mario Rossi - mario@email.com                               │
            │             ^^^                                             │
            │             questo separatore                               │
            └─────────────────────────────────────────────────────────────┘
          */}
          
          
          
          
          {/* ------------------------------------------------------------
              📧 Visualizzazione dell'Email
              ------------------------------------------------------------ */}
          
          <em>{user.email}</em>
          {/* 
            ┌─────────────────────────────────────────────────────────────┐
            │ ELEMENTO EM (Emphasis)                                      │
            ├─────────────────────────────────────────────────────────────┤
            │ EM = testo con enfasi, mostrato in corsivo (italic).       │
            │                                                             │
            │ DIFFERENZA TRA <em> E <i>:                                  │
            │ <em> → corsivo + significato di "enfasi"                   │
            │         (migliore per accessibilità e SEO)                  │
            │ <i>  → solo corsivo visivo, senza significato semantico    │
            │                                                             │
            │ CONTENUTO:                                                  │
            │ {user.email} = indirizzo email dell'utente                  │
            │ Esempio: "Sincere@april.biz", "Shanna@melissa.tv", ecc.    │
            └─────────────────────────────────────────────────────────────┘
          */}
          
          
          
          
          {/* ------------------------------------------------------------
              📄 Paragrafo con Informazioni Aggiuntive
              ------------------------------------------------------------ */}
          
          <p>
            {/* 
              ┌───────────────────────────────────────────────────────────┐
              │ ELEMENTO P (Paragraph)                                    │
              ├───────────────────────────────────────────────────────────┤
              │ P = paragrafo di testo. Crea automaticamente uno spazio   │
              │ sopra e sotto il contenuto.                               │
              │                                                            │
              │ Qui dentro mettiamo informazioni aggiuntive sull'utente:  │
              │ username, telefono, sito web.                             │
              └───────────────────────────────────────────────────────────┘
            */}
            
            
            Username: {user.username}
            {/* 
              ┌───────────────────────────────────────────────────────────┐
              │ VISUALIZZAZIONE DELLO USERNAME                            │
              ├───────────────────────────────────────────────────────────┤
              │ STRUTTURA:                                                │
              │ "Username: " → testo fisso (sempre uguale)               │
              │ {user.username} → dato dinamico (cambia per ogni utente) │
              │                                                            │
              │ ESEMPIO:                                                  │
              │ Se user.username = "Bret"                                 │
              │ Risultato: Username: Bret                                 │
              │                                                            │
              │ Se user.username = "Antonette"                            │
              │ Risultato: Username: Antonette                            │
              └───────────────────────────────────────────────────────────┘
            */}
            
            
            <br />
            {/* 
              ┌───────────────────────────────────────────────────────────┐
              │ ELEMENTO BR (Break)                                       │
              ├───────────────────────────────────────────────────────────┤
              │ BR = interruzione di riga (line break), crea un "a capo".│
              │                                                            │
              │ È un elemento "self-closing" (auto-chiudente):            │
              │ - In HTML:  <br> (senza chiusura)                         │
              │ - In JSX:   <br /> (con /, obbligatorio in JSX)           │
              │                                                            │
              │ EFFETTO:                                                  │
              │ Username: Bret                                             │
              │ Phone: 1-770-736-8031    ← va a capo qui                  │
              │                                                            │
              │ ALTERNATIVA:                                              │
              │ Invece di <br />, potresti mettere ogni informazione in   │
              │ un <div> o <p> separato, ma <br /> è più semplice per    │
              │ un singolo paragrafo con più righe.                      │
              └───────────────────────────────────────────────────────────┘
            */}
            
            
            Phone: {user.phone}
            {/* 
              ┌───────────────────────────────────────────────────────────┐
              │ VISUALIZZAZIONE DEL TELEFONO                              │
              ├───────────────────────────────────────────────────────────┤
              │ {user.phone} = numero di telefono dell'utente             │
              │                                                            │
              │ ESEMPIO:                                                  │
              │ Se user.phone = "1-770-736-8031 x56442"                   │
              │ Risultato: Phone: 1-770-736-8031 x56442                   │
              │                                                            │
              │ NOTA:                                                     │
              │ I dati vengono dall'API JSONPlaceholder, quindi sono      │
              │ telefoni fittizi per testing.                            │
              └───────────────────────────────────────────────────────────┘
            */}
            
            
            <br />
            {/* Altro a capo per andare alla riga successiva */}
            
            
            Website: <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
              {user.website}
            </a>
            {/* 
              ┌───────────────────────────────────────────────────────────┐
              │ ELEMENTO A (Anchor = Link)                                │
              ├───────────────────────────────────────────────────────────┤
              │ A = link cliccabile che porta a un'altra pagina.         │
              │                                                            │
              │ ══════════════════════════════════════════════════════════ │
              │ ATTRIBUTO 1: href                                         │
              │ ══════════════════════════════════════════════════════════ │
              │                                                            │
              │ href = "Hypertext REFerence" = l'URL di destinazione      │
              │                                                            │
              │ VALORE:                                                   │
              │ {`https://${user.website}`}                               │
              │                                                            │
              │ SPIEGAZIONE DETTAGLIATA:                                  │
              │                                                            │
              │ 1. Le graffe {} indicano: "questo è JavaScript"          │
              │                                                            │
              │ 2. I backtick ` ` creano un "template literal"           │
              │    (stringa con interpolazione di variabili)              │
              │                                                            │
              │ 3. "https://" è la parte fissa dell'URL                  │
              │                                                            │
              │ 4. ${user.website} inserisce il sito dell'utente          │
              │    Il simbolo $ dice: "qui inserisci una variabile"      │
              │                                                            │
              │ ESEMPIO:                                                  │
              │ Se user.website = "hildegard.org"                         │
              │ Diventa: href="https://hildegard.org"                     │
              │                                                            │
              │ Se user.website = "anastasia.net"                         │
              │ Diventa: href="https://anastasia.net"                     │
              │                                                            │
              │ PERCHÉ AGGIUNGIAMO "https://"?                            │
              │ L'API fornisce solo "hildegard.org" senza protocollo.     │
              │ Se mettessimo href={user.website}, il browser cercherebbe │
              │ di aprire un file locale invece di andare su internet.   │
              │ Con "https://", il browser sa che deve andare online.     │
              │                                                            │
              │ ══════════════════════════════════════════════════════════ │
              │ ATTRIBUTO 2: target                                       │
              │ ══════════════════════════════════════════════════════════ │
              │                                                            │
              │ target = dove aprire il link                              │
              │                                                            │
              │ VALORE: target="_blank"                                   │
              │                                                            │
              │ OPZIONI DISPONIBILI:                                      │
              │ - "_blank"  → apre in una NUOVA scheda/finestra          │
              │ - "_self"   → apre nella STESSA scheda (default)         │
              │ - "_parent" → apre nel frame genitore                    │
              │ - "_top"    → apre nella finestra principale             │
              │                                                            │
              │ PERCHÉ USIAMO "_blank"?                                   │
              │ Così l'utente può visitare il sito web senza perdere     │
              │ la nostra applicazione. Miglior user experience!          │
              │                                                            │
              │ ══════════════════════════════════════════════════════════ │
              │ ATTRIBUTO 3: rel                                          │
              │ ══════════════════════════════════════════════════════════ │
              │                                                            │
              │ rel = "relationship" = relazione con la pagina collegata  │
              │                                                            │
              │ VALORE: rel="noopener noreferrer"                         │
              │                                                            │
              │ SPIEGAZIONE:                                              │
              │ Quando si usa target="_blank", si creano potenziali       │
              │ problemi di SICUREZZA. Questo attributo li risolve.      │
              │                                                            │
              │ 1. "noopener"                                             │
              │    Impedisce alla nuova pagina di accedere alla finestra  │
              │    originale tramite window.opener.                       │
              │                                                            │
              │    SENZA noopener (⚠️ PERICOLOSO):                        │
              │    La nuova pagina potrebbe eseguire:                     │
              │    window.opener.location = "https://sito-malevolo.com"  │
              │    → Cambia l'URL della tua app senza che te ne accorgi! │
              │                                                            │
              │    CON noopener (✅ SICURO):                              │
              │    window.opener è null → la nuova pagina non può fare    │
              │    nulla alla tua applicazione.                           │
              │                                                            │
              │ 2. "noreferrer"                                           │
              │    Impedisce di inviare l'header "Referer" alla pagina    │
              │    collegata.                                             │
              │                                                            │
              │    COSA SIGNIFICA?                                        │
              │    Normalmente, quando clicchi un link, il browser dice   │
              │    al nuovo sito: "L'utente arriva da questa pagina".     │
              │    Con noreferrer, questa informazione non viene inviata. │
              │                                                            │
              │    PERCHÉ È UTILE?                                        │
              │    - PRIVACY: il sito esterno non sa da dove arrivi       │
              │    - SICUREZZA: non esponi l'URL della tua app            │
              │                                                            │
              │ BEST PRACTICE:                                            │
              │ target="_blank" → SEMPRE insieme a rel="noopener noreferrer"│
              │                                                            │
              │ ══════════════════════════════════════════════════════════ │
              │ CONTENUTO DEL LINK                                        │
              │ ══════════════════════════════════════════════════════════ │
              │                                                            │
              │ {user.website}                                            │
              │                                                            │
              │ Questo è il TESTO VISIBILE del link (il testo cliccabile).│
              │                                                            │
              │ ESEMPIO:                                                  │
              │ Se user.website = "hildegard.org"                         │
              │ L'utente vedrà: Website: hildegard.org (come link blu)    │
              │ Cliccandoci, si aprirà https://hildegard.org in una nuova │
              │ scheda.                                                   │
              │                                                            │
              │ ══════════════════════════════════════════════════════════ │
              │ ESEMPIO COMPLETO                                          │
              │ ══════════════════════════════════════════════════════════ │
              │                                                            │
              │ Se user.website = "hildegard.org"                         │
              │                                                            │
              │ L'HTML generato sarà:                                     │
              │ <a                                                        │
              │   href="https://hildegard.org"                            │
              │   target="_blank"                                         │
              │   rel="noopener noreferrer"                               │
              │ >                                                         │
              │   hildegard.org                                           │
              │ </a>                                                      │
              │                                                            │
              │ COSA VEDE L'UTENTE:                                       │
              │ Website: hildegard.org (link blu sottolineato)            │
              │                                                            │
              │ COSA SUCCEDE AL CLICK:                                    │
              │ Si apre https://hildegard.org in una nuova scheda,        │
              │ senza rischi di sicurezza e senza perdere l'app corrente. │
              └───────────────────────────────────────────────────────────┘
            */}
            
          </p>
          {/* Fine del paragrafo con le informazioni aggiuntive */}
          
        </li>
        // ┌───────────────────────────────────────────────────────────────┐
        // │ FINE DELL'ELEMENTO <li>                                       │
        // ├───────────────────────────────────────────────────────────────┤
        // │ Questo blocco (da <li> a </li>) viene ripetuto per OGNI      │
        // │ utente presente nell'array "users".                           │
        // │                                                                │
        // │ Se ci sono 10 utenti, verranno creati 10 <li> con tutte      │
        // │ le informazioni di ogni singolo utente.                       │
        // └───────────────────────────────────────────────────────────────┘
        
      ))}
      {/* 
        ┌─────────────────────────────────────────────────────────────────┐
        │ FINE DEL CICLO .map()                                           │
        ├─────────────────────────────────────────────────────────────────┤
        │ A questo punto, tutti gli utenti sono stati processati e        │
        │ visualizzati nella lista.                                       │
        └─────────────────────────────────────────────────────────────────┘
      */}
      
    </ul>
    {/* Fine della lista utenti </ul> */}
    
    
    
    
    {/* ====================================================================
        📸 SEZIONE 4: Lista delle Foto
        ==================================================================== */}
    
    <h2>Photos</h2>
    {/* 
      ┌───────────────────────────────────────────────────────────────────┐
      │ TITOLO H2 PER LA SEZIONE FOTO                                     │
      ├───────────────────────────────────────────────────────────────────┤
      │ Indica l'inizio della sezione dedicata alla visualizzazione       │
      │ delle foto.                                                        │
      └───────────────────────────────────────────────────────────────────┘
    */}
    
    
    <ul>
      {/* 
        ┌─────────────────────────────────────────────────────────────────┐
        │ LISTA NON ORDINATA PER LE FOTO                                  │
        ├─────────────────────────────────────────────────────────────────┤
        │ Stessa struttura delle liste precedenti, ma questa volta ogni   │
        │ <li> conterrà una foto con titolo e immagine.                   │
        └─────────────────────────────────────────────────────────────────┘
      */}
      
      
      
      
      {/* ------------------------------------------------------------------
          🔄 Iterazione (Ciclo) sull'Array "photos"
          ------------------------------------------------------------------ */}
      
      {photos.map(photo => (
        // ┌───────────────────────────────────────────────────────────────┐
        // │ CICLO CON .map() SULL'ARRAY "photos"                          │
        // ├───────────────────────────────────────────────────────────────┤
        // │ .map() è un metodo degli array che:                           │
        // │ 1. CICLA su ogni elemento dell'array "photos"                 │
        // │ 2. ESEGUE una funzione per ogni elemento                      │
        // │ 3. RESTITUISCE un nuovo array con i risultati (in questo caso │
        // │    un array di elementi JSX <li>)                             │
        // │                                                                │
        // │ ══════════════════════════════════════════════════════════════ │
        // │ PARAMETRI DELLA FUNZIONE                                      │
        // │ ══════════════════════════════════════════════════════════════ │
        // │                                                                │
        // │ photo = l'elemento CORRENTE del ciclo                         │
        // │         (un oggetto che rappresenta UNA foto)                 │
        // │                                                                │
        // │ STRUTTURA DI UN OGGETTO photo:                                │
        // │ {                                                              │
        // │   id: 1,                  // ID univoco della foto            │
        // │   albumId: 1,             // A quale album appartiene         │
        // │   title: "accusamus...",  // Titolo/descrizione della foto    │
        // │   url: "https://...",     // URL dell'immagine grande         │
        // │   thumbnailUrl: "https://..." // URL della miniatura          │
        // │ }                                                              │
        // │                                                                │
        // │ ══════════════════════════════════════════════════════════════ │
        // │ COME FUNZIONA IL CICLO                                        │
        // │ ══════════════════════════════════════════════════════════════ │
        // │                                                                │
        // │ ESEMPIO CON DATI REALI:                                       │
        // │ Se photos = [                                                  │
        // │   {id: 1, title: "Foto Vacanza", thumbnailUrl: "url1.jpg"},   │
        // │   {id: 2, title: "Foto Mare", thumbnailUrl: "url2.jpg"},      │
        // │   {id: 3, title: "Foto Montagna", thumbnailUrl: "url3.jpg"}   │
        // │ ]                                                              │
        // │                                                                │
        // │ Allora .map() esegue la funzione 3 volte:                     │
        // │                                                                │
        // │ ┌────────────────────────────────────────────────────────────┐│
        // │ │ PRIMA ITERAZIONE (ciclo 1/3)                               ││
        // │ ├────────────────────────────────────────────────────────────┤│
        // │ │ photo = {id: 1, title: "Foto Vacanza", ...}                ││
        // │ │                                                             ││
        // │ │ Crea:                                                       ││
        // │ │ <li key="1">                                                ││
        // │ │   Foto Vacanza                                              ││
        // │ │   <img src="url1.jpg" alt="Foto Vacanza" />                ││
        // │ │ </li>                                                       ││
        // │ └────────────────────────────────────────────────────────────┘│
        // │                                                                │
        // │ ┌────────────────────────────────────────────────────────────┐│
        // │ │ SECONDA ITERAZIONE (ciclo 2/3)                             ││
        // │ ├────────────────────────────────────────────────────────────┤│
        // │ │ photo = {id: 2, title: "Foto Mare", ...}                   ││
        // │ │                                                             ││
        // │ │ Crea:                                                       ││
        // │ │ <li key="2">                                                ││
        // │ │   Foto Mare                                                 ││
        // │ │   <img src="url2.jpg" alt="Foto Mare" />                   ││
        // │ │ </li>                                                       ││
        // │ └────────────────────────────────────────────────────────────┘│
        // │                                                                │
        // │ ┌────────────────────────────────────────────────────────────┐│
        // │ │ TERZA ITERAZIONE (ciclo 3/3)                               ││
        // │ ├────────────────────────────────────────────────────────────┤│
        // │ │ photo = {id: 3, title: "Foto Montagna", ...}               ││
        // │ │                                                             ││
        // │ │ Crea:                                                       ││
        // │ │ <li key="3">                                                ││
        // │ │   Foto Montagna                                             ││
        // │ │   <img src="url3.jpg" alt="Foto Montagna" />               ││
        // │ │ </li>                                                       ││
        // │ └────────────────────────────────────────────────────────────┘│
        // │                                                                │
        // │ RISULTATO FINALE:                                             │
        // │ Vengono create 3 righe nella lista, una per ogni foto.        │
        // └───────────────────────────────────────────────────────────────┘
        
        
        
        
        /* ----------------------------------------------------------------
            📌 Elemento della Lista (LI) per ogni Foto
            ---------------------------------------------------------------- */
        
        <li key={photo.id}>
          {/* 
            ┌─────────────────────────────────────────────────────────────┐
            │ ELEMENTO LI (List Item)                                     │
            ├─────────────────────────────────────────────────────────────┤
            │ Ogni <li> rappresenta UNA foto nell'elenco.                │
            │                                                             │
            │ ══════════════════════════════════════════════════════════ │
            │ ATTRIBUTO key                                               │
            │ ══════════════════════════════════════════════════════════ │
            │                                                             │
            │ key={photo.id}                                              │
            │                                                             │
            │ PERCHÉ È OBBLIGATORIO?                                     │
            │ React usa "key" per identificare quale elemento della lista │
            │ è cambiato, è stato aggiunto o rimosso.                    │
            │                                                             │
            │ COSA SUCCEDEREBBE SENZA key?                               │
            │ React non saprebbe quale <li> corrisponde a quale foto.    │
            │ Se l'ordine cambia o aggiungi una foto, React dovrebbe     │
            │ ri-renderizzare (ridisegnare) TUTTA la lista, anche gli    │
            │ elementi che non sono cambiati → PERFORMANCE PESSIME       │
            │                                                             │
            │ COSA SUCCEDE CON key?                                      │
            │ React può dire: "L'elemento con key=1 è ancora qui, non    │
            │ lo tocco. L'elemento key=4 è nuovo, lo aggiungo."          │
            │ Ri-renderizza solo gli elementi necessari → VELOCE!        │
            │                                                             │
            │ ══════════════════════════════════════════════════════════ │
            │ REGOLE PER key                                              │
            │ ══════════════════════════════════════════════════════════ │
            │                                                             │
            │ 1. ✅ DEVE ESSERE UNICO tra gli elementi fratelli          │
            │    (ma può ripetersi in liste diverse)                     │
            │                                                             │
            │ 2. ✅ DEVE ESSERE STABILE (sempre lo stesso per lo stesso  │
            │    elemento, anche dopo re-render)                         │
            │                                                             │
            │ 3. ❌ NON usare l'indice del .map() come key               │
            │    (solo se l'ordine non cambia mai e non ci sono         │
            │    aggiunte/rimozioni)                                     │
            │                                                             │
            │ PERCHÉ photo.id È PERFETTO COME key?                       │
            │ - È unico (ogni foto ha un ID diverso)                     │
            │ - È stabile (l'ID della foto non cambia mai)               │
            │ - Viene dal database (garantito univoco dal server)        │
            │                                                             │
            │ ⚠️ NOTA IMPORTANTE:                                        │
            │ La prop "key" NON è accessibile nel componente!            │
            │ Non puoi fare: console.log(props.key) ← questo è undefined │
            │ È usata solo internamente da React.                        │
            └─────────────────────────────────────────────────────────────┘
          */}
          
          
          
          
          {/* --------------------------------------------------------------
              📝 Visualizzazione del Titolo della Foto
              -------------------------------------------------------------- */}
          
          {photo.title}
          {/* 
            ┌─────────────────────────────────────────────────────────────┐
            │ VISUALIZZAZIONE DEL TITOLO                                  │
            ├─────────────────────────────────────────────────────────────┤
            │ {photo.title} = accediamo alla proprietà "title" dell'oggetto│
            │ "photo" corrente.                                           │
            │                                                             │
            │ LE GRAFFE {}:                                               │
            │ In JSX, le graffe servono per "uscire" dalla modalità HTML  │
            │ ed "entrare" nella modalità JavaScript.                     │
            │                                                             │
            │ ESEMPIO SENZA GRAFFE (❌ sbagliato):                        │
            │ <li>photo.title</li>                                        │
            │ → Mostra letteralmente il testo "photo.title"              │
            │                                                             │
            │ ESEMPIO CON GRAFFE (✅ corretto):                          │
            │ <li>{photo.title}</li>                                      │
            │ → Esegue il codice JavaScript photo.title e mostra il      │
            │   risultato (es. "Una bella foto di un gatto")             │
            │                                                             │
            │ ESEMPIO CONCRETO:                                           │
            │ Se photo.title = "accusamus beatae ad facilis"              │
            │ Allora verrà visualizzato: accusamus beatae ad facilis      │
            │                                                             │
            │ Il titolo viene mostrato come testo normale sopra           │
            │ l'immagine della foto.                                      │
            └─────────────────────────────────────────────────────────────┘
          */}
          
          
          
          
          {/* --------------------------------------------------------------
              🖼️ Visualizzazione dell'Immagine (Thumbnail)
              -------------------------------------------------------------- */}
          
          <img 
            src={photo.thumbnailUrl} 
            alt={photo.title} 
          />
          {/* 
            ┌─────────────────────────────────────────────────────────────┐
            │ ELEMENTO IMG (Image)                                        │
            ├─────────────────────────────────────────────────────────────┤
            │ IMG = elemento per mostrare un'immagine nella pagina.      │
            │                                                             │
            │ È un elemento SELF-CLOSING (auto-chiudente):               │
            │ - In HTML: <img src="..." alt="...">                       │
            │ - In JSX:  <img src="..." alt="..." />  ← nota lo /        │
            │                                                             │
            │ ══════════════════════════════════════════════════════════ │
            │ ATTRIBUTO 1: src (source)                                   │
            │ ══════════════════════════════════════════════════════════ │
            │                                                             │
            │ src = l'URL dell'immagine da mostrare                       │
            │                                                             │
            │ VALORE: src={photo.thumbnailUrl}                            │
            │                                                             │
            │ SPIEGAZIONE:                                                │
            │ - Le graffe {} indicano: "questo è JavaScript"             │
            │ - photo.thumbnailUrl = l'URL della miniatura della foto    │
            │                                                             │
            │ PERCHÉ "thumbnail" E NON "url"?                            │
            │ L'oggetto photo ha DUE URL:                                │
            │ 1. url → immagine GRANDE (es. 600x600 pixel)              │
            │ 2. thumbnailUrl → miniatura PICCOLA (es. 150x150 pixel)   │
            │                                                             │
            │ Usiamo thumbnailUrl perché:                                │
            │ - Si carica PIÙ VELOCEMENTE (file più piccolo)            │
            │ - Risparmia BANDA (importante su mobile)                   │
            │ - È sufficiente per un'anteprima in una lista              │
            │                                                             │
            │ ESEMPIO:                                                   │
            │ Se photo.thumbnailUrl = "https://via.placeholder.com/150"  │
            │ Diventa: <img src="https://via.placeholder.com/150" .../>  │
            │                                                             │
            │ ══════════════════════════════════════════════════════════ │
            │ ATTRIBUTO 2: alt (alternative text)                         │
            │ ══════════════════════════════════════════════════════════ │
            │                                                             │
            │ alt = testo alternativo che descrive l'immagine             │
            │                                                             │
            │ VALORE: alt={photo.title}                                   │
            │                                                             │
            │ A COSA SERVE?                                              │
            │                                                             │
            │ 1. ACCESSIBILITÀ:                                          │
            │    Gli screen reader (software per non vedenti) leggono    │
            │    questo testo ad alta voce per descrivere l'immagine.    │
            │    Esempio: "Immagine: Una bella foto di un gatto"         │
            │                                                             │
            │ 2. FALLBACK (piano B):                                     │
            │    Se l'immagine NON si carica (URL errato, connessione    │
            │    lenta, immagine rimossa), il browser mostra il testo    │
            │    alt invece di un'icona di immagine rotta.               │
            │                                                             │
            │ 3. SEO (Search Engine Optimization):                       │
            │    Google e altri motori di ricerca leggono l'attributo    │
            │    alt per capire cosa rappresenta l'immagine e           │
            │    indicizzarla nelle ricerche per immagini.               │
            │                                                             │
            │ 4. CONTESTO:                                               │
            │    Se l'utente naviga con le immagini disabilitate (per    │
            │    risparmiare dati), vede comunque una descrizione.       │
            │                                                             │
            │ ⚠️ IMPORTANTE:                                             │
            │ L'attributo alt è OBBLIGATORIO per un HTML valido e per   │
            │ garantire l'accessibilità. Non va mai omesso!              │
            │                                                             │
            │ ESEMPIO:                                                   │
            │ Se photo.title = "Gatto che dorme"                          │
            │ Diventa: <img ... alt="Gatto che dorme" />                 │
            │                                                             │
            │ Se l'immagine non si carica, l'utente vedrà il testo:      │
            │ "Gatto che dorme" al posto dell'immagine.                  │
            │                                                             │
            │ ══════════════════════════════════════════════════════════ │
            │ ESEMPIO COMPLETO                                           │
            │ ══════════════════════════════════════════════════════════ │
            │                                                             │
            │ Se photo = {                                                │
            │   id: 5,                                                    │
            │   title: "Una bella foto di un gatto",                      │
            │   thumbnailUrl: "https://example.com/cat-thumb.jpg"        │
            │ }                                                           │
            │                                                             │
            │ L'HTML generato sarà:                                      │
            │ <img                                                        │
            │   src="https://example.com/cat-thumb.jpg"                  │
            │   alt="Una bella foto di un gatto"                         │
            │ />                                                          │
            │                                                             │
            │ COSA VEDE L'UTENTE:                                        │
            │ - Se l'immagine si carica: vede la foto del gatto          │
            │ - Se non si carica: vede "Una bella foto di un gatto"      │
            │ - Se usa uno screen reader: sente "Immagine: Una bella     │
            │   foto di un gatto"                                         │
            └─────────────────────────────────────────────────────────────┘
          */}
          
        </li>
        // ┌───────────────────────────────────────────────────────────────┐
        // │ FINE DELL'ELEMENTO <li>                                       │
        // ├───────────────────────────────────────────────────────────────┤
        // │ Questo blocco (da <li key={photo.id}> a </li>) viene         │
        // │ ripetuto per OGNI foto presente nell'array "photos".          │
        // │                                                                │
        // │ Se ci sono 50 foto nell'array, verranno creati 50 elementi   │
        // │ <li>, ognuno con il titolo e l'immagine della propria foto.  │
        // │                                                                │
        // │ PROCESSO:                                                     │
        // │ 1. .map() prende la prima foto → crea il primo <li>          │
        // │ 2. .map() prende la seconda foto → crea il secondo <li>      │
        // │ 3. ... continua per tutte le foto                            │
        // │ 4. Tutti gli <li> vengono inseriti dentro <ul>               │
        // └───────────────────────────────────────────────────────────────┘
        
      ))}
      {/* 
        ┌─────────────────────────────────────────────────────────────────┐
        │ FINE DEL CICLO .map()                                           │
        ├─────────────────────────────────────────────────────────────────┤
        │ A questo punto, tutte le foto sono state processate.            │
        │ Il metodo .map() ha ciclato su ogni foto nell'array "photos" e  │
        │ ha creato un elemento <li> per ognuna di esse.                  │
        │                                                                  │
        │ RIEPILOGO:                                                      │
        │ .map() ha trasformato un array di OGGETTI (dati) in un array   │
        │ di ELEMENTI JSX (componenti visivi).                            │
        │                                                                  │
        │ PRIMA (array di oggetti):                                       │
        │ [                                                                │
        │   {id: 1, title: "Foto 1", thumbnailUrl: "url1.jpg"},          │
        │   {id: 2, title: "Foto 2", thumbnailUrl: "url2.jpg"}           │
        │ ]                                                                │
        │                                                                  │
        │ DOPO (array di elementi JSX):                                   │
        │ [                                                                │
        │   <li key="1">Foto 1 <img src="url1.jpg" alt="Foto 1" /></li>, │
        │   <li key="2">Foto 2 <img src="url2.jpg" alt="Foto 2" /></li>  │
        │ ]                                                                │
        │                                                                  │
        │ React prende questo array di elementi JSX e li inserisce nel   │
        │ DOM (la struttura HTML della pagina), creando la lista visibile.│
        └─────────────────────────────────────────────────────────────────┘
      */}
      
    </ul>
    {/* 
      ┌───────────────────────────────────────────────────────────────────┐
      │ FINE DELLA LISTA <ul>                                             │
      ├───────────────────────────────────────────────────────────────────┤
      │ La lista non ordinata <ul> si chiude qui.                         │
      │ Tutti gli elementi <li> creati dal .map() sono ora dentro questa  │
      │ <ul>, formando una lista visiva completa di tutte le foto.        │
      └───────────────────────────────────────────────────────────────────┘
    */}
    
  </>
  // ┌─────────────────────────────────────────────────────────────────────┐
  // │ FINE DEL FRAGMENT                                                   │
  // ├─────────────────────────────────────────────────────────────────────┤
  // │ Il Fragment React (<> </>) si chiude qui.                           │
  // │ Tutto ciò che è contenuto nel Fragment viene restituito come un     │
  // │ unico "blocco" al chiamante (React), che lo renderizzerà nel DOM.   │
  // └─────────────────────────────────────────────────────────────────────┘
  
)
// ┌───────────────────────────────────────────────────────────────────────┐
// │ FINE DEL RETURN                                                       │
// ├───────────────────────────────────────────────────────────────────────┤
// │ La keyword "return" termina qui.                                      │
// │ Tutto ciò che è stato restituito (il JSX dentro il Fragment) verrà   │
// │ trasformato da React in HTML reale e mostrato nel browser.            │
// │                                                                        │
// │ PROCESSO COMPLETO:                                                    │
// │ 1. React chiama la funzione App()                                     │
// │ 2. La funzione esegue gli useEffect (fetch dei dati)                 │
// │ 3. Quando i dati sono pronti, React ri-chiama la funzione            │
// │ 4. La funzione esegue il return con tutto il JSX                     │
// │ 5. React converte il JSX in HTML                                      │
// │ 6. L'HTML viene inserito nel DOM                                      │
// │ 7. Il browser mostra la pagina all'utente                            │
// └───────────────────────────────────────────────────────────────────────┘


}
// ┌───────────────────────────────────────────────────────────────────────┐
// │ FINE DELLA FUNZIONE App                                               │
// ├───────────────────────────────────────────────────────────────────────┤
// │ La funzione App() termina qui.                                        │
// │ Questa è una funzione "componente" React: riceve props (in questo    │
// │ caso nessuna) e restituisce JSX da visualizzare.                      │
// └───────────────────────────────────────────────────────────────────────┘





// ============================================================================
// 📤 SEZIONE 5: ESPORTAZIONE DEL COMPONENTE
// ============================================================================
// Questa sezione rende il componente App disponibile ad altri file


export default App
// ┌───────────────────────────────────────────────────────────────────────┐
// │ EXPORT DEFAULT                                                        │
// ├───────────────────────────────────────────────────────────────────────┤
// │ "export default" esporta il componente App come esportazione          │
// │ PREDEFINITA (default) di questo file.                                 │
// │                                                                        │
// │ ══════════════════════════════════════════════════════════════════════│
// │ COSA SIGNIFICA "ESPORTARE"?                                           │
// │ ══════════════════════════════════════════════════════════════════════│
// │                                                                        │
// │ In JavaScript moderno (ES6+), ogni file è un "modulo" separato.      │
// │ Per usare funzioni/variabili di un file in un altro file, devi       │
// │ ESPORTARLE dal primo file e IMPORTARLE nel secondo.                   │
// │                                                                        │
// │ ANALOGIA:                                                             │
// │ Immagina che ogni file sia una scatola chiusa. Per passare qualcosa  │
// │ da una scatola all'altra, devi:                                       │
// │ 1. EXPORT = mettere l'oggetto fuori dalla scatola                    │
// │ 2. IMPORT = prenderlo e portarlo nell'altra scatola                  │
// │                                                                        │
// │ ══════════════════════════════════════════════════════════════════════│
// │ DUE TIPI DI EXPORT                                                    │
// │ ══════════════════════════════════════════════════════════════════════│
// │                                                                        │
// │ 1. EXPORT DEFAULT (quello che usiamo qui)                            │
// │    ────────────────────────────────────────                          │
// │    Ogni file può avere UN SOLO export default.                       │
// │    È l'esportazione "principale" del file.                           │
// │                                                                        │
// │    SINTASSI:                                                          │
// │    export default NomeComponente;                                     │
// │                                                                        │
// │    COME SI IMPORTA (in un altro file):                               │
// │    import App from './App.jsx';                                       │
// │    import QualunqueNome from './App.jsx';  ← puoi scegliere il nome! │
// │                                                                        │
// │    NOTA: con default export, puoi usare qualsiasi nome durante       │
// │    l'import, ma per convenzione si usa lo stesso nome.               │
// │                                                                        │
// │                                                                        │
// │ 2. EXPORT NAMED (esportazione nominata)                              │
// │    ────────────────────────────────────                              │
// │    Puoi avere MOLTI export named in un file.                         │
// │    Ogni esportazione ha un nome specifico.                           │
// │                                                                        │
// │    SINTASSI:                                                          │
// │    export const funzione1 = () => {...};                              │
// │    export const funzione2 = () => {...};                              │
// │                                                                        │
// │    COME SI IMPORTA (in un altro file):                               │
// │    import { funzione1, funzione2 } from './file.js';                  │
// │    import { funzione1 as f1 } from './file.js';  ← rinomina con "as" │
// │                                                                        │
// │    NOTA: con named export, DEVI usare il nome esatto (o rinominare   │
// │    con "as").                                                         │
// │                                                                        │
// │ ══════════════════════════════════════════════════════════════════════│
// │ ESEMPIO COMPLETO DEL NOSTRO CASO                                     │
// │ ══════════════════════════════════════════════════════════════════════│
// │                                                                        │
// │ FILE: App.jsx                                                         │
// │ ─────────────────────────────────────────────────────────────────────│
// │ function App() {                                                      │
// │   return <h1>Ciao!</h1>;                                              │
// │ }                                                                     │
// │ export default App;  ← esportiamo il componente                      │
// │                                                                        │
// │                                                                        │
// │ FILE: main.jsx (file che USA il componente App)                      │
// │ ─────────────────────────────────────────────────────────────────────│
// │ import App from './App.jsx';  ← importiamo il componente             │
// │                                                                        │
// │ ReactDOM.createRoot(document.getElementById('root')).render(          │
// │   <App />  ← usiamo il componente importato                          │
// │ );                                                                    │
// │                                                                        │
// │                                                                        │
// │ ══════════════════════════════════════════════════════════════════════│
// │ PERCHÉ È IMPORTANTE?                                                 │
// │ ══════════════════════════════════════════════════════════════════════│
// │                                                                        │
// │ 1. MODULARITÀ:                                                       │
// │    Ogni componente sta in un file separato → codice organizzato      │
// │                                                                        │
// │ 2. RIUSABILITÀ:                                                      │
// │    Puoi importare lo stesso componente in più file                   │
// │                                                                        │
// │ 3. MANUTENIBILITÀ:                                                   │
// │    È più facile trovare e modificare il codice                       │
// │                                                                        │
// │ 4. TREE SHAKING:                                                     │
// │    I build tool (Vite, Webpack) possono rimuovere il codice non     │
// │    usato → bundle più piccolo e veloce                               │
// │                                                                        │
// │ ══════════════════════════════════════════════════════════════════════│
// │ SENZA EXPORT/IMPORT (vecchio modo)                                   │
// │ ══════════════════════════════════════════════════════════════════════│
// │                                                                        │
// │ Prima di ES6, tutto il codice JavaScript veniva caricato in un       │
// │ unico scope globale usando <script> tag:                             │
// │                                                                        │
// │ <script src="file1.js"></script>                                      │
// │ <script src="file2.js"></script>                                      │
// │                                                                        │
// │ PROBLEMI:                                                            │
// │ - Conflitti di nomi (se file1.js e file2.js hanno una variabile     │
// │   con lo stesso nome, si sovrascrivono)                              │
// │ - Difficile gestire le dipendenze (quale file deve essere caricato   │
// │   prima?)                                                             │
// │ - Inquinamento dello scope globale                                   │
// │                                                                        │
// │ Con export/import, ogni file è isolato e devi esplicitamente         │
// │ dichiarare cosa condividere → molto più sicuro e gestibile!          │
// └───────────────────────────────────────────────────────────────────────┘


// ============================================================================
// 🎉 FINE DEL FILE App.jsx
// ============================================================================
// 
// RIEPILOGO COMPLETO:
// ──────────────────────────────────────────────────────────────────────────
// 
// Questo file definisce un COMPONENTE REACT chiamato "App" che:
// 
// 1. GESTISCE LO STATO (useState) per:
//    - Lista di album
//    - Lista di utenti
//    - Lista di foto
// 
// 2. RECUPERA DATI (useEffect + fetch) da un'API esterna:
//    - https://jsonplaceholder.typicode.com/albums
//    - https://jsonplaceholder.typicode.com/users
//    - https://jsonplaceholder.typicode.com/photos?_limit=10
// 
// 3. VISUALIZZA (JSX) nell'interfaccia:
//    - Un titolo "Albums"
//    - Un menu a tendina per selezionare un album
//    - Una lista di utenti con nome, email, username, telefono, sito web
//    - Una lista di foto con titolo e miniatura
// 
// 4. USA TECNICHE REACT:
//    - Hooks (useState, useEffect)
//    - Rendering condizionale
//    - Liste dinamiche (.map())
//    - Props (key)
//    - Async/await per chiamate API
// 
// 5. VIENE ESPORTATO per essere usato in altri file (main.jsx)
// 
// ──────────────────────────────────────────────────────────────────────────
