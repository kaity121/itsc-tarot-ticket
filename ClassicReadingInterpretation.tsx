import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { DrawnTarotCard, TarotReadingResponse, Language } from '../types';
import { OwlSilhouetteMascot } from './OwlMotifs';
import { RefreshCw, Share2, Ticket, MessageSquarePlus } from 'lucide-react';
import { sound } from '../utils/audio';
import { translations } from '../utils/i18n';
import { TarotShareCard, TarotCardShareItem } from './TarotShareCard';

export interface ClassicReadingInterpretationProps {
  reading: TarotReadingResponse | null;
  cards: (DrawnTarotCard | null)[];
  question: string;
  language?: Language;
  isLoadingAI: boolean;
  getPositionLabel: (index: number) => string;
  onShare?: (summary: string) => void;
  onReset?: () => void;
}

export const ClassicReadingInterpretation: React.FC<ClassicReadingInterpretationProps> = ({
  reading,
  cards,
  question,
  language = 'vi',
  isLoadingAI,
  getPositionLabel,
  onShare,
  onReset
}) => {
  const t = translations[language];
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Generate consistent reading code
  const activeReadingId = useMemo(() => {
    return 'ITSC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }, []);

  const shareCards: TarotCardShareItem[] = useMemo(() => {
    return cards
      .filter((c): c is DrawnTarotCard => c !== null)
      .map((c, i) => ({
        name: c.name,
        nameVi: c.nameVi,
        reversed: c.orientation === 'reversed',
        positionLabel: getPositionLabel(i),
        suit: c.suit,
        image: c.image
      }));
  }, [cards, getPositionLabel]);

  return (
    <motion.div
      id="classic-interpretation-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-[1300px] mt-6"
    >
      {/* ========================================================================= */}
      {/* KHỐI LUẬN GIẢI TÂM LÝ TỪ BÉ CÚ (CLASSIC SPREAD INTERPRETATION) */}
      {/* ========================================================================= */}
      <div className="rounded-[24px] bg-white border border-[#E7DEEE] p-6 sm:p-8 shadow-[0_12px_36px_rgba(45,30,70,0.08)]">
        
        {/* 1. Header: Avatar Bé Cú + Tiêu đề + Badge nguồn "Gemini ✦" */}
        <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#F0E6FA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EDE5F7] flex items-center justify-center border border-[#DCCEEF] shadow-xs">
              <OwlSilhouetteMascot size={24} expression="happy" showStickerShadow={false} />
            </div>
            <h4 className="font-fraunces text-lg sm:text-xl font-semibold text-[#1E152E]">
              {language === 'vi' ? 'Luận giải tâm lý từ Bé Cú' : 'Owl Mascot Psychological Interpretation'}
            </h4>
          </div>

          {isLoadingAI ? (
            <span className="text-xs text-[#71618A] animate-pulse flex items-center gap-1.5 font-nunito font-bold">
              <RefreshCw className="w-3 h-3 animate-spin text-[#8A73B5]" />
              {language === 'vi' ? 'Bé Cú đang luận giải...' : 'owl is thinking...'}
            </span>
          ) : (
            <span className="text-xs px-3.5 py-1 rounded-full bg-[#E5EFFB] text-[#1E3A5F] font-nunito font-bold border border-[#D0E0F3]">
              {reading?.source === 'gemini' ? 'Gemini ✦' : (language === 'vi' ? 'Tuệ Giác Cú' : 'Curated Insight')}
            </span>
          )}
        </div>

        {/* Shimmer loading state while AI is thinking (Phương án 1) */}
        {isLoadingAI && !reading && (
          <div className="space-y-4 animate-pulse py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-32 rounded-xl bg-[#FAF7FD] border border-[#E7DEEE] p-4 flex flex-col justify-between">
                  <div className="h-4 bg-[#EDE5F7] rounded w-2/3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#F0EAF8] rounded w-full"></div>
                    <div className="h-3 bg-[#F0EAF8] rounded w-4/5"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-16 rounded-xl bg-[#F9F7FC] border border-[#EAE2F3] p-4">
              <div className="h-3.5 bg-[#EDE5F7] rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-[#F0EAF8] rounded w-1/2"></div>
            </div>
            <div className="h-14 rounded-xl bg-[#F2F6FC] border-l-3 border-[#1E3A5F] p-3">
              <div className="h-3.5 bg-[#DCE7F5] rounded w-1/3 mb-1.5"></div>
              <div className="h-3 bg-[#EAF0F9] rounded w-2/3"></div>
            </div>
          </div>
        )}

        {reading && (
          <div className="space-y-4">
            {/* 2. Lưới 3 ô phân tích từng vị trí lá bài (Quá khứ / Hiện tại / Tương lai) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {cards.map((c, i) => {
                if (!c) return null;
                const blockBgs = [
                  'bg-[#F7F4FC] border-[#E7DEEE]',
                  'bg-[#F1F6FD] border-[#D7E4F5]',
                  'bg-[#F4F1FA] border-[#DFD5EF]'
                ];
                const tagColors = ['text-[#241B34]', 'text-[#1E3A5F]', 'text-[#4A3866]'];
                
                return (
                  <div key={i} className={`p-4 rounded-xl border ${blockBgs[i % 3]} shadow-xs`}>
                    {/* Tên vị trí (Cội Nguồn Quá Khứ / Thực Tại Hôm Nay / Khuynh Hướng Tương Lai) & Tên lá bài */}
                    <div className="flex items-center justify-between font-nunito text-xs font-bold mb-1.5">
                      <span className={tagColors[i % 3]}>{getPositionLabel(i)}</span>
                      <span className="text-[#5E5373] text-xs font-bold">
                        {language === 'vi' && c.nameVi ? c.nameVi : c.name}
                      </span>
                    </div>
                    {/* Đoạn phân tích lá bài từ Gemini */}
                    <p className="text-xs sm:text-[13px] text-[#332847] leading-relaxed font-nunito font-normal">
                      {reading.cardBreakdown?.[c.name] || (c.nameVi && reading.cardBreakdown?.[c.nameVi]) || (language === 'vi' ? c.summaryVi : c.summary)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* 3. Đoạn Luận Giải Tổng Quan (Font Cormorant Garamond in nghiêng) */}
            {reading.interpretation && (
              <div className="p-4 rounded-xl bg-[#F9F7FC] border border-[#EAE2F3] text-sm sm:text-base text-[#241B34] leading-relaxed font-cormorant italic">
                <span className="font-nunito font-bold text-[#1E152E] mr-1.5 not-italic">✦ Tổng quan:</span>
                "{reading.interpretation}"
              </div>
            )}

            {/* 4. Hành Động Tĩnh Tâm (Takeaway hành động thực tế viền xanh dương) */}
            <div className="pt-2">
              <div className="font-fraunces text-sm font-semibold text-[#1E152E] mb-1.5 flex items-center gap-2">
                <span className="text-[#1E3A5F]">✦</span>
                <span>{t.actionableTakeaway}</span>
              </div>
              <p className="text-xs sm:text-[13px] font-nunito font-normal text-[#1E293B] leading-relaxed pl-4 border-l-3 border-[#1E3A5F] bg-[#F2F6FC] p-3 rounded-r-xl">
                "{reading.takeaway}"
              </p>
            </div>

            {/* 5. Tiện ích: Đặt câu hỏi khác, Vé Lưu Niệm & Sao chép chữ (giữ cũ) */}
            <div className="mt-6 pt-4 border-t border-[#F0E6FA] flex items-center justify-between gap-2.5 flex-wrap">
              {onReset && (
                <button
                  id="btn-classic-ask-another"
                  onClick={() => {
                    sound.playCardFlip();
                    onReset();
                  }}
                  className="px-4 py-2 rounded-full bg-white hover:bg-[#FAF7FD] text-xs font-bold font-montserrat text-[#574673] border border-[#E3D9F0] shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>{language === 'vi' ? 'Đặt câu hỏi khác' : 'Ask another question'}</span>
                </button>
              )}

              <div className="flex items-center gap-2.5 ml-auto flex-wrap">
                <button
                  id="btn-classic-reading-ticket"
                  onClick={() => {
                    sound.playChime();
                    setIsTicketModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#6B4FA0] via-[#855EC8] to-[#9D6ED8] hover:from-[#5C3F90] hover:to-[#8E5EC4] text-white text-xs font-bold font-montserrat border border-[#BFA2E8]/50 shadow-xs flex items-center gap-1.5 cursor-pointer transition-transform hover:-translate-y-0.5"
                >
                  <Ticket className="w-3.5 h-3.5 text-[#E4D2FA]" />
                  <span>{language === 'vi' ? 'Vé Lưu Niệm ✦' : 'Reading Ticket ✦'}</span>
                </button>

                {onShare && (
                  <button
                    id="btn-classic-reading-share"
                    onClick={() => {
                      sound.playChime();
                      const summary = [
                        `${language === 'vi' ? 'Luận giải tâm lý từ Bé Cú' : 'Owl Mascot Psychological Interpretation'} - "${question}"`,
                        ...cards.map((c, idx) => (c ? `${getPositionLabel(idx)}: ${language === 'vi' && c.nameVi ? c.nameVi : c.name}\n${reading.cardBreakdown?.[c.name] || (c.nameVi && reading.cardBreakdown?.[c.nameVi]) || (language === 'vi' ? c.summaryVi : c.summary)}` : '')).filter(Boolean),
                        `${language === 'vi' ? '✦ Tổng quan' : '✦ Synthesis'}: ${reading.interpretation}`,
                        `${language === 'vi' ? '✦ Hành động tĩnh tâm' : '✦ Takeaway'}: ${reading.takeaway}`
                      ].join('\n\n');
                      onShare(summary);
                    }}
                    className="px-4 py-2 rounded-full bg-[#241B34] hover:bg-[#150E22] text-white text-xs font-bold font-montserrat flex items-center gap-1.5 cursor-pointer transition-transform hover:-translate-y-0.5 border border-[#3E2F59] shadow-xs"
                  >
                    <Share2 className="w-3.5 h-3.5 text-white" />
                    <span>{language === 'vi' ? 'Sao chép chữ' : 'Copy Text'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Vé Lưu Niệm */}
      {isTicketModalOpen && (
        <TarotShareCard
          readingId={activeReadingId}
          question={question}
          spreadType="3"
          cards={shareCards}
          manifestText={reading?.takeaway || reading?.interpretation || question}
          qrUrl={typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : ''}
          userName={language === 'vi' ? 'Người Bói Ẩn Danh' : 'Mystic Seeker'}
          language={language}
          onClose={() => setIsTicketModalOpen(false)}
        />
      )}
    </motion.div>
  );
};
