import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";
import express, { Request, Response } from "express";
import cors from "cors";
import {
  TextToSpeechRequest,
  EmotionAnalysisRequest,
  TranslationRequest,
} from "./types.js";
import {
  SUPPORTED_LANGUAGES,
  isLanguageSupported,
  getModelCode,
} from "./languages.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const hf = new InferenceClient(process.env.HUGGINGFACE_TOKEN);

// Text-to-Speech endpoint
app.post("/api/text-to-speech", async (req: Request<{}, {}, TextToSpeechRequest>, res: Response) => {
  console.log('from test to speech api')
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    console.log("Generating speech for:", text);

    const audioBlob = await hf.textToSpeech({
      inputs: text,
      model: "microsoft/speecht5_tts",
    });

    // Convert blob to buffer and send as audio
    const buffer = Buffer.from(await audioBlob.arrayBuffer());
    res.set("Content-Type", "audio/wav");
    res.send(buffer);
  } catch (error) {
    console.error("Text-to-speech error:", error);
    res.status(500).json({ error: "Failed to generate speech" });
  }
});

// Emotion analysis endpoint
app.post("/api/analyze-emotion", async (req: Request<{}, {}, EmotionAnalysisRequest>, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    console.log("Analyzing emotion for:", text);

    const response = await hf.textClassification({
      model: "SamLowe/roberta-base-go_emotions",
      inputs: text,
    });

    res.json(response);
  } catch (error) {
    console.error("Emotion analysis error:", error);
    res.status(500).json({ error: "Failed to analyze emotion" });
  }
});

// Text translation endpoint
app.post("/api/translate", async (req: Request<{}, {}, TranslationRequest>, res: Response) => {
  try {
    const { text, srcLang, tgtLang } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    if (!srcLang || !tgtLang) {
      return res.status(400).json({ error: "Source and target languages are required" });
    }

    // Validate language codes
    if (!isLanguageSupported(srcLang)) {
      return res.status(400).json({ error: `Source language '${srcLang}' is not supported` });
    }

    if (!isLanguageSupported(tgtLang)) {
      return res.status(400).json({ error: `Target language '${tgtLang}' is not supported` });
    }

    // Get model codes for the languages
    const srcModelCode = getModelCode(srcLang);
    const tgtModelCode = getModelCode(tgtLang);

    console.log(`Translating text from ${srcLang} to ${tgtLang}:`, text);

    const response = await hf.translation({
      model: "facebook/mbart-large-50-many-to-many-mmt",
      inputs: text,
      parameters: {
        src_lang: srcModelCode,
        tgt_lang: tgtModelCode,
      },
    });

    res.json(response);
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Failed to translate text" });
  }
});

// Get supported languages
app.get("/api/languages", (req: Request, res: Response) => {
  res.json(SUPPORTED_LANGUAGES);
});

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/languages`);
  console.log(`   POST http://localhost:${PORT}/api/text-to-speech`);
  console.log(`   POST http://localhost:${PORT}/api/analyze-emotion`);
  console.log(`   POST http://localhost:${PORT}/api/translate`);
});
