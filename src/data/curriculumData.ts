import { SubjectCourse } from '../types/curriculum';
import { HIGH_SCHOOL_COURSES } from './highSchoolCourses';
import { UNIVERSITY_COURSES } from './universityCourses';

export const KENYA_COURSES: SubjectCourse[] = [
  ...HIGH_SCHOOL_COURSES,
  ...UNIVERSITY_COURSES
];

export { HIGH_SCHOOL_COURSES, UNIVERSITY_COURSES };
