
export interface FacialAnalysis {
  skin_tone: string;
  face_shape: string;
  eye_shape: string;
  lip_shape: string;
  identified_features_summary: string;
}

export interface MakeupProductRecommendation {
  product_type: string; // e.g., "Alas Bedak (Foundation)"
  brand_name: string;   // e.g., "Wardah"
  product_name: string; // e.g., "Lightening Liquid Foundation"
  shade_name?: string;  // e.g., "02 Light Beige" (optional if not applicable)
  reasoning: string;    // e.g., "Cocok untuk warna kulit Anda dan memberikan hasil akhir natural."
  details?: string;     // Optional: Application tips or further details
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
