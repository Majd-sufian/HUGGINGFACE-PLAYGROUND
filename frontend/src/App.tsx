import './App.css';
import { TextToSpeech } from './components/TextToSpeech';
import { EmotionAnalysis } from './components/EmotionAnalysis';
import { TextTranslation } from './components/TextTranslation';

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src="/hf-logo.svg" alt="Hugging Face Logo" />
        <h1>Hugging Face AI Tools</h1>
        <p>Text-to-Speech, Emotion Analysis & Translation</p>
      </header>

      <div className="features-grid">
        <TextToSpeech />
        <EmotionAnalysis />
        <TextTranslation />
      </div>
    </div>
  );
}

export default App;
