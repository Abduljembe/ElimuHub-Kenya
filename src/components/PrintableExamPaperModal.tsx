import React, { useState } from 'react';
import { Printer, X, CheckSquare, Square, FileText, Download, Award } from 'lucide-react';
import { MadeFamiliarQuestion } from '../data/madeFamiliarData';

interface PrintableExamPaperModalProps {
  subjectName: string;
  knecCode: string;
  questions: MadeFamiliarQuestion[];
  onClose: () => void;
}

export const PrintableExamPaperModal: React.FC<PrintableExamPaperModalProps> = ({
  subjectName,
  knecCode,
  questions,
  onClose
}) => {
  const [includeMarkingScheme, setIncludeMarkingScheme] = useState<boolean>(true);
  const [candidateName, setCandidateName] = useState<string>('');
  const [indexNumber, setIndexNumber] = useState<string>('');
  const [schoolName, setSchoolName] = useState<string>('');

  const totalMarks = questions.reduce((acc, q) => acc + q.marks, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center overflow-y-auto p-4 sm:p-6 print:p-0 print:bg-white">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-10 text-slate-100 shadow-2xl relative flex flex-col space-y-6 print:bg-white print:text-black print:border-none print:shadow-none print:max-w-none print:w-full print:p-0">
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white font-mono">
              A4 Printable KCSE Examination Paper Generator
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIncludeMarkingScheme((prev) => !prev)}
              className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 hover:text-white"
            >
              {includeMarkingScheme ? (
                <CheckSquare className="w-4 h-4 text-emerald-400" />
              ) : (
                <Square className="w-4 h-4 text-slate-500" />
              )}
              <span>Include KNEC Marking Scheme at End</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print A4 Exam Paper</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE EXAM PAPER CONTAINER */}
        <div className="space-y-8 bg-white text-black p-8 sm:p-12 rounded-2xl shadow-xl font-serif print:p-0 print:shadow-none print:rounded-none">
          {/* Official KNEC Paper Header */}
          <div className="text-center space-y-2 border-b-2 border-black pb-6">
            <div className="text-sm font-bold tracking-widest uppercase">
              REPUBLIC OF KENYA
            </div>
            <div className="text-xs font-semibold tracking-wider uppercase text-gray-700">
              KENYA NATIONAL EXAMINATIONS COUNCIL
            </div>
            <div className="text-lg font-black uppercase pt-1 tracking-tight">
              KENYA CERTIFICATE OF SECONDARY EDUCATION
            </div>
            <div className="text-base font-bold uppercase underline">
              {subjectName.toUpperCase()} — {knecCode}
            </div>
            <div className="text-xs font-mono font-medium text-gray-800 pt-1">
              Time: 2 Hours 30 Minutes · Total Marks: {totalMarks} Marks
            </div>
          </div>

          {/* Candidate Index Header Box */}
          <div className="border border-black p-4 space-y-3 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="block font-bold">Candidate Name:</span>
                <div className="border-b border-black h-6 font-mono text-sm pt-0.5">
                  {candidateName}
                </div>
              </div>
              <div>
                <span className="block font-bold">Index Number:</span>
                <div className="border-b border-black h-6 font-mono text-sm pt-0.5">
                  {indexNumber}
                </div>
              </div>
              <div>
                <span className="block font-bold">School Name / Centre:</span>
                <div className="border-b border-black h-6 font-mono text-sm pt-0.5">
                  {schoolName}
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] leading-relaxed text-gray-700">
              <strong>Instructions to Candidates:</strong>
              <ol className="list-decimal list-inside space-y-0.5 pt-1">
                <li>Write your name and index number in the spaces provided above.</li>
                <li>This paper consists of {questions.length} structured examination questions.</li>
                <li>Answer all questions in the spaces provided below each question.</li>
                <li>Non-programmable silent electronic calculators and KNEC mathematical tables may be used.</li>
                <li>All working must be clearly shown; marks will be awarded for method ($M$) and accuracy ($A$).</li>
              </ol>
            </div>
          </div>

          {/* Examination Questions Section */}
          <div className="space-y-8 pt-4">
            {questions.map((q, idx) => (
              <div key={q.id} className="space-y-3 pb-6 border-b border-gray-300 page-break-inside-avoid">
                <div className="flex items-start justify-between font-bold text-sm">
                  <span className="font-mono">
                    QUESTION {idx + 1}. ({q.marks} Marks)
                  </span>
                  <span className="text-xs font-sans text-gray-600 font-normal">
                    [KCSE {q.year} · {q.paper} — {q.topicClassification}]
                  </span>
                </div>

                <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {q.questionText}
                </div>

                {/* Multiple choice options printed clearly */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans pt-1">
                  {q.options.map((opt) => (
                    <div key={opt.id} className="flex items-start gap-2 p-1.5 border border-gray-200 rounded">
                      <span className="font-bold font-mono">({opt.id})</span>
                      <span>{opt.text}</span>
                    </div>
                  ))}
                </div>

                {/* Working Space Lines */}
                <div className="space-y-3 pt-2">
                  <div className="text-[10px] font-sans text-gray-400 uppercase tracking-widest">
                    Candidate Working &amp; Calculations Space:
                  </div>
                  <div className="border-b border-dashed border-gray-300 h-6" />
                  <div className="border-b border-dashed border-gray-300 h-6" />
                  <div className="border-b border-dashed border-gray-300 h-6" />
                  <div className="border-b border-dashed border-gray-300 h-6" />
                </div>
              </div>
            ))}
          </div>

          {/* Attached KNEC Marking Scheme Section */}
          {includeMarkingScheme && (
            <div className="pt-10 border-t-4 border-black space-y-6 page-break-before-always">
              <div className="text-center space-y-1">
                <div className="text-sm font-bold uppercase tracking-wider">
                  KENYA NATIONAL EXAMINATIONS COUNCIL
                </div>
                <div className="text-lg font-black uppercase underline">
                  CONFIDENTIAL OFFICIAL MARKING SCHEME
                </div>
                <div className="text-xs font-mono text-gray-600">
                  {subjectName} ({knecCode}) · Standard KNEC Scoring Key
                </div>
              </div>

              <div className="space-y-6 text-xs font-sans">
                {questions.map((q, idx) => (
                  <div key={q.id} className="p-4 bg-gray-50 border border-gray-300 rounded-lg space-y-2">
                    <div className="flex items-center justify-between font-bold">
                      <span className="font-mono">
                        Q{idx + 1} Solution · Correct Choice: Option {q.correctOptionId}
                      </span>
                      <span>{q.marks} Marks Total</span>
                    </div>

                    <div className="text-gray-800 whitespace-pre-wrap font-mono text-[11px] leading-relaxed">
                      {q.solution}
                    </div>

                    <div className="pt-1 border-t border-gray-200">
                      <span className="font-bold text-[10px] uppercase text-gray-600 block mb-0.5">
                        Mark Allocation Rubric:
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-gray-700 font-mono">
                        {q.markingBreakdown.map((item, mIdx) => (
                          <li key={mIdx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-[10px] text-red-700 italic pt-1">
                      ⚠️ Examiner Trap Note: {q.examinerWarning}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
