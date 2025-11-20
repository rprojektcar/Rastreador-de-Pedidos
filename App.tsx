
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TrackingInput from './components/TrackingInput';
import ResultCard from './components/ResultCard';
import Spinner from './components/Spinner';
import History from './components/History';
import { getTrackingInfo } from './services/geminiService';
import type { TrackingInfo, HistoryEntry, Translation } from './types';

interface TrackingResult extends TrackingInfo {
  number: string;
}

const translations: Record<string, Translation> = {
  es: {
    title: "Rastrea tu Pedido",
    subtitle: "Introduce tu número de seguimiento para saber dónde está tu paquete.",
    inputPlaceholder: "Ej: CH123456789DE",
    trackButton: "Rastrear",
    tracking: "Rastreando...",
    carrierDetected: "Transportista Detectado",
    trackingNumber: "Número de seguimiento:",
    goToTracking: "Ir a la página de seguimiento \u2192",
    saveToHistory: "Guardar en historial",
    saved: "Guardado",
    manualCopyWarning: "Es posible que necesites pegar el número de seguimiento manualmente en la página del transportista.",
    historyTitle: "Historial de Búsqueda",
    clearHistory: "Limpiar Historial",
    unknownCarrierError: "No se pudo identificar el transportista para este número. Por favor, verifica el número e inténtalo de nuevo.",
    genericError: "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo más tarde.",
    emptyInputError: "Por favor, introduce un número de seguimiento.",
    missingConfig: "Falta Configuración (API Key)",
    missingConfigDetail: "La aplicación no puede iniciar porque falta la clave de API.",
    missingConfigInstruction: "Si eres el dueño: Ve a Vercel > Settings > Environment Variables y añade la variable API_KEY."
  },
  en: {
    title: "Track Your Order",
    subtitle: "Enter your tracking number to see where your package is.",
    inputPlaceholder: "Ex: CH123456789DE",
    trackButton: "Track",
    tracking: "Tracking...",
    carrierDetected: "Carrier Detected",
    trackingNumber: "Tracking Number:",
    goToTracking: "Go to tracking page \u2192",
    saveToHistory: "Save to history",
    saved: "Saved",
    manualCopyWarning: "You may need to manually paste the tracking number on the carrier's page.",
    historyTitle: "Search History",
    clearHistory: "Clear History",
    unknownCarrierError: "Could not identify the carrier for this number. Please check the number and try again.",
    genericError: "An error occurred while processing your request. Please try again later.",
    emptyInputError: "Please enter a tracking number.",
    missingConfig: "Configuration Missing (API Key)",
    missingConfigDetail: "The application cannot start because the API Key is missing.",
    missingConfigInstruction: "If you are the owner: Go to Vercel > Settings > Environment Variables and add the API_KEY variable."
  },
  fr: {
    title: "Suivre votre commande",
    subtitle: "Entrez votre numéro de suivi pour savoir où se trouve votre colis.",
    inputPlaceholder: "Ex: CH123456789DE",
    trackButton: "Suivre",
    tracking: "Chargement...",
    carrierDetected: "Transporteur Détecté",
    trackingNumber: "Numéro de suivi :",
    goToTracking: "Aller à la page de suivi \u2192",
    saveToHistory: "Enregistrer",
    saved: "Enregistré",
    manualCopyWarning: "Vous devrez peut-être coller manuellement le numéro de suivi sur la page du transporteur.",
    historyTitle: "Historique de recherche",
    clearHistory: "Effacer l'historique",
    unknownCarrierError: "Impossible d'identifier le transporteur pour ce numéro. Veuillez vérifier le numéro et réessayer.",
    genericError: "Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard.",
    emptyInputError: "Veuillez entrer un numéro de suivi.",
    missingConfig: "Configuration manquante (API Key)",
    missingConfigDetail: "L'application ne peut pas démarrer car la clé API est manquante.",
    missingConfigInstruction: "Si vous êtes le propriétaire : Allez dans Vercel > Paramètres > Variables d'environnement et ajoutez la variable API_KEY."
  },
  de: {
    title: "Sendung verfolgen",
    subtitle: "Geben Sie Ihre Sendungsnummer ein, um zu sehen, wo sich Ihr Paket befindet.",
    inputPlaceholder: "Bsp: CH123456789DE",
    trackButton: "Verfolgen",
    tracking: "Laden...",
    carrierDetected: "Versanddienstleister erkannt",
    trackingNumber: "Sendungsnummer:",
    goToTracking: "Zur Sendungsverfolgung \u2192",
    saveToHistory: "Im Verlauf speichern",
    saved: "Gespeichert",
    manualCopyWarning: "Möglicherweise müssen Sie die Sendungsnummer manuell auf der Seite des Versanddienstleisters einfügen.",
    historyTitle: "Suchverlauf",
    clearHistory: "Verlauf löschen",
    unknownCarrierError: "Der Versanddienstleister konnte für diese Nummer nicht identifiziert werden. Bitte überprüfen Sie die Nummer.",
    genericError: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
    emptyInputError: "Bitte geben Sie eine Sendungsnummer ein.",
    missingConfig: "Konfiguration fehlt (API Key)",
    missingConfigDetail: "Die Anwendung kann nicht gestartet werden, da der API-Schlüssel fehlt.",
    missingConfigInstruction: "Wenn Sie der Eigentümer sind: Gehen Sie zu Vercel > Settings > Environment Variables und fügen Sie die Variable API_KEY hinzu."
  },
  it: {
    title: "Traccia il tuo ordine",
    subtitle: "Inserisci il tuo numero di tracciamento per sapere dove si trova il tuo pacco.",
    inputPlaceholder: "Es: CH123456789DE",
    trackButton: "Traccia",
    tracking: "Caricamento...",
    carrierDetected: "Corriere Rilevato",
    trackingNumber: "Numero di tracciamento:",
    goToTracking: "Vai alla pagina di tracciamento \u2192",
    saveToHistory: "Salva nella cronologia",
    saved: "Salvato",
    manualCopyWarning: "Potrebbe essere necessario incollare manualmente il numero di tracciamento nella pagina del corriere.",
    historyTitle: "Cronologia delle ricerche",
    clearHistory: "Cancella cronologia",
    unknownCarrierError: "Impossibile identificare il corriere per questo numero. Controlla il numero e riprova.",
    genericError: "Si è verificato un errore durante l'elaborazione della richiesta. Riprova più tardi.",
    emptyInputError: "Inserisci un numero di tracciamento.",
    missingConfig: "Configurazione mancante (API Key)",
    missingConfigDetail: "L'applicazione non può avviarsi perché manca la chiave API.",
    missingConfigInstruction: "Se sei il proprietario: vai su Vercel > Settings > Environment Variables e aggiungi la variabile API_KEY."
  },
  pt: {
    title: "Rastrear Encomenda",
    subtitle: "Insira o seu número de rastreamento para saber onde está a sua encomenda.",
    inputPlaceholder: "Ex: CH123456789DE",
    trackButton: "Rastrear",
    tracking: "A carregar...",
    carrierDetected: "Transportadora Detetada",
    trackingNumber: "Número de rastreamento:",
    goToTracking: "Ir para a página de rastreamento \u2192",
    saveToHistory: "Guardar no histórico",
    saved: "Guardado",
    manualCopyWarning: "Pode ser necessário colar manualmente o número de rastreamento na página da transportadora.",
    historyTitle: "Histórico de Pesquisa",
    clearHistory: "Limpar Histórico",
    unknownCarrierError: "Não foi possível identificar a transportadora para este número. Verifique o número e tente novamente.",
    genericError: "Ocorreu um erro ao processar o seu pedido. Por favor, tente novamente mais tarde.",
    emptyInputError: "Por favor, insira um número de rastreamento.",
    missingConfig: "Configuração em falta (API Key)",
    missingConfigDetail: "A aplicação não pode iniciar porque falta a chave de API.",
    missingConfigInstruction: "Se é o proprietário: Vá a Vercel > Settings > Environment Variables e adicione a variável API_KEY."
  }
};

