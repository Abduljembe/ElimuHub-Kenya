import React, { useState } from 'react';
import {
  Flame,
  Zap,
  Atom,
  Binary,
  Search,
  Sparkles,
  Info
} from 'lucide-react';
import {
  PERIODIC_ELEMENTS,
  STANDARD_ELECTRODE_POTENTIALS,
  PHYSICAL_CONSTANTS,
  ChemicalElement
} from '../data/scienceReferenceData';

export const ScienceReferenceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'periodic' | 'flames' | 'electrochem' | 'constants'>('periodic');
  const [selectedElement, setSelectedElement] = useState<ChemicalElement>(PERIODIC_ELEMENTS[10]); // Sodium default
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cell emf calculator state
  const [anodeReactionIdx, setAnodeReactionIdx] = useState<number>(6); // Zn default (-0.76V)
  const [cathodeReactionIdx, setCathodeReactionIdx] = useState<number>(10); // Cu default (+0.34V)

  const filteredElements = PERIODIC_ELEMENTS.filter(
    (el) =>
      el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.atomicNumber.toString().includes(searchQuery)
  );

  const flameElements = PERIODIC_ELEMENTS.filter((el) => el.flameColor);

  const anodeRx = STANDARD_ELECTRODE_POTENTIALS[anodeReactionIdx];
  const cathodeRx = STANDARD_ELECTRODE_POTENTIALS[cathodeReactionIdx];
  const calculatedEmf = cathodeRx.standardPotentialVolts - anodeRx.standardPotentialVolts;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400">
              <span>National Laboratory &amp; Science Reference Hub</span>
              <span>·</span>
              <span>KNEC Chemistry (233) &amp; Physics (232)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Interactive Periodic Table &amp; Physical Constants
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Explore chemical elements, electron configurations, flame test colors, standard electrode potentials ($E^\circ$), and physical constants referenced in KCSE national examinations.
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('periodic')}
            className={`py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
              activeTab === 'periodic'
                ? 'bg-purple-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Atom className="w-4 h-4" />
            Periodic Table ({PERIODIC_ELEMENTS.length} Key Elements)
          </button>
          <button
            onClick={() => setActiveTab('flames')}
            className={`py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
              activeTab === 'flames'
                ? 'bg-purple-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            Flame Test Reactions ({flameElements.length})
          </button>
          <button
            onClick={() => setActiveTab('electrochem')}
            className={`py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
              activeTab === 'electrochem'
                ? 'bg-purple-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            Electrochemical Series &amp; Cell EMF
          </button>
          <button
            onClick={() => setActiveTab('constants')}
            className={`py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
              activeTab === 'constants'
                ? 'bg-purple-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Binary className="w-4 h-4 text-emerald-400" />
            Physical Constants Sheet
          </button>
        </div>
      </div>

      {/* Tab 1: Periodic Table Canvas */}
      {activeTab === 'periodic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Elements Grid */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-mono uppercase text-slate-400">
                Click any element to inspect atomic structure &amp; uses:
              </span>
              <div className="relative max-w-xs">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter element..."
                  className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredElements.map((el) => {
                const isSelected = el.atomicNumber === selectedElement.atomicNumber;
                return (
                  <button
                    key={el.atomicNumber}
                    onClick={() => setSelectedElement(el)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-purple-950/80 border-purple-500 ring-2 ring-purple-500/50 shadow-md scale-105'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
                      <span>{el.atomicNumber}</span>
                      <span>Gr {el.group}</span>
                    </div>
                    <div className="text-xl font-extrabold text-white my-0.5">{el.symbol}</div>
                    <div className="text-[10px] text-slate-300 font-medium truncate">{el.name}</div>
                    <div className="text-[9px] font-mono text-emerald-400">{el.ram.toFixed(1)}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Element Inspector */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                    Group {selectedElement.group} · Period {selectedElement.period} · {selectedElement.category}
                  </span>
                  <h3 className="text-3xl font-extrabold text-white mt-0.5 flex items-center gap-2">
                    {selectedElement.name}
                    <span className="text-lg font-mono text-slate-400">({selectedElement.symbol})</span>
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-500 block">Atomic Number</span>
                  <strong className="text-2xl font-mono text-purple-400 font-bold">
                    {selectedElement.atomicNumber}
                  </strong>
                </div>
              </div>
            </div>

            {/* Atomic Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Relative Atomic Mass (RAM)</span>
                <strong className="text-white text-sm">{selectedElement.ram}</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Valency</span>
                <strong className="text-white text-sm">{selectedElement.valency}</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 col-span-2">
                <span className="text-slate-500 text-[10px] block">Electron Configuration (s, p, d, f)</span>
                <strong className="text-emerald-400 text-sm">{selectedElement.electronConfig}</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 col-span-2">
                <span className="text-slate-500 text-[10px] block">Common Oxidation States</span>
                <strong className="text-cyan-400 text-sm">{selectedElement.oxidationStates}</strong>
              </div>
            </div>

            {/* Flame Test if present */}
            {selectedElement.flameColor && (
              <div className="p-3.5 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs space-y-1">
                <span className="text-amber-400 font-bold font-mono text-[10px] uppercase flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  KNEC Flame Test Color:
                </span>
                <p className="text-amber-200 font-semibold">{selectedElement.flameColor}</p>
              </div>
            )}

            {/* Appearance & Kenyan Occurrence */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-semibold block mb-0.5">Physical Appearance:</span>
                <p className="text-slate-300">{selectedElement.appearance}</p>
              </div>
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-emerald-200">
                <span className="text-emerald-400 font-bold font-mono text-[10px] uppercase block mb-0.5">
                  Kenyan Occurrence, Industrial Extraction &amp; Use:
                </span>
                <p>{selectedElement.kenyanOccurrenceOrUse}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Flame Test Reactions */}
      {activeTab === 'flames' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              KNEC Qualitative Flame Test Spectrograms
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              In KNEC Paper 3 practicals, a clean platinum or nichrome wire loop is dipped in concentrated hydrochloric acid (HCl), touched to the solid salt, and placed into the non-luminous Bunsen burner flame.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flameElements.map((el) => (
              <div
                key={el.atomicNumber}
                className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">{el.name} ({el.symbol})</h4>
                    <span className="text-xs text-slate-400 font-mono">Atomic #{el.atomicNumber}</span>
                  </div>
                  <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                    Characteristic Flame Color:
                  </span>
                  <strong className="text-amber-300 text-sm block">{el.flameColor}</strong>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{el.kenyanOccurrenceOrUse}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Electrochemical Series & Cell EMF */}
      {activeTab === 'electrochem' && (
        <div className="space-y-6">
          {/* Interactive Cell Potential Calculator */}
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
                  Interactive Galvanic Cell EMF Calculator
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  E°_cell = E°_cathode (reduction) - E°_anode (oxidation)
                </h3>
              </div>
              <div className="p-3 bg-slate-950 border border-cyan-500 rounded-xl text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Cell Potential (E°_cell)</span>
                <strong className={`text-2xl font-mono font-extrabold ${calculatedEmf > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {calculatedEmf > 0 ? '+' : ''}{calculatedEmf.toFixed(2)} V
                </strong>
                <span className="text-[10px] text-slate-400 block">
                  {calculatedEmf > 0 ? '✓ Spontaneous Reaction' : '✗ Non-Spontaneous'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Select Anode Half-Cell (Oxidation):
                </label>
                <select
                  value={anodeReactionIdx}
                  onChange={(e) => setAnodeReactionIdx(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                >
                  {STANDARD_ELECTRODE_POTENTIALS.map((rx, i) => (
                    <option key={i} value={i}>
                      {rx.halfReaction} (E° = {rx.standardPotentialVolts > 0 ? '+' : ''}{rx.standardPotentialVolts.toFixed(2)} V)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Select Cathode Half-Cell (Reduction):
                </label>
                <select
                  value={cathodeReactionIdx}
                  onChange={(e) => setCathodeReactionIdx(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                >
                  {STANDARD_ELECTRODE_POTENTIALS.map((rx, i) => (
                    <option key={i} value={i}>
                      {rx.halfReaction} (E° = {rx.standardPotentialVolts > 0 ? '+' : ''}{rx.standardPotentialVolts.toFixed(2)} V)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Full Standard Reduction Potentials Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              Standard Reduction Potentials at 298 K (25°C), 1 atm, 1 M
            </h4>

            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                    <th className="p-3">Reduction Half-Equation</th>
                    <th className="p-3">Standard Potential E° (Volts)</th>
                    <th className="p-3">Chemical Nature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono">
                  {STANDARD_ELECTRODE_POTENTIALS.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/50">
                      <td className="p-3 text-slate-200 font-semibold">{item.halfReaction}</td>
                      <td className={`p-3 font-bold ${item.standardPotentialVolts > 0 ? 'text-cyan-400' : item.standardPotentialVolts === 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {item.standardPotentialVolts > 0 ? '+' : ''}{item.standardPotentialVolts.toFixed(2)} V
                      </td>
                      <td className="p-3 text-slate-400 text-[11px] font-sans">
                        {item.standardPotentialVolts <= -1.5 ? 'Strong Reducing Agent' : item.standardPotentialVolts >= 1.0 ? 'Strong Oxidizing Agent' : 'Moderate'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Physical Constants Sheet */}
      {activeTab === 'constants' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Binary className="w-4 h-4 text-emerald-400" />
            Official KNEC Examination Physical Constants Table
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PHYSICAL_CONSTANTS.map((c, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    {c.symbol}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{c.units}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{c.name}</h4>
                  <strong className="text-base font-mono text-cyan-300 block mt-0.5">{c.value}</strong>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                  <strong className="text-slate-300">Exam Context:</strong> {c.knecSignificance}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
