import React, { useState } from 'react';
import {
  Stethoscope,
  Wrench,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Search,
  Building2,
  DollarSign,
  Compass,
  ArrowRight,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

interface CourseEntry {
  id: string;
  institutionType: 'kmtc' | 'polytechnic';
  institutionName: string;
  courseTitle: string;
  level: 'Diploma' | 'Certificate' | 'Artisan';
  durationYears: number;
  minMeanGrade: string; // e.g. "C", "C-", "D+"
  requiredSubjects: Array<{ subject: string; minGrade: string }>;
  annualFeeGok: number; // KSh
  annualFeeSelf: number; // KSh
  careerOutcome: string;
}

export const TVETAdmissionsPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kmtc' | 'tvet' | 'checker' | 'funding'>('kmtc');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Interactive Eligibility Checker Inputs
  const [userMeanGrade, setUserMeanGrade] = useState<string>('C');
  const [userBio, setUserBio] = useState<string>('C');
  const [userChem, setUserChem] = useState<string>('C-');
  const [userMathPhys, setUserMathPhys] = useState<string>('C');
  const [userEngKisw, setUserEngKisw] = useState<string>('C');

  // Grade weight ranking helper
  const gradeRank: Record<string, number> = {
    'A': 12, 'A-': 11, 'B+': 10, 'B': 9, 'B-': 8,
    'C+': 7, 'C': 6, 'C-': 5, 'D+': 4, 'D': 3,
    'D-': 2, 'E': 1
  };

  const courses: CourseEntry[] = [
    {
      id: 'kmtc-clin-med',
      institutionType: 'kmtc',
      institutionName: 'Kenya Medical Training College (KMTC)',
      courseTitle: 'Diploma in Clinical Medicine and Surgery',
      level: 'Diploma',
      durationYears: 3,
      minMeanGrade: 'C',
      requiredSubjects: [
        { subject: 'Biology', minGrade: 'C' },
        { subject: 'English or Kiswahili', minGrade: 'C' },
        { subject: 'Chemistry', minGrade: 'C-' },
        { subject: 'Mathematics or Physics', minGrade: 'C-' }
      ],
      annualFeeGok: 80700,
      annualFeeSelf: 120700,
      careerOutcome: 'Registered Clinical Officer (RCO) licensed by the Clinical Officers Council (COC).'
    },
    {
      id: 'kmtc-krchn',
      institutionType: 'kmtc',
      institutionName: 'Kenya Medical Training College (KMTC)',
      courseTitle: 'Diploma in Kenya Registered Community Health Nursing (KRCHN)',
      level: 'Diploma',
      durationYears: 3,
      minMeanGrade: 'C',
      requiredSubjects: [
        { subject: 'Biology', minGrade: 'C' },
        { subject: 'English or Kiswahili', minGrade: 'C' },
        { subject: 'Chemistry, Physics or Maths', minGrade: 'C-' }
      ],
      annualFeeGok: 80700,
      annualFeeSelf: 120700,
      careerOutcome: 'Registered Nurse (NCK Licensure) across County Referral Hospitals and international healthcare.'
    },
    {
      id: 'kmtc-pharm',
      institutionType: 'kmtc',
      institutionName: 'Kenya Medical Training College (KMTC)',
      courseTitle: 'Diploma in Pharmacy',
      level: 'Diploma',
      durationYears: 3,
      minMeanGrade: 'C',
      requiredSubjects: [
        { subject: 'Biology', minGrade: 'C' },
        { subject: 'Chemistry', minGrade: 'C' },
        { subject: 'English or Kiswahili', minGrade: 'C' },
        { subject: 'Mathematics or Physics', minGrade: 'C' }
      ],
      annualFeeGok: 80700,
      annualFeeSelf: 120700,
      careerOutcome: 'Pharmaceutical Technologist registered by the Pharmacy and Poisons Board (PPB).'
    },
    {
      id: 'kmtc-mls',
      institutionType: 'kmtc',
      institutionName: 'Kenya Medical Training College (KMTC)',
      courseTitle: 'Diploma in Medical Laboratory Sciences',
      level: 'Diploma',
      durationYears: 3,
      minMeanGrade: 'C',
      requiredSubjects: [
        { subject: 'Biology', minGrade: 'C' },
        { subject: 'Chemistry', minGrade: 'C' },
        { subject: 'English or Kiswahili', minGrade: 'C' },
        { subject: 'Mathematics or Physics', minGrade: 'C' }
      ],
      annualFeeGok: 80700,
      annualFeeSelf: 120700,
      careerOutcome: 'Medical Laboratory Technologist certified by KMLTTB.'
    },
    {
      id: 'kmtc-ortho',
      institutionType: 'kmtc',
      institutionName: 'Kenya Medical Training College (KMTC)',
      courseTitle: 'Diploma in Orthopaedic and Trauma Medicine',
      level: 'Diploma',
      durationYears: 3,
      minMeanGrade: 'C',
      requiredSubjects: [
        { subject: 'Biology', minGrade: 'C' },
        { subject: 'English or Kiswahili', minGrade: 'C' },
        { subject: 'Mathematics, Physics or Chemistry', minGrade: 'C-' }
      ],
      annualFeeGok: 80700,
      annualFeeSelf: 120700,
      careerOutcome: 'Orthopaedic Technologist managing bone fractures, casts, traction, and trauma theaters.'
    },
    {
      id: 'kmtc-hrit',
      institutionType: 'kmtc',
      institutionName: 'Kenya Medical Training College (KMTC)',
      courseTitle: 'Certificate in Health Records and Information Technology',
      level: 'Certificate',
      durationYears: 2,
      minMeanGrade: 'C-',
      requiredSubjects: [
        { subject: 'English or Kiswahili', minGrade: 'C-' },
        { subject: 'Biology', minGrade: 'D+' },
        { subject: 'Mathematics', minGrade: 'D+' }
      ],
      annualFeeGok: 67200,
      annualFeeSelf: 95000,
      careerOutcome: 'Health Information Officer managing electronic medical records, ICD-11 coding, and NHIF/SHIF claims.'
    },
    // National Polytechnics
    {
      id: 'poly-elec',
      institutionType: 'polytechnic',
      institutionName: 'The Kabete National Polytechnic & Eldoret Poly',
      courseTitle: 'Diploma in Electrical & Electronic Engineering (Power Option)',
      level: 'Diploma',
      durationYears: 3,
      minMeanGrade: 'C-',
      requiredSubjects: [
        { subject: 'Mathematics', minGrade: 'C-' },
        { subject: 'Physics', minGrade: 'C-' },
        { subject: 'English or Kiswahili', minGrade: 'D+' }
      ],
      annualFeeGok: 56420,
      annualFeeSelf: 72000,
      careerOutcome: 'Electrical Engineer registered by EBK / EPRA for high-voltage power installations and solar EPC.'
    },
    {
      id: 'poly-civil',
      institutionType: 'polytechnic',
      institutionName: 'Kenya Coast National Polytechnic (Mombasa)',
      courseTitle: 'Diploma in Civil & Structural Engineering',
      level: 'Diploma',
      durationYears: 3,
      minMeanGrade: 'C-',
      requiredSubjects: [
        { subject: 'Mathematics', minGrade: 'C-' },
        { subject: 'Physics', minGrade: 'C-' },
        { subject: 'English', minGrade: 'D+' }
      ],
      annualFeeGok: 56420,
      annualFeeSelf: 72000,
      careerOutcome: 'Site Structural Supervisor, concrete testing analyst, and highway drainage technologist.'
    },
    {
      id: 'poly-auto',
      institutionType: 'polytechnic',
      institutionName: 'Kisumu National Polytechnic',
      courseTitle: 'Diploma in Automotive Engineering',
      level: 'Diploma',
      durationYears: 3,
      minMeanGrade: 'C-',
      requiredSubjects: [
        { subject: 'Mathematics', minGrade: 'C-' },
        { subject: 'Physics or Chemistry', minGrade: 'C-' }
      ],
      annualFeeGok: 56420,
      annualFeeSelf: 72000,
      careerOutcome: 'Vehicle Diagnostic Engineer, fleet manager, and heavy machinery technician.'
    },
    {
      id: 'poly-ict',
      institutionType: 'polytechnic',
      institutionName: 'Nyeri National Polytechnic',
      courseTitle: 'Diploma in Information Communication Technology (DICT)',
      level: 'Diploma',
      durationYears: 3,
      minMeanGrade: 'C-',
      requiredSubjects: [
        { subject: 'Mathematics', minGrade: 'D+' },
        { subject: 'English or Kiswahili', minGrade: 'C-' }
      ],
      annualFeeGok: 56420,
      annualFeeSelf: 72000,
      careerOutcome: 'Network Administrator, systems technician, and database support specialist.'
    }
  ];

  // Checker evaluation
  const checkEligibility = (course: CourseEntry) => {
    // Mean grade test
    if (gradeRank[userMeanGrade] < gradeRank[course.minMeanGrade]) return false;

    // Subject test
    for (const req of course.requiredSubjects) {
      if (req.subject.includes('Biology')) {
        if (gradeRank[userBio] < gradeRank[req.minGrade]) return false;
      }
      if (req.subject.includes('Chemistry')) {
        if (gradeRank[userChem] < gradeRank[req.minGrade]) return false;
      }
      if (req.subject.includes('English')) {
        if (gradeRank[userEngKisw] < gradeRank[req.minGrade]) return false;
      }
      if (req.subject.includes('Mathematics') || req.subject.includes('Physics')) {
        if (gradeRank[userMathPhys] < gradeRank[req.minGrade]) return false;
      }
    }
    return true;
  };

  const filteredCourses = courses.filter((c) => {
    if (activeTab === 'kmtc' && c.institutionType !== 'kmtc') return false;
    if (activeTab === 'tvet' && c.institutionType !== 'polytechnic') return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        c.courseTitle.toLowerCase().includes(q) ||
        c.institutionName.toLowerCase().includes(q) ||
        c.careerOutcome.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider mb-1">
              <span>KUCCPS TVET Placement &amp; Direct KMTC Portal</span>
              <span>·</span>
              <span>72+ KMTC Campuses &amp; 14 National Polytechnics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              KMTC &amp; TVET National Polytechnic Admissions
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Explore medical and engineering diplomas, minimum cluster requirements, Government capitation grants (KSh 30,000 p.a.), and check your instant eligibility for Clinical Medicine, Nursing, Pharmacy, and Engineering.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono shrink-0">
            <div>
              <span className="text-slate-400 block text-[10px]">GoK TVET Capitation</span>
              <strong className="text-emerald-400 text-base">KSh 30,000 / Year</strong>
            </div>
            <div className="border-l border-slate-800 pl-3">
              <span className="text-slate-400 block text-[10px]">HELB TVET Loan</span>
              <strong className="text-cyan-400 text-base">Up to KSh 40,000</strong>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 border-t border-slate-800/80 pt-4 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('kmtc')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'kmtc'
                ? 'bg-rose-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            KMTC Medical Diplomas (Clinical Med, Nursing, Pharmacy)
          </button>
          <button
            onClick={() => setActiveTab('tvet')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'tvet'
                ? 'bg-rose-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
            National Polytechnics (Engineering &amp; Applied Sciences)
          </button>
          <button
            onClick={() => setActiveTab('checker')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'checker'
                ? 'bg-rose-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Instant KCSE Qualification Checker
          </button>
          <button
            onClick={() => setActiveTab('funding')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'funding'
                ? 'bg-rose-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Government Capitation &amp; HELB TVET Loans
          </button>
        </div>
      </div>

      {/* TABS 1 & 2: KMTC & TVET CATALOG */}
      {(activeTab === 'kmtc' || activeTab === 'tvet') && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'kmtc' ? 'KMTC medical diplomas' : 'Polytechnic engineering diplomas'} by title, career, or subject...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono border-b border-slate-800 pb-2">
                    <span className="text-rose-400 font-bold">{course.institutionName}</span>
                    <span className="text-slate-400">{course.durationYears} Years · {course.level}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-3">{course.courseTitle}</h3>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-[11px]">Minimum KCSE Mean Grade:</span>
                      <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-700 text-rose-300 font-bold font-mono">
                        {course.minMeanGrade} (Plain)
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-300">
                      <strong className="text-slate-400 block font-mono mb-1">Subject Cluster Minimums:</strong>
                      <div className="flex flex-wrap gap-1.5">
                        {course.requiredSubjects.map((sub, i) => (
                          <span
                            key={i}
                            className="bg-slate-950 border border-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono text-[10px]"
                          >
                            {sub.subject}: <strong className="text-emerald-400">{sub.minGrade}</strong>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-300">
                      <span className="text-slate-400 font-semibold">Career Outcome: </span>
                      {course.careerOutcome}
                    </div>
                  </div>
                </div>

                {/* Tuition Cost Breakdown */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">GoK Sponsored:</span>
                    <strong className="text-emerald-400">KSh {course.annualFeeGok.toLocaleString()}/yr</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Self-Sponsored:</span>
                    <span className="text-slate-300">KSh {course.annualFeeSelf.toLocaleString()}/yr</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INSTANT QUALIFICATION CHECKER */}
      {activeTab === 'checker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* User Grade Input Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div>
              <span className="text-xs font-mono uppercase text-rose-400">Instant Admissions Evaluator</span>
              <h2 className="text-base font-bold text-white mt-1">Enter Your KCSE Candidate Grades</h2>
              <p className="text-xs text-slate-400 mt-1">
                Our eligibility engine matches your grades against official KUCCPS and KMTC minimum cluster requirements.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  KCSE Overall Mean Grade:
                </label>
                <select
                  value={userMeanGrade}
                  onChange={(e) => setUserMeanGrade(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono font-bold text-xs"
                >
                  {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-'].map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Biology:</label>
                  <select
                    value={userBio}
                    onChange={(e) => setUserBio(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs"
                  >
                    {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-'].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Chemistry:</label>
                  <select
                    value={userChem}
                    onChange={(e) => setUserChem(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs"
                  >
                    {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-'].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Maths / Physics:</label>
                  <select
                    value={userMathPhys}
                    onChange={(e) => setUserMathPhys(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs"
                  >
                    {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-'].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">English / Kiswahili:</label>
                  <select
                    value={userEngKisw}
                    onChange={(e) => setUserEngKisw(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs"
                  >
                    {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-'].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Qualified Courses Display */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Matching Qualified Programs
              </h3>
              <span className="text-xs font-mono bg-emerald-950 border border-emerald-700 text-emerald-300 px-2 py-0.5 rounded">
                {courses.filter(checkEligibility).length} Courses Eligible
              </span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {courses.filter(checkEligibility).map((course) => (
                <div
                  key={course.id}
                  className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-emerald-400 font-bold font-mono">
                        {course.institutionType === 'kmtc' ? 'KMTC Medical' : 'National Polytechnic'}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400">{course.level} ({course.durationYears} yrs)</span>
                    </div>
                    <h4 className="text-white font-bold">{course.courseTitle}</h4>
                    <p className="text-[11px] text-slate-400 mt-1">{course.careerOutcome}</p>
                  </div>
                  <div className="shrink-0 text-right font-mono">
                    <span className="text-[10px] text-slate-400 block">Annual GoK:</span>
                    <strong className="text-emerald-400">KSh {course.annualFeeGok.toLocaleString()}</strong>
                  </div>
                </div>
              ))}

              {courses.filter(checkEligibility).length === 0 && (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No direct diploma match found for this grade configuration. Try exploring Certificate or Artisan pathways.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TVET FUNDING & HELB LOANS */}
      {activeTab === 'funding' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-rose-400">Financial Aid</span>
            <h2 className="text-xl font-bold text-white mt-1">Government TVET Funding Model &amp; HELB Loans</h2>
            <p className="text-xs text-slate-400 mt-1">
              Every Kenyan student admitted to a public National Polytechnic or Technical Institute through KUCCPS is entitled to Government Capitation and HELB loan support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold text-sm block">1. Government Capitation Grant</span>
              <div className="text-xl font-black text-white font-mono">KSh 30,000 / Year</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Disbursed directly by the State Department for Vocational &amp; Technical Training to the institution to subsidize tuition costs.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold text-sm block">2. HELB TVET Tuition Loan</span>
              <div className="text-xl font-black text-white font-mono">Up to KSh 26,400 / Year</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Paid directly to the college to cover the remaining balance of the annual fee, leaving the student with minimal or zero out-of-pocket tuition burden.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold text-sm block">3. HELB Student Upkeep Loan</span>
              <div className="text-xl font-black text-white font-mono">Up to KSh 13,600 / Year</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Deposited directly to the student's personal bank account or mobile wallet for food, accommodation, stationery, and daily living expenses.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
