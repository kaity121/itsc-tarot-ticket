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
 * Persist reading to the server with graceful localStorage client fallback.
 * Uses window.location.origin to construct deep link dynamically on production.
 */
export async function persistReading(
  data: TarotReadingTicketData
): Promise<SaveReadingResponse> {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://itsc-tarot-ticket.vercel.app';
  const publicUrl = `${origin}/ticket/${data.readingId}`;

  // 1. Instant client-side persistence fallback
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`itsc_reading_${data.readingId}`, JSON.stringify(data));
    } catch (localErr) {
      console.warn('[Storage] localStorage write warning:', localErr);
    }
  }

  // 2. Server persistence
  try {
    const res = await fetch('/api/readings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const serverResult = await res.json();
      return {
        ...serverResult,
        url: publicUrl, // Prioritize active browser origin over server-guessed host
      };
    }

    console.warn(`[Storage] /api/readings returned status ${res.status}, using localStorage fallback`);
  } catch (netErr) {
    console.warn('[Storage] /api/readings network/serverless error, using localStorage fallback:', netErr);
  }

  // Return graceful response if serverless API failed
  return {
    readingId: data.readingId,
    url: publicUrl,
    reading: data,
  };
}

/**
 * Fetch reading by ID.
 * Tries server API first, falls back to localStorage, then URL query/hash parameters.
 */
export async function fetchReading(
  readingId: string
): Promise<TarotReadingTicketData> {
  const cleanId = readingId.trim();

  // 1. Attempt to fetch from serverless API
  try {
    const res = await fetch(`/api/readings/${encodeURIComponent(cleanId)}`);
    if (res.ok) {
      const data = await res.json();
      // Cache server response into localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(`itsc_reading_${cleanId}`, JSON.stringify(data));
        } catch (e) {}
      }
      return data;
    }
    if (res.status === 404) {
      console.warn(`[Storage] Reading ${cleanId} not found on server, trying local cache`);
    }
  } catch (apiErr) {
    console.warn('[Storage] Failed to contact /api/readings, trying local fallback:', apiErr);
  }

  // 2. Fallback to localStorage (works seamlessly on same device/browser)
  if (typeof window !== 'undefined') {
    try {
      const localCached = localStorage.getItem(`itsc_reading_${cleanId}`);
      if (localCached) {
        return JSON.parse(localCached);
      }
    } catch (e) {
      console.warn('[Storage] Error reading localStorage:', e);
    }

    // 3. Fallback to URL search params (?data=...) or hash (#reading-...)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const dataParam = urlParams.get('data');
      if (dataParam) {
        return JSON.parse(decodeURIComponent(escape(atob(dataParam))));
      }

      if (window.location.hash) {
        const hashTarget = window.location.hash.replace(/^#reading-/, '').replace(/^#/, '');
        const hashCached = localStorage.getItem(`itsc_reading_${hashTarget}`);
        if (hashCached) {
          return JSON.parse(hashCached);
        }
      }
    } catch (e) {}
  }

  throw new Error('NOT_FOUND');
}
