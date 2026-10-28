export interface ProjectMilestone {
  milestoneNumber: number;
  title: string;
  deadlineKnecTerm: string;
  maxMarks: number;
  deliverables: string[];
  knecExaminerRubric: string[];
  proTips: string;
}

export interface NationalProjectCourse {
  subject: string;
  paperCode: string;
  projectOverview: string;
  totalMarks: number;
  passingScore: number;
  milestones: ProjectMilestone[];
}

export const KNEC_PROJECTS_DATA: NationalProjectCourse[] = [
  // 1. COMPUTER STUDIES (451/3)
  {
    subject: 'Computer Studies',
    paperCode: 'KCSE 451/3 Project',
    projectOverview:
      'Candidates must design, implement, and document a complete, functional database-driven information management system (e.g. Sacco Management System, Hospital Pharmacy Registry, County Revenue Licensing System) using Microsoft Access or PostgreSQL.',
    totalMarks: 100,
    passingScore: 50,
    milestones: [
      {
        milestoneNumber: 1,
        title: 'Milestone 1: Problem Definition & Fact-Finding Investigation',
        deadlineKnecTerm: 'Term 1, Week 6',
        maxMarks: 15,
        deliverables: [
          'Background study of the organization and current manual system problems.',
          'Fact-finding instruments: sample questionnaire, interview guide, and document review notes.',
          'Statement of user requirements: functional and non-functional requirements.',
          'Technical, economic, operational, and legal feasibility evaluation.'
        ],
        knecExaminerRubric: [
          'Clear statement of current system bottlenecks: 3 marks',
          'Evidence of authentic primary data collection tools: 4 marks',
          'Comprehensive user specification list: 5 marks',
          'Feasibility analysis with clear recommendations: 3 marks'
        ],
        proTips: 'Avoid generic statements like "the system is slow". Use specific metrics like "manual paper searching takes 45 minutes per client registration".'
      },
      {
        milestoneNumber: 2,
        title: 'Milestone 2: System Analysis & Conceptual Architecture Design',
        deadlineKnecTerm: 'Term 1, Week 11',
        maxMarks: 25,
        deliverables: [
          'Context diagram and Level 1 Data Flow Diagram (DFD).',
          'Entity Relationship Diagram (ERD) with cardinalities (1:1, 1:N, M:N).',
          'Database table dictionary: field names, data types, field sizes, validation rules, default values.',
          'UI Wireframes: Input screens, navigation menus, and executive output report mockups.'
        ],
        knecExaminerRubric: [
          'Correct DFD symbols with consistent data stores: 6 marks',
          'Normalized ERD with clear primary and foreign key mapping: 8 marks',
          'Thorough data dictionary table with data validation rules: 6 marks',
          'Input form and report layout sketches: 5 marks'
        ],
        proTips: 'Ensure every table has a unique Primary Key and foreign keys share identical data types with parent primary keys.'
      },
      {
        milestoneNumber: 3,
        title: 'Milestone 3: Database Construction, Forms & Queries Implementation',
        deadlineKnecTerm: 'Term 2, Week 7',
        maxMarks: 35,
        deliverables: [
          'Normalized relational tables with enforced referential integrity.',
          'Data entry forms with combo boxes, command buttons, and automated macros.',
          'Select, Update, Parameter, and Calculated queries with complex arithmetic expressions.',
          'Grouped summary reports with page totals and visual chart dashboards.'
        ],
        knecExaminerRubric: [
          'Enforced referential integrity between tables: 7 marks',
          'Data validation rules (e.g. input masks, Validation Rule >0): 6 marks',
          'Working queries solving business calculations: 12 marks',
          'Professional grouped reports with grand totals: 10 marks'
        ],
        proTips: 'KNEC examiners test live data entry during project audits! Ensure test records cannot be entered with invalid dates or negative currency values.'
      },
      {
        milestoneNumber: 4,
        title: 'Milestone 4: System Testing, User Documentation & Project Presentation',
        deadlineKnecTerm: 'Term 2, Week 12',
        maxMarks: 25,
        deliverables: [
          'System test plan with valid, invalid, and boundary test cases.',
          'Comprehensive User Guide with step-by-step screenshots.',
          'Technical installation and system requirements documentation.',
          'Oral defense and live software demonstration to external KNEC assessor.'
        ],
        knecExaminerRubric: [
          'Documented test log with actual vs expected outputs: 6 marks',
          'Comprehensive User Guide with screenshots: 7 marks',
          'System maintenance and security guidelines: 4 marks',
          'Confidence and technical proficiency in live demonstration: 8 marks'
        ],
        proTips: 'Rehearse demonstrating edge cases (e.g., trying to save an empty record) to prove error-handling works.'
      }
    ]
  },

  // 2. AGRICULTURE (443/3)
  {
    subject: 'Agriculture',
    paperCode: 'KCSE 443/3 Project',
    projectOverview:
      'Candidates execute a full agricultural enterprise (crop production or livestock rearing) from land preparation/housing to harvesting and financial accounting on the school farm over two terms.',
    totalMarks: 100,
    passingScore: 50,
    milestones: [
      {
        milestoneNumber: 1,
        title: 'Milestone 1: Enterprise Selection, Land Preparation & Input Procurement',
        deadlineKnecTerm: 'Term 1, Week 4',
        maxMarks: 20,
        deliverables: [
          'Selection of certified enterprise (e.g. French beans, Cabbage, or Broiler poultry).',
          'School farm plot demarcation and primary/secondary tillage.',
          'Soil sampling and preparation of compost/manure beds.',
          'Purchase receipts of certified seeds/chicks and fertilizers from KEPHIS approved agro-dealers.'
        ],
        knecExaminerRubric: [
          'Proper plot layout, clearing and seedbed fine tilth: 8 marks',
          'Manure incorporation and basal fertilizer placement: 6 marks',
          'Input inventory register with genuine receipts: 6 marks'
        ],
        proTips: 'Maintain an official project diary signed weekly by your subject teacher; examiners disqualify unstamped logbooks.'
      },
      {
        milestoneNumber: 2,
        title: 'Milestone 2: Planting / Brooding & Crop/Livestock Husbandry',
        deadlineKnecTerm: 'Term 1, Week 10',
        maxMarks: 30,
        deliverables: [
          'Certified planting at recommended spacing and seed depth.',
          'Thinning, gapping, earthing up, and mulching records.',
          'Irrigation schedule and fertilizer top-dressing (e.g. CAN 26% N).',
          'Photographic evidence of student actively managing their individual plot.'
        ],
        knecExaminerRubric: [
          'Accuracy of crop spacing and planting depth: 10 marks',
          'Weed-free plot and effective soil water conservation: 10 marks',
          'Correct top-dressing timing and application rate: 10 marks'
        ],
        proTips: 'Ensure you can explain to the KNEC assessor why you chose that particular fertilizer application method (e.g. side-dressing vs placement).'
      },
      {
        milestoneNumber: 3,
        title: 'Milestone 3: Pest & Disease Control and Harvest Operations',
        deadlineKnecTerm: 'Term 2, Week 6',
        maxMarks: 25,
        deliverables: [
          'Scouting log identifying specific pests and symptoms of diseases.',
          'Safe chemical handling records (knapsack calibration, PPE, post-harvest intervals).',
          'Timely harvesting at peak market maturity.',
          'Grading, weighing, and recording fresh produce yield.'
        ],
        knecExaminerRubric: [
          'Correct identification and control of pests/diseases: 8 marks',
          'Safe storage and handling of agricultural chemicals: 7 marks',
          'Quality grading and clean sorting of produce: 10 marks'
        ],
        proTips: 'Always observe the Pre-Harvest Interval (PHI) for pesticides to avoid chemical residues on crops during inspection.'
      },
      {
        milestoneNumber: 4,
        title: 'Milestone 4: Financial Accounting & Project Final Report',
        deadlineKnecTerm: 'Term 2, Week 10',
        maxMarks: 25,
        deliverables: [
          'Complete Enterprise Production Record and Sales Day Book.',
          'Financial Profit and Loss Statement and Gross Margin Analysis.',
          'Evaluation of challenges encountered and recommendations for commercial scale.',
          'Submission of bounded report to the KNEC Examination Center.'
        ],
        knecExaminerRubric: [
          'Accurate accounting of all variable and fixed costs: 8 marks',
          'Correct Gross Margin calculation (Gross Revenue - Variable Costs): 9 marks',
          'Critical project discussion and presentation quality: 8 marks'
        ],
        proTips: 'Gross Margin = Total Revenue minus Total Variable Costs. Ensure you do not confuse Gross Margin with Net Profit (which deducts fixed overheads).'
      }
    ]
  }
];
