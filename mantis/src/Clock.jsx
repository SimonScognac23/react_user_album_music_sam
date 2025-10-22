// =============================================
// 📦 IMPORTAZIONI E DIPENDENZE
// =============================================
// PASSO 1: Importiamo gli "strumenti" (hooks) che ci servono da React
// - useState: per memorizzare e aggiornare dati che cambiano (come l'ora corrente)
// - useEffect: per eseguire codice quando il componente si avvia o quando cambiano certe variabili
// - useCallback: per ottimizzare le funzioni ed evitare che si ricrino ad ogni render
// - useMemo: per ottimizzare i calcoli pesanti ed eseguirli solo quando strettamente necessario
import { useState, useEffect, useCallback, useMemo } from 'react';
// PASSO 2: Importiamo il file CSS per dare stile al nostro orologio
import './Clock.css';

// =============================================
// 🎯 COSTANTI E CONFIGURAZIONE INIZIALE
// =============================================
// PASSO 3: Definiamo le "regole" di formattazione per ora e data
// LOCALE_CONFIG contiene tutte le impostazioni per visualizzare ora/data in formato italiano
// - TIME_FORMAT: formato italiano per l'ora
// - DATE_FORMAT: formato italiano per la data
// - TIMEZONE_OPTIONS: usa 24 ore (non AM/PM) e mostra sempre 2 cifre
// - DATE_OPTIONS: mostra giorno completo, anno, mese e giorno
const LOCALE_CONFIG = {
  TIME_FORMAT: 'it-IT',
  DATE_FORMAT: 'it-IT',
  TIMEZONE_OPTIONS: {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  },
  DATE_OPTIONS: {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
};

// PASSO 4: Definiamo ogni quanto aggiornare l'orologio
// TIMER_INTERVAL = 1000 millisecondi = 1 secondo
const TIMER_INTERVAL = 1000;

// =============================================
// 🏢 COMPONENTE PRINCIPALE - Clock
// =============================================
// PASSO 5: Creiamo la funzione principale Clock che riceve le "props" (parametri)
// - show: se true mostra l'orologio, se false lo nasconde
// - country: nome del paese da visualizzare (default: 'Italia')
// - timezone: fuso orario da usare (default: 'Europe/Rome')
const Clock = ({ show = true, country = 'Italia', timezone = 'Europe/Rome' }) => {

  // =============================================
  // 🔄 GESTIONE DELLO STATO
  // =============================================
  // PASSO 6: Creiamo i "contenitori" (state) per memorizzare i dati che cambiano
  // currentTime: memorizza l'ora corrente, inizialmente impostata all'ora di adesso
  // setCurrentTime: funzione per aggiornare currentTime
  const [currentTime, setCurrentTime] = useState(() => new Date());
  // PASSO 7: Creiamo un contenitore per le singole cifre dei secondi
  // secondsDigits: oggetto che contiene le due cifre dei secondi separate
  // Per esempio: se sono le 14:30:47, avremo {first: "4", second: "7"}
  // Questo ci serve per fare animazioni speciali sulle singole cifre
  const [secondsDigits, setSecondsDigits] = useState({ first: '0', second: '0' });
  // PASSO 8: Creiamo un contatore per debugging (solo durante lo sviluppo)
  // renderCount: conta quante volte il componente si aggiorna
  const [renderCount, setRenderCount] = useState(0);

  // =============================================
  // 🚀 CALCOLI OTTIMIZZATI
  // =============================================
  // PASSO 9: Creiamo un "formatter" ottimizzato per l'ora usando useMemo
  // useMemo significa "calcola questo solo quando timezone cambia"
  // Così evitiamo di ricreare questa configurazione ogni secondo inutilmente
  // timeFormatter contiene tutte le regole per formattare l'ora nel fuso orario giusto
  const timeFormatter = useMemo(() => ({
    locale: LOCALE_CONFIG.TIME_FORMAT,
    options: { ...LOCALE_CONFIG.TIMEZONE_OPTIONS, timeZone: timezone }
  }), [timezone]);

  // PASSO 10: Creiamo un "formatter" ottimizzato per la data
  // Stesso principio del timeFormatter ma specifico per la data
  // Si ricalcola solo quando il timezone cambia
  const dateFormatter = useMemo(() => ({
    locale: LOCALE_CONFIG.DATE_FORMAT,
    options: { ...LOCALE_CONFIG.DATE_OPTIONS, timeZone: timezone }
  }), [timezone]);

  // PASSO 11: Calcoliamo l'ora già formattata usando useMemo
  // formattedTime contiene l'ora pronta da mostrare (es: "14:30:47")
  // Si ricalcola solo quando currentTime o timeFormatter cambiano
  // Questo evita di riformattare l'ora ogni render se non è necessario
  const formattedTime = useMemo(() =>
    currentTime.toLocaleTimeString(timeFormatter.locale, timeFormatter.options),
    [currentTime, timeFormatter]
  );

  // PASSO 12: Calcoliamo la data già formattata
  // formattedDate contiene la data pronta da mostrare (es: "Giovedì, 23 Ottobre 2025")
  // Si ricalcola solo quando currentTime o dateFormatter cambiano
  const formattedDate = useMemo(() =>
    currentTime.toLocaleDateString(dateFormatter.locale, dateFormatter.options),
    [currentTime, dateFormatter]
  );

  // =============================================
  // 🔧 FUNZIONI HELPER
  // =============================================
  // PASSO 13: Creiamo una funzione per separare le cifre dei secondi
  // extractSecondsDigits prende una data e restituisce le due cifre dei secondi
  // Per esempio: se i secondi sono 47, restituisce {first: "4", second: "7"}
  // useCallback significa "non ricreare questa funzione ad ogni render per ottimizzare"
  const extractSecondsDigits = useCallback((date) => {
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return { first: seconds.charAt(0), second: seconds.charAt(1) };
  }, []);

  // PASSO 14: Creiamo la funzione principale che aggiorna tutti i dati temporali
  // updateTimeState viene chiamata ogni secondo dal timer
  // - Crea una nuova data con l'ora attuale
  // - Aggiorna currentTime nello stato
  // - Aggiorna le cifre dei secondi
  // - Se siamo in modalità sviluppo, incrementa il contatore dei render
  const updateTimeState = useCallback(() => {
    const now = new Date();
    setCurrentTime(now);
    setSecondsDigits(extractSecondsDigits(now));
    if (import.meta.env.DEV) setRenderCount(prev => prev + 1);
  }, [extractSecondsDigits]);

  // =============================================
  // ⚡ EFFETTI COLLATERALI
  // =============================================
  // PASSO 15: Configuriamo il "cuore" dell'orologio con useEffect
  useEffect(() => {
    // PASSO 16: Debug console in sviluppo
    if (import.meta.env.DEV) {
      console.group(`🕐 Orologio - Avvio Componente`);
      console.log(`📍 Paese: ${country}`);
      console.log(`🌍 Fuso Orario: ${timezone}`);
      console.log(`⏰ Ora di Avvio: ${new Date().toISOString()}`);
      console.groupEnd();
    }

    // PASSO 17: Aggiorniamo subito l'ora appena il componente si carica
    updateTimeState();

    // PASSO 18: Timer principale che aggiorna ogni secondo
    const timerId = setInterval(updateTimeState, TIMER_INTERVAL);

    // PASSO 19: Cleanup quando il componente si smonta
    return () => {
      clearInterval(timerId);
      if (import.meta.env.DEV) {
        console.log(`🗑️ Pulizia orologio completata per ${country}`);
        console.log(`📊 Aggiornamenti totali: ${renderCount}`);
      }
    };
  }, [country, timezone, updateTimeState, renderCount]);

  // =============================================
  // 🚪 CONTROLLO VISIBILITÀ
  // =============================================
  // PASSO 20: Nascondi componente se show=false
  if (!show) return null;

  // =============================================
  // 🎨 STRUTTURA JSX
  // =============================================
  // PASSO 21-46: JSX con tutti i commenti inline mantenuti
  // PASSO 22: Contenitore principale <article>
  // - className: CSS
  // - role="timer": screen reader
  // - aria-label: descrizione
  // - data-timezone e data-country: attributi
  return (
    <article
      className="clock-container"
      role="timer"
      aria-label={`Orologio per ${country}`}
      data-timezone={timezone}
      data-country={country}
    >
      {/* PASSO 23: Contenitore principale */}
      {/* article semantico + accessibilità */}

      {/* PASSO 24: Header */}
      <header className="clock-header">
        <h2 className="clock-title">
          {/* PASSO 25: Emoji decorativa */}
          <span className="clock-emoji">🕐</span>
          {/* PASSO 26: Nome paese */}
          <span className="clock-country">{country}</span>
          {/* PASSO 27: Badge fuso orario */}
          <span className="clock-timezone-badge">{timezone}</span>
        </h2>
      </header>

      {/* PASSO 28: Main content */}
      <main className="clock-main">
        {/* PASSO 29: Ora principale */}
        <section className="time-section">
          <div className="time-display" aria-live="polite" aria-label={`Orario corrente: ${formattedTime}`}>
            {/* PASSO 30: Ora formattata */}
            <span className="time-value">{formattedTime}</span>
            {/* PASSO 31: Indicatore fuso orario */}
            <span className="time-zone-indicator">{timezone.split('/')[1]}</span>
          </div>
        </section>

        {/* PASSO 32-33: Data */}
        <section className="date-section">
          <div className="date-display" aria-label={`Data corrente: ${formattedDate}`}>
            <span className="date-value">{formattedDate}</span>
          </div>
        </section>

        {/* PASSO 34-38: Secondi separati */}
        <section className="seconds-section">
          <div className="seconds-container">
            <div className="seconds-label">Secondi</div>
            <div className="seconds-digits">
              <span className="digit digit-first" data-digit={secondsDigits.first}>{secondsDigits.first}</span>
              <span className="digit-separator">:</span>
              <span className="digit digit-second" data-digit={secondsDigits.second}>{secondsDigits.second}</span>
            </div>
          </div>
        </section>
      </main>

      {/* PASSO 39-43: Debug footer */}
      {import.meta.env.DEV && (
        <footer className="clock-debug">
          <details className="debug-panel">
            <summary className="debug-toggle">Informazioni Debug</summary>
            <div className="debug-content">
              <div className="debug-item">
                <span className="debug-key">Aggiornamenti:</span>
                <span className="debug-value">{renderCount}</span>
              </div>
              <div className="debug-item">
                <span className="debug-key">Timestamp:</span>
                <span className="debug-value">{currentTime.getTime()}</span>
              </div>
              <div className="debug-item">
                <span className="debug-key">Offset UTC:</span>
                <span className="debug-value">{currentTime.getTimezoneOffset()}</span>
              </div>
            </div>
          </details>
        </footer>
      )}
    </article>
  );
};

// =============================================
// 📋 METADATI DEL COMPONENTE
// =============================================
// PASSO 44: Nome componente per strumenti sviluppo
Clock.displayName = 'ProfessionalClock';

// =============================================
// 📤 ESPORTAZIONI
// =============================================
// PASSO 45: Default export
export default Clock;
// PASSO 46: Named exports per testing e configurazioni
export { Clock, LOCALE_CONFIG, TIMER_INTERVAL };
