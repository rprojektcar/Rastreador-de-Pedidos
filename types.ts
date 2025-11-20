
export interface TrackingInfo {
  carrier: string;
  url: string;
}

export interface HistoryEntry extends TrackingInfo {
  number: string;
  timestamp: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Translation {
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  trackButton: string;
  tracking: string;
  carrierDetected: string;
  trackingNumber: string;
  goToTracking: string;
  saveToHistory: string;
  saved: string;
  manualCopyWarning: string;
  historyTitle: string;
  clearHistory: string;
  unknownCarrierError: string;
  genericError: string;
  emptyInputError: string;
  missingConfig: string;
  missingConfigDetail: string;
  missingConfigInstruction: string;
}