import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Timer,
  RotateCcw,
  Award,
  ChevronRight,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  subject: string;
  formOrYear: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  knecRule: string;
  knecTrap?: string;
}

const QUIZ_QUESTION_BANK: QuizQuestion[] = [
  // Chemistry
  {
    id: 'q-chem-1',
    subject: 'Chemistry',
    formOrYear: 'Form 3',
    questionText: 'What is the volume occupied by 0.2 moles of oxygen gas at room temperature and pressure (r.t.p., molar gas volume = 24.0 dm³)?',
    options: ['4.8 dm³ (4,800 cm³)', '2.4 dm³', '1.2 dm³', '48.0 dm³'],
    correctIndex: 0,
    explanation: 'Volume = Moles × Molar Gas Volume = 0.2 mol × 24.0 dm³/mol = 4.8 dm³ = 4,800 cm³.',
    knecRule: 'KNEC formula mark M1 for multiplying moles by 24, accuracy mark A1 for 4.8 dm³ with units.'
  },
  {
    id: 'q-chem-2',
    subject: 'Chemistry',
    formOrYear: 'Form 4',
    questionText: 'Which observation is made when excess sodium hydroxide solution (2M NaOH) is added to a solution of Lead(II) nitrate?',
    options: [
      'A white precipitate forms and remains insoluble in excess NaOH',
      'A white precipitate forms which dissolves in excess NaOH to form a colourless solution',
      'A brown precipitate forms immediately',
      'No visible change occurs'
    ],
    correctIndex: 1,
    explanation: 'Pb²⁺ forms white Pb(OH)₂ with NaOH, which is amphoteric and dissolves in excess NaOH to form the soluble tetrahydroxoplumbate(II) complex ion [Pb(OH)₄]²⁻.',
    knecRule: 'KNEC strictly requires the phrase "dissolves to form a colourless solution". Writing "clear solution" loses marks.'
  },
  {
    id: 'q-chem-3',
    subject: 'Chemistry',
    formOrYear: 'Form 2',
    questionText: 'Which of the following compounds has both covalent bonds and coordinate (dative) covalent bonds?',
    options: ['Water (H₂O)', 'Ammonium ion (NH₄⁺)', 'Sodium chloride (NaCl)', 'Methane (CH₄)'],
    correctIndex: 1,
    explanation: 'In the ammonium ion (NH₄⁺), nitrogen shares 3 covalent pairs with 3 hydrogen atoms, and donates a lone pair to an H⁺ ion to form a coordinate bond.',
    knecRule: 'In dot-and-cross diagrams, the dative bond is drawn with an arrow pointing from the donor (N) to the acceptor (H⁺).'
  },

  // Biology
  {
    id: 'q-bio-1',
    subject: 'Biology',
    formOrYear: 'Form 1',
    questionText: 'What happens to a red blood cell when placed in a hypotonic (dilute) solution?',
    options: [
      'It loses water by osmosis and crenates (shrinks)',
      'It absorbs water by osmosis, swells, and bursts (haemolysis)',
      'It becomes turgid and increases in volume without bursting',
      'Its cellulose cell wall prevents bursting'
    ],
    correctIndex: 1,
    explanation: 'Red blood cells lack a cell wall. In a hypotonic solution, water moves into the cell by osmosis down a water potential gradient until internal hydrostatic pressure bursts the delicate plasma membrane (haemolysis).',
    knecTrap: 'Only plant cells become turgid; animal cells undergo haemolysis because they lack a rigid cellulose cell wall.',
    knecRule: 'Credit awarded for stating: absorbs water by osmosis -> swells -> haemolysis/bursts.'
  },
  {
    id: 'q-bio-2',
    subject: 'Biology',
    formOrYear: 'Form 2',
    questionText: 'Which blood vessel carries oxygenated blood from the lungs directly to the left atrium of the human heart?',
    options: ['Pulmonary Artery', 'Pulmonary Vein', 'Aorta', 'Vena Cava'],
    correctIndex: 1,
    explanation: 'The pulmonary vein is the only vein in the human body that carries oxygenated blood, delivering it from the pulmonary capillary bed of the lungs to the left atrium.',
    knecRule: 'Pulmonary artery carries DEOXYGENATED blood from right ventricle to lungs.'
  },
  {
    id: 'q-bio-3',
    subject: 'Biology',
    formOrYear: 'Form 4',
    questionText: 'In a monohybrid cross between two heterozygous tall pea plants (Tt × Tt), what is the expected phenotypic ratio of the offspring?',
    options: ['1 Tall : 1 Dwarf', '3 Tall : 1 Dwarf', '1 Tall : 2 Medium : 1 Dwarf', 'All Tall'],
    correctIndex: 1,
    explanation: 'Punnett square yields: TT (Tall), Tt (Tall), Tt (Tall), tt (Dwarf). Phenotypic ratio is 3 Tall : 1 Dwarf (Genotypic ratio is 1 TT : 2 Tt : 1 tt).',
    knecRule: 'Distinguish clearly between "phenotypic ratio" (appearance: 3:1) and "genotypic ratio" (genetic makeup: 1:2:1).'
  },

  // Physics
  {
    id: 'q-phy-1',
    subject: 'Physics',
    formOrYear: 'Form 3',
    questionText: 'A dry cell of electromotive force 1.5 V and internal resistance 0.5 Ω is connected to an external resistor of 2.5 Ω. What is the current flowing in the circuit?',
    options: ['0.5 A', '1.0 A', '0.6 A', '3.0 A'],
    correctIndex: 0,
    explanation: 'Total circuit resistance R_total = R + r = 2.5 + 0.5 = 3.0 Ω. Circuit current I = E / (R + r) = 1.5 V / 3.0 Ω = 0.5 A.',
    knecRule: 'Method mark M1 for formula I = E/(R+r), accuracy mark A1 for 0.5 A with units.'
  },
  {
    id: 'q-phy-2',
    subject: 'Physics',
    formOrYear: 'Form 2',
    questionText: 'An airplane wing produces upward aerodynamic lift primarily because:',
    options: [
      'Air travels faster over the curved top surface, creating lower pressure above (Bernoulli’s Principle)',
      'Air travels faster underneath the wing, creating higher pressure above',
      'Air density is higher above the wing',
      'Gravity pushes the air downwards'
    ],
    correctIndex: 0,
    explanation: 'By Bernoulli’s Principle, an increase in fluid velocity produces a decrease in fluid pressure. Air flowing faster over the convex upper aerofoil creates low static pressure above, generating net upward lift.',
    knecRule: 'Explain: Higher air velocity above wing -> lower pressure above -> upward resultant lift force.'
  },
  {
    id: 'q-phy-3',
    subject: 'Physics',
    formOrYear: 'Form 4',
    questionText: 'When light of frequency 6.0 × 10¹⁴ Hz falls on a metal surface whose threshold frequency is 4.0 × 10¹⁴ Hz, what is the kinetic energy of emitted photoelectrons (h = 6.63 × 10⁻³⁴ J·s)?',
    options: ['1.326 × 10⁻¹⁹ J', '3.978 × 10⁻¹⁹ J', '6.630 × 10⁻¹⁹ J', '2.652 × 10⁻¹⁹ J'],
    correctIndex: 0,
    explanation: 'Ek(max) = h · f - h · f₀ = h(f - f₀) = (6.63 × 10⁻³⁴) × (6.0 × 10¹⁴ - 4.0 × 10¹⁴) = 6.63 × 10⁻³⁴ × 2.0 × 10¹⁴ = 1.326 × 10⁻¹⁹ Joules.',
    knecRule: 'Substitution into Einstein’s photoelectric equation awarded M1, final value A1.'
  },

  // Mathematics
  {
    id: 'q-math-1',
    subject: 'Mathematics',
    formOrYear: 'Form 1',
    questionText: 'The GCD of two numbers is 12 and their LCM is 360. If one of the numbers is 72, what is the second number?',
    options: ['60', '48', '90', '120'],
    correctIndex: 0,
    explanation: 'For any two numbers a and b: GCD(a, b) × LCM(a, b) = a × b. Therefore: 12 × 360 = 72 × b => 4,320 = 72b => b = 4,320 / 72 = 60.',
    knecRule: 'Method mark M1 for equating product of numbers to product of GCD and LCM.'
  },
  {
    id: 'q-math-2',
    subject: 'Mathematics',
    formOrYear: 'Form 4',
    questionText: 'Differentiate y = 3x⁴ - 5x² + 7 with respect to x.',
    options: ['12x³ - 10x', '12x³ - 10x + 7', '4x³ - 5x', '7x³ - 10x'],
    correctIndex: 0,
    explanation: 'Using power rule d/dx(axⁿ) = n·a·xⁿ⁻¹: dy/dx = 4(3)x³ - 2(5)x¹ + 0 = 12x³ - 10x. Constant derivative is 0.',
    knecRule: 'Accuracy mark A1 for 12x³ - 10x.'
  }
];

