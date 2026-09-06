import React, { useState } from 'react';
import { motion } from 'motion/react';

/**
 * ITSC Owl Mascot - EXACT match to user's uploaded reference image (image.png):
 * - Dark charcoal/graphite rounded pill head and body
 * - Sleepy/chill closed eyes (⌒ ⌒) or cute wide curious eyes
 * - Slate gray triangular beak
 * - Black crewneck shirt with white geometric ITSC chest logo
 * - Crossed wings over chest with 6-7 fanning feather tips on each side
 * - Slender bird legs with 3-toed feet
 * - Crisp thick white die-cut sticker border with soft drop shadow!
 */
export interface OwlMascotProps {
  className?: string;
  size?: number;
  isShuffling?: boolean;
  eyesGlow?: boolean;
  expression?: 'chill' | 'curious' | 'surprised' | 'happy' | 'sleepy' | 'shy';
  showStickerShadow?: boolean;
}

export const OwlSilhouetteMascot: React.FC<OwlMascotProps> = ({
  className = 'w-10 h-10',
  size = 48,
  isShuffling = false,
  expression = 'curious',
  showStickerShadow = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const activeExpr = isHovered ? 'curious' : (isShuffling ? 'surprised' : expression);

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={
          isShuffling
            ? {
                y: [0, -6, 0],
                rotate: [0, -3, 3, 0],
                transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
              }
            : isHovered
            ? {
                y: -3,
                scale: 1.05,
                transition: { duration: 0.2 }
              }
            : {
                y: [0, -2, 0],
                transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
              }
        }
        className="w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 160 170"
          className="w-full h-full overflow-visible"
          style={{
            filter: showStickerShadow
              ? 'drop-shadow(0 8px 16px rgba(95, 80, 130, 0.16)) drop-shadow(0 2px 4px rgba(0,0,0,0.06))'
              : undefined
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ================= THICK WHITE DIE-CUT STICKER BORDER ================= */}
          <g stroke="#FFFFFF" strokeWidth="12" strokeLinejoin="round" strokeLinecap="round" fill="#FFFFFF">
            {/* Outer Head & Body Silhouette */}
            <path d="M 64 24 C 64 12, 96 12, 96 24 L 98 56 C 108 58, 120 72, 124 96 C 122 108, 114 118, 102 118 L 96 118 L 93 148 L 98 152 M 93 148 L 93 154 M 93 148 L 88 152 M 67 148 L 72 152 M 67 148 L 67 154 M 67 148 L 62 152 L 64 118 L 58 118 C 46 118, 38 108, 36 96 C 40 72, 52 58, 62 56 Z" />
            {/* Wing Feather Clusters Left & Right */}
            <path d="M 44 80 L 32 94 L 38 88 L 33 102 L 39 96 L 36 109 L 43 103 L 42 114 L 49 107 L 50 115 L 56 105" />
            <path d="M 116 80 L 128 94 L 122 88 L 127 102 L 121 96 L 124 109 L 117 103 L 118 114 L 111 107 L 110 115 L 104 105" />
            {/* Feet Spreads */}
            <path d="M 67 132 L 65 152 L 56 156 M 65 152 L 66 157 M 65 152 L 72 154" />
            <path d="M 93 132 L 95 152 L 88 154 M 95 152 L 94 157 M 95 152 L 104 156" />
          </g>

          {/* ================= MAIN CHARACTER BODY ================= */}
          {/* Slender Bird Legs */}
          <path d="M 68 126 L 66 150 M 66 150 L 58 154 M 66 150 L 66 155 M 66 150 L 72 153" stroke="#1C1D21" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 92 126 L 94 150 M 94 150 L 88 153 M 94 150 L 94 155 M 94 150 L 102 154" stroke="#1C1D21" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Torso / Lower Body (Charcoal Black) */}
          <path
            d="M 64 88 L 96 88 C 96 108, 94 128, 92 132 C 86 122, 74 122, 68 132 C 66 128, 64 108, 64 88 Z"
            fill="#27282C"
          />

          {/* Head: Rounded Cylindrical / Pill Dome (Charcoal Graphite) */}
          <path
            d="M 65 24 C 65 12, 95 12, 95 24 L 95 62 L 65 62 Z"
            fill="#2D2E33"
          />

          {/* Black Crewneck Sweater / Vest */}
          <path
            d="M 64 56 L 96 56 C 103 58, 107 68, 106 78 L 54 78 C 53 68, 57 58, 64 56 Z"
            fill="#1B1C1F"
          />
          {/* White Armhole seams on black shirt */}
          <path d="M 58 64 C 57 69, 58 72, 59 74" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M 102 64 C 103 69, 102 72, 101 74" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" fill="none" />

          {/* ITSC Geometric Labyrinth Logo on Chest (White) */}
          <g transform="translate(73, 62) scale(0.65)">
            <rect x="0" y="0" width="20" height="18" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M 6 0 L 6 12 L 14 12 L 14 6 L 10 6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>

          {/* Wing Feathers Left (Spreading Downward) */}
          <g fill="#2D2E33" stroke="#1E1F22" strokeWidth="1">
            <path d="M 52 74 C 42 78, 33 86, 32 94 C 36 90, 42 84, 52 80 Z" />
            <path d="M 50 80 C 40 85, 34 94, 34 102 C 38 97, 44 91, 52 86 Z" />
            <path d="M 50 86 C 40 92, 36 102, 37 109 C 41 103, 46 97, 54 92 Z" />
            <path d="M 52 92 C 44 98, 41 108, 43 114 C 46 108, 50 102, 56 96 Z" />
            <path d="M 54 96 C 48 102, 48 111, 51 116 C 53 111, 56 106, 60 100 Z" />
          </g>

          {/* Wing Feathers Right (Spreading Downward) */}
          <g fill="#2D2E33" stroke="#1E1F22" strokeWidth="1">
            <path d="M 108 74 C 118 78, 127 86, 128 94 C 124 90, 118 84, 108 80 Z" />
            <path d="M 110 80 C 120 85, 126 94, 126 102 C 122 97, 116 91, 108 86 Z" />
            <path d="M 110 86 C 120 92, 124 102, 123 109 C 119 103, 114 97, 106 92 Z" />
            <path d="M 108 92 C 116 98, 119 108, 117 114 C 114 108, 110 102, 104 96 Z" />
            <path d="M 106 96 C 112 102, 112 111, 109 116 C 107 111, 104 106, 100 100 Z" />
          </g>

          {/* Crossed Wings over Chest (Charcoal Slate #36373D) */}
          <path
            d="M 52 74 C 52 74, 58 102, 80 102 C 102 102, 108 74, 108 74 C 108 74, 102 96, 80 96 C 58 96, 52 74, 52 74 Z"
            fill="#36383E"
          />
          {/* Forearm crossing contour */}
          <path
            d="M 55 76 C 58 94, 76 96, 105 82 C 100 96, 80 99, 55 76 Z"
            fill="#383A40"
            stroke="#26272B"
            strokeWidth="0.8"
          />

          {/* Beak: Dark Slate Gray Triangle with soft rounded corners */}
          <path
            d="M 75 38 Q 80 37 85 38 L 81 58 Q 80 60 79 58 Z"
            fill="#4F565E"
            stroke="#3C4148"
            strokeWidth="1"
          />

          {/* ================= EXPRESSIONS: Big Expressive Soulful Eyes with Eyelashes & Highlights ================= */}
          {(activeExpr === 'curious' || activeExpr === 'chill') && (
            /* Kawaii Big Shiny Eyes with Highlights, Short Curved Eyelashes & Rosy Cheeks */
            <g>
              {/* Short Delicate Eyelashes Left */}
              <path d="M 68 28.5 Q 66 26.5 64.5 25" stroke="#141517" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M 70 27.5 Q 69 25 68 23.5" stroke="#141517" strokeWidth="1.4" strokeLinecap="round" fill="none" />

              {/* Short Delicate Eyelashes Right */}
              <path d="M 92 28.5 Q 94 26.5 95.5 25" stroke="#141517" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M 90 27.5 Q 91 25 92 23.5" stroke="#141517" strokeWidth="1.4" strokeLinecap="round" fill="none" />

              {/* Left Glossy Black Eye */}
              <circle cx="73" cy="33" r="5.8" fill="#141517" />
              <circle cx="71.2" cy="31.2" r="2.2" fill="#FFFFFF" />
              <circle cx="74.8" cy="34.8" r="1.0" fill="#FFFFFF" />

              {/* Right Glossy Black Eye */}
              <circle cx="87" cy="33" r="5.8" fill="#141517" />
              <circle cx="85.2" cy="31.2" r="2.2" fill="#FFFFFF" />
              <circle cx="88.8" cy="34.8" r="1.0" fill="#FFFFFF" />

              {/* Soft Rosy Cheeks */}
              <ellipse cx="66" cy="39" rx="3.8" ry="2.2" fill="#FCA5A5" opacity="0.65" />
              <ellipse cx="94" cy="39" rx="3.8" ry="2.2" fill="#FCA5A5" opacity="0.65" />
            </g>
          )}

          {activeExpr === 'shy' && (
            /* Shy Blushing Owl with Side-glance Big Eyes & Doodle Blush Lines */
            <g>
              {/* Soft Eyelashes */}
              <path d="M 68.5 28.5 Q 66.5 26.5 65 25" stroke="#141517" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <path d="M 91.5 28.5 Q 93.5 26.5 95 25" stroke="#141517" strokeWidth="1.3" strokeLinecap="round" fill="none" />

              {/* Big Eyes looking shyly slightly to the right */}
              <circle cx="73" cy="33" r="5.6" fill="#141517" />
              <circle cx="72.2" cy="31.6" r="2.1" fill="#FFFFFF" />
              <circle cx="74.8" cy="34.6" r="0.9" fill="#FFFFFF" />

              <circle cx="87" cy="33" r="5.6" fill="#141517" />
              <circle cx="86.2" cy="31.6" r="2.1" fill="#FFFFFF" />
              <circle cx="88.8" cy="34.6" r="0.9" fill="#FFFFFF" />

              {/* Rosy Blush with 3 cute doodle hash marks */}
              <ellipse cx="66" cy="39.5" rx="4.2" ry="2.4" fill="#F87171" opacity="0.4" />
              <ellipse cx="94" cy="39.5" rx="4.2" ry="2.4" fill="#F87171" opacity="0.4" />
              <path d="M 64 41 L 65.5 38 M 66.5 41 L 68 38 M 69 41 L 70.5 38" stroke="#EF4444" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M 92 41 L 93.5 38 M 94.5 41 L 96 38 M 97 41 L 98.5 38" stroke="#EF4444" strokeWidth="0.8" strokeLinecap="round" />
            </g>
          )}

          {activeExpr === 'sleepy' && (
            /* Peaceful Sleepy Arched Eyes with Drooping Lashes, Pastel Blush & 'z' */
            <g>
              <path d="M 69 34.5 Q 73.5 30 78 34.5" stroke="#141517" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 82 34.5 Q 86.5 30 91 34.5" stroke="#141517" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 67.5 33.5 L 65.5 35 M 92.5 33.5 L 94.5 35" stroke="#141517" strokeWidth="1.2" strokeLinecap="round" />
              
              {/* Soft warm pastel blush */}
              <ellipse cx="66" cy="40" rx="3.6" ry="2" fill="#FCA5A5" opacity="0.55" />
              <ellipse cx="94" cy="40" rx="3.6" ry="2" fill="#FCA5A5" opacity="0.55" />
              <text x="96" y="23" fill="#8B5CF6" fontSize="9" fontWeight="bold" fontFamily="sans-serif">z</text>
              <text x="102" y="17" fill="#A78BFA" fontSize="7" fontWeight="bold" fontFamily="sans-serif">z</text>
            </g>
          )}

          {activeExpr === 'surprised' && (
            /* Wide Big Shiny Eyes (⊙ ⊙) with Sparks */
            <g>
              <circle cx="73" cy="33" r="5.2" fill="#151618" />
              <circle cx="71.5" cy="31.2" r="2.0" fill="#FFFFFF" />
              <circle cx="74.5" cy="34.5" r="0.9" fill="#FFFFFF" />
              <circle cx="87" cy="33" r="5.2" fill="#151618" />
              <circle cx="85.5" cy="31.2" r="2.0" fill="#FFFFFF" />
              <circle cx="88.5" cy="34.5" r="0.9" fill="#FFFFFF" />
              <ellipse cx="67" cy="39" rx="3.2" ry="1.8" fill="#FFB6C1" opacity="0.55" />
              <ellipse cx="93" cy="39" rx="3.2" ry="1.8" fill="#FFB6C1" opacity="0.55" />
            </g>
          )}

          {activeExpr === 'happy' && (
            /* Cute Happy Arched Eyes (^ ^) with Upward Fluttering Lashes */
            <g>
              <path d="M 69 34 Q 73.5 28.5 78 34" stroke="#161719" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <path d="M 82 34 Q 86.5 28.5 91 34" stroke="#161719" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <path d="M 67.5 32 Q 66 30 65 29 M 92.5 32 Q 94 30 95 29" stroke="#141517" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <ellipse cx="66" cy="38.5" rx="3.8" ry="2.2" fill="#FFB6C1" opacity="0.7" />
              <ellipse cx="94" cy="38.5" rx="3.8" ry="2.2" fill="#FFB6C1" opacity="0.7" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};

/**
 * Minimalist Owl Eye Motif (Maintained for corner accents & icons)
 */
export const OwlEyeMotif: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = 'w-3.5 h-3.5', size = 16, color = 'currentColor' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`inline-block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
      <circle cx="12" cy="12" r="5" fill="#2C2D32" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="10.8" cy="10.8" r="1.4" fill="#FFFFFF" />
    </svg>
  );
};

export const DualOwlEyes: React.FC<{
  className?: string;
  color?: string;
  size?: number;
}> = ({ className = 'w-6 h-3', color = 'currentColor', size = 14 }) => {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="text-[12px] select-none">✨</span>
    </span>
  );
};

/**
 * Cute Hand-Drawn / Sticker Elemental Badges:
 * - Fire: Cute smiling flame with rosy cheeks 🔥
 * - Water: Cute smiling water droplet with round eyes 💧
 * - Air: Cute smiling cloud ☁️
 * - Earth: Cute little sprout 🌱
 * - Major: Cute smiling star ⭐
 */
export const CuteElementBadge: React.FC<{
  element?: string;
  size?: number;
  className?: string;
}> = ({ element, size = 26, className = '' }) => {
  const elem = element || 'Major';

  if (elem === 'Fire') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full bg-[#EDE6F8] border-2 border-white shadow-[0_2px_8px_rgba(80,60,110,0.15)] ${className}`}
        style={{ width: size, height: size }}
        title="Nguyên tố Hỏa (Lửa) - Năng lượng bừng sáng"
      >
        <svg viewBox="0 0 32 32" className="w-4/5 h-4/5" fill="none">
          <path
            d="M 16 4 C 18 10, 24 13, 24 20 C 24 25, 20 28, 16 28 C 12 28, 8 25, 8 20 C 8 13, 14 10, 16 4 Z"
            fill="#3B2D54"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <path
            d="M 16 14 C 17 17, 20 18, 20 22 C 20 25, 18 26, 16 26 C 14 26, 12 25, 12 22 C 12 18, 15 17, 16 14 Z"
            fill="#C6B5E8"
          />
          {/* Eyes & Smile */}
          <circle cx="14" cy="20" r="1.2" fill="#FFFFFF" />
          <circle cx="18" cy="20" r="1.2" fill="#FFFFFF" />
          <path d="M 15 22 Q 16 23.5 17 22" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }

  if (elem === 'Water') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full bg-[#E5EEFA] border-2 border-white shadow-[0_2px_8px_rgba(70,110,160,0.15)] ${className}`}
        style={{ width: size, height: size }}
        title="Nguyên tố Thủy (Nước) - Dòng chảy trực giác"
      >
        <svg viewBox="0 0 32 32" className="w-4/5 h-4/5" fill="none">
          <path
            d="M 16 5 C 16 5, 25 15, 25 21 C 25 26, 21 28, 16 28 C 11 28, 7 26, 7 21 C 7 15, 16 5, 16 5 Z"
            fill="#4A6D99"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <path d="M 11 18 C 11 13, 15 9, 15 9" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          {/* Eyes & Smile */}
          <circle cx="13.5" cy="21" r="1.2" fill="#FFFFFF" />
          <circle cx="18.5" cy="21" r="1.2" fill="#FFFFFF" />
          <path d="M 15 23 Q 16 24.5 17 23" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }

  if (elem === 'Air') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full bg-[#F0EBF8] border-2 border-white shadow-[0_2px_8px_rgba(110,90,140,0.15)] ${className}`}
        style={{ width: size, height: size }}
        title="Nguyên tố Khí (Gió) - Trí tuệ sáng tỏ"
      >
        <svg viewBox="0 0 32 32" className="w-4/5 h-4/5" fill="none">
          <path
            d="M 10 22 C 7 22, 5 19, 7 16 C 6 12, 10 10, 13 11 C 15 8, 21 8, 23 11 C 26 11, 28 14, 27 17 C 29 19, 27 22, 24 22 Z"
            fill="#8F78B8"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Eyes & Smile */}
          <circle cx="14" cy="17" r="1.2" fill="#241B34" />
          <circle cx="20" cy="17" r="1.2" fill="#241B34" />
          <path d="M 16 19 Q 17 20.5 18 19" stroke="#241B34" strokeWidth="1" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }

  if (elem === 'Earth') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full bg-[#EBF0F5] border-2 border-white shadow-[0_2px_8px_rgba(80,90,110,0.15)] ${className}`}
        style={{ width: size, height: size }}
        title="Nguyên tố Thổ (Đất) - Vững vàng nền tảng"
      >
        <svg viewBox="0 0 32 32" className="w-4/5 h-4/5" fill="none">
          <path d="M 16 26 L 16 15" stroke="#3A4759" strokeWidth="2.5" strokeLinecap="round" />
          {/* Left leaf */}
          <path
            d="M 16 16 C 10 16, 8 10, 8 10 C 8 10, 14 8, 16 16 Z"
            fill="#5E728D"
            stroke="#FFFFFF"
            strokeWidth="1.2"
          />
          {/* Right leaf */}
          <path
            d="M 16 14 C 22 14, 24 8, 24 8 C 24 8, 18 6, 16 14 Z"
            fill="#8295AD"
            stroke="#FFFFFF"
            strokeWidth="1.2"
          />
          <circle cx="12" cy="12" r="0.9" fill="#1C2634" />
          <circle cx="20" cy="10" r="0.9" fill="#1C2634" />
        </svg>
      </div>
    );
  }

  // Major Arcana: Soothing Lavender Star ⭐
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-[#ECE5F6] border-2 border-white shadow-[0_2px_8px_rgba(80,60,120,0.15)] ${className}`}
      style={{ width: size, height: size }}
      title="Ẩn Chính (Major Arcana)"
    >
      <svg viewBox="0 0 32 32" className="w-4/5 h-4/5" fill="none">
        <path
          d="M 16 4 L 19.5 12 L 28 13 L 22 19 L 23.5 27.5 L 16 23 L 8.5 27.5 L 10 19 L 4 13 L 12.5 12 Z"
          fill="#8A73B5"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="13.5" cy="15" r="1.1" fill="#FFFFFF" />
        <circle cx="18.5" cy="15" r="1.1" fill="#FFFFFF" />
        <path d="M 15 17 Q 16 18.5 17 17" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
};

