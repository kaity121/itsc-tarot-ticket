/**
 * promptBuilder.js
 * -----------------------------------------------------------------------
 * Deliverable for: Phạm Thị Anh Đào — Prompt & Tarot Knowledge
 *
 * Takes the drawn-cards input (matching the /api/reading contract) and
 * returns a complete, ready-to-send prompt for the AI model.
 *
 * Depends on:
 *   - tarotDeck.json   (78-card dataset: keywords + upright/reversed meanings)
 *   - systemPrompt.js  (Moonlight persona: empathetic, healing, non-judgmental)
 *
 * API contract this was built against:
 *   POST /api/reading
 *   Input:  { question: string, cards: [{ name, orientation, position }] }
 *   Output: { reading: string }
 *
 * Usage:
 *   const { buildPrompt } = require('./promptBuilder');
 *   const { systemPrompt, userPrompt } = buildPrompt({
 *     question: "Tình duyên của tôi sắp tới thế nào?",
 *     cards: [
 *       { name: "The Fool", orientation: "upright", position: "Past" },
 *       { name: "Ten of Cups", orientation: "reversed", position: "Present" },
 *       { name: "The Star", orientation: "upright", position: "Future" },
 *     ],
 *     language: "vi", // optional, defaults to "vi"
 *   });
 *
 *   // then call your AI model, e.g.:
 *   // await ai.models.generateContent({
 *   //   model: "gemini-flash-latest",
 *   //   contents: userPrompt,
 *   //   config: { systemInstruction: systemPrompt, responseMimeType: "application/json" }
 *   // });
 * -----------------------------------------------------------------------
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SYSTEM_PROMPT } from "./systemPrompt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let _deckCache = null;

/**
 * Loads and caches the 78-card deck from tarotDeck.json.
 */
function loadDeck() {
  if (_deckCache) return _deckCache;
  const deckPath = path.join(__dirname, 'tarotDeck.json');
  const raw = fs.readFileSync(deckPath, 'utf-8');
  const parsed = JSON.parse(raw);
  _deckCache = new Map(parsed.deck.map((card) => [normalizeName(card.name), card]));
  return _deckCache;
}

/**
 * Normalizes a card name for lookup (case/whitespace-insensitive).
 */
function normalizeName(name) {
  return String(name || '').trim().toLowerCase();
}

/**
 * Looks up a single card's data by name. Throws a descriptive error if the
 * card name isn't recognized, so bad input fails loudly instead of silently
 * producing a generic reading.
 */
function getCardData(name) {
  const deck = loadDeck();
  const entry = deck.get(normalizeName(name));
  if (!entry) {
    throw new Error(`Unknown tarot card name: "${name}". Check tarotDeck.json for valid names.`);
  }
  return entry;
}

/**
 * Builds the block of text describing one drawn card: its position,
 * orientation, keywords, and base meaning — this is the "grounding data"
 * the AI uses so its reading stays accurate to real tarot symbolism instead
 * of hallucinating meanings.
 */
function describeCard(card, language) {
  const data = getCardData(card.name);
  const isReversed = String(card.orientation || '').toLowerCase() === 'reversed';
  const displayName = language === 'vi' ? data.name_vi : data.name;
  const orientationLabel =
    language === 'vi' ? (isReversed ? 'Ngược' : 'Xuôi') : isReversed ? 'Reversed' : 'Upright';
  const keywords = isReversed ? data.keywords_reversed : data.keywords_upright;
  const meaning = isReversed ? data.meaning_reversed : data.meaning_upright;
  const meaningText = meaning[language] || meaning.en;
  const position = card.position || (language === 'vi' ? 'Không xác định' : 'Unspecified');

  // Các field "chiều sâu tâm lý" mới — optional chaining vì lá bài cũ (nếu
  // tarotDeck.json chưa được enrich đầy đủ) vẫn phải chạy được, không throw lỗi.
  const shadowText = data.psychological_shadow?.[language] || data.psychological_shadow?.en;
  const reflectionText = data.reflection_prompt?.[language] || data.reflection_prompt?.en;
  const contrastApparent = data.contrast_dimension?.apparent?.[language] || data.contrast_dimension?.apparent?.en;
  const contrastActual = data.contrast_dimension?.actual?.[language] || data.contrast_dimension?.actual?.en;

  if (language === 'vi') {
    let block =
      `- Vị trí: ${position}\n` +
      `  Lá bài: ${displayName} (${data.name}) — ${orientationLabel}\n` +
      `  Từ khóa: ${keywords.join(', ')}\n` +
      `  Ý nghĩa nền tảng: ${meaningText}`;
    if (shadowText) block += `\n  Điểm mù tâm lý: ${shadowText}`;
    if (contrastApparent) block += `\n  Vẻ bề ngoài: ${contrastApparent}`;
    if (contrastActual) block += `\n  Bản chất thực sự: ${contrastActual}`;
    if (reflectionText) block += `\n  Câu hỏi tự vấn gợi ý: ${reflectionText}`;
    return block;
  }
  let block =
    `- Position: ${position}\n` +
    `  Card: ${displayName} — ${orientationLabel}\n` +
    `  Keywords: ${keywords.join(', ')}\n` +
    `  Base meaning: ${meaningText}`;
  if (shadowText) block += `\n  Psychological shadow: ${shadowText}`;
  if (contrastApparent) block += `\n  Apparent surface: ${contrastApparent}`;
  if (contrastActual) block += `\n  True nature: ${contrastActual}`;
  if (reflectionText) block += `\n  Suggested reflection prompt: ${reflectionText}`;
  return block;
}

