import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import {
  NotebookStickerAvatar,
  RhinestoneGem,
  ScallopStampEdge,
  WashiTape,
  CuteStickerSparkle
} from './OwlMotifs';
import { Share2, RefreshCw, MessageSquarePlus, Sparkles, Ticket } from 'lucide-react';
import { sound } from '../utils/audio';
import { DrawnTarotCard } from '../types';
import { TarotShareCard, TarotCardShareItem } from './TarotShareCard';
import { generateReadingId, persistReading } from '../utils/readingStorage';

interface ReadingCard {
  name: string;
  position: string;
  reflection: string;
}

interface Reading {
  theme: string;
  cards: ReadingCard[];
  synthesis: string;
  takeaway: string;
}

interface ReadingResultViewProps {
  reading: Reading;
  question?: string;
  language?: Language;
  drawnCards?: DrawnTarotCard[];
  readingId?: string;
  onShare?: (text: string) => void;
  onReset?: () => void;
}

export const ReadingResultView: React.FC<ReadingResultViewProps> = ({
  reading,
  question,
  language = 'vi',
  drawnCards,
  readingId,
  onShare,
  onReset
}) => {
  const isVi = language === 'vi';
  const [isTicketModalOpen, setIsTicketModalOpen] = React.useState(false);

  // Generate consistent persistent reading code if not passed
  const activeReadingId = React.useMemo(() => {
    if (readingId) return readingId;
    return generateReadingId();
  }, [readingId]);

  // Prepare cards array for TarotShareCard
  const shareCards: TarotCardShareItem[] = React.useMemo(() => {
    if (drawnCards && drawnCards.length > 0) {
      return drawnCards.map((dc, i) => ({
        name: dc.name,
        nameVi: dc.nameVi,
        reversed: dc.orientation === 'reversed',
        positionLabel: reading.cards[i]?.position,
        suit: dc.suit,
        image: dc.image
      }));
    }
    return reading.cards.map((rc) => ({
      name: rc.name,
      reversed: rc.name.toLowerCase().includes('ngược') || rc.name.toLowerCase().includes('reversed'),
      positionLabel: rc.position
    }));
  }, [drawnCards, reading.cards]);

  const [savedUrl, setSavedUrl] = React.useState<string>('');
  const [isPersisting, setIsPersisting] = React.useState(false);

  const manifestText = reading.takeaway || reading.synthesis || reading.theme || '';
  const defaultQuestion = question || (isVi ? 'Thông điệp chiêm nghiệm cùng Bé Cú' : 'Mindful guidance with Owl Mascot');
  const spreadTypeStr = shareCards.length === 1 ? '1' : shareCards.length === 3 ? '3' : `${shareCards.length} lá`;

  // Auto-persist reading so QR and deep link are ready immediately
  React.useEffect(() => {
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

  const publicQrUrl = React.useMemo(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return `${window.location.origin}/ticket/${activeReadingId}`;
    }
    if (savedUrl) return savedUrl;
    return `/ticket/${activeReadingId}`;
  }, [activeReadingId, savedUrl]);

  // Helper to parse simple markdown formatting into React elements
  const formatTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-montserrat font-bold text-[#1E152E]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="font-montserrat italic font-medium text-[#4A3D62]">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  // Parse lines into logical visual blocks
  

  return (
    <motion.div
      id="reading-result-view"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative w-full max-w-[1300px] my-6"
    >
      {/* Decorative Washi Tape Accent */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <WashiTape color="peach" width={52} height={8} tilt={0.8} />
      </div>

      <div className="rounded-[28px] cozy-caro-bg border border-[#E8DEF2] shadow-[0_16px_40px_-4px_rgba(85,40,125,0.12),0_4px_12px_rgba(135,80,180,0.06)] p-6 sm:p-10 lg:p-14 relative overflow-hidden">
        {/* Scalloped Stamp Edge */}
        <ScallopStampEdge position="top" fillColor="#FAF8FD" strokeColor="#E2D7EE" />
        <ScallopStampEdge position="bottom" fillColor="#FAF8FD" strokeColor="#E2D7EE" />

        {/* Rhinestone Gem Accents */}
        <div className="absolute top-3 left-4 pointer-events-none z-10 hidden sm:block">
          <RhinestoneGem type="diamond" color="purple" size={14} twinkle={true} />
        </div>
        <div className="absolute top-3 right-4 pointer-events-none z-10 hidden sm:block">
          <RhinestoneGem type="star" color="yellow" size={14} twinkle={true} delay={1} />
        </div>
        <div className="absolute bottom-3 left-4 pointer-events-none opacity-80 z-10 hidden sm:block">
          <RhinestoneGem type="heart" color="pink" size={12} />
        </div>
        <div className="absolute bottom-3 right-4 pointer-events-none opacity-80 z-10 hidden sm:block">
          <RhinestoneGem type="pearl" color="blue" size={12} />
        </div>

        {/* Header with Mascot Avatar & Source Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-5 border-b border-[#EFE8F7] relative z-10 gap-3">
          <div className="flex items-center gap-3">
            <NotebookStickerAvatar size={42} expression="happy" tilt={-2} tapeColor="peach" />
            <div>
              <h4 className="font-montserrat text-lg sm:text-xl font-bold text-[#1E152E]">
                {isVi ? 'Luận Giải Tâm Lý Từ Bé Cú' : 'Owl Mascot Psychological Reading'}
              </h4>
              {question && (
                <p className="text-xs text-[#6E5D87] font-nunito mt-0.5 max-w-md line-clamp-1 italic">
                  "{question}"
                </p>
              )}
            </div>
          </div>
          <span className="text-[11px] px-3.5 py-1 rounded-full bg-[#FAF4ED] text-[#1E3A5F] font-montserrat font-bold border border-[#E7DEEE] shadow-xs flex items-center gap-1.5 self-start sm:self-auto">
            <Sparkles className="w-3 h-3 text-[#8A73B5]" />
            <span>AI Reading ✦</span>
          </span>
        </div>

        {/* Rendered Reading Body */}
        <div className="relative z-10 space-y-1">
          <div className="space-y-8">
  {/* Theme */}
  <section>
    <h3 className="text-xl font-semibold mb-3">
      {isVi ? "Chủ đề" : "Theme"}
    </h3>
    <p>{reading.theme}</p>
  </section>

  {/* Cards */}
  <section className="space-y-6">
    {reading.cards.map((card, index) => (
      <div key={`${card.name}-${index}`}>
        <h3 className="text-lg font-semibold">
          {card.position}
        </h3>
        <p className="font-medium mt-1">{card.name}</p>
        <p className="mt-2">{card.reflection}</p>
      </div>
    ))}
  </section>

  {/* Synthesis */}
  <section>
    <h3 className="text-xl font-semibold mb-3">
      {isVi ? "Tổng hợp" : "Synthesis"}
    </h3>
    <p>{reading.synthesis}</p>
  </section>

  {/* Takeaway */}
  <section>
    <h3 className="text-xl font-semibold mb-3">
      {isVi ? "Điều cần ghi nhớ" : "Takeaway"}
    </h3>
    <p>{reading.takeaway}</p>
  </section>
</div>
        </div>

        {/* Footer Actions inside Reading Card */}
        <div className="mt-8 pt-5 border-t border-[#EFE8F7] flex flex-wrap items-center justify-between gap-3 relative z-10">
          {onReset && (
            <button
              id="btn-reading-ask-another"
              onClick={() => {
                sound.playCardFlip();
                onReset();
              }}
              className="px-4 py-2 rounded-full bg-white hover:bg-[#FAF7FD] text-xs font-bold font-montserrat text-[#574673] border border-[#E3D9F0] shadow-xs flex items-center gap-2 cursor-pointer transition-all"
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
                      reading.theme,
                      ...reading.cards.map(
                        (card) => `${card.position}: ${card.name}\n${card.reflection}`
                      ),
                      reading.synthesis,
                      reading.takeaway,
                    ].join("\n\n")
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
