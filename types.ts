
export interface CacheEntry {
  prompt: string;
  response: string;
}

export type ResponseSource = 'Cached' | 'Generated' | null;
