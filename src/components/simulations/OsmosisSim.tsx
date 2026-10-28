import React, { useState } from 'react';
import { Microscope, RotateCcw, Info, ArrowRight } from 'lucide-react';

export const OsmosisSim: React.FC = () => {
  const [sucroseConcentration, setSucroseConcentration] = useState<number>(0.2); // Molar (0 to 1.0M)
  const [cellType, setCellType] = useState<'plant' | 'animal'>('plant');

  // Internal cell sap concentration ~ 0.40 M
  const internalConc = 0.40;
  const gradient = sucroseConcentration - internalConc;

  // Determine state
  let tonicity: 'Hypotonic' | 'Isotonic' | 'Hypertonic';
  let cellStatus: string;
  let waterDirection: string;
  let scaleFactor: number;

  if (sucroseConcentration < 0.35) {
    tonicity = 'Hypotonic';
    waterDirection = 'Water enters the cell down water potential gradient (Endosmosis)';
    if (cellType === 'plant') {
      cellStatus = 'Turgid (Vacuole expands, high turgor pressure against cell wall)';
      scaleFactor = 1.15;
    } else {
      cellStatus = 'Haemolysis / Lysed (Red blood cell swells and bursts due to lack of cell wall)';
      scaleFactor = 1.35;
    }
  } else if (sucroseConcentration <= 0.45) {
    tonicity = 'Isotonic';
    waterDirection = 'Dynamic equilibrium: Net water flux is zero';
    cellStatus = 'Normal / Flaccid equilibrium (No net change in mass or volume)';
    scaleFactor = 1.0;
  } else {
    tonicity = 'Hypertonic';
    waterDirection = 'Water leaves the cell to higher external osmotic pressure (Exosmosis)';
    if (cellType === 'plant') {
      cellStatus = 'Plasmolysed (Cell membrane pulls away from rigid cell wall)';
      scaleFactor = 0.78;
    } else {
      cellStatus = 'Crenated (Shrunken, spiky crinkled cell membrane)';
      scaleFactor = 0.72;
    }
  }

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Biology Virtual Microscopy · KCSE Form 2</span>
          <h3 className="text-xl font-bold text-white mt-1">Osmosis, Plasmolysis & Turgor Pressure Simulator</h3>
          <p className="text-xs text-slate-400 mt-0.5">Cellular response to external solute gradients (Plant vs Animal Erythrocytes)</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSucroseConcentration(0.0)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
          >
            Pure Water (0.0M)
          </button>
          <button
            onClick={() => setSucroseConcentration(0.4)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700"
          >
            Isotonic (0.4M)
          </button>
          <button
            onClick={() => setSucroseConcentration(0.9)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700"
          >
            Hypertonic (0.9M)
          </button>
          <button
            onClick={() => {
              setSucroseConcentration(0.2);
              setCellType('plant');
            }}
            className="p-1.5 text-slate-400 hover:text-white"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stage Zone: High-Power Microscope Viewport */}
        <div className="lg:col-span-7 bg-slate-950/90 rounded-xl p-5 border border-slate-800/80 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
          {/* Microscope Viewport Circular Reticle */}
          <div className="w-80 h-80 rounded-full border-4 border-slate-700 bg-emerald-950/20 relative flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Crosshairs & micrometer scale */}
            <div className="absolute inset-0 border-b border-dashed border-emerald-500/10 pointer-events-none" />
            <div className="absolute inset-0 border-r border-dashed border-emerald-500/10 pointer-events-none" />
            <div className="absolute top-2 right-4 text-[9px] text-emerald-500/60 font-mono">1000× High Power</div>

            {/* External Medium Color */}
            <div
              className="absolute inset-0 transition-colors duration-500 pointer-events-none"
              style={{
                backgroundColor:
                  tonicity === 'Hypotonic'
                    ? 'rgba(6, 182, 212, 0.08)'
                    : tonicity === 'Isotonic'
                    ? 'rgba(16, 185, 129, 0.08)'
                    : 'rgba(239, 68, 68, 0.12)'
              }}
            />

            {/* Simulated Cell Structure */}
            {cellType === 'plant' ? (
              /* Plant Cell (Rigid Rectangular Wall + Inner Vacuole & Membrane) */
              <div className="relative w-56 h-44 border-4 border-emerald-700/80 bg-emerald-950/30 rounded-lg flex items-center justify-center p-2 shadow-inner">
                {/* Cellulose Cell Wall Label */}
                <span className="absolute -top-3 left-4 text-[9px] bg-slate-900 text-emerald-400 px-1 border border-emerald-800 rounded">
                  Cellulose Cell Wall (Rigid)
                </span>

                {/* Inner Protoplast (Plasma Membrane + Cytoplasm) */}
                <div
                  className="w-full h-full bg-emerald-800/40 border border-emerald-400/60 rounded flex items-center justify-center transition-all duration-700 relative overflow-hidden"
                  style={{
                    transform: `scale(${scaleFactor})`,
                    borderColor: tonicity === 'Hypertonic' ? '#ef4444' : '#10b981'
                  }}
                >
                  {/* Central Large Vacuole */}
                  <div
                    className="w-28 h-24 bg-cyan-600/30 border border-cyan-400/40 rounded-full flex flex-col items-center justify-center text-center transition-all duration-700"
                    style={{ transform: `scale(${scaleFactor})` }}
                  >
                    <span className="text-[10px] font-semibold text-cyan-200">Cell Sap Vacuole</span>
                    <span className="text-[8px] text-cyan-300 font-mono">Ψ_s = -0.40 MPa</span>
                  </div>

                  {/* Nucleus */}
                  <div className="absolute top-2 right-3 w-5 h-5 rounded-full bg-amber-500/80 border border-amber-300 shadow" />
                </div>
              </div>
            ) : (
              /* Animal Red Blood Cell (Erythrocyte) */
              <div
                className="rounded-full bg-rose-600/70 border-2 border-rose-400 flex items-center justify-center shadow-lg transition-all duration-700 relative"
                style={{
                  width: `${scaleFactor * 130}px`,
                  height: `${scaleFactor * 130}px`,
                  boxShadow: tonicity === 'Hypotonic' ? '0 0 30px rgba(244,63,94,0.6)' : 'none'
                }}
              >
                {/* Biconcave central pallor */}
                <div className="w-1/3 h-1/3 rounded-full bg-rose-800/60 border border-rose-500/30" />
                {scaleFactor > 1.3 && (
                  <span className="absolute text-[10px] font-bold text-white bg-rose-900/90 px-1.5 py-0.5 rounded border border-rose-400 animate-pulse">
                    LYSED / BURST!
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Status Label Bar */}
          <div className="w-full mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs px-2 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">External Medium:</span>
              <span
                className={`font-semibold ${
                  tonicity === 'Hypotonic'
                    ? 'text-cyan-400'
                    : tonicity === 'Isotonic'
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                }`}
              >
                {tonicity} ({sucroseConcentration.toFixed(2)} M)
              </span>
            </div>
            <div className="text-slate-300 text-xs font-mono">{cellStatus}</div>
          </div>
        </div>

        {/* Right Zone: Controls & Scientific Concepts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Specimen & Solute Concentration</h4>

            {/* Specimen Switch */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCellType('plant')}
                className={`px-3 py-2 text-xs rounded-lg font-medium border text-center transition-colors ${
                  cellType === 'plant'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                Plant Epidermal Cell (With Wall)
              </button>
              <button
                onClick={() => setCellType('animal')}
                className={`px-3 py-2 text-xs rounded-lg font-medium border text-center transition-colors ${
                  cellType === 'animal'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                Animal Erythrocyte (No Wall)
              </button>
            </div>

            {/* Concentration Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>External Sucrose Concentration:</span>
                <span className="font-mono text-cyan-400">{sucroseConcentration.toFixed(2)} M</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={sucroseConcentration}
                onChange={(e) => setSucroseConcentration(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>0.0M (Distilled)</span>
                <span>0.4M (Isotonic)</span>
                <span>1.0M (Concentrated)</span>
              </div>
            </div>
          </div>

          {/* Biological Principle Callout */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>Water Flux Mechanism:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{waterDirection}</p>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[11px] space-y-1">
              <div>Ψ_external = {(-sucroseConcentration * 2.4).toFixed(2)} MPa</div>
              <div>Ψ_internal = -0.96 MPa</div>
              <div className="text-emerald-400 font-bold">
                ΔΨ (Gradient) = {((-sucroseConcentration * 2.4) - (-0.96)).toFixed(2)} MPa
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
