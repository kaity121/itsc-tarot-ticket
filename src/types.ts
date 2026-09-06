export type Language = 'en' | 'vi';

export interface TarotCardData {
  id: string;
  name: string;
  nameVi: string;
  numeral: string;
  suit?: 'Major' | 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  keywords: string[];
  keywordsVi: string[];
  element: 'Air' | 'Water' | 'Fire' | 'Earth';
  summary: string;
  summaryVi: string;
  contrastPerspective: {
    apparent: string;
    actual: string;
  };
  contrastPerspectiveVi: {
    apparent: string;
    actual: string;
  };
  symbol: string;
  modernNote: string;
  modernNoteVi: string;
  image: string;
}

export type TarotOrientation = 'upright' | 'reversed';

export interface DrawnTarotCard extends TarotCardData {
  orientation: TarotOrientation;
}

export interface TarotCardInput {
  name: string;
  orientation: TarotOrientation;
  position: string;
}

export interface TarotReadingRequest {
  question: string;
  language: Language;
  cards: TarotCardInput[];
}

export interface SpreadPerspective {
  id: string;
  label: string;
  labelVi: string;
  subtext: string;
  subtextVi: string;
}

export interface CardSlotItem {
  card: TarotCardData;
  isFlipped: boolean;
  perspectiveLabel: string;
}

export type ReadingMode = 'daily' | 'classic';


export interface TarotReadingApiResponse {
  reading: string;
}

export interface TarotReadingResponse {
  interpretation: string;
  cardBreakdown: Record<string, string>;
  takeaway: string;
  source: 'gemini' | 'curated' | 'fallback';
}

export interface QuestionPreset {
  id: string;
  label: string;
  labelVi: string;
  category: 'All' | 'Love' | 'Career' | 'Mindset';
  placeholder: string;
  placeholderVi: string;
}
