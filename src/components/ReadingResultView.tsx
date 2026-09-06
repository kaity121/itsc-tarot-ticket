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
import { Share2, RefreshCw, MessageSquarePlus, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface ReadingResultViewProps {
  reading: string;
  question?: string;
  language?: Language;
  onShare?: (text: string) => void;
  onReset?: () => void;
}

export const ReadingResultView: React.FC<ReadingResultViewProps> = ({
  reading,
  question,
  language = 'vi',
  onShare,
  onReset
}) => {
  const isVi = language === 'vi';

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
  const renderFormattedReading = () => {
    const lines = reading.split('\n');
    const blocks: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = (key: string) => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim();
        if (text) {
          blocks.push(
            <p
              key={key}
              className="text-[14px] sm:text-[15px] text-[#332847] leading-relaxed font-nunito font-normal my-3"
            >
              {formatTextWithBold(text)}
            </p>
          );
        }
        currentParagraph = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushParagraph(`p-${index}`);
        return;
      }

      // Title ##
      if (trimmed.startsWith('## ')) {
        flushParagraph(`p-${index}`);
        const titleText = trimmed.replace(/^##\s*/, '');
        blocks.push(
          <div key={`h2-${index}`} className="flex items-center gap-2 pt-2 pb-1 mb-2 border-b border-[#F0E6FA]">
            <CuteStickerSparkle size={14} color="#8A73B5" />
            <h3 className="font-montserrat text-lg sm:text-xl font-bold text-[#1E152E]">
              {titleText}
            </h3>
          </div>
        );
        return;
      }

      // Subheading ###
      if (trimmed.startsWith('### ')) {
        flushParagraph(`p-${index}`);
        const subText = trimmed.replace(/^###\s*/, '');
        blocks.push(
          <div
            key={`h3-${index}`}
            className="flex items-center gap-2 mt-5 mb-2.5 font-montserrat text-sm sm:text-base font-bold text-[#241B34] bg-[#F9F5FD] px-3.5 py-2 rounded-xl border border-[#EFE5FA] shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-[#8A73B5]" />
            <span>{formatTextWithBold(subText)}</span>
          </div>
        );
        return;
      }

      // Blockquote >
      if (trimmed.startsWith('>')) {
        flushParagraph(`p-${index}`);
        const quoteText = trimmed.replace(/^>\s*/, '');
        blocks.push(
          <div
            key={`quote-${index}`}
            className="my-4 pl-4 sm:pl-5 border-l-4 border-[#1E3A5F] bg-[#FAF8FE] p-4 sm:p-5 rounded-r-2xl border-t border-r border-b border-[#E3D9F0] shadow-xs"
          >
            <div className="font-montserrat text-xs font-bold text-[#1E3A5F] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>✦</span>
              <span>{isVi ? 'Thông điệp chuyển hóa' : 'Reflective Wisdom'}</span>
            </div>
            <p className="text-[13.5px] sm:text-[14.5px] font-nunito text-[#1E293B] leading-relaxed italic">
              "{formatTextWithBold(quoteText)}"
            </p>
          </div>
        );
        return;
      }

      currentParagraph.push(trimmed);
    });

    flushParagraph('final');
    return blocks;
  };

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
          {renderFormattedReading()}
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

          {onShare && (
            <button
              id="btn-reading-share"
              onClick={() => {
                sound.playChime();
                onShare(reading);
              }}
              className="px-5 py-2.5 rounded-full bg-[#241B34] hover:bg-[#150E22] text-white text-xs font-bold font-montserrat border border-[#3E2F59] shadow-sm flex items-center gap-2.5 transition-transform hover:-translate-y-0.5 cursor-pointer ml-auto"
            >
              <NotebookStickerAvatar size={20} expression="happy" tilt={-2} tapeColor="lavender" />
              <Share2 className="w-3.5 h-3.5 text-white" />
              <span>{isVi ? 'Chia sẻ quẻ bài' : 'Share reading'}</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
