import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  FlaskConical,
  Activity,
  Award,
  Sparkles,
  GraduationCap,
  Calculator,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
  Flame,
  Zap,
  Search,
  Target,
  Trophy,
  Camera,
  CheckSquare,
  Square,
  FileText,
  Map,
  Microscope,
  X,
  ExternalLink,
  BarChart3,
  ArrowLeft,
  Filter,
  Menu
} from 'lucide-react';
import { KENYA_COURSES } from './data/curriculumData';
import { SyllabusBrowser } from './components/SyllabusBrowser';
import { GradeCalculator } from './components/GradeCalculator';
import { StudyPlanner } from './components/StudyPlanner';
import { AITutorModal } from './components/AITutorModal';
import { ExamTestModal } from './components/ExamTestModal';
import { TitrationSim } from './components/simulations/TitrationSim';
import { CircuitSim } from './components/simulations/CircuitSim';
import { OsmosisSim } from './components/simulations/OsmosisSim';
import { AlgorithmSim } from './components/simulations/AlgorithmSim';
import { QualitativeAnalysisSim } from './components/simulations/QualitativeAnalysisSim';
import { ExamPaper } from './types/curriculum';
import { SetBooksGuide } from './components/SetBooksGuide';
import { QuizEngine } from './components/QuizEngine';
import { ScienceReferenceHub } from './components/ScienceReferenceHub';
import { FlashcardsDeck } from './components/FlashcardsDeck';
import { CbcPathwayAdvisor } from './components/CbcPathwayAdvisor';
import { FourFigureTables } from './components/FourFigureTables';
import { KiswahiliCompanion } from './components/KiswahiliCompanion';
import { KnecProjectTracker } from './components/KnecProjectTracker';
import { AudioVoiceReader } from './components/AudioVoiceReader';
import { NationalSchoolsDirectory } from './components/NationalSchoolsDirectory';
import { MathGraphVisualizer } from './components/MathGraphVisualizer';
import { NationalMocksArchive } from './components/NationalMocksArchive';
import { PrintableRevisionHub } from './components/PrintableRevisionHub';
import { GeographyMapworkStudio } from './components/GeographyMapworkStudio';
import { EnglishMasteryHub } from './components/EnglishMasteryHub';
import { PhysicsPracticalGrapher } from './components/PhysicsPracticalGrapher';
import { FocusStudyRoom } from './components/FocusStudyRoom';
import { MadeFamiliarRevision } from './components/MadeFamiliarRevision';
import { AssignmentScanner } from './components/AssignmentScanner';
import { GlobalFormulaSearchModal } from './components/GlobalFormulaSearchModal';
import { BiologyPracticalStudio } from './components/BiologyPracticalStudio';
import { KcsePastPapersVault } from './components/KcsePastPapersVault';
import { KcseDailyStreakMaster } from './components/KcseDailyStreakMaster';
import { RayOpticsSim } from './components/simulations/RayOpticsSim';
import { OralLanguageCoach } from './components/OralLanguageCoach';
import { DailyQuickChallenge } from './components/DailyQuickChallenge';
import { WeakSpotsModal } from './components/WeakSpotsModal';
import { getWeakSpots } from './utils/weakSpots';
import { playSuccessChime, playStreakFlameSound, playTapSound } from './utils/soundEffects';

export type AppView =
  | 'curriculum'
  | 'scanner'
  | 'madefamiliar'
  | 'streak'
  | 'vault'
  | 'biologylab'
  | 'rayoptics'
  | 'oralcoach'
  | 'focus'
  | 'mapwork'
  | 'english'
  | 'physicsgraph'
  | 'setbooks'
  | 'schools'
  | 'mocks'
  | 'mathgraph'
  | 'printables'
  | 'cbc'
  | 'tables'
  | 'kiswahili'
  | 'projects'
  | 'audio'
  | 'simulations'
  | 'quiz'
  | 'science'
  | 'flashcards'
  | 'practicals'
  | 'exams'
  | 'progress';

export type HubCategory = 'all' | 'practice' | 'homework' | 'stemlabs' | 'practicals' | 'exams' | 'performance';

export type StudentFormLevel = 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4' | 'KCSE Candidate';

export interface HubDefinition {
  id: HubCategory;
  name: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge: string;
  desc: string;
}

export interface ModuleDefinition {
  id: AppView;
  name: string;
  shortTitle: string;
  hub: HubCategory;
  desc: string;
  tag: string;
  badge?: string;
  actionText: string;
}

const HUBS: HubDefinition[] = [
  {
    id: 'practice',
    name: 'Practice & Quizzes',
    shortName: 'Quizzes',
    icon: Zap,
    color: 'amber',
    badge: '6.6k Qs',
    desc: '5-Q daily streak, 6,600+ sprint questions, flashcards & audio reader.'
  },
  {
    id: 'homework',
    name: 'Homework & Formulas',
    shortName: 'Homework',
    icon: Camera,
    color: 'emerald',
    badge: 'AI Solver',
    desc: 'Snap homework for step-by-step guidance and fast formula lookup.'
  },
  {
    id: 'stemlabs',
    name: 'Virtual STEM Labs',
    shortName: 'Labs',
    icon: FlaskConical,
    color: 'teal',
    badge: '6 Labs',
    desc: 'Chemistry Titration, DC Circuits, Ray Optics, Osmosis, and Code.'
  },
  {
    id: 'practicals',
    name: 'Paper 3 Practicals',
    shortName: 'Practicals',
    icon: Microscope,
    color: 'cyan',
    badge: 'Paper 3',
    desc: 'Biology food tests, Geography mapwork, Physics grapher & oral coach.'
  },
  {
    id: 'exams',
    name: 'Past Papers & Books',
    shortName: 'Past Papers',
    icon: BookOpen,
    color: 'blue',
    badge: '2015–2024',
    desc: 'Made Familiar 11 subjects, 10-year KNEC papers and top school mocks.'
  },
  {
    id: 'performance',
    name: 'Mean Grade & Targets',
    shortName: 'Mean Grade',
    icon: Award,
    color: 'purple',
    badge: '12-Pt Scale',
    desc: 'Official 7-subject KCSE mean grade calculator and KUCCPS planner.'
  }
];

