import React, { useState, useEffect } from 'react';
import {
  Flame,
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  Zap,
  Calendar,
  RotateCcw,
  Star,
  Users,
  Clock,
  ArrowRight
} from 'lucide-react';
import { playTapSound, playSuccessChime, playStreakFlameSound, playErrorAlert } from '../utils/soundEffects';
import { saveToWeakSpots } from '../utils/weakSpots';

interface DailyQuestion {
  id: string;
  category: 'Math' | 'Science' | 'Language' | 'Humanity' | 'Applied';
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  knecRule: string;
}

const DAILY_QUESTIONS: DailyQuestion[] = [
  {
    id: 'dq-math-1',
    category: 'Math',
    subject: 'Mathematics (121)',
    question: 'Find the coordinates of the turning point of the curve y = 2x³ - 6x² + 6x - 5 and determine its nature using the second derivative.',
    options: [
      'Point (1, -3), Point of Inflection since d²y/dx² = 0',
      'Point (1, -3), Local Minimum since d²y/dx² > 0',
      'Point (2, -1), Local Maximum since d²y/dx² < 0',
      'Point (0, -5), Turning Point'
    ],
    correctAnswer: 0,
    explanation: 'dy/dx = 6x² - 12x + 6 = 6(x - 1)² = 0 ⇒ x = 1. At x = 1, y = 2(1) - 6(1) + 6(1) - 5 = -3. d²y/dx² = 12x - 12 = 0 at x = 1. Since dy/dx does not change sign on either side of x = 1, it is a point of inflection.',
    knecRule: 'Always test signs of dy/dx on either side of stationary point when d²y/dx² = 0.'
  },
  {
    id: 'dq-sci-2',
    category: 'Science',
    subject: 'Chemistry (233)',
    question: 'Which of the following cations forms a white precipitate with aqueous sodium hydroxide that dissolves in excess, but forms a white precipitate with aqueous ammonia that remains INSOLUBLE in excess?',
    options: [
      'Al³⁺ and Pb²⁺',
      'Zn²⁺ only',
      'Cu²⁺ only',
      'Mg²⁺ and Ca²⁺'
    ],
    correctAnswer: 0,
    explanation: 'Al³⁺ and Pb²⁺ are amphoteric and dissolve in excess NaOH to form aluminate [Al(OH)₄]⁻ and plumbate [Pb(OH)₄]²⁻, but their precipitates do not dissolve in excess NH₃. Zn²⁺ dissolves in both.',
    knecRule: 'Do not confuse Al³⁺ with Zn²⁺; Zn²⁺ dissolves in excess aqueous ammonia to form [Zn(NH₃)₄]²⁺.'
  },
  {
    id: 'dq-lang-3',
    category: 'Language',
    subject: 'English (101)',
    question: 'Identify the word with a silent letter from the choices below:',
    options: [
      'Subtle (silent "b")',
      'Brisk (all pronounced)',
      'Plunge (all pronounced)',
      'Stable (all pronounced)'
    ],
    correctAnswer: 0,
    explanation: 'In "subtle" /ˈsʌt.əl/, the letter "b" is completely silent. Other examples include doubt, dumb, debt, thumb, lamb.',
    knecRule: 'Oral English Paper 1 regularly tests silent consonants (b in subtle/doubt, p in psalm/psychology, l in calm/salmon).'
  },
  {
    id: 'dq-hum-4',
    category: 'Humanity',
    subject: 'History & Government (311)',
    question: 'State the primary reason why Nabongo Mumia of the Wanga Kingdom collaborated with the British colonial administration in Western Kenya:',
    options: [
      'To secure British military assistance against his traditional enemies (Luo of Ugenya and Bukusu)',
      'To convert his subjects to Anglican Christianity',
      'Because he lacked an army',
      'To introduce formal Western secondary schools'
    ],
    correctAnswer: 0,
    explanation: 'Mumia sought British military alliance and modern firearms to expand his paramountcy and consolidate authority against formidable neighbors such as the Luo of Ugenya, Bukusu, and Nandi.',
    knecRule: 'State the political and military motivations clearly to earn the 2 marks.'
  },
  {
    id: 'dq-app-5',
    category: 'Applied',
    subject: 'Business Studies (565)',
    question: 'A trader purchased goods worth Ksh 100,000 on credit with terms 5/10, n/30. If the invoice was paid within 8 days, how much did the trader pay?',
    options: [
      'Ksh 95,000 (after 5% cash discount)',
      'Ksh 100,000 (full invoice value)',
      'Ksh 90,000 (after 10% discount)',
      'Ksh 50,000 (half payment)'
    ],
    correctAnswer: 0,
    explanation: 'Terms "5/10, n/30" mean a 5% cash discount is granted if payment is made within 10 days; otherwise the net invoice is due in 30 days. Paying within 8 days qualifies for 5% off: 100,000 - 5,000 = Ksh 95,000.',
    knecRule: 'Distinguish between trade discount (deducted immediately on catalogue price) and cash discount (prompt payment incentive).'
  }
];

