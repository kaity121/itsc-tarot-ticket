import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Language, DrawnTarotCard } from '../types';
import { OwlSilhouetteMascot, WashiTape } from './OwlMotifs';
import { Share2, MessageSquarePlus, Sparkles, Ticket } from 'lucide-react';
import { sound } from '../utils/audio';
import { TarotShareCard, TarotCardShareItem } from './TarotShareCard';
import { generateReadingId, persistReading } from '../utils/readingStorage';
import { translations } from '../utils/i18n';

export interface ReadingCard {
  name: string;
  position: string;
  reflection: string;
}

export interface ReadingData {
  theme?: string;
  cards?: ReadingCard[];
  synthesis?: string;
  interpretation?: string;
  cardBreakdown?: Record<string, string>;
  takeaway?: string;
  source?: string;
}

export interface ReadingResultViewProps {
  reading: ReadingData;
  title?: string;
  question?: string;
  language?: Language;
  drawnCards?: DrawnTarotCard[];
  readingId?: string;
  getPositionLabel?: (index: number) => string;
  onShare?: (text: string) => void;
  onReset?: () => void;
}

const CARD_BLOCK_STYLES = [
  {
    bg: 'bg-[#F7F4FC]',
    border: 'border-[#EDE4F7]',
    star: 'text-[#8A73B5]',
  },
  {
    bg: 'bg-[#F1F6FD]',
    border: 'border-[#DCE8F8]',
    star: 'text-[#2B5684]',
  },
  {
    bg: 'bg-[#FAF5F7]',
    border: 'border-[#F2DEE5]',
    star: 'text-[#A04A70]',
  },
];

