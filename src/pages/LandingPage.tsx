import { motion } from 'framer-motion';
import { ArrowRight, Bot, Gauge, Orbit, Search, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Robot from '../components/Robot';
import { useAstrabotStore } from '../hooks/useAstrabot';

export default function LandingPage() {
  const navigate = useNavigate();
  const reset = useAstrabotStore((state) => state.reset);
  const signals = ['Adaptive questions', 'Career DNA', 'Galaxy explorer', 'Live confidence'];
  const boot = ['Initializing Orion', 'Loading Atlas', 'Synchronizing Nova', 'Starting Vega'];
  const startEngine = () => {
    reset();
    navigate('/questions');
  };

  return (
    <motion.main
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.015 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative z-10 h-[100svh] overflow-hidden px-3 py-3 text-white sm:px-4 sm:py-4"
    >
      <section className="grid h-full grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-12">
        <div className="hidden min-h-0 flex-col gap-3 lg:col-span-3 lg:flex">
          <div className="rounded-lg border border-white/10 bg-white/[0.055] p-3 backdrop-blur-2xl">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                  <Bot size={17} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Launch</p>
                  <p className="text-sm font-semibold">Astrabot</p>
                </div>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            </div>
            <div className="grid gap-2">
              {boot.map((item, index) => (
                <motion.div
                  key={item}
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.08 }}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-slate-300"
                >
                  {item}
                  <span className="text-cyan-200">online</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid flex-1 gap-3">
            {signals.map((signal, index) => (
              <motion.div
                key={signal}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + index * 0.07 }}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-3 backdrop-blur-2xl"
              >
                <p className="text-[11px] font-medium text-slate-400">0{index + 1}</p>
                <p className="mt-2 text-sm font-semibold text-white">{signal}</p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-white to-amber-200"
                    animate={{ width: ['24%', '92%', '48%'] }}
                    transition={{ duration: 3.2 + index, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative col-span-4 grid min-h-0 place-items-center overflow-hidden rounded-lg border border-white/10 bg-[#060812]/44 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-3 lg:col-span-6">
          <div className="absolute left-3 right-3 top-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-slate-500">
            <span className="flex items-center gap-2"><Orbit size={13} /> Career Oracle</span>
            <span>v1.0</span>
          </div>

          <div className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-2 pb-1 pt-8 text-center sm:gap-3 sm:pb-0 sm:pt-0">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-full max-w-[300px] flex-shrink-0 rounded-lg border border-cyan-200/20 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-200 shadow-[0_0_50px_rgba(93,220,255,0.14)] backdrop-blur-2xl sm:max-w-[420px] sm:px-4 sm:py-3 sm:text-base"
            >
              Think of a profession. I will discover it.
              <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-cyan-200/20 bg-slate-950/70" />
            </motion.div>

            <div className="flex-shrink-0 scale-90 sm:scale-100">
              <Robot expression="curious" />
            </div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="w-full max-w-xl flex-shrink-0"
            >
              <div className="mb-2 sm:mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-cyan-200">Astrabot</p>
                <h1 className="mx-auto mt-1 max-w-[300px] text-2xl font-semibold leading-tight text-white sm:max-w-xl sm:text-5xl sm:leading-none lg:text-6xl">
                  <span className="block sm:inline">Discover. Decide.</span>
                  <span className="block sm:inline"> Become.</span>
                </h1>
              </div>
              <p className="mx-auto hidden max-w-lg text-sm leading-6 text-slate-300 sm:block sm:text-base">
                An AI career companion that narrows your profession through questions, reveals the match, then opens a guidance dashboard.
              </p>
            </motion.div>

            <div className="flex w-full max-w-[300px] flex-shrink-0 flex-col gap-2 sm:max-w-md sm:flex-row">
              <button
                onClick={startEngine}
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-200/10 px-4 py-3 text-sm font-semibold text-cyan-50 shadow-[0_0_36px_rgba(93,220,255,0.15)] transition hover:border-cyan-100/60 hover:bg-cyan-200/20"
              >
                Start Engine
                <ArrowRight className="transition group-hover:translate-x-1" size={16} />
              </button>
              <button
                onClick={() => navigate('/search')}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.1]"
              >
                <Search size={16} />
                Explore
              </button>
            </div>
          </div>
        </div>

        <div className="hidden min-h-0 grid-rows-[1fr_1fr_1fr] gap-3 lg:col-span-3 lg:grid">
          {[
            ['Career DNA', 'Analytical', '82%'],
            ['Confidence', 'Calibrating', '67%'],
            ['Galaxy', '3 core nodes', 'live']
          ].map(([label, value, metric], index) => (
            <motion.div
              key={label}
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.08 }}
              className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.05] p-3 backdrop-blur-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent" />
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
                {index === 1 ? <Gauge size={15} className="text-cyan-200" /> : <Sparkles size={15} className="text-cyan-200" />}
              </div>
              <p className="mt-5 text-2xl font-semibold">{metric}</p>
              <p className="mt-1 text-sm text-slate-400">{value}</p>
              <div className="absolute bottom-3 left-3 right-3 h-14 rounded-lg border border-white/10 bg-[linear-gradient(115deg,rgba(93,220,255,0.12),rgba(255,255,255,0.02),rgba(247,196,120,0.1))]" />
            </motion.div>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