const ALL_MODULES: ModuleDefinition[] = [
  // Practice
  { id: 'streak', name: 'Daily 5-Q Streak', shortTitle: '5-Q Streak', hub: 'practice', desc: 'Answer 5 quick questions daily to keep your streak burning.', tag: '🔥 Habit', actionText: 'Start' },
  { id: 'quiz', name: 'Rapid Quiz Arena', shortTitle: '6.6k Quiz', hub: 'practice', desc: 'Over 6,600 questions across 11 KCSE subjects with timed sprints.', tag: '⚡ 6.6k Qs', actionText: 'Play' },
  { id: 'flashcards', name: 'Mastery Flashcards', shortTitle: 'Flashcards', hub: 'practice', desc: 'Active recall cards for definitions, equations, and laws.', tag: '🧠 Memory', actionText: 'Flip' },
  { id: 'audio', name: 'Voice Study Reader', shortTitle: 'Audio Voice', hub: 'practice', desc: 'Listen to notes and set book summaries read aloud in natural speech.', tag: '🎙️ Listen', actionText: 'Listen' },

  // Homework & Formulas
  { id: 'scanner', name: 'Homework Scanner', shortTitle: 'Scan HW', hub: 'homework', desc: 'Snap any homework; AI auto-identifies subject & solves step-by-step.', tag: '✨ Auto-Detect', actionText: 'Scan' },
  { id: 'science', name: 'Periodic Table & Constants', shortTitle: 'Constants', hub: 'homework', desc: 'KNEC periodic table, atomic masses, and physical constants.', tag: '⚛️ Reference', actionText: 'Open' },

  // Virtual STEM Labs
  { id: 'simulations', name: 'Interactive STEM Labs', shortTitle: 'All 6 Labs', hub: 'stemlabs', desc: 'Titration, Circuits, Ray Optics, Osmosis, and Algorithms.', tag: '🧪 6 Labs', actionText: 'Enter' },
  { id: 'rayoptics', name: 'Ray Optics Simulator', shortTitle: 'Ray Optics', hub: 'stemlabs', desc: 'Trace real and virtual rays through lenses with focal length math.', tag: '⚡ F2 & F4', actionText: 'Trace' },

  // Practicals & Maps
  { id: 'biologylab', name: 'Biology Food Tests & Drawing', shortTitle: 'Biology Lab', hub: 'practicals', desc: 'Reagent food tests and specimen magnification drawing.', tag: '🔬 Paper 3', actionText: 'Test' },
  { id: 'mapwork', name: 'Geography Mapwork Studio', shortTitle: 'Mapwork', hub: 'practicals', desc: 'Contour gradients, cross-sections, and 6-figure grid references.', tag: '🗺️ 312/1', actionText: 'Inspect' },
  { id: 'physicsgraph', name: 'Physics Practical Grapher', shortTitle: 'Physics Graph', hub: 'practicals', desc: 'Line of best fit, slope, scale checks, and KNEC Paper 3 rubrics.', tag: '📈 232/3', actionText: 'Plot' },
  { id: 'english', name: 'English Functional Writing', shortTitle: 'English Formats', hub: 'practicals', desc: 'Master official formats for minutes, reports, and memos.', tag: '✍️ Formats', actionText: 'Review' },
  { id: 'oralcoach', name: 'Oral Speech Coach', shortTitle: 'Oral Coach', hub: 'practicals', desc: 'Practice riddles, puns, silent letters, and Kiswahili matamshi.', tag: '🎙️ Speech', actionText: 'Practice' },
  { id: 'practicals', name: 'KNEC Practical Lab Guides', shortTitle: 'Lab Guides', hub: 'practicals', desc: 'Official experiment protocols, checklists, and observation tables.', tag: '📋 Protocols', actionText: 'Browse' },

  // Past Papers & Made Familiar
  { id: 'madefamiliar', name: 'Made Familiar Series', shortTitle: 'Made Familiar', hub: 'exams', desc: '1,100+ topic questions with step-by-step marking schemes.', tag: '📖 11 Books', actionText: 'Open' },
  { id: 'vault', name: '10-Yr Past Papers Vault', shortTitle: 'Past Papers', hub: 'exams', desc: 'KNEC past papers from 2015 to 2024 with official mark schemes.', tag: '📜 2015–2024', actionText: 'Browse' },
  { id: 'mocks', name: 'Top National Schools Mocks', shortTitle: 'Top Mocks', hub: 'exams', desc: 'Alliance, Maranda, Mang\'u, Kenya High, and Maseno mocks.', tag: '🏛️ Top Mocks', actionText: 'View' },
  { id: 'setbooks', name: 'Set Books Master Guide', shortTitle: 'Set Books', hub: 'exams', desc: 'Fathers of Nations, Bembea ya Maisha, Parliament of Owls.', tag: '📚 Literature', actionText: 'Study' },
  { id: 'tables', name: 'Four-Figure Tables', shortTitle: '4-Figure Tables', hub: 'exams', desc: 'KNEC log tables, antilogs, trigonometric values, and square roots.', tag: '📐 Tables', actionText: 'Lookup' },
  { id: 'kiswahili', name: 'Kiswahili Sarufi & Fasihi', shortTitle: 'Kiswahili', hub: 'exams', desc: 'Uchanganuzi wa sentensi, ngeli za nomino, na fasihi simulizi.', tag: '🇰🇪 Sarufi', actionText: 'Soma' },
  { id: 'exams', name: 'Timed Exam Simulation', shortTitle: 'Exam Hall', hub: 'exams', desc: 'Take full Paper 1, 2, and 3 exams under timed conditions.', tag: '⏱️ Timed', actionText: 'Enter' },

  // Performance & Targets
  { id: 'progress', name: 'Mean Grade & KUCCPS Tracker', shortTitle: 'Mean Grade', hub: 'performance', desc: 'Calculate your KCSE 7-subject mean grade and degree qualification.', tag: '🎓 Cluster', actionText: 'Calculate' },
  { id: 'focus', name: 'Focus Study Room', shortTitle: 'Focus Room', hub: 'performance', desc: 'Pomodoro timer with Mount Kenya ambient soundscapes.', tag: '🧘 Focus', actionText: 'Enter' },
  { id: 'projects', name: 'Project Tracker (CS & Agri)', shortTitle: 'Projects', hub: 'performance', desc: 'Milestone tracking for KNEC Computer Studies & Agriculture.', tag: '💻 Projects', actionText: 'Track' },
  { id: 'schools', name: 'National Schools Directory', shortTitle: 'Schools', hub: 'performance', desc: 'All 103 National Schools with mean scores and cluster cut-offs.', tag: '🏫 103 Schools', actionText: 'Explore' },
  { id: 'cbc', name: 'CBC Senior Pathway Advisor', shortTitle: 'CBC Advisor', hub: 'performance', desc: 'Interactive advisor for STEM, Arts & Sports, and Social Sciences.', tag: '🧭 Pathways', actionText: 'Explore' },
  { id: 'mathgraph', name: 'Math Grapher & Inequalities', shortTitle: 'Math Grapher', hub: 'performance', desc: 'Plot linear programming inequalities and quadratic curves.', tag: '📊 Grapher', actionText: 'Plot' },
  { id: 'printables', name: 'Printable Cheat Sheets', shortTitle: 'Cheat Sheets', hub: 'performance', desc: 'High-density A4 cheat sheets for quick offline revision.', tag: '🖨️ A4 Sheets', actionText: 'Print' }
];

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('curriculum');
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [isFormulaHudOpen, setIsFormulaHudOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState({
    subject: 'Chemistry',
    topic: 'Volumetric Analysis (Titration)',
    level: 'High School (KCSE Form 3)'
  });

  // Active exam modal state
  const [activeExam, setActiveExam] = useState<{ exam: ExamPaper; subjectName: string } | null>(null);

  // Weak Spots Bank & KCSE Countdown
  const [isWeakSpotsOpen, setIsWeakSpotsOpen] = useState<boolean>(false);
  const [weakSpotCount, setWeakSpotCount] = useState<number>(() => getWeakSpots().length);

  const now = new Date();
  const kcseYear = now.getMonth() >= 10 && now.getDate() > 20 ? now.getFullYear() + 1 : now.getFullYear();
  const kcseDate = new Date(kcseYear, 10, 3);
  const daysUntilKcse = Math.max(1, Math.ceil((kcseDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  // Student level & personalization
  const [studentForm, setStudentForm] = useState<StudentFormLevel>(() => {
    return (localStorage.getItem('elimuhub_student_form') as StudentFormLevel) || 'KCSE Candidate';
  });

  const [studentXp, setStudentXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('elimuhub_student_xp');
      return saved ? parseInt(saved, 10) : 580;
    } catch {
      return 580;
    }
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('elimuhub_streak_days');
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  // Daily study quests
  const [dailyQuests, setDailyQuests] = useState<Record<string, boolean>>(() => {
    try {
      const todayKey = new Date().toISOString().slice(0, 10);
      const saved = localStorage.getItem(`elimuhub_daily_quests_${todayKey}`);
      return saved ? JSON.parse(saved) : { streak: true, scanner: false, quiz: true, lab: false };
    } catch {
      return { streak: true, scanner: false, quiz: true, lab: false };
    }
  });

  // Active Hub filtering and Fast Search
  const [activeHub, setActiveHub] = useState<HubCategory>('all');
  const [moduleSearch, setModuleSearch] = useState('');

  // Global keyboard shortcut for Formula HUD (Ctrl+K or Alt+F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.altKey && e.key.toLowerCase() === 'f')) {
        e.preventDefault();
        setIsFormulaHudOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save student personalization
  const handleSelectForm = (lvl: StudentFormLevel) => {
    playTapSound();
    setStudentForm(lvl);
    localStorage.setItem('elimuhub_student_form', lvl);
  };

  const handleEarnXp = (amount: number) => {
    setStudentXp((prev) => {
      const next = prev + amount;
      localStorage.setItem('elimuhub_student_xp', next.toString());
      return next;
    });
  };

  const handleToggleQuest = (key: string, xpValue: number) => {
    const todayKey = new Date().toISOString().slice(0, 10);
    setDailyQuests((prev) => {
      const isCompleted = !prev[key];
      const updated = { ...prev, [key]: isCompleted };
      localStorage.setItem(`elimuhub_daily_quests_${todayKey}`, JSON.stringify(updated));
      
      if (isCompleted) {
        playSuccessChime();
      } else {
        playTapSound();
      }

      setStudentXp((xp) => {
        const nextXp = isCompleted ? xp + xpValue : Math.max(0, xp - xpValue);
        localStorage.setItem('elimuhub_student_xp', nextXp.toString());
        return nextXp;
      });
      return updated;
    });
  };

  // User persistent progress
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('elimuhub_completed_topics');
      return saved ? JSON.parse(saved) : ['chem-t1', 'phys-t1'];
    } catch {
      return ['chem-t1', 'phys-t1'];
    }
  });

  const [bookmarkedTopicIds, setBookmarkedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('elimuhub_bookmarks');
      return saved ? JSON.parse(saved) : ['med-t1', 'bio-t1'];
    } catch {
      return ['med-t1', 'bio-t1'];
    }
  });

  const [userNotes, setUserNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('elimuhub_notes');
      return saved
        ? JSON.parse(saved)
        : {
            'hs-chemistry': 'Remember: Methyl Orange transitions from Yellow (base) to Orange at equivalence, then Pink in excess acid.',
            'hs-physics': 'Lenz’s Law: The direction of the induced current is always such as to oppose the change producing it.'
          };
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('elimuhub_completed_topics', JSON.stringify(completedTopicIds));
  }, [completedTopicIds]);

  useEffect(() => {
    localStorage.setItem('elimuhub_bookmarks', JSON.stringify(bookmarkedTopicIds));
  }, [bookmarkedTopicIds]);

  useEffect(() => {
    localStorage.setItem('elimuhub_notes', JSON.stringify(userNotes));
  }, [userNotes]);

  const handleToggleTopic = (topicId: string) => {
    setCompletedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleToggleBookmark = (topicId: string) => {
    setBookmarkedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleSaveNote = (courseId: string, text: string) => {
    setUserNotes((prev) => ({ ...prev, [courseId]: text }));
  };

  const openTutorWithContext = (subject: string, topic: string, level: string) => {
    setTutorContext({ subject, topic, level });
    setIsAITutorOpen(true);
  };

  const handleStartExam = (exam: ExamPaper, subjectName: string) => {
    setActiveExam({ exam, subjectName });
  };

  // Find active module metadata
  const currentModule = ALL_MODULES.find((m) => m.id === currentView);
  const currentHubObj = currentModule ? HUBS.find((h) => h.id === currentModule.hub) : null;
  const peerModules = currentModule ? ALL_MODULES.filter((m) => m.hub === currentModule.hub && m.id !== currentView) : [];

  // Filter modules for search & hub
  const filteredModules = ALL_MODULES.filter((mod) => {
    const matchesHub = activeHub === 'all' || mod.hub === activeHub;
    const matchesSearch =
      moduleSearch.trim() === '' ||
      mod.name.toLowerCase().includes(moduleSearch.toLowerCase()) ||
      mod.desc.toLowerCase().includes(moduleSearch.toLowerCase()) ||
      mod.tag.toLowerCase().includes(moduleSearch.toLowerCase());
    return matchesHub && matchesSearch;
  });

  // Calculate Quest Completion
  const questKeys = ['streak', 'scanner', 'quiz', 'lab'];
  const completedQuestCount = questKeys.filter((k) => dailyQuests[k]).length;
  const questPercentage = Math.round((completedQuestCount / questKeys.length) * 100);

  // Student Tier Badge
  const getStudentTier = (xp: number) => {
    if (xp >= 1200) return { title: 'Alliance / Kenya High Tier (A Plain)', color: 'text-amber-400', progress: 100 };
    if (xp >= 800) return { title: 'National School Tier (A- / B+)', color: 'text-emerald-400', progress: Math.round(((xp - 800) / 400) * 100) };
    if (xp >= 400) return { title: 'Extra-County Tier (B / B-)', color: 'text-cyan-400', progress: Math.round(((xp - 400) / 400) * 100) };
    return { title: 'County Scholar Tier (C+ Candidate)', color: 'text-slate-300', progress: Math.round((xp / 400) * 100) };
  };

  const currentTier = getStudentTier(studentXp);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-x-hidden w-full">
      {/* 
        STUDENT COMMAND HEADER
        Brand Wordmark + Student Level Switcher + Live Streak & XP + Quick Action Launchers
      */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('curriculum');
            }}
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <img
              src="/src/assets/images/elimuhub_app_icon_1793547709408.jpg"
              alt="ElimuHub Kenya Logo"
              className="w-8 h-8 rounded-xl object-cover shadow-lg border border-emerald-500/40 ring-1 ring-emerald-400/20"
              referrerPolicy="no-referrer"
            />
            <span className="hidden sm:inline">ElimuHub Kenya</span>
            <span className="sm:hidden text-emerald-400 font-extrabold">ElimuHub</span>
          </a>

          {/* Responsive Student Form Level Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[11px] font-medium">
            {/* Desktop pills */}
            <div className="hidden sm:flex items-center">
              {(['Form 1', 'Form 2', 'Form 3', 'Form 4', 'KCSE Candidate'] as StudentFormLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleSelectForm(lvl)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    studentForm === lvl
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            {/* Mobile / Compact pills */}
            <div className="sm:hidden flex items-center">
              {[
                { id: 'Form 1', label: 'F1' },
                { id: 'Form 2', label: 'F2' },
                { id: 'Form 3', label: 'F3' },
                { id: 'Form 4', label: 'F4' },
                { id: 'KCSE Candidate', label: 'All' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectForm(item.id as StudentFormLevel)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                    studentForm === item.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Zone 2: Interactive Student HUD Stats (Streak & XP) */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Daily Streak Flame Button */}
          <button
            onClick={() => setCurrentView('streak')}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/60 hover:bg-amber-900/40 text-amber-300 text-xs font-semibold transition-all hover:scale-102"
            title="Daily 5-Question Habit Streak. Click to practice!"
          >
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs">{streakDays}d</span>
          </button>

          {/* XP & Level Badge (hidden on mobile to save horizontal space, visible in drawer & desktop) */}
          <button
            onClick={() => setCurrentView('progress')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/40 text-emerald-300 text-xs font-semibold transition-colors"
            title="Your KCSE Master XP. Click to view mean grade and targets!"
          >
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono">{studentXp} XP</span>
          </button>

          {/* Weak Spots Error Bank Trigger */}
          <button
            onClick={() => {
              playTapSound();
              setWeakSpotCount(getWeakSpots().length);
              setIsWeakSpotsOpen(true);
            }}
            className={`px-2 py-1.5 text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              weakSpotCount > 0
                ? 'bg-rose-950/80 border border-rose-500/50 text-rose-300 hover:bg-rose-900/80'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Review your missed questions bank"
          >
            <Target className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Errors</span>
            <span className="font-mono text-[11px] px-1 rounded bg-rose-950 text-rose-300 font-bold">
              {weakSpotCount}
            </span>
          </button>

          {/* Formula HUD Trigger (desktop shortcut or drawer on mobile) */}
          <button
            onClick={() => setIsFormulaHudOpen(true)}
            className="hidden md:flex px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 items-center gap-1.5 bg-slate-900 border border-slate-750 text-cyan-300 hover:bg-slate-800 hover:border-cyan-500/50"
            title="Search formulas & laws (Shortcut: Ctrl+K)"
          >
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>Formulas</span>
            <kbd className="hidden xl:inline text-[9px] bg-slate-950 px-1 py-0.5 rounded border border-slate-700 text-slate-400 font-mono">⌘K</kbd>
          </button>

          {/* Quick Scan Assignment (desktop) */}
          <button
            onClick={() => setCurrentView('scanner')}
            className={`hidden sm:flex px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 items-center gap-1.5 ${
              currentView === 'scanner'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-slate-900 border border-emerald-800/80 text-emerald-300 hover:bg-slate-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>Scan HW</span>
          </button>

          {/* Focus & Exam Room (desktop) */}
          <button
            onClick={() => setCurrentView('focus')}
            className={`hidden lg:flex px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 items-center gap-1.5 ${
              currentView === 'focus'
                ? 'bg-rose-600 text-white font-bold shadow'
                : 'bg-slate-900 border border-slate-750 text-rose-300 hover:bg-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Focus</span>
          </button>

          {/* AI Tutor Button */}
          <button
            onClick={() => setIsAITutorOpen(true)}
            className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            title="Ask AI Kenya Curriculum Tutor"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI</span>
            <span className="sm:hidden text-[11px]">AI</span>
          </button>

          {/* Mobile Menu Button (triggers 25+ tools drawer) */}
          <button
            onClick={() => setIsMobileDrawerOpen((prev) => !prev)}
            className="sm:hidden p-1.5 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg shrink-0"
            aria-label="Open 25+ Tools Menu"
          >
            <Menu className="w-5 h-5 text-emerald-400" />
          </button>
        </div>
      </header>

      {/* ACTIVE FORM SYNCHRONIZATION BANNER */}
      {studentForm !== 'KCSE Candidate' && (
        <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950/90 border-b border-emerald-800/70 px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-bold text-emerald-300 whitespace-nowrap">
              {studentForm} Active
            </span>
            <span className="text-slate-300 text-[11px] sm:text-xs truncate">
              Filtered to {studentForm} notes, books, quizzes &amp; labs.
            </span>
          </div>
          <button
            onClick={() => handleSelectForm('KCSE Candidate')}
            className="text-[11px] text-emerald-400 hover:text-white underline font-semibold whitespace-nowrap shrink-0 ml-auto"
          >
            Show All Forms
          </button>
        </div>
      )}

      {/* 
        INTERACTIVE STUDENT HUBS MATRIX BAR
        6 Visual Categorical Hubs + Instant Module Fast Filter Search
      */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-2.5 space-y-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* 6 High-Contrast Hub Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-medium no-scrollbar">
            <button
              onClick={() => {
                setActiveHub('all');
                if (currentView !== 'curriculum') setCurrentView('curriculum');
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                activeHub === 'all' && currentView === 'curriculum'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <span>🏠 All Hubs</span>
            </button>

            {HUBS.map((hub) => {
              const IconComp = hub.icon;
              const isActive = activeHub === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => {
                    setActiveHub(hub.id);
                    // If in a tool from another hub, switch to curriculum to view this hub's cards
                    if (currentView !== 'curriculum' && currentModule?.hub !== hub.id) {
                      setCurrentView('curriculum');
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{hub.shortName}</span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-slate-900/80 text-emerald-300 border border-slate-750">
                    {hub.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Instant Search / Fast Filter Input */}
          <div className="relative min-w-[220px] sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={moduleSearch}
              onChange={(e) => setModuleSearch(e.target.value)}
              placeholder="Fast search 25+ tools..."
              className="w-full pl-8 pr-7 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {moduleSearch && (
              <button
                onClick={() => setModuleSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Live Filter Chips when searching or selecting specific hub */}
        {(activeHub !== 'all' || moduleSearch.trim() !== '') && (
          <div className="flex items-center gap-2 overflow-x-auto pt-1 text-xs">
            <span className="text-[11px] text-slate-400 whitespace-nowrap flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3 text-emerald-400" />
              <span>Matching tools ({filteredModules.length}):</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {filteredModules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setCurrentView(m.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    currentView === m.id
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{m.shortTitle}</span>
                  <span className="text-[9px] text-emerald-400">{m.tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 
        CONTEXTUAL SUB-MODULE BREADCRUMBS & PEER SWITCHER
        Renders when viewing any active study tool, lab, or simulator
      */}
      {currentView !== 'curriculum' && (
        <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('curriculum')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Student Hub</span>
              </button>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400 font-medium">
                {currentHubObj ? currentHubObj.name : 'Study Studio'}
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-emerald-400 font-semibold">{currentModule?.name || currentView}</span>
            </div>

            {/* Peer tools switcher in same category */}
            {peerModules.length > 0 && (
              <div className="hidden lg:flex items-center gap-1.5 text-[11px]">
                <span className="text-slate-500">Jump to in this Hub:</span>
                {peerModules.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentView(p.id)}
                    className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    {p.shortTitle}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Body Container (with safe bottom padding for mobile dock) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-24 sm:pb-8 space-y-6 sm:space-y-8">
        {/* View: CURRICULUM BROWSER (Hero + Interactive Command Deck + Catalog) */}
        {currentView === 'curriculum' && (
          <div className="space-y-6 sm:space-y-8">
            {/* 
              INTERACTIVE STUDENT STUDY HQ / HABIT COMMAND DECK
              Daily study quests with interactive checkmarks + Streak & XP level ring
            */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-5 sm:space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                    <span>Study HQ</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-400">{studentForm}</span>
                    <span aria-hidden="true">·</span>
                    <span>Term 1</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>Today's Goals</span>
                    <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {completedQuestCount}/4 Done
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3 text-xs font-mono w-full md:w-auto">
                  <div className="bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 min-w-0">
                    <span className="text-slate-400 block text-[10px] truncate">Academic Rank</span>
                    <strong className={`${currentTier.color} text-xs sm:text-sm font-bold block truncate`}>
                      {currentTier.title}
                    </strong>
                  </div>
                  <div className="bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 min-w-0">
                    <span className="text-slate-400 block text-[10px] truncate">Total XP</span>
                    <strong className="text-amber-400 text-xs sm:text-sm font-bold block truncate">{studentXp} XP</strong>
                  </div>
                </div>
              </div>

              {/* Daily Interactive Quests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    key: 'streak',
                    title: studentForm === 'KCSE Candidate' ? '5-Q Streak' : `${studentForm} 5-Q Streak`,
                    desc: 'Answer 5 quick questions today to keep your streak burning.',
                    xp: 50,
                    target: 'streak' as AppView,
                    tag: '🔥 Habit'
                  },
                  {
                    key: 'scanner',
                    title: studentForm === 'KCSE Candidate' ? 'Scan Homework' : `Scan ${studentForm} HW`,
                    desc: "Snap tonight's homework for instant step-by-step solutions.",
                    xp: 40,
                    target: 'scanner' as AppView,
                    tag: '📸 Homework'
                  },
                  {
                    key: 'quiz',
                    title: studentForm === 'KCSE Candidate' ? '10-Q Sprint' : `10-Q ${studentForm} Sprint`,
                    desc: 'Sprint 10 rapid questions to test your speed.',
                    xp: 35,
                    target: 'quiz' as AppView,
                    tag: '⚡ 6.6k Qs'
                  },
                  {
                    key: 'lab',
                    title: studentForm === 'KCSE Candidate' ? 'Practice Lab' : `${studentForm} Lab`,
                    desc: 'Practice Paper 3 experiment steps and reagent food tests.',
                    xp: 25,
                    target: (studentForm === 'Form 1' ? 'simulations' : 'biologylab') as AppView,
                    tag: '🔬 Practical'
                  }
                ].map((quest) => {
                  const isDone = !!dailyQuests[quest.key];
                  return (
                    <div
                      key={quest.key}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                        isDone
                          ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-100'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() => handleToggleQuest(quest.key, quest.xp)}
                          className="flex items-center gap-2 text-left group"
                        >
                          {isDone ? (
                            <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                          )}
                          <span className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                            {quest.title}
                          </span>
                        </button>
                        <span className="text-[10px] font-mono font-bold text-amber-400 shrink-0">
                          +{quest.xp} XP
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {quest.desc}
                      </p>

                      <button
                        onClick={() => setCurrentView(quest.target)}
                        className={`w-full py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                          isDone
                            ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-750'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white font-semibold'
                        }`}
                      >
                        <span>{isDone ? 'Practice Again' : 'Launch Goal'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Quest Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Daily Target Progress</span>
                  <span className="text-emerald-400 font-bold">{questPercentage}% complete</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${questPercentage}%` }}
                  />
                </div>
              </div>
            </section>

            {/* LIVE KCSE COUNTDOWN & DAILY TARGET BANNER */}
            <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                  <Clock className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-extrabold text-xs sm:text-sm font-mono">
                      KCSE 2026 National Exam
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-mono font-bold">
                      {daysUntilKcse} Days Left
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Target: 10 Questions + 1 Lab Practical Revision daily.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => {
                    playTapSound();
                    setWeakSpotCount(getWeakSpots().length);
                    setIsWeakSpotsOpen(true);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    weakSpotCount > 0
                      ? 'bg-rose-950/80 border border-rose-500/60 text-rose-300 hover:bg-rose-900'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Target className="w-3.5 h-3.5 text-rose-400" />
                  <span>Weak Spots Bank ({weakSpotCount})</span>
                </button>
              </div>
            </div>

            {/* INTERACTIVE 60-SEC QUICK BRAIN SPRINT */}
            <DailyQuickChallenge
              studentForm={studentForm}
              onEarnXp={handleEarnXp}
            />

            {/* 
              6 INTERACTIVE VISUAL HUB CARDS (Direct launch matrix)
            */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Interactive Learning Hubs
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select a visual learning center or launch any specialized studio directly:
                  </p>
                </div>
                <span className="text-xs text-emerald-400 font-mono hidden sm:inline">
                  25+ KNEC High School Tools
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {HUBS.map((hub) => {
                  const IconComp = hub.icon;
                  const hubModules = ALL_MODULES.filter((m) => m.hub === hub.id);
                  return (
                    <div
                      key={hub.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 group-hover:border-emerald-500/40 transition-colors">
                              <IconComp className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-semibold text-slate-300">
                              {hub.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-emerald-300 border border-slate-800">
                            {hub.badge}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          {hub.desc}
                        </p>
                      </div>

                      {/* Interactive quick chips */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                          Included Modules:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {hubModules.slice(0, 4).map((mod) => (
                            <button
                              key={mod.id}
                              onClick={() => setCurrentView(mod.id)}
                              className="px-2 py-1 rounded-md text-[11px] bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                            >
                              {mod.shortTitle}
                            </button>
                          ))}
                          {hubModules.length > 4 && (
                            <span className="text-[10px] text-slate-500 px-1 py-1">
                              +{hubModules.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (hubModules.length > 0) {
                            setCurrentView(hubModules[0].id);
                          }
                        }}
                        className="w-full py-2 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors border border-slate-750"
                      >
                        <span>Open {hub.shortName}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Hero Section with Authentic Photographic Asset */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[280px] lg:min-h-[380px]">
                {/* Left: Text & Action */}
                <div className="lg:col-span-7 p-4 sm:p-8 flex flex-col justify-between z-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-emerald-400 font-mono uppercase tracking-wider mb-2">
                      <span>Kenya National Secondary Education</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-cyan-400 font-bold">{studentForm} Focus</span>
                      <span aria-hidden="true">·</span>
                      <span>KICD Standards</span>
                    </div>
                    <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-xl text-balance">
                      {studentForm === 'KCSE Candidate'
                        ? 'The Complete National Learning Platform for Kenya High Schools'
                        : `Complete ${studentForm} National Learning Platform & Study Hub`}
                    </h1>
                    <p className="text-slate-300 text-xs sm:text-sm mt-2.5 sm:mt-3 leading-relaxed max-w-lg">
                      {studentForm === 'KCSE Candidate'
                        ? 'Master every KCSE high school subject. In-depth KICD theory notes, KNEC laboratory practical manuals, interactive virtual STEM simulations, past exams with official mark schemes, and 12-point mean grade tracking.'
                        : `Targeted for ${studentForm} candidates. In-depth KICD ${studentForm} theory notes, topic-by-topic Made Familiar questions, timed quizzes, interactive labs, and practical experiment manuals.`}
                    </p>
                  </div>

                  {/* Proof Strip */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-800/80 text-xs font-mono">
                    <div className="min-w-0">
                      <span className="text-slate-400 block text-[9px] sm:text-[10px] truncate">Curriculum</span>
                      <strong className="text-emerald-400 text-xs sm:text-base block truncate">
                        {studentForm === 'KCSE Candidate' ? '100% Syllabi' : `100% ${studentForm}`}
                      </strong>
                    </div>
                    <div className="min-w-0">
                      <span className="text-slate-400 block text-[9px] sm:text-[10px] truncate">Practicals</span>
                      <strong className="text-cyan-400 text-xs sm:text-base block truncate">Paper 3 Lab</strong>
                    </div>
                    <div className="min-w-0">
                      <span className="text-slate-400 block text-[9px] sm:text-[10px] truncate">Simulators</span>
                      <strong className="text-amber-400 text-xs sm:text-base block truncate">6 Live Labs</strong>
                    </div>
                  </div>
                </div>

                {/* Right: Authentic Photograph generated via generate_image */}
                <div className="lg:col-span-5 relative min-h-[160px] sm:min-h-[220px] lg:min-h-full">
                  <img
                    src="/src/assets/images/kenya_education_hero_1792932584576.jpg"
                    alt="Kenyan high school and university students learning in modern laboratory"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover lg:absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-90" />
                </div>
              </div>
            </div>

            {/* Course & Syllabus Browser */}
            <SyllabusBrowser
              courses={KENYA_COURSES}
              onOpenAITutor={openTutorWithContext}
              onStartExam={handleStartExam}
              currentForm={studentForm}
              onSelectForm={(f) => handleSelectForm(f === 'all' ? 'KCSE Candidate' : (f as StudentFormLevel))}
            />
          </div>
        )}

        {/* View: DISTRACTION-FREE ZEN FOCUS & EXAM LOCK ROOM */}
        {currentView === 'focus' && (
          <FocusStudyRoom onStartExam={handleStartExam} />
        )}

        {/* View: AI ASSIGNMENT SCANNER & STEP-BY-STEP SOLVER */}
        {currentView === 'scanner' && (
          <AssignmentScanner
            onOpenAITutor={openTutorWithContext}
            onOpenFormulaHud={() => setIsFormulaHudOpen(true)}
          />
        )}

        {/* View: KCSE DAILY 5-QUESTION STREAK & XP ARENA */}
        {currentView === 'streak' && (
          <KcseDailyStreakMaster />
        )}

        {/* View: 10-YEAR KCSE NATIONAL PAST PAPERS VAULT */}
        {currentView === 'vault' && (
          <KcsePastPapersVault />
        )}

        {/* View: BIOLOGY PAPER 3 FOOD TESTS & SPECIMEN DRAWING STUDIO */}
        {currentView === 'biologylab' && (
          <BiologyPracticalStudio />
        )}

        {/* View: PHYSICS RAY OPTICS SIMULATOR */}
        {currentView === 'rayoptics' && (
          <RayOpticsSim />
        )}

        {/* View: ORAL ENGLISH & KISWAHILI PRONUNCIATION COACH */}
        {currentView === 'oralcoach' && (
          <OralLanguageCoach />
        )}

        {/* View: KCSE MADE FAMILIAR REVISION SERIES (ALL 11 SUBJECTS) */}
        {currentView === 'madefamiliar' && (
          <MadeFamiliarRevision
            onAskAI={openTutorWithContext}
            currentForm={studentForm}
            onSelectForm={(f) => handleSelectForm(f === 'all' ? 'KCSE Candidate' : (f as StudentFormLevel))}
          />
        )}

        {/* View: KCSE GEOGRAPHY 1:50,000 MAPWORK & FIELDWORK STUDIO */}
        {currentView === 'mapwork' && (
          <GeographyMapworkStudio />
        )}

        {/* View: KCSE ENGLISH FUNCTIONAL WRITING & ORAL SKILLS MASTER */}
        {currentView === 'english' && (
          <EnglishMasteryHub />
        )}

        {/* View: KCSE PHYSICS PAPER 3 PRACTICAL DATA GRAPHER & RUBRIC CHECKER */}
        {currentView === 'physicsgraph' && (
          <PhysicsPracticalGrapher />
        )}

        {/* View: KCSE SET BOOKS & LITERATURE GUIDE */}
        {currentView === 'setbooks' && (
          <SetBooksGuide onAskAI={openTutorWithContext} />
        )}

        {/* View: TOP KENYAN NATIONAL SCHOOLS DIRECTORY */}
        {currentView === 'schools' && (
          <NationalSchoolsDirectory />
        )}

        {/* View: KENYA NATIONAL TOP MOCKS & PREDICTION PAPERS */}
        {currentView === 'mocks' && (
          <NationalMocksArchive />
        )}

        {/* View: MATHEMATICS GRAPH & LINEAR PROGRAMMING VISUALIZER */}
        {currentView === 'mathgraph' && (
          <MathGraphVisualizer />
        )}

        {/* View: A4 PRINTABLE REVISION CHEAT SHEETS */}
        {currentView === 'printables' && (
          <PrintableRevisionHub />
        )}

        {/* View: CBC SENIOR SCHOOL PATHWAY ADVISOR */}
        {currentView === 'cbc' && (
          <CbcPathwayAdvisor onAskAI={openTutorWithContext} />
        )}

        {/* View: DIGITAL FOUR-FIGURE MATHEMATICAL TABLES */}
        {currentView === 'tables' && (
          <FourFigureTables />
        )}

        {/* View: KISWAHILI SARUFI, USHAIRI & FASIHI SIMULIZI */}
        {currentView === 'kiswahili' && (
          <KiswahiliCompanion onAskAI={openTutorWithContext} />
        )}

        {/* View: KNEC PRACTICAL PROJECT TRACKER */}
        {currentView === 'projects' && (
          <KnecProjectTracker onAskAI={openTutorWithContext} />
        )}

        {/* View: AUDIO VOICE STUDY READER (TTS) */}
        {currentView === 'audio' && (
          <AudioVoiceReader />
        )}

        {/* View: RAPID PRACTICE QUIZ ENGINE */}
        {currentView === 'quiz' && (
          <QuizEngine currentForm={studentForm} />
        )}

        {/* View: SCIENCE REFERENCE HUB & PERIODIC TABLE */}
        {currentView === 'science' && (
          <ScienceReferenceHub />
        )}

        {/* View: SPACED-REPETITION MASTERY FLASHCARDS */}
        {currentView === 'flashcards' && (
          <FlashcardsDeck currentForm={studentForm} />
        )}

        {/* View: PRACTICAL LABS DIRECTORY */}
        {currentView === 'practicals' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                National Secondary School Laboratory Protocols
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Kenyan KCSE Science Practical Experiment Guides (Paper 3)
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Official KNEC Paper 3 laboratory logbooks with apparatus checklists, safety hazards, observation tables, calculation steps, and viva questions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {KENYA_COURSES.flatMap((c) =>
                c.practicals.map((p) => ({ ...p, courseName: c.name, courseLevel: c.level }))
              ).map((prac) => (
                <div key={prac.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300">
                      {prac.courseName} · KCSE Paper 3 Practical
                    </span>
                    <button
                      onClick={() => openTutorWithContext(prac.courseName, prac.title, prac.courseLevel)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Generate Lab Report
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white">{prac.title}</h3>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <span className="font-semibold text-slate-400 block">Required Apparatus:</span>
                    <p className="text-slate-300 font-mono text-[11px] line-clamp-2">
                      {prac.apparatus.join(', ')}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                    <span className="text-cyan-400 font-bold block text-[10px]">Calculation Formula:</span>
                    <p className="line-clamp-3">{prac.calculationFormula}</p>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('curriculum');
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 border border-slate-700"
                  >
                    Open Full Experiment Manual
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View: INTERACTIVE SIMULATIONS ARENA */}
        {currentView === 'simulations' && (
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Interactive High School STEM Lab
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">Live Scientific &amp; Conceptual Sandboxes</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Real-time interactive canvas and physical engines designed for Kenyan secondary school experiments (KCSE Paper 3).
              </p>
            </div>

            {/* Sim 1: Chemistry Qualitative Analysis & Reagent Bench */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase">
                <FlaskConical className="w-4 h-4" />
                <span>Simulation 01 · KCSE Chemistry Paper 3 (Qualitative Analysis &amp; Ion Identification)</span>
              </div>
              <QualitativeAnalysisSim />
            </div>

            {/* Sim 2: Chemistry Titration */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 font-mono uppercase">
                <FlaskConical className="w-4 h-4" />
                <span>Simulation 02 · KCSE Form 3 Analytical Chemistry (Volumetric Titration)</span>
              </div>
              <TitrationSim />
            </div>

            {/* Sim 3: Physics DC Circuit */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 font-mono uppercase">
                <Activity className="w-4 h-4" />
                <span>Simulation 03 · KCSE Form 2 &amp; 4 Physics (DC Circuit &amp; Ohm's Law)</span>
              </div>
              <CircuitSim />
            </div>

            {/* Sim 4: Physics Ray Optics & Thin Lens */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 font-mono uppercase">
                <Activity className="w-4 h-4" />
                <span>Simulation 04 · KCSE Form 2 &amp; 4 Physics (Ray Optics &amp; Thin Lens Tracing)</span>
              </div>
              <RayOpticsSim />
            </div>

            {/* Sim 5: Biology Cell Osmosis */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase">
                <BookOpen className="w-4 h-4" />
                <span>Simulation 05 · KCSE Form 1 Biology (Osmosis &amp; Cell Physiology)</span>
              </div>
              <OsmosisSim />
            </div>

            {/* Sim 6: Computer Science Algorithm Sorting */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 font-mono uppercase">
                <Layers className="w-4 h-4" />
                <span>Simulation 06 · KCSE Form 4 Computer Studies (Data Structures &amp; Algorithms)</span>
              </div>
              <AlgorithmSim />
            </div>
          </div>
        )}

        {/* View: EXAMS & PAPERS CENTER */}
        {currentView === 'exams' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Kenya National Examinations Council (KNEC)
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">KCSE Examination Simulation Center</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Practice full KCSE Paper 1, 2, and 3 past exams under real timed conditions with instant KNEC marking schemes and AI examiner script grading.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {KENYA_COURSES.flatMap((c) =>
                c.exams.map((e) => ({ ...e, subjectName: c.name, level: c.level }))
              ).map((exam) => (
                <div key={exam.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                      <span className="text-emerald-400 font-semibold">{exam.paperCode} · {exam.subjectName}</span>
                      <span>{exam.durationMinutes} Minutes · {exam.totalMarks} Marks</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-3">{exam.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {exam.questions.length} complete multi-part examination questions with comprehensive step-by-step mark breakdown.
                    </p>
                  </div>

                  <button
                    onClick={() => handleStartExam(exam, exam.subjectName)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow"
                  >
                    Take Exam Under Timed Mode
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View: ACADEMIC TRACKER & STUDY PLANNER */}
        {currentView === 'progress' && (
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                KCSE Candidate Performance &amp; Syllabus Progress
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Official KCSE Mean Grade Tracker &amp; Study Timetable
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Calculate your official KCSE 7-Subject Mean Grade and Aggregates on the 12-point scale, track topic completion from Form 1 to Form 4, and plan your weekly study schedule.
              </p>
            </div>

            {/* Official Kenyan Grade Calculator */}
            <GradeCalculator />

            {/* Study Planner and Notebook */}
            <StudyPlanner
              courses={KENYA_COURSES}
              completedTopicIds={completedTopicIds}
              onToggleTopic={handleToggleTopic}
              bookmarkedTopicIds={bookmarkedTopicIds}
              onToggleBookmark={handleToggleBookmark}
              notes={userNotes}
              onSaveNote={handleSaveNote}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/elimuhub_app_icon_1793547709408.jpg"
              alt="ElimuHub Kenya Icon"
              className="w-6 h-6 rounded-lg object-cover border border-emerald-500/30"
              referrerPolicy="no-referrer"
            />
            <p>© 2026 ElimuHub Kenya. National Secondary School &amp; KCSE Mastery Platform.</p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>KICD Aligned</span>
            <span>·</span>
            <span>KNEC KCSE Standards</span>
            <span>·</span>
            <span>CBC Senior School Framework</span>
          </div>
        </div>
      </footer>

      {/* 
        MOBILE BOTTOM NAVIGATION DOCK (Thumb Navigation for Phones)
        Fixed bottom bar giving instant access to core student workflows:
        1. Syllabi (Curriculum)
        2. Books (KCSE Made Familiar 11 subjects)
        3. Scan HW (Hero center camera button with emerald ring)
        4. 6.6k Quiz (Timed sprints)
        5. Labs (6 STEM interactive simulations)
        6. More (Full tools drawer)
      */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-1.5 py-1 flex items-center justify-around shadow-2xl safe-area-bottom"
      >
        <button
          onClick={() => {
            setCurrentView('curriculum');
            setIsMobileDrawerOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center transition-colors min-h-[44px] ${
            currentView === 'curriculum' && !isMobileDrawerOpen
              ? 'text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Syllabi</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('madefamiliar');
            setIsMobileDrawerOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center transition-colors min-h-[44px] ${
            currentView === 'madefamiliar' && !isMobileDrawerOpen
              ? 'text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Books</span>
        </button>

        {/* Elevated Center Scan HW Trigger */}
        <button
          onClick={() => {
            setCurrentView('scanner');
            setIsMobileDrawerOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-1 py-0.5 px-1 flex flex-col items-center justify-center -mt-4 group min-h-[44px]"
          aria-label="Scan Homework"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 transition-transform active:scale-95 ${
              currentView === 'scanner' && !isMobileDrawerOpen
                ? 'bg-emerald-500 border-white text-slate-950 ring-4 ring-emerald-500/30'
                : 'bg-gradient-to-tr from-emerald-600 to-teal-500 border-emerald-400 text-white'
            }`}
          >
            <Camera className="w-6 h-6" />
          </div>
          <span
            className={`text-[10px] mt-0.5 font-bold tracking-tight ${
              currentView === 'scanner' && !isMobileDrawerOpen ? 'text-emerald-400' : 'text-slate-300'
            }`}
          >
            Scan HW
          </span>
        </button>

        <button
          onClick={() => {
            setCurrentView('quiz');
            setIsMobileDrawerOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center transition-colors min-h-[44px] ${
            currentView === 'quiz' && !isMobileDrawerOpen
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-5 h-5 mb-0.5 text-amber-400" />
          <span className="text-[10px] tracking-tight">6.6k Quiz</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('simulations');
            setIsMobileDrawerOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center transition-colors min-h-[44px] ${
            currentView === 'simulations' && !isMobileDrawerOpen
              ? 'text-teal-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FlaskConical className="w-5 h-5 mb-0.5 text-teal-400" />
          <span className="text-[10px] tracking-tight">Labs</span>
        </button>

        <button
          onClick={() => setIsMobileDrawerOpen((prev) => !prev)}
          className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center transition-colors min-h-[44px] ${
            isMobileDrawerOpen ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">More</span>
        </button>
      </nav>

      {/* 
        MOBILE TOOLS DRAWER & HUB SHEET
        Full screen-height thumb sheet providing 1-tap jump to all 25+ tools
      */}
      {isMobileDrawerOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Sheet Body */}
          <div className="relative z-10 bg-slate-900 border-t border-slate-750 rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden pb-6">
            {/* Grab handle */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mt-3 mb-2 shrink-0" />

            {/* Sheet Header */}
            <div className="px-5 pb-3 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <img
                  src="/src/assets/images/elimuhub_app_icon_1793547709408.jpg"
                  alt="ElimuHub Logo"
                  className="w-6 h-6 rounded-lg object-cover border border-emerald-500/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>ElimuHub Study Tools</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      25+ Tools
                    </span>
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Active level: <strong className="text-emerald-400">{studentForm}</strong>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                aria-label="Close tools menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Utility Chips */}
            <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <button
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  setIsFormulaHudOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Formula HUD</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  setIsAITutorOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Tutor</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('progress');
                  setIsMobileDrawerOpen(false);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-950/60 border border-purple-800/60 text-purple-300 flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Mean Grade</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('focus');
                  setIsMobileDrawerOpen(false);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/60 border border-rose-800/60 text-rose-300 flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Focus Room</span>
              </button>
            </div>

            {/* Scrollable Tools List */}
            <div className="overflow-y-auto px-4 py-3 space-y-4 flex-1">
              {HUBS.map((hub) => {
                const IconComp = hub.icon;
                const hubModules = ALL_MODULES.filter((m) => m.hub === hub.id);
                return (
                  <div key={hub.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-1 pt-1">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <IconComp className="w-4 h-4" />
                        <span>{hub.name}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {hubModules.length} tools
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5">
                      {hubModules.map((mod) => (
                        <button
                          key={mod.id}
                          onClick={() => {
                            setCurrentView(mod.id);
                            setIsMobileDrawerOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between gap-3 min-h-[44px] transition-colors ${
                            currentView === mod.id
                              ? 'bg-emerald-950/50 border-emerald-500 text-white font-semibold'
                              : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-950 text-slate-200'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate">{mod.name}</div>
                            <div className="text-[11px] text-slate-400 truncate">{mod.desc}</div>
                          </div>
                          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                            {mod.tag}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        defaultSubject={tutorContext.subject}
        defaultTopic={tutorContext.topic}
        defaultLevel={tutorContext.level}
      />

      {activeExam && (
        <ExamTestModal
          isOpen={true}
          onClose={() => setActiveExam(null)}
          exam={activeExam.exam}
          subjectName={activeExam.subjectName}
          onSaveScore={(score, total) => {
            console.log(`Saved score: ${score}/${total}`);
          }}
        />
      )}

      <GlobalFormulaSearchModal
        isOpen={isFormulaHudOpen}
        onClose={() => setIsFormulaHudOpen(false)}
      />

      <WeakSpotsModal
        isOpen={isWeakSpotsOpen}
        onClose={() => {
          setIsWeakSpotsOpen(false);
          setWeakSpotCount(getWeakSpots().length);
        }}
        onAddXP={handleEarnXp}
      />
    </div>
  );
}
