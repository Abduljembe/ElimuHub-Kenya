import React, { useState } from 'react';
import { Search, X, Calculator, BookOpen, Copy, Check, Filter, Award } from 'lucide-react';
import { playTapSound, playSuccessChime } from '../utils/soundEffects';

export interface KcseFormulaItem {
  id: string;
  name: string;
  formula: string;
  subject: string;
  topic: string;
  formLevel: string;
  variables: string[];
  knecNote: string;
}

export const KCSE_FORMULAS_DATABASE: KcseFormulaItem[] = [
  // MATHEMATICS
  {
    id: 'math-quad',
    name: 'Quadratic Formula',
    formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    formLevel: 'Form 2 & 3',
    variables: ['a, b, c = coefficients of ax² + bx + c = 0', 'b² - 4ac = discriminant (Δ)'],
    knecNote: 'If Δ > 0: two distinct real roots. If Δ = 0: two equal real roots. If Δ < 0: no real roots.'
  },
  {
    id: 'math-diff-poly',
    name: 'Power Rule for Differentiation',
    formula: 'd/dx (a·xⁿ) = n·a·xⁿ⁻¹',
    subject: 'Mathematics',
    topic: 'Calculus (Differentiation)',
    formLevel: 'Form 4',
    variables: ['a = coefficient', 'n = power', 'Gradient function = dy/dx'],
    knecNote: 'At stationary or turning points, dy/dx = 0. Use d²y/dx² to test nature (> 0 is minimum, < 0 is maximum).'
  },
  {
    id: 'math-int-poly',
    name: 'Indefinite Polynomial Integration',
    formula: '∫ a·xⁿ dx = (a·xⁿ⁺¹) / (n + 1) + C  (for n ≠ -1)',
    subject: 'Mathematics',
    topic: 'Calculus (Integration)',
    formLevel: 'Form 4',
    variables: ['C = constant of integration', 'Definite area = [F(x)]_a^b = F(b) - F(a)'],
    knecNote: 'Never omit the constant of integration "+ C" in indefinite integrals. Penalized 1 mark by KNEC.'
  },
  {
    id: 'math-sine-rule',
    name: 'The Sine Rule',
    formula: 'a / sin A = b / sin B = c / sin C = 2R',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    formLevel: 'Form 3',
    variables: ['a, b, c = side lengths', 'A, B, C = opposite angles', 'R = circumradius of triangle'],
    knecNote: 'Used when given two angles and one side (AAS) or two sides and a non-included angle (SSA).'
  },
  {
    id: 'math-cosine-rule',
    name: 'The Cosine Rule',
    formula: 'a² = b² + c² - 2bc·cos A  ⇒  cos A = (b² + c² - a²) / (2bc)',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    formLevel: 'Form 3',
    variables: ['a = side opposite angle A', 'b, c = adjacent sides'],
    knecNote: 'Used when given two sides and the included angle (SAS) or all three sides (SSS).'
  },
  {
    id: 'math-compound-interest',
    name: 'Compound Interest Formula',
    formula: 'A = P · (1 + r / (100·n))^(n·t)',
    subject: 'Mathematics',
    topic: 'Commercial Arithmetic',
    formLevel: 'Form 3',
    variables: ['A = accumulated amount', 'P = principal', 'r = annual interest rate %', 'n = compounding frequency', 't = time in years'],
    knecNote: 'Compound Interest I = Total Amount A - Principal P.'
  },

  // PHYSICS
  {
    id: 'phys-newton-2',
    name: 'Newton’s Second Law of Motion',
    formula: 'F = m · a = (m·v - m·u) / t',
    subject: 'Physics',
    topic: 'Linear Motion & Momentum',
    formLevel: 'Form 2 & 3',
    variables: ['F = resultant force (N)', 'm = mass (kg)', 'a = acceleration (m/s²)', 'mv - mu = change in momentum'],
    knecNote: 'Force is a vector; direction must be consistent with acceleration.'
  },
  {
    id: 'phys-trans-ratio',
    name: 'Transformer Turns & Voltage Ratio',
    formula: 'V_s / V_p = N_s / N_p = I_p / I_s  (for 100% ideal)',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    formLevel: 'Form 4',
    variables: ['V_s = secondary voltage', 'V_p = primary voltage', 'N_s, N_p = turns', 'I_s, I_p = currents'],
    knecNote: 'Current ratio is INVERSE to voltage: V_s / V_p = I_p / I_s. Efficiency η = (V_s · I_s / V_p · I_p) × 100%.'
  },
  {
    id: 'phys-heat-capacity',
    name: 'Specific Heat Capacity Equation',
    formula: 'Q = m · c · Δθ',
    subject: 'Physics',
    topic: 'Thermal Physics',
    formLevel: 'Form 3',
    variables: ['Q = heat energy (Joules)', 'm = mass (kg)', 'c = specific heat capacity (J/kg·K)', 'Δθ = temperature change (°C or K)'],
    knecNote: 'For phase changes at constant temperature, use latent heat: Q = m · L.'
  },
  {
    id: 'phys-lens-mirror',
    name: 'Thin Lens and Curved Mirror Formula',
    formula: '1 / f = 1 / u + 1 / v',
    subject: 'Physics',
    topic: 'Optics (Refraction & Reflection)',
    formLevel: 'Form 2 & 3',
    variables: ['f = focal length', 'u = object distance', 'v = image distance', 'Magnification m = v / u = h_i / h_o'],
    knecNote: 'Real-is-Positive convention: convex lens has positive f, concave lens has negative f.'
  },
  {
    id: 'phys-lost-volts',
    name: 'Electromotive Force & Internal Resistance',
    formula: 'E = V + I·r = I·(R + r)',
    subject: 'Physics',
    topic: 'Current Electricity',
    formLevel: 'Form 3',
    variables: ['E = EMF (V)', 'V = terminal PD (V)', 'I·r = lost volts (V)', 'r = internal resistance (Ω)'],
    knecNote: 'When graph of V against I is plotted, y-intercept = EMF (E) and negative slope = internal resistance (-r).'
  },

  // CHEMISTRY
  {
    id: 'chem-mole-mass',
    name: 'Mole - Mass Conversion',
    formula: 'Moles (n) = Mass (g) / Molar Mass (g/mol)',
    subject: 'Chemistry',
    topic: 'The Mole Concept',
    formLevel: 'Form 3',
    variables: ['n = number of moles', 'M = Relative Formula Mass (RFM)'],
    knecNote: 'Use exact KNEC atomic masses (e.g. Cl = 35.5, Cu = 63.5, Ca = 40.0).'
  },
  {
    id: 'chem-molarity',
    name: 'Molarity & Solution Concentration',
    formula: 'Molarity (M) = (Mass (g) / RFM) × (1000 / Volume (cm³))',
    subject: 'Chemistry',
    topic: 'Volumetric Analysis (Titration)',
    formLevel: 'Form 3',
    variables: ['M = moles per dm³ (mol/dm³)', 'Volume in cm³'],
    knecNote: 'Dilution law: M₁V₁ = M₂V₂. Only average concordant titres within ±0.20 cm³.'
  },
  {
    id: 'chem-gas-rtp',
    name: 'Molar Gas Volume at RTP / STP',
    formula: 'Volume of Gas (dm³) = Moles (n) × 24.0 dm³ (at RTP)',
    subject: 'Chemistry',
    topic: 'Gas Stoichiometry',
    formLevel: 'Form 3',
    variables: ['At RTP (25°C, 1 atm): 1 mol = 24.0 dm³ = 24,000 cm³', 'At STP (0°C, 1 atm): 1 mol = 22.4 dm³'],
    knecNote: 'Always state units (dm³ or cm³). Omitting units forfeits the final accuracy mark.'
  },
  {
    id: 'chem-cell-emf',
    name: 'Standard Electrochemical Cell Potential',
    formula: 'E°_cell = E°_cathode (reduction) - E°_anode (oxidation)',
    subject: 'Chemistry',
    topic: 'Electrochemistry',
    formLevel: 'Form 4',
    variables: ['E° = standard electrode potential vs SHE', 'Cathode = positive electrode in galvanic cell'],
    knecNote: 'If E°_cell > 0, the redox reaction is thermodynamically spontaneous.'
  },

  // BIOLOGY & AGRI
  {
    id: 'bio-lincoln',
    name: 'Lincoln-Petersen Index (Capture-Recapture)',
    formula: 'Population N = (First capture n₁ × Total second capture n₂) / Marked recaptures m',
    subject: 'Biology',
    topic: 'Ecology & Population Estimation',
    formLevel: 'Form 3',
    variables: ['n₁ = marked in first capture', 'n₂ = total caught in second capture', 'm = marked individuals in second capture'],
    knecNote: 'Assumes random mixing, no significant birth/death, and marks do not fall off or increase predation.'
  },
  {
    id: 'agri-pearson',
    name: 'Pearson’s Square Feed Formulation Ratio',
    formula: 'Ratio A : B = |% in Ingredient B - Target %| : |% in Ingredient A - Target %|',
    subject: 'Agriculture',
    topic: 'Livestock Nutrition',
    formLevel: 'Form 3',
    variables: ['Target % Crude Protein (DCP)', 'Diagonal absolute subtraction gives parts of the opposite feedstuff'],
    knecNote: 'Always write the parts of each ingredient clearly and simplify the ratio.'
  }
];

