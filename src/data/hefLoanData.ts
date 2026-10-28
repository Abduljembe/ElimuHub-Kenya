export interface HefBand {
  band: number;
  name: string;
  classification: string;
  householdIncomeBracket: string;
  incomeLimitMonthly: number; // max income in KSh
  scholarshipPercent: number;
  loanPercent: number;
  householdPercent: number;
  upkeepLoanAnnualKsh: number;
  description: string;
  eligibilityCriteria: string[];
}

export interface UniversityProgramCost {
  code: string;
  name: string;
  category: string;
  durationYears: number;
  annualProgramCostKsh: number; // Official Universities Fund / CUE DUC
  careers: string[];
  universitiesOffering: string[];
}

export const HEF_BANDS: HefBand[] = [
  {
    band: 1,
    name: 'Band 1',
    classification: 'Extremely Vulnerable',
    householdIncomeBracket: 'KSh 0 – KSh 5,995',
    incomeLimitMonthly: 5995,
    scholarshipPercent: 70,
    loanPercent: 25,
    householdPercent: 5,
    upkeepLoanAnnualKsh: 60000,
    description: 'Students from extremely poor households, orphans, vulnerable children under cash transfer schemes, and persons with severe disabilities.',
    eligibilityCriteria: [
      'Total household monthly income below KSh 5,995',
      'Total or partial orphans with no steady guardian income',
      'Beneficiaries of Inua Jamii cash transfer programs',
      'Attended Sub-county day secondary schools on full CDF/Wings to Fly/Equity bursary',
      'Student or parent with registered National Council for Persons with Disabilities (NCPWD) status'
    ]
  },
  {
    band: 2,
    name: 'Band 2',
    classification: 'Highly Needy',
    householdIncomeBracket: 'KSh 5,996 – KSh 23,670',
    incomeLimitMonthly: 23670,
    scholarshipPercent: 60,
    loanPercent: 30,
    householdPercent: 10,
    upkeepLoanAnnualKsh: 55000,
    description: 'Students from low-income rural and urban informal households with single breadwinners or peasant smallholder farmers.',
    eligibilityCriteria: [
      'Household monthly income between KSh 5,996 and KSh 23,670',
      'Single-parent families with irregular or peasant agricultural earnings',
      'Multiple siblings concurrently enrolled in secondary schools or colleges',
      'Rural public day secondary or boarding schools background with high bursary dependency'
    ]
  },
  {
    band: 3,
    name: 'Band 3',
    classification: 'Needy',
    householdIncomeBracket: 'KSh 23,671 – KSh 70,000',
    incomeLimitMonthly: 70000,
    scholarshipPercent: 50,
    loanPercent: 30,
    householdPercent: 20,
    upkeepLoanAnnualKsh: 50000,
    description: 'Families with moderate wage earners (e.g. junior primary teachers, entry civil servants, micro-business owners).',
    eligibilityCriteria: [
      'Household monthly income between KSh 23,671 and KSh 70,000',
      'Both parents alive with combined lower-middle tier earnings',
      'Ability to make moderate quarterly tuition contributions'
    ]
  },
  {
    band: 4,
    name: 'Band 4',
    classification: 'Less Needy / Middle Income',
    householdIncomeBracket: 'KSh 70,001 – KSh 119,999',
    incomeLimitMonthly: 119999,
    scholarshipPercent: 40,
    loanPercent: 30,
    householdPercent: 30,
    upkeepLoanAnnualKsh: 45000,
    description: 'Established middle-class households with stable public/private sector employment or medium commercial enterprises.',
    eligibilityCriteria: [
      'Household monthly income between KSh 70,001 and KSh 119,999',
      'Parents in formal payroll employment with pension and health insurance coverage',
      'Attended national or private academies with steady fee clearance'
    ]
  },
  {
    band: 5,
    name: 'Band 5',
    classification: 'Able / Least Needy',
    householdIncomeBracket: 'Above KSh 120,000',
    incomeLimitMonthly: 9999999,
    scholarshipPercent: 30,
    loanPercent: 30,
    householdPercent: 40,
    upkeepLoanAnnualKsh: 40000,
    description: 'Affluent families capable of substantial university tuition financing with minimal state subsidy.',
    eligibilityCriteria: [
      'Household monthly income exceeding KSh 120,000',
      'Senior civil servants, established business executives, professionals and diaspora earners',
      'Capable of paying 40% household fee share without distress'
    ]
  }
];

