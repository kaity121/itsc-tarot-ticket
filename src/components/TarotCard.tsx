import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Droplets, Wind, Mountain } from 'lucide-react';
import { TarotCardData, Language } from '../types';
import { OwlSilhouetteMascot, CuteElementBadge, CuteStickerSparkle, OwlEyeMotif } from './OwlMotifs';
import { norm } from '../utils/text';

interface TarotCardProps {
  card?: TarotCardData | null;
  isFlipped: boolean;
  onFlip?: () => void;
  isDealing?: boolean;
  dealDelay?: number;
  interactive?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  language?: Language;
  tiltDegree?: number;
}

export const TarotCard: React.FC<TarotCardProps> = ({
  card,
  isFlipped,
  onFlip,
  isDealing = false,
  dealDelay = 0,
  interactive = true,
  className = '',
  size = 'md',
  language = 'en',
  tiltDegree = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Soundless owl-glide physics: gentle, slow, smooth
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.035);
    setRotateY(x * 0.035);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  // Element icon without any warm/amber/gold colors
  const getElementIcon = (elem?: string) => {
    switch (elem) {
      case 'Fire': return <OwlEyeMotif size={13} color="#655982" />;
      case 'Water': return <Droplets className="w-3.5 h-3.5 text-[#5F85C2]" />;
      case 'Air': return <Wind className="w-3.5 h-3.5 text-[#7B9CC6]" />;
      case 'Earth': return <Mountain className="w-3.5 h-3.5 text-[#5C7E74]" />;
      default: return <OwlEyeMotif size={13} color="#7E7497" />;
    }
  };

  // Dedicated custom vector artwork for Tarot cards (Charcoal, deep indigo, pale moon-violet)
  const renderCardArtwork = (cardItem?: TarotCardData | null) => {
    if (!cardItem) return null;
    const id = cardItem.id;

    if (id === 'the-fool') {
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full stroke-[#2E2148] fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="150" cy="40" r="22" className="stroke-[#A4B5D4] fill-[#F1F4FA]" />
          <path d="M 150 10 L 150 18 M 150 62 L 150 70 M 120 40 L 128 40 M 172 40 L 180 40" strokeWidth="1.2" />
          <path d="M 20 220 C 60 190, 80 180, 110 170 C 135 160, 150 165, 180 145" />
          <path d="M 0 220 Q 50 200 90 230" strokeDasharray="3 3" />
          <circle cx="88" cy="95" r="14" className="fill-[#DFDCE7]" />
          <path d="M 88 109 L 88 145 L 75 180 M 88 145 L 102 180" />
          <path d="M 75 125 L 115 110" />
          <line x1="60" y1="130" x2="135" y2="85" strokeWidth="1.4" />
          <circle cx="60" cy="130" r="9" className="fill-[#D0CAE3]" />
          <path d="M 120 160 C 122 150, 130 145, 134 150 C 137 155, 130 162, 126 160 Z" className="fill-[#2E2148]" />
        </svg>
      );
    }

    if (id === 'the-magician') {
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full stroke-[#2E2148] fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 80 45 C 70 35, 70 55, 80 45 C 90 35, 110 55, 120 45 C 130 35, 130 55, 120 45 C 110 35, 90 55, 80 45 Z" strokeWidth="1.5" className="stroke-[#7E7497]" />
          <circle cx="100" cy="80" r="15" className="fill-[#F0EDF7]" />
          <line x1="100" y1="95" x2="100" y2="150" />
          <line x1="100" y1="108" x2="135" y2="70" />
          <line x1="135" y1="70" x2="142" y2="58" strokeWidth="2.5" className="stroke-[#8BA8D6]" />
          <circle cx="144" cy="54" r="3" className="fill-[#2E2148]" />
          <line x1="100" y1="108" x2="65" y2="140" />
          <rect x="50" y="170" width="100" height="12" rx="4" className="fill-[#EBE7F3]" />
          <circle cx="70" cy="162" r="5" className="fill-[#D7D2E7]" />
          <path d="M 90 156 L 96 166 L 84 166 Z" />
          <line x1="110" y1="156" x2="110" y2="166" strokeWidth="2" />
          <circle cx="130" cy="162" r="4" className="stroke-[#7E7497]" />
        </svg>
      );
    }

    if (id === 'the-high-priestess') {
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full stroke-[#2E2148] fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="35" y="40" width="20" height="160" rx="3" className="fill-[#221B35] stroke-[#221B35]" />
          <text x="41" y="125" className="font-serif text-[13px] fill-white stroke-none font-bold">B</text>
          <rect x="145" y="40" width="20" height="160" rx="3" className="fill-[#FAF9FD] stroke-[#2E2148]" />
          <text x="151" y="125" className="font-serif text-[13px] fill-[#2E2148] stroke-none font-bold">J</text>
          <path d="M 55 60 C 80 50, 120 50, 145 60 L 145 180 C 120 190, 80 190, 55 180 Z" className="fill-[#EFEBF6] opacity-70" />
          <circle cx="100" cy="90" r="14" className="fill-[#FAF8FD]" />
          <path d="M 88 72 C 92 78, 108 78, 112 72" />
          <path d="M 85 185 C 95 195, 105 195, 115 185 C 108 189, 92 189, 85 185 Z" className="fill-[#7E7497]" />
          <rect x="86" y="125" width="28" height="38" rx="2" className="fill-white stroke-[#7E7497]" />
          <text x="90" y="146" className="text-[8px] font-mono fill-[#7E7497] stroke-none tracking-widest">TORA</text>
        </svg>
      );
    }

    if (id === 'the-lovers') {
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full stroke-[#2E2148] fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 100 65 C 70 30, 30 50, 50 85 C 70 75, 85 85, 100 95 C 115 85, 130 75, 150 85 C 170 50, 130 30, 100 65 Z" className="fill-[#E7E2F2] stroke-[#7E7497]" />
          <circle cx="100" cy="50" r="12" className="fill-[#FBF9FD]" />
          <circle cx="70" cy="130" r="11" className="fill-[#EFEBF6]" />
          <path d="M 70 141 L 70 185 L 60 215 M 70 185 L 80 215" />
          <circle cx="130" cy="130" r="11" className="fill-[#EFEBF6]" />
          <path d="M 130 141 L 130 185 L 120 215 M 130 185 L 140 215" />
          <path d="M 78 152 Q 100 160 122 152" strokeWidth="2" className="stroke-[#7E7497]" />
          <path d="M 100 144 L 100 138" strokeWidth="1.5" />
        </svg>
      );
    }

    if (id === 'the-hermit') {
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full stroke-[#2E2148] fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 100 50 C 90 60, 85 75, 85 95 L 80 180 L 120 180 L 115 95 C 115 75, 110 60, 100 50 Z" className="fill-[#E8E4F1]" />
          <circle cx="100" cy="65" r="10" className="fill-[#D7D1E5]" />
          <line x1="80" y1="120" x2="65" y2="185" strokeWidth="2" />
          <line x1="115" y1="100" x2="135" y2="120" />
          <circle cx="138" cy="130" r="12" className="stroke-[#8BA8D6] fill-[#F3F7FD]" />
          <OwlEyeMotif size={14} color="#8BA8D6" className="translate-x-[131px] translate-y-[123px]" />
        </svg>
      );
    }

    if (id === 'the-moon') {
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full stroke-[#2E2148] fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="100" cy="60" r="28" className="stroke-[#8BA8D6] fill-[#F0F4FA]" />
          <path d="M 90 35 C 112 40, 115 80, 90 85 C 102 78, 102 42, 90 35 Z" className="fill-[#2E2148] stroke-none" />
          <rect x="40" y="110" width="18" height="50" rx="3" className="fill-[#EBE7F3]" />
          <rect x="142" y="110" width="18" height="50" rx="3" className="fill-[#EBE7F3]" />
          <path d="M 100 120 Q 95 150 100 190" strokeDasharray="3 3" />
          <path d="M 50 190 Q 100 170 150 190" className="fill-[#DFD9EB]/50" />
          <circle cx="75" cy="140" r="9" className="fill-[#E8E3F2]" />
          <circle cx="125" cy="140" r="9" className="fill-[#E8E3F2]" />
        </svg>
      );
    }

    // Default Tarot Card Archetype Illustration
    return (
      <svg viewBox="0 0 200 240" className="w-full h-full stroke-[#2E2148] fill-none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="100" cy="120" r="48" className="stroke-[#D5CFE5] fill-[#FAF9FD]" />
        <circle cx="100" cy="120" r="36" className="stroke-[#8BA8D6]/70 stroke-dasharray-[4_3]" />
        <OwlEyeMotif size={36} color="#2E2148" className="translate-x-[82px] translate-y-[102px]" />
      </svg>
    );
  };

  const sizeClasses = {
    sm: 'w-[145px] h-[230px]',
    md: 'w-[195px] sm:w-[220px] h-[300px] sm:h-[340px]',
    lg: 'w-[240px] sm:w-[270px] h-[370px] sm:h-[415px]'
  }[size];

  return (
    <motion.div
      initial={isDealing ? { opacity: 0, y: 30, scale: 0.94 } : false}
      animate={isDealing ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: dealDelay, ease: [0.25, 1, 0.5, 1] }}
      className={`relative select-none perspective-1000 ${sizeClasses} ${className}`}
      style={{
        transform: !isHovered && tiltDegree !== 0 ? `rotate(${tiltDegree * 0.5}deg)` : undefined,
        transition: 'transform 0.35s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={interactive ? onFlip : undefined}
    >
      <motion.div
        ref={cardRef}
        animate={{
          y: isHovered ? -6 : 0,
          rotateY: isFlipped ? 180 : 0,
          rotateX: isHovered ? rotateX : 0,
          rotateZ: isHovered ? rotateY * 0.25 : 0
        }}
        transition={{
          y: { duration: 0.35, ease: 'easeOut' },
          rotateY: { duration: 0.85, ease: [0.25, 1, 0.5, 1] },
          rotateX: { duration: 0.35, ease: 'easeOut' },
          rotateZ: { duration: 0.35, ease: 'easeOut' }
        }}
        className={`w-full h-full preserve-3d cursor-pointer rounded-2xl bg-white tarot-clean-card border transition-all duration-350 ease-out relative ${
          isHovered ? 'border-[#B49FE6] ring-2 ring-[#A78BFA]/25' : 'border-[#E3DCED]'
        }`}
      >
        {/* CARD BACK: Elegant Lavender Minimalist Pattern with ITSC Mascot */}
        <div className="absolute inset-0 backface-hidden rounded-[17px] bg-gradient-to-b from-[#FAF7FD] via-[#F3EDFC] to-[#EAE0F8] border border-[#DDD3ED] p-3.5 flex flex-col items-center justify-between overflow-hidden">
          {/* Subtle Dotted Inner Border */}
          <div className="absolute inset-1.5 rounded-xl border border-dashed border-[#DACDEE] pointer-events-none" />

          {/* Top subtle sparkles */}
          <div className="w-full flex justify-between px-1 z-10">
            <CuteStickerSparkle size={15} color="#A78BFA" />
            <CuteStickerSparkle size={13} color="#93C5FD" />
          </div>

          {/* Center Mascot Badge */}
          <div className="relative flex flex-col items-center justify-center my-auto z-10">
            <div className="w-16 h-16 rounded-full bg-white border border-[#DDD4ED] flex items-center justify-center shadow-xs">
              <OwlSilhouetteMascot size={40} expression="sleepy" showStickerShadow={false} />
            </div>

            <div className="mt-2 text-center">
              <span className="font-montserrat text-[11px] tracking-wider font-bold text-[#372A4E] bg-white/90 px-3 py-0.5 rounded-full border border-[#DDD4ED]">
                ITSC TAROT
              </span>
            </div>
          </div>

          {/* Bottom subtle sparkles */}
          <div className="w-full flex justify-between px-1 z-10">
            <CuteStickerSparkle size={13} color="#93C5FD" />
            <CuteStickerSparkle size={15} color="#A78BFA" />
          </div>
        </div>

        {/* CARD FRONT: Full-Bleed Authentic Artwork - 100% crisp, zero overlay/filter */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[17px] bg-white border border-[#E2DBEC] flex flex-col overflow-hidden">
          
          {/* 1. Authentic Artwork Container - completely clean without any gradient or overlay */}
          <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-white">
            {card?.image ? (
              <img
                src={card.image}
                alt={norm(language === 'vi' && card.nameVi ? card.nameVi : (card?.name || 'Tarot Card'))}
                loading="lazy"
                className="w-full h-full object-cover block"
                style={{ filter: 'none' }}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.vector-fallback');
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }}
              />
            ) : null}

            {/* Fallback artwork if no image or image error */}
            <div className={`vector-fallback ${card?.image ? 'hidden' : 'flex'} w-full h-full items-center justify-center bg-[#F6F2FA] p-4`}>
              {renderCardArtwork(card)}
            </div>

            {/* Top Right Element Badge */}
            {card?.element && (
              <div className="absolute top-2 right-2 z-10 pointer-events-none">
                <CuteElementBadge element={card.element} size={26} />
              </div>
            )}
          </div>

          {/* 2. Separate Card Title & Description Bar - perfectly flush with image, no dark shadow or overlay */}
          <div className="w-full shrink-0 bg-white py-2 px-2 flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center gap-1.5 w-full">
              {card?.numeral && (
                <span className="text-[11px] font-bold text-[#5E5373] font-montserrat">
                  {card.numeral}
                </span>
              )}
              <h3 className="font-montserrat text-xs sm:text-[13px] font-bold text-[#1E152D] leading-tight truncate">
                {norm(language === 'vi' && card?.nameVi ? card.nameVi : (card?.name || 'Tarot Card'))}
              </h3>
            </div>
            <p className="text-[11px] text-[#5E5373] line-clamp-1 mt-0.5 font-nunito font-normal">
              {norm((language === 'vi' && card?.keywordsVi ? card.keywordsVi : (card?.keywords || [])).slice(0, 3).join(' • '))}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
