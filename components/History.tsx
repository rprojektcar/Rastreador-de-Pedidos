import React from 'react';
import type { HistoryEntry } from '../types';

interface HistoryProps {
  entries: HistoryEntry[];
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ entries, onClear }) => {
  return (
    <div className="w-full max-w-2xl mt-16 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-black text-left">Historial de Búsqueda</h3>
        <button 
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-red-600 hover:underline transition-colors"
        >
          Limpiar Historial
        </button>
      </div>
      <div className="space-y-3">
        {entries.map((entry) => (
          <a
            key={entry.number}
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-red-500 transition-all duration-300 text-left"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-black break-all">{entry.number}</p>
                <p className="text-sm text-gray-600">{entry.carrier}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap ml-4 pt-1">
                {new Date(entry.timestamp).toLocaleDateString('es-ES')}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default History;