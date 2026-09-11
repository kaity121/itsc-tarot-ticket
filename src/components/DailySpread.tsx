import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TarotCardData,
  DrawnTarotCard,
  TarotReadingApiResponse,
  Language
} from '../types';
import { CardSlot } from './CardSlot';
import { CardFanSelector } from './CardFanSelector';
import { MysticReadingSkeleton } from './MysticReadingSkeleton';
import { ReadingResultView } from './ReadingResultView';
import { FULL_TAROT_DECK, DAILY_PERSPECTIVE_PAIRS } from '../data/tarotDeck';
import { sound } from '../utils/audio';
import {
  OwlSilhouetteMascot,
  CuteStickerSparkle,
  CuteStickerOwlSleeping,
  CuteStickerOwlFlying,
  RhinestoneGem,
  ScallopStampEdge,
  NotebookStickerAvatar,
  WashiTape,
  HandDrawnClover,
  DoodleStar,
  DoodleDots,
  HandDrawnHeart
} from './OwlMotifs';
import { RefreshCw, Layers, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { translations } from '../utils/i18n';

interface DailySpreadProps {
  onShare: (summary: string) => void;
  language?: Language;
}

const DAILY_QUESTION_PRESETS = [
  {
    id: 'focus',
    textVi: 'Hôm nay tôi nên tập trung năng lượng vào điều gì để đạt bình an?',
    textEn: 'Where should I direct my energy today for peace of mind?',
    categoryVi: 'Tâm trí',
    categoryEn: 'Mindset'
  },
  {
    id: 'career',
    textVi: 'Có điều gì trong công việc bề ngoài có vẻ khó nhưng bản chất là cơ hội?',
    textEn: 'What career challenge today is actually an opportunity in disguise?',
    categoryVi: 'Công việc',
    categoryEn: 'Career'
  },
  {
    id: 'emotion',
    textVi: 'Làm thế nào để tôi soi rọi và chuyển hóa những băn khoăn nội tâm?',
    textEn: 'How can I illuminate and transform my underlying anxiety?',
    categoryVi: 'Cảm xúc',
    categoryEn: 'Emotion'
  },
  {
    id: 'relationship',
    textVi: 'Góc nhìn chân thực nào tôi cần nhận diện trong các mối quan hệ hôm nay?',
    textEn: 'What grounded truth should I recognize in my relationships today?',
    categoryVi: 'Kết nối',
    categoryEn: 'Connection'
  }
];

export const DailySpread: React.FC<DailySpreadProps> = ({ onShare, language = 'en' }) => {
  const t = translations[language];
  const isVi = language === 'vi';

  // Perspective pair
  const label1 = isVi ? DAILY_PERSPECTIVE_PAIRS[0].labelVi : DAILY_PERSPECTIVE_PAIRS[0].label;
  const label2 = isVi ? DAILY_PERSPECTIVE_PAIRS[1].labelVi : DAILY_PERSPECTIVE_PAIRS[1].label;
  const subtext1 = isVi ? DAILY_PERSPECTIVE_PAIRS[0].subtextVi : DAILY_PERSPECTIVE_PAIRS[0].subtext;
  const subtext2 = isVi ? DAILY_PERSPECTIVE_PAIRS[1].subtextVi : DAILY_PERSPECTIVE_PAIRS[1].subtext;

  // Step state: 'prompt' -> 'picking' -> 'revealed'
  const [step, setStep] = useState<'prompt' | 'picking' | 'revealed'>('prompt');

  // Question state
  const defaultQuestion = isVi
    ? 'Hôm nay tôi nên chú ý và điều hướng năng lượng vào điều gì?'
    : 'What should I pay mindful attention to and direct my energy toward today?';
  const [question, setQuestion] = useState(defaultQuestion);

  // Cards state
  const [card1, setCard1] = useState<DrawnTarotCard | null>(null);
  const [card2, setCard2] = useState<DrawnTarotCard | null>(null);
  const [card1Flipped, setCard1Flipped] = useState(false);
  const [card2Flipped, setCard2Flipped] = useState(false);

  // Shuffle animation state
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleStage, setShuffleStage] = useState<'idle' | 'stacking' | 'fanning' | 'gathering' | 'dealing'>('idle');

  // Reading state
  const [readingText, setReadingText] = useState<TarotReadingApiResponse | null>(null);  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Countdown timer for next spread
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 18 });

  // Update default question when language changes if user hasn't edited
  useEffect(() => {
    setQuestion(defaultQuestion);
  }, [language]);

  // Live ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (h: number, m: number, s: number) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  // Fetch interpretation using official API contract POST /api/reading
  const fetchInterpretation = async (c1: DrawnTarotCard, c2: DrawnTarotCard) => {
    setIsLoadingAI(true);
    setReadingText(null);

    const c1Name = isVi && c1.nameVi ? c1.nameVi : c1.name;
    const c2Name = isVi && c2.nameVi ? c2.nameVi : c2.name;


    try {
      const res = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question || defaultQuestion,
          language,
          cards: [
            { name: c1.name, orientation: c1.orientation, position: label1 },
            { name: c2.name, orientation: c2.orientation, position: label2 }
          ]
        })
      });

      if (res.ok) {
        const data: TarotReadingApiResponse = await res.json();
        setReadingText(data);
      } else {
        throw new Error('API failed');
      }
    } catch {
      // Local fallback in case of network or API key issue
      const isVi = language === 'vi';
      setReadingText({
        theme: isVi ? 'Chiêm nghiệm sự chuyển hóa năng lượng' : 'Reflective Energy Transformation',
        cards: [
          {
            name: isVi && c1.nameVi ? c1.nameVi : c1.name,
            position: label1,
            reflection: isVi ? (c1.contrastPerspectiveVi?.actual || c1.summaryVi) : (c1.contrastPerspective?.actual || c1.summary)
          },
          {
            name: isVi && c2.nameVi ? c2.nameVi : c2.name,
            position: label2,
            reflection: isVi ? (c2.contrastPerspectiveVi?.actual || c2.summaryVi) : (c2.contrastPerspective?.actual || c2.summary)
          }
        ],
        synthesis: isVi
          ? 'Dòng năng lượng hôm nay khuyến khích bạn nhìn nhận mọi việc từ nhiều chiều kích khác nhau để tìm thấy sự bình an.'
          : 'Today\'s energy invites you to perceive situations from multiple dimensions to find inner calm.',
        takeaway: isVi
          ? 'Hãy lắng đọng tâm trí, buông bỏ những lo âu không cần thiết và trân trọng từng khoảnh khắc hiện tại.'
          : 'Quiet your mind, release unnecessary worries, and embrace the present moment.'
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Quick Shuffle and Deal
  const handleQuickShuffleAndDraw = () => {
    if (isShuffling) return;

    sound.playCardShuffle();
    setIsShuffling(true);
    setCard1Flipped(false);
    setCard2Flipped(false);
    setShuffleStage('stacking');
    setStep('revealed');

    setTimeout(() => {
      setShuffleStage('fanning');
    }, 450);

    setTimeout(() => {
      setShuffleStage('gathering');
    }, 900);

    setTimeout(() => {
      const available = [...FULL_TAROT_DECK].sort(() => 0.5 - Math.random());
      const newCard1: DrawnTarotCard = {
        ...available[0],
        orientation:
          Math.random() < 0.5
            ? 'upright'
            : 'reversed',
      };

      const newCard2: DrawnTarotCard = {
        ...available[1],
        orientation:
          Math.random() < 0.5
            ? 'upright'
            : 'reversed',
      };

      setCard1(newCard1);
      setCard2(newCard2);
      setShuffleStage('dealing');

      setTimeout(() => {
        setIsShuffling(false);
        setShuffleStage('idle');
        setCard1Flipped(true);
        sound.playCardFlip();

        setTimeout(() => {
          setCard2Flipped(true);
          sound.playCardFlip();
          sound.playChime();
          fetchInterpretation(newCard1, newCard2);
        }, 350);
      }, 350);
    }, 1250);
  };

  // Handle confirm cards picked from fan
  const handleConfirmFanCards = (pickedCards: DrawnTarotCard[]) => {
    setStep('revealed');
    setCard1(pickedCards[0]);
    setCard2(pickedCards[1]);
    setCard1Flipped(false);
    setCard2Flipped(false);

    setTimeout(() => {
      setCard1Flipped(true);
      sound.playCardFlip();
    }, 350);

    setTimeout(() => {
      setCard2Flipped(true);
      sound.playCardFlip();
      sound.playChime();
      fetchInterpretation(pickedCards[0], pickedCards[1]);
    }, 850);
  };

  const handleFlipCard1 = () => {
    sound.playCardFlip();
    setCard1Flipped(!card1Flipped);
  };

  const handleFlipCard2 = () => {
    sound.playCardFlip();
    setCard2Flipped(!card2Flipped);
  };

  const handleResetToQuestion = () => {
    sound.playCardFlip();
    setStep('prompt');
    setCard1(null);
    setCard2(null);
    setCard1Flipped(false);
    setCard2Flipped(false);
    setReadingText(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4">
      {/* 1. STEP: PROMPT - QUESTION INPUT BEFORE DRAWING CARDS */}
      {step === 'prompt' && (
        <motion.div
          id="daily-question-prompt-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="relative w-full max-w-[1100px] rounded-[28px] bg-[#FFFFFF] border-2 border-[#D8B4FE] shadow-[0_0_35px_rgba(168,85,247,0.22),0_16px_40px_-4px_rgba(85,40,125,0.12)] p-6 sm:p-10 lg:p-12 mb-8"
        >
          {/* Vivid Mystical Cosmic Aura Glowing Behind Prompt Card */}
          <div className="absolute -inset-2 sm:-inset-3 rounded-[38px] bg-gradient-to-r from-purple-500/25 via-indigo-500/20 to-fuchsia-500/25 blur-2xl -z-10 animate-mystical-aura pointer-events-none" />

          {/* Scalloped Stamp Edge */}
          <ScallopStampEdge position="top" fillColor="#FFFFFF" strokeColor="#E2D7EE" />
          <ScallopStampEdge position="bottom" fillColor="#FFFFFF" strokeColor="#E2D7EE" />

          {/* Top Washi Tape Accent */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <WashiTape color="lavender" width={52} height={8} tilt={-0.6} />
          </div>

          {/* Decorative Corner Accents */}
          <div className="absolute -top-6 -left-4 sm:-left-6 z-0 pointer-events-none select-none hidden md:flex items-center gap-1 opacity-90">
            <HandDrawnClover size={24} />
            <RhinestoneGem type="diamond" color="purple" size={13} twinkle={true} />
          </div>
          <div className="absolute -top-6 -right-4 sm:-right-6 z-0 pointer-events-none select-none hidden sm:flex items-center gap-1 opacity-90">
            <DoodleStar size={24} />
            <RhinestoneGem type="star" color="yellow" size={14} twinkle={true} delay={1} />
          </div>
          <div className="absolute -bottom-6 -left-4 sm:-left-6 z-0 opacity-85 rotate-[-8deg] pointer-events-none select-none hidden sm:block">
            <CuteStickerOwlSleeping size={30} />
          </div>
          <div className="absolute -bottom-6 -right-4 sm:-right-6 z-0 opacity-85 rotate-[12deg] pointer-events-none select-none hidden sm:block">
            <CuteStickerOwlFlying size={30} />
          </div>

          {/* Header */}
          <div className="text-center mb-6 mt-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#EDE4FA] to-[#E3D4F8] text-[#34165E] text-xs font-montserrat font-bold mb-3 border border-[#C084FC] shadow-[0_0_16px_rgba(168,85,247,0.35)] animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-[#8A73B5]" />
              <span>{isVi ? '✦ BƯỚC 1: ĐẶT CÂU HỎI TRƯỚC KHI BỐC BÀI' : '✦ STEP 1: SET YOUR INQUIRY BEFORE DRAWING'}</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <NotebookStickerAvatar size={36} expression="curious" tilt={-2} tapeColor="peach" />
              <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-[#1E152E]">
                {isVi ? 'Tâm Điểm Chiêm Nghiệm Hôm Nay' : 'Daily Contrast Inquiry'}
              </h2>
              <RhinestoneGem type="star" color="yellow" size={15} twinkle={true} />
            </div>
            <p className="text-xs sm:text-sm text-[#5E5373] max-w-lg mx-auto font-nunito font-normal">
              {isVi
                ? 'Nhập câu hỏi hoặc chọn một ý niệm mà bạn muốn Bé Cú soi tỏ sự tương phản giữa vẻ bề ngoài và bản chất thực sự.'
                : 'Enter your inquiry or choose a mindful prompt for Owl Mascot to illuminate appearance versus reality.'}
            </p>
          </div>

          {/* Preset Prompts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 relative z-10">
            {DAILY_QUESTION_PRESETS.map((preset) => {
              const text = isVi ? preset.textVi : preset.textEn;
              const cat = isVi ? preset.categoryVi : preset.categoryEn;
              const isSel = question === text;

              return (
                <button
                  key={preset.id}
                  id={`btn-daily-preset-${preset.id}`}
                  onClick={() => {
                    sound.playCardFlip();
                    setQuestion(text);
                  }}
                  className={`text-left p-3.5 rounded-2xl border text-xs sm:text-[13px] transition-all cursor-pointer font-nunito ${isSel
                      ? 'border-[#8B5CF6] bg-[#F7F4FC] shadow-[0_0_15px_rgba(139,92,246,0.2)] text-[#1E152E] font-semibold ring-2 ring-[#8B5CF6]/30'
                      : 'border-[#EDE4F6] bg-[#FAF8FD] text-[#4A3D62] hover:border-[#C084FC] hover:shadow-[0_0_12px_rgba(168,85,247,0.15)] hover:bg-white'
                    }`}
                >
                  <div className="font-montserrat text-[11px] text-[#1E3A5F] font-bold mb-1 flex items-center gap-1.5">
                    <CuteStickerSparkle size={10} color="#8A73B5" />
                    <span>{cat}</span>
                  </div>
                  <span className="leading-snug">{text}</span>
                </button>
              );
            })}
          </div>

          {/* Custom Question Input with Glowing Arcane Focus */}
          <div className="relative mb-6 relative z-10">
            <div className="relative flex items-center">
              <input
                id="input-daily-question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={
                  isVi
                    ? 'Nhập câu hỏi riêng của bạn trước khi bốc bài...'
                    : 'Type your custom question before drawing cards...'
                }
                className="w-full px-5 py-3.5 pr-12 rounded-full bg-[#FAF7FD] border-2 border-[#D8B4FE] text-sm sm:text-base text-[#271B3E] placeholder-[#8C7D9E] focus:outline-none focus:border-[#8B5CF6] focus:shadow-[0_0_25px_rgba(139,92,246,0.35)] focus:bg-white transition-all shadow-[0_0_12px_rgba(168,85,247,0.12)] font-nunito"
              />
              <div className="absolute right-4 text-[#8B5CF6] pointer-events-none">
                <Sparkles className="w-4 h-4 opacity-80 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Action Buttons: Choose from fan or quick draw with Glowing Mystical effects */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap relative z-10">
            <motion.button
              id="btn-daily-start-fan"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                sound.playCardShuffle();
                setStep('picking');
              }}
              className="px-7 py-3.5 rounded-full bg-[#241B34] hover:bg-[#150E22] text-white text-xs sm:text-[13.5px] font-bold font-montserrat shadow-[0_4px_20px_rgba(147,51,234,0.35)] hover:shadow-[0_4px_28px_rgba(147,51,234,0.55)] flex items-center gap-2.5 cursor-pointer transition-all border border-[#7C3AED]"
            >
              <Layers className="w-4 h-4 text-[#D8B4FE]" />
              <span className="tracking-wide">
                {isVi ? 'Chọn 2 lá từ quạt bài' : 'Pick 2 cards from fan'}
              </span>
            </motion.button>

            <motion.button
              id="btn-daily-start-quick"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleQuickShuffleAndDraw}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#F1E8FC] to-[#E5D7FA] hover:from-[#E8DCF9] hover:to-[#DDD0F5] text-[#241B34] text-xs sm:text-[13.5px] font-bold font-montserrat flex items-center gap-2.5 cursor-pointer transition-all border border-[#C084FC] shadow-[0_2px_15px_rgba(168,85,247,0.25)] hover:shadow-[0_4px_20px_rgba(168,85,247,0.4)]"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#6B21A8]" />
              <span className="tracking-wide">
                {isVi ? 'Rút bài nhanh' : 'Quick shuffle & draw'}
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* 2. STEP: PICKING - INTERACTIVE CARD FAN SELECTOR */}
      {step === 'picking' && (
        <motion.div
          id="daily-fan-view"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="w-full mb-6"
        >
          <CardFanSelector
            title={t.chooseCards}
            subtitle={isVi ? 'Rút 2 lá để soi rọi thực tại' : 'Draw two cards to illuminate reality'}
            inquiry={question || defaultQuestion}
            requiredCount={2}
            positionLabels={[label1, label2]}
            onConfirmCards={handleConfirmFanCards}
            onCancel={() => setStep('prompt')}
            language={language}
          />
        </motion.div>
      )}

      {/* 3. STEP: REVEALED - CARDS CANVAS & READING */}
      {step === 'revealed' && (
        <motion.div
          id="daily-revealed-container"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col items-center"
        >
          {/* Active Question Banner & Switch Button */}
          <div className="w-full max-w-[1300px] mb-5 px-4 sm:px-6 py-3.5 rounded-2xl bg-white border border-[#E8DEF2] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <NotebookStickerAvatar size={26} expression="happy" tilt={-2} tapeColor="peach" />
              <div>
                <span className="text-[11px] font-montserrat font-bold text-[#6E5D87] uppercase tracking-wider block">
                  {isVi ? 'Tâm điểm chiêm nghiệm đã chọn' : 'Selected Inquiry'}
                </span>
                <p className="text-sm font-montserrat font-semibold italic text-[#1E152E]">
                  "{question}"
                </p>
              </div>
            </div>
            <button
              id="btn-daily-change-question"
              onClick={handleResetToQuestion}
              className="px-4 py-1.5 rounded-full bg-[#FAF7FD] hover:bg-[#F2EAFA] text-xs font-bold font-montserrat text-[#574673] border border-[#E3D9F0] transition-colors cursor-pointer shrink-0"
            >
              ← {isVi ? 'Đổi câu hỏi khác' : 'Change question'}
            </button>
          </div>

          {/* Primary Cards Container */}
          <div
            id="daily-spread-card"
            className="relative w-full max-w-[1300px] rounded-[28px] bg-[#FFFFFF] border border-[#E8DEF2] shadow-[0_16px_40px_-4px_rgba(85,40,125,0.12),0_4px_12px_rgba(135,80,180,0.06)] p-8 sm:p-12 lg:p-16 flex flex-col items-center"
          >
            {/* Scalloped Stamp Edge */}
            <ScallopStampEdge position="top" fillColor="#FFFFFF" strokeColor="#E2D7EE" />
            <ScallopStampEdge position="bottom" fillColor="#FFFFFF" strokeColor="#E2D7EE" />

            {/* Top Washi Tape Accent */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <WashiTape color="peach" width={48} height={8} tilt={-0.8} />
            </div>

            {/* Corner Motifs */}
            <div className="absolute -top-6 -left-4 sm:-left-6 z-0 pointer-events-none select-none hidden md:flex items-center gap-1 opacity-90">
              <HandDrawnClover size={26} />
              <RhinestoneGem type="diamond" color="purple" size={14} twinkle={true} />
            </div>
            <div className="absolute -top-6 -right-4 sm:-right-6 z-0 pointer-events-none select-none hidden sm:flex items-center gap-1 opacity-90">
              <DoodleStar size={26} />
              <RhinestoneGem type="star" color="yellow" size={15} twinkle={true} delay={1} />
            </div>
            <div className="absolute top-1/2 -left-7 -translate-y-1/2 z-0 pointer-events-none select-none hidden lg:flex flex-col items-center gap-2 opacity-85">
              <DoodleDots size={20} />
              <RhinestoneGem type="heart" color="pink" size={14} twinkle={true} delay={1.8} />
            </div>
            <div className="absolute top-1/2 -right-7 -translate-y-1/2 z-0 pointer-events-none select-none hidden lg:flex flex-col items-center gap-2 opacity-85">
              <HandDrawnHeart size={20} />
              <RhinestoneGem type="pearl" color="blue" size={14} twinkle={true} delay={0.8} />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:-left-6 z-0 opacity-90 rotate-[-8deg] pointer-events-none select-none hidden sm:block">
              <CuteStickerOwlSleeping size={30} />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:-right-6 z-0 opacity-90 rotate-[12deg] pointer-events-none select-none hidden sm:flex items-center">
              <CuteStickerOwlFlying size={30} />
            </div>

            {/* Shuffle Interactive Overlay */}
            <AnimatePresence>
              {isShuffling && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 z-30 rounded-[28px] bg-[#1E152E]/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
                >
                  <div className="relative flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-[#E5DAF5] shadow-xl max-w-sm">
                    <OwlSilhouetteMascot size={64} isShuffling={true} expression="surprised" showStickerShadow={false} />
                    <p className="mt-3 font-montserrat text-base sm:text-lg text-[#1E152E] font-bold">
                      {isVi ? 'Bé Cú đang xáo bài cho bạn...' : 'Owl Mascot is shuffling the cards...'}
                    </p>
                    <p className="mt-1 text-xs text-[#5E5373] font-nunito">
                      {isVi ? 'chuẩn bị soi rọi góc nhìn tương phản' : 'calibrating contrast perspectives'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2-Card Dual Perspective Layout */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 sm:gap-14 md:gap-20 lg:gap-28 my-6 sm:my-8 relative z-10">
              {/* Left Card: "Vẻ bề ngoài" */}
              <CardSlot
                label={label1}
                subtext={subtext1}
                card={card1}
                isFlipped={card1Flipped}
                onFlip={handleFlipCard1}
                index={0}
                isDealing={shuffleStage === 'dealing'}
                language={language}
              />

              {/* Dotted vertical divider */}
              <div className="hidden md:flex flex-col items-center justify-center gap-2 h-44 text-[#D8CEE8]">
                <span className="text-xs text-[#8A73B5]">✦</span>
                <div className="w-0.5 h-16 border-l border-dashed border-[#D8CEE8]" />
                <span className="text-xs text-[#8A73B5]">✦</span>
              </div>

              {/* Right Card: "Bản chất thực sự" */}
              <CardSlot
                label={label2}
                subtext={subtext2}
                card={card2}
                isFlipped={card2Flipped}
                onFlip={handleFlipCard2}
                index={1}
                isDealing={shuffleStage === 'dealing'}
                language={language}
              />
            </div>

            {/* Delicate divider */}
            <div className="subtle-divider my-6" />

            {/* Action Buttons: Unified Palette */}
            <div id="daily-actions-bar" className="flex items-center gap-3.5 flex-wrap justify-center relative z-10">
              <motion.button
                id="btn-fan-pick-daily"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  sound.playCardShuffle();
                  setStep('picking');
                }}
                disabled={isShuffling}
                className="px-6 py-2.5 rounded-full bg-[#241B34] hover:bg-[#150E22] text-white text-xs font-bold font-montserrat shadow-sm flex items-center gap-2 transition-all cursor-pointer border border-[#3E2F59]"
              >
                <Layers className="w-4 h-4 text-white" />
                <span className="tracking-wide">{t.chooseFromFan}</span>
              </motion.button>

              <motion.button
                id="btn-shuffle-daily"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleQuickShuffleAndDraw}
                disabled={isShuffling}
                className="px-6 py-2.5 rounded-full bg-[#EAE2F7] hover:bg-[#DDD0F0] text-[#241B34] text-xs font-bold font-montserrat flex items-center gap-2 transition-all cursor-pointer border border-[#D5C4EB] shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#241B34] ${isShuffling ? 'animate-spin' : ''}`} />
                <span className="tracking-wide">{t.quickShuffle}</span>
              </motion.button>
            </div>
          </div>

          {/* Subtle divider */}
          <div className="w-full max-w-[1300px] subtle-divider my-8" />

          {/* 4. LOADING SKELETON: MYSTICAL LOADING WHILE WAITING FOR AI */}
          {isLoadingAI && (
            <MysticReadingSkeleton
              cardCount={2}
              language={language}
              question={question}
            />
          )}

          {/* 5. READING RESULT: SMOOTH & RESPONSIVE */}
          {!isLoadingAI && readingText && (
            <ReadingResultView
              reading={readingText}
              question={question}
              language={language}
              drawnCards={card1 && card2 ? [card1, card2] : undefined}
              onShare={onShare}
              onReset={handleResetToQuestion}
            />
          )}

          {/* Floating Bottom Status Capsule */}
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <div className="px-5 py-2 rounded-full bg-white border border-[#E3D9F0] shadow-xs text-xs font-bold font-nunito text-[#513D70] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="tracking-wide text-xs">
                {isVi ? 'Quẻ mới sau' : 'Next spread in'}{' '}
                <strong className="font-mono text-[#1E152E] ml-1 bg-[#F5EEFD] px-2 py-0.5 rounded-md border border-[#E3D4F5]">
                  {formatTimer(timeLeft.hours, timeLeft.minutes, timeLeft.seconds)}
                </strong>
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
