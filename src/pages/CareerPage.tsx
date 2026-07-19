import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Brain, BookOpen, BriefcaseBusiness, Compass, GraduationCap, MessageCircleQuestion, Rocket, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { careers } from '../data/careers';
import { useAstrabotStore } from '../hooks/useAstrabot';

const navItems = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'skills', label: 'Skills', icon: Rocket },
  { id: 'salary', label: 'Salary', icon: Sparkles },
  { id: 'ai-impact', label: 'AI Impact', icon: Brain },
  { id: 'projects', label: 'Projects', icon: BriefcaseBusiness },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'interview', label: 'Interview', icon: MessageCircleQuestion },
  { id: 'related', label: 'Related', icon: Compass }
];

export default function CareerPage() {
  const { slug } = useParams();
  const { selectCareer, recentCareers } = useAstrabotStore();
  const career = careers.find((item) => item.slug === slug);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (career) {
      selectCareer(career);
    }
  }, [slug]);

  if (!career) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(93,220,255,0.12),_transparent_35%)] text-white">
        <div className="text-center">
          <p className="text-lg text-slate-300">Career not found</p>
        </div>
      </main>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-cyan-300">Why this match</h3>
              <p className="text-sm text-slate-300">{career.reason}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-cyan-300">Education</h3>
              <ul className="space-y-1 text-sm text-slate-300">
                {career.education.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-cyan-300">Demand</h3>
              <p className="text-sm text-slate-300">{career.demand}</p>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-3">
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-cyan-300">Technical</h3>
              <div className="flex flex-wrap gap-2">
                {career.technicalSkills.slice(0, 5).map((skill) => (
                  <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-cyan-300">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {career.softSkills.slice(0, 5).map((skill) => (
                  <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        );
      case 'salary':
        return (
          <div className="space-y-3">
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-cyan-300">Compensation</h3>
              <p className="text-lg font-semibold text-white">{career.salary}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-cyan-300">Future Outlook</h3>
              <p className="text-sm text-slate-300">{career.futureScope}</p>
            </div>
          </div>
        );
      case 'ai-impact':
        return (
          <div>
            <p className="text-sm leading-6 text-slate-300">{career.aiImpact}</p>
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-2">
            {career.projects.slice(0, 3).map((project) => (
              <div key={project} className="rounded-lg border border-white/10 bg-white/5 p-2 text-xs text-slate-300">{project}</div>
            ))}
          </div>
        );
      case 'courses':
        return (
          <div className="space-y-2">
            <div>
              <h3 className="mb-1 text-xs font-semibold uppercase text-cyan-300">Top courses</h3>
              <ul className="space-y-1 text-xs text-slate-300">
                {career.courses.slice(0, 3).map((course) => <li key={course}>• {course}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-1 text-xs font-semibold uppercase text-cyan-300">Books</h3>
              <ul className="space-y-1 text-xs text-slate-300">
                {career.books.slice(0, 3).map((book) => <li key={book}>• {book}</li>)}
              </ul>
            </div>
          </div>
        );
      case 'interview':
        return (
          <div className="space-y-2">
            {career.interviewQuestions.slice(0, 3).map((question) => (
              <div key={question} className="rounded-lg border border-white/10 bg-white/5 p-2 text-xs text-slate-300">{question}</div>
            ))}
          </div>
        );
      case 'related':
        return (
          <div className="flex flex-wrap gap-2">
            {career.relatedCareers.map((related) => (
              <Link key={related} to={`/career/${related.toLowerCase().replace(/ /g, '-')}`} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10">
                {related}
              </Link>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.main 
      initial={{ opacity: 0, y: 24 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="h-screen bg-[radial-gradient(circle_at_top,_rgba(93,220,255,0.12),_transparent_35%)] px-4 py-6 text-white overflow-hidden sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl h-full gap-4">
        {/* Sidebar */}
        <aside className="w-40 flex-shrink-0 overflow-y-auto">
          <Card className="p-3">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 p-1.5">
                <Compass size={14} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Career</p>
                <p className="text-sm font-semibold">Atlas</p>
              </div>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full rounded-lg px-2 py-1.5 text-xs transition flex items-center gap-2 ${
                      activeTab === item.id
                        ? 'border border-cyan-400/40 bg-cyan-400/15 text-cyan-100'
                        : 'border border-white/10 text-slate-300 hover:border-cyan-400/20 hover:bg-cyan-400/5'
                    }`}
                  >
                    <Icon size={12} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <div className="mb-3 flex-shrink-0">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Career</p>
                <h1 className="text-3xl font-semibold">{career.title}</h1>
              </div>
              <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                {career.confidence}%
              </div>
            </div>
          </div>

          {/* Content Area */}
          <Card className="flex-1 overflow-y-auto p-5">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {renderContent()}
              
              {/* Recent Careers */}
              {activeTab === 'overview' && recentCareers.length > 0 && (
                <div className="mt-4 border-t border-white/10 pt-3">
                  <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Recent</p>
                  <div className="flex flex-wrap gap-2">
                    {recentCareers.map((item) => (
                      <Link key={item.slug} to={`/career/${item.slug}`} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-100 transition hover:border-cyan-400/40 hover:bg-cyan-400/15">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </Card>
        </div>
      </div>
    </motion.main>
  );
}
