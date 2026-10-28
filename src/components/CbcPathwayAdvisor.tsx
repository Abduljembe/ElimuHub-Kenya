import React, { useState } from 'react';
import {
  Compass,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Cpu,
  Layers,
  Palette,
  Activity
} from 'lucide-react';
import { CBC_SENIOR_SCHOOL_PATHWAYS, CbcPathway, CbcTrack } from '../data/cbcPathwayData';

interface CbcPathwayAdvisorProps {
  onAskAI: (subject: string, topic: string, level: string) => void;
}

export const CbcPathwayAdvisor: React.FC<CbcPathwayAdvisorProps> = ({ onAskAI }) => {
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>(CBC_SENIOR_SCHOOL_PATHWAYS[0].pathwayId);
  const [selectedTrackId, setSelectedTrackId] = useState<string>(
    CBC_SENIOR_SCHOOL_PATHWAYS[0].tracks[0].trackId
  );

  const activePathway: CbcPathway =
    CBC_SENIOR_SCHOOL_PATHWAYS.find((p) => p.pathwayId === selectedPathwayId) ||
    CBC_SENIOR_SCHOOL_PATHWAYS[0];

  const activeTrack: CbcTrack =
    activePathway.tracks.find((t) => t.trackId === selectedTrackId) || activePathway.tracks[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-blue-400">
              <span>Competency-Based Curriculum (CBC) Senior School</span>
              <span>·</span>
              <span>Grades 10, 11 &amp; 12</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Senior School Pathway &amp; Career Track Advisor
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Explore the 3 national CBC Senior School pathways. Map elective subject combinations to university degree clusters and future careers under the CUE and KUCCPS frameworks.
            </p>
          </div>

          <button
            onClick={() =>
              onAskAI(
                'CBC Senior School Pathways',
                `${activePathway.name} - ${activeTrack.trackName}`,
                'CBC Grade 10-12 Career Placement'
              )
            }
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Consult AI Career Counselor</span>
          </button>
        </div>

        {/* Pathway Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
          {CBC_SENIOR_SCHOOL_PATHWAYS.map((p) => {
            const isSelected = p.pathwayId === activePathway.pathwayId;
            return (
              <button
                key={p.pathwayId}
                onClick={() => {
                  setSelectedPathwayId(p.pathwayId);
                  setSelectedTrackId(p.tracks[0].trackId);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-950/70 border-blue-500/80 shadow-md ring-1 ring-blue-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 font-bold">
                    {p.badge}
                  </span>
                  <span className="text-slate-400">{p.targetEnrollmentPercent}</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">{p.name}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Track Details Canvas */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        {/* Pathway Universal Core Subjects */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <span className="text-xs font-mono uppercase text-blue-400 font-bold block mb-2">
            Universal Compulsory Core Subjects for {activePathway.name}:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {activePathway.coreCompulsoryAll.map((subj, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-1.5 font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                {subj}
              </span>
            ))}
          </div>
        </div>

        {/* Track Selector Bar */}
        <div>
          <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
            Select Track in this Pathway:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {activePathway.tracks.map((t) => {
              const isSelected = t.trackId === activeTrack.trackId;
              return (
                <button
                  key={t.trackId}
                  onClick={() => setSelectedTrackId(t.trackId)}
                  className={`px-3.5 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors border ${
                    isSelected
                      ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t.trackName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Track Deep Dive */}
        <div className="border border-slate-800 rounded-xl p-5 bg-slate-950/60 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-xl font-bold text-white">{activeTrack.trackName}</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{activeTrack.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Core Track Subjects */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-blue-400 uppercase font-mono text-[10px] font-bold block">
                Core Track Subjects (Mandatory):
              </span>
              <div className="space-y-1.5">
                {activeTrack.coreTrackSubjects.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-200 font-medium">
                    <span className="w-5 h-5 rounded bg-blue-950 text-blue-400 font-mono text-[10px] flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Elective Options */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 uppercase font-mono text-[10px] font-bold block">
                Eligible Electives (Choose 1 or 2):
              </span>
              <div className="space-y-1.5">
                {activeTrack.electiveOptions.map((e, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <span className="text-cyan-400">•</span>
                    <span>{e}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Subject Combinations */}
          <div>
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-2.5">
              Recommended Student Combinations &amp; University Alignments:
            </span>
            <div className="space-y-3">
              {activeTrack.recommendedCombinations.map((combo, idx) => (
                <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">{combo.title}</h4>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono font-bold">
                      {combo.targetUniversityDegree}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {combo.subjects.map((sub, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Kenyan University Degrees */}
          <div className="p-4 bg-blue-950/20 border border-blue-500/30 rounded-xl text-xs space-y-2">
            <span className="text-blue-400 uppercase font-mono text-[10px] font-bold block">
              Direct Degree Pathways in Kenyan Universities (KUCCPS Linked):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              {activeTrack.careerDegreesKenya.map((deg, i) => (
                <div key={i} className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{deg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
