import { Language } from '../types';
import { deepNormalize } from './text';

export interface Translations {
  appName: string;
  brandTag: string;
  brandSubtitle: string;
  dailyMode: string;
  classicMode: string;
  dailyContrast: string;
  classicSpread: string;
  calmLoFi: string;
  ambient: string;
  ambientStarted: string;
  ambientPaused: string;
  readingCopied: string;
  readingCaptured: string;
  
  // Daily spread
  dailyTitle: string;
  dailySubtitle: string;
  dailyApparentLabel: string;
  dailyApparentSubtext: string;
  dailyActualLabel: string;
  dailyActualSubtext: string;
  dailyPrompt: string;
  dailyCompletedPrompt: string;
  shuffleArcana: string;
  shuffleDeck: string;
  quickDeal: string;
  quickShuffle: string;
  chooseCards: string;
  chooseFromFan: string;
  tapToFlip: string;
  dailySynthesisTitle: string;
  synthesisTitle: string;
  apparentTension: string;
  deepReality: string;
  nocturnalTakeaway: string;
  actionableTakeaway: string;
  shareReading: string;

  // Classic spread
  classicTitle: string;
  classicSubtitle: string;
  questionLabel: string;
  questionPlaceholder: string;
  filterAll: string;
  filterLove: string;
  filterCareer: string;
  filterMindset: string;
  categories: {
    all: string;
    love: string;
    career: string;
    mindset: string;
  };
  pastLabel: string;
  pastSubtext: string;
  presentLabel: string;
  presentSubtext: string;
  futureLabel: string;
  futureSubtext: string;
  dealCardsBtn: string;
  classicInterpretationTitle: string;

  // Card fan selector
  fanTitle: string;
  fanSubtitlePrefix: string;
  fanCardCountTwo: string;
  fanCardCountThree: string;
  fanSubtitleSuffix: string;
  fanSelectedCount: string;
  fanConfirmBtn: string;
  fanAutoPickBtn: string;
  fanReshuffleBtn: string;
  fanCancelBtn: string;
  shuffle: string;
  quickPick: string;
  beginReading: string;

  // Mascot modal
  modalMascotTag: string;
  modalTitle: string;
  modalPoint1Title: string;
  modalPoint1Desc: string;
  modalPoint2Title: string;
  modalPoint2Desc: string;
  modalPoint3Title: string;
  modalPoint3Desc: string;
  modalEnterBtn: string;

  // Tooltips & Misc
  deckSizeFull: string;
  deckSizeMajor: string;
  switchLanguage: string;
  loadingInterpretation: string;
}

