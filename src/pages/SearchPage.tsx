import { motion } from 'framer-motion';
import { ArrowRight, Clock, Flame, Search, Sparkles, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AppChrome from '../components/AppChrome';
import { careers } from '../data/careers';
import { useAstrabotStore } from '../hooks/useAstrabot';

export default function SearchPage() {
  const { recentCareers } = useAstrabotStore();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return careers;
    return careers.filter((career) =>
      [career.title, career.description, career.category, ...career.skills, ...career.visualTraits]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [query]);

  const recent = recentCareers.length ? recentCareers : careers.slice(0, 2);
  const popular = careers.slice().sort((a, b) => b.confidence - a.confidence);
  const suggestions = ['AI-native roles', 'High salary', 'Design systems', 'Data careers', 'Startup operators', 'Future-proof paths'];

  return (
    <AppChrome activeSection="resources">
      <motion.main
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.42, ease: 'easeOut' }}
        className="relative z-10 h-[100svh] overflow-hidden px-3 pb-3 pt-[68px] text-white sm:px-4 lg:px-5 lg:pt-3"
      >
        <div className="mx-auto grid h-full max-w-[1540px] grid-cols-4 gap-3 lg:grid-cols-12">
          <section className="col-span-4 grid min-h-0 grid-rows-[auto_auto_1fr] gap-3 lg:col-span-4">
            <div className="rounded-lg border border-white/10 bg-[#060812]/68 p-4 backdrop-blur-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-200">Career Explorer</p>
              <h1 className="mt-1 text-3xl font-semibold leading-tight">Search the galaxy</h1>
              <p className="mt-2 text-sm leading-6 text-slate-300">Find career paths, compare signals, and jump straight into guidance dashboards.</p>
              <label className="mt-4 flex items-center gap-2 rounded-lg border border-cyan-200/25 bg-cyan-200/10 px-3 py-2.5 shadow-[0_0_34px_rgba(93,220,255,0.1)]">
                <Search size={17} className="text-cyan-100" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search profession, skill, category..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/[0.055] p-3 backdrop-blur-2xl">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Recent</p>
                  <Clock size={14} className="text-cyan-200" />
                </div>
                <div className="grid gap-2">
                  {recent.map((career) => (
                    <Link key={career.slug} to={`/career/${career.slug}`} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-200/30 hover:bg-cyan-200/10">
                      {career.title}
                      <ArrowRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.055] p-3 backdrop-blur-2xl">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Trending</p>
                  <Flame size={14} className="text-amber-200" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.slice(0, 4).map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item.split(' ')[0])}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-slate-200 transition hover:border-cyan-200/30 hover:text-cyan-100"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden min-h-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.05] p-3 backdrop-blur-2xl lg:block">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Popular Careers</p>
                <TrendingUp size={14} className="text-cyan-200" />
              </div>
              <div className="grid gap-2">
                {popular.map((career) => (
                  <Link key={career.slug} to={`/career/${career.slug}`} className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 transition hover:border-cyan-200/30 hover:bg-cyan-200/10">
                    <span className="truncate text-sm text-slate-200">{career.title}</span>
                    <span className="text-xs text-cyan-100">{career.confidence}%</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="col-span-4 min-h-0 overflow-hidden rounded-lg border border-white/10 bg-[#060812]/58 p-3 backdrop-blur-2xl lg:col-span-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Results</p>
                <h2 className="text-xl font-semibold">{results.length} matching paths</h2>
              </div>
              <div className="flex gap-2">
                {suggestions.slice(0, 3).map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item.split(' ')[0])}
                    className="hidden rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs text-slate-300 transition hover:text-white sm:inline-flex"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid max-h-[calc(100svh-152px)] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((career) => (
                <motion.div key={career.slug} layout className="rounded-lg border border-white/10 bg-white/[0.055] p-3 backdrop-blur-2xl transition hover:border-cyan-200/30 hover:bg-cyan-200/10">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full border border-cyan-200/25 bg-cyan-200/10 px-2 py-1 text-[11px] text-cyan-100">{career.category}</span>
                    <span className="text-xs text-slate-400">{career.confidence}%</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-tight">{career.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">{career.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {career.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[11px] text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link to={`/career/${career.slug}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-200/35 hover:bg-cyan-200/[0.12]">
                    Open dashboard
                    <Sparkles size={14} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </motion.main>
    </AppChrome>
  );
}
