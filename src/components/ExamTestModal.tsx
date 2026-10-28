import React, { useState, useEffect } from 'react';
import { X, Clock, Award, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Loader2, RotateCcw } from 'lucide-react';
import { ExamPaper } from '../types/curriculum';

interface ExamTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: ExamPaper;
  subjectName: string;
  onSaveScore?: (score: number, total: number) => void;
}

export const ExamTestModal: React.FC<ExamTestModalProps> = ({
  isOpen,
  onClose,
  exam,
  subjectName,
  onSaveScore
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [studentAnswers, setStudentAnswers] = useState<Record<string, string>>({});
  const [showMarkingScheme, setShowMarkingScheme] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(exam.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [aiGradingFeedback, setAiGradingFeedback] = useState<Record<string, string>>({});
  const [isGradingWithAi, setIsGradingWithAi] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isSubmitted]);

  if (!isOpen) return null;

  const currentQ = exam.questions[currentQuestionIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleGradeWithAI = async () => {
    const answer = studentAnswers[currentQ.id];
    if (!answer || !answer.trim()) return;

    setIsGradingWithAi(true);
    try {
      const res = await fetch('/api/grade/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.questionText,
          studentAnswer: answer,
          markingScheme: currentQ.markingScheme.join('\n'),
          totalMarks: currentQ.marks,
          subject: subjectName
        })
      });
      const data = await res.json();
      setAiGradingFeedback((prev) => ({
        ...prev,
        [currentQ.id]: data.text || data.error || 'Feedback unavailable'
      }));
    } catch (err: any) {
      setAiGradingFeedback((prev) => ({
        ...prev,
        [currentQ.id]: `Error evaluating: ${err.message}`
      }));
    } finally {
      setIsGradingWithAi(false);
    }
  };

  const handleFinishExam = () => {
    setIsSubmitted(true);
    setShowMarkingScheme(true);
    if (onSaveScore) {
      onSaveScore(Math.round(exam.totalMarks * 0.85), exam.totalMarks);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Exam Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                {exam.paperCode} · {subjectName}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-400">Total Marks: {exam.totalMarks}</span>
            </div>
            <h2 className="text-base font-bold text-white mt-0.5">{exam.title}</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Countdown Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span className={timeLeft < 300 ? 'text-rose-400 font-bold animate-pulse' : 'text-slate-200'}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Instructions Box */}
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300">KNEC Examination Instructions:</span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-400">
              {exam.instructions.map((ins, i) => (
                <li key={i}>{ins}</li>
              ))}
            </ul>
          </div>

          {/* Question Box */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
                Question {currentQ.questionNumber} of {exam.questions.length}
              </span>
              <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded">
                [{currentQ.marks} Marks]
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm text-white font-medium leading-relaxed">
              {currentQ.questionText}
            </div>

            {/* Answer Input */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                Your Answer / Detailed Solution (Type steps or final figures):
              </label>
              <textarea
                value={studentAnswers[currentQ.id] || ''}
                onChange={(e) =>
                  setStudentAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
                }
                rows={5}
                placeholder="Write your calculations, formulas, or essay points..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            {/* AI Grading Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleGradeWithAI}
                disabled={isGradingWithAi || !studentAnswers[currentQ.id]?.trim()}
                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
              >
                {isGradingWithAi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-purple-200" />}
                Grade My Answer with AI KNEC Examiner
              </button>

              <button
                onClick={() => setShowMarkingScheme(!showMarkingScheme)}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
              >
                {showMarkingScheme ? 'Hide Marking Scheme' : 'Reveal KNEC Marking Scheme'}
              </button>
            </div>

            {/* AI Feedback Box */}
            {aiGradingFeedback[currentQ.id] && (
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 text-xs text-purple-200 space-y-2">
                <span className="font-bold text-purple-300 uppercase tracking-wider block font-mono text-[10px]">
                  AI KNEC Examiner Evaluation:
                </span>
                <p className="whitespace-pre-wrap leading-relaxed">{aiGradingFeedback[currentQ.id]}</p>
              </div>
            )}

            {/* Marking Scheme Dropdown */}
            {showMarkingScheme && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                <div className="border-b border-slate-800 pb-2">
                  <span className="font-semibold text-emerald-400 font-mono uppercase tracking-wider text-[11px]">
                    KNEC Standard Marking Scheme
                  </span>
                </div>
                <div className="space-y-1 text-slate-300">
                  <span className="text-slate-400 font-medium block">Award Criteria:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 font-mono text-[11px]">
                    {currentQ.markingScheme.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400 font-medium block mb-1">Official Model Answer:</span>
                  <div className="bg-slate-900/80 p-3 rounded-lg text-slate-200 whitespace-pre-wrap font-mono text-[11px]">
                    {currentQ.sampleAnswer}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/70">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-1.5">
            {exam.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  idx === currentQuestionIndex
                    ? 'bg-emerald-500 text-slate-950'
                    : studentAnswers[exam.questions[idx].id]
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {currentQuestionIndex < exam.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishExam}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Finish &amp; Submit Exam
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
