export enum AppState {
  IDLE = 'IDLE',
  PREVIEW = 'PREVIEW',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GeneratedImage {
  imageUrl: string;
  description?: string;
}

export interface DesignPreset {
  id: string;
  name: string;
  prompt: string;
  icon: string;
}
