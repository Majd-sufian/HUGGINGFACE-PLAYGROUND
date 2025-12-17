import { useState, useEffect } from 'react';
import { api } from '../api';
import { Language } from '../types';

export function TextTranslation() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [srcLang, setSrcLang] = useState('en');
  const [tgtLang, setTgtLang] = useState('es');

  // Fetch supported languages on mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const langs = await api.getLanguages();
        setLanguages(langs);
      } catch (err) {
        console.error('Failed to fetch languages:', err);
        setError('Failed to load languages');
      }
    };

    fetchLanguages();
  }, []);

  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setTranslatedText(null);

    try {
      const result = await api.translate(text, srcLang, tgtLang);
      setTranslatedText(result.translation_text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to translate text');
    } finally {
      setLoading(false);
    }
  };

  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.name || code;
  };

  return (
    <div className="feature-card">
      <h2>🌍 Translation</h2>

      <div className="language-selectors">
        <div className="input-group">
          <label htmlFor="src-lang">From:</label>
          <select
            id="src-lang"
            value={srcLang}
            onChange={(e) => setSrcLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="tgt-lang">To:</label>
          <select
            id="tgt-lang"
            value={tgtLang}
            onChange={(e) => setTgtLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="translate-input">
          Enter text in {getLanguageName(srcLang)}:
        </label>
        <textarea
          id="translate-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Enter text in ${getLanguageName(srcLang)}...`}
        />
      </div>

      <button onClick={handleTranslate} disabled={loading || !text.trim()}>
        {loading ? 'Translating...' : `Translate to ${getLanguageName(tgtLang)}`}
      </button>

      {error && <div className="error">{error}</div>}

      {translatedText && (
        <div className="result-box">
          <h3>Translation ({getLanguageName(tgtLang)}):</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}
