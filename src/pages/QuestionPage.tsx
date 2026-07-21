import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Brain, Check, CircleDashed, Home, Sparkles, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Robot from '../components/Robot';
import { careers } from '../data/careers';
import { useAstrabotStore } from '../hooks/useAstrabot';

const answerOptions = [
  { key: 'yes', label: 'Yes', tone: 'Affirm' },
  { key: 'probably', label: 'Probably', tone: 'Likely' },
  { key: 'no', label: 'No', tone: 'Reject' },
  { key: 'probably-not', label: 'Probably Not', tone: 'Unlikely' },
  { key: 'dont-know', label: "Don't Know", tone: 'Unknown' }
];

const thinkingMessages = ['Analyzing signal', 'Cross-referencing traits', 'Updating career DNA', 'Pruning knowledge graph', 'Measuring confidence'];

export default function QuestionPage() {
  const navigate = useNavigate();
  const {
    currentQuestion,
    questions,
    answers,
    setAnswer,
    nextQuestion,
    guessedCareer,
    reset
  } = useAstrabotStore();
  const [messageIndex, setMessageIndex] = useState(0);
  const [isGuessing, setIsGuessing] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealConfidence, setRevealConfidence] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMessageIndex((value) => (value + 1) % thinkingMessages.length);
    }, 850);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!guessedCareer) return;

    setIsRevealing(true);
    const target = guessedCareer.confidence;
    const ticker = window.setInterval(() => {
      setRevealConfidence((value) => {
        if (value >= target) {
          window.clearInterval(ticker);
          return target;
        }
        return Math.min(target, value + 3);
      });
    }, 36);
    const navTimer = window.setTimeout(() => navigate(`/career/${guessedCareer.slug}`), 3200);

    return () => {
      window.clearInterval(ticker);
      window.clearTimeout(navTimer);
    };
  }, [guessedCareer, navigate]);

  useEffect(() => {
    setIsGuessing(false);
  }, [currentQuestion]);

  const question = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.min(100, ((currentQuestion + 1) / questions.length) * 100);
  const currentConfidence = Math.min(95, 55 + answeredCount * 4);
  const answeredLabels = Object.values(answers);

  const dna = useMemo(() => {
    const yes = answeredLabels.filter((answer) => answer === 'yes' || answer === 'probably').length;
    const no = answeredLabels.filter((answer) => answer === 'no' || answer === 'probably-not').length;
    return [
      { label: 'Logic', value: Math.min(96, 42 + yes * 8) },
      { label: 'Craft', value: Math.min(94, 38 + answeredCount * 6) },
      { label: 'Strategy', value: Math.max(24, 72 - no * 5) }
    ];
  }, [answeredCount, answeredLabels]);

  const eliminated = useMemo(() => {
    const offset = Math.min(careers.length, answeredCount);
    return careers.slice(offset).concat(careers.slice(0, offset)).filter((item) => item.slug !== guessedCareer?.slug).slice(0, 4);
  }, [answeredCount, guessedCareer]);

  const handleAnswer = (answer: string) => {
    if (!question || isGuessing || isRevealing) return;
    setAnswer(question.id, answer);
    setIsGuessing(true);
    window.setTimeout(() => nextQuestion(), 360);
  };

  const restart = () => {
    reset();
    setIsRevealing(false);
    setRevealConfidence(0);
  };

  return (
    <motion.main
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      className="relative z-10 h-[100svh] overflow-hidden p-3 text-white sm:p-4"
    >
      <div className="grid h-full grid-cols-4 gap-3 lg:grid-cols-12">
        <section className="relative col-span-4 hidden min-h-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-3 backdrop-blur-2xl md:grid lg:col-span-3">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-slate-500">
            <span>Astrabot</span>
            <button onClick={() => navigate('/')} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-slate-300 transition hover:text-white" title="Home">
              <Home size={14} />
            </button>
          </div>
          <div className="grid place-items-center">
            <Robot expression={isRevealing ? 'iKnowIt' : isGuessing ? 'processing' : 'thinking'} />
          </div>
          <div className="grid gap-2 self-end">
            <div className="rounded-lg border border-cyan-200/20 bg-cyan-200/10 p-3">
              <p className="text-xs font-semibold text-cyan-100">{thinkingMessages[messageIndex]}</p>
              <div className="mt-3 flex gap-1">
                {[0, 1, 2, 3, 4].map((index) => (
                  <motion.span
                    key={index}
                    className="h-1.5 flex-1 rounded-full bg-cyan-200/60"
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: 1.1, delay: index * 0.08, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="col-span-4 grid min-h-0 place-items-center overflow-hidden rounded-lg border border-white/10 bg-[#060812]/58 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl lg:col-span-5">
          <AnimatePresence mode="wait">
            {isRevealing && guessedCareer ? (
              <motion.div
                key="reveal"
                initial={false}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="relative w-full max-w-xl overflow-hidden rounded-lg border border-cyan-100/25 bg-white/[0.08] p-4 text-center shadow-[0_0_70px_rgba(93,220,255,0.18)] backdrop-blur-2xl"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(93,220,255,0.16),transparent_55%)]" />
                <div className="relative z-10">
                  <motion.div
                    className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full border border-cyan-200/30 bg-cyan-200/10"
                    animate={{ boxShadow: ['0 0 0 rgba(93,220,255,0)', '0 0 60px rgba(93,220,255,0.35)', '0 0 0 rgba(93,220,255,0)'] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    <Sparkles size={30} className="text-cyan-100" />
                  </motion.div>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-cyan-200">Guess Reveal</p>
                  <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">{guessedCareer.title}</h1>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-300">{guessedCareer.reason}</p>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Confidence</p>
                      <p className="mt-1 text-2xl font-semibold text-cyan-100">{revealConfidence}%</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">DNA</p>
                      <p className="mt-1 text-sm font-semibold text-white">{guessedCareer.visualTraits[0]}</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Next</p>
                      <p className="mt-1 text-sm font-semibold text-white">Dashboard</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={question?.id ?? 'done'}
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-2xl"
              >
                <div className="mb-3 grid grid-cols-[1fr_auto] gap-3">
                  <div className="rounded-lg border border-white/10 bg-white/[0.055] p-3">
                    <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-slate-500">
                      <span>Question {currentQuestion + 1} / {questions.length}</span>
                      <span>{currentConfidence}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div animate={{ width: `${progress}%` }} className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-white to-amber-200" />
                    </div>
                  </div>
                  <button onClick={restart} className="grid h-full min-w-20 place-items-center rounded-lg border border-white/10 bg-white/[0.055] px-3 text-xs font-semibold text-slate-300 transition hover:text-white">
                    Reset
                  </button>
                </div>

                <div className="rounded-lg border border-cyan-100/20 bg-white/[0.075] p-4 shadow-[0_0_60px_rgba(93,220,255,0.14)] backdrop-blur-2xl sm:p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-3 py-1.5 text-xs font-medium text-cyan-100">
                      <CircleDashed size={14} className={isGuessing ? 'animate-spin' : ''} />
                      {isGuessing ? 'Reasoning' : thinkingMessages[messageIndex]}
                    </span>
                    <span className="text-xs text-slate-400">Weight {question?.weight.toFixed(1)}</span>
                  </div>
                  <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    {question?.text ?? 'We have identified your likely path.'}
                  </h2>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {answerOptions.map((option) => (
                      <motion.button
                        key={option.key}
                        onClick={() => handleAnswer(option.key)}
                        disabled={isGuessing}
                        whileHover={!isGuessing ? { y: -2, scale: 1.01 } : {}}
                        whileTap={!isGuessing ? { scale: 0.98 } : {}}
                        className="group flex min-h-14 items-center justify-between rounded-lg border border-white/10 bg-slate-950/48 px-3 py-2 text-left transition disabled:opacity-50 hover:border-cyan-200/35 hover:bg-cyan-200/10"
                      >
                        <span>
                          <span className="block text-sm font-semibold text-white">{option.label}</span>
                          <span className="text-xs text-slate-500">{option.tone}</span>
                        </span>
                        {option.key === 'no' || option.key === 'probably-not' ? <X size={15} className="text-slate-500 group-hover:text-rose-200" /> : <Check size={15} className="text-slate-500 group-hover:text-cyan-100" />}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="col-span-4 hidden min-h-0 grid-rows-[auto_1fr_auto] gap-3 overflow-hidden lg:col-span-4 lg:grid">
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-3 backdrop-blur-2xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Career DNA Preview</p>
              <Brain size={15} className="text-cyan-200" />
            </div>
            <div className="grid gap-2">
              {dna.map((trait) => (
                <div key={trait.label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-slate-300">{trait.label}</span>
                    <span className="text-cyan-100">{trait.value}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div animate={{ width: `${trait.value}%` }} className="h-full rounded-full bg-cyan-200/70" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid min-h-0 gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.05] p-3 backdrop-blur-2xl">
              <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-slate-500">Live Eliminated Professions</p>
              <div className="grid gap-2">
                {eliminated.map((career) => (
                  <div key={career.slug} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                    <span className="truncate text-sm text-slate-300">{career.title}</span>
                    <span className="text-xs text-slate-500">low fit</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.05] p-3 backdrop-blur-2xl">
              <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-slate-500">Thinking Field</p>
              <div className="grid h-36 place-items-center rounded-lg border border-white/10 bg-black/20">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <motion.span
                    key={index}
                    className="absolute h-2 w-2 rounded-full bg-cyan-100"
                    animate={{
                      x: [Math.cos(index) * 70, 0, Math.cos(index + 1) * 70],
                      y: [Math.sin(index) * 46, 0, Math.sin(index + 1) * 46],
                      opacity: [0.24, 1, 0.24],
                      scale: [0.8, 1.4, 0.8]
                    }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.18, ease: 'easeInOut' }}
                  />
                ))}
                <span className="relative z-10 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">learning</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-cyan-200/20 bg-cyan-200/10 p-3 text-sm text-cyan-50 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <span>Dashboard transition</span>
              <ArrowRight size={15} />
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  );
}
