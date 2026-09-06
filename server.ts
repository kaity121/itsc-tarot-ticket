import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import readingHandler from "./api/reading.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.post("/api/reading", readingHandler);

app.all("/api/reading", (req, res) => {
  return res.status(405).json({
    error: "Method not allowed. Use POST /api/reading.",
  });
});

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

function deepNormalize<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') {
    return (obj as string).normalize('NFC') as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepNormalize(item)) as unknown as T;
  }
  if (typeof obj === 'object') {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = deepNormalize(value);
    }
    return result as T;
  }
  return obj;
}

// Fallback interpretations if Gemini API key is not present or rate limited
const fallbackInterpretations: Record<string, { summary: string; perspective: string; advice: string }> = {
  "The Fool": {
    summary: "Stepping into uncharted territory with raw courage and curiosity.",
    perspective: "You might feel unprepared, but beginner's mind is your greatest superpower today.",
    advice: "Take that unconventional leap without waiting for permission or certainty. Trust your instincts over consensus."
  },
  "The Magician": {
    summary: "Complete alignment between mental focus and creative resourcefulness.",
    perspective: "It appears like luck or mystery to onlookers, but it is pure deliberate technique.",
    advice: "Assemble what is already in your hands. Direct action will dissolve whatever friction you are feeling."
  },
  "The High Priestess": {
    summary: "Subconscious clarity and intuitive knowing beneath the surface noise.",
    perspective: "External stillness is mistaken for inactivity, yet deep strategic synthesis is happening.",
    advice: "Pause before reacting. Let the answers settle rather than forcing a rushed decision."
  },
  "The Empress": {
    summary: "Abundance, generative energy, and nurturing ideas to organic fruition.",
    perspective: "Growth feels slow day-to-day, but cumulative momentum is compounding exponentially.",
    advice: "Feed what energizes you and release high-friction obligations. Allow space for natural flow."
  },
  "The Emperor": {
    summary: "Structure, boundaries, and foundational sovereignty over your domain.",
    perspective: "Rigidity might seem cold, but disciplined architecture protects your creative freedom.",
    advice: "Establish clearer parameters around your time and attention. Standardize what works."
  },
  "The Hierophant": {
    summary: "Proven systems, shared wisdom, and core institutional frameworks.",
    perspective: "Tradition can feel limiting until you realize it's a foundation designed to be mastered.",
    advice: "Study the rules first before breaking them. Seek mentorship or validated blueprints."
  },
  "The Lovers": {
    summary: "Conscious choice, authentic values, and partnership dynamics.",
    perspective: "A dilemma presents as an external fork in the road, but it's really an internal identity test.",
    advice: "Align your actions with what you truly value long-term rather than temporary comfort."
  },
  "The Chariot": {
    summary: "Disciplined willpower driving conflicting forces toward a singular goal.",
    perspective: "Internal tension feels like chaotic friction, but it is the exact fuel propelling you forward.",
    advice: "Keep your eyes fixed firmly on the horizon. Refuse to be pulled into peripheral drama."
  },
  "Strength": {
    summary: "Gentle mastery over instinctual fears through patience and grace.",
    perspective: "Quiet endurance is often mistaken for weakness, yet it conquers what brute force cannot.",
    advice: "Lead with calm composure. Soft power will disarm the hostility or anxiety you face."
  },
  "The Hermit": {
    summary: "Intentional solitude for introspective calibration and perspective.",
    perspective: "Withdrawing looks like disengagement, but it is essential recalibration of your compass.",
    advice: "Step away from the crowd and notifications. The insight you need lives in quiet reflection."
  },
  "Wheel of Fortune": {
    summary: "Cyclical momentum, shifting tides, and uncontrollable variables.",
    perspective: "Unforeseen turns seem disruptive, yet they are re-routing you past obsolete paths.",
    advice: "Adapt swiftly instead of clinging to fixed expectations. Ride the wave rather than fighting the current."
  },
  "Justice": {
    summary: "Clear-eyed accountability, objective reality, and equitable resolution.",
    perspective: "Emotional narratives collapse in the light of raw, measurable facts.",
    advice: "Be unflinchingly honest with yourself and others. Fair terms yield the strongest alliances."
  },
  "The Hanged Man": {
    summary: "Voluntary suspension, surrender of control, and revolutionary perspective.",
    perspective: "What feels like a frustrating standstill is an incubation period for your next breakthrough.",
    advice: "Stop trying to push the river. Change your vantage point and see the blessing in the delay."
  },
  "Death": {
    summary: "Inevitable transformation, clearing out the outgrown to allow rebirth.",
    perspective: "An ending feels like a loss, but it is merely the shedding of an old protective shell.",
    advice: "Let go of what is ready to depart. The space you create today will house tomorrow's vital creation."
  },
  "Temperance": {
    summary: "Dynamic synthesis, middle path moderation, and patient alchemy.",
    perspective: "Compromise might feel unspectacular, yet it creates sustainable longevity.",
    advice: "Blend disparate elements gradually. Cultivate equilibrium between ambition and physical rest."
  },
  "The Devil": {
    summary: "Recognizing self-imposed attachments, obsolete habits, and perceived traps.",
    perspective: "The chains seem unbreakable, but the collar is loose enough to slide off right now.",
    advice: "Examine where comfort has become complacency. Reclaim agency over your own habits."
  },
  "The Tower": {
    summary: "Sudden breakthrough dismantling illusions to reveal unvarnished truth.",
    perspective: "Shocking shifts feel destructive, but only unstable foundations are collapsing.",
    advice: "Welcome the revelation with open arms. It is far better to build on bedrock than pretty illusions."
  },
  "The Star": {
    summary: "Renewed hope, quiet inspiration, and deep serenity following turbulence.",
    perspective: "A subtle spark appears faint against the dark, but it will safely navigate you home.",
    advice: "Recommit to your highest aspirations. Generosity and gentle optimism will replenish your spirit."
  },
  "The Moon": {
    summary: "Uncertainty, shifting perceptions, and intuitive navigation through shadows.",
    perspective: "Distortions amplify anxiety in the dark; things are rarely as menacing as imagined.",
    advice: "Refrain from jumping to conclusions until daylight arrives. Feel the emotion without believing the panic."
  },
  "The Sun": {
    summary: "Vibrant vitality, radiant clarity, and infectious celebration.",
    perspective: "Simplicity and joy are not frivolous; they are the highest manifestation of life force.",
    advice: "Step out into the open. Share your enthusiasm generously and bask in what is going right."
  },
  "Judgement": {
    summary: "Awakening to your higher calling, forgiveness, and definitive life milestones.",
    perspective: "The past was not wasted; every detour was training for the decision you now face.",
    advice: "Answer the summons to step up. Forgive the previous version of yourself and accept your evolution."
  },
  "The World": {
    summary: "Holistic completion, integration of lessons, and mastery of a major chapter.",
    perspective: "The circle closes cleanly, transforming past struggles into permanent wisdom.",
    advice: "Celebrate how far you've traveled. Prepare with gratitude for the exciting cycle about to begin."
  }
};

