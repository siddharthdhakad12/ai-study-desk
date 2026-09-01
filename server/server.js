import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

import { studyMaterialSchema } from "./schemas.js";
import { geminiStudySchema } from "./aiSchema.js";

dotenv.config();

const app = express();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors());
app.use(express.json());


// ------------------------------------
// Health Check
// ------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Study Desk API is running",
  });
});


// ------------------------------------
// Generate Study Material
// ------------------------------------

app.post("/api/generate", async (req, res) => {
  try {
    const {
      topic,
      difficulty = "medium",
      cardCount = 7,
    } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a topic or some notes.",
      });
    }

    const allowedDifficulties = [
      "easy",
      "medium",
      "hard",
    ];

    if (!allowedDifficulties.includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: "Invalid difficulty level.",
      });
    }

    const numericCardCount = Number(cardCount);

    const allowedCardCounts = [5, 7, 10];

    if (!allowedCardCounts.includes(numericCardCount)) {
      return res.status(400).json({
        success: false,
        message: "Card count must be 5, 7, or 10.",
      });
    }


    // ------------------------------------
    // Gemini Request
    // ------------------------------------

    const response = await ai.interactions.create({
      model: "gemini-3.6-flash",

      input: `
Create exactly ${numericCardCount} useful flashcards from the following study material.

Difficulty level: ${difficulty}

Difficulty guidelines:
- Easy: focus on fundamental definitions and basic understanding.
- Medium: test understanding, relationships, and practical concepts.
- Hard: test deeper reasoning, edge cases, comparisons, and application.

The flashcards should test important concepts rather than trivial details.

Each flashcard must contain:
- question
- answer

Study material:

${topic}
`,

      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: geminiStudySchema,
      },
    });


    // ------------------------------------
    // Check AI status
    // ------------------------------------

    if (response.status !== "completed") {
      console.error(
        "Gemini interaction did not complete:",
        response.status
      );

      return res.status(502).json({
        success: false,
        message:
          "The AI could not complete the request. Please try again.",
      });
    }


    // ------------------------------------
    // Get AI output
    // ------------------------------------

    const rawText = response.output_text;

    if (!rawText) {
      return res.status(502).json({
        success: false,
        message: "The AI returned an empty response.",
      });
    }


    // ------------------------------------
    // Parse JSON
    // ------------------------------------

    let parsedData;

    try {
      parsedData = JSON.parse(rawText);
    } catch (error) {
      console.error(
        "Invalid JSON from Gemini:",
        rawText
      );

      return res.status(502).json({
        success: false,
        message:
          "The AI returned invalid data. Please try again.",
      });
    }


    // ------------------------------------
    // Validate with Zod
    // ------------------------------------

    const validationResult =
      studyMaterialSchema.safeParse(parsedData);

    if (!validationResult.success) {
      console.error(
        "Invalid study material:",
        validationResult.error
      );

      return res.status(502).json({
        success: false,
        message:
          "The AI returned an unexpected data format.",
      });
    }


    // ------------------------------------
    // Return validated result
    // ------------------------------------

    return res.json({
      success: true,
      data: validationResult.data,
    });

  } catch (error) {
    console.error("Generation error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while generating study material.",
    });
  }
});


// ------------------------------------
// Export Express app for Vercel
// ------------------------------------

// ------------------------------------
// Start server locally / export for Vercel
// ------------------------------------

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;