/**
 * Builds the full user-turn prompt (question + drawn cards + output format
 * instructions) that gets sent to the AI alongside the system prompt.
 *
 * @param {Object} input
 * @param {string} input.question - The user's question/focus for the reading.
 * @param {Array<{name: string, orientation: 'upright'|'reversed', position: string}>} input.cards
 * @param {'en'|'vi'} [input.language='vi'] - Output language.
 * @returns {{ systemPrompt: string, userPrompt: string }}
 */
function buildPrompt({ question, cards, language = 'vi' }) {
  if (!Array.isArray(cards) || cards.length === 0) {
    throw new Error('buildPrompt requires a non-empty "cards" array.');
  }
  const lang = language === 'en' ? 'en' : 'vi';
  const systemPrompt = SYSTEM_PROMPT[lang];

  const cardBlock = cards.map((c) => describeCard(c, lang)).join('\n\n');
  const focusQuestion =
    question && question.trim().length > 0
      ? question.trim()
      : lang === 'vi'
      ? 'Định hướng và sự rõ ràng chung cho hiện tại'
      : 'General guidance and clarity for the present moment';

  // Thống kê nhanh Major/Minor + nguyên tố (Gậy=lửa, Cốc=nước, Kiếm=khí,
  // Tiền=đất) để AI có sẵn dữ kiện cho phần "Card Dialogue" ở synthesis,
  // thay vì phải tự đếm lại từ mô tả từng lá.
  const cardDataList = cards.map((c) => getCardData(c.name));
  const majorCount = cardDataList.filter((d) => d.arcana === 'Major').length;
  const minorCount = cardDataList.length - majorCount;
  const suitLabelsVi = { Wands: 'Gậy (lửa)', Cups: 'Cốc (nước)', Swords: 'Kiếm (khí)', Pentacles: 'Tiền (đất)' };
  const suitLabelsEn = { Wands: 'Wands (fire)', Cups: 'Cups (water)', Swords: 'Swords (air)', Pentacles: 'Pentacles (earth)' };
  const suitsPresent = [...new Set(cardDataList.filter((d) => d.suit).map((d) => d.suit))];
  const suitSummaryVi = suitsPresent.length ? suitsPresent.map((s) => suitLabelsVi[s] || s).join(', ') : 'không có (toàn Major Arcana)';
  const suitSummaryEn = suitsPresent.length ? suitsPresent.map((s) => suitLabelsEn[s] || s).join(', ') : 'none (all Major Arcana)';

  const userPrompt =
    lang === 'vi'
      ? `Bối cảnh buổi đọc bài:

Câu hỏi / mối bận tâm của người hỏi: ${focusQuestion}

Các lá bài đã rút (${cards.length} lá) — ${majorCount} Major Arcana, ${minorCount} Minor Arcana. Nguyên tố xuất hiện: ${suitSummaryVi}.

${cardBlock}

Hướng dẫn viết lời giải — trả về đúng 4 phần theo schema JSON bên dưới:
1. "theme": 1 câu đúc kết năng lượng chủ đạo của cả buổi đọc, chạm thẳng vào trạng thái cảm xúc đằng sau câu hỏi — không lặp lại y nguyên câu hỏi.
2. "cards": mảng gồm ${cards.length} phần tử, mỗi phần tử có "name" (tên lá), "position" (vị trí đã cho), và "reflection" — góc nhìn sâu gắn lá bài với bối cảnh câu hỏi, tập trung cảm xúc và bài học thực tế, không chép lại từ điển/từ khóa/ý nghĩa nền tảng nguyên văn.
3. "synthesis": phân tích Card Dialogue — các lá bài đối thoại với nhau thế nào (mâu thuẫn, làm dịu, hay khuếch đại lẫn nhau; khoảng cách giữa bề ngoài và thực chất nếu có; tỷ lệ Major/Minor; các nguyên tố có tụ hay xung khắc) — chỉ dùng góc nhìn nào thực sự phù hợp với bộ bài này.
4. "takeaway": 1-2 câu hành động thực tế hoặc lời khuyên vi mô có thể áp dụng trong ngày, giúp người hỏi tự tin làm chủ tình huống.

Chỉ trả về JSON theo schema:
{
  "theme": "...",
  "cards": [
    { "name": "...", "position": "...", "reflection": "..." }
  ],
  "synthesis": "...",
  "takeaway": "..."
}
Chỉ xuất JSON thuần, không thêm chú thích hay markdown.`
      : `Reading context:

User's question / focus: ${focusQuestion}

Drawn cards (${cards.length}) — ${majorCount} Major Arcana, ${minorCount} Minor Arcana. Elements present: ${suitSummaryEn}.

${cardBlock}

Writing instructions — return exactly the 4 parts in the JSON schema below:
1. "theme": one sentence capturing the dominant energy of the whole reading, touching the feeling behind the question — don't just repeat the question.
2. "cards": an array of ${cards.length} items, each with "name" (card name), "position" (the given position), and "reflection" — a deep insight linking the card to the question's context, focused on feeling and practical lessons, not a copy of the dictionary/keywords/base meaning.
3. "synthesis": a Card Dialogue analysis — how the cards talk to each other (contradicting, softening, or amplifying one another; any gap between apparent surface and true nature; the Major/Minor ratio; whether the elements cluster or clash) — use only whichever lens is actually relevant to this spread.
4. "takeaway": 1-2 sentences of practical action or a micro piece of advice usable today, helping the person feel confident and in control.

Return ONLY JSON matching this schema:
{
  "theme": "...",
  "cards": [
    { "name": "...", "position": "...", "reflection": "..." }
  ],
  "synthesis": "...",
  "takeaway": "..."
}
Output raw JSON only, no commentary or markdown fences.`;

  return { systemPrompt, userPrompt };
}

export { buildPrompt, getCardData, loadDeck };
