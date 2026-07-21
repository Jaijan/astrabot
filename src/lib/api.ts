import type { CareerProfile } from '../data/careers';
import type { Question } from '../hooks/useAstrabot';

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!API_URL) return null;

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    },
    ...init
  });

  if (!response.ok) {
    throw new Error(`Astrabot API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchQuestions() {
  return request<{ questions: Question[] }>('/api/questions');
}

export async function requestGuess(answers: Record<number, string>) {
  return request<{ career: CareerProfile; confidence: number; ranked: Array<{ slug: string; title: string; score: number }> }>('/api/guess', {
    method: 'POST',
    body: JSON.stringify({ answers })
  });
}
