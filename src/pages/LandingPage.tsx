import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Robot from '../components/Robot';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(93,220,255,0.08),_transparent_45%)] text-white">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(93,220,255,0.08),_transparent_35%)]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_0%,transparent_45%,rgba(93,220,255,0.04)_100%)]" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-20 text-center sm:px-10 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-cyan-200">
          <Sparkles size={16} />
          AI Career Discovery Platform
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }} className="mb-5 text-5xl font-semibold tracking-[0.22em] text-white sm:text-7xl lg:text-8xl">
          ASTRABOT
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="mb-8 max-w-2xl text-lg text-slate-300 sm:text-xl">
          Discover. Decide. Become. Astrabot identifies the profession you’re thinking of and guides you into a confident next step.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="mb-10 flex flex-col items-center gap-4">
          <Robot />
          <div className="rounded-[24px] border border-cyan-400/20 bg-slate-950/60 px-6 py-4 text-lg text-slate-200 shadow-[0_0_80px_rgba(93,220,255,0.12)]">
            Think of a profession...<br />I’ll discover it.
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          onClick={() => navigate('/questions')}
          className="group inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-7 py-3 text-sm font-medium uppercase tracking-[0.28em] text-cyan-100 transition hover:bg-cyan-400/20"
        >
          Start
          <ArrowRight className="transition group-hover:translate-x-1" size={18} />
        </motion.button>
      </section>
    </main>
  );
}
