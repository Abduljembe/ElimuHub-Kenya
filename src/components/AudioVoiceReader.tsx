import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Headphones,
  BookOpen
} from 'lucide-react';

interface AudioVoiceReaderProps {
  initialText?: string;
  title?: string;
}

export const AudioVoiceReader: React.FC<AudioVoiceReaderProps> = ({
  initialText = 'Welcome to ElimuHub Kenya. Active audio revision stimulates multi-sensory learning and boosts memory retention for national examinations. Select any topic or paste text to listen.',
  title = 'National Voice Study Companion'
}) => {
  const [text, setText] = useState<string>(initialText);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [supported, setSupported] = useState<boolean>(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlay = () => {
    if (!supported || !text.trim()) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (supported && isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (supported) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const presets = [
    {
      title: 'The Samaritan: Thematic Summary',
      content:
        'In John Lara\'s play The Samaritan, two high school students, Alvita and Montano, create a civic whistleblowing mobile app called The Samaritan. The application enables ordinary citizens of Maracas Municipality to document public funds embezzlement and tender scams, exposing Mayor Mossi-oa-Tunya and his corrupt municipal council.'
    },
    {
      title: 'Physics: Bernoulli\'s Principle',
      content:
        'Bernoulli\'s Principle states that for an incompressible non-viscous fluid undergoing streamline flow, where the velocity of the fluid increases, the local static pressure decreases. On an aircraft wing, air travels faster over the curved upper surface, creating a low-pressure zone above that generates net aerodynamic lift.'
    },
    {
      title: 'Biology: Osmosis & Plasmolysis',
      content:
        'Osmosis is the net movement of water molecules from a region of higher water potential to a region of lower water potential across a semi-permeable membrane. In hypertonic solutions, plant cells undergo plasmolysis where the cytoplasm shrinks away from the cellulose cell wall.'
    },
    {
      title: 'Kiswahili: Falsafa ya Bembea ya Maisha',
      content:
        'Bembea ya Maisha ni tamthilia inayodhihirisha jinsi maisha ya binadamu yanavyobadilika kama bembea. Yona alikuwa mwalimu mwenye hadhi lakini akatumbukia kwenye ulevi; baadaye binti zake waliosomeshwa wanamsaidia mama yao Sara kupata matibabu hospitalini na kurejesha furaha ya kifamilia.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950/80 via-slate-900 to-slate-900 border border-teal-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-teal-400">
              <span>Multi-Sensory Audio Revision</span>
              <span>·</span>
              <span>Hands-Free Speech Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Audio Text-to-Speech (TTS) Voice Study Reader
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Listen to curriculum lessons, set book chapters, and exam summaries hands-free while commuting or revising. Powered by in-browser speech synthesis.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isPlaying && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-teal-950 border border-teal-500/40 text-teal-300 text-xs font-mono animate-pulse">
                <Volume2 className="w-4 h-4 text-teal-400" />
                <span>Reading Aloud...</span>
              </div>
            )}
          </div>
        </div>

        {/* Audio Player Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isPaused ? 'Resume Audio' : 'Play Lesson'}</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg transition-colors"
              >
                <Pause className="w-4 h-4" />
                <span>Pause Audio</span>
              </button>
            )}

            <button
              onClick={handleStop}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Stop Speech"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Narration Speed:</span>
            {[0.8, 1.0, 1.2, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => setSpeechRate(speed)}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  speechRate === speed
                    ? 'bg-teal-950 border-teal-500 text-teal-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Text Editor / Audio Script Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Text Input / Script */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold">
              Lesson Text Script to Read Aloud:
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              {text.length} Characters · ~{Math.ceil(text.split(' ').length / 130)} min audio
            </span>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans focus:outline-none focus:border-teal-500 resize-y"
            placeholder="Type or paste any curriculum lesson notes, literature chapter summary, or formula explanations here..."
          />
        </div>

        {/* Right: Quick Study Audio Presets */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <span className="text-xs font-mono uppercase text-teal-400 font-bold block flex items-center gap-1.5">
            <Headphones className="w-4 h-4" />
            Quick Study Audio Presets:
          </span>

          <div className="space-y-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setText(p.content);
                  handleStop();
                }}
                className="w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all text-xs"
              >
                <strong className="text-white font-bold block">{p.title}</strong>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{p.content}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
