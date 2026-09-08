# ✦ ITSC Moonlight Tarot — Thẻ Chia Sẻ "Vé Lưu Niệm" & Trợ Lý Chiêm Nghiệm AI

> **Dự án Web Tarot kết hợp Chiêm Nghiệm Tâm Lý Tích Cực cùng Bé Cú ITSC, tích hợp Thẻ Chia Sẻ Kết Quả dạng Vé Concert Cuống Xé (Reading Ticket) phong cách Purple Holographic / Y2K Pixel-Cute và kết nối Google AI Studio (Gemini API).**

---

## 🌟 ĐIỂM NỔI BẬT CỦA DỰ ÁN

1. **Thẻ Chia Sẻ Quẻ Bài "Vé Lưu Niệm" (`TarotShareCard`)**:
   - **Ticket Stub Layout**: Lấy cảm hứng từ vé concert giấy 5 Seconds of Summer (Hamburg) với cuống xé, đường perforation chấm tròn kèm vết khoét bán nguyệt (ticket notches) và mã vạch concert barcode.
   - **Thẩm mỹ Y2K & Holographic**: Nền gradient tím lilac ánh nhũ (`#E4D2FA` ➔ `#C9A6F2`) phủ họa tiết pixel checkerboard 4px và sao kim cương 4 cánh ánh nhũ lấp lánh.
   - **Linh vật Cú/Quạ ITSC nguyên bản 100%**: Thân than chì `#2B2B33`, viền trắng dày die-cut sticker, mắt khép hờ tĩnh lặng (⌒ ⌒), hai cánh xếp răng cưa nhọn, logo hình học ITSC ở ngực, chân que đứng thẳng trên bóng mờ tím kèm bong bóng thoại.
   - **Mã QR Động**: Tạo tự động qua `qrcode.react` (`QRCodeSVG`) trỏ trực tiếp đến URL kết quả để người khác quét xem lại toàn bộ quẻ bài và thông điệp manifest.
   - **Xuất ảnh siêu nét 3x**: Tích hợp `html-to-image` với `pixelRatio: 3`, tự động đóng băng animation khi export để ảnh tĩnh đạt độ sắc nét tuyệt đối, đi kèm hiệu ứng pháo hoa giấy confetti tím/trắng bằng `canvas-confetti`.
   - **Chuyển đổi linh hoạt**: Hỗ trợ 2 chế độ hiển thị: **Vé Ngang (Ticket ~2.2:1)** trên máy tính và **Thẻ Dọc (Photocard ~1:1.4)** cho điện thoại / Story.

2. **Các Chế Độ Bói & Trải Nghiệm Bài Chuyên Sâu**:
   - **Daily Spread (Trải bài ngày - Dual Contrast)**: Rút 2 lá bài đối lập (Hiện trạng năng lượng vs. Lời khuyên hành động) kèm đồng hồ đếm ngược quẻ mới.
   - **Classic Spread (Trải bài 3 lá cổ điển)**: Rút 3 lá đại diện cho Quá khứ - Hiện tại - Tương lai với hiệu ứng xòe bài (fan selector) và lật bài mượt mà.
   - **Âm thanh thư giãn (Ambient Soundscape)**: Nhạc nền êm dịu, tiếng lật bài, xào bài và chuông gió chữa lành.

3. **Tích hợp Google AI Studio (Gemini 2.0 / 1.5 Flash)**:
   - Backend Express kết nối trực tiếp với `@google/genai` để phân tích ngữ cảnh, giải nghĩa lá bài theo tâm lý học tích cực và sinh thông điệp manifest độc bản.

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN

