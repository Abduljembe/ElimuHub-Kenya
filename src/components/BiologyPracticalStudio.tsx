import React, { useState } from 'react';
import {
  FlaskConical,
  Eye,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  Thermometer,
  PenTool,
  Droplets,
  HelpCircle
} from 'lucide-react';

interface FoodSample {
  id: string;
  name: string;
  source: string;
  nutrientsPresent: string[];
  tests: {
    testType: 'starch' | 'reducing_sugar' | 'non_reducing_sugar' | 'protein' | 'lipid' | 'vitamin_c';
    testName: string;
    procedure: string;
    observation: string;
    deduction: string;
    liquidColor: string;
    precipitateColor?: string;
    hasPrecipitate?: boolean;
    requiresBoiling?: boolean;
    isBoiling?: boolean;
  }[];
}

const FOOD_SAMPLES: FoodSample[] = [
  {
    id: 'sample-p',
    name: 'Extract X (Germinating Maize Seedling Suspension)',
    source: 'Crushed soaked maize seeds (Zea mays)',
    nutrientsPresent: ['Starch', 'Reducing Sugars'],
    tests: [
      {
        testType: 'starch',
        testName: 'Starch Test (Iodine Solution)',
        procedure: 'To 2cm³ of Extract X, add 3 drops of brown Iodine solution.',
        observation: 'Colour changes immediately from brown to intense blue-black.',
        deduction: 'Starch is present in high concentration.',
        liquidColor: '#0f172a',
        hasPrecipitate: true,
        precipitateColor: '#1e1b4b'
      },
      {
        testType: 'reducing_sugar',
        testName: "Reducing Sugars Test (Benedict's Solution + Water Bath)",
        procedure: "To 2cm³ of Extract X, add equal volume (2cm³) of Benedict's solution and boil in water bath for 3 minutes.",
        observation: "Colour turns from blue to green, then yellow, orange, and finally forms an orange-brown/brick-red precipitate.",
        deduction: 'Reducing sugars present in high concentration (maltose/glucose formed during germination).',
        liquidColor: '#9a3412',
        hasPrecipitate: true,
        precipitateColor: '#b45309',
        requiresBoiling: true
      },
      {
        testType: 'protein',
        testName: 'Protein Test (Biuret Test: 1% CuSO₄ + 10% NaOH)',
        procedure: 'To 2cm³ of Extract X, add 2cm³ of 10% NaOH followed by 2-3 drops of 1% CuSO₄ solution with shaking.',
        observation: 'Solution remains blue / no purple or violet coloration formed.',
        deduction: 'Proteins absent.',
        liquidColor: 'rgba(56, 189, 248, 0.45)'
      },
      {
        testType: 'vitamin_c',
        testName: 'Vitamin C Test (0.1% DCPIP Solution)',
        procedure: 'To 1cm³ of blue DCPIP solution, add Extract X drop by drop.',
        observation: 'DCPIP retains blue colour after adding more than 20 drops.',
        deduction: 'Ascorbic acid (Vitamin C) absent.',
        liquidColor: '#1d4ed8'
      }
    ]
  },
  {
    id: 'sample-q',
    name: 'Extract Y (Fresh Egg Albumen Solution)',
    source: 'Diluted raw egg white in distilled water',
    nutrientsPresent: ['Proteins'],
    tests: [
      {
        testType: 'starch',
        testName: 'Starch Test (Iodine Solution)',
        procedure: 'To 2cm³ of Extract Y, add 3 drops of Iodine solution.',
        observation: 'Solution retains brown / yellowish-brown colour of iodine.',
        deduction: 'Starch is absent.',
        liquidColor: 'rgba(180, 83, 9, 0.65)'
      },
      {
        testType: 'reducing_sugar',
        testName: "Reducing Sugars Test (Benedict's Solution)",
        procedure: "To 2cm³ of Extract Y, add equal volume of Benedict's solution and heat to boiling in water bath.",
        observation: "Solution remains clear blue; no color change or precipitate.",
        deduction: 'Reducing sugars absent.',
        liquidColor: 'rgba(14, 165, 233, 0.65)',
        requiresBoiling: true
      },
      {
        testType: 'protein',
        testName: 'Protein Test (Biuret Test)',
        procedure: 'To 2cm³ of Extract Y, add 2cm³ of 10% NaOH, then add 2-3 drops of 1% CuSO₄ solution and shake gently.',
        observation: 'Colour changes to an unmistakable purple / violet solution.',
        deduction: 'Proteins present in high concentration (albumen polypeptides).',
        liquidColor: '#7e22ce'
      },
      {
        testType: 'lipid',
        testName: 'Lipids Test (Ethanol Emulsion Test)',
        procedure: 'To 2cm³ of Extract Y, add 3cm³ of absolute ethanol, shake thoroughly, then pour into a test tube containing cold distilled water.',
        observation: 'Solution remains completely clear / no turbid white emulsion formed.',
        deduction: 'Lipids (fats and oils) absent.',
        liquidColor: 'rgba(241, 245, 249, 0.35)'
      }
    ]
  },
  {
    id: 'sample-r',
    name: 'Extract Z (Ripe Orange & Lemon Pulp Juice)',
    source: 'Citrus sinensis fresh juice',
    nutrientsPresent: ['Vitamin C', 'Reducing Sugars'],
    tests: [
      {
        testType: 'vitamin_c',
        testName: 'Vitamin C Test (DCPIP Decolorization)',
        procedure: 'To 1cm³ of 0.1% DCPIP (Dichlorophenolindophenol) blue solution in a test tube, add Extract Z dropwise using a dropper.',
        observation: 'Blue DCPIP solution decolorizes completely to colourless after only 3 drops.',
        deduction: 'High concentration of Ascorbic acid (Vitamin C) present (strong reducing agent).',
        liquidColor: 'rgba(254, 240, 138, 0.5)'
      },
      {
        testType: 'reducing_sugar',
        testName: "Reducing Sugars Test (Benedict's Solution)",
        procedure: "To 2cm³ of Extract Z, add 2cm³ of Benedict's solution and boil in water bath for 3 minutes.",
        observation: 'Colour transitions rapidly through green, yellow, orange to a brick-red precipitate.',
        deduction: 'Reducing sugars (fructose & glucose) present in high concentration.',
        liquidColor: '#b45309',
        hasPrecipitate: true,
        precipitateColor: '#c2410c',
        requiresBoiling: true
      },
      {
        testType: 'starch',
        testName: 'Starch Test (Iodine Solution)',
        procedure: 'To 2cm³ of Extract Z, add 3 drops of Iodine solution.',
        observation: 'Solution remains brown/orange (color of iodine). No blue-black color.',
        deduction: 'Starch absent (converted to simple sugars during fruit ripening).',
        liquidColor: 'rgba(180, 83, 9, 0.65)'
      }
    ]
  }
];