/**
 * Cute Die-Cut Sticker Doodles for Collage Accents
 */
export const CuteStickerSparkle: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 20,
  className = '',
  color = '#A78BFA'
}) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] ${className}`}
    fill="none"
  >
    {/* Thick white die-cut border */}
    <path
      d="M 16 2 Q 16 16 2 16 Q 16 16 16 30 Q 16 16 30 16 Q 16 16 16 2 Z"
      stroke="#FFFFFF"
      strokeWidth="5"
      strokeLinejoin="round"
      fill="#FFFFFF"
    />
    {/* Inner Star */}
    <path
      d="M 16 4 Q 16 16 4 16 Q 16 16 16 28 Q 16 16 28 16 Q 16 16 16 4 Z"
      fill={color}
    />
  </svg>
);

export const CuteStickerHeart: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 22,
  className = '',
  color = '#B9A0E8'
}) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] ${className}`}
    fill="none"
  >
    {/* Thick white border */}
    <path
      d="M 16 28 C 16 28, 4 20, 4 12 C 4 7, 8 4, 12 4 C 14.5 4, 16 6, 16 7 C 16 6, 17.5 4, 20 4 C 24 4, 28 7, 28 12 C 28 20, 16 28, 16 28 Z"
      stroke="#FFFFFF"
      strokeWidth="5"
      strokeLinejoin="round"
      fill="#FFFFFF"
    />
    <path
      d="M 16 26 C 16 26, 6 18, 6 12 C 6 8, 9 5.5, 12 5.5 C 14 5.5, 15.5 7, 16 8 C 16.5 7, 18 5.5, 20 5.5 C 23 5.5, 26 8, 26 12 C 26 18, 16 26, 16 26 Z"
      fill={color}
    />
    <circle cx="10" cy="9" r="1.5" fill="#FFFFFF" opacity="0.65" />
  </svg>
);

