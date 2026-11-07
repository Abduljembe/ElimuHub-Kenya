import React, { useState } from 'react';
import {
  FlaskConical,
  Flame,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  Layers,
  Sparkles,
  Droplets,
  Eye,
  Info
} from 'lucide-react';

interface UnknownSalt {
  id: string;
  name: string;
  chemicalFormula: string;
  appearance: string;
  cation: string;
  anion: string;
  flameColor?: string;
  reactions: {
    reagent: string;
    observation: string;
    deduction: string;
    liquidColor: string;
    precipitateColor?: string;
    hasPrecipitate?: boolean;
    precipitateInsolubleInExcess?: boolean;
    precipitateSolubleInExcess?: boolean;
    bubbles?: boolean;
    gasEvolved?: string;
  }[];
}

const UNKNOWN_SALTS: UnknownSalt[] = [
  {
    id: 'salt-a',
    name: 'Sample P (Iron(II) Sulfate)',
    chemicalFormula: 'FeSO₄·7H₂O',
    appearance: 'Pale green crystalline solid',
    cation: 'Fe²⁺',
    anion: 'SO₄²⁻',
    reactions: [
      {
        reagent: 'water',
        observation: 'Solid dissolves completely to form a pale green solution.',
        deduction: 'Soluble colored salt; likely transition metal ion present (Fe²⁺ or Ni²⁺).',
        liquidColor: 'rgba(167, 243, 208, 0.65)'
      },
      {
        reagent: 'naoh_dropwise',
        observation: 'Dirty green precipitate formed immediately.',
        deduction: 'Fe²⁺ present.',
        liquidColor: 'rgba(167, 243, 208, 0.4)',
        hasPrecipitate: true,
        precipitateColor: '#15803d'
      },
      {
        reagent: 'naoh_excess',
        observation: 'Dirty green precipitate remains insoluble in excess; turns brown on surface.',
        deduction: 'Fe²⁺ confirmed; oxidizes slowly in air to form brown Fe(OH)₃.',
        liquidColor: 'rgba(167, 243, 208, 0.3)',
        hasPrecipitate: true,
        precipitateColor: '#166534',
        precipitateInsolubleInExcess: true
      },
      {
        reagent: 'nh3_dropwise',
        observation: 'Dirty green gelatinous precipitate formed.',
        deduction: 'Fe²⁺ present.',
        liquidColor: 'rgba(167, 243, 208, 0.4)',
        hasPrecipitate: true,
        precipitateColor: '#15803d'
      },
      {
        reagent: 'nh3_excess',
        observation: 'Dirty green precipitate remains insoluble in excess ammonia.',
        deduction: 'Fe²⁺ confirmed (does not form soluble amine complex).',
        liquidColor: 'rgba(167, 243, 208, 0.3)',
        hasPrecipitate: true,
        precipitateColor: '#15803d',
        precipitateInsolubleInExcess: true
      },
      {
        reagent: 'ba_no3_acid',
        observation: 'Dense white precipitate formed; insoluble in dilute HNO₃.',
        deduction: 'SO₄²⁻ ion present (BaSO₄ precipitate).',
        liquidColor: 'rgba(241, 245, 249, 0.5)',
        hasPrecipitate: true,
        precipitateColor: '#ffffff'
      },
      {
        reagent: 'heat',
        observation: 'Water droplets condense on cooler sides; pale green solid turns reddish-brown (Fe₂O₃); acidic gas (SO₂/SO₃) turns moist blue litmus red.',
        deduction: 'Hydrated salt; thermal decomposition gives Fe₂O₃ and acidic sulfur oxides.',
        liquidColor: '#7f1d1d',
        bubbles: true,
        gasEvolved: 'SO₂ & SO₃'
      }
    ]
  },
  {
    id: 'salt-b',
    name: 'Sample Q (Copper(II) Chloride)',
    chemicalFormula: 'CuCl₂·2H₂O',
    appearance: 'Blue-green crystalline solid',
    cation: 'Cu²⁺',
    anion: 'Cl⁻',
    flameColor: 'Bright blue-green flame with sparks',
    reactions: [
      {
        reagent: 'water',
        observation: 'Dissolves rapidly to give a vivid clear cyan-blue solution.',
        deduction: 'Cu²⁺ ion present in hydrated aqueous form [Cu(H₂O)₆]²⁺.',
        liquidColor: 'rgba(56, 189, 248, 0.75)'
      },
      {
        reagent: 'naoh_dropwise',
        observation: 'Pale blue precipitate formed.',
        deduction: 'Cu²⁺ present (formation of Cu(OH)₂).',
        liquidColor: 'rgba(56, 189, 248, 0.4)',
        hasPrecipitate: true,
        precipitateColor: '#0284c7'
      },
      {
        reagent: 'naoh_excess',
        observation: 'Pale blue precipitate remains insoluble in excess NaOH.',
        deduction: 'Cu²⁺ confirmed (non-amphoteric hydroxide).',
        liquidColor: 'rgba(56, 189, 248, 0.3)',
        hasPrecipitate: true,
        precipitateColor: '#0369a1',
        precipitateInsolubleInExcess: true
      },
      {
        reagent: 'nh3_dropwise',
        observation: 'Pale blue precipitate formed.',
        deduction: 'Cu²⁺ present.',
        liquidColor: 'rgba(56, 189, 248, 0.4)',
        hasPrecipitate: true,
        precipitateColor: '#0284c7'
      },
      {
        reagent: 'nh3_excess',
        observation: 'Pale blue precipitate dissolves in excess ammonia to give a stunning deep royal blue solution.',
        deduction: 'Cu²⁺ confirmed due to tetraamminecopper(II) complex [Cu(NH₃)₄]²⁺.',
        liquidColor: 'rgba(30, 58, 138, 0.95)',
        precipitateSolubleInExcess: true
      },
      {
        reagent: 'ag_no3_acid',
        observation: 'Curdy white precipitate formed; insoluble in dilute HNO₃ but soluble in dilute NH₃.',
        deduction: 'Cl⁻ ion present (AgCl precipitate).',
        liquidColor: 'rgba(241, 245, 249, 0.5)',
        hasPrecipitate: true,
        precipitateColor: '#ffffff'
      },
      {
        reagent: 'flame',
        observation: 'Imparts an intense persistent green-blue flame on a platinum/nichrome wire.',
        deduction: 'Cu²⁺ cation confirmed by flame test emission spectrum.',
        liquidColor: '#0284c7'
      }
    ]
  },
  {
    id: 'salt-c',
    name: 'Sample R (Aluminium Sulfate)',
    chemicalFormula: 'Al₂(SO₄)₃·18H₂O',
    appearance: 'White crystalline grains',
    cation: 'Al³⁺',
    anion: 'SO₄²⁻',
    reactions: [
      {
        reagent: 'water',
        observation: 'Dissolves to form a completely clear, colourless solution.',
        deduction: 'Soluble salt; absence of colored transition metal ions (Fe²⁺, Fe³⁺, Cu²⁺ absent).',
        liquidColor: 'rgba(241, 245, 249, 0.35)'
      },
      {
        reagent: 'naoh_dropwise',
        observation: 'White gelatinous precipitate formed.',
        deduction: 'Al³⁺, Pb²⁺, or Zn²⁺ present.',
        liquidColor: 'rgba(241, 245, 249, 0.35)',
        hasPrecipitate: true,
        precipitateColor: '#f8fafc'
      },
      {
        reagent: 'naoh_excess',
        observation: 'White precipitate dissolves completely in excess NaOH to yield a colourless solution.',
        deduction: 'Amphoteric hydroxide present: Al³⁺, Pb²⁺, or Zn²⁺ [forms soluble aluminate/plumbate/zincate].',
        liquidColor: 'rgba(241, 245, 249, 0.25)',
        precipitateSolubleInExcess: true
      },
      {
        reagent: 'nh3_dropwise',
        observation: 'White precipitate formed.',
        deduction: 'Al³⁺, Pb²⁺, or Zn²⁺ present.',
        liquidColor: 'rgba(241, 245, 249, 0.35)',
        hasPrecipitate: true,
        precipitateColor: '#f8fafc'
      },
      {
        reagent: 'nh3_excess',
        observation: 'White precipitate remains insoluble in excess aqueous ammonia.',
        deduction: 'Al³⁺ or Pb²⁺ confirmed (Zn²⁺ eliminated because zinc hydroxide dissolves in excess NH₃).',
        liquidColor: 'rgba(241, 245, 249, 0.35)',
        hasPrecipitate: true,
        precipitateColor: '#f8fafc',
        precipitateInsolubleInExcess: true
      },
      {
        reagent: 'ki',
        observation: 'No precipitate observed; solution remains colourless.',
        deduction: 'Pb²⁺ is ABSENT (since PbI₂ gives yellow ppt). Al³⁺ is strictly confirmed!',
        liquidColor: 'rgba(241, 245, 249, 0.35)'
      },
      {
        reagent: 'ba_no3_acid',
        observation: 'Thick white precipitate formed; insoluble in dilute HNO₃.',
        deduction: 'SO₄²⁻ present.',
        liquidColor: 'rgba(241, 245, 249, 0.35)',
        hasPrecipitate: true,
        precipitateColor: '#ffffff'
      }
    ]
  },
  {
    id: 'salt-d',
    name: 'Sample S (Lead(II) Nitrate)',
    chemicalFormula: 'Pb(NO₃)₂',
    appearance: 'Heavy white crystals',
    cation: 'Pb²⁺',
    anion: 'NO₃⁻',
    flameColor: 'Pale bluish-grey flame with decrepitation',
    reactions: [
      {
        reagent: 'water',
        observation: 'Dissolves easily to form a colourless solution.',
        deduction: 'Soluble lead salt (all nitrates are water soluble).',
        liquidColor: 'rgba(241, 245, 249, 0.35)'
      },
      {
        reagent: 'naoh_dropwise',
        observation: 'White precipitate formed.',
        deduction: 'Al³⁺, Pb²⁺, or Zn²⁺ present.',
        liquidColor: 'rgba(241, 245, 249, 0.35)',
        hasPrecipitate: true,
        precipitateColor: '#f1f5f9'
      },
      {
        reagent: 'naoh_excess',
        observation: 'White precipitate dissolves in excess NaOH to form sodium plumbate(II) [Pb(OH)₄]²⁻.',
        deduction: 'Amphoteric ion (Al³⁺, Pb²⁺, Zn²⁺) present.',
        liquidColor: 'rgba(241, 245, 249, 0.25)',
        precipitateSolubleInExcess: true
      },
      {
        reagent: 'nh3_dropwise',
        observation: 'White precipitate formed.',
        deduction: 'Al³⁺, Pb²⁺, or Zn²⁺ present.',
        liquidColor: 'rgba(241, 245, 249, 0.35)',
        hasPrecipitate: true,
        precipitateColor: '#f1f5f9'
      },
      {
        reagent: 'nh3_excess',
        observation: 'White precipitate remains insoluble in excess ammonia.',
        deduction: 'Al³⁺ or Pb²⁺ present (Zn²⁺ ruled out).',
        liquidColor: 'rgba(241, 245, 249, 0.35)',
        hasPrecipitate: true,
        precipitateColor: '#f1f5f9',
        precipitateInsolubleInExcess: true
      },
      {
        reagent: 'ki',
        observation: 'Brilliant golden-canary yellow precipitate formed immediately (PbI₂). Dissolves on boiling to give colourless solution and reprecipitates as golden spangles on cooling!',
        deduction: 'Pb²⁺ strictly confirmed beyond doubt! (Definitive KNEC test differentiating Pb²⁺ from Al³⁺).',
        liquidColor: 'rgba(254, 240, 138, 0.7)',
        hasPrecipitate: true,
        precipitateColor: '#eab308'
      },
      {
        reagent: 'heat',
        observation: 'Cracking / decrepitating sound heard. Brown choking fumes evolved (NO₂) which turn moist blue litmus red. Yellow solid residue when cold, reddish-brown when hot (PbO).',
        deduction: 'Thermal decomposition of nitrate: 2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂. Confirms NO₃⁻.',
        liquidColor: '#78350f',
        bubbles: true,
        gasEvolved: 'Brown NO₂ fumes + O₂'
      }
    ]
  },
  {
    id: 'salt-e',
    name: 'Sample T (Zinc Carbonate)',
    chemicalFormula: 'ZnCO₃',
    appearance: 'Fine white amorphous powder',
    cation: 'Zn²⁺',
    anion: 'CO₃²⁻',
    reactions: [
      {
        reagent: 'water',
        observation: 'Solid is completely insoluble in distilled water.',
        deduction: 'Insoluble carbonate or hydroxide (all carbonates except Na⁺, K⁺, NH₄⁺ are insoluble).',
        liquidColor: 'rgba(241, 245, 249, 0.25)',
        hasPrecipitate: true,
        precipitateColor: '#e2e8f0'
      },
      {
        reagent: 'dilute_acid',
        observation: 'Rapid effervescence / bubbling. Colourless odorless gas evolved turns moist blue litmus pink and forms a white precipitate with calcium hydroxide (lime water).',
        deduction: 'CO₃²⁻ or HCO₃⁻ confirmed (CO₂ gas evolved: CO₃²⁻ + 2H⁺ → CO₂ + H₂O). Solution contains Zn²⁺.',
        liquidColor: 'rgba(241, 245, 249, 0.3)',
        bubbles: true,
        gasEvolved: 'CO₂ Gas'
      },
      {
        reagent: 'naoh_dropwise',
        observation: 'White precipitate formed with neutralized solution.',
        deduction: 'Al³⁺, Pb²⁺, or Zn²⁺ present.',
        liquidColor: 'rgba(241, 245, 249, 0.35)',
        hasPrecipitate: true,
        precipitateColor: '#f8fafc'
      },
      {
        reagent: 'naoh_excess',
        observation: 'White precipitate dissolves completely in excess to give colourless zincate solution [Zn(OH)₄]²⁻.',
        deduction: 'Amphoteric ion: Al³⁺, Pb²⁺, or Zn²⁺ present.',
        liquidColor: 'rgba(241, 245, 249, 0.25)',
        precipitateSolubleInExcess: true
      },
      {
        reagent: 'nh3_dropwise',
        observation: 'White precipitate formed.',
        deduction: 'Al³⁺, Pb²⁺, or Zn²⁺ present.',
        liquidColor: 'rgba(241, 245, 249, 0.35)',
        hasPrecipitate: true,
        precipitateColor: '#f8fafc'
      },
      {
        reagent: 'nh3_excess',
        observation: 'White precipitate dissolves completely in excess ammonia to give a clear colourless solution [Zn(NH₃)₄]²⁺.',
        deduction: 'Zn²⁺ uniquely confirmed! (Only Zn²⁺ forms a soluble tetrammine complex in excess NH₃; Al³⁺ & Pb²⁺ remain insoluble).',
        liquidColor: 'rgba(241, 245, 249, 0.25)',
        precipitateSolubleInExcess: true
      },
      {
        reagent: 'heat',
        observation: 'White powder turns canary-yellow when strongly heated, then cools back to white powder.',
        deduction: 'Zinc oxide (ZnO) formed. ZnO is famously yellow when hot and white when cold.',
        liquidColor: '#ca8a04',
        bubbles: true,
        gasEvolved: 'CO₂'
      }
    ]
  }
];

