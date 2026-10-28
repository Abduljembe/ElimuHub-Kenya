import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Users,
  Feather,
  Award,
  Layers,
  ChevronRight,
  Printer
} from 'lucide-react';
import { KCSE_SET_BOOKS, SetBookItem } from '../data/kcseSetBooks';

interface SetBooksGuideProps {
  onAskAI: (subject: string, topic: string, level: string) => void;
}

export const SetBooksGuide: React.FC<SetBooksGuideProps> = ({ onAskAI }) => {
  const [selectedBookId, setSelectedBookId] = useState<string>(KCSE_SET_BOOKS[0].id);
  const [activeTab, setActiveTab] = useState<'themes' | 'characters' | 'style' | 'essays'>('themes');

  const activeBook: SetBookItem =
    KCSE_SET_BOOKS.find((b) => b.id === selectedBookId) || KCSE_SET_BOOKS[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
              <span>KNEC KCSE Paper 3 Compulsory Literature</span>
              <span>·</span>
              <span>English (101/3) &amp; Kiswahili Fasihi (102/3)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              National Set Books Master Analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Complete thematic analyses, character studies, stylistic techniques, and official KNEC 20-mark essay writing rubrics for all current KICD approved set texts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print Notes</span>
            </button>
            <button
              onClick={() =>
                onAskAI(
                  activeBook.language === 'English' ? 'English Literature (101/3)' : 'Fasihi ya Kiswahili (102/3)',
                  `${activeBook.title} by ${activeBook.author}`,
                  'KCSE High School'
                )
              }
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Examiner</span>
            </button>
          </div>
        </div>

        {/* Set Books Selector Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {KCSE_SET_BOOKS.map((book) => {
            const isSelected = book.id === activeBook.id;
            return (
              <button
                key={book.id}
                onClick={() => setSelectedBookId(book.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-950/70 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={`px-1.5 py-0.5 rounded ${book.language === 'English' ? 'bg-cyan-950 text-cyan-400' : 'bg-amber-950 text-amber-400'}`}>
                    {book.language}
                  </span>
                  <span className="text-slate-400">{book.genre.split('/')[0]}</span>
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-1">{book.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">By {book.author}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Book Detail Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        {/* Book Header */}
        <div className="border-b border-slate-800 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400 font-semibold">
                {activeBook.curriculumCode}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {activeBook.title}
                <span className="text-sm font-normal text-slate-400 ml-2">by {activeBook.author}</span>
              </h3>
            </div>
            <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-xs font-mono text-slate-300">
              Setting: {activeBook.setting}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {activeBook.overview}
          </p>

          {/* Sub-Tabs: Themes, Characters, Style, Sample Essays */}
          <div className="flex items-center gap-2 mt-5 text-xs font-medium border-t border-slate-800/80 pt-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('themes')}
              className={`py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
                activeTab === 'themes' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Major Themes ({activeBook.majorThemes.length})
            </button>
            <button
              onClick={() => setActiveTab('characters')}
              className={`py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
                activeTab === 'characters' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Character Profiles ({activeBook.characters.length})
            </button>
            <button
              onClick={() => setActiveTab('style')}
              className={`py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
                activeTab === 'style' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Feather className="w-3.5 h-3.5" />
              Stylistic Techniques ({activeBook.stylisticDevices.length})
            </button>
            <button
              onClick={() => setActiveTab('essays')}
              className={`py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
                activeTab === 'essays' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              KCSE 20-Mark Essays ({activeBook.sampleEssays.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Themes */}
        {activeTab === 'themes' && (
          <div className="space-y-4">
            {activeBook.majorThemes.map((item, idx) => (
              <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-950 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="text-base font-bold text-white">{item.theme}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                <div>
                  <span className="text-[11px] font-mono uppercase text-emerald-400 font-semibold block mb-1">
                    Textual Evidence &amp; Specific Episodes:
                  </span>
                  <div className="space-y-1.5">
                    {item.textualEvidence.map((ev, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{ev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Characters */}
        {activeTab === 'characters' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeBook.characters.map((char, idx) => (
              <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-white">{char.name}</h4>
                      <p className="text-xs text-emerald-400 font-medium">{char.role}</p>
                    </div>
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-mono text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {char.traits.map((tr, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 font-medium">
                        {tr}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800/60">
                    <span className="font-semibold text-slate-200 block text-[11px] uppercase tracking-wider font-mono mb-1">
                      Role &amp; Thematic Significance:
                    </span>
                    {char.significance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Stylistic Devices */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            {activeBook.stylisticDevices.map((style, idx) => (
              <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Feather className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-base font-bold text-white">{style.device}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{style.explanation}</p>
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl text-xs text-cyan-200">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-cyan-400 font-mono block mb-1">
                    Textual Example in {activeBook.title}:
                  </span>
                  "{style.example}"
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Sample Essays & KNEC Rubric */}
        {activeTab === 'essays' && (
          <div className="space-y-6">
            {activeBook.sampleEssays.map((essay, idx) => (
              <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                    Official KNEC Essay Prompt ({essay.yearTested || 'Standard Mock'})
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-xs font-mono font-bold">
                    20 Marks
                  </span>
                </div>

                <blockquote className="text-sm font-semibold text-white italic bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  "{essay.question}"
                </blockquote>

                <div>
                  <h5 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono mb-2">
                    Model Marking Scheme &amp; Key Paragraph Points:
                  </h5>
                  <div className="space-y-2">
                    {essay.suggestedPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60">
                        <span className="font-mono text-emerald-400 font-bold shrink-0">{i + 1}.</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-amber-400 font-mono block">
                    Chief Examiner Advice &amp; Pitfalls:
                  </span>
                  <p>{essay.markingAdvice}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
