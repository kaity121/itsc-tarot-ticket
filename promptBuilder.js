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

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SYSTEM_PROMPT } from './systemPrompt.js';

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

  if (language === 'vi') {
    return (
      `- Vị trí: ${position}\n` +
      `  Lá bài: ${displayName} (${data.name}) — ${orientationLabel}\n` +
      `  Từ khóa: ${keywords.join(', ')}\n` +
      `  Ý nghĩa nền tảng: ${meaningText}`
    );
  }
  return (
    `- Position: ${position}\n` +
    `  Card: ${displayName} — ${orientationLabel}\n` +
    `  Keywords: ${keywords.join(', ')}\n` +
    `  Base meaning: ${meaningText}`
  );
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

  // Ngân sách độ dài: 60 chữ/lá + ~20 chữ đệm cho câu mở đầu và câu kết
  const WORDS_PER_CARD = 60;
  const OPENING_CLOSING_BUFFER = 20;
  const totalWordBudget = cards.length * WORDS_PER_CARD + OPENING_CLOSING_BUFFER;

  const userPrompt =
    lang === 'vi'
      ? `Bối cảnh buổi đọc bài:

Câu hỏi / mối bận tâm của người hỏi: ${focusQuestion}

Các lá bài đã rút (${cards.length} lá):

${cardBlock}

Hướng dẫn viết lời giải:
1. QUAN TRỌNG NHẤT: Với MỖI lá bài, phần giải thích + liên hệ câu hỏi chỉ khoảng 60 chữ. Với ${cards.length} lá đã rút, tổng toàn bộ lời giải (gồm câu mở đầu, phần từng lá, câu kết) khoảng ${totalWordBudget} chữ — đây là nhận xét nhanh hiển thị trên web, không phải bài viết dài.
2. Câu đầu tiên chạm nhẹ đến cảm xúc phía sau câu hỏi — không lặp lại y nguyên câu hỏi.
3. Với MỖI lá bài: nêu tên lá, giải thích sơ qua ý nghĩa cốt lõi của lá đó (đủ dễ hiểu cho người mới, diễn đạt tự nhiên bằng lời của bạn — không sao chép y nguyên "ý nghĩa nền tảng" hay liệt kê lại từ khóa), rồi liên hệ ý nghĩa đó với câu hỏi — mỗi lá giữ trong khoảng 60 chữ như trên.
4. Câu cuối cùng là một lời khích lệ nhẹ nhàng, không phán xét, không khẳng định tuyệt đối về tương lai.
5. Không dùng tiêu đề, không gạch đầu dòng, không xuống dòng giữa các câu — viết thành một đoạn văn liền mạch, ngắn gọn, dễ đọc.

Chỉ trả về nội dung lời giải bằng tiếng Việt, dưới dạng JSON theo schema:
{
  "reading": "toàn bộ lời giải hoàn chỉnh dưới dạng một đoạn văn liền mạch"
}
Chỉ xuất JSON thuần, không thêm chú thích hay markdown.`
      : `Reading context:

User's question / focus: ${focusQuestion}

Drawn cards (${cards.length}):

${cardBlock}

Writing instructions:
1. MOST IMPORTANT: For EACH card, the explanation + connection to the question should be about 60 words. With ${cards.length} cards drawn, the ENTIRE reading (opening line + per-card parts + closing line) should total around ${totalWordBudget} words — this is a quick on-screen note, not a long-form piece.
2. Open with a short line that touches the feeling behind the question — don't just repeat the question back.
3. For EACH card: name it, briefly explain its core meaning (accessible to a beginner, in your own natural words — don't copy the "base meaning" verbatim or list keywords), then connect that meaning to the question — keep each card to about 60 words as above.
4. Close with one gentle, non-judgmental encouraging line. Never state the future as fixed or absolute.
5. No headers, no bullet points, no line breaks between sentences — write it as a single short, easy-to-read paragraph.

Return ONLY the reading, in JSON matching this schema:
{
  "reading": "the complete reading as one coherent passage of text"
}
Output raw JSON only, no commentary or markdown fences.`;

  return { systemPrompt, userPrompt };
}

export { buildPrompt, getCardData, loadDeck };
