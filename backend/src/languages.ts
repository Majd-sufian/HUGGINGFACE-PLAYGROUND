// Top 10 most common languages with their mbart model codes
export interface Language {
  code: string;
  name: string;
  modelCode: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', modelCode: 'en_XX' },
  { code: 'es', name: 'Spanish', modelCode: 'es_XX' },
  { code: 'zh', name: 'Chinese', modelCode: 'zh_CN' },
  { code: 'hi', name: 'Hindi', modelCode: 'hi_IN' },
  { code: 'ar', name: 'Arabic', modelCode: 'ar_AR' },
  { code: 'pt', name: 'Portuguese', modelCode: 'pt_XX' },
  { code: 'fr', name: 'French', modelCode: 'fr_XX' },
  { code: 'de', name: 'German', modelCode: 'de_DE' },
  { code: 'ja', name: 'Japanese', modelCode: 'ja_XX' },
  { code: 'ru', name: 'Russian', modelCode: 'ru_RU' },
];

// Create a map for quick lookup
export const LANGUAGE_MAP = new Map(
  SUPPORTED_LANGUAGES.map(lang => [lang.code, lang])
);

// Validate if a language code is supported
export function isLanguageSupported(code: string): boolean {
  return LANGUAGE_MAP.has(code);
}

// Get model code from language code
export function getModelCode(code: string): string | undefined {
  return LANGUAGE_MAP.get(code)?.modelCode;
}
