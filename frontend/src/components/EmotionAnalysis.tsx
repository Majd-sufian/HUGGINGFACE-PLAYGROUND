import { useState } from 'react';
import { api } from '../api';
import { EmotionResult } from '../types';

export function EmotionAnalysis() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<EmotionResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const emotions = await api.analyzeEmotion(text);
      // Sort by score descending
      const sorted = emotions.sort((a, b) => b.score - a.score);
      setResults(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze emotion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-card">
      <h2>😊 Emotion Analysis</h2>
      <div className="input-group">
        <label htmlFor="emotion-input">Enter text to analyze emotions:</label>
        <textarea
          id="emotion-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I'm feeling great today!"
        />
      </div>
      <button onClick={handleAnalyze} disabled={loading || !text.trim()}>
        {loading ? 'Analyzing...' : 'Analyze Emotion'}
      </button>
      {error && <div className="error">{error}</div>}
      {results && (
        <div className="result-box">
          <h3>Detected Emotions:</h3>
          <div className="emotion-results">
            {results.slice(0, 5).map((emotion, index) => (
              <div key={index} className="emotion-item">
                <span className="emotion-label">{emotion.label}</span>
                <span className="emotion-score">
                  {(emotion.score * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
