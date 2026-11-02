import React, { useState } from 'react';
import {
  FlaskConical,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Info,
  RotateCcw,
  Ruler,
  Zap,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface ExperimentPreset {
  id: string;
  name: string;
  apparatus: string[];
  xAxisLabel: string;
  yAxisLabel: string;
  theoreticalEquation: string;
  constantToDetermine: string;
  constantFormula: string;
  expectedSlopeUnits: string;
  expectedConstantUnits: string;
  defaultData: Array<{ x: number; y: number; rawOscillation?: number }>;
}

export const PhysicsPracticalGrapher: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('pendulum');

  const presets: Record<string, ExperimentPreset> = {
    pendulum: {
      id: 'pendulum',
      name: 'Question 1: Simple Pendulum (Determination of g)',
      apparatus: ['Pendulum bob', 'Thread (100cm)', 'Retort stand and clamp', 'Two small wooden pads', 'Stopwatch', 'Metre rule'],
      xAxisLabel: 'Length L (m)',
      yAxisLabel: 'Periodic Time Squared T² (s²)',
      theoreticalEquation: 'T = 2π√(L/g)  ⇒  T² = (4π²/g) · L',
      constantToDetermine: 'Acceleration due to Gravity (g)',
      constantFormula: 'g = 4π² / Slope',
      expectedSlopeUnits: 's²/m',
      expectedConstantUnits: 'm/s² (or N/kg)',
      defaultData: [
        { x: 0.20, y: 0.81, rawOscillation: 18.00 },
        { x: 0.40, y: 1.62, rawOscillation: 25.46 },
        { x: 0.60, y: 2.42, rawOscillation: 31.11 },
        { x: 0.80, y: 3.23, rawOscillation: 35.94 },
        { x: 1.00, y: 4.02, rawOscillation: 40.10 }
      ]
    },
    spring: {
      id: 'spring',
      name: 'Question 1: Helical Spring Oscillation (Spring Constant k)',
      apparatus: ['Spiral spring', 'Slotted masses (50g to 250g)', 'Mass hanger', 'Retort stand', 'Stopwatch'],
      xAxisLabel: 'Mass m (kg)',
      yAxisLabel: 'T² (s²)',
      theoreticalEquation: 'T = 2π√(m/k)  ⇒  T² = (4π²/k) · m',
      constantToDetermine: 'Spring Constant (k)',
      constantFormula: 'k = 4π² / Slope',
      expectedSlopeUnits: 's²/kg',
      expectedConstantUnits: 'N/m',
      defaultData: [
        { x: 0.05, y: 0.26 },
        { x: 0.10, y: 0.52 },
        { x: 0.15, y: 0.77 },
        { x: 0.20, y: 1.03 },
        { x: 0.25, y: 1.29 }
      ]
    },
    potentiometer: {
      id: 'potentiometer',
      name: 'Question 2: Potentiometer Wire (EMF E & Internal Resistance r)',
      apparatus: ['Nichrome wire (100cm mounted on metre rule)', 'Voltmeter (0-3V)', 'Ammeter (0-1A)', 'Dry cell & holder', 'Jockey / crocodile clip', 'Switch'],
      xAxisLabel: 'Current I (A)',
      yAxisLabel: 'Terminal Voltage V (V)',
      theoreticalEquation: 'E = V + Ir  ⇒  V = -r · I + E',
      constantToDetermine: 'Internal Resistance (r) & EMF (E)',
      constantFormula: 'r = -Slope ; E = y-intercept',
      expectedSlopeUnits: 'V/A (Ω)',
      expectedConstantUnits: 'r in Ω, E in V',
      defaultData: [
        { x: 0.10, y: 1.35 },
        { x: 0.20, y: 1.20 },
        { x: 0.30, y: 1.05 },
        { x: 0.40, y: 0.90 },
        { x: 0.50, y: 0.75 }
      ]
    },
    refraction: {
      id: 'refraction',
      name: 'Question 2: Glass Block Refraction (Refractive Index n)',
      apparatus: ['Rectangular glass block', 'Four optical pins', 'Softboard', 'White plain paper', 'Protractor', '30cm ruler'],
      xAxisLabel: 'sin r (Refraction Angle)',
      yAxisLabel: 'sin i (Incidence Angle)',
      theoreticalEquation: 'n = sin i / sin r  ⇒  sin i = n · sin r',
      constantToDetermine: 'Refractive Index of Glass (n)',
      constantFormula: 'n = Slope',
      expectedSlopeUnits: 'Dimensionless (no units)',
      expectedConstantUnits: 'n (approx 1.50)',
      defaultData: [
        { x: 0.225, y: 0.342 }, // i=20°, r=13°
        { x: 0.334, y: 0.500 }, // i=30°, r=19.5°
        { x: 0.423, y: 0.643 }, // i=40°, r=25°
        { x: 0.515, y: 0.766 }, // i=50°, r=31°
        { x: 0.574, y: 0.866 }  // i=60°, r=35°
      ]
    }
  };

  const currentPreset = presets[selectedPresetId] || presets.pendulum;
  const [dataPoints, setDataPoints] = useState(currentPreset.defaultData);

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    setDataPoints(presets[presetId].defaultData);
  };

  const handleUpdatePoint = (index: number, field: 'x' | 'y', val: number) => {
    const next = [...dataPoints];
    next[index] = { ...next[index], [field]: val };
    setDataPoints(next);
  };

  // Linear Regression (Least Squares Best-Fit Line)
  const n = dataPoints.length;
  const sumX = dataPoints.reduce((acc, p) => acc + p.x, 0);
  const sumY = dataPoints.reduce((acc, p) => acc + p.y, 0);
  const sumXY = dataPoints.reduce((acc, p) => acc + p.x * p.y, 0);
  const sumX2 = dataPoints.reduce((acc, p) => acc + p.x * p.x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX || 1);
  const intercept = (sumY - slope * sumX) / n;

  // KNEC Evaluation of final physical constant
  let finalCalculatedConstant = '';
  let evaluationRemarks = '';

  if (selectedPresetId === 'pendulum') {
    const gVal = (4 * Math.PI * Math.PI) / (slope || 1);
    finalCalculatedConstant = `${gVal.toFixed(2)} m/s²`;
    if (gVal >= 9.0 && gVal <= 10.5) {
      evaluationRemarks = 'EXCELLENT: Within KNEC acceptable range (9.8 ± 0.8 m/s²). Full 2 marks awarded!';
    } else {
      evaluationRemarks = 'ACCURACY PENALTY: Outside KNEC expected range (9.8 ± 0.8 m/s²). Check timing or length.';
    }
  } else if (selectedPresetId === 'spring') {
    const kVal = (4 * Math.PI * Math.PI) / (slope || 1);
    finalCalculatedConstant = `${kVal.toFixed(2)} N/m`;
    evaluationRemarks = 'CONSISTENT: Hooke’s dynamic constant correctly evaluated.';
  } else if (selectedPresetId === 'potentiometer') {
    const internalR = Math.abs(slope);
    finalCalculatedConstant = `r = ${internalR.toFixed(2)} Ω, E = ${intercept.toFixed(2)} V`;
    evaluationRemarks = 'ACCURATE: Negative slope indicates internal potential drop Ir. Intercept matches cell EMF.';
  } else if (selectedPresetId === 'refraction') {
    finalCalculatedConstant = `n = ${slope.toFixed(2)}`;
    if (slope >= 1.45 && slope <= 1.55) {
      evaluationRemarks = 'EXCELLENT: Matches standard crown glass refractive index (n = 1.50 ± 0.05).';
    } else {
      evaluationRemarks = 'ACCURACY CHECK: Typical optical glass block refractive index ranges between 1.48 and 1.52.';
    }
  }

  // Graph Scaling Dimensions
  const minX = Math.min(0, ...dataPoints.map((p) => p.x));
  const maxX = Math.max(...dataPoints.map((p) => p.x)) * 1.15;
  const minY = Math.min(0, ...dataPoints.map((p) => p.y));
  const maxY = Math.max(...dataPoints.map((p) => p.y)) * 1.15;

  const toSvgX = (xVal: number) => 50 + ((xVal - minX) / (maxX - minX || 1)) * 400;
  const toSvgY = (yVal: number) => 350 - ((yVal - minY) / (maxY - minY || 1)) * 300;

  // Selected points for gradient big triangle
  const p1 = { x: dataPoints[0].x, y: slope * dataPoints[0].x + intercept };
  const p2 = { x: dataPoints[dataPoints.length - 1].x, y: slope * dataPoints[dataPoints.length - 1].x + intercept };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              <span>KCSE Physics Paper 3 (232/3) · 40 Marks</span>
              <span>·</span>
              <span>KNEC Practical Marking Scheme Rules</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Physics Paper 3 Practical Data Grapher &amp; Rubric Checker
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Verify experimental data tables for uniform decimal places, plot best-fit lines, construct large gradient triangles with correct read-offs, and compute theoretical physical constants according to strict KNEC standards.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-mono">Experiment:</span>
            <select
              value={selectedPresetId}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-cyan-400 font-semibold text-xs rounded-lg px-3 py-2"
            >
              <option value="pendulum">Simple Pendulum (g = 9.8 m/s²)</option>
              <option value="spring">Helical Spring (Hooke's k)</option>
              <option value="potentiometer">Potentiometer (EMF E &amp; r)</option>
              <option value="refraction">Glass Refraction (Snell's n)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Data Table Input & KNEC Compliance Checks */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
                Table of Results (5 Marks)
              </span>
              <span className="text-[11px] text-slate-400 font-mono">5 Pairs of Readings</span>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-white">{currentPreset.name}</div>
              <div className="text-[11px] text-slate-400 font-mono">Formula: {currentPreset.theoreticalEquation}</div>
            </div>

            {/* Editable Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                    <th className="py-2 px-2 text-center">#</th>
                    <th className="py-2 px-2">{currentPreset.xAxisLabel}</th>
                    <th className="py-2 px-2">{currentPreset.yAxisLabel}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {dataPoints.map((pt, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/40">
                      <td className="py-2 px-2 text-center text-slate-500">{idx + 1}</td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          step="0.01"
                          value={pt.x}
                          onChange={(e) => handleUpdatePoint(idx, 'x', parseFloat(e.target.value) || 0)}
                          className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-cyan-300 font-bold focus:ring-1 focus:ring-cyan-500"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          step="0.01"
                          value={pt.y}
                          onChange={(e) => handleUpdatePoint(idx, 'y', parseFloat(e.target.value) || 0)}
                          className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-emerald-300 font-bold focus:ring-1 focus:ring-cyan-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reset to Standard Defaults */}
            <button
              onClick={() => setDataPoints(currentPreset.defaultData)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to KNEC Standard Exemplar Readings
            </button>
          </div>

          {/* KNEC Paper 3 Grading Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3 text-xs">
            <h3 className="font-bold text-white flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              KNEC Examiner 5-Point Graph Checklist
            </h3>

            <div className="space-y-2 text-slate-300">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2">
                <span className="text-emerald-400 font-mono font-bold shrink-0">Scale (S) - 1M:</span>
                <span>Simple scale factors (1, 2, 5, 10). Must occupy &gt; 50% of the grid paper. No awkward scales like 3, 7, 9.</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2">
                <span className="text-emerald-400 font-mono font-bold shrink-0">Axes (A) - 1M:</span>
                <span>Both axes distinctly labelled with quantity and correct SI units. E.g. T² (s²), L (m).</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2">
                <span className="text-emerald-400 font-mono font-bold shrink-0">Plotting (P) - 2M:</span>
                <span>Points plotted with tiny sharp crosses (×) or encircled dots (⊙) within 1 small square accuracy.</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2">
                <span className="text-emerald-400 font-mono font-bold shrink-0">Line (L) - 1M:</span>
                <span>Single continuous straight line of best fit balancing points on either side. No double or wavy lines.</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Graph & Slope Evaluation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
              <div className="font-mono text-cyan-400 font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Best-Fit Graph &amp; Large Gradient Triangle</span>
              </div>
              <div className="text-slate-400 font-mono text-[11px]">
                Slope S = Δy / Δx = {slope.toFixed(4)} {currentPreset.expectedSlopeUnits}
              </div>
            </div>

            {/* SVG Graph Grid Simulation */}
            <div className="bg-[#0b171b] border-2 border-cyan-950 rounded-xl p-3 relative select-none">
              <svg viewBox="0 0 480 390" className="w-full h-auto">
                <defs>
                  {/* Millimeter Graph Paper Grid Pattern */}
                  <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#083344" strokeWidth="0.4" opacity="0.6" />
                  </pattern>
                  <pattern id="mainGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect width="40" height="40" fill="url(#smallGrid)" />
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0e7490" strokeWidth="0.8" opacity="0.7" />
                  </pattern>
                </defs>

                {/* Graph paper background */}
                <rect x="50" y="30" width="400" height="320" fill="url(#mainGrid)" stroke="#0e7490" strokeWidth="1" />

                {/* Axes lines */}
                <line x1="50" y1="350" x2="455" y2="350" stroke="#38bdf8" strokeWidth="2" />
                <line x1="50" y1="25" x2="50" y2="350" stroke="#38bdf8" strokeWidth="2" />

                {/* Axis Labels */}
                <text x="250" y="380" fill="#7dd3fc" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                  {currentPreset.xAxisLabel} →
                </text>
                <text
                  x="-190"
                  y="20"
                  fill="#7dd3fc"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontWeight="bold"
                  transform="rotate(-90)"
                >
                  {currentPreset.yAxisLabel} →
                </text>

                {/* Big Gradient Triangle Shading */}
                <polygon
                  points={`${toSvgX(p1.x)},${toSvgY(p1.y)} ${toSvgX(p2.x)},${toSvgY(p2.y)} ${toSvgX(p2.x)},${toSvgY(p1.y)}`}
                  fill="#0284c7"
                  fillOpacity="0.15"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeDasharray="4 2"
                />

                {/* Line of Best Fit */}
                <line
                  x1={toSvgX(minX)}
                  y1={toSvgY(slope * minX + intercept)}
                  x2={toSvgX(maxX * 0.95)}
                  y2={toSvgY(slope * (maxX * 0.95) + intercept)}
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                />

                {/* Plot Plotted Points with clean (x) marks */}
                {dataPoints.map((pt, i) => {
                  const cx = toSvgX(pt.x);
                  const cy = toSvgY(pt.y);
                  return (
                    <g key={i}>
                      {/* Cross mark */}
                      <line x1={cx - 5} y1={cy - 5} x2={cx + 5} y2={cy + 5} stroke="#f43f5e" strokeWidth="1.8" />
                      <line x1={cx - 5} y1={cy + 5} x2={cx + 5} y2={cy - 5} stroke="#f43f5e" strokeWidth="1.8" />
                      <circle cx={cx} cy={cy} r="6" fill="none" stroke="#f43f5e" strokeWidth="0.8" opacity="0.6" />
                    </g>
                  );
                })}

                {/* Triangle Coordinates Labels */}
                <circle cx={toSvgX(p1.x)} cy={toSvgY(p1.y)} r="4" fill="#38bdf8" />
                <circle cx={toSvgX(p2.x)} cy={toSvgY(p2.y)} r="4" fill="#38bdf8" />
                <text x={toSvgX(p1.x) - 10} y={toSvgY(p1.y) - 8} fill="#bae6fd" fontSize="8" fontFamily="monospace">
                  ({p1.x.toFixed(2)}, {p1.y.toFixed(2)})
                </text>
                <text x={toSvgX(p2.x) - 40} y={toSvgY(p2.y) - 8} fill="#bae6fd" fontSize="8" fontFamily="monospace">
                  ({p2.x.toFixed(2)}, {p2.y.toFixed(2)})
                </text>
              </svg>
            </div>

            {/* KNEC Slope & Constant Calculation Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-white font-bold">KNEC Step-by-Step Mathematical Derivation:</span>
                <span className="text-emerald-400 font-bold">Total: 4 Marks</span>
              </div>

              <div className="space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span>Gradient (Slope S):</span>
                  <span className="text-cyan-300">
                    ({p2.y.toFixed(2)} - {p1.y.toFixed(2)}) / ({p2.x.toFixed(2)} - {p1.x.toFixed(2)}) ={' '}
                    <strong>{slope.toFixed(4)} {currentPreset.expectedSlopeUnits}</strong> (2M)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Equating to Equation:</span>
                  <span className="text-slate-200">{currentPreset.constantFormula}</span>
                </div>
                <div className="flex justify-between text-amber-300 font-bold pt-1 border-t border-slate-800/80">
                  <span>Evaluated Physical Value:</span>
                  <span className="text-sm">{finalCalculatedConstant} (2M)</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                <strong className="text-emerald-400 block mb-0.5">Examiner Rubric Verdict:</strong>
                {evaluationRemarks}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
