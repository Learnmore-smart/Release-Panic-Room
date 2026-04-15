export interface GameState {
  releaseConfidence: number; // 0-100
  riskLevel: number; // 0-100
  teamTrust: number; // 0-100
  userImpact: number; // 0-100
  chaosMeter: number; // 0-100
  currentTime: Date; // Starts at 17:42
}

export interface Effect {
  releaseConfidence?: number;
  riskLevel?: number;
  teamTrust?: number;
  userImpact?: number;
  chaosMeter?: number;
  timeCost?: number; // In minutes
}

export interface Choice {
  id: string;
  text: string;
  textEn?: string;
  effect: Effect;
}

export interface GameEvent {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  choices: Choice[];
}

export interface Ending {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  imageUrl?: string;
}
