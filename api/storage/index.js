import fs from "fs/promises";
import path from "path";

/**
 * Storage adapter for Reading Tickets.
 * Prioritizes Upstash Redis / Vercel KV REST API if configured (ideal for Vercel production).
 * Falls back to local filesystem storage (ideal for local development and self-hosted Node).
 */

const REDIS_URL =
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL;

const REDIS_TOKEN =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN;

const isRedisConfigured = Boolean(REDIS_URL && REDIS_TOKEN);

function getLocalDirectory() {
  if (process.env.VERCEL) {
    return path.join("/tmp", "readings");
  }
  return path.join(process.cwd(), "data", "readings");
}

/**
 * Save reading data to persistent storage.
 * @param {string} readingId
 * @param {object} readingData
 * @returns {Promise<object>}
 */
export async function saveReadingData(readingId, readingData) {
  if (!readingId || typeof readingId !== "string") {
    throw new Error("Invalid readingId");
  }

  const payload = {
    ...readingData,
    readingId,
    updatedAt: new Date().toISOString(),
    createdAt: readingData.createdAt || new Date().toISOString(),
  };

  if (isRedisConfigured) {
    try {
      const response = await fetch(REDIS_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${REDIS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          "SET",
          `reading:${readingId}`,
          JSON.stringify(payload),
        ]),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `[Storage] Upstash Redis SET failed (${response.status}):`,
          errorText
        );
        throw new Error("Redis storage error");
      }

      return payload;
    } catch (err) {
      console.warn(
        "[Storage] Redis error, falling back to local file storage:",
        err?.message || err
      );
    }
  }

  // Local filesystem persistence
  const dir = getLocalDirectory();
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${readingId}.json`);
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
  return payload;
}

/**
 * Retrieve reading data by ID.
 * @param {string} readingId
 * @returns {Promise<object|null>}
 */
export async function getReadingData(readingId) {
  if (!readingId || typeof readingId !== "string") {
    return null;
  }

  if (isRedisConfigured) {
    try {
      const response = await fetch(REDIS_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${REDIS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["GET", `reading:${readingId}`]),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.result) {
          return typeof data.result === "string"
            ? JSON.parse(data.result)
            : data.result;
        }
      }
    } catch (err) {
      console.warn(
        "[Storage] Redis GET error, checking filesystem:",
        err?.message || err
      );
    }
  }

  // Local filesystem lookup
  try {
    const dir = getLocalDirectory();
    const filePath = path.join(dir, `${readingId}.json`);
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (err) {
    if (err.code === "ENOENT") {
      return null;
    }
    console.error("[Storage] Read error:", err?.message || err);
    throw err;
  }
}
