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
  ChevronRight
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

export type AppView =
  | 'curriculum'
  | 'madefamiliar'
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

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('curriculum');
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState({
    subject: 'Chemistry',
    topic: 'Volumetric Analysis (Titration)',
    level: 'High School (KCSE Form 3)'
  });

  // Active exam modal state
  const [activeExam, setActiveExam] = useState<{ exam: ExamPaper; subjectName: string } | null>(null);

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 
        TOP BAR CONTRACT:
        [Brand title, one line] — [4–5 nav links, 1–2 word labels, single-line] — [1 primary action]
      */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
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
          <span>ElimuHub Kenya</span>
        </a>

        {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setCurrentView('curriculum')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentView === 'curriculum' ? 'text-emerald-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Form 1–4 Syllabi
          </button>
          <button
            onClick={() => setCurrentView('madefamiliar')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentView === 'madefamiliar' ? 'text-emerald-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Made Familiar
          </button>
          <button
            onClick={() => setCurrentView('setbooks')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentView === 'setbooks' ? 'text-emerald-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Set Books
          </button>
          <button
            onClick={() => setCurrentView('mapwork')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentView === 'mapwork' ? 'text-emerald-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Mapwork (312/1)
          </button>
          <button
            onClick={() => setCurrentView('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentView === 'quiz' ? 'text-emerald-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Quick Quiz
          </button>
          <button
            onClick={() => setCurrentView('simulations')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentView === 'simulations' ? 'text-emerald-400 font-semibold' : 'hover:text-white'
            }`}
          >
            STEM Labs
          </button>
          <button
            onClick={() => setCurrentView('progress')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentView === 'progress' ? 'text-emerald-400 font-semibold' : 'hover:text-white'
            }`}
          >
            KCSE Tracker
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setCurrentView('focus')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg shadow transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 border ${
              currentView === 'focus'
                ? 'bg-rose-600 border-rose-500 text-white font-bold'
                : 'bg-slate-900 border-slate-700 text-emerald-400 hover:bg-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Focus &amp; Exam Room</span>
          </button>

          <button
            onClick={() => setIsAITutorOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Kenya Tutor
          </button>
        </div>
      </header>

      {/* National High School Academic Modules Quick Strip */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-2 overflow-x-auto flex items-center gap-2 text-xs">
        {[
          { id: 'curriculum', label: 'Form 1-4 KCSE Syllabi' },
          { id: 'madefamiliar', label: '📖 KCSE Made Familiar (All 11 Subjects)' },
          { id: 'focus', label: '🧘 Zen Focus & Exam Lock Room' },
          { id: 'mapwork', label: '🗺️ Mapwork & Fieldwork (312/1)' },
          { id: 'english', label: '✍️ English Functional Writing & Oral (101/1)' },
          { id: 'physicsgraph', label: '📈 Physics Practical Grapher (232/3)' },
          { id: 'setbooks', label: 'KCSE Set Books Master Guide' },
          { id: 'schools', label: 'National Schools Directory & Cut-Offs' },
          { id: 'mocks', label: 'Kenya Top High School Mocks Archive' },
          { id: 'mathgraph', label: 'Math Graph & LP Visualizer' },
          { id: 'printables', label: 'A4 Printable Revision Sheets' },
          { id: 'cbc', label: 'CBC Senior School Advisor' },
          { id: 'tables', label: 'Digital 4-Figure Tables' },
          { id: 'kiswahili', label: 'Kiswahili Sarufi & Fasihi' },
          { id: 'projects', label: 'KNEC Projects (CS & Agri)' },
          { id: 'audio', label: 'Voice Study Reader (TTS)' },
          { id: 'quiz', label: 'Rapid Practice Quiz' },
          { id: 'flashcards', label: 'Mastery Flashcards' },
          { id: 'science', label: 'Periodic Table & Constants' },
          { id: 'simulations', label: '4 High School STEM Simulators' },
          { id: 'practicals', label: 'Lab Practicals (Paper 3)' },
          { id: 'exams', label: 'KNEC Past Papers & Tests' },
          { id: 'progress', label: 'KCSE Mean Grade Tracker' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id as AppView)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              currentView === item.id
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* View: CURRICULUM BROWSER (Hero + Catalog) */}
        {currentView === 'curriculum' && (
          <div className="space-y-8">
            {/* Hero Section with Domain-Authentic Photography */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px]">
                {/* Left: Text & Action */}
                <div className="lg:col-span-7 p-8 flex flex-col justify-between z-10">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase tracking-wider mb-2">
                      <span>Kenya National Secondary Education System</span>
                      <span aria-hidden="true">·</span>
                      <span>KICD, KNEC &amp; CBC Senior School Standards</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-xl text-balance">
                      The Complete National Learning Platform for Kenya High Schools (Form 1 to Form 4)
                    </h1>
                    <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-lg">
                      Master every KCSE high school subject. In-depth KICD theory notes, KNEC laboratory practical manuals, interactive virtual STEM simulations, past exams with official mark schemes, and 12-point mean grade tracking.
                    </p>
                  </div>

                  {/* Proof Strip */}
                  <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-800/80 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Curriculum Coverage</span>
                      <strong className="text-emerald-400 text-base">100% Form 1–4 Syllabi</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Laboratory Practicals</span>
                      <strong className="text-cyan-400 text-base">Paper 3 Protocols</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Interactive Labs</span>
                      <strong className="text-amber-400 text-base">4 Live Simulators</strong>
                    </div>
                  </div>
                </div>

                {/* Right: Authentic Photograph generated via generate_image */}
                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
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
            />
          </div>
        )}

        {/* View: DISTRACTION-FREE ZEN FOCUS & EXAM LOCK ROOM */}
        {currentView === 'focus' && (
          <FocusStudyRoom onStartExam={handleStartExam} />
        )}

        {/* View: KCSE MADE FAMILIAR REVISION SERIES (ALL 11 SUBJECTS) */}
        {currentView === 'madefamiliar' && (
          <MadeFamiliarRevision onAskAI={openTutorWithContext} />
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
          <QuizEngine />
        )}

        {/* View: SCIENCE REFERENCE HUB & PERIODIC TABLE */}
        {currentView === 'science' && (
          <ScienceReferenceHub />
        )}

        {/* View: SPACED-REPETITION MASTERY FLASHCARDS */}
        {currentView === 'flashcards' && (
          <FlashcardsDeck />
        )}

        {/* View: PRACTICAL LABS DIRECTORY */}
        {currentView === 'practicals' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                National Laboratory &amp; Clinical Protocols
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Kenyan Science &amp; Engineering Practical Guidelines
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Official KNEC Paper 3 &amp; University Laboratory logbooks with apparatus checklists, safety hazards, observation tables, calculation steps, and viva questions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {KENYA_COURSES.flatMap((c) =>
                c.practicals.map((p) => ({ ...p, courseName: c.name, courseLevel: c.level }))
              ).map((prac) => (
                <div key={prac.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300">
                      {prac.courseName} · {prac.courseLevel === 'highschool' ? 'KCSE Paper 3' : 'University Lab'}
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

            {/* Sim 1: Chemistry Titration */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase">
                <FlaskConical className="w-4 h-4" />
                <span>Simulation 01 · KCSE Form 3 Analytical Chemistry (Titration)</span>
              </div>
              <TitrationSim />
            </div>

            {/* Sim 2: Physics DC Circuit */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 font-mono uppercase">
                <Activity className="w-4 h-4" />
                <span>Simulation 02 · KCSE Form 2 &amp; 4 Physics (DC Circuit &amp; Ohm's Law)</span>
              </div>
              <CircuitSim />
            </div>

            {/* Sim 3: Biology Cell Osmosis */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase">
                <BookOpen className="w-4 h-4" />
                <span>Simulation 03 · KCSE Form 1 Biology (Osmosis &amp; Cell Physiology)</span>
              </div>
              <OsmosisSim />
            </div>

            {/* Sim 4: Computer Science Algorithm Sorting */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 font-mono uppercase">
                <Layers className="w-4 h-4" />
                <span>Simulation 04 · KCSE Form 4 Computer Studies (Data Structures &amp; Algorithms)</span>
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
    </div>
  );
}