function generateCuratedReading(cards: string[], spreadType: string, perspectives: { label?: string }[] = [], language: 'en' | 'vi' = 'en') {
  const isVi = language === 'vi';
  const cardBreakdown: Record<string, string> = {};
  cards.forEach((cardName, idx) => {
    const info = fallbackInterpretations[cardName] || {
      summary: isVi ? "Lời mời tĩnh lặng để lắng nghe la bàn nội tâm và đón nhận góc nhìn trong sáng." : "A quiet invitation to trust your inner compass and embrace beginner's clarity.",
      perspective: isVi ? "Nhận ra những gì chân thực thay vì để tâm vào áp lực bề ngoài." : "Notice what feels genuine rather than what appears urgent to external spectators.",
      advice: isVi ? "Hãy bước từng bước vững chắc mà không cần chờ đợi sự phán xét từ bên ngoài." : "Take a measured, mindful step forward without waiting for external validation."
    };
    if (spreadType === "daily" && perspectives[idx]?.label) {
      cardBreakdown[cardName] = `${perspectives[idx].label}: ${info.perspective}`;
    } else if (spreadType === "classic") {
      const positionLabels = isVi ? ["Cội nguồn quá khứ", "Thực tại hiện diện", "Chiều hướng tương lai"] : ["Past Foundation", "Present Reality", "Future Trajectory"];
      const pos = perspectives[idx]?.label || positionLabels[idx] || (isVi ? `Vị trí ${idx + 1}` : `Position ${idx + 1}`);
      cardBreakdown[cardName] = `${pos}: ${info.summary} ${info.perspective}`;
    } else {
      cardBreakdown[cardName] = `${info.summary} ${info.perspective}`;
    }
  });

  const card1 = cards[0];
  const card2 = cards[1];
  const info1 = fallbackInterpretations[card1];
  const info2 = fallbackInterpretations[card2];

  let interpretation = "";
  let takeaway = "";

  if (isVi) {
    if (spreadType === "daily" && card1 && card2 && info1 && info2) {
      interpretation = `Sự đối chiếu giữa ${card1} và ${card2} cho thấy: dù vẻ ngoài có vẻ ${info1.summary.toLowerCase()}, thì bản chất thực sự là ${info2.perspective.toLowerCase()} Tách bạch cảm xúc nhất thời khỏi thực tế sẽ giúp tâm trí bạn nhẹ nhàng và sáng suốt hơn.`;
      takeaway = `${info1.advice} Hãy nhớ: ${info2.advice}`;
    } else {
      interpretation = `Những lá bài phản chiếu hành trình chuyển hóa nội tại của bạn. Hãy trân quý những gì đã tích lũy trong quá khứ, bình thản đón nhận thử thách hiện tại và để chặng đường mới tự nhiên mở ra.`;
      takeaway = `Giải phóng nhu cầu phải kiểm soát mọi thứ ngay lập tức. Giữ tâm tĩnh lặng hôm nay, hướng đi đúng đắn sẽ tự khắc tỏ tường.`;
    }
  } else {
    if (spreadType === "daily" && card1 && card2 && info1 && info2) {
      interpretation = `The dynamic between ${card1} and ${card2} reveals that while situations may outwardly appear as ${info1.summary.toLowerCase()}, the deeper truth is that ${info2.perspective.toLowerCase()} Decoupling this surface perception from underlying reality relieves unhelpful tension.`;
      takeaway = `${info1.advice} Remember: ${info2.advice}`;
    } else {
      interpretation = `Your cards reflect an unfolding progression of conscious agency. Honor the roots already established, confront present friction with calm presence, and allow your next steps to emerge with clarity.`;
      takeaway = `Release the impulse to force immediate certainty. Focus on honest alignment today, and allow the path forward to reveal itself naturally.`;
    }
  }

  return {
    interpretation,
    cardBreakdown,
    takeaway,
    source: "curated"
  };
}

