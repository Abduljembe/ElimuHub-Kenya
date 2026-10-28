export type AcademicLevel = 'highschool' | 'university';

export type HighSchoolForm = 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4';
export type UniversityYear = 'Year 1' | 'Year 2' | 'Year 3' | 'Year 4' | 'Year 5';

export type SubjectCategory =
  | 'Sciences'
  | 'Mathematics'
  | 'Humanities'
  | 'Languages'
  | 'Applied & Technical'
  | 'Medical Sciences'
  | 'Engineering'
  | 'Computing & Tech'
  | 'Law & Governance'
  | 'Economics & Commerce'
  | 'Education & Pedagogy';

export interface TopicUnit {
  id: string;
  title: string;
  formOrYear: HighSchoolForm | UniversityYear;
  subtopics: string[];
  theoryOverview: string;
  keyFormulas?: string[];
  kenyanApplication: string;
  examTips: string;
}

export interface PracticalExperiment {
  id: string;
  title: string;
  objectives: string[];
  apparatus: string[];
  safetyHazards: string[];
  procedure: string[];
  observationTable: {
    headers: string[];
    sampleRows: string[][];
  };
  calculationFormula: string;
  expectedOutcome: string;
  vivaQuestions: string[];
}

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  marks: number;
  options?: string[]; // for multiple choice
  correctOptionIndex?: number;
  sampleAnswer: string;
  markingScheme: string[];
}

export interface ExamPaper {
  id: string;
  title: string;
  paperCode: string;
  durationMinutes: number;
  totalMarks: number;
  instructions: string[];
  questions: ExamQuestion[];
}

export interface SubjectCourse {
  id: string;
  name: string;
  title?: string;
  code: string;
  courseCode?: string;
  level: AcademicLevel;
  academicLevel?: AcademicLevel;
  category: SubjectCategory;
  description: string;
  badge: string;
  learningOutcomes?: string[];
  topics: TopicUnit[];
  practicals: PracticalExperiment[];
  exams: ExamPaper[];
  simulationType?: 'titration' | 'circuits' | 'osmosis' | 'algorithms' | 'clinical' | 'economics';
}

export type CourseCurriculum = SubjectCourse;

export interface UserProgress {
  completedTopicIds: string[];
  completedPracticalIds: string[];
  examScores: Record<string, { score: number; total: number; date: string }>;
  notes: Record<string, string>;
  bookmarkedTopicIds: string[];
  targetKcseGrade?: string;
  targetGpa?: number;
}