const rawTranslations: Record<Language, Translations> = {
  en: {
    appName: 'MOONLIGHT',
    brandTag: 'ITSC OWL',
    brandSubtitle: 'quiet nocturnal discernment',
    dailyMode: 'Daily Contrast',
    classicMode: 'Classic 3-Card',
    dailyContrast: 'Daily Contrast',
    classicSpread: 'Classic 3-Card',
    calmLoFi: 'Calm Lo-Fi',
    ambient: 'Ambient',
    ambientStarted: 'Ambient nocturnal soundscape started',
    ambientPaused: 'Ambient sound paused',
    readingCopied: 'Reading copied to clipboard',
    readingCaptured: 'Reading captured',

    // Daily spread
    dailyTitle: 'The Daily Perspective Ritual',
    dailySubtitle: 'Two cards: separating instinctive fear from quiet nocturnal truth',
    dailyApparentLabel: 'What it appears to be',
    dailyApparentSubtext: 'The surface narrative or reactive assumption',
    dailyActualLabel: 'What it actually is',
    dailyActualSubtext: 'The underlying reality resting underneath',
    dailyPrompt: 'Tap each card to reveal its insight',
    dailyCompletedPrompt: 'Both perspectives revealed • Contemplate the contrast below',
    shuffleArcana: 'The Silent Owl Shuffles the Arcana',
    shuffleDeck: 'Reshuffle',
    quickDeal: 'Quick Deal',
    quickShuffle: 'Quick Shuffle',
    chooseCards: 'Choose Cards',
    chooseFromFan: 'Choose From Fan',
    tapToFlip: 'tap to flip',
    dailySynthesisTitle: 'Daily Contrast Synthesis',
    synthesisTitle: 'Daily Contrast Synthesis',
    apparentTension: 'Surface Tension',
    deepReality: 'Underlying Truth',
    nocturnalTakeaway: 'Nocturnal Anchor',
    actionableTakeaway: 'Actionable Takeaway',
    shareReading: 'Share Reading',

    // Classic spread
    classicTitle: 'Classic Three-Card Query',
    classicSubtitle: 'Temporal inquiry: past origins, present ground, and future direction',
    questionLabel: 'What inquiry sits quietly in your mind?',
    questionPlaceholder: 'Type a question or select a reflection prompt below...',
    filterAll: 'All',
    filterLove: 'Relationships',
    filterCareer: 'Career & Craft',
    filterMindset: 'Mindset & Self',
    categories: {
      all: 'All',
      love: 'Relationships',
      career: 'Career & Craft',
      mindset: 'Mindset & Self'
    },
    pastLabel: 'Past Origins',
    pastSubtext: 'Root influences shaping this moment',
    presentLabel: 'Present Reality',
    presentSubtext: 'Current energy and active dynamics',
    futureLabel: 'Future Trajectory',
    futureSubtext: 'Potential emergence if unhindered',
    dealCardsBtn: 'Begin Inquiry',
    classicInterpretationTitle: 'ArcaneX Psychological Interpretation',

    // Card fan selector
    fanTitle: 'Select Your Cards',
    fanSubtitlePrefix: 'DRAW',
    fanCardCountTwo: 'TWO CARDS',
    fanCardCountThree: 'THREE CARDS',
    fanSubtitleSuffix: 'TO OPEN THE SANCTUARY',
    fanSelectedCount: 'selected',
    fanConfirmBtn: 'Confirm Selection',
    fanAutoPickBtn: 'Silent Guide',
    fanReshuffleBtn: 'Shuffle Arcana',
    fanCancelBtn: 'Cancel',
    shuffle: 'Reshuffle',
    quickPick: 'Quick Pick',
    beginReading: 'Begin Reading',

    // Mascot modal
    modalMascotTag: 'ITSC Brand Mascot • Owl Energy',
    modalTitle: 'Tarot as an Honest Mirror',
    modalPoint1Title: 'Dual-Contrast Nocturnal Ritual',
    modalPoint1Desc: 'Like the owl discerning subtle movement in deep darkness, the dual spread pairs "what it looks like" against "what it really is" to decouple instinctive anxiety from objective truth.',
    modalPoint2Title: 'Grounded Insight Engine',
    modalPoint2Desc: 'Powered by ArcaneX-style psychological synthesis with zero superstition or fatalism — purely clear cognitive discernment.',
    modalPoint3Title: 'Soundless Owl-Flight & Binaural Chords',
    modalPoint3Desc: 'Whisper-quiet card mechanics and soothing minor-chord ambient tones synthesized live in your browser using the Web Audio API.',
    modalEnterBtn: 'Enter the Sanctuary',

    // Tooltips & Misc
    deckSizeFull: '78-Card Rider-Waite Deck',
    deckSizeMajor: '22 Major Arcana',
    switchLanguage: 'Tiếng Việt',
    loadingInterpretation: 'Synthesizing quiet insight...'
  },
  vi: {
    appName: 'MOONLIGHT',
    brandTag: 'ITSC CÚ ĐÊM',
    brandSubtitle: 'sự sáng suốt tĩnh lặng giữa màn đêm',
    dailyMode: 'Tương Phản Hàng Ngày',
    classicMode: 'Trải Bài 3 Lá',
    dailyContrast: 'Tương Phản Hàng Ngày',
    classicSpread: 'Trải Bài 3 Lá',
    calmLoFi: 'Nhạc Thiền',
    ambient: 'Âm Thanh',
    ambientStarted: 'Đã bật không gian âm thanh tĩnh lặng',
    ambientPaused: 'Đã tạm dừng âm thanh',
    readingCopied: 'Đã sao chép quẻ bài vào bộ nhớ tạm',
    readingCaptured: 'Đã lưu kết quả trải bài',

    // Daily spread
    dailyTitle: 'Nghi Thức Chiêm Nghiệm Hàng Ngày',
    dailySubtitle: 'Hai lá bài: tách biệt nỗi sợ bản năng khỏi sự thật sáng suốt',
    dailyApparentLabel: 'Vẻ bề ngoài (Tưởng chừng như là)',
    dailyApparentSubtext: 'Câu chuyện trên bề mặt hoặc sự suy diễn phản xạ',
    dailyActualLabel: 'Bản chất thực sự (Thực chất là)',
    dailyActualSubtext: 'Sự thật cốt lõi đang ẩn sâu bên dưới',
    dailyPrompt: 'Chạm vào từng lá bài để khám phá thông điệp',
    dailyCompletedPrompt: 'Cả hai góc nhìn đã mở • Chiêm nghiệm sự tương phản bên dưới',
    shuffleArcana: 'Cú Đêm Tĩnh Lặng Đang Xáo Bộ Bài',
    shuffleDeck: 'Xáo bài lại',
    quickDeal: 'Chia nhanh',
    quickShuffle: 'Xáo nhanh',
    chooseCards: 'Tự rút bài',
    chooseFromFan: 'Rút từ dải bài',
    tapToFlip: 'chạm để lật',
    dailySynthesisTitle: 'Phân Tích Tương Phản Hàng Ngày',
    synthesisTitle: 'Phân Tích Tương Phản Hàng Ngày',
    apparentTension: 'Căng thẳng bề mặt',
    deepReality: 'Sự thật cốt lõi',
    nocturnalTakeaway: 'Điểm tựa tĩnh tâm',
    actionableTakeaway: 'Hành Động Tĩnh Tâm',
    shareReading: 'Chia sẻ kết quả',

    // Classic spread
    classicTitle: 'Hỏi Đáp Ba Lá Cổ Điển',
    classicSubtitle: 'Truy vấn theo dòng thời gian: cội nguồn quá khứ, thực tại hôm nay và hướng đi tương lai',
    questionLabel: 'Câu hỏi nào đang ẩn chứa trong tâm trí bạn?',
    questionPlaceholder: 'Nhập câu hỏi hoặc chọn một chủ đề gợi ý bên dưới...',
    filterAll: 'Tất cả',
    filterLove: 'Mối quan hệ',
    filterCareer: 'Công việc & Sự nghiệp',
    filterMindset: 'Tâm thức & Bản thân',
    categories: {
      all: 'Tất cả',
      love: 'Mối quan hệ',
      career: 'Công việc & Sự nghiệp',
      mindset: 'Tâm thức & Bản thân'
    },
    pastLabel: 'Cội Nguồn Quá Khứ',
    pastSubtext: 'Ảnh hưởng sâu xa định hình khoảnh khắc này',
    presentLabel: 'Thực Tại Hiện Giờ',
    presentSubtext: 'Năng lượng và hoàn cảnh đang diễn ra',
    futureLabel: 'Khuynh Hướng Tương Lai',
    futureSubtext: 'Chiều hướng phát triển tiếp theo',
    dealCardsBtn: 'Bắt đầu trải bài',
    classicInterpretationTitle: 'Luận Giải Tâm Lý Học ArcaneX',

    // Card fan selector
    fanTitle: 'Rút Lá Bài Của Bạn',
    fanSubtitlePrefix: 'RÚT',
    fanCardCountTwo: 'HAI LÁ BÀI',
    fanCardCountThree: 'BA LÁ BÀI',
    fanSubtitleSuffix: 'ĐỂ MỞ RA KHÔNG GIAN TĨNH LẶNG',
    fanSelectedCount: 'đã chọn',
    fanConfirmBtn: 'Xác Nhận Lá Bài',
    fanAutoPickBtn: 'Cú Đêm Chọn Giúp',
    fanReshuffleBtn: 'Xáo Lại Bài',
    fanCancelBtn: 'Đóng',
    shuffle: 'Xáo lại bài',
    quickPick: 'Rút nhanh',
    beginReading: 'Khai mở quẻ bài',

    // Mascot modal
    modalMascotTag: 'Linh vật Thương hiệu ITSC • Trí Tuệ Cú Đêm',
    modalTitle: 'Tarot Như Một Tấm Gương Trung Thực',
    modalPoint1Title: 'Nghi Thức Tương Phản Trong Đêm',
    modalPoint1Desc: 'Như đôi mắt loài cú nhìn thấu mọi chuyển động trong bóng tối tĩnh mịch, trải bài đối chiếu "vẻ bề ngoài" với "bản chất thực sự" nhằm gột rửa nỗi sợ vô thức để tìm về chân lý khách quan.',
    modalPoint2Title: 'Cơ Chế Khai Sáng Tâm Lý',
    modalPoint2Desc: 'Phát triển theo phong cách phân tích tâm lý ArcaneX: hoàn toàn không mê tín dị đoan hay định mệnh cực đoan — chỉ có sự thấu suốt nhận thức.',
    modalPoint3Title: 'Cánh Cú Lướt Êm & Hợp Âm Binaural',
    modalPoint3Desc: 'Cơ chế lật bài êm ái như cú sải cánh cùng giai điệu ambient thư giãn được tổng hợp trực tiếp trên trình duyệt qua Web Audio API.',
    modalEnterBtn: 'Bước Vào Không Gian Tĩnh Lặng',

    // Tooltips & Misc
    deckSizeFull: 'Bộ 78 Lá Rider-Waite Đầy Đủ',
    deckSizeMajor: '22 Lá Ẩn Chính (Major Arcana)',
    switchLanguage: 'English',
    loadingInterpretation: 'Đang tổng hợp thông điệp sáng suốt...'
  }
};

export const translations: Record<Language, Translations> = deepNormalize(rawTranslations);
