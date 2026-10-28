import React, { useState } from 'react';
import { X, Sparkles, Send, BookOpen, FlaskConical, Award, Loader2, Copy, Check, RotateCcw, AlertCircle } from 'lucide-react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
  defaultTopic?: string;
  defaultLevel?: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = 'Chemistry',
  defaultTopic = 'Volumetric Analysis (Titration)',
  defaultLevel = 'High School (KCSE Form 3)'
}) => {
  const [subject, setSubject] = useState(defaultSubject);
  const [topic, setTopic] = useState(defaultTopic);
  const [level, setLevel] = useState(defaultLevel);
  const [query, setQuery] = useState('Explain how to avoid parallax error in burette reading and calculate percentage purity.');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMarkdown, setResponseMarkdown] = useState<string | null>(null);
  const [mode, setMode] = useState<'explain' | 'practical' | 'grade'>('explain');
  const [studentAnswerToGrade, setStudentAnswerToGrade] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setResponseMarkdown(null);
    setErrorNotice(null);

    try {
      let endpoint = '/api/tutor/explain';
      let payload: any = {
        subject,
        topic,
        level,
        gradeOrYear: level,
        specificQuestion: query.trim() || undefined
      };

      if (mode === 'practical') {
        endpoint = '/api/practicals/guide';
        payload = {
          subject,
          experimentTitle: topic,
          level
        };
      } else if (mode === 'grade') {
        endpoint = '/api/grade/evaluate';
        payload = {
          subject,
          question: query || topic,
          studentAnswer: studentAnswerToGrade,
          totalMarks: 10,
          markingScheme: 'Standard KNEC Marking Scheme'
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.text) {
        setResponseMarkdown(data.text);
      } else if (data.error) {
        // Handle error gracefully
        setErrorNotice(typeof data.error === 'string' ? data.error : 'Service temporarily busy. Please retry in a moment.');
      } else {
        setErrorNotice('No response received from the curriculum server. Please retry.');
      }
    } catch (err: any) {
      setErrorNotice('Connection interrupted. Please verify your connection and click Retry.');
    } finally {
      setIsLoading(false);
    }
  };

  const setPromptPreset = (presetSubj: string, presetTopic: string, presetLvl: string, presetQuery: string) => {
    setSubject(presetSubj);
    setTopic(presetTopic);
    setLevel(presetLvl);
    setQuery(presetQuery);
  };

  const handleCopy = () => {
    if (responseMarkdown) {
      navigator.clipboard.writeText(responseMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper to render markdown text with styling
  const renderFormattedMarkdown = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // H1
      if (line.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-lg font-bold text-emerald-400 mt-4 mb-2 pb-1 border-b border-slate-800">
            {line.replace('# ', '')}
          </h1>
        );
      }
      // H2
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-base font-bold text-white mt-4 mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {line.replace('## ', '')}
          </h2>
        );
      }
      // H3
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-sm font-semibold text-cyan-300 mt-3 mb-1">
            {line.replace('### ', '')}
          </h3>
        );
      }
      // Blockquote
      if (line.startsWith('> ')) {
        return (
          <div key={idx} className="bg-slate-900/80 border-l-2 border-emerald-500 p-2.5 my-2 text-slate-300 italic text-xs rounded-r-lg">
            {line.replace('> ', '')}
          </div>
        );
      }
      // Bullets
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 ml-2 text-slate-300">
            <span className="text-emerald-400 font-bold">•</span>
            <span>{line.replace(/^(\s*[-*]\s+)/, '')}</span>
          </div>
        );
      }
      // Numbered items
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 ml-2 text-slate-200">
            <span className="font-mono text-cyan-400 font-bold">{line.match(/^\d+\./)?.[0]}</span>
            <span>{line.replace(/^\d+\.\s*/, '')}</span>
          </div>
        );
      }
      // Code or equation block
      if (line.trim().startsWith('$$') || line.trim().startsWith('```')) {
        return (
          <div key={idx} className="my-2 p-2 bg-slate-900 rounded font-mono text-emerald-300 text-[11px] overflow-x-auto">
            {line}
          </div>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-slate-300 my-1 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Kenya National Curriculum AI Tutor &amp; Lab Specialist
              </h2>
              <p className="text-xs text-slate-400">
                Grounded in KICD, KNEC KCSE &amp; University (CUE) standards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Mode Selector */}
          <div className="flex items-center gap-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setMode('explain')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                mode === 'explain'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Detailed Theory &amp; Problem Solving
            </button>
            <button
              onClick={() => setMode('practical')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                mode === 'practical'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              Laboratory Protocol Manual
            </button>
            <button
              onClick={() => setMode('grade')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                mode === 'grade'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              KNEC Rubric Script Examiner
            </button>
          </div>

          {/* Configuration Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                placeholder="e.g. Chemistry, Physics, Medicine, Law"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Topic or Experiment</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                placeholder="e.g. Volumetric Analysis (Titration)"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Academic Tier</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
              >
                <option value="High School (KCSE Form 1)">High School (KCSE Form 1)</option>
                <option value="High School (KCSE Form 2)">High School (KCSE Form 2)</option>
                <option value="High School (KCSE Form 3)">High School (KCSE Form 3)</option>
                <option value="High School (KCSE Form 4)">High School (KCSE Form 4)</option>
                <option value="Senior School CBC Grade 10-12">Senior School CBC Grade 10-12</option>
                <option value="University Undergraduate Year 1">University Undergraduate Year 1</option>
                <option value="University Undergraduate Year 2">University Undergraduate Year 2</option>
                <option value="University Undergraduate Year 3">University Undergraduate Year 3</option>
                <option value="University Final Year 4/5">University Final Year 4/5</option>
              </select>
            </div>
          </div>

          {/* Quick Kenyan Curriculum Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 text-[11px] mr-1">Quick Presets:</span>
            <button
              onClick={() => setPromptPreset('Chemistry', 'Volumetric Analysis (Titration)', 'High School (KCSE Form 3)', 'Explain how to avoid parallax error in burette reading and calculate percentage purity.')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded text-[11px] transition-colors border border-slate-700"
            >
              KCSE Chemistry Titration
            </button>
            <button
              onClick={() => setPromptPreset('Medicine', 'Acute STEMI Management', 'University Undergraduate Year 3', 'Walk me through the first 15 minutes of an acute chest pain patient at Kenyatta National Hospital.')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] transition-colors border border-slate-700"
            >
              MBChB STEMI Resuscitation
            </button>
            <button
              onClick={() => setPromptPreset('Law', 'Article 24 Bill of Rights Limitations', 'University Undergraduate Year 2', 'How does the High Court of Kenya apply the proportionality test to limit fundamental rights?')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] transition-colors border border-slate-700"
            >
              LLB Constitutional Law
            </button>
            <button
              onClick={() => setPromptPreset('Physics', 'Ohm\'s Law & Internal Resistance', 'High School (KCSE Form 3)', 'Explain how to find lost volts and plot V against I for a dry cell.')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] transition-colors border border-slate-700"
            >
              KCSE Physics Lost Volts
            </button>
          </div>

          {/* Additional Query or Answer input */}
          {mode === 'grade' ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Question to Grade</label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter the examination question text..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Your Written Answer</label>
                <textarea
                  value={studentAnswerToGrade}
                  onChange={(e) => setStudentAnswerToGrade(e.target.value)}
                  rows={4}
                  placeholder="Paste or write your full exam response here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Specific Sub-Question or Focus Area (Optional)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Explain how to avoid parallax error in burette reading and calculate percentage purity..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shrink-0 shadow-md transition-colors"
                >
                  {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  {mode === 'explain' ? 'Generate Tutorial' : 'Generate Guide'}
                </button>
              </div>
            </div>
          )}

          {mode === 'grade' && (
            <button
              onClick={handleGenerate}
              disabled={isLoading || !studentAnswerToGrade.trim()}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow"
            >
              {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Award className="w-4 h-4" />}
              Grade My Answer with KNEC Marking Scheme
            </button>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
              <p className="text-xs font-mono">Consulting Kenya National Curriculum &amp; Examination Engine...</p>
            </div>
          )}

          {/* Error Notice with Quick Retry */}
          {errorNotice && !isLoading && (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{errorNotice}</span>
              </div>
              <button
                onClick={handleGenerate}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retry
              </button>
            </div>
          )}

          {/* Structured Curriculum Response Output */}
          {responseMarkdown && !isLoading && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-slate-200 text-xs leading-relaxed font-sans space-y-3 shadow-inner">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    Official Curriculum Guide
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-[10px] text-slate-400 font-mono">KICD / KNEC Syllabus Grounded</span>
                </div>

                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 flex items-center gap-1.5 transition-colors"
                  title="Copy full tutorial"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="text-xs leading-relaxed space-y-1">
                {renderFormattedMarkdown(responseMarkdown)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