```text
tarot-reader/
├── api/                        # Backend API Serverless / Express
│   ├── providers/              # AI Providers (Gemini, OpenAI, Fallback)
│   │   ├── GeminiProvider.js   # Tích hợp Google Gen AI SDK
│   │   ├── OpenAIProvider.js   # Tích hợp OpenAI GPT-4o
│   │   └── index.js
│   ├── fallbackReader.js       # Thuật toán luận giải offline dự phòng
│   └── reading.js              # Endpoint POST /api/reading
├── docs/
│   └── TAROT_SHARE_CARD_PROMPT.md  # Bộ Master Prompt AI & tài liệu thiết kế
├── public/
│   ├── cards/                  # Toàn bộ 78 lá bài Tarot chuẩn Rider-Waite
│   ├── mascot-itsc.png         # Linh vật cú ITSC nguyên bản tách nền chuẩn
│   └── mascot-itsc-raw.png     # File ảnh gốc linh vật
├── src/
│   ├── assets/
│   │   └── mascotBase64.ts     # Data URI mascot hỗ trợ export không giật lag
│   ├── components/
│   │   ├── TarotShareCard.tsx  # Component Vé Lưu Niệm chia sẻ quẻ bài
│   │   ├── ReadingResultView.tsx# Khung kết quả bói & nút mở vé lưu niệm
│   │   ├── DailySpread.tsx     # Giao diện trải bài ngày
│   │   ├── ClassicSpread.tsx   # Giao diện trải bài 3 lá
│   │   ├── CardFanSelector.tsx # Hiệu ứng xòe quạt chọn bài
│   │   ├── TarotCard.tsx       # Component lá bài 3D xoay lật
│   │   ├── OwlMotifs.tsx       # Các họa tiết trang trí, sticker Bé Cú
│   │   └── Navbar.tsx          # Thanh điều hướng
│   ├── App.tsx                 # Ứng dụng chính
│   ├── index.css               # Tailwind CSS, Y2K pixel & font layers
│   └── types.ts                # TypeScript definitions
├── server.ts                   # Express dev & production server
├── systemPrompt.js             # Persona & System Prompt Bé Cú
├── promptBuilder.js            # Trình dựng prompt ngữ cảnh cho AI
├── tarotDeck.json              # Dữ liệu 78 lá bài đầy đủ tiếng Anh & tiếng Việt
├── package.json
└── vite.config.ts
```

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT & CHẠY ỨNG DỤNG

### 1. Yêu cầu môi trường
- Node.js >= 18.0.0
- npm hoặc yarn / pnpm

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình biến môi trường (`.env`)
Tạo file `.env` tại thư mục gốc của dự án:
```env
# Chọn Provider AI: 'gemini' (khuyên dùng) hoặc 'openai'
AI_PROVIDER=gemini

# Lấy khóa API miễn phí từ Google AI Studio (https://aistudio.google.com/)
GEMINI_API_KEY=AIzaSy_your_gemini_api_key_here
```

> *Lưu ý: Nếu chưa nhập API Key, hệ thống sẽ tự động chuyển sang chế độ `fallbackReader` thông minh để ứng dụng vẫn hoạt động trơn tru.*

### 4. Khởi chạy Development Server
```bash
npm run dev
```
Mở trình duyệt tại: **`http://localhost:3000`**

### 5. Đóng gói Production (Build)
```bash
npm run build
npm start
```

---

## 🔮 HƯỚNG DẪN ĐẨY LÊN REPO GITHUB MỚI CỦA BẠN

Nếu bạn muốn đẩy toàn bộ dự án hoàn thiện này lên một repository GitHub mới của chính mình:

1. **Tạo Repository mới trên GitHub**:
   - Vào [github.com/new](https://github.com/new)
   - Đặt tên repository (ví dụ: `itsc-tarot-reader` hoặc `tarot-ticket-share`)
   - Chọn chế độ **Public** hoặc **Private**, không cần tích chọn README/gitignore vì đã có sẵn trong project.

2. **Chạy các lệnh sau trong terminal của dự án**:
   ```bash
   # 1. Thêm toàn bộ các file mới và thay đổi
   git add .

   # 2. Tạo commit hoàn chỉnh
   git commit -m "feat: complete TarotShareCard ticket stub, Y2K pixel styling, original ITSC mascot and Gemini AI integration"

   # 3. Đổi remote origin sang repository mới của bạn
   git remote set-url origin https://github.com/<tai-khoan-github-cua-ban>/<ten-repo-moi>.git

   # 4. Đẩy toàn bộ mã nguồn lên nhánh chính
   git branch -M main
   git push -u origin main
   ```

---

## 🎨 TÀI LIỆU PROMPT THIẾT KẾ CHO MIDJOURNEY / FLUX / AI STUDIO
Toàn bộ câu lệnh Prompt chuẩn hóa đã được chuẩn bị đầy đủ tại [`docs/TAROT_SHARE_CARD_PROMPT.md`](docs/TAROT_SHARE_CARD_PROMPT.md), bao gồm:
- Prompt sinh ảnh vé lưu niệm ngang 16:9 (`--ar 16:9`).
- Prompt sinh ảnh thẻ photocard dọc 3:4 (`--ar 3:4`).
- Negative prompt bảo toàn đường nét linh vật cú/quạ ITSC nguyên bản.
- Master LLM Prompt cho backend sinh thông điệp manifest 2-3 câu.

---

## 📄 LICENSE
Dự án được xây dựng và hoàn thiện bởi ITSC Tarot Team.
Giữ nguyên bản quyền hình ảnh linh vật và thiết kế bộ nhận diện thương hiệu.
