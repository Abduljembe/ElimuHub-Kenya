import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  Calculator,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Trash2,
  BookOpen,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

interface CourseUnit {
  id: string;
  code: string;
  title: string;
  creditUnits: number;
  catScore: number; // out of 30
  examScore: number; // out of 70
}

export const UniversityGPAPredictor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'target' | 'honours-guide'>('calculator');

  // Multi-semester course list
  const [units, setUnits] = useState<CourseUnit[]>([
    { id: '1', code: 'ACS 301', title: 'Data Structures and Algorithms', creditUnits: 3, catScore: 24, examScore: 54 },
    { id: '2', code: 'SMA 302', title: 'Linear Algebra II', creditUnits: 3, catScore: 22, examScore: 48 },
    { id: '3', code: 'BCS 305', title: 'Database Management Systems', creditUnits: 4, catScore: 27, examScore: 58 },
    { id: '4', code: 'STA 304', title: 'Probability & Mathematical Statistics', creditUnits: 3, catScore: 21, examScore: 45 },
    { id: '5', code: 'CCS 308', title: 'Computer Networks & Security', creditUnits: 3, catScore: 25, examScore: 52 },
    { id: '6', code: 'UCU 103', title: 'Critical Thinking & Moral Philosophy', creditUnits: 2, catScore: 26, examScore: 56 }
  ]);

  // Target Graduation Predictor State
  const [currentCgpa, setCurrentCgpa] = useState<number>(3.15);
  const [completedCredits, setCompletedCredits] = useState<number>(64);
  const [targetGraduationHonours, setTargetGraduationHonours] = useState<'first' | 'upper'>('upper');
  const [remainingCredits, setRemainingCredits] = useState<number>(56);

  // Helper to map percent to Grade, Grade Points & Letter
  const getGradeDetails = (totalScore: number) => {
    if (totalScore >= 70) return { letter: 'A', points: 4.0, label: 'Excellent', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800' };
    if (totalScore >= 65) return { letter: 'B+', points: 3.5, label: 'Very Good', color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800' };
    if (totalScore >= 60) return { letter: 'B', points: 3.0, label: 'Good', color: 'text-blue-400 bg-blue-950/60 border-blue-800' };
    if (totalScore >= 55) return { letter: 'C+', points: 2.5, label: 'Fairly Good', color: 'text-yellow-400 bg-yellow-950/60 border-yellow-800' };
    if (totalScore >= 50) return { letter: 'C', points: 2.0, label: 'Average', color: 'text-amber-400 bg-amber-950/60 border-amber-800' };
    if (totalScore >= 45) return { letter: 'D+', points: 1.5, label: 'Weak Pass', color: 'text-orange-400 bg-orange-950/60 border-orange-800' };
    if (totalScore >= 40) return { letter: 'D', points: 1.0, label: 'Pass', color: 'text-rose-400 bg-rose-950/60 border-rose-800' };
    return { letter: 'E', points: 0.0, label: 'Fail / Retake', color: 'text-red-500 bg-red-950/80 border-red-700' };
  };

  // Calculations for current table
  const totalCredits = units.reduce((acc, u) => acc + u.creditUnits, 0);
  const totalQualityPoints = units.reduce((acc, u) => {
    const totalScore = u.catScore + u.examScore;
    const grade = getGradeDetails(totalScore);
    return acc + grade.points * u.creditUnits;
  }, 0);
  const semesterGpa = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : '0.00';

  const totalWeightedPercent = units.reduce((acc, u) => acc + (u.catScore + u.examScore) * u.creditUnits, 0);
  const averagePercentage = totalCredits > 0 ? (totalWeightedPercent / totalCredits).toFixed(1) : '0.0';

  // Determine Honours Classification from GPA / CWA
  const getHonoursClassification = (gpaNum: number, percentNum: number) => {
    if (gpaNum >= 3.7 || percentNum >= 70.0) {
      return {
        title: 'First Class Honours (Summa Cum Laude)',
        badge: 'Top Tier Distinction',
        color: 'text-emerald-400 border-emerald-500 bg-emerald-950/50',
        scholarshipReady: true
      };
    }
    if (gpaNum >= 3.0 || percentNum >= 60.0) {
      return {
        title: 'Second Class Honours, Upper Division (2:1)',
        badge: 'High Professional Standing',
        color: 'text-cyan-400 border-cyan-500 bg-cyan-950/50',
        scholarshipReady: true
      };
    }
    if (gpaNum >= 2.0 || percentNum >= 50.0) {
      return {
        title: 'Second Class Honours, Lower Division (2:2)',
        badge: 'Standard Graduate Qualification',
        color: 'text-yellow-400 border-yellow-500 bg-yellow-950/50',
        scholarshipReady: false
      };
    }
    if (gpaNum >= 1.0 || percentNum >= 40.0) {
      return {
        title: 'Pass Degree',
        badge: 'Basic Clearance',
        color: 'text-orange-400 border-orange-500 bg-orange-950/50',
        scholarshipReady: false
      };
    }
    return {
      title: 'Academic Probation / Discontinuation Risk',
      badge: 'Unsatisfactory',
      color: 'text-rose-500 border-rose-600 bg-rose-950/50',
      scholarshipReady: false
    };
  };

  const currentClassification = getHonoursClassification(parseFloat(semesterGpa), parseFloat(averagePercentage));

  // Add Unit
  const handleAddUnit = () => {
    const newUnit: CourseUnit = {
      id: Date.now().toString(),
      code: `UNIT ${units.length + 1}`,
      title: 'Elective Course Unit',
      creditUnits: 3,
      catScore: 21,
      examScore: 49
    };
    setUnits([...units, newUnit]);
  };

  // Remove Unit
  const handleRemoveUnit = (id: string) => {
    if (units.length <= 1) return;
    setUnits(units.filter((u) => u.id !== id));
  };

  // Update Unit
  const handleUpdateUnit = (id: string, field: keyof CourseUnit, value: any) => {
    setUnits(
      units.map((u) => {
        if (u.id === id) {
          return { ...u, [field]: value };
        }
        return u;
      })
    );
  };

  // Target Graduation Predictor Calculation
  // targetCGPA = (currentCGPA * completedCredits + requiredFutureGPA * remainingCredits) / (completedCredits + remainingCredits)
  // requiredFutureGPA = (targetCGPA * totalCredits - currentCGPA * completedCredits) / remainingCredits
  const targetCGPAVal = targetGraduationHonours === 'first' ? 3.70 : 3.00;
  const totalTargetCredits = completedCredits + remainingCredits;
  const requiredFutureGpaRaw =
    remainingCredits > 0
      ? (targetCGPAVal * totalTargetCredits - currentCgpa * completedCredits) / remainingCredits
      : 0;
  const requiredFutureGpa = requiredFutureGpaRaw.toFixed(2);
  const isTargetAchievable = requiredFutureGpaRaw <= 4.0 && requiredFutureGpaRaw >= 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              <span>Commission for University Education (CUE) Standard</span>
              <span>·</span>
              <span>Kenyan Degree Honours Classification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              University Cumulative GPA &amp; Honours Predictor
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Calculate semester Weighted GPA, Continuous Assessment (CAT 30%) + Final Examination (70%) scores, Dean's List eligibility, and determine exact required GPA for First Class or Upper Second Class honours graduation.
            </p>
          </div>

          {/* Quick GPA Summary Badge */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right shrink-0">
            <span className="text-xs font-mono text-slate-400 block">Semester GPA</span>
            <div className="text-3xl font-black text-cyan-400 font-mono">{semesterGpa} <span className="text-xs text-slate-400">/ 4.00</span></div>
            <span className="text-[11px] text-slate-400 font-mono">Mean: {averagePercentage}%</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 border-t border-slate-800/80 pt-4 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'bg-cyan-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Calculator className="w-4 h-4" />
            CAT &amp; Exam Semester GPA Calculator
          </button>
          <button
            onClick={() => setActiveTab('target')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'target'
                ? 'bg-cyan-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Honours Graduation Target Predictor
          </button>
          <button
            onClick={() => setActiveTab('honours-guide')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'honours-guide'
                ? 'bg-cyan-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            CUE Official Honours Grading Scale
          </button>
        </div>
      </div>

      {/* TAB 1: CAT & EXAM SEMESTER GPA CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Course Units Table */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Enrolled Course Units (Semester Assessment)
                </h2>
                <span className="text-xs text-slate-400">
                  Standard split: CAT out of 30% + Main Written Examination out of 70%
                </span>
              </div>
              <button
                onClick={handleAddUnit}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Unit
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono bg-slate-950/60">
                    <th className="py-2.5 px-3">Unit Code &amp; Title</th>
                    <th className="py-2.5 px-2 text-center">Credits</th>
                    <th className="py-2.5 px-2 text-center">CAT (/30)</th>
                    <th className="py-2.5 px-2 text-center">Exam (/70)</th>
                    <th className="py-2.5 px-2 text-center">Total (/100)</th>
                    <th className="py-2.5 px-2 text-center">Grade</th>
                    <th className="py-2.5 px-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {units.map((u) => {
                    const totalScore = Math.min(100, Math.max(0, u.catScore + u.examScore));
                    const grade = getGradeDetails(totalScore);

                    return (
                      <tr key={u.id} className="hover:bg-slate-950/40">
                        <td className="py-2.5 px-3">
                          <input
                            type="text"
                            value={u.code}
                            onChange={(e) => handleUpdateUnit(u.id, 'code', e.target.value)}
                            className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white font-bold mr-2 text-xs"
                          />
                          <input
                            type="text"
                            value={u.title}
                            onChange={(e) => handleUpdateUnit(u.id, 'title', e.target.value)}
                            className="bg-transparent text-slate-300 text-xs focus:bg-slate-950 focus:border focus:border-slate-700 rounded px-1"
                          />
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <select
                            value={u.creditUnits}
                            onChange={(e) => handleUpdateUnit(u.id, 'creditUnits', Number(e.target.value))}
                            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </select>
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="30"
                            value={u.catScore}
                            onChange={(e) => handleUpdateUnit(u.id, 'catScore', Number(e.target.value))}
                            className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-cyan-400 font-bold text-center text-xs"
                          />
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="70"
                            value={u.examScore}
                            onChange={(e) => handleUpdateUnit(u.id, 'examScore', Number(e.target.value))}
                            className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-emerald-400 font-bold text-center text-xs"
                          />
                        </td>
                        <td className="py-2.5 px-2 text-center font-bold text-white text-xs">
                          {totalScore}%
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold border ${grade.color}`}
                          >
                            {grade.letter} ({grade.points.toFixed(1)})
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <button
                            onClick={() => handleRemoveUnit(u.id)}
                            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded"
                            title="Remove unit"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Classification & Dean's List Assessment */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
              <span className="text-xs font-mono uppercase text-cyan-400">Semester Classification</span>

              <div className={`p-4 rounded-xl border ${currentClassification.color} space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold">
                    {currentClassification.badge}
                  </span>
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-white leading-tight">
                  {currentClassification.title}
                </h3>
              </div>

              {/* Dean's List Honor Roll */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-white">
                  {parseFloat(semesterGpa) >= 3.7 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-500" />
                  )}
                  Dean’s List Honor Roll Eligibility
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {parseFloat(semesterGpa) >= 3.7
                    ? 'Qualified: Semester GPA is ≥ 3.70 with no failed courses. Eligible for Vice-Chancellor and Dean’s Commendation.'
                    : 'Requires minimum 3.70 semester GPA (Grade A average) with at least 15 credit units.'}
                </p>
              </div>

              {/* Quality Points Details */}
              <div className="space-y-2 text-xs font-mono text-slate-300 border-t border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span>Total Enrolled Credits:</span>
                  <strong className="text-white">{totalCredits} Units</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Quality Points:</span>
                  <strong className="text-cyan-400">{totalQualityPoints.toFixed(1)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Cumulative Weighted Avg (CWA):</span>
                  <strong className="text-emerald-400">{averagePercentage}%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HONOURS GRADUATION TARGET PREDICTOR */}
      {activeTab === 'target' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 max-w-4xl mx-auto">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400">Degree Progression Forecast</span>
            <h2 className="text-xl font-bold text-white mt-1">Target Honours Degree Graduation Predictor</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              "What GPA do I need to maintain over my remaining university semesters to graduate with Second Class Upper (3.00+) or First Class Honours (3.70+)?"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* User Input Form */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Current Cumulative GPA (CGPA):
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1.0"
                    max="4.0"
                    step="0.05"
                    value={currentCgpa}
                    onChange={(e) => setCurrentCgpa(parseFloat(e.target.value))}
                    className="flex-1 accent-cyan-500"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={currentCgpa}
                    onChange={(e) => setCurrentCgpa(parseFloat(e.target.value))}
                    className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center font-mono font-bold text-cyan-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Completed Academic Credits to Date:
                </label>
                <input
                  type="number"
                  value={completedCredits}
                  onChange={(e) => setCompletedCredits(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs"
                />
                <span className="text-[10px] text-slate-400">Typically 30-36 credits per academic year.</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Remaining Credits until Graduation:
                </label>
                <input
                  type="number"
                  value={remainingCredits}
                  onChange={(e) => setRemainingCredits(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Desired Graduation Honours Class:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTargetGraduationHonours('upper')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                      targetGraduationHonours === 'upper'
                        ? 'bg-cyan-600 border-cyan-500 text-white shadow'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Second Class Upper (3.00+)
                  </button>
                  <button
                    onClick={() => setTargetGraduationHonours('first')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                      targetGraduationHonours === 'first'
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    First Class (3.70+)
                  </button>
                </div>
              </div>
            </div>

            {/* Target Output Card */}
            <div className="flex flex-col justify-between p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">Required Future Performance</span>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-black font-mono ${isTargetAchievable ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {requiredFutureGpa}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/ 4.00 Required GPA</span>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                  isTargetAchievable
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-800 text-rose-200'
                }`}
              >
                {isTargetAchievable ? (
                  <>
                    <strong className="block font-bold mb-1">Mathematically Achievable:</strong>
                    Maintaining a minimum average semester GPA of <strong>{requiredFutureGpa}</strong> (approximately {requiredFutureGpaRaw >= 3.5 ? 'Grade A / B+' : 'Grade B'} average) across your remaining {remainingCredits} credits will grant you your target honours classification at graduation.
                  </>
                ) : (
                  <>
                    <strong className="block font-bold mb-1">Beyond Mathematical Maximum (&gt; 4.00):</strong>
                    Even with straight Grade A (4.00) in all remaining {remainingCredits} credits, your final cumulative GPA would be capped at{' '}
                    <strong>{((currentCgpa * completedCredits + 4.0 * remainingCredits) / totalTargetCredits).toFixed(2)}</strong>.
                  </>
                )}
              </div>

              <div className="text-[11px] text-slate-400 font-mono border-t border-slate-800 pt-2">
                Total Degree Program Scope: {totalTargetCredits} Credit Units
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUE OFFICIAL HONOURS GRADING SCALE */}
      {activeTab === 'honours-guide' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400">Regulatory Framework</span>
            <h2 className="text-xl font-bold text-white mt-1">CUE National Undergraduate Degree Classification</h2>
            <p className="text-xs text-slate-400 mt-1">
              Standardized classification utilized by public and chartered private universities in Kenya (UoN, KU, JKUAT, Moi, Strathmore, Egerton).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800 space-y-2">
              <div className="text-emerald-400 font-bold text-sm">First Class Honours</div>
              <div className="text-xs font-mono text-slate-300">GPA 3.70 – 4.00 · CWA ≥ 70%</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Represents exceptional academic rigor. Automatically qualifies for fully-funded Commonwealth, DAAD, and Chevening Master's scholarships.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-800 space-y-2">
              <div className="text-cyan-400 font-bold text-sm">Second Class (Upper Division)</div>
              <div className="text-xs font-mono text-slate-300">GPA 3.00 – 3.69 · CWA 60% – 69%</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Standard competitive benchmark for direct postgraduate admissions, management trainee programs, and professional licensure.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-yellow-800 space-y-2">
              <div className="text-yellow-400 font-bold text-sm">Second Class (Lower Division)</div>
              <div className="text-xs font-mono text-slate-300">GPA 2.00 – 2.99 · CWA 50% – 59%</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Full recognized degree qualification. Graduate programs may require 2 years of relevant professional experience.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-rose-800 space-y-2">
              <div className="text-rose-400 font-bold text-sm">Pass Degree</div>
              <div className="text-xs font-mono text-slate-300">GPA 1.00 – 1.99 · CWA 40% – 49%</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Minimum graduation threshold. Courses scored below 40% require a supplementary examination or retake.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
