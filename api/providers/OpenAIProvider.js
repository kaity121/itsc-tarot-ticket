import OpenAI from "openai";
import AIProvider from "./AIProvider.js";

class OpenAIProvider extends AIProvider {
  constructor({ model } = {}) {
    super();

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    this.client = new OpenAI({
      apiKey,
    });

    this.model = model || process.env.OPENAI_MODEL || "gpt-4o-mini";
  }

  async generateReading({
    systemPrompt,
    userPrompt,
  }) {
    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        response_format: {
          type: "json_object",
        },
      });

      const content = response.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("OpenAI returned an empty response");
      }

      try {
        return JSON.parse(content);
      } catch {
        throw new Error("OpenAI returned invalid JSON");
      }
    } catch (error) {
      const wrappedError = new Error(
        `OpenAI model "${this.model}" failed: ${
          error?.message || "Unknown error"
        }`
      );

      wrappedError.provider = "openai";
      wrappedError.model = this.model;
      wrappedError.status = error?.status;
      wrappedError.code = error?.code;

      throw wrappedError;
    }
  }
}

export default OpenAIProvider;