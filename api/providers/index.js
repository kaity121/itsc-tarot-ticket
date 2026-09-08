import OpenAIProvider from "./OpenAIProvider.js";

class FallbackAIProvider {
  constructor(providers) {
    this.providers = providers;
  }

  async generateReading(request) {
    let lastError;

    for (const provider of this.providers) {
      try {
        return await provider.generateReading(request);
      } catch (error) {
        lastError = error;

        console.warn(
          `[AI fallback] ${error?.provider || "provider"} ${
            error?.model ? `"${error.model}"` : ""
          } failed: ${error?.message || "Unknown error"}`
        );
      }
    }

    throw lastError || new Error("All AI providers failed");
  }
}

let providerInstance = null;

export function getAIProvider() {
  if (providerInstance) {
    return providerInstance;
  }

  const providers = [];

  if (process.env.OPENAI_API_KEY) {
    const primaryModel =
      process.env.OPENAI_MODEL || "gpt-4o-mini";

    const backupModel =
      process.env.OPENAI_BACKUP_MODEL || "gpt-5.6-luna";

    providers.push(
      new OpenAIProvider({
        model: primaryModel,
      })
    );

    if (backupModel !== primaryModel) {
      providers.push(
        new OpenAIProvider({
          model: backupModel,
        })
      );
    }
  }

  if (providers.length === 0) {
    throw new Error("No AI provider is configured");
  }

  providerInstance = new FallbackAIProvider(providers);

  return providerInstance;
}