export interface TextToSpeechRequest {
  text: string;
}

export interface EmotionAnalysisRequest {
  text: string;
}

export interface TranslationRequest {
  text: string;
  srcLang: string;  // Language code (e.g., 'en', 'es', 'fr')
  tgtLang: string;  // Language code (e.g., 'en', 'es', 'fr')
}

export interface EmotionResponse {
  label: string;
  score: number;
}

export interface TranslationResponse {
  translation_text: string;
}

export interface ErrorResponse {
  error: string;
}
