import React, { useState } from 'react';
import {
  GraduationCap,
  Building,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  DollarSign,
  Briefcase,
  Calculator
} from 'lucide-react';
import { KUCCPS_DEGREE_PROGRAMMES, DegreeProgramme } from '../data/kuccpsData';

export const KuccpsExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDegreeId, setSelectedDegreeId] = useState<string>(KUCCPS_DEGREE_PROGRAMMES[0].id);

  // Student test cluster point input
  const [studentClusterPoints, setStudentClusterPoints] = useState<number>(42.5);

  const categories = [
    { id: 'all', label: 'All Programmes' },
    { id: 'Health Sciences', label: 'Medicine & Health' },
    { id: 'Engineering & Technology', label: 'Engineering' },
    { id: 'Computing & IT', label: 'Computer Science & AI' },
    { id: 'Law & Humanities', label: 'Law (LL.B)' },
    { id: 'Business & Economics', label: 'Commerce & Finance' },
    { id: 'Built Environment', label: 'Architecture & Design' }
  ];

  const filteredProgrammes = KUCCPS_DEGREE_PROGRAMMES.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.programmeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.programmeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.careerPathways.some((cp) => cp.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const activeDegree: DegreeProgramme =
    KUCCPS_DEGREE_PROGRAMMES.find((p) => p.id === selectedDegreeId) || KUCCPS_DEGREE_PROGRAMMES[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400">
              <span>KUCCPS National University Placement System</span>
              <span>·</span>
              <span>Degree Clusters &amp; Cut-Offs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              University Course &amp; Cut-Off Explorer
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Explore competitive degree programmes across Kenyan universities (UoN, JKUAT, KU, Moi, Strathmore, Egerton, TUK). Match your KCSE cluster points against actual 3-year historical cut-offs.
            </p>
          </div>

          {/* Interactive Cluster Point Matcher Slider */}
          <div className="bg-slate-950/80 border border-cyan-500/40 p-4 rounded-xl min-w-[280px]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400 font-medium">Your Target Cluster:</span>
              <span className="text-cyan-400 font-mono font-bold text-sm">
                {studentClusterPoints.toFixed(1)} / 48.0
              </span>
            </div>
            <input
              type="range"
              min="20.0"
              max="48.0"
              step="0.1"
              value={studentClusterPoints}
              onChange={(e) => setStudentClusterPoints(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Move slider to test admission probability for Kenyan campuses
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors border ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-950 border-cyan-500/80 text-cyan-300 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px] flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search degrees, codes, careers..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Programme List + Selected Degree Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Programmes List */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-2 max-h-[720px] overflow-y-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between">
            <span>Programmes ({filteredProgrammes.length})</span>
            <span className="font-mono text-cyan-400 text-[10px]">KUCCPS Standard</span>
          </div>

          <div className="space-y-1.5">
            {filteredProgrammes.map((p) => {
              const isSelected = p.id === activeDegree.id;
              const meetsAverage = studentClusterPoints >= p.averageCutOff;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedDegreeId(p.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500/80 shadow-md ring-1 ring-cyan-500/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">{p.programmeCode}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-bold ${
                        meetsAverage
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'bg-rose-950 text-rose-400'
                      }`}
                    >
                      Cut-Off: ~{p.averageCutOff} pts
                    </span>
                  </div>
                  <h4 className={`text-sm font-bold mt-1 line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {p.programmeName}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                    <span>{p.durationYears} Years</span>
                    <span>·</span>
                    <span>Min: {p.minKcseMeanGrade.split(' ')[0]}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed University Comparison */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Degree Info */}
          <div className="border-b border-slate-800 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                  KUCCPS Code: {activeDegree.programmeCode} · {activeDegree.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-0.5">{activeDegree.programmeName}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                  Duration: {activeDegree.durationYears} Academic Years
                </span>
              </div>
            </div>

            {/* Subject Grade Requirements & Cluster Formula */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 uppercase tracking-wider font-mono text-[10px] font-bold block">
                  Minimum Subject Grade Requirements:
                </span>
                <div className="space-y-1">
                  {activeDegree.subjectRequirements.map((req, i) => (
                    <div key={i} className="flex items-center justify-between p-1.5 rounded bg-slate-900/60 border border-slate-800/60">
                      <span className="text-slate-200">{req.subject}</span>
                      <span className="font-mono text-cyan-400 font-bold">{req.minGrade}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 uppercase tracking-wider font-mono text-[10px] font-bold block">
                  4 Required KUCCPS Cluster Subjects:
                </span>
                <div className="space-y-1">
                  {activeDegree.clusterSubjectFormula.map((subj, i) => (
                    <div key={i} className="flex items-center gap-2 p-1.5 rounded bg-slate-900/60 border border-slate-800/60 text-slate-300">
                      <span className="w-5 h-5 rounded bg-cyan-950 text-cyan-400 font-mono text-[10px] font-bold flex items-center justify-center">
                        C{i + 1}
                      </span>
                      <span>{subj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Universities Comparison Table */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-cyan-400" />
              Kenyan Campuses Offering This Programme &amp; Historical Cut-Offs
            </h4>

            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                    <th className="p-3">University &amp; Campus</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">2023 Cut-Off</th>
                    <th className="p-3">2024 Cut-Off</th>
                    <th className="p-3">2025 Cut-Off</th>
                    <th className="p-3">Annual Tuition</th>
                    <th className="p-3">Your Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {activeDegree.universities.map((uni, idx) => {
                    const qualified = studentClusterPoints >= uni.cutOff2025;
                    const diff = studentClusterPoints - uni.cutOff2025;
                    return (
                      <tr key={idx} className="hover:bg-slate-950/50 transition-colors">
                        <td className="p-3 font-semibold text-white">
                          <div>{uni.universityName}</div>
                          <span className="text-[10px] text-slate-500 font-normal">{uni.campusLocation}</span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                            uni.type === 'Public' ? 'bg-emerald-950 text-emerald-400' : 'bg-purple-950 text-purple-400'
                          }`}>
                            {uni.type}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-300">{uni.cutOff2023.toFixed(2)}</td>
                        <td className="p-3 font-mono text-slate-300">{uni.cutOff2024.toFixed(2)}</td>
                        <td className="p-3 font-mono text-cyan-400 font-bold">{uni.cutOff2025.toFixed(2)}</td>
                        <td className="p-3 font-mono text-slate-200">
                          KSh {uni.annualFeeKSh.toLocaleString()}
                        </td>
                        <td className="p-3">
                          {qualified ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Competitive (+{diff.toFixed(1)})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-400 font-medium text-[11px]">
                              <AlertCircle className="w-3.5 h-3.5" />
                              Short by {Math.abs(diff).toFixed(1)}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Career Pathways & Top Kenyan Employers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 uppercase tracking-wider font-mono text-[10px] font-bold flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                Key Career Pathways in Kenya:
              </span>
              <ul className="space-y-1.5 text-slate-300">
                {activeDegree.careerPathways.map((cp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    <span>{cp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 uppercase tracking-wider font-mono text-[10px] font-bold flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                Leading Employers &amp; Regulators in Kenya:
              </span>
              <ul className="space-y-1.5 text-slate-300">
                {activeDegree.topEmployersKenya.map((emp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span>{emp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
