import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import TrackingInput from './components/TrackingInput';
import ResultCard from './components/ResultCard';
import Spinner from './components/Spinner';
import History from './components/History';
import { getTrackingInfo } from './services/geminiService';
import type { TrackingInfo, HistoryEntry } from './types';

interface TrackingResult extends TrackingInfo {
  number: string;
}

const App: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

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
      setError('Por favor, introduce un número de seguimiento.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const info = await getTrackingInfo(trackingNumber.trim());
      if (info.carrier === 'Desconocido' || !info.url) {
        setError('No se pudo identificar el transportista para este número. Por favor, verifica el número e inténtalo de nuevo.');
        setResult(null);
      } else {
        setResult({ ...info, number: trackingNumber.trim() });
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al procesar tu solicitud. Por favor, inténtalo más tarde.');
    } finally {
      setIsLoading(false);
    }
  }, [trackingNumber]);

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
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-red-50 text-red-800">
        <h1 className="text-2xl font-bold mb-4">Falta Configuración (API Key)</h1>
        <p className="mb-2">La aplicación no puede iniciar porque falta la clave de API.</p>
        <p className="text-sm bg-white p-4 rounded border border-red-200">
          Si eres el dueño: Ve a <strong>Vercel &gt; Settings &gt; Environment Variables</strong> y añade la variable <code>API_KEY</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white p-4 md:p-8 relative">
      <Header />
      <main className="w-full max-w-2xl mt-4 md:mt-8 flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
          Rastrea tu Pedido
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Introduce tu número de seguimiento para saber dónde está tu paquete.
        </p>
        
        <TrackingInput 
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          onTrack={handleTrack}
          isLoading={isLoading}
        />

        <div className="mt-8 w-full min-h-[50px]">
          {isLoading && <Spinner />}
          {error && <p className="text-red-600 bg-red-100 border border-red-300 rounded-lg p-4">{error}</p>}
          {result && (
            <ResultCard 
              result={result}
              onSave={handleSaveResult}
              isSaved={isResultInHistory}
            />
          )}
        </div>

        {history.length > 0 && <History entries={history} onClear={handleClearHistory} />}
      </main>
    </div>
  );
};

export default App;