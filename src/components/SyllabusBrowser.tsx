import React, { useState } from 'react';
import {
  BookOpen,
  FlaskConical,
  Activity,
  Award,
  Search,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  FileText,
  Play,
  Filter,
  Layers,
  ListOrdered
} from 'lucide-react';
import { SubjectCourse, TopicUnit, PracticalExperiment, ExamPaper } from '../types/curriculum';
import { TitrationSim } from './simulations/TitrationSim';
import { CircuitSim } from './simulations/CircuitSim';
import { OsmosisSim } from './simulations/OsmosisSim';
import { AlgorithmSim } from './simulations/AlgorithmSim';
import { ClinicalPatientSim } from './simulations/ClinicalPatientSim';
import { EconomicsSim } from './simulations/EconomicsSim';

interface SyllabusBrowserProps {
  courses: SubjectCourse[];
  onOpenAITutor: (subject: string, topic: string, level: string) => void;
  onStartExam: (exam: ExamPaper, subjectName: string) => void;
}

export const SyllabusBrowser: React.FC<SyllabusBrowserProps> = ({
  courses,
  onOpenAITutor,
  onStartExam
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'highschool' | 'university'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'theory' | 'practicals' | 'simulation' | 'exams'>('theory');
  const [selectedFormOrYear, setSelectedFormOrYear] = useState<string>('all');
  const [topicSearchQuery, setTopicSearchQuery] = useState<string>('');

  // Filter courses
  const filteredCourses = courses.filter((c) => {
    const matchesLevel = selectedLevel === 'all' || c.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const activeCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const renderSimulation = (type?: string) => {
    switch (type) {
      case 'titration':
        return <TitrationSim />;
      case 'circuits':
        return <CircuitSim />;
      case 'osmosis':
        return <OsmosisSim />;
      case 'algorithms':
        return <AlgorithmSim />;
      case 'clinical':
        return <ClinicalPatientSim />;
      case 'economics':
        return <EconomicsSim />;
      default:
        return (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
            <FlaskConical className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white">Interactive Sandbox Engine</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Select one of the interactive laboratory simulations (Chemistry Titration, Physics Ohm's Law, Biology Osmosis, Computer Science Algorithms, Medicine ECG, or Economics Equilibrium).
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Search and Level Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-4">
        {/* Level Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${
              selectedLevel === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All National Syllabi
          </button>
          <button
            onClick={() => setSelectedLevel('highschool')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${
              selectedLevel === 'highschool'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            KCSE High School (KICD)
          </button>
          <button
            onClick={() => setSelectedLevel('university')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${
              selectedLevel === 'university'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            University Degree Programmes (KUCCPS / CUE)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px] flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects, topics, or lab practicals..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 text-[11px] uppercase tracking-wider font-mono mr-1 shrink-0">Field:</span>
        {[
          { id: 'all', label: 'All Fields' },
          { id: 'Sciences', label: 'Sciences' },
          { id: 'Mathematics', label: 'Mathematics' },
          { id: 'Humanities', label: 'Humanities' },
          { id: 'Languages', label: 'Languages' },
          { id: 'Applied & Technical', label: 'Applied & Agribusiness' },
          { id: 'Medical Sciences', label: 'Medicine & Health' },
          { id: 'Engineering', label: 'Engineering & Built Env' },
          { id: 'Computing & Tech', label: 'Computing, Data & AI' },
          { id: 'Law & Governance', label: 'Law & Governance' },
          { id: 'Economics & Commerce', label: 'Economics & Commerce' },
          { id: 'Education & Pedagogy', label: 'Education & Pedagogy' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors font-medium border ${
              selectedCategory === cat.id
                ? 'bg-slate-800 border-emerald-500/80 text-emerald-400 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Course Explorer View (Sidebar + Content Pane) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Course Catalog Sidebar */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-2 max-h-[780px] overflow-y-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between">
            <span>Available Courses ({filteredCourses.length})</span>
            <span className="font-mono text-[10px] text-slate-500">KICD / CUE</span>
          </div>

          <div className="space-y-1.5">
            {filteredCourses.map((c) => {
              const isSelected = c.id === activeCourse.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCourseId(c.id);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/80 shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                      c.level === 'highschool' ? 'bg-emerald-950 text-emerald-400' : 'bg-cyan-950 text-cyan-400'
                    }`}>
                      {c.level === 'highschool' ? 'KCSE High School' : 'University Degree'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{c.code}</span>
                  </div>
                  <h4 className={`text-sm font-bold mt-1.5 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {c.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{c.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Course Main Canvas */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Header of Active Subject */}
          <div className="border-b border-slate-800 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-400 font-mono uppercase">
                    {activeCourse.badge}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs font-mono text-slate-400">{activeCourse.code}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mt-1">{activeCourse.name}</h2>
              </div>

              <button
                onClick={() =>
                  onOpenAITutor(
                    activeCourse.name,
                    activeCourse.topics[0]?.title || 'Core Syllabus',
                    activeCourse.level === 'highschool' ? 'High School KCSE' : 'University Undergraduate'
                  )
                }
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Ask AI Kenya Curriculum Tutor
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{activeCourse.description}</p>

            {/* 4 Tabs Selector */}
            <div className="flex items-center gap-2 mt-5 border-t border-slate-800/80 pt-4 text-xs">
              <button
                onClick={() => setActiveTab('theory')}
                className={`py-2 px-3.5 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                  activeTab === 'theory'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Theory Syllabus ({activeCourse.topics.length})
              </button>

              <button
                onClick={() => setActiveTab('practicals')}
                className={`py-2 px-3.5 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                  activeTab === 'practicals'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                Laboratory Practicals ({activeCourse.practicals.length})
              </button>

              {activeCourse.simulationType && (
                <button
                  onClick={() => setActiveTab('simulation')}
                  className={`py-2 px-3.5 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                    activeTab === 'simulation'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  Live Simulation
                </button>
              )}

              <button
                onClick={() => setActiveTab('exams')}
                className={`py-2 px-3.5 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                  activeTab === 'exams'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                Past Exams &amp; Tests ({activeCourse.exams.length})
              </button>
            </div>
          </div>

          {/* Tab 1: Theory Syllabus */}
          {activeTab === 'theory' && (() => {
            // Get unique forms or years in sequential order
            const availableFormsOrYears = Array.from(
              new Set(activeCourse.topics.map((t) => t.formOrYear))
            );

            // Filter topics by selected Form/Year and topic search query
            const filteredTopics = activeCourse.topics.filter((topic) => {
              const matchesForm =
                selectedFormOrYear === 'all' || topic.formOrYear === selectedFormOrYear;
              const matchesSearch =
                !topicSearchQuery ||
                topic.title.toLowerCase().includes(topicSearchQuery.toLowerCase()) ||
                topic.theoryOverview.toLowerCase().includes(topicSearchQuery.toLowerCase()) ||
                topic.subtopics.some((s) => s.toLowerCase().includes(topicSearchQuery.toLowerCase()));
              return matchesForm && matchesSearch;
            });

            return (
              <div className="space-y-5">
                {/* Form / Academic Year Sub-Filter & In-Subject Search */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {/* Form / Year Tabs */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-slate-400 text-xs font-medium flex items-center gap-1 mr-1">
                        <Filter className="w-3.5 h-3.5 text-emerald-400" />
                        {activeCourse.level === 'highschool' ? 'Syllabus Form:' : 'Academic Tier:'}
                      </span>

                      <button
                        onClick={() => setSelectedFormOrYear('all')}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                          selectedFormOrYear === 'all'
                            ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        All Topics ({activeCourse.topics.length})
                      </button>

                      {availableFormsOrYears.map((fy) => {
                        const count = activeCourse.topics.filter((t) => t.formOrYear === fy).length;
                        const isCurrent = selectedFormOrYear === fy;
                        return (
                          <button
                            key={fy}
                            onClick={() => setSelectedFormOrYear(fy)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                              isCurrent
                                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            {fy} ({count})
                          </button>
                        );
                      })}
                    </div>

                    {/* Quick In-Course Search */}
                    <div className="relative min-w-[200px] flex-1 max-w-xs">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={topicSearchQuery}
                        onChange={(e) => setTopicSearchQuery(e.target.value)}
                        placeholder={`Filter ${activeCourse.name} topics...`}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Quick Topics Jump Strip */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
                    <span className="text-slate-500 uppercase tracking-wider font-mono mr-1 shrink-0 flex items-center gap-1">
                      <ListOrdered className="w-3 h-3 text-cyan-400" />
                      Topic Index:
                    </span>
                    {filteredTopics.map((t, idx) => (
                      <a
                        key={t.id}
                        href={`#${t.id}`}
                        className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 hover:text-emerald-300 hover:bg-slate-800 border border-slate-800/80 whitespace-nowrap shrink-0 transition-colors"
                      >
                        <span className="font-mono text-emerald-400 mr-1">{idx + 1}.</span>
                        {t.title}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Topics List with Full Summaries */}
                {filteredTopics.length === 0 ? (
                  <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
                    <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm">No topics match your selected Form or search query.</p>
                    <button
                      onClick={() => {
                        setSelectedFormOrYear('all');
                        setTopicSearchQuery('');
                      }}
                      className="mt-3 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredTopics.map((topic, index) => (
                      <div
                        key={topic.id}
                        id={topic.id}
                        className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4 scroll-mt-24 transition-all hover:border-slate-700"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                              {index + 1}
                            </span>
                            <div>
                              <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                                {topic.formOrYear} Official Curriculum Unit
                              </span>
                              <h3 className="text-base font-bold text-white mt-0.5">{topic.title}</h3>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              onOpenAITutor(
                                activeCourse.name,
                                topic.title,
                                activeCourse.level === 'highschool' ? `${topic.formOrYear} KCSE` : `${topic.formOrYear} Undergraduate`
                              )
                            }
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5 shadow-sm transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            Deep Dive with AI Tutor
                          </button>
                        </div>

                        {/* Subtopics */}
                        <div>
                          <span className="text-xs font-semibold text-slate-300 block mb-1.5">
                            Syllabus Sub-Themes &amp; Key Concepts:
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {topic.subtopics.map((sub, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60"
                              >
                                <span className="text-emerald-400 font-bold">•</span>
                                <span>{sub}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Theory Foundation & Comprehensive Summary */}
                        <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                          <span className="font-semibold text-white block mb-1 font-sans text-[13px]">
                            Comprehensive Theory Summary &amp; Scientific Principles:
                          </span>
                          <p>{topic.theoryOverview}</p>
                        </div>

                        {/* Key Formulas if available */}
                        {topic.keyFormulas && topic.keyFormulas.length > 0 && (
                          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-1.5">
                            <span className="text-xs font-semibold text-cyan-300 block">
                              Essential Formulas, Equations &amp; Constants:
                            </span>
                            <div className="space-y-1 font-mono text-xs text-slate-200">
                              {topic.keyFormulas.map((f, i) => (
                                <div
                                  key={i}
                                  className="p-1.5 rounded bg-slate-950 border border-slate-800 text-emerald-300"
                                >
                                  {f}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Kenyan Context & Examiner Tip */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 space-y-1">
                            <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-400 font-mono block">
                              Kenyan Real-World Context &amp; Industry:
                            </span>
                            <p>{topic.kenyanApplication}</p>
                          </div>

                          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 space-y-1">
                            <span className="font-bold uppercase tracking-wider text-[10px] text-amber-400 font-mono block">
                              KNEC / University Examiner Advice &amp; Pitfalls:
                            </span>
                            <p>{topic.examTips}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Tab 2: Practical Lab Guidelines */}
          {activeTab === 'practicals' && (
            <div className="space-y-6">
              {activeCourse.practicals.map((prac) => (
                <div key={prac.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                        KNEC Paper 3 / University Lab Protocol
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">{prac.title}</h3>
                    </div>

                    <button
                      onClick={() =>
                        onOpenAITutor(
                          activeCourse.name,
                          prac.title,
                          activeCourse.level === 'highschool' ? 'High School KCSE Practical' : 'University Lab'
                        )
                      }
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Generate Custom Lab Report
                    </button>
                  </div>

                  {/* Objectives */}
                  <div>
                    <span className="text-xs font-semibold text-slate-300 block mb-1.5">Specific Learning Objectives:</span>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                      {prac.objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Apparatus & Safety */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                      <span className="font-semibold text-white block">Required Apparatus &amp; Glassware:</span>
                      <ul className="list-disc list-inside text-slate-300 space-y-1">
                        {prac.apparatus.map((app, i) => (
                          <li key={i}>{app}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5 text-rose-200">
                      <div className="flex items-center gap-1.5 font-semibold text-rose-400">
                        <ShieldAlert className="w-4 h-4" />
                        <span>Safety Precautions &amp; Hazard Countermeasures:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1">
                        {prac.safetyHazards.map((haz, i) => (
                          <li key={i}>{haz}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Step-by-Step Procedure */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-300 block">Standard Experimental Procedure:</span>
                    <div className="space-y-2 text-xs">
                      {prac.procedure.map((step, i) => (
                        <div key={i} className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                          <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                            {i + 1}
                          </span>
                          <span className="text-slate-200 leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Observation Table with Specimen Data */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-300 block">
                      Observation &amp; Measurement Table (Specimen Data):
                    </span>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden">
                        <thead className="bg-slate-900 text-slate-400 font-mono text-[11px]">
                          <tr>
                            {prac.observationTable.headers.map((h, i) => (
                              <th key={i} className="p-2.5 border-b border-slate-800">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono text-[11px]">
                          {prac.observationTable.sampleRows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-900/40">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2.5">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Calculation and Outcome */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <span className="font-semibold text-cyan-300 block">KNEC Calculation Walkthrough:</span>
                    <p className="font-mono text-slate-200 whitespace-pre-wrap">{prac.calculationFormula}</p>
                    <p className="text-slate-400 pt-2 border-t border-slate-800">
                      <strong>Expected Analytical Outcome:</strong> {prac.expectedOutcome}
                    </p>
                  </div>

                  {/* Viva Voce Questions */}
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                      <HelpCircle className="w-4 h-4 text-emerald-400" />
                      <span>Oral &amp; Viva Voce Exam Questions:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      {prac.vivaQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Interactive Simulation */}
          {activeTab === 'simulation' && (
            <div className="space-y-4">
              {renderSimulation(activeCourse.simulationType)}
            </div>
          )}

          {/* Tab 4: Past Exams & Tests */}
          {activeTab === 'exams' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Full Examination Papers &amp; Marking Schemes</h3>
                  <p className="text-xs text-slate-400">Timed simulation tests formatted to Kenyan national examination standards</p>
                </div>
              </div>

              {activeCourse.exams.map((ex) => (
                <div key={ex.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">
                        {ex.paperCode}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-slate-400">{ex.durationMinutes} Minutes</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-slate-400">{ex.totalMarks} Marks</span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-1">{ex.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">Contains {ex.questions.length} comprehensive questions with KNEC marking scheme.</p>
                  </div>

                  <button
                    onClick={() => onStartExam(ex, activeCourse.name)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg transition-colors"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Start Timed Exam
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
