import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import {
  Download,
  Copy,
  Check,
  X,
  Sparkles,
  RefreshCw,
  Maximize2,
  Minimize2,
  ExternalLink,
  MessageCircle,
  Share2
} from 'lucide-react';
import { ITSC_MASCOT_BASE64 } from '../assets/mascotBase64';

export interface TarotCardShareItem {
  name: string;
  nameVi?: string;
  reversed: boolean;
  positionLabel?: string;
  suit?: 'Major' | 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  image?: string;
  icon?: React.ReactNode;
}

export interface TarotShareCardProps {
  readingId: string;
  question: string;
  spreadType: '1' | '3' | string;
  cards: TarotCardShareItem[];
  manifestText: string;
  qrUrl: string;
  userName?: string;
  dateTime?: string;
  language?: 'vi' | 'en';
  onClose?: () => void;
  inline?: boolean;
}

/**
 * 4 Tarot Suit Accent Palette Swatches
 */
const SUIT_COLORS: Record<string, { bg: string; border: string; label: string; labelVi: string; symbol: string }> = {
  Wands: {
    bg: '#E07A5F',
    border: '#C86247',
    label: 'Wands (Fire)',
    labelVi: 'Gậy (Lửa)',
    symbol: '🜂'
  },
  Cups: {
    bg: '#4A90E2',
    border: '#3374C2',
    label: 'Cups (Water)',
    labelVi: 'Chén (Nước)',
    symbol: '🜄'
  },
  Swords: {
    bg: '#8E7DBE',
    border: '#725FA7',
    label: 'Swords (Air)',
    labelVi: 'Kiếm (Khí)',
    symbol: '🜁'
  },
  Pentacles: {
    bg: '#5A9E6F',
    border: '#458558',
    label: 'Pentacles (Earth)',
    labelVi: 'Xu (Đất)',
    symbol: '🜃'
  },
  Major: {
    bg: '#9D6ED8',
    border: '#8352C4',
    label: 'Major Arcana',
    labelVi: 'Bộ Ẩn Chính',
    symbol: '✦'
  }
};

/**
 * Shimmer Star SVG for corners
 */
