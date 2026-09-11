import { getReadingData } from "../storage/index.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }

  const id = req.query?.id || req.params?.id;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Reading ID is required" });
  }

  try {
    const reading = await getReadingData(id.trim());
    if (!reading) {
      return res.status(404).json({ error: "Reading ticket not found" });
    }

    return res.status(200).json(reading);
  } catch (err) {
    console.error(`[API readings/:id] Error fetching reading ${id}:`, err?.message || err);
    return res.status(500).json({ error: "Failed to fetch reading" });
  }
}
