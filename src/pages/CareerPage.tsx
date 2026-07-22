import { motion } from 'framer-motion';
import {
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  Compass,
  GraduationCap,
  MessageCircleQuestion,
  PlaySquare,
  Rocket,
  Search,
  Sparkles,
  TrendingUp,
  Waypoints,
  Zap
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppChrome from '../components/AppChrome';
import { careers, type CareerProfile } from '../data/careers';
import { useAstrabotStore } from '../hooks/useAstrabot';

const resultTabs = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'roadmap', label: 'Plan', icon: Waypoints },
  { id: 'skills', label: 'Skills', icon: Rocket },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'market', label: 'Market', icon: TrendingUp },
  { id: 'galaxy', label: 'Galaxy', icon: Sparkles }
];

const sectionToTab: Record<string, string> = {
  overview: 'overview',
  roadmap: 'roadmap',
  projects: 'roadmap',
  interview: 'roadmap',
  skills: 'skills',
  courses: 'resources',
  books: 'resources',
  videos: 'resources',
  resources: 'resources',
  companies: 'resources',
  salary: 'market',
  future: 'market',
  demand: 'market',
  settings: 'overview'
};

function Surface({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 rounded-lg border border-white/10 bg-[#080b16]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ icon: Icon, eyebrow, title }: { icon: typeof Compass; eyebrow: string; title: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-200">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold leading-tight text-white">{title}</h2>
      </div>
      <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
        <Icon size={18} />
      </span>
    </div>
  );
}

function TagList({ items, limit = 8 }: { items: string[]; limit?: number }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.slice(0, limit).map((item) => (
        <span key={item} className="rounded-full border border-white/10 bg-white/[0.065] px-2.5 py-1.5 text-xs font-medium text-slate-200">
          {item}
        </span>
      ))}
    </div>
  );
}

function ListBlock({ items, limit = 5, numbered = false }: { items: string[]; limit?: number; numbered?: boolean }) {
  return (
    <div className="grid gap-2">
      {items.slice(0, limit).map((item, index) => (
        <div key={item} className="grid grid-cols-[auto_1fr] gap-2 rounded-lg border border-white/10 bg-black/20 p-2.5">
          <span className="grid h-6 w-6 place-items-center rounded-full border border-cyan-200/20 bg-cyan-200/10 text-[11px] font-semibold text-cyan-100">
            {numbered ? index + 1 : '-'}
          </span>
          <p className="min-w-0 text-sm leading-6 text-slate-300">{item}</p>
        </div>
      ))}
    </div>
  );
}

function ActionBoard({ career }: { career: CareerProfile }) {
  const actions = [
    {
      label: 'First Move',
      value: career.growthRoadmap[0],
      icon: Waypoints
    },
    {
      label: 'Portfolio Signal',
      value: career.projects[0],
      icon: BriefcaseBusiness
    },
    {
      label: 'Interview Focus',
      value: career.interviewQuestions[0],
      icon: MessageCircleQuestion
    }
  ];

  return (
    <div className="mt-3 grid gap-3 lg:grid-cols-3">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Surface key={action.label} className="p-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">{action.label}</p>
              <Icon size={15} className="text-cyan-200" />
            </div>
            <p className="text-sm font-medium leading-6 text-slate-200">{action.value}</p>
          </Surface>
        );
      })}
    </div>
  );
}

function InsightMetric({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.055] p-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
      {helper ? <p className="mt-1 text-xs leading-5 text-slate-400">{helper}</p> : null}
    </div>
  );
}

