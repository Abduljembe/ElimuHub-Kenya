import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  Sparkles,
  ChevronRight,
  Eye,
  EyeOff,
  PenTool,
  RotateCcw,
  Check,
  Flame,
  CheckCircle,
  ListOrdered,
  Layers,
  GraduationCap,
  Play,
  Shuffle,
  ChevronLeft,
  Filter,
  BarChart2,
  Zap,
  Printer,
  Calculator,
  Calendar,
  X
} from 'lucide-react';
import { MADE_FAMILIAR_DATABASE, MadeFamiliarSubject, MadeFamiliarQuestion, MadeFamiliarChoice } from '../data/madeFamiliarData';
import { getMasterQuestionBank, getTotalQuestionCount } from '../data/madeFamiliarQuestionBank';
import { KcseMockExamHall } from './KcseMockExamHall';
import { PrintableExamPaperModal } from './PrintableExamPaperModal';
import { lookupLogarithm, lookupTrigRatio } from '../utils/fourFigureMath';

interface MadeFamiliarRevisionProps {
  onAskAI?: (subject: string, topic: string, level: string) => void;
  currentForm?: string;
  onSelectForm?: (form: 'all' | 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4') => void;
}

export const MadeFamiliarRevision: React.FC<MadeFamiliarRevisionProps> = ({ onAskAI, currentForm, onSelectForm }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('mf-math');
  const [selectedForm, setSelectedForm] = useState<'all' | 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4'>(() => {
    if (currentForm && ['Form 1', 'Form 2', 'Form 3', 'Form 4'].includes(currentForm)) {
      return currentForm as any;
    }
    return 'all';
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (currentForm) {
      if (currentForm === 'KCSE Candidate' || currentForm === 'all') {
        setSelectedForm('all');
      } else if (['Form 1', 'Form 2', 'Form 3', 'Form 4'].includes(currentForm)) {
        setSelectedForm(currentForm as any);
      }
      setCurrentPage(1);
    }
  }, [currentForm]);
  
  // Practice Scope: 'topic' | 'all-bank' | 'drill'
  const [practiceScope, setPracticeScope] = useState<'topic' | 'all-bank' | 'drill'>('topic');

  // Selected Subject & Topic
  const activeSubject = MADE_FAMILIAR_DATABASE.find((s) => s.id === selectedSubjectId) || MADE_FAMILIAR_DATABASE[0];
  const [selectedTopicId, setSelectedTopicId] = useState<string>(activeSubject.topics[0]?.id || '');

  // Practice Mode: 'choice' (choose answers A, B, C, D) or 'structured' (full KNEC paper working & schemes)
  const [practiceMode, setPracticeMode] = useState<'choice' | 'structured'>('choice');

  // Student answer selection tracking: qId -> 'A' | 'B' | 'C' | 'D'
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});

  // Active question solution reveal state for full KNEC schemes
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  
  // Student self-score tracking for structured mode
  const [userScores, setUserScores] = useState<Record<string, number>>({});
  const [userAnswerNotes, setUserAnswerNotes] = useState<Record<string, string>>({});

  // Active tab inside topic view: 'questions' | 'summary' | 'pitfalls'
  const [activeTab, setActiveTab] = useState<'questions' | 'summary' | 'pitfalls'>('questions');

  // Pagination for large question sets (10 per page)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 10;

  // Rapid Drill state
  const [drillQuestions, setDrillQuestions] = useState<MadeFamiliarQuestion[]>([]);
  const [isDrillActive, setIsDrillActive] = useState<boolean>(false);

  // New Modals & Drawers
  const [isExamHallOpen, setIsExamHallOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isTablesDrawerOpen, setIsTablesDrawerOpen] = useState<boolean>(false);

  // Four-Figure Quick Table State
  const [tableType, setTableType] = useState<'log' | 'sin' | 'cos' | 'tan'>('log');
  const [tableInput, setTableInput] = useState<string>('56.74');

  // Swali La Siku (Daily Question of the Day) State
  const [dailyStreak, setDailyStreak] = useState<number>(3);
  const [dailyAnswerChoice, setDailyAnswerChoice] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [dailyStreakIncremented, setDailyStreakIncremented] = useState<boolean>(false);

  // Load generated 1,000+ question bank
  const masterBank = useMemo(() => getMasterQuestionBank(), []);
  const totalSystemQuestions = useMemo(() => getTotalQuestionCount(), []);

  const currentTopic = activeSubject.topics.find((t) => t.id === selectedTopicId) || activeSubject.topics[0];

  // Questions pool for the active subject
  const subjectFullBank = useMemo(() => {
    const generated = masterBank[selectedSubjectId] || [];
    const topicQuestions = activeSubject.topics.flatMap((t) => t.questions);
    const combined = [...topicQuestions];
    generated.forEach((g) => {
      if (!combined.some((q) => q.id === g.id)) {
        combined.push(g);
      }
    });
    return combined;
  }, [masterBank, selectedSubjectId, activeSubject]);

  // Daily Question Pick (Deterministic based on day or first question)
  const dailyQuestion = useMemo(() => {
    return subjectFullBank[5] || subjectFullBank[0];
  }, [subjectFullBank]);

  // Questions pool based on selected scope
  const activeQuestionsPool = useMemo(() => {
    let pool: MadeFamiliarQuestion[] = [];
    if (practiceScope === 'drill' && drillQuestions.length > 0) {
      pool = drillQuestions;
    } else if (practiceScope === 'all-bank') {
      pool = subjectFullBank;
    } else {
      const baseTopicQuestions = currentTopic?.questions || [];
      const topicKeywords = currentTopic?.title.toLowerCase().split(' ') || [];
      const relatedGenerated = (masterBank[selectedSubjectId] || []).filter((q) =>
        topicKeywords.some((kw) => kw.length > 3 && q.topicClassification.toLowerCase().includes(kw))
      );
      pool = [...baseTopicQuestions, ...relatedGenerated];
    }

    if (selectedForm !== 'all') {
      pool = pool.filter((q) => q.formLevel === selectedForm);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      pool = pool.filter(
        (item) =>
          item.questionText.toLowerCase().includes(q) ||
          item.topicClassification.toLowerCase().includes(q) ||
          item.options.some((opt) => opt.text.toLowerCase().includes(q))
      );
    }

    return pool;
  }, [practiceScope, drillQuestions, subjectFullBank, currentTopic, masterBank, selectedSubjectId, selectedForm, searchQuery]);

  // Paginated Questions
  const totalPages = Math.ceil(activeQuestionsPool.length / PAGE_SIZE) || 1;
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return activeQuestionsPool.slice(start, start + PAGE_SIZE);
  }, [activeQuestionsPool, currentPage]);

  const handleSubjectChange = (subjId: string) => {
    setSelectedSubjectId(subjId);
    setCurrentPage(1);
    setDailyAnswerChoice(null);
    setDailyStreakIncremented(false);
    const newSubj = MADE_FAMILIAR_DATABASE.find((s) => s.id === subjId);
    if (newSubj && newSubj.topics.length > 0) {
      setSelectedTopicId(newSubj.topics[0].id);
    }
  };

  const handleSelectChoice = (questionId: string, choiceId: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: choiceId
    }));
  };

  const handleDailyAnswer = (choiceId: 'A' | 'B' | 'C' | 'D') => {
    setDailyAnswerChoice(choiceId);
    if (choiceId === dailyQuestion.correctOptionId && !dailyStreakIncremented) {
      setDailyStreak((prev) => prev + 1);
      setDailyStreakIncremented(true);
    }
  };

  const startRandomDrill = () => {
    const shuffled = [...subjectFullBank].sort(() => 0.5 - Math.random());
    const selected10 = shuffled.slice(0, 10);
    setDrillQuestions(selected10);
    setPracticeScope('drill');
    setIsDrillActive(true);
    setCurrentPage(1);
  };

  const resetAllAnswers = () => {
    setSelectedAnswers({});
    setUserScores({});
  };

  const toggleReveal = (qId: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleSaveScore = (qId: string, score: number) => {
    setUserScores((prev) => ({
      ...prev,
      [qId]: score
    }));
  };

  // Filter topics in left bar
  const filteredTopics = activeSubject.topics.filter((t) => {
    const matchesForm = selectedForm === 'all' || t.formLevel === selectedForm;
    const matchesSearch =
      searchQuery === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.questions.some((q) => q.questionText.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesForm && matchesSearch;
  });

  // Calculate live score stats for the active questions pool
  const totalActiveQuestions = activeQuestionsPool.length;
  const answeredActiveQuestions = activeQuestionsPool.filter((q) => selectedAnswers[q.id] !== undefined);
  const correctActiveQuestions = answeredActiveQuestions.filter((q) => selectedAnswers[q.id] === q.correctOptionId);
  const accuracyPercent =
    answeredActiveQuestions.length > 0
      ? Math.round((correctActiveQuestions.length / answeredActiveQuestions.length) * 100)
      : 0;

  // Grade calculation for drill mode
  const getKcseDrillGrade = (percent: number) => {
    if (percent >= 80) return { grade: 'A (Plain)', color: 'text-emerald-400', desc: 'Outstanding Mastery' };
    if (percent >= 75) return { grade: 'A- (Minus)', color: 'text-emerald-300', desc: 'Excellent Candidate' };
    if (percent >= 70) return { grade: 'B+ (Plus)', color: 'text-cyan-400', desc: 'Very Good Performance' };
    if (percent >= 65) return { grade: 'B (Plain)', color: 'text-cyan-300', desc: 'Good Work' };
    if (percent >= 60) return { grade: 'B- (Minus)', color: 'text-amber-300', desc: 'Above Average' };
    if (percent >= 50) return { grade: 'C+ (Plus)', color: 'text-amber-400', desc: 'University Entry Benchmark' };
    if (percent >= 40) return { grade: 'C (Plain)', color: 'text-orange-400', desc: 'Fair - Needs Revision' };
    return { grade: 'D+ / Below', color: 'text-rose-400', desc: 'Requires Intensive Topic Review' };
  };

  // Four-Figure computation for drawer
  const tableResult =
    tableType === 'log'
      ? lookupLogarithm(parseFloat(tableInput) || 1.0)
      : lookupTrigRatio(parseFloat(tableInput) || 0.0, tableType);

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header Banner with Master Counter & Action Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <span>National Examination Master Revision Series</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-cyan-300 font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {totalSystemQuestions.toLocaleString()}+ KNEC Questions Bank
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex flex-wrap items-center gap-2.5">
              <span>KCSE Made Familiar Master Revision Suite</span>
              <span className="text-xs font-mono font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full">
                Interactive Multi-Subject Edition
              </span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Official past examination questions with selectable choices (A, B, C, D), real-time timed KCSE mock exam sessions, 4-figure table lookups, and printable A4 question papers with confidential marking keys.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Timed KCSE Mock Exam Hall */}
            <button
              onClick={() => setIsExamHallOpen(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg flex items-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Timed Exam Hall</span>
            </button>

            {/* Rapid 10-Q Drill */}
            <button
              onClick={startRandomDrill}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>10-Q Drill</span>
            </button>

            {/* Printable A4 Paper */}
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print A4 Paper</span>
            </button>

            {/* 4-Figure Tables Quick Drawer */}
            <button
              onClick={() => setIsTablesDrawerOpen(true)}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>4-Figure Tables</span>
            </button>
          </div>
        </div>

        {/* 11 High School Subjects Quick Horizontal Strip */}
        <div className="flex items-center gap-2 mt-6 border-t border-slate-800/80 pt-4 overflow-x-auto text-xs font-medium pb-1">
          {MADE_FAMILIAR_DATABASE.map((subj) => (
            <button
              key={subj.id}
              onClick={() => handleSubjectChange(subj.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 border ${
                selectedSubjectId === subj.id
                  ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>{subj.name}</span>
              <span className="text-[10px] opacity-75 font-mono">
                ({(masterBank[subj.id]?.length || 100)}+ Qs)
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* SWALI LA SIKU (DAILY KCSE QUESTION OF THE DAY) & STREAK BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-500/10 p-2 rounded-xl border border-amber-500/30 text-amber-400">
              <Flame className="w-5 h-5 fill-amber-400 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-amber-400 font-bold uppercase">Swali La Siku · Question of the Day</span>
                <span className="text-slate-500">·</span>
                <span className="text-emerald-400 font-bold">{activeSubject.name}</span>
              </div>
              <span className="text-xs text-slate-300">
                Solve daily questions to maintain your KCSE preparation streak!
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 font-mono text-xs shrink-0 self-start sm:self-auto">
            <span className="text-slate-400">Current Streak:</span>
            <span className="text-amber-400 font-black flex items-center gap-1 text-sm">
              <Flame className="w-4 h-4 fill-amber-400" />
              {dailyStreak} Days
            </span>
          </div>
        </div>

        {/* Daily Question Body */}
        <div className="pt-3 space-y-3">
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed whitespace-pre-wrap">
            {dailyQuestion.questionText}
          </p>

          {/* Daily Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
            {dailyQuestion.options.map((option) => {
              const isSelected = dailyAnswerChoice === option.id;
              const isCorrect = option.id === dailyQuestion.correctOptionId;

              let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
              if (dailyAnswerChoice) {
                if (isCorrect) {
                  style = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-950/70 border-rose-600 text-rose-200';
                } else {
                  style = 'bg-slate-950/50 border-slate-850 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleDailyAnswer(option.id)}
                  disabled={dailyAnswerChoice !== null}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${style}`}
                >
                  <span className="w-5 h-5 rounded font-mono font-bold text-xs flex items-center justify-center shrink-0 bg-slate-800 text-white">
                    {option.id}
                  </span>
                  <span className="leading-snug">{option.text}</span>
                </button>
              );
            })}
          </div>

          {dailyAnswerChoice && (
            <div
              className={`p-3 rounded-xl text-xs flex items-start gap-2 font-mono ${
                dailyAnswerChoice === dailyQuestion.correctOptionId
                  ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-200'
                  : 'bg-rose-950/80 border border-rose-800 text-rose-200'
              }`}
            >
              {dailyAnswerChoice === dailyQuestion.correctOptionId ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-300 block">Hongera! Correct Answer. Streak +1 🔥</strong>
                    <span className="font-sans text-[11px] text-emerald-200/90 leading-relaxed">
                      {dailyQuestion.options.find((o) => o.id === dailyQuestion.correctOptionId)?.explanation}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-rose-300 block">Incorrect Choice.</strong>
                    <span className="font-sans text-[11px] text-rose-200/90 leading-relaxed">
                      The correct answer is Option {dailyQuestion.correctOptionId}. {dailyQuestion.solution}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Topic & Scope Ribbon (screens < lg) */}
      <div className="lg:hidden bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-lg space-y-2.5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>{activeSubject.name} Topics</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px]">
            <button
              onClick={() => {
                setPracticeScope('topic');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-md font-semibold min-h-[36px] flex items-center ${
                practiceScope === 'topic' ? 'bg-emerald-600 text-white' : 'text-slate-400'
              }`}
            >
              By Topic
            </button>
            <button
              onClick={() => {
                setPracticeScope('all-bank');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-md font-semibold min-h-[36px] flex items-center ${
                practiceScope === 'all-bank' ? 'bg-emerald-600 text-white' : 'text-slate-400'
              }`}
            >
              All Qs ({subjectFullBank.length})
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Topics Carousel */}
        {practiceScope === 'topic' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {filteredTopics.map((topic) => {
              const isSelected = selectedTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopicId(topic.id);
                    setActiveTab('questions');
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 border min-h-[40px] ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm ring-1 ring-emerald-400/30'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{topic.title}</span>
                  <span className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                    isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {topic.questions.length} Qs
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Studio Grid: Left Sidebar + Right Question Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Practice Scope & Topics (Desktop only, mobile uses the top horizontal ribbon) */}
        <div className="hidden lg:block lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Revision Scope
              </h2>
              <span className="text-xs text-slate-400">{activeSubject.name}</span>
            </div>
            <span className="text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
              {subjectFullBank.length} Questions
            </span>
          </div>

          {/* Practice Scope Buttons */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                setPracticeScope('all-bank');
                setCurrentPage(1);
              }}
              className={`p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between ${
                practiceScope === 'all-bank'
                  ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>All {subjectFullBank.length}+ Qs</span>
              </div>
              <span className="text-[10px] font-mono opacity-80">Full Bank</span>
            </button>

            <button
              onClick={() => {
                setPracticeScope('topic');
                setCurrentPage(1);
              }}
              className={`p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between ${
                practiceScope === 'topic'
                  ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>By Topic</span>
              </div>
              <span className="text-[10px] font-mono opacity-80">{activeSubject.topics.length} Units</span>
            </button>
          </div>

          {/* Form Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['all', 'Form 1', 'Form 2', 'Form 3', 'Form 4'] as const).map((form) => (
              <button
                key={form}
                onClick={() => {
                  setSelectedForm(form);
                  setCurrentPage(1);
                }}
                className={`flex-1 py-1 text-center rounded-lg font-medium transition-colors ${
                  selectedForm === form
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {form === 'all' ? 'All' : form}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={`Search in ${subjectFullBank.length}+ questions...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Topics List (when in Topic scope) */}
          {practiceScope === 'topic' && (
            <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
              <span className="text-[11px] font-mono text-slate-400 block px-1 pb-1">
                Select a topic to focus on:
              </span>
              {filteredTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopicId(topic.id);
                    setActiveTab('questions');
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                    selectedTopicId === topic.id
                      ? 'bg-emerald-950/60 border-emerald-600 text-white font-bold'
                      : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-emerald-400">
                        {topic.formLevel}
                      </span>
                      <span className="text-slate-400 text-[10px]">
                        {topic.questions.length + 10} Questions with Choices
                      </span>
                    </div>
                    <span className="block truncate">{topic.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                </button>
              ))}

              {filteredTopics.length === 0 && (
                <div className="p-6 text-center text-slate-500 text-xs">
                  No topics matching search filter.
                </div>
              )}
            </div>
          )}

          {/* Full Bank Information Card */}
          {practiceScope !== 'topic' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
                <BarChart2 className="w-4 h-4" />
                <span>Question Bank Overview</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Browsing the complete {activeSubject.name} repository. Includes Form 1 through Form 4 past questions, national mock examinations, and calculation drills.
              </p>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-1 border-t border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px]">Total in Filter</span>
                  <strong className="text-white">{activeQuestionsPool.length} Questions</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Total Pages</span>
                  <strong className="text-cyan-400">{totalPages} Pages</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Question Content, Pagination & Answer Chooser */}
        <div className="lg:col-span-8 space-y-5 sm:space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-5 sm:space-y-6">
            {/* Header: Topic or Bank Title + Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                  <span>{activeSubject.name}</span>
                  <span>·</span>
                  <span>
                    {practiceScope === 'drill'
                      ? '⚡ Rapid 10-Question Drill'
                      : practiceScope === 'all-bank'
                      ? `Full Question Bank (${activeQuestionsPool.length} Questions)`
                      : currentTopic?.formLevel || 'Form 1–4'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {practiceScope === 'drill'
                    ? '10-Question KCSE Candidate Drill'
                    : practiceScope === 'all-bank'
                    ? `${activeSubject.name} - Complete Revision Bank`
                    : currentTopic?.title || 'Selected Topic'}
                </h2>
              </div>

              {/* Sub-tab navigation */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab('questions')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    activeTab === 'questions'
                      ? 'bg-emerald-600 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Questions ({activeQuestionsPool.length})
                </button>
                {practiceScope === 'topic' && (
                  <>
                    <button
                      onClick={() => setActiveTab('summary')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        activeTab === 'summary'
                          ? 'bg-emerald-600 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Formulas &amp; Rules
                    </button>
                    <button
                      onClick={() => setActiveTab('pitfalls')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        activeTab === 'pitfalls'
                          ? 'bg-emerald-600 text-white font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Examiner Traps
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* TAB 1: QUESTIONS & INTERACTIVE ANSWER CHOICES */}
            {activeTab === 'questions' && (
              <div className="space-y-6">
                {/* Scoreboard Bar with Accuracy, Mode Switch, and Reset */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Practice Mode Toggle */}
                  <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                    <button
                      onClick={() => setPracticeMode('choice')}
                      className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                        practiceMode === 'choice'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Interactive Choice (Choose A, B, C, D)</span>
                    </button>
                    <button
                      onClick={() => setPracticeMode('structured')}
                      className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                        practiceMode === 'structured'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <ListOrdered className="w-3.5 h-3.5" />
                      <span>KNEC Marking Rubrics ($M_1, A_1$)</span>
                    </button>
                  </div>

                  {/* Live Stats */}
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Answered</span>
                      <span className="text-white font-bold">
                        {answeredActiveQuestions.length} / {totalActiveQuestions}
                      </span>
                    </div>
                    <div className="border-l border-slate-800 pl-3">
                      <span className="text-slate-400 block text-[10px]">Score Accuracy</span>
                      <span
                        className={`font-bold ${
                          accuracyPercent >= 70 ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {accuracyPercent}% ({correctActiveQuestions.length} Correct)
                      </span>
                    </div>

                    {/* Drill Performance Grade */}
                    {practiceScope === 'drill' && answeredActiveQuestions.length > 0 && (
                      <div className="border-l border-slate-800 pl-3">
                        <span className="text-slate-400 block text-[10px]">Simulated Grade</span>
                        <span className={`font-bold ${getKcseDrillGrade(accuracyPercent).color}`}>
                          {getKcseDrillGrade(accuracyPercent).grade}
                        </span>
                      </div>
                    )}

                    {answeredActiveQuestions.length > 0 && (
                      <button
                        onClick={resetAllAnswers}
                        title="Clear all answers and test again"
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Pagination Controls Top */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/70 px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span>Showing Page</span>
                      <span className="text-emerald-400 font-bold">{currentPage}</span>
                      <span>of</span>
                      <span className="text-white font-bold">{totalPages}</span>
                      <span className="text-slate-500">({activeQuestionsPool.length} Questions)</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 rounded-lg border border-slate-800 text-slate-300 flex items-center gap-1"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Prev</span>
                      </button>

                      {/* Jump to pages */}
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNum = i + 1;
                        if (totalPages > 5 && currentPage > 3) {
                          pageNum = Math.min(totalPages - 4 + i, currentPage - 2 + i);
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center transition-colors ${
                              currentPage === pageNum
                                ? 'bg-emerald-600 text-white shadow'
                                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 rounded-lg border border-slate-800 text-slate-300 flex items-center gap-1"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* List of Paginated Questions */}
                <div className="space-y-6">
                  {paginatedQuestions.map((q, idx) => {
                    const globalIndex = (currentPage - 1) * PAGE_SIZE + idx + 1;
                    const isRevealed = revealedSolutions[q.id];
                    const selectedChoice = selectedAnswers[q.id];
                    const isAnswered = selectedChoice !== undefined;
                    const isChoiceCorrect = isAnswered && selectedChoice === q.correctOptionId;
                    const studentScore = userScores[q.id];

                    return (
                      <div
                        key={q.id}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4 relative"
                      >
                        {/* Question Meta Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                              Q{globalIndex} · KCSE {q.year} · {q.paper}
                            </span>
                            <span className="text-slate-400">({q.topicClassification})</span>
                            <span className="text-emerald-400/80 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                              {q.formLevel}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold bg-amber-950/60 border border-amber-800 px-2.5 py-0.5 rounded">
                              {q.marks} Marks
                            </span>
                            {isAnswered && (
                              <span
                                className={`px-2.5 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 ${
                                  isChoiceCorrect
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                    : 'bg-rose-950 text-rose-300 border border-rose-700'
                                }`}
                              >
                                {isChoiceCorrect ? (
                                  <>
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                    <span>Correct (+{q.marks} Marks)</span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-3 h-3 text-rose-400" />
                                    <span>Incorrect (Review Solution)</span>
                                  </>
                                )}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Question Text */}
                        <div className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap font-medium">
                          {q.questionText}
                        </div>

                        {/* INTERACTIVE ANSWER CHOICES (A, B, C, D) FOR STUDENTS TO CHOOSE */}
                        <div className="space-y-2.5 pt-2">
                          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                            <span>Select the correct answer (click an option to test your solution):</span>
                            {isAnswered && (
                              <span className="text-emerald-400 text-[11px]">
                                Your choice: Option {selectedChoice}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 gap-2.5">
                            {q.options.map((option) => {
                              const isThisSelected = selectedChoice === option.id;
                              const isThisCorrect = option.id === q.correctOptionId;

                              // Styling states after answering
                              let optionContainerClass =
                                'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-855';
                              let badgeClass = 'bg-slate-800 text-slate-300 border-slate-700';

                              if (isAnswered) {
                                if (isThisCorrect) {
                                  optionContainerClass =
                                    'bg-emerald-950/60 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/50';
                                  badgeClass = 'bg-emerald-600 text-white border-emerald-400';
                                } else if (isThisSelected && !isThisCorrect) {
                                  optionContainerClass =
                                    'bg-rose-950/50 border-rose-600 text-rose-200 ring-1 ring-rose-500/40';
                                  badgeClass = 'bg-rose-600 text-white border-rose-400';
                                } else {
                                  optionContainerClass =
                                    'bg-slate-950/60 border-slate-850 text-slate-500 opacity-60';
                                  badgeClass = 'bg-slate-900 text-slate-600 border-slate-800';
                                }
                              }

                              return (
                                <button
                                  key={option.id}
                                  onClick={() => handleSelectChoice(q.id, option.id)}
                                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 group relative ${optionContainerClass}`}
                                >
                                  {/* Letter Badge */}
                                  <span
                                    className={`w-6 h-6 rounded-lg font-bold font-mono text-xs flex items-center justify-center shrink-0 border transition-colors ${badgeClass}`}
                                  >
                                    {option.id}
                                  </span>

                                  {/* Option Text */}
                                  <div className="flex-1 space-y-1">
                                    <div className="font-medium text-slate-100 group-hover:text-white leading-relaxed">
                                      {option.text}
                                    </div>

                                    {/* Reveal explanation after student selects an option */}
                                    {isAnswered && (isThisSelected || isThisCorrect) && (
                                      <div
                                        className={`mt-2 p-2.5 rounded-lg text-[11px] leading-relaxed font-sans ${
                                          isThisCorrect
                                            ? 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-200'
                                            : 'bg-rose-950/70 border border-rose-800/60 text-rose-200'
                                        }`}
                                      >
                                        <div className="font-bold flex items-center gap-1 mb-0.5 font-mono text-[10px] uppercase">
                                          {isThisCorrect ? (
                                            <>
                                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                              <span>Official KNEC Rationale:</span>
                                            </>
                                          ) : (
                                            <>
                                              <AlertTriangle className="w-3 h-3 text-rose-400" />
                                              <span>Examiner Trap Analysis:</span>
                                            </>
                                          )}
                                        </div>
                                        <span>{option.explanation}</span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Status Icon */}
                                  {isAnswered && isThisCorrect && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 self-center" />
                                  )}
                                  {isAnswered && isThisSelected && !isThisCorrect && (
                                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 self-center" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Candidate Scratchpad (visible in Structured mode or expandable) */}
                        {practiceMode === 'structured' && (
                          <div className="space-y-1.5 pt-2 border-t border-slate-800">
                            <label className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <PenTool className="w-3.5 h-3.5 text-emerald-400" />
                                Your Working &amp; Rough Calculations:
                              </span>
                              <span className="text-slate-500 text-[10px]">Private practice pad</span>
                            </label>
                            <textarea
                              value={userAnswerNotes[q.id] || ''}
                              onChange={(e) =>
                                setUserAnswerNotes((prev) => ({ ...prev, [q.id]: e.target.value }))
                              }
                              rows={3}
                              placeholder="Type out your formulas, working steps, or points before viewing marking scheme..."
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500 resize-none"
                            />
                          </div>
                        )}

                        {/* Action Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                          <button
                            onClick={() => toggleReveal(q.id)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                              isRevealed
                                ? 'bg-slate-800 text-slate-300 border border-slate-700'
                                : 'bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40'
                            }`}
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isRevealed ? 'Hide Full Paper Solution' : 'View Full KNEC Model Steps ($M_1, A_1$)'}</span>
                          </button>

                          <div className="flex items-center gap-2">
                            {/* Ask AI Kenya Tutor */}
                            {onAskAI && (
                              <button
                                onClick={() =>
                                  onAskAI(
                                    activeSubject.name,
                                    `${q.topicClassification} - Question ${q.questionNumber} (${q.year})`,
                                    q.formLevel
                                  )
                                }
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center gap-1.5 transition-colors"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Ask AI Tutor</span>
                              </button>
                            )}

                            {/* Self-Score Selector */}
                            <div className="flex items-center gap-1.5 text-xs font-mono">
                              <span className="text-slate-400">Self-Award:</span>
                              <select
                                value={studentScore ?? (isChoiceCorrect ? q.marks : '')}
                                onChange={(e) => handleSaveScore(q.id, Number(e.target.value))}
                                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-emerald-400 font-bold"
                              >
                                <option value="">Score</option>
                                {Array.from({ length: q.marks + 1 }).map((_, i) => (
                                  <option key={i} value={i}>
                                    {i} / {q.marks} Marks
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* REVEALED OFFICIAL MARKING SCHEME */}
                        {isRevealed && (
                          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
                            {/* Step-by-step Solution */}
                            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                              <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
                                <span>KNEC Step-by-Step Model Solution</span>
                                <span>Total: {q.marks} Marks</span>
                              </div>
                              <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">
                                {q.solution}
                              </div>
                            </div>

                            {/* KNEC Mark Breakdown (M, A, B, C marks) */}
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                              <span className="font-bold text-white block uppercase tracking-wider font-mono text-[11px]">
                                KNEC Marking Scheme Award Rubric:
                              </span>
                              <ul className="space-y-1.5 font-mono text-slate-300 text-[11px]">
                                {q.markingBreakdown.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-400 font-bold">✓</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Examiner Warning Alert */}
                            <div className="bg-amber-950/40 border border-amber-800/60 p-3.5 rounded-xl text-xs flex items-start gap-3">
                              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-amber-300 block mb-0.5">
                                  KNEC Chief Examiner Pitfall Alert:
                                </span>
                                <p className="text-amber-200/90 leading-relaxed font-sans text-[11px]">
                                  {q.examinerWarning}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Controls Bottom */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span>Page {currentPage} of {totalPages}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 rounded-lg border border-slate-800 text-slate-300"
                      >
                        Previous 10 Questions
                      </button>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 rounded-lg text-white font-bold"
                      >
                        Next 10 Questions
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: HIGH-YIELD FORMULAS & SUMMARY */}
            {activeTab === 'summary' && currentTopic && (
              <div className="space-y-6">
                {/* Essential Formulas */}
                {currentTopic.essentialFormulas && currentTopic.essentialFormulas.length > 0 && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
                      <Award className="w-4 h-4 text-cyan-400" />
                      <span>Essential KCSE Examination Formulas</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentTopic.essentialFormulas.map((formula, i) => (
                        <div
                          key={i}
                          className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 flex items-center justify-between"
                        >
                          <span>{formula}</span>
                          <span className="text-[10px] text-slate-500 font-mono">KNEC Table</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* High Yield Key Concepts */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Must-Know Syllabus Master Concepts</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {currentTopic.highYieldSummary.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✦</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: EXAMINER PITFALLS & CANDIDATE TRAPS */}
            {activeTab === 'pitfalls' && currentTopic && (
              <div className="space-y-4">
                <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Chief Examiner Confidential Feedback: Where Candidates Lose Marks</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Every year, thousands of students lose 15–20% of their aggregate marks not because they don't understand the concepts, but due to technical presentation errors, omitted units, missing state symbols, or incorrect graphical shading.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-amber-900/40">
                    {currentTopic.commonExaminerTraps.map((trap, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-relaxed bg-slate-950/80 p-3 rounded-lg border border-amber-900/30">
                        <span className="text-amber-400 font-bold shrink-0">⚠️</span>
                        <span>{trap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TIMED KNEC KCSE MOCK EXAM HALL MODAL */}
      {isExamHallOpen && (
        <KcseMockExamHall
          subjectName={activeSubject.name}
          knecCode={activeSubject.knecCode}
          questions={subjectFullBank.slice(0, 20)}
          timeMinutes={30}
          onClose={() => setIsExamHallOpen(false)}
          onAskAI={onAskAI}
        />
      )}

      {/* PRINTABLE A4 EXAM PAPER MODAL */}
      {isPrintModalOpen && (
        <PrintableExamPaperModal
          subjectName={activeSubject.name}
          knecCode={activeSubject.knecCode}
          questions={paginatedQuestions}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}

      {/* 4-FIGURE TABLES QUICK REFERENCE SLIDE-OUT DRAWER */}
      {isTablesDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col space-y-5 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white font-mono">Four-Figure Tables Lookup</h3>
                  <span className="text-[10px] text-slate-400">KNEC Official Mathematical Instrument</span>
                </div>
              </div>
              <button
                onClick={() => setIsTablesDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Table Type Selector */}
            <div className="grid grid-cols-4 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
              {(['log', 'sin', 'cos', 'tan'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTableType(t)}
                  className={`py-2 rounded-lg font-bold uppercase transition-colors ${
                    tableType === t
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Input Value */}
            <div className="space-y-1.5 font-mono text-xs">
              <label className="text-slate-400">
                {tableType === 'log' ? 'Enter Number (e.g. 567.4):' : 'Enter Angle in Degrees (e.g. 34.7°):'}
              </label>
              <input
                type="text"
                value={tableInput}
                onChange={(e) => setTableInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Result Card */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider">
                Table Value Reading
              </span>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">
                  {tableType.toUpperCase()}({tableInput}) =
                </span>
                <strong className="text-emerald-400 text-xl">{tableResult.finalResult}</strong>
              </div>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
                <div>Row: {tableResult.rowLabel}</div>
                <div>Column: {tableResult.mainColumnLabel}</div>
                {tableResult.meanDiffLabel && <div>Difference: {tableResult.meanDiffLabel}</div>}
              </div>
            </div>

            {/* Step by step calculation */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs font-mono">
              <span className="text-slate-400 font-bold block">Steps for KNEC Method Marks:</span>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {tableResult.intermediateSteps.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed font-sans">
              💡 <strong>KNEC Instruction:</strong> Four-figure tables are standard issue in all KCSE mathematics and science papers. Look up mantissas and mean differences accurately.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
