import React, { useState } from 'react';
import { Calculator, Award, GraduationCap, ChevronRight, CheckCircle2, AlertTriangle, Briefcase, Sparkles, BookOpen } from 'lucide-react';
import { playTapSound } from '../utils/soundEffects';

interface CareerCluster {
  id: string;
  name: string;
  requiredSubjects: string[];
  minimumMeanGrade: string;
  minPoints: number;
  averageCutoffClusterPoints: number;
  description: string;
}

export const GradeCalculator: React.FC = () => {
  // Official KNEC 7-subject configuration
  const [kcseGrades, setKcseGrades] = useState<Record<string, number>>({
    'English (101)': 11,
    'Kiswahili (102)': 10,
    'Mathematics Alternative A (121)': 12,
    'Biology (231)': 11,
    'Chemistry (233)': 11,
    'Physics (232)': 10,
    'History & Government (311)': 12
  });

  const [selectedScience2, setSelectedScience2] = useState<'Biology (231)' | 'Physics (232)'>('Biology (231)');
  const [selectedHumanity, setSelectedHumanity] = useState<'History & Government (311)' | 'Geography (312)' | 'CRE (313)'>('History & Government (311)');
  const [selectedElective, setSelectedElective] = useState<'Computer Studies (451)' | 'Business Studies (565)' | 'Agriculture (443)'>('Computer Studies (451)');

  const GRADE_TO_POINTS: Record<string, number> = {
    A: 12, 'A-': 11, 'B+': 10, B: 9, 'B-': 8, 'C+': 7, C: 6, 'C-': 5, 'D+': 4, D: 3, 'D-': 2, E: 1
  };

  const POINTS_TO_GRADE = (pts: number): { grade: string; badge: string; remark: string } => {
    if (pts >= 11.5) return { grade: 'A (Plain)', badge: 'Distinction 1', remark: 'Highest national honors. Outstanding performance.' };
    if (pts >= 10.5) return { grade: 'A- (Minus)', badge: 'Distinction 2', remark: 'Direct entry to competitive national degree programs.' };
    if (pts >= 9.5) return { grade: 'B+ (Plus)', badge: 'Credit 3', remark: 'Strong qualification for specialized degrees.' };
    if (pts >= 8.5) return { grade: 'B (Plain)', badge: 'Credit 4', remark: 'Direct qualification for STEM and business degrees.' };
    if (pts >= 7.5) return { grade: 'B- (Minus)', badge: 'Credit 5', remark: 'Direct access to degree & diploma programs.' };
    if (pts >= 6.5) return { grade: 'C+ (Plus)', badge: 'Credit 6', remark: 'Official University Placement Minimum Benchmark.' };
    if (pts >= 5.5) return { grade: 'C (Plain)', badge: 'Pass 7', remark: 'Direct entry to National Polytechnic & Medical Diplomas.' };
    if (pts >= 4.5) return { grade: 'C- (Minus)', badge: 'Pass 8', remark: 'Direct entry to Diploma and Craft programs.' };
    if (pts >= 3.5) return { grade: 'D+ (Plus)', badge: 'Pass 9', remark: 'Entry to TVET Certificate courses.' };
    if (pts >= 2.5) return { grade: 'D (Plain)', badge: 'Pass 10', remark: 'Entry to Artisan technical skills.' };
    if (pts >= 1.5) return { grade: 'D- (Minus)', badge: 'Pass 11', remark: 'Artisan qualification pathway.' };
    return { grade: 'E', badge: 'Ungraded', remark: 'Sub-minimum aggregate score.' };
  };

  const totalKcsePoints = Object.values(kcseGrades).reduce((acc, val) => acc + val, 0);
  const meanPoints = totalKcsePoints / Object.keys(kcseGrades).length;
  const kcseResult = POINTS_TO_GRADE(meanPoints);

  const calculateClusterPoints = (clusterSubjects: string[]): number => {
    let r = 0;
    clusterSubjects.forEach((subj) => {
      r += kcseGrades[subj] || 10;
    });
    const R = totalKcsePoints;
    const cluster = Math.sqrt((r / 48) * (R / 84)) * 48;
    return Math.round(cluster * 1000) / 1000;
  };

  const CAREER_CLUSTERS: CareerCluster[] = [
    {
      id: 'cluster-med',
      name: 'Medicine & Pharmacy',
      requiredSubjects: ['Biology (231)', 'Chemistry (233)', 'Mathematics Alternative A (121)', 'English (101)'],
      minimumMeanGrade: 'B+',
      minPoints: 10,
      averageCutoffClusterPoints: 42.5,
      description: 'MBChB, BDS, B.Pharm. Requires high scores in Bio, Chem & Math.'
    },
    {
      id: 'cluster-eng',
      name: 'Engineering & Tech',
      requiredSubjects: ['Mathematics Alternative A (121)', 'Physics (232)', 'Chemistry (233)', 'English (101)'],
      minimumMeanGrade: 'C+',
      minPoints: 7,
      averageCutoffClusterPoints: 39.8,
      description: 'Civil, Electrical, Mechanical & Mechatronics Engineering.'
    },
    {
      id: 'cluster-cs',
      name: 'Computer Science & AI',
      requiredSubjects: ['Mathematics Alternative A (121)', 'Physics (232)', 'English (101)', 'Chemistry (233)'],
      minimumMeanGrade: 'C+',
      minPoints: 7,
      averageCutoffClusterPoints: 38.5,
      description: 'BSc CS, Software Eng, AI & Cybersecurity.'
    },
    {
      id: 'cluster-law',
      name: 'Law (LLB)',
      requiredSubjects: ['English (101)', 'History & Government (311)', 'Kiswahili (102)', 'Mathematics Alternative A (121)'],
      minimumMeanGrade: 'B',
      minPoints: 9,
      averageCutoffClusterPoints: 37.2,
      description: 'Bachelor of Laws. Minimum B in English or Kiswahili.'
    },
    {
      id: 'cluster-biz',
      name: 'Commerce & Finance',
      requiredSubjects: ['Mathematics Alternative A (121)', 'English (101)', 'History & Government (311)', 'Chemistry (233)'],
      minimumMeanGrade: 'C+',
      minPoints: 7,
      averageCutoffClusterPoints: 34.0,
      description: 'BCom, Economics, Statistics & Actuarial Science.'
    },
    {
      id: 'cluster-edu',
      name: 'Education Science & Arts',
      requiredSubjects: ['Mathematics Alternative A (121)', 'English (101)', 'Kiswahili (102)', 'Biology (231)'],
      minimumMeanGrade: 'C+',
      minPoints: 7,
      averageCutoffClusterPoints: 28.5,
      description: 'B.Ed Science, B.Ed Arts. Minimum C+ in two teaching subjects.'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl text-slate-100 space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-400 font-semibold font-mono">
            KNEC Official Grading
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">KCSE Mean Grade &amp; Points</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select grades for your 7 subjects to see your points (out of 84) and degree cutoffs.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs">
          <span className="text-slate-400">Mean:</span>
          <strong className="text-emerald-400 text-sm">{meanPoints.toFixed(2)}</strong>
          <span className="text-slate-500">/ 12.0</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left: 7 Subject Points Inputs */}
        <div className="lg:col-span-6 space-y-3 bg-slate-950/70 p-3.5 sm:p-5 rounded-xl border border-slate-800">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2 flex items-center justify-between">
            <span>Your 7 Subjects</span>
            <span className="text-[10px] text-slate-500">Max: 84 pts</span>
          </h4>
          <div className="space-y-2.5">
            {Object.entries(kcseGrades).map(([subj, pts]) => (
              <div key={subj} className="flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-300 truncate flex-1 min-w-0 font-medium text-[11px] sm:text-xs">{subj}</span>
                <select
                  value={pts}
                  onChange={(e) => {
                    playTapSound();
                    const newPts = parseInt(e.target.value);
                    setKcseGrades((prev) => ({ ...prev, [subj]: newPts }));
                  }}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500 shrink-0 cursor-pointer"
                >
                  <option value={12}>A (12)</option>
                  <option value={11}>A- (11)</option>
                  <option value={10}>B+ (10)</option>
                  <option value={9}>B (9)</option>
                  <option value={8}>B- (8)</option>
                  <option value={7}>C+ (7)</option>
                  <option value={6}>C (6)</option>
                  <option value={5}>C- (5)</option>
                  <option value={4}>D+ (4)</option>
                  <option value={3}>D (3)</option>
                  <option value={2}>D- (2)</option>
                  <option value={1}>E (1)</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Score Card & KNEC Outcome */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Your KCSE Score
            </span>
            <div className="flex items-baseline justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs text-slate-400">Total Points:</span>
              <span className="text-2xl font-bold font-mono text-emerald-400">{totalKcsePoints} / 84</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs text-slate-400">Mean Grade:</span>
              <span className="text-xl font-extrabold text-white">{kcseResult.grade}</span>
            </div>
            <div className="flex items-baseline justify-between pt-0.5">
              <span className="text-xs text-slate-400">Level:</span>
              <span className="text-xs font-mono font-bold text-cyan-400">{kcseResult.badge}</span>
            </div>
          </div>

          {/* Performance Guidance */}
          <div className="bg-slate-950/80 p-3.5 sm:p-4 rounded-xl border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Examiner Tip:</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {kcseResult.remark}
            </p>
            <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
              Rule: 7 subjects include Eng, Kis, Math, 2 Sciences &amp; 2 Electives.
            </div>
          </div>
        </div>
      </div>

      {/* KUCCPS DIRECT UNIVERSITY DEGREE CLUSTERS PREDICTOR */}
      <div className="pt-4 border-t border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-400 shrink-0" />
            <h4 className="text-xs sm:text-sm font-bold text-white font-mono uppercase tracking-wider">
              KUCCPS Degree Cutoffs
            </h4>
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-slate-400">
            Formula: C = √[(r/48) × (R/84)] × 48
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAREER_CLUSTERS.map((cluster) => {
            const calculatedPoints = calculateClusterPoints(cluster.requiredSubjects);
            const qualifies = meanPoints >= cluster.minPoints && calculatedPoints >= cluster.averageCutoffClusterPoints;

            return (
              <div
                key={cluster.id}
                className={`p-4 rounded-xl border space-y-2.5 transition-all text-xs ${
                  qualifies
                    ? 'bg-emerald-950/40 border-emerald-700/60'
                    : 'bg-slate-950 border-slate-800/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-bold text-white leading-snug">{cluster.name}</h5>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                      qualifies
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {qualifies ? 'Qualified ✓' : 'Below Cutoff'}
                  </span>
                </div>

                <div className="flex items-baseline justify-between font-mono pt-1 border-t border-slate-800">
                  <span className="text-[11px] text-slate-400">Your Cluster Points:</span>
                  <strong className={`text-sm ${qualifies ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {calculatedPoints.toFixed(3)}
                  </strong>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Req. Min Grade: {cluster.minimumMeanGrade}</span>
                  <span>Cut-off Target: ~{cluster.averageCutoffClusterPoints}</span>
                </div>

                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  {cluster.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
