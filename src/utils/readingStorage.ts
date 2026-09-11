import { TarotCardShareItem } from '../components/TarotShareCard';

export interface TarotReadingTicketData {
  readingId: string;
  question: string;
  spreadType: string;
  cards: TarotCardShareItem[];
  manifestText: string;
  userName?: string;
  language?: 'vi' | 'en';
  dateTime?: string;
  createdAt?: string;
}

export interface SaveReadingResponse {
  readingId: string;
  url: string;
  reading: TarotReadingTicketData;
}

/**
 * Generate a cryptographically secure, URL-safe reading ID (8 uppercase chars).
 * Example: 'Q7K91LM2', 'ABC123XYZ'
 */
export function generateReadingId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const bytes = new Uint8Array(8);
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 8; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(bytes)
    .map((b) => chars[b % chars.length])
    .join('');
}

/**
 * Persist reading to the server.
 */
export async function persistReading(
  data: TarotReadingTicketData
): Promise<SaveReadingResponse> {
  const res = await fetch('/api/readings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to save reading (${res.status}): ${errorText}`);
  }

  return await res.json();
}

/**
 * Fetch reading by ID.
 */
export async function fetchReading(
  readingId: string
): Promise<TarotReadingTicketData> {
  const cleanId = encodeURIComponent(readingId.trim());
  const res = await fetch(`/api/readings/${cleanId}`);

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('NOT_FOUND');
    }
    const errorText = await res.text();
    throw new Error(`Failed to fetch reading (${res.status}): ${errorText}`);
  }

  return await res.json();
}
