import { EmotionResult, TranslationResult, Language } from './types';

const API_BASE_URL = '/api';

export const api = {
  getLanguages: async (): Promise<Language[]> => {
    const response = await fetch(`${API_BASE_URL}/languages`);

    if (!response.ok) {
      throw new Error('Failed to fetch languages');
    }

    return response.json();
  },

  textToSpeech: async (text: string): Promise<Blob> => {
    const response = await fetch(`${API_BASE_URL}/text-to-speech`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate speech');
    }

    return response.blob();
  },

  analyzeEmotion: async (text: string): Promise<EmotionResult[]> => {
    const response = await fetch(`${API_BASE_URL}/analyze-emotion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze emotion');
    }

    return response.json();
  },

  translate: async (
    text: string,
    srcLang: string,
    tgtLang: string
  ): Promise<TranslationResult> => {
    const response = await fetch(`${API_BASE_URL}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, srcLang, tgtLang }),
    });

    if (!response.ok) {
      throw new Error('Failed to translate text');
    }

    return response.json();
  },
};
