export interface CbcElectiveSubject {
  name: string;
  code: string;
  category: string;
  description: string;
  recommendedFor: string[];
}

export interface CbcTrack {
  trackId: string;
  trackName: string;
  description: string;
  coreTrackSubjects: string[];
  electiveOptions: string[];
  careerDegreesKenya: string[];
  recommendedCombinations: {
    title: string;
    subjects: string[];
    targetUniversityDegree: string;
  }[];
}

export interface CbcPathway {
  pathwayId: string;
  name: string;
  badge: string;
  targetEnrollmentPercent: string;
  description: string;
  coreCompulsoryAll: string[]; // Community Service, Physical Ed, etc.
  tracks: CbcTrack[];
}

export const CBC_SENIOR_SCHOOL_PATHWAYS: CbcPathway[] = [
  // 1. STEM PATHWAY (60% Projected National Target)
  {
    pathwayId: 'stem',
    name: 'Science, Technology, Engineering & Mathematics (STEM)',
    badge: 'KICD Primary Priority',
    targetEnrollmentPercent: '~60% of Senior School Students',
    description:
      'Designed for learners interested in research, innovation, medicine, engineering, agricultural technologies, robotics, software development, and industrial manufacturing.',
    coreCompulsoryAll: [
      'Community Service Learning (CSL)',
      'Physical Education & Health',
      'Communication Skills / English or Kiswahili',
      'Mathematics (Advanced or Standard)'
    ],
    tracks: [
      {
        trackId: 'pure-sciences',
        trackName: 'Pure Sciences Track',
        description: 'Focuses on fundamental physics, chemistry, biology, and advanced mathematics.',
        coreTrackSubjects: ['Advanced Mathematics', 'Physics', 'Chemistry', 'Biology'],
        electiveOptions: ['Computer Science', 'Earth & Space Science', 'Agriculture Science'],
        careerDegreesKenya: [
          'Bachelor of Medicine and Bachelor of Surgery (MBChB) - UoN / KU',
          'Bachelor of Pharmacy (BPharm)',
          'BSc Biochemistry & Biotechnology',
          'BSc Actuarial Science'
        ],
        recommendedCombinations: [
          {
            title: 'Pre-Medical & Health Sciences Cluster',
            subjects: ['Advanced Mathematics', 'Biology', 'Chemistry', 'Physics', 'English'],
            targetUniversityDegree: 'MBChB Medicine & Surgery / Dental Surgery / Nursing'
          },
          {
            title: 'Biotechnology & Agronomy Cluster',
            subjects: ['Advanced Mathematics', 'Biology', 'Chemistry', 'Agriculture Science'],
            targetUniversityDegree: 'BSc Biotechnology / Food Science / Agribusiness'
          }
        ]
      },
      {
        trackId: 'technical-engineering',
        trackName: 'Technical & Engineering Track',
        description: 'Blends physical sciences with mechanical, electrical, and civil construction competencies.',
        coreTrackSubjects: ['Advanced Mathematics', 'Physics', 'Chemistry', 'Technical Design & Drafting'],
        electiveOptions: ['Electricity & Electronics', 'Building Construction', 'Metalwork', 'Aviation Technology'],
        careerDegreesKenya: [
          'BSc Electrical & Electronic Engineering - JKUAT',
          'BSc Civil Engineering - UoN / TUK',
          'BSc Mechanical & Mechatronics Engineering - DeKUT',
          'Bachelor of Architecture (B.Arch)'
        ],
        recommendedCombinations: [
          {
            title: 'Heavy Civil & Mechanical Engineering',
            subjects: ['Advanced Mathematics', 'Physics', 'Chemistry', 'Building Construction / Metalwork'],
            targetUniversityDegree: 'BSc Civil / Mechanical Engineering (EBK Accredited)'
          },
          {
            title: 'Electrical & Telecommunications Engineering',
            subjects: ['Advanced Mathematics', 'Physics', 'Chemistry', 'Electricity & Electronics'],
            targetUniversityDegree: 'BSc Electrical / Telecommunications Engineering'
          }
        ]
      },
      {
        trackId: 'computing-technologies',
        trackName: 'Computing & Digital Technologies Track',
        description: 'Prepares students for software engineering, cybersecurity, data science, and AI systems.',
        coreTrackSubjects: ['Advanced Mathematics', 'Computer Science / Programming', 'Physics'],
        electiveOptions: ['Data Analytics & AI', 'Digital Media Design', 'Cybersecurity Fundamentals', 'Chemistry'],
        careerDegreesKenya: [
          'BSc Computer Science - UoN / Strathmore',
          'BSc Software Engineering - JKUAT',
          'BSc Artificial Intelligence & Machine Learning',
          'BSc Business Information Technology (BBIT)'
        ],
        recommendedCombinations: [
          {
            title: 'Software Systems & AI Development',
            subjects: ['Advanced Mathematics', 'Computer Science', 'Physics', 'Data Analytics'],
            targetUniversityDegree: 'BSc Computer Science / Software Engineering'
          }
        ]
      }
    ]
  },

  // 2. SOCIAL SCIENCES PATHWAY (25% Projected Target)
  {
    pathwayId: 'social-sciences',
    name: 'Social Sciences & Humanities',
    badge: 'KICD Governance & Commerce',
    targetEnrollmentPercent: '~25% of Senior School Students',
    description:
      'Tailored for learners with strong analytical, linguistic, philosophical, and social engagement skills targeting law, public administration, economics, diplomacy, and media.',
    coreCompulsoryAll: [
      'Community Service Learning (CSL)',
      'Physical Education',
      'National Language (English and Kiswahili / KSL)',
      'Mathematics (Essential or Standard)'
    ],
    tracks: [
      {
        trackId: 'humanities-governance',
        trackName: 'Humanities & Legal Studies Track',
        description: 'Focuses on constitutional law foundations, history, political philosophy, and international relations.',
        coreTrackSubjects: ['History & Citizenship', 'Geography & Environmental Studies', 'Christian/Islamic Religious Studies', 'English Literature'],
        electiveOptions: ['Kiswahili Fasihi', 'French / German / Mandarin / Arabic', 'Public Law Fundamentals'],
        careerDegreesKenya: [
          'Bachelor of Laws (LL.B) - UoN / Parklands / Strathmore',
          'Bachelor of International Relations & Diplomacy',
          'BSc Criminology & Security Studies',
          'B.Ed (Arts) Education'
        ],
        recommendedCombinations: [
          {
            title: 'Constitutional Law & Diplomacy Cluster',
            subjects: ['English Literature', 'History & Citizenship', 'Geography', 'Religious Studies', 'Mathematics'],
            targetUniversityDegree: 'Bachelor of Laws (LL.B) / Foreign Service Diplomacy'
          }
        ]
      },
      {
        trackId: 'business-economics',
        trackName: 'Business, Economics & Entrepreneurship Track',
        description: 'Equips students with corporate finance, accounting, macroeconomics, and enterprise innovation.',
        coreTrackSubjects: ['Economics', 'Accounting & Financial Management', 'Mathematics', 'Business Entrepreneurship'],
        electiveOptions: ['Commerce & Digital Trade', 'Geography', 'Computer Science'],
        careerDegreesKenya: [
          'Bachelor of Commerce (B.Com) - Finance / Accounting',
          'BSc Economics & Statistics',
          'BSc Real Estate & Property Valuation',
          'Certified Public Accountant (CPA-K)'
        ],
        recommendedCombinations: [
          {
            title: 'Financial Markets & Investment Banking',
            subjects: ['Mathematics', 'Economics', 'Accounting', 'Business Entrepreneurship', 'English'],
            targetUniversityDegree: 'B.Com Finance / BSc Economics & Statistics'
          }
        ]
      }
    ]
  },

  // 3. ARTS & SPORTS SCIENCE PATHWAY (15% Projected Target)
  {
    pathwayId: 'arts-sports',
    name: 'Arts & Sports Science',
    badge: 'KICD Creative Economy',
    targetEnrollmentPercent: '~15% of Senior School Students',
    description:
      'Nurtures athletic talent, visual design, cinematic arts, theatrical performance, and music composition as lucrative professional industries.',
    coreCompulsoryAll: [
      'Community Service Learning (CSL)',
      'Physical Education',
      'Communication Skills',
      'Foundational Mathematics'
    ],
    tracks: [
      {
        trackId: 'performing-visual-arts',
        trackName: 'Performing & Visual Arts Track',
        description: 'Music, theater, film production, fine art, animation, and interior design.',
        coreTrackSubjects: ['Music Composition & Performance', 'Theatre & Film Arts', 'Visual Arts & Graphic Design'],
        electiveOptions: ['Literature / Creative Writing', 'Fashion Design', 'Sound Engineering', 'Art History'],
        careerDegreesKenya: [
          'Bachelor of Music - Kenyatta University',
          'Bachelor of Film & Animation Technology - JKUAT',
          'Bachelor of Fine Arts & Design - UoN ADD'
        ],
        recommendedCombinations: [
          {
            title: 'Cinematic Arts & Creative Media',
            subjects: ['Theatre & Film Arts', 'Visual Arts & Design', 'Music', 'Literature', 'English'],
            targetUniversityDegree: 'Film Production / Creative Animation / Broadcast Journalism'
          }
        ]
      },
      {
        trackId: 'sports-science',
        trackName: 'Sports Science & Athletic Conditioning Track',
        description: 'Elite athletic training, exercise physiology, sports medicine fundamentals, and sports management.',
        coreTrackSubjects: ['Sports Science & Kinesiology', 'Physical Education Pedagogy', 'Human Biology'],
        electiveOptions: ['Sports Nutrition', 'Sports Psychology', 'First Aid & Athletic Rehabilitation'],
        careerDegreesKenya: [
          'BSc Exercise & Sports Science - Kenyatta University',
          'BSc Physiotherapy & Sports Rehabilitation',
          'Sports Administration & Athletics Management'
        ],
        recommendedCombinations: [
          {
            title: 'Athletic Conditioning & Sports Medicine',
            subjects: ['Sports Science', 'Human Biology', 'Chemistry / Nutrition', 'Mathematics'],
            targetUniversityDegree: 'BSc Sports Science / Physiotherapy / Professional Athletics Management'
          }
        ]
      }
    ]
  }
];