const HoloSparkleStar: React.FC<{
  size?: number;
  className?: string;
  delayed?: boolean;
}> = ({ size = 20, className = '', delayed = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`select-none ${delayed ? 'animate-holo-sparkle-delayed' : 'animate-holo-sparkle'} ${className}`}
  >
    <path
      d="M12 0L14.4 8.6L23 11L14.4 13.4L12 22L9.6 13.4L1 11L9.6 8.6L12 0Z"
      fill="url(#holoStarGrad)"
      stroke="#6B4FA0"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="11" r="2.2" fill="#FFFFFF" />
    <defs>
      <linearGradient id="holoStarGrad" x1="1" y1="0" x2="23" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="0.45" stopColor="#F5E8FF" />
        <stop offset="0.75" stopColor="#D8B4FE" />
        <stop offset="1" stopColor="#C084FC" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Miniature Diamond Sparkle for ticket edge
 */
const HoloDiamond: React.FC<{ size?: number; className?: string }> = ({ size = 12, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`select-none ${className}`}>
    <path
      d="M8 1L14 8L8 15L2 8L8 1Z"
      fill="#FFFFFF"
      stroke="#6B4FA0"
      strokeWidth="0.8"
      strokeLinejoin="round"
      opacity="0.9"
    />
  </svg>
);

export const TarotShareCard: React.FC<TarotShareCardProps> = ({
  readingId,
  question,
  spreadType,
  cards,
  manifestText,
  qrUrl,
  userName = 'Mystic Seeker',
  dateTime,
  language = 'vi',
  onClose,
  inline = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');
  const [statusNote, setStatusNote] = useState<string | null>(null);

  const isVi = language === 'vi';

  // Format current date if not provided
  const formattedDate = dateTime || (() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} • ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  })();

  // Format reading code display
  const readingCode = readingId ? (readingId.startsWith('#') ? readingId : `#${readingId}`) : '#8A2026';

  // Extract speech bubble text from manifest (first short punchy sentence or fallback)
  const speechBubbleSnippet = (() => {
    if (!manifestText) return isVi ? '✦ Bình tâm đón nhận thông điệp...' : '✦ Trust your inner wisdom...';
    const firstSentence = manifestText.split(/[.?!]\s/)[0];
    if (firstSentence && firstSentence.length <= 60) {
      return `${firstSentence}.`;
    }
    return firstSentence ? `${firstSentence.slice(0, 52)}...` : manifestText.slice(0, 50);
  })();

  // Identify suits present in cards
  const suitsPresent = Array.from(new Set(cards.map((c) => c.suit || 'Major')));

  // Trigger celebration confetti
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.75 },
        colors: ['#E4D2FA', '#C9A6F2', '#6B4FA0', '#FFFFFF', '#D8B4FE']
      });
      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 55,
          origin: { x: 0.15, y: 0.75 },
          colors: ['#F3E8FF', '#A855F7', '#FFFFFF']
        });
      }, 150);
      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 55,
          origin: { x: 0.85, y: 0.75 },
          colors: ['#F3E8FF', '#A855F7', '#FFFFFF']
        });
      }, 250);
    } catch {
      // Confetti fallback
    }
  };

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && qrUrl) {
        await navigator.clipboard.writeText(qrUrl);
        setIsCopied(true);
        setStatusNote(isVi ? 'Đã sao chép liên kết vào bộ nhớ tạm! ✨' : 'Link copied to clipboard! ✨');
        setTimeout(() => {
          setIsCopied(false);
          setStatusNote(null);
        }, 3000);
      }
    } catch {
      setStatusNote(isVi ? 'Không thể sao chép liên kết' : 'Unable to copy link');
    }
  };

  // Export card as PNG using html-to-image with pixelRatio: 3
  const handleExportPng = async () => {
    if (!cardRef.current || isExporting) return;

    try {
      setIsExporting(true);
      setStatusNote(isVi ? 'Đang xuất thẻ lưu niệm sắc nét 3x... ✦' : 'Rendering high-res ticket 3x... ✦');

      // Wait a frame for animations to stop and DOM to stabilize
      await new Promise((resolve) => setTimeout(resolve, 250));

      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: 'transparent',
        style: {
          transform: 'none',
          boxShadow: 'none'
        }
      });

      // Download file
      const link = document.createElement('a');
      const cleanId = readingId.replace(/[^a-zA-Z0-9_-]/g, '');
      link.download = `ITSC-Tarot-Ticket-${cleanId || 'Reading'}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      fireConfetti();
      setStatusNote(isVi ? 'Đã tải thẻ chia sẻ về máy thành công! 🎉' : 'Share card exported successfully! 🎉');
      setTimeout(() => setStatusNote(null), 4000);
    } catch (err) {
      console.error('Export error:', err);
      setStatusNote(isVi ? 'Có lỗi khi xuất ảnh, vui lòng thử lại' : 'Export failed, please try again');
      setTimeout(() => setStatusNote(null), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  // Spread Type Label
  const spreadTypeLabel = (() => {
    if (spreadType === '1' || spreadType === 'daily' || cards.length === 1) {
      return isVi ? 'Kiểu trải: 1 lá' : 'Spread: 1 Card';
    }
    if (spreadType === '2' || cards.length === 2) {
      return isVi ? 'Kiểu trải: 2 lá Chiêm Nghiệm' : 'Spread: 2 Cards Contrast';
    }
    return isVi ? 'Kiểu trải: 3 lá Cổ Điển' : 'Spread: 3 Cards Classic';
  })();

  return (
    <div className={inline ? 'w-full' : 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#160E24]/75 backdrop-blur-md overflow-y-auto'}>
      <div className="relative w-full max-w-[980px] my-auto flex flex-col items-center">
        
        {/* Top Control Bar (Non-exported toolbar) */}
        <div className="w-full flex items-center justify-between gap-2 mb-3 px-2 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-montserrat font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#34244E] border border-[#6B4FA0] text-[#E4D2FA] flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A6F2]" />
              <span>ITSC Tarot Share Ticket</span>
            </span>

            {/* Layout switch button (Horizontal concert ticket ⇋ Vertical photocard) */}
            <button
              onClick={() => setLayoutMode((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-montserrat font-semibold text-[#F3E8FF] border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              title={isVi ? 'Đổi dạng Vé Ngang / Thẻ Dọc' : 'Switch Ticket / Photocard mode'}
            >
              {layoutMode === 'horizontal' ? (
                <>
                  <Minimize2 className="w-3 h-3" />
                  <span className="hidden sm:inline">{isVi ? 'Chuyển Thẻ Dọc (1:1.4)' : 'Vertical Mode'}</span>
                  <span className="sm:hidden">{isVi ? 'Dọc' : 'Vertical'}</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3" />
                  <span className="hidden sm:inline">{isVi ? 'Chuyển Vé Ngang (2.2:1)' : 'Horizontal Mode'}</span>
                  <span className="sm:hidden">{isVi ? 'Ngang' : 'Horizontal'}</span>
                </>
              )}
            </button>

            {/* Mascot Speech Bubble Toggle */}
            <button
              onClick={() => setShowSpeechBubble((v) => !v)}
              className={`px-3 py-1 rounded-full text-xs font-montserrat font-semibold transition-all flex items-center gap-1.5 cursor-pointer border ${
                showSpeechBubble
                  ? 'bg-[#6B4FA0]/60 text-white border-[#A885DC]'
                  : 'bg-white/10 text-[#D8B4FE] border-white/20'
              }`}
              title={isVi ? 'Bật/tắt lời thoại của Bé Cú' : 'Toggle Owl speech bubble'}
            >
              <MessageCircle className="w-3 h-3" />
              <span className="hidden sm:inline">{isVi ? 'Lời Cú' : 'Owl Speech'}</span>
            </button>
          </div>

          {/* Close Modal Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              title={isVi ? 'Đóng' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* =================== THE READING TICKET CONTAINER ======================= */}
        {/* ========================================================================= */}
        <div
          ref={cardRef}
          id="tarot-share-ticket-node"
          className={`relative select-none transition-all duration-300 ${
            isExporting ? 'tarot-ticket-exporting' : ''
          } ${
            layoutMode === 'horizontal'
              ? 'w-full max-w-[880px] flex flex-col md:flex-row'
              : 'w-full max-w-[460px] flex flex-col'
          } rounded-[12px] bg-gradient-to-br from-[#E4D2FA] via-[#D8BDF6] to-[#C9A6F2] p-[3px] shadow-[0_20px_50px_rgba(40,20,70,0.35),0_4px_16px_rgba(107,79,160,0.25)]`}
        >
          {/* Outer Border: Solid Deep Purple #6B4FA0 */}
          <div
            className={`w-full h-full rounded-[10px] border-[1.5px] border-[#6B4FA0] p-[3px] flex ${
              layoutMode === 'horizontal' ? 'flex-col md:flex-row' : 'flex-col'
            } relative overflow-hidden bg-gradient-to-br from-[#E4D2FA] to-[#C9A6F2]`}
          >
            {/* Retro-Y2K 4px Checkerboard Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-pixel-checker-purple opacity-90 z-0" />

            {/* Inner Dashed Line Border simulating ticket perforation & cutline */}
            <div className="absolute inset-[4px] rounded-[7px] border border-dashed border-[#6B4FA0]/60 pointer-events-none z-10" />

            {/* Corner Holographic Star Sparkles (Top-Left, Top-Right) */}
            <div className="absolute top-2 left-2.5 z-20 pointer-events-none">
              <HoloSparkleStar size={layoutMode === 'horizontal' ? 18 : 16} />
            </div>
            <div className="absolute top-2 right-2.5 z-20 pointer-events-none">
              <HoloSparkleStar size={layoutMode === 'horizontal' ? 18 : 16} delayed={true} />
            </div>

            {/* Extra cute Y2K diamond accents along edge */}
            <div className="absolute bottom-2.5 right-3 z-20 pointer-events-none hidden sm:block">
              <HoloDiamond size={10} />
            </div>

            {/* ========================================================================= */}
            {/* =================== SECTION 1: "READING" (Main Body) ==================== */}
            {/* ========================================================================= */}
            <div
              className={`relative z-10 flex flex-col justify-between p-4 sm:p-5 ${
                layoutMode === 'horizontal' ? 'flex-1 md:pr-6' : 'w-full pb-4'
              }`}
            >
              {/* 1. Header Stamp: [ ITSC TAROT ] • [Kiểu trải: ...] */}
              <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#6B4FA0]/25">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-black tracking-widest text-[#422B6C] uppercase bg-[#FAF5FF]/80 px-2 py-0.5 rounded border border-[#6B4FA0]/30 shadow-2xs">
                    [ ITSC TAROT ]
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-montserrat font-bold text-[#553887] tracking-wider">
                    • [{spreadTypeLabel}]
                  </span>
                </div>
                <div className="text-[10px] font-mono font-semibold text-[#6B4FA0]/85 tracking-tighter">
                  NO. {readingCode.replace('#', '')}
                </div>
              </div>

              {/* 2. User Question (Fraunces / EB Garamond Serif Italic with handwriting quote marks) */}
              {question && (
                <div className="my-1.5 px-2">
                  <p className="font-fraunces text-sm sm:text-base italic font-medium text-[#2E1A4E] leading-snug line-clamp-2 text-center">
                    <span className="font-serif text-lg font-bold text-[#6B4FA0] select-none mr-1">“</span>
                    {question}
                    <span className="font-serif text-lg font-bold text-[#6B4FA0] select-none ml-1">”</span>
                  </p>
                </div>
              )}

              {/* 3. Drawn Tarot Cards Strip (1, 2, or 3 cards displayed horizontally) */}
              <div
                className={`grid gap-2.5 my-2.5 ${
                  cards.length === 1
                    ? 'grid-cols-1 max-w-[220px] mx-auto'
                    : cards.length === 2
                    ? 'grid-cols-2 max-w-[420px] mx-auto'
                    : 'grid-cols-3'
                }`}
              >
                {cards.map((card, idx) => {
                  const cardSuitColor = SUIT_COLORS[card.suit || 'Major'] || SUIT_COLORS.Major;
                  return (
                    <div
                      key={`${card.name}-${idx}`}
                      className="flex flex-col items-center bg-[#FAF5FF]/85 backdrop-blur-xs rounded-lg p-2 border border-[#6B4FA0]/30 shadow-2xs text-center relative overflow-hidden"
                    >
                      {/* Position Label for 3-card spread (Past / Present / Future) or 2-card contrast */}
                      {card.positionLabel && (
                        <div className="w-full text-[9px] font-montserrat font-bold uppercase tracking-wider text-[#6B4FA0] pb-1 mb-1 border-b border-[#6B4FA0]/15 truncate">
                          {card.positionLabel}
                        </div>
                      )}

                      {/* Card Visual / Thumbnail Representation */}
                      <div className="w-12 h-16 sm:w-14 sm:h-20 rounded border border-[#6B4FA0]/40 overflow-hidden relative my-1 bg-[#241B34] flex items-center justify-center shadow-xs">
                        {card.image ? (
                          <img
                            src={card.image}
                            alt={card.name}
                            className={`w-full h-full object-cover ${card.reversed ? 'rotate-180' : ''}`}
                            crossOrigin="anonymous"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-1 text-center">
                            <span className="text-base select-none">{cardSuitColor.symbol}</span>
                            <span className="text-[8px] font-mono text-[#D8B4FE] mt-0.5 leading-tight">
                              {card.suit || 'Tarot'}
                            </span>
                          </div>
                        )}

                        {/* Suit Elemental Color Pill at corner */}
                        <span
                          className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full border border-white shadow-2xs"
                          style={{ backgroundColor: cardSuitColor.bg }}
                          title={cardSuitColor.labelVi}
                        />
                      </div>

                      {/* Card Title & Orientation Badge */}
                      <div className="w-full mt-1">
                        <p className="text-[11px] font-montserrat font-bold text-[#2A1747] truncate leading-tight">
                          {isVi && card.nameVi ? card.nameVi : card.name}
                        </p>
                        <span
                          className={`inline-block mt-0.5 text-[9px] font-nunito font-extrabold px-1.5 py-0.2 rounded-full border ${
                            card.reversed
                              ? 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]'
                              : 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                          }`}
                        >
                          {card.reversed ? (isVi ? 'Ngược ⟲' : 'Reversed ⟲') : (isVi ? 'Xuôi ✦' : 'Upright ✦')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 4. AI Manifestation / Synthesis Box (Frosted Glass Container with high contrast) */}
              <div className="bg-white/80 backdrop-blur-xs rounded-xl p-2.5 sm:p-3 border border-white shadow-xs my-1 relative">
                <div className="flex items-center gap-1.5 text-[10px] font-montserrat font-bold uppercase tracking-wider text-[#5B3991] mb-1">
                  <Sparkles className="w-3 h-3 text-[#7E4EC8]" />
                  <span>{isVi ? 'Thông Điệp Khẳng Định • Manifest' : 'Mindful Manifestation'}</span>
                </div>
                <p className="font-nunito text-xs sm:text-[13px] text-[#2D1B4B] leading-relaxed font-medium line-clamp-3">
                  {manifestText}
                </p>
              </div>

              {/* 5. Mascot Quạ ITSC (Exact original artwork, 100% fidelity) & Footnotes */}
              <div className="flex items-end justify-between gap-2 mt-2 pt-2 border-t border-[#6B4FA0]/20 relative">
                {/* Mascot at Bottom-Left with drop shadow and speech bubble */}
                <div className="relative flex items-end gap-2 z-20">
                  {/* Mascot Image + Soft Lavender Shadow */}
                  <div className="relative flex flex-col items-center">
                    {/* Shadow underneath */}
                    <div className="absolute -bottom-1 w-14 h-3 bg-[#6B4FA0]/20 rounded-full blur-[2px] pointer-events-none" />
                    <img
                      src={ITSC_MASCOT_BASE64}
                      alt="ITSC Owl Mascot"
                      className="w-[58px] sm:w-[68px] h-auto object-contain select-none pointer-events-none relative z-10"
                      style={{
                        filter: 'drop-shadow(0 4px 10px rgba(95, 60, 145, 0.22))'
                      }}
                    />
                  </div>

                  {/* Cute Speech Bubble from Owl Mascot */}
                  {showSpeechBubble && (
                    <div className="relative mb-3 max-w-[210px] sm:max-w-[240px] bg-[#FAF5FF] border border-[#6B4FA0]/50 rounded-xl p-2 shadow-xs">
                      {/* Speech bubble pointer triangle */}
                      <div className="absolute bottom-2 -left-1.5 w-3 h-3 bg-[#FAF5FF] border-l border-b border-[#6B4FA0]/50 rotate-45" />
                      <p className="relative z-10 text-[10px] sm:text-[11px] font-nunito font-semibold italic text-[#3B2264] leading-snug">
                        "{speechBubbleSnippet}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Swatches & Date/Time on Bottom-Right */}
                <div className="flex flex-col items-end gap-1 text-right">
                  {/* 4 Suit Swatches */}
                  <div className="flex items-center gap-1" title="Nguyên tố bài trong lượt bói">
                    {['Wands', 'Cups', 'Swords', 'Pentacles'].map((suitKey) => {
                      const suit = SUIT_COLORS[suitKey];
                      const isPresent = suitsPresent.includes(suitKey as any);
                      return (
                        <span
                          key={suitKey}
                          className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center text-[8px] font-mono transition-all ${
                            isPresent
                              ? 'border-[#3B255D] shadow-2xs scale-105 opacity-100 font-bold text-white'
                              : 'border-black/20 opacity-35'
                          }`}
                          style={{ backgroundColor: suit.bg }}
                          title={`${suit.labelVi} ${isPresent ? '(Xuất hiện)' : ''}`}
                        >
                          {suit.symbol}
                        </span>
                      );
                    })}
                  </div>

                  {/* Formatted Date & Time */}
                  <span className="text-[10px] font-mono font-medium text-[#5B3991]/90">
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* =================== PERFORATION DIVIDER (Tear Line) ===================== */}
            {/* ========================================================================= */}
            <div
              className={`relative flex items-center justify-center select-none ${
                layoutMode === 'horizontal'
                  ? 'flex-col w-5 my-0 py-2'
                  : 'flex-row h-5 mx-0 px-2 my-1'
              }`}
            >
              {/* Notches at edges (Semicircle Cutouts creating realistic ticket stubs) */}
              {layoutMode === 'horizontal' ? (
                <>
                  <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#160E24] border border-[#6B4FA0] z-30" />
                  <div className="w-[1.5px] h-full border-r-2 border-dotted border-[#6B4FA0]/70" />
                  <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#160E24] border border-[#6B4FA0] z-30" />
                </>
              ) : (
                <>
                  <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-4 h-4 rounded-full bg-[#160E24] border border-[#6B4FA0] z-30" />
                  <div className="w-full h-[1.5px] border-b-2 border-dotted border-[#6B4FA0]/70" />
                  <div className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-4 h-4 rounded-full bg-[#160E24] border border-[#6B4FA0] z-30" />
                </>
              )}
            </div>

            {/* ========================================================================= */}
            {/* =================== SECTION 2: "STUB" (Cuống Vé & QR) ==================== */}
            {/* ========================================================================= */}
            <div
              className={`relative z-10 flex p-3.5 sm:p-4 rounded-lg bg-gradient-to-br from-[#4F3375] to-[#341F52] text-white shadow-inner ${
                layoutMode === 'horizontal'
                  ? 'flex-col justify-between w-full md:w-[240px]'
                  : 'flex-row items-center justify-between w-full'
              }`}
            >
              {/* Left/Top: Seeker Name, Reading Code & Barcode */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#D8B4FE] uppercase">
                    PASSENGER / SEEKER
                  </span>
                  <p className="font-montserrat font-bold text-xs sm:text-sm text-white truncate max-w-[130px] sm:max-w-[160px]">
                    {userName || 'Mystic Seeker'}
                  </p>
                  <div className="mt-1 font-mono text-[11px] font-bold tracking-tight text-[#E9D5FF]">
                    READING {readingCode}
                  </div>
                </div>

                {/* Vector Barcode (5SOS concert ticket inspired) */}
                <div className="my-2.5">
                  <div className="flex items-end gap-[1.8px] h-6 opacity-85 select-none">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2].map((w, i) => (
                      <div
                        key={i}
                        className="bg-[#E4D2FA] rounded-xs"
                        style={{
                          width: `${w * 1.4}px`,
                          height: i % 4 === 0 ? '100%' : i % 2 === 0 ? '80%' : '65%'
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono tracking-widest text-[#C4B5FD]/70">
                    ADMIT ONE • 5SOS VIBE
                  </span>
                </div>
              </div>

              {/* Right/Bottom: QR Code with link & caption */}
              <div className="flex flex-col items-center text-center">
                {/* QR Container */}
                <div className="p-1.5 rounded-md bg-white border border-[#A78BFA]/50 shadow-sm flex items-center justify-center">
                  {qrUrl ? (
                    <QRCodeSVG
                      value={qrUrl}
                      size={layoutMode === 'horizontal' ? 84 : 76}
                      level="M"
                      fgColor="#241B34"
                      bgColor="#FFFFFF"
                    />
                  ) : (
                    <div
                      style={{
                        width: layoutMode === 'horizontal' ? 84 : 76,
                        height: layoutMode === 'horizontal' ? 84 : 76,
                      }}
                      className="flex items-center justify-center bg-[#F4ECFC] rounded"
                    >
                      <RefreshCw className="w-5 h-5 text-[#8A68C8] animate-spin" />
                    </div>
                  )}
                </div>
                <p className="text-[8px] font-nunito font-semibold text-[#D8B4FE] mt-1.5 max-w-[90px] leading-tight">
                  {isVi ? 'Quét để xem lại quẻ bài của bạn' : 'Scan to view your reading'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Status Notification Toast */}
        {statusNote && (
          <div className="mt-3 px-4 py-1.5 rounded-full bg-[#2A1847] text-[#E4D2FA] text-xs font-montserrat font-semibold border border-[#6B4FA0] shadow-md animate-fade-in flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A6F2]" />
            <span>{statusNote}</span>
          </div>
        )}

        {/* Action Buttons Toolbar below card */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 w-full">
          {/* Main Button: Export PNG with Confetti */}
          <button
            onClick={handleExportPng}
            disabled={isExporting}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6B4FA0] via-[#855EC8] to-[#9D6ED8] hover:from-[#5C3F90] hover:to-[#8E5EC4] active:scale-98 text-white font-montserrat font-bold text-xs sm:text-sm shadow-md hover:shadow-lg border border-[#BFA2E8]/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>{isVi ? 'Đang xuất vé...' : 'Exporting...'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-white" />
                <span>{isVi ? 'Xuất Thẻ Chia Sẻ (PNG)' : 'Export Share Ticket (PNG)'}</span>
              </>
            )}
          </button>

          {/* Secondary Button: Copy Link */}
          <button
            onClick={handleCopyLink}
            className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-98 text-white font-montserrat font-semibold text-xs sm:text-sm border border-white/30 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-[#86EFAC]" />
                <span className="text-[#86EFAC]">{isVi ? 'Đã sao chép!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-white" />
                <span>{isVi ? 'Sao chép link xem lại' : 'Copy Revisit Link'}</span>
              </>
            )}
          </button>

          {/* Test Link Button */}
          {qrUrl && (
            <a
              href={qrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D8B4FE] hover:text-white font-montserrat font-medium text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isVi ? 'Mở quẻ bài' : 'Open Link'}</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
};

export default TarotShareCard;
