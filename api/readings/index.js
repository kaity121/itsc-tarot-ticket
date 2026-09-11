import crypto from "crypto";
import { saveReadingData, getReadingData } from "../storage/index.js";

function generateSecureId() {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const bytes = crypto.randomBytes(8);
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

function validateCards(cards) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return "Cards must be a non-empty array";
  }

  for (const card of cards) {
    if (!card || typeof card !== "object") {
      return "Each card must be a valid object";
    }
    if (!card.name || typeof card.name !== "string") {
      return "Card must have a valid name";
    }
  }

  return null;
}

export default async function handler(req, res) {
  // GET /api/readings?id=...
  if (req.method === "GET") {
    const id = req.query?.id;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Missing reading id query param" });
    }

    try {
      const reading = await getReadingData(id.trim());
      if (!reading) {
        return res.status(404).json({ error: "Reading not found" });
      }
      return res.status(200).json(reading);
    } catch (err) {
      console.error("[API readings GET] Error:", err?.message || err);
      return res.status(500).json({ error: "Failed to fetch reading" });
    }
  }

  // POST /api/readings
  if (req.method === "POST") {
    const body = req.body || {};
    const {
      readingId: inputId,
      question,
      spreadType,
      cards,
      manifestText,
      userName,
      language,
      dateTime,
    } = body;

    const cardsError = validateCards(cards);
    if (cardsError) {
      return res.status(400).json({ error: cardsError });
    }

    const readingId = (
      typeof inputId === "string" && inputId.trim()
        ? inputId.trim()
        : generateSecureId()
    ).replace(/[^a-zA-Z0-9_-]/g, "");

    const cleanedCards = cards.map((c) => ({
      name: String(c.name || "").trim(),
      nameVi: c.nameVi ? String(c.nameVi).trim() : undefined,
      reversed: Boolean(c.reversed),
      positionLabel: c.positionLabel ? String(c.positionLabel).trim() : undefined,
      suit: c.suit ? String(c.suit).trim() : undefined,
      image: c.image ? String(c.image).trim() : undefined,
    }));

    const readingData = {
      readingId,
      question: typeof question === "string" ? question.trim() : "",
      spreadType: typeof spreadType === "string" ? spreadType.trim() : "3",
      cards: cleanedCards,
      manifestText: typeof manifestText === "string" ? manifestText.trim() : "",
      userName: typeof userName === "string" && userName.trim() ? userName.trim() : "Người Bói Ẩn Danh",
      language: language === "en" ? "en" : "vi",
      dateTime: typeof dateTime === "string" && dateTime.trim() ? dateTime.trim() : new Date().toISOString(),
    };

    try {
      const saved = await saveReadingData(readingId, readingData);

      // Determine public base URL
      const proto = req.headers["x-forwarded-proto"] || "http";
      const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost:3000";
      const publicUrl = `${proto}://${host}/ticket/${readingId}`;

      return res.status(200).json({
        readingId,
        url: publicUrl,
        reading: saved,
      });
    } catch (err) {
      console.error("[API readings POST] Error saving reading:", err?.message || err);
      return res.status(500).json({ error: "Failed to persist reading" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed. Use GET or POST." });
}
