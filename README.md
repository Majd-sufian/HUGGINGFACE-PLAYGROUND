# Hugging Face Playground

A playground project for experimenting with different Hugging Face models before integrating them into real-world projects. This monorepo contains a TypeScript backend API and a React + TypeScript frontend to test and interact with various AI models.

![Hugging Face Playground Dashboard](dashboard.png)

## Purpose

This project serves as a sandbox environment to:
- **Experiment** with different Hugging Face models and APIs
- **Test** model capabilities and performance
- **Prototype** AI features before production implementation
- **Learn** about model integration patterns
- **Compare** different models for specific use cases

## Current Features

### 🎤 Text-to-Speech
Convert text to natural-sounding speech using `espnet/kan-bayashi_ljspeech_vits` model.

### 😊 Emotion Analysis
Analyze emotional content in text using `SamLowe/roberta-base-go_emotions` model. Detects emotions like joy, sadness, anger, fear, and more.

### 🌍 Text Translation
Translate text between any of the top 10 most common languages using `facebook/mbart-large-50-many-to-many-mmt` model.

**Supported Languages:**
- 🇬🇧 English
- 🇪🇸 Spanish
- 🇨🇳 Chinese (Simplified)
- 🇮🇳 Hindi
- 🇸🇦 Arabic
- 🇵🇹 Portuguese
- 🇫🇷 French
- 🇩🇪 German
- 🇯🇵 Japanese
- 🇷🇺 Russian

The UI provides dropdown selectors to choose any source and target language combination from the supported languages.

## Project Structure

```
huggingface/
├── backend/           # TypeScript backend with Express
│   ├── src/
│   │   ├── server.ts  # Main server file
│   │   └── types.ts   # TypeScript interfaces
│   ├── .env           # Environment variables (API keys)
│   └── package.json
│
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/  # React components for each feature
│   │   ├── api.ts       # API client
│   │   ├── types.ts     # TypeScript types
│   │   ├── App.tsx      # Main app component
│   │   └── main.tsx     # Entry point
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Hugging Face API token ([Get one here](https://huggingface.co/settings/tokens))

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Hugging Face token:
```bash
HUGGINGFACE_TOKEN=your_token_here
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Running Both Together

You can run both backend and frontend simultaneously:

1. Start the backend in one terminal:
```bash
cd backend && npm run dev
```

2. Start the frontend in another terminal:
```bash
cd frontend && npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### GET `/api/languages`
Get list of supported languages for translation
```json
Returns: [
  { "code": "en", "name": "English", "modelCode": "en_XX" },
  { "code": "es", "name": "Spanish", "modelCode": "es_XX" },
  ...
]
```

### POST `/api/text-to-speech`
Convert text to speech
```json
{
  "text": "Hello, how are you?"
}
```
Returns: Audio file (WAV format)

### POST `/api/analyze-emotion`
Analyze emotional content in text
```json
{
  "text": "I'm feeling great today!"
}
```
Returns: Array of emotion predictions with scores

### POST `/api/translate`
Translate text between any of the 10 supported languages
```json
{
  "text": "Hello world",
  "srcLang": "en",
  "tgtLang": "es"
}
```
**Parameters:**
- `text`: Text to translate (required)
- `srcLang`: Source language code - one of: `en`, `es`, `zh`, `hi`, `ar`, `pt`, `fr`, `de`, `ja`, `ru` (required)
- `tgtLang`: Target language code - one of: `en`, `es`, `zh`, `hi`, `ar`, `pt`, `fr`, `de`, `ja`, `ru` (required)

Returns: Translated text

### GET `/api/health`
Health check endpoint
Returns: Server status and timestamp

## Adding New Models

To experiment with a new Hugging Face model:

1. **Find a model** on [Hugging Face Hub](https://huggingface.co/models)

2. **Add backend endpoint** in `backend/src/server.ts`:
```typescript
app.post("/api/your-new-feature", async (req, res) => {
  const result = await hf.yourModelMethod({
    model: "model-name",
    inputs: req.body.text,
  });
  res.json(result);
});
```

3. **Create API method** in `frontend/src/api.ts`:
```typescript
yourNewFeature: async (text: string) => {
  const response = await fetch(`${API_BASE_URL}/your-new-feature`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return response.json();
}
```

4. **Create React component** in `frontend/src/components/YourNewFeature.tsx`

5. **Add to App** in `frontend/src/App.tsx`

## Available Hugging Face Tasks

Explore more models for:
- Image Generation
- Object Detection
- Question Answering
- Summarization
- Image Classification
- Zero-Shot Classification
- Fill Mask
- Feature Extraction
- And many more!

Check the [Hugging Face.js documentation](https://huggingface.co/docs/huggingface.js/inference/README) for available methods.

## Technologies Used

### Backend
- TypeScript
- Express.js
- Hugging Face Inference API
- Node.js

### Frontend
- React 18
- TypeScript
- Vite
- CSS3

## Notes

- This is a **playground project** - code may not be production-ready
- API rate limits apply based on your Hugging Face plan
- Some models may have slower inference times
- Always test model outputs before using in production
- Keep your `.env` file secure and never commit it to version control

## Resources

- [Hugging Face Hub](https://huggingface.co/models)
- [Hugging Face.js Documentation](https://huggingface.co/docs/huggingface.js)
- [Inference API Documentation](https://huggingface.co/docs/api-inference)

## License

MIT - Feel free to use this as a starting point for your own experiments!
