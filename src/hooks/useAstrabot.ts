import { create } from 'zustand';
import { careers, type CareerProfile } from '../data/careers';
import { requestGuess } from '../lib/api';

export interface Question {
  id: number;
  text: string;
  weight: number;
}

interface AstrabotState {
  currentQuestion: number;
  confidence: number;
  answers: Record<number, string>;
  selectedCareer: CareerProfile | null;
  guessedCareer: CareerProfile | null;
  showGuess: boolean;
  questions: Question[];
  recentCareers: CareerProfile[];
  setAnswer: (questionId: number, answer: string) => void;
  nextQuestion: () => void | Promise<void>;
  reset: () => void;
  revealGuess: () => void;
  selectCareer: (career: CareerProfile) => void;
}

const baseQuestions: Question[] = [
  { id: 1, text: 'Do you enjoy solving complex problems with logic?', weight: 1.2 },
  { id: 2, text: 'Would you rather build systems than just describe them?', weight: 1.1 },
  { id: 3, text: 'Do you like creating elegant interfaces and experiences?', weight: 1 },
  { id: 4, text: 'Are you curious about data, trends, and hidden patterns?', weight: 1.1 },
  { id: 5, text: 'Do you enjoy leading teams or shaping strategy?', weight: 0.9 },
  { id: 6, text: 'Would you like your work to influence millions of users?', weight: 1 },
  { id: 7, text: 'Do you enjoy technical depth and continuous learning?', weight: 1.1 },
  { id: 8, text: 'Do you care deeply about user empathy and experience?', weight: 0.95 }
];

const scoreCareer = (career: CareerProfile, answers: Record<number, string>) => {
  let score = 0;
  Object.entries(answers).forEach(([id, answer]) => {
    const questionId = Number(id);
    const question = baseQuestions.find((item) => item.id === questionId);
    if (!question) return;

    const responseScore = answer === 'yes' ? 1 : answer === 'probably' ? 0.7 : answer === 'no' ? -0.3 : 0.2;
    score += question.weight * responseScore;
  });

  if (career.title.includes('Software')) score += 2.4;
  if (career.title.includes('Product')) score += 1.8;
  if (career.title.includes('Data')) score += 1.9;
  return score;
};

export const useAstrabotStore = create<AstrabotState>((set, get) => ({
  currentQuestion: 0,
  confidence: 0,
  answers: {},
  selectedCareer: null,
  guessedCareer: null,
  showGuess: false,
  questions: baseQuestions,
  recentCareers: [],
  setAnswer: (questionId, answer) => {
    const nextAnswers = { ...get().answers, [questionId]: answer };
    const confidence = Math.min(95, 55 + Object.keys(nextAnswers).length * 4);
    set({ answers: nextAnswers, confidence });
  },
  nextQuestion: async () => {
    const nextIndex = get().currentQuestion + 1;
    if (nextIndex >= get().questions.length) {
      let best: CareerProfile | undefined;

      try {
        const result = await requestGuess(get().answers);
        best = result?.career;
      } catch (error) {
        console.warn('Astrabot API unavailable, using local guess fallback.', error);
      }

      if (!best) {
        const ranked = [...careers].sort((a, b) => scoreCareer(b, get().answers) - scoreCareer(a, get().answers));
        best = ranked[0];
      }

      set({ guessedCareer: best, showGuess: true, selectedCareer: best });
      return;
    }
    set({ currentQuestion: nextIndex });
  },
  reset: () => set({ currentQuestion: 0, confidence: 0, answers: {}, selectedCareer: null, guessedCareer: null, showGuess: false }),
  revealGuess: () => set({ showGuess: true }),
  selectCareer: (career) => {
    set({ selectedCareer: career, recentCareers: [career, ...get().recentCareers.filter((item) => item.slug !== career.slug)].slice(0, 5) });
  }
}));
