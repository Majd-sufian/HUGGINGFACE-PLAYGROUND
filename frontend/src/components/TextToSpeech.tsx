import { useState } from 'react';
import { api } from '../api';

export function TextToSpeech() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSpeech = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const audioBlob = await api.textToSpeech(text);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate speech');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-card">
      <h2>🎤 Text to Speech</h2>
      <div className="input-group">
        <label htmlFor="tts-input">Enter text to convert to speech:</label>
        <textarea
          id="tts-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
      </div>
      <button onClick={handleGenerateSpeech} disabled={loading || !text.trim()}>
        {loading ? 'Generating...' : 'Generate Speech'}
      </button>
      {error && <div className="error">{error}</div>}
      {audioUrl && (
        <div className="result-box">
          <h3>Generated Audio:</h3>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
}
