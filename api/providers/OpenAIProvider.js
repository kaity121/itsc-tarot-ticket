import OpenAI from "openai";
import AIProvider from "./AIProvider.js";

class OpenAIProvider extends AIProvider {
  constructor() {
    super();

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    this.client = new OpenAI({
      apiKey,
    });

    this.model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  }

  async generateReading({
    systemPrompt,
    userPrompt,
    temperature = 0.7,
  }) {
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
      temperature,
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
  }
}

export default OpenAIProvider;