export const CuteStickerBow: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = ''
}) => (
  <svg
    viewBox="0 0 40 32"
    width={size}
    height={size * 0.8}
    className={`select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] ${className}`}
    fill="none"
  >
    {/* White outline */}
    <g stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" fill="#FFFFFF">
      <circle cx="20" cy="14" r="5" />
      <path d="M 20 14 C 14 8, 4 10, 6 18 C 8 22, 16 16, 20 14 Z" />
      <path d="M 20 14 C 26 8, 36 10, 34 18 C 32 22, 24 16, 20 14 Z" />
      <path d="M 17 18 L 12 28" />
      <path d="M 23 18 L 28 28" />
    </g>
    {/* Lavender Ribbon */}
    <path d="M 20 14 C 14 8, 4 10, 6 18 C 8 22, 16 16, 20 14 Z" fill="#D4C4EF" />
    <path d="M 20 14 C 26 8, 36 10, 34 18 C 32 22, 24 16, 20 14 Z" fill="#D4C4EF" />
    <path d="M 17 17 L 11 27 L 16 26 L 19 18 Z" fill="#C2B0E4" />
    <path d="M 23 17 L 29 27 L 24 26 L 21 18 Z" fill="#C2B0E4" />
    <circle cx="20" cy="14" r="4.2" fill="#9F88C9" />
  </svg>
);

