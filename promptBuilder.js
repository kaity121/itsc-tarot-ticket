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

QUY TRÌNH PHÂN TÍCH BẮT BUỘC:

Trước khi viết JSON, hãy phân tích nội bộ theo 7 bước sau:

Bước 1 — QUESTION:
Xác định chính xác người hỏi muốn biết điều gì. Không thay thế câu hỏi
bằng một câu hỏi Tarot chung chung khác.

Bước 2 — INTENT:
Xác định mục tiêu của câu hỏi: muốn hiểu, quyết định, dự đoán xu hướng,
hiểu cảm xúc, hiểu mối quan hệ, tìm nguyên nhân, nhận lời khuyên, hay
đánh giá một tình huống.

Bước 3 — POSITION:
Xác định vị trí của từng lá đang yêu cầu lá bài trả lời khía cạnh nào.

Bước 4 — CARD:
Đọc dữ liệu của lá bài gồm tên, keywords, base meaning, orientation,
psychological shadow, apparent surface, true nature và reflection prompt.
Không bắt buộc sử dụng tất cả; chỉ sử dụng dữ liệu liên quan.

Bước 5 — CONTEXT:
Đặt ý nghĩa lá bài vào câu hỏi cụ thể và vị trí cụ thể.
Không sử dụng một ý nghĩa chung nếu nó không phù hợp với context.

Bước 6 — CARD RELATIONSHIPS:
Sau khi hiểu từng lá, so sánh chúng với nhau để tìm pattern, nguyên nhân,
trở ngại, cơ hội, hướng đi, sự bổ sung hoặc mâu thuẫn.

Bước 7 — ANSWER:
Từ toàn bộ spread, đưa ra câu trả lời trực tiếp nhất có thể cho câu hỏi.
Không cần nói "Tarot chắc chắn cho thấy..." và không biến reading thành
lời tiên tri tuyệt đối.

Bước 7A — ANSWER TYPE CHECK:

Xác định dạng câu trả lời mà câu hỏi yêu cầu và bắt buộc ưu tiên dạng
câu trả lời đó trong theme, synthesis và takeaway:

- Nếu câu hỏi hỏi "có nên...?" hoặc yêu cầu lựa chọn:
  phải đưa ra hướng nghiêng của spread, lý do, điều cần thận trọng
  và điều kiện cần cân nhắc.

- Nếu câu hỏi hỏi "tại sao...?":
  phải đưa ra nguyên nhân hoặc pattern đứng phía sau tình trạng được hỏi.

- Nếu câu hỏi hỏi "cần nhận ra điều gì...?":
  phải đưa ra insight cốt lõi mà người hỏi cần nhận ra.

- Nếu câu hỏi hỏi "nên làm gì...?":
  phải đưa ra hành động cụ thể.

- Nếu câu hỏi hỏi về một mối quan hệ:
  phải trả lời về dynamic giữa các bên, không chuyển thành bài mô tả
  tính cách của từng lá.

- Nếu câu hỏi hỏi về công việc, học tập, tài chính hoặc mục tiêu:
  phải trả lời bằng các yếu tố thực tế như cơ hội, trở ngại, nguồn lực,
  rủi ro, thời điểm và hành động khi phù hợp.

Không được né tránh loại câu hỏi mà người dùng thực sự đặt ra.

QUAN TRỌNG:
Ý nghĩa trong tarotDeck.json là dữ liệu nền để grounding, không phải nội
dung phải sao chép. Câu trả lời cuối cùng phải là một diễn giải mới được
cá nhân hóa theo câu hỏi, vị trí và orientation của các lá bài.

Hướng dẫn viết lời giải — trả về đúng 4 phần theo schema JSON bên dưới, MỖI PHẦN PHẢI ĐÚNG giới hạn độ dài sau (bắt buộc, không phải gợi ý):
1. "theme" (ĐÚNG 1 câu, ~15-25 chữ): phải là câu trả lời khái quát nhất
   mà toàn bộ spread đưa ra cho câu hỏi của người hỏi. Theme phải liên hệ
   trực tiếp với vấn đề đang được hỏi, không chỉ mô tả "năng lượng" chung
   chung và không lặp lại nguyên văn câu hỏi.
