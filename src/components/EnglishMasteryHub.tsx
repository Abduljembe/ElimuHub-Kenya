import React, { useState } from 'react';
import {
  PenTool,
  Volume2,
  FileCheck,
  CheckCircle2,
  BookOpen,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  Layers,
  ArrowRight,
  BookmarkCheck,
  Lightbulb
} from 'lucide-react';

export const EnglishMasteryHub: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'functional' | 'stress' | 'silent' | 'homophones' | 'intonation' | 'performance'>('functional');
  
  // Functional writing selected template
  const [selectedFormat, setSelectedFormat] = useState<'minutes' | 'cv' | 'memo' | 'speech' | 'report' | 'review'>('minutes');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Syllable Stress Interactive State
  const [selectedWordCategory, setSelectedWordCategory] = useState<'noun-verb' | 'suffix' | 'three-syllable'>('noun-verb');

  // Homophones Quiz State
  const [homophoneIndex, setHomophoneIndex] = useState(0);
  const [homophoneChoice, setHomophoneChoice] = useState<string | null>(null);
  const [homophoneScore, setHomophoneScore] = useState(0);

  // Functional writing templates & rubrics
  const functionalTemplates = {
    minutes: {
      title: 'Minutes of a Formal Meeting',
      knecWeight: 'Format: 8 Marks · Content: 8 Marks · Language: 4 Marks (Total: 20)',
      compulsoryElements: [
        'Comprehensive Heading: Name of Club/Board, Purpose of meeting, Venue, Date, Time',
        'List of Members Present with designations (Chairperson, Secretary, Treasurer)',
        'List of Members Absent with Apology',
        'List of Members Absent without Apology',
        'In Attendance / Invited Guests (e.g. Patron, Guest Speaker)',
        'Preliminaries: Opening prayer or welcome remarks from the Chair',
        'Confirmation of Previous Minutes (Read, proposed, seconded, signed)',
        'Matters Arising from Previous Minutes',
        'Substantive Agenda Items (Minimum 2 distinctly numbered agendas: MIN 04/2026, MIN 05/2026)',
        'Any Other Business (A.O.B)',
        'Adjournment & Date of Next Meeting',
        'Signing Off Blocks: Separate spaces for Chairperson and Secretary with Date'
      ],
      sampleText: `MINUTES OF THE EXECUTIVE COMMITTEE MEETING OF THE ST. FRANCIS ENVIRONMENTAL CLUB HELD IN THE BIOLOGY LABORATORY ON 14TH MARCH, 2026 AT 4:00 P.M.

PRESENT:
1. Kevin Mwangi      - Chairperson
2. Brenda Chebet     - Secretary
3. Dennis Kipkorir   - Treasurer
4. Amina Hassan      - Organizing Secretary

ABSENT WITH APOLOGY:
1. Brian Ochieng     - Vice Chairperson

ABSENT WITHOUT APOLOGY:
1. Moses Wafula      - Committee Member

IN ATTENDANCE:
1. Mr. J. Kamau      - Patron & HOD Science

MIN 01/03/2026: PRELIMINARIES
The meeting was called to order at 4:10 p.m. with a word of prayer led by Dennis Kipkorir. The Chairperson welcomed all members and thanked them for punctuality.

MIN 02/03/2026: CONFIRMATION OF PREVIOUS MINUTES
Minutes of the previous meeting held on 20th February 2026 were read aloud by the Secretary. They were confirmed as a true record, proposed by Amina Hassan and seconded by Dennis Kipkorir.

MIN 03/03/2026: MATTERS ARISING
MIN 05/02/2026 (Tree Planting Campaign): The Treasurer reported that 300 tree seedlings had been received from the Kenya Forest Service (KFS) nursery and were ready for planting along the perimeter fence.

MIN 04/03/2026: WORLD ENVIRONMENT DAY CELEBRATIONS
Members agreed to host an inter-house environmental debate and tree nursery exhibition on 5th June 2026. The Secretary was tasked to draft invitation letters to neighboring schools by 30th March.

MIN 05/03/2026: ANY OTHER BUSINESS (A.O.B)
i. Brenda Chebet suggested the fabrication of color-coded plastic recycling bins across all classroom blocks. The Patron pledged to present the budget to the Principal.

MIN 06/03/2026: ADJOURNMENT
There being no other business, the meeting was adjourned at 5:25 p.m. The next meeting will be held on 28th March 2026 at the same venue.

CONFIRMED BY:

CHAIRPERSON: _____________________    DATE: _____________________

SECRETARY:   _____________________    DATE: _____________________`
    },
    cv: {
      title: 'Curriculum Vitae (CV) & Job Application Cover Letter',
      knecWeight: 'Format: 8 Marks · Content: 8 Marks · Language: 4 Marks (Total: 20)',
      compulsoryElements: [
        'Curriculum Vitae Heading with full legal name, contacts, email',
        'Personal Information / Bio Data (DOB, nationality, languages)',
        'Career Objective (concise, professional target)',
        'Educational Background in reverse chronological order (Institutions, years, qualifications)',
        'Professional / Work Experience & Responsibilities',
        'Key Skills & Competencies (Leadership, ICT, communication)',
        'Hobbies and Co-curricular interests',
        'Referees: Minimum 2 credible referees with full postal address, phone, official designation'
      ],
      sampleText: `CURRICULUM VITAE

1. PERSONAL INFORMATION
Full Name:        Jane Moraa Kemunto
Postal Address:   P.O. Box 45012 - 00100, Nairobi, Kenya
Telephone:        +254 712 345 678
Email:            jane.moraa@elimuhub.co.ke
Date of Birth:    18th August, 2005
Nationality:      Kenyan
Languages:        English (Fluent), Kiswahili (Fluent)

2. CAREER OBJECTIVE
A committed, articulate, and detail-oriented young professional seeking to apply administrative and peer leadership skills in community outreach and youth mentorship.

3. EDUCATIONAL BACKGROUND
2022 - 2025: Alliance Girls' High School
             Kenya Certificate of Secondary Education (KCSE)
             Attained: Mean Grade A (81 Points)

2014 - 2021: Moi Forces Academy Primary School
             Kenya Certificate of Primary Education (KCPE)
             Attained: 412 Marks

4. LEADERSHIP & WORK EXPERIENCE
2024 - 2025: School Head Girl & President of Student Council, Alliance Girls' High School
             - Chaired the 24-member prefects' executive council.
             - Represented student welfare before the Board of Management.
2023 - 2024: Secretary, St. John Ambulance Cadet Corps
             - Coordinated emergency first aid coverage during national sports tournaments.

5. SPECIAL SKILLS & COMPETENCIES
- Computer Literate: Proficient in Microsoft Office (Word, Excel, PowerPoint), Graphic Design.
- Certified First Aider (St. John Ambulance Gold Certificate).
- Public speaking and dispute resolution.

6. HOBBIES & INTERESTS
- Chess playing (Represented Central Region in Kenya National Chess Championship).
- Creative writing and community tree planting.

7. REFEREES
1. Mrs. Grace Maina
   Chief Principal, Alliance Girls' High School
   P.O. Box 109 - 00902, Kikuyu
   Tel: +254 20 201 2345
   Email: principal@alliancegirls.ac.ke

2. Dr. Samuel Omondi
   Senior Lecturer, School of Education, University of Nairobi
   P.O. Box 30197 - 00100, Nairobi
   Tel: +254 722 987 654
   Email: somondi@uonbi.ac.ke`
    },
    memo: {
      title: 'Internal Memorandum (Memo)',
      knecWeight: 'Format: 6 Marks · Content: 10 Marks · Language: 4 Marks (Total: 20)',
      compulsoryElements: [
        'Organization / School Letterhead title centered',
        'Standard Memo Headers: TO, FROM, DATE, REF, SUBJECT (All Caps)',
        'Body: Direct, unambiguous, professional tone',
        'Action required / deadline clearly stated',
        'Signature & Name of sender at bottom'
      ],
      sampleText: `BARINGO HIGH SCHOOL
INTERNAL MEMORANDUM

TO:      All Form Four Candidates
FROM:    Dean of Studies & Examinations
DATE:    20th October, 2026
REF:     BHS/EXAM/2026/04
SUBJECT: COLLECTION OF KCSE EXAMINATION TIMETABLES AND CLEARANCE FORMS

This is to notify all registered 2026 KCSE candidates that official KNEC examination timetables and index number verification slips are ready for collection.

Please observe the following instructions:
1. Collect your clearance form from your respective Class Teacher between 8:00 a.m. and 12:00 noon on Friday, 24th October 2026.
2. Ensure you have returned all textbooks and science apparatus borrowed from the school library and science laboratories.
3. The official candidate briefing by the Sub-County Director of Education and KNEC Center Supervisors will take place on Monday, 27th October at 9:00 a.m. in the Multi-Purpose Hall. Attendance is mandatory.

Strict compliance with the examination code of conduct is expected of all students.

[Signature]
Mr. Peter K. Koech
DEAN OF STUDIES`
    },
    speech: {
      title: 'Formal Speech (Guest of Honor / Valedictorian)',
      knecWeight: 'Format: 6 Marks · Content: 10 Marks · Language: 4 Marks (Total: 20)',
      compulsoryElements: [
        'Title of the speech indicating speaker, event, venue, date',
        'Hierarchical Protocol Acknowledgement (e.g. Chief Guest, Principal, Teachers, Parents, Students)',
        'Introduction: Expression of honor, theme of the day',
        'Body: Thematic development with transitional phrases, anecdotes, evidence',
        'Conclusion: Call to action, inspirational charge, thank you formula'
      ],
      sampleText: `A SPEECH DELIVERED BY DR. FLORENCE NJERI, CABINET SECRETARY FOR EDUCATION, DURING THE ANNUAL PRIZE GIVING AND SPEECH DAY AT MASENO SCHOOL ON 18TH JULY, 2026

The Chief Principal, Maseno School,
Members of the Board of Management and Parents Teachers Association,
Distinguished Guests,
Dedicated Teachers,
Proud Parents,
And our exemplary students,

Good morning.

It is an immense privilege and joy to stand before you today on this hallowed ground of academic excellence. For over a century, Maseno School has been an incubator of visionary leaders, pioneering scientists, and nation builders who have shaped Kenya's destiny.

Today, as we gather to celebrate academic resilience and co-curricular triumphs, we are reminded that excellence is not an accident. It is the deliberate result of relentless discipline, sacrifice, and character. To our award recipients today: congratulations. You have proven that when effort meets opportunity, brilliance is born.

To the candidates preparing for their national examinations: remember that your grade does not merely reflect memory; it reflects your courage under pressure. Embrace integrity above all else. In the words of our national anthem, "May we dwell in unity, peace and liberty; plenty be found within our borders."

I wish to commend the teaching fraternity of Maseno. Your selflessness behind the chalkboards transforms raw dreams into golden realities. To the parents: your investment in your children's education is the greatest inheritance you can ever bestow.

As I conclude, I leave you with the eternal motto of this great institution: "Perseverance Conquers All." Strive for excellence, protect your moral compass, and conquer the world.

Thank you, and God bless Maseno School! God bless Kenya!`
    },
    report: {
      title: 'Investigative Report of an Ad-Hoc Committee',
      knecWeight: 'Format: 7 Marks · Content: 9 Marks · Language: 4 Marks (Total: 20)',
      compulsoryElements: [
        'Title in capital letters specifying subject, investigator, date',
        '1.0 Introduction / Terms of Reference',
        '2.0 Procedure / Methods of Investigation',
        '3.0 Findings / Observations',
        '4.0 Conclusion',
        '5.0 Recommendations',
        'Sign-off: Signed by Committee Secretary and Chair'
      ],
      sampleText: `REPORT ON THE CAUSES OF WATER SHORTAGE IN KABARAK HIGH SCHOOL AND PROPOSED REMEDIES

1.0 INTRODUCTION
Following recurring water interruptions during the first term of 2026, the Principal constituted a five-member student-staff ad-hoc committee on 12th February 2026. The committee was tasked to investigate the root causes of the water deficit and propose viable long-term solutions within three weeks.

2.0 METHODS OF INVESTIGATION
The committee utilized the following data collection methods:
2.1 Physical inspection of all borehole pump stations, underground reservoirs, and pipeline fittings.
2.2 Structured interviews with the school estates officer and maintenance technicians.
2.3 Administration of questionnaires to dormitory captains and kitchen catering staff.

3.0 FINDINGS
3.1 Mechanical Failure: The main submersible pump at Borehole 2 had suffered motor burnout due to frequent electrical voltage surges.
3.2 Pipeline Leakages: Extensive underground pipe fractures were identified along the western dormitory quadrangle, resulting in an estimated 35% water loss daily.
3.3 Increased Consumption: The student population had increased by 18% following Form One double-stream admission, straining existing storage tanks.

4.0 CONCLUSION
The persistent water shortage is primarily attributable to aging pump infrastructure, unmitigated pipe leakages, and inadequate storage capacity relative to the expanded school populace.

5.0 RECOMMENDATIONS
5.1 Procurement of a heavy-duty replacement submersible pump with an automatic voltage stabilizer.
5.2 Immediate overhaul and replacement of fractured PVC pipelines with high-density polyethylene (HDPE) pipes.
5.3 Installation of two additional 20,000-liter rooftop rainwater harvesting tanks before the onset of the long rains.

COMPILED AND SUBMITTED BY:

Secretary: _____________________ (Lucy Achieng)     Date: 5th March, 2026
Chairman:  _____________________ (Mr. David Rotich)  Date: 5th March, 2026`
    },
    review: {
      title: 'Literary Book / Drama Review (KCSE Set Book)',
      knecWeight: 'Format: 6 Marks · Content: 10 Marks · Language: 4 Marks (Total: 20)',
      compulsoryElements: [
        'Heading: Title of Book, Author, Publisher, Year, Reviewer',
        'Introduction: Background of author and general premise',
        'Plot Summary: Brief without giving away entire suspense',
        'Themes & Characterization: Critical analysis of central issues (e.g. corruption, oppression, betrayal)',
        'Style & Tone: Dramatic irony, humor, symbolism, language use',
        'Target Audience & Verdict/Recommendation'
      ],
      sampleText: `BOOK REVIEW: THE SAMARITAN

Title:          The Samaritan
Playwright:     John Lara
Publisher:      Kenya Literature Bureau (KLB)
Year:           2022
Price:          KSh 450
Reviewer:       Faith Wanjiku (Student Critic)

The Samaritan is a gripping satirical play that mirrors the complex socio-political challenges confronting contemporary African municipalities. Set in the fictional Municipality of Maracas, the play dissects the endemic vices of greed, tender scams, misuse of public office, and citizen apathy.

The plot pivots around two brilliant high school students, Montano and Alvita, who develop an ingenious mobile app called "The Samaritan" under the guidance of their ethics teacher, Nicole. When unveiled at the Mayor's office, the app is envisioned to crowd-source and expose public theft. Mayor Mossi and his corrupt cronies panic, unleashing threats, blackmail, and political subterfuge to suppress the app.

Lara brilliantly executes characterization: Mayor Mossi personifies decadent political arrogance, while Inspector Bembe represents the compromised police machinery. In stark contrast, Nicole stands as an unyielding beacon of moral fortitude, refusing to capitulate even when framed and incarcerated.

The playwright employs vivid dramatic irony, biblical allusions, and satirical humor to expose how power corrupts. The dialogue is snappy, witty, and deeply thought-provoking for young readers.

VERDICT:
The Samaritan is an indispensable masterwork for high school literature students and any citizen passionate about integrity. It earns an unreserved 5 out of 5 stars.`
    }
  };

  // Homophones Quiz items
  const homophonesData = [
    {
      sentence: 'The teacher praised the student for giving a thoughtful __________ on the set book.',
      options: ['compliment', 'complement'],
      correct: 'compliment',
      explanation: 'A "compliment" is an expression of praise. A "complement" is something that completes or brings to perfection.'
    },
    {
      sentence: 'Before the exam starts, please ensure your desk has sufficient __________ (pens, rulers, rubbers).',
      options: ['stationery', 'stationary'],
      correct: 'stationery',
      explanation: '"Stationery" (with an e) refers to writing materials (envelope/eraser reminder). "Stationary" (with an a) means remaining in one place (stand still).'
    },
    {
      sentence: 'The Board of Management is strictly guided by the fundamental __________ of transparency.',
      options: ['principles', 'principals'],
      correct: 'principles',
      explanation: 'A "principle" is a fundamental truth or moral rule. A "principal" is the head of a school or chief participant.'
    },
    {
      sentence: 'The runner struggled to navigate the __________ and rocky trail up Mount Longonot.',
      options: ['coarse', 'course'],
      correct: 'coarse',
      explanation: '"Coarse" means rough or harsh in texture. "Course" refers to a route, direction, or academic program of study.'
    },
    {
      sentence: 'Bride and groom walked gracefully down the church __________ amidst cheers.',
      options: ['aisle', 'isle'],
      correct: 'aisle',
      explanation: 'An "aisle" is a passage between rows of seats. An "isle" is a small island.'
    }
  ];

  const handleCopyTemplate = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handleSelectHomophone = (opt: string) => {
    setHomophoneChoice(opt);
    if (opt === homophonesData[homophoneIndex].correct) {
      setHomophoneScore((prev) => prev + 1);
    }
  };

  const nextHomophoneQuestion = () => {
    setHomophoneIndex((prev) => (prev + 1) % homophonesData.length);
    setHomophoneChoice(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-1">
            <span>KCSE English Paper 1 (101/1) · 60 Marks</span>
            <span>·</span>
            <span>KNEC Marking Rubrics &amp; Pronunciation Guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            English Functional Writing &amp; Oral Skills Master
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
            Dominate Question 1 (Functional Writing, 20 marks) with official KNEC formats and Question 3 (Oral Skills, 30 marks) covering syllable stress, silent letters, minimal pairs, homophones, intonation, and oral performance cues.
          </p>

          {/* Section Navigation */}
          <div className="flex items-center gap-2 mt-6 border-t border-slate-800/80 pt-4 overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setActiveSection('functional')}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeSection === 'functional'
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <PenTool className="w-4 h-4" />
              Functional Writing (20 Marks)
            </button>
            <button
              onClick={() => setActiveSection('stress')}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeSection === 'stress'
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              Syllable Stress (Noun vs. Verb)
            </button>
            <button
              onClick={() => setActiveSection('silent')}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeSection === 'silent'
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Silent Letters Master Catalog
            </button>
            <button
              onClick={() => setActiveSection('homophones')}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeSection === 'homophones'
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              Homophones &amp; Confusing Pairs Quiz
            </button>
            <button
              onClick={() => setActiveSection('intonation')}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeSection === 'intonation'
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Intonation (Falling vs. Rising)
            </button>
            <button
              onClick={() => setActiveSection('performance')}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeSection === 'performance'
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              Oral Narratives &amp; Riddles
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: FUNCTIONAL WRITING TEMPLATES & CHECKLIST */}
      {activeSection === 'functional' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Format picker and Compulsory Checklist */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
              <span className="text-xs font-mono uppercase text-purple-400">Select KNEC Genre</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'minutes', label: 'Minutes of Meeting' },
                  { id: 'cv', label: 'CV & Cover Letter' },
                  { id: 'memo', label: 'Internal Memo' },
                  { id: 'speech', label: 'Formal Speech' },
                  { id: 'report', label: 'Investigative Report' },
                  { id: 'review', label: 'Literary Book Review' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedFormat(item.id as any)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors border ${
                      selectedFormat === item.id
                        ? 'bg-purple-600 border-purple-500 text-white shadow'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Compulsory Elements Checklist */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Compulsory Elements (Format Marks)
                </span>
                <span className="text-[10px] bg-purple-950 border border-purple-700 text-purple-300 px-2 py-0.5 rounded">
                  Max 8 Marks
                </span>
              </div>

              <ul className="space-y-2 text-xs text-slate-300">
                {functionalTemplates[selectedFormat].compulsoryElements.map((elem, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{elem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Model Template Viewer */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {functionalTemplates[selectedFormat].title}
                  </h2>
                  <span className="text-xs font-mono text-purple-400">
                    {functionalTemplates[selectedFormat].knecWeight}
                  </span>
                </div>

                <button
                  onClick={() => handleCopyTemplate(functionalTemplates[selectedFormat].sampleText)}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto border border-slate-700"
                >
                  {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedTemplate ? 'Copied to Clipboard' : 'Copy Full Model'}
                </button>
              </div>

              {/* Text Container */}
              <div className="mt-4 bg-slate-950 p-5 rounded-xl border border-slate-800 overflow-x-auto max-h-[500px] overflow-y-auto font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed selection:bg-purple-600 selection:text-white">
                {functionalTemplates[selectedFormat].sampleText}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Tone: Formal, objective, impersonal</span>
              <span>KNEC Penalty: -2 marks for missing date or signature</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: SYLLABLE STRESS */}
      {activeSection === 'stress' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-purple-400">Oral Skills: Word Stress</span>
            <h2 className="text-xl font-bold text-white mt-1">Noun vs. Verb Stress Shift Rules</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              In English, two-syllable homographs change their meaning and grammatical word class depending on whether the primary stress is placed on the <strong className="text-purple-400">FIRST syllable (Noun/Adjective)</strong> or the <strong className="text-emerald-400">SECOND syllable (Verb)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                word: 'PRE-sent vs pre-SENT',
                nounForm: "'PRE-sent",
                nounMeaning: 'A gift or the current moment (Noun)',
                verbForm: "pre-'SENT",
                verbMeaning: 'To exhibit, introduce or hand over formally (Verb)',
                example: "She received a lovely 'PREsent; she will pre'SENT her project tomorrow."
              },
              {
                word: 'CON-duct vs con-DUCT',
                nounForm: "'CON-duct",
                nounMeaning: 'Personal behavior or moral code (Noun)',
                verbForm: "con-'DUCT",
                verbMeaning: 'To lead, orchestrate or transmit electricity (Verb)',
                example: "His 'CONduct was praised before he was chosen to con'DUCT the choir."
              },
              {
                word: 'RE-fuse vs re-FUSE',
                nounForm: "'RE-fuse",
                nounMeaning: 'Garbage, rubbish or discarded waste (Noun)',
                verbForm: "re-'FUSE",
                verbMeaning: 'To decline or say no to a request (Verb)',
                example: "The council cleared the 'REfuse, but they re'FUSE to repair the road."
              },
              {
                word: 'OB-ject vs ob-JECT',
                nounForm: "'OB-ject",
                nounMeaning: 'A tangible physical thing or goal (Noun)',
                verbForm: "ob-'JECT",
                verbMeaning: 'To protest or express opposition (Verb)',
                example: "The metal 'OBject was examined, and the lawyer did ob'JECT to its admission."
              },
              {
                word: 'PRO-ject vs pro-JECT',
                nounForm: "'PRO-ject",
                nounMeaning: 'An undertaken assignment or enterprise (Noun)',
                verbForm: "pro-'JECT",
                verbMeaning: 'To forecast, cast forward, or beam light (Verb)',
                example: "Their KCSE 'PROject will pro'JECT high returns next year."
              },
              {
                word: 'RE-cord vs re-CORD',
                nounForm: "'RE-cord",
                nounMeaning: 'An official written document or disc (Noun)',
                verbForm: "re-'CORD",
                verbMeaning: 'To capture audio, video, or data for storage (Verb)',
                example: "He broke the national 'REcord while the media re'CORDed the race."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-sm font-bold text-white font-mono border-b border-slate-800 pb-2">
                  {item.word}
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-purple-300 font-bold font-mono">{item.nounForm}</span>
                    <span className="text-slate-400 text-[11px]">— {item.nounMeaning}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-300 font-bold font-mono">{item.verbForm}</span>
                    <span className="text-slate-400 text-[11px]">— {item.verbMeaning}</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-300 italic">
                  "{item.example}"
                </div>
              </div>
            ))}
          </div>

          {/* Suffix Stress Rules (KNEC Section) */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-xs">
            <h3 className="font-bold text-white flex items-center gap-2 font-mono">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Suffix Stress Placement Rules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-300">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">Words ending in -tion, -sion, -ic</span>
                <span>Stress falls on the syllable immediately preceding the suffix: eco'NOMic, edu'CAtion, de'CIsion.</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Words ending in -cy, -ty, -phy, -gy</span>
                <span>Stress falls on the third syllable from the end (antepenultimate): de'MOcracy, pho'TOgraphy, bi'OLogy.</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">Compound Nouns vs Compound Verbs</span>
                <span>In compound nouns, stress is on the 1st word: 'POST office, 'CLASSroom. In compound verbs, on the 2nd: under'STAND, over'FLOW.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SILENT LETTERS */}
      {activeSection === 'silent' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-purple-400">Phonology: Silent Letters</span>
            <h2 className="text-xl font-bold text-white mt-1">KNEC Silent Letters Master Guide</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              KNEC frequently asks candidates to identify the silent letter in words like <em className="text-purple-300">doubt, psychology, foreign, debt, corps</em>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {[
              {
                letter: 'Silent "B"',
                rule: 'Silent after "m" at the end of a word or before "t".',
                examples: ['doubt', 'debt', 'subtle', 'comb', 'climb', 'crumb', 'tomb', 'plumber']
              },
              {
                letter: 'Silent "K"',
                rule: 'Silent when followed by "n" at the beginning of a word.',
                examples: ['knight', 'know', 'knife', 'knock', 'knee', 'knot', 'knapsack', 'knuckle']
              },
              {
                letter: 'Silent "W"',
                rule: 'Silent before "r" at the start of a word, or with "who".',
                examples: ['write', 'wrong', 'wrist', 'wreck', 'wrestle', 'sword', 'two', 'answer']
              },
              {
                letter: 'Silent "P"',
                rule: 'Silent before "s", "n", or "t" at the start of Greek words.',
                examples: ['psychology', 'pneumonia', 'receipt', 'psalm', 'pseudonym', 'corps', 'cupboard']
              },
              {
                letter: 'Silent "G"',
                rule: 'Silent before "n" at the beginning or end of a word.',
                examples: ['gnaw', 'gnat', 'sign', 'foreign', 'campaign', 'reign', 'design', 'sovereign']
              },
              {
                letter: 'Silent "L"',
                rule: 'Silent after "a", "o", or "u" before "m", "f", "k".',
                examples: ['calm', 'salmon', 'talk', 'walk', 'yolk', 'half', 'chalk', 'could']
              },
              {
                letter: 'Silent "T"',
                rule: 'Silent in words ending in "-ften" or "-stle".',
                examples: ['castle', 'whistle', 'listen', 'often', 'soften', 'fasten', 'ballet', 'gourmet']
              },
              {
                letter: 'Silent "H"',
                rule: 'Silent after "g", "r", or in specific French-derived words.',
                examples: ['heir', 'honor', 'honest', 'hour', 'ghost', 'rhyme', 'rhythm', 'vehicle']
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white font-mono text-sm">{item.letter}</span>
                  <span className="text-[10px] text-purple-400 font-mono">KNEC Tested</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">{item.rule}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="bg-slate-900 border border-slate-700/80 text-slate-300 text-[11px] px-2 py-0.5 rounded font-mono"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: HOMOPHONES QUIZ */}
      {activeSection === 'homophones' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-purple-400">Interactive Oral Skills Assessment</span>
              <h2 className="text-xl font-bold text-white mt-1">Homophones &amp; Confusing Words Drill</h2>
            </div>
            <div className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-purple-300">
              Score: <strong className="text-emerald-400">{homophoneScore}</strong> / {homophonesData.length}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="text-xs font-mono text-slate-400">
              Question {homophoneIndex + 1} of {homophonesData.length}
            </div>

            <p className="text-base text-slate-200 font-medium leading-relaxed">
              {homophonesData[homophoneIndex].sentence}
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {homophonesData[homophoneIndex].options.map((opt) => {
                const isSelected = homophoneChoice === opt;
                const isCorrect = opt === homophonesData[homophoneIndex].correct;
                let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-purple-500';

                if (homophoneChoice) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/80 border-rose-600 text-rose-200 font-bold';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => !homophoneChoice && handleSelectHomophone(opt)}
                    disabled={!!homophoneChoice}
                    className={`p-3.5 rounded-lg border text-sm font-mono transition-colors text-center ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation card */}
            {homophoneChoice && (
              <div className="mt-4 p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Explanation &amp; Distinction:
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {homophonesData[homophoneIndex].explanation}
                </p>
                <div className="pt-2">
                  <button
                    onClick={nextHomophoneQuestion}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold"
                  >
                    Next Question
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 5: INTONATION RULES */}
      {activeSection === 'intonation' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-purple-400">Oral Skills: Pitch Variation</span>
            <h2 className="text-xl font-bold text-white mt-1">Falling vs. Rising Intonation</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Intonation carries attitude and sentence grammatical function. KNEC regularly tests candidates on whether a speaker uses a falling pitch (↘) or a rising pitch (↗).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Falling Intonation Card */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-emerald-400 font-mono">
                  Falling Intonation (↘)
                </h3>
                <span className="text-[10px] bg-emerald-950 border border-emerald-700 text-emerald-300 px-2 py-0.5 rounded">
                  Definite / Conclusive
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="space-y-1">
                  <strong className="text-white block">1. Declarative Statements:</strong>
                  <span className="text-slate-400">"The train arrives at 4 o'clock. ↘"</span>
                </li>
                <li className="space-y-1">
                  <strong className="text-white block">2. WH-Questions (Who, What, Where, Why, How):</strong>
                  <span className="text-slate-400">"What time is the biology practical? ↘"</span>
                </li>
                <li className="space-y-1">
                  <strong className="text-white block">3. Commands / Imperatives:</strong>
                  <span className="text-slate-400">"Shut the laboratory window immediately. ↘"</span>
                </li>
                <li className="space-y-1">
                  <strong className="text-white block">4. Exclamations:</strong>
                  <span className="text-slate-400">"What a magnificent performance! ↘"</span>
                </li>
              </ul>
            </div>

            {/* Rising Intonation Card */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-cyan-400 font-mono">
                  Rising Intonation (↗)
                </h3>
                <span className="text-[10px] bg-cyan-950 border border-cyan-700 text-cyan-300 px-2 py-0.5 rounded">
                  Inquiring / Incomplete
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="space-y-1">
                  <strong className="text-white block">1. Yes / No Questions:</strong>
                  <span className="text-slate-400">"Have you completed the chemistry titration? ↗"</span>
                </li>
                <li className="space-y-1">
                  <strong className="text-white block">2. Polite Requests:</strong>
                  <span className="text-slate-400">"Could you pass the test-tube rack, please? ↗"</span>
                </li>
                <li className="space-y-1">
                  <strong className="text-white block">3. Listing Items (until the final item):</strong>
                  <span className="text-slate-400">"Bring a pencil ↗, an eraser ↗, a ruler ↗, and your mathematical tables ↘."</span>
                </li>
                <li className="space-y-1">
                  <strong className="text-white block">4. Tag Questions Seeking Clarification:</strong>
                  <span className="text-slate-400">"You are coming for the symposium, aren't you? ↗"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: ORAL PERFORMANCE & RIDDLES */}
      {activeSection === 'performance' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-purple-400">Oral Literature Performance</span>
            <h2 className="text-xl font-bold text-white mt-1">Narrative Performance &amp; Riddling Conventions</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              KNEC awards marks for demonstrating mastery of paralinguistic and non-verbal devices during oral storytelling and communal riddle sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Paralinguistic Devices */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-white uppercase tracking-wider font-mono text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Techniques to Capture &amp; Sustain Audience Attention
              </h3>
              <ul className="space-y-2 text-slate-300 list-disc list-inside">
                <li><strong className="text-white">Voice Modulation &amp; Tonal Variation:</strong> Altering pitch, volume, and tempo to portray different characters (e.g., deep booming voice for an ogre vs high timid squeak for a hare).</li>
                <li><strong className="text-white">Facial Expressions:</strong> Displaying terror, joy, perplexity, or fury to mirror the plot's emotional peaks.</li>
                <li><strong className="text-white">Meaningful Gestures:</strong> Using hands and arms to indicate size, direction, swinging of an axe, or flight of a bird.</li>
                <li><strong className="text-white">Mimicry &amp; Body Language:</strong> Imitating physical gaits (limping old elder, slithering snake, running warrior).</li>
                <li><strong className="text-white">Use of Ideophones:</strong> Vivid sound words such as <em>"kwa kwa kwa"</em> (laughter) or <em>"puuu!"</em> (sudden fall).</li>
                <li><strong className="text-white">Rhetorical Questions:</strong> Engaging listeners directly: <em>"And who do you think was hiding behind the granary?"</em></li>
              </ul>
            </div>

            {/* Stages of Riddling */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-white uppercase tracking-wider font-mono text-xs flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                The 6 Structured Stages of a Riddle Session
              </h3>
              <ol className="space-y-2 text-slate-300 list-decimal list-inside">
                <li><strong className="text-white">The Challenge:</strong> The challenger captures attention (<em>"Kitendawili!" / "I have a riddle!"</em>).</li>
                <li><strong className="text-white">The Acceptance:</strong> The audience accepts the challenge (<em>"Tega!" / "Throw it!"</em>).</li>
                <li><strong className="text-white">The Riddle Pose:</strong> The challenger states the riddle (<em>"My house has no door"</em>).</li>
                <li><strong className="text-white">Guesses / Stabs:</strong> The audience attempts various answers (<em>"A pot?", "A hut?"</em>).</li>
                <li><strong className="text-white">Prize Demand:</strong> When stumped, the challenger demands a prize (<em>"Give me a town/cow!"</em>) and the audience awards a town (e.g., Mombasa or Kisumu).</li>
                <li><strong className="text-white">Solution &amp; Explanation:</strong> The challenger reveals the answer (<em>"An egg"</em>).</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
