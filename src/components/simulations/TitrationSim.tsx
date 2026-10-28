import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Droplets, Info, CheckCircle2 } from 'lucide-react';

export const TitrationSim: React.FC = () => {
  const [buretteVolume, setBuretteVolume] = useState<number>(0); // Volume added in cm3
  const [titrantMolarity, setTitrantMolarity] = useState<number>(0.10); // HCl in mol/dm3
  const [analyteVolume] = useState<number>(25.0); // Na2CO3 in cm3
  const [analyteMolarity] = useState<number>(0.05); // True Na2CO3 molarity
  const [indicator, setIndicator] = useState<'methyl_orange' | 'phenolphthalein'>('methyl_orange');
  const [isDripping, setIsDripping] = useState<boolean>(false);
  const [dropSpeed, setDropSpeed] = useState<number>(1); // drops per tick
  const [phHistory, setPhHistory] = useState<{ volume: number; ph: number }[]>([]);

  // Stoichiometry: Na2CO3 + 2HCl -> 2NaCl + H2O + CO2
  // moles of Na2CO3 = (0.05 * 25) / 1000 = 0.00125 mol
  // moles of HCl needed = 0.0025 mol
  // Volume of 0.1M HCl needed = (0.0025 / 0.1) * 1000 = 25.0 cm3
  const equivalenceVolume = (2 * analyteMolarity * analyteVolume) / titrantMolarity;

  // Compute live pH
  const computePH = (vAdded: number): number => {
    const molesBaseInitial = (analyteMolarity * analyteVolume) / 1000;
    const molesAcidAdded = (titrantMolarity * vAdded) / 1000;
    const totalVolume = (analyteVolume + vAdded) / 1000;

    if (vAdded < equivalenceVolume) {
      const remainingBaseMoles = molesBaseInitial - (molesAcidAdded / 2);
      const concBase = remainingBaseMoles / totalVolume;
      // Basic buffer regime ~ pH 11.5 down to 8.0
      const pOH = -Math.log10(Math.max(1e-14, concBase * 0.1 + 1e-4));
      return Math.min(11.8, Math.max(7.2, 14 - pOH));
    } else if (Math.abs(vAdded - equivalenceVolume) < 0.1) {
      return 7.0; // Equivalence point
    } else {
      const excessAcidMoles = molesAcidAdded - (2 * molesBaseInitial);
      const concAcid = excessAcidMoles / totalVolume;
      const ph = -Math.log10(Math.max(1e-7, concAcid));
      return Math.max(1.2, Math.min(6.8, ph));
    }
  };

  const currentPH = computePH(buretteVolume);

  // Indicator color
  const getSolutionColor = (): { bg: string; text: string; label: string } => {
    if (indicator === 'methyl_orange') {
      if (currentPH > 4.4) return { bg: 'rgba(250, 204, 21, 0.75)', text: '#A16207', label: 'Yellow (Alkaline/Neutral)' };
      if (currentPH >= 3.1) return { bg: 'rgba(251, 146, 60, 0.85)', text: '#C2410C', label: 'Orange (Equivalence Endpoint)' };
      return { bg: 'rgba(239, 68, 68, 0.85)', text: '#B91C1C', label: 'Pink / Red (Acidic Excess)' };
    } else {
      // Phenolphthalein
      if (currentPH > 8.3) return { bg: 'rgba(236, 72, 153, 0.75)', text: '#BE185D', label: 'Magenta / Pink (Alkaline)' };
      return { bg: 'rgba(241, 245, 249, 0.6)', text: '#475569', label: 'Colourless (Neutral/Acidic)' };
    }
  };

  // Dripping animation interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDripping && buretteVolume < 50) {
      timer = setInterval(() => {
        setBuretteVolume((prev) => {
          const next = Math.min(50, +(prev + 0.15 * dropSpeed).toFixed(2));
          return next;
        });
      }, 80);
    }
    return () => clearInterval(timer);
  }, [isDripping, dropSpeed, buretteVolume]);

  // Keep pH history up to current volume
  useEffect(() => {
    const points: { volume: number; ph: number }[] = [];
    for (let v = 0; v <= buretteVolume; v += 1) {
      points.push({ volume: v, ph: computePH(v) });
    }
    points.push({ volume: buretteVolume, ph: currentPH });
    setPhHistory(points);
  }, [buretteVolume]);

  const handleAddDrop = () => {
    setBuretteVolume((prev) => Math.min(50, +(prev + 0.05).toFixed(2)));
  };

  const handleReset = () => {
    setIsDripping(false);
    setBuretteVolume(0);
  };

  const solColor = getSolutionColor();
  const isAtEndpoint = Math.abs(buretteVolume - equivalenceVolume) <= 0.3;

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Virtual Chemistry Bench · KCSE Paper 3</span>
          <h3 className="text-xl font-bold text-white mt-1">Acid-Base Volumetric Titration Simulator</h3>
          <p className="text-xs text-slate-400 mt-0.5">0.10M HCl (Burette) vs 25.0cm³ Na₂CO₃ (Conical Flask)</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDripping(!isDripping)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors ${
              isDripping ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isDripping ? 'animate-pulse' : ''}`} />
            {isDripping ? 'Stop Stopcock' : 'Open Stopcock (Auto Drip)'}
          </button>
          <button
            onClick={handleAddDrop}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
          >
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            +0.05 cm³ (1 Drop)
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stage Zone: Visual Glassware Bench */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 flex flex-col items-center relative overflow-hidden min-h-[440px]">
          {isAtEndpoint && (
            <div className="absolute top-3 left-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 z-20">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Equivalence Point Reached: {buretteVolume.toFixed(2)} cm³
            </div>
          )}

          {/* Burette, Stand, Stopcock, and Flask SVG Graphic */}
          <div className="relative w-full max-w-[340px] h-[360px] flex justify-center items-end">
            {/* Stand Post */}
            <div className="absolute left-[38%] top-4 bottom-2 w-2.5 bg-slate-600 rounded-sm" />
            <div className="absolute left-[28%] bottom-2 w-32 h-3 bg-slate-700 rounded-md" />
            {/* Clamp holding burette */}
            <div className="absolute left-[38%] top-20 w-12 h-2.5 bg-slate-500 rounded" />
            <div className="absolute left-[48%] top-16 w-8 h-10 border-2 border-slate-500 rounded-sm pointer-events-none" />

            {/* Burette Tube */}
            <div className="relative z-10 w-8 h-56 bg-slate-800/60 border border-slate-400/50 rounded-t-sm flex flex-col justify-end overflow-hidden shadow-inner">
              {/* Liquid inside burette */}
              <div
                className="w-full bg-cyan-400/40 border-t border-cyan-300 transition-all duration-100"
                style={{ height: `${Math.max(0, ((50 - buretteVolume) / 50) * 100)}%` }}
              />
              {/* Millimeter graduation ticks */}
              <div className="absolute inset-0 flex flex-col justify-between py-2 px-1 text-[7px] text-slate-400 font-mono select-none pointer-events-none">
                <span className="border-b border-slate-500 w-2">0</span>
                <span className="border-b border-slate-500 w-2">10</span>
                <span className="border-b border-slate-500 w-2">20</span>
                <span className="border-b border-slate-500 w-2">30</span>
                <span className="border-b border-slate-500 w-2">40</span>
                <span className="border-b border-slate-500 w-2">50</span>
              </div>
            </div>

            {/* Stopcock valve */}
            <div className="relative z-10 w-4 h-5 bg-slate-700 border border-slate-500 flex items-center justify-center -mt-0.5">
              <div className={`w-6 h-1.5 bg-amber-500 rounded-full transition-transform ${isDripping ? 'rotate-90' : 'rotate-0'}`} />
            </div>

            {/* Burette tip */}
            <div className="relative z-10 w-1.5 h-6 bg-slate-400/60" />

            {/* Falling drop animation */}
            {isDripping && (
              <div className="absolute top-[282px] z-10 w-2 h-2.5 bg-cyan-300 rounded-full animate-bounce" />
            )}

            {/* Conical Flask */}
            <div className="relative z-10 w-36 h-28 flex flex-col items-center">
              {/* Flask neck */}
              <div className="w-8 h-6 bg-slate-800/40 border-x border-slate-400/60" />
              {/* Flask body trapezoid */}
              <div
                className="w-36 h-22 border-b-2 border-x-2 border-slate-400/60 rounded-b-xl relative overflow-hidden flex items-end justify-center transition-colors duration-300"
                style={{
                  clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
                  background: 'rgba(30, 41, 59, 0.4)'
                }}
              >
                {/* Analyte solution liquid inside flask */}
                <div
                  className="w-full transition-colors duration-500 flex items-center justify-center shadow-lg"
                  style={{
                    height: `${Math.min(90, 45 + (buretteVolume / 50) * 35)}%`,
                    backgroundColor: solColor.bg
                  }}
                >
                  <span className="text-[10px] font-bold text-slate-900/80 mb-1">
                    {(analyteVolume + buretteVolume).toFixed(1)} cm³
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Status Bar */}
          <div className="w-full mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs px-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Solution Color:</span>
              <span className="font-semibold" style={{ color: solColor.text }}>
                {solColor.label}
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono">
              <span className="text-slate-400">pH: <strong className="text-cyan-400">{currentPH.toFixed(2)}</strong></span>
              <span className="text-slate-400">Titre: <strong className="text-emerald-400">{buretteVolume.toFixed(2)} cm³</strong></span>
            </div>
          </div>
        </div>

        {/* Right Zone: Controls, Real-Time Titration Curve, and Stoichiometry */}
        <div className="lg:col-span-5 space-y-4">
          {/* Controls Deck */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Experimental Parameters</h4>

            <div>
              <label className="text-xs text-slate-300 mb-1.5 block">Choose Indicator:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIndicator('methyl_orange')}
                  className={`px-3 py-2 text-xs rounded-lg font-medium border text-left transition-colors ${
                    indicator === 'methyl_orange'
                      ? 'bg-amber-950/40 border-amber-500/80 text-amber-200'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Methyl Orange (Yellow → Orange pH 3.1-4.4)
                </button>
                <button
                  onClick={() => setIndicator('phenolphthalein')}
                  className={`px-3 py-2 text-xs rounded-lg font-medium border text-left transition-colors ${
                    indicator === 'phenolphthalein'
                      ? 'bg-pink-950/40 border-pink-500/80 text-pink-200'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Phenolphthalein (Pink → Clear pH 8.3-10)
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Drip Speed Rate:</span>
                <span className="font-mono text-cyan-400">{dropSpeed}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={dropSpeed}
                onChange={(e) => setDropSpeed(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time pH Titration Curve Canvas */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Live Titration Curve (pH vs Volume)</h4>
              <span className="text-[11px] font-mono text-slate-400">Eq Point: 25.0 cm³</span>
            </div>

            <div className="w-full h-36 bg-slate-900/60 rounded-lg border border-slate-800/80 p-2 relative flex items-end">
              {/* Axes Labels */}
              <div className="absolute top-1 left-2 text-[9px] text-slate-500 font-mono">pH 14</div>
              <div className="absolute bottom-1 left-2 text-[9px] text-slate-500 font-mono">pH 0</div>
              <div className="absolute bottom-1 right-2 text-[9px] text-slate-500 font-mono">50 cm³</div>
              <div className="absolute top-1/2 left-0 right-0 border-b border-dashed border-slate-800 pointer-events-none" />

              {/* Equivalence guide line */}
              <div
                className="absolute top-0 bottom-0 border-r border-dashed border-emerald-500/30 pointer-events-none"
                style={{ left: `${(equivalenceVolume / 50) * 100}%` }}
              />

              {/* SVG Polyline */}
              <svg className="w-full h-full overflow-visible">
                {phHistory.length > 1 && (
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    points={phHistory
                      .map((p) => {
                        const x = (p.volume / 50) * 100;
                        const y = ((14 - p.ph) / 14) * 100;
                        return `${x}%,${y}%`;
                      })
                      .join(' ')}
                  />
                )}
                {/* Current point circle */}
                <circle
                  cx={`${(buretteVolume / 50) * 100}%`}
                  cy={`${((14 - currentPH) / 14) * 100}%`}
                  r="4"
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

          {/* Stoichiometric Calculation Card */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-xs space-y-1.5 font-mono">
            <div className="flex items-center gap-1.5 text-slate-300 font-sans font-semibold mb-1">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>KNEC Marking Scheme Formula:</span>
            </div>
            <p className="text-slate-400">Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂</p>
            <p className="text-slate-300">
              Moles of HCl = (0.10M × {buretteVolume.toFixed(2)}cm³) / 1000 ={' '}
              <span className="text-emerald-400">{((0.10 * buretteVolume) / 1000).toFixed(5)} mol</span>
            </p>
            <p className="text-slate-300">
              Calculated Molarity of Base ={' '}
              <span className="text-cyan-400">
                {buretteVolume > 0
                  ? (((0.10 * buretteVolume) / (2 * analyteVolume))).toFixed(4)
                  : '0.0000'}{' '}
                mol/dm³
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
