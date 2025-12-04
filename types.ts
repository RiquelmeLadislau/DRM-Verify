export interface SegmentIssue {
  quote: string;
  reason: string;
  suggestion: string;
}

export interface AnalysisResult {
  score: number;
  verdict: 'Reliable' | 'Questionable' | 'Unreliable';
  summary: string;
  segments: SegmentIssue[];
  sources: Array<{ uri: string; title: string }>;
  timestamp: string;
}

export interface HistoryItem extends AnalysisResult {
  id: string;
  preview: string;
}

export enum AppView {
  HOME = 'HOME',
  ANALYZER = 'ANALYZER',
  PRICING = 'PRICING',
  HISTORY = 'HISTORY',
}
