import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Brain, BookOpen, BriefcaseBusiness, Compass, GraduationCap, MessageCircleQuestion, Rocket, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { careers } from '../data/careers';
import { useAstrabotStore } from '../hooks/useAstrabot';

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'skills', label: 'Skills' },
  { id: 'salary', label: 'Salary' },
  { id: 'future', label: 'Future' },
  { id: 'ai-impact', label: 'AI Impact' },
  { id: 'projects', label: 'Projects' },
  { id: 'courses', label: 'Courses' },
  { id: 'interview', label: 'Interview' },
  { id: 'related', label: 'Related Careers' },
  { id: 'faqs', label: 'FAQs' }
];

export default function CareerPage() {
  const { slug } = useParams();
  const { selectCareer, recentCareers } = useAstrabotStore();
  const career = careers.find((item) => item.slug === slug);

  // Track which career was last selected to avoid unnecessary updates
  useEffect(() => {
    if (career) {
      selectCareer(career);
    }
  }, [slug]); // Only depend on slug changing

  if (!career) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(93,220,255,0.12),_transparent_35%)] text-white">
        <div className="text-center">
          <p className="text-lg text-slate-300">Career not found</p>
        </div>
      </main>
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0, y: 24 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(93,220,255,0.12),_transparent_35%)] px-4 py-8 text-white sm:px-8 lg:px-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row">
        <aside className="lg:sticky lg:top-6 lg:h-fit lg:w-72">
          <Card className="p-5">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 p-2">
                <Compass size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Career map</p>
                <p className="text-lg font-semibold">Astrabot Atlas</p>
              </div>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="block rounded-2xl border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10">
                  {item.label}
                </a>
              ))}
            </nav>
          </Card>
        </aside>

        <div className="flex-1 space-y-6">
          <Card className="p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-300">Guessed Profession</p>
                <h1 className="text-4xl font-semibold sm:text-5xl">{career.title}</h1>
              </div>
              <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
                Confidence {career.confidence}%
              </div>
            </div>
            <p className="max-w-3xl text-lg text-slate-300">{career.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {career.visualTraits.map((trait) => (
                <span key={trait} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">{trait}</span>
              ))}
            </div>
          </Card>

          <div id="overview" className="grid gap-6 lg:grid-cols-3">
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <Brain className="text-cyan-300" />
                <h2 className="text-lg font-semibold">Why this match</h2>
              </div>
              <p className="text-sm leading-7 text-slate-300">{career.reason}</p>
            </Card>
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <GraduationCap className="text-cyan-300" />
                <h2 className="text-lg font-semibold">Education</h2>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                {career.education.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </Card>
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <BriefcaseBusiness className="text-cyan-300" />
                <h2 className="text-lg font-semibold">Demand</h2>
              </div>
              <p className="text-sm leading-7 text-slate-300">{career.demand}</p>
            </Card>
          </div>

          <Card id="skills" className="p-8">
            <div className="mb-6 flex items-center gap-3">
              <Rocket className="text-cyan-300" />
              <h2 className="text-2xl font-semibold">Core Skills</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">Technical</h3>
                <div className="flex flex-wrap gap-2">
                  {career.technicalSkills.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {career.softSkills.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card id="salary" className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="text-cyan-300" />
              <h2 className="text-2xl font-semibold">Salary & Outlook</h2>
            </div>
            <p className="text-lg text-slate-300">{career.salary}</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{career.futureScope}</p>
          </Card>

          <Card id="ai-impact" className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <Brain className="text-cyan-300" />
              <h2 className="text-2xl font-semibold">AI Impact</h2>
            </div>
            <p className="text-sm leading-7 text-slate-300">{career.aiImpact}</p>
          </Card>

          <Card id="projects" className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <Rocket className="text-cyan-300" />
              <h2 className="text-2xl font-semibold">Projects</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {career.projects.map((project) => (
                <div key={project} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">{project}</div>
              ))}
            </div>
          </Card>

          <Card id="courses" className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <BookOpen className="text-cyan-300" />
              <h2 className="text-2xl font-semibold">Courses & Books</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">Courses</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {career.courses.map((course) => <li key={course}>• {course}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">Books</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {career.books.map((book) => <li key={book}>• {book}</li>)}
                </ul>
              </div>
            </div>
          </Card>

          <Card id="interview" className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <MessageCircleQuestion className="text-cyan-300" />
              <h2 className="text-2xl font-semibold">Interview Questions</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              {career.interviewQuestions.map((question) => <li key={question}>• {question}</li>)}
            </ul>
          </Card>

          <Card id="related" className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <Compass className="text-cyan-300" />
              <h2 className="text-2xl font-semibold">Related Careers</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {career.relatedCareers.map((related) => (
                <Link key={related} to={`/career/${related.toLowerCase().replace(/ /g, '-')}`} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10">
                  {related}
                </Link>
              ))}
            </div>
          </Card>

          <Card id="faqs" className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="text-cyan-300" />
              <h2 className="text-2xl font-semibold">FAQs</h2>
            </div>
            <div className="space-y-4">
              {career.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-2 font-medium text-white">{faq.question}</p>
                  <p className="text-sm text-slate-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="mb-4 text-2xl font-semibold">Recent explorations</h2>
            <div className="flex flex-wrap gap-3">
              {recentCareers.length > 0 ? recentCareers.map((item) => (
                <Link key={item.slug} to={`/career/${item.slug}`} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
                  {item.title}
                </Link>
              )) : <p className="text-sm text-slate-300">Your recent career discoveries will appear here.</p>}
            </div>
          </Card>
        </div>
      </div>
    </motion.main>
  );
}
