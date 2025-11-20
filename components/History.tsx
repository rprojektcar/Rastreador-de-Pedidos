
import React from 'react';
import type { HistoryEntry } from '../types';

interface HistoryProps {
  entries: HistoryEntry[];
  onClear: () => void;
  texts: {
    title: string;
    clear: string;
  };
  locale: string;
}

const History: React.FC<HistoryProps> = ({ entries, onClear, texts, locale }) => {
  // Format date based on locale
  const formatDate = (timestamp: number) => {
    try {
      return new Date(timestamp).toLocaleDateString(locale);
    } catch (e) {
      return new Date(timestamp).toLocaleDateString();
    }
  };

  return (
    <div className="w-full max-w-2xl mt-8 mb-4 animate-fade-in border-t border-gray-100 pt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-black text-left">{texts.title}</h3>
        <button 
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-red-600 hover:underline transition-colors"
        >
          {texts.clear}
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
                {formatDate(entry.timestamp)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default History;
