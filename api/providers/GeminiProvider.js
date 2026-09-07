import { GoogleGenAI } from "@google/genai";
import AIProvider from "./AIProvider.js";

class GeminiProvider extends AIProvider {
  constructor() {
    super();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    this.client = new GoogleGenAI({
      apiKey,
    });

    this.models = [
      "gemini-3.8-flash",
      "gemini-3.7-flash",
      "gemini-3.6-flash",
      "gemini-3.5-flash-lite",
    ];
  }

  async generateReading({
    systemPrompt,
    userPrompt,
    temperature = 0.7,
  }) {
    let lastError = null;

    for (const model of this.models) {
      try {
        const response = await this.client.models.generateContent({
          model,
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature,
            responseMimeType: "application/json",
          },
        });

        const text =
          typeof response.text === "function"
            ? response.text()
            : response.text;

        if (!text) {
          throw new Error(
            `Gemini returned an empty response from ${model}`
          );
        }

        try {
          return JSON.parse(text);
        } catch {
          throw new Error(
            `Gemini returned invalid JSON from ${model}`
          );
        }
      } catch (error) {
        lastError = error;

        console.error(
          `Gemini model ${model} failed:`,
          error?.message || error
        );
      }
    }

    throw (
      lastError ||
      new Error("All Gemini models failed")
    );
  }
}

export default GeminiProvider;