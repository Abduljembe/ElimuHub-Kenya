import React, { useState } from 'react';
import {
  BookOpen,
  Feather,
  Sparkles,
  Music,
  Award,
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  NGELI_ZA_NOMINO,
  FASIHI_SIMULIZI_GENRES,
  USHAIRI_RULES,
  NounClassItem
} from '../data/kiswahiliCompanionData';

interface KiswahiliCompanionProps {
  onAskAI: (subject: string, topic: string, level: string) => void;
}

export const KiswahiliCompanion: React.FC<KiswahiliCompanionProps> = ({ onAskAI }) => {
  const [activeTab, setActiveTab] = useState<'ngeli' | 'fasihi' | 'ushairi' | 'insha'>('ngeli');
  const [selectedNgeli, setSelectedNgeli] = useState<NounClassItem>(NGELI_ZA_NOMINO[0]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
              <span>Mtaala wa Kitaifa wa Kiswahili (KICD / KNEC)</span>
              <span>·</span>
              <span>Karatasi ya 102/1, 102/2 &amp; 102/3</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Mwongozo wa Sarufi, Fasihi Simulizi &amp; Ushairi
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Uchambuzi wa kina wa ngeli za nomino, upatanisho wa kisarufi, tanzu za fasihi simulizi, arudhi za ushairi, na kanuni za kutunga insha za kitaifa za KCSE.
            </p>
          </div>

          <button
            onClick={() =>
              onAskAI(
                'Kiswahili (102/2 & 102/3)',
                'Sarufi, Ngeli na Fasihi Simulizi',
                'KCSE High School'
              )
            }
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Uliza Mwalimu wa Kiswahili (AI)</span>
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('ngeli')}
            className={`py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
              activeTab === 'ngeli'
                ? 'bg-amber-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Ngeli za Nomino ({NGELI_ZA_NOMINO.length})
          </button>
          <button
            onClick={() => setActiveTab('fasihi')}
            className={`py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
              activeTab === 'fasihi'
                ? 'bg-amber-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Fasihi Simulizi (Tanzu &amp; Vipera)
          </button>
          <button
            onClick={() => setActiveTab('ushairi')}
            className={`py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
              activeTab === 'ushairi'
                ? 'bg-amber-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Feather className="w-4 h-4" />
            Ushairi (Arudhi &amp; Bahari)
          </button>
          <button
            onClick={() => setActiveTab('insha')}
            className={`py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 ${
              activeTab === 'insha'
                ? 'bg-amber-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            Kanuni za Insha za KCSE (102/1)
          </button>
        </div>
      </div>

      {/* Tab 1: Ngeli za Nomino */}
      {activeTab === 'ngeli' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Ngeli List Selector */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400 block mb-2 font-bold">
              Chagua Ngeli Kutazama Kanuni &amp; Mifano:
            </span>
            <div className="space-y-1.5">
              {NGELI_ZA_NOMINO.map((item) => {
                const isSelected = item.ngeli === selectedNgeli.ngeli;
                return (
                  <button
                    key={item.ngeli}
                    onClick={() => setSelectedNgeli(item)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-950/70 border-amber-500/80 shadow-md ring-1 ring-amber-500/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div>
                      <strong className="text-sm font-bold text-white block">Ngeli ya {item.ngeli}</strong>
                      <span className="text-[11px] text-slate-400 truncate block mt-0.5">
                        {item.nominoMfano.slice(0, 3).join(', ')}...
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-mono text-xs font-bold border border-slate-800">
                      Umoja / Wingi
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ngeli Detailed Inspector */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                Muundo wa Kisarufi
              </span>
              <h3 className="text-2xl font-bold text-white mt-0.5">
                Ngeli ya {selectedNgeli.ngeli}
              </h3>
            </div>

            {/* Concordial Prefixes */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Kiambishi Upatanisho (Umoja)</span>
                <strong className="text-white text-sm">{selectedNgeli.kiambishiUpatanishoUmoja}</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Kiambishi Upatanisho (Wingi)</span>
                <strong className="text-amber-400 text-sm">{selectedNgeli.kiambishiUpatanishoWingi}</strong>
              </div>
            </div>

            {/* Sentensi Mifano */}
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">
                  Mfano katika Umoja:
                </span>
                <p className="text-slate-100 font-semibold text-sm">"{selectedNgeli.sentensiMfanoUmoja}"</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">
                  Mfano katika Wingi:
                </span>
                <p className="text-amber-200 font-semibold text-sm">"{selectedNgeli.sentensiMfanoWingi}"</p>
              </div>
            </div>

            {/* Nomino Mifano */}
            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-1.5">
                Mifano ya Nomino Zinazopatikana katika Ngeli Hii:
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {selectedNgeli.nominoMfano.map((nom, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
                  >
                    {nom}
                  </span>
                ))}
              </div>
            </div>

            {/* Kanuni ya Mtihani wa KNEC */}
            <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs text-amber-200 space-y-1">
              <span className="font-bold text-[10px] font-mono uppercase text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Mtego wa Mtahini wa Kitaifa (KNEC Tip):
              </span>
              <p className="leading-relaxed">{selectedNgeli.kanuniZaMtihani}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Fasihi Simulizi */}
      {activeTab === 'fasihi' && (
        <div className="space-y-4">
          {FASIHI_SIMULIZI_GENRES.map((genre, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">{genre.kipera}</h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                {genre.ufafanuzi}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Sifa Kuu */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-mono text-[10px] uppercase font-bold block">
                    Sifa Kuu za Kipera Hiki:
                  </span>
                  <div className="space-y-1.5 text-slate-300">
                    {genre.sifaKuu.map((s, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mifano Halisi Kenya */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 font-mono text-[10px] uppercase font-bold block">
                    Mifano Halisi ya Kijamii Nchini Kenya:
                  </span>
                  <div className="space-y-1.5 text-slate-300">
                    {genre.mifanoHalisiKenya.map((m, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-emerald-200">
                <strong className="block text-[10px] font-mono text-emerald-400 uppercase mb-0.5">
                  Umuhimu wa Kijamii:
                </strong>
                {genre.umuhimuKijamii}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Ushairi */}
      {activeTab === 'ushairi' && (
        <div className="space-y-4">
          {USHAIRI_RULES.map((rule, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Feather className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">{rule.dhana}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{rule.maelezo}</p>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300">
                <span className="text-slate-500 text-[10px] uppercase block mb-0.5">Mfano:</span>
                "{rule.mfano}"
              </div>

              <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs text-amber-200">
                <strong className="block text-[10px] font-mono text-amber-400 uppercase mb-0.5">
                  Ushauri wa Mtahini wa KNEC:
                </strong>
                {rule.mtegoWaMtihani}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Insha Guidelines */}
      {activeTab === 'insha' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Mwongozo wa Kutunga Insha Bora ya KCSE (Karatasi ya 102/1 - Alama 40)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Insha hutathminiwa kwa misingi minne mikuu: Maudhui (Alama 10), Msamiati na Mtindo (Alama 10), Sarufi na Hijai (Alama 10), na Muundo na Mtiririko (Alama 10).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-amber-400 font-mono text-xs block uppercase">
                1. Insha ya Mdokezo / Methali:
              </strong>
              <p className="text-slate-300 leading-relaxed">
                Iwapo unachagua insha ya methali (e.g. "Mvumilivu hula mbivu"), kisa chako lazima kioanishwe na maana ya kijuu na maana ya ndani ya methali hiyo. Usisimulie kisa bila kutoa mafunzo ya methali!
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-cyan-400 font-mono text-xs block uppercase">
                2. Insha ya Wasifu, Hotuba &amp; Kumbukumbu:
              </strong>
              <p className="text-slate-300 leading-relaxed">
                Zingatia muundo wa kipekee: Kichwa chenye herufi kubwa, utangulizi rasmi, shukrani kwa meza kuu, mwili wa hoja zilizopangwa kwa aya, na hitimisho yenye jina na wadhifa wa mwandishi.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
