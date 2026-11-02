import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  PenTool,
  Clock,
  BookOpen,
  Eye,
  EyeOff,
  Flame,
  Award,
  ChevronRight,
  HelpCircle,
  FileText
} from 'lucide-react';
import { KENYA_COURSES } from '../data/curriculumData';
import { ExamPaper } from '../types/curriculum';

interface FocusStudyRoomProps {
  onStartExam?: (exam: ExamPaper, subjectName: string) => void;
}

export const FocusStudyRoom: React.FC<FocusStudyRoomProps> = ({ onStartExam }) => {
  // Mode selection: Study Pomodoro vs Strict Exam Proctor
  const [sessionMode, setSessionMode] = useState<'study' | 'exam'>('study');
  
  // Timer state
  const [timerPresetMinutes, setTimerPresetMinutes] = useState<number>(25);
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Distraction & Integrity Monitor
  const [tabSwitchCount, setTabSwitchCount] = useState<number>(0);
  const [unfocusedSeconds, setUnfocusedSeconds] = useState<number>(0);
  const [integrityLogs, setIntegrityLogs] = useState<Array<{ timestamp: string; message: string; type: 'warning' | 'info' | 'good' }>>([
    { timestamp: new Date().toLocaleTimeString(), message: 'Focus session initiated. Anti-distraction proctor active.', type: 'info' }
  ]);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);

  // Scratchpad state
  const [scratchpadText, setScratchpadText] = useState<string>(() => {
    return localStorage.getItem('elimuhub_focus_scratchpad') || 'Rough Work & Quick Formulas:\n- V = IR\n- Q = Area × Velocity\n- g = 9.8 m/s²\n';
  });
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);

  // Mini Scientific Calculator
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [calcInput, setCalcInput] = useState<string>('');
  const [calcResult, setCalcResult] = useState<string>('');

  // Quick Syllabus drawer
  const [showSyllabusDrawer, setShowSyllabusDrawer] = useState<boolean>(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(KENYA_COURSES[0].id);

  // Audio Ambient Soundscape (Web Audio API Synthesizer)
  const [ambientSound, setAmbientSound] = useState<'off' | 'rain' | 'crickets' | 'waves' | 'alpha' | 'ticking'>('rain');
  const [audioVolume, setAudioVolume] = useState<number>(0.35);
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeSoundNodesRef = useRef<any[]>([]);

  // Daily Streak
  const [streakCount, setStreakCount] = useState<number>(() => {
    const saved = localStorage.getItem('elimuhub_study_streak');
    return saved ? parseInt(saved, 10) : 5;
  });

  // Motivational quote of the day
  const motivationalQuotes = [
    { quote: "Only the disciplined ones are free in life. If you are undisciplined, you are a slave to your moods and passions.", author: "Eliud Kipchoge (Kenyan Olympic Champion)" },
    { quote: "It is the little things that citizens do. That is what will make the difference. My little thing is planting trees.", author: "Prof. Wangari Maathai (Nobel Peace Laureate)" },
    { quote: "Education is not a spectator sport. You must be in the arena, disciplined and relentless.", author: "Prof. George Magoha (Renowned Kenyan Scholar)" },
    { quote: "Success in national examinations is 10% inspiration and 90% deliberate, uninterrupted sweat.", author: "Kenya National Examination Council (KNEC) Maxim" }
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Timer Tick
  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      playCompletionChime();
      if (!isBreak) {
        // Log successful study block
        setIntegrityLogs((prev) => [
          { timestamp: new Date().toLocaleTimeString(), message: `Completed ${timerPresetMinutes} min focus session! Take a well-deserved rest.`, type: 'good' },
          ...prev
        ]);
        setStreakCount((prev) => {
          const next = prev + 1;
          localStorage.setItem('elimuhub_study_streak', next.toString());
          return next;
        });
        // Auto trigger 5 min break
        setIsBreak(true);
        setSecondsLeft(5 * 60);
      } else {
        setIsBreak(false);
        setSecondsLeft(timerPresetMinutes * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, isBreak, timerPresetMinutes]);

  // Anti-Distraction Page Visibility & Blur Detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const time = new Date().toLocaleTimeString();
        setTabSwitchCount((prev) => prev + 1);
        setIntegrityLogs((prev) => [
          {
            timestamp: time,
            message: sessionMode === 'exam'
              ? 'ALERT: Candidate navigated away from exam hall! Tab switch recorded.'
              : 'Attention: You switched tabs / minimized the study room.',
            type: 'warning'
          },
          ...prev
        ]);
        if (sessionMode === 'exam' && isActive) {
          setShowWarningModal(true);
        }
      }
    };

    const handleWindowBlur = () => {
      if (isActive) {
        setUnfocusedSeconds((prev) => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [sessionMode, isActive]);

  // Save Scratchpad
  useEffect(() => {
    localStorage.setItem('elimuhub_focus_scratchpad', scratchpadText);
  }, [scratchpadText]);

  // Web Audio Synthesizer: Soundscapes
  useEffect(() => {
    stopCurrentSound();

    if (ambientSound === 'off') return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(audioVolume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      activeSoundNodesRef.current.push(masterGain);

      if (ambientSound === 'rain') {
        // Pink-filtered noise for rain on iron roof
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
          b6 = white * 0.115926;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(950, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        whiteNoise.start(0);
        activeSoundNodesRef.current.push(whiteNoise);
      } else if (ambientSound === 'alpha') {
        // 40Hz Isochronic / Alpha 10Hz binaural carrier
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(216, ctx.currentTime); // soothing base note A3

        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(10, ctx.currentTime); // 10Hz Alpha brainwave rhythm

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.3, ctx.currentTime);

        const ampGain = ctx.createGain();
        ampGain.gain.setValueAtTime(0.5, ctx.currentTime);

        lfo.connect(lfoGain.gain);
        osc.connect(ampGain);
        ampGain.connect(masterGain);

        osc.start();
        lfo.start();
        activeSoundNodesRef.current.push(osc, lfo);
      } else if (ambientSound === 'ticking') {
        // Clock ticking sound for exam pacing
        const tickInterval = setInterval(() => {
          if (!audioContextRef.current || audioContextRef.current.state === 'suspended') return;
          const clickOsc = audioContextRef.current.createOscillator();
          const clickGain = audioContextRef.current.createGain();
          clickOsc.type = 'triangle';
          clickOsc.frequency.setValueAtTime(1200, audioContextRef.current.currentTime);
          clickGain.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
          clickGain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.04);
          clickOsc.connect(clickGain);
          clickGain.connect(masterGain);
          clickOsc.start();
          clickOsc.stop(audioContextRef.current.currentTime + 0.05);
        }, 1000);
        activeSoundNodesRef.current.push({ stop: () => clearInterval(tickInterval) });
      } else if (ambientSound === 'waves') {
        // Lake Victoria gentle waves
        const bufferSize = ctx.sampleRate * 3;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, ctx.currentTime);

        const waveGain = ctx.createGain();
        waveGain.gain.setValueAtTime(0.1, ctx.currentTime);

        // Slow wave modulator
        const waveLfo = ctx.createOscillator();
        waveLfo.type = 'sine';
        waveLfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec wave swell
        const waveLfoGain = ctx.createGain();
        waveLfoGain.gain.setValueAtTime(0.25, ctx.currentTime);

        waveLfo.connect(waveGain.gain);
        noise.connect(filter);
        filter.connect(waveGain);
        waveGain.connect(masterGain);

        noise.start();
        waveLfo.start();
        activeSoundNodesRef.current.push(noise, waveLfo);
      } else if (ambientSound === 'crickets') {
        // Savannah crickets
        const cricketOsc = ctx.createOscillator();
        cricketOsc.type = 'sawtooth';
        cricketOsc.frequency.setValueAtTime(4500, ctx.currentTime);

        const cricketFilter = ctx.createBiquadFilter();
        cricketFilter.type = 'bandpass';
        cricketFilter.frequency.setValueAtTime(4500, ctx.currentTime);
        cricketFilter.Q.setValueAtTime(10, ctx.currentTime);

        const cricketLfo = ctx.createOscillator();
        cricketLfo.type = 'square';
        cricketLfo.frequency.setValueAtTime(16, ctx.currentTime);

        const cricketGain = ctx.createGain();
        cricketGain.gain.setValueAtTime(0.04, ctx.currentTime);

        cricketLfo.connect(cricketGain.gain);
        cricketOsc.connect(cricketFilter);
        cricketFilter.connect(cricketGain);
        cricketGain.connect(masterGain);

        cricketOsc.start();
        cricketLfo.start();
        activeSoundNodesRef.current.push(cricketOsc, cricketLfo);
      }
    } catch (err) {
      console.warn('Audio synthesis warning:', err);
    }

    return () => stopCurrentSound();
  }, [ambientSound, audioVolume]);

  const stopCurrentSound = () => {
    activeSoundNodesRef.current.forEach((node) => {
      try {
        if (typeof node.stop === 'function') node.stop();
        if (typeof node.disconnect === 'function') node.disconnect();
      } catch (e) {}
    });
    activeSoundNodesRef.current = [];
  };

  const playCompletionChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz Solfeggio clarity note
      osc.frequency.exponentialRampToValueAtTime(1056, ctx.currentTime + 1.2);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.6);
    } catch (e) {}
  };

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Preset Selection
  const handleSelectPreset = (mins: number) => {
    setIsActive(false);
    setIsBreak(false);
    setTimerPresetMinutes(mins);
    setSecondsLeft(mins * 60);
  };

  // Mini Calculator Evaluate
  const handleCalcButton = (val: string) => {
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('');
    } else if (val === '=') {
      try {
        // Safe evaluation for basic math
        const sanitized = calcInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/\^/g, '**');
        // Math evaluations
        // eslint-disable-next-line no-eval
        const res = Function(`"use strict"; return (${sanitized})`)();
        setCalcResult(String(Number(res).toFixed(4)).replace(/\.?0+$/, ''));
      } catch (e) {
        setCalcResult('Error');
      }
    } else if (val === '√') {
      try {
        const num = parseFloat(calcInput) || 0;
        setCalcResult(String(Math.sqrt(num).toFixed(4)).replace(/\.?0+$/, ''));
      } catch {
        setCalcResult('Error');
      }
    } else if (val === 'log') {
      try {
        const num = parseFloat(calcInput) || 0;
        setCalcResult(String(Math.log10(num).toFixed(4)).replace(/\.?0+$/, ''));
      } catch {
        setCalcResult('Error');
      }
    } else {
      setCalcInput((prev) => prev + val);
    }
  };

  // Calculate Focus Integrity Score
  const minutesTrained = Math.max(1, (timerPresetMinutes * 60 - secondsLeft) / 60);
  const integrityScore = Math.max(
    0,
    Math.min(100, Math.round(100 - tabSwitchCount * 8 - (unfocusedSeconds / 60) * 4))
  );

  const displayMinutes = Math.floor(secondsLeft / 60);
  const displaySeconds = secondsLeft % 60;
  const progressPercent = ((timerPresetMinutes * 60 - secondsLeft) / (timerPresetMinutes * 60 || 1)) * 100;

  return (
    <div className={`space-y-6 transition-all duration-300 ${isFullscreen ? 'p-6 bg-slate-950 min-h-screen' : ''}`}>
      {/* Top Banner / Mode Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <span>Chumba cha Utulivu (ElimuHub Focus &amp; Exam Lock)</span>
              <span>·</span>
              <span>100% Zero-Distraction Study &amp; Proctored Environment</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Distraction-Free Focus &amp; Exam Hall Room
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Designed to keep Kenyan students deeply immersed in learning and timed exams without leaving the app. Includes fullscreen immersion, anti-tab switch proctoring, Kenyan soundscapes, in-tab scientific calculator, and rough scratchpad.
            </p>
          </div>

          {/* Mode Switch & Fullscreen Action */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Mode Toggle */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center text-xs font-semibold">
              <button
                onClick={() => setSessionMode('study')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  sessionMode === 'study'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Zen Study Mode
              </button>
              <button
                onClick={() => setSessionMode('exam')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  sessionMode === 'exam'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Strict Exam Lock
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow transition-colors"
              title="Toggle Fullscreen Zen Mode"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4 text-emerald-400" /> : <Maximize2 className="w-4 h-4" />}
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Zen'}</span>
            </button>
          </div>
        </div>

        {/* Motivation Spark Quote */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
          <div className="italic text-slate-300 max-w-2xl font-serif">
            "{motivationalQuotes[quoteIndex].quote}" — <span className="text-emerald-400 font-sans font-bold">{motivationalQuotes[quoteIndex].author}</span>
          </div>
          <button
            onClick={() => setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length)}
            className="text-[11px] text-slate-400 hover:text-emerald-400 underline shrink-0 ml-2"
          >
            Next Quote
          </button>
        </div>
      </div>

      {/* MAIN FOCUS SUITE (Timer + Soundscapes + Live Tools) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CENTER COLUMN: BIG IMMERSIVE TIMER & CONTROLS */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6">
          {/* Header Row: Presets */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-slate-400">Timer Intervals:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: '25m Pomodoro', mins: 25 },
                  { label: '50m Deep Sprint', mins: 50 },
                  { label: '90m KCSE Block', mins: 90 },
                  { label: '150m KNEC Paper (2h30)', mins: 150 }
                ].map((p) => (
                  <button
                    key={p.mins}
                    onClick={() => handleSelectPreset(p.mins)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors border ${
                      timerPresetMinutes === p.mins
                        ? sessionMode === 'exam'
                          ? 'bg-rose-950 border-rose-600 text-rose-300 font-bold'
                          : 'bg-emerald-950 border-emerald-600 text-emerald-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
              <span>{streakCount} Day Focus Streak</span>
            </div>
          </div>

          {/* BIG DIGITAL TIMER CLOCK */}
          <div className="py-6 flex flex-col items-center justify-center relative">
            {/* Circular Progress Ring Effect */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="8"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke={sessionMode === 'exam' ? '#f43f5e' : isBreak ? '#38bdf8' : '#10b981'}
                  strokeWidth="8"
                  strokeDasharray="553"
                  strokeDashoffset={553 - (553 * progressPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>

              <div className="absolute flex flex-col items-center text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                  {isBreak ? '☕ REST & REHYDRATE' : sessionMode === 'exam' ? '📝 TIMED EXAM SESSION' : '🎯 DEEP FOCUS BLOCK'}
                </span>
                <div className="text-6xl sm:text-7xl font-black font-mono tracking-tighter text-white">
                  {String(displayMinutes).padStart(2, '0')}:{String(displaySeconds).padStart(2, '0')}
                </div>
                <span className="text-xs text-slate-400 font-mono mt-2">
                  {isActive ? 'Session in progress...' : 'Paused / Ready'}
                </span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => setIsActive(!isActive)}
                className={`px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl transition-all scale-100 hover:scale-105 ${
                  isActive
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : sessionMode === 'exam'
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/50'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
                }`}
              >
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isActive ? 'Pause Session' : 'Start Focus Session'}</span>
              </button>

              <button
                onClick={() => handleSelectPreset(timerPresetMinutes)}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* IN-TAB ACCELERATOR TOOLBAR (Scratchpad, Calculator, Audio) */}
          <div className="border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between gap-4">
            {/* Quick in-tab utility toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowScratchpad(!showScratchpad)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
                  showScratchpad
                    ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                Rough Scratchpad {showScratchpad ? '(Open)' : ''}
              </button>

              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
                  showCalculator
                    ? 'bg-cyan-950 border-cyan-600 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                Mini Calculator {showCalculator ? '(Open)' : ''}
              </button>

              <button
                onClick={() => setShowSyllabusDrawer(!showSyllabusDrawer)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
                  showSyllabusDrawer
                    ? 'bg-purple-950 border-purple-600 text-purple-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Quick Formula Vault
              </button>
            </div>

            {/* Ambient Soundscape Controller */}
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                {ambientSound === 'off' ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                Soundscape:
              </span>
              <select
                value={ambientSound}
                onChange={(e) => setAmbientSound(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 text-white text-xs rounded px-2 py-0.5 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="rain">🌧️ Nairobi Rain on Iron Roof</option>
                <option value="crickets">🦗 Mt. Kenya Evening Crickets</option>
                <option value="waves">🌊 Lake Victoria Gentle Waves</option>
                <option value="alpha">🧠 10Hz Alpha Focus Tone</option>
                <option value="ticking">⏱️ Exam Hall Clock Ticking</option>
                <option value="off">Mute / Silence</option>
              </select>

              {ambientSound !== 'off' && (
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.05"
                  value={audioVolume}
                  onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
                  className="w-16 accent-emerald-500 ml-1"
                  title="Soundscape Volume"
                />
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTEGRITY PROCTOR & QUICK TOOLS */}
        <div className="lg:col-span-4 space-y-6">
          {/* ANTI-DISTRACTION INTEGRITY METER */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className={`w-4 h-4 ${sessionMode === 'exam' ? 'text-rose-400' : 'text-emerald-400'}`} />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  {sessionMode === 'exam' ? 'KNEC Honor Code Proctor' : 'Focus Integrity Score'}
                </h3>
              </div>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                  integrityScore >= 90
                    ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
                    : integrityScore >= 70
                    ? 'bg-yellow-950 border-yellow-600 text-yellow-300'
                    : 'bg-rose-950 border-rose-600 text-rose-300'
                }`}
              >
                {integrityScore}% Focus
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Tab Switches</span>
                <strong className={`text-base ${tabSwitchCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {tabSwitchCount} {tabSwitchCount === 1 ? 'time' : 'times'}
                </strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Unfocused Time</span>
                <strong className="text-base text-cyan-400">{unfocusedSeconds}s</strong>
              </div>
            </div>

            {/* Activity Incident Log */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 block">Proctor Event Stream:</span>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 max-h-36 overflow-y-auto space-y-1 text-[11px] font-mono">
                {integrityLogs.map((log, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-1.5 ${
                      log.type === 'warning'
                        ? 'text-rose-400'
                        : log.type === 'good'
                        ? 'text-emerald-400'
                        : 'text-slate-400'
                    }`}
                  >
                    <span className="text-[10px] opacity-70">[{log.timestamp}]</span>
                    <span>{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* IN-TAB ROUGH SCRATCHPAD (Conditionally shown or collapsible) */}
          {showScratchpad && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5" />
                  Candidate Rough Work Scratchpad
                </span>
                <span className="text-[10px] text-slate-500">Auto-saved locally</span>
              </div>
              <textarea
                value={scratchpadText}
                onChange={(e) => setScratchpadText(e.target.value)}
                rows={6}
                placeholder="Write rough math calculations, mnemonics, or revision notes here without switching apps..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:ring-1 focus:ring-emerald-500 focus:outline-none resize-none"
              />
            </div>
          )}

          {/* IN-TAB MINI SCIENTIFIC CALCULATOR */}
          {showCalculator && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  Scientific Mini Calculator
                </span>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Display */}
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-right font-mono">
                <div className="text-xs text-slate-400 h-4">{calcInput || '0'}</div>
                <div className="text-lg font-bold text-cyan-400 h-7">{calcResult || '0'}</div>
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                {['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '√', '='].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleCalcButton(btn)}
                    className={`py-2 rounded font-bold transition-colors ${
                      btn === '='
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                        : btn === 'C'
                        ? 'bg-rose-950 text-rose-300 hover:bg-rose-900'
                        : ['÷', '×', '-', '+', '√'].includes(btn)
                        ? 'bg-slate-800 text-cyan-300 hover:bg-slate-700'
                        : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* IN-TAB QUICK FORMULA VAULT DRAWER */}
          {showSyllabusDrawer && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-purple-400">
                <span className="font-bold">Quick Formula &amp; Constant Lookup</span>
                <button
                  onClick={() => setShowSyllabusDrawer(false)}
                  className="text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-white font-mono"
              >
                {KENYA_COURSES.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 max-h-48 overflow-y-auto space-y-2 text-[11px] font-mono text-slate-300">
                {selectedSubjectId === 'hs-mathematics' && (
                  <div className="space-y-1">
                    <div>Quadratic: x = (-b ± √(b² - 4ac)) / 2a</div>
                    <div>Cosine Rule: a² = b² + c² - 2bc cos A</div>
                    <div>Compound Interest: A = P(1 + r/100)ⁿ</div>
                    <div>Circle Sector Area: (θ / 360) × πr²</div>
                  </div>
                )}
                {selectedSubjectId === 'hs-physics' && (
                  <div className="space-y-1">
                    <div>Equations of Motion: v = u + at, s = ut + ½at²</div>
                    <div>Newton's Second Law: F = ma = Δp / Δt</div>
                    <div>Hooke's Law: F = ke</div>
                    <div>Ohm's Law: V = IR</div>
                    <div>Gravity g: 9.8 m/s² (KNEC Standard)</div>
                  </div>
                )}
                {selectedSubjectId === 'hs-chemistry' && (
                  <div className="space-y-1">
                    <div>Mole Equation: n = mass / Molar Mass = C × V / 1000</div>
                    <div>Gas Volume at RTP: 24.0 dm³/mol (24,000 cm³)</div>
                    <div>Avogadro Constant: 6.022 × 10²³ entities/mol</div>
                    <div>Dilution Formula: M₁V₁ = M₂V₂</div>
                  </div>
                )}
                {selectedSubjectId === 'hs-biology' && (
                  <div className="space-y-1">
                    <div>Magnification: M = Image Size / Actual Size</div>
                    <div>Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</div>
                    <div>Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP</div>
                  </div>
                )}
                {!['hs-mathematics', 'hs-physics', 'hs-chemistry', 'hs-biology'].includes(selectedSubjectId) && (
                  <div>Key formulas and concepts for this unit are available in the full curriculum syllabus.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* EXAM LOCK TAB-SWITCH WARNING MODAL */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border-2 border-rose-600 rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-rose-950 border border-rose-600 flex items-center justify-center mx-auto text-rose-400">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white">KNEC Examination Hall Security Alert</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You navigated away from the active examination room (Window Blur / Tab Switch). Under strict KNEC examination regulations, candidates must remain on the active exam script.
            </p>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-rose-300">
              Total Recorded Infractions: <strong className="text-rose-400">{tabSwitchCount} / 3</strong>
            </div>

            <button
              onClick={() => setShowWarningModal(false)}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              I Understand &amp; Return to Exam Hall
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
