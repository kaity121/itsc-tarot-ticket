import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TarotShareCard } from './TarotShareCard';
import { fetchReading, TarotReadingTicketData } from '../utils/readingStorage';
import { OwlSilhouetteMascot, CuteStickerSparkle, NotebookStickerAvatar } from './OwlMotifs';
import { ArrowLeft, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface PublicTicketViewProps {
  readingId: string;
  onNavigateHome?: () => void;
}

export const PublicTicketView: React.FC<PublicTicketViewProps> = ({
  readingId,
  onNavigateHome,
}) => {
  const [reading, setReading] = useState<TarotReadingTicketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetchReading(readingId)
      .then((data) => {
        if (isMounted) {
          setReading(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('[PublicTicketView] Fetch error:', err);
          if (err.message === 'NOT_FOUND') {
            setError('Vé lưu niệm không tồn tại hoặc đã bị xóa.');
          } else {
            setError('Không thể kết nối máy chủ để tải vé lưu niệm. Vui lòng thử lại sau.');
          }
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [readingId]);

  const handleGoHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.href = '/';
    }
  };

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const qrUrl = `${currentOrigin}/ticket/${readingId}`;

  return (
    <div className="min-h-screen bg-[#160E24] text-white flex flex-col items-center justify-between p-4 sm:p-8 relative overflow-x-hidden selection:bg-[#6B4FA0] selection:text-white">
      {/* Mystical Background Ambient Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#6B4FA0]/30 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[15%] w-[550px] h-[550px] rounded-full bg-[#341F52]/40 blur-[140px]" />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-10 w-full max-w-[980px] mx-auto flex items-center justify-between py-3 px-2 mb-4 border-b border-[#6B4FA0]/30">
        <button
          onClick={handleGoHome}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-montserrat font-semibold text-[#E4D2FA] border border-white/10 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#C9A6F2]" />
          <span>Trang chủ ITSC Tarot</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#2A1847] flex items-center justify-center border border-[#6B4FA0]/50 shadow-xs">
            <OwlSilhouetteMascot size={18} expression="happy" showStickerShadow={false} />
          </div>
          <span className="font-montserrat font-bold text-xs text-[#E4D2FA] tracking-wide hidden sm:inline">
            Vé Lưu Niệm Công Khai
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-[980px] mx-auto flex-1 flex flex-col items-center justify-center my-4">
        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 px-8 rounded-3xl bg-[#24173D]/80 border border-[#6B4FA0]/40 backdrop-blur-md shadow-2xl text-center max-w-md w-full"
          >
            <div className="relative mb-5">
              <div className="w-16 h-16 rounded-full bg-[#341F52] border border-[#8A68C8]/50 flex items-center justify-center animate-pulse shadow-lg">
                <OwlSilhouetteMascot size={40} expression="happy" showStickerShadow={false} />
              </div>
              <div className="absolute -top-1 -right-1">
                <CuteStickerSparkle size={20} color="#D8B4FE" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-montserrat font-bold text-[#E4D2FA] mb-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#C9A6F2]" />
              <span>Đang mở lại Vé Lưu Niệm...</span>
            </div>
            <p className="text-xs font-nunito text-[#B8A4D6] max-w-xs">
              Đang đối chiếu dữ liệu quẻ bài #{readingId} từ không gian lưu trữ Bé Cú.
            </p>
          </motion.div>
        )}

        {/* Error / Not Found State */}
        {!isLoading && error && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 px-8 rounded-3xl bg-[#24173D]/90 border border-red-500/30 backdrop-blur-md shadow-2xl text-center max-w-md w-full"
          >
            <div className="w-14 h-14 rounded-full bg-red-950/40 border border-red-500/40 flex items-center justify-center mb-4 text-red-400">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="text-base font-montserrat font-bold text-white mb-2">
              Không tìm thấy Vé Quẻ Bài
            </h2>
            <p className="text-xs font-nunito text-[#B8A4D6] mb-6 max-w-xs leading-relaxed">
              {error}
            </p>
            <button
              onClick={handleGoHome}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6B4FA0] to-[#8A68C8] hover:from-[#5C3F90] hover:to-[#7E57C2] text-white text-xs font-bold font-montserrat shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E4D2FA]" />
              <span>Tạo quẻ bài mới của riêng bạn</span>
            </button>
          </motion.div>
        )}

        {/* Success State: Renders TarotShareCard */}
        {!isLoading && reading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center"
          >
            <TarotShareCard
              readingId={reading.readingId}
              question={reading.question}
              spreadType={reading.spreadType}
              cards={reading.cards}
              manifestText={reading.manifestText}
              qrUrl={qrUrl}
              userName={reading.userName}
              dateTime={reading.dateTime}
              language={reading.language}
              inline={true}
            />

            {/* Bottom Invitation to Draw Reading */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleGoHome}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6B4FA0] via-[#855EC8] to-[#9D6ED8] hover:from-[#5C3F90] hover:to-[#8E5EC4] text-white text-xs font-bold font-montserrat border border-[#BFA2E8]/40 shadow-lg flex items-center gap-2 transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E4D2FA]" />
                <span>✦ Rút quẻ bài cho riêng bạn cùng Bé Cú</span>
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-[980px] mx-auto text-center py-4 mt-8 border-t border-[#6B4FA0]/20">
        <div className="flex items-center justify-center gap-2 mb-1">
          <NotebookStickerAvatar size={20} expression="happy" tilt={-2} tapeColor="peach" />
          <span className="font-montserrat font-bold text-xs text-[#E4D2FA]">
            ITSC Tarot • Bé Cú Đồng Hành
          </span>
        </div>
        <p className="font-nunito text-[11px] text-[#A08EC0]">
          Không gian chiêm nghiệm và lưu giữ thông điệp tâm lý tích cực.
        </p>
      </footer>
    </div>
  );
};
