import { buildPrompt } from "../promptBuilder.js";
import { getAIProvider } from "./providers/index.js";
import { generateFallbackReading } from "./fallbackReader.js";

function validateRequest(body) {
  const { question, language, cards } = body || {};

  if (!question || typeof question !== "string") {
    return "Question is required";
  }

  if (!["vi", "en"].includes(language)) {
    return "Language must be either 'vi' or 'en'";
  }

  if (!Array.isArray(cards) || cards.length === 0) {
    return "At least one card is required";
  }

  for (const card of cards) {
    if (!card || typeof card !== "object") {
      return "Invalid card";
    }

    if (!card.name || typeof card.name !== "string") {
      return "Each card must have a name";
    }

    if (!["upright", "reversed"].includes(card.orientation)) {
      return "Each card must have a valid orientation";
    }

    if (!card.position || typeof card.position !== "string") {
      return "Each card must have a position";
    }
  }

  return null;
}

function validateReadingResponse(data) {
  if (!data || typeof data !== "object") {
    return false;
  }

  if (typeof data.theme !== "string" || !data.theme.trim()) {
    return false;
  }

  if (!Array.isArray(data.cards) || data.cards.length === 0) {
    return false;
  }

  for (const card of data.cards) {
    if (!card || typeof card !== "object") {
      return false;
    }

    if (typeof card.name !== "string" || !card.name.trim()) {
      return false;
    }

    if (typeof card.position !== "string" || !card.position.trim()) {
      return false;
    }

    if (
      typeof card.reflection !== "string" ||
      !card.reflection.trim()
    ) {
      return false;
    }
  }

  if (
    typeof data.synthesis !== "string" ||
    !data.synthesis.trim()
  ) {
    return false;
  }

  if (
    typeof data.takeaway !== "string" ||
    !data.takeaway.trim()
  ) {
    return false;
  }

  return true;
}

function cleanReadingResponse(data) {
  return {
    theme: data.theme.trim(),
    cards: data.cards.map((card) => ({
      name: card.name.trim(),
      position: card.position.trim(),
      reflection: card.reflection.trim(),
    })),
    synthesis: data.synthesis.trim(),
    takeaway: data.takeaway.trim(),
  };
}

function getErrorStatus(error) {
  const status =
    error?.status ||
    error?.statusCode ||
    error?.code;

  if (status === 429) {
    return 429;
  }

  if (status === 401 || status === 403) {
    return 502;
  }

  if (status === 400) {
    return 400;
  }

  if (status === 503) {
    return 503;
  }

  return 502;
}

async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const validationError = validateRequest(req.body);

  if (validationError) {
    return res.status(400).json({
      error: validationError,
    });
  }

  const { question, language, cards } = req.body;

 try {
  const { systemPrompt, userPrompt } = buildPrompt({
    question,
    language,
    cards,
  });

  let result;

  try {
    const provider = getAIProvider();

    result = await provider.generateReading({
      systemPrompt,
      userPrompt,
      temperature: 0.7,
    });

    if (!validateReadingResponse(result)) {
      throw new Error("AI provider returned an invalid reading schema");
    }

    result = cleanReadingResponse(result);
  } catch (error) {
    console.error(
      "AI provider failed, using fallback:",
      error?.message || error
    );

    result = generateFallbackReading({
      cards,
      language,
    });
  }

  return res.status(200).json(result);
} catch (error) {
  console.error(
    "Reading generation failed:",
    error?.message || error
  );

  return res.status(500).json({
    error: "Failed to generate reading",
  });
}
}
export default handler;