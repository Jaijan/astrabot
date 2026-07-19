import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Robot from '../components/Robot';
import { useAstrabotStore } from '../hooks/useAstrabot';

const answerOptions = [
  { key: 'yes', label: 'Yes' },
  { key: 'probably', label: 'Probably' },
  { key: 'no', label: 'No' },
  { key: 'probably-not', label: 'Probably Not' },
  { key: 'dont-know', label: "Don't Know" }
];

export default function QuestionPage() {
  const navigate = useNavigate();
  const { currentQuestion, questions, answers, setAnswer, nextQuestion, guessedCareer } = useAstrabotStore();
  const [message, setMessage] = useState('Analyzing your career DNA...');
  const [isGuessing, setIsGuessing] = useState(false);

  useEffect(() => {
    const messages = ['Analyzing...', 'Cross Referencing...', 'Building Confidence...', 'Searching Knowledge Graph...', 'Evaluating Career DNA...'];
    const timer = window.setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 700);
    return () => window.clearInterval(timer);
  }, []);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentConfidence = useMemo(() => Math.min(95, 55 + Object.keys(answers).length * 4), [answers]);
  const isComplete = currentQuestion >= questions.length - 1;

  const handleAnswer = (answer: string) => {
    if (!question || isGuessing) return;
    setAnswer(question.id, answer);
    setIsGuessing(true);
    setTimeout(() => {
      nextQuestion();
    }, 300);
  };

  useEffect(() => {
    setIsGuessing(false);
  }, [currentQuestion]);

  useEffect(() => {
    if (guessedCareer) {
      navigate(`/career/${guessedCareer.slug}`);
    }
  }, [guessedCareer, navigate]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_left,_rgba(93,220,255,0.08),_transparent_35%)] px-4 py-8 text-white sm:px-8 lg:px-16">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center gap-8 lg:flex-row lg:items-center">
        <div className="flex flex-1 justify-center lg:justify-start">
          <Robot expression={isGuessing ? 'processing' : 'thinking'} />
        </div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex-1 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_0_80px_rgba(93,220,255,0.10)] backdrop-blur-2xl sm:p-8">
          <div className="mb-6 flex items-center justify-between text-sm uppercase tracking-[0.28em] text-slate-400">
            <span>Question {currentQuestion + 1} / {questions.length}</span>
            <span>Confidence {currentConfidence}%</span>
          </div>

          <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div animate={{ width: `${progress}%` }} className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
          </div>

          {isGuessing ? (
            <div className="mb-6 rounded-[24px] border border-cyan-400/30 bg-cyan-400/15 px-5 py-4 text-lg text-cyan-100">
              <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                Making your career discovery...
              </motion.div>
            </div>
          ) : (
            <div className="mb-6 rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 text-lg text-cyan-100">
              {message}
            </div>
          )}

          <h2 className="mb-8 text-2xl font-semibold text-white sm:text-3xl">
            {question?.text ?? 'We’ve identified your likely path.'}
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {answerOptions.map((option) => (
              <motion.button
                key={option.key}
                onClick={() => handleAnswer(option.key)}
                disabled={isGuessing}
                whileHover={!isGuessing ? { scale: 1.02 } : {}}
                whileTap={!isGuessing ? { scale: 0.98 } : {}}
                className="rounded-[20px] border border-white/10 bg-slate-950/60 px-4 py-3 text-left text-sm font-medium text-slate-200 transition disabled:opacity-50 hover:border-cyan-400/40 hover:bg-cyan-400/10 disabled:hover:border-white/10 disabled:hover:bg-slate-950/60"
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