// KNEC Biological Drawing Specimen Library
const BIOLOGICAL_SPECIMENS = [
  {
    id: 'specimen-monocot-stem',
    title: 'Transverse Section (T.S) of Monocotyledonous Stem (Zea mays)',
    magnification: '×15',
    actualLengthMm: 3.5,
    drawingLengthMm: 52.5,
    keyFeatures: [
      'Epidermis with cuticle (outermost layer)',
      'Scattered vascular bundles throughout ground parenchyma',
      'No distinct pith or cortex differentiation',
      'Xylem vessels arranged in a Y or V shape with phloem above',
      'Sclerenchymatous bundle sheath enclosing each bundle'
    ],
    knecRules: [
      'Drawing must be enclosed in single continuous outline (no sketchy double lines)',
      'No artistic shading or pencil shading anywhere on diagram (penalized 1 mark by KNEC)',
      'Label lines must be completely straight, horizontal, and must touch the target tissue without arrowheads'
    ]
  },
  {
    id: 'specimen-insect-flower',
    title: 'Longitudinal Section (L.S) of Insect-Pollinated Flower (Hibiscus rosa-sinensis)',
    magnification: '×2',
    actualLengthMm: 45,
    drawingLengthMm: 90,
    keyFeatures: [
      'Large, brightly colored petals to attract insect pollinators',
      'Staminal tube formed by fused filaments surrounding the style',
      'Numerous anthers on short filaments projecting outwards',
      '5-lobed sticky stigma positioned well above the anthers to prevent self-pollination',
      'Superior ovary containing multiple ovules'
    ],
    knecRules: [
      'State magnification accurately: Magnification = Drawing length / Actual length = 90mm / 45mm = ×2',
      'Label lines must not cross each other',
      'Proportions must match actual specimen within 10% tolerance'
    ]
  },
  {
    id: 'specimen-gills',
    title: 'Gaseous Exchange System: Gill of Bony Fish (Tilapia nilotica)',
    magnification: '×3',
    actualLengthMm: 22,
    drawingLengthMm: 66,
    keyFeatures: [
      'Bony curved Gill Bar / Gill Arch for mechanical support',
      'Sharp, closely packed Gill Rakers to trap food particles and protect delicate filaments',
      'Numerous thin, vascularized Gill Filaments providing extensive surface area for oxygen diffusion',
      'Counter-current flow mechanism between blood and water'
    ],
    knecRules: [
      'Draw at least 4-5 rakers and clearly distinguish gill filaments from the gill arch',
      'Magnification must include the multiplication sign (×) before or after the number',
      'Do not include non-standard abbreviations in labels'
    ]
  }
];

