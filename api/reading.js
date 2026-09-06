import { GoogleGenAI } from "@google/genai";
import { buildPrompt } from "../promptBuilder.js";

const CANDIDATE_MODELS = [
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
];

function getAIClient() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return null;
    }

    return new GoogleGenAI({
        apiKey,
        httpOptions: {
            timeout: 30000,
            headers: {
                "User-Agent": "moonlight-tarot",
            },
        },
    });
}

function validateRequest(body) {
    if (!body || typeof body !== "object") {
        return "Request body is required.";
    }

    const { question, cards, language } = body;

    if (typeof question !== "string" || question.trim().length === 0) {
        return "Question is required.";
    }

    if (body.language !== "en" && body.language !== "vi") {
        return "Language must be 'en' or 'vi'.";
    }

    if (!Array.isArray(cards) || cards.length === 0) {
        return "Cards array is required.";
    }

    for (const card of cards) {
        if (!card || typeof card !== "object") {
            return "Each card must be an object.";
        }

        if (typeof card.name !== "string" || card.name.trim().length === 0) {
            return "Each card must have a name.";
        }

        if (
            card.orientation !== "upright" &&
            card.orientation !== "reversed"
        ) {
            return "Card orientation must be 'upright' or 'reversed'.";
        }

        if (
            typeof card.position !== "string" ||
            card.position.trim().length === 0
        ) {
            return "Each card must have a position.";
        }
    }

    return null;
}

function getErrorStatus(error) {
    if (!error) {
        return null;
    }

    if (typeof error.status === "number") {
        return error.status;
    }

    if (typeof error.code === "number") {
        return error.code;
    }

    const message = error instanceof Error ? error.message : String(error);

    if (message.includes("429")) {
        return 429;
    }

    if (message.includes("503")) {
        return 503;
    }

    if (message.includes("500")) {
        return 500;
    }

    return null;
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed. Use POST /api/reading.",
        });
    }

    const validationError = validateRequest(req.body);

    if (validationError) {
        return res.status(400).json({
            error: validationError,
        });
    }

    const { question, cards, language } = req.body;

    const ai = getAIClient();

    if (!ai) {
        return res.status(500).json({
            error: "GEMINI_API_KEY is not configured.",
        });
    }

    let systemPrompt;
    let userPrompt;

    try {
        const builtPrompt = buildPrompt({
            question: question.trim(),
            cards,
            language: language === "en" ? "en" : "vi",
        });

        console.log("API LANGUAGE:", language);
        console.log("SYSTEM PROMPT LANGUAGE:", language === "en" ? "EN" : "VI");

        systemPrompt = builtPrompt.systemPrompt;
        userPrompt = builtPrompt.userPrompt;
        console.log("=== LANGUAGE DEBUG ===");
        console.log("LANGUAGE:", language);
        console.log("SYSTEM PROMPT:", systemPrompt);
        console.log("USER PROMPT:", userPrompt);
        console.log("======================");
    } catch (error) {
        console.error("Prompt building error:", error);

        return res.status(500).json({
            error: "Failed to build AI prompt.",
        });
    }

    for (const model of CANDIDATE_MODELS) {
        try {
            const response = await ai.models.generateContent({
                model,
                contents: userPrompt,
                config: {
                    systemInstruction: systemPrompt,
                    responseMimeType: "application/json",
                    temperature: 0.7,
                },
            });
            const responseText = response.text?.trim();

            if (!responseText) {
                continue;
            }

            let parsed;

            try {
                parsed = JSON.parse(responseText);
            } catch (error) {
                console.error("Invalid JSON returned by Gemini:", responseText);

                continue;
            }

            if (
                !parsed ||
                typeof parsed.reading !== "string" ||
                parsed.reading.trim().length === 0
            ) {
                console.error("Gemini response does not contain a valid reading.");
                continue;
            }

            return res.status(200).json({
                reading: parsed.reading.trim(),
            });
        } catch (error) {
            const status = getErrorStatus(error);

            console.error(`Gemini model ${model} failed.`);
            console.error("Status:", status);

            if (error instanceof Error) {
                console.error("Error message:", error.message);
            } else {
                console.error("Raw error:", JSON.stringify(error, null, 2));
            }

            // Rate limit: try the next model
            if (status === 429) {
                console.warn(`Rate limit reached for ${model}. Trying next model...`);
                continue;
            }

            // Temporary server error: try the next model
            if (status === 500 || status === 503) {
                console.warn(`Temporary Gemini error for ${model}. Trying next model...`);
                continue;
            }

            // Other errors: also try the next model 
            continue;
        }
    }

    return res.status(503).json({
        error: "Unable to generate a Tarot reading at this time.",
    });
}