import React from 'react';
import type { TrackingInfo } from '../types';
import CarrierLogo from './CarrierLogo';

interface ResultCardProps {
  result: TrackingInfo & { number: string };
  onSave: (result: TrackingInfo & { number: string }) => void;
  isSaved: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onSave, isSaved }) => {
  return (
    <div className="w-full max-w-lg bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6 text-left animate-fade-in">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Transportista Detectado</h3>
      
      {/* Logo and Name Row */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex-shrink-0 bg-white p-2 rounded border border-gray-100 shadow-sm">
          <CarrierLogo carrier={result.carrier} className="h-10 w-auto max-w-[120px]" />
        </div>
        <p className="text-2xl font-bold text-black">{result.carrier}</p>
      </div>
      
      <div className="mt-4 bg-gray-100 p-3 rounded-md">
        <p className="text-sm text-gray-600">Número de seguimiento:</p>
        <p className="text-base font-medium text-black break-all">{result.number}</p>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-colors duration-300"
        >
          Ir a la página de seguimiento &rarr;
        </a>
        <button
          onClick={() => onSave(result)}
          disabled={isSaved}
          className="flex-1 text-center bg-white text-black border border-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-colors duration-300 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          {isSaved ? 'Guardado en historial' : 'Guardar en historial'}
        </button>
      </div>

      {result.carrier === 'GlobalTrans' || result.carrier === 'CTT Express' ? (
        <p className="text-xs text-gray-500 mt-3 text-center">
            Es posible que necesites pegar el número de seguimiento manualmente en la página del transportista.
        </p>
      ) : null}
    </div>
  );
};

export default ResultCard;