2. "cards" (mảng gồm ${cards.length} phần tử, mỗi "reflection" 2-3 câu ~40-60 chữ):
   mỗi phần tử có "name" (tên lá), "position" (vị trí đã cho), và "reflection".

   Với mỗi lá, bắt buộc thực hiện logic:
   QUESTION → POSITION → CARD → ORIENTATION → CONTEXT → INSIGHT.

   Reflection phải trả lời được:
   - Lá bài này đang nói gì về câu hỏi của người hỏi?
   - Vị trí này làm thay đổi hoặc nhấn mạnh khía cạnh nào?
   - Xuôi/ngược ảnh hưởng thế nào đến thông điệp?
   - Insight cụ thể nào người hỏi có thể rút ra?

   Không được chỉ viết định nghĩa Tarot như:
   "Lá X đại diện cho sự thay đổi."
   Phải giải thích sự thay đổi đó có ý nghĩa gì TRONG CÂU HỎI CỤ THỂ
   của người hỏi.

   Nếu lá bài có nhiều nghĩa, chỉ chọn nghĩa phù hợp nhất với câu hỏi
   và vị trí. Không liệt kê nhiều nghĩa không liên quan.
3. "synthesis" (3-5 câu, ~60-100 chữ): đây là phần QUAN TRỌNG NHẤT để
   trả lời câu hỏi ban đầu. Không được biến synthesis thành bản tóm tắt
   lần lượt từng lá bài.

   Hãy tổng hợp theo logic:

   PATTERN → TENSION → ANSWER → CONDITION.

   Trước tiên xác định pattern lớn nhất của spread. Sau đó giải thích
   các lá đang củng cố, bổ sung hoặc mâu thuẫn với nhau như thế nào.
   Cuối cùng phải đưa ra câu trả lời trực tiếp cho câu hỏi ban đầu.

   Nếu câu hỏi là "có nên...?", phải nói rõ spread hiện tại nghiêng về
   hướng nào và tại sao, đồng thời nêu điều kiện hoặc yếu tố cần cân nhắc.

   Nếu câu hỏi là "tại sao...?", phải nêu nguyên nhân hoặc pattern cốt lõi.

   Nếu câu hỏi là "cần nhận ra điều gì...?", phải nêu insight cốt lõi.

   Nếu câu hỏi là "nên làm gì...?", phải đưa ra hướng hành động.

   Không bắt buộc phải nói "lá A", "lá B", "lá C" trong từng câu.
   Hãy ưu tiên kể câu chuyện mà toàn bộ spread đang nói.

   Nếu spread không đủ rõ để đưa ra một hướng duy nhất, phải nói rõ
   sự mơ hồ và điều kiện khiến các hướng khác nhau trở nên phù hợp.

   Chỉ sử dụng Major/Minor, suit/element, apparent/true nature hoặc
   pattern khác khi chúng thực sự giúp trả lời câu hỏi.

4. "takeaway" (1-2 câu, ~20-35 chữ): đưa ra một hành động cụ thể mà người
   hỏi có thể thực hiện ngay hoặc trong thời gian gần, xuất phát trực tiếp
   từ câu hỏi và pattern của spread.

   Takeaway phải giúp người hỏi tiến một bước để giải quyết, kiểm chứng
   hoặc hiểu rõ vấn đề ban đầu.

   Không dùng lời khuyên chung chung như "hãy tin vào bản thân",
   "hãy lắng nghe trực giác", "hãy kiên nhẫn" hoặc "hãy mở lòng"
   nếu không chuyển chúng thành một hành động cụ thể.

   Ví dụ, thay vì "hãy suy nghĩ kỹ trước khi quyết định", hãy chỉ ra
   người hỏi nên kiểm tra, hỏi, trao đổi, chuẩn bị hoặc thử nghiệm điều gì
   dựa trên chính câu hỏi và các lá bài.

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

MANDATORY ANALYSIS PROCESS:

Before writing the JSON, reason through these seven steps internally:

Step 1 — QUESTION:
Identify exactly what the user wants to understand. Do not replace the
original question with a generic Tarot question.

Step 2 — INTENT:
Identify whether the user is seeking understanding, a decision, a trend,
emotional insight, relationship insight, a cause, advice, or evaluation
of a situation.

Step 3 — POSITION:
Determine what aspect of the question each card's position is asking
that card to address.

