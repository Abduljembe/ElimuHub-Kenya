import { SubjectCourse } from '../types/curriculum';

export const UNIVERSITY_COURSES: SubjectCourse[] = [
  // 1. MEDICINE & SURGERY (MBChB)
  {
    id: 'uni-medicine',
    name: 'Bachelor of Medicine & Surgery (MBChB)',
    code: 'MBChB / CUE Level 8',
    level: 'university',
    category: 'Medical Sciences',
    badge: 'KUCCPS Health Sciences',
    description: 'Premier undergraduate medical training in Kenya (UoN, Moi, Kenyatta University, Egerton). Human gross anatomy, physiology, pharmacology, pathology, clinical medicine, OSCE practicals, and Kenyatta National Hospital internship guidelines.',
    simulationType: 'clinical',
    topics: [
      {
        id: 'med-t1',
        title: 'Cardiovascular Physiology & Acute Coronary Syndromes',
        formOrYear: 'Year 3',
        subtopics: [
          'Cardiac conduction system and 12-lead ECG vector analysis',
          'Pathophysiology of ST-Elevation Myocardial Infarction (STEMI)',
          'Cardiogenic shock and heart failure hemodynamics',
          'Pharmacotherapy: Thrombolytics, Antiplatelets, Beta-blockers, ACE inhibitors'
        ],
        theoryOverview: 'Cardiac output (CO) = Heart Rate (HR) × Stroke Volume (SV). Mean Arterial Pressure (MAP) = Diastolic BP + ⅓(Pulse Pressure). During acute myocardial infarction, coronary artery occlusion leads to cellular hypoxia, depletion of ATP, failure of Na+/K+ ATPase pumps, and elevation of cardiac biomarkers (Troponin I and T). 12-lead ECG reveals ST-elevation in anatomically contiguous leads.',
        keyFormulas: [
          'MAP = DBP + ⅓(SBP - DBP)',
          'Cardiac Output = HR × SV',
          'Ejection Fraction = (EDV - ESV) / EDV × 100%'
        ],
        kenyanApplication: 'Management of cardiovascular emergencies at Kenyatta National Hospital (KNH) and Moi Teaching and Referral Hospital (MTRH) catheterization laboratories.',
        examTips: 'In OSCE clinical exams, always state: "Check ABCDE (Airway, Breathing, Circulation, Disability, Exposure)" first before ordering specialized tests.'
      },
      {
        id: 'med-t2',
        title: 'Infectious Diseases & Tropical Medicine in Kenya',
        formOrYear: 'Year 4',
        subtopics: [
          'Plasmodium falciparum malaria lifecycle and severe malaria management',
          'Artemisinin-based combination therapies (ACTs) and IV Artesunate protocol',
          'Tuberculosis diagnosis (GeneXpert MTB/RIF) and National TB Programme guidelines',
          'HIV/AIDS anti-retroviral therapy (Dolutegravir-based regimens)'
        ],
        theoryOverview: 'Severe malaria is defined by P. falciparum asexual parasitaemia with one or more complications: cerebral malaria, severe anaemia (Hb < 5 g/dL), acute kidney injury, or respiratory distress (acidosis). First-line treatment per Kenya Ministry of Health guidelines is IV Artesunate 2.4 mg/kg at 0, 12, and 24 hours, then daily.',
        keyFormulas: ['IV Artesunate dose: 2.4 mg/kg body weight (3.0 mg/kg for children < 20 kg).'],
        kenyanApplication: 'Epidemiological control in Lake Victoria endemic counties (Kisumu, Siaya, Homa Bay) and coastal Kenya.',
        examTips: 'Remember that Lumbar Puncture is mandatory in suspected cerebral malaria to rule out bacterial meningitis once papilloedema is excluded.'
      }
    ],
    practicals: [
      {
        id: 'med-p1',
        title: 'OSCE Clinical Station: Emergency Resuscitation & 12-Lead ECG Interpretation',
        objectives: [
          'Perform a systematic primary survey (ABCDE) on an acute collapsed adult patient',
          'Correctly attach and interpret 12-lead ECG rhythm strips (Anterior STEMI)',
          'Administer acute medical treatment: Aspirin, Clopidogrel, Morphine, Oxygen, Nitrates (MONA)'
        ],
        apparatus: [
          'Simulated mannequin / Standardized patient',
          '12-Lead ECG Machine with limb and precordial electrodes (V1-V6)',
          'Emergency crash cart with defibrillator, IV cannulas, and emergency drugs'
        ],
        safetyHazards: ['Sharps safety (cannulas and needles disposal in yellow biohazard box).'],
        procedure: [
          'Step 1: Check responsiveness and call for help / cardiac arrest team.',
          'Step 2: Assess Airway, Breathing, and check Carotid pulse for 10 seconds.',
          'Step 3: Connect ECG electrodes: V1 to V6 precordial placements.',
          'Step 4: Identify ST elevation > 2mm in V1-V4 indicating Anterior STEMI (LAD occlusion).',
          'Step 5: Prescribe immediate chewable Aspirin 300mg + Clopidogrel 300mg + activate Cath Lab.'
        ],
        observationTable: {
          headers: ['Parameter', 'Measured Value', 'Reference Range', 'Clinical Status'],
          sampleRows: [
            ['Heart Rate', '118 bpm', '60-100 bpm', 'Sinus Tachycardia'],
            ['Blood Pressure', '88/54 mmHg', '120/80 mmHg', 'Hypotensive / Cardiogenic shock'],
            ['SpO2', '91%', '95-100%', 'Hypoxia (Oxygen indicated)'],
            ['ECG Finding', 'ST elevation V2-V4', 'Isoelectric ST segment', 'Acute Anterior STEMI']
          ]
        },
        calculationFormula: 'Glasgow Coma Scale = Eye (1-4) + Verbal (1-5) + Motor (1-6) = Score / 15.',
        expectedOutcome: 'Rapid stabilization and timely reperfusion strategy.',
        vivaQuestions: [
          'What are the absolute contraindications to fibrinolytic therapy in STEMI?',
          'Which coronary artery supplies the inferior wall of the myocardium?'
        ]
      }
    ],
    exams: [
      {
        id: 'med-e1',
        title: 'MBChB Part II Final Examination in Internal Medicine',
        paperCode: 'MED 501',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Answer all clinical vignette questions with differential diagnoses and management.'],
        questions: [
          {
            id: 'med-q1',
            questionNumber: 1,
            questionText: 'A 45-year-old male presents with crushing retrosternal chest pain radiating to left jaw for 2 hours, diaphoresis, and BP 90/60 mmHg. Outline immediate investigations and 15-minute emergency management. [8 marks]',
            marks: 8,
            sampleAnswer: 'Immediate investigation: Urgent 12-lead ECG within 10 minutes and point-of-care cardiac Troponins. Emergency Management: 1. Supplemental O2 if SpO2 < 90%. 2. Chewable Aspirin 300mg loading dose. 3. Clopidogrel 300mg loading dose. 4. IV Morphine 2-4mg with Metoclopramide 10mg. 5. Secure wide-bore IV cannulae. 6. Urgent activation of Primary Percutaneous Coronary Intervention (PCI).',
            markingScheme: [
              'Urgent 12-lead ECG identification (2 marks)',
              'Dual antiplatelet therapy Aspirin + P2Y12 inhibitor (2 marks)',
              'Analgesia & hemodynamics management (2 marks)',
              'Reperfusion pathway (PCI/thrombolysis) within door-to-balloon time (2 marks)'
            ]
          }
        ]
      }
    ]
  },

  // 2. NURSING & MIDWIFERY (BScN)
  {
    id: 'uni-nursing',
    name: 'BSc. Nursing & Midwifery (BScN)',
    code: 'BScN / CUE Level 8',
    level: 'university',
    category: 'Medical Sciences',
    badge: 'KUCCPS Nursing Council of Kenya',
    description: 'Comprehensive nursing degree (UoN, KU, Moi, KMTC). Medical-surgical nursing, maternal and neonatal care (partograph), clinical pharmacology, infection control, and NCK licensure board exam preparation.',
    topics: [
      {
        id: 'nurs-t1',
        title: 'Intrapartum Care & The Simplified WHO/NCK Partograph',
        formOrYear: 'Year 3',
        subtopics: [
          'Stages of labor and physiological cervical dilatation',
          'Plotting the Partograph: Cervical dilatation, fetal heart rate, uterine contractions',
          'Alert line and Action line interpretation and emergency referral triggers',
          'Active Management of the Third Stage of Labor (AMTSL) to prevent Postpartum Hemorrhage (PPH)'
        ],
        theoryOverview: 'The partograph is a graphical tool used to monitor maternal and fetal wellbeing during active labor (from 4cm dilatation). The alert line represents normal progression (1cm/hr); crossing the action line (4 hours to the right of the alert line) indicates protracted labor requiring urgent intervention. AMTSL comprises uterotonic administration (Oxytocin 10 IU IM), controlled cord traction, and uterine fundal massage.',
        keyFormulas: [
          'Normal labor progress rate: ≥ 1 cm cervical dilatation per hour in active phase',
          'PPH definition: Blood loss > 500 mL following vaginal delivery or > 1000 mL following Caesarean section'
        ],
        kenyanApplication: 'Linda Mama free maternity healthcare program implementation in Kenyan county referral hospitals.',
        examTips: 'In the Nursing Council of Kenya (NCK) licensure exam, always specify Oxytocin 10 IU IM within 1 minute of fetal delivery as step 1 of AMTSL.'
      }
    ],
    practicals: [
      {
        id: 'nurs-p1',
        title: 'Clinical Practicum: Partograph Plotting & Emergency Postpartum Hemorrhage (PPH) Management',
        objectives: [
          'Correctly plot labor progress data on a standard NCK Partograph',
          'Implement the 2026 WHO/MOH Kenya E-MOTIVE bundle for immediate postpartum hemorrhage management'
        ],
        apparatus: ['Partograph sheets', 'Simulated birthing pelvis model', 'Oxytocin ampoules (10 IU)', 'Tranexamic Acid (TXA 1g)', 'IV infusion sets'],
        safetyHazards: ['Universal infection control precautions with bodily fluids.'],
        procedure: [
          'Plot maternal vitals (BP, pulse) and fetal heart rate (every 30 mins).',
          'Record cervical dilatation every 4 hours from 4cm baseline.',
          'Upon recognizing PPH (>500ml blood loss), trigger E-MOTIVE bundle: Early detection, Massage uterus, Oxytocic drugs, Tranexamic acid (1g IV over 10 min), IV fluids, and Examination of birth canal.'
        ],
        observationTable: {
          headers: ['Time', 'Cervical Dilatation (cm)', 'Contractions in 10 mins', 'Fetal Heart Rate (bpm)', 'Status'],
          sampleRows: [
            ['10:00', '4 cm (Baseline)', '3 lasting 35 sec', '136 bpm', 'Normal Active Phase'],
            ['14:00', '8 cm (On Alert line)', '4 lasting 45 sec', '140 bpm', 'Satisfactory Progress'],
            ['16:00', '10 cm (Full)', '5 lasting 50 sec', '132 bpm', 'Second Stage Delivery']
          ]
        },
        calculationFormula: 'Labor duration = Time to reach 10cm full dilatation',
        expectedOutcome: 'Successful prevention of obstructed labor and maternal mortality.',
        vivaQuestions: ['What are the four \'T\' causes of Postpartum Hemorrhage (Tone, Trauma, Tissue, Thrombin)?']
      }
    ],
    exams: [
      {
        id: 'nurs-e1',
        title: 'Nursing Council of Kenya (NCK) Licensure Examination: Midwifery',
        paperCode: 'NCK 401',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Answer all structured and clinical scenario questions.'],
        questions: [
          {
            id: 'nurs-q1',
            questionNumber: 1,
            questionText: 'Describe the three components of Active Management of the Third Stage of Labor (AMTSL) and outline five risk factors for uterine atony. [10 marks]',
            marks: 10,
            sampleAnswer: 'Three Components of AMTSL:\n1. Administration of a uterotonic drug: Oxytocin 10 IU intramuscularly immediately within 1 minute of baby delivery after ruling out an additional twin.\n2. Controlled Cord Traction (CCT) with counter-traction applied on the lower uterine segment using the Brandt-Andrews maneuver.\n3. Immediate fundal massage of the uterus following placenta expulsion, reassessing tone every 15 minutes for the first 2 hours.\n\nFive Risk Factors for Uterine Atony:\n1. Overdistension of the uterus (multiple gestation, polyhydramnios, macrosomia).\n2. Prolonged or obstructed labor causing uterine muscle exhaustion.\n3. Grand multiparity (≥ 5 deliveries) with fibrous replacement of myometrium.\n4. Intra-amniotic infection (chorioamnionitis).\n5. Use of uterine relaxants or high-dose tocolytics during labor.',
            markingScheme: [
              'Administration of Oxytocin 10 IU IM within 1 min (2 marks)',
              'Controlled cord traction technique (2 marks)',
              'Uterine fundal massage protocol (2 marks)',
              'Four correctly identified risk factors (4 marks)'
            ]
          }
        ]
      }
    ]
  },

  // 3. PHARMACY (BPharm)
  {
    id: 'uni-pharmacy',
    name: 'Bachelor of Pharmacy (BPharm)',
    code: 'BPharm / CUE Level 8',
    level: 'university',
    category: 'Medical Sciences',
    badge: 'KUCCPS Pharmacy & Poisons Board',
    description: 'Degree training in pharmaceutical formulation, pharmacokinetics, medicinal chemistry, clinical toxicology, and Kenya Pharmacy and Poisons Board (PPB) regulatory compliance.',
    topics: [
      {
        id: 'pharm-t1',
        title: 'Clinical Pharmacokinetics & Drug Clearance Mechanisms',
        formOrYear: 'Year 3',
        subtopics: [
          'Apparent volume of distribution (Vd) and half-life (t1/2)',
          'First-order vs Zero-order elimination kinetics',
          'Hepatic cytochrome P450 enzyme induction and inhibition',
          'Therapeutic Drug Monitoring (TDM) for narrow therapeutic index drugs (Gentamicin, Digoxin)'
        ],
        theoryOverview: 'Pharmacokinetics investigates what the body does to the drug (Absorption, Distribution, Metabolism, Excretion - ADME). Clearance (CL) is the volume of plasma cleared of drug per unit time: CL = k_e × Vd. Steady-state concentration (Css) is achieved after approximately 4 to 5 elimination half-lives.',
        keyFormulas: [
          'Half-life: t₁/₂ = (0.693 × Vd) / CL',
          'Loading Dose: LD = (Target Css × Vd) / Bioavailability (F)',
          'Maintenance Dose: MD = (Target Css × CL) / F'
        ],
        kenyanApplication: 'Kenya Pharmacy and Poisons Board (PPB) post-market surveillance on generic drug bioequivalence.',
        examTips: 'Gentamicin dosing requires calculation of Creatinine Clearance using the Cockcroft-Gault formula to avoid nephrotoxicity and ototoxicity.'
      }
    ],
    practicals: [
      {
        id: 'pharm-p1',
        title: 'Laboratory Formulation: Compounding and Quality Control of Oral Paracetamol Suspension',
        objectives: [
          'Formulate 100ml of pediatric Paracetamol oral suspension (120mg/5ml) using suspending agents',
          'Determine pH, sedimentation volume (F), and assay active pharmaceutical ingredient (API)'
        ],
        apparatus: ['Mortar and pestle', 'Paracetamol powder (B.P. Grade)', 'Xanthan gum / Methylcellulose', 'Glycerol', 'UV-Visible Spectrophotometer'],
        safetyHazards: ['Chemical dust inhalation: wear N95 mask and lab coat.'],
        procedure: [
          'Weigh 2.4g pure Paracetamol API.',
          'Levigate powder with 10ml glycerol to form smooth paste.',
          'Disperse xanthan gum in warm water to form mucilage.',
          'Gradually combine paste with mucilage, add syrup and flavor, make up to 100ml.',
          'Measure sedimentation ratio: F = Vu / Vo over 7 days.'
        ],
        observationTable: {
          headers: ['Formulation Parameter', 'Target Specification', 'Observed Value', 'Pass/Fail'],
          sampleRows: [
            ['pH', '5.0 - 6.5', '5.8', 'PASS'],
            ['Assay Content', '95.0% - 105.0%', '99.4%', 'PASS'],
            ['Sedimentation Ratio (F)', '≥ 0.85 after 48 hrs', '0.92', 'PASS']
          ]
        },
        calculationFormula: 'Dose concentration = 2.4g / 100ml = 120mg / 5ml',
        expectedOutcome: 'Homogeneous, easily re-dispersible suspension meeting British Pharmacopoeia (B.P.) standards.',
        vivaQuestions: ['Why is glycerol added as a wetting agent during the compounding of insoluble powders?']
      }
    ],
    exams: [
      {
        id: 'pharm-e1',
        title: 'University Professional Exam: Clinical Pharmacology & Pharmacokinetics',
        paperCode: 'PHA 312',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Answer all calculation problems and essay sections.'],
        questions: [
          {
            id: 'pharm-q1',
            questionNumber: 1,
            questionText: 'A 60kg patient requires an intravenous antibiotic with target steady-state concentration Css = 15 mg/L. The drug has Vd = 0.5 L/kg and clearance CL = 0.05 L/hr/kg. Calculate: (a) Loading dose [3 marks], (b) Half-life [3 marks], (c) Constant IV infusion rate [4 marks].',
            marks: 10,
            sampleAnswer: '(a) Total Vd = 0.5 L/kg × 60 kg = 30 L.\nLoading Dose (LD) = Target Css × Vd = 15 mg/L × 30 L = 450 mg.\n\n(b) Total CL = 0.05 L/hr/kg × 60 kg = 3.0 L/hr.\nHalf-life t₁/₂ = (0.693 × Vd) / CL = (0.693 × 30) / 3.0 = 20.79 / 3.0 = 6.93 hours.\n\n(c) Infusion Rate (R₀) = Target Css × CL = 15 mg/L × 3.0 L/hr = 45 mg/hr.',
            markingScheme: [
              'Correct Vd calculation and Loading Dose 450 mg (3 marks)',
              'Correct elimination half-life 6.93 hours (3 marks)',
              'Correct steady-state infusion rate 45 mg/hr (4 marks)'
            ]
          }
        ]
      }
    ]
  },

  // 4. ELECTRICAL & INFORMATION ENGINEERING
  {
    id: 'uni-electrical',
    name: 'BSc. Electrical & Information Engineering',
    code: 'BSc Eng / CUE Level 8',
    level: 'university',
    category: 'Engineering',
    badge: 'KUCCPS Engineering',
    description: 'Premier university engineering programme (UoN, JKUAT, Moi, Dedan Kimathi). Circuit network analysis, digital electronics, power systems, telecommunications, optical fiber, and laboratory design projects.',
    simulationType: 'circuits',
    topics: [
      {
        id: 'ee-t1',
        title: 'AC Network Theorems & Three-Phase Power',
        formOrYear: 'Year 2',
        subtopics: [
          'Phasor analysis and complex impedance (Z = R + jX)',
          'Thevenin\'s, Norton\'s, and Maximum Power Transfer theorems in AC',
          'Star and Delta balanced and unbalanced three-phase systems',
          'Power factor correction using shunt capacitor banks'
        ],
        theoryOverview: 'In AC circuits, impedance Z = R + j(X_L - X_C). Active power P = V·I·cos(θ) (Watts), Reactive power Q = V·I·sin(θ) (VAR). Star connection: V_L = √3 · V_ph, I_L = I_ph. Delta: V_L = V_ph, I_L = √3 · I_ph.',
        keyFormulas: [
          'Z = R + j(ωL - 1/(ωC))',
          'P_3phase = √3 · V_L · I_L · cos(φ)',
          'Q_cap = P · (tan(φ₁) - tan(φ₂))'
        ],
        kenyanApplication: 'Kenya Power (KPLC) grid distribution from Suswa substation to Nairobi industrial area and Turkana wind power feed-in.',
        examTips: 'Always remember to convert angles between radians and degrees when calculating phasor power.'
      }
    ],
    practicals: [
      {
        id: 'ee-p1',
        title: 'Three-Phase Induction Motor Star-Delta Starter & Power Factor Measurement',
        objectives: [
          'Wire a three-phase squirrel cage induction motor with contactors for Star-Delta starting',
          'Measure starting current in Star vs Delta configuration to confirm 1/3 current reduction'
        ],
        apparatus: ['3-Phase 415V AC Supply', 'Squirrel Cage Motor (3kW)', 'Contactors with timer relay', 'Power Quality Analyzer'],
        safetyHazards: ['415V three-phase high voltage hazard: strictly de-energize and LOTO before wiring.'],
        procedure: [
          'Connect motor stator terminals U1, V1, W1 to main contactor.',
          'Connect U2, V2, W2 to delta contactor and star contactor shorting bridge.',
          'Start motor in Star: observe lower starting current, then transition to Delta.'
        ],
        observationTable: {
          headers: ['Connection Mode', 'Line Voltage (V)', 'Starting Current (A)', 'Running Current (A)'],
          sampleRows: [
            ['Direct On Line (DOL)', '415', '36.5', '6.2'],
            ['Star (Starting)', '415', '12.2', '3.8'],
            ['Delta (Run Mode)', '415', '415', '6.1']
          ]
        },
        calculationFormula: 'I_star = ⅓ · I_delta',
        expectedOutcome: 'Smooth acceleration with minimal voltage sag on supply mains.',
        vivaQuestions: ['Why cannot Star-Delta starting be used for motors where delta voltage is not line voltage?']
      }
    ],
    exams: [
      {
        id: 'ee-e1',
        title: 'University Final Examination: Electric Circuit Analysis II',
        paperCode: 'FEE 201',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Answer Question ONE and any other TWO.'],
        questions: [
          {
            id: 'ee-q1',
            questionNumber: 1,
            questionText: 'A balanced 3-phase delta load has per-phase impedance Z = (18 + j24) Ω connected to a 415V 50Hz supply. Calculate Line current and Total Active Power. [6 marks]',
            marks: 6,
            sampleAnswer: '|Z| = √(18² + 24²) = 30 Ω. Phase current I_ph = 415/30 = 13.83 A. Line current I_L = √3 × 13.83 = 23.95 A. Power factor cos(φ) = 18/30 = 0.60. Total Power P = √3 × 415 × 23.95 × 0.60 = 10.33 kW.',
            markingScheme: ['Impedance |Z| = 30 Ω (2 marks)', 'Line current 23.95 A (2 marks)', 'Active power 10.33 kW (2 marks)']
          }
        ]
      }
    ]
  },

  // 5. CIVIL & STRUCTURAL ENGINEERING
  {
    id: 'uni-civil',
    name: 'BSc. Civil & Structural Engineering',
    code: 'BSc Civil / CUE Level 8',
    level: 'university',
    category: 'Engineering',
    badge: 'KUCCPS Engineers Board of Kenya',
    description: 'Degree training in reinforced concrete design (Eurocode 2 / BS 8110), structural analysis, geotechnical soil mechanics, transportation highway design, and water resources engineering in Kenya.',
    topics: [
      {
        id: 'civ-t1',
        title: 'Reinforced Concrete Design: Limit State Analysis of Beams & Slabs',
        formOrYear: 'Year 3',
        subtopics: [
          'Ultimate Limit State (ULS) for bending and shear',
          'Serviceability Limit State (SLS) for deflection and crack width control',
          'Singly reinforced vs Doubly reinforced rectangular beam sections',
          'Shear reinforcement (links / stirrups) calculation and curtailment'
        ],
        theoryOverview: 'Limit state design ensures structures do not collapse under ultimate loads and remain functional under service loads. Design bending moment M_u is resisted by concrete stress block in compression and high-yield steel bars in tension: M_u = 0.156 · f_cu · b · d² (for balanced singly reinforced sections).',
        keyFormulas: [
          'Design Ultimate Load: W_u = 1.4G_k + 1.6Q_k',
          'K = M / (b · d² · f_cu) ≤ 0.156',
          'Lever arm: z = d · [0.5 + √(0.25 - K/0.9)] ≤ 0.95d',
          'Area of Steel: A_s = M / (0.87 · f_y · z)'
        ],
        kenyanApplication: 'Structural engineering of the Nairobi Expressway viaduct pillars and Lamu Port (LAPSSET) berths.',
        examTips: 'Never allow lever arm z to exceed 0.95d when applying British Standard BS 8110.'
      }
    ],
    practicals: [
      {
        id: 'civ-p1',
        title: 'Concrete Technology Lab: Compressive Cube Strength Testing (Grade 25/30)',
        objectives: [
          'Cast 150mm concrete cubes with standard mix proportion (1:2:4)',
          'Perform slump test to evaluate workability',
          'Cure cubes for 7, 14, and 28 days and crush on Universal Compressive Testing Machine'
        ],
        apparatus: ['150mm cast iron cube moulds', 'Slump cone and tamping rod', 'Compression Testing Machine (2000 kN capacity)', 'Curing water tank'],
        safetyHazards: ['Flying concrete debris on rupture: ensure protective acrylic cage is latched.'],
        procedure: [
          'Batch cement, sand, 20mm aggregate, and water (water-cement ratio 0.50).',
          'Measure slump: true slump between 50-75mm (medium workability).',
          'Fill cube moulds in 3 layers, tamping 35 times per layer with steel bar.',
          'Demould after 24 hours and submerge in water curing tank at 20°C.',
          'Test at 7 days (expected ~67% of 28-day strength) and 28 days (≥ 30 N/mm²).'
        ],
        observationTable: {
          headers: ['Cube ID', 'Curing Age (Days)', 'Failure Load (kN)', 'Cross-Section Area (mm²)', 'Compressive Strength (N/mm²)'],
          sampleRows: [
            ['Cube A1', '7 Days', '480 kN', '22,500 mm²', '21.3 N/mm²'],
            ['Cube A2', '14 Days', '590 kN', '22,500 mm²', '26.2 N/mm²'],
            ['Cube A3', '28 Days', '710 kN', '22,500 mm²', '31.5 N/mm² (Target Met)']
          ]
        },
        calculationFormula: 'Compressive Strength f_cu = Failure Load (N) / Area (150 × 150 mm²)',
        expectedOutcome: '28-day characteristic strength exceeding 30.0 N/mm².',
        vivaQuestions: ['What are the three types of slump observed during workability testing?']
      }
    ],
    exams: [
      {
        id: 'civ-e1',
        title: 'University Final Exam: Theory of Structures & Reinforced Concrete',
        paperCode: 'CIV 321',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Answer Question 1 and any other two questions. Standard design tables provided.'],
        questions: [
          {
            id: 'civ-q1',
            questionNumber: 1,
            questionText: 'A simply supported rectangular reinforced concrete beam has width b = 250 mm, effective depth d = 450 mm, and carries design ultimate bending moment M = 160 kNm. Concrete characteristic strength f_cu = 30 N/mm² and steel yield strength f_y = 460 N/mm². Calculate the required area of tension reinforcement A_s. [10 marks]',
            marks: 10,
            sampleAnswer: 'Step 1: Calculate K value.\nK = M / (b · d² · f_cu) = (160 × 10⁶) / (250 × 450² × 30) = 160 × 10⁶ / 1.51875 × 10⁹ = 0.1053.\nSince K = 0.1053 < 0.156, section is singly reinforced (no compression steel needed).\n\nStep 2: Calculate lever arm z.\nz = d · [0.5 + √(0.25 - K/0.9)] = 450 · [0.5 + √(0.25 - 0.1053/0.9)]\n= 450 · [0.5 + √(0.25 - 0.1170)] = 450 · [0.5 + √0.1330] = 450 · [0.5 + 0.3647] = 450 · 0.8647 = 389.1 mm.\nCheck: 0.95d = 0.95 × 450 = 427.5 mm. Since 389.1 < 427.5 mm, adopt z = 389.1 mm.\n\nStep 3: Calculate required steel area A_s.\nA_s = M / (0.87 · f_y · z) = (160 × 10⁶) / (0.87 × 460 × 389.1) = 160 × 10⁶ / 155,718 = 1027.5 mm².\nSelection: Provide 3 High-Yield bars of diameter 25mm (3T25, Area = 3 × 491 = 1473 mm²).',
            markingScheme: [
              'K value calculation K = 0.1053 and confirmation of singly reinforced (3 marks)',
              'Lever arm z = 389.1 mm (3 marks)',
              'Calculation of required steel area A_s = 1027.5 mm² (3 marks)',
              'Suitable bar selection (1 mark)'
            ]
          }
        ]
      }
    ]
  },

  // 6. MECHANICAL & MECHATRONIC ENGINEERING
  {
    id: 'uni-mechanical',
    name: 'BSc. Mechanical & Mechatronic Engineering',
    code: 'BSc Mech / CUE Level 8',
    level: 'university',
    category: 'Engineering',
    badge: 'KUCCPS Engineers Board of Kenya',
    description: 'Undergraduate engineering in applied thermodynamics, heat transfer, fluid mechanics, machine design, mechatronics (PLCs & microcontrollers), and CNC manufacturing.',
    topics: [
      {
        id: 'mech-t1',
        title: 'Applied Thermodynamics: Gas Turbine Brayton & Steam Rankine Cycles',
        formOrYear: 'Year 3',
        subtopics: [
          'Air-standard Brayton cycle: isentropic compression, constant pressure combustion, expansion',
          'Thermal efficiency, pressure ratio, and back-work ratio of gas turbines',
          'Regeneration, intercooling, and reheating to improve thermodynamic efficiency',
          'Rankine power cycle with superheat in geothermal steam plants'
        ],
        theoryOverview: 'The Brayton cycle models gas turbine power plants. Thermal efficiency depends on the pressure ratio r_p: η_th = 1 - 1 / (r_p^((γ-1)/γ)), where γ is the ratio of specific heats (1.4 for air). In geothermal Rankine plants, dry steam expands through steam turbines to drive synchronous generators.',
        keyFormulas: [
          'Brayton Efficiency: η = 1 - (1 / r_p^((γ-1)/γ))',
          'Specific Work Output: w_net = w_turbine - w_compressor',
          'Carnot Maximum Efficiency: η_carnot = 1 - (T_cold / T_hot)'
        ],
        kenyanApplication: 'Kipevu thermal power station gas turbines in Mombasa and Olkaria steam turbines.',
        examTips: 'Always convert temperatures to Kelvin (K = °C + 273.15) before applying gas law equations.'
      }
    ],
    practicals: [
      {
        id: 'mech-p1',
        title: 'Universal Testing Machine (UTM): Tensile Stress-Strain Curve of Mild Steel',
        objectives: [
          'Mount standard mild steel specimen into tensile grips and apply monotonic axial tension',
          'Plot engineering stress-strain curve to obtain Young\'s Modulus, yield strength, and UTS'
        ],
        apparatus: ['Computer-interfaced Universal Testing Machine (100 kN)', 'Mild steel tensile specimen (gauge length 50mm, dia 10mm)', 'Extensometer'],
        safetyHazards: ['Specimen necking and explosive fracture: keep safety transparent shield closed.'],
        procedure: [
          'Measure initial gauge length L₀ and diameter d₀ using vernier calipers.',
          'Attach axial extensometer and clamp specimen in hydraulic wedge grips.',
          'Apply crosshead strain rate of 1 mm/min.',
          'Record load (F) and elongation (ΔL) through yield point, ultimate tensile strength, and fracture.'
        ],
        observationTable: {
          headers: ['Mechanical Property', 'Symbol', 'Experimental Value', 'Standard Range'],
          sampleRows: [
            ['Young\'s Modulus', 'E', '204 GPa', '200 - 210 GPa'],
            ['Yield Strength', 'σ_y', '258 MPa', '250 MPa'],
            ['Ultimate Tensile Strength', 'UTS', '435 MPa', '400 - 500 MPa'],
            ['Percentage Elongation', '% EL', '24.2%', '≥ 20% (Ductile)']
          ]
        },
        calculationFormula: 'Stress σ = F / A₀; Strain ε = ΔL / L₀; Young\'s Modulus E = σ / ε in elastic region',
        expectedOutcome: 'Demonstration of linear elastic region, upper/lower yield points, plastic deformation, and cup-and-cone ductile fracture.',
        vivaQuestions: ['What is the difference between engineering stress and true stress?']
      }
    ],
    exams: [
      {
        id: 'mech-e1',
        title: 'University Final Exam: Thermodynamics II & Power Plants',
        paperCode: 'MEC 311',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Answer Question 1 and any other two questions. Steam tables provided.'],
        questions: [
          {
            id: 'mech-q1',
            questionNumber: 1,
            questionText: 'An air-standard Brayton cycle operates with compressor inlet conditions of 100 kPa and 300 K. The pressure ratio is 8:1 and maximum cycle temperature is 1300 K. Assuming γ = 1.4 and c_p = 1.005 kJ/kg·K, calculate: (a) Compressor exit temperature T₂ [3 marks], (b) Turbine exit temperature T₄ [3 marks], (c) Cycle thermal efficiency [4 marks].',
            marks: 10,
            sampleAnswer: '(a) For isentropic compression: T₂ = T₁ · (r_p)^((γ-1)/γ) = 300 · (8)^((1.4-1)/1.4) = 300 · (8)^(0.2857) = 300 · 1.8114 = 543.4 K.\n\n(b) For isentropic expansion: T₄ = T₃ / (r_p)^((γ-1)/γ) = 1300 / 1.8114 = 717.7 K.\n\n(c) Cycle thermal efficiency:\nη_th = 1 - (1 / (r_p)^((γ-1)/γ)) = 1 - (1 / 1.8114) = 1 - 0.5521 = 0.4479 = 44.8%.',
            markingScheme: [
              'Compressor temperature T₂ = 543.4 K (3 marks)',
              'Turbine temperature T₄ = 717.7 K (3 marks)',
              'Efficiency formula and final value 44.8% (4 marks)'
            ]
          }
        ]
      }
    ]
  },

  // 7. COMPUTER SCIENCE & SOFTWARE ENGINEERING
  {
    id: 'uni-cs',
    name: 'BSc. Computer Science & Software Engineering',
    code: 'BSc CS / CUE Level 8',
    level: 'university',
    category: 'Computing & Tech',
    badge: 'KUCCPS Technology',
    description: 'Algorithms, data structures, operating systems, cloud systems, distributed databases, compiler design, and software engineering.',
    simulationType: 'algorithms',
    topics: [
      {
        id: 'cs-t1',
        title: 'Advanced Data Structures & Asymptotic Algorithm Analysis',
        formOrYear: 'Year 2',
        subtopics: [
          'Big-O, Big-Theta, Big-Omega time and space complexity',
          'Divide and Conquer: QuickSort, MergeSort, and Master Theorem',
          'Dynamic Programming: 0/1 Knapsack, Longest Common Subsequence',
          'Graph Algorithms: Dijkstra shortest path, Bellman-Ford, Kruskal\'s MST'
        ],
        theoryOverview: 'Algorithm efficiency is characterized by growth rate as input size n → ∞. Master Theorem: T(n) = aT(n/b) + f(n). Comparison sorting lower bound is Ω(n log n).',
        keyFormulas: ['Master Theorem: T(n) = aT(n/b) + O(n^d)', 'Dijkstra: O((V + E) log V)'],
        kenyanApplication: 'Routing algorithms for Safaricom M-Pesa transaction processing nodes and traffic signal optimization in Nairobi.',
        examTips: 'Always analyze both time AND auxiliary space complexity.'
      }
    ],
    practicals: [
      {
        id: 'cs-p1',
        title: 'Building a Distributed RESTful Microservice with Redis Caching',
        objectives: ['Benchmark query latency with and without in-memory Redis caching under 10k requests'],
        apparatus: ['Linux / Ubuntu Environment', 'Docker Engine', 'Node.js / Go', 'Load tester k6'],
        safetyHazards: ['None'],
        procedure: ['Configure PostgreSQL database.', 'Add Redis caching layer.', 'Run load test.', 'Observe p95 latency drop from 145ms to 4.2ms.'],
        observationTable: {
          headers: ['Metric', 'Direct DB Query', 'Redis Cached', 'Improvement'],
          sampleRows: [
            ['Avg Latency', '142.5 ms', '3.8 ms', '37.5× faster'],
            ['Requests / sec', '680 req/s', '14,200 req/s', '20.8× higher capacity']
          ]
        },
        calculationFormula: 'Speedup = T_direct / T_cached',
        expectedOutcome: 'High throughput distributed microservice.',
        vivaQuestions: ['How do you resolve cache stampede when high-traffic keys expire?']
      }
    ],
    exams: [
      {
        id: 'cs-e1',
        title: 'University Semester Exam: Design and Analysis of Algorithms',
        paperCode: 'CSC 311',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Show all recurrence trees and Big-O proofs.'],
        questions: [
          {
            id: 'cs-q1',
            questionNumber: 1,
            questionText: 'Solve recurrence T(n) = 2T(n/2) + n using Master Theorem. [5 marks]',
            marks: 5,
            sampleAnswer: 'a=2, b=2, f(n)=n. log_b(a) = log₂(2) = 1. Since f(n) = Θ(n^1), this is Case 2. T(n) = Θ(n log n). Represents MergeSort.',
            markingScheme: ['Parameters identification (1 mark)', 'Critical exponent (1 mark)', 'Case 2 application (1 mark)', 'Final tight bound Θ(n log n) (2 marks)']
          }
        ]
      }
    ]
  },

  // 8. DATA SCIENCE & ARTIFICIAL INTELLIGENCE (BSc)
  {
    id: 'uni-datascience',
    name: 'BSc. Data Science & Artificial Intelligence',
    code: 'BSc DS & AI / CUE Level 8',
    level: 'university',
    category: 'Computing & Tech',
    badge: 'KUCCPS Emerging Tech',
    description: 'Degree training in machine learning (supervised, unsupervised, reinforcement), deep learning neural networks, natural language processing, computer vision, and big data pipelines.',
    topics: [
      {
        id: 'ds-t1',
        title: 'Supervised Learning: Gradient Descent & Deep Neural Networks',
        formOrYear: 'Year 3',
        subtopics: [
          'Cost functions: Mean Squared Error (MSE), Binary Cross-Entropy (BCE)',
          'Stochastic Gradient Descent (SGD) and Adam optimizer mathematics',
          'Backpropagation algorithm using matrix calculus and the chain rule',
          'Overfitting mitigation: Dropout, L1/L2 regularization, and early stopping'
        ],
        theoryOverview: 'Supervised learning maps inputs X to targets y by minimizing loss J(w, b). Gradient descent iteratively updates weights in the negative gradient direction: w := w - α · ∇_w J. In deep networks, backpropagation propagates output error backwards through layers via the chain rule.',
        keyFormulas: [
          'Gradient Update: w := w - α · (∂J / ∂w)',
          'Sigmoid Activation: σ(z) = 1 / (1 + e^(-z))',
          'Softmax: P(y=c|x) = e^(z_c) / Σ e^(z_k)'
        ],
        kenyanApplication: 'Credit scoring models in digital lending apps (Tala, Fuliza) and crop disease detection from smartphone photos for smallholder Kenyan farmers.',
        examTips: 'Differentiate vanishing gradient problem in deep Sigmoid networks from dying ReLU problem.'
      }
    ],
    practicals: [
      {
        id: 'ds-p1',
        title: 'Building a Convolutional Neural Network (CNN) for Coffee Leaf Rust Image Classification',
        objectives: [
          'Train a transfer learning model (ResNet-50) on 5,000 Kenyan coffee leaf images',
          'Plot training/validation loss curves and generate confusion matrix with F1-score'
        ],
        apparatus: ['Python 3.11 environment', 'PyTorch / TensorFlow', 'NVIDIA GPU accelerator', 'Jupyter Lab'],
        safetyHazards: ['None'],
        procedure: [
          'Load dataset and apply data augmentation (random rotation, flips, color jitter).',
          'Freeze convolutional feature extraction layers and train dense classifier head.',
          'Fine-tune top layers with learning rate 1e-4.',
          'Evaluate on held-out test split: compute Precision, Recall, and ROC-AUC curve.'
        ],
        observationTable: {
          headers: ['Model Variant', 'Training Accuracy', 'Test Accuracy', 'F1-Score', 'Inference Latency'],
          sampleRows: [
            ['Baseline Logistic', '74.2%', '71.0%', '0.70', '1.2 ms'],
            ['Custom 4-Layer CNN', '88.5%', '84.8%', '0.84', '8.5 ms'],
            ['ResNet-50 Transfer', '97.8%', '95.6%', '0.96', '14.2 ms (Optimal)']
          ]
        },
        calculationFormula: 'F1 = 2 × (Precision × Recall) / (Precision + Recall)',
        expectedOutcome: 'High-accuracy computer vision model ready for mobile deployment.',
        vivaQuestions: ['Why is accuracy an inappropriate evaluation metric for highly imbalanced medical datasets?']
      }
    ],
    exams: [
      {
        id: 'ds-e1',
        title: 'University Final Exam: Machine Learning & Statistical Pattern Recognition',
        paperCode: 'DSA 301',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Answer all questions. Show mathematical derivations.'],
        questions: [
          {
            id: 'ds-q1',
            questionNumber: 1,
            questionText: 'Derive the gradient update rule for a single-neuron logistic regression model with binary cross-entropy loss J(w) = - [y · log(a) + (1 - y) · log(1 - a)] where a = σ(w^T x + b). [10 marks]',
            marks: 10,
            sampleAnswer: 'Let z = w^T x + b, and a = σ(z) = 1 / (1 + e^(-z)).\n\nStep 1: Derivative of Sigmoid with respect to z:\n∂a/∂z = a · (1 - a).\n\nStep 2: Derivative of Loss J with respect to a:\n∂J/∂a = - [y/a - (1 - y)/(1 - a)] = - [y(1 - a) - a(1 - y)] / [a(1 - a)] = - [y - a] / [a(1 - a)] = (a - y) / [a(1 - a)].\n\nStep 3: Chain rule for ∂J/∂z:\n∂J/∂z = (∂J/∂a) · (∂a/∂z) = [(a - y) / (a(1 - a))] · [a(1 - a)] = a - y.\n\nStep 4: Chain rule for ∂J/∂w_j:\nSince ∂z/∂w_j = x_j:\n∂J/∂w_j = (∂J/∂z) · (∂z/∂w_j) = (a - y) · x_j.\n\nStep 5: Gradient update equation:\nw_j := w_j - α · (a - y) · x_j, where α is learning rate.',
            markingScheme: [
              'Correct derivation of Sigmoid derivative da/dz = a(1-a) (3 marks)',
              'Chain rule application dJ/dz = a - y (4 marks)',
              'Final gradient update equation with learning rate (3 marks)'
            ]
          }
        ]
      }
    ]
  },

  // 9. LAW (LLB)
  {
    id: 'uni-law',
    name: 'Bachelor of Laws (LLB)',
    code: 'LLB / CUE Level 8',
    level: 'university',
    category: 'Law & Governance',
    badge: 'KUCCPS Law',
    description: 'Kenyan legal training: Constitutional Law 2010, Law of Torts, Criminal Procedure, Evidence, Moot Court advocacy, and civil litigation.',
    topics: [
      {
        id: 'law-t1',
        title: 'Kenyan Constitutional Law & Judicial Review',
        formOrYear: 'Year 2',
        subtopics: [
          'Sovereignty of the People and Supremacy of Constitution 2010 (Article 1 & 2)',
          'Bill of Rights (Chapter 4) and limitations under Article 24',
          'Devolution and separation of powers',
          'Grounds for Judicial Review: Illegality, Irrationality, Procedural Impropriety'
        ],
        theoryOverview: 'The Constitution of Kenya 2010 is the supreme law. Judicial review grounds stem from CCSU case: Illegality (ultra vires), Irrationality (Wednesbury unreasonableness), and Procedural Impropriety.',
        keyFormulas: ['Article 22 & 258: Locus standi (any person has right to institute court proceedings).'],
        kenyanApplication: 'Landmark Supreme Court rulings on Presidential election petitions and BBI unconstitutionality.',
        examTips: 'Always cite authoritative Kenyan case law (e.g. Francis Karioki Muruatetu & Another v Republic on mandatory death penalty).'
      }
    ],
    practicals: [
      {
        id: 'law-p1',
        title: 'Moot Court Trial Simulation: Constitutional Petition Oral Advocacy',
        objectives: ['Draft formal Petition and Supporting Affidavit and present 15-min oral arguments before a 3-judge bench'],
        apparatus: ['Moot Courtroom Bench', 'Kenyan Law Reports (eKLR)', 'Advocate\'s Gown'],
        safetyHazards: ['Strict adherence to judicial decorum.'],
        procedure: ['File petition.', 'Serve Attorney General.', 'File written submissions.', 'Oral presentation before bench.'],
        observationTable: {
          headers: ['Advocacy Rubric', 'Max Marks', 'Scored'],
          sampleRows: [
            ['Knowledge of Law & Cases', '30', '28'],
            ['Courtroom Demeanour', '25', '23']
          ]
        },
        calculationFormula: 'Final Score = Sum / 100',
        expectedOutcome: 'Persuasive advocacy resulting in declaratory relief.',
        vivaQuestions: ['What is the test for granting an interlocutory injunction in Giella v Cassman Brown?']
      }
    ],
    exams: [
      {
        id: 'law-e1',
        title: 'University Final Examination: Law of Torts',
        paperCode: 'LAW 203',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Support answers with case law.'],
        questions: [
          {
            id: 'law-q1',
            questionNumber: 1,
            questionText: 'Analyze essential elements to establish liability in the tort of negligence under Kenyan jurisprudence. [10 marks]',
            marks: 10,
            sampleAnswer: '1. Duty of care (Donoghue v Stevenson neighbour principle, Caparo test). 2. Breach of duty (Blyth v Birmingham reasonable man standard). 3. Resultant damage & causation (Barnett but-for test and Wagon Mound remoteness).',
            markingScheme: ['Three elements identified (2 marks)', 'Duty of care analysis (3 marks)', 'Breach standard (2 marks)', 'Causation & remoteness (3 marks)']
          }
        ]
      }
    ]
  },

  // 10. ECONOMICS & FINANCE
  {
    id: 'uni-economics',
    name: 'BSc. Economics, Finance & Statistics',
    code: 'BSc Econ / CUE Level 8',
    level: 'university',
    category: 'Economics & Commerce',
    badge: 'KUCCPS Business',
    description: 'Microeconomics, macroeconomics, econometrics, Central Bank of Kenya (CBK) monetary policy, and financial valuation.',
    simulationType: 'economics',
    topics: [
      {
        id: 'econ-t1',
        title: 'Macroeconomic Equilibrium & Central Bank Monetary Policy',
        formOrYear: 'Year 2',
        subtopics: [
          'IS-LM Model and aggregate demand derivation',
          'Central Bank of Kenya (CBK) policy rate (CBR) and interest transmission',
          'Inflation targeting, CPI, and exchange rate dynamics (KES/USD)',
          'Fiscal deficit and public debt sustainability'
        ],
        theoryOverview: 'IS curve: goods market equilibrium (Y = C + I + G + NX). LM curve: money market equilibrium (M/P = L(Y, r)). When CBK raises policy rate, borrowing costs rise and inflation slows.',
        keyFormulas: ['M · V = P · Y (Quantity Theory of Money)', 'r = i - π (Fisher Equation)'],
        kenyanApplication: 'Monetary Policy Committee (MPC) meetings at Central Bank of Kenya adjusting CBR.',
        examTips: 'Differentiate real interest rate from nominal interest rate.'
      }
    ],
    practicals: [
      {
        id: 'econ-p1',
        title: 'Econometric Modeling of Kenya\'s Inflation using Time Series Data',
        objectives: ['Construct OLS regression linking inflation to money supply M3 and oil prices in Kenya'],
        apparatus: ['Statistical software', 'KNBS Data'],
        safetyHazards: ['None'],
        procedure: ['Load quarterly KNBS inflation data.', 'Test unit roots.', 'Run regression.', 'Evaluate R² and p-values.'],
        observationTable: {
          headers: ['Variable', 'Coefficient', 'p-value', 'Significance'],
          sampleRows: [
            ['Log(M3 Money)', '0.78', '0.0001', 'p < 0.001'],
            ['Crude Oil Price', '0.045', '0.0005', 'p < 0.001']
          ]
        },
        calculationFormula: 'R² = SSR / SST',
        expectedOutcome: 'Statistical validation of quantity theory in Kenya.',
        vivaQuestions: ['What are the consequences of heteroskedasticity in OLS?']
      }
    ],
    exams: [
      {
        id: 'econ-e1',
        title: 'University Final Exam: Advanced Macroeconomic Theory',
        paperCode: 'ECO 301',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Answer Question 1 and two others.'],
        questions: [
          {
            id: 'econ-q1',
            questionNumber: 1,
            questionText: 'Explain the economic impact of an expansionary fiscal policy using IS-LM and the crowding-out effect. [10 marks]',
            marks: 10,
            sampleAnswer: 'Expansionary fiscal policy shifts IS rightwards. Higher output raises money demand, increasing interest rates. Higher interest rates reduce private investment expenditure (crowding out).',
            markingScheme: ['IS-LM shift explanation (3 marks)', 'Money market mechanism (3 marks)', 'Crowding-out definition (4 marks)']
          }
        ]
      }
    ]
  },

  // 11. BACHELOR OF COMMERCE (BCom)
  {
    id: 'uni-bcom',
    name: 'Bachelor of Commerce (BCom)',
    code: 'BCom / CUE Level 8',
    level: 'university',
    category: 'Economics & Commerce',
    badge: 'KUCCPS Business',
    description: 'Kenyan commerce degree (UoN, Strathmore, Kenyatta University): Financial Accounting, Management Accounting, Corporate Finance, Auditing & Assurance, and Marketing Management.',
    topics: [
      {
        id: 'bcom-t1',
        title: 'Corporate Financial Management: Capital Budgeting & Cost of Capital (WACC)',
        formOrYear: 'Year 3',
        subtopics: [
          'Discounted Cash Flow (DCF) techniques: Net Present Value (NPV), Internal Rate of Return (IRR)',
          'Weighted Average Cost of Capital (WACC) and tax-shield on debt',
          'Capital Asset Pricing Model (CAPM): E(R_i) = R_f + β_i · [E(R_m) - R_f]',
          'Working capital optimization: Cash conversion cycle and economic order quantity (EOQ)'
        ],
        theoryOverview: 'Capital budgeting evaluates long-term investment projects. A project is acceptable if NPV > 0. WACC represents the hurdle rate: WACC = (E/V)·r_e + (D/V)·r_d·(1 - T_c), accounting for interest tax deductibility under the Kenyan Income Tax Act.',
        keyFormulas: [
          'NPV = Σ [CF_t / (1 + r)^t] - Initial Outlay',
          'CAPM: r_e = R_f + β · (R_m - R_f)',
          'WACC = w_e · r_e + w_d · r_d · (1 - T)'
        ],
        kenyanApplication: 'Capital expenditure decisions on Nairobi Securities Exchange (NSE) listed companies like Safaricom and EABL.',
        examTips: 'When NPV and IRR conflict for mutually exclusive projects, always choose the project with the higher positive NPV.'
      }
    ],
    practicals: [
      {
        id: 'bcom-p1',
        title: 'Corporate Valuation & Financial Statement Ratio Analysis on NSE-Listed Equities',
        objectives: [
          'Calculate Liquidity, Leverage, Activity, and Profitability ratios for an NSE corporate entity',
          'Build a Discounted Cash Flow (DCF) financial model forecasting 5-year free cash flows'
        ],
        apparatus: ['Audited Annual Financial Reports (NSE)', 'Spreadsheet Modeling Software'],
        safetyHazards: ['None'],
        procedure: [
          'Extract Balance Sheet, Income Statement, and Cash Flow statement figures.',
          'Compute Current Ratio, Quick Ratio, Debt-to-Equity, Return on Equity (ROE), and P/E ratio.',
          'Forecast Free Cash Flow to Firm (FCFF) and discount using calculated WACC.'
        ],
        observationTable: {
          headers: ['Financial Ratio', 'Formula', 'Computed Value', 'Industry Benchmark'],
          sampleRows: [
            ['Current Ratio', 'Current Assets / Current Liab', '1.85', '1.50 - 2.00 (Healthy)'],
            ['Debt-to-Equity', 'Total Debt / Total Equity', '0.45', '< 0.60 (Conservative)'],
            ['Return on Equity (ROE)', 'Net Income / Equity', '22.4%', '15.0% (Superior)']
          ]
        },
        calculationFormula: 'Enterprise Value = Present Value of FCFF + PV of Terminal Value',
        expectedOutcome: 'Accurate intrinsic equity valuation.',
        vivaQuestions: ['What are the limitations of using historical Price-to-Earnings (P/E) ratios for growth stocks?']
      }
    ],
    exams: [
      {
        id: 'bcom-e1',
        title: 'University Final Examination: Corporate Financial Management',
        paperCode: 'BCM 302',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Answer Question 1 and any other two questions.'],
        questions: [
          {
            id: 'bcom-q1',
            questionNumber: 1,
            questionText: 'A Kenyan firm has a capital structure comprising 60% equity and 40% debt. The risk-free rate on Kenya 91-day Treasury Bills is 12%, market risk premium is 6%, and the firm\'s equity beta is 1.25. The pre-tax cost of debt is 15% and corporate tax rate is 30%. Calculate the firm\'s Weighted Average Cost of Capital (WACC). [8 marks]',
            marks: 8,
            sampleAnswer: 'Step 1: Calculate Cost of Equity using CAPM:\nr_e = R_f + β · (Market Risk Premium) = 12% + 1.25 · (6%) = 12% + 7.5% = 19.5%.\n\nStep 2: Calculate After-Tax Cost of Debt:\nr_d(after-tax) = r_d · (1 - T) = 15% · (1 - 0.30) = 15% · 0.70 = 10.5%.\n\nStep 3: Calculate WACC:\nWACC = (w_e · r_e) + (w_d · r_d(after-tax)) = (0.60 · 19.5%) + (0.40 · 10.5%) = 11.7% + 4.2% = 15.9%.',
            markingScheme: [
              'Correct Cost of Equity calculation r_e = 19.5% (3 marks)',
              'Correct after-tax cost of debt r_d = 10.5% (2 marks)',
              'Correct WACC = 15.9% with formula substitution (3 marks)'
            ]
          }
        ]
      }
    ]
  },

  // 12. AGRIBUSINESS MANAGEMENT & AGRICULTURAL ECONOMICS
  {
    id: 'uni-agribusiness',
    name: 'BSc. Agribusiness Management & Agricultural Economics',
    code: 'BSc Agribiz / CUE Level 8',
    level: 'university',
    category: 'Economics & Commerce',
    badge: 'KUCCPS Agriculture',
    description: 'Degree training in agricultural supply chains, farm management economics, horticultural export logistics, commodities marketing, and food security policy in Kenya.',
    topics: [
      {
        id: 'agri-econ-t1',
        title: 'Agricultural Production Economics: Production Functions & Resource Allocation',
        formOrYear: 'Year 2',
        subtopics: [
          'Classical Production Function: Stages I, II, and III of production',
          'Law of Diminishing Marginal Returns in agricultural input application (fertilizer, labor)',
          'Marginal Physical Product (MPP), Average Physical Product (APP), and Elasticity of Production',
          'Economic optimum input level: Marginal Value Product (MVP) = Marginal Input Cost (MIC)'
        ],
        theoryOverview: 'Agricultural production economics analyzes the optimal allocation of scarce resources (land, capital, labor, inputs) to maximize net farm profits. Rational production occurs strictly in Stage II, bounded by maximum APP (elasticity E_p = 1) and zero MPP (elasticity E_p = 0).',
        keyFormulas: [
          'Profit Maximizing Condition: MVP = P_y · MPP = P_x (Input Price)',
          'Elasticity of Production: E_p = MPP / APP',
          'Least Cost Combination: MPP_x1 / P_x1 = MPP_x2 / P_x2'
        ],
        kenyanApplication: 'Fertilizer subsidy program optimization by the Ministry of Agriculture in Uasin Gishu maize basket.',
        examTips: 'Explain why a farmer should never operate in Stage III: marginal physical product is negative, meaning additional inputs reduce total output.'
      }
    ],
    practicals: [
      {
        id: 'agri-econ-p1',
        title: 'Farm Budgeting & Cash Flow Projection for a 5-Acre French Beans Export Venture',
        objectives: [
          'Prepare enterprise budgets distinguishing variable costs from fixed overheads',
          'Calculate Gross Margin per acre and Break-even price per kilogram for export harvest'
        ],
        apparatus: ['Spreadsheet farm budget templates', 'Horticultural Crops Directorate (HCD) price logs'],
        safetyHazards: ['None'],
        procedure: [
          'Itemize seed, certified chemical, drip irrigation, and labor costs.',
          'Forecast harvest yield: 6,000 kg per acre.',
          'Compute Gross Margin = Gross Farm Income - Total Variable Costs.'
        ],
        observationTable: {
          headers: ['Enterprise Item', 'Unit Cost (KES)', 'Total Cost (KES)', '% of Budget'],
          sampleRows: [
            ['Certified Seed & Inoculant', '18,000 / acre', '90,000', '15%'],
            ['Drip Irrigation & Pumping', '25,000 / acre', '125,000', '21%'],
            ['Harvesting & Cold-Chain Logistics', '30,000 / acre', '150,000', '25%']
          ]
        },
        calculationFormula: 'Break-even Price = Total Costs / Expected Yield in Kg',
        expectedOutcome: 'Bankable agricultural enterprise proposal.',
        vivaQuestions: ['What is the difference between complete farm budgeting and partial budgeting?']
      }
    ],
    exams: [
      {
        id: 'agri-econ-e1',
        title: 'University Final Exam: Farm Management & Agricultural Marketing',
        paperCode: 'AGB 310',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Answer Question 1 and any other two questions.'],
        questions: [
          {
            id: 'agri-econ-q1',
            questionNumber: 1,
            questionText: 'Given the production function Y = 40X + 8X² - X³, where Y is maize yield in bags and X is fertilizer input in bags. (a) Derive expressions for MPP and APP [4 marks], (b) Determine the input level X that maximizes total yield [3 marks], (c) Determine the boundary input level between Stage I and Stage II of production [3 marks].',
            marks: 10,
            sampleAnswer: '(a) Total Product Y = 40X + 8X² - X³.\nMarginal Physical Product MPP = dY/dX = 40 + 16X - 3X².\nAverage Physical Product APP = Y/X = 40 + 8X - X².\n\n(b) Total yield is maximized where MPP = 0:\n40 + 16X - 3X² = 0 => 3X² - 16X - 40 = 0.\nUsing quadratic formula: X = [16 ± √(16² - 4·3·(-40))] / (2·3) = [16 ± √(256 + 480)] / 6 = [16 ± √736] / 6 = [16 + 27.13] / 6 = 43.13 / 6 = 7.19 bags of fertilizer.\n\n(c) Boundary between Stage I and Stage II occurs where APP is maximized, which is also where MPP = APP:\n40 + 16X - 3X² = 40 + 8X - X²\n8X - 2X² = 0 => 2X(4 - X) = 0 => X = 4 bags of fertilizer.',
            markingScheme: [
              'Correct derivation of MPP and APP (4 marks)',
              'Calculation of maximum output input level X = 7.19 bags (3 marks)',
              'Calculation of boundary input level X = 4 bags where MPP = APP (3 marks)'
            ]
          }
        ]
      }
    ]
  },

  // 13. BACHELOR OF EDUCATION (SCIENCE & ARTS - B.Ed)
  {
    id: 'uni-education',
    name: 'Bachelor of Education (Science & Arts - B.Ed)',
    code: 'B.Ed / CUE Level 8',
    level: 'university',
    category: 'Education & Pedagogy',
    badge: 'KUCCPS Teachers Service Commission (TSC)',
    description: 'Degree training in educational psychology, curriculum design (KICD Competency-Based Curriculum CBC), pedagogical methodologies, assessment & measurement, and micro-teaching practicum.',
    topics: [
      {
        id: 'edu-t1',
        title: 'Curriculum Development & KICD Competency-Based Curriculum (CBC) Implementation',
        formOrYear: 'Year 2',
        subtopics: [
          'Curriculum designs: Subject-centered vs Learner-centered Competency models',
          'The 7 Core Competencies of Kenya Basic Education Curriculum Framework (BECF)',
          'Formative Assessment: Portfolios, Learner profiles, and Authenticated Rubrics',
          'Constructivism (Piaget, Vygotsky) and Inquiry-Based Learning in Kenyan classrooms'
        ],
        theoryOverview: 'Kenya transitioned from the knowledge-transmission 8-4-4 system to the Competency-Based Curriculum (CBC 2-6-3-3-3), prioritizing what learners can do. The 7 core competencies are: Communication and Collaboration, Critical Thinking and Problem Solving, Imagination and Creativity, Citizenship, Learning to Learn, Self-efficacy, and Digital Literacy.',
        keyFormulas: [
          'CBC Performance Levels: 4 = Exceeding Expectations (EE), 3 = Meeting Expectations (ME), 2 = Approaching Expectations (AE), 1 = Below Expectations (BE)'
        ],
        kenyanApplication: 'Instructional design in Senior Schools under the Kenya Institute of Curriculum Development (KICD) and Teachers Service Commission (TSC) appraisals.',
        examTips: 'Distinguish norm-referenced testing (ranking students against each other) from criterion-referenced assessment (evaluating students against defined mastery rubrics).'
      }
    ],
    practicals: [
      {
        id: 'edu-p1',
        title: 'Micro-Teaching Practicum: Formative Assessment Rubric & 40-Minute Lesson Plan Design',
        objectives: [
          'Design a 40-minute CBC-aligned lesson plan with specific learning outcomes',
          'Conduct a 15-minute simulated peer micro-teaching session demonstrating set induction and questioning skills'
        ],
        apparatus: ['Teacher\'s lesson plan template', 'KICD Curriculum Design booklet', 'Micro-teaching recording camera'],
        safetyHazards: ['None'],
        procedure: [
          'Define Strand, Sub-strand, and 3 measurable learning outcomes.',
          'Structure lesson into: Introduction/Set Induction (5 min), Lesson Development with Learner Activities (25 min), Conclusion/Formative Check (10 min).',
          'Develop 4-level rubric assessing performance from Below Expectations to Exceeding Expectations.'
        ],
        observationTable: {
          headers: ['Teaching Skill', 'Indicator', 'Peer Score (1-5)', 'Supervisor Comments'],
          sampleRows: [
            ['Set Induction', 'Captivating hook linked to prior knowledge', '5 / 5', 'Excellent real-world Kenyan hook'],
            ['Questioning Technique', 'Probing and distributing open-ended questions', '4 / 5', 'Allowed adequate wait-time'],
            ['Formative Feedback', 'Constructive verbal reinforcement', '5 / 5', 'Empowering learner engagement']
          ]
        },
        calculationFormula: 'Teaching Score = Lesson Design (30) + Delivery (50) + Rubric Assessment (20) = / 100',
        expectedOutcome: 'Professional teaching competency aligned with TSC requirements.',
        vivaQuestions: ['How does Bloom\'s Revised Taxonomy guide the formulation of cognitive learning objectives?']
      }
    ],
    exams: [
      {
        id: 'edu-e1',
        title: 'University Professional Examination: Curriculum Development & Instruction',
        paperCode: 'EDF 311',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Answer Question 1 and any other two questions.'],
        questions: [
          {
            id: 'edu-q1',
            questionNumber: 1,
            questionText: 'Analyze the four fundamental stages of Ralph Tyler\'s Curriculum Development Model and explain how each stage was addressed in Kenya\'s transition to the Competency-Based Curriculum (CBC). [10 marks]',
            marks: 10,
            sampleAnswer: 'Ralph Tyler\'s 1949 Curriculum Model proposes four essential questions:\n1. Defining Educational Objectives: Identifying what educational goals schools seek to attain. In Kenya\'s CBC, KICD formulated 7 core competencies aligned with Kenya Vision 2030 and national values.\n2. Selecting Learning Experiences: Determining educational experiences likely to attain objectives. CBC introduced inquiry-based learning, practical projects, community service learning, and digital interactive tasks.\n3. Organizing Learning Experiences: Sequencing experiences for cumulative effect. CBC organized basic education into 3 tiers: Early Years, Middle School, and Senior School pathways (STEM, Arts/Sports, Social Sciences).\n4. Evaluating Outcomes: Assessing whether educational purposes are achieved. CBC shifted from high-stakes single-terminal exams (KCPE) to continuous formative assessment rubrics, portfolios, and KPSEA assessments.',
            markingScheme: [
              'Clear identification of Tyler\'s 4 stages (4 marks)',
              'Comprehensive application of each stage to Kenya CBC reform (6 marks)'
            ]
          }
        ]
      }
    ]
  },

  // 14. ARCHITECTURE & BUILDING SCIENCES (B.Arch)
  {
    id: 'uni-architecture',
    name: 'Bachelor of Architectural Studies & Architecture (B.Arch)',
    code: 'B.Arch / CUE Level 8',
    level: 'university',
    category: 'Engineering',
    badge: 'KUCCPS Board of Registration of Architects (BORAQS)',
    description: 'Degree training in sustainable tropical architecture, building construction technology, environmental passive cooling, urban planning, and BORAQS professional practice in Kenya.',
    topics: [
      {
        id: 'arch-t1',
        title: 'Passive Climate-Responsive Design in Tropical Equatorial Climates',
        formOrYear: 'Year 3',
        subtopics: [
          'Solar geometry, sun path diagrams, and solar shading (brise-soleil design)',
          'Natural cross-ventilation and stack effect in tropical high-rise buildings',
          'Thermal mass and building orientation along the East-West axis in Kenya',
          'Green building certification: EDGE and LEED standards in Nairobi'
        ],
        theoryOverview: 'In equatorial Kenya (latitude ~1°S), buildings oriented with long axes facing North-South minimize direct low-angle morning and afternoon solar heat gain. Natural cross-ventilation relies on Bernoulli\'s principle and stack effect (warm air rises through atria and exhausts through roof monitors).',
        keyFormulas: [
          'Solar Heat Gain Coefficient: SHGC ≤ 0.25 for tropical glazing',
          'Airflow Rate: Q = C_d · A · √(2 · g · H · (T_in - T_out) / T_in)'
        ],
        kenyanApplication: 'Bioclimatic design of the UNEP Headquarters in Gigiri and Strathmore University net-zero energy building in Nairobi.',
        examTips: 'Always orient primary glazed facades North and South, and place service cores (staircases, elevators, toilets) on the East and West facades to serve as thermal buffers.'
      }
    ],
    practicals: [
      {
        id: 'arch-p1',
        title: 'Architectural Studio: Heliodon Solar Shadow Modeling & Physical Scale Mockup',
        objectives: [
          'Construct a 1:100 architectural model and test solar shading effectiveness on a heliodon table simulating Nairobi sun angles at June solstice and December equinox'
        ],
        apparatus: ['Heliodon solar table', '1:100 chipboard scale model', 'Light meter (lux)'],
        safetyHazards: ['Model-making blade safety.'],
        procedure: [
          'Set heliodon latitude to 1.29° S (Nairobi).',
          'Simulate solar azimuth and altitude for 09:00, 12:00, and 15:00 hours.',
          'Verify that window overhangs provide 100% shade to glazing during peak thermal hours (10:00 to 14:00).'
        ],
        observationTable: {
          headers: ['Time of Day', 'Solar Altitude', 'Overhang Shading Depth', 'Interior Glare Index'],
          sampleRows: [
            ['09:00', '42° East', '85% shaded', 'Low glare'],
            ['12:00', '88° Overhead', '100% full shadow', 'Zero direct penetration'],
            ['15:00', '44° West', '80% shaded', 'Moderate (Louvres engaged)']
          ]
        },
        calculationFormula: 'Overhang Projection D = Window Height / tan(Solar Cutoff Angle)',
        expectedOutcome: 'Thermally comfortable, energy-efficient building envelope.',
        vivaQuestions: ['How does thermal lag in thick stone walls benefit buildings in hot-dry northern Kenya?']
      }
    ],
    exams: [
      {
        id: 'arch-e1',
        title: 'University Professional Examination: Environmental Science & Building Services',
        paperCode: 'BAR 312',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Illustrate answers with clear architectural sketches and sun-path diagrams.'],
        questions: [
          {
            id: 'arch-q1',
            questionNumber: 1,
            questionText: 'Explain four architectural design strategies employed to achieve thermal comfort without mechanical air conditioning in Nairobi\'s warm temperate climate. [10 marks]',
            marks: 10,
            sampleAnswer: '1. Building Orientation: Align long facades along the East-West axis so broad walls face North and South, drastically reducing solar irradiance on building envelope.\n2. Fenestration & Shading: Sizing window openings to 20-30% of wall area and incorporating horizontal overhangs on North/South elevations and vertical louvres on East/West to block direct solar radiation.\n3. Cross-Ventilation: Locating operable windows on opposing pressure zones (windward and leeward) with unobstructed interior pathways to maximize natural air velocity and convective skin cooling.\n4. High Thermal Mass: Utilizing local masonry stone (quarried Nairobi trachyte/phonolite) which absorbs heat during daytime peaks and releases it during cooler nighttime hours, moderating indoor temperatures.',
            markingScheme: [
              'Building orientation along East-West axis (2.5 marks)',
              'Appropriate shading and fenestration design (2.5 marks)',
              'Natural cross-ventilation principles (2.5 marks)',
              'Thermal mass and material selection (2.5 marks)'
            ]
          }
        ]
      }
    ]
  },

  // 15. ENVIRONMENTAL SCIENCE & NATURAL RESOURCES
  {
    id: 'uni-environment',
    name: 'BSc. Environmental Science & Natural Resource Management',
    code: 'BSc Env / CUE Level 8',
    level: 'university',
    category: 'Applied & Technical',
    badge: 'KUCCPS NEMA Kenya Certified',
    description: 'Degree training in ecology, Environmental Impact Assessment (EIA) & Environmental Audit (EA) regulations under NEMA Kenya, climate change adaptation, and GIS natural resource mapping.',
    topics: [
      {
        id: 'env-t1',
        title: 'Environmental Impact Assessment (EIA) & NEMA Regulatory Framework',
        formOrYear: 'Year 3',
        subtopics: [
          'Environmental Management and Coordination Act (EMCA 1999, Amended 2015)',
          'EIA Project Report vs Comprehensive Environmental Impact Study (ESIA)',
          'Public consultation and participation processes under Article 69 of Constitution',
          'Environmental Management Plans (EMP) and post-construction monitoring audits'
        ],
        theoryOverview: 'EIA is a statutory decision-making tool identifying environmental, social, and economic consequences of proposed infrastructure projects prior to authorization. Under Kenya\'s NEMA regulations, projects listed in the Second Schedule of EMCA (dams, highways, factories) cannot commence without an EIA license.',
        keyFormulas: [
          'Leopold Matrix: Magnitude (1 to 10) × Importance (1 to 10) Impact Rating'
        ],
        kenyanApplication: 'NEMA environmental licensing of the Konza Technopolis smart city, Lamu Port infrastructure, and SGR wildlife crossing corridors.',
        examTips: 'Distinguish between mitigation by avoidance (re-routing project) and mitigation by compensation (biodiversity offsets).'
      }
    ],
    practicals: [
      {
        id: 'env-p1',
        title: 'NEMA Environmental Impact Assessment: Project Report Drafting & Baseline Water Quality Audit',
        objectives: [
          'Conduct baseline physico-chemical water analysis (BOD, COD, Turbidity, E. coli) on a river receiving effluent',
          'Compile an Environmental Management and Monitoring Plan (EMMP) with costed mitigation measures'
        ],
        apparatus: ['Multiparameter water quality probe (pH, DO, Conductivity)', 'BOD incubation bottles', 'Turbidimeter'],
        safetyHazards: ['Biohazard precautions when handling contaminated effluent river water.'],
        procedure: [
          'Collect water samples upstream (control), at effluent discharge point, and 500m downstream.',
          'Measure Initial Dissolved Oxygen (DO₁) and post-5 day incubated DO₅ at 20°C.',
          'Calculate BOD₅ = DO₁ - DO₅.',
          'Formulate mitigation measures conforming to NEMA Water Quality Regulations 2006.'
        ],
        observationTable: {
          headers: ['Sampling Point', 'pH', 'Dissolved Oxygen (mg/L)', 'BOD₅ (mg/L)', 'NEMA Standard'],
          sampleRows: [
            ['Upstream Control', '7.2', '6.8 mg/L', '4.2 mg/L', 'Permissible (< 30 mg/L)'],
            ['Discharge Point', '5.4', '1.2 mg/L', '88.0 mg/L', 'Violation (Severe Hypoxia)'],
            ['500m Downstream', '6.6', '4.5 mg/L', '22.0 mg/L', 'Recovering Natural Stream']
          ]
        },
        calculationFormula: 'BOD₅ = (DO_initial - DO_day5) × Dilution Factor',
        expectedOutcome: 'Professional EIA audit report suitable for NEMA statutory gazettement.',
        vivaQuestions: ['What constitutes a strategic environmental assessment (SEA) compared to an project-specific EIA?']
      }
    ],
    exams: [
      {
        id: 'env-e1',
        title: 'University Professional Examination: Environmental Law & Impact Assessment',
        paperCode: 'ENV 320',
        durationMinutes: 180,
        totalMarks: 100,
        instructions: ['Answer Question 1 and any other two questions.'],
        questions: [
          {
            id: 'env-q1',
            questionNumber: 1,
            questionText: 'Outline the mandatory steps required in Kenya to carry out an Environmental Impact Assessment (EIA) study from project inception to the issuance of a NEMA license. [10 marks]',
            marks: 10,
            sampleAnswer: '1. Screening: Determining whether project requires full EIA under Second Schedule of EMCA.\n2. Scoping & Terms of Reference (ToR): Identifying key issues, baseline studies, and submitting ToR to NEMA for approval.\n3. Baseline Environmental Studies: Gathering empirical data on air, water, flora, fauna, and socio-economic demographics.\n4. Impact Identification & Analysis: Evaluating magnitude and severity using matrix methods.\n5. Consideration of Alternatives: Analyzing zero-option, alternative sites, and cleaner production technologies.\n6. Public Consultation: Publishing notices in Kenya Gazette and two national daily newspapers, and holding public barazas.\n7. Preparation of EIA Study Report & EMMP: Detailing costed mitigation actions, responsibilities, and monitoring indicators.\n8. Submission to NEMA: Paying statutory fee (0.1% of project cost) and public review period (minimum 60 days).\n9. Review and Decision: NEMA technical committee inspects site and grants license with specific operating conditions.',
            markingScheme: [
              'Correct screening and scoping process (2 marks)',
              'Baseline data and impact identification (2 marks)',
              'Public participation requirement under Kenyan law (2 marks)',
              'Environmental Management and Monitoring Plan EMMP (2 marks)',
              'NEMA statutory submission and licensing decision (2 marks)'
            ]
          }
        ]
      }
    ]
  }
];
