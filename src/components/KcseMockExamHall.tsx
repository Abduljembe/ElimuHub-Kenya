import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flag,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Printer,
  Sparkles,
  Award,
  BookOpen,
  Calculator,
  X,
  FileText,
  PenTool
} from 'lucide-react';
import { MadeFamiliarQuestion } from '../data/madeFamiliarData';
import { lookupLogarithm, lookupTrigRatio } from '../utils/fourFigureMath';

interface KcseMockExamHallProps {
  subjectName: string;
  knecCode: string;
  questions: MadeFamiliarQuestion[];
  timeMinutes?: number;
  onClose: () => void;
  onAskAI?: (subject: string, topic: string, level: string) => void;
}

export const KcseMockExamHall: React.FC<KcseMockExamHallProps> = ({
  subjectName,
  knecCode,
  questions,
  timeMinutes = 30,
  onClose,
  onAskAI
}) => {
  // Candidate info
  const [candidateName, setCandidateName] = useState<string>('Candidate 2026');
  const [candidateIndex] = useState<string>(
    () => `KNEC/${Math.floor(10000000 + Math.random() * 90000000)}/001`
  );

  // Exam state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(timeMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);

  // Scratchpad & 4-Figure table drawer
  const [scratchpad, setScratchpad] = useState<Record<string, string>>({});
  const [isTablesOpen, setIsTablesOpen] = useState<boolean>(false);
  const [tableType, setTableType] = useState<'log' | 'sin' | 'cos' | 'tan'>('log');
  const [tableInput, setTableInput] = useState<string>('45.6');

  // Timer effect
  useEffect(() => {
    if (isSubmitted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  // Current active question
  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  const handleSelectAnswer = (choiceId: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted || !currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: choiceId
    }));
  };

  const toggleFlag = (qId: string) => {
    setFlagged((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Format timer MM:SS
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Scoring
  const correctCount = questions.filter((q) => answers[q.id] === q.correctOptionId).length;
  const totalMarks = questions.reduce((acc, q) => acc + q.marks, 0);
  const earnedMarks = questions.reduce(
    (acc, q) => (answers[q.id] === q.correctOptionId ? acc + q.marks : acc),
    0
  );
  const scorePercent = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;

  // Grade allocation
  const getKcseMeanGrade = (pct: number) => {
    if (pct >= 80) return { grade: 'A', points: 12, label: 'Excellent / University Scholarship', color: 'text-emerald-400' };
    if (pct >= 75) return { grade: 'A-', points: 11, label: 'Very Good / Degree Direct Entry', color: 'text-emerald-300' };
    if (pct >= 70) return { grade: 'B+', points: 10, label: 'Good / Competitive STEM Placement', color: 'text-cyan-400' };
    if (pct >= 65) return { grade: 'B', points: 9, label: 'Good Standard', color: 'text-cyan-300' };
    if (pct >= 60) return { grade: 'B-', points: 8, label: 'Above Average', color: 'text-amber-300' };
    if (pct >= 55) return { grade: 'C+', points: 7, label: 'University Entry Cutoff', color: 'text-amber-400' };
    if (pct >= 50) return { grade: 'C', points: 6, label: 'Diploma Benchmark', color: 'text-yellow-400' };
    if (pct >= 45) return { grade: 'C-', points: 5, label: 'Certificate Placement', color: 'text-orange-400' };
    if (pct >= 40) return { grade: 'D+', points: 4, label: 'Basic Pass', color: 'text-orange-500' };
    if (pct >= 35) return { grade: 'D', points: 3, label: 'Needs Remedial', color: 'text-rose-400' };
    if (pct >= 30) return { grade: 'D-', points: 2, label: 'Low Pass', color: 'text-rose-500' };
    return { grade: 'E', points: 1, label: 'Fail / Repeat Syllabus', color: 'text-rose-600' };
  };

  const candidateGrade = getKcseMeanGrade(scorePercent);

  // 4-Figure lookup computation
  const tableResult =
    tableType === 'log'
      ? lookupLogarithm(parseFloat(tableInput) || 1.0)
      : lookupTrigRatio(parseFloat(tableInput) || 0.0, tableType);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden text-slate-100">
      {/* Top Exam Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-950 p-2 rounded-xl border border-emerald-800">
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
              <span>Official KNEC Mock Examination Hall</span>
              <span>·</span>
              <span>{knecCode}</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {subjectName} — National Standard Examination
            </h1>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono">
          {!isSubmitted && (
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-bold text-sm transition-colors ${
                timeLeft < 300
                  ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse'
                  : 'bg-slate-950 border-slate-800 text-emerald-400'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          )}

          {/* Quick Tables Drawer Trigger */}
          <button
            onClick={() => setIsTablesOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>4-Figure Tables</span>
          </button>

          {!isSubmitted ? (
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
            >
              Submit Exam
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>Exit Hall</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Body: Exam Taking OR Official Result Slip */}
      {!isSubmitted ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left / Center: Active Question Display */}
          <div className="lg:col-span-8 xl:col-span-9 p-4 sm:p-6 overflow-y-auto space-y-5">
            {/* Question Progress & Meta */}
            <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-800 font-bold">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span className="text-slate-400">KCSE {currentQ.year} · {currentQ.paper}</span>
                <span className="text-slate-500 hidden sm:inline">({currentQ.topicClassification})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  className={`px-3 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                    flagged[currentQ.id]
                      ? 'bg-amber-950 border-amber-600 text-amber-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flagged[currentQ.id] ? 'Flagged for Review' : 'Flag Question'}</span>
                </button>
                <span className="bg-amber-950/60 border border-amber-800 text-amber-400 px-2.5 py-1 rounded-lg font-bold">
                  {currentQ.marks} Marks
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-md text-sm sm:text-base text-slate-100 font-sans leading-relaxed whitespace-pre-wrap">
              {currentQ.questionText}
            </div>

            {/* Selectable Answer Choices (A, B, C, D) */}
            <div className="space-y-3 pt-1">
              <span className="text-xs font-mono text-slate-400 block">
                Select your answer (Click to record):
              </span>

              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((option) => {
                  const isSelected = answers[currentQ.id] === option.id;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectAnswer(option.id)}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/50 shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {option.id}
                      </span>
                      <span className="font-medium leading-relaxed pt-0.5">{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Candidate Scratchpad */}
            <div className="pt-2 space-y-1.5">
              <label className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-emerald-400" />
                  Candidate Working Scratchpad (Rough Notes):
                </span>
                <span className="text-slate-500 text-[10px]">Saved automatically</span>
              </label>
              <textarea
                value={scratchpad[currentQ.id] || ''}
                onChange={(e) =>
                  setScratchpad((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
                }
                rows={2}
                placeholder="Type your intermediate working or numbers here..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            {/* Question Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-xs font-semibold text-slate-300 border border-slate-800 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Question</span>
              </button>

              <button
                disabled={currentIndex === totalQuestions - 1}
                onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-xs font-bold text-white shadow flex items-center gap-2"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Question Navigator Matrix */}
          <div className="lg:col-span-4 xl:col-span-3 bg-slate-900 border-l border-slate-800 p-5 overflow-y-auto space-y-5">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Question Matrix
              </h2>
              <div className="text-xs text-slate-300 flex items-center justify-between font-mono">
                <span>Progress:</span>
                <strong className="text-emerald-400">
                  {answeredCount} / {totalQuestions} Answered
                </strong>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded bg-emerald-600" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2.5 h-2.5 rounded bg-amber-600" />
                <span>Flagged</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700" />
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded bg-cyan-600 ring-1 ring-cyan-300" />
                <span>Current</span>
              </div>
            </div>

            {/* Matrix Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 font-mono text-xs">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flagged[q.id];

                let bgClass = 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700';

                if (isCurrent) {
                  bgClass = 'bg-cyan-600 border-cyan-400 text-white font-bold ring-2 ring-cyan-400/50';
                } else if (isFlagged) {
                  bgClass = 'bg-amber-950 border-amber-600 text-amber-300 font-bold';
                } else if (isAnswered) {
                  bgClass = 'bg-emerald-950 border-emerald-600 text-emerald-300 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg border flex items-center justify-center relative transition-all ${bgClass}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Candidate Credentials Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <span className="text-[10px] text-slate-500 block uppercase">Candidate Desk</span>
              <div>
                <span className="text-slate-400 block text-[10px]">Candidate Name</span>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Mock Index No.</span>
                <span className="text-emerald-400 font-bold">{candidateIndex}</span>
              </div>
            </div>

            {/* Submit Exam Button */}
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit &amp; Grade Exam ({answeredCount}/{totalQuestions})</span>
            </button>
          </div>
        </div>
      ) : (
        /* OFFICIAL KNEC KCSE CANDIDATE RESULT SLIP */
        <div className="flex-1 p-4 sm:p-8 overflow-y-auto space-y-8 max-w-5xl mx-auto w-full">
          {/* Printable Result Slip Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-black">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 print:border-black">
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest print:text-black">
                  Kenya National Examinations Council · Mock Assessment
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 print:text-black">
                  Official Candidate Result Slip
                </h1>
                <p className="text-slate-400 text-xs font-mono mt-0.5 print:text-gray-700">
                  Examination: {subjectName} ({knecCode}) · Standard KCSE Metric
                </p>
              </div>

              {/* Print Action */}
              <div className="flex items-center gap-2 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Result Slip (PDF)</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Return to Revision
                </button>
              </div>
            </div>

            {/* Candidate & Mean Grade Header Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6 border-b border-slate-800 print:border-black">
              {/* Candidate Info */}
              <div className="md:col-span-7 space-y-3 font-mono text-xs">
                <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 print:bg-gray-100 print:border-black">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Candidate Name</span>
                    <strong className="text-white text-sm print:text-black">{candidateName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Candidate Index No.</span>
                    <strong className="text-emerald-400 text-sm print:text-black">{candidateIndex}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Subject Examined</span>
                    <span className="text-slate-200 print:text-black">{subjectName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Total Questions</span>
                    <span className="text-slate-200 print:text-black">{totalQuestions} Questions</span>
                  </div>
                </div>
              </div>

              {/* Mean Grade Badge */}
              <div className="md:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-around print:bg-gray-50 print:border-black">
                <div className="text-center">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    KNEC Mean Grade
                  </span>
                  <span className={`text-4xl sm:text-5xl font-black ${candidateGrade.color} print:text-black`}>
                    {candidateGrade.grade}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 block mt-1">
                    {candidateGrade.points} Points (out of 12)
                  </span>
                </div>

                <div className="border-l border-slate-800 pl-4 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    Score Aggregate
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white print:text-black">
                    {scorePercent}%
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 block mt-1">
                    {earnedMarks} / {totalMarks} Marks
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Summary Banner */}
            <div className="py-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-bold">{candidateGrade.label}</span>
                </div>
                <div className="text-slate-400">
                  Questions Correct: <strong className="text-emerald-400">{correctCount}</strong> / {totalQuestions}
                </div>
              </div>
            </div>

            {/* Detailed Question Review */}
            <div className="space-y-4 pt-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Question-by-Question Marking &amp; Feedback Review</span>
              </h2>

              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const candidateChoice = answers[q.id];
                  const isCorrect = candidateChoice === q.correctOptionId;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border space-y-3 text-xs ${
                        isCorrect
                          ? 'bg-slate-950/70 border-emerald-800/60'
                          : 'bg-slate-950/70 border-rose-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">Q{idx + 1}.</span>
                          <span className="text-slate-400">({q.topicClassification})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded font-bold flex items-center gap-1 ${
                              isCorrect
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                : 'bg-rose-950 text-rose-300 border border-rose-700'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>+{q.marks} Marks</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 text-rose-400" />
                                <span>0 / {q.marks} Marks</span>
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                        {q.questionText}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                        <div
                          className={`p-2 rounded-lg border ${
                            isCorrect
                              ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300'
                              : 'bg-rose-950/40 border-rose-700 text-rose-300'
                          }`}
                        >
                          <span>Your Selected Choice: </span>
                          <strong>{candidateChoice ? `Option ${candidateChoice}` : 'Unanswered'}</strong>
                        </div>
                        <div className="p-2 rounded-lg border bg-slate-900 border-slate-800 text-slate-300">
                          <span>Official KNEC Choice: </span>
                          <strong className="text-emerald-400">Option {q.correctOptionId}</strong>
                        </div>
                      </div>

                      {/* KNEC Model Solution & Warning */}
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1.5 text-[11px] font-mono">
                        <span className="text-emerald-400 font-bold block">KNEC Marking Rubric:</span>
                        <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                          {q.solution}
                        </div>
                        <div className="text-amber-300/90 pt-1 text-[10px] font-sans border-t border-slate-800">
                          ⚠️ <strong>Examiner Note:</strong> {q.examinerWarning}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal to Submit */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-base font-bold text-white">Confirm Exam Submission?</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              You have answered <strong className="text-emerald-400">{answeredCount}</strong> out of{' '}
              <strong className="text-white">{totalQuestions}</strong> questions.
              {totalQuestions - answeredCount > 0 && (
                <span className="text-rose-400 block mt-1">
                  ⚠️ You still have {totalQuestions - answeredCount} unanswered questions!
                </span>
              )}
              {flaggedCount > 0 && (
                <span className="text-amber-300 block mt-0.5">
                  🚩 {flaggedCount} questions are still flagged for review.
                </span>
              )}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Continue Exam
              </button>
              <button
                onClick={() => {
                  setShowConfirmSubmit(false);
                  setIsSubmitted(true);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4-Figure Tables Quick Reference Slide-Out Drawer */}
      {isTablesOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-5 flex flex-col space-y-4 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-mono">Four-Figure Tables Lookup</h3>
              </div>
              <button
                onClick={() => setIsTablesOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Table Type Selector */}
            <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              {(['log', 'sin', 'cos', 'tan'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTableType(t)}
                  className={`py-1.5 rounded-lg font-bold uppercase transition-colors ${
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
            <div className="space-y-1 font-mono text-xs">
              <label className="text-slate-400">
                {tableType === 'log' ? 'Enter Number (e.g. 567.4):' : 'Enter Angle in Degrees (e.g. 34.7°):'}
              </label>
              <input
                type="text"
                value={tableInput}
                onChange={(e) => setTableInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Result Card */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
              <span className="text-[10px] text-slate-500 block uppercase">Table Reading</span>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">
                  {tableType.toUpperCase()}({tableInput}) =
                </span>
                <strong className="text-emerald-400 text-base">{tableResult.finalResult}</strong>
              </div>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <div>Row: {tableResult.rowLabel}</div>
                <div>Column: {tableResult.mainColumnLabel}</div>
                {tableResult.meanDiffLabel && <div>Diff: {tableResult.meanDiffLabel}</div>}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              💡 <strong>KNEC Instruction:</strong> Four-figure tables are standard issue in all KCSE mathematics and science papers. Look up mantissas and mean differences accurately.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
