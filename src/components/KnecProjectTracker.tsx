import React, { useState, useEffect } from 'react';
import {
  FileCode,
  Sprout,
  CheckCircle2,
  Calendar,
  Award,
  AlertCircle,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { KNEC_PROJECTS_DATA, NationalProjectCourse, ProjectMilestone } from '../data/knecProjectData';

interface KnecProjectTrackerProps {
  onAskAI: (subject: string, topic: string, level: string) => void;
}

export const KnecProjectTracker: React.FC<KnecProjectTrackerProps> = ({ onAskAI }) => {
  const [selectedSubject, setSelectedSubject] = useState<'Computer Studies' | 'Agriculture'>('Computer Studies');

  // Completed milestone deliverables saved in localStorage
  const [completedDeliverables, setCompletedDeliverables] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('elimuhub_knec_project_deliverables');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('elimuhub_knec_project_deliverables', JSON.stringify(completedDeliverables));
    } catch {
      // storage unavailable
    }
  }, [completedDeliverables]);

  const activeProject: NationalProjectCourse =
    KNEC_PROJECTS_DATA.find((p) => p.subject === selectedSubject) || KNEC_PROJECTS_DATA[0];

  const toggleDeliverable = (item: string) => {
    setCompletedDeliverables((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const totalDeliverablesCount = activeProject.milestones.reduce(
    (acc, m) => acc + m.deliverables.length,
    0
  );

  const completedCount = activeProject.milestones.reduce(
    (acc, m) => acc + m.deliverables.filter((d) => completedDeliverables.includes(d)).length,
    0
  );

  const progressPercent = Math.round((completedCount / totalDeliverablesCount) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
              <span>National Examination Council (KNEC) Paper 3</span>
              <span>·</span>
              <span>Year-Long Practical Projects</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              KCSE Practical Project Milestones &amp; Rubrics
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Official milestone timelines, documentation requirements, and examiner assessment rubrics for Computer Studies (451/3) and Agriculture (443/3).
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 min-w-[240px]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">Project Completion:</span>
              <strong className="text-emerald-400 font-mono text-sm">{progressPercent}%</strong>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              {completedCount} of {totalDeliverablesCount} tasks completed
            </span>
          </div>
        </div>

        {/* Project Selector Bar */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 text-xs font-medium">
          <button
            onClick={() => setSelectedSubject('Computer Studies')}
            className={`py-2 px-4 rounded-xl flex items-center gap-2 transition-colors border ${
              selectedSubject === 'Computer Studies'
                ? 'bg-emerald-600 border-emerald-500 text-white font-semibold shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 text-cyan-300" />
            Computer Studies Project (451/3)
          </button>
          <button
            onClick={() => setSelectedSubject('Agriculture')}
            className={`py-2 px-4 rounded-xl flex items-center gap-2 transition-colors border ${
              selectedSubject === 'Agriculture'
                ? 'bg-emerald-600 border-emerald-500 text-white font-semibold shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sprout className="w-4 h-4 text-emerald-300" />
            Agriculture Project (443/3)
          </button>
        </div>
      </div>

      {/* Project Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
              {activeProject.paperCode}
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">{activeProject.subject} National Project</h3>
          </div>
          <button
            onClick={() =>
              onAskAI(
                activeProject.subject,
                `${activeProject.paperCode} Milestones & Documentation`,
                'KCSE Form 4 Project'
              )
            }
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Consult Project AI Specialist
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          {activeProject.projectOverview}
        </p>

        {/* Milestones Accordion */}
        <div className="space-y-5">
          {activeProject.milestones.map((m) => (
            <div key={m.milestoneNumber} className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center">
                    M{m.milestoneNumber}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-white">{m.title}</h4>
                    <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      Target Deadline: {m.deadlineKnecTerm}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 font-bold">
                  Max: {m.maxMarks} Marks
                </span>
              </div>

              {/* Deliverables Checklist */}
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-2">
                  Key Deliverables &amp; Student Tasks:
                </span>
                <div className="space-y-2">
                  {m.deliverables.map((deliv, i) => {
                    const isDone = completedDeliverables.includes(deliv);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleDeliverable(deliv)}
                        className={`w-full text-left p-3 rounded-lg border text-xs flex items-start gap-3 transition-colors ${
                          isDone
                            ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 mt-0.5 shrink-0 ${isDone ? 'text-emerald-400' : 'text-slate-600'}`}
                        />
                        <span className={isDone ? 'line-through text-slate-400' : ''}>{deliv}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Examiner Rubric */}
              <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="text-amber-400 font-mono text-[10px] uppercase font-bold block">
                  Official KNEC Examiner Scoring Rubric:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  {m.knecExaminerRubric.map((rub, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{rub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip */}
              <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-cyan-300">Examiner Advice:</strong> {m.proTips}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
