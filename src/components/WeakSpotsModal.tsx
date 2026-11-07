import React, { useState } from 'react';
import { Target, X, CheckCircle2, RotateCcw, AlertTriangle, ArrowRight, Trash2, Trophy, Sparkles } from 'lucide-react';
import { WeakSpotItem, getWeakSpots, removeFromWeakSpots, clearWeakSpots } from '../utils/weakSpots';
import { playTapSound, playSuccessChime, playErrorAlert } from '../utils/soundEffects';

interface WeakSpotsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddXP?: (points: number) => void;
}

export const WeakSpotsModal: React.FC<WeakSpotsModalProps> = ({
  isOpen,
  onClose,
  onAddXP
}) => {
  const [items, setItems] = useState<WeakSpotItem[]>(() => getWeakSpots());
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [masteredCount, setMasteredCount] = useState<number>(0);

  if (!isOpen) return null;

  const currentItem = items[activeIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    playTapSound();
    setSelectedOpt(idx);
    setIsAnswered(true);

    const isCorrect = currentItem && (
      typeof currentItem.correctAnswer === 'number'
        ? idx === currentItem.correctAnswer
        : String.fromCharCode(65 + idx) === String(currentItem.correctAnswer).toUpperCase()
    );

    if (isCorrect) {
      playSuccessChime();
      setMasteredCount((prev) => prev + 1);
      if (onAddXP) onAddXP(15);
      // Remove from weak spots as mastered
      if (currentItem) {
        const updated = removeFromWeakSpots(currentItem.id);
        setItems(updated);
      }
    } else {
      playErrorAlert();
    }
  };

  const handleNext = () => {
    playTapSound();
    setSelectedOpt(null);
    setIsAnswered(false);
    if (activeIdx < items.length - 1) {
      setActiveIdx((prev) => prev + 1);
    } else {
      setActiveIdx(0);
    }
  };

  const handleClearAll = () => {
    playTapSound();
    clearWeakSpots();
    setItems([]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="p-2 bg-rose-950 text-rose-400 border border-rose-800 rounded-xl shrink-0">
              <Target className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xs sm:text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Weak Spots Bank
                </h2>
                <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-1.5 py-0.5 rounded-full font-bold">
                  {items.length} Missed
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Re-test questions you missed until you master them (+15 XP each)
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center">
                <Trophy className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono">No Weak Spots Right Now!</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                You haven't missed any questions yet, or you already mastered all previous errors. Take more quizzes to train your skills!
              </p>
            </div>
          ) : currentItem ? (
            <div className="space-y-4">
              {/* Progress & Subject */}
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-400 text-[10px] font-bold">
                    {currentItem.subject}
                  </span>
                  {currentItem.topic && (
                    <span className="text-slate-400 text-[10px] truncate max-w-[150px]">{currentItem.topic}</span>
                  )}
                </div>
                <span className="text-slate-500 text-[10px]">
                  {activeIdx + 1} of {items.length}
                </span>
              </div>

              {/* Question Text */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-white leading-relaxed">
                {currentItem.question}
              </div>

              {/* Options */}
              {currentItem.options && currentItem.options.length > 0 ? (
                <div className="space-y-2">
                  {currentItem.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    const isCorrect = typeof currentItem.correctAnswer === 'number'
                      ? optIdx === currentItem.correctAnswer
                      : String.fromCharCode(65 + optIdx) === String(currentItem.correctAnswer).toUpperCase();

                    let btnClass = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-rose-950/90 border-rose-500 text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${btnClass} cursor-pointer`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Flashcard style reveal if no options */
                <div className="space-y-2">
                  {!isAnswered ? (
                    <button
                      onClick={() => {
                        playTapSound();
                        setIsAnswered(true);
                      }}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-mono font-bold"
                    >
                      Reveal Correct Answer &amp; Working
                    </button>
                  ) : (
                    <div className="p-3 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-1 text-xs">
                      <span className="text-emerald-400 font-bold font-mono text-[10px] uppercase block">
                        Correct Answer:
                      </span>
                      <p className="text-white font-semibold">{currentItem.correctAnswer}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Explanation on Answered */}
              {isAnswered && (
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1.5 text-xs animate-in fade-in">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                    Examiner Explanation:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {currentItem.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer Navigation */}
        {items.length > 0 && (
          <div className="p-3.5 sm:p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/80 text-xs font-mono">
            <button
              onClick={handleClearAll}
              className="text-slate-500 hover:text-rose-400 flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Bank</span>
            </button>

            {isAnswered && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
