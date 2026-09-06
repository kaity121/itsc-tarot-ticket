import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { DailySpread } from './components/DailySpread';
import { ClassicSpread } from './components/ClassicSpread';
import { MascotModal } from './components/MascotModal';
import { ReadingMode, Language } from './types';
import { sound } from './utils/audio';
import { HelpCircle, Send } from 'lucide-react';
import { CuteStickerSparkle, OwlSilhouetteMascot, NotebookStickerAvatar } from './components/OwlMotifs';

export default function App() {
  const [currentMode, setCurrentMode] = useState<ReadingMode>('daily');
  const [language, setLanguage] = useState<Language>('vi'); // Vietnamese requested by user
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleToggleAmbient = () => {
    const newState = sound.toggleAmbient();
    setIsAmbientPlaying(newState);
    if (newState) {
      setToastMessage(language === 'vi' ? "Đã bật nhạc nền êm dịu ✨" : "Soothing ambient soundscape started ✨");
    } else {
      setToastMessage(language === 'vi' ? "Đã tạm dừng âm thanh" : "Ambient sound paused");
    }
  };

  const handleShare = async (content?: string) => {
    const defaultText = language === 'vi'
      ? "✦ ITSC Tarot — Không gian chiêm nghiệm tâm lý tích cực mỗi ngày cùng Bé Cú!"
      : "✦ ITSC Tarot — Daily psychological perspective & mindfulness with Owl Mascot!";
    const shareText = content || defaultText;
    sound.playChime();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setToastMessage(language === 'vi' ? "Đã sao chép quẻ bài vào bộ nhớ tạm ✦" : "Reading copied to clipboard ✦");
      } else {
        setToastMessage(language === 'vi' ? "Sẵn sàng để chia sẻ quẻ bài" : "Reading ready to share");
      }
    } catch {
      setToastMessage(language === 'vi' ? "Đã ghi nhận quẻ bài" : "Reading captured");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9FD] relative flex flex-col justify-between overflow-x-hidden selection:bg-[#241B34] selection:text-white">
      {/* 5-Tone Ambient Blobs: Pastel Lavender, Subtle Blue, and Soft Charcoal/Gray */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full bg-[#EDE6F8]/60 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[650px] h-[650px] rounded-full bg-[#E5EFFB]/50 blur-[140px]" />
        <div className="absolute top-[35%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#EDE6F8]/40 blur-[120px]" />
        <div className="absolute top-[50%] left-[-8%] w-[450px] h-[450px] rounded-full bg-[#E5EFFB]/40 blur-[120px]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Top Navbar */}
        <Navbar
          currentMode={currentMode}
          onSelectMode={(mode) => setCurrentMode(mode)}
          isAmbientPlaying={isAmbientPlaying}
          onToggleAmbient={handleToggleAmbient}
          onOpenHelp={() => setIsHelpOpen(true)}
          onShare={() => handleShare()}
          language={language}
          onSelectLanguage={(lang) => {
            setLanguage(lang);
            setToastMessage(lang === 'vi' ? "Đã chuyển sang Tiếng Việt" : "Switched to English");
          }}
        />

        {/* Dynamic Spread Content */}
        <main className="flex-1 flex flex-col items-center justify-center w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 py-3">
          <AnimatePresence mode="wait">
            {currentMode === 'daily' ? (
              <motion.div
                key={`daily-${language}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <DailySpread onShare={handleShare} language={language} />
              </motion.div>
            ) : (
              <motion.div
                key={`classic-${language}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <ClassicSpread onShare={handleShare} language={language} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Cozy Pixel-World Scrapbook Footer */}
        <footer className="w-full max-w-[1300px] mx-auto mt-14 mb-8 px-4 sm:px-8 relative z-10">
          <div className="cozy-polka-bg rounded-[24px] border border-[#E8DEF2] p-6 sm:p-7 text-center relative overflow-hidden shadow-xs">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <NotebookStickerAvatar size={24} expression="happy" tilt={-2} tapeColor="peach" />
              <span className="font-montserrat font-bold text-xs text-[#241B34] tracking-wide">
                ITSC Tarot • Bé Cú Đồng Hành
              </span>
            </div>
            <p className="font-nunito text-[12px] text-[#6E6285] max-w-md mx-auto">
              {language === 'vi'
                ? 'Không gian chiêm nghiệm và chữa lành nhẹ nhàng mỗi ngày cùng Bé Cú.'
                : 'A gentle reflective sanctuary for daily mindfulness with Owl Mascot.'}
            </p>
          </div>
        </footer>
      </div>

      {/* Floating Action Buttons at bottom right */}
      <div id="floating-actions-container" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Help / Guide Circle Button */}
        <motion.button
          id="btn-help-guide"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            sound.playCardFlip();
            setIsHelpOpen(true);
          }}
          title={language === 'vi' ? 'Sổ tay Bé Cú & Hướng dẫn' : 'Owl Mascot Diary & Guide'}
          className="w-11 h-11 rounded-full bg-white hover:bg-[#FAF7FD] text-[#241B34] border border-[#E2D7F0] shadow-sm flex items-center justify-center transition-all cursor-pointer"
        >
          <HelpCircle className="w-5 h-5 stroke-[2]" />
        </motion.button>

        {/* Share Button with synced Avatar style */}
        <motion.button
          id="btn-floating-share"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => handleShare()}
          title={language === 'vi' ? 'Chia sẻ quẻ bài' : 'Share reading'}
          className="w-11 h-11 rounded-full bg-[#241B34] hover:bg-[#150E22] text-white border border-[#3E2F59] shadow-sm flex items-center justify-center transition-all cursor-pointer overflow-hidden p-1"
        >
          <NotebookStickerAvatar size={24} expression="happy" tilt={-2} tapeColor="lavender" />
        </motion.button>
      </div>

      {/* Philosophy & Guide Modal */}
      <MascotModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} language={language} />

      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-white text-[#1E152E] text-xs font-bold font-nunito border border-[#E3D9F0] shadow-[0_8px_25px_rgba(45,30,70,0.12)] flex items-center gap-2.5"
          >
            <div className="w-5 h-5 rounded-full bg-[#EDE5F7] flex items-center justify-center">
              <OwlSilhouetteMascot size={14} expression="happy" showStickerShadow={false} />
            </div>
            <span>{toastMessage}</span>
            <CuteStickerSparkle size={14} color="#8A73B5" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