// Ordered models for automatic failover when high-demand (503/429) occurs
const CANDIDATE_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
  "gemini-flash-latest"
];

app.post("/api/tarot-read", async (req, res) => {
  try {
    const { question, cards, spreadType = "daily", perspectives = [], language = "en" } = req.body;

    if (!Array.isArray(cards) || cards.length === 0) {
      return res.status(400).json({ error: "Cards array is required" });
    }

    const ai = getGenAI();
    const isVi = language === "vi";

    // If no AI key is configured, return rich curated ArcaneX interpretation immediately
    if (!ai) {
      const curated = generateCuratedReading(cards, spreadType, perspectives, language);
      return res.json(curated);
    }

    // Call Gemini with structured prompt and model failover
    const cardDescriptions = cards.map((c: string, idx: number) => {
      const defaultClassicLabels = isVi ? ["Cội nguồn quá khứ", "Thực tại hiện diện", "Chiều hướng tương lai"] : ["Past Foundation", "Present Reality", "Future Trajectory"];
      const positionLabel = perspectives[idx]?.label || (spreadType === "classic" ? defaultClassicLabels[idx] : `Card ${idx + 1}`);
      return `- ${c} (${positionLabel})`;
    }).join("\n");

    const prompt = `
You are the resident reader for Moonlight, a modern, empathetic, psychologically grounded tarot sanctuary inspired by the nocturnal discernment of the ITSC Owl mascot.
Tone: ArcaneX style — warm, deeply observant, concise, grounded, poetic yet rational. Absolutely zero esoteric fear-mongering, fatalism, superstitious doom, or mystical cliché.
${isVi ? `CRITICAL LANGUAGE REQUIREMENT: VIETNAMESE (Tiếng Việt). Bạn BẮT BUỘC phải viết toàn bộ nội dung JSON (interpretation, takeaway, cardBreakdown) bằng Tiếng Việt tinh tế, sâu sắc, mang năng lượng chiêm nghiệm tĩnh lặng của loài cú đêm ITSC.` : `CRITICAL LANGUAGE REQUIREMENT: ENGLISH.`}

Context:
Spread Type: ${spreadType === "daily" ? "2-Card Contrast Spread (Daily Insight: Appearance vs Reality)" : "3-Card Narrative Spread (Past / Present / Future)"}
User Question / Focus: ${question || (isVi ? "Chiêm nghiệm nội tâm và định hướng tĩnh lặng" : "Daily guidance and honest alignment")}
Drawn Cards:
${cardDescriptions}

Output instructions:
1. Provide exactly ONE punchy, clear sentence for each drawn card addressing its specific position/perspective ${isVi ? "bằng tiếng Việt" : "in English"}.
2. End with a 2-sentence actionable, grounded takeaway for the user today ${isVi ? "bằng tiếng Việt" : "in English"}.
3. A smooth combined paragraph summarizing the full reading with warmth and clarity ${isVi ? "bằng tiếng Việt" : "in English"}.

Format your response as valid JSON with this schema:
{
  "cardBreakdown": {
    ${cards.map((c: string) => `"${c}": "${isVi ? "Một câu nhận định sâu sắc về " + c : "Single punchy sentence for " + c}"`).join(",\n    ")}
  },
  "takeaway": "${isVi ? "Hai câu hướng dẫn thực tế để hành động ngay hôm nay." : "Two grounded, actionable sentences."}",
  "interpretation": "${isVi ? "Đoạn văn đúc kết lời giải nghĩa một cách dịu êm và thấu tỏ." : "A smooth combined paragraph summarizing the full reading with warmth."}"
}
Only output raw JSON.
`;

    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });

        const responseText = response.text?.trim() || "";
        if (!responseText) continue;

        let parsedData: { cardBreakdown?: Record<string, string>; takeaway?: string; interpretation?: string } = {};

        try {
          parsedData = JSON.parse(responseText);
        } catch {
          parsedData = {
            interpretation: responseText,
            takeaway: isVi ? "Bước tiếp với sự hiện diện tỉnh thức hôm nay. Hãy chú ý đến những điều chân thật và tĩnh lặng." : "Step forward with conscious presence today. Notice what is quiet and true.",
            cardBreakdown: {}
          };
        }

        return res.json(deepNormalize({
          interpretation: parsedData.interpretation || responseText,
          cardBreakdown: parsedData.cardBreakdown || {},
          takeaway: parsedData.takeaway || (isVi ? "Tin tưởng vào phán đoán sáng suốt của chính bạn khi mọi việc mở ra." : "Trust your grounded judgment as events unfold."),
          source: "gemini"
        }));
      } catch {
        // Transparent failover to next candidate model
        continue;
      }
    }

    // If all models are temporarily saturated (e.g. 503 high demand spikes), fallback to curated
    const curated = generateCuratedReading(cards, spreadType, perspectives, language);
    return res.json(deepNormalize(curated));
  } catch {
    const fallbackCards = (req.body?.cards || []) as string[];
    const spreadType = (req.body?.spreadType || "daily") as string;
    const perspectives = (req.body?.perspectives || []) as { label?: string }[];
    const language = (req.body?.language || "en") as 'en' | 'vi';
    const curated = generateCuratedReading(fallbackCards, spreadType, perspectives, language);
    return res.json(deepNormalize(curated));
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Moonlight Tarot server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