function ResourceGroup({ title, icon: Icon, items }: { title: string; icon: typeof BookOpen; items: string[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{title}</p>
        <Icon size={15} className="text-cyan-200" />
      </div>
      <ListBlock items={items} limit={3} />
    </div>
  );
}

function CareerGalaxy({ career }: { career: CareerProfile }) {
  const navigate = useNavigate();
  const nodes = useMemo(() => {
    const related = career.relatedCareers.map((title, index) => ({
      title,
      slug: title.toLowerCase().replace(/ /g, '-'),
      x: [20, 80, 30, 70][index % 4],
      y: [27, 31, 75, 72][index % 4]
    }));
    return [{ title: career.title, slug: career.slug, x: 50, y: 50 }, ...related];
  }, [career]);

  return (
    <div className="relative h-[320px] overflow-hidden rounded-lg border border-white/10 bg-black/25 sm:h-[360px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.slice(1).map((node) => (
          <motion.line
            key={node.title}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            stroke="rgba(125,220,255,0.34)"
            strokeWidth="0.35"
            initial={false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        ))}
      </svg>
      {nodes.map((node, index) => {
        const exists = careers.some((item) => item.slug === node.slug);
        return (
          <motion.button
            key={node.title}
            type="button"
            onClick={() => (exists ? navigate(`/career/${node.slug}`) : navigate('/search'))}
            className={`absolute max-w-[150px] -translate-x-1/2 -translate-y-1/2 truncate rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-xl transition ${
              index === 0
                ? 'border-cyan-100/50 bg-cyan-200/[0.18] text-cyan-50 shadow-[0_0_34px_rgba(93,220,255,0.28)]'
                : 'border-white/15 bg-white/[0.08] text-slate-200 hover:border-cyan-200/40 hover:bg-cyan-200/[0.12]'
            }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            {node.title}
          </motion.button>
        );
      })}
    </div>
  );
}

function ResultPanel({ career, activeTab }: { career: CareerProfile; activeTab: string }) {
  if (activeTab === 'roadmap') {
    return (
      <Surface className="p-4">
        <SectionTitle icon={Waypoints} eyebrow="Execution Plan" title="A practical path into the role" />
        <div className="grid gap-3 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Roadmap</p>
            <ListBlock items={career.growthRoadmap} numbered />
          </div>
          <div className="grid gap-3">
            <ResourceGroup title="Projects" icon={BriefcaseBusiness} items={career.projects} />
            <ResourceGroup title="Interview" icon={MessageCircleQuestion} items={career.interviewQuestions} />
          </div>
        </div>
      </Surface>
    );
  }

  if (activeTab === 'skills') {
    return (
      <Surface className="p-4">
        <SectionTitle icon={Rocket} eyebrow="Capability Map" title="Skills that define the fit" />
        <div className="grid gap-3 xl:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-black/20 p-3 xl:col-span-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Technical Skills</p>
            <TagList items={career.technicalSkills} />
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Soft Skills</p>
            <TagList items={career.softSkills} />
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-3 xl:col-span-3">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Core Stack</p>
            <TagList items={career.skills} />
          </div>
        </div>
      </Surface>
    );
  }

  if (activeTab === 'resources') {
    return (
      <Surface className="p-4">
        <SectionTitle icon={BookOpen} eyebrow="Learning System" title="Resources grouped by action" />
        <div className="grid gap-3 lg:grid-cols-2">
          <ResourceGroup title="Courses" icon={GraduationCap} items={career.courses} />
          <ResourceGroup title="Books" icon={BookOpen} items={career.books} />
          <ResourceGroup title="Videos" icon={PlaySquare} items={career.videos} />
          <ResourceGroup title="Certifications" icon={BadgeCheck} items={career.certifications} />
          <div className="rounded-lg border border-white/10 bg-black/20 p-3 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Target Companies</p>
              <Building2 size={15} className="text-cyan-200" />
            </div>
            <TagList items={career.companies} />
          </div>
        </div>
      </Surface>
    );
  }

  if (activeTab === 'market') {
    return (
      <Surface className="p-4">
        <SectionTitle icon={TrendingUp} eyebrow="Market Outlook" title="Salary, demand, future, and AI impact" />
        <div className="grid gap-3 lg:grid-cols-2">
          <InsightMetric label="Entry salary" value={career.salary.entry} helper={career.salary.note} />
          <InsightMetric label="Hiring demand" value={`${career.careerStats.hiringDemand}/5`} helper={`Future growth: ${career.careerStats.futureGrowth}`} />
          <InsightMetric label="Demand" value="Strong" helper={career.demand} />
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Future Outlook</p>
            <p className="text-sm leading-6 text-slate-300">{career.futureScope}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">AI Impact</p>
            <p className="text-sm leading-6 text-slate-300">{career.aiImpact}</p>
          </div>
        </div>
      </Surface>
    );
  }

  if (activeTab === 'galaxy') {
    return (
      <Surface className="p-4">
        <SectionTitle icon={Sparkles} eyebrow="Career Galaxy" title="Related professions as a map" />
        <CareerGalaxy career={career} />
      </Surface>
    );
  }

  return (
    <Surface className="p-4">
      <SectionTitle icon={Compass} eyebrow="Result Summary" title={`Why Astrabot chose ${career.title}`} />
      <div className="grid gap-3 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-white/10 bg-black/20 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Reasoning</p>
          <p className="text-sm leading-6 text-slate-300">{career.reason}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/20 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Daily Shape</p>
          <ListBlock items={career.dailyRoutine} limit={3} />
        </div>
        <div className="rounded-lg border border-white/10 bg-black/20 p-3 xl:col-span-2">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Education Baseline</p>
          <TagList items={career.education} />
        </div>
      </div>
    </Surface>
  );
}

export default function CareerPage() {
  const { slug } = useParams();
  const { selectCareer, recentCareers } = useAstrabotStore();
  const career = careers.find((item) => item.slug === slug);
  const [activeSection, setActiveSection] = useState('overview');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (career) selectCareer(career);
  }, [career, selectCareer]);

  const switchSection = (section: string) => {
    setActiveSection(section);
    setActiveTab(sectionToTab[section] ?? 'overview');
  };

  if (!career) {
    return (
      <AppChrome>
        <main className="grid min-h-screen place-items-center p-4 text-white">
          <Surface className="p-5 text-center">
            <p className="text-sm text-slate-300">Career not found</p>
            <Link to="/search" className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-200/10 px-4 py-2 text-sm text-cyan-100">
              <Search size={15} />
              Search careers
            </Link>
          </Surface>
        </main>
      </AppChrome>
    );
  }

  return (
    <AppChrome activeSection={activeSection} onSectionChange={switchSection}>
      <motion.main
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.42, ease: 'easeOut' }}
        className="relative z-10 max-h-screen overflow-y-auto overflow-x-hidden px-3 pb-4 pt-[68px] text-white sm:px-4 lg:px-5 lg:pt-3"
      >
        <div className="mx-auto grid max-w-[1500px] gap-3">
          <Surface className="overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[1fr_300px]">
              <div className="min-w-0 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-200">Final Result</p>
                <div className="mt-2 flex min-w-0 flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
                  <div className="min-w-0">
                    <h1 className="break-words text-3xl font-semibold leading-tight text-white sm:text-4xl">{career.title}</h1>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{career.overview}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:min-w-[380px]">
                    {career.visualTraits.map((trait) => (
                      <div key={trait} className="rounded-lg border border-white/10 bg-white/[0.055] p-2.5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">DNA</p>
                        <p className="mt-1 truncate text-sm font-semibold text-white">{trait}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid border-t border-white/10 bg-cyan-200/[0.07] p-4 lg:border-l lg:border-t-0">
                <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-100">Confidence</p>
                <p className="mt-1 text-5xl font-semibold leading-none text-white">{career.confidence}%</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-white to-amber-200" initial={false} animate={{ width: `${career.confidence}%` }} />
                </div>
              </div>
            </div>
          </Surface>

          <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <Surface className="mb-3 p-2">
                <div className="grid grid-cols-3 gap-1 sm:grid-cols-6">
                  {resultTabs.map((tab) => {
                    const Icon = tab.icon;
                    const selected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(tab.id);
                          setActiveSection(tab.id === 'market' ? 'salary' : tab.id);
                        }}
                        className={`flex min-h-10 items-center justify-center gap-1.5 rounded-lg border px-2 text-xs font-semibold transition ${
                          selected
                            ? 'border-cyan-200/40 bg-cyan-200/[0.14] text-cyan-50 shadow-[0_0_26px_rgba(93,220,255,0.13)]'
                            : 'border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        <Icon size={14} />
                        <span className="truncate">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Surface>

              <motion.div
                key={activeTab}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <ResultPanel career={career} activeTab={activeTab} />
              </motion.div>
              <ActionBoard career={career} />
            </div>

            <aside className="grid min-w-0 gap-3 xl:content-start">
              <Surface className="p-3">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Quick Facts</p>
                  <CircleDollarSign size={15} className="text-cyan-200" />
                </div>
                <div className="grid gap-2">
                  <InsightMetric label="Category" value={career.category} helper={career.description} />
                  <InsightMetric label="Entry salary" value={career.salary.entry} />
                  <InsightMetric label="Mid career" value={career.salary.mid} />
                  <InsightMetric label="Senior" value={career.salary.senior} />
                  <InsightMetric label="Work-life balance" value={`${career.careerStats.workLifeBalance}/5`} />
                  <InsightMetric label="Demand" value="High" helper={career.demand} />
                </div>
              </Surface>

              <Surface className="p-3">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Career DNA</p>
                  <Zap size={15} className="text-cyan-200" />
                </div>
                <div className="grid gap-2">
                  {career.visualTraits.map((trait, index) => (
                    <div key={trait}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-slate-300">{trait}</span>
                        <span className="text-cyan-100">{[92, 86, 79][index] ?? 84}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-cyan-200/70" style={{ width: `${[92, 86, 79][index] ?? 84}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Surface>

              <Surface className="p-3">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Recent</p>
                  <Compass size={15} className="text-cyan-200" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {(recentCareers.length ? recentCareers : [career]).map((item) => (
                    <Link key={item.slug} to={`/career/${item.slug}`} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-slate-200 transition hover:border-cyan-200/30 hover:text-cyan-100">
                      {item.title}
                    </Link>
                  ))}
                </div>
              </Surface>
            </aside>
          </div>
        </div>
      </motion.main>
    </AppChrome>
  );
}
