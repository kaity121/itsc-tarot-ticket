/**
 * dailyContrastPrompt.js
 * -----------------------------------------------------------------------
 * "Bé Cú" — Phân Tích Tương Phản Hàng Ngày (Daily Contrast Analysis)
 *
 * Tính năng trải 2 lá ĐỐI LẬP: 1 lá đại diện "Vẻ bề ngoài" (điều tưởng
 * chừng đang diễn ra) và 1 lá đại diện "Bản chất thực sự" (điều ẩn sâu
 * hơn bên dưới). Khác với promptBuilder.js (trả về 1 đoạn văn "reading"
 * duy nhất), tính năng này trả về 4 phần tách biệt theo đúng UI đã có:
 *   1. surfaceAppearance   — "Vẻ bề ngoài (Tưởng chừng là)"
 *   2. trueNature          — "Bản chất thực sự (Thực chất là)"
 *   3. synthesis           — câu tổng hợp/châm ngôn kết nối cả 2 lá (có nêu tên lá)
 *   4. mindfulAction       — "Hành Động Tĩnh Tâm", 1 hành động cụ thể cho hôm nay
 *
 * Ngân sách chữ được canh theo đúng ví dụ thật trên web (đo từ screenshot):
 *   surfaceAppearance ~15-20 từ | trueNature ~15-20 từ |
 *   synthesis ~35-45 từ | mindfulAction ~20-25 từ
 *
 * Phụ thuộc:
 *   - tarotDeck.json (dùng lại)
 *   - getCardData từ promptBuilder.js (tái sử dụng, không load lại deck)
 *
 * Cách dùng:
 *   const { buildContrastPrompt } = require('./dailyContrastPrompt');
 *   const { systemPrompt, userPrompt } = buildContrastPrompt({
 *     surfaceCard: { name: "The Moon", orientation: "upright" },
 *     trueNatureCard: { name: "The Fool", orientation: "upright" },
 *     language: "vi", // optional, defaults "vi"
 *   });
 * -----------------------------------------------------------------------
 */

const { getCardData } = require('./promptBuilder');

const SYSTEM_PROMPT_CONTRAST = {
  vi: `Bạn là Bé Cú, người đọc Tarot ấm áp, thấu cảm. Luôn xưng "Bé Cú".

Nguyên tắc:
- Thấu cảm, nói như bạn thân, không phán xét, không dọa nạt/định mệnh.
- Lá "bề ngoài" dù nặng (Tháp, Tử Thần, Mặt Trăng...) vẫn phải dẫn tới "bản chất" tích cực/trưởng thành hơn.
- Không khẳng định chắc tương lai, luôn để người đọc tự quyết.
- Giọng văn tự nhiên, tránh sáo rỗng huyền bí, tránh hoa mỹ.

Định dạng bắt buộc, trả JSON 4 field:
- surfaceAppearance (~15-20 chữ): cảm giác bề mặt từ lá 1, không cần nêu tên lá.
- trueNature (~15-20 chữ): sự thật sâu hơn từ lá 2, không cần nêu tên lá.
- synthesis (~35-45 chữ): 1 câu châm ngôn, PHẢI nêu tên cả 2 lá, kết nối 2 ý nghĩa.
- mindfulAction (~20-25 chữ): 1 hành động tĩnh tâm áp dụng hôm nay.
Mỗi field 1-2 câu liền mạch, không tiêu đề, không gạch đầu dòng.`,

  en: `You are Little Owl, a warm, empathetic Tarot reader. Always refer to yourself as "Little Owl".

Principles:
- Empathetic, speak like a close friend, no judgment, no fear-mongering/fatalism.
- The "surface" card, even if heavy (Tower, Death, Moon...), must still lead to a more positive/mature "true nature".
- Never state the future as certain; always leave the reader's agency intact.
- Natural voice, avoid mystical clichés, avoid ornate language.

Required format, return JSON with 4 fields:
- surfaceAppearance (~15-20 words): surface feeling from card 1, no need to name the card.
- trueNature (~15-20 words): deeper truth from card 2, no need to name the card.
- synthesis (~35-45 words): one aphorism-like sentence, MUST name both cards, connecting their meanings.
- mindfulAction (~20-25 words): one grounding action usable today.
Each field is 1-2 flowing sentences, no headers, no bullet points.`,
};

/**
 * Builds systemPrompt + userPrompt cho tính năng Phân Tích Tương Phản Hàng Ngày.
 *
 * @param {Object} input
 * @param {{name: string, orientation: 'upright'|'reversed'}} input.surfaceCard - Lá "Vẻ bề ngoài".
 * @param {{name: string, orientation: 'upright'|'reversed'}} input.trueNatureCard - Lá "Bản chất thực sự".
 * @param {'en'|'vi'} [input.language='vi']
 * @returns {{ systemPrompt: string, userPrompt: string }}
 */
function buildContrastPrompt({ surfaceCard, trueNatureCard, language = 'vi' }) {
  if (!surfaceCard || !trueNatureCard) {
    throw new Error('buildContrastPrompt requires both surfaceCard and trueNatureCard.');
  }
  const lang = language === 'en' ? 'en' : 'vi';
  const systemPrompt = SYSTEM_PROMPT_CONTRAST[lang];

  const describe = (card, label) => {
    const data = getCardData(card.name);
    const isReversed = String(card.orientation || '').toLowerCase() === 'reversed';
    const displayName = lang === 'vi' ? data.name_vi : data.name;
    const orientationLabel =
      lang === 'vi' ? (isReversed ? 'ngược' : 'xuôi') : isReversed ? 'reversed' : 'upright';
    const keywords = isReversed ? data.keywords_reversed : data.keywords_upright;
    const meaning = isReversed ? data.meaning_reversed : data.meaning_upright;
    const meaningText = meaning[lang] || meaning.en;
    return lang === 'vi'
      ? `${label}: ${displayName}, ${orientationLabel} — ${keywords.join(', ')}. Ý nghĩa: ${meaningText}`
      : `${label}: ${displayName}, ${orientationLabel} — ${keywords.join(', ')}. Meaning: ${meaningText}`;
  };

  const userPrompt =
    lang === 'vi'
      ? `${describe(surfaceCard, 'Lá 1 (Vẻ bề ngoài)')}

${describe(trueNatureCard, 'Lá 2 (Bản chất thực sự)')}

Viết theo đúng 4 field JSON trong system prompt. Chỉ trả JSON thuần, không markdown.`
      : `${describe(surfaceCard, 'Card 1 (Surface Appearance)')}

${describe(trueNatureCard, 'Card 2 (True Nature)')}

Write the 4 JSON fields as defined in the system prompt. Return raw JSON only, no markdown.`;

  return { systemPrompt, userPrompt };
}

module.exports = { buildContrastPrompt, SYSTEM_PROMPT_CONTRAST };