export const KcseDailyStreakMaster: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [streakData, setStreakData] = useState<{
    streakDays: number;
    longestStreak: number;
    totalXp: number;
    lastDate: string;
  }>(() => {
    try {
      const saved = localStorage.getItem('elimuhub_daily_streak');
      return saved
        ? JSON.parse(saved)
        : { streakDays: 3, longestStreak: 7, totalXp: 350, lastDate: '' };
    } catch {
      return { streakDays: 3, longestStreak: 7, totalXp: 350, lastDate: '' };
    }
  });

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSelectOption = (qId: string, optionIdx: number) => {
    if (isSubmitted) return;
    playTapSound();
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    DAILY_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    const xpEarned = score * 20;

    if (score >= 3) {
      playSuccessChime();
      playStreakFlameSound();
    } else {
      playErrorAlert();
    }

    // Save any missed questions to Weak Spots Bank for active recall
    DAILY_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] !== q.correctAnswer) {
        saveToWeakSpots({
          id: q.id,
          subject: q.subject,
          topic: q.category,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation
        });
      }
    });

    const newStreak = streakData.lastDate === todayStr ? streakData.streakDays : streakData.streakDays + 1;
    const updated = {
      streakDays: newStreak,
      longestStreak: Math.max(newStreak, streakData.longestStreak),
      totalXp: streakData.totalXp + xpEarned,
      lastDate: todayStr
    };
    setStreakData(updated);
    localStorage.setItem('elimuhub_daily_streak', JSON.stringify(updated));
  };

  const score = calculateScore();
  const allAnswered = Object.keys(userAnswers).length === DAILY_QUESTIONS.length;

  return (
    <div className="space-y-4 sm:space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
              <span>Daily Practice</span>
              <span>·</span>
              <span>5 Subjects Fresh Daily</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>🔥 Daily Streak &amp; XP Arena</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Solve 5 quick exam questions every day. Keep your streak alive and earn up to +100 XP!
            </p>
          </div>

          {/* Gamified HUD Stats */}
          <div className="flex items-center gap-3 bg-slate-950 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-800 text-xs font-mono shrink-0 self-start sm:self-auto">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
              <div>
                <span className="text-slate-400 block text-[9px] sm:text-[10px]">Streak</span>
                <strong className="text-white text-sm sm:text-base">{streakData.streakDays}d</strong>
              </div>
            </div>

            <div className="border-l border-slate-800 pl-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-slate-400 block text-[9px] sm:text-[10px]">XP</span>
                <strong className="text-emerald-400 text-sm sm:text-base">{streakData.totalXp}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio: Questions Left + Leaderboard Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 5 Daily Questions */}
        <div className="lg:col-span-8 space-y-4">
          {DAILY_QUESTIONS.map((q, idx) => {
            const chosen = userAnswers[q.id];
            const isCorrect = chosen === q.correctAnswer;
            return (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3.5 hover:border-slate-700 transition-colors"
              >
                {/* Category Badge & Subject */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] uppercase font-bold">
                      {q.category}
                    </span>
                    <span className="text-slate-400 font-semibold">{q.subject}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Question {idx + 1} of 5</span>
                </div>

                {/* Question Prompt */}
                <h3 className="text-sm font-bold text-white leading-relaxed font-sans">
                  {q.question}
                </h3>

                {/* Options List */}
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let btnClass = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (isSubmitted) {
                      if (optIdx === q.correctAnswer) {
                        btnClass = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnClass = 'bg-emerald-950/80 border-emerald-500 text-white font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 font-sans ${btnClass}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on submission */}
                {isSubmitted && (
                  <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-sans animate-in fade-in duration-150">
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      {isCorrect ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct (+20 XP)</span>
                        </span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrect (Correct: {String.fromCharCode(65 + q.correctAnswer)})</span>
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {q.explanation}
                    </p>
                    <div className="p-2 bg-amber-950/30 border border-amber-900/40 rounded-lg text-[10px] font-mono text-amber-300">
                      ⚠️ <strong>Examiner Note:</strong> {q.knecRule}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Submit Action Bar */}
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs font-mono shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {allAnswered
                  ? 'Submit & Claim +XP'
                  : `Answer All 5 Questions (${Object.keys(userAnswers).length}/5)`}
              </span>
            </button>
          ) : (
            <div className="p-3.5 sm:p-4 bg-slate-900 border border-emerald-500/50 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  Result: <strong>{score} / 5 Correct</strong> (+{score * 20} XP)
                </span>
              </div>
              <span className="text-emerald-400 font-bold text-[11px]">New set arrives tomorrow!</span>
            </div>
          )}
        </div>

        {/* Right Column: Achievements & National Leaderboard */}
        <div className="lg:col-span-4 space-y-4">
          {/* Milestone Badges */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Your Badges</span>
            </h3>

            <div className="space-y-2">
              {[
                { title: 'A-Plain Material', desc: 'Scored 5/5 on Daily Challenge', earned: score === 5 },
                { title: 'Consistency Warrior', desc: 'Maintained a 3+ day revision streak', earned: streakData.streakDays >= 3 },
                { title: 'Simba wa Sarufi', desc: 'Mastered English & Kiswahili questions', earned: true },
                { title: 'Calculus Maestro', desc: 'Solved Form 4 calculus differentiation', earned: isSubmitted }
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs transition-all ${
                    badge.earned
                      ? 'bg-slate-950 border-emerald-500/50 text-slate-200'
                      : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      badge.earned ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-slate-800 text-slate-600'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <div>
                    <strong className="block text-white text-[11px] font-mono">{badge.title}</strong>
                    <span className="text-[10px] text-slate-400 block">{badge.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* National Mock Leaderboard Simulation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Kenya Student Rank</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">Top 1%</span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              {[
                { rank: 1, name: 'Brian O. (Alliance High)', streak: 42, xp: 2150 },
                { rank: 2, name: 'Faith W. (Kenya High)', streak: 38, xp: 1980 },
                { rank: 3, name: 'Kevin K. (Mangu High)', streak: 35, xp: 1820 },
                { rank: 4, name: 'Amina H. (Precious Blood)', streak: 29, xp: 1610 },
                { rank: 5, name: 'You (ElimuHub Candidate)', streak: streakData.streakDays, xp: streakData.totalXp, isUser: true }
              ].map((c) => (
                <div
                  key={c.rank}
                  className={`p-2.5 rounded-xl border flex items-center justify-between ${
                    c.isUser
                      ? 'bg-emerald-950/80 border-emerald-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">#{c.rank}</span>
                    <span className="truncate max-w-[140px] text-[11px]">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-amber-400">🔥 {c.streak}d</span>
                    <span className="text-emerald-400">{c.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