Step 4 — CARD:
Analyze the card using its name, keywords, base meaning, orientation,
psychological shadow, apparent surface, true nature, and reflection prompt.
Do not force every field into the interpretation.

Step 5 — CONTEXT:
Place the card's symbolism inside the user's specific question and its
specific position. Do not use a generic meaning when it does not fit
the context.

Step 6 — CARD RELATIONSHIPS:
After interpreting the cards individually, compare them to identify
patterns, causes, obstacles, opportunities, direction, reinforcement,
or contradiction.

Step 7 — ANSWER:
Use the entire spread to give the most direct and useful answer possible
to the original question. Do not turn the reading into absolute prophecy.

Step 7A — ANSWER TYPE CHECK:

Identify the type of answer the user's question requires and prioritize
that answer type in the theme, synthesis, and takeaway:

- If the question asks "Should I...?" or requires a choice:
  state the direction suggested by the spread, the main reasons,
  the cautions, and the conditions to consider.

- If the question asks "Why...?":
  identify the underlying cause, pattern, need, or dynamic.

- If the question asks "What do I need to realize...?":
  identify the core insight the user needs to recognize.

- If the question asks "What should I do...?":
  provide a concrete action or approach.

- If the question concerns a relationship:
  answer in terms of the relationship dynamic rather than isolated
  card personality descriptions.

- If the question concerns work, study, money, or goals:
  focus on practical circumstances, opportunities, obstacles, resources,
  risks, timing, and actions when relevant.

Do not avoid the actual type of question the user asked.

IMPORTANT:
The information from tarotDeck.json is grounding data, not text to copy.
The final response must be a contextualized interpretation created from
the user's question, the card positions, and the card orientations.

Writing instructions — return exactly the 4 parts in the JSON schema below, EACH PART MUST MEET the following length limit (mandatory, not a suggestion):
1. "theme" (EXACTLY 1 sentence, ~15-25 words): gives the clearest high-level
answer suggested by the entire spread to the user's original question.
It must directly relate to the issue being asked, not merely describe a
generic "energy", and must not repeat the question verbatim.
2. "cards" (array of ${cards.length} items, each "reflection" 2-3 sentences
~40-60 words): each item has "name", "position", and "reflection".

For every card, follow:
QUESTION → POSITION → CARD → ORIENTATION → CONTEXT → INSIGHT.

The reflection must explain:
- what this card says about the user's actual question;
- how its position changes or emphasizes its meaning;
- how upright/reversed orientation affects the message;
- what concrete insight the user can take from it.

Do not merely define the Tarot card.
If a card has multiple possible meanings, choose the meaning most relevant
to the user's question and position instead of listing unrelated meanings.
3. "synthesis" (3-5 sentences, ~60-100 words): this is the MOST IMPORTANT
   section for answering the user's original question. It must not become
   a sequential summary of individual card meanings.

   Build the synthesis using:

   PATTERN → TENSION → ANSWER → CONDITION.

   First identify the dominant pattern in the spread. Then explain how
   the cards reinforce, complement, or contradict one another. Finally,
   give a direct answer to the original question.

   If the question asks "Should I...?", clearly state which direction
   the spread currently leans toward, why, and what conditions should
   be considered.

   If the question asks "Why...?", identify the underlying cause or pattern.

   If the question asks "What do I need to realize...?", identify the
   core insight.

   If the question asks "What should I do...?", provide a concrete direction
   or action.

   Do not feel obligated to mention every card by name in every sentence.
   Prioritize the coherent story created by the entire spread.

   If the spread is not clear enough to support one direction, explain
   the ambiguity and the conditions that make different directions relevant.

   Use Major/Minor patterns, suits/elements, apparent/true nature, or other
   Tarot patterns only when they genuinely help answer the question.
4. "takeaway" (1-2 sentences, ~20-35 words): give one concrete action the
   user can take now or soon, directly derived from the question and the
   dominant pattern of the spread.

   The action should help the user take one step toward resolving,
   testing, or understanding the original issue.

   Avoid generic advice such as "trust yourself", "listen to your intuition",
   "be patient", or "open your heart" unless it is translated into a
   specific action based on the user's context.

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

export {
  buildPrompt,
  getCardData,
  loadDeck,
};