export const ReadingResultView: React.FC<ReadingResultViewProps> = ({
  reading,
  title,
  question,
  language = 'vi',
  drawnCards,
  readingId,
  getPositionLabel,
  onShare,
  onReset
}) => {
  const isVi = language === 'vi';
  const t = translations[language] || translations.vi;
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Generate consistent persistent reading code if not passed
  const activeReadingId = useMemo(() => {
    if (readingId) return readingId;
    return generateReadingId();
  }, [readingId]);

  // Extract cards to render with backward compatibility for both schema styles
  const cardsToRender = useMemo<ReadingCard[]>(() => {
    if (reading.cards && reading.cards.length > 0) {
      return reading.cards.map((rc, idx) => {
        const dc = drawnCards?.[idx];
        const displayName = isVi && dc?.nameVi ? dc.nameVi : rc.name;
        const displayPosition =
          rc.position || (getPositionLabel ? getPositionLabel(idx) : (isVi ? `Vị trí ${idx + 1}` : `Position ${idx + 1}`));
        return {
          name: displayName,
          position: displayPosition,
          reflection: rc.reflection
        };
      });
    }

    if (drawnCards && drawnCards.length > 0) {
      return drawnCards.map((c, i) => {
        const position = getPositionLabel ? getPositionLabel(i) : (isVi ? `Vị trí ${i + 1}` : `Position ${i + 1}`);
        const name = isVi && c.nameVi ? c.nameVi : c.name;
        const reflection =
          reading.cardBreakdown?.[c.name] ||
          (c.nameVi && reading.cardBreakdown?.[c.nameVi]) ||
          (isVi ? c.summaryVi : c.summary) ||
          '';
        return { name, position, reflection };
      });
    }

    return [];
  }, [reading, drawnCards, isVi, getPositionLabel]);

  const synthesisText = reading.synthesis || reading.interpretation || '';
  const takeawayText = reading.takeaway || '';

  // Prepare cards array for TarotShareCard
  const shareCards: TarotCardShareItem[] = useMemo(() => {
    if (drawnCards && drawnCards.length > 0) {
      return drawnCards.map((dc, i) => ({
        name: dc.name,
        nameVi: dc.nameVi,
        reversed: dc.orientation === 'reversed',
        positionLabel: cardsToRender[i]?.position || (getPositionLabel ? getPositionLabel(i) : undefined),
        suit: dc.suit,
        image: dc.image
      }));
    }
    return cardsToRender.map((rc) => ({
      name: rc.name,
      reversed: rc.name.toLowerCase().includes('ngược') || rc.name.toLowerCase().includes('reversed'),
      positionLabel: rc.position
    }));
  }, [drawnCards, cardsToRender, getPositionLabel]);

  const [savedUrl, setSavedUrl] = useState<string>('');
  const [, setIsPersisting] = useState(false);

  const manifestText = takeawayText || synthesisText || reading.theme || '';
  const defaultQuestion = question || (isVi ? 'Thông điệp chiêm nghiệm cùng Bé Cú' : 'Mindful guidance with Owl Mascot');
  const spreadTypeStr = shareCards.length === 1 ? '1' : shareCards.length === 3 ? '3' : `${shareCards.length} lá`;

  // Auto-persist reading so QR and deep link are ready immediately
  useEffect(() => {
    let isMounted = true;
    setIsPersisting(true);

    persistReading({
      readingId: activeReadingId,
      question: defaultQuestion,
      spreadType: spreadTypeStr,
      cards: shareCards,
      manifestText,
      userName: isVi ? 'Người Bói Ẩn Danh' : 'Mystic Seeker',
      language: language === 'en' ? 'en' : 'vi',
    })
      .then((res) => {
        if (isMounted) {
          setSavedUrl(res.url);
          setIsPersisting(false);
        }
      })
      .catch((err) => {
        console.error('[ReadingResultView] Failed to persist reading:', err);
        if (isMounted) {
          setIsPersisting(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [activeReadingId, defaultQuestion, spreadTypeStr, shareCards, manifestText, isVi, language]);

  const publicQrUrl = useMemo(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return `${window.location.origin}/ticket/${activeReadingId}`;
    }
    if (savedUrl) return savedUrl;
    return `/ticket/${activeReadingId}`;
  }, [activeReadingId, savedUrl]);

  const defaultHeaderTitle = isVi
    ? (cardsToRender.length === 2 ? 'Phân Tích Tương Phản Hàng Ngày' : 'Luận Giải Tâm Lý Từ Bé Cú')
    : (cardsToRender.length === 2 ? 'Daily Contrast Analysis' : 'Owl Mascot Psychological Reading');

  return (
    <motion.div
      id="reading-result-view"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative w-full max-w-[1300px] my-6"
    >
      {/* Decorative Washi Tape Accent on Top */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <WashiTape color="lavender" width={52} height={8} tilt={0.8} />
      </div>

      {/* Main Card Container: Large rounded corners, lavender border, soft shadow, clean white bg */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-white border border-[#E7DEEE] shadow-[0_12px_36px_rgba(45,30,70,0.08)] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
        {/* Header with Mascot Avatar, Title Hierarchy & Source Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-[#F0E6FA] relative z-10 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EDE5F7] border border-[#DCCEEF] flex items-center justify-center shrink-0 shadow-xs">
              <OwlSilhouetteMascot size={22} expression="happy" showStickerShadow={false} />
            </div>
            <div>
              <h4 className="font-fraunces text-xl sm:text-2xl font-bold text-[#1E152E]">
                {title || defaultHeaderTitle}
              </h4>
              {question && (
                <p className="text-xs sm:text-[13px] text-[#6E5D87] font-montserrat italic mt-0.5 max-w-xl line-clamp-2">
                  "{question}"
                </p>
              )}
            </div>
          </div>
          <span className="text-xs px-3.5 py-1.5 rounded-full bg-[#EBF3FC] text-[#1E3A5F] font-montserrat font-bold border border-[#D0E1F5] shadow-xs flex items-center gap-1.5 self-start sm:self-auto shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#2B5684]" />
            <span>Gemini AI ✦</span>
          </span>
        </div>

        {/* Theme Banner (if present in reading data) */}
        {reading.theme && (
          <div className="mb-6 px-4 py-3 rounded-2xl bg-[#FAF7FD] border border-[#EDE4F7] flex items-start gap-2.5 text-xs sm:text-sm text-[#4A3D62] font-nunito shadow-xs relative z-10">
            <span className="font-montserrat font-bold text-[#8A73B5] uppercase tracking-wider text-[11px] shrink-0 mt-0.5">
              ✦ {isVi ? 'Chủ đề' : 'Theme'}:
            </span>
            <span className="leading-relaxed font-medium">{reading.theme}</span>
          </div>
        )}

        {/* Card Breakdown Blocks (3 cards for Classic, 2 for Daily) */}
        {cardsToRender.length > 0 && (
          <div
            className={`grid grid-cols-1 ${
              cardsToRender.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
            } gap-4 mb-6 relative z-10`}
          >
            {cardsToRender.map((card, idx) => {
              const blockStyle = CARD_BLOCK_STYLES[idx % CARD_BLOCK_STYLES.length];
              return (
                <div
                  key={`${card.name}-${idx}`}
                  className={`p-5 sm:p-6 rounded-2xl border ${blockStyle.bg} ${blockStyle.border} shadow-xs flex flex-col justify-start`}
                >
                  <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                    <span className={`${blockStyle.star} text-xs select-none`}>✦</span>
                    <h5 className="font-fraunces font-bold text-sm sm:text-base text-[#1E152E]">
                      {card.position}
                    </h5>
                    {card.name && (
                      <span className="font-montserrat font-semibold text-xs text-[#6E5D87] ml-1">
                        ({card.name})
                      </span>
                    )}
                  </div>
                  <p className="font-nunito text-xs sm:text-[13.5px] text-[#4A3D62] leading-relaxed font-normal">
                    {card.reflection}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Interpretation / Synthesis Section */}
        {synthesisText && (
          <div className="rounded-2xl bg-[#FCFAFE] border border-[#E7DEEE] p-5 sm:p-7 mb-6 shadow-xs relative z-10">
            <p className="font-cormorant text-base sm:text-lg italic text-[#2E1A4E] leading-relaxed">
              "{synthesisText}"
            </p>
          </div>
        )}

        {/* Actionable Takeaway Section with blue-navy accent */}
        {takeawayText && (
          <div className="space-y-2 mb-6 relative z-10">
            <div className="font-fraunces font-bold text-sm sm:text-base text-[#1E152E] flex items-center gap-2">
              <span className="text-[#1E3A5F]">✦</span>
              <span>{isVi ? 'Hành Động Tĩnh Tâm' : (t.actionableTakeaway || 'Actionable Takeaway')}</span>
            </div>
            <div className="rounded-xl bg-[#F1F6FD] border-l-4 border-[#1E3A5F] p-4 sm:p-5 shadow-xs">
              <p className="font-nunito text-xs sm:text-[13.5px] leading-relaxed text-[#203653] font-medium">
                "{takeawayText}"
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions inside Reading Card */}
        <div className="pt-5 mt-6 border-t border-[#F0E6FA] flex items-center justify-between gap-3 flex-wrap relative z-10">
          {onReset && (
            <button
              id="btn-reading-ask-another"
              onClick={() => {
                sound.playCardFlip();
                onReset();
              }}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF7FD] text-xs font-bold font-montserrat text-[#574673] border border-[#E3D9F0] shadow-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>{isVi ? 'Đặt câu hỏi khác' : 'Ask another question'}</span>
            </button>
          )}

          <div className="flex items-center gap-2.5 ml-auto flex-wrap">
            {/* Primary Action: Open Ticket Stub Share Card */}
            <button
              id="btn-reading-ticket"
              onClick={() => {
                sound.playChime();
                setIsTicketModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6B4FA0] via-[#855EC8] to-[#9D6ED8] hover:from-[#5C3F90] hover:to-[#8E5EC4] text-white text-xs font-bold font-montserrat border border-[#BFA2E8]/50 shadow-sm flex items-center gap-2 transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5 text-[#E4D2FA]" />
              <span>{isVi ? 'Vé Lưu Niệm (Reading Ticket) ✦' : 'Reading Ticket Stub ✦'}</span>
            </button>

            {onShare && (
              <button
                id="btn-reading-share"
                onClick={() => {
                  sound.playChime();
                  onShare(
                    [
                      reading.theme ? `${isVi ? '✦ Chủ đề' : '✦ Theme'}: ${reading.theme}` : '',
                      ...cardsToRender.map(
                        (card) => `${card.position}: ${card.name}\n${card.reflection}`
                      ),
                      synthesisText ? `${isVi ? '✦ Tổng quan' : '✦ Synthesis'}: ${synthesisText}` : '',
                      takeawayText ? `${isVi ? '✦ Hành động tĩnh tâm' : '✦ Takeaway'}: ${takeawayText}` : ''
                    ]
                      .filter(Boolean)
                      .join('\n\n')
                  );
                }}
                className="px-4 py-2.5 rounded-full bg-[#241B34] hover:bg-[#150E22] text-white text-xs font-bold font-montserrat border border-[#3E2F59] shadow-sm flex items-center gap-2 transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-white" />
                <span>{isVi ? 'Sao chép chữ' : 'Copy Text'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TarotShareCard Modal Popup */}
      {isTicketModalOpen && (
        <TarotShareCard
          readingId={activeReadingId}
          question={defaultQuestion}
          spreadType={spreadTypeStr}
          cards={shareCards}
          manifestText={manifestText}
          qrUrl={publicQrUrl}
          userName={isVi ? 'Người Bói Ẩn Danh' : 'Mystic Seeker'}
          language={language}
          onClose={() => setIsTicketModalOpen(false)}
        />
      )}
    </motion.div>
  );
};
