import React, { useState, useEffect, useMemo } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Timer,
  RotateCcw,
  Award,
  ChevronRight,
  ArrowRight,
  Sparkles,
  BookOpen,
  Search,
  Shuffle,
  Layers,
  Filter,
  Check,
  Zap
} from 'lucide-react';
import { MASSIVE_QUIZ_QUESTION_BANK, MassiveQuizQuestion } from '../data/massiveQuizQuestionBank';
import { playSuccessChime, playErrorAlert, playTapSound } from '../utils/soundEffects';

interface QuizEngineProps {
  currentForm?: string;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ currentForm }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedForm, setSelectedForm] = useState<string>(() => {
    if (currentForm && ['Form 1', 'Form 2', 'Form 3', 'Form 4'].includes(currentForm)) {
      return currentForm;
    }
    return 'all';
  });
  const [sprintLength, setSprintLength] = useState<number>(25); // 10, 25, 50, or 2200
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isShuffled, setIsShuffled] = useState<boolean>(true);

  useEffect(() => {
    if (currentForm) {
      if (currentForm === 'KCSE Candidate' || currentForm === 'all') {
        setSelectedForm('all');
      } else if (['Form 1', 'Form 2', 'Form 3', 'Form 4'].includes(currentForm)) {
        setSelectedForm(currentForm);
      }
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  }, [currentForm]);

  // Active quiz state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Available filters
  const subjects = [
    'all',
    'Mathematics',
    'Chemistry',
    'Physics',
    'Biology',
    'English',
    'Kiswahili',
    'Geography',
    'History',
    'Business Studies',
    'Agriculture',
    'Computer Studies'
  ];

  const forms = ['all', 'Form 1', 'Form 2', 'Form 3', 'Form 4'];

  // Filter questions based on subject, form, and search query
  const allMatchingQuestions = useMemo(() => {
    return MASSIVE_QUIZ_QUESTION_BANK.filter((q) => {
      const matchSubj = selectedSubject === 'all' || q.subject.toLowerCase() === selectedSubject.toLowerCase();
      const matchForm =
        selectedForm === 'all' ||
        q.formOrYear.toLowerCase().includes(selectedForm.toLowerCase());
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        query === '' ||
        q.questionText.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query) ||
        q.explanation.toLowerCase().includes(query);

      return matchSubj && matchForm && matchSearch;
    });
  }, [selectedSubject, selectedForm, searchQuery]);

  // Sprint subset
  const activeQuizQuestions = useMemo(() => {
    let pool = [...allMatchingQuestions];
    if (isShuffled && sprintLength < pool.length) {
      // Deterministic-like shuffle based on seed or random
      pool.sort(() => 0.5 - Math.random());
    }
    return pool.slice(0, sprintLength);
  }, [allMatchingQuestions, sprintLength, isShuffled]);

  const currentQ: MassiveQuizQuestion | undefined = activeQuizQuestions[currentIndex] || activeQuizQuestions[0];

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !quizFinished) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, quizFinished]);

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    playTapSound();
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted || !currentQ) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      playSuccessChime();
      setUserScore((prev) => prev + 1);
    } else {
      playErrorAlert();
    }
  };

  const handleNextQuestion = () => {
    playTapSound();
    if (currentIndex < activeQuizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      setIsTimerRunning(false);
      playSuccessChime();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserScore(0);
    setQuizFinished(false);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const percentage = Math.round((userScore / (activeQuizQuestions.length || 1)) * 100) || 0;

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 mb-1">
              <span>National Examination Rapid Practice</span>
              <span>·</span>
              <span>6,600+ KCSE Multiple-Choice Database</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>⚡ Rapid-Fire KCSE Quiz Engine (6,600+ Questions)</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Test your recall on <strong>6,600+ authentic KCSE questions</strong> across all 11 subjects. Instant verification, marking scheme method marks ($M_1, A_1$), and common mistake alerts.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 shrink-0">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-sm">
              <Timer className="w-4 h-4" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="text-xs font-mono text-slate-400">
              Score: <strong className="text-emerald-400 text-sm">{userScore}</strong> / {activeQuizQuestions.length}
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="text-xs font-mono text-cyan-400">
              <span>Pool: {allMatchingQuestions.length} Qs</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-3">
          {/* Subject Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
            <span className="text-slate-500 uppercase shrink-0 text-[10px] font-bold">Subject:</span>
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setSelectedSubject(sub);
                  handleRestartQuiz();
                }}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all border ${
                  selectedSubject === sub
                    ? 'bg-amber-500 text-black border-amber-400 shadow-md font-extrabold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {sub === 'all' ? 'All 11 Subjects' : sub}
              </button>
            ))}
          </div>

          {/* Form Level + Sprint Mode + Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono pt-2 border-t border-slate-800/60">
            {/* Form Level */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 uppercase text-[10px] font-bold">Level:</span>
              {forms.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setSelectedForm(f);
                    handleRestartQuiz();
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] ${
                    selectedForm === f
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {f === 'all' ? 'All Forms' : f}
                </button>
              ))}
            </div>

            {/* Sprint Length Options */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 uppercase text-[10px] font-bold">Sprint:</span>
              {[
                { len: 10, label: '10 Qs' },
                { len: 25, label: '25 Qs' },
                { len: 50, label: '50 Qs' },
                { len: 100, label: '100 Qs' },
                { len: 10000, label: 'All (6,600+)' }
              ].map((item) => (
                <button
                  key={item.len}
                  onClick={() => {
                    setSprintLength(item.len);
                    handleRestartQuiz();
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] ${
                    sprintLength === item.len
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setIsShuffled((prev) => !prev);
                  handleRestartQuiz();
                }}
                className={`p-1.5 rounded-lg border flex items-center gap-1 text-[11px] ${
                  isShuffled
                    ? 'bg-amber-950 border-amber-600 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
                title="Shuffle question order"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Card or Result Screen */}
      {!quizFinished && currentQ ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl space-y-5 sm:space-y-6">
          {/* Question Header & Progress Bar */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-mono text-slate-400 mb-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-amber-400 font-bold uppercase bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800 text-[11px]">
                  {currentQ.subject}
                </span>
                <span className="text-slate-400 text-[11px]">{currentQ.formOrYear}</span>
                <span className="text-slate-500">·</span>
                <span className="text-cyan-400 text-[11px] truncate max-w-[200px]">{currentQ.topic}</span>
              </div>
              <span className="text-[11px] text-slate-400 whitespace-nowrap self-end sm:self-auto">
                Q {currentIndex + 1} of {activeQuizQuestions.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / activeQuizQuestions.length) * 100}%`
                }}
              />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mt-5 leading-relaxed font-sans whitespace-pre-wrap">
              {currentQ.questionText}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let optionClass =
                'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-950';

              if (isAnswerSubmitted) {
                if (idx === currentQ.correctIndex) {
                  optionClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                } else if (isSelected) {
                  optionClass = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                }
              } else if (isSelected) {
                optionClass = 'bg-amber-950/80 border-amber-500 text-amber-200 ring-1 ring-amber-500';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm font-medium ${optionClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs flex items-center justify-center text-slate-300 font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </div>

                  {isAnswerSubmitted && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Box */}
          {isAnswerSubmitted && (
            <div className="space-y-3 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs animate-in fade-in">
              <div className="flex items-center gap-2">
                {selectedOption === currentQ.correctIndex ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Correct Answer! (+1 Mark)
                  </span>
                ) : (
                  <span className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                    <XCircle className="w-4 h-4" /> Incorrect (Correct: {String.fromCharCode(65 + currentQ.correctIndex)})
                  </span>
                )}
              </div>

              <p className="text-slate-300 leading-relaxed text-xs">{currentQ.explanation}</p>

              <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-amber-200 space-y-1">
                <strong className="block text-[10px] font-mono uppercase text-amber-400">
                  KNEC Marking Rule:
                </strong>
                <p className="text-[11px]">{currentQ.knecRule}</p>
                {currentQ.knecTrap && (
                  <div className="text-[10px] text-rose-300 mt-1">
                    ⚠️ <strong>Examiner Pitfall:</strong> {currentQ.knecTrap}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-5">
            <button
              onClick={handleRestartQuiz}
              className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl flex items-center gap-1.5 transition-colors font-mono"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Sprint
            </button>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-lg font-mono"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg font-mono"
              >
                <span>{currentIndex < activeQuizQuestions.length - 1 ? 'Next Question' : 'View Final Scorecard'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Scorecard */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-xl space-y-6">
          <Award className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Rapid Quiz Sprint Complete!</h3>
            <p className="text-xs text-slate-400 mt-1">
              Completed {activeQuizQuestions.length} questions in {formatTime(elapsedSeconds)} · Subject: {selectedSubject}
            </p>
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-mono text-slate-400 block">Final Score</span>
              <strong className="text-3xl font-extrabold text-white">
                {userScore} / {activeQuizQuestions.length}
              </strong>
            </div>
            <div className="h-10 w-px bg-slate-800 hidden sm:block" />
            <div>
              <span className="text-xs font-mono text-slate-400 block">Percentage</span>
              <strong className={`text-3xl font-extrabold ${percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {percentage}%
              </strong>
            </div>
            <div className="h-10 w-px bg-slate-800 hidden sm:block" />
            <div>
              <span className="text-xs font-mono text-slate-400 block">KNEC Grade</span>
              <strong className="text-3xl font-extrabold text-cyan-400">
                {percentage >= 80 ? 'A' : percentage >= 75 ? 'A-' : percentage >= 70 ? 'B+' : percentage >= 65 ? 'B' : percentage >= 55 ? 'C+' : 'D'}
              </strong>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg font-mono"
            >
              Take Another 25 Qs Sprint
            </button>
            <button
              onClick={() => {
                setSprintLength(50);
                handleRestartQuiz();
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 font-mono"
            >
              Try 50 Qs Marathon
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
