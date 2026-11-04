export interface MadeFamiliarChoice {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface MadeFamiliarQuestion {
  id: string;
  year: number | string;
  paper: string; // e.g. "Paper 1", "Paper 2"
  questionNumber: number | string;
  marks: number;
  questionText: string;
  options: MadeFamiliarChoice[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  solution: string;
  markingBreakdown: string[];
  examinerWarning: string;
  topicClassification: string;
  formLevel: 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4';
}

export interface MadeFamiliarSubject {
  id: string;
  name: string;
  knecCode: string;
  category: 'Sciences' | 'Mathematics' | 'Languages' | 'Humanities' | 'Technical & Applied' | 'Business';
  color: string;
  topicsCount: number;
  totalQuestions: number;
  topics: Array<{
    id: string;
    title: string;
    formLevel: 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4';
    highYieldSummary: string[];
    essentialFormulas?: string[];
    commonExaminerTraps: string[];
    questions: MadeFamiliarQuestion[];
  }>;
}

export const MADE_FAMILIAR_DATABASE: MadeFamiliarSubject[] = [
  // 1. MATHEMATICS (121)
  {
    id: 'mf-math',
    name: 'Mathematics Alternative A',
    knecCode: '121/1 & 121/2',
    category: 'Mathematics',
    color: 'emerald',
    topicsCount: 24,
    totalQuestions: 140,
    topics: [
      {
        id: 'math-calc',
        title: 'Calculus (Differentiation & Integration)',
        formLevel: 'Form 4',
        highYieldSummary: [
          'Differentiation gives the gradient function: if y = axⁿ, then dy/dx = n·axⁿ⁻¹.',
          'Stationary/turning points occur where dy/dx = 0. Use d²y/dx² to test nature (> 0 is minimum, < 0 is maximum).',
          'Integration is the reverse of differentiation: ∫ axⁿ dx = (axⁿ⁺¹)/(n+1) + C (for n ≠ -1).',
          'Area under a curve between x = a and x = b is given by the definite integral ∫ₐᵇ y dx.',
          'Kinematics: Displacement s → Velocity v = ds/dt → Acceleration a = dv/dt = d²s/dt².'
        ],
        essentialFormulas: [
          'dy/dx = n · a · x^(n-1)',
          'Stationary condition: dy/dx = 0',
          'Integration: ∫ x^n dx = (x^(n+1))/(n+1) + c',
          'Definite Area: Area = [F(x)]ₐᵇ = F(b) - F(a)',
          'Velocity: v = ds/dt; Acceleration: a = dv/dt'
        ],
        commonExaminerTraps: [
          'Omitting the constant of integration "+ C" in indefinite integrals (penalized 1 mark).',
          'Calculating area without sketching: if the curve dips below the x-axis, the integral is negative. Area must be evaluated in separate intervals and made positive!',
          'Confusing distance and displacement: distance is the absolute scalar sum, while displacement can be zero if returning to the origin.'
        ],
        questions: [
          {
            id: 'mf-math-q1',
            year: 2024,
            paper: 'Paper 2 (Section II)',
            questionNumber: 19,
            marks: 10,
            formLevel: 'Form 4',
            topicClassification: 'Calculus & Kinematics',
            questionText:
              'A particle moves along a straight line such that its displacement S meters from a fixed point O after t seconds is given by S = ⅓t³ - 3t² + 8t + 5.\n\nWhich of the following gives the velocity of the particle when t = 2 seconds, and the exact times when the particle is momentarily at rest?',
            options: [
              {
                id: 'A',
                text: 'v = 0 m/s; momentarily at rest at t = 2s and t = 4s',
                isCorrect: true,
                explanation:
                  'Correct! Velocity v = dS/dt = t² - 6t + 8. At t = 2, v = 4 - 12 + 8 = 0 m/s. Setting v = 0 gives (t - 2)(t - 4) = 0, so t = 2s and t = 4s.'
              },
              {
                id: 'B',
                text: 'v = 4 m/s; momentarily at rest at t = 3s only',
                isCorrect: false,
                explanation:
                  'Incorrect. This happens if you incorrectly differentiate S or confuse velocity with displacement.'
              },
              {
                id: 'C',
                text: 'v = 0 m/s; momentarily at rest at t = 1s and t = 8s',
                isCorrect: false,
                explanation:
                  'Incorrect. The factors of t² - 6t + 8 are (t - 2) and (t - 4), not (t - 1) and (t - 8).'
              },
              {
                id: 'D',
                text: 'v = 12 m/s; momentarily at rest at t = 6s only',
                isCorrect: false,
                explanation:
                  'Incorrect. Differentiating ⅓t³ gives t², not 3t². Always apply the power rule dy/dx = n·ax^(n-1).'
              }
            ],
            correctOptionId: 'A',
            solution:
              '(a) Velocity v = dS/dt = t² - 6t + 8.\nWhen t = 2:\nv = (2)² - 6(2) + 8 = 4 - 12 + 8 = 0 m/s.\n\n(b) Momentarily at rest means v = 0:\nt² - 6t + 8 = 0\n(t - 2)(t - 4) = 0\nt = 2 seconds or t = 4 seconds.\n\n(c) Acceleration a = dv/dt = 2t - 6.\nWhen t = 4:\na = 2(4) - 6 = 8 - 6 = 2 m/s².\n\n(d) Distance in 3rd second (between t = 2 and t = 3):\nS(2) = 11.67 m; S(3) = 11 m.\nDistance = |11 - 11.67| = 0.67 m (⅔ m).',
            markingBreakdown: [
              'M1: Differentiating S to obtain v = t² - 6t + 8',
              'A1: Substituting t = 2 and evaluating to 0 m/s',
              'M1: Equating v to 0 and factorizing (t - 2)(t - 4) = 0',
              'A1: Stating t = 2 s and t = 4 s',
              'M1: Differentiating v to obtain a = 2t - 6',
              'A1: Substituting t = 4 to get 2 m/s²',
              'M1: Evaluating S(3) and S(2)',
              'A1: Correct absolute distance = 0.67 m'
            ],
            examinerWarning:
              'Many students calculate distance in part (d) by integrating from 0 to 3 instead of the interval between t = 2 and t = 3. The 3rd second starts at t = 2 and ends at t = 3!'
          },
          {
            id: 'mf-math-q2',
            year: 2023,
            paper: 'Paper 1 (Section I)',
            questionNumber: 8,
            marks: 4,
            formLevel: 'Form 4',
            topicClassification: 'Definite Integration Area',
            questionText:
              'Evaluate the definite integral ∫₁³ (3x² - 4x + 1) dx.\n\nSelect the correct value resulting from applying the limits [1, 3]:',
            options: [
              {
                id: 'A',
                text: '12',
                isCorrect: true,
                explanation:
                  'Correct! The antiderivative is [x³ - 2x² + x]₁³. Upper limit at x=3 is 27 - 18 + 3 = 12. Lower limit at x=1 is 1 - 2 + 1 = 0. 12 - 0 = 12.'
              },
              {
                id: 'B',
                text: '16',
                isCorrect: false,
                explanation:
                  'Incorrect. This error occurs if you add the lower limit instead of subtracting it, or miscalculate 4x²/2.'
              },
              {
                id: 'C',
                text: '8',
                isCorrect: false,
                explanation:
                  'Incorrect. Check the integration of -4x. ∫ 4x dx = 4x²/2 = 2x², not 4x².'
              },
              {
                id: 'D',
                text: '10',
                isCorrect: false,
                explanation:
                  'Incorrect. Did you forget to integrate the constant 1 to x? ∫ 1 dx = x.'
              }
            ],
            correctOptionId: 'A',
            solution:
              '∫ (3x² - 4x + 1) dx = [ (3x³/3) - (4x²/2) + x ]₁³\n= [ x³ - 2x² + x ]₁³\n\nUpper limit (x = 3):\n(3)³ - 2(3)² + 3 = 27 - 18 + 3 = 12.\n\nLower limit (x = 1):\n(1)³ - 2(1)² + 1 = 1 - 2 + 1 = 0.\n\nValue = 12 - 0 = 12.',
            markingBreakdown: [
              'M1: Integrating each term correctly: x³ - 2x² + x',
              'M1: Inserting brackets with limits 1 and 3',
              'M1: Correct substitution of upper and lower limits: (27 - 18 + 3) - (1 - 2 + 1)',
              'A1: Exact answer 12'
            ],
            examinerWarning:
              'Do not write "+ c" when evaluating a definite integral! Candidates lose the method mark if "+ c" causes confusion during limit substitution.'
          }
        ]
      },
      {
        id: 'math-lp',
        title: 'Linear Programming & Optimization',
        formLevel: 'Form 4',
        highYieldSummary: [
          'Identify constraints from the word problem: non-negativity (x ≥ 0, y ≥ 0), budget, capacity, ratio.',
          'Boundary lines: replace inequalities with "=" to find x-intercept (y=0) and y-intercept (x=0).',
          'KNEC Rule: Shading must be applied to the UNWANTED region. The clean/unshaded area represents the feasible region R.',
          'Objective function: Ax + By = K. Draw an arbitrary search line (e.g. Ax + By = lcm(A,B)) and slide parallel towards maximum.',
          'Integer coordinates: If the optimal point is fractional, select the nearest integer coordinate inside the feasible region R.'
        ],
        essentialFormulas: [
          'Objective Function: P = ax + by (Maximize or Minimize)',
          'Search Line: ax + by = k (chosen constant)',
          'Gradient of search line = -a/b'
        ],
        commonExaminerTraps: [
          'Shading the wanted region instead of the UNWANTED region. KNEC marks 0 for the entire graph if unwanted regions are not shaded!',
          'Forgetting the non-negativity constraints x ≥ 0 and y ≥ 0 (boundary along the axes).',
          'Giving non-integer answers for discrete physical objects (e.g. 4.3 bags of maize or 6.7 buses).'
        ],
        questions: [
          {
            id: 'mf-math-q3',
            year: 2022,
            paper: 'Paper 2 (Section II)',
            questionNumber: 22,
            marks: 10,
            formLevel: 'Form 4',
            topicClassification: 'Linear Programming Constraints & Graph',
            questionText:
              'A school requires at least 480 bags of maize and 360 bags of beans. Lorry A carries 60 bags of maize and 30 bags of beans per trip (costing KSh 5,000/trip). Lorry B carries 40 bags of maize and 40 bags of beans per trip (costing KSh 4,000/trip). The school must hire at least 10 lorries in total (x + y ≥ 10).\n\nWhat is the optimal combination of trips (x, y) that minimizes the total transport cost?',
            options: [
              {
                id: 'A',
                text: '4 trips of Lorry A and 6 trips of Lorry B (Cost = KSh 44,000)',
                isCorrect: true,
                explanation:
                  'Correct! Objective function C = 5000x + 4000y. Evaluating at boundary intersection (4, 6) gives C = 5000(4) + 4000(6) = KSh 44,000, which satisfies 3(4)+2(6)=24, 3(4)+4(6)=36, and 4+6=10.'
              },
              {
                id: 'B',
                text: '8 trips of Lorry A and 2 trips of Lorry B (Cost = KSh 48,000)',
                isCorrect: false,
                explanation:
                  'Incorrect. This combination satisfies constraints but yields a higher cost of KSh 48,000.'
              },
              {
                id: 'C',
                text: '10 trips of Lorry A and 0 trips of Lorry B (Cost = KSh 50,000)',
                isCorrect: false,
                explanation:
                  'Incorrect. 10 trips of A provides only 300 bags of beans, failing the requirement of at least 360 bags of beans!'
              },
              {
                id: 'D',
                text: '5 trips of Lorry A and 5 trips of Lorry B (Cost = KSh 45,000)',
                isCorrect: false,
                explanation:
                  'Incorrect. While feasible, KSh 45,000 is higher than the minimum feasible vertex cost of KSh 44,000.'
              }
            ],
            correctOptionId: 'A',
            solution:
              '(a) Inequalities:\n1. Maize: 60x + 40y ≥ 480  ⇒  3x + 2y ≥ 24\n2. Beans: 30x + 40y ≥ 360  ⇒  3x + 4y ≥ 36\n3. Total trips: x + y ≥ 10\n4. Non-negativity: x ≥ 0, y ≥ 0.\n\n(b) Feasible Region R vertices: (0, 12), (4, 6), (12, 0).\n(c) Objective function: Cost C = 5000x + 4000y.\n• At (0, 12): C = 5000(0) + 4000(12) = KSh 48,000.\n• At (4, 6): C = 5000(4) + 4000(6) = 20,000 + 24,000 = KSh 44,000 (MINIMUM).\n• At (12, 0): C = 5000(12) + 4000(0) = KSh 60,000.\nOptimal: 4 trips of Lorry A and 6 trips of Lorry B.',
            markingBreakdown: [
              'B1: 3x + 2y ≥ 24',
              'B1: 3x + 4y ≥ 36',
              'B1: x + y ≥ 10',
              'B1: x ≥ 0, y ≥ 0',
              'B1: Correct scale and axes labelled',
              'B2: Accurate plotting of boundary lines',
              'B1: Correct shading of unwanted regions leaving feasible region R',
              'M1: Drawing search line 5x + 4y = c',
              'A1: Optimal solution x = 4, y = 6 with minimum cost KSh 44,000'
            ],
            examinerWarning:
              'Always state the vertices of the feasible region and show explicit evaluation of the objective function at each corner to guarantee full accuracy marks.'
          }
        ]
      }
    ]
  },

  // 2. BIOLOGY (231)
  {
    id: 'mf-bio',
    name: 'Biology',
    knecCode: '231/1, 231/2 & 231/3',
    category: 'Sciences',
    color: 'emerald',
    topicsCount: 22,
    totalQuestions: 155,
    topics: [
      {
        id: 'bio-genetics',
        title: 'Genetics, DNA & Inheritance',
        formLevel: 'Form 4',
        highYieldSummary: [
          'Gene: basic physical unit of heredity composed of DNA sequence.',
          'Allele: alternative form of a gene located at the same locus on homologous chromosomes.',
          'Mendel’s First Law (Law of Segregation): Characteristics of an organism are determined by internal factors (alleles) that occur in pairs and segregate during gamete formation.',
          'Mendel’s Second Law (Independent Assortment): Alleles of two or more different genes sort into gametes independently of one another.',
          'Sex-linked traits: Genes located on the X chromosome (hemophilia, red-green color blindness). Males (XY) express the trait with a single recessive allele.'
        ],
        essentialFormulas: [
          'Monohybrid Heterozygous Cross: F2 Phenotypic Ratio = 3 : 1; Genotypic Ratio = 1 : 2 : 1',
          'Dihybrid Heterozygous Cross: F2 Phenotypic Ratio = 9 : 3 : 3 : 1',
          'Test Cross: Cross with homozygous recessive (aa) to reveal unknown genotype'
        ],
        commonExaminerTraps: [
          'Failing to circle gametes: In KNEC marking schemes, gametes MUST be circled or clearly separated with commas. Uncircled letters lose the gamete mark (G1)!',
          'Confusing codominance (both alleles express equally, e.g. AB blood group, roan cattle) with incomplete dominance (blended phenotype, e.g. pink snapdragons from red and white).',
          'Writing lowercase letters for sex-linked conditions on the Y chromosome: the Y chromosome has NO corresponding locus for hemophilia or color blindness (e.g. XʰY, never XʰYʰ).'
        ],
        questions: [
          {
            id: 'mf-bio-q1',
            year: 2024,
            paper: 'Paper 2 (Theory)',
            questionNumber: 4,
            marks: 8,
            formLevel: 'Form 4',
            topicClassification: 'Sex Linkage & Hemophilia',
            questionText:
              'In humans, hemophilia is a sex-linked recessive disorder carried on the X chromosome. A normal man marries a woman who is a carrier for hemophilia (XᴴXʰ).\n\nWhat is the probability of this couple giving birth to a hemophiliac child?',
            options: [
              {
                id: 'A',
                text: '¼ (25% probability)',
                isCorrect: true,
                explanation:
                  'Correct! Cross: XᴴY × XᴴXʰ. Offspring genotypes: XᴴXᴴ (normal girl), XᴴXʰ (carrier girl), XᴴY (normal boy), XʰY (hemophiliac boy). Only 1 out of 4 is hemophiliac (25%).'
              },
              {
                id: 'B',
                text: '½ (50% probability)',
                isCorrect: false,
                explanation:
                  'Incorrect. 50% is the probability among male offspring only, but the question asks for any child (1 out of 4 total).'
              },
              {
                id: 'C',
                text: '0% (No children will be affected)',
                isCorrect: false,
                explanation:
                  'Incorrect. The carrier mother passes her recessive Xʰ chromosome to 50% of her sons, producing hemophiliac males (XʰY).'
              },
              {
                id: 'D',
                text: '¾ (75% probability)',
                isCorrect: false,
                explanation:
                  'Incorrect. 75% is the probability of having a clinically normal (non-bleeding) child (XᴴXᴴ, XᴴXʰ, XᴴY).'
              }
            ],
            correctOptionId: 'A',
            solution:
              '(a) Man: XᴴY (Normal male)\nWoman: XᴴXʰ (Carrier female)\n\n(b) Genetic Cross:\nParental Phenotype: Normal Male × Carrier Female\nParental Genotype: XᴴY  ×  XᴴXʰ\nGametes: (Xᴴ), (Y)  ×  (Xᴴ), (Xʰ)\n\nPunnett Square / Fusion:\n• Xᴴ × Xᴴ → XᴴXᴴ (Normal female, 25%)\n• Xᴴ × Xʰ → XᴴXʰ (Carrier female, 25%)\n• Y × Xᴴ → XᴴY (Normal male, 25%)\n• Y × Xʰ → XʰY (Hemophiliac male, 25%)\n\nPhenotypic Ratio: 1 Normal Female : 1 Carrier Female : 1 Normal Male : 1 Hemophiliac Male\n(c) Probability = 1 out of 4 = ¼ (or 25% or 0.25).',
            markingBreakdown: [
              'B1: Genotype of man: XᴴY',
              'B1: Genotype of woman: XᴴXʰ',
              'G1: Correct circled gametes: (Xᴴ), (Y) and (Xᴴ), (Xʰ)',
              'F1: Correct offspring genotypes: XᴴXᴴ, XᴴXʰ, XᴴY, XʰY',
              'A1: Correct phenotypic description matching each genotype',
              'A1: Correct phenotypic ratio',
              'A1: Probability = ¼ or 25%'
            ],
            examinerWarning:
              'Candidates must show all five steps: Parental phenotype, Parental genotype, Gametes (circled), Offspring genotype, and Offspring phenotype. Skipping any row forfeits marks!'
          }
        ]
      },
      {
        id: 'bio-ecology',
        title: 'Ecology & Population Estimation',
        formLevel: 'Form 3',
        highYieldSummary: [
          'Capture-recapture (Lincoln-Petersen index) formula: Population N = (First capture n₁ × Second capture n₂) / Marked recaptures m.',
          'Assumptions of capture-recapture: No immigration/emigration, marks do not rub off, marks do not increase predation, random mixing, birth and death rates negligible.',
          'Quadrat sampling method: used for stationary or slow-moving organisms (plants, snails). Population density = Total counted / (Number of quadrats × Area of quadrat).',
          'Energy flow: 10% trophic level efficiency law. Energy decreases along the food chain due to respiration, excretion, and unconsumed parts.'
        ],
        essentialFormulas: [
          'Lincoln Index: N = (n₁ × n₂) / m',
          'Population Density = Total count / Total sampled area (organisms/m²)',
          'Trophic Efficiency = (Energy at trophic level n+1 / Energy at level n) × 100%'
        ],
        commonExaminerTraps: [
          'Confusing population density (number per unit area) with population size/frequency.',
          'Stating "the organisms did not die" instead of "birth and death rates are negligible during the study period".'
        ],
        questions: [
          {
            id: 'mf-bio-q2',
            year: 2023,
            paper: 'Paper 1',
            questionNumber: 14,
            marks: 4,
            formLevel: 'Form 3',
            topicClassification: 'Capture-Recapture Method',
            questionText:
              'In an ecological study to estimate grasshoppers in a school field, 80 grasshoppers were captured, marked with waterproof ink, and released. Two days later, 120 grasshoppers were caught from the same field, of which 30 had the ink mark.\n\nWhat is the estimated total grasshopper population using the Lincoln-Petersen index?',
            options: [
              {
                id: 'A',
                text: '320 grasshoppers',
                isCorrect: true,
                explanation:
                  'Correct! N = (n₁ × n₂) / m = (80 × 120) / 30 = 9,600 / 30 = 320 grasshoppers.'
              },
              {
                id: 'B',
                text: '240 grasshoppers',
                isCorrect: false,
                explanation:
                  'Incorrect. This results from dividing 80 × 90 instead of 80 × 120.'
              },
              {
                id: 'C',
                text: '450 grasshoppers',
                isCorrect: false,
                explanation:
                  'Incorrect. Did you invert the ratio? The formula is (First capture × Total second capture) / Marked in second capture.'
              },
              {
                id: 'D',
                text: '170 grasshoppers',
                isCorrect: false,
                explanation:
                  'Incorrect. This is simply 80 + 120 - 30, which is simple addition, not the Lincoln index proportionality formula.'
              }
            ],
            correctOptionId: 'A',
            solution:
              '(a) Population N = (First capture n₁ × Total second capture n₂) / Marked recaptures m\nN = (80 × 120) / 30 = 9,600 / 30 = 320 grasshoppers.\n\n(b) Assumptions:\n1. The waterproof ink mark did not fade, wash off, or affect grasshopper behavior/survival.\n2. The marked grasshoppers mixed freely and randomly with the rest of the population.\n3. There was no significant immigration, emigration, birth, or death in the two-day period.',
            markingBreakdown: [
              'M1: Stating formula or showing substitution: (80 × 120) / 30',
              'A1: 320 grasshoppers',
              'B1: Any correct assumption 1',
              'B1: Any correct assumption 2'
            ],
            examinerWarning:
              'Always include the subject noun in the final answer ("320 grasshoppers"). Writing just "320" risks losing the accuracy mark.'
          }
        ]
      }
    ]
  },

  // 3. CHEMISTRY (233)
  {
    id: 'mf-chem',
    name: 'Chemistry',
    knecCode: '233/1, 233/2 & 233/3',
    category: 'Sciences',
    color: 'emerald',
    topicsCount: 22,
    totalQuestions: 160,
    topics: [
      {
        id: 'chem-mole',
        title: 'The Mole: Volumetric & Stoichiometric Calculations',
        formLevel: 'Form 3',
        highYieldSummary: [
          '1 mole = 6.022 × 10²³ particles = Molar mass in grams = 24.0 dm³ (24,000 cm³) of any gas at RTP (22.4 dm³ at STP).',
          'Concentration (Molarity M) = moles of solute / volume in dm³ = (mass / RFM) × (1000 / volume in cm³).',
          'Empirical formula: simplest whole-number ratio of atoms of each element in a compound.',
          'Molecular formula = (Empirical formula)ₙ, where n = Relative Formula Mass (RFM) / Empirical Formula Mass.'
        ],
        essentialFormulas: [
          'Moles = Mass (g) / Molar Mass (g/mol)',
          'Moles in solution = (Molarity M × Volume cm³) / 1000',
          'Gas Volume at RTP: Moles = Volume (cm³) / 24,000 cm³',
          'Dilution equation: M₁V₁ = M₂V₂'
        ],
        commonExaminerTraps: [
          'Forgetting state symbols in chemical equations: KNEC penalizes ½ mark per missing or incorrect state symbol (s, l, g, aq).',
          'Rounding off molar mass values: use exact KNEC periodic table values (e.g. Cl = 35.5, Cu = 63.5, never 36 or 64).',
          'In titration: averaging non-concordant titres. Only values within ± 0.20 cm³ of each other may be averaged!'
        ],
        questions: [
          {
            id: 'mf-chem-q1',
            year: 2024,
            paper: 'Paper 2 (Theory)',
            questionNumber: 2,
            marks: 8,
            formLevel: 'Form 3',
            topicClassification: 'Stoichiometry & Gas Volume',
            questionText:
              '5.0 g of calcium carbonate (CaCO₃) reacted completely with excess dilute hydrochloric acid at RTP according to:\nCaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)\n\nWhat is the volume of CO₂ gas evolved at RTP, and the mass of CaCl₂ formed? (Molar gas volume at RTP = 24.0 dm³; Ca = 40.0, C = 12.0, O = 16.0, Cl = 35.5)',
            options: [
              {
                id: 'A',
                text: '1.20 dm³ (1,200 cm³) of CO₂ and 5.55 g of CaCl₂',
                isCorrect: true,
                explanation:
                  'Correct! RFM of CaCO₃ = 100 g/mol. Moles = 5.0 / 100 = 0.05 mol. Mole ratio is 1:1, so Volume of CO₂ = 0.05 × 24.0 dm³ = 1.20 dm³. RFM of CaCl₂ = 40 + 71 = 111 g/mol. Mass = 0.05 × 111 = 5.55 g.'
              },
              {
                id: 'B',
                text: '2.40 dm³ of CO₂ and 11.10 g of CaCl₂',
                isCorrect: false,
                explanation:
                  'Incorrect. This assumes 0.1 moles instead of 0.05 moles of CaCO₃.'
              },
              {
                id: 'C',
                text: '1.20 dm³ of CO₂ and 7.55 g of CaCl₂',
                isCorrect: false,
                explanation:
                  'Incorrect. Check your RFM for CaCl₂: Ca (40) + 2 × Cl (71) = 111 g/mol, not 151 g/mol.'
              },
              {
                id: 'D',
                text: '0.60 dm³ of CO₂ and 2.78 g of CaCl₂',
                isCorrect: false,
                explanation:
                  'Incorrect. You halved the moles; the reaction produces 1 mole of CO₂ per 1 mole of CaCO₃.'
              }
            ],
            correctOptionId: 'A',
            solution:
              '(a) Balanced equation:\nCaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)\n\n(b) RFM of CaCO₃ = 40.0 + 12.0 + (3 × 16.0) = 100.0 g/mol.\nMoles of CaCO₃ = 5.0 g / 100.0 g/mol = 0.05 moles.\n\nFrom equation, mole ratio CaCO₃ : CO₂ = 1 : 1.\nMoles of CO₂ produced = 0.05 moles.\nVolume of CO₂ at RTP = 0.05 × 24.0 dm³ = 1.20 dm³ (or 1,200 cm³).\n\n(c) Mole ratio CaCO₃ : CaCl₂ = 1 : 1.\nMoles of CaCl₂ = 0.05 moles.\nRFM of CaCl₂ = 40.0 + (2 × 35.5) = 40.0 + 71.0 = 111.0 g/mol.\nMass of CaCl₂ = 0.05 moles × 111.0 g/mol = 5.55 g.',
            markingBreakdown: [
              'B1: Correct reactants and products',
              'B1: Balanced equation with all 4 correct state symbols',
              'M1: Calculating RFM = 100.0 g/mol and moles = 0.05',
              'M1: Stating mole ratio 1:1',
              'A1: 1.20 dm³ (or 1,200 cm³)',
              'M1: Calculating RFM of CaCl₂ = 111.0 g/mol',
              'M1: Multiplying moles by RFM: 0.05 × 111.0',
              'A1: 5.55 g'
            ],
            examinerWarning:
              'Always give units (dm³, cm³, g)! An answer of 1.2 without dm³ loses the final accuracy mark.'
          }
        ]
      }
    ]
  },

  // 4. PHYSICS (232)
  {
    id: 'mf-phys',
    name: 'Physics',
    knecCode: '232/1, 232/2 & 232/3',
    category: 'Sciences',
    color: 'cyan',
    topicsCount: 20,
    totalQuestions: 150,
    topics: [
      {
        id: 'phys-electromagnetism',
        title: 'Electromagnetic Induction & Transformers',
        formLevel: 'Form 4',
        highYieldSummary: [
          'Faraday’s Law: The magnitude of induced EMF is directly proportional to the rate of change of magnetic flux linkage.',
          'Lenz’s Law: The direction of the induced current is such that it opposes the change in magnetic flux producing it.',
          'Fleming’s Right-Hand Rule (Dynamo Rule): Thumb (Motion), First finger (Field), Second finger (Induced Current).',
          'Transformer equation: Vₛ / Vₚ = Nₛ / Nₚ = Iₚ / Iₛ (for an ideal 100% efficient transformer).',
          'Energy losses in transformers: Copper losses (I²R heating in coils), Eddy currents (minimized by laminating soft iron core), Hysteresis losses (minimized by soft iron), Flux leakage.'
        ],
        essentialFormulas: [
          'Transformer turns ratio: Vs / Vp = Ns / Np',
          'Ideal Power: Pp = Ps ⇒ Vp · Ip = Vs · Is',
          'Efficiency η = (Power Output / Power Input) × 100% = (Vs · Is / Vp · Ip) × 100%'
        ],
        commonExaminerTraps: [
          'Reversing the current ratio: Notice that current is INVERSELY proportional to voltage: Vs/Vp = Ip/Is, NOT Is/Ip!',
          'Explaining eddy current minimization: Say "laminating the core into insulated thin sheets", NOT just "using soft iron" (soft iron reduces hysteresis, lamination reduces eddy currents!).'
        ],
        questions: [
          {
            id: 'mf-phys-q1',
            year: 2024,
            paper: 'Paper 2',
            questionNumber: 17,
            marks: 6,
            formLevel: 'Form 4',
            topicClassification: 'Transformer Efficiency & Power Loss',
            questionText:
              'A step-down transformer has 1,200 turns in the primary winding and 120 turns in the secondary winding. The primary coil is connected to a 240V AC supply. If the transformer has an efficiency of 85% and supplies a current of 4.0A to an appliance, what is the primary current Ip drawn from the mains?',
            options: [
              {
                id: 'A',
                text: '0.47 A',
                isCorrect: true,
                explanation:
                  'Correct! Vs = 240 × (120/1200) = 24.0 V. Power output Ps = Vs × Is = 24 × 4 = 96 W. Power input Pp = Ps / 0.85 = 96 / 0.85 = 112.94 W. Since Pp = Vp × Ip, Ip = 112.94 / 240 = 0.47 A.'
              },
              {
                id: 'B',
                text: '0.40 A',
                isCorrect: false,
                explanation:
                  'Incorrect. 0.40 A is the current if the transformer were 100% ideal. Since efficiency is 85%, more primary current is needed to overcome heat losses.'
              },
              {
                id: 'C',
                text: '4.70 A',
                isCorrect: false,
                explanation:
                  'Incorrect. In a step-down transformer, secondary voltage decreases while secondary current increases. Primary current must be much lower than secondary current (4.0 A).'
              },
              {
                id: 'D',
                text: '0.85 A',
                isCorrect: false,
                explanation:
                  'Incorrect. Do not confuse the percentage efficiency (85%) with the current magnitude.'
              }
            ],
            correctOptionId: 'A',
            solution:
              '(a) Vs / Vp = Ns / Np\nVs / 240 = 120 / 1200\nVs = 240 × (1/10) = 24.0 V.\n\n(b) Efficiency η = (Power output / Power input) × 100%\nPower output Ps = Vs × Is = 24.0 V × 4.0 A = 96.0 W.\n\n85 = (96.0 / Pp) × 100\nPp = (96.0 × 100) / 85 = 112.94 W.\n\nPower input Pp = Vp × Ip\n112.94 = 240 × Ip\nIp = 112.94 / 240 = 0.47 A.',
            markingBreakdown: [
              'M1: Stating formula Vs / Vp = Ns / Np and substituting values',
              'A1: Secondary voltage Vs = 24.0 V',
              'M1: Calculating power output = 24 × 4 = 96 W',
              'M1: Equating efficiency: 0.85 × 240 × Ip = 96',
              'A1: Correct primary current Ip = 0.47 A (or 0.471 A)'
            ],
            examinerWarning:
              'Always express physical quantities with standard SI units (V, A, W). Numerical answers without units are penalized 1 mark by KNEC.'
          }
        ]
      }
    ]
  },

  // 5. GEOGRAPHY (312)
  {
    id: 'mf-geog',
    name: 'Geography',
    knecCode: '312/1 & 312/2',
    category: 'Humanities',
    color: 'emerald',
    topicsCount: 18,
    totalQuestions: 130,
    topics: [
      {
        id: 'geog-vulcanicity',
        title: 'Internal Land-Forming Processes: Faulting & Vulcanicity',
        formLevel: 'Form 2',
        highYieldSummary: [
          'Vulcanicity: Process by which molten rock (magma) is forced from the earth interior into the crust or onto the surface.',
          'Intrusive features: Batholiths, dykes (discordant), sills (concordant), laccoliths, lopoliths, phacoliths.',
          'Extrusive features: Composite cones/stratovolcanoes (Mt. Kenya, Mt. Kilimanjaro), shield volcanoes, volcanic plugs, crater lakes, geysers, fumaroles.',
          'Economic significance: Geothermal energy generation (Olkaria), fertile volcanic soils for agriculture (tea and coffee in central Kenya), tourist attraction, building stones (trachyte, phonolite).'
        ],
        commonExaminerTraps: [
          'Confusing a sill with a dyke: a sill is concordant (intruded horizontally along bedding planes), while a dyke is discordant (cuts vertically/transversely across strata).',
          'Drawing volcanic cones without labeling magma conduit, parasitic cone, layers of ash and lava, and crater.'
        ],
        questions: [
          {
            id: 'mf-geog-q1',
            year: 2023,
            paper: 'Paper 1 (Section B)',
            questionNumber: 7,
            marks: 8,
            formLevel: 'Form 2',
            topicClassification: 'Composite Volcano & Economic Value',
            questionText:
              'Which of the following correctly pairs an intrusive concordant volcanic feature with an extrusive volcanic mountain formed by alternating layers of ash and viscous lava in Kenya?',
            options: [
              {
                id: 'A',
                text: 'Sill (concordant) and Composite volcano / Stratovolcano (e.g. Mount Longonot)',
                isCorrect: true,
                explanation:
                  'Correct! A sill is formed when magma solidifies horizontally along bedding planes (concordant), while a composite volcano builds up through alternating layers of pyroclasts/ash and viscous lava.'
              },
              {
                id: 'B',
                text: 'Dyke (concordant) and Shield volcano (e.g. Mauna Loa)',
                isCorrect: false,
                explanation:
                  'Incorrect. A dyke is DISCORDANT (it cuts vertically across strata), not concordant.'
              },
              {
                id: 'C',
                text: 'Batholith (extrusive) and Caldera (e.g. Menengai)',
                isCorrect: false,
                explanation:
                  'Incorrect. A batholith is a massive plutonic INTRUSIVE feature formed deep inside the earth crust.'
              },
              {
                id: 'D',
                text: 'Laccolith (discordant) and Volcanic plug (e.g. Fischer’s Tower)',
                isCorrect: false,
                explanation:
                  'Incorrect. Laccoliths are concordant dome-shaped intrusions with a flat floor.'
              }
            ],
            correctOptionId: 'A',
            solution:
              '(a) Formation of a Composite Volcano:\n1. It begins with an eruption of viscous lava, pyroclasts, and ash through a central vent.\n2. Explosive eruptions deposit a layer of volcanic ash and cinders around the vent.\n3. Subsequent gentle effusive eruptions extrude fluid lava which cools and solidifies over the ash layer.\n4. Over multiple successive eruptions, alternating layers of ash, cinders, and solidified lava accumulate.\n5. Side fractures may open up, forming parasitic cones on the flanks.\n6. This builds a steep-sided, symmetrical conical mountain with a summit crater (e.g. Mount Longonot).\n\n(b) Negative Effects of Vulcanicity:\n1. Volcanic eruptions eject toxic gases (SO₂, CO₂) and volcanic ash, causing respiratory illnesses and disrupting air aviation travel.\n2. Steep volcanic slopes promote severe soil erosion and devastating landslides during heavy torrential rainfall.\n3. Volcanic terrains such as young lava flow fields (e.g. Shetani lava flow in Tsavo) create rugged, barren ground that hinders transport road construction and mechanized farming.',
            markingBreakdown: [
              '1 Mark each for 5 sequential points on composite volcano formation',
              '1 Mark each for 3 well-explained negative effects on human livelihood'
            ],
            examinerWarning:
              'In part (b), students must EXPLAIN (cause + effect), not just state. Stating "causes landslides" receives 0 marks; explaining "steep unstable slopes slide during heavy rains, destroying homes and roads" earns the full mark.'
          }
        ]
      }
    ]
  },

  // 6. HISTORY & GOVERNMENT (311)
  {
    id: 'mf-hist',
    name: 'History and Government',
    knecCode: '311/1 & 311/2',
    category: 'Humanities',
    color: 'emerald',
    topicsCount: 20,
    totalQuestions: 135,
    topics: [
      {
        id: 'hist-constitution',
        title: 'The Constitution & Devolution in Kenya',
        formLevel: 'Form 4',
        highYieldSummary: [
          'Constitution of Kenya 2010: Supreme law promulgated on 27th August 2010.',
          'Key Chapters: Chapter 4 (Bill of Rights), Chapter 8 (Legislature), Chapter 9 (Executive), Chapter 10 (Judiciary), Chapter 11 (Devolved Government).',
          'Objects of Devolution: To promote democratic and accountable exercise of power; to foster national unity by recognizing diversity; to give powers of self-governance to the people; to ensure equitable sharing of national and local resources across 47 counties.',
          'Structures of County Government: County Executive (Governor, Deputy Governor, CEC members) and County Assembly (MCAs, Speaker).'
        ],
        commonExaminerTraps: [
          'Confusing the functions of the National Assembly with the Senate: National Assembly represents constituencies and passes national money bills (budget); the Senate protects the interests of counties and their county governments.',
          'Failing to mention the "promulgation date" (27th August 2010).'
        ],
        questions: [
          {
            id: 'mf-hist-q1',
            year: 2024,
            paper: 'Paper 1 (Section C)',
            questionNumber: 21,
            marks: 12,
            formLevel: 'Form 4',
            topicClassification: 'Devolution Objects & Functions of Governor',
            questionText:
              'Under Chapter 11 of the 2010 Constitution of Kenya, which statement accurately reflects the constitutional mandate of a County Governor and the Devolved System?',
            options: [
              {
                id: 'A',
                text: 'Chief Executive of the County; implements county legislation and submits annual progress reports to the County Assembly',
                isCorrect: true,
                explanation:
                  'Correct! The County Governor is the Chief Executive Officer of the County Executive Committee, assents to County Bills, oversees implementation of county laws, and reports to the County Assembly.'
              },
              {
                id: 'B',
                text: 'Presides over legislative debates and passes laws in the County Assembly',
                isCorrect: false,
                explanation:
                  'Incorrect. The County Assembly Speaker presides over debates, not the Governor.'
              },
              {
                id: 'C',
                text: 'Approves national budgetary allocation bills in the Senate',
                isCorrect: false,
                explanation:
                  'Incorrect. Senators approve division of revenue in Parliament, not county governors.'
              },
              {
                id: 'D',
                text: 'Appoints Supreme Court and High Court judges across the county',
                isCorrect: false,
                explanation:
                  'Incorrect. Judges are appointed by the President upon recommendation of the Judicial Service Commission (JSC).'
              }
            ],
            correctOptionId: 'A',
            solution:
              '(a) Objectives of Devolution:\n1. To promote democratic and accountable exercise of power.\n2. To foster national unity by recognizing and respecting cultural diversity.\n3. To give powers of self-governance to the people and enhance citizen participation in governance.\n4. To recognize the right of communities to manage their own affairs and further their development.\n5. To protect and promote the interests and rights of minorities and marginalized communities.\n6. To ensure equitable sharing of national and local resources throughout Kenya.\n\n(b) Functions of a County Governor:\n1. Chief Executive Officer: Head of the County Executive Committee; appoints County Executive Committee members with approval of the County Assembly.\n2. Policy Implementation: Oversees the execution of national and county legislation within the county.\n3. Annual County Address: Submits an annual report to the County Assembly on the progress made in realization of county development priorities.\n4. Assenting to County Bills: Signs county bills passed by the County Assembly into law or refers them back with reservations.\n5. Resource Mobilization & Budget: Coordinates the preparation of the County Integrated Development Plan (CIDP) and county annual budget.',
            markingBreakdown: [
              '1 Mark each for any 5 clear objectives (Max 5 Marks)',
              '1-2 Marks per well-developed explanation of County Governor functions (Max 7 Marks)'
            ],
            examinerWarning:
              'In Section C essay questions, always use full sentences and paragraph structure. Avoid one-word answers or bulleted phrases without contextual elaboration.'
          }
        ]
      }
    ]
  },

  // 7. ENGLISH (101)
  {
    id: 'mf-eng',
    name: 'English',
    knecCode: '101/1, 101/2 & 101/3',
    category: 'Languages',
    color: 'emerald',
    topicsCount: 16,
    totalQuestions: 120,
    topics: [
      {
        id: 'eng-cloze',
        title: 'Cloze Test & Functional Grammar',
        formLevel: 'Form 3',
        highYieldSummary: [
          'Cloze test strategy: Read the entire passage once without filling blanks to grasp the overarching theme and tense.',
          'Rule 1: ONE word only per blank. Contractions (can’t, don’t) count as two words and receive 0 marks!',
          'Rule 2: Check parts of speech: articles (a, an, the), prepositions (in, on, at, by), conjunctions (although, because), auxiliary verbs.',
          'Rule 3: Ensure subject-verb agreement and correct spelling. A misspelled word receives 0 marks.'
        ],
        commonExaminerTraps: [
          'Writing alternative words separated by slashes (e.g. "and/or"): automatic 0 marks!',
          'Writing capital letters in the middle of sentences where a lowercase letter is grammatically required.'
        ],
        questions: [
          {
            id: 'mf-eng-q1',
            year: 2024,
            paper: 'Paper 1 (Question 2)',
            questionNumber: 2,
            marks: 10,
            formLevel: 'Form 3',
            topicClassification: 'Cloze Test Mastery',
            questionText:
              'Read the sentence extracted from a KCSE Cloze Test:\n"Climate change continues to pose an existential (1) ________ to agricultural productivity; governments must urgently invest (4) ________ climate-smart agriculture and farmers ought (5) ________ be empowered with meteorological data."\n\nWhich set of words correctly fills blanks (1), (4), and (5)?',
            options: [
              {
                id: 'A',
                text: '(1) threat, (4) in, (5) to',
                isCorrect: true,
                explanation:
                  'Correct! Standard English collocations: "pose a threat", "invest in", and "ought to" (the semi-modal verb ought always takes the to-infinitive).'
              },
              {
                id: 'B',
                text: '(1) danger, (4) into, (5) should',
                isCorrect: false,
                explanation:
                  'Incorrect. "Ought should" is ungrammatical; "ought" requires the particle "to". Also, one invests "in" agriculture, not "into".'
              },
              {
                id: 'C',
                text: '(1) hazard, (4) on, (5) to',
                isCorrect: false,
                explanation:
                  'Incorrect. You do not invest "on" agriculture; the correct dependent preposition is "invest in".'
              },
              {
                id: 'D',
                text: '(1) problem, (4) with, (5) must',
                isCorrect: false,
                explanation:
                  'Incorrect. "Ought must" is double modal auxiliary usage, which is completely ungrammatical in English.'
              }
            ],
            correctOptionId: 'A',
            solution:
              '(1) threat\n(2) by\n(3) that / who\n(4) in\n(5) to\n(6) made / taken / implemented\n(7) indifferent / passive / silent / idle\n(8) from\n(9) action / steps / measures\n(10) without',
            markingBreakdown: [
              '1 Mark for each exact, correctly spelled word (Total 10 Marks)'
            ],
            examinerWarning:
              'Pay close attention to collocation: "invest in" (not "on"), "ought to" (infinitive marker), "from ... to" (correlative pairing).'
          }
        ]
      }
    ]
  },

  // 8. KISWAHILI (102)
  {
    id: 'mf-kisw',
    name: 'Kiswahili',
    knecCode: '102/1, 102/2 & 102/3',
    category: 'Languages',
    color: 'emerald',
    topicsCount: 16,
    totalQuestions: 125,
    topics: [
      {
        id: 'kisw-sarufi',
        title: 'Sarufi: Ngeli za Nomino & Upatanisho wa Kisarufi',
        formLevel: 'Form 2',
        highYieldSummary: [
          'Ngeli za Nomino ni makundi ya majina kulingana na viambishi vya umoja na wingi pamoja na upatanisho wa kisarufi.',
          'A-WA (Viumbe hai: mtu/watu, kuku/kuku, daktari/madaktari, simba/simba)',
          'KI-VI (Vitu: kitabu/vitabu, chandarua/vyandarua, chakula/vyakula)',
          'LI-YA (Jicho/macho, gari/magari, embe/maembe, yai/mayai)',
          'U-I (Mti/miti, mto/mito, mkate/mikate, mnazi/minazi)',
          'U-YA (Ugonjwa/magonjwa, uwelezo/mawelezo)',
          'I-ZI (Nyumba/nyumba, meza/meza, kalamu/kalamu)'
        ],
        commonExaminerTraps: [
          'Kuweka wanyama au wadudu katika ngeli ya I-ZI au KI-VI badala ya ngeli ya A-WA (mfano: Kipepeo yuko ngeli ya A-WA si KI-VI!).',
          'Kukosa kubadilisha viambishi vya ngeli katika vivumishi, viwakilishi na vitenzi vyote kwenye sentensi.'
        ],
        questions: [
          {
            id: 'mf-kisw-q1',
            year: 2024,
            paper: 'Karatasi ya 2 (Lugha)',
            questionNumber: 3,
            marks: 6,
            formLevel: 'Form 2',
            topicClassification: 'Upatanisho wa Ngeli',
            questionText:
              'Chagua sentensi iliyo katika wingi sahihi wenye upatanisho kamili wa kisarufi kwa sentensi hii ya umoja:\n"Ugonjwa huu mbaya uliompata ulitibiwa hospitalini."',
            options: [
              {
                id: 'A',
                text: 'Magonjwa haya mabaya yaliyowapata yalitibiwa hospitalini.',
                isCorrect: true,
                explanation:
                  'Sahihi! Nomino "ugonjwa" iko katika ngeli ya U-YA (umoja "ugonjwa huu", wingi "magonjwa haya"). Kivumishi kinakuwa "mabaya", kirejeshi ni "yaliyowapata", na kitenzi ni "yalitibiwa".'
              },
              {
                id: 'B',
                text: 'Ugonjwa hizi mbaya zilizowapata zilitibiwa hospitalini.',
                isCorrect: false,
                explanation:
                  'Si sahihi. "Ugonjwa" si ngeli ya I-ZI; nomino "magonjwa" huchukua kiambishi cha ngeli ya YA (haya, mabaya, yalitibiwa).'
              },
              {
                id: 'C',
                text: 'Magonjwa hii mibaya iliyowapata ilitibiwa hospitalini.',
                isCorrect: false,
                explanation:
                  'Si sahihi. Viambishi "hii" na "mibaya" ni vya ngeli ya U-I au I-ZI, haviambatani na nomino ya ngeli ya U-YA.'
              },
              {
                id: 'D',
                text: 'Magonjwa haya mabaya yaliompata yalitibiwa hospitalini.',
                isCorrect: false,
                explanation:
                  'Si sahihi. "Yaliompata" ina kosa la kimuundo kwa kiwakilishi cha mtendewa wa wingi ("-wa-"), inapaswa kuwa "yaliyowapata".'
              }
            ],
            correctOptionId: 'A',
            solution:
              '(a) Vijana hawa walioshona viatu vile vilivyoraruka wametuzwa zawadi nzuri.\n(b) Magonjwa haya mabaya yaliyowapata yalitibiwa hospitalini.\n(c) Macho yao yale yenye vidonda yamepona (au: Macho yake yale yenye vidonda yamepona).',
            markingBreakdown: [
              'Alama 2: Kila sentensi iliyo sahihi kabisa kimuundo na kisarufi (Ondoa alama ½ kwa kila kosa la tahajia).'
            ],
            examinerWarning:
              'Kumbuka kuwa kiwakilishi cha nafsi (-wake/-yao) na kielezi lazima vibadilike vikiwa na upatanisho kamili na nomino husika.'
          }
        ]
      }
    ]
  },

  // 9. BUSINESS STUDIES (565)
  {
    id: 'mf-bs',
    name: 'Business Studies',
    knecCode: '565/1 & 565/2',
    category: 'Business',
    color: 'emerald',
    topicsCount: 18,
    totalQuestions: 110,
    topics: [
      {
        id: 'bs-accounting',
        title: 'Financial Accounting: Balance Sheet & Profit and Loss',
        formLevel: 'Form 4',
        highYieldSummary: [
          'Accounting Equation: Assets = Capital + Liabilities (A = C + L).',
          'Trading Account: Sales - Cost of Sales (Opening Stock + Purchases + Carriage Inwards - Closing Stock) = Gross Profit.',
          'Profit & Loss Account: Gross Profit + Other Incomes - Operating Expenses (Rent, Salaries, Electricity, Depreciation) = Net Profit.',
          'Balance Sheet: Statement of financial position on a specific date showing Fixed Assets, Current Assets, Capital, Long-term Liabilities, and Current Liabilities.'
        ],
        essentialFormulas: [
          'Gross Profit = Net Sales - Cost of Goods Sold (COGS)',
          'COGS = Opening Stock + Net Purchases + Carriage Inwards - Closing Stock',
          'Net Profit = Gross Profit + Revenues - Expenses',
          'Working Capital = Current Assets - Current Liabilities'
        ],
        commonExaminerTraps: [
          'Treating Carriage Outwards as part of Cost of Goods Sold: Carriage outwards is a selling/distribution EXPENSE in the Profit and Loss Account, NOT in the Trading Account!',
          'Forgetting to date the financial statements: Balance Sheet must read "As at [Date]", whereas Trading and Profit & Loss reads "For the year ended [Date]".'
        ],
        questions: [
          {
            id: 'mf-bs-q1',
            year: 2023,
            paper: 'Paper 2 (Section B)',
            questionNumber: 6,
            marks: 10,
            formLevel: 'Form 4',
            topicClassification: 'Trading, Profit & Loss Account',
            questionText:
              'From the books of Furaha Traders:\n• Sales: KSh 800,000\n• Opening Stock: KSh 80,000 | Purchases: KSh 450,000 | Carriage Inwards: KSh 20,000\n• Closing Stock: KSh 60,000\n• Rent Received: KSh 25,000\n• Operating Expenses (Salaries, Carriage Outwards, General Expenses): KSh 115,000\n\nWhat are the correct Gross Profit and Net Profit figures?',
            options: [
              {
                id: 'A',
                text: 'Gross Profit = KSh 310,000; Net Profit = KSh 220,000',
                isCorrect: true,
                explanation:
                  'Correct! COGS = 80,000 + 450,000 + 20,000 - 60,000 = 490,000. Gross Profit = 800,000 - 490,000 = 310,000. Total Income = 310,000 + 25,000 = 335,000. Net Profit = 335,000 - 115,000 = KSh 220,000.'
              },
              {
                id: 'B',
                text: 'Gross Profit = KSh 310,000; Net Profit = KSh 195,000',
                isCorrect: false,
                explanation:
                  'Incorrect. Did you forget to add Rent Received (KSh 25,000) as revenue in the Profit and Loss Account?'
              },
              {
                id: 'C',
                text: 'Gross Profit = KSh 295,000; Net Profit = KSh 205,000',
                isCorrect: false,
                explanation:
                  'Incorrect. This error occurs if Carriage Outwards (15,000) is deducted in the Trading Account instead of Profit & Loss.'
              },
              {
                id: 'D',
                text: 'Gross Profit = KSh 350,000; Net Profit = KSh 260,000',
                isCorrect: false,
                explanation:
                  'Incorrect. Closing Stock must be SUBTRACTED from goods available for sale, not added.'
              }
            ],
            correctOptionId: 'A',
            solution:
              'FURAHA TRADERS\nTRADING, PROFIT AND LOSS ACCOUNT\nFOR THE YEAR ENDED 31ST DECEMBER 2023\n\nSales: KSh 800,000\nLess Cost of Goods Sold:\n  Opening Stock:                 80,000\n  Add: Purchases:               450,000\n  Add: Carriage Inwards:         20,000\n  Goods Available for Sale:     550,000\n  Less: Closing Stock:          (60,000)\nCost of Goods Sold:             (490,000)\n-----------------------------------------\nGROSS PROFIT C/D:                310,000\n\nAdd Other Income:\n  Rent Received:                  25,000\nTotal Income:                    335,000\n\nLess Operating Expenses:        (115,000)\n-----------------------------------------\nNET PROFIT:                      220,000',
            markingBreakdown: [
              '1 Mark for correct title (Name, statement, date)',
              '1 Mark for Sales (800,000)',
              '1 Mark for Goods available for sale (550,000)',
              '1 Mark for Cost of Goods Sold (490,000)',
              '2 Marks for Gross Profit (310,000)',
              '1 Mark for Rent Received (25,000)',
              '2 Marks for correct itemization of expenses (115,000)',
              '1 Mark for Net Profit (220,000)'
            ],
            examinerWarning:
              'Carriage inwards adds to the cost of purchases in the trading account, while carriage outwards is strictly an expense in the profit & loss section.'
          }
        ]
      }
    ]
  },

  // 10. AGRICULTURE (443)
  {
    id: 'mf-agri',
    name: 'Agriculture',
    knecCode: '443/1 & 443/2',
    category: 'Technical & Applied',
    color: 'emerald',
    topicsCount: 18,
    totalQuestions: 115,
    topics: [
      {
        id: 'agri-crops',
        title: 'Crop Production & Soil Fertility Management',
        formLevel: 'Form 2',
        highYieldSummary: [
          'Soil fertility: Ability of the soil to supply essential plant nutrients in proper amounts and balance.',
          'Inorganic fertilizers: Straight fertilizers (CAN, Urea, TSP, DSP) vs Compound fertilizers (DAP 18:46:0, NPK 20:20:0).',
          'Fertilizer grade/analysis: Proportions of Nitrogen (N), Phosphorus (P₂O₅), and Potassium (K₂O).',
          'Methods of fertilizer application: Broadcasting, placement/banding, side-dressing, foliar spraying, fertigation.'
        ],
        essentialFormulas: [
          'Nutrient amount = (Percentage of nutrient in fertilizer / 100) × Weight of fertilizer (kg)',
          'Fertilizer required = (Recommended nutrient rate / Percentage nutrient) × 100'
        ],
        commonExaminerTraps: [
          'Confusing DAP with CAN: DAP is a planting fertilizer applied in seed furrow for root development; CAN is a top-dressing fertilizer applied after germination for vegetative leaf growth.',
          'Failing to show the calculation steps in fertilizer ratio problems.'
        ],
        questions: [
          {
            id: 'mf-agri-q1',
            year: 2024,
            paper: 'Paper 1',
            questionNumber: 22,
            marks: 5,
            formLevel: 'Form 2',
            topicClassification: 'Fertilizer Calculation & Application',
            questionText:
              'A farmer is advised to apply 60 kg of Nitrogen (N) per hectare to a maize plantation using Calcium Ammonium Nitrate (CAN, 20% N).\n\nWhat is the total mass of CAN fertilizer required per hectare, and what is the proper application stage and method?',
            options: [
              {
                id: 'A',
                text: '300 kg (6 bags of 50kg) applied by side-dressing when maize is knee-high',
                isCorrect: true,
                explanation:
                  'Correct! Amount of CAN = (100 / 20) × 60 kg = 300 kg (6 bags of 50 kg). CAN is applied as a top-dressing fertilizer via side-dressing when maize is knee-high (30–45 cm).'
              },
              {
                id: 'B',
                text: '120 kg (2.4 bags) broadcasted at planting time with seeds',
                isCorrect: false,
                explanation:
                  'Incorrect. CAN is high in volatile nitrate and scorches seeds if placed directly in planting holes. It must be side-dressed when crops are growing.'
              },
              {
                id: 'C',
                text: '600 kg (12 bags) sprayed on foliage during flowering',
                isCorrect: false,
                explanation:
                  'Incorrect. 600 kg is double the required amount, leading to nitrogen toxicity and lodging.'
              },
              {
                id: 'D',
                text: '150 kg (3 bags) applied before ploughing the land',
                isCorrect: false,
                explanation:
                  'Incorrect. Nitrogen leaches rapidly if applied to bare ground before ploughing.'
              }
            ],
            correctOptionId: 'A',
            solution:
              '(a) Recommended Nitrogen = 60 kg N/ha.\nCAN contains 20% N (20 kg N in 100 kg CAN).\n\nAmount of CAN = (100 / 20) × 60 kg\n= 5 × 60 = 300 kg of CAN per hectare (or 6 bags of 50kg).\n\n(b) Application:\n• Stage: Top-dressing stage when maize is knee-high (around 30–45 cm tall, about 4–6 weeks after emergence).\n• Method: Side-dressing (placing the fertilizer in a shallow ring or furrow 5–10 cm away from the base of the plant and covering with moist soil).',
            markingBreakdown: [
              'M1: Stating formula or ratio: (100 / 20) × 60',
              'A1: 300 kg (or 6 bags)',
              'B1: Stage: Knee-high / 30-45 cm / 4-6 weeks after emergence',
              'B1: Method: Side-dressing / placement along planting line'
            ],
            examinerWarning:
              'Never broadcast CAN in maize without incorporating it into moist soil; nitrogen will volatilize into ammonia gas under hot tropical sun!'
          }
        ]
      }
    ]
  },

  // 11. COMPUTER STUDIES (451)
  {
    id: 'mf-cs',
    name: 'Computer Studies',
    knecCode: '451/1 & 451/2',
    category: 'Technical & Applied',
    color: 'emerald',
    topicsCount: 16,
    totalQuestions: 110,
    topics: [
      {
        id: 'cs-databases',
        title: 'Database Management Systems & SQL',
        formLevel: 'Form 3',
        highYieldSummary: [
          'Database: An organized, structured collection of interrelated data stored electronically.',
          'Key elements: Field (attribute/column), Record (tuple/row), Table (relation/entity), Key field.',
          'Primary key: A field that uniquely identifies each record in a table (e.g. StudentID, NationalID).',
          'Foreign key: A primary key from one table placed in another table to establish a relationship.',
          'Relationships: One-to-One (1:1), One-to-Many (1:M), Many-to-Many (M:M with junction table).',
          'Data integrity rules: Entity integrity (primary key cannot be null), Referential integrity (foreign key must match an existing primary key).'
        ],
        commonExaminerTraps: [
          'Confusing field with record: Field is vertical (column representing one attribute like DateOfBirth), Record is horizontal (row representing all data for one entity).',
          'Forgetting that foreign keys enable referential integrity across related tables.'
        ],
        questions: [
          {
            id: 'mf-cs-q1',
            year: 2024,
            paper: 'Paper 1',
            questionNumber: 16,
            marks: 8,
            formLevel: 'Form 3',
            topicClassification: 'Relational Database Schema & Keys',
            questionText:
              'A high school library maintains a relational database with two tables:\n• STUDENTS (StudentID, FullName, Class, Dormitory)\n• BORROWED_BOOKS (BorrowID, StudentID, BookTitle, DateBorrowed, DateReturned)\n\nWhich statement correctly identifies the foreign key and explains its purpose in maintaining database integrity?',
            options: [
              {
                id: 'A',
                text: 'StudentID in BORROWED_BOOKS; links each borrowed book to the STUDENTS table to enforce referential integrity and prevent orphan records',
                isCorrect: true,
                explanation:
                  'Correct! StudentID is the primary key in STUDENTS and acts as a foreign key in BORROWED_BOOKS. It enforces referential integrity so that no book can be recorded as borrowed by a non-existent student.'
              },
              {
                id: 'B',
                text: 'BorrowID in STUDENTS; uniquely identifies each library book across all school classes',
                isCorrect: false,
                explanation:
                  'Incorrect. BorrowID is the primary key of BORROWED_BOOKS, not a foreign key in STUDENTS.'
              },
              {
                id: 'C',
                text: 'BookTitle in BORROWED_BOOKS; creates a composite key preventing duplicate checkouts',
                isCorrect: false,
                explanation:
                  'Incorrect. BookTitle is a standard attribute field, not a key field.'
              },
              {
                id: 'D',
                text: 'DateBorrowed in STUDENTS; ensures alphabetical ordering of library members',
                isCorrect: false,
                explanation:
                  'Incorrect. DateBorrowed does not even exist in the STUDENTS table.'
              }
            ],
            correctOptionId: 'A',
            solution:
              '(a) Primary Keys:\n• STUDENTS table: StudentID\n• BORROWED_BOOKS table: BorrowID\n\n(b) Foreign Key:\n• Foreign Key is StudentID in the BORROWED_BOOKS table.\n• Role: It links each borrowed book record back to the specific student in the STUDENTS table who borrowed it.\n\n(c) Relationship:\n• One-to-Many (1 : M) relationship (One student can borrow multiple books over time).\n\n(d) Importance of Referential Integrity:\n1. Prevents orphan records: It ensures that no book can be recorded as borrowed by a non-existent student.\n2. Prevents accidental deletion: If a student record is deleted from the STUDENTS table, all corresponding borrow records are either prevented from deletion or cascade updated.\n3. Maintains data consistency and accuracy across the library database.',
            markingBreakdown: [
              '1 Mark each for correct primary keys (2 Marks)',
              '1 Mark for identifying StudentID as foreign key + 1 Mark for explaining link role (2 Marks)',
              '1 Mark for One-to-Many relationship',
              '1 Mark each for 3 points on data consistency and preventing orphan records (3 Marks)'
            ],
            examinerWarning:
              'When defining a primary key, always state that it uniquely identifies a RECORD, not just a table.'
          }
        ]
      }
    ]
  }
];