export const QuizEngine: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  const subjects = ['all', 'Chemistry', 'Biology', 'Physics', 'Mathematics'];

  const filteredQuestions =
    selectedSubject === 'all'
      ? QUIZ_QUESTION_BANK
      : QUIZ_QUESTION_BANK.filter((q) => q.subject === selectedSubject);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !quizFinished) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, quizFinished]);

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setUserScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      setIsTimerRunning(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserScore(0);
    setQuizFinished(false);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const percentage = Math.round((userScore / filteredQuestions.length) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
              <span>National Examination Rapid Practice</span>
              <span>·</span>
              <span>KNEC Method &amp; Accuracy Scoring</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Rapid-Fire Curriculum Quiz Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Test your recall on high-frequency KCSE questions. Instant verification, marking scheme method marks ($M_1, A_1$), and common mistake alerts.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-sm">
              <Timer className="w-4 h-4" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="text-xs font-mono text-slate-400">
              Score: <strong className="text-emerald-400 text-sm">{userScore}</strong> / {filteredQuestions.length}
            </div>
          </div>
        </div>

        {/* Subject Filter Bar */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-800/80 overflow-x-auto text-xs">
          <span className="text-slate-500 uppercase font-mono mr-1">Subject:</span>
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubject(sub);
                handleRestartQuiz();
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                selectedSubject === sub
                  ? 'bg-amber-950 border-amber-500/80 text-amber-300 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sub === 'all' ? 'All Subjects' : sub}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Card or Result Screen */}
      {!quizFinished ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Question Header & Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="text-amber-400 font-semibold uppercase">
                {currentQ.subject} · {currentQ.formOrYear}
              </span>
              <span>
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%`
                }}
              />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mt-4 leading-snug">
              {currentQ.questionText}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let optionClass =
                'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-950';

              if (isAnswerSubmitted) {
                if (idx === currentQ.correctIndex) {
                  optionClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                } else if (isSelected) {
                  optionClass = 'bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                }
              } else if (isSelected) {
                optionClass = 'bg-amber-950/60 border-amber-500 text-amber-200 ring-1 ring-amber-500';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm font-medium ${optionClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 font-mono text-xs flex items-center justify-center text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswerSubmitted && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Box */}
          {isAnswerSubmitted && (
            <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs animate-in fade-in">
              <div className="flex items-center gap-2">
                {selectedOption === currentQ.correctIndex ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Correct Answer! (+1 Mark)
                  </span>
                ) : (
                  <span className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                    <XCircle className="w-4 h-4" /> Incorrect
                  </span>
                )}
              </div>

              <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>

              <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg text-amber-200">
                <strong className="block text-[10px] font-mono uppercase text-amber-400 mb-0.5">
                  KNEC Marking Rule:
                </strong>
                {currentQ.knecRule}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Quiz
            </button>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors shadow-lg"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-lg"
              >
                <span>{currentIndex < filteredQuestions.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Scorecard */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-xl space-y-6">
          <Award className="w-16 h-16 text-amber-400 mx-auto" />
          <div>
            <h3 className="text-2xl font-extrabold text-white">Rapid Quiz Complete!</h3>
            <p className="text-xs text-slate-400 mt-1">
              Completed {filteredQuestions.length} questions in {formatTime(elapsedSeconds)}
            </p>
          </div>

          <div className="inline-flex items-center gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-mono text-slate-400 block">Final Score</span>
              <strong className="text-3xl font-extrabold text-white">
                {userScore} / {filteredQuestions.length}
              </strong>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div>
              <span className="text-xs font-mono text-slate-400 block">Percentage</span>
              <strong className={`text-3xl font-extrabold ${percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {percentage}%
              </strong>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div>
              <span className="text-xs font-mono text-slate-400 block">KNEC Grade</span>
              <strong className="text-3xl font-extrabold text-cyan-400">
                {percentage >= 80 ? 'A' : percentage >= 75 ? 'A-' : percentage >= 70 ? 'B+' : percentage >= 65 ? 'B' : percentage >= 55 ? 'C+' : 'D'}
              </strong>
            </div>
          </div>

          <div>
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-lg"
            >
              Take Another Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
