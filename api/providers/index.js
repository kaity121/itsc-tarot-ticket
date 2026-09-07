import OpenAIProvider from "./OpenAIProvider.js";
import GeminiProvider from "./GeminiProvider.js";

let currentProvider = null;

export function getAIProvider() {
  if (currentProvider) {
    return currentProvider;
  }

  const providerName = (
    process.env.AI_PROVIDER || "openai"
  ).toLowerCase();

  if (providerName === "openai") {
    currentProvider = new OpenAIProvider();
    return currentProvider;
  }

  if (providerName === "gemini") {
    currentProvider = new GeminiProvider();
    return currentProvider;
  }

  throw new Error(
    `Unsupported AI_PROVIDER: ${providerName}. Use "openai" or "gemini".`
  );
}