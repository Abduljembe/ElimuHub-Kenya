import React, { useState } from 'react';
import {
  Map,
  Compass,
  Ruler,
  Mountain,
  Eye,
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Layers,
  ChevronRight,
  Info,
  Maximize2
} from 'lucide-react';

interface MapFeature {
  id: string;
  name: string;
  type: 'trig' | 'school' | 'hospital' | 'church' | 'factory' | 'river' | 'peak' | 'forest';
  east: number; // 0 to 10
  north: number; // 0 to 10
  elevation: number; // meters
  description: string;
  gridRef4: string;
  gridRef6: string;
}

export const GeographyMapworkStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'gradient' | 'crosssection' | 'legend' | 'fieldwork'>('interactive');
  
  // Selected map sheet
  const [selectedSheet, setSelectedSheet] = useState<'kericho' | 'kijabe'>('kericho');
  
  // Interactive coordinates & points
  const [selectedPointA, setSelectedPointA] = useState<string>('trig-1');
  const [selectedPointB, setSelectedPointB] = useState<string>('ch-1');
  
  // User 6-figure grid challenge
  const [targetFeatureIndex, setTargetFeatureIndex] = useState(0);
  const [userEastTenth, setUserEastTenth] = useState('');
  const [userNorthTenth, setUserNorthTenth] = useState('');
  const [quizFeedback, setQuizFeedback] = useState<{ status: 'idle' | 'correct' | 'incorrect'; msg: string }>({
    status: 'idle',
    msg: ''
  });

  // Gradient calculator inputs
  const [gradElevHigh, setGradElevHigh] = useState<number>(2180);
  const [gradElevLow, setGradElevLow] = useState<number>(1860);
  const [gradDistKm, setGradDistKm] = useState<number>(4.2);

  // Fieldwork topic selection
  const [selectedFieldworkTopic, setSelectedFieldworkTopic] = useState<string>('river');

  // Map features dataset (Kericho Sheet 117/2 extract simulation)
  const mapFeatures: MapFeature[] = [
    {
      id: 'trig-1',
      name: 'Kipkelion Secondary Trigonometrical Station (117/SK/4)',
      type: 'trig',
      east: 3.4,
      north: 7.8,
      elevation: 2185,
      description: 'Primary trigonometric beacon mounted on rock promontory.',
      gridRef4: '3377',
      gridRef6: '334778'
    },
    {
      id: 'tea-1',
      name: 'Chebown Tea Factory',
      type: 'factory',
      east: 5.2,
      north: 4.6,
      elevation: 1940,
      description: 'Large tea processing plant with road weighbridge and effluent pond.',
      gridRef4: '3574',
      gridRef6: '352746'
    },
    {
      id: 'ch-1',
      name: 'St. Patrick Catholic Church & Dispensary',
      type: 'church',
      east: 2.1,
      north: 3.5,
      elevation: 1880,
      description: 'Permanent structure with bore hole water point and nursery.',
      gridRef4: '3273',
      gridRef6: '321735'
    },
    {
      id: 'peak-1',
      name: 'Kaisugat Hill Summit (Spot Height 2240m)',
      type: 'peak',
      east: 7.9,
      north: 8.4,
      elevation: 2240,
      description: 'Conical volcanic hill with dense radial drainage pattern.',
      gridRef4: '3778',
      gridRef6: '379784'
    },
    {
      id: 'hosp-1',
      name: 'Kericho District Sub-County Hospital',
      type: 'hospital',
      east: 8.6,
      north: 2.7,
      elevation: 1820,
      description: 'Health facility on tarmac road C23 junction.',
      gridRef4: '3872',
      gridRef6: '386727'
    },
    {
      id: 'forest-1',
      name: 'Mau Forest Escarpment Edge Reserve',
      type: 'forest',
      east: 1.5,
      north: 8.8,
      elevation: 2310,
      description: 'Gazetted indigenous montane rain forest zone with ranger post.',
      gridRef4: '3178',
      gridRef6: '315788'
    }
  ];

  const currentQuizFeature = mapFeatures[targetFeatureIndex];

  const handleVerifyGridRef = () => {
    const expected = currentQuizFeature.gridRef6;
    const userSubmitted = `${currentQuizFeature.gridRef4.slice(0, 2)}${userEastTenth}${currentQuizFeature.gridRef4.slice(2, 4)}${userNorthTenth}`;
    
    if (userSubmitted === expected) {
      setQuizFeedback({
        status: 'correct',
        msg: `Correct! 6-figure grid reference is ${expected}. Eastings: ${currentQuizFeature.gridRef4.slice(0, 2)}.${userEastTenth}, Northings: ${currentQuizFeature.gridRef4.slice(2, 4)}.${userNorthTenth}.`
      });
    } else {
      setQuizFeedback({
        status: 'incorrect',
        msg: `Not quite. Expected ${expected}. Remember: Eastings come first (${expected.slice(0, 3)}), then Northings (${expected.slice(3, 6)}).`
      });
    }
  };

  const nextQuizItem = () => {
    setTargetFeatureIndex((prev) => (prev + 1) % mapFeatures.length);
    setUserEastTenth('');
    setUserNorthTenth('');
    setQuizFeedback({ status: 'idle', msg: '' });
  };

  // Gradient computation
  const verticalInterval = Math.abs(gradElevHigh - gradElevLow);
  const horizontalEquivalentMeters = gradDistKm * 1000;
  const gradientDenominator = horizontalEquivalentMeters > 0 && verticalInterval > 0 
    ? Math.round(horizontalEquivalentMeters / verticalInterval) 
    : 0;
  const slopePercentage = horizontalEquivalentMeters > 0 
    ? ((verticalInterval / horizontalEquivalentMeters) * 100).toFixed(2) 
    : '0';

  // Selected Points info for Cross-Section
  const featA = mapFeatures.find(f => f.id === selectedPointA) || mapFeatures[0];
  const featB = mapFeatures.find(f => f.id === selectedPointB) || mapFeatures[2];
  
  // Approximate straight line distance (each grid square is 1km)
  const distUnits = Math.sqrt(
    Math.pow(featB.east - featA.east, 2) + Math.pow(featB.north - featA.north, 2)
  );
  const distKm = distUnits.toFixed(2);
  const distGroundMeters = (parseFloat(distKm) * 1000).toFixed(0);

  // Elevation difference
  const elevDiff = Math.abs(featA.elevation - featB.elevation);
  const pairGradientDenom = elevDiff > 0 ? Math.round(parseFloat(distGroundMeters) / elevDiff) : 0;

  // Intervisibility logic: Kaisugat Hill (peak-1) obstructs if in between
  const hasObstruction = (featA.id === 'forest-1' && featB.id === 'hosp-1') || 
                        (featA.id === 'hosp-1' && featB.id === 'forest-1') ||
                        (featA.id === 'trig-1' && featB.id === 'ch-1');

  // Fieldwork data guides
  const fieldworkGuides: Record<string, {
    title: string;
    objectives: string[];
    hypotheses: string[];
    methods: string[];
    tools: string[];
    followUp: string[];
    knecTips: string[];
  }> = {
    river: {
      title: 'Fieldwork on River Profile, Velocity & Fluvial Landforms (River Kipchorian)',
      objectives: [
        'To determine the average cross-sectional area and discharge of River Kipchorian.',
        'To investigate the relationship between river velocity and bedload particle size.',
        'To identify active fluvial features (meanders, slip-off slopes, river cliffs) along the middle course.'
      ],
      hypotheses: [
        'River water velocity increases downstream towards the tea estates.',
        'Bedload sediment roundness increases downstream as a result of attrition.'
      ],
      methods: [
        'Direct measurement of river depth and width using ranging poles and tape measure.',
        'Float timing method using an orange or ping-pong ball and stopwatch to measure surface velocity.',
        'Systematic sediment sampling of 20 pebbles from the riverbed using calipers.'
      ],
      tools: ['Ranging poles', '100m surveying tape', 'Stopwatch', 'Floating object (orange)', 'Sediment calipers', 'Recording sheets'],
      followUp: [
        'Drawing cross-sectional profiles of the river channel on millimeter graph paper.',
        'Calculating stream discharge using Q = Area × Velocity (m³/s).',
        'Compiling a written report for display on the school geography noticeboard.'
      ],
      knecTips: [
        'Always start objectives with measurable verbs: "To find out...", "To determine...", "To identify...". Never use "To know" or "To understand" (KNEC awards 0 marks).',
        'State hypotheses as testable declarative statements, not questions.'
      ]
    },
    agriculture: {
      title: 'Field Study on Large-Scale Tea Farming & Factory Processing in Kericho',
      objectives: [
        'To identify the physical conditions favoring tea cultivation in the area.',
        'To investigate the stages involved in black tea processing at Chebown Tea Factory.',
        'To examine the socio-economic benefits and challenges faced by tea outgrowers.'
      ],
      hypotheses: [
        'Tea farming is the primary source of household income in the surveyed sub-county.',
        'Fertilizer input costs have risen significantly over the past 3 seasons.'
      ],
      methods: [
        'Face-to-face oral interviewing of smallholder tea farmers using structured questionnaire guides.',
        'Guided observation and walkthrough inside the tea processing factory.',
        'Taking field photographs and sketches of pluckers harvesting two leaves and a bud.'
      ],
      tools: ['Questionnaire forms', 'Digital camera / phone', 'Notebook & pens', 'Protective gumboots and lab coats'],
      followUp: [
        'Constructing compound bar charts comparing tea yield across various plantation blocks.',
        'Writing a letter of appreciation to the factory manager.',
        'Discussing mitigation measures against frost and hail damage in class.'
      ],
      knecTips: [
        'When KNEC asks for secondary sources of data, cite: Topographical map sheets, factory financial records, Ministry of Agriculture reports, meteorological weather station data.',
        'For problems encountered: Adverse weather (heavy torrential rains), language barrier, uncooperative respondents, steep slippery terrain.'
      ]
    },
    settlement: {
      title: 'Field Study on Settlement Patterns & Urban Land Use in Kericho Town',
      objectives: [
        'To identify the prevailing settlement patterns (nucleated, linear, dispersed) in the study area.',
        'To examine the functional zones (CBD, residential, industrial, transport) of Kericho town.',
        'To find out the environmental challenges associated with rapid urban growth.'
      ],
      hypotheses: [
        'Settlement along the main highway is predominantly linear.',
        'Traffic congestion is concentrated during morning and evening rush hours.'
      ],
      methods: [
        'Land use mapping and transect walk across the town from the bus terminus to the industrial area.',
        'Administering questionnaires to local traders and town council urban planners.',
        'Counting vehicular traffic flow at designated road junctions.'
      ],
      tools: ['Base map of the town', 'Tally sheets for traffic count', 'Clipboards', 'GPS phone coordinates'],
      followUp: [
        'Drawing a choropleth map or land-use zoning map of the CBD.',
        'Presenting recommendations on solid waste management to the County environmental committee.',
        'Holding a classroom seminar on urban decentralization.'
      ],
      knecTips: [
        'KNEC always tests reasons why reconnaissance (pre-visit) is necessary: To seek administrative permission, to estimate required budget and time, to design suitable route maps, to test research tools (pilot study).'
      ]
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <span>KCSE Geography Paper 1 (312/1) Section A &amp; B</span>
              <span>·</span>
              <span>Survey of Kenya 1:50,000 Specifications</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Topographical Mapwork &amp; Fieldwork Studio
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Master Eastings &amp; Northings, 4-figure and 6-figure grid references, straight &amp; curved distance calculation, slope gradients, cross-section elevation profiling, intervisibility analysis, and official KNEC fieldwork methodologies.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-mono">Map Extract:</span>
            <select
              value={selectedSheet}
              onChange={(e) => setSelectedSheet(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 text-emerald-400 font-semibold text-xs rounded-lg px-3 py-2 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="kericho">Kericho Sheet 117/2 (Scale 1:50,000, V.I. 20m)</option>
              <option value="kijabe">Kijabe Sheet 133/4 (Scale 1:50,000, V.I. 20m)</option>
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 border-t border-slate-800/80 pt-4 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'interactive'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            1:50,000 Grid &amp; Coordinates Finder
          </button>
          <button
            onClick={() => setActiveTab('gradient')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'gradient'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Ruler className="w-4 h-4" />
            KNEC Gradient &amp; Slope Calculator
          </button>
          <button
            onClick={() => setActiveTab('crosssection')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'crosssection'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Mountain className="w-4 h-4" />
            Cross-Section &amp; Intervisibility Test
          </button>
          <button
            onClick={() => setActiveTab('legend')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'legend'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Survey of Kenya Symbols &amp; Legend
          </button>
          <button
            onClick={() => setActiveTab('fieldwork')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'fieldwork'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            Fieldwork Master Methodology (Section B)
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE 1:50,000 MAP & GRID LOCATOR */}
      {activeTab === 'interactive' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Simulated Topographical Map Canvas */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <div className="font-mono text-emerald-400 flex items-center gap-2">
                <Map className="w-4 h-4" />
                <span>Survey of Kenya Sheet 117/2 (Kericho) Extract</span>
              </div>
              <div className="text-slate-400 font-mono text-[11px]">
                Scale: 1:50,000 (2 cm = 1 km) · V.I. = 20 meters
              </div>
            </div>

            {/* SVG Interactive Map Grid */}
            <div className="relative my-4 aspect-square bg-[#14231e] rounded-lg border-2 border-emerald-900/60 overflow-hidden select-none">
              <svg viewBox="0 0 500 500" className="w-full h-full">
                <defs>
                  {/* Subtle terrain topography pattern */}
                  <pattern id="contourPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 0 20 Q 20 5 40 20 T 80 20" fill="none" stroke="#22543d" strokeWidth="0.8" opacity="0.35" />
                    <path d="M 0 35 Q 25 15 50 35" fill="none" stroke="#22543d" strokeWidth="0.5" opacity="0.25" />
                  </pattern>
                </defs>

                {/* Base terrain */}
                <rect width="500" height="500" fill="#0f1f1a" />
                <rect width="500" height="500" fill="url(#contourPattern)" />

                {/* Simulated River: River Kipchorian */}
                <path
                  d="M 50 480 Q 120 400 160 360 T 250 310 T 310 230 T 420 180 T 480 90"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <text x="210" y="335" fill="#38bdf8" fontSize="10" fontWeight="bold" transform="rotate(-30 210, 335)">
                  River Kipchorian (Permanent) →
                </text>

                {/* Simulated All-Weather Bound Road: C23 */}
                <path
                  d="M 20 120 Q 180 150 260 230 T 360 370 T 470 430"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3"
                  strokeDasharray="8 2"
                />
                <text x="130" y="165" fill="#f97316" fontSize="9" fontWeight="bold" transform="rotate(18 130, 165)">
                  Road C23 (Tarmac All-Weather)
                </text>

                {/* Simulated Secondary Murram Road */}
                <path
                  d="M 260 230 Q 280 100 390 60"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {/* Simulated Escarpment / Ridge Contours */}
                <circle cx="395" cy="80" r="45" fill="none" stroke="#a16207" strokeWidth="1.2" />
                <circle cx="395" cy="80" r="30" fill="none" stroke="#a16207" strokeWidth="1.2" />
                <circle cx="395" cy="80" r="15" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
                <text x="390" y="83" fill="#fde047" fontSize="8" fontWeight="bold">2240m</text>

                {/* 10x10 Grid System (Eastings 30 to 40, Northings 70 to 80) */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const pos = i * 45 + 25; // 25 to 475
                  const eastingVal = 30 + i;
                  const northingVal = 70 + (10 - i);

                  return (
                    <g key={i}>
                      {/* Vertical line (Eastings) */}
                      <line x1={pos} y1="20" x2={pos} y2="480" stroke="#059669" strokeWidth="0.8" opacity="0.6" />
                      <text x={pos} y="15" fill="#34d399" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                        {eastingVal}
                      </text>
                      <text x={pos} y="495" fill="#34d399" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                        {eastingVal}
                      </text>

                      {/* Horizontal line (Northings) */}
                      <line x1="20" y1={pos} x2={480} y2={pos} stroke="#059669" strokeWidth="0.8" opacity="0.6" />
                      <text x="12" y={pos + 3} fill="#34d399" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">
                        {northingVal}
                      </text>
                      <text x="488" y={pos + 3} fill="#34d399" fontSize="10" textAnchor="start" fontFamily="monospace" fontWeight="bold">
                        {northingVal}
                      </text>
                    </g>
                  );
                })}

                {/* Plot Features on SVG */}
                {mapFeatures.map((feat) => {
                  const cx = 25 + feat.east * 45;
                  const cy = 25 + (10 - feat.north) * 45;

                  return (
                    <g key={feat.id} className="cursor-pointer group">
                      {feat.type === 'trig' && (
                        <>
                          <polygon
                            points={`${cx},${cy - 8} ${cx - 7},${cy + 6} ${cx + 7},${cy + 6}`}
                            fill="#ef4444"
                            stroke="#fff"
                            strokeWidth="1"
                          />
                          <circle cx={cx} cy={cy} r="2" fill="#fff" />
                        </>
                      )}
                      {feat.type === 'factory' && (
                        <rect x={cx - 7} y={cy - 7} width="14" height="14" fill="#a855f7" stroke="#fff" strokeWidth="1" />
                      )}
                      {feat.type === 'church' && (
                        <>
                          <circle cx={cx} cy={cy} r="6" fill="#3b82f6" stroke="#fff" strokeWidth="1" />
                          <line x1={cx} y1={cy - 10} x2={cx} y2={cy - 2} stroke="#fff" strokeWidth="1.5" />
                          <line x1={cx - 4} y1={cy - 7} x2={cx + 4} y2={cy - 7} stroke="#fff" strokeWidth="1.5" />
                        </>
                      )}
                      {feat.type === 'peak' && (
                        <>
                          <polygon points={`${cx},${cy - 10} ${cx - 8},${cy + 6} ${cx + 8},${cy + 6}`} fill="#eab308" />
                          <circle cx={cx} cy={cy + 1} r="2" fill="#000" />
                        </>
                      )}
                      {feat.type === 'hospital' && (
                        <>
                          <rect x={cx - 7} y={cy - 7} width="14" height="14" fill="#10b981" stroke="#fff" strokeWidth="1" />
                          <path d={`M ${cx} ${cy - 4} L ${cx} ${cy + 4} M ${cx - 4} ${cy} L ${cx + 4} ${cy}`} stroke="#fff" strokeWidth="2" />
                        </>
                      )}
                      {feat.type === 'forest' && (
                        <circle cx={cx} cy={cy} r="8" fill="#15803d" stroke="#86efac" strokeWidth="1" />
                      )}

                      {/* Label badge */}
                      <rect
                        x={cx + 10}
                        y={cy - 10}
                        width={feat.name.length * 5.2 + 8}
                        height="16"
                        rx="3"
                        fill="#020617"
                        fillOpacity="0.85"
                        stroke="#334155"
                        strokeWidth="0.5"
                      />
                      <text x={cx + 14} y={cy + 2} fill="#f1f5f9" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
                        {feat.name.split(' ')[0]} ({feat.elevation}m)
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Map metadata indicator */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Eastings read West to East (30 → 40)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
                Northings read South to North (70 → 80)
              </span>
              <span className="text-slate-300 font-mono">Formula: EEE NNN (6 digits)</span>
            </div>
          </div>

          {/* Interactive KNEC Grid Reference Challenge / Inspector */}
          <div className="lg:col-span-4 space-y-6">
            {/* 6-Figure Master Training Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase text-emerald-400">KNEC Practice Challenge</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {targetFeatureIndex + 1} / {mapFeatures.length}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Target Map Feature:</span>
                <h3 className="text-sm font-bold text-white mt-1 text-balance">
                  {currentQuizFeature.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {currentQuizFeature.description}
                </p>
                <div className="mt-2 text-xs font-mono text-emerald-400">
                  Elevation: {currentQuizFeature.elevation} meters A.S.L.
                </div>
              </div>

              {/* 4-Figure vs 6-Figure Explanation */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-300 font-mono">
                  <span>4-Figure Grid Ref:</span>
                  <span className="text-emerald-400 font-bold text-sm tracking-widest">{currentQuizFeature.gridRef4}</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  Grid square bounded by Easting line <strong className="text-slate-200">{currentQuizFeature.gridRef4.slice(0, 2)}</strong> and Northing line <strong className="text-slate-200">{currentQuizFeature.gridRef4.slice(2, 4)}</strong>.
                </div>
              </div>

              {/* User Input for Tenths */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-medium text-slate-200 block">
                  Find Tenths to complete 6-Figure Grid Ref:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-mono mb-1">
                      Eastings: {currentQuizFeature.gridRef4.slice(0, 2)}.
                      <strong className="text-emerald-400">X</strong>
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="9"
                      value={userEastTenth}
                      onChange={(e) => setUserEastTenth(e.target.value.slice(0, 1))}
                      placeholder="0-9"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-center text-white font-mono font-bold focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block font-mono mb-1">
                      Northings: {currentQuizFeature.gridRef4.slice(2, 4)}.
                      <strong className="text-emerald-400">Y</strong>
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="9"
                      value={userNorthTenth}
                      onChange={(e) => setUserNorthTenth(e.target.value.slice(0, 1))}
                      placeholder="0-9"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-center text-white font-mono font-bold focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleVerifyGridRef}
                    disabled={userEastTenth === '' || userNorthTenth === ''}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow transition-colors"
                  >
                    Verify 6-Figure Ref
                  </button>
                  <button
                    onClick={nextQuizItem}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
                  >
                    Next Feature
                  </button>
                </div>

                {/* Feedback message */}
                {quizFeedback.status !== 'idle' && (
                  <div
                    className={`p-3 rounded-lg text-xs border ${
                      quizFeedback.status === 'correct'
                        ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-700 text-rose-200'
                    }`}
                  >
                    {quizFeedback.msg}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Rules for 312/1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl text-xs space-y-3">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-400" />
                KNEC Golden Rules of Grid References
              </h4>
              <ul className="space-y-2 text-slate-300 list-disc list-inside">
                <li>
                  <strong className="text-white">Eastings First:</strong> Always read along the bottom/top margin (West to East) before reading Northings along the side (South to North).
                </li>
                <li>
                  <strong className="text-white">No punctuation:</strong> Write grid reference strictly as 6 continuous digits (e.g. <span className="font-mono text-emerald-400">334778</span>), never with commas or spaces.
                </li>
                <li>
                  <strong className="text-white">Bottom-Left Corner:</strong> The 4-figure grid reference is named from the South-West (bottom-left) intersection of the grid square.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KNEC GRADIENT & SLOPE CALCULATOR */}
      {activeTab === 'gradient' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400">Mathematical Geography</span>
              <h2 className="text-xl font-bold text-white mt-1">Slope Gradient Calculator</h2>
              <p className="text-xs text-slate-400 mt-1">
                Calculate Vertical Interval (V.I.), Horizontal Equivalent (H.E.), slope gradient ratio, and percentage slope as required by KNEC Paper 1 questions.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Elevation of Higher Point (A) in Meters:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1000"
                    max="3000"
                    step="10"
                    value={gradElevHigh}
                    onChange={(e) => setGradElevHigh(Number(e.target.value))}
                    className="flex-1 accent-emerald-500"
                  />
                  <input
                    type="number"
                    value={gradElevHigh}
                    onChange={(e) => setGradElevHigh(Number(e.target.value))}
                    className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-right font-mono text-emerald-400 font-bold text-sm"
                  />
                  <span className="text-xs text-slate-400 font-mono">m</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Elevation of Lower Point (B) in Meters:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="500"
                    max="2500"
                    step="10"
                    value={gradElevLow}
                    onChange={(e) => setGradElevLow(Number(e.target.value))}
                    className="flex-1 accent-emerald-500"
                  />
                  <input
                    type="number"
                    value={gradElevLow}
                    onChange={(e) => setGradElevLow(Number(e.target.value))}
                    className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-right font-mono text-emerald-400 font-bold text-sm"
                  />
                  <span className="text-xs text-slate-400 font-mono">m</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Horizontal Distance on Ground (Map Distance × 0.5 km/cm):
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0.5"
                    max="20.0"
                    step="0.1"
                    value={gradDistKm}
                    onChange={(e) => setGradDistKm(Number(e.target.value))}
                    className="flex-1 accent-emerald-500"
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={gradDistKm}
                    onChange={(e) => setGradDistKm(Number(e.target.value))}
                    className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-right font-mono text-emerald-400 font-bold text-sm"
                  />
                  <span className="text-xs text-slate-400 font-mono">km</span>
                </div>
              </div>
            </div>

            {/* KNEC Step-by-Step Mark Award Rubric */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-emerald-400 font-bold text-sm border-b border-slate-800 pb-2">
                KNEC Official Marking Scheme Steps:
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Step 1: Vertical Interval (V.I.)</span>
                <span>{gradElevHigh}m - {gradElevLow}m = <strong className="text-emerald-400">{verticalInterval} m</strong> (1 Mark)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Step 2: Horizontal Equivalent (H.E.)</span>
                <span>{gradDistKm} km × 1,000 = <strong className="text-emerald-400">{horizontalEquivalentMeters} m</strong> (1 Mark)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Step 3: Gradient Formula</span>
                <span className="text-slate-200">Gradient = V.I. / H.E.</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Step 4: Ratio Reduction</span>
                <span>{verticalInterval} / {horizontalEquivalentMeters} = 1 / {gradientDenominator} (1 Mark)</span>
              </div>
              <div className="flex justify-between text-amber-400 font-bold pt-2 border-t border-slate-800 text-sm">
                <span>Final Gradient Answer</span>
                <span>1 : {gradientDenominator} (or 1 in {gradientDenominator})</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400">Topographical Interpretation</span>
              <h3 className="text-xl font-bold text-white mt-1">Slope Interpretation &amp; Human Activity</h3>
            </div>

            {/* Visual Slope Indicator */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
              <div className="text-xs text-slate-400 mb-2">Calculated Slope Angle:</div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-white">1 in {gradientDenominator}</span>
                <span className="text-sm font-semibold text-emerald-400">({slopePercentage}% inclination)</span>
              </div>

              {/* Graphical representation of the slope */}
              <div className="h-28 mt-4 border-b border-slate-700 flex items-end">
                <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                  {/* Ground base */}
                  <line x1="20" y1="90" x2="380" y2="90" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />
                  {/* Inclined slope */}
                  <line
                    x1="20"
                    y1="90"
                    x2="380"
                    y2={Math.max(15, 90 - (verticalInterval / (horizontalEquivalentMeters || 1)) * 300)}
                    stroke="#10b981"
                    strokeWidth="3.5"
                  />
                  {/* Triangle vertical side */}
                  <line
                    x1="380"
                    y1="90"
                    x2="380"
                    y2={Math.max(15, 90 - (verticalInterval / (horizontalEquivalentMeters || 1)) * 300)}
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                  <text x="388" y="55" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                    V.I. {verticalInterval}m
                  </text>
                  <text x="180" y="85" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    H.E. {gradDistKm}km
                  </text>
                </svg>
              </div>
            </div>

            {/* Terrain Suitability Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Economic &amp; Environmental Suitability:
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-semibold block mb-1">Mechanized Agriculture:</span>
                  <p className="text-slate-300 text-[11px]">
                    {gradientDenominator > 25
                      ? 'Gentle slope (suitable for tractor plowing, wheat and maize cultivation with minimal soil erosion).'
                      : 'Steep slope (requires contour terracing, tea bushes, or agroforestry to prevent soil wash).'}
                  </p>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-semibold block mb-1">Road &amp; Railway Construction:</span>
                  <p className="text-slate-300 text-[11px]">
                    {gradientDenominator > 35
                      ? 'Ideal for standard railway and tarmac road alignment with few cuttings and embankments.'
                      : 'Requires zig-zag serpentine road curves, heavy earthworks, and hair-pin bends.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CROSS-SECTION PROFILE & INTERVISIBILITY */}
      {activeTab === 'crosssection' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400">KNEC Section B 12-Mark Question</span>
                <h2 className="text-xl font-bold text-white mt-1">Cross-Section Elevation Profile &amp; Intervisibility</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Select two features to generate their topographic cross-section and test whether an observer at Point A can see Point B.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Ground Distance: </span>
                  <strong className="text-emerald-400">{distKm} km</strong> ({distGroundMeters} m)
                </div>
                <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Height Diff: </span>
                  <strong className="text-cyan-400">{elevDiff} m</strong>
                </div>
              </div>
            </div>

            {/* Selector controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Observer Station (Point A):</label>
                <select
                  value={selectedPointA}
                  onChange={(e) => setSelectedPointA(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:ring-1 focus:ring-emerald-500"
                >
                  {mapFeatures.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} (Elev: {f.elevation}m, Grid: {f.gridRef6})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Target Station (Point B):</label>
                <select
                  value={selectedPointB}
                  onChange={(e) => setSelectedPointB(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:ring-1 focus:ring-emerald-500"
                >
                  {mapFeatures.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} (Elev: {f.elevation}m, Grid: {f.gridRef6})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cross Section Visual Profile */}
            <div className="mt-6 bg-slate-950 border border-slate-800 rounded-xl p-6">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
                <span>Point A: {featA.name.split(' ')[0]} ({featA.elevation}m)</span>
                <span>Vertical Scale: 1 cm rep 20m · Horizontal Scale: 1:50,000</span>
                <span>Point B: {featB.name.split(' ')[0]} ({featB.elevation}m)</span>
              </div>

              <div className="h-56 relative border-l border-b border-slate-700">
                <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                  {/* Grid lines for elevation */}
                  {[1800, 1900, 2000, 2100, 2200, 2300].map((h, i) => {
                    const y = 180 - ((h - 1800) / 500) * 160;
                    return (
                      <g key={h}>
                        <line x1="0" y1={y} x2="600" y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
                        <text x="-5" y={y + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                          {h}m
                        </text>
                      </g>
                    );
                  })}

                  {/* Topographic profile curve */}
                  <path
                    d={
                      hasObstruction
                        ? `M 20 ${180 - ((featA.elevation - 1800) / 500) * 160} Q 150 140 280 20 T 420 120 T 580 ${180 - ((featB.elevation - 1800) / 500) * 160}`
                        : `M 20 ${180 - ((featA.elevation - 1800) / 500) * 160} Q 300 ${140 - Math.min(featA.elevation, featB.elevation) / 25} 580 ${180 - ((featB.elevation - 1800) / 500) * 160}`
                    }
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />

                  {/* Sight line between A and B */}
                  <line
                    x1="20"
                    y1={180 - ((featA.elevation - 1800) / 500) * 160}
                    x2="580"
                    y2={180 - ((featB.elevation - 1800) / 500) * 160}
                    stroke={hasObstruction ? "#ef4444" : "#38bdf8"}
                    strokeWidth="2"
                    strokeDasharray={hasObstruction ? "4 3" : "none"}
                  />

                  {/* Station Pins */}
                  <circle cx="20" cy={180 - ((featA.elevation - 1800) / 500) * 160} r="5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
                  <circle cx="580" cy={180 - ((featB.elevation - 1800) / 500) * 160} r="5" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Intervisibility verdict card */}
              <div
                className={`mt-4 p-4 rounded-xl border flex items-center gap-3 text-xs ${
                  hasObstruction
                    ? 'bg-rose-950/40 border-rose-800 text-rose-200'
                    : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                }`}
              >
                {hasObstruction ? (
                  <>
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <strong className="block font-bold">NOT INTERVISIBLE (Intervisibility: NO)</strong>
                      <span>The line of sight between {featA.name.split(' ')[0]} and {featB.name.split(' ')[0]} is obstructed by intervening high ground (Kaisugat Volcanic Ridge). An observer at station A cannot see station B.</span>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="block font-bold">INTERVISIBLE (Intervisibility: YES)</strong>
                      <span>The straight line of sight is clear of all intervening hills, ridges, or vegetation obstacles. An observer at {featA.name.split(' ')[0]} has an unobstructed direct visual line to {featB.name.split(' ')[0]}.</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SURVEY OF KENYA SYMBOLS & LEGEND */}
      {activeTab === 'legend' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-emerald-400">Official Survey of Kenya Map Specification</span>
            <h2 className="text-xl font-bold text-white mt-1">Standard 1:50,000 Conventional Signs &amp; Symbols</h2>
            <p className="text-xs text-slate-400 mt-1">
              Familiarity with these exact symbols is tested in KCSE Geography Paper 1 Section A (Questions 1 to 5).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              {
                title: 'Primary Trigonometrical Station',
                badge: 'Triangulation',
                color: 'text-red-400 border-red-800',
                desc: 'A triangle with a central dot and station number. Indicates highest precision national geodetic survey point.'
              },
              {
                title: 'Contour Lines & Index Contours',
                badge: 'Relief (Brown)',
                color: 'text-amber-400 border-amber-800',
                desc: 'Continuous brown lines joining points of equal elevation above mean sea level. Thickened index contours appear every 100m.'
              },
              {
                title: 'All-Weather Bound Road (Tarmac)',
                badge: 'Transport (Red/Orange)',
                color: 'text-orange-400 border-orange-800',
                desc: 'Parallel solid red lines filled with red or orange. Passable in all rainy seasons without mud obstruction.'
              },
              {
                title: 'All-Weather Loose Surface (Murram)',
                badge: 'Transport (Dashed Red)',
                color: 'text-yellow-400 border-yellow-800',
                desc: 'Parallel dashed red or solid with dashed border lines. May become slippery during heavy downpours.'
              },
              {
                title: 'Permanent River & Direction of Flow',
                badge: 'Drainage (Blue)',
                color: 'text-cyan-400 border-cyan-800',
                desc: 'Continuous solid blue line. Arrow on river shows flow direction from higher contours to lower contours.'
              },
              {
                title: 'Papyrus Swamp & Marshland',
                badge: 'Vegetation (Green/Blue)',
                color: 'text-emerald-400 border-emerald-800',
                desc: 'Tuft symbols arranged horizontally in water bodies. Indicates high water table and poor drainage.'
              },
              {
                title: 'Tea Estate / Plantation',
                badge: 'Agriculture',
                color: 'text-lime-400 border-lime-800',
                desc: 'Lettered abbreviation "Tea" surrounded by neatly bounded estate perimeters.'
              },
              {
                title: 'Forest Reserve & Ranger Post',
                badge: 'Administrative',
                color: 'text-emerald-400 border-emerald-800',
                desc: 'Solid green shaded polygon with dashed administrative boundary and "Forest Reserve" (F.R.) mark.'
              },
              {
                title: 'Social Services (Ch, Sch, Hosp, Disp)',
                badge: 'Settlement',
                color: 'text-purple-400 border-purple-800',
                desc: 'Ch = Church, Sch = School, Hosp = Hospital, Disp = Dispensary, PO = Post Office, DC = District Commissioner.'
              }
            ].map((sym, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-sm">{sym.title}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${sym.color}`}>
                      {sym.badge}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{sym.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FIELDWORK MASTER METHODOLOGY */}
      {activeTab === 'fieldwork' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400">KNEC Geography Paper 1 Section B</span>
                <h2 className="text-xl font-bold text-white mt-1">Fieldwork Study Planning &amp; Marking Rubric</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Step-by-step master guide for framing hypotheses, stating objectives, selecting data collection methods, and addressing follow-up activities.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Select Case Topic:</span>
                <select
                  value={selectedFieldworkTopic}
                  onChange={(e) => setSelectedFieldworkTopic(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-emerald-400 font-semibold text-xs rounded-lg px-3 py-2"
                >
                  <option value="river">River Drainage &amp; Fluvial Landforms</option>
                  <option value="agriculture">Tea Farming &amp; Processing Factory</option>
                  <option value="settlement">Settlement Patterns &amp; Urban Land Use</option>
                </select>
              </div>
            </div>

            {/* Selected Topic Breakdown */}
            {(() => {
              const guide = fieldworkGuides[selectedFieldworkTopic] || fieldworkGuides.river;
              return (
                <div className="space-y-6">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h3 className="text-base font-bold text-white mb-2">{guide.title}</h3>
                    <div className="text-xs text-emerald-400 font-mono">
                      Target KNEC Marks in Section B: 12 - 15 Marks
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Objectives & Hypotheses */}
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Workable Objectives (Must begin with "To determine/investigate/find out")
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-300">
                          {guide.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-400 font-mono font-bold">{i + 1}.</span>
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-slate-800 pt-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-2">
                          <Compass className="w-4 h-4 text-cyan-400" />
                          Formulated Hypotheses
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-300">
                          {guide.hypotheses.map((hyp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-cyan-400 font-mono font-bold">•</span>
                              <span className="italic">"{hyp}"</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Data Collection & Tools */}
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-2">
                          <Ruler className="w-4 h-4 text-amber-400" />
                          Methods of Data Collection
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-300">
                          {guide.methods.map((met, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-amber-400 font-mono font-bold">✓</span>
                              <span>{met}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-slate-800 pt-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-2">
                          Tools &amp; Equipment Carried to Field
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {guide.tools.map((tool, i) => (
                            <span key={i} className="bg-slate-900 border border-slate-700 text-slate-300 text-[11px] px-2.5 py-1 rounded-md">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Follow-Up Activities & KNEC Examiner Secrets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-2">
                        Post-Fieldwork Follow-Up Activities
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {guide.followUp.map((act, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400">→</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-emerald-950/30 p-5 rounded-xl border border-emerald-800/60">
                      <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4 text-emerald-400" />
                        KNEC Examiner Marking Secrets
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-200">
                        {guide.knecTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">★</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