export const CuteStickerFlower: React.FC<{ size?: number; className?: string }> = ({
  size = 22,
  className = ''
}) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] ${className}`}
    fill="none"
  >
    {/* White border */}
    <g stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" fill="#FFFFFF">
      <circle cx="16" cy="10" r="4.5" />
      <circle cx="22" cy="14" r="4.5" />
      <circle cx="20" cy="21" r="4.5" />
      <circle cx="12" cy="21" r="4.5" />
      <circle cx="10" cy="14" r="4.5" />
      <circle cx="16" cy="16" r="4" />
    </g>
    {/* Lavender Petals */}
    <circle cx="16" cy="10" r="4" fill="#E8DDF7" />
    <circle cx="22" cy="14" r="4" fill="#E8DDF7" />
    <circle cx="20" cy="21" r="4" fill="#E8DDF7" />
    <circle cx="12" cy="21" r="4" fill="#E8DDF7" />
    <circle cx="10" cy="14" r="4" fill="#E8DDF7" />
    {/* Center Soft Blue Heart */}
    <circle cx="16" cy="16" r="3.6" fill="#A8C4E8" />
  </svg>
);

export const CuteStickerStar: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 20,
  className = '',
  color = '#93C5FD'
}) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] ${className}`}
    fill="none"
  >
    <path
      d="M 16 3 L 19.5 12 L 29 13 L 22 19.5 L 24 29 L 16 24 L 8 29 L 10 19.5 L 3 13 L 12.5 12 Z"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinejoin="round"
      fill="#FFFFFF"
    />
    <path
      d="M 16 4 L 19 12.5 L 28 13.5 L 21.5 19.5 L 23.5 28 L 16 23.5 L 8.5 28 L 10.5 19.5 L 4 13.5 L 13 12.5 Z"
      fill={color}
    />
    <circle cx="16" cy="15" r="1.5" fill="#FFFFFF" opacity="0.6" />
  </svg>
);

