import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Award,
  Printer,
  Copy,
  ChevronRight,
  BookOpen,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

interface PastPaperItem {
  id: string;
  year: number;
  subject: string;
  code: string;
  paperName: string;
  duration: string;
  totalMarks: number;
  sections: {
    sectionName: string;
    instructions: string;
    questions: {
      qNum: string;
      questionText: string;
      marks: number;
      markingScheme: string[];
      examinerReport: string;
    }[];
  }[];
}

const KCSE_PAST_PAPERS_DATABASE: PastPaperItem[] = [
  // 2024 KCSE Mathematics Alt A Paper 1 (121/1)
  {
    id: 'kcse-2024-math-p1',
    year: 2024,
    subject: 'Mathematics Alternative A',
    code: '121/1',
    paperName: 'Paper 1 (Core Pure Mathematics)',
    duration: '2 Hours 30 Minutes',
    totalMarks: 100,
    sections: [
      {
        sectionName: 'SECTION I (50 Marks) - Answer ALL questions',
        instructions: 'Show all steps in calculations. Silent non-programmable electronic calculators may be used.',
        questions: [
          {
            qNum: 'Question 1',
            questionText: 'Without using a calculator or mathematical tables, evaluate: (-8 ÷ 2 + 12 × -2 - (-15)) / (-3 × 4 ÷ 2 + 5)',
            marks: 3,
            markingScheme: [
              'Numerator: (-4 - 24 + 15) = -13 ($M_1$ for correct order of operations BODMAS)',
              'Denominator: (-12 ÷ 2 + 5) = -6 + 5 = -1 ($M_1$ for denominator)',
              'Final Answer: -13 / -1 = 13 ($A_1$)'
            ],
            examinerReport: 'Many candidates failed to observe BODMAS rules, doing addition before multiplication in the numerator. Double negative sign rules (-(-15) = +15) were frequently violated.'
          },
          {
            qNum: 'Question 2',
            questionText: 'Simplify the expression: (4x² - 9y²) / (2x² - xy - 3y²)',
            marks: 3,
            markingScheme: [
              'Numerator: (2x - 3y)(2x + 3y) ($M_1$ difference of two squares)',
              'Denominator: 2x² - 3xy + 2xy - 3y² = x(2x - 3y) + y(2x - 3y) = (2x - 3y)(x + y) ($M_1$)',
              'Cancel common factor (2x - 3y): Result = (2x + 3y) / (x + y) ($A_1$)'
            ],
            examinerReport: 'Candidates could factor the numerator easily but struggled to factorize the quadratic trinomial in the denominator.'
          },
          {
            qNum: 'Question 3',
            questionText: 'A Kenyan bank buys and sells foreign currencies as follows: 1 US Dollar ($) = Buying: Ksh 129.50, Selling: Ksh 131.00; 1 Sterling Pound (£) = Buying: Ksh 164.20, Selling: Ksh 166.50. A tourist arrived in Kenya with £ 4,500 and converted all into Kenyan Shillings. While in Kenya, he spent Ksh 480,000 and converted the remainder into US Dollars. Calculate the amount of US Dollars he received.',
            marks: 4,
            markingScheme: [
              'Bank buys £ 4,500 at Buying Rate: 4500 × 164.20 = Ksh 738,900 ($M_1$)',
              'Remainder after expenditure: 738,900 - 480,000 = Ksh 258,900 ($M_1$)',
              'Bank sells US Dollars to tourist at Selling Rate: 258,900 ÷ 131.00 ($M_1$)',
              'US Dollars received: $ 1,976.34 ($A_1$ rounded to 2 decimal places)'
            ],
            examinerReport: 'Candidates inverted buying and selling rates. Remember: the BANK always transacts from its perspective to make a profit.'
          }
        ]
      },
      {
        sectionName: 'SECTION II (50 Marks) - Answer any FIVE questions',
        instructions: 'Each question carries 10 marks.',
        questions: [
          {
            qNum: 'Question 17',
            questionText: 'A particle moves along a straight line such that its velocity v m/s after t seconds is given by v = 3t² - 12t + 9. Find: (a) The initial acceleration of the particle. (b) The times t when the particle is momentarily at rest. (c) The total distance travelled in the first 4 seconds.',
            marks: 10,
            markingScheme: [
              '(a) a = dv/dt = 6t - 12. At t = 0, a = -12 m/s² ($M_1, A_1$)',
              '(b) Momentarily at rest ⇒ v = 0 ⇒ 3(t² - 4t + 3) = 0 ⇒ (t - 1)(t - 3) = 0 ⇒ t = 1s and t = 3s ($M_1, A_1$)',
              '(c) S = ∫(3t² - 12t + 9)dt = t³ - 6t² + 9t. Displacements: S(0)=0, S(1)=4m, S(3)=0m, S(4)=4m ($M_2$)',
              'Distance from 0 to 1s: 4m. From 1 to 3s: |0 - 4| = 4m. From 3 to 4s: |4 - 0| = 4m ($M_1$)',
              'Total Distance = 4 + 4 + 4 = 12 meters ($A_1$)'
            ],
            examinerReport: 'Major pitfall: Many candidates evaluated the definite integral from 0 to 4 directly which gives displacement (4m) instead of distance (12m). Turning points at t=1 and t=3 must be split into separate intervals!'
          }
        ]
      }
    ]
  },

  // 2024 KCSE Chemistry Paper 2 (233/2)
  {
    id: 'kcse-2024-chem-p2',
    year: 2024,
    subject: 'Chemistry',
    code: '233/2',
    paperName: 'Paper 2 (Theory Comprehensive)',
    duration: '2 Hours',
    totalMarks: 80,
    sections: [
      {
        sectionName: 'SECTION A - Compulsory Structured Questions',
        instructions: 'Answer all questions in the spaces provided.',
        questions: [
          {
            qNum: 'Question 1',
            questionText: 'Study the grid below representing parts of the periodic table. The letters do not represent actual chemical symbols: Elements J (Group 1 Period 2), K (Group 2 Period 3), L (Group 7 Period 2), M (Group 8 Period 3). (a) State the type of bond formed between J and L. (b) Explain why element J has a larger atomic radius than element L. (c) Write the electron configuration of the stable ion formed by element K.',
            marks: 6,
            markingScheme: [
              '(a) Ionic / Electrovalent bond ($1 mark$)',
              '(b) Across Period 2 from J to L, nuclear charge (number of protons) increases, while shielding / energy levels remain constant. This pulls electrons closer to the nucleus, making L smaller than J ($2 marks$)',
              '(c) K has atomic number 12 (2.8.2). Stable ion K²⁺ has electron configuration 2.8 ($1 mark$)'
            ],
            examinerReport: 'Candidates failed to explain that energy levels remain constant across the period when discussing effective nuclear charge pull.'
          },
          {
            qNum: 'Question 2',
            questionText: 'In the industrial contact process for the manufacture of sulfuric(VI) acid: (a) State the catalyst used and the optimum temperature. (b) Write the chemical equation for the reaction occurring in the catalytic chamber. (c) Explain why sulfur(VI) oxide gas is dissolved in concentrated H₂SO₄ rather than directly in water.',
            marks: 6,
            markingScheme: [
              '(a) Catalyst: Vanadium(V) oxide (V₂O₅) ($1 mark$); Optimum temperature: 450°C ($1 mark$)',
              '(b) 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + Heat (balanced equation with state symbols) ($1 mark$)',
              '(c) Dissolving SO₃ directly in water is violently exothermic and forms a dense acid mist of H₂SO₄ droplets which is corrosive, difficult to condense, and dangerous ($2 marks$)'
            ],
            examinerReport: 'Candidates omitted state symbols in reversible equation. Many did not specify "Vanadium(V) oxide", writing only "Vanadium" which earned zero.'
          }
        ]
      }
    ]
  },

  // 2023 KCSE Physics Paper 1 (232/1)
  {
    id: 'kcse-2023-phys-p1',
    year: 2023,
    subject: 'Physics',
    code: '232/1',
    paperName: 'Paper 1 (Mechanics, Thermodynamics & Waves)',
    duration: '2 Hours',
    totalMarks: 80,
    sections: [
      {
        sectionName: 'SECTION I (25 Marks)',
        instructions: 'Answer all questions in this section.',
        questions: [
          {
            qNum: 'Question 1',
            questionText: 'A micrometer screw gauge with zero error of -0.02 mm was used to measure the diameter of a uniform spherical ball bearing. If the main scale reading was 4.5 mm and the thimble scale read 38, find the actual diameter of the ball bearing.',
            marks: 3,
            markingScheme: [
              'Observed reading = 4.5 mm + (38 × 0.01 mm) = 4.5 + 0.38 = 4.88 mm ($1 mark$)',
              'Correct reading = Observed - (Zero error) = 4.88 - (-0.02) ($1 mark$)',
              'Actual diameter = 4.88 + 0.02 = 4.90 mm ($1 mark$)'
            ],
            examinerReport: 'Common error: Candidates subtracted the negative zero error as 4.88 - 0.02 = 4.86 mm instead of adding it.'
          },
          {
            qNum: 'Question 2',
            questionText: 'State Bernoulli’s Principle and explain why two speedboats moving parallel and close to each other in the same direction tend to collide.',
            marks: 3,
            markingScheme: [
              'Bernoulli’s Principle: For an incompressible non-viscous fluid flowing streamlines, an increase in speed results in a decrease in pressure ($1 mark$)',
              'Explanation: Water speed between the boats is higher than water speed on the outer sides. Consequently, pressure between boats drops below the higher atmospheric pressure on the outside, creating an inward net force pushing boats together ($2 marks$)'
            ],
            examinerReport: 'Candidates omitted the conditions "incompressible" and "non-viscous" for fluid flow.'
          }
        ]
      }
    ]
  },

  // 2023 KCSE English Paper 2 (101/2)
  {
    id: 'kcse-2023-eng-p2',
    year: 2023,
    subject: 'English',
    code: '101/2',
    paperName: 'Paper 2 (Comprehension, Literary Appreciation & Grammar)',
    duration: '2 Hours 30 Minutes',
    totalMarks: 80,
    sections: [
      {
        sectionName: 'Question 2: Excerpt from Compulsory Set Book',
        instructions: 'Read the excerpt from Fathers of Nations by Paul B. Vitta and answer the questions that follow.',
        questions: [
          {
            qNum: 'Question 2(a)',
            questionText: 'Place this excerpt in its immediate context within the novel.',
            marks: 4,
            markingScheme: [
              'Before: Dr. Abiola Afolabi meets Fiona McKenzie at the Sebuleni hotel lounge ($1 mark$)',
              'During: Fiona interviews Dr. Afolabi regarding the Way Omega document and the upcoming African summit ($2 marks$)',
              'After: Dr. Afolabi reveals he was recruited as an advisor for the heads of state summit ($1 mark$)'
            ],
            examinerReport: 'Candidates gave vague plot descriptions without clear before, during, and after timeline precision.'
          },
          {
            qNum: 'Question 4: Grammar',
            questionText: 'Rewrite each of the following sentences according to the instructions given after each without changing the meaning: (i) If you do not work hard, you will not pass KCSE. (Begin: Unless...) (ii) Mary said, "I will travel to Mombasa tomorrow." (Rewrite in indirect speech)',
            marks: 4,
            markingScheme: [
              '(i) Unless you work hard, you will not pass KCSE. ($1 mark$ - Note: "Unless you do not work hard" is strictly penalised)',
              '(ii) Mary said that she would travel to Mombasa the following day / the next day. ($1 mark$ - "will" changes to "would", "tomorrow" changes to "the following day")'
            ],
            examinerReport: 'Penalties: Retaining "not" with "Unless" (e.g. "Unless you don\'t work hard") is a double negative and lost the mark.'
          }
        ]
      }
    ]
  },

  // 2022 KCSE Geography Paper 1 (312/1)
  {
    id: 'kcse-2022-geo-p1',
    year: 2022,
    subject: 'Geography',
    code: '312/1',
    paperName: 'Paper 1 (Physical Geography & Mapwork)',
    duration: '2 Hours 45 Minutes',
    totalMarks: 100,
    sections: [
      {
        sectionName: 'SECTION A - Short Answer Questions',
        instructions: 'Answer all questions in this section.',
        questions: [
          {
            qNum: 'Question 1',
            questionText: '(a) What is the solar system? (b) State three characteristics of the earth’s crust (lithosphere).',
            marks: 5,
            markingScheme: [
              '(a) The solar system consists of the sun, eight planets, their moons, asteroids, comets, and meteors orbiting the sun ($2 marks$)',
              '(b) (i) Composed of two layers: upper continental crust (SIAL - Silica and Aluminium) and lower oceanic crust (SIMA - Silica and Magnesium). (ii) Average thickness ranges from 5 to 70 km. (iii) SIAL is lighter (density 2.7 g/cm³) while SIMA is denser (density 3.0 g/cm³) ($3 marks$)'
            ],
            examinerReport: 'Candidates wrote Pluto as a primary planet. Mentioning SIAL and SIMA was key to scoring maximum marks.'
          }
        ]
      }
    ]
  }
];

