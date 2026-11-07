import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, Flame, ArrowRight, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { playSuccessChime, playErrorAlert, playTapSound, isSoundEnabled, setSoundEnabled } from '../utils/soundEffects';
import { saveToWeakSpots } from '../utils/weakSpots';

interface DailyQuickChallengeProps {
  studentForm: string;
  onEarnXp: (amount: number) => void;
}

interface MiniChallenge {
  id: string;
  form: string;
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  examinerTip: string;
}

const CHALLENGES: MiniChallenge[] = [
  {
    id: 'c1',
    form: 'Form 1',
    subject: 'Biology',
    question: 'What happens to a red blood cell when placed in a hypertonic (concentrated salt) solution?',
    options: [
      'It absorbs water and bursts (haemolysis)',
      'It loses water by osmosis and shrinks (crenation)',
      'It becomes turgid and expands',
      'No change occurs across the membrane'
    ],
    correctIndex: 1,
    explanation: 'In a hypertonic solution, water leaves the cell by osmosis from high to low water potential, causing crenation (shrivelling).',
    examinerTip: 'KNEC Paper 1 frequently tests the difference between crenation (animals) and plasmolysis (plants).'
  },
  {
    id: 'c2',
    form: 'Form 1',
    subject: 'Chemistry',
    question: 'Which part of a non-luminous Bunsen burner flame is the hottest zone for heating?',
    options: [
      'The pale blue outer mantle zone (almost invisible)',
      'The inner dark cone of unburnt gas',
      'The greenish-blue middle zone',
      'The base of the chimney'
    ],
    correctIndex: 0,
    explanation: 'The outer mantle has complete combustion due to maximum oxygen supply from the surrounding air.',
    examinerTip: 'Do not confuse with luminous flames where yellow soot is produced due to incomplete combustion.'
  },
  {
    id: 'c3',
    form: 'Form 2',
    subject: 'Physics',
    question: 'A current of 2.0 A flows through a resistor of 6.0 Ω for 5 seconds. What is the potential difference across it?',
    options: [
      '3.0 V',
      '8.0 V',
      '12.0 V',
      '60.0 V'
    ],
    correctIndex: 2,
    explanation: 'From Ohm’s Law, V = I × R = 2.0 A × 6.0 Ω = 12.0 V.',
    examinerTip: 'Remember: Time is only used if calculating electrical energy (E = VIt = 60J), not potential difference.'
  },
  {
    id: 'c4',
    form: 'Form 2',
    subject: 'Mathematics',
    question: 'Find the reciprocal of 0.025 using mathematical tables or mental arithmetic.',
    options: [
      '2.5',
      '4.0',
      '40.0',
      '250.0'
    ],
    correctIndex: 2,
    explanation: '0.025 = 25/1000 = 1/40. Therefore, the reciprocal 1/(1/40) = 40.0.',
    examinerTip: 'Always convert decimals to standard index form (2.5 × 10⁻²) before looking up reciprocal tables.'
  },
  {
    id: 'c5',
    form: 'Form 3',
    subject: 'Chemistry',
    question: 'What is the colour transition of Methyl Orange indicator when titrating hydrochloric acid against sodium hydroxide at the end point?',
    options: [
      'Pink to colourless',
      'Yellow to orange',
      'Colourless to pink',
      'Orange to deep blue'
    ],
    correctIndex: 1,
    explanation: 'In alkaline NaOH, methyl orange is yellow. At equivalence, it changes to orange (pH 3.1–4.4). In excess acid, it turns pink.',
    examinerTip: 'KNEC Paper 3 penalizes writing "red" instead of "pink" or "orange" for methyl orange transition.'
  },
  {
    id: 'c6',
    form: 'Form 4',
    subject: 'Geography',
    question: 'On a 1:50,000 topographical map, what actual ground distance is represented by 4 cm on the map?',
    options: [
      '200 meters',
      '1 kilometer',
      '2 kilometers',
      '4 kilometers'
    ],
    correctIndex: 2,
    explanation: 'At 1:50,000, 1 cm = 50,000 cm = 0.5 km. Therefore, 4 cm = 4 × 0.5 km = 2.0 km.',
    examinerTip: 'Always convert map centimetres to kilometres directly by dividing by 2 (e.g. 4 cm ÷ 2 = 2 km).'
  }
];

export const DailyQuickChallenge: React.FC<DailyQuickChallengeProps> = ({ studentForm, onEarnXp }) => {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled);

  // Filter challenges matching student's form if possible, otherwise rotate all
  const filtered = CHALLENGES.filter((c) => studentForm === 'KCSE Candidate' || c.form === studentForm);
  const activeList = filtered.length > 0 ? filtered : CHALLENGES;
  const item = activeList[challengeIdx % activeList.length];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    playTapSound();
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === item.correctIndex) {
      playSuccessChime();
      onEarnXp(20);
    } else {
      playErrorAlert();
      saveToWeakSpots({
        id: item.id,
        subject: item.subject,
        topic: item.form,
        question: item.question,
        options: item.options,
        correctAnswer: item.correctIndex,
        explanation: item.explanation
      });
    }
  };

  const handleNext = () => {
    playTapSound();
    setSelectedOpt(null);
    setIsAnswered(false);
    setChallengeIdx((prev) => prev + 1);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playTapSound();
  };

  const isCorrect = selectedOpt === item.correctIndex;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <Flame className="w-4 h-4 fill-emerald-400 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-emerald-400 font-bold uppercase">Quick Quiz</span>
              <span className="text-slate-500">·</span>
              <span className="text-cyan-300 font-semibold">{item.subject}</span>
              <span className="text-slate-500">·</span>
              <span className="text-amber-400 font-bold">{item.form}</span>
            </div>
            <p className="text-[11px] text-slate-400">Answer for +20 XP:</p>
          </div>
        </div>

        <button
          onClick={toggleSound}
          className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white shrink-0"
          title={soundOn ? 'Mute sound' : 'Unmute sound'}
        >
          {soundOn ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
        </button>
      </div>

      {/* Question Text */}
      <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
        {item.question}
      </h3>

      {/* 4 Interactive Choice Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {item.options.map((opt, idx) => {
          let btnClass = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-emerald-500/60 hover:bg-slate-900';
          if (isAnswered) {
            if (idx === item.correctIndex) {
              btnClass = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-1 ring-emerald-400 shadow-md';
            } else if (idx === selectedOpt) {
              btnClass = 'bg-rose-950/90 border-rose-500 text-rose-200 ring-1 ring-rose-400';
            } else {
              btnClass = 'opacity-40 bg-slate-950/40 border-slate-900 text-slate-500';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-2.5 min-h-[44px] ${btnClass}`}
            >
              <span className="w-5 h-5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="leading-snug">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback Panel */}
      {isAnswered && (
        <div
          className={`p-3 rounded-xl text-xs space-y-1.5 border animate-fade-in ${
            isCorrect
              ? 'bg-emerald-950/70 border-emerald-600/80 text-emerald-200'
              : 'bg-rose-950/70 border-rose-700/80 text-rose-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Correct! +20 XP 🎉</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Answer is Option {String.fromCharCode(65 + item.correctIndex)}.</span>
                </>
              )}
            </span>

            <button
              onClick={handleNext}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px] flex items-center gap-1 border border-slate-700 shrink-0"
            >
              <span>Next Q</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <p className="text-[11px] opacity-90 leading-relaxed font-sans">{item.explanation}</p>
          <p className="text-[10px] font-mono text-cyan-300 pt-1 border-t border-slate-800/60">
            <strong>Tip:</strong> {item.examinerTip}
          </p>
        </div>
      )}
    </div>
  );
};
