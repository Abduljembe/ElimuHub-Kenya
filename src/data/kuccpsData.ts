export interface UniversityCutOff {
  universityName: string;
  universityCode: string;
  campusLocation: string;
  type: 'Public' | 'Private';
  cutOff2023: number;
  cutOff2024: number;
  cutOff2025: number;
  annualFeeKSh: number;
}

export interface DegreeProgramme {
  id: string;
  programmeName: string;
  programmeCode: string;
  category: 'Health Sciences' | 'Engineering & Technology' | 'Computing & IT' | 'Law & Humanities' | 'Business & Economics' | 'Agriculture & Environment' | 'Built Environment';
  durationYears: number;
  minKcseMeanGrade: string; // e.g. 'B+ (Plus)' or 'C+ (Plus)'
  subjectRequirements: {
    subject: string;
    minGrade: string; // e.g. 'B (Plain)'
  }[];
  clusterSubjectFormula: string[]; // 4 cluster subjects
  averageCutOff: number;
  careerPathways: string[];
  topEmployersKenya: string[];
  universities: UniversityCutOff[];
}

export const KUCCPS_DEGREE_PROGRAMMES: DegreeProgramme[] = [
  // 1. MEDICINE & SURGERY (MBChB)
  {
    id: 'deg-mbchb',
    programmeName: 'Bachelor of Medicine and Bachelor of Surgery (MBChB)',
    programmeCode: '1263101',
    category: 'Health Sciences',
    durationYears: 6,
    minKcseMeanGrade: 'B+ (Plus) or higher',
    subjectRequirements: [
      { subject: 'Biology', minGrade: 'B (Plain)' },
      { subject: 'Chemistry', minGrade: 'B (Plain)' },
      { subject: 'Mathematics or Physics', minGrade: 'B (Plain)' },
      { subject: 'English or Kiswahili', minGrade: 'B (Plain)' }
    ],
    clusterSubjectFormula: ['Biology', 'Chemistry', 'Mathematics or Physics', 'English or Kiswahili'],
    averageCutOff: 44.5,
    careerPathways: [
      'Medical Officer / General Physician',
      'Specialist Surgeon (Cardiothoracic, Neuro, Orthopedic)',
      'Clinical Researcher & Epidemiologist',
      'Hospital Medical Superintendent / Director of Medical Services'
    ],
    topEmployersKenya: [
      'Kenyatta National Hospital (KNH)',
      'Moi Teaching and Referral Hospital (MTRH)',
      'Aga Khan University Hospital',
      'Ministry of Health & 47 County Referral Hospitals',
      'KEMRI / CDC Kenya'
    ],
    universities: [
      {
        universityName: 'University of Nairobi (UoN)',
        universityCode: 'UON-MED',
        campusLocation: 'KNH Campus, Nairobi',
        type: 'Public',
        cutOff2023: 44.82,
        cutOff2024: 44.91,
        cutOff2025: 45.10,
        annualFeeKSh: 612000
      },
      {
        universityName: 'Moi University',
        universityCode: 'MOI-MED',
        campusLocation: 'College of Health Sciences, Eldoret',
        type: 'Public',
        cutOff2023: 43.75,
        cutOff2024: 43.88,
        cutOff2025: 44.02,
        annualFeeKSh: 580000
      },
      {
        universityName: 'Kenyatta University (KU)',
        universityCode: 'KU-MED',
        campusLocation: 'Main Campus, Thika Road',
        type: 'Public',
        cutOff2023: 44.10,
        cutOff2024: 44.25,
        cutOff2025: 44.38,
        annualFeeKSh: 600000
      },
      {
        universityName: 'Egerton University',
        universityCode: 'EGER-MED',
        campusLocation: 'Nakuru Town Campus',
        type: 'Public',
        cutOff2023: 43.20,
        cutOff2024: 43.40,
        cutOff2025: 43.65,
        annualFeeKSh: 560000
      }
    ]
  },

  // 2. COMPUTER SCIENCE
  {
    id: 'deg-cs',
    programmeName: 'Bachelor of Science in Computer Science',
    programmeCode: '1073105',
    category: 'Computing & IT',
    durationYears: 4,
    minKcseMeanGrade: 'C+ (Plus) or higher',
    subjectRequirements: [
      { subject: 'Mathematics', minGrade: 'C+ (Plus)' },
      { subject: 'Physics', minGrade: 'C+ (Plus)' },
      { subject: 'English or Kiswahili', minGrade: 'C+ (Plus)' },
      { subject: 'Chemistry or Computer Studies', minGrade: 'C+ (Plus)' }
    ],
    clusterSubjectFormula: ['Mathematics', 'Physics', '2nd Group II or III Subject (Chemistry/Bio/CS)', 'English or Kiswahili'],
    averageCutOff: 42.1,
    careerPathways: [
      'Full-Stack Software Engineer',
      'Artificial Intelligence & Machine Learning Specialist',
      'Cybersecurity Architect',
      'Cloud Solutions Architect / DevOps Engineer',
      'Tech Startup Founder'
    ],
    topEmployersKenya: [
      'Safaricom PLC (M-Pesa Engineering)',
      'Microsoft Africa Development Centre (ADC)',
      'Google Kenya (Nairobi Product Development Center)',
      'Equity Bank / FinTech Labs',
      'Konza Technopolis Smart City Authority'
    ],
    universities: [
      {
        universityName: 'University of Nairobi (UoN)',
        universityCode: 'UON-CS',
        campusLocation: 'Chiromo Campus, Nairobi',
        type: 'Public',
        cutOff2023: 42.95,
        cutOff2024: 43.15,
        cutOff2025: 43.32,
        annualFeeKSh: 345000
      },
      {
        universityName: 'Jomo Kenyatta University of Agriculture & Tech (JKUAT)',
        universityCode: 'JKUAT-CS',
        campusLocation: 'Juja Main Campus',
        type: 'Public',
        cutOff2023: 41.80,
        cutOff2024: 42.10,
        cutOff2025: 42.45,
        annualFeeKSh: 320000
      },
      {
        universityName: 'Strathmore University',
        universityCode: 'STRATH-CS',
        campusLocation: 'Madaraka, Nairobi',
        type: 'Private',
        cutOff2023: 39.50,
        cutOff2024: 40.00,
        cutOff2025: 40.20,
        annualFeeKSh: 520000
      },
      {
        universityName: 'Technical University of Kenya (TUK)',
        universityCode: 'TUK-CS',
        campusLocation: 'Haile Selassie Avenue, Nairobi',
        type: 'Public',
        cutOff2023: 39.10,
        cutOff2024: 39.40,
        cutOff2025: 39.80,
        annualFeeKSh: 280000
      }
    ]
  },

  // 3. ELECTRICAL & ELECTRONICS ENGINEERING
  {
    id: 'deg-elec-eng',
    programmeName: 'Bachelor of Science in Electrical and Electronic Engineering',
    programmeCode: '1093108',
    category: 'Engineering & Technology',
    durationYears: 5,
    minKcseMeanGrade: 'C+ (Plus) or higher (EBK Accredited)',
    subjectRequirements: [
      { subject: 'Mathematics', minGrade: 'C+ (Plus)' },
      { subject: 'Physics', minGrade: 'C+ (Plus)' },
      { subject: 'Chemistry', minGrade: 'C+ (Plus)' },
      { subject: 'English or Kiswahili', minGrade: 'C+ (Plus)' }
    ],
    clusterSubjectFormula: ['Mathematics', 'Physics', 'Chemistry', 'English or Kiswahili or Tech/Geo'],
    averageCutOff: 42.8,
    careerPathways: [
      'Power Systems & Grid Engineer',
      'Telecommunications Network Specialist',
      'Renewable Energy / Geothermal Engineer',
      'Automation & Industrial Robotics Control Engineer'
    ],
    topEmployersKenya: [
      'Kenya Power & Lighting Company (KPLC)',
      'KenGen (Kenya Electricity Generating Co)',
      'Ketraco (Kenya Electricity Transmission Co)',
      'Communications Authority of Kenya (CA)',
      'Geothermal Development Company (GDC)'
    ],
    universities: [
      {
        universityName: 'University of Nairobi (UoN)',
        universityCode: 'UON-EEE',
        campusLocation: 'Main Campus, Harry Thuku Rd',
        type: 'Public',
        cutOff2023: 43.10,
        cutOff2024: 43.35,
        cutOff2025: 43.52,
        annualFeeKSh: 374000
      },
      {
        universityName: 'Jomo Kenyatta University of Agriculture & Tech (JKUAT)',
        universityCode: 'JKUAT-EEE',
        campusLocation: 'Juja Main Campus',
        type: 'Public',
        cutOff2023: 42.40,
        cutOff2024: 42.65,
        cutOff2025: 42.90,
        annualFeeKSh: 360000
      },
      {
        universityName: 'Dedan Kimathi University of Technology (DeKUT)',
        universityCode: 'DEKUT-EEE',
        campusLocation: 'Nyeri',
        type: 'Public',
        cutOff2023: 40.20,
        cutOff2024: 40.50,
        cutOff2025: 40.85,
        annualFeeKSh: 310000
      }
    ]
  },

  // 4. LAW (LLB)
  {
    id: 'deg-law',
    programmeName: 'Bachelor of Laws (LL.B)',
    programmeCode: '1013102',
    category: 'Law & Humanities',
    durationYears: 4,
    minKcseMeanGrade: 'B (Plain) or higher (CLE Accredited)',
    subjectRequirements: [
      { subject: 'English or Kiswahili', minGrade: 'B (Plain)' },
      { subject: 'Any Humanities (History/CRE/Geo)', minGrade: 'C+ (Plus)' }
    ],
    clusterSubjectFormula: ['English', 'Kiswahili', 'Any Humanities / Math', 'Best Remaining Group II or IV'],
    averageCutOff: 41.5,
    careerPathways: [
      'Advocate of the High Court of Kenya (post-KSL Diploma)',
      'Magistrate / Judge in Judiciary of Kenya',
      'Corporate Legal Counsel & Compliance Director',
      'Human Rights Attorney & Constitutional Scholar'
    ],
    topEmployersKenya: [
      'Judiciary of Kenya (Supreme Court, High Court)',
      'Office of the Director of Public Prosecutions (ODPP)',
      'State Law Office / Attorney General Chambers',
      'Top Law Firms (Anjarwalla & Khanna, Bowmans Coulson Harney)',
      'Kenya National Commission on Human Rights'
    ],
    universities: [
      {
        universityName: 'University of Nairobi (UoN)',
        universityCode: 'UON-LAW',
        campusLocation: 'Parklands Law Campus, Nairobi',
        type: 'Public',
        cutOff2023: 42.20,
        cutOff2024: 42.45,
        cutOff2025: 42.60,
        annualFeeKSh: 285000
      },
      {
        universityName: 'Kenyatta University (KU)',
        universityCode: 'KU-LAW',
        campusLocation: 'Parklands Campus, Nairobi',
        type: 'Public',
        cutOff2023: 40.90,
        cutOff2024: 41.20,
        cutOff2025: 41.40,
        annualFeeKSh: 270000
      },
      {
        universityName: 'Strathmore University',
        universityCode: 'STRATH-LAW',
        campusLocation: 'Madaraka, Nairobi',
        type: 'Private',
        cutOff2023: 39.80,
        cutOff2024: 40.10,
        cutOff2025: 40.35,
        annualFeeKSh: 490000
      },
      {
        universityName: 'Moi University',
        universityCode: 'MOI-LAW',
        campusLocation: 'Annex Campus, Eldoret',
        type: 'Public',
        cutOff2023: 39.40,
        cutOff2024: 39.75,
        cutOff2025: 40.00,
        annualFeeKSh: 260000
      }
    ]
  },

  // 5. PHARMACY (BPharm)
  {
    id: 'deg-pharm',
    programmeName: 'Bachelor of Pharmacy (B.Pharm)',
    programmeCode: '1133103',
    category: 'Health Sciences',
    durationYears: 5,
    minKcseMeanGrade: 'B (Plain) or higher (PPB Accredited)',
    subjectRequirements: [
      { subject: 'Biology', minGrade: 'B (Plain)' },
      { subject: 'Chemistry', minGrade: 'B (Plain)' },
      { subject: 'Mathematics or Physics', minGrade: 'C+ (Plus)' },
      { subject: 'English or Kiswahili', minGrade: 'C+ (Plus)' }
    ],
    clusterSubjectFormula: ['Biology', 'Chemistry', 'Mathematics or Physics', 'English or Kiswahili'],
    averageCutOff: 43.2,
    careerPathways: [
      'Hospital Clinical Pharmacist',
      'Industrial Pharmaceutical Formulation Scientist',
      'Regulatory Affairs Specialist (Pharmacy and Poisons Board)',
      'Community Pharmacy Proprietor'
    ],
    topEmployersKenya: [
      'Pharmacy and Poisons Board (PPB)',
      'Kenyatta National Hospital (KNH)',
      'GlaxoSmithKline / Dawa Pharmaceuticals Kenya',
      'Aga Khan Health Services',
      'Kenya Medical Supplies Authority (KEMSA)'
    ],
    universities: [
      {
        universityName: 'University of Nairobi (UoN)',
        universityCode: 'UON-PHARM',
        campusLocation: 'KNH Campus, Nairobi',
        type: 'Public',
        cutOff2023: 43.60,
        cutOff2024: 43.85,
        cutOff2025: 44.05,
        annualFeeKSh: 492000
      },
      {
        universityName: 'Kenyatta University (KU)',
        universityCode: 'KU-PHARM',
        campusLocation: 'Main Campus, Nairobi',
        type: 'Public',
        cutOff2023: 42.80,
        cutOff2024: 43.10,
        cutOff2025: 43.30,
        annualFeeKSh: 470000
      },
      {
        universityName: 'Mount Kenya University (MKU)',
        universityCode: 'MKU-PHARM',
        campusLocation: 'Thika Main Campus',
        type: 'Private',
        cutOff2023: 38.90,
        cutOff2024: 39.20,
        cutOff2025: 39.50,
        annualFeeKSh: 420000
      }
    ]
  },

  // 6. CIVIL ENGINEERING
  {
    id: 'deg-civil-eng',
    programmeName: 'Bachelor of Science in Civil Engineering',
    programmeCode: '1083107',
    category: 'Engineering & Technology',
    durationYears: 5,
    minKcseMeanGrade: 'C+ (Plus) or higher (EBK Accredited)',
    subjectRequirements: [
      { subject: 'Mathematics', minGrade: 'C+ (Plus)' },
      { subject: 'Physics', minGrade: 'C+ (Plus)' },
      { subject: 'Chemistry', minGrade: 'C+ (Plus)' },
      { subject: 'English or Kiswahili', minGrade: 'C+ (Plus)' }
    ],
    clusterSubjectFormula: ['Mathematics', 'Physics', 'Chemistry', 'English/Kiswahili or Geography'],
    averageCutOff: 42.4,
    careerPathways: [
      'Structural Design Engineer',
      'Highway & Transportation Engineer',
      'Water Resources & Dam Engineer',
      'Geotechnical Foundation Consultant'
    ],
    topEmployersKenya: [
      'Kenya National Highways Authority (KeNHA)',
      'Kenya Urban Roads Authority (KURA)',
      'National Construction Authority (NCA)',
      'Athi Water Works Development Agency',
      'Kenya Ports Authority (KPA)'
    ],
    universities: [
      {
        universityName: 'University of Nairobi (UoN)',
        universityCode: 'UON-CIVIL',
        campusLocation: 'Main Campus, Nairobi',
        type: 'Public',
        cutOff2023: 42.70,
        cutOff2024: 42.95,
        cutOff2025: 43.15,
        annualFeeKSh: 374000
      },
      {
        universityName: 'Jomo Kenyatta University of Agriculture & Tech (JKUAT)',
        universityCode: 'JKUAT-CIVIL',
        campusLocation: 'Juja Main Campus',
        type: 'Public',
        cutOff2023: 41.90,
        cutOff2024: 42.20,
        cutOff2025: 42.50,
        annualFeeKSh: 360000
      },
      {
        universityName: 'Technical University of Kenya (TUK)',
        universityCode: 'TUK-CIVIL',
        campusLocation: 'Haile Selassie Ave, Nairobi',
        type: 'Public',
        cutOff2023: 39.80,
        cutOff2024: 40.10,
        cutOff2025: 40.40,
        annualFeeKSh: 290000
      }
    ]
  },

  // 7. ARCHITECTURE
  {
    id: 'deg-arch',
    programmeName: 'Bachelor of Architectural Studies / Bachelor of Architecture (B.Arch)',
    programmeCode: '1043104',
    category: 'Built Environment',
    durationYears: 6,
    minKcseMeanGrade: 'C+ (Plus) or higher (BORAQS Accredited)',
    subjectRequirements: [
      { subject: 'Mathematics', minGrade: 'C+ (Plus)' },
      { subject: 'Physics', minGrade: 'C+ (Plus)' },
      { subject: 'English or Kiswahili', minGrade: 'C+ (Plus)' },
      { subject: 'Any Group III / Drawing / Art', minGrade: 'C+ (Plus)' }
    ],
    clusterSubjectFormula: ['Mathematics', 'Physics', 'Geography / Art / Building Construction', 'English or Kiswahili'],
    averageCutOff: 41.8,
    careerPathways: [
      'Registered Professional Architect',
      'Urban Planner & Urban Designer',
      'Sustainable Green Building Consultant',
      'Landscape Architect'
    ],
    topEmployersKenya: [
      'Board of Registration of Architects and Quantity Surveyors (BORAQS)',
      'Architectural Association of Kenya (AAK)',
      'State Department for Housing and Urban Development',
      'Symbion Architects / Planning Systems Services'
    ],
    universities: [
      {
        universityName: 'University of Nairobi (UoN)',
        universityCode: 'UON-ARCH',
        campusLocation: 'ADD Building, State House Road',
        type: 'Public',
        cutOff2023: 42.10,
        cutOff2024: 42.35,
        cutOff2025: 42.50,
        annualFeeKSh: 360000
      },
      {
        universityName: 'Jomo Kenyatta University of Agriculture & Tech (JKUAT)',
        universityCode: 'JKUAT-ARCH',
        campusLocation: 'Juja Main Campus',
        type: 'Public',
        cutOff2023: 41.30,
        cutOff2024: 41.60,
        cutOff2025: 41.90,
        annualFeeKSh: 350000
      }
    ]
  },

  // 8. COMMERCE & FINANCE
  {
    id: 'deg-bcom',
    programmeName: 'Bachelor of Commerce (B.Com) - Finance / Accounting / Marketing',
    programmeCode: '1023101',
    category: 'Business & Economics',
    durationYears: 4,
    minKcseMeanGrade: 'C+ (Plus) or higher',
    subjectRequirements: [
      { subject: 'Mathematics', minGrade: 'C (Plain)' },
      { subject: 'English or Kiswahili', minGrade: 'C+ (Plus)' }
    ],
    clusterSubjectFormula: ['Mathematics', 'English or Kiswahili', 'Business Studies or Economics', 'Any Group II or III'],
    averageCutOff: 38.6,
    careerPathways: [
      'Certified Public Accountant (CPA-K / ICPAK)',
      'Investment Banker & Financial Analyst',
      'Internal / Forensic Auditor',
      'Corporate Treasury Manager'
    ],
    topEmployersKenya: [
      'Kenya Revenue Authority (KRA)',
      'Central Bank of Kenya (CBK)',
      'Big 4 Audit Firms (PwC, Deloitte, KPMG, EY Kenya)',
      'Commercial Banks (KCB, Equity Bank, Standard Chartered)',
      'Nairobi Securities Exchange (NSE)'
    ],
    universities: [
      {
        universityName: 'University of Nairobi (UoN)',
        universityCode: 'UON-BCOM',
        campusLocation: 'Lower Kabete Campus',
        type: 'Public',
        cutOff2023: 39.50,
        cutOff2024: 39.80,
        cutOff2025: 40.05,
        annualFeeKSh: 220000
      },
      {
        universityName: 'Strathmore University',
        universityCode: 'STRATH-BCOM',
        campusLocation: 'Madaraka, Nairobi',
        type: 'Private',
        cutOff2023: 37.80,
        cutOff2024: 38.10,
        cutOff2025: 38.30,
        annualFeeKSh: 430000
      },
      {
        universityName: 'Kenyatta University (KU)',
        universityCode: 'KU-BCOM',
        campusLocation: 'Main Campus, Nairobi',
        type: 'Public',
        cutOff2023: 38.10,
        cutOff2024: 38.40,
        cutOff2025: 38.65,
        annualFeeKSh: 210000
      }
    ]
  }
];
