export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  englishTitle: string;
  tagline: string;
  description: string;
  accentColor: string;
  themeColor: string;
}

export interface ExhibitKeyword {
  icon: string;
  label: string;
  sublabel: string;
  statValue?: string;
}

export interface CoreCapability {
  icon: string;
  label: string;
}

export interface ExhibitHighlight {
  icon: string;
  title: string;
  desc: string;
}

export interface ExhibitItem {
  id: string;
  name: string;
  subtitle: string;
  englishTag: string;
  accentColor: string;
  themeColor: string;
  keywords: ExhibitKeyword[];
  videoUrl?: string;
  videoLabel?: string;
  screenshots?: string[];
  coreCapabilities?: CoreCapability[];
  certifications?: string[];
  description?: string;
  highlights?: ExhibitHighlight[];
}

export interface CacheLog {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warn';
}
