import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Sparkles, Heart } from 'lucide-react';
import {
  OwlSilhouetteMascot,
  CuteStickerBow,
  CuteStickerSparkle,
  RhinestoneGem,
  ScallopStampEdge,
  NotebookStickerAvatar,
  WashiTape
} from './OwlMotifs';
import { Language } from '../types';
import { norm } from '../utils/text';

interface MascotModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const MascotModal: React.FC<MascotModalProps> = ({ isOpen, onClose, language = 'en' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur with soft tone */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#2C1D44]/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            className="relative w-full max-w-lg rounded-[24px] bg-[#FFFFFF] border border-[#E8DEF2] shadow-[0_20px_50px_rgba(85,40,125,0.20)] p-6 sm:p-8 z-10 text-[#241B34]"
          >
            {/* Scalloped Stamp Edge */}
            <ScallopStampEdge position="top" fillColor="#FFFFFF" strokeColor="#E2D7EE" />
            <ScallopStampEdge position="bottom" fillColor="#FFFFFF" strokeColor="#E2D7EE" />

            {/* Top washi tape accent - Petite, Authentic & Centered */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <WashiTape color="peach" width={50} height={8} tilt={-0.6} />
            </div>

            {/* Subtle corner sparkle & gem */}
            <div className="absolute top-3 right-12 z-20 hidden sm:flex items-center gap-1.5">
              <RhinestoneGem type="diamond" color="purple" size={14} twinkle={true} />
              <RhinestoneGem type="star" color="yellow" size={13} />
            </div>

            {/* Close button */}
            <button
              id="btn-close-mascot-modal"
              onClick={onClose}
              className="absolute top-3.5 right-4 w-7 h-7 rounded-full bg-[#FAF7FD] hover:bg-[#F2EAFA] text-[#5E5373] flex items-center justify-center transition-colors cursor-pointer border border-[#E3D9F0]"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Mascot Avatar Header */}
            <div className="flex items-center gap-3.5 mb-5 mt-2">
              <NotebookStickerAvatar size={48} expression="happy" tilt={-3} tapeColor="peach" />
              <div>
                <div className="text-xs font-montserrat font-bold text-[#1E3A5F] flex items-center gap-1">
                  <span>✦</span>
                  <span>{norm(language === 'vi' ? 'ITSC Tarot • Chiêm Nghiệm & Chữa Lành' : 'ITSC Tarot • Gentle Psychological Insight')}</span>
                </div>
                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-[#1E152E] mt-0.5">
                  {norm(language === 'vi' ? 'Tarot như chiếc gương soi sáng tâm trí' : 'Tarot as a Reflective Mental Mirror')}
                </h3>
              </div>
            </div>

            {/* Content Points in Clean 5-tone Blocks */}
            <div className="space-y-3 text-xs sm:text-sm text-[#332847] leading-relaxed font-nunito">
              <div className="p-3.5 rounded-xl bg-[#FAF7FD] border border-[#E7DEEE]">
                <div className="font-montserrat text-sm font-bold text-[#241B34] flex items-center gap-1.5 mb-1">
                  <span>✦</span>
                  <span>
                    {norm(language === 'vi' ? 'Chiêm nghiệm tương phản sâu sắc' : 'Dual-contrast Reflection')}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#4A3D62] leading-relaxed font-normal">
                  {norm(language === 'vi'
                    ? 'ITSC Tarot đối chiếu giữa "Vẻ bề ngoài (những lo âu, suy diễn nhất thời)" và "Bản chất thực sự" để giúp bạn thả lỏng tâm trí và nhìn nhận rõ ràng.'
                    : 'Pairs "what it looks like" against "what it really is" to help you decouple temporary anxiety from core truth.')}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F6F9FD] border border-[#D7E4F5]">
                <div className="font-montserrat text-sm font-bold text-[#1E3A5F] flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#1E3A5F]" />
                  <span>
                    {norm(language === 'vi' ? 'Luận giải tâm lý tích cực & Tỉnh thức' : 'Uplifting Psychological Insight')}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#334E68] leading-relaxed font-normal">
                  {norm(language === 'vi'
                    ? 'Hỗ trợ bởi trí tuệ nhân tạo Gemini 2.5 với tinh thần thấu cảm, không phán đoán số phận, không mê tín — thuần túy là lời gợi mở bình yên cho tâm trí.'
                    : 'Powered by Gemini AI with warm empathy. Zero superstitious predictions — only reassuring mindfulness for your everyday decisions.')}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8FE] border border-[#E8DEF2]">
                <div className="font-montserrat text-sm font-bold text-[#4A3866] flex items-center gap-1.5 mb-1">
                  <Volume2 className="w-3.5 h-3.5 text-[#4A3866]" />
                  <span>
                    {norm(language === 'vi' ? 'Âm thanh êm ái & Thư giãn' : 'Gentle Synthesized Sounds')}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#4A3D62] leading-relaxed font-normal">
                  {norm(language === 'vi'
                    ? 'Âm thanh lật xào bài mộc mạc kết hợp những tiếng chuông êm dịu mang lại cảm giác bình yên và tập trung.'
                    : 'Whisper-quiet card sounds and soothing ambient chords synthesized live in your browser to bring peace to your mind.')}
                </p>
              </div>
            </div>

            {/* Dismiss button */}
            <div className="mt-6 flex justify-end">
              <button
                id="btn-dismiss-mascot-modal"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#241B34] hover:bg-[#150E22] border border-[#3E2F59] text-white text-xs font-bold font-montserrat transition-all cursor-pointer shadow-sm hover:-translate-y-0.5"
              >
                {norm(language === 'vi' ? 'Bắt đầu chiêm nghiệm ✦' : 'Start Reading ✦')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
