
import type { CacheEntry } from '../types';

// Using a Map to simulate a key-value database for prompts.
// In a real RAG system, this would be a vector database for semantic search.
const cache = new Map<string, string>();

// Pre-populate with some data for demonstration
cache.set(
  "what is the capital of france?",
  "The capital of France is Paris. It's known for its art, fashion, gastronomy and culture."
);
cache.set(
  "explain retrieval-augmented generation in simple terms",
  "Retrieval-Augmented Generation (RAG) is a technique where an AI model first looks up relevant information from a knowledge base (like a database or documents) and then uses that information to generate a more accurate and context-aware answer to a user's prompt."
);


export const searchCache = (prompt: string): string | null => {
  // Using a simple case-insensitive exact match for this simulation.
  const normalizedPrompt = prompt.trim().toLowerCase();
  return cache.get(normalizedPrompt) || null;
};

export const addToCache = (prompt: string, response: string): void => {
  const normalizedPrompt = prompt.trim().toLowerCase();
  cache.set(normalizedPrompt, response);
};

export const getAllCacheEntries = (): CacheEntry[] => {
  return Array.from(cache.entries()).map(([prompt, response]) => ({ prompt, response }));
};

export const clearCache = (): void => {
  // Keep the pre-populated entries for demo purposes
  const tempCache = new Map<string, string>();
    tempCache.set(
    "what is the capital of france?",
    "The capital of France is Paris. It's known for its art, fashion, gastronomy and culture."
  );
  tempCache.set(
    "explain retrieval-augmented generation in simple terms",
    "Retrieval-Augmented Generation (RAG) is a technique where an AI model first looks up relevant information from a knowledge base (like a database or documents) and then uses that information to generate a more accurate and context-aware answer to a user's prompt."
  );
  cache.clear();
  tempCache.forEach((value, key) => cache.set(key, value));
};
