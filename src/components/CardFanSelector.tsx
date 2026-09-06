import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TarotCardData, Language, DrawnTarotCard } from '../types';
import { FULL_TAROT_DECK } from '../data/tarotDeck';
import { sound } from '../utils/audio';
import {
  OwlSilhouetteMascot,
  CuteStickerSparkle,
  CuteStickerHeart,
  CuteStickerBow,
  RhinestoneGem,
  ScallopStampEdge,
  NotebookStickerAvatar,
  WashiTape,
  HandDrawnClover,
  DoodleStar,
  DoodleDots,
  HandDrawnHeart
} from './OwlMotifs';
import { RefreshCw, Check, ArrowRight, X, Wand2 } from 'lucide-react';
import { translations } from '../utils/i18n';
import { norm } from '../utils/text';

interface CardFanSelectorProps {
  title?: string;
  subtitle?: string;
  inquiry: string;
  requiredCount: number;
  positionLabels: string[];
  onConfirmCards: (selectedCards: DrawnTarotCard[]) => void;
  onCancel?: () => void;
  language?: Language;
}

interface FannedCard extends TarotCardData {
  uniqueFanId: string;
}

// 22 distinct cards drawn from 78-card deck gives a spacious, panoramic spread
// where cards are spaced far apart without heavy overlapping clutter
const FAN_DECK_SIZE = 22;

const generateFannedDeck = (): FannedCard[] => {
  const shuffled = [...FULL_TAROT_DECK].sort(() => 0.5 - Math.random());
  const chosen = shuffled.slice(0, FAN_DECK_SIZE);
  return chosen.map(card => ({
    ...card,
    uniqueFanId: `fan-${card.id}-${Math.random().toString(36).slice(2, 7)}`
  }));
};

