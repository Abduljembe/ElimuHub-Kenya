import React, { useState } from 'react';
import {
  DollarSign,
  GraduationCap,
  Calculator,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  TrendingDown,
  Building,
  Award,
  FileText
} from 'lucide-react';
import { HEF_BANDS, UNIVERSITY_PROGRAM_COSTS, HEF_APPEALS_GUIDELINES, UniversityProgramCost } from '../data/hefLoanData';

export function HefLoanCalculator() {
  const [selectedProgramCode, setSelectedProgramCode] = useState<string>('MBCHB');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(18000);
  const [parentStatus, setParentStatus] = useState<'both' | 'single' | 'orphan'>('single');
  const [schoolType, setSchoolType] = useState<'day_subcounty' | 'county_boarding' | 'national' | 'private'>('day_subcounty');
  const [familyDependents, setFamilyDependents] = useState<number>(4);
  const [hasDisability, setHasDisability] = useState<boolean>(false);
  const [manualBandOverride, setManualBandOverride] = useState<number | null>(null);

  // Active Program
  const selectedProgram: UniversityProgramCost =
    UNIVERSITY_PROGRAM_COSTS.find((p) => p.code === selectedProgramCode) || UNIVERSITY_PROGRAM_COSTS[0];

  // Means Testing Instrument (MTI) score simulation to predict band
  const calculatePredictedBand = (): number => {
    if (manualBandOverride !== null) return manualBandOverride;
    if (hasDisability || (parentStatus === 'orphan' && monthlyIncome <= 8000)) {
      return 1;
    }
    if (monthlyIncome <= 5995) return 1;
    if (monthlyIncome <= 23670) {
      if (familyDependents >= 4 && (schoolType === 'day_subcounty' || parentStatus === 'single')) {
        return 1;
      }
      return 2;
    }
    if (monthlyIncome <= 70000) {
      if (familyDependents >= 5) return 2;
      return 3;
    }
    if (monthlyIncome <= 120000) return 4;
    return 5;
  };

  const predictedBandNumber = calculatePredictedBand();
  const assignedBand = HEF_BANDS.find((b) => b.band === predictedBandNumber) || HEF_BANDS[0];

  // Financial Computations
  const annualTotalCost = selectedProgram.annualProgramCostKsh;
  const semesterTotalCost = Math.round(annualTotalCost / 2);

  const scholarshipAmountAnnual = Math.round((annualTotalCost * assignedBand.scholarshipPercent) / 100);
  const scholarshipAmountSemester = Math.round(scholarshipAmountAnnual / 2);

  const loanAmountAnnual = Math.round((annualTotalCost * assignedBand.loanPercent) / 100);
  const loanAmountSemester = Math.round(loanAmountAnnual / 2);

  const householdAmountAnnual = Math.round((annualTotalCost * assignedBand.householdPercent) / 100);
  const householdAmountSemester = Math.round(householdAmountAnnual / 2);

  // Upkeep Loan is sent directly to student account for living expenses
  const annualUpkeep = assignedBand.upkeepLoanAnnualKsh;
  const semesterUpkeep = Math.round(annualUpkeep / 2);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-400/30">
              <DollarSign className="w-3.5 h-3.5" />
              HEF & HELB Funding Model (2024–2026)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Higher Education Funding (HEF) Band & Tuition Loan Calculator
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Estimate your exact University Scholarship (Government Grant), HELB Tuition Loan, Student Living Upkeep,
              and semester household out-of-pocket contribution under Kenya&apos;s Means Testing Instrument (MTI).
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center shrink-0 min-w-[200px]">
            <div className="text-xs text-emerald-200 uppercase font-semibold">Predicted HEF Band</div>
            <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-1">Band {assignedBand.band}</div>
            <div className="text-xs text-white/90 font-medium mt-0.5">{assignedBand.classification}</div>
            <div className="mt-2 text-[11px] text-emerald-200 bg-emerald-950/60 py-1 px-2 rounded font-mono">
              Govt: {assignedBand.scholarshipPercent}% | Loan: {assignedBand.loanPercent}% | Home: {assignedBand.householdPercent}%
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameters on Left, Output Breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Assessment Parameters */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-bold border-b border-slate-100 dark:border-slate-700 pb-3">
              <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Means Testing Instrument (MTI) Inputs</span>
            </div>

            {/* University Program Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Degree Programme (CUE Approved DUC)
              </label>
              <select
                value={selectedProgramCode}
                onChange={(e) => setSelectedProgramCode(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500"
              >
                {UNIVERSITY_PROGRAM_COSTS.map((prog) => (
                  <option key={prog.code} value={prog.code}>
                    {prog.name} (KSh {prog.annualProgramCostKsh.toLocaleString()}/yr)
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-1">
                Category: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedProgram.category}</span> ({selectedProgram.durationYears} Years)
              </p>
            </div>

            {/* Household Monthly Income */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>ESTIMATED HOUSEHOLD MONTHLY INCOME</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">
                  KSh {monthlyIncome.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="150000"
                step="2500"
                value={monthlyIncome}
                onChange={(e) => {
                  setMonthlyIncome(Number(e.target.value));
                  setManualBandOverride(null);
                }}
                className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>KSh 0</span>
                <span>KSh 23,670</span>
                <span>KSh 70,000</span>
                <span>KSh 120,000+</span>
              </div>
            </div>

            {/* Parental Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Parental Background
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'both', label: 'Both Parents' },
                  { id: 'single', label: 'Single Parent' },
                  { id: 'orphan', label: 'Orphan / Guardian' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setParentStatus(item.id as any);
                      setManualBandOverride(null);
                    }}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                      parentStatus === item.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary School Attended */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Secondary School Type Attended
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'day_subcounty', label: 'Sub-County Day' },
                  { id: 'county_boarding', label: 'County Boarding' },
                  { id: 'national', label: 'National School' },
                  { id: 'private', label: 'Private Academy' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSchoolType(item.id as any);
                      setManualBandOverride(null);
                    }}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      schoolType === item.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dependents & Special Circumstances */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  School-Age Siblings
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={familyDependents}
                  onChange={(e) => {
                    setFamilyDependents(Number(e.target.value));
                    setManualBandOverride(null);
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-sm text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 pb-2">
                  <input
                    type="checkbox"
                    checked={hasDisability}
                    onChange={(e) => {
                      setHasDisability(e.target.checked);
                      setManualBandOverride(null);
                    }}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>Registered PWD / Severe Chronic Illness</span>
                </label>
              </div>
            </div>

            {/* Quick Band Manual Selector */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
              <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Simulate Known Band Directly:
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((b) => (
                  <button
                    key={b}
                    onClick={() => setManualBandOverride(b)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border ${
                      assignedBand.band === b
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Band {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Breakdown & Disbursements */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-4 shadow-sm">
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Govt Scholarship Grant</div>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
                {assignedBand.scholarshipPercent}%
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                KSh {scholarshipAmountSemester.toLocaleString()} / sem
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Free non-repayable grant</div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-4 shadow-sm">
              <div className="text-xs font-semibold text-blue-800 dark:text-blue-300">HELB Tuition Loan</div>
              <div className="text-2xl font-black text-blue-700 dark:text-blue-400 mt-1">
                {assignedBand.loanPercent}%
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                KSh {loanAmountSemester.toLocaleString()} / sem
              </div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Paid direct to university</div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4 shadow-sm">
              <div className="text-xs font-semibold text-amber-800 dark:text-amber-300">Family Out-Of-Pocket</div>
              <div className="text-2xl font-black text-amber-700 dark:text-amber-400 mt-1">
                {assignedBand.householdPercent}%
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-bold">
                KSh {householdAmountSemester.toLocaleString()} / sem
              </div>
              <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">Payable at admission</div>
            </div>
          </div>

          {/* Upkeep Loan Feature Card */}
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-2xl p-5 shadow-md flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-300" />
                Student Direct Upkeep Loan (Meals, Books & Rent)
              </div>
              <div className="text-lg font-bold">
                KSh {assignedBand.upkeepLoanAnnualKsh.toLocaleString()}{' '}
                <span className="text-xs text-indigo-200 font-normal">per academic year</span>
              </div>
              <div className="text-xs text-indigo-200">
                Disbursed in 2 equal semester tranches (KSh {semesterUpkeep.toLocaleString()} per semester) directly to
                the student&apos;s commercial bank account or Safaricom M-Pesa.
              </div>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center shrink-0 border border-white/20">
              <div className="text-xs text-indigo-200">Per Semester</div>
              <div className="text-xl font-black text-amber-300">KSh {semesterUpkeep.toLocaleString()}</div>
            </div>
          </div>

          {/* Full Fee Ledger Table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Comprehensive Financial Statement for {selectedProgram.code}
                </h3>
                <p className="text-xs text-slate-500">Official Differentiated Unit Cost: KSh {annualTotalCost.toLocaleString()} per year</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Band {assignedBand.band} Allocation
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Fee Component</th>
                    <th className="p-3 text-center">Share (%)</th>
                    <th className="p-3 text-right">Per Semester (KSh)</th>
                    <th className="p-3 text-right">Per Academic Year (KSh)</th>
                    <th className="p-3">Disbursement Destination</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                      Government Scholarship (Universities Fund)
                    </td>
                    <td className="p-3 text-center font-bold text-emerald-600">{assignedBand.scholarshipPercent}%</td>
                    <td className="p-3 text-right font-mono">{scholarshipAmountSemester.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-600">
                      {scholarshipAmountAnnual.toLocaleString()}
                    </td>
                    <td className="p-3 text-slate-500">Credited to University</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                      HELB Student Tuition Loan
                    </td>
                    <td className="p-3 text-center font-bold text-blue-600">{assignedBand.loanPercent}%</td>
                    <td className="p-3 text-right font-mono">{loanAmountSemester.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono font-bold text-blue-600">
                      {loanAmountAnnual.toLocaleString()}
                    </td>
                    <td className="p-3 text-slate-500">Credited to University</td>
                  </tr>
                  <tr className="bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-50 dark:hover:bg-amber-950/30 font-semibold">
                    <td className="p-3 text-amber-900 dark:text-amber-300">
                      Parent / Guardian Out-of-Pocket Contribution
                    </td>
                    <td className="p-3 text-center font-bold text-amber-700">{assignedBand.householdPercent}%</td>
                    <td className="p-3 text-right font-mono text-amber-700 font-bold">
                      {householdAmountSemester.toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-mono font-black text-amber-800 dark:text-amber-200">
                      {householdAmountAnnual.toLocaleString()}
                    </td>
                    <td className="p-3 text-amber-700 dark:text-amber-400">Paid directly before exam sitting</td>
                  </tr>
                  <tr className="bg-indigo-50/40 dark:bg-indigo-950/20 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 font-medium">
                    <td className="p-3 text-indigo-900 dark:text-indigo-300">
                      Student Upkeep Living Allowance (HELB Loan)
                    </td>
                    <td className="p-3 text-center text-indigo-600">Stipend</td>
                    <td className="p-3 text-right font-mono text-indigo-700 font-bold">
                      {semesterUpkeep.toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-mono font-black text-indigo-800 dark:text-indigo-200">
                      {annualUpkeep.toLocaleString()}
                    </td>
                    <td className="p-3 text-indigo-700 dark:text-indigo-400">Paid to Student Bank/M-Pesa</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Appeals Guidance Card */}
          <div className="bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-bold text-sm">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Dissatisfied with your Assigned Band? Official Appeal Process</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {HEF_APPEALS_GUIDELINES.map((guide) => (
                <div
                  key={guide.step}
                  className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1"
                >
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">
                    Step {guide.step}: {guide.title}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{guide.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
