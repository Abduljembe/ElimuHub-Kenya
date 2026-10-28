import React, { useState } from 'react';
import { Zap, RotateCcw, Sliders, Activity } from 'lucide-react';

export const CircuitSim: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(12); // Volts
  const [resistance1, setResistance1] = useState<number>(6); // Ohms
  const [resistance2, setResistance2] = useState<number>(4); // Ohms
  const [config, setConfig] = useState<'series' | 'parallel'>('series');
  const [switchClosed, setSwitchClosed] = useState<boolean>(true);

  // Equivalent resistance
  const rTotal = config === 'series'
    ? resistance1 + resistance2
    : (resistance1 * resistance2) / (resistance1 + resistance2);

  // Total current
  const totalCurrent = switchClosed ? voltage / rTotal : 0; // Amperes
  const totalPower = switchClosed ? voltage * totalCurrent : 0; // Watts

  // Series voltages and Parallel currents
  const v1 = config === 'series' && switchClosed ? totalCurrent * resistance1 : voltage;
  const v2 = config === 'series' && switchClosed ? totalCurrent * resistance2 : voltage;
  const i1 = config === 'parallel' && switchClosed ? voltage / resistance1 : totalCurrent;
  const i2 = config === 'parallel' && switchClosed ? voltage / resistance2 : totalCurrent;

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Physics & Electrical Engineering Lab</span>
          <h3 className="text-xl font-bold text-white mt-1">DC Circuit, Ohm's Law & Power Dissipation Sandbox</h3>
          <p className="text-xs text-slate-400 mt-0.5">V = I · R · Series vs Parallel Network Analysis</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSwitchClosed(!switchClosed)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors ${
              switchClosed ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            {switchClosed ? 'Open Circuit Switch' : 'Close Circuit Switch'}
          </button>
          <button
            onClick={() => {
              setVoltage(12);
              setResistance1(6);
              setResistance2(4);
              setConfig('series');
              setSwitchClosed(true);
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stage Zone: Visual Circuit Diagram */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 relative min-h-[420px] flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <span>Circuit Topology: <strong className="text-white capitalize">{config}</strong></span>
            <span className="font-mono">Circuit State: <strong className={switchClosed ? 'text-emerald-400' : 'text-rose-400'}>{switchClosed ? 'ENERGIZED' : 'OPEN / INACTIVE'}</strong></span>
          </div>

          {/* Circuit Canvas */}
          <div className="w-full h-72 border border-slate-800 rounded-lg relative flex items-center justify-center p-4 bg-slate-900/40">
            {/* SVG Wire Lines */}
            <svg className="w-full h-full">
              {/* Outer Loop Wire */}
              <rect
                x="30"
                y="30"
                width="88%"
                height="78%"
                fill="none"
                stroke={switchClosed ? '#06b6d4' : '#475569'}
                strokeWidth="4"
                strokeDasharray={switchClosed ? '10 5' : 'none'}
                className={switchClosed ? 'animate-pulse' : ''}
              />
            </svg>

            {/* Left: DC Power Supply / Battery */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900 border-2 border-cyan-500 rounded-lg p-3 text-center shadow-lg w-28">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">DC Supply</span>
              <div className="text-lg font-bold font-mono text-cyan-300">{voltage.toFixed(1)} V</div>
              <div className="text-[9px] text-slate-500 mt-0.5">E.M.F Source</div>
            </div>

            {/* Top Wire: Switch & Ammeter */}
            <div className="absolute top-3 left-1/3 -translate-x-1/2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-center shadow">
              <span className="text-[9px] text-slate-400 block">Switch</span>
              <span className={`text-xs font-bold font-mono ${switchClosed ? 'text-emerald-400' : 'text-rose-400'}`}>
                {switchClosed ? '[CLOSED —]' : '[OPEN /]'}
              </span>
            </div>

            <div className="absolute top-3 right-1/4 translate-x-1/2 bg-slate-900 border-2 border-emerald-500 rounded-lg px-3 py-1.5 text-center shadow w-28">
              <span className="text-[9px] text-emerald-400 font-semibold block">Ammeter (A)</span>
              <span className="text-base font-bold font-mono text-emerald-300">{totalCurrent.toFixed(2)} A</span>
            </div>

            {/* Right: Resistor Network (Series or Parallel) */}
            {config === 'series' ? (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-6">
                <div className="bg-slate-900 border-2 border-amber-500/80 rounded-lg p-2.5 text-center shadow-lg w-32">
                  <span className="text-[10px] text-amber-300 font-semibold block">Resistor R₁</span>
                  <div className="text-sm font-bold font-mono text-white">{resistance1} Ω</div>
                  <div className="text-[10px] font-mono text-slate-400">V₁: {v1.toFixed(1)}V</div>
                </div>
                <div className="bg-slate-900 border-2 border-amber-500/80 rounded-lg p-2.5 text-center shadow-lg w-32">
                  <span className="text-[10px] text-amber-300 font-semibold block">Resistor R₂</span>
                  <div className="text-sm font-bold font-mono text-white">{resistance2} Ω</div>
                  <div className="text-[10px] font-mono text-slate-400">V₂: {v2.toFixed(1)}V</div>
                </div>
              </div>
            ) : (
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-4">
                <div className="bg-slate-900 border-2 border-amber-500/80 rounded-lg p-2.5 text-center shadow-lg w-28">
                  <span className="text-[10px] text-amber-300 font-semibold block">R₁: {resistance1} Ω</span>
                  <div className="text-xs font-mono text-emerald-400">I₁: {i1.toFixed(2)}A</div>
                </div>
                <div className="bg-slate-900 border-2 border-amber-500/80 rounded-lg p-2.5 text-center shadow-lg w-28">
                  <span className="text-[10px] text-amber-300 font-semibold block">R₂: {resistance2} Ω</span>
                  <div className="text-xs font-mono text-emerald-400">I₂: {i2.toFixed(2)}A</div>
                </div>
              </div>
            )}

            {/* Bottom: Voltmeter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 border-2 border-purple-500 rounded-lg px-4 py-1.5 text-center shadow">
              <span className="text-[9px] text-purple-400 font-semibold block">Voltmeter across Load (V)</span>
              <span className="text-base font-bold font-mono text-purple-300">
                {switchClosed ? voltage.toFixed(1) : '0.0'} V
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-center text-xs">
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Total Resistance (R_eq)</span>
              <strong className="text-white font-mono text-sm">{rTotal.toFixed(2)} Ω</strong>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Total Current (I)</span>
              <strong className="text-emerald-400 font-mono text-sm">{totalCurrent.toFixed(2)} A</strong>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Power Dissipated (P)</span>
              <strong className="text-amber-400 font-mono text-sm">{totalPower.toFixed(2)} W</strong>
            </div>
          </div>
        </div>

        {/* Right Zone: Circuit Controls & Formulas */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Circuit Configuration</h4>

            {/* Mode selection */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setConfig('series')}
                className={`px-3 py-2 text-xs rounded-lg font-medium border text-center transition-colors ${
                  config === 'series'
                    ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                Series Network (R = R₁ + R₂)
              </button>
              <button
                onClick={() => setConfig('parallel')}
                className={`px-3 py-2 text-xs rounded-lg font-medium border text-center transition-colors ${
                  config === 'parallel'
                    ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                Parallel Network (1/R = 1/R₁ + 1/R₂)
              </button>
            </div>

            {/* Voltage Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Supply Voltage (V):</span>
                <span className="font-mono text-cyan-400">{voltage} V</span>
              </div>
              <input
                type="range"
                min="1"
                max="48"
                step="1"
                value={voltage}
                onChange={(e) => setVoltage(parseInt(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Resistance 1 Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Resistor R₁:</span>
                <span className="font-mono text-amber-400">{resistance1} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={resistance1}
                onChange={(e) => setResistance1(parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Resistance 2 Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Resistor R₂:</span>
                <span className="font-mono text-amber-400">{resistance2} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={resistance2}
                onChange={(e) => setResistance2(parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Mathematical Proof Card */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-xs space-y-2 font-mono">
            <div className="flex items-center gap-1.5 text-slate-300 font-sans font-semibold mb-1">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ohm's Law Calculation Steps:</span>
            </div>
            {config === 'series' ? (
              <>
                <p className="text-slate-400">R_total = R₁ + R₂ = {resistance1} + {resistance2} = {rTotal} Ω</p>
                <p className="text-slate-400">I_circuit = V / R_total = {voltage}V / {rTotal}Ω = {totalCurrent.toFixed(3)} A</p>
                <p className="text-cyan-400">V_R1 = I · R₁ = {totalCurrent.toFixed(3)} · {resistance1} = {v1.toFixed(2)} V</p>
                <p className="text-cyan-400">V_R2 = I · R₂ = {totalCurrent.toFixed(3)} · {resistance2} = {v2.toFixed(2)} V</p>
              </>
            ) : (
              <>
                <p className="text-slate-400">1/R_total = 1/{resistance1} + 1/{resistance2} =&gt; R_total = {rTotal.toFixed(2)} Ω</p>
                <p className="text-slate-400">Branch 1: I₁ = {voltage}V / {resistance1}Ω = {i1.toFixed(2)} A</p>
                <p className="text-slate-400">Branch 2: I₂ = {voltage}V / {resistance2}Ω = {i2.toFixed(2)} A</p>
                <p className="text-emerald-400">Total I = I₁ + I₂ = {(i1 + i2).toFixed(2)} A (Kirchhoff's Current Law)</p>
              </>
            )}
            <p className="text-amber-400 pt-1 border-t border-slate-800">
              Joule Heating Power: P = I²R = {totalPower.toFixed(2)} Joules/sec (Watts)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
