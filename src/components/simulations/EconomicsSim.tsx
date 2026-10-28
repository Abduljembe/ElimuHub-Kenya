import React, { useState } from 'react';
import { TrendingUp, RotateCcw, DollarSign, Scale, Percent } from 'lucide-react';

export const EconomicsSim: React.FC = () => {
  const [demandShift, setDemandShift] = useState<number>(0); // -20 to +20
  const [supplyShift, setSupplyShift] = useState<number>(0); // -20 to +20
  const [taxPerUnit, setTaxPerUnit] = useState<number>(0); // KES per unit (e.g. Excise duty on fuel)

  // Linear Demand: P = (100 + demandShift) - 0.8*Q
  // Linear Supply: P = (20 - supplyShift) + 0.6*Q + taxPerUnit
  // At equilibrium: (100 + D) - 0.8*Q = (20 - S) + 0.6*Q + Tax
  // 1.4 * Q = (80 + D + S - Tax)
  const qEquilibrium = Math.max(5, (80 + demandShift + supplyShift - taxPerUnit) / 1.4);
  const pConsumer = (100 + demandShift) - 0.8 * qEquilibrium;
  const pProducer = pConsumer - taxPerUnit;
  const taxRevenue = taxPerUnit * qEquilibrium;

  // Consumer & Producer surplus calculations (triangles)
  const consumerSurplus = 0.5 * ((100 + demandShift) - pConsumer) * qEquilibrium;
  const producerSurplus = 0.5 * (pProducer - (20 - supplyShift)) * qEquilibrium;
  const deadweightLoss = 0.5 * taxPerUnit * ((80 + demandShift + supplyShift) / 1.4 - qEquilibrium);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Economics & Financial Markets Lab · CBK & KRA Policy</span>
          <h3 className="text-xl font-bold text-white mt-1">Market Equilibrium, Price Elasticity & Excise Tax Incidence</h3>
          <p className="text-xs text-slate-400 mt-0.5">Supply/Demand Shifts, Consumer Surplus & Kenya Deadweight Loss Analysis</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setDemandShift(0);
              setSupplyShift(0);
              setTaxPerUnit(0);
            }}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Equilibrium
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stage Zone: Dynamic Supply-Demand Graph */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 min-h-[420px] flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <span>Market: <strong className="text-white">Kenyan Petrol / Petroleum Market (KES / Litre)</strong></span>
            <span className="font-mono">Equilibrium Q: <strong className="text-amber-400">{qEquilibrium.toFixed(1)}k Litres</strong></span>
          </div>

          {/* SVG Coordinate Space */}
          <div className="w-full h-72 border border-slate-800 rounded-lg relative bg-slate-900/40 p-3">
            <svg className="w-full h-full overflow-visible">
              {/* Axes */}
              <line x1="40" y1="20" x2="40" y2="240" stroke="#64748b" strokeWidth="2" />
              <line x1="40" y1="240" x2="95%" y2="240" stroke="#64748b" strokeWidth="2" />

              {/* Demand Curve (Downward sloping blue) */}
              <line
                x1="50"
                y1={`${Math.max(20, 240 - ((100 + demandShift) - 0.8 * 10) * 1.8)}`}
                x2="90%"
                y2={`${Math.max(20, 240 - ((100 + demandShift) - 0.8 * 80) * 1.8)}`}
                stroke="#38bdf8"
                strokeWidth="3"
              />

              {/* Supply Curve (Upward sloping green) */}
              <line
                x1="50"
                y1={`${Math.max(20, 240 - ((20 - supplyShift) + 0.6 * 10 + taxPerUnit) * 1.8)}`}
                x2="90%"
                y2={`${Math.max(20, 240 - ((20 - supplyShift) + 0.6 * 80 + taxPerUnit) * 1.8)}`}
                stroke="#4ade80"
                strokeWidth="3"
              />

              {/* Equilibrium intersect dot */}
              <circle
                cx={`${40 + qEquilibrium * 4.5}`}
                cy={`${240 - pConsumer * 1.8}`}
                r="6"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </svg>

            {/* Labels on Axes */}
            <div className="absolute top-2 left-1 text-[10px] text-slate-400 font-mono">Price (KES)</div>
            <div className="absolute bottom-1 right-2 text-[10px] text-slate-400 font-mono">Quantity (Q)</div>
            <div className="absolute top-1/4 right-8 text-xs font-bold text-sky-400 font-mono">Demand (D)</div>
            <div className="absolute bottom-1/4 right-8 text-xs font-bold text-emerald-400 font-mono">Supply (S)</div>
          </div>

          {/* Real-time Economic Metrics */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800 text-center text-xs">
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Consumer Price (P_c)</span>
              <strong className="text-amber-400 font-mono text-sm">KES {pConsumer.toFixed(1)}</strong>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Producer Price (P_p)</span>
              <strong className="text-emerald-400 font-mono text-sm">KES {pProducer.toFixed(1)}</strong>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">KRA Tax Revenue</span>
              <strong className="text-cyan-400 font-mono text-sm">KES {taxRevenue.toFixed(0)}k</strong>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Deadweight Loss</span>
              <strong className="text-rose-400 font-mono text-sm">KES {deadweightLoss.toFixed(0)}k</strong>
            </div>
          </div>
        </div>

        {/* Right Zone: Controls & Policy Analysis */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Policy & Market Shifters</h4>

            {/* Tax Per Unit Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Kenyan Fuel Excise Tax / Duty:</span>
                <span className="font-mono text-rose-400">KES {taxPerUnit} / Litre</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={taxPerUnit}
                onChange={(e) => setTaxPerUnit(parseInt(e.target.value))}
                className="w-full accent-rose-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Demand Shift Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Demand Shock (Consumer Income & Seasonality):</span>
                <span className="font-mono text-sky-400">{demandShift > 0 ? `+${demandShift}` : demandShift}</span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                step="2"
                value={demandShift}
                onChange={(e) => setDemandShift(parseInt(e.target.value))}
                className="w-full accent-sky-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Supply Shift Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Supply Shock (Global Crude Oil Import Cost):</span>
                <span className="font-mono text-emerald-400">{supplyShift > 0 ? `+${supplyShift}` : supplyShift}</span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                step="2"
                value={supplyShift}
                onChange={(e) => setSupplyShift(parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Welfare Analysis Card */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-xs space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Welfare & Surplus Breakdown</h4>
            <div className="space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Consumer Surplus (CS):</span>
                <span className="text-sky-400">KES {consumerSurplus.toFixed(0)}k</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Producer Surplus (PS):</span>
                <span className="text-emerald-400">KES {producerSurplus.toFixed(0)}k</span>
              </div>
              <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-1">
                <span>Total Social Welfare:</span>
                <span className="text-amber-400">KES {(consumerSurplus + producerSurplus + taxRevenue).toFixed(0)}k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
