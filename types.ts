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