export const CardFanSelector: React.FC<CardFanSelectorProps> = ({
  title,
  subtitle,
  inquiry,
  requiredCount = 2,
  positionLabels,
  onConfirmCards,
  onCancel,
  language = 'vi'
}) => {
  const t = translations[language];

  // Wide fanned deck with strictly unique card IDs
  const [deck, setDeck] = useState<FannedCard[]>(() => generateFannedDeck());
  const [selectedCards, setSelectedCards] = useState<FannedCard[]>([]);
  const [hoveredFanId, setHoveredFanId] = useState<string | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  // Strict debounce ref to guarantee 1 click NEVER selects 2 cards
  const lastClickTimeRef = useRef<number>(0);
  const isClickLockedRef = useRef<boolean>(false);

  const defaultTitle = t.chooseCards;
  const displayTitle = title || defaultTitle;

  const countWord = language === 'vi'
    ? `${requiredCount}`
    : requiredCount === 3 ? 'THREE' : requiredCount === 2 ? 'TWO' : `${requiredCount}`;
  const defaultSubtitle = language === 'vi'
    ? `RÚT ${countWord} LÁ ĐỂ MỞ QUẺ DƯỚI ÁNH TRĂNG`
    : `DRAW ${countWord} TO OPEN THE READING`;
  const displaySubtitle = subtitle || defaultSubtitle;

  // Handle card selection: strictly atomic functional update with debounce
  const handleCardClick = (card: FannedCard, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isShuffling) return;

    // Throttle clicks within 320ms to prevent ghost double-clicks or touch-tap bounce
    const now = Date.now();
    if (now - lastClickTimeRef.current < 320 || isClickLockedRef.current) {
      return;
    }
    lastClickTimeRef.current = now;
    isClickLockedRef.current = true;
    setTimeout(() => {
      isClickLockedRef.current = false;
    }, 320);

    setSelectedCards(prev => {
      const existingIndex = prev.findIndex(c => c.uniqueFanId === card.uniqueFanId);

      if (existingIndex !== -1) {
        // Deselect clicked card
        sound.playCardFlip();
        return prev.filter(c => c.uniqueFanId !== card.uniqueFanId);
      }

      // Card is not yet selected
      if (prev.length < requiredCount) {
        sound.playCardPick();
        return [...prev, card];
      }

      // If already full, replace the last card
      sound.playCardFlip();
      return [...prev.slice(0, requiredCount - 1), card];
    });
  };

  // Perform authentic quiet owl shuffle
  const handleShuffle = () => {
    if (isShuffling) return;

    setIsShuffling(true);
    sound.playCardShuffle();
    setSelectedCards([]);

    setTimeout(() => {
      setDeck(generateFannedDeck());
    }, 450);

    setTimeout(() => {
      setIsShuffling(false);
    }, 1000);
  };

  // Quick auto-pick with staggered timing
  const handleAutoPick = () => {
    if (isShuffling) return;
    sound.playCardShuffle();

    setSelectedCards(prev => {
      const needed = requiredCount - prev.length;
      if (needed <= 0) return prev;

      const available = deck.filter(c => !prev.some(sc => sc.uniqueFanId === c.uniqueFanId));
      const picks = available.slice(0, needed);
      sound.playCardPick();
      return [...prev, ...picks];
    });
  };

  const remainingNeeded = Math.max(0, requiredCount - selectedCards.length);

  return (
    <div id="card-fan-selector" className="relative w-full max-w-[1300px] mx-auto py-0.5 sm:py-1 px-1 sm:px-3 flex flex-col items-center select-none">
      {/* Top washi tape accent - Unclipped, Petite & Authentic */}
      <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <WashiTape color="peach" width={48} height={8} tilt={-0.6} />
      </div>

      {/* Cute Sticker Board Container - reduced padding & decorated with rhinestone gems and scalloped edges */}
      <div className="relative w-full rounded-[28px] bg-[#FFFFFF] border border-[#E8DEF2] shadow-[0_16px_40px_-4px_rgba(85,40,125,0.12),0_4px_12px_rgba(135,80,180,0.06)] p-4 sm:p-6 md:p-7 flex flex-col items-center overflow-hidden">

        {/* Scalloped Stamp Edge for Deck Fan Board */}
        <ScallopStampEdge position="top" fillColor="#FFFFFF" strokeColor="#E2D7EE" />
        <ScallopStampEdge position="bottom" fillColor="#FFFFFF" strokeColor="#E2D7EE" />

        {/* Top-Left Gem, Clover & Mascot Badge */}
        <div className="absolute top-2.5 left-3.5 z-20 flex items-center gap-1.5">
          <HandDrawnClover size={22} />
          <RhinestoneGem type="diamond" color="purple" size={16} twinkle={true} />
          <RhinestoneGem type="pearl" color="pink" size={12} />
          <span className="text-[12px] font-montserrat font-bold text-[#372A4E] hidden sm:inline ml-1">
            ✦ ITSC Tarot Deck
          </span>
        </div>

        {/* Top-Right Gem, Doodle Star & Close Button */}
        <div className="absolute top-2.5 right-3.5 flex items-center gap-1.5 z-20">
          <DoodleStar size={22} />
          <RhinestoneGem type="star" color="yellow" size={15} twinkle={true} delay={1} />
          <RhinestoneGem type="heart" color="pink" size={13} />
          {onCancel && (
            <button
              id="btn-close-fan"
              onClick={onCancel}
              className="p-1 rounded-full text-[#5E5373] hover:text-[#1E152E] bg-[#FAF7FD] hover:bg-[#F2EAFA] border border-[#E3D9F0] transition-colors cursor-pointer ml-1"
              title={language === 'vi' ? 'Quay lại' : 'Return'}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Left & Right Flank Scattered Gems & Hand-Drawn Doodles in empty spaces */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 hidden md:flex flex-col gap-3 pointer-events-none z-10 items-center">
          <DoodleDots size={18} />
          <RhinestoneGem type="star" color="blue" size={15} twinkle={true} />
          <RhinestoneGem type="diamond" color="pink" size={12} />
          <HandDrawnHeart size={16} />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-3 hidden md:flex flex-col gap-3 pointer-events-none z-10 items-center">
          <HandDrawnClover size={18} />
          <RhinestoneGem type="pearl" color="purple" size={14} />
          <RhinestoneGem type="heart" color="yellow" size={13} twinkle={true} delay={1.5} />
          <DoodleDots size={18} />
        </div>

        {/* Bottom Corner Accent Gems & Doodles */}
        <div className="absolute bottom-2.5 left-4 pointer-events-none hidden sm:flex items-center gap-2 z-10 opacity-80">
          <HandDrawnHeart size={16} />
          <RhinestoneGem type="diamond" color="yellow" size={13} />
          <RhinestoneGem type="pearl" color="blue" size={11} />
        </div>
        <div className="absolute bottom-2.5 right-4 pointer-events-none hidden sm:flex items-center gap-2 z-10 opacity-80">
          <DoodleStar size={18} />
          <RhinestoneGem type="star" color="purple" size={14} twinkle={true} />
          <RhinestoneGem type="diamond" color="pink" size={12} />
        </div>

        {/* Header - Tightened Spacing with Zero Excess Margins */}
        <div className="text-center max-w-xl z-10 mb-2 mt-0.5">
          <div className="flex items-center justify-center gap-2">
            <RhinestoneGem type="diamond" color="blue" size={14} />
            <h2 className="font-montserrat text-lg sm:text-xl md:text-2xl font-bold text-[#1E152E] tracking-tight">
              {norm(displayTitle)}
            </h2>
            <RhinestoneGem type="star" color="purple" size={14} twinkle={true} />
          </div>

          <div className="flex items-center justify-center gap-2 mt-0.5 text-[#5E5373] text-xs sm:text-[12px] font-nunito font-semibold">
            <span>✦</span>
            <span>{norm(displaySubtitle)}</span>
            <span>✦</span>
          </div>

          {inquiry && (
            <p className="font-montserrat italic font-medium text-xs sm:text-[13px] text-[#241B34] mt-0.5 max-w-md mx-auto line-clamp-2">
              "{norm(inquiry)}"
            </p>
          )}
        </div>

        {/* Selected Cards Slots Rack - Generous Width and Multi-line to Prevent Text Clipping */}
        <div id="fan-selected-slots" className="z-10 mb-2 sm:mb-3 flex items-center justify-center gap-3.5 sm:gap-5 flex-wrap w-full max-w-3xl px-2">
          {Array.from({ length: requiredCount }).map((_, slotIdx) => {
            const chosen = selectedCards[slotIdx];
            const label = positionLabels[slotIdx] || (language === 'vi' ? `Lá ${slotIdx + 1}` : `Card ${slotIdx + 1}`);
            const cardDisplayName = chosen
              ? (language === 'vi' && chosen.nameVi ? chosen.nameVi : chosen.name)
              : '';

            return (
              <div
                key={slotIdx}
                className={`relative ${requiredCount <= 2 ? 'w-44 xs:w-48 sm:w-56' : 'w-36 xs:w-40 sm:w-48 md:w-52'
                  } min-h-[124px] sm:min-h-[136px] rounded-2xl border transition-all duration-300 flex flex-col items-center justify-between p-2.5 sm:p-3 shadow-xs ${chosen
                    ? 'border-[#241B34] bg-[#FAF7FD]'
                    : 'border-[#DACBEF] bg-[#FAF7FD] border-dashed'
                  }`}
              >
                <span className="font-montserrat text-[11px] xs:text-[12px] sm:text-[12.5px] font-bold text-[#241B34] text-center leading-snug w-full px-1 break-words">
                  {norm(label)}
                </span>

                {chosen ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center my-auto text-center px-1"
                  >
                    <div className="mb-1">
                      <OwlSilhouetteMascot size={22} expression="happy" showStickerShadow={false} />
                    </div>
                    <span className="text-[11px] sm:text-xs font-montserrat font-bold text-[#1E152E] leading-tight line-clamp-2">
                      {norm(cardDisplayName)}
                    </span>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center my-auto text-[#8A7A9F]">
                    <span className="text-xs font-montserrat font-bold">{slotIdx + 1}</span>
                    <span className="font-nunito text-[11px] text-[#A697BE] mt-0.5 font-medium">
                      {language === 'vi' ? 'Trống' : 'Empty'}
                    </span>
                  </div>
                )}

                {chosen && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(chosen);
                    }}
                    className="font-nunito font-bold text-[10px] text-[#5E5373] hover:text-[#1E152E] transition-colors cursor-pointer py-0.5"
                  >
                    {language === 'vi' ? 'Bỏ chọn' : 'Remove'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Shuffling Loading State with Owl Mascot */}
        <AnimatePresence>
          {isShuffling && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 bg-[#1E152E]/80 backdrop-blur-xs flex flex-col items-center justify-center pointer-events-auto rounded-[24px]"
            >
              <div className="p-6 bg-white rounded-2xl border border-[#E7DEEE] shadow-xl flex flex-col items-center">
                <OwlSilhouetteMascot size={64} isShuffling={true} expression="surprised" showStickerShadow={false} />
                <p className="mt-3 font-montserrat text-base text-[#1E152E] font-bold">
                  {language === 'vi' ? 'Bé Cú Đang Xếp Lại Bộ Bài ✦' : 'Owl Mascot is Realigning the Deck ✦'}
                </p>
                <p className="mt-1 text-xs text-[#5E5373] font-nunito">
                  {language === 'vi' ? 'lắng nghe thanh âm dịu êm của những lá bài...' : 'listening to gentle whispers...'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wide Panoramic Deck Fan Ribbon - Tightened height to remove dead space */}
        <div
          id="deck-fan-ribbon"
          className="relative w-full max-w-[1100px] h-[220px] sm:h-[250px] md:h-[275px] my-1 sm:my-2 flex items-center justify-center select-none overflow-visible px-4"
        >
          {deck.map((card, idx) => {
            const total = deck.length;
            const mid = (total - 1) / 2;
            const normalized = (idx - mid) / mid;

            const leftPercent = ((idx / (total - 1)) * 90) + 5;
            const angle = normalized * 16;
            const yCurve = Math.pow(normalized, 2) * 20;

            const isSelected = selectedCards.some(sc => sc.uniqueFanId === card.uniqueFanId);
            const selectionIndex = selectedCards.findIndex(sc => sc.uniqueFanId === card.uniqueFanId);
            const isHovered = hoveredFanId === card.uniqueFanId;

            const finalLeft = isShuffling ? 50 : leftPercent;
            const finalY = isShuffling
              ? (Math.random() * 20 - 10)
              : isSelected
                ? -48
                : isHovered
                  ? yCurve - 34
                  : yCurve;
            const finalRotate = isShuffling ? (Math.random() * 20 - 10) : angle;
            // No scale transform on hover - fixed size, only translateY elevation
            const finalScale = 1;
            const finalZIndex = isSelected ? 80 : isHovered ? 70 : idx + 1;

            return (
              <motion.div
                key={card.uniqueFanId}
                id={`fan-card-${card.uniqueFanId}`}
                layout
                animate={{
                  left: `${finalLeft}%`,
                  y: finalY,
                  rotate: finalRotate,
                  scale: finalScale,
                  zIndex: finalZIndex,
                  opacity: 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: isShuffling ? 300 : 250,
                  damping: 24
                }}
                onMouseEnter={() => {
                  if (!isShuffling) {
                    setHoveredFanId(card.uniqueFanId);
                    sound.playCardHover();
                  }
                }}
                onMouseLeave={() => setHoveredFanId(null)}
                onClick={(e) => handleCardClick(card, e)}
                className="absolute -translate-x-1/2 w-[60px] sm:w-[74px] md:w-[84px] h-[106px] sm:h-[132px] md:h-[150px] rounded-[14px] cursor-pointer group touch-manipulation bg-white p-[3px] shadow-[0_6px_16px_rgba(45,30,70,0.12)] hover:shadow-[0_18px_36px_rgba(45,30,70,0.22)] transition-shadow"
                style={{
                  transformOrigin: 'bottom center'
                }}
              >
                {/* Card Body */}
                <div
                  className={`w-full h-full rounded-[11px] border transition-all duration-200 p-1 flex flex-col items-center justify-between overflow-hidden ${isSelected
                    ? 'border-[#241B34] bg-gradient-to-b from-[#F7F4FC] to-[#EDE5F7] shadow-xs'
                    : isHovered
                      ? 'border-[#6D5A8A] bg-gradient-to-b from-[#FAF7FD] to-[#F1E8FB]'
                      : 'border-[#E5DAF2] bg-gradient-to-b from-[#FAF8FD] via-[#F4EDFC] to-[#EFE7F8]'
                    }`}
                >
                  {/* Subtle dotted inner border */}
                  <div className="absolute inset-1 rounded-[8px] border border-dashed border-[#DACBEF]/60 pointer-events-none" />

                  {/* Top subtle sparkle */}
                  <div className="w-full flex justify-between px-0.5 pt-0.5">
                    <CuteStickerSparkle size={9} color="#8A73B5" />
                    <CuteStickerSparkle size={9} color="#8A73B5" />
                  </div>

                  {/* Center Mascot Emblem */}
                  <div className="relative my-auto flex flex-col items-center justify-center pointer-events-none">
                    <div className={`w-8 sm:w-9 h-8 sm:h-9 rounded-full border flex items-center justify-center transition-colors ${isSelected
                      ? 'bg-white border-[#241B34]'
                      : isHovered
                        ? 'bg-white border-[#6D5A8A]'
                        : 'bg-white/80 border-[#E5D7F8]'
                      }`}>
                      <OwlSilhouetteMascot size={20} expression={isSelected ? "happy" : "chill"} showStickerShadow={false} />
                    </div>
                  </div>

                  {/* Bottom sparkles */}
                  <div className="w-full flex justify-between px-0.5 pb-0.5">
                    <CuteStickerSparkle size={9} color="#8A73B5" />
                    <CuteStickerSparkle size={9} color="#8A73B5" />
                  </div>

                  {/* Selection badge with position order */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#241B34] border border-white text-white text-[10px] font-bold font-nunito shadow-xs flex items-center gap-1 z-30 whitespace-nowrap"
                    >
                      <Check className="w-2.5 h-2.5 stroke-[3] text-white" />
                      <span>{selectionIndex + 1}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Microcopy Prompt - Tightened Spacing */}
        <div className="mt-1.5 sm:mt-2 text-center z-10 min-h-[24px]">
          <p className="font-nunito text-xs sm:text-sm text-[#5E5373] font-medium tracking-wide">
            {isShuffling ? (
              <span className="animate-pulse">
                {language === 'vi' ? 'Đang xáo bài nhẹ nhàng cùng Bé Cú...' : "Re-aligning the deck with Owl Mascot..."}
              </span>
            ) : remainingNeeded > 0 ? (
              selectedCards.length === 0 ? (
                language === 'vi' ? 'Chạm vào lá bài bất kỳ để bắt đầu rút ✦' : 'Touch any card to begin drawing ✦'
              ) : (
                language === 'vi'
                  ? `Chạm chọn lá bài cho: ${positionLabels[selectedCards.length] || `Lá ${selectedCards.length + 1}`}`
                  : `Touch card for: ${positionLabels[selectedCards.length] || `Card ${selectedCards.length + 1}`}`
              )
            ) : (
              <span className="text-[#1E152E] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5">
                <span className="text-[#A78BFA]">✦</span>
                <span>
                  {language === 'vi'
                    ? `Đã chọn đủ ${requiredCount} lá bài — bấm Mở Quẻ ngay nhé!`
                    : `All ${requiredCount} cards chosen — ready to reveal!`}
                </span>
                <span className="text-[#A78BFA]">✦</span>
              </span>
            )}
          </p>
        </div>

        {/* Bottom Action Controls - Tightened Spacing */}
        <div id="fan-bottom-controls" className="mt-3 sm:mt-4 z-10 flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap">
          {/* Shuffle Button */}
          <button
            id="btn-fan-shuffle"
            onClick={handleShuffle}
            disabled={isShuffling}
            className="px-6 py-2.5 rounded-full bg-[#FAF7FD] hover:bg-[#F2EAFA] text-[#241B34] text-xs font-bold font-nunito transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50 border border-[#E3D9F0]"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#241B34] ${isShuffling ? 'animate-spin' : ''}`} />
            <span>{t.shuffle}</span>
          </button>

          {/* Quick Pick Random */}
          {remainingNeeded > 0 && (
            <button
              id="btn-fan-autopick"
              onClick={handleAutoPick}
              disabled={isShuffling}
              className="px-6 py-2.5 rounded-full bg-[#E5EFFB] hover:bg-[#D5E6F8] text-[#1E3A5F] text-xs font-bold font-nunito transition-all shadow-xs flex items-center gap-2 cursor-pointer border border-[#D0E0F3]"
              title={language === 'vi' ? 'Bé Cú chọn ngẫu nhiên giúp bạn' : 'Let Owl Mascot choose for you'}
            >
              <Wand2 className="w-3.5 h-3.5 text-[#1E3A5F]" />
              <span>{t.quickPick}</span>
            </button>
          )}

          {/* Begin Reading Button */}
          <button
            id="btn-fan-begin-reading"
            onClick={() => {
              if (selectedCards.length === requiredCount) {
                sound.playChime();
                onConfirmCards(
                  selectedCards.map(sc => {
                    const { uniqueFanId, ...rest } = sc;

                    return {
                      ...rest,
                      orientation:
                        Math.random() < 0.5
                          ? 'upright'
                          : 'reversed',
                    };
                  })
                );
              }
            }}
            disabled={selectedCards.length !== requiredCount || isShuffling}
            className={`px-8 py-2.5 rounded-full text-xs font-bold font-nunito transition-all flex items-center gap-2 shadow-sm ${selectedCards.length === requiredCount
              ? 'bg-[#241B34] hover:bg-[#150E22] text-white cursor-pointer border border-[#3E2F59]'
              : 'bg-[#EAE2F3] text-[#8C7D9E] cursor-not-allowed border border-transparent shadow-none'
              }`}
          >
            <span>{t.beginReading}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
