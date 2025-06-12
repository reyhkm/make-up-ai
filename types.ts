
export interface FacialAnalysis {
  skin_tone: string;
  face_shape: string;
  eye_shape: string;
  lip_shape: string;
  identified_features_summary: string;
}

export interface MakeupProductRecommendation {
  product_type: string;
  recommendation: string;
  details?: string;
}

export interface GeminiApiResponse {
  facial_analysis: FacialAnalysis;
  makeup_recommendations: MakeupProductRecommendation[];
  general_tips?: string[];
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
