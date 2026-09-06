import React from 'react';
import { motion } from 'motion/react';
import { TarotCardData, Language } from '../types';
import { TarotCard } from './TarotCard';
import { CuteStickerSparkle, CuteStickerHeart, RhinestoneGem, NotebookStickerAvatar, WashiTape } from './OwlMotifs';
import { norm } from '../utils/text';

interface CardSlotProps {
  label: string;
  subtext?: string;
  card: TarotCardData | null;
  isFlipped: boolean;
  onFlip: () => void;
  index: number;
  isDealing?: boolean;
  language?: Language;
}

export const CardSlot: React.FC<CardSlotProps> = ({
  label,
  subtext,
  card,
  isFlipped,
  onFlip,
  index,
  isDealing = false,
  language = 'en'
}) => {
  // Subtle organic tilt
  const tilts = [-1, 1.2, -0.8, 1];
  const tiltDegree = tilts[index % tilts.length];

  // Unified elegant soft lilac / slate-purple tone for all position badges (same palette, slight tone variation)
  const badgeStyles = [
    'bg-[#EDE6F8] text-[#2F2148] border-[#DACEEF]',
    'bg-[#E7DFFA] text-[#2A1B43] border-[#D4C6EC]',
    'bg-[#E2D8F6] text-[#25173E] border-[#CEC0E7]',
    'bg-[#DDD1F2] text-[#201338] border-[#C7B7E2]'
  ];
  const badgeStyle = badgeStyles[index % badgeStyles.length];

  return (
    <div className="flex flex-col items-center w-full max-w-[340px] sm:max-w-[370px]">
      {/* Position Label: Cute rounded display with Montserrat font for badges, generous width & padding to prevent crowding */}
      <div className="text-center mb-3 px-2 min-h-[50px] flex flex-col items-center justify-center max-w-full">
        <span className={`inline-flex items-center justify-center px-4 py-1.5 sm:pl-5 sm:pr-6 sm:py-2 rounded-full font-montserrat text-xs sm:text-[13.5px] font-bold border shadow-xs tracking-wide max-w-full text-center ${badgeStyle}`}>
          <span className="leading-snug">{norm(label)}</span>
          <span className="ml-2 sm:ml-2.5 inline-flex items-center justify-center shrink-0 opacity-80">
            <RhinestoneGem type="diamond" color="purple" size={11} />
          </span>
        </span>
        {subtext && (
          <span className="text-[13px] sm:text-[13.5px] text-[#5E5373] font-medium mt-1.5 max-w-[320px] font-nunito leading-snug">
            {norm(subtext)}
          </span>
        )}
      </div>

      {/* Card Canvas Slot */}
      <div className="relative group">
        <TarotCard
          card={card}
          isFlipped={isFlipped}
          onFlip={onFlip}
          isDealing={isDealing}
          dealDelay={index * 0.25}
          size="md"
          language={language}
          tiltDegree={tiltDegree}
        />

        {/* Unflipped Hint Badge: Charcoal & Lavender button */}
        {!isFlipped && card && (
          <motion.button
            id={`btn-flip-cardslot-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onFlip}
            className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-[#241B34] hover:bg-[#160E24] text-white text-xs font-bold font-nunito shadow-sm flex items-center gap-1.5 transition-all duration-200 cursor-pointer border border-[#40305D]"
          >
            <span className="text-[#C6B6E8]">✦</span>
            <span className="tracking-wide">{norm(language === 'vi' ? 'Lật bài ngay' : 'Tap to reveal')}</span>
          </motion.button>
        )}
      </div>

      {/* Flipped Card Micro-Summary with Scrapbook Sticker Accent - Spacious & Readable */}
      {isFlipped && card && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mt-5 text-center px-5 py-4 rounded-2xl bg-white border border-[#E7DEEE] shadow-[0_6px_20px_rgba(45,30,70,0.06)] w-full max-w-[330px] sm:max-w-[360px] relative"
        >
          {/* Subtle micro washi tape detail on top center: neat, realistic piece of craft tape */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <WashiTape color="lavender" width={34} height={6} tilt={-0.6} />
          </div>

          <div className="flex items-center justify-center gap-2 mb-1.5 pt-0.5">
            <NotebookStickerAvatar size={24} expression={index % 2 === 0 ? "curious" : "shy"} tilt={index % 2 === 0 ? -3 : 3} tapeColor={index % 2 === 0 ? "peach" : "lavender"} />
            <span className="text-sm font-montserrat font-bold text-[#1E152E]">
              {norm(language === 'vi' && card.nameVi ? card.nameVi : card.name)}
            </span>
          </div>

          <p className="text-[13.5px] sm:text-[14px] text-[#332847] leading-relaxed font-nunito font-normal mt-1">
            {norm(
              language === 'vi' ? (
                card.contrastPerspectiveVi ? (
                  index === 0 ? card.contrastPerspectiveVi.apparent : card.contrastPerspectiveVi.actual
                ) : (
                  card.summaryVi || card.summary
                )
              ) : (
                card.contrastPerspective ? (
                  index === 0 ? card.contrastPerspective.apparent : card.contrastPerspective.actual
                ) : (
                  card.summary
                )
              )
            )}
          </p>
        </motion.div>
      )}
    </div>
  );
};


