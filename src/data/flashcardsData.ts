export interface Flashcard {
  id: string;
  subject: string;
  formOrYear: string;
  topic: string;
  frontPrompt: string;
  backAnswer: string;
  hint?: string;
  knecTrap?: string;
  tags: string[];
}

export const FLASHCARD_DECKS: Flashcard[] = [
  // CHEMISTRY
  {
    id: 'fc-chem-1',
    subject: 'Chemistry',
    formOrYear: 'Form 3',
    topic: 'The Mole Concept & Titration',
    frontPrompt: 'What is the definition of a "Standard Solution" in volumetric analysis?',
    backAnswer: 'A standard solution is a solution whose concentration (molarity) is accurately known and remains stable over time.',
    hint: 'Think of volumetric primary standards like anhydrous Na₂CO₃.',
    knecTrap: 'Do not simply say "a pure solution". You must mention that its concentration is accurately known.',
    tags: ['Titration', 'Mole Concept', 'Definitions']
  },
  {
    id: 'fc-chem-2',
    subject: 'Chemistry',
    formOrYear: 'Form 4',
    topic: 'Electrochemistry',
    frontPrompt: 'State two functions of the Salt Bridge in a Daniell electrochemical cell.',
    backAnswer: '1. It completes the electrical circuit by allowing ion migration between the half-cells.\n2. It maintains electrical neutrality in both half-cell electrolyte solutions.',
    hint: 'Usually prepared using filter paper soaked in saturated KNO₃ or KCl.',
    knecTrap: 'Never say it "conducts electrons"; electrons only flow through the external metal wire, not the salt bridge!',
    tags: ['Electrochemistry', 'Cells', 'Paper 2']
  },
  {
    id: 'fc-chem-3',
    subject: 'Chemistry',
    formOrYear: 'Form 2',
    topic: 'Structure & Bonding',
    frontPrompt: 'Explain why diamond does not conduct electricity while graphite is a good conductor.',
    backAnswer: 'In diamond, all 4 valence electrons of each carbon atom are localized in rigid covalent bonds (sp³). In graphite, each carbon bonds to only 3 others in hexagonal layers (sp²), leaving one delocalized free valence electron per carbon atom free to drift under potential difference.',
    hint: 'Contrast tetrahedral 3D giant structure vs 2D layered sheets with van der Waals forces.',
    knecTrap: 'Always explicitly state the presence of "delocalized electrons" for graphite!',
    tags: ['Bonding', 'Allotropes', 'Form 2']
  },
  {
    id: 'fc-chem-4',
    subject: 'Chemistry',
    formOrYear: 'Form 4',
    topic: 'Qualitative Analysis',
    frontPrompt: 'What happens when excess aqueous ammonia is added to a solution containing Zn²⁺ ions versus Al³⁺ ions?',
    backAnswer: 'Both initially form a white precipitate. With Zn²⁺, the precipitate dissolves in excess NH₃(aq) to form a colorless complex ion [Zn(NH₃)₄]²⁺. With Al³⁺, the white precipitate of Al(OH)₃ remains insoluble in excess ammonia.',
    hint: 'Only Zn²⁺ forms a soluble tetraammine complex in excess ammonia; Pb²⁺ and Al³⁺ remain insoluble.',
    knecTrap: 'Never write "clear solution"; KNEC requires "colourless solution".',
    tags: ['Qualitative Analysis', 'Cations', 'Paper 3']
  },

  // BIOLOGY
  {
    id: 'fc-bio-1',
    subject: 'Biology',
    formOrYear: 'Form 1',
    topic: 'Cell Physiology',
    frontPrompt: 'Define Plasmolysis and state under what osmotic conditions it occurs in plant cells.',
    backAnswer: 'Plasmolysis is the shrinkage of plant cell protoplasm away from the cellulose cell wall due to water loss by osmosis when placed in a hypertonic (more concentrated) solution.',
    hint: 'Contrast with crenation in animal cells (which lack a cell wall).',
    knecTrap: 'The cell wall does NOT shrink; only the cell membrane and cytoplasm pull away from the rigid wall.',
    tags: ['Osmosis', 'Plant Cells', 'Definitions']
  },
  {
    id: 'fc-bio-2',
    subject: 'Biology',
    formOrYear: 'Form 2',
    topic: 'Gaseous Exchange',
    frontPrompt: 'State four structural adaptations of mammalian respiratory alveoli for efficient gas exchange.',
    backAnswer: '1. Highly folded to provide a large surface-area-to-volume ratio.\n2. Moist surface to dissolve respiratory gases (O₂ and CO₂).\n3. Extremely thin epithelial wall (one cell thick) for rapid diffusion distance.\n4. Densely lined with a capillary blood network to maintain a steep concentration gradient.',
    hint: 'Relate directly to Fick’s Law of diffusion.',
    knecTrap: 'Always connect each structural feature to its physiological function (e.g., "thin wall FOR short diffusion distance").',
    tags: ['Lungs', 'Alveoli', 'Adaptations']
  },
  {
    id: 'fc-bio-3',
    subject: 'Biology',
    formOrYear: 'Form 4',
    topic: 'Genetics',
    frontPrompt: 'Distinguish between Continuous and Discontinuous variation, giving one example of each in humans.',
    backAnswer: 'Continuous variation exhibits a gradual transition without distinct classes (quantitative, influenced by genes and environment, e.g. human height, weight, skin color). Discontinuous variation exhibits clear-cut distinct categories with no intermediates (qualitative, purely genetic, e.g. ABO blood groups, tongue rolling, albinism).',
    hint: 'Think bell-shaped curve vs distinct bar chart.',
    knecTrap: 'Blood group is discontinuous, NOT continuous!',
    tags: ['Genetics', 'Variation', 'Mendel']
  },

  // PHYSICS
  {
    id: 'fc-phy-1',
    subject: 'Physics',
    formOrYear: 'Form 3',
    topic: 'Current Electricity II',
    frontPrompt: 'Define "Electromotive Force" (emf) of a cell and distinguish it from "Terminal Voltage" (pd).',
    backAnswer: 'Electromotive Force (emf) is the total work done by a source per unit charge in driving electric charge around a complete circuit (open circuit voltage). Terminal Voltage is the potential difference across the battery terminals when current is flowing through an external load; it is less than emf due to internal resistance "lost volts" (V = E - Ir).',
    hint: 'Work done per unit charge (Joules per Coulomb = Volts).',
    knecTrap: 'Emf is NOT a force in Newtons; it is an energy per unit charge in Volts.',
    tags: ['Electricity', 'Emf', 'Lost Volts']
  },
  {
    id: 'fc-phy-2',
    subject: 'Physics',
    formOrYear: 'Form 3',
    topic: 'Gas Laws',
    frontPrompt: 'State Charles’s Law and specify what temperature scale must be used.',
    backAnswer: 'Charles’s Law states that the volume of a fixed mass of gas is directly proportional to its absolute temperature (in Kelvin), provided pressure remains constant (V₁/T₁ = V₂/T₂).',
    hint: 'Absolute zero is 0 K (-273.15°C).',
    knecTrap: 'You MUST state "absolute temperature" or "temperature in Kelvin". Using degrees Celsius is marked zero by KNEC!',
    tags: ['Gas Laws', 'Thermodynamics', 'Kelvin']
  },
  {
    id: 'fc-phy-3',
    subject: 'Physics',
    formOrYear: 'Form 4',
    topic: 'Photoelectric Effect',
    frontPrompt: 'Define Work Function (W₀) and Threshold Frequency (f₀).',
    backAnswer: 'Work Function (W₀) is the minimum energy required to liberate or eject an electron from the surface of a metal. Threshold Frequency (f₀) is the minimum frequency of incident radiation below which no photoelectric emission occurs, regardless of radiation intensity (W₀ = h·f₀).',
    hint: 'Einsten’s equation: hf = W₀ + ½mv_max².',
    knecTrap: 'Work function is measured in Joules (or eV), while threshold frequency is measured in Hertz (Hz).',
    tags: ['Modern Physics', 'Quantum', 'Einstein']
  },

  // MATHEMATICS
  {
    id: 'fc-math-1',
    subject: 'Mathematics',
    formOrYear: 'Form 4',
    topic: 'Calculus',
    frontPrompt: 'How do you mathematically distinguish whether a stationary point (dy/dx = 0) is a local maximum or a local minimum?',
    backAnswer: 'Calculate the second derivative (d²y/dx²):\n• If d²y/dx² < 0 (negative), the turning point is a local MAXIMUM.\n• If d²y/dx² > 0 (positive), the turning point is a local MINIMUM.\n• If d²y/dx² = 0, test sign changes of dy/dx immediately before and after the point.',
    hint: 'Negative second derivative curves concave downwards like an umbrella (peak).',
    knecTrap: 'Students often invert this! Remember: Negative = Maximum; Positive = Minimum.',
    tags: ['Calculus', 'Derivatives', 'Optimization']
  },
  {
    id: 'fc-math-2',
    subject: 'Mathematics',
    formOrYear: 'Form 3',
    topic: 'Commercial Arithmetic II',
    frontPrompt: 'In Kenyan PAYE income tax calculations, how do you compute Net Tax Payable from Gross Tax?',
    backAnswer: 'Net Tax Payable = Total Gross Tax (calculated from progressive income tax brackets) minus Total Tax Reliefs (Personal relief of KSh 2,400 per month / KSh 28,800 per annum + Insurance relief).',
    hint: 'Reliefs reduce the tax liability, not the taxable income.',
    knecTrap: 'Never subtract tax relief from gross income before applying tax rates! Apply tax rates to taxable income first to get gross tax, then subtract relief.',
    tags: ['Commercial Arithmetic', 'PAYE', 'Taxation']
  },

  // MEDICINE & LAW
  {
    id: 'fc-med-1',
    subject: 'Medicine (MBChB)',
    formOrYear: 'Year 3',
    topic: 'Internal Medicine & Cardiology',
    frontPrompt: 'What is the diagnostic hallmark of an Acute ST-Elevation Myocardial Infarction (STEMI) on a 12-lead ECG?',
    backAnswer: 'New ST-segment elevation at the J-point in two or more contiguous ECG leads (≥ 1 mm in limb leads, or ≥ 1.5–2.5 mm in precordial leads V1–V3), often accompanied by reciprocal ST-segment depression in opposite leads.',
    hint: 'Corresponds to transmural epicardial coronary artery occlusion.',
    knecTrap: 'Must specify that elevation must occur in CONTIGUOUS anatomical leads, not isolated random leads.',
    tags: ['Cardiology', 'ECG', 'Emergency']
  },
  {
    id: 'fc-law-1',
    subject: 'Law (LLB)',
    formOrYear: 'Year 2',
    topic: 'Law of Torts',
    frontPrompt: 'Explain the doctrine of "Res Ipsa Loquitur" and its legal effect in negligence claims.',
    backAnswer: 'Res Ipsa Loquitur ("the thing speaks for itself") applies when an accident is of a kind that does not ordinarily occur without negligence, the instrumentality was under defendant\'s exclusive control, and plaintiff did not contribute. Its effect is to create a rebuttable presumption of negligence, shifting the evidentiary burden to the defendant to explain absence of fault.',
    hint: 'Classic precedent: Byrne v Boadle (barrel falling from warehouse).',
    knecTrap: 'It is a rule of evidence, not an independent substantive tort.',
    tags: ['Torts', 'Negligence', 'Doctrines']
  }
];
