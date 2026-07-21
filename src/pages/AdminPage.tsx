import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Brain, CheckCircle2, Database, Gauge, LineChart, Shield, Sparkles, Timer } from 'lucide-react';
import AppChrome from '../components/AppChrome';
import { Card } from '../components/ui/Card';

const metrics = [
  { label: 'Accuracy', value: '91.3%', delta: '+2.4%', icon: Gauge },
  { label: 'Failed Guesses', value: '8', delta: '-3 today', icon: AlertTriangle },
  { label: 'Learning Queue', value: '23', delta: '6 urgent', icon: Brain },
  { label: 'Career Count', value: '124k', delta: '+180', icon: Database },
  { label: 'Questions', value: '320', delta: '18 active', icon: Sparkles },
  { label: 'Latency', value: '420ms', delta: 'p95', icon: Timer }
];

const learningQueue = ['Robotics Ethicist', 'AI Product Counsel', 'Synthetic Data Engineer', 'Prompt Systems Designer'];
const failedGuesses = ['Actuary vs Data Scientist', 'UX Researcher vs Product Designer', 'ML Engineer vs Software Engineer'];
const chartBars = [42, 58, 46, 72, 64, 86, 78, 92, 84, 96, 88, 91];

export default function AdminPage() {
  return (
    <AppChrome activeSection="admin">
      <motion.main
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.42, ease: 'easeOut' }}
        className="relative z-10 h-[100svh] overflow-hidden px-3 pb-3 pt-[68px] text-white sm:px-4 lg:px-5 lg:pt-3"
      >
        <div className="mx-auto grid h-full max-w-[1540px] grid-rows-[auto_1fr] gap-3">
          <section className="grid gap-3 lg:grid-cols-12">
            <div className="rounded-lg border border-white/10 bg-[#060812]/68 p-4 backdrop-blur-2xl lg:col-span-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-200">Admin Console</p>
                  <h1 className="mt-1 text-3xl font-semibold leading-tight">Astrabot Intelligence</h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Monitor guesses, tune learning signals, and keep the career graph healthy.</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100">
                  <CheckCircle2 size={16} />
                  Systems nominal
                </div>
              </div>
            </div>
            <Card className="p-4 lg:col-span-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Model Health</p>
                <Activity size={16} className="text-cyan-200" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['Decision', 'Retrieval', 'Learning'].map((item, index) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-black/20 p-3">
                    <p className="text-xs text-slate-400">{item}</p>
                    <p className="mt-1 text-lg font-semibold text-white">{[98, 94, 87][index]}%</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="grid min-h-0 gap-3 overflow-hidden lg:grid-cols-12">
            <div className="grid min-h-0 gap-3 overflow-y-auto pr-1 lg:col-span-7 xl:grid-cols-3">
              {metrics.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.label} className="p-3">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
                        <Icon size={16} />
                      </span>
                      <span className="text-xs text-slate-400">{item.delta}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">{item.label}</p>
                    <p className="mt-1 text-3xl font-semibold text-white">{item.value}</p>
                  </Card>
                );
              })}

              <Card className="p-3 xl:col-span-3">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Guess Accuracy Trend</p>
                  <LineChart size={16} className="text-cyan-200" />
                </div>
                <div className="flex h-44 items-end gap-2 rounded-lg border border-white/10 bg-black/20 p-3">
                  {chartBars.map((height, index) => (
                    <motion.div
                      key={`${height}-${index}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: index * 0.035, duration: 0.45 }}
                      className="flex-1 rounded-t bg-gradient-to-t from-cyan-300/25 to-cyan-100/80"
                    />
                  ))}
                </div>
              </Card>
            </div>

            <div className="grid min-h-0 gap-3 overflow-hidden lg:col-span-5">
              <Card className="min-h-0 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Learning Queue</p>
                  <Brain size={16} className="text-cyan-200" />
                </div>
                <div className="grid gap-2">
                  {learningQueue.map((item, index) => (
                    <div key={item} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                      <span className="text-sm text-slate-200">{item}</span>
                      <span className="text-xs text-cyan-100">#{index + 1}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="min-h-0 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Failed Guesses</p>
                  <AlertTriangle size={16} className="text-amber-200" />
                </div>
                <div className="grid gap-2">
                  {failedGuesses.map((item) => (
                    <div key={item} className="rounded-lg border border-white/10 bg-black/20 p-3">
                      <p className="text-sm font-medium text-white">{item}</p>
                      <p className="mt-1 text-xs text-slate-500">Needs distinguishing question</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-3">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Controls</p>
                  <Shield size={16} className="text-cyan-200" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Retrain', 'Moderate', 'Export', 'Audit'].map((item) => (
                    <button key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-200/35 hover:bg-cyan-200/10">
                      {item}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        </div>
      </motion.main>
    </AppChrome>
  );
}
