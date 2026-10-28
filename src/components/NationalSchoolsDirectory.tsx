import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Filter,
  Award,
  MapPin,
  Users,
  Compass,
  Building,
  DollarSign,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Star
} from 'lucide-react';
import { TOP_KENYAN_SCHOOLS, KenyanSchool } from '../data/kenyanSchoolsData';

export function NationalSchoolsDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'Boys' | 'Girls' | 'Mixed'>('all');
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [selectedSchool, setSelectedSchool] = useState<KenyanSchool>(TOP_KENYAN_SCHOOLS[0]);

  // Unique counties
  const counties = ['all', ...Array.from(new Set(TOP_KENYAN_SCHOOLS.map((s) => s.county)))];

  // Filtering
  const filteredSchools = TOP_KENYAN_SCHOOLS.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.motto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.specialties.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesGender = genderFilter === 'all' || school.gender === genderFilter;
    const matchesCounty = selectedCounty === 'all' || school.county === selectedCounty;

    return matchesSearch && matchesGender && matchesCounty;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-700/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-400/30">
              <Building className="w-3.5 h-3.5" />
              KICD & Ministry of Education Accredited
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Top Kenyan National Secondary Schools & Senior School Directory
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              Explore Kenya&apos;s elite National and Extra-County schools, historic cut-off scores, KCSE mean grade
              trajectories, specialized STEM/Aviation labs, CBC Senior School tracks, and official gazetted fee caps.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center shrink-0 min-w-[210px]">
            <div className="text-xs text-blue-200 uppercase font-semibold">National School Selection</div>
            <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-1">380 – 400+</div>
            <div className="text-xs text-white/90 font-medium mt-0.5">Average KCPE / CBC Cut-Off</div>
            <div className="mt-2 text-[11px] text-blue-200 bg-blue-950/60 py-1 px-2 rounded font-mono">
              Fee Cap: KSh 53,554 / Year
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search school name, county, specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Gender Filter Buttons */}
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden text-xs font-semibold">
            {(['all', 'Boys', 'Girls'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                className={`px-3 py-1.5 transition-colors ${
                  genderFilter === g
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                }`}
              >
                {g === 'all' ? 'All Genders' : g}
              </button>
            ))}
          </div>

          {/* County Dropdown */}
          <select
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold px-3 py-1.5 text-slate-700 dark:text-slate-300"
          >
            {counties.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Counties' : `${c} County`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content: Directory List on Left, School Detail Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: School Cards */}
        <div className="lg:col-span-5 space-y-3 max-h-[800px] overflow-y-auto pr-1">
          {filteredSchools.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              No schools match your search filters.
            </div>
          ) : (
            filteredSchools.map((school) => {
              const isSelected = selectedSchool.code === school.code;
              return (
                <div
                  key={school.code}
                  onClick={() => setSelectedSchool(school)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          {school.gender}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">KNEC {school.code}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">{school.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>
                          {school.subCounty}, {school.county} County
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        KCSE {school.kcseMeanGrade} ({school.kcseMeanScore})
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Cut-off: {school.kcpeHistoricalCutoff}+</div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {school.specialties.slice(0, 2).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                    {school.specialties.length > 2 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-400">
                        +{school.specialties.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Comprehensive School Dossier */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden sticky top-6">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 to-blue-950 text-white space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {selectedSchool.category} Secondary Institution
                </span>
                <span className="text-xs text-slate-300 font-mono">Founded {selectedSchool.establishedYear}</span>
              </div>

              <div>
                <h2 className="text-2xl font-black">{selectedSchool.name}</h2>
                <p className="text-xs text-blue-200 italic mt-0.5">&ldquo;{selectedSchool.motto}&rdquo;</p>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
                <div>
                  <span className="text-slate-400">Principal:</span> <span className="font-semibold text-white">{selectedSchool.principal}</span>
                </div>
                <div>
                  <span className="text-slate-400">County:</span> <span className="font-semibold text-white">{selectedSchool.county}</span>
                </div>
                <div>
                  <span className="text-slate-400">Code:</span> <span className="font-mono text-white">{selectedSchool.code}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-700 border-b border-slate-100 dark:border-slate-700 p-4 text-center bg-slate-50 dark:bg-slate-900/50">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">KCSE Mean Trajectory</div>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {selectedSchool.kcseMeanGrade} ({selectedSchool.kcseMeanScore})
                </div>
                <div className="text-[10px] text-slate-400">Out of 12.0 points</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Entry Cut-Off Target</div>
                <div className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                  {selectedSchool.kcpeHistoricalCutoff} Marks
                </div>
                <div className="text-[10px] text-slate-400">Top 1% Tier in Kenya</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">MoE Gazetted Fee Cap</div>
                <div className="text-xl font-black text-purple-600 dark:text-purple-400 mt-0.5">
                  KSh {selectedSchool.annualFeesGazettedKsh.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">Per Academic Year</div>
              </div>
            </div>

            {/* Body Info */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">History & Profile</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedSchool.description}
                </p>
              </div>

              {/* Specialized Academic & Co-Curricular Strengths */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Academic Focus & Facilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSchool.specialties.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CBC Senior School Tracks */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Accredited CBC Senior School (Grades 10–12) Tracks
                </h4>
                <div className="space-y-1.5">
                  {selectedSchool.cbcSeniorSchoolTracks.map((track, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 text-xs font-semibold text-blue-900 dark:text-blue-200 flex items-center justify-between"
                    >
                      <span>{track}</span>
                      <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">Accredited</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notable Alumni */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Notable Alumni</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSchool.notableAlumni.map((alum, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                    >
                      {alum}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
