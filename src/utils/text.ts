/**
 * Text utility to enforce Unicode NFC normalization across all strings.
 * Solves Vietnamese detached diacritical mark issues (e.g. 'Kiê m', 'Chá´t').
 */
export function norm(str: string | null | undefined): string {
  if (!str) return '';
  return typeof str === 'string' ? str.normalize('NFC') : String(str);
}

/**
 * Normalizes an array of strings to NFC
 */
export function normArray(arr?: (string | null | undefined)[] | null): string[] {
  if (!arr) return [];
  return arr.map(s => norm(s));
}

/**
 * Recursively normalizes all strings inside any object or array to NFC.
 */
export function deepNormalize<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') {
    return (obj as string).normalize('NFC') as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepNormalize(item)) as unknown as T;
  }
  if (typeof obj === 'object') {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = deepNormalize(value);
    }
    return result as T;
  }
  return obj;
}
