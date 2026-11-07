import React, { useState } from 'react';
import {
  Volume2,
  Mic,
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Languages,
  ArrowRight
} from 'lucide-react';

export const OralLanguageCoach: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'english_oral' | 'kiswahili_matamshi'>('english_oral');
  const [selectedCategory, setSelectedCategory] = useState<'silent_letters' | 'homophones' | 'syllable_stress' | 'intonation'>('silent_letters');
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  // Web speech playback
  const speakWord = (word: string, lang: string = 'en-GB') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.onstart = () => setPlayingWord(word);
    utterance.onend = () => setPlayingWord(null);
    utterance.onerror = () => setPlayingWord(null);
    window.speechSynthesis.speak(utterance);
  };

  // English 101/1 Database
  const SILENT_LETTERS = [
    { word: 'Subtle', silentLetter: 'b', ipa: '/ˈsʌt.əl/', meaning: 'So delicate or precise as to be difficult to analyze', example: 'There was a subtle difference in tone.' },
    { word: 'Debris', silentLetter: 's', ipa: '/ˈdeɪ.briː/', meaning: 'Scattered fragments or rubble', example: 'The storm left tree branches and debris on the road.' },
    { word: 'Psalm', silentLetter: 'p, l', ipa: '/sɑːm/', meaning: 'A sacred song or hymn', example: 'The choir sang a psalm during assembly.' },
    { word: 'Bouquet', silentLetter: 't', ipa: '/buˈkeɪ/', meaning: 'An attractively arranged bunch of flowers', example: 'She received a bouquet of fresh roses.' },
    { word: 'Solemn', silentLetter: 'n', ipa: '/ˈsɒl.əm/', meaning: 'Formal and dignified; serious', example: 'The principal spoke in a solemn tone.' },
    { word: 'Mortgage', silentLetter: 't', ipa: '/ˈmɔː.ɡɪdʒ/', meaning: 'A legal agreement to borrow money for buying property', example: 'They took out a 20-year mortgage.' },
    { word: 'Corps', silentLetter: 'p, s', ipa: '/kɔːr/', meaning: 'A main subdivision of an army', example: 'He served in the Kenya Army Medical Corps.' },
    { word: 'Rendezvous', silentLetter: 'z, s', ipa: '/ˈrɒn.deɪ.vuː/', meaning: 'A meeting at an agreed time and place', example: 'The scouts agreed on a secret rendezvous point.' }
  ];

  const HOMOPHONES = [
    { pair: ['Sweet', 'Suite'], ipa: '/swiːt/', diff: 'Sweet: tasting like sugar. Suite: connected rooms in a hotel or set of furniture.' },
    { pair: ['Course', 'Coarse'], ipa: '/kɔːs/', diff: 'Course: academic program or path. Coarse: rough in texture.' },
    { pair: ['Sight', 'Site', 'Cite'], ipa: '/saɪt/', diff: 'Sight: vision. Site: physical location or building area. Cite: quote as evidence.' },
    { pair: ['Principal', 'Principle'], ipa: '/ˈprɪn.sə.pəl/', diff: 'Principal: head of a school or chief amount. Principle: fundamental truth or rule of conduct.' },
    { pair: ['Stationary', 'Stationery'], ipa: '/ˈsteɪ.ʃən.ər.i/', diff: 'Stationary: not moving. Stationery: writing materials like pens and paper (remember: e for envelopes).' },
    { pair: ['Aisle', 'Isle'], ipa: '/aɪl/', diff: 'Aisle: passage between rows of seats. Isle: an island.' }
  ];

  const STRESS_SHIFTS = [
    { noun: 'CON-duct', verb: 'con-DUCT', nounMeaning: 'A person’s behavior or manner', verbMeaning: 'To organize and carry out an activity' },
    { noun: 'RE-cord', verb: 're-CORD', nounMeaning: 'A physical piece of evidence or disc', verbMeaning: 'To store audio, video, or data' },
    { noun: 'OB-ject', verb: 'ob-JECT', nounMeaning: 'A material thing that can be seen or touched', verbMeaning: 'To express disagreement or disapproval' },
    { noun: 'PRE-sent', verb: 'pre-SENT', nounMeaning: 'A gift or the current time', verbMeaning: 'To give formally or show something to an audience' },
    { noun: 'CON-tract', verb: 'con-TRACT', nounMeaning: 'A written legal agreement', verbMeaning: 'To decrease in size or become narrower' }
  ];

  // Kiswahili Sauti Tatanishi Database
  const KISWAHILI_SAUTI = [
    {
      sauti: '/b/ na /p/',
      maelezo: '/b/ ni sauti ya konsonanti ghuna (vocal cords vibrate), ilhali /p/ ni sauti si ghuna (vocal cords do not vibrate). Zote ni za midomo (bilabial plosives).',
      mifano: [
        { neno1: 'baa (janga/balaa)', neno2: 'paa (sehemu ya juu ya nyumba/mnyama)' },
        { neno1: 'baba (mzazi wa kiume)', neno2: 'papa (samaki mkubwa baharini)' },
        { neno1: 'bata (ndege wa kufugwa)', neno2: 'pata (pokea/jipatie kitu)' }
      ]
    },
    {
      sauti: '/d/ na /t/',
      maelezo: '/d/ ni sauti ghuna ya ufizi (alveolar plosive), /t/ ni sauti si ghuna ya ufizi.',
      mifano: [
        { neno1: 'dawa (tiba ya maradhi)', neno2: 'tawa (chombo cha kukaangia)' },
        { neno1: 'dini (imani/ibada)', neno2: 'tini (matunda matamu)' },
        { neno1: 'damu (majimaji mwilini)', neno2: 'tamu (yenye ladha ya sukari)' }
      ]
    },
    {
      sauti: '/r/ na /l/',
      maelezo: '/r/ ni sauti ya mtetemeko (alveolar trill), ilhali /l/ ni sauti ya pembeni (alveolar lateral). Watahiniwa wengi huchanganya sauti hizi katika tahajia na matamshi.',
      mifano: [
        { neno1: 'kura (uchaguzi wa kidemokrasia)', neno2: 'kula (kumeza chakula)' },
        { neno1: 'sura (muonekano wa uso/sehemu ya kitabu)', neno2: 'sula (kuchafuka au kushuka)' },
        { neno1: 'zuru (tembelea mahali)', neno2: 'zulu (kupotoka/kuchanganyikiwa)' }
      ]
    },
    {
      sauti: '/ch/ na /sh/',
      maelezo: '/ch/ ni kizui-msuguano cha kaakaa gumu (palato-alveolar affricate), /sh/ ni kimsuguano cha kaakaa gumu (palato-alveolar fricative).',
      mifano: [
        { neno1: 'choka (kosa nguvu mwilini)', neno2: 'shoka (kifaa cha kupasua kuni)' },
        { neno1: 'chache (zisizo nyingi)', neno2: 'shashe (vicheche/cheche za moto)' },
        { neno1: 'chuma (madini magumu)', neno2: 'shuma (kuchungulia kwa siri)' }
      ]
    }
  ];

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              <span>National Languages Mastery Studio</span>
              <span>·</span>
              <span>KNEC English Paper 1 (101/1) &amp; Kiswahili (102/2)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>🎙️ Oral Skills, Phonetics &amp; Matamshi Coach</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Master the oral skills tested in <strong>English Paper 1 (30 Marks)</strong> and <strong>Kiswahili Sauti Tatanishi na Sarufi</strong>. Listen to audio pronunciation, identify silent letters, master noun/verb stress shifts, and eliminate spelling blunders.
            </p>
          </div>

          {/* Language Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-mono shrink-0">
            <button
              onClick={() => setActiveTab('english_oral')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'english_oral'
                  ? 'bg-cyan-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>English Paper 1 Oral Skills</span>
            </button>

            <button
              onClick={() => setActiveTab('kiswahili_matamshi')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'kiswahili_matamshi'
                  ? 'bg-emerald-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kiswahili Matamshi &amp; Sauti</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: ENGLISH 101/1 ORAL SKILLS */}
      {activeTab === 'english_oral' && (
        <div className="space-y-6">
          {/* Sub-Category Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
            {[
              { id: 'silent_letters', label: '1. Silent Consonants' },
              { id: 'homophones', label: '2. Homophones & Minimal Pairs' },
              { id: 'syllable_stress', label: '3. Noun vs Verb Stress Shifts' },
              { id: 'intonation', label: '4. Intonation & Performance Rules' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl shrink-0 font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-600 text-white shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* SUB-TAB 1: SILENT LETTERS */}
          {selectedCategory === 'silent_letters' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SILENT_LETTERS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-white font-mono flex items-center gap-2">
                        <span>{item.word}</span>
                        <span className="text-xs font-mono text-cyan-400">{item.ipa}</span>
                      </h3>
                      <span className="text-[11px] font-mono text-rose-400 font-bold block mt-0.5">
                        Silent Letter(s): <span className="underline uppercase">{item.silentLetter}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => speakWord(item.word)}
                      className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-mono transition-all ${
                        playingWord === item.word
                          ? 'bg-amber-600 border-amber-500 text-white animate-pulse'
                          : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-cyan-400'
                      }`}
                      title="Listen to native British/Kenyan pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{playingWord === item.word ? 'Speaking' : 'Listen'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    <strong>Meaning:</strong> {item.meaning}
                  </p>

                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 font-sans italic">
                    "{item.example}"
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SUB-TAB 2: HOMOPHONES */}
          {selectedCategory === 'homophones' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HOMOPHONES.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                        <span>{item.pair.join('  /  ')}</span>
                      </h3>
                      <span className="text-xs font-mono text-emerald-400">{item.ipa}</span>
                    </div>

                    <button
                      onClick={() => speakWord(item.pair[0])}
                      className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-cyan-400 text-xs font-mono flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {item.diff}
                  </p>

                  <div className="text-[10px] font-mono text-amber-400 bg-amber-950/30 p-2 rounded-lg border border-amber-900/40">
                    ⚠️ <strong>KNEC Mark Rule:</strong> Spelled differently with different meanings, but identical pronunciation.
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SUB-TAB 3: SYLLABLE STRESS */}
          {selectedCategory === 'syllable_stress' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
                💡 <strong>The 2-Syllable Rule:</strong> In English, many 2-syllable words place stress on the <strong>FIRST syllable</strong> when used as a NOUN, and shift stress to the <strong>SECOND syllable</strong> when used as a VERB.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STRESS_SHIFTS.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3"
                  >
                    {/* Noun Stress */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          NOUN: <span className="text-white text-sm">{item.noun}</span>
                        </span>
                        <button
                          onClick={() => speakWord(item.noun.replace('-', ''))}
                          className="text-[10px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Say Noun</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">{item.nounMeaning}</p>
                    </div>

                    {/* Verb Stress */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          VERB: <span className="text-white text-sm">{item.verb}</span>
                        </span>
                        <button
                          onClick={() => speakWord(item.verb.replace('-', ''))}
                          className="text-[10px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Say Verb</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">{item.verbMeaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 4: INTONATION */}
          {selectedCategory === 'intonation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase block">
                  Falling Intonation (↘) Rules:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  The pitch of the voice falls at the end of the utterance. Applied in:
                </p>
                <ul className="space-y-2 text-xs font-mono text-slate-200 list-disc list-inside">
                  <li><strong>Statements / Declarations:</strong> "We are sitting for KCSE this November." ↘</li>
                  <li><strong>Wh- Questions:</strong> "Where did you buy this mathematical table?" ↘</li>
                  <li><strong>Commands / Imperatives:</strong> "Hand in your assignment now." ↘</li>
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                <span className="text-xs font-bold font-mono text-cyan-400 uppercase block">
                  Rising Intonation (↗) Rules:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  The pitch of the voice rises at the end of the sentence. Applied in:
                </p>
                <ul className="space-y-2 text-xs font-mono text-slate-200 list-disc list-inside">
                  <li><strong>Polar (Yes/No) Questions:</strong> "Have you completed your chemistry practical?" ↗</li>
                  <li><strong>Polite Requests:</strong> "Could you lend me your four-figure table?" ↗</li>
                  <li><strong>Listing Incomplete Items:</strong> "I bought pens ↗, books ↗, rulers ↗, and an eraser ↘."</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: KISWAHILI MATAMSHI NA SAUTI TATANISHI */}
      {activeTab === 'kiswahili_matamshi' && (
        <div className="space-y-5">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
            🇰🇪 <strong>Mtaala wa KCSE Kiswahili (102/2):</strong> Sauti tatanishi ni sauti za lugha zinazotamkwa kwa jinsi inayokaribiana kiasi cha kuwazuzua wazungumzaji au wanafunzi wanapoandika insha au sarufi.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {KISWAHILI_SAUTI.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <h3 className="text-base font-bold text-emerald-400 font-mono">
                    Tofauti ya Sauti: {item.sauti}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">Sauti Tatanishi</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.maelezo}
                </p>

                <div className="space-y-2 pt-1 font-mono text-xs">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Mifano ya Maneno Yenye Maana Tofauti:
                  </span>
                  {item.mifano.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 space-y-1"
                    >
                      <div className="flex items-center justify-between text-white font-bold">
                        <span>(i) {m.neno1}</span>
                        <button
                          onClick={() => speakWord(m.neno1.split(' ')[0], 'sw')}
                          className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Tamka</span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-emerald-400 font-bold">
                        <span>(ii) {m.neno2}</span>
                        <button
                          onClick={() => speakWord(m.neno2.split(' ')[0], 'sw')}
                          className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Tamka</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
