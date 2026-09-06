import React from 'react';
import { motion } from 'motion/react';
import { ReadingMode, Language } from '../types';
import { Moon, Volume2, VolumeX, Globe } from 'lucide-react';
import { sound } from '../utils/audio';
import { OwlEyeMotif, OwlSilhouetteMascot, CuteStickerSparkle, RhinestoneGem, NotebookStickerAvatar } from './OwlMotifs';
import { translations } from '../utils/i18n';

interface NavbarProps {
  currentMode: ReadingMode;
  onSelectMode: (mode: ReadingMode) => void;
  isAmbientPlaying: boolean;
  onToggleAmbient: () => void;
  onOpenHelp: () => void;
  onShare: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  isAmbientPlaying,
  onToggleAmbient,
  onOpenHelp,
  onShare,
  language,
  onSelectLanguage
}) => {
  const t = translations[language];

  return (
    <header className="w-full max-w-[1300px] mx-auto pt-5 pb-1 px-4 sm:px-8 flex items-center justify-between z-30 relative">
      {/* Brand Logo & Subtitle matching ITSC Owl Identity */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="relative">
          {/* Polaroid / Notebook Sticker Avatar for Header */}
          <NotebookStickerAvatar size={42} expression="sleepy" tilt={-2} tapeColor="peach" />
          {/* Rhinestone Star Gem next to header mascot */}
          <div className="absolute -top-1.5 -right-1.5 z-20 pointer-events-none">
            <RhinestoneGem type="star" color="purple" size={13} twinkle={true} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-montserrat tracking-tight text-xl sm:text-2xl font-extrabold text-[#1E152E] leading-tight">
              ITSC Tarot
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF4ED] border border-[#E7DEEE] text-[11px] font-montserrat font-bold text-[#1E3A5F] shadow-xs">
              <span className="font-montserrat font-bold">Arcanex</span>
              <RhinestoneGem type="diamond" color="blue" size={11} />
            </span>
          </div>
          <span className="text-[13px] text-[#5E5373] font-montserrat italic font-medium hidden md:inline-block">
            {language === 'vi' ? 'Chiêm nghiệm cùng Bé Cú Đêm' : 'Gentle mindful tarot with Owl Mascot'}
          </span>
        </div>
      </div>

      {/* Mode Switcher: Elegant Charcoal & Lavender Pills */}
      <div id="nav-mode-switcher" className="p-1 rounded-full bg-white border border-[#E3D9F0] shadow-xs flex items-center gap-1">
        <button
          id="btn-mode-daily"
          onClick={() => {
            sound.playCardFlip();
            onSelectMode('daily');
          }}
          className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold font-nunito transition-all duration-200 cursor-pointer ${
            currentMode === 'daily'
              ? 'bg-[#241B34] text-white shadow-xs'
              : 'text-[#615477] hover:text-[#1E152E]'
          }`}
        >
          {t.dailyContrast}
        </button>
        <button
          id="btn-mode-classic"
          onClick={() => {
            sound.playCardFlip();
            onSelectMode('classic');
          }}
          className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold font-nunito transition-all duration-200 cursor-pointer ${
            currentMode === 'classic'
              ? 'bg-[#241B34] text-white shadow-xs'
              : 'text-[#615477] hover:text-[#1E152E]'
          }`}
        >
          {t.classicSpread}
        </button>
      </div>

      {/* Controls & Nocturnal Mascot Avatar */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Language Switcher (EN / VI) */}
        <div id="nav-language-toggle" className="p-0.5 rounded-full bg-white border border-[#E3D9F0] shadow-xs flex items-center">
          <button
            id="btn-lang-en"
            onClick={() => {
              sound.playCardFlip();
              onSelectLanguage('en');
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold font-nunito transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-[#241B34] text-white'
                : 'text-[#615477] hover:text-[#1E152E]'
            }`}
          >
            EN
          </button>
          <button
            id="btn-lang-vi"
            onClick={() => {
              sound.playCardFlip();
              onSelectLanguage('vi');
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold font-nunito transition-all cursor-pointer ${
              language === 'vi'
                ? 'bg-[#241B34] text-white'
                : 'text-[#615477] hover:text-[#1E152E]'
            }`}
          >
            VI
          </button>
        </div>

        {/* Ambient Sound Toggle */}
        <motion.button
          id="btn-toggle-ambient"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleAmbient}
          title={isAmbientPlaying ? (language === 'vi' ? 'Tắt âm hưởng' : 'Silence music') : (language === 'vi' ? 'Bật âm nhạc thư giãn' : 'Play cute ambient music')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold font-nunito border transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
            isAmbientPlaying
              ? 'bg-[#E5EFFB] text-[#1E3A5F] border-[#CDE0F7]'
              : 'bg-white text-[#615477] border-[#E3D9F0] hover:bg-[#FAF7FD]'
          }`}
        >
          {isAmbientPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#1E3A5F] animate-pulse" />
              <span className="hidden lg:inline text-[11px]">{language === 'vi' ? 'Nhạc êm' : 'Music'}</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 opacity-60 text-[#6B5E87]" />
              <span className="hidden lg:inline text-[11px]">{language === 'vi' ? 'Tắt nhạc' : 'Muted'}</span>
            </>
          )}
        </motion.button>

        {/* Mascot Avatar - Click for Help / Mascot Profile */}
        <motion.div
          id="btn-mascot-avatar"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onOpenHelp}
          title={language === 'vi' ? 'Bé Cú Đêm ITSC • Bấm để xem thông tin' : 'ITSC Owl Mascot • Click for Info'}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#E3D9F0] shadow-xs flex items-center justify-center cursor-pointer overflow-hidden group"
        >
          <OwlSilhouetteMascot size={26} expression="chill" showStickerShadow={false} />
        </motion.div>
      </div>
    </header>
  );
};