export const CuteStickerMoon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 34,
  className = '',
  color = '#DCD3F4'
}) => (
  <svg
    viewBox="0 0 40 40"
    width={size}
    height={size}
    className={`select-none pointer-events-none drop-shadow-[0_4px_10px_rgba(45,30,70,0.12)] ${className}`}
    fill="none"
  >
    {/* Thick white die-cut border */}
    <path
      d="M 28 6 C 18 8 10 18 12 30 C 13 33 15 35 17 37 C 7 35 2 24 4 15 C 6 6 16 2 24 3 C 25.5 3.2 27 4.5 28 6 Z"
      stroke="#FFFFFF"
      strokeWidth="5"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="#FFFFFF"
    />
    {/* Moon crescent body */}
    <path
      d="M 27 7 C 18 9 11 18 13 29 C 14 31.5 15.5 33.5 17 35 C 8 33 4 23 6 15 C 7.5 7 16 3.5 23.5 4.5 C 25 5 26 6 27 7 Z"
      fill={color}
    />
    {/* Sleeping eye */}
    <path d="M 12 18 Q 14 15.5 16 18" stroke="#372A4E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Subtle rosy cheek */}
    <circle cx="11" cy="22" r="1.8" fill="#F0C5DE" opacity="0.85" />
    {/* Sweet smile */}
    <path d="M 14 22 Q 16 24.5 18 22" stroke="#372A4E" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    {/* Tiny forehead sparkle */}
    <path d="M 14 10 L 15 12 L 17 12 L 15.5 13.5 L 16 15 L 14.5 14 L 13 15 L 13.5 13.5 L 12 12 L 14 12 Z" fill="#FFFFFF" opacity="0.9" />
  </svg>
);