export const QualitativeAnalysisSim: React.FC = () => {
  const [selectedSaltId, setSelectedSaltId] = useState<string>('salt-a');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [performedSteps, setPerformedSteps] = useState<number[]>([0]);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [studentGuessCation, setStudentGuessCation] = useState<string>('');
  const [studentGuessAnion, setStudentGuessAnion] = useState<string>('');
  const [isGraded, setIsGraded] = useState<boolean>(false);

  const activeSalt = UNKNOWN_SALTS.find((s) => s.id === selectedSaltId) || UNKNOWN_SALTS[0];
  const activeReaction = activeSalt.reactions[currentStepIndex];

  const handleSelectSalt = (id: string) => {
    setSelectedSaltId(id);
    setCurrentStepIndex(0);
    setPerformedSteps([0]);
    setIsRevealed(false);
    setIsGraded(false);
    setStudentGuessCation('');
    setStudentGuessAnion('');
  };

  const handleApplyReagent = (idx: number) => {
    setCurrentStepIndex(idx);
    if (!performedSteps.includes(idx)) {
      setPerformedSteps((prev) => [...prev, idx]);
    }
  };

  const handleGrade = () => {
    setIsGraded(true);
    setIsRevealed(true);
  };

  const isCationCorrect =
    studentGuessCation.trim().toLowerCase() === activeSalt.cation.toLowerCase();
  const isAnionCorrect =
    studentGuessAnion.trim().toLowerCase() === activeSalt.anion.toLowerCase();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            <span>KNEC Paper 233/3 Practical Laboratory</span>
            <span>·</span>
            <span>15-Mark Mandatory Qualitative Analysis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FlaskConical className="w-6 h-6 text-emerald-400" />
            <span>Virtual Reagent Bench &amp; Salt Analysis Simulator</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Perform sequential wet bench tests on unknown salts using bench reagents (NaOH, NH₃, Ba(NO₃)₂, AgNO₃, KI, Bunsen flame). Observe precipitate formations, solubility in excess, gas evolutions, and match official KNEC marking schemes ($P_1, D_1$).
          </p>
        </div>

        {/* Salt Selector */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5 shrink-0">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">
            Select Unknown Exam Salt:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {UNKNOWN_SALTS.map((salt) => (
              <button
                key={salt.id}
                onClick={() => handleSelectSalt(salt.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                  selectedSaltId === salt.id
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {salt.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Lab Bench: Apparatus on Left + Reagents & Observations on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Test Tube Bench Apparatus */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col items-center justify-between space-y-4">
          <div className="w-full flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Appearance:</span>
            <span className="text-emerald-400 font-bold">{activeSalt.appearance}</span>
          </div>

          {/* Test Tube Graphic Container */}
          <div className="relative w-40 h-80 flex flex-col items-center justify-end py-4">
            {/* Wooden Test Tube Clamp Stand */}
            <div className="absolute top-16 -right-6 w-12 h-4 bg-amber-900/80 rounded-r border border-amber-800 shadow-md" />
            <div className="absolute top-14 -right-2 w-4 h-8 bg-slate-600 rounded-sm" />

            {/* Test Tube Glass Container */}
            <div className="relative w-24 h-64 border-4 border-t-0 border-slate-500/80 rounded-b-full bg-slate-900/30 overflow-hidden shadow-inner flex flex-col justify-end backdrop-blur-sm">
              {/* Rim of test tube */}
              <div className="absolute top-0 inset-x-0 h-2 bg-slate-400/40 rounded-full" />

              {/* Liquid Level */}
              <div
                className="w-full transition-all duration-700 relative flex flex-col justify-end"
                style={{
                  height: '65%',
                  backgroundColor: activeReaction.liquidColor || 'rgba(241, 245, 249, 0.4)'
                }}
              >
                {/* Effervescence Bubbles */}
                {activeReaction.bubbles && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-white/70 absolute bottom-2 left-3 animate-ping" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/80 absolute bottom-5 left-8 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 absolute bottom-8 left-14 animate-ping" />
                    <div className="w-2 h-2 rounded-full bg-white/70 absolute bottom-12 left-5 animate-pulse" />
                  </div>
                )}

                {/* Precipitate layer at the bottom */}
                {activeReaction.hasPrecipitate && (
                  <div
                    className="w-full rounded-b-full transition-all duration-500 flex items-center justify-center text-[9px] font-mono font-bold text-black/80"
                    style={{
                      height: '35%',
                      backgroundColor: activeReaction.precipitateColor || '#ffffff',
                      boxShadow: '0 -4px 10px rgba(0,0,0,0.2)'
                    }}
                  >
                    <span>Precipitate</span>
                  </div>
                )}
              </div>

              {/* Glass Reflection Highlight */}
              <div className="absolute top-0 left-2 w-1.5 h-full bg-white/15 rounded-full pointer-events-none" />
            </div>

            {/* Heating Flame beneath test tube if heat test */}
            {activeReaction.reagent === 'heat' && (
              <div className="mt-2 flex flex-col items-center animate-pulse">
                <Flame className="w-8 h-8 text-amber-500 fill-amber-400" />
                <span className="text-[10px] font-mono text-amber-400">Heating Strongly</span>
              </div>
            )}
          </div>

          {/* Test Status Indicator */}
          <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-center space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Current Reagent Added</span>
            <strong className="text-white text-xs font-mono block">
              {activeReaction.reagent.toUpperCase().replace(/_/g, ' ')}
            </strong>
            {activeReaction.gasEvolved && (
              <span className="inline-block px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 rounded text-[10px] font-mono">
                💨 Gas Evolved: {activeReaction.gasEvolved}
              </span>
            )}
            {activeReaction.precipitateSolubleInExcess && (
              <span className="inline-block px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[10px] font-mono">
                ✓ Precipitate Dissolved in Excess
              </span>
            )}
            {activeReaction.precipitateInsolubleInExcess && (
              <span className="inline-block px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded text-[10px] font-mono">
                ⚠️ Precipitate Insoluble in Excess
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Reagent Rack & KNEC Examination Table */}
        <div className="lg:col-span-7 space-y-5">
          {/* Reagent Rack Selector */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 uppercase font-semibold">Laboratory Bench Reagents</span>
              <span className="text-emerald-400 text-[11px] font-mono">Click to pipette into test tube</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {activeSalt.reactions.map((r, idx) => {
                const isSelected = currentStepIndex === idx;
                const wasPerformed = performedSteps.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => handleApplyReagent(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1 text-xs font-mono relative ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg'
                        : wasPerformed
                        ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-600'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] truncate">
                        {r.reagent.replace(/_/g, ' ')}
                      </span>
                      {wasPerformed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      Step {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Observation & Deduction Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                  Test Results (Step {currentStepIndex + 1} of {activeSalt.reactions.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                KNEC Mark Allocation: 1 Mark
              </span>
            </div>

            {/* Two Column Observation & Deduction as on KNEC Answer Sheet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              {/* Observation Box */}
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-mono text-cyan-400 font-bold block uppercase flex items-center justify-between">
                  <span>Observations</span>
                  <span className="text-[10px] text-slate-500">Score: $P_1$</span>
                </span>
                <p className="text-slate-200 leading-relaxed text-xs">
                  {activeReaction.observation}
                </p>
              </div>

              {/* Deduction Box */}
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-mono text-emerald-400 font-bold block uppercase flex items-center justify-between">
                  <span>Inferences / Deductions</span>
                  <span className="text-[10px] text-slate-500">Score: $D_1$</span>
                </span>
                <p className="text-slate-200 leading-relaxed text-xs">
                  {activeReaction.deduction}
                </p>
              </div>
            </div>
          </div>

          {/* Student Candidate Ion Identification Challenge */}
          <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-emerald-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                  Candidate Final Ion Deduction (Marking Slip)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-amber-400">Final 2 Marks ($D_2$)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="text-slate-400 block text-[10px] uppercase mb-1">
                  Identified Cation (e.g. Fe²⁺, Cu²⁺, Al³⁺, Pb²⁺, Zn²⁺):
                </label>
                <input
                  type="text"
                  placeholder="Enter cation with charge"
                  value={studentGuessCation}
                  onChange={(e) => setStudentGuessCation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block text-[10px] uppercase mb-1">
                  Identified Anion (e.g. SO₄²⁻, Cl⁻, NO₃⁻, CO₃²⁻):
                </label>
                <input
                  type="text"
                  placeholder="Enter anion with charge"
                  value={studentGuessAnion}
                  onChange={(e) => setStudentGuessAnion(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Check / Reveal Button */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handleGrade}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-mono shadow flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Submit &amp; Grade Candidate Answers</span>
              </button>

              <button
                onClick={() => setIsRevealed((prev) => !prev)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-mono"
              >
                {isRevealed ? 'Hide Official Solution' : 'Reveal KNEC Marking Scheme'}
              </button>
            </div>

            {/* Grade Result Alert */}
            {isGraded && (
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">KNEC Official Marking Result:</span>
                  <span className="text-emerald-400">
                    {(isCationCorrect ? 1 : 0) + (isAnionCorrect ? 1 : 0)} / 2 Marks
                  </span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span>Cation:</span>
                    <strong className={isCationCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                      {activeSalt.cation}
                    </strong>
                    {isCationCorrect ? '✓ Correct' : `(You wrote: "${studentGuessCation || 'empty'}")`}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Anion:</span>
                    <strong className={isAnionCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                      {activeSalt.anion}
                    </strong>
                    {isAnionCorrect ? '✓ Correct' : `(You wrote: "${studentGuessAnion || 'empty'}")`}
                  </div>
                </div>
              </div>
            )}

            {/* Revealed Official Solution & Penalties */}
            {isRevealed && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-800/80 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-emerald-300 font-mono">
                    Full Compound Identity: {activeSalt.name} ({activeSalt.chemicalFormula})
                  </strong>
                </div>
                <div className="text-[11px] text-slate-300 leading-relaxed font-sans space-y-1">
                  <p>
                    ⚠️ <strong>Chief Examiner Rule:</strong> Writing the symbol without the charge (e.g. writing <code className="bg-black/40 px-1 py-0.5 rounded text-rose-300">Fe2</code> or <code className="bg-black/40 px-1 py-0.5 rounded text-rose-300">Fe</code> instead of <code className="bg-black/40 px-1 py-0.5 rounded text-emerald-300">Fe²⁺</code>) loses the mark entirely.
                  </p>
                  <p>
                    ⚠️ <strong>Contradictory Deductions:</strong> If a candidate lists both <code className="bg-black/40 px-1 py-0.5 rounded">Fe²⁺</code> and <code className="bg-black/40 px-1 py-0.5 rounded">Fe³⁺</code> in the same box without choosing, zero marks are awarded.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
