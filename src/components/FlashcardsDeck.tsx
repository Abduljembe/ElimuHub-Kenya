import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { FLASHCARD_DECKS, Flashcard } from '../data/flashcardsData';

export const FlashcardsDeck: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Mastered card IDs persisted in localStorage
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('elimuhub_mastered_flashcards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('elimuhub_mastered_flashcards', JSON.stringify(masteredIds));
    } catch {
      // storage unavailable
    }
  }, [masteredIds]);

  const subjects = ['all', 'Chemistry', 'Biology', 'Physics', 'Mathematics', 'Medicine (MBChB)', 'Law (LLB)'];

  const filteredCards =
    selectedSubject === 'all'
      ? FLASHCARD_DECKS
      : FLASHCARD_DECKS.filter((c) => c.subject.includes(selectedSubject));

  const currentCard: Flashcard = filteredCards[currentIndex] || filteredCards[0];
  const isMastered = masteredIds.includes(currentCard.id);

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleRate = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (rating === 'easy' || rating === 'good') {
      if (!masteredIds.includes(currentCard.id)) {
        setMasteredIds((prev) => [...prev, currentCard.id]);
      }
    } else if (rating === 'again') {
      setMasteredIds((prev) => prev.filter((id) => id !== currentCard.id));
    }
    handleNext();
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex(Math.floor(Math.random() * filteredCards.length));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950/80 via-slate-900 to-slate-900 border border-teal-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-teal-400">
              <span>Active Recall &amp; Spaced Repetition</span>
              <span>·</span>
              <span>High-Yield National Flashcards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              National Curriculum Mastery Decks
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Drill crucial definitions, laws, chemical reactions, formulas, and examiner traps. Flip to test recall and track your active retention.
            </p>
          </div>

          {/* Retention Stats */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block">Deck Progress</span>
              <strong className="text-sm font-mono text-white">
                {currentIndex + 1} / {filteredCards.length}
              </strong>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-[10px] font-mono text-slate-400 block">Mastered</span>
              <strong className="text-sm font-mono text-emerald-400">
                {masteredIds.length} Cards
              </strong>
            </div>
          </div>
        </div>

        {/* Subject Filter Bar */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-800/80 overflow-x-auto text-xs font-medium">
          <span className="text-slate-500 uppercase font-mono mr-1">Deck:</span>
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubject(sub);
                setCurrentIndex(0);
                setIsFlipped(false);
                setShowHint(false);
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors border ${
                selectedSubject === sub
                  ? 'bg-teal-950 border-teal-500/80 text-teal-300 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sub === 'all' ? 'All Subjects' : sub}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flippable Flashcard Canvas */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div
          onClick={handleFlip}
          className={`min-h-[340px] rounded-2xl p-8 border cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-2xl relative select-none ${
            isFlipped
              ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-teal-500/60 ring-1 ring-teal-500/40'
              : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-slate-800 hover:border-slate-700'
          }`}
        >
          {/* Top Bar on Card */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-teal-400 font-semibold uppercase">
              {currentCard.subject} · {currentCard.formOrYear}
            </span>
            <div className="flex items-center gap-2">
              {isMastered && (
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Mastered
                </span>
              )}
              <span className="text-slate-500">
                {isFlipped ? 'Answer View' : 'Question View (Click to Flip)'}
              </span>
            </div>
          </div>

          {/* Center Card Content */}
          <div className="my-auto py-6">
            {!isFlipped ? (
              <div className="space-y-4 text-center">
                <span className="text-xs font-mono uppercase text-slate-500">
                  Topic: {currentCard.topic}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                  {currentCard.frontPrompt}
                </h3>
                {showHint && currentCard.hint && (
                  <div className="p-3 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs text-amber-200 text-left animate-in fade-in">
                    <strong className="block text-[10px] font-mono text-amber-400 uppercase mb-0.5">
                      Hint:
                    </strong>
                    {currentCard.hint}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 text-left animate-in fade-in">
                <span className="text-xs font-mono uppercase text-teal-400 font-semibold block">
                  Model Answer / Proof:
                </span>
                <p className="text-base sm:text-lg text-slate-100 font-medium whitespace-pre-line leading-relaxed">
                  {currentCard.backAnswer}
                </p>

                {currentCard.knecTrap && (
                  <div className="p-3 bg-rose-950/30 border border-rose-500/40 rounded-xl text-xs text-rose-200 space-y-1">
                    <span className="font-bold text-[10px] font-mono uppercase text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      KNEC Examiner Trap Alert:
                    </span>
                    <p>{currentCard.knecTrap}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Card Footer */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-4">
            <div className="flex items-center gap-1.5 flex-wrap">
              {currentCard.tags.map((t, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400 border border-slate-800">
                  #{t}
                </span>
              ))}
            </div>

            {!isFlipped && currentCard.hint && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHint((prev) => !prev);
                }}
                className="text-amber-400 hover:text-amber-300 text-xs font-medium flex items-center gap-1"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Spaced Repetition Rating Buttons (Only shown when flipped) */}
        {isFlipped ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block text-center">
              Rate your recall difficulty:
            </span>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleRate('again')}
                className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-500/60 hover:bg-rose-900 text-rose-300 text-xs font-bold transition-colors"
              >
                Again
                <span className="block text-[9px] font-normal text-rose-400 mt-0.5">&lt; 1 min</span>
              </button>
              <button
                onClick={() => handleRate('hard')}
                className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-500/60 hover:bg-amber-900 text-amber-300 text-xs font-bold transition-colors"
              >
                Hard
                <span className="block text-[9px] font-normal text-amber-400 mt-0.5">2 days</span>
              </button>
              <button
                onClick={() => handleRate('good')}
                className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/60 hover:bg-cyan-900 text-cyan-300 text-xs font-bold transition-colors"
              >
                Good
                <span className="block text-[9px] font-normal text-cyan-400 mt-0.5">5 days</span>
              </button>
              <button
                onClick={() => handleRate('easy')}
                className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/60 hover:bg-emerald-900 text-emerald-300 text-xs font-bold transition-colors"
              >
                Easy
                <span className="block text-[9px] font-normal text-emerald-400 mt-0.5">10 days</span>
              </button>
            </div>
          </div>
        ) : (
          /* Normal Navigation Controls */
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleShuffle}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition-colors"
              title="Shuffle Deck"
            >
              <Shuffle className="w-3.5 h-3.5 text-teal-400" />
              <span>Shuffle</span>
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
