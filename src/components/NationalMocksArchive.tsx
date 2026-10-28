import React, { useState } from 'react';
import {
  FileText,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Printer,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { NATIONAL_MOCK_PAPERS, NationalMockPaper, MockQuestion } from '../data/nationalMocksData';

export function NationalMocksArchive() {
  const [selectedPaperId, setSelectedPaperId] = useState<string>(NATIONAL_MOCK_PAPERS[0].id);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<string[]>([NATIONAL_MOCK_PAPERS[0].questions[0].id]);
  const [showMarkingSchemeMap, setShowMarkingSchemeMap] = useState<Record<string, boolean>>({});

  const activePaper: NationalMockPaper =
    NATIONAL_MOCK_PAPERS.find((p) => p.id === selectedPaperId) || NATIONAL_MOCK_PAPERS[0];

  const toggleQuestion = (qId: string) => {
    setExpandedQuestionIds((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const toggleMarkingScheme = (qId: string) => {
    setShowMarkingSchemeMap((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-rose-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-red-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider border border-rose-400/30">
              <Award className="w-3.5 h-3.5" />
              Kenya National Top Mocks & Pre-KCSE Trials
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              National Top Mocks & KNEC Marking Schemes Archive
            </h1>
            <p className="text-rose-100/90 text-sm sm:text-base leading-relaxed">
              Solve actual mock exam questions from Maranda High, The Kenya High School, Alliance High, and Kapsabet.
              Master the official KNEC examiner marking distribution: Method (M), Accuracy (A), Independent (B), and
              Calculation (C) marks.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-950 rounded-xl font-bold text-xs shadow-lg hover:bg-slate-100 transition-all shrink-0"
          >
            <Printer className="w-4 h-4 text-rose-600" />
            Print Paper & Scheme
          </button>
        </div>
      </div>

      {/* Paper Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-700">
        {NATIONAL_MOCK_PAPERS.map((paper) => {
          const isSelected = paper.id === activePaper.id;
          return (
            <button
              key={paper.id}
              onClick={() => {
                setSelectedPaperId(paper.id);
                setExpandedQuestionIds([paper.questions[0].id]);
              }}
              className={`px-4 py-3 rounded-xl text-left border transition-all shrink-0 min-w-[240px] ${
                isSelected
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 shadow-sm ring-1 ring-rose-500'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-rose-600 dark:text-rose-400">{paper.paperCode}</span>
                <span className="text-slate-400">{paper.year}</span>
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1 truncate">
                {paper.consortiumName}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 truncate">{paper.paperName}</div>
            </button>
          );
        })}
      </div>

      {/* Active Paper Header Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <span>{activePaper.consortiumName}</span>
            <span>&bull;</span>
            <span>{activePaper.year} National Mock</span>
          </div>
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">
            {activePaper.paperCode} - {activePaper.paperName}
          </h2>
          <p className="text-xs text-slate-500 mt-1">{activePaper.overviewInstructions}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/60 px-3 py-1.5 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-rose-500" />
            <span>{activePaper.timeMinutes} Minutes</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900">
            <Award className="w-3.5 h-3.5" />
            <span>{activePaper.totalMarks} Marks Total</span>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {activePaper.questions.map((q: MockQuestion) => {
          const isExpanded = expandedQuestionIds.includes(q.id);
          const isSchemeVisible = showMarkingSchemeMap[q.id];

          return (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
            >
              {/* Question Header */}
              <div
                onClick={() => toggleQuestion(q.id)}
                className="p-5 flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                    {q.questionNumber}
                  </span>
                  <span className="text-xs font-bold text-slate-400">({q.marks} Marks)</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMarkingScheme(q.id);
                    }}
                    className={`text-xs font-bold px-3 py-1 rounded-lg border transition-all ${
                      isSchemeVisible
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900 hover:bg-rose-100'
                    }`}
                  >
                    {isSchemeVisible ? 'Hide KNEC Scheme' : 'View KNEC Scheme & Marks'}
                  </button>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Question Body */}
              {isExpanded && (
                <div className="p-6 pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-6">
                  {/* The Problem Statement */}
                  <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm whitespace-pre-line leading-relaxed font-sans bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    {q.questionText}
                  </div>

                  {/* Marking Scheme Drawer */}
                  {isSchemeVisible && (
                    <div className="space-y-4 pt-2 animate-fadeIn">
                      <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-rose-500" />
                        <span>Official KNEC Rubric & Step-by-Step Marking Scheme</span>
                      </div>

                      <div className="space-y-3">
                        {q.markingScheme.steps.map((step, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 flex items-start justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
                                {step.stepText}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                                {step.explanation}
                              </div>
                            </div>
                            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-rose-600 text-white shrink-0">
                              {step.markType}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Examiner Rule & Common Candidate Mistake */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-xs space-y-1">
                          <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>KNEC Examiner Requirement</span>
                          </div>
                          <p className="text-emerald-900 dark:text-emerald-200 leading-relaxed">
                            {q.markingScheme.knecExaminerRule}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs space-y-1">
                          <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Common Candidate Blunder (-1 to -3 Mks)</span>
                          </div>
                          <p className="text-amber-900 dark:text-amber-200 leading-relaxed">
                            {q.markingScheme.commonCandidateMistake}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