const App: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [lang, setLang] = useState<string>('es');

  // Detect browser language
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0].toLowerCase();
      if (['es', 'en', 'fr', 'de', 'it', 'pt'].includes(browserLang)) {
        setLang(browserLang);
      } else {
        setLang('en'); // Default fallback
      }
    }
  }, []);

  const t = useMemo(() => translations[lang] || translations['en'], [lang]);

  // Check for API Key on mount
  const hasApiKey = !!process.env.API_KEY;

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('rprojekt_tracking_history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (err) {
      console.error("Failed to load tracking history:", err);
      localStorage.removeItem('rprojekt_tracking_history');
    }
  }, []);

  const handleTrack = useCallback(async () => {
    if (!trackingNumber.trim()) {
      setError(t.emptyInputError);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const info = await getTrackingInfo(trackingNumber.trim());
      if (info.carrier === 'Desconocido' || !info.url) {
        setError(t.unknownCarrierError);
        setResult(null);
      } else {
        setResult({ ...info, number: trackingNumber.trim() });
      }
    } catch (err) {
      console.error(err);
      setError(t.genericError);
    } finally {
      setIsLoading(false);
    }
  }, [trackingNumber, t]);

  const handleSaveResult = useCallback((resultToSave: TrackingResult) => {
    const newEntry: HistoryEntry = {
      ...resultToSave,
      timestamp: Date.now(),
    };

    setHistory(prevHistory => {
      const updatedHistory = [
        newEntry,
        ...prevHistory.filter(item => item.number !== newEntry.number),
      ];
      const slicedHistory = updatedHistory.slice(0, 15); // Limit history to 15 entries
      localStorage.setItem('rprojekt_tracking_history', JSON.stringify(slicedHistory));
      return slicedHistory;
    });
  }, []);
  
  const handleClearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('rprojekt_tracking_history');
  }, []);

  const isResultInHistory = result ? history.some(entry => entry.number === result.number) : false;

  if (!hasApiKey) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-4 text-center bg-red-50 text-red-800 mt-10 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">{t.missingConfig}</h1>
        <p className="mb-2">{t.missingConfigDetail}</p>
        <p className="text-sm bg-white p-4 rounded border border-red-200">
          {t.missingConfigInstruction}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white p-4 md:p-8 relative w-full">
      <Header />
      <main className="w-full max-w-2xl mt-4 flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
          {t.title}
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          {t.subtitle}
        </p>
        
        <TrackingInput 
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          onTrack={handleTrack}
          isLoading={isLoading}
          texts={{
            placeholder: t.inputPlaceholder,
            button: t.trackButton,
            loading: t.tracking
          }}
        />

        <div className="mt-8 w-full min-h-[50px]">
          {isLoading && <Spinner />}
          {error && <p className="text-red-600 bg-red-100 border border-red-300 rounded-lg p-4">{error}</p>}
          {result && (
            <ResultCard 
              result={result}
              onSave={handleSaveResult}
              isSaved={isResultInHistory}
              texts={{
                carrierDetected: t.carrierDetected,
                trackingNumber: t.trackingNumber,
                goToTracking: t.goToTracking,
                saveToHistory: t.saveToHistory,
                saved: t.saved,
                manualCopyWarning: t.manualCopyWarning
              }}
            />
          )}
        </div>

        {history.length > 0 && (
          <History 
            entries={history} 
            onClear={handleClearHistory} 
            texts={{
              title: t.historyTitle,
              clear: t.clearHistory
            }}
            locale={lang}
          />
        )}
      </main>
    </div>
  );
};

export default App;