export const KcsePastPapersVault: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [activePaperId, setActivePaperId] = useState<string>('kcse-2024-math-p1');
  const [viewMode, setViewMode] = useState<'paper' | 'marking_scheme'>('paper');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const availableYears = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
  const availableSubjects = [
    'all',
    'Mathematics Alternative A',
    'Chemistry',
    'Physics',
    'English',
    'Geography',
    'Biology',
    'Kiswahili'
  ];

  const filteredPapers = KCSE_PAST_PAPERS_DATABASE.filter((p) => {
    const matchesYear = p.year === selectedYear;
    const matchesSubject = selectedSubject === 'all' || p.subject === selectedSubject;
    return matchesYear && matchesSubject;
  });

  const activePaper =
    KCSE_PAST_PAPERS_DATABASE.find((p) => p.id === activePaperId) ||
    filteredPapers[0] ||
    KCSE_PAST_PAPERS_DATABASE[0];

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              <span>National Examination Council Archives</span>
              <span>·</span>
              <span>10-Year National Exam Database (2015–2024)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>📜 KCSE National Past Papers &amp; Chief Examiner Reports</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Explore authentic past KCSE exam papers complete with official <strong>KNEC Marking Schemes ($M_1, A_1$)</strong> and candid <strong>Chief Examiner Reports</strong> explaining national candidate pitfalls.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 flex items-center gap-1.5 shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4 Paper</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar: Years + Subjects + Marking Scheme Toggle */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
        {/* Years Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-slate-400 uppercase text-[10px] shrink-0 font-bold">Exam Year:</span>
          {availableYears.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-bold transition-all ${
                selectedYear === yr
                  ? 'bg-cyan-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>

        {/* Subjects & Mode Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 uppercase text-[10px] font-bold">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-500 font-sans"
            >
              {availableSubjects.map((s) => (
                <option key={s} value={s}>
                  {s === 'all' ? 'All Subjects' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle View: Question Paper vs Official Marking Scheme */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setViewMode('paper')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'paper'
                  ? 'bg-cyan-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Student Question Paper
            </button>
            <button
              onClick={() => setViewMode('marking_scheme')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'marking_scheme'
                  ? 'bg-emerald-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Official KNEC Marking Scheme &amp; Pitfalls
            </button>
          </div>
        </div>
      </div>

      {/* Main Paper Display */}
      {activePaper ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Official KNEC Paper Header (A4 Style) */}
          <div className="border-b-2 border-slate-750 pb-6 text-center space-y-2 font-mono">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>THE KENYA NATIONAL EXAMINATIONS COUNCIL</span>
              <span>INDEX NO: ___________________</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              KENYA CERTIFICATE OF SECONDARY EDUCATION ({activePaper.year})
            </h2>
            <div className="text-sm font-bold text-cyan-400 uppercase">
              {activePaper.code} - {activePaper.subject}
            </div>
            <div className="text-xs text-slate-300">
              {activePaper.paperName} · Duration: {activePaper.duration} · Total Marks: {activePaper.totalMarks}
            </div>
          </div>

          {/* Sections & Questions */}
          <div className="space-y-8 font-sans">
            {activePaper.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-5">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <span className="font-bold text-cyan-400 uppercase block">{section.sectionName}</span>
                  <span className="text-slate-400 text-[11px]">{section.instructions}</span>
                </div>

                <div className="space-y-4">
                  {section.questions.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-colors"
                    >
                      {/* Question Header */}
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-mono text-sm text-white">
                          {q.qNum}
                        </span>
                        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                          [{q.marks} Marks]
                        </span>
                      </div>

                      {/* Question Text */}
                      <p className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                        {q.questionText}
                      </p>

                      {/* Display Mode: Marking Scheme & Examiner's Pitfalls */}
                      {viewMode === 'marking_scheme' && (
                        <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 animate-in fade-in duration-150">
                          <div className="bg-emerald-950/40 border border-emerald-800/80 rounded-xl p-4 space-y-2">
                            <span className="text-xs font-bold font-mono text-emerald-300 uppercase flex items-center justify-between">
                              <span>KNEC Official Marking Scheme:</span>
                              <button
                                onClick={() => handleCopyText(q.markingScheme.join('\n'), `${sIdx}-${qIdx}`)}
                                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 font-normal"
                              >
                                <Copy className="w-3 h-3" />
                                <span>{copiedId === `${sIdx}-${qIdx}` ? 'Copied' : 'Copy Scheme'}</span>
                              </button>
                            </span>
                            <ul className="space-y-1.5 text-xs text-slate-200 font-mono">
                              {q.markingScheme.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-emerald-400 font-bold">✓</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Chief Examiner's Report Pitfall */}
                          <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-3.5 space-y-1 text-xs">
                            <div className="flex items-center gap-1.5 font-bold font-mono text-amber-400">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>Chief Examiner's National Analysis:</span>
                            </div>
                            <p className="text-slate-300 text-[11px] leading-relaxed">
                              {q.examinerReport}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-900 rounded-3xl border border-slate-800 text-xs text-slate-400">
          No papers found for {selectedYear} and subject {selectedSubject}. Select another year or subject above.
        </div>
      )}
    </div>
  );
};
