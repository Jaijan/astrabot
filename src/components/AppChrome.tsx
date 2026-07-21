import {
  BookOpen,
  Bot,
  Building2,
  CircleDollarSign,
  Compass,
  FolderKanban,
  GraduationCap,
  Home,
  MessageCircleQuestion,
  PlaySquare,
  Rocket,
  Search,
  Settings,
  Shield,
  Sparkles,
  Telescope,
  TrendingUp,
  Waypoints
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'roadmap', label: 'Roadmap', icon: Waypoints },
  { id: 'skills', label: 'Skills', icon: Rocket },
  { id: 'salary', label: 'Salary', icon: CircleDollarSign },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'courses', label: 'Courses', icon: GraduationCap },
  { id: 'books', label: 'Books', icon: BookOpen },
  { id: 'videos', label: 'Videos', icon: PlaySquare },
  { id: 'interview', label: 'Interview', icon: MessageCircleQuestion },
  { id: 'companies', label: 'Companies', icon: Building2 },
  { id: 'future', label: 'Future', icon: TrendingUp },
  { id: 'resources', label: 'Resources', icon: Telescope },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'admin', label: 'Admin', icon: Shield, route: '/admin' }
];

interface AppChromeProps {
  children: ReactNode;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function AppChrome({ children, activeSection, onSectionChange }: AppChromeProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItem = (item: (typeof sidebarItems)[number]) => {
    if (item.route) {
      navigate(item.route);
      return;
    }
    onSectionChange?.(item.id);
  };

  return (
    <div className="relative z-10 min-h-screen text-white">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[86px] border-r border-white/10 bg-[#060812]/72 px-2 py-3 backdrop-blur-2xl lg:flex lg:flex-col">
        <Link
          to="/"
          className="mb-3 flex h-12 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-100 shadow-[0_0_32px_rgba(93,220,255,0.12)]"
          aria-label="Astrabot home"
          title="Home"
        >
          <Bot size={22} />
        </Link>

        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeSection === item.id ||
              (item.route ? location.pathname === item.route : false);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItem(item)}
                className={`group grid min-h-[46px] place-items-center gap-0.5 rounded-lg border px-1.5 py-1 text-[10px] font-medium transition ${
                  isActive
                    ? 'border-cyan-300/35 bg-cyan-300/[0.14] text-cyan-100 shadow-[0_0_28px_rgba(93,220,255,0.12)]'
                    : 'border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.06] hover:text-white'
                }`}
                title={item.label}
              >
                <Icon size={15} className="transition group-hover:-translate-y-0.5" />
                <span className="max-w-full truncate leading-none">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-2 grid gap-1">
          <Link
            to="/search"
            className={`grid h-10 place-items-center rounded-lg border transition ${
              location.pathname === '/search'
                ? 'border-cyan-300/35 bg-cyan-300/[0.14] text-cyan-100'
                : 'border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
            }`}
            title="Search"
          >
            <Search size={16} />
          </Link>
          <Link
            to="/questions"
            className="grid h-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-white/[0.08]"
            title="Question Engine"
          >
            <Sparkles size={16} />
          </Link>
        </div>
      </aside>

      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-[#060812]/76 px-3 backdrop-blur-2xl lg:left-[86px] lg:hidden">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
            <Bot size={16} />
          </span>
          Astrabot
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/search" className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-slate-200" title="Search">
            <Search size={15} />
          </Link>
          <Link to="/questions" className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100" title="Question Engine">
            <Home size={15} />
          </Link>
        </div>
      </header>

      <div className="min-h-screen lg:pl-[86px]">{children}</div>
    </div>
  );
}