export const CuteStickerOwlSleeping: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = ''
}) => (
  <svg
    viewBox="0 0 50 50"
    width={size}
    height={size}
    className={`select-none pointer-events-none drop-shadow-[0_4px_10px_rgba(45,30,70,0.12)] ${className}`}
    fill="none"
  >
    {/* Thick white die-cut border */}
    <g stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" fill="#FFFFFF">
      <ellipse cx="25" cy="28" rx="14" ry="16" />
      <circle cx="25" cy="18" r="12" />
      <path d="M 16 10 L 20 14 M 34 10 L 30 14" />
      <path d="M 21 42 L 21 46 M 29 42 L 29 46" />
    </g>
    {/* Body: Charcoal graphite */}
    <ellipse cx="25" cy="28" rx="13" ry="15" fill="#2E2C33" />
    {/* Head dome */}
    <circle cx="25" cy="18" r="11" fill="#36343D" />
    {/* Tiny owl ear tufts */}
    <path d="M 16 11 L 20 15 L 15 15 Z" fill="#2E2C33" />
    <path d="M 34 11 L 30 15 L 35 15 Z" fill="#2E2C33" />
    {/* Belly patch: Soft Lavender */}
    <ellipse cx="25" cy="31" rx="9" ry="10" fill="#E8E0F5" />
    {/* Feather marks */}
    <path d="M 23 28 Q 25 30 27 28 M 22 32 Q 25 34 28 32" stroke="#B1A2CC" strokeWidth="1.2" strokeLinecap="round" />
    {/* Sleeping curved eyes ⌒ ⌒ */}
    <path d="M 19 18 Q 21 15 23 18" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M 27 18 Q 29 15 31 18" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
    {/* Small beak */}
    <path d="M 24 19 L 26 19 L 25 22 Z" fill="#888E99" />
    {/* Tiny feet */}
    <path d="M 21 41 L 20 45 M 29 41 L 30 45" stroke="#1F2024" strokeWidth="2.5" strokeLinecap="round" />
    {/* Drifting gentle 'z' and 'Z' in soft purple */}
    <text x="36" y="14" fill="#8A73B5" fontSize="8" fontWeight="bold" fontFamily="sans-serif">z</text>
    <text x="41" y="9" fill="#A78BFA" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Z</text>
  </svg>
);

