import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  TarotCardData,
  DrawnTarotCard,
  TarotReadingApiResponse,
  TarotReadingResponse,
  Language
} from '../types';
import { FULL_TAROT_DECK, CLASSIC_POSITIONS, QUESTION_PRESETS } from '../data/tarotDeck';
import { CardSlot } from './CardSlot';
import { CardFanSelector } from './CardFanSelector';
import { sound } from '../utils/audio';
import {
  OwlSilhouetteMascot,
  CuteStickerSparkle,
  CuteStickerHeart,
  CuteStickerBow,
  CuteStickerFlower,
  CuteStickerStar,
  CuteStickerMoon,
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
import { RefreshCw, Layers } from 'lucide-react';
import { translations } from '../utils/i18n';
import { ClassicReadingInterpretation } from './ClassicReadingInterpretation';

interface ClassicSpreadProps {
  onShare: (summary: string) => void;
  language?: Language;
}

export const ClassicSpread: React.FC<ClassicSpreadProps> = ({ onShare, language = 'en' }) => {
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Love' | 'Career' | 'Mindset'>('All');
  const [question, setQuestion] = useState(
    language === 'vi'
      ? 'Đâu là nơi tôi đang lãng phí năng lượng vào những xung đột không đáng có?'
      : 'Where am I expending unnecessary friction against my true nature?'
  );
  const [activeStep, setActiveStep] = useState<'prompt' | 'picking' | 'drawing' | 'revealed'>('prompt');

  const [cards, setCards] = useState<(DrawnTarotCard | null)[]>([null, null, null]);
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  const [readingText, setReadingText] = useState<TarotReadingApiResponse | TarotReadingResponse | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const filterPresets = selectedCategory === 'All'
    ? QUESTION_PRESETS
    : QUESTION_PRESETS.filter(p => p.category === selectedCategory);

  const getPositionLabel = (idx: number) => {
    if (language === 'vi') {
      return CLASSIC_POSITIONS[idx]?.labelVi || CLASSIC_POSITIONS[idx]?.label || `Vị trí ${idx + 1}`;
    }
    return CLASSIC_POSITIONS[idx]?.label || `Position ${idx + 1}`;
  };

  const getPositionSubtext = (idx: number) => {
    if (language === 'vi') {
      return CLASSIC_POSITIONS[idx]?.subtextVi || CLASSIC_POSITIONS[idx]?.subtext;
    }
    return CLASSIC_POSITIONS[idx]?.subtext;
  };

  // Adapter to normalize reading data structure for the Owl Mascot Psychological Interpretation block
  const reading = useMemo<TarotReadingResponse | null>(() => {
    if (!readingText) return null;

    if ('cardBreakdown' in readingText && 'interpretation' in readingText) {
      return readingText as TarotReadingResponse;
    }

    const apiResp = readingText as TarotReadingApiResponse;
    const cardBreakdown: Record<string, string> = {};
    if (Array.isArray(apiResp.cards)) {
      apiResp.cards.forEach((c) => {
        if (c?.name) {
          cardBreakdown[c.name] = c.reflection;
        }
      });
    }

    return {
      interpretation: apiResp.synthesis || apiResp.theme || '',
      cardBreakdown,
      takeaway: apiResp.takeaway || '',
      source: 'gemini'
    };
  }, [readingText]);

  // Trigger manual card selection from fan
  const openCardPicker = () => {
    if (!question.trim()) {
      alert(
        language === 'vi'
          ? 'Vui lòng nhập câu hỏi trước khi rút bài.'
          : 'Please enter a question before drawing cards.'
      );
      return;
    }
    sound.playCardShuffle();
    setActiveStep('picking');
  };

  // Called when user selects cards in the fan
  const handleConfirmPickedCards = (pickedCards: DrawnTarotCard[]) => {
    setCards(pickedCards);
    setFlipped([false, false, false]);
    setActiveStep('drawing');

    // Sequential deal & flip animation
    setTimeout(() => {
      setFlipped(prev => [true, prev[1], prev[2]]);
      sound.playCardFlip();
    }, 400);

    setTimeout(() => {
      setFlipped(prev => [prev[0], true, prev[2]]);
      sound.playCardFlip();
    }, 900);

    setTimeout(() => {
      setFlipped([true, true, true]);
      sound.playCardFlip();
      sound.playChime();
      setActiveStep('revealed');
      requestInterpretation(pickedCards);
    }, 1500);
  };

  const startDraw = () => {
    sound.playCardShuffle();

    const shuffled = [...FULL_TAROT_DECK].sort(() => 0.5 - Math.random());

    const drawn: DrawnTarotCard[] = [0, 1, 2].map((idx) => ({
      ...shuffled[idx],
      orientation: Math.random() < 0.5 ? 'upright' : 'reversed',
    }));

    handleConfirmPickedCards(drawn);
  };

  const requestInterpretation = async (drawnCards: DrawnTarotCard[]) => {
    setIsLoadingAI(true);
    setReadingText(null);

    const minDelayPromise = new Promise(resolve => setTimeout(resolve, 1800));

    try {
      const [res] = await Promise.all([
        fetch('/api/reading', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: question.trim(),
            language,
            cards: drawnCards.map((c, idx) => ({
              name: c.name,
              orientation: c.orientation,
              position: getPositionLabel(idx)
            }))
          })
        }),
        minDelayPromise
      ]);

      if (res.ok) {
        const data: TarotReadingApiResponse = await res.json();
        setReadingText(data);
      } else {
        throw new Error('API failed');
      }
    } catch {
      // Curated fallback in case API is unavailable or returns an error
      const fallbackBreakdown: Record<string, string> = {};
      drawnCards.forEach((c) => {
        if (c) {
          fallbackBreakdown[c.name] = language === 'vi' ? c.summaryVi : c.summary;
        }
      });
      setReadingText({
        interpretation: language === 'vi'
          ? 'Những chuyển biến hiện tại đang mở ra cơ hội để bạn nhìn thấu và thấu suốt bản thân hơn.'
          : 'The current shifts are opening up space for you to observe and realign with clarity.',
        cardBreakdown: fallbackBreakdown,
        takeaway: language === 'vi'
          ? 'Hãy hít thở sâu, tập trung vào điều bạn có thể kiểm soát và hành động từng bước vững chắc.'
          : 'Take a deep breath, focus on what is within your control, and take one steady step.',
        source: 'curated'
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleFlipSingle = (index: number) => {
    sound.playCardFlip();
    setFlipped(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const handleReset = () => {
    sound.playCardFlip();
    setActiveStep('prompt');
    setCards([null, null, null]);
    setFlipped([false, false, false]);
    setReadingText(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4">
      {/* Question Form & Categories */}
      {activeStep === 'prompt' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-[1100px] rounded-[28px] bg-[#FFFFFF] border border-[#E8DEF2] shadow-[0_16px_40px_-4px_rgba(85,40,125,0.12),0_4px_12px_rgba(135,80,180,0.06)] p-8 sm:p-12 mb-8"
        >
          {/* Scalloped Stamp Edge */}
          <ScallopStampEdge position="top" fillColor="#FFFFFF" strokeColor="#E2D7EE" />
          <ScallopStampEdge position="bottom" fillColor="#FFFFFF" strokeColor="#E2D7EE" />

          {/* Decorative washi tape on prompt card - Petite, Authentic & Centered */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <WashiTape color="lavender" width={48} height={8} tilt={-0.6} />
          </div>

          {/* Decorative stickers: Placed outside with z-0 so they never overlap content */}
          <div className="absolute -top-6 -right-4 sm:-right-6 z-0 pointer-events-none select-none hidden sm:flex items-center gap-1 opacity-90">
            <HandDrawnClover size={22} />
            <RhinestoneGem type="diamond" color="purple" size={13} twinkle={true} />
            <CuteStickerBow size={24} />
          </div>

          {/* Side doodles in empty spaces outside */}
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none select-none z-0 opacity-80">
            <DoodleDots size={18} />
            <RhinestoneGem type="star" color="blue" size={13} twinkle={true} />
          </div>
          <div className="absolute top-1/2 -right-6 -translate-y-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none select-none z-0 opacity-80">
            <HandDrawnHeart size={16} />
            <RhinestoneGem type="heart" color="pink" size={13} twinkle={true} delay={1} />
          </div>

          <div className="text-center mb-6 mt-2 relative z-10">
            <div className="flex items-center justify-center gap-2">
              <RhinestoneGem type="star" color="yellow" size={15} twinkle={true} />
              <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-[#1E152E]">
                {language === 'vi' ? 'Câu hỏi nào đang thôi thúc sự rõ ràng?' : 'What question calls for clarity?'}
              </h2>
              <RhinestoneGem type="diamond" color="blue" size={14} />
            </div>
            <p className="text-xs sm:text-sm text-[#5E5373] mt-1 max-w-md mx-auto font-nunito font-normal">
              {language === 'vi'
                ? 'Giải mã nguồn cội quá khứ, nút thắt hiện tại và chiều hướng mở ra trong tương lai.'
                : 'Unpack past influences, your present friction, and the emergent trajectory.'}
            </p>
          </div>

          {/* Category Filter Badges: 5-tone palette */}
          <div id="classic-category-filter" className="flex items-center justify-center gap-2 mb-5 flex-wrap">
            {(['All', 'Career', 'Love', 'Mindset'] as const).map((cat) => {
              const label = cat === 'All' ? (t.categories?.all || t.filterAll || 'All')
                : cat === 'Career' ? (t.categories?.career || t.filterCareer || 'Career')
                  : cat === 'Love' ? (t.categories?.love || t.filterLove || 'Love')
                    : (t.categories?.mindset || t.filterMindset || 'Mindset');

              const isSel = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  id={`btn-category-${cat.toLowerCase()}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold font-montserrat transition-all cursor-pointer border ${isSel
                    ? 'bg-[#241B34] text-white border-[#241B34] shadow-xs'
                    : 'bg-[#FAF7FD] text-[#615477] border-[#E3D9F0] hover:bg-[#F2EAFA]'
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Prompt Presets: Clean lilac / slate blocks */}
          <div id="classic-presets-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
            {filterPresets.map((preset) => {
              const text = language === 'vi' ? preset.placeholderVi : preset.placeholder;
              const catLabel = preset.category === 'Career' ? (t.categories?.career || t.filterCareer || 'Career')
                : preset.category === 'Love' ? (t.categories?.love || t.filterLove || 'Love')
                  : (t.categories?.mindset || t.filterMindset || 'Mindset');

              const isSel = question === text;

              return (
                <button
                  key={preset.id}
                  id={`btn-preset-${preset.id}`}
                  onClick={() => setQuestion(text)}
                  className={`text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer font-nunito ${isSel
                    ? 'border-[#241B34] bg-[#F7F4FC] shadow-xs text-[#1E152E] font-medium'
                    : 'border-[#EDE4F6] bg-[#FAF8FD] text-[#4A3D62] hover:border-[#D5C4EB]'
                    }`}
                >
                  <div className="font-montserrat text-[11px] text-[#1E3A5F] font-bold mb-1 flex items-center gap-1">
                    <CuteStickerSparkle size={10} color="#8A73B5" />
                    <span>{catLabel}</span>
                  </div>
                  {text}
                </button>
              );
            })}
          </div>

          {/* Custom Question Input */}
          <div className="relative mb-6">
            <input
              id="input-classic-question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={language === 'vi' ? 'Hoặc tự nhập câu hỏi riêng của bạn vào đây...' : 'Or type your own personal inquiry here...'}
              className="w-full px-5 py-3 rounded-full bg-[#FAF7FD] border border-[#E3D9F0] text-sm text-[#271B3E] placeholder-[#8C7D9E] focus:outline-none focus:border-[#241B34] focus:bg-white transition-all shadow-xs font-nunito"
            />
          </div>

          {/* Action Buttons: Unified Palette */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <motion.button
              id="btn-open-card-fan"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={openCardPicker}
              className="px-6 py-2.5 rounded-full bg-[#241B34] hover:bg-[#150E22] text-white text-xs font-bold font-montserrat shadow-sm flex items-center gap-2 cursor-pointer transition-all border border-[#3E2F59]"
            >
              <Layers className="w-4 h-4 text-white" />
              <span className="tracking-wide">{t.chooseFromFan}</span>
            </motion.button>

            <motion.button
              id="btn-deal-classic"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={startDraw}
              className="px-6 py-2.5 rounded-full bg-[#EAE2F7] hover:bg-[#DDD0F0] text-[#241B34] text-xs font-bold font-montserrat flex items-center gap-2 cursor-pointer transition-all border border-[#D5C4EB] shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="tracking-wide">{t.quickShuffle}</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Interactive Deck Ribbon Fan */}
      {activeStep === 'picking' && (
        <motion.div
          id="classic-fan-view"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          <CardFanSelector
            title={t.chooseCards}
            subtitle={language === 'vi' ? 'Rút 3 lá để mở quẻ bài ✦' : 'Draw three cards to begin the reading ✦'}
            inquiry={question}
            requiredCount={3}
            positionLabels={[getPositionLabel(0), getPositionLabel(1), getPositionLabel(2)]}
            onConfirmCards={handleConfirmPickedCards}
            onCancel={() => setActiveStep('prompt')}
            language={language}
          />
        </motion.div>
      )}

      {/* 3-Card Table Spread Canvas */}
      {activeStep !== 'prompt' && activeStep !== 'picking' && (
        <motion.div
          id="classic-cards-canvas"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-[1300px] rounded-[28px] bg-[#FFFFFF] border border-[#E8DEF2] shadow-[0_16px_40px_-4px_rgba(85,40,125,0.12),0_4px_12px_rgba(135,80,180,0.06)] p-8 sm:p-12 lg:p-16 flex flex-col items-center"
        >
          {/* Scalloped Stamp Edge for 3-Card Canvas */}
          <ScallopStampEdge position="top" fillColor="#FFFFFF" strokeColor="#E2D7EE" />
          <ScallopStampEdge position="bottom" fillColor="#FFFFFF" strokeColor="#E2D7EE" />

          {/* Top washi tape accent - Petite & Realistic Craft Tape */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <WashiTape color="peach" width={48} height={8} tilt={-0.8} />
          </div>

          {/* Decorative Corner Stickers: Placed outside with z-0 so they never overlap content */}
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

          {/* Active Question Bar */}
          <div className="mb-8 text-center max-w-xl mt-2 relative z-10">
            <span className="text-xs font-montserrat font-bold text-[#5E5373] uppercase tracking-wider">
              {language === 'vi' ? 'Tâm điểm chiêm nghiệm' : 'Inquiry Focus'}
            </span>
            <p className="font-montserrat italic text-lg sm:text-xl text-[#1E152E] font-medium mt-1">
              "{question}"
            </p>
          </div>

          {/* The 3 Cards in a Row - Generous horizontal gap between cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-14 xl:gap-16 justify-items-center my-6 relative z-10">
            {cards.map((card, idx) => (
              <CardSlot
                key={idx}
                label={getPositionLabel(idx)}
                subtext={getPositionSubtext(idx)}
                card={card}
                isFlipped={flipped[idx]}
                onFlip={() => handleFlipSingle(idx)}
                index={idx}
                language={language}
              />
            ))}
          </div>

          {/* Subtle divider */}
          <div className="w-full border-t border-dashed border-[#EDE2F6] my-6" />

          {/* Control Bar: Unified Buttons */}
          <div id="classic-controls-bar" className="flex items-center gap-3 flex-wrap justify-center">
            <button
              id="btn-classic-ask-different"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-full bg-[#FAF7FD] hover:bg-[#F2EAFA] text-xs font-bold font-montserrat text-[#5C4B77] transition-all cursor-pointer border border-[#E3D9F0] shadow-xs"
            >
              ← {language === 'vi' ? 'Đặt câu hỏi khác' : 'Ask different'}
            </button>
            <button
              id="btn-classic-pick-again"
              onClick={openCardPicker}
              className="px-5 py-2.5 rounded-full bg-[#241B34] hover:bg-[#150E22] text-white text-xs font-bold font-montserrat flex items-center gap-2 shadow-sm cursor-pointer transition-all border border-[#3E2F59]"
            >
              <Layers className="w-3.5 h-3.5 text-white" />
              <span>{t.chooseFromFan}</span>
            </button>
            <button
              id="btn-classic-redraw"
              onClick={startDraw}
              className="px-5 py-2.5 rounded-full bg-[#EAE2F7] hover:bg-[#DDD0F0] text-[#241B34] text-xs font-bold font-montserrat flex items-center gap-2 cursor-pointer transition-all border border-[#D5C4EB] shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Rút nhanh lại' : 'Quick redraw'}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* KHỐI LUẬN GIẢI TÂM LÝ TỪ BÉ CÚ (CLASSIC SPREAD INTERPRETATION) */}
      {/* ========================================================================= */}
      {activeStep === 'revealed' && (
        <ClassicReadingInterpretation
          reading={reading}
          cards={cards}
          question={question}
          language={language}
          isLoadingAI={isLoadingAI}
          getPositionLabel={getPositionLabel}
          onShare={onShare}
          onReset={handleReset}
        />
      )}
    </div>
  );
};
