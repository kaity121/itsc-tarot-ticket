/**
 * types.ts
 * -----------------------------------------------------------------------
 * Kiểu dữ liệu dùng chung cho frontend, khớp với schema JSON mà
 * promptBuilder.js ép AI trả về (xem buildPrompt() trong promptBuilder.js).
 *
 * Lưu ý: nếu file src/types.ts thật của bạn đã có sẵn interface
 * TarotReadingApiResponse (kiểu cũ `{ reading: string }`), hãy THAY THẾ
 * toàn bộ interface đó bằng bản dưới đây — đừng chỉ thêm vào, vì kiểu cũ
 * và kiểu mới không tương thích ngược (breaking change).
 * -----------------------------------------------------------------------
 */

/** Một lá bài trong kết quả trả về, gắn với vị trí đã rút. */
export interface TarotCardReflection {
  /** Tên lá bài, ví dụ "The Fool". */
  name: string;
  /** Vị trí đã gán khi rút bài, ví dụ "Quá khứ" / "Hiện tại" / "Tương lai". */
  position: string;
  /** Góc nhìn sâu gắn lá bài với câu hỏi — không phải định nghĩa từ điển. */
  reflection: string;
}

/** Toàn bộ kết quả 1 buổi đọc bài, đúng schema JSON mà AI phải trả về. */
export interface TarotReadingApiResponse {
  /** 1 câu đúc kết năng lượng chủ đạo của buổi đọc. */
  theme: string;
  /** Reflection cho từng lá bài đã rút, theo đúng thứ tự đã gửi lên AI. */
  cards: TarotCardReflection[];
  /** Phân tích "Card Dialogue" — sự tương tác/mâu thuẫn giữa các lá bài. */
  synthesis: string;
  /** 1-2 câu hành động thực tế / lời khuyên vi mô cho hôm nay. */
  takeaway: string;
}

/**
 * @deprecated Schema cũ, chỉ giữ lại để tham chiếu / hỗ trợ migrate dữ liệu
 * cũ nếu cần. Đừng dùng cho code mới — dùng TarotReadingApiResponse ở trên.
 */
export interface LegacyTarotReadingApiResponse {
  reading: string;
}