export const CuteStickerOwlFlying: React.FC<{ size?: number; className?: string }> = ({
  size = 38,
  className = ''
}) => (
  <svg
    viewBox="0 0 54 44"
    width={size}
    height={size * 0.81}
    className={`select-none pointer-events-none drop-shadow-[0_4px_10px_rgba(45,30,70,0.12)] ${className}`}
    fill="none"
  >
    {/* Thick white die-cut border */}
    <g stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" fill="#FFFFFF">
      <path d="M 27 22 C 18 12, 4 10, 4 20 C 10 24, 18 24, 22 26" />
      <path d="M 27 22 C 36 12, 50 10, 50 20 C 44 24, 36 24, 32 26" />
      <ellipse cx="27" cy="24" rx="8" ry="10" />
      <circle cx="27" cy="14" r="7" />
    </g>
    {/* Wings */}
    <path d="M 27 22 C 18 12, 5 11, 5 20 C 10 24, 18 24, 23 26 Z" fill="#2E2C33" />
    <path d="M 27 22 C 36 12, 49 11, 49 20 C 44 24, 36 24, 31 26 Z" fill="#2E2C33" />
    {/* Torso */}
    <ellipse cx="27" cy="24" rx="7" ry="9" fill="#25242A" />
    {/* Head */}
    <circle cx="27" cy="14" r="6.5" fill="#34323B" />
    {/* Happy curved eyes ^ ^ */}
    <path d="M 23 14 Q 24.5 12 26 14" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M 28 14 Q 29.5 12 31 14" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
    {/* Beak */}
    <path d="M 26.5 15 L 27.5 15 L 27 17 Z" fill="#888E99" />
    {/* Tail feathers */}
    <path d="M 25 32 L 27 35 L 29 32" stroke="#25242A" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/**
 * Scalloped Stamp Edge (Viền răng cưa như tem thư)
 * Creates a delightful vintage postal stamp / market poster scalloped border
 * along the top and bottom of the main cards, without covering card artwork.
 */
export const ScallopStampEdge: React.FC<{
  position: 'top' | 'bottom';
  className?: string;
  fillColor?: string;
  strokeColor?: string;
}> = ({ position, className = '', fillColor = '#FFFFFF', strokeColor = '#E2D7EE' }) => {
  const patternId = `scallop-stamp-${position}`;
  return (
    <div
      className={`absolute left-5 right-5 ${
        position === 'top' ? '-top-[7px]' : '-bottom-[7px]'
      } h-[8px] overflow-hidden pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    >
      <svg className="w-full h-[8px]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="16"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            {position === 'top' ? (
              <path
                d="M 0,8 A 8,8 0 0,1 16,8 Z"
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth="1"
              />
            ) : (
              <path
                d="M 0,0 A 8,8 0 0,0 16,0 Z"
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth="1"
              />
            )}
          </pattern>
        </defs>
        <rect width="100%" height="8" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};

/**
 * Authentic Japanese Scrapbook Washi Tape (Băng dính trang trí mỏng nhẹ, thanh thoát)
 * - Tỉ lệ mảnh dẻ, dẹp, thanh thoát (height: 6-8px, width: 36-54px)
 * - Hai đầu cắt răng cưa / rách nhẹ (serrated jagged torn edges) đặc trưng của băng keo giấy xé tay
 * - Màu pastel bán trong suốt (semi-translucent) với sợi giấy và ánh sáng bề mặt
 * - Tuyệt đối không che khuất chữ hay mặt nhân vật
 */
export const WashiTape: React.FC<{
  color?: 'lavender' | 'peach' | 'beige' | 'blue' | 'mint';
  width?: number;
  height?: number;
  tilt?: number;
  className?: string;
  label?: string;
}> = ({
  color = 'peach',
  width = 44,
  height = 8,
  tilt = -1.2,
  className = '',
  label
}) => {
  const colorSchemes = {
    peach: { bg: 'rgba(254, 226, 218, 0.82)', border: 'rgba(195, 115, 95, 0.25)', highlight: 'rgba(255, 255, 255, 0.65)' },
    lavender: { bg: 'rgba(228, 216, 246, 0.82)', border: 'rgba(115, 85, 155, 0.25)', highlight: 'rgba(255, 255, 255, 0.65)' },
    beige: { bg: 'rgba(246, 241, 230, 0.86)', border: 'rgba(135, 120, 95, 0.25)', highlight: 'rgba(255, 255, 255, 0.65)' },
    blue: { bg: 'rgba(216, 230, 248, 0.82)', border: 'rgba(85, 120, 165, 0.25)', highlight: 'rgba(255, 255, 255, 0.65)' },
    mint: { bg: 'rgba(216, 242, 228, 0.82)', border: 'rgba(85, 150, 115, 0.25)', highlight: 'rgba(255, 255, 255, 0.65)' }
  };
  const scheme = colorSchemes[color] || colorSchemes.peach;

  return (
    <div
      className={`inline-flex items-center justify-center select-none pointer-events-none drop-shadow-[0_1px_2px_rgba(40,25,60,0.08)] ${className}`}
      style={{
        transform: `rotate(${tilt}deg)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <svg
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Torn tape path with jagged serrated edges on left and right */}
        <path
          d="M 3 0 L 1 5 L 3 10 L 0 15 L 2 20 L 97 20 L 99 15 L 97 10 L 100 5 L 98 0 Z"
          fill={scheme.bg}
          stroke={scheme.border}
          strokeWidth="0.8"
        />
        {/* Top highlight for semi-translucent paper sheen */}
        <path d="M 3 2 L 97 2" stroke={scheme.highlight} strokeWidth="1" strokeLinecap="round" />
        {/* Subtle fiber line */}
        <path d="M 5 18 L 95 18" stroke={scheme.border} strokeWidth="0.5" opacity="0.35" />
      </svg>
      {label && (
        <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[9.5px] font-montserrat font-bold text-[#2A1D3D] px-1.5 tracking-wide whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
};

/**
 * Khung ảnh tròn kiểu "khung dán" (giống ảnh dán trong sổ tay / journal sticker):
 * Avatar tròn viền trắng dày nhẹ, hơi nghiêng.
 * Miếng washi tape thanh thoát, chỉ đặt ở rìa ngoài, không bao giờ che mặt hay tai của Bé Cú.
 */
export const NotebookStickerAvatar: React.FC<{
  size?: number;
  className?: string;
  expression?: 'chill' | 'curious' | 'sleepy' | 'happy';
  tilt?: number;
  tapeColor?: 'lavender' | 'peach' | 'beige' | 'blue';
  showTape?: boolean;
}> = ({
  size = 44,
  className = '',
  expression = 'curious',
  tilt = -3,
  tapeColor = 'peach',
  showTape
}) => {
  // Chỉ hiển thị miếng dán với avatar cỡ lớn (size >= 36) khi được yêu cầu, tránh che avatar nhỏ
  const shouldRenderTape = showTape !== undefined ? showTape : size >= 38;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`}
      style={{
        transform: `rotate(${tilt}deg)`,
        transition: 'transform 0.25s ease'
      }}
    >
      {/* Top scrapbook washi tape strip: Siêu mảnh, thanh thoát, nằm cao trên viền trắng ngoài */}
      {shouldRenderTape && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <WashiTape
            color={tapeColor}
            width={Math.round(size * 0.46)}
            height={Math.max(4, Math.round(size * 0.1))}
            tilt={1.5}
          />
        </div>
      )}

      {/* Round sticker with thick white border, soft warm shadow, like a cut-out polaroid in a diary */}
      <div
        className="rounded-full bg-[#FAF7FD] border-[2.5px] border-white shadow-[0_3px_10px_rgba(95,50,135,0.16)] flex items-center justify-center relative overflow-hidden"
        style={{ width: size, height: size }}
      >
        <OwlSilhouetteMascot
          size={Math.round(size * 0.74)}
          expression={expression}
          showStickerShadow={false}
        />
      </div>
    </div>
  );
};

/**
 * Hand-Drawn Cỏ 4 Lá (Four-leaf clover) - soft warm pencil lines
 */
export const HandDrawnClover: React.FC<{
  size?: number;
  className?: string;
  color?: string;
}> = ({ size = 20, className = '', color = '#8DBF9E' }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`select-none pointer-events-none ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill={color} stroke="#6B9D7D" strokeWidth="1.1" strokeLinejoin="round">
      <path d="M 16 16 C 14 10, 10 7, 13 4 C 15 2, 17 2, 19 4 C 22 7, 18 10, 16 16 Z" />
      <path d="M 16 16 C 22 14, 25 10, 28 13 C 30 15, 30 17, 28 19 C 25 22, 22 18, 16 16 Z" />
      <path d="M 16 16 C 18 22, 22 25, 19 28 C 17 30, 15 30, 13 28 C 10 25, 14 22, 16 16 Z" />
      <path d="M 16 16 C 10 18, 7 22, 4 19 C 2 17, 2 15, 4 13 C 7 10, 10 14, 16 16 Z" />
    </g>
    <circle cx="16" cy="16" r="1.6" fill="#FFFBF2" stroke="#6B9D7D" strokeWidth="0.8" />
    <path d="M 16 17 Q 15 25 11 29" stroke="#6B9D7D" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/**
 * Hand-Drawn Doodle Star - warm golden pencil doodle
 */
export const DoodleStar: React.FC<{
  size?: number;
  className?: string;
  color?: string;
}> = ({ size = 20, className = '', color = '#F7D688' }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`select-none pointer-events-none ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 16 3.5 L 19.8 12.5 L 29.5 13.5 L 22.2 20.2 L 24.3 29.5 L 16 24.8 L 7.7 29.5 L 9.8 20.2 L 2.5 13.5 L 12.2 12.5 Z"
      fill={color}
      stroke="#D6AA49"
      strokeWidth="1.2"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <circle cx="16" cy="15" r="1.4" fill="#FFFFFF" opacity="0.85" />
  </svg>
);

/**
 * Doodle Dots / Warm Pastel Speckles Cluster
 */
export const DoodleDots: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 18, className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`select-none pointer-events-none ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="8" r="1.8" fill="#E2D4F0" />
    <circle cx="16" cy="6" r="1.5" fill="#F8DFD8" />
    <circle cx="12" cy="17" r="2" fill="#FAF0DA" />
    <circle cx="19" cy="15" r="1.2" fill="#D3E4F6" />
  </svg>
);

/**
 * Hand-Drawn Heart Doodle
 */
export const HandDrawnHeart: React.FC<{
  size?: number;
  className?: string;
  color?: string;
}> = ({ size = 18, className = '', color = '#F8B4C8' }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`select-none pointer-events-none ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 12 20 C 12 20, 3 14.5, 3 8.5 C 3 5.5, 5.5 3, 8.5 3 C 10.2 3, 11.5 4, 12 5 C 12.5 4, 13.8 3, 15.5 3 C 18.5 3, 21 5.5, 21 8.5 C 21 14.5, 12 20, 12 20 Z"
      fill={color}
      stroke="#DF8EA6"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="7" r="1" fill="#FFFFFF" opacity="0.8" />
  </svg>
);

export * from './RhinestoneGems';

