import React, { useState, useEffect } from 'react';
import { Heart, Activity, AlertTriangle, ShieldCheck, RotateCcw, Stethoscope } from 'lucide-react';

export const ClinicalPatientSim: React.FC = () => {
  const [patientRhythm, setPatientRhythm] = useState<'stemi' | 'normal' | 'brady' | 'vf'>('stemi');
  const [heartRate, setHeartRate] = useState<number>(118);
  const [bloodPressure, setBloodPressure] = useState<string>('88/54 mmHg');
  const [spO2, setSpO2] = useState<number>(91);
  const [givenAspirin, setGivenAspirin] = useState<boolean>(false);
  const [givenOxygen, setGivenOxygen] = useState<boolean>(false);
  const [activatedCathLab, setActivatedCathLab] = useState<boolean>(false);
  const [ecgOffset, setEcgOffset] = useState<number>(0);

  // Animate ECG line offset
  useEffect(() => {
    const interval = setInterval(() => {
      setEcgOffset((prev) => (prev + 3) % 400);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleApplyAspirin = () => {
    setGivenAspirin(true);
  };

  const handleApplyOxygen = () => {
    setGivenOxygen(true);
    setSpO2(98);
  };

  const handleActivateCathLab = () => {
    setActivatedCathLab(true);
    if (givenAspirin && givenOxygen) {
      setTimeout(() => {
        setPatientRhythm('normal');
        setHeartRate(76);
        setBloodPressure('118/76 mmHg');
      }, 1200);
    }
  };

  const handleReset = () => {
    setPatientRhythm('stemi');
    setHeartRate(118);
    setBloodPressure('88/54 mmHg');
    setSpO2(91);
    setGivenAspirin(false);
    setGivenOxygen(false);
    setActivatedCathLab(false);
  };

  const isStabilized = patientRhythm === 'normal';

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-rose-400 font-semibold">Undergraduate Medicine & Surgery (MBChB) · OSCE Clinical Lab</span>
          <h3 className="text-xl font-bold text-white mt-1">Emergency Resuscitation & 12-Lead ECG Patient Simulator</h3>
          <p className="text-xs text-slate-400 mt-0.5">Acute Coronary Syndrome · Kenyatta National Hospital Triage Station</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Patient Case
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stage Zone: Clinical Intensive Care Monitor */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl p-5 border-2 border-slate-800 font-mono shadow-2xl relative min-h-[420px] flex flex-col justify-between">
          {/* Monitor Header */}
          <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800/80 pb-2">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ICU BED 04 · KNH EMERGENCIES
            </span>
            <span className="text-slate-500">LEAD II CONT.</span>
          </div>

          {/* ECG Trace Graph */}
          <div className="w-full h-36 bg-slate-950 border border-emerald-950/40 rounded-lg p-2 relative overflow-hidden flex items-center">
            {/* Grid Lines */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            {/* Sweep bar */}
            <div
              className="absolute top-0 bottom-0 w-3 bg-gradient-to-r from-emerald-400 to-transparent pointer-events-none opacity-80 z-10"
              style={{ left: `${(ecgOffset / 400) * 100}%` }}
            />

            {/* ECG Waveform SVG */}
            <svg className="w-full h-24 overflow-visible">
              <path
                d={
                  patientRhythm === 'stemi'
                    ? "M0,45 L40,45 L50,40 L60,45 L70,45 L75,55 L80,10 L85,45 L105,25 L130,25 L145,45 L200,45 L210,40 L220,45 L230,45 L235,55 L240,10 L245,45 L265,25 L290,25 L305,45 L360,45 L370,40 L380,45 L385,55 L390,10 L395,45 L415,25 L440,25 L455,45 L500,45"
                    : "M0,45 L40,45 L50,38 L60,45 L70,45 L75,52 L80,15 L85,55 L90,45 L105,45 L120,35 L135,45 L200,45 L210,38 L220,45 L230,45 L235,52 L240,15 L245,55 L250,45 L265,45 L280,35 L295,45 L360,45"
                }
                fill="none"
                stroke={patientRhythm === 'stemi' ? '#ef4444' : '#10b981'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Vitals Numbers Dashboard */}
          <div className="grid grid-cols-3 gap-3 my-2 text-left">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-emerald-400 font-sans block flex items-center gap-1">
                <Heart className="w-3 h-3 fill-emerald-400" /> HR (bpm)
              </span>
              <span className={`text-2xl font-bold ${patientRhythm === 'stemi' ? 'text-rose-400' : 'text-emerald-300'}`}>
                {heartRate}
              </span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-cyan-400 font-sans block">BP (NIBP)</span>
              <span className="text-2xl font-bold text-cyan-300">{bloodPressure}</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-purple-400 font-sans block">SpO₂ (%)</span>
              <span className={`text-2xl font-bold ${spO2 < 94 ? 'text-amber-400' : 'text-purple-300'}`}>
                {spO2}%
              </span>
            </div>
          </div>

          {/* Rhythm Diagnosis Banner */}
          <div className={`p-2.5 rounded-lg border text-xs font-sans flex items-center justify-between ${
            isStabilized ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300' : 'bg-rose-950/40 border-rose-500/80 text-rose-300'
          }`}>
            <span className="flex items-center gap-2">
              {isStabilized ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
              {isStabilized
                ? 'Rhythm Reverted: Normal Sinus Rhythm (Hemodynamically Stable)'
                : 'CRITICAL ALERT: Anterior ST-Elevation Myocardial Infarction (STEMI)'}
            </span>
          </div>
        </div>

        {/* Right Zone: Clinical Actions & Pharmacology */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">OSCE Acute Interventions</h4>

            <div className="space-y-2">
              <button
                onClick={handleApplyOxygen}
                disabled={givenOxygen}
                className={`w-full p-2.5 rounded-lg text-xs font-medium text-left border flex items-center justify-between transition-colors ${
                  givenOxygen
                    ? 'bg-slate-900/50 border-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-cyan-500'
                }`}
              >
                <span>1. Administer Supplemental O₂ (Nasal cannula 4L/min)</span>
                {givenOxygen && <ShieldCheck className="w-4 h-4 text-cyan-400" />}
              </button>

              <button
                onClick={handleApplyAspirin}
                disabled={givenAspirin}
                className={`w-full p-2.5 rounded-lg text-xs font-medium text-left border flex items-center justify-between transition-colors ${
                  givenAspirin
                    ? 'bg-slate-900/50 border-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-rose-500'
                }`}
              >
                <span>2. Give Chewable Aspirin 300mg + Clopidogrel 300mg</span>
                {givenAspirin && <ShieldCheck className="w-4 h-4 text-rose-400" />}
              </button>

              <button
                onClick={handleActivateCathLab}
                disabled={activatedCathLab}
                className={`w-full p-2.5 rounded-lg text-xs font-medium text-left border flex items-center justify-between transition-colors ${
                  activatedCathLab
                    ? 'bg-slate-900/50 border-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-emerald-500'
                }`}
              >
                <span>3. Activate Cardiac Cath Lab for Primary Angioplasty (PCI)</span>
                {activatedCathLab && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* Clinical Guidelines Card */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
              <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ministry of Health (Kenya) Clinical Guidelines:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Door-to-balloon time for primary PCI should be &lt; 90 minutes. If PCI is unavailable within 120 minutes in rural Kenyan county referral hospitals, immediately initiate fibrinolytic therapy (Tenecteplase / Streptokinase) unless contraindicated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