export const UNIVERSITY_PROGRAM_COSTS: UniversityProgramCost[] = [
  {
    code: 'MBCHB',
    name: 'Bachelor of Medicine & Bachelor of Surgery (MBChB)',
    category: 'Health Sciences',
    durationYears: 6,
    annualProgramCostKsh: 612000,
    careers: ['Medical Doctor', 'Surgeon', 'Medical Researcher', 'Hospital Superintendent'],
    universitiesOffering: ['University of Nairobi', 'Moi University', 'Kenyatta University', 'Egerton University', 'Maseno University']
  },
  {
    code: 'BDS',
    name: 'Bachelor of Dental Surgery (BDS)',
    category: 'Health Sciences',
    durationYears: 5,
    annualProgramCostKsh: 521000,
    careers: ['Dental Surgeon', 'Orthodontist', 'Oral Pathologist'],
    universitiesOffering: ['University of Nairobi', 'Moi University']
  },
  {
    code: 'BSC-ENG-CIVIL',
    name: 'Bachelor of Science in Civil Engineering',
    category: 'Engineering & Technology',
    durationYears: 5,
    annualProgramCostKsh: 374000,
    careers: ['Structural Engineer', 'Roads & Highway Engineer', 'Water Resources Engineer'],
    universitiesOffering: ['JKUAT', 'University of Nairobi', 'Kenyatta University', 'TUK', 'Moi University']
  },
  {
    code: 'BSC-ENG-ELEC',
    name: 'Bachelor of Science in Electrical & Electronic Engineering',
    category: 'Engineering & Technology',
    durationYears: 5,
    annualProgramCostKsh: 374000,
    careers: ['Power Systems Engineer', 'Telecommunications Specialist', 'Automation Engineer'],
    universitiesOffering: ['JKUAT', 'University of Nairobi', 'TUK', 'Dedan Kimathi University (DeKUT)']
  },
  {
    code: 'BSC-CS',
    name: 'Bachelor of Science in Computer Science',
    category: 'Computing & Informatics',
    durationYears: 4,
    annualProgramCostKsh: 306000,
    careers: ['Software Engineer', 'AI/ML Specialist', 'Systems Architect', 'Cybersecurity Analyst'],
    universitiesOffering: ['University of Nairobi', 'JKUAT', 'Kenyatta University', 'Strathmore University']
  },
  {
    code: 'LLB',
    name: 'Bachelor of Laws (LL.B)',
    category: 'Law & Governance',
    durationYears: 4,
    annualProgramCostKsh: 221000,
    careers: ['Advocate of the High Court of Kenya', 'State Counsel', 'Corporate Legal Counsel', 'Magistrate'],
    universitiesOffering: ['University of Nairobi', 'Kenyatta University', 'Moi University', 'Strathmore University']
  },
  {
    code: 'BPHARM',
    name: 'Bachelor of Pharmacy (B.Pharm)',
    category: 'Health Sciences',
    durationYears: 5,
    annualProgramCostKsh: 420000,
    careers: ['Pharmacist', 'Industrial Chemist', 'Drug Inspector (PPB)', 'Clinical Pharmacologist'],
    universitiesOffering: ['University of Nairobi', 'Kenyatta University', 'JKUAT']
  },
  {
    code: 'BSC-NURSING',
    name: 'Bachelor of Science in Nursing',
    category: 'Health Sciences',
    durationYears: 4,
    annualProgramCostKsh: 340000,
    careers: ['Registered Nurse (NCK)', 'Nurse Anesthetist', 'Critical Care Specialist'],
    universitiesOffering: ['University of Nairobi', 'Moi University', 'Kenyatta University', 'Chuka University']
  },
  {
    code: 'BCOM',
    name: 'Bachelor of Commerce (B.Com)',
    category: 'Business & Economics',
    durationYears: 4,
    annualProgramCostKsh: 220000,
    careers: ['Chartered Accountant (CPA-K)', 'Financial Analyst', 'Investment Banker', 'Tax Consultant'],
    universitiesOffering: ['University of Nairobi', 'Kenyatta University', 'Strathmore', 'Moi', 'Egerton']
  },
  {
    code: 'BED-SCI',
    name: 'Bachelor of Education (Science) - Maths/Physics/Chem/Bio',
    category: 'Education',
    durationYears: 4,
    annualProgramCostKsh: 244000,
    careers: ['TSC Secondary School Teacher', 'Curriculum Developer (KICD)', 'KNEC Examiner'],
    universitiesOffering: ['Kenyatta University', 'University of Nairobi', 'Moi University', 'Egerton University']
  },
  {
    code: 'BSC-AGRI',
    name: 'Bachelor of Science in Agriculture & Agribusiness',
    category: 'Agriculture & Natural Resources',
    durationYears: 4,
    annualProgramCostKsh: 275000,
    careers: ['Agronomist', 'Farm Manager', 'Agricultural Extension Officer', 'Food Security Researcher'],
    universitiesOffering: ['Egerton University', 'University of Nairobi', 'JKUAT']
  }
];

export const HEF_APPEALS_GUIDELINES = [
  {
    step: 1,
    title: 'Review Initial Band Allocation',
    action: 'Log in to your student portal at www.hef.co.ke. Inspect your assigned Band (1 to 5) and the computed parental contribution fee.'
  },
  {
    step: 2,
    title: 'Gather Substantiating Verification Documents',
    action: 'Prepare Death Certificates (if orphan), Chief letter with official seal certifying household vulnerability, Medical receipts/PFP reports (for chronic illness/disability), and sibling school fee receipts.'
  },
  {
    step: 3,
    title: 'Submit Formal Appeal Online',
    action: 'Click the "Request Band Re-Categorization / Appeal" button on the HEF dashboard within 21 days of admission letter receipt. Upload all certified documents in PDF format.'
  },
  {
    step: 4,
    title: 'Physical In-Person Verification & University Dean of Students Clearance',
    action: 'Visit your university Dean of Students or Financial Aid Office with original stamped hard copies for fast-tracking prior to semester exam registration.'
  }
];
