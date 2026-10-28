import React, { useState } from 'react';
import { Calendar, CheckSquare, Bookmark, BookOpen, Plus, Trash2, Save } from 'lucide-react';
import { SubjectCourse } from '../types/curriculum';

interface StudyPlannerProps {
  courses: SubjectCourse[];
  completedTopicIds: string[];
  onToggleTopic: (topicId: string) => void;
  bookmarkedTopicIds: string[];
  onToggleBookmark: (topicId: string) => void;
  notes: Record<string, string>;
  onSaveNote: (courseId: string, text: string) => void;
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({
  courses,
  completedTopicIds,
  onToggleTopic,
  bookmarkedTopicIds,
  onToggleBookmark,
  notes,
  onSaveNote
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [activeNoteText, setActiveNoteText] = useState<string>(notes[selectedCourseId] || '');
  const [timetableDay, setTimetableDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'>('Mon');

  // Kenya term study timetable
  const [schedule, setSchedule] = useState({
    Mon: [
      { time: '08:00 - 10:00', task: 'Chemistry Theory: Volumetric Stoichiometry & Gas Laws' },
      { time: '10:30 - 12:30', task: 'Mathematics: Differential Calculus & Station Points' },
      { time: '14:00 - 16:00', task: 'Computer Studies: Database Normalization (1NF to 3NF)' }
    ],
    Tue: [
      { time: '08:00 - 10:00', task: 'Biology: Cell Physiology, Osmosis & Active Transport' },
      { time: '10:30 - 12:30', task: 'Physics Practical: Resistance Wire & Internal Resistance' },
      { time: '14:00 - 16:00', task: 'Medicine / OSCE Station: 12-Lead ECG STEMI Review' }
    ],
    Wed: [
      { time: '08:00 - 10:00', task: 'Electrical Engineering: Star-Delta Three-Phase Motor' },
      { time: '10:30 - 12:30', task: 'Chemistry Lab: Titration Endpoint & Indicator Transitions' },
      { time: '14:00 - 16:00', task: 'Law: Article 24 Constitutional Limitations Moot Prep' }
    ],
    Thu: [
      { time: '08:00 - 10:00', task: 'Economics: IS-LM Macro Equilibrium & CBK Monetary Policy' },
      { time: '10:30 - 12:30', task: 'Algorithms: QuickSort & Asymptotic Big-O Analysis' },
      { time: '14:00 - 16:00', task: 'Biology Practical: Potato Cylinder Osmosis Curve' }
    ],
    Fri: [
      { time: '08:00 - 10:00', task: 'KCSE Mock Exam Paper 1 Timed Revision' },
      { time: '10:30 - 12:30', task: 'University Past Exam Problem Solving & Marking Scheme' },
      { time: '14:00 - 16:00', task: 'Weekly Formula Log & KRA PAYE Calculation Drill' }
    ],
    Sat: [
      { time: '09:00 - 12:00', task: 'Virtual Laboratory Simulations: Chemistry & Circuit Sandbox' },
      { time: '14:00 - 16:00', task: 'Interactive Algorithm Profiler & Clinical Monitor Run' }
    ]
  });

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleCourseChange = (id: string) => {
    setSelectedCourseId(id);
    setActiveNoteText(notes[id] || '');
  };

  const handleSaveCurrentNote = () => {
    onSaveNote(selectedCourseId, activeNoteText);
  };

  // Syllabus progress percentage
  const totalTopics = courses.reduce((acc, c) => acc + c.topics.length, 0);
  const totalCompleted = completedTopicIds.length;
  const progressPercent = totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0;

  return (
    <div className="space-y-6 text-slate-100">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Syllabus Completion</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold font-mono text-emerald-400">{progressPercent}%</span>
            <span className="text-xs text-slate-500 font-mono">{totalCompleted} of {totalTopics} Units</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Bookmarked Revision Units</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold font-mono text-cyan-400">{bookmarkedTopicIds.length}</span>
            <span className="text-xs text-slate-500">Fast Access</span>
          </div>
          <p className="text-xs text-slate-400 mt-3">Topics tagged for pre-exam cramming</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Kenyan Academic Cycle</span>
          <div className="mt-2 text-sm font-semibold text-white">Term 1 / Semester 1</div>
          <p className="text-xs text-slate-400 mt-1">Midterm Continuous Assessment &amp; KCSE Form 4 Registration</p>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Timetable and Subject Topic Checklist */}
        <div className="lg:col-span-7 space-y-6">
          {/* Timetable */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Weekly High School &amp; University Revision Schedule</h4>
              </div>

              {/* Day filter tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
                {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const).map((day) => (
                  <button
                    key={day}
                    onClick={() => setTimetableDay(day)}
                    className={`px-2 py-1 rounded transition-colors ${
                      timetableDay === day
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {schedule[timetableDay].map((slot, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
                  <span className="font-mono text-cyan-400 font-semibold w-28 shrink-0">{slot.time}</span>
                  <span className="text-slate-200 flex-1 ml-3 font-medium">{slot.task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Mastery Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">Curriculum Topic Mastery Checklist</h4>
              </div>

              <select
                value={selectedCourseId}
                onChange={(e) => handleCourseChange(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2.5">
              {selectedCourse.topics.map((top) => {
                const isCompleted = completedTopicIds.includes(top.id);
                const isBookmarked = bookmarkedTopicIds.includes(top.id);

                return (
                  <div
                    key={top.id}
                    className={`p-3.5 rounded-lg border flex items-center justify-between transition-colors ${
                      isCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => onToggleTopic(top.id)}
                        className="w-4 h-4 rounded text-emerald-600 bg-slate-900 border-slate-700 focus:ring-emerald-500 cursor-pointer"
                      />
                      <div>
                        <span className={`text-xs font-semibold block ${isCompleted ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                          {top.title}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">{top.formOrYear}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleBookmark(top.id)}
                      className={`p-1.5 rounded-md hover:bg-slate-800 transition-colors ${
                        isBookmarked ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Add bookmark'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Personal Course Notes Notebook */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Student Notebook &amp; Lab Log</h4>
            </div>
            <button
              onClick={handleSaveCurrentNote}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow"
            >
              <Save className="w-3.5 h-3.5" />
              Save Note
            </button>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block mb-1">
              Active Subject: <strong className="text-cyan-300">{selectedCourse.name}</strong>
            </span>
            <textarea
              value={activeNoteText}
              onChange={(e) => setActiveNoteText(e.target.value)}
              rows={14}
              placeholder={`Write key formulas, experimental observations, or lecturer tips for ${selectedCourse.name}...`}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-emerald-500"
            />
          </div>

          <p className="text-[11px] text-slate-500">
            Notes are saved locally in your browser storage and will be retained across study sessions.
          </p>
        </div>
      </div>
    </div>
  );
};
