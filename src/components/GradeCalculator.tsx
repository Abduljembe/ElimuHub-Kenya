import React, { useState } from 'react';
import { Calculator, Award, GraduationCap, ChevronRight, CheckCircle2, Info } from 'lucide-react';

export const GradeCalculator: React.FC = () => {
  // Official KNEC 7-subject configuration
  const [kcseGrades, setKcseGrades] = useState<Record<string, number>>({
    'English (101)': 12,
    'Kiswahili (102)': 11,
    'Mathematics Alternative A (121)': 12,
    'Biology (231)': 11,
    'Chemistry (233)': 11,
    'History & Government (311)': 12,
    'Computer Studies (451)': 12
  });

  const GRADE_TO_POINTS: Record<string, number> = {
    A: 12, 'A-': 11, 'B+': 10, B: 9, 'B-': 8, 'C+': 7, C: 6, 'C-': 5, 'D+': 4, D: 3, 'D-': 2, E: 1
  };

  const POINTS_TO_GRADE = (pts: number): { grade: string; badge: string; remark: string } => {
    if (pts >= 11.5) return { grade: 'A (Plain)', badge: 'Distinction 1', remark: 'Highest national honors. Outstanding performance across all clusters.' };
    if (pts >= 10.5) return { grade: 'A- (Minus)', badge: 'Distinction 2', remark: 'Excellent academic mastery. Direct entry to competitive national careers.' };
    if (pts >= 9.5) return { grade: 'B+ (Plus)', badge: 'Credit 3', remark: 'Very good score. Strong qualification for high-level specialized tracks.' };
    if (pts >= 8.5) return { grade: 'B (Plain)', badge: 'Credit 4', remark: 'Good academic achievement. Direct qualification for STEM and business courses.' };
    if (pts >= 7.5) return { grade: 'B- (Minus)', badge: 'Credit 5', remark: 'Fairly good performance. Direct access to degree and polytechnic diplomas.' };
    if (pts >= 6.5) return { grade: 'C+ (Plus)', badge: 'Credit 6', remark: 'Official National Direct University Placement Minimum Benchmark.' };
    if (pts >= 5.5) return { grade: 'C (Plain)', badge: 'Pass 7', remark: 'Direct qualification for National Polytechnic and KMTC Medical Diplomas.' };
    if (pts >= 4.5) return { grade: 'C- (Minus)', badge: 'Pass 8', remark: 'Direct entry to Diploma and Craft Certificate programs.' };
    if (pts >= 3.5) return { grade: 'D+ (Plus)', badge: 'Pass 9', remark: 'Entry to TVET Certificate courses.' };
    if (pts >= 2.5) return { grade: 'D (Plain)', badge: 'Pass 10', remark: 'Entry to Artisan and Vocational technical skills.' };
    if (pts >= 1.5) return { grade: 'D- (Minus)', badge: 'Pass 11', remark: 'Artisan qualification pathway.' };
    return { grade: 'E', badge: 'Ungraded', remark: 'Sub-minimum aggregate score.' };
  };

  const totalKcsePoints = Object.values(kcseGrades).reduce((acc, val) => acc + val, 0);
  const meanPoints = totalKcsePoints / Object.keys(kcseGrades).length;
  const kcseResult = POINTS_TO_GRADE(meanPoints);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold font-mono">
            KNEC Official 8-4-4 &amp; Senior School Assessment
          </span>
          <h3 className="text-xl font-bold text-white mt-1">KCSE Official 7-Subject Mean Grade &amp; Points Calculator</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict KNEC 12-point grading scale based on 7 best examined subjects (3 Compulsory + 2 Sciences + 1 Humanities + 1 Technical/Applied/Business).
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 font-mono text-xs">
          <span className="text-slate-400">Mean Points:</span>
          <strong className="text-emerald-400 text-sm">{meanPoints.toFixed(2)}</strong>
          <span className="text-slate-500">/ 12.00</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 7 Subject Points Inputs */}
        <div className="lg:col-span-7 space-y-3 bg-slate-950/70 p-5 rounded-xl border border-slate-800">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2 flex items-center justify-between">
            <span>KNEC 7-Subject Grade Selectors</span>
            <span className="text-[10px] text-slate-500">Max Points: 84</span>
          </h4>
          <div className="space-y-2.5">
            {Object.entries(kcseGrades).map(([subj, pts]) => (
              <div key={subj} className="flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-300 truncate w-64 font-medium">{subj}</span>
                <select
                  value={pts}
                  onChange={(e) => {
                    const newPts = parseInt(e.target.value);
                    setKcseGrades((prev) => ({ ...prev, [subj]: newPts }));
                  }}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                >
                  <option value={12}>A (12 pts)</option>
                  <option value={11}>A- (11 pts)</option>
                  <option value={10}>B+ (10 pts)</option>
                  <option value={9}>B (9 pts)</option>
                  <option value={8}>B- (8 pts)</option>
                  <option value={7}>C+ (7 pts)</option>
                  <option value={6}>C (6 pts)</option>
                  <option value={5}>C- (5 pts)</option>
                  <option value={4}>D+ (4 pts)</option>
                  <option value={3}>D (3 pts)</option>
                  <option value={2}>D- (2 pts)</option>
                  <option value={1}>E (1 pt)</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Score Card & KNEC Outcome */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Official KCSE Result Card
            </span>
            <div className="flex items-baseline justify-between border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-400">Total Aggregate Points:</span>
              <span className="text-2xl font-bold font-mono text-emerald-400">{totalKcsePoints} / 84</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-400">KCSE Mean Grade:</span>
              <span className="text-lg font-extrabold text-white">{kcseResult.grade}</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-400">KNEC Classification:</span>
              <span className="text-xs font-mono font-bold text-cyan-400">{kcseResult.badge}</span>
            </div>
          </div>

          {/* Performance Guidance */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold font-mono text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>KNEC Examiner Advisory Note:</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {kcseResult.remark}
            </p>
            <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
              Rule: 7 subjects must include English, Kiswahili, Mathematics, 2 Sciences, and 2 Electives.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
