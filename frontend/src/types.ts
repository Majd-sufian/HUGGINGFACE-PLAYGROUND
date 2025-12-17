export interface EmotionResult {
  label: string;
  score: number;
}

export interface TranslationResult {
  translation_text: string;
}

export interface ApiError {
  error: string;
}

export interface Language {
  code: string;
  name: string;
  modelCode: string;
}
