import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import {
  NotebookStickerAvatar,
  RhinestoneGem,
  ScallopStampEdge,
  WashiTape,
  CuteStickerSparkle,
} from './OwlMotifs';
import { Sparkles, Moon } from 'lucide-react';

interface MysticReadingSkeletonProps {
  cardCount?: number;
  language?: Language;
  question?: string;
}

const MYSTICAL_MESSAGES_VI = [
  '✦ Bé Cú đang kết nối với nguồn năng lượng trực giác...',
  '✦ Soi rọi sự tương phản và chiều sâu ẩn sau các lá bài...',
  '✦ Lắng nghe nhịp điệu chiêm nghiệm dưới ánh trăng...',
  '✦ Đúc kết góc nhìn tâm lý và thông điệp chuyển hóa an lành...'
];

const MYSTICAL_MESSAGES_EN = [
  '✦ Owl Mascot is tuning into nocturnal intuitive frequencies...',
  '✦ Decoupling appearances from the underlying truth...',
  '✦ Listening to the quiet rhythm beneath the moonlight...',
  '✦ Synthesizing psychological clarity and mindful perspective...'
];

export const MysticReadingSkeleton: React.FC<MysticReadingSkeletonProps> = ({
  cardCount = 2,
  language = 'vi',
  question
}) => {
  const isVi = language === 'vi';
  const messages = isVi ? MYSTICAL_MESSAGES_VI : MYSTICAL_MESSAGES_EN;
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div
      id="mystic-reading-skeleton"
      className="relative w-full max-w-[1300px] my-6 transition-all"
    >
      {/* Vivid Mystical Cosmic Aura Glowing Behind Skeleton */}
      <div className="absolute inset-0 -m-4 sm:-m-8 rounded-[40px] bg-gradient-to-r from-purple-500/35 via-indigo-500/30 to-fuchsia-500/35 blur-[36px] animate-mystical-aura pointer-events-none -z-10" />

      {/* Decorative Washi Tape Header Accent */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <WashiTape color="lavender" width={52} height={8} tilt={-0.6} />
      </div>

      {/* Main Craft Card with glowing border and shadow */}
      <div className="rounded-[28px] bg-white/95 backdrop-blur-md border-2 border-purple-300 shadow-[0_0_35px_rgba(168,85,247,0.3),0_16px_40px_-4px_rgba(85,40,125,0.14)] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        {/* Scalloped Stamp Edges */}
        <ScallopStampEdge position="top" fillColor="#FFFFFF" strokeColor="#E2D7EE" />
        <ScallopStampEdge position="bottom" fillColor="#FFFFFF" strokeColor="#E2D7EE" />

        {/* Twinkling Rhinestone Gems */}
        <div className="absolute top-3 left-4 pointer-events-none z-10 hidden sm:block">
          <RhinestoneGem type="diamond" color="purple" size={14} twinkle={true} />
        </div>
        <div className="absolute top-3 right-4 pointer-events-none z-10 hidden sm:block">
          <RhinestoneGem type="star" color="yellow" size={14} twinkle={true} delay={1} />
        </div>
        <div className="absolute bottom-3 left-4 pointer-events-none opacity-80 z-10 hidden sm:block">
          <RhinestoneGem type="heart" color="pink" size={12} twinkle={true} delay={1.5} />
        </div>
        <div className="absolute bottom-3 right-4 pointer-events-none opacity-80 z-10 hidden sm:block">
          <RhinestoneGem type="pearl" color="blue" size={12} twinkle={true} delay={0.7} />
        </div>

        {/* Header with floating avatar & cycling status */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-5 mb-6 border-b border-[#F0E6FA] relative z-10 gap-3">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ y: [-2, 3, -2], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative"
            >
              <NotebookStickerAvatar size={44} expression="curious" tilt={-2} tapeColor="peach" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-3.5 h-3.5 text-[#B692E6] animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-montserrat text-base sm:text-lg font-bold text-[#1E152E]">
                  {isVi ? 'Bé Cú Đang Luận Giải Quẻ Bài' : 'Owl Mascot Is Synthesizing Reading'}
                </h4>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF4ED] border border-[#E7DEEE] text-[10px] sm:text-[11px] font-montserrat font-bold text-[#694A91] shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A73B5] animate-ping" />
                  <span>AI Insight</span>
                </span>
              </div>
              {question && (
                <p className="text-xs text-[#7A6B90] font-nunito italic truncate max-w-xs sm:max-w-md mt-0.5">
                  "{question}"
                </p>
              )}
            </div>
          </div>

          {/* Cycling Mystical Status Text */}
          <div className="min-h-[28px] flex items-center justify-center sm:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={msgIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="text-xs sm:text-[13px] font-nunito font-semibold text-[#573F7A] bg-[#F7F2FD] px-3.5 py-1.5 rounded-full border border-[#E4D7F5] flex items-center gap-1.5 shadow-xs"
              >
                <Moon className="w-3 h-3 text-[#8A73B5] animate-pulse" />
                <span>{messages[msgIndex]}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Skeleton Grid for Cards Breakdown */}
        <div
          className={`grid grid-cols-1 ${
            cardCount === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
          } gap-5 sm:gap-6 mb-6 relative z-10`}
        >
          {Array.from({ length: cardCount }).map((_, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-[#FCFAFE] border border-[#EFE5FA] shadow-xs relative overflow-hidden"
            >
              {/* Card header skeleton */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full animate-mystical-shimmer" />
                  <div className="h-4 w-24 rounded-full animate-mystical-shimmer" />
                </div>
                <div className="h-3 w-16 rounded-full animate-mystical-shimmer" />
              </div>
              {/* Shimmer text lines */}
              <div className="space-y-2">
                <div className="h-3.5 w-full rounded-md animate-mystical-shimmer" />
                <div className="h-3.5 w-[92%] rounded-md animate-mystical-shimmer" />
                <div className="h-3.5 w-[75%] rounded-md animate-mystical-shimmer" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Synthesis Paragraph Skeleton */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FCFAFE] border border-[#EAE0F5] shadow-xs mb-6 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-4 w-32 rounded-full animate-mystical-shimmer" />
            <CuteStickerSparkle size={12} color="#8A73B5" />
          </div>
          <div className="space-y-2.5">
            <div className="h-4 w-full rounded-md animate-mystical-shimmer" />
            <div className="h-4 w-[96%] rounded-md animate-mystical-shimmer" />
            <div className="h-4 w-[90%] rounded-md animate-mystical-shimmer" />
            <div className="h-4 w-[78%] rounded-md animate-mystical-shimmer" />
          </div>
        </div>

        {/* Actionable Takeaway Skeleton */}
        <div className="pt-2 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#8A73B5] text-xs">✦</span>
            <div className="h-4 w-40 rounded-full animate-mystical-shimmer" />
          </div>
          <div className="pl-5 border-l-4 border-[#8A73B5] bg-[#FCFAFE] p-4 sm:p-5 rounded-r-2xl border-t border-r border-b border-[#EAE0F5] space-y-2">
            <div className="h-3.5 w-[94%] rounded-md animate-mystical-shimmer" />
            <div className="h-3.5 w-[65%] rounded-md animate-mystical-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};
