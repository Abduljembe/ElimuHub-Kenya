import React, { useState } from 'react';
import {
  TrendingUp,
  Maximize2,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Compass,
  Layers,
  Sparkles,
  BarChart2
} from 'lucide-react';

export function MathGraphVisualizer() {
  const [activeTab, setActiveTab] = useState<'lp' | 'trig'>('lp');

  // Linear Programming state
  // Problem: Desk (x) & Chair (y)
  // 1: 2x + y <= 40 (carpentry)
  // 2: x + 3y <= 45 (varnishing)
  // 3: x >= 5
  // 4: y >= 4
  // Objective Profit: P = 800x + 1200y
  const [searchLineK, setSearchLineK] = useState<number>(24000); // K = 800x + 1200y => y = (K - 800x)/1200

  // Trigonometric curves state
  const [trigFunc, setTrigFunc] = useState<'sin' | 'cos'>('sin');
  const [amplitude, setAmplitude] = useState<number>(2); // a
  const [frequency, setFrequency] = useState<number>(2); // b
  const [phaseShift, setPhaseShift] = useState<number>(0); // c in degrees
  const [verticalShift, setVerticalShift] = useState<number>(0);

  // SVG coordinate transform for LP (domain x in [0, 25], y in [0, 20])
  const svgWidth = 500;
  const svgHeight = 400;
  const padding = 50;

  const toSvgX = (x: number) => padding + (x / 25) * (svgWidth - 2 * padding);
  const toSvgY = (y: number) => svgHeight - padding - (y / 20) * (svgHeight - 2 * padding);

  // Vertices of the feasible polygon:
  // (5, 4)
  // (18, 4) -> from 2x + 4 = 40 => 2x = 36 => x = 18
  // (15, 10) -> intersection of 2x + y = 40 and x + 3y = 45 => 5y = 50 => y = 10, x = 15
  // (5, 13.33) -> x=5 on x+3y=45 => 3y=40 => y = 13.33. Integer candidates: (5, 13)
  const vertices = [
    { x: 5, y: 4, profit: 800 * 5 + 1200 * 4 },
    { x: 18, y: 4, profit: 800 * 18 + 1200 * 4 },
    { x: 15, y: 10, profit: 800 * 15 + 1200 * 10 },
    { x: 5, y: 13, profit: 800 * 5 + 1200 * 13 }
  ];

  // Feasible polygon SVG path
  const polygonPoints = `
    ${toSvgX(5)},${toSvgY(4)} 
    ${toSvgX(18)},${toSvgY(4)} 
    ${toSvgX(15)},${toSvgY(10)} 
    ${toSvgX(5)},${toSvgY(13.33)}
  `;

  // Search Line points: 800x + 1200y = K => 2x + 3y = K/400
  // When x = 0, y = K / 1200
  // When y = 0, x = K / 800
  const searchX0 = 0;
  const searchY0 = searchLineK / 1200;
  const searchYEnd = 0;
  const searchXEnd = searchLineK / 800;

  // Trig generation: 0 to 360 degrees
  const trigPoints: { deg: number; val: number }[] = [];
  for (let deg = 0; deg <= 360; deg += 5) {
    const rad = ((deg * frequency + phaseShift) * Math.PI) / 180;
    const yVal = amplitude * (trigFunc === 'sin' ? Math.sin(rad) : Math.cos(rad)) + verticalShift;
    trigPoints.push({ deg, val: yVal });
  }

  const trigSvgPoints = trigPoints
    .map((p) => {
      const sx = padding + (p.deg / 360) * (svgWidth - 2 * padding);
      const sy = svgHeight / 2 - (p.val / 4) * (svgHeight / 2 - padding);
      return `${sx},${sy}`;
    })
    .join(' ');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-900 via-purple-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-violet-700/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider border border-purple-400/30">
              <TrendingUp className="w-3.5 h-3.5" />
              KCSE Mathematics Paper 2 (121/2) Visualizer
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Linear Programming & Trigonometric Curves Lab
            </h1>
            <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed">
              Master the compulsory 10-mark KNEC Linear Programming procedure: shading unwanted regions, determining
              feasible vertices, and sweeping objective function search lines to find optimal integer profits.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('lp')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'lp'
                  ? 'bg-amber-400 text-slate-950 shadow-lg font-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              1. Linear Programming (10 Mks)
            </button>
            <button
              onClick={() => setActiveTab('trig')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'trig'
                  ? 'bg-amber-400 text-slate-950 shadow-lg font-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              2. Trig Waves y = a sin(bx+c)
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'lp' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SVG Graph Canvas */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                  KCSE Coordinate Plane & Feasible Region (R)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  KNEC Shading Rule: Unwanted Region Shaded
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">Scale: 1 cm = 2 units</span>
            </div>

            {/* SVG Render */}
            <div className="flex justify-center bg-slate-950 rounded-xl p-2 border border-slate-800 overflow-x-auto">
              <svg width={svgWidth} height={svgHeight} className="overflow-visible">
                {/* Background Grid */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                  </pattern>
                  <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.35" />
                  </pattern>
                </defs>
                <rect width={svgWidth} height={svgHeight} fill="#090d16" />
                <rect x={padding} y={padding} width={svgWidth - 2 * padding} height={svgHeight - 2 * padding} fill="url(#grid)" />

                {/* Axes */}
                <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding + 20} y2={svgHeight - padding} stroke="#94a3b8" strokeWidth="2" />
                <line x1={padding} y1={svgHeight - padding} x2={padding} y2={padding - 20} stroke="#94a3b8" strokeWidth="2" />

                {/* Axis Labels */}
                <text x={svgWidth - padding + 15} y={svgHeight - padding + 15} fill="#cbd5e1" fontSize="12" fontWeight="bold">
                  x (Desks)
                </text>
                <text x={padding - 35} y={padding - 10} fill="#cbd5e1" fontSize="12" fontWeight="bold">
                  y (Chairs)
                </text>

                {/* Ticks on X */}
                {[5, 10, 15, 20].map((val) => (
                  <g key={`x-${val}`}>
                    <line x1={toSvgX(val)} y1={svgHeight - padding} x2={toSvgX(val)} y2={svgHeight - padding + 5} stroke="#cbd5e1" strokeWidth="1.5" />
                    <text x={toSvgX(val)} y={svgHeight - padding + 18} fill="#94a3b8" fontSize="10" textAnchor="middle">
                      {val}
                    </text>
                  </g>
                ))}

                {/* Ticks on Y */}
                {[5, 10, 15].map((val) => (
                  <g key={`y-${val}`}>
                    <line x1={padding - 5} y1={toSvgY(val)} x2={padding} y2={toSvgY(val)} stroke="#cbd5e1" strokeWidth="1.5" />
                    <text x={padding - 12} y={toSvgY(val) + 4} fill="#94a3b8" fontSize="10" textAnchor="end">
                      {val}
                    </text>
                  </g>
                ))}

                {/* Feasible Region Polygon Highlight */}
                <polygon points={polygonPoints} fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="2" />
                <text x={toSvgX(10)} y={toSvgY(7)} fill="#34d399" fontSize="16" fontWeight="bold" textAnchor="middle">
                  R (Feasible)
                </text>

                {/* Boundary Line 1: 2x + y = 40 (passes through (10, 20) to (20, 0)) */}
                <line
                  x1={toSvgX(10)}
                  y1={toSvgY(20)}
                  x2={toSvgX(20)}
                  y2={toSvgY(0)}
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <text x={toSvgX(14)} y={toSvgY(13)} fill="#38bdf8" fontSize="10" fontWeight="bold">
                  2x + y = 40
                </text>

                {/* Boundary Line 2: x + 3y = 45 (passes through (0, 15) to (25, 6.66)) */}
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(15)}
                  x2={toSvgX(24)}
                  y2={toSvgY(7)}
                  stroke="#fbbf24"
                  strokeWidth="2"
                />
                <text x={toSvgX(19)} y={toSvgY(9)} fill="#fbbf24" fontSize="10" fontWeight="bold">
                  x + 3y = 45
                </text>

                {/* Boundary Line 3: x = 5 */}
                <line
                  x1={toSvgX(5)}
                  y1={toSvgY(0)}
                  x2={toSvgX(5)}
                  y2={toSvgY(18)}
                  stroke="#f472b6"
                  strokeWidth="2"
                />
                <text x={toSvgX(5) + 4} y={toSvgY(16)} fill="#f472b6" fontSize="10" fontWeight="bold">
                  x = 5
                </text>

                {/* Boundary Line 4: y = 4 */}
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(4)}
                  x2={toSvgX(23)}
                  y2={toSvgY(4)}
                  stroke="#a78bfa"
                  strokeWidth="2"
                />
                <text x={toSvgX(20)} y={toSvgY(4) - 5} fill="#a78bfa" fontSize="10" fontWeight="bold">
                  y = 4
                </text>

                {/* Vertices Dots */}
                {vertices.map((v, i) => (
                  <g key={i}>
                    <circle cx={toSvgX(v.x)} cy={toSvgY(v.y)} r="4" fill="#fbbf24" stroke="#000" strokeWidth="1.5" />
                    <text x={toSvgX(v.x) + 6} y={toSvgY(v.y) - 6} fill="#fef08a" fontSize="11" fontWeight="bold">
                      ({v.x}, {v.y})
                    </text>
                  </g>
                ))}

                {/* Search Line Z = 800x + 1200y = K */}
                <line
                  x1={toSvgX(searchX0)}
                  y1={toSvgY(searchY0)}
                  x2={toSvgX(searchXEnd)}
                  y2={toSvgY(searchYEnd)}
                  stroke="#ec4899"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                />
                <text x={toSvgX(searchX0) + 15} y={toSvgY(searchY0) + 12} fill="#f472b6" fontSize="11" fontWeight="bold">
                  Search Line (P = KSh {searchLineK.toLocaleString()})
                </text>
              </svg>
            </div>

            {/* Search Line Controller Slider */}
            <div className="pt-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-pink-500" />
                  Objective Function Search Line Sweep: P = 800x + 1200y
                </span>
                <span className="font-mono text-pink-600 dark:text-pink-400 font-bold">
                  P = KSh {searchLineK.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="8000"
                max="28000"
                step="500"
                value={searchLineK}
                onChange={(e) => setSearchLineK(Number(e.target.value))}
                className="w-full accent-pink-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>Min: KSh 8,000</span>
                <span className="text-emerald-500 font-bold">Optimal Peak: KSh 24,000 at (15, 10)</span>
                <span>Max: KSh 28,000</span>
              </div>
            </div>
          </div>

          {/* Right Column: KNEC Problem & Marking Steps */}
          <div className="lg:col-span-5 space-y-5">
            {/* The Formal Question */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-bold text-sm border-b border-slate-100 dark:border-slate-700 pb-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>KNEC Paper 2 Section II Question (10 Marks)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A carpenter produces desks (<span className="font-bold text-blue-600">x</span>) and chairs (
                <span className="font-bold text-amber-600">y</span>). Desks take 2h carpentry and 1h varnishing. Chairs
                take 1h carpentry and 3h varnishing. Maximum carpentry time is 40h; maximum varnishing time is 45h. He
                must make at least 5 desks and at least 4 chairs.
              </p>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800/50 text-xs">
                <div className="font-bold text-purple-900 dark:text-purple-200">Objective Function:</div>
                <div className="font-mono text-purple-700 dark:text-purple-400 font-bold mt-0.5">
                  Maximize Profit P = 800x + 1200y
                </div>
              </div>
            </div>

            {/* Vertex Evaluation Table */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200">
                Vertex Testing Method (Evaluation)
              </div>
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2.5">Vertex (x, y)</th>
                    <th className="p-2.5">Computation (800x + 1200y)</th>
                    <th className="p-2.5 text-right">Profit (KSh)</th>
                    <th className="p-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {vertices.map((v, i) => {
                    const isOptimal = v.profit === 24000;
                    return (
                      <tr
                        key={i}
                        className={
                          isOptimal
                            ? 'bg-emerald-50/70 dark:bg-emerald-950/40 font-bold'
                            : 'hover:bg-slate-50/50 dark:hover:bg-slate-700/30'
                        }
                      >
                        <td className="p-2.5 font-mono">({v.x}, {v.y})</td>
                        <td className="p-2.5 text-slate-500 font-mono">
                          800({v.x}) + 1200({v.y})
                        </td>
                        <td className="p-2.5 text-right font-mono font-bold text-slate-800 dark:text-slate-100">
                          {v.profit.toLocaleString()}
                        </td>
                        <td className="p-2.5 text-center">
                          {isOptimal ? (
                            <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                              MAXIMUM
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400">Feasible</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Examiner Warning */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                <AlertCircle className="w-4 h-4" />
                <span>KNEC Examiner Caution on Shading:</span>
              </div>
              <p className="leading-relaxed">
                In Kenya National Examinations, you MUST shade the <strong>UNWANTED REGION</strong>. Leaving the feasible
                region clean and unshaded with label &ldquo;R&rdquo; is strictly enforced. Inverting shading awards 0
                marks for the graph.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Trigonometric Waves Visualizer */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Wave Equation: y = {amplitude} {trigFunc}({frequency}x + {phaseShift}&deg;) {verticalShift !== 0 ? `+ ${verticalShift}` : ''}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setTrigFunc('sin')}
                  className={`px-3 py-1 rounded text-xs font-bold ${
                    trigFunc === 'sin' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Sine Wave
                </button>
                <button
                  onClick={() => setTrigFunc('cos')}
                  className={`px-3 py-1 rounded text-xs font-bold ${
                    trigFunc === 'cos' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Cosine Wave
                </button>
              </div>
            </div>

            {/* Trig SVG Wave */}
            <div className="flex justify-center bg-slate-950 rounded-xl p-2 border border-slate-800">
              <svg width={svgWidth} height={svgHeight} className="overflow-visible">
                <rect width={svgWidth} height={svgHeight} fill="#090d16" />
                {/* Horizontal Center Axis (y=0) */}
                <line x1={padding} y1={svgHeight / 2} x2={svgWidth - padding + 10} y2={svgHeight / 2} stroke="#64748b" strokeWidth="1.5" />
                <line x1={padding} y1={padding - 10} x2={padding} y2={svgHeight - padding + 10} stroke="#64748b" strokeWidth="1.5" />

                {/* X Degree Ticks */}
                {[0, 90, 180, 270, 360].map((deg) => {
                  const sx = padding + (deg / 360) * (svgWidth - 2 * padding);
                  return (
                    <g key={deg}>
                      <line x1={sx} y1={svgHeight / 2 - 4} x2={sx} y2={svgHeight / 2 + 4} stroke="#94a3b8" />
                      <text x={sx} y={svgHeight / 2 + 18} fill="#94a3b8" fontSize="10" textAnchor="middle">
                        {deg}&deg;
                      </text>
                    </g>
                  );
                })}

                {/* Y Value Ticks */}
                {[-3, -2, -1, 1, 2, 3].map((val) => {
                  const sy = svgHeight / 2 - (val / 4) * (svgHeight / 2 - padding);
                  return (
                    <g key={val}>
                      <line x1={padding - 4} y1={sy} x2={padding + 4} y2={sy} stroke="#94a3b8" />
                      <text x={padding - 10} y={sy + 3} fill="#94a3b8" fontSize="10" textAnchor="end">
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Plotted Sine/Cosine Curve */}
                <polyline fill="none" stroke="#a855f7" strokeWidth="3" points={trigSvgPoints} />
              </svg>
            </div>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Amplitude (a): {amplitude}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={amplitude}
                  onChange={(e) => setAmplitude(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Frequency (b): {frequency} (Period = {360 / frequency}&deg;)
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phase Angle (c): {phaseShift}&deg;
                </label>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  step="15"
                  value={phaseShift}
                  onChange={(e) => setPhaseShift(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Trigonometric Curve Properties
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex justify-between">
                  <span className="text-slate-500">Amplitude:</span>
                  <span className="font-bold text-purple-600">{amplitude}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex justify-between">
                  <span className="text-slate-500">Period (T):</span>
                  <span className="font-bold text-purple-600">{360 / frequency}&deg;</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex justify-between">
                  <span className="text-slate-500">Range:</span>
                  <span className="font-bold text-purple-600 font-mono">
                    [{verticalShift - amplitude}, {verticalShift + amplitude}]
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
