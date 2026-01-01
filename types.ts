
export interface ClutterTask {
  item: string;
  location: string;
  problem: string;
  suggestion: string;
  priority: 'High' | 'Medium' | 'Low';
  shoppingRecommendation?: string;
}

export interface AnalysisResponse {
  summary: string;
  tasks: ClutterTask[];
  estimatedTime: string;
  vibeCheck: string;
}

export enum AppState {
  HOME = 'home',
  ANALYZING = 'analyzing',
  RESULT = 'result',
  TIPS = 'tips'
}