interface GlobalFormulaSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalFormulaSearchModal: React.FC<GlobalFormulaSearchModalProps> = ({
  isOpen,
  onClose
}) => {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = KCSE_FORMULAS_DATABASE.filter((f) => {
    const matchesSubj = selectedSubject === 'all' || f.subject.toLowerCase() === selectedSubject.toLowerCase();
    const q = search.toLowerCase();
    const matchesSearch =
      q === '' ||
      f.name.toLowerCase().includes(q) ||
      f.formula.toLowerCase().includes(q) ||
      f.topic.toLowerCase().includes(q);
    return matchesSubj && matchesSearch;
  });

  const handleCopy = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    playSuccessChime();
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[90vh] sm:max-h-[85vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-3.5 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="p-1.5 sm:p-2 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-xl shrink-0">
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <span>KCSE Formulas</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded-full font-normal">
                  All Subjects
                </span>
              </h2>
              <span className="text-[11px] sm:text-xs text-slate-400">
                Formulas, SI units &amp; KNEC marking rules
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Subject Tabs */}
        <div className="p-3 sm:p-4 bg-slate-950/40 border-b border-slate-800 space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              placeholder="Search e.g. quadratic, differentiation, lens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono pb-1 no-scrollbar">
            {['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Agriculture'].map((s) => (
              <button
                key={s}
                onClick={() => {
                  playTapSound();
                  setSelectedSubject(s);
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors capitalize whitespace-nowrap text-xs cursor-pointer ${
                  selectedSubject === s
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Formulas List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2.5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                      {item.subject}
                    </span>
                    <span className="text-slate-400 text-xs font-semibold">{item.topic}</span>
                    <span className="text-slate-500 text-[10px] font-mono">({item.formLevel})</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                </div>

                <button
                  onClick={() => handleCopy(item.formula, item.id)}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 text-xs flex items-center gap-1 shrink-0 font-mono"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Formula Badge */}
              <div className="bg-slate-900/90 border border-emerald-500/30 p-3 rounded-xl font-mono text-emerald-300 font-bold text-sm tracking-wide overflow-x-auto">
                {item.formula}
              </div>

              {/* Variables */}
              <div className="text-[11px] font-mono text-slate-400 space-y-0.5">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Variables &amp; Notation:</span>
                {item.variables.map((v, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✦</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>

              {/* KNEC Exam Note */}
              <div className="bg-amber-950/30 border border-amber-900/40 p-2.5 rounded-lg text-[11px] text-amber-200/90 font-sans">
                ⚠️ <strong>KNEC Rule:</strong> {item.knecNote}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              No formulas matching "{search}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
