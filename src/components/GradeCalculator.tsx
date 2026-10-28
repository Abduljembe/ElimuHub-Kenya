import React, { useState } from 'react';
import { Calculator, Award, GraduationCap, ChevronRight, Check } from 'lucide-react';

export const GradeCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kcse' | 'university'>('kcse');

  // KCSE 7 subjects state
  const [kcseGrades, setKcseGrades] = useState<Record<string, number>>({
    'English (101)': 12,
    'Kiswahili (102)': 11,
    'Mathematics (121)': 12,
    'Chemistry (233)': 11,
    'Biology (231)': 11,
    'History & Govt (311)': 12,
    'Computer Studies (451)': 12
  });

  // University Courses state
  const [uniUnits, setUniUnits] = useState([
    { code: 'SMA 101', name: 'Calculus I', credits: 3, grade: 'A' },
    { code: 'CSC 111', name: 'Intro to Programming', credits: 4, grade: 'A' },
    { code: 'PHY 110', name: 'Classical Mechanics', credits: 3, grade: 'B' },
    { code: 'FEE 102', name: 'Circuit Analysis', credits: 4, grade: 'A' }
  ]);

  const GRADE_TO_POINTS: Record<string, number> = {
    A: 12, 'A-': 11, 'B+': 10, B: 9, 'B-': 8, 'C+': 7, C: 6, 'C-': 5, 'D+': 4, D: 3, 'D-': 2, E: 1
  };

  const POINTS_TO_GRADE = (pts: number): string => {
    if (pts >= 11.5) return 'A (Plain)';
    if (pts >= 10.5) return 'A- (Minus)';
    if (pts >= 9.5) return 'B+ (Plus)';
    if (pts >= 8.5) return 'B (Plain)';
    if (pts >= 7.5) return 'B- (Minus)';
    if (pts >= 6.5) return 'C+ (Plus) — KUCCPS Direct University Entry';
    if (pts >= 5.5) return 'C (Plain) — TVET Diploma Entry';
    if (pts >= 4.5) return 'C- (Minus)';
    if (pts >= 3.5) return 'D+ (Plus)';
    if (pts >= 2.5) return 'D (Plain)';
    if (pts >= 1.5) return 'D- (Minus)';
    return 'E';
  };

  const totalKcsePoints = Object.values(kcseGrades).reduce((acc, val) => acc + val, 0);
  const meanPoints = totalKcsePoints / Object.keys(kcseGrades).length;
  const kcseMeanGrade = POINTS_TO_GRADE(meanPoints);

  // KUCCPS Estimated Cluster Points (Formula approximation based on 4 cluster subjects / aggregate)
  const estimatedClusterPoints = (Math.sqrt((Math.min(48, totalKcsePoints * (48 / 84)) / 48) * (totalKcsePoints / 84)) * 48).toFixed(3);

  // University GPA Calculation
  const GPA_SCALE: Record<string, number> = {
    A: 4.0, 'B+': 3.5, B: 3.0, 'C+': 2.5, C: 2.0, D: 1.0, F: 0.0
  };

  const totalCredits = uniUnits.reduce((acc, u) => acc + u.credits, 0);
  const totalQualityPoints = uniUnits.reduce((acc, u) => acc + (GPA_SCALE[u.grade] || 0) * u.credits, 0);
  const currentGPA = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : '0.00';

  const getDegreeClassification = (gpa: number) => {
    if (gpa >= 3.7) return 'First Class Honours (Summa Cum Laude)';
    if (gpa >= 3.0) return 'Second Class Honours (Upper Division)';
    if (gpa >= 2.5) return 'Second Class Honours (Lower Division)';
    if (gpa >= 2.0) return 'Pass';
    return 'Fail / Re-sit required';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">National Academic Assessment</span>
          <h3 className="text-xl font-bold text-white mt-1">Official Kenyan Academic Performance Calculator</h3>
          <p className="text-xs text-slate-400 mt-0.5">KNEC KCSE 12-Point Scale · KUCCPS Cluster Points · University GPA & Classification</p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('kcse')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'kcse' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            KCSE High School (KNEC / KUCCPS)
          </button>
          <button
            onClick={() => setActiveTab('university')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'university' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            University GPA & Degree Class
          </button>
        </div>
      </div>

      {activeTab === 'kcse' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: 7 Subject Points Inputs */}
          <div className="lg:col-span-7 space-y-3 bg-slate-950/70 p-5 rounded-xl border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Grade for 7 Examined Subjects (KNEC Guidelines)
            </h4>
            <div className="space-y-2.5">
              {Object.entries(kcseGrades).map(([subj, pts]) => (
                <div key={subj} className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-300 truncate w-56 font-medium">{subj}</span>
                  <select
                    value={pts}
                    onChange={(e) => {
                      const newPts = parseInt(e.target.value);
                      setKcseGrades((prev) => ({ ...prev, [subj]: newPts }));
                    }}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500"
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

          {/* Right: Score Card & KUCCPS Pathway */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">KCSE Aggregate Outcome</span>
              <div className="flex items-baseline justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400">Total Aggregate Points:</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">{totalKcsePoints} / 84</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400">Mean Grade:</span>
                <span className="text-base font-bold text-white">{kcseMeanGrade}</span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xs text-slate-400">Estimated KUCCPS Cluster:</span>
                <span className="text-xl font-bold font-mono text-cyan-400">{estimatedClusterPoints} / 48</span>
              </div>
            </div>

            {/* University Course Admissions Eligibility */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <span className="text-xs font-semibold text-slate-300 block mb-1">
                KUCCPS Qualifying Degree Programmes in Kenya:
              </span>
              {meanPoints >= 10.5 ? (
                <div className="space-y-1.5 text-emerald-300">
                  <p className="flex items-center gap-1.5">✓ Medicine & Surgery (MBChB) · UoN / Moi / KU</p>
                  <p className="flex items-center gap-1.5">✓ Dental Surgery & Pharmacy · UoN / JKUAT</p>
                  <p className="flex items-center gap-1.5">✓ Electrical & Mechatronics Engineering · UoN / JKUAT</p>
                  <p className="flex items-center gap-1.5">✓ Bachelor of Laws (LLB) · UoN / Strathmore / KU</p>
                </div>
              ) : meanPoints >= 8.5 ? (
                <div className="space-y-1.5 text-cyan-300">
                  <p className="flex items-center gap-1.5">✓ BSc Computer Science & Software Engineering</p>
                  <p className="flex items-center gap-1.5">✓ BSc Nursing & Clinical Medicine</p>
                  <p className="flex items-center gap-1.5">✓ BSc Economics & Actuarial Science</p>
                  <p className="flex items-center gap-1.5">✓ BSc Civil & Agricultural Engineering</p>
                </div>
              ) : meanPoints >= 7.0 ? (
                <div className="space-y-1.5 text-amber-300">
                  <p className="flex items-center gap-1.5">✓ Bachelor of Education (Science / Arts)</p>
                  <p className="flex items-center gap-1.5">✓ Bachelor of Commerce (BCom) & Agribusiness</p>
                  <p className="flex items-center gap-1.5">✓ Bachelor of Arts (History, Geography, Sociology)</p>
                </div>
              ) : (
                <div className="space-y-1.5 text-slate-400">
                  <p className="flex items-center gap-1.5">✓ TVET National Diploma in Engineering / Computing</p>
                  <p className="flex items-center gap-1.5">✓ Kenya Medical Training College (KMTC) Diploma</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* University GPA Tab */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-3 bg-slate-950/70 p-5 rounded-xl border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Semester Course Units & Grades (4.0 GPA Scale)
            </h4>
            <div className="space-y-2">
              {uniUnits.map((unit, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <div>
                    <span className="font-mono text-cyan-400 font-semibold mr-2">{unit.code}</span>
                    <span className="text-slate-200">{unit.name}</span>
                    <span className="text-slate-500 text-[10px] ml-2 font-mono">({unit.credits} Credits)</span>
                  </div>
                  <select
                    value={unit.grade}
                    onChange={(e) => {
                      const newGrade = e.target.value;
                      const copy = [...uniUnits];
                      copy[idx].grade = newGrade;
                      setUniUnits(copy);
                    }}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                  >
                    <option value="A">A (4.0)</option>
                    <option value="B+">B+ (3.5)</option>
                    <option value="B">B (3.0)</option>
                    <option value="C+">C+ (2.5)</option>
                    <option value="C">C (2.0)</option>
                    <option value="D">D (1.0)</option>
                    <option value="F">F (0.0)</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cumulative Academic Standing</span>
              <div className="flex items-baseline justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400">Cumulative GPA:</span>
                <span className="text-3xl font-bold font-mono text-emerald-400">{currentGPA} / 4.00</span>
              </div>
              <div className="pt-2">
                <span className="text-xs text-slate-400 block mb-1">Projected Degree Classification:</span>
                <span className="text-sm font-bold text-cyan-300">
                  {getDegreeClassification(parseFloat(currentGPA))}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
