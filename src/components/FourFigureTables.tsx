import React, { useState } from 'react';
import {
  Calculator,
  Search,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  lookupLogarithm,
  lookupTrigRatio,
  FourFigureLookupResult
} from '../utils/fourFigureMath';

export const FourFigureTables: React.FC = () => {
  const [activeTable, setActiveTable] = useState<'log' | 'sin' | 'cos' | 'tan' | 'reciprocal'>('log');
  const [logInput, setLogInput] = useState<string>('567.4');
  const [trigAngleInput, setTrigAngleInput] = useState<string>('34.7');

  let result: FourFigureLookupResult;

  if (activeTable === 'log') {
    const parsed = parseFloat(logInput) || 1.0;
    result = lookupLogarithm(parsed);
  } else if (activeTable === 'sin' || activeTable === 'cos' || activeTable === 'tan') {
    const parsed = parseFloat(trigAngleInput) || 0.0;
    result = lookupTrigRatio(parsed, activeTable);
  } else {
    // Reciprocal
    const val = parseFloat(logInput) || 2.0;
    const recip = val !== 0 ? (1 / val).toFixed(4) : 'Undefined';
    result = {
      input: logInput,
      tableType: 'reciprocal',
      rowLabel: `Row ${logInput.substring(0, 2)}`,
      mainColumnLabel: 'Column 0',
      mainColumnValue: parseFloat(recip),
      intermediateSteps: [
        `Step 1: Express ${val} in standard form A × 10^n`,
        `Step 2: Read reciprocal of ${val} in Table of Reciprocals`,
        `Step 3: 1 / ${val} = ${recip}`
      ],
      finalResult: recip,
      knecRuleNote: 'Four-figure reciprocal tables only give positive decimal fractions. Watch powers of 10!'
    };
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
              <span>Official KNEC KCSE Mathematical Instruments</span>
              <span>·</span>
              <span>Elementary Mathematical Tables</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Digital Four-Figure Mathematical Tables
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Step-by-step visual tracer for official KNEC 4-figure tables. Learn row and column intersections, mean difference additions/subtractions, and avoid common examiner traps.
            </p>
          </div>
        </div>

        {/* Table Type Selector */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto text-xs font-medium">
          {[
            { id: 'log', label: 'Logarithms to Base 10' },
            { id: 'sin', label: 'Natural Sines (sin)' },
            { id: 'cos', label: 'Natural Cosines (cos - Subtract Diff!)' },
            { id: 'tan', label: 'Natural Tangents (tan)' },
            { id: 'reciprocal', label: 'Reciprocals (1/x)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTable(tab.id as any)}
              className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-colors border ${
                activeTable === tab.id
                  ? 'bg-emerald-600 border-emerald-500 text-white font-semibold shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Lookup Box + Visual Table Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input & Computation Tracer */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">
              Table Lookup Parameter:
            </span>
            {activeTable === 'log' || activeTable === 'reciprocal' ? (
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  Enter Number to Evaluate:
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="any"
                    value={logInput}
                    onChange={(e) => setLogInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. 567.4"
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap text-[11px] font-mono text-slate-400">
                  <span>Presets:</span>
                  {['0.0456', '3.142', '567.4', '9820'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setLogInput(p)}
                      className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-emerald-400"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  Enter Angle in Degrees (0° to 90°):
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="90"
                    value={trigAngleInput}
                    onChange={(e) => setTrigAngleInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. 34.7"
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap text-[11px] font-mono text-slate-400">
                  <span>Presets:</span>
                  {['15.4', '30.0', '45.0', '60.0', '72.3'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setTrigAngleInput(p)}
                      className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-emerald-400"
                    >
                      {p}°
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Table Intersection Callout */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
              Official Mathematical Table Intersections:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Row</span>
                <strong className="text-emerald-400 text-sm">{result.rowLabel}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Main Col</span>
                <strong className="text-cyan-400 text-sm">{result.mainColumnLabel}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Mean Diff</span>
                <strong className="text-amber-400 text-sm">
                  {result.meanDiffLabel ? result.meanDiffLabel.replace('Mean Diff ', '') : 'None'}
                </strong>
              </div>
            </div>

            {/* Final Answer Banner */}
            <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/60 rounded-xl text-center">
              <span className="text-[10px] font-mono text-emerald-300 uppercase block">
                Final 4-Figure Evaluation
              </span>
              <strong className="text-2xl font-mono text-white font-extrabold tracking-wider">
                {result.finalResult}
              </strong>
            </div>
          </div>

          {/* Examiner Rule Warning */}
          <div className="p-3.5 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs text-amber-200 space-y-1">
            <span className="font-bold text-[10px] font-mono uppercase text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              KNEC Examiner Protocol:
            </span>
            <p className="leading-relaxed">{result.knecRuleNote}</p>
          </div>
        </div>

        {/* Right: Step-by-Step Procedure */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Step-by-Step Table Calculation Procedure
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Follow the exact working required in Section 1 of KCSE Mathematics Paper 1 &amp; 2.
            </p>
          </div>

          <div className="space-y-3">
            {result.intermediateSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-200 leading-relaxed font-mono"
              >
                <span className="w-6 h-6 rounded-md bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          {/* Table Usage Guide Card */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
            <span className="text-cyan-400 font-bold font-mono text-[10px] uppercase block">
              Four-Figure Calculation Best Practices for Students:
            </span>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">•</span>
                <span>
                  <strong>Logarithmic Calculations Table:</strong> Always write down the 4 columns: <code className="text-cyan-300">No. | Log | Calculation</code> and present all steps clearly.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">•</span>
                <span>
                  <strong>Negative Characteristics:</strong> Always write negative characteristics with a bar (e.g., <code className="text-cyan-300">̄2.4561</code>). Do not write <code className="text-rose-400">-2.4561</code> because that implies the mantissa is also negative!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">•</span>
                <span>
                  <strong>Cosines Mean Difference:</strong> When finding Natural Cosines, <strong className="text-amber-300">SUBTRACT</strong> the mean difference from the main value, because $\cos\theta$ decreases as $\theta$ increases from $0^\circ$ to $90^\circ$.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