export const BiologyPracticalStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'food_tests' | 'microscope_drawings'>('food_tests');
  const [selectedSampleId, setSelectedSampleId] = useState<string>('sample-p');
  const [currentTestIndex, setCurrentTestIndex] = useState<number>(0);
  const [isWaterBathBoiling, setIsWaterBathBoiling] = useState<boolean>(false);
  const [completedTests, setCompletedTests] = useState<number[]>([0]);

  // Specimen drawing state
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>('specimen-monocot-stem');
  const [studentMagnification, setStudentMagnification] = useState<string>('');
  const [drawingScore, setDrawingScore] = useState<{ checked: boolean; score: number } | null>(null);

  const activeSample = FOOD_SAMPLES.find((s) => s.id === selectedSampleId) || FOOD_SAMPLES[0];
  const activeTest = activeSample.tests[currentTestIndex];
  const activeSpecimen = BIOLOGICAL_SPECIMENS.find((s) => s.id === selectedSpecimenId) || BIOLOGICAL_SPECIMENS[0];

  const handleSelectSample = (id: string) => {
    setSelectedSampleId(id);
    setCurrentTestIndex(0);
    setCompletedTests([0]);
    setIsWaterBathBoiling(false);
  };

  const handleRunTest = (idx: number) => {
    setCurrentTestIndex(idx);
    if (!completedTests.includes(idx)) {
      setCompletedTests((prev) => [...prev, idx]);
    }
  };

  const handleVerifyMagnification = () => {
    const clean = studentMagnification.replace(/[xX×\s]/g, '');
    const expected = (activeSpecimen.drawingLengthMm / activeSpecimen.actualLengthMm).toFixed(0);
    const isCorrect = clean === expected;
    setDrawingScore({
      checked: true,
      score: isCorrect ? 3 : 1
    });
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <span>KNEC Paper 231/3 Biology Practical</span>
              <span>·</span>
              <span>Food Tests &amp; Specimen Drawing Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>🔬 Biology Paper 3 Practical Laboratory</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Master the mandatory <strong>Biochemical Food Tests</strong> (Iodine, Benedict’s, Biuret, DCPIP, Ethanol Emulsion) and practice <strong>KNEC Biological Drawing Standards</strong> with strict magnification and labelling rules.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-mono shrink-0">
            <button
              onClick={() => setActiveTab('food_tests')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'food_tests'
                  ? 'bg-emerald-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Biochemical Food Tests</span>
            </button>

            <button
              onClick={() => setActiveTab('microscope_drawings')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'microscope_drawings'
                  ? 'bg-emerald-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Specimen Drawing &amp; Mag</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: BIOCHEMICAL FOOD TESTS */}
      {activeTab === 'food_tests' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Test Tube & Water Bath Simulation */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col items-center">
            {/* Sample Selector */}
            <div className="w-full space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Select Exam Food Extract:
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {FOOD_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all text-xs font-mono ${
                      selectedSampleId === sample.id
                        ? 'bg-emerald-950/80 border-emerald-500 text-white shadow'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-white">{sample.name}</div>
                    <div className="text-[10px] text-slate-500">{sample.source}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Test Tube Graphic with Water Bath */}
            <div className="relative w-44 h-72 flex flex-col items-center justify-end py-3">
              {/* Boiling Water Bath Beaker if required */}
              {activeTest.requiresBoiling && (
                <div className="absolute bottom-0 w-36 h-36 border-4 border-slate-600/70 rounded-b-2xl bg-cyan-950/20 flex flex-col justify-end p-2 overflow-hidden shadow-inner">
                  <div
                    className={`w-full transition-all duration-500 ${
                      isWaterBathBoiling ? 'bg-cyan-500/30' : 'bg-cyan-900/30'
                    }`}
                    style={{ height: '70%' }}
                  >
                    {isWaterBathBoiling && (
                      <div className="absolute inset-x-2 bottom-2 overflow-hidden">
                        <div className="w-2 h-2 rounded-full bg-white/70 absolute bottom-1 left-2 animate-ping" />
                        <div className="w-2 h-2 rounded-full bg-white/70 absolute bottom-3 left-8 animate-bounce" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60 absolute bottom-5 left-16 animate-ping" />
                        <div className="w-2 h-2 rounded-full bg-white/80 absolute bottom-2 right-4 animate-bounce" />
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-cyan-300 text-center block mt-1">
                    Hot Water Bath (100°C)
                  </span>
                </div>
              )}

              {/* Glass Test Tube */}
              <div className="relative w-16 h-56 border-4 border-t-0 border-slate-400/80 rounded-b-full bg-slate-900/30 overflow-hidden shadow-inner flex flex-col justify-end z-10">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-slate-400/40 rounded-full" />
                {/* Liquid in tube */}
                <div
                  className="w-full transition-all duration-700 relative flex flex-col justify-end"
                  style={{
                    height: '60%',
                    backgroundColor: activeTest.liquidColor
                  }}
                >
                  {activeTest.hasPrecipitate && (
                    <div
                      className="w-full rounded-b-full text-[8px] font-mono font-bold text-black/80 flex items-center justify-center transition-all duration-500"
                      style={{
                        height: '35%',
                        backgroundColor: activeTest.precipitateColor || '#ffffff'
                      }}
                    >
                      <span>Ppt</span>
                    </div>
                  )}
                </div>
                {/* Glass reflection */}
                <div className="absolute top-0 left-1 w-1 h-full bg-white/20 rounded-full pointer-events-none" />
              </div>
            </div>

            {/* Water bath boiler button if needed */}
            {activeTest.requiresBoiling && (
              <button
                onClick={() => setIsWaterBathBoiling((prev) => !prev)}
                className={`w-full py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isWaterBathBoiling
                    ? 'bg-amber-600 text-white shadow animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-900/40'
                }`}
              >
                <Thermometer className="w-4 h-4" />
                <span>{isWaterBathBoiling ? 'Boiling in Water Bath (Active)' : 'Place in Boiling Water Bath'}</span>
              </button>
            )}
          </div>

          {/* Right Column: Procedures, Observation & KNEC Mark Rubric */}
          <div className="lg:col-span-7 space-y-4">
            {/* Step Selection Buttons */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Food Test Procedures:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeSample.tests.map((test, idx) => {
                  const isSelected = currentTestIndex === idx;
                  const isDone = completedTests.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleRunTest(idx)}
                      className={`p-3 rounded-xl border text-left transition-all text-xs font-mono flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-500 text-white shadow'
                          : isDone
                          ? 'bg-slate-900 border-slate-750 text-slate-300 hover:border-slate-600'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="font-bold truncate">{test.testName}</span>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* KNEC Exam Table Format: Procedure / Observation / Deduction */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                  KNEC Candidate Examination Table (Question 1)
                </span>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                  2 Marks ($O_1, D_1$)
                </span>
              </div>

              {/* Step Procedure */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Procedure:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-mono">
                  {activeTest.procedure}
                </p>
              </div>

              {/* 2-Column Observation & Deduction */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                      Observation
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">1 Mark ($O_1$)</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed text-xs">
                    {activeTest.observation}
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                      Deduction / Inference
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">1 Mark ($D_1$)</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed text-xs">
                    {activeTest.deduction}
                  </p>
                </div>
              </div>

              {/* Chief Examiner Rules */}
              <div className="bg-amber-950/30 border border-amber-900/40 p-3 rounded-xl text-[11px] text-amber-200/90 space-y-1">
                <div className="flex items-center gap-1.5 font-bold font-mono text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Chief Examiner Pitfall Alert:</span>
                </div>
                <p>
                  Writing "turns red" for Benedict's test without stating the <strong>formation of a precipitate</strong> loses the observation mark. You must write <em>"brick-red precipitate"</em>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SPECIMEN DRAWING & MAGNIFICATION STUDIO */}
      {activeTab === 'microscope_drawings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Specimen Selector & Interactive Diagram */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">
              Select High School Biological Specimen:
            </span>
            <div className="space-y-1.5">
              {BIOLOGICAL_SPECIMENS.map((specimen) => (
                <button
                  key={specimen.id}
                  onClick={() => {
                    setSelectedSpecimenId(specimen.id);
                    setDrawingScore(null);
                    setStudentMagnification('');
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all text-xs font-mono ${
                    selectedSpecimenId === specimen.id
                      ? 'bg-emerald-950/80 border-emerald-500 text-white shadow'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-white">{specimen.title}</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">
                    Specimen Scale: Actual = {specimen.actualLengthMm}mm · Drawing = {specimen.drawingLengthMm}mm
                  </div>
                </button>
              ))}
            </div>

            {/* Virtual Drawing Board Canvas */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-2 text-center">
              <span className="text-[10px] font-mono text-slate-400 block">
                Official Specimen Drawing Canvas (Simulated KNEC Answer Sheet)
              </span>
              <div className="w-full h-48 bg-slate-950 rounded-xl border border-dashed border-emerald-500/40 flex flex-col items-center justify-center p-3 relative">
                <PenTool className="w-8 h-8 text-emerald-400/60 mb-2" />
                <span className="text-xs font-mono font-bold text-white">
                  {activeSpecimen.title}
                </span>
                <span className="text-[10px] font-mono text-slate-400 mt-1">
                  Length across drawing: {activeSpecimen.drawingLengthMm} mm
                </span>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                  Mag: {activeSpecimen.magnification}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: KNEC Drawing Marking Rules & Magnification Calculator */}
          <div className="lg:col-span-7 space-y-5">
            {/* Magnification Calculation Exercise */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                    Candidate Magnification Calculation (1 Mark)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  Formula: Mag = Drawing / Actual
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Measured Drawing Length:</span>
                  <strong className="text-white">{activeSpecimen.drawingLengthMm} mm</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Actual Specimen Length:</span>
                  <strong className="text-white">{activeSpecimen.actualLengthMm} mm</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    Enter Magnification (e.g. ×15, ×2, ×3):
                  </label>
                  <input
                    type="text"
                    value={studentMagnification}
                    onChange={(e) => setStudentMagnification(e.target.value)}
                    placeholder="e.g. ×15"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  onClick={handleVerifyMagnification}
                  className="px-4 py-2 mt-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold shadow shrink-0"
                >
                  Verify Mag
                </button>
              </div>

              {drawingScore && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono flex items-center justify-between">
                  <span className="text-slate-300">
                    Official Answer: <strong className="text-emerald-400">{activeSpecimen.magnification}</strong>
                  </span>
                  <span className={drawingScore.score > 1 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                    Score: {drawingScore.score} / 3 Marks
                  </span>
                </div>
              )}
            </div>

            {/* Key Anatomical Features to Label */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Mandatory Anatomical Labels for Full Marks:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {activeSpecimen.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">#{idx + 1}</span>
                    <span className="text-[11px] leading-tight">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* KNEC Strict Examination Marking Conventions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2.5 text-xs">
              <h4 className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Official KNEC Biological Drawing Penalty Rules:</span>
              </h4>
              <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
                {activeSpecimen.knecRules.map((rule, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
