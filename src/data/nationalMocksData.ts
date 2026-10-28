export interface MockQuestion {
  id: string;
  questionNumber: string;
  marks: number;
  questionText: string;
  subQuestions?: {
    part: string;
    text: string;
    marks: number;
  }[];
  markingScheme: {
    steps: {
      stepText: string;
      markType: 'M1' | 'A1' | 'B1' | 'C1' | 'M2' | 'A2';
      explanation: string;
    }[];
    totalMarks: number;
    knecExaminerRule: string;
    commonCandidateMistake: string;
  };
}

export interface NationalMockPaper {
  id: string;
  consortiumName: string; // e.g. "Maranda High National Mock"
  year: number;
  subject: string;
  paperCode: string; // e.g., "121/2"
  paperName: string; // e.g., "Mathematics Paper 2"
  timeMinutes: number;
  totalMarks: number;
  overviewInstructions: string;
  questions: MockQuestion[];
}

export const NATIONAL_MOCK_PAPERS: NationalMockPaper[] = [
  {
    id: 'maranda-math-p2-2024',
    consortiumName: 'Maranda High School National Mock',
    year: 2024,
    subject: 'Mathematics',
    paperCode: '121/2',
    paperName: 'Mathematics Paper 2 (Calculus & Probability)',
    timeMinutes: 150,
    totalMarks: 50,
    overviewInstructions: 'Answer all questions in Section I and any five in Section II. Non-programmable silent electronic calculators and KNEC mathematical tables may be used.',
    questions: [
      {
        id: 'mm-q1',
        questionNumber: 'Question 1',
        marks: 3,
        questionText: 'Use logarithms correct to 4 decimal places to evaluate:\n\n$$\\sqrt[3]{\\frac{45.3 \\times 0.0084}{0.562}}$$',
        markingScheme: {
          steps: [
            {
              stepText: 'Log 45.3 = 1.6561, Log 0.0084 = \\bar{3}.9243. Numerator sum = 1.6561 + \\bar{3}.9243 = \\bar{2}.5804',
              markType: 'M1',
              explanation: 'Award M1 for correct log read-outs and characteristic separation'
            },
            {
              stepText: 'Log 0.562 = \\bar{1}.7497. Subtract denominator: \\bar{2}.5804 - \\bar{1}.7497 = \\bar{1}.8307',
              markType: 'M1',
              explanation: 'Award M1 for subtracting denominator log correctly with bar notation'
            },
            {
              stepText: 'Divide by 3: \\bar{1}.8307 / 3 = (\\bar{3} + 2.8307)/3 = \\bar{1}.9436. Antilog(\\bar{1}.9436) = 0.8782',
              markType: 'A1',
              explanation: 'Award A1 for correct bar-3 expansion and exact 4 s.f. antilog'
            }
          ],
          totalMarks: 3,
          knecExaminerRule: 'KNEC mandates that when dividing a negative characteristic that is not a multiple of the index, the student must rewrite the bar number (e.g., \\bar{1} into \\bar{3} + 2). Direct decimal conversion yields zero for method mark.',
          commonCandidateMistake: 'Entering -1.8307 into a standard calculator directly as -0.6102 instead of keeping mantissa strictly positive (0.9436).'
        }
      },
      {
        id: 'mm-q2',
        questionNumber: 'Question 2',
        marks: 4,
        questionText: 'A curve has equation $y = 2x^3 - 9x^2 + 12x - 3$.\n(a) Find the coordinates of the two turning points of the curve.\n(b) Determine the nature of each turning point (maximum or minimum) using the second derivative test.',
        markingScheme: {
          steps: [
            {
              stepText: 'dy/dx = 6x^2 - 18x + 12 = 0 => 6(x^2 - 3x + 2) = 0 => (x-1)(x-2) = 0 => x = 1 or x = 2',
              markType: 'M1',
              explanation: 'Award M1 for correct differentiation and equating to zero'
            },
            {
              stepText: 'When x=1, y = 2(1) - 9(1) + 12(1) - 3 = 2 => Point (1, 2). When x=2, y = 2(8) - 9(4) + 12(2) - 3 = 1 => Point (2, 1)',
              markType: 'A1',
              explanation: 'Award A1 for both coordinate pairs (1, 2) and (2, 1)'
            },
            {
              stepText: 'd^2y/dx^2 = 12x - 18. At x=1: 12(1) - 18 = -6 < 0 => (1,2) is a LOCAL MAXIMUM',
              markType: 'M1',
              explanation: 'Award M1 for evaluating d^2y/dx^2 at x=1 and deducing maximum'
            },
            {
              stepText: 'At x=2: 12(2) - 18 = +6 > 0 => (2,1) is a LOCAL MINIMUM',
              markType: 'A1',
              explanation: 'Award A1 for deducing local minimum correctly'
            }
          ],
          totalMarks: 4,
          knecExaminerRule: 'Candidates must explicitly state the sign of d^2y/dx^2 (< 0 or > 0) to earn the classification mark. Merely stating "maximum" without proof loses the mark.',
          commonCandidateMistake: 'Confusing the test: candidate writes d^2y/dx^2 > 0 is maximum (it is actually minimum).'
        }
      },
      {
        id: 'mm-q3',
        questionNumber: 'Question 3',
        marks: 10,
        questionText: 'A carpenter makes two types of furniture: standard desks (x) and executive chairs (y). Desks require 2 hours of carpentry and 1 hour of varnish. Chairs require 1 hour of carpentry and 3 hours of varnish. Total carpentry time available per week is 40 hours, and total varnishing time is 45 hours. The carpenter must make at least 5 desks and at least 4 chairs.\n(a) Write down four linear inequalities representing these conditions.\n(b) By drawing a search line or evaluating vertices, find the number of each furniture piece that maximizes weekly profit if each desk yields KSh 800 profit and each chair yields KSh 1,200 profit.',
        markingScheme: {
          steps: [
            {
              stepText: 'Inequalities: 2x + y <= 40, x + 3y <= 45, x >= 5, y >= 4',
              markType: 'B1',
              explanation: 'Award B1 for all 4 inequalities correctly formulated with >= and <='
            },
            {
              stepText: 'Boundary lines plotted: 2x + y = 40 (intercepts (0,40),(20,0)), x + 3y = 45 (intercepts (0,15),(45,0)), x=5, y=4',
              markType: 'M2',
              explanation: 'Award M1 for each correct line pair plotted on grid'
            },
            {
              stepText: 'Feasible region correctly bounded with unwanted regions shaded out.',
              markType: 'A1',
              explanation: 'Award A1 for clean unshaded feasible polygon'
            },
            {
              stepText: 'Intersection of 2x + y = 40 and x + 3y = 45: x = 15, y = 10. Vertices: (5,4), (18,4), (15,10), (5, 13.33 -> integer (5,13))',
              markType: 'M1',
              explanation: 'Award M1 for identifying critical vertex coordinates'
            },
            {
              stepText: 'Evaluate Objective Function P = 800x + 1200y: At (15,10) => P = 800(15) + 1200(10) = 12000 + 12000 = KSh 24,000 (MAXIMUM)',
              markType: 'A2',
              explanation: 'Award A2 for optimal combination: 15 desks and 10 chairs yielding maximum profit KSh 24,000'
            }
          ],
          totalMarks: 10,
          knecExaminerRule: 'Shading must be done on the UNWANTED region. If a candidate shades the feasible region instead, 0 marks are awarded for the entire diagram.',
          commonCandidateMistake: 'Drawing dotted lines instead of solid lines for <= and >=; using non-integer values when furniture items cannot be broken into fractions.'
        }
      }
    ]
  },
  {
    id: 'kenya-high-bio-p2-2024',
    consortiumName: 'The Kenya High School Joint Mock',
    year: 2024,
    subject: 'Biology',
    paperCode: '231/2',
    paperName: 'Biology Paper 2 (Theory & Genetics)',
    timeMinutes: 120,
    totalMarks: 40,
    overviewInstructions: 'Write your answers in the spaces provided. Answer question 1 (compulsory) and any other four questions.',
    questions: [
      {
        id: 'kh-q1',
        questionNumber: 'Question 1',
        marks: 8,
        questionText: 'In a breeding experiment, pure-breeding normal winged fruit flies (Drosophila melanogaster) with red eyes were crossed with vestigial winged flies with sepia eyes. All F1 offspring had normal wings and red eyes.\n(a) What are the dominant characteristics?\n(b) If an F1 female was test-crossed with a double recessive male, write down the phenotypic ratio expected if the genes are on separate chromosomes (independent assortment).\n(c) State two practical applications of genetic engineering in Kenyan agriculture.',
        markingScheme: {
          steps: [
            {
              stepText: 'Dominant traits: Normal wings and Red eyes',
              markType: 'B1',
              explanation: 'Award B1 (1/2 mark each) for identifying the F1 expressed phenotypes'
            },
            {
              stepText: 'Let N = normal, n = vestigial; R = red, r = sepia. F1 genotype: NnRr. Test cross: NnRr x nnrr.',
              markType: 'M1',
              explanation: 'Award M1 for correct genetic cross layout'
            },
            {
              stepText: 'Gametes: NR, Nr, nR, nr from female, nr from male. Phenotypes: 1 Normal Red : 1 Normal Sepia : 1 Vestigial Red : 1 Vestigial Sepia (1:1:1:1 ratio)',
              markType: 'A1',
              explanation: 'Award A1 for exact 1:1:1:1 ratio with phenotypes explicitly stated'
            },
            {
              stepText: 'Applications: (i) Development of Bt-cotton resistant to African bollworm; (ii) Drought-tolerant maize varieties (WEMA/TELA maize) by KALRO; (iii) Disease-resistant banana plantlets via tissue culture.',
              markType: 'B1',
              explanation: 'Award 1 mark each for two valid Kenyan agricultural biotechnology examples (max 2)'
            }
          ],
          totalMarks: 8,
          knecExaminerRule: 'In genetic crosses, letters used for alleles MUST show clear uppercase vs lowercase distinction. Crossing symbols (x) and labeling of Parents, Gametes, and Offspring genotypes are mandatory.',
          commonCandidateMistake: 'Omitting phenotypic descriptions and just writing "1:1:1:1" without telling which combination corresponds to which number.'
        }
      },
      {
        id: 'kh-q2',
        questionNumber: 'Question 2',
        marks: 6,
        questionText: 'Explain the physiological response of the mammalian nephron when a human being is severely dehydrated after walking across the Chalbi desert under 38°C ambient temperature.',
        markingScheme: {
          steps: [
            {
              stepText: 'Hypothalamus osmoreceptors detect elevated blood osmotic pressure (low blood water potential).',
              markType: 'M1',
              explanation: 'Award M1 for mentioning hypothalamus sensing elevated osmotic pressure'
            },
            {
              stepText: 'Posterior lobe of pituitary gland secretes Antidiuretic Hormone (ADH / Vasopressin) into bloodstream.',
              markType: 'A1',
              explanation: 'Award A1 for naming posterior pituitary and ADH hormone'
            },
            {
              stepText: 'ADH travels to kidney and increases permeability of distal convoluted tubule (DCT) and collecting duct to water.',
              markType: 'M1',
              explanation: 'Award M1 for DCT and collecting duct permeability increase'
            },
            {
              stepText: 'More water is reabsorbed by osmosis into the medullary capillaries; adrenal cortex also releases Aldosterone to conserve Na+ ions.',
              markType: 'A1',
              explanation: 'Award A1 for facultative water reabsorption by osmosis'
            },
            {
              stepText: 'Outcome: A small volume of highly concentrated (hypertonic) urine is excreted, restoring body water balance.',
              markType: 'B1',
              explanation: 'Award B1 for small volume, concentrated urine conclusion'
            }
          ],
          totalMarks: 6,
          knecExaminerRule: 'Candidate must specify WHICH part of the nephron ADH affects (Distal Convoluted Tubule and Collecting Duct). Stating "it acts on the kidney" is too vague and earns no mark.',
          commonCandidateMistake: 'Stating that the kidney "creates water" or confusing ADH with insulin/glucagon.'
        }
      }
    ]
  },
  {
    id: 'alliance-physics-p1-2024',
    consortiumName: 'Alliance High School Pre-KCSE National Trial',
    year: 2024,
    subject: 'Physics',
    paperCode: '232/1',
    paperName: 'Physics Paper 1 (Mechanics, Gas Laws & Heat)',
    timeMinutes: 120,
    totalMarks: 40,
    overviewInstructions: 'Take acceleration due to gravity g = 10 m/s^2, density of water = 1000 kg/m^3, specific heat capacity of water = 4200 J/kg·K.',
    questions: [
      {
        id: 'ah-q1',
        questionNumber: 'Question 1',
        marks: 5,
        questionText: 'A car of mass 1,200 kg traveling at 72 km/h collides head-on with a stationary truck of mass 4,800 kg. After impact, the two vehicles lock together and slide along the tarmac road until stopping. The coefficient of dynamic friction between tires and tarmac is 0.4.\n(a) Convert 72 km/h to m/s.\n(b) Calculate the common velocity immediately after impact.\n(c) Determine the distance the locked wreckage slides before coming to rest.',
        markingScheme: {
          steps: [
            {
              stepText: 'Velocity v = (72 * 1000) / 3600 = 20 m/s',
              markType: 'B1',
              explanation: 'Award B1 for correct SI unit conversion'
            },
            {
              stepText: 'Total momentum before = Total momentum after: m1*u1 + m2*u2 = (m1 + m2)*V => (1200 * 20) + (4800 * 0) = (1200 + 4800) * V',
              markType: 'M1',
              explanation: 'Award M1 for equating momentum before and after collision'
            },
            {
              stepText: '24,000 = 6,000 * V => V = 4 m/s',
              markType: 'A1',
              explanation: 'Award A1 for common velocity V = 4 m/s'
            },
            {
              stepText: 'Frictional retarding force F_r = mu * R = mu * m * g = 0.4 * 6000 * 10 = 24,000 N. Retardation a = F/m = 24,000 / 6000 = 4 m/s^2 (or a = mu*g = 0.4*10 = 4 m/s^2)',
              markType: 'M1',
              explanation: 'Award M1 for deceleration calculation'
            },
            {
              stepText: 'Using v^2 = u^2 - 2as => 0 = 4^2 - 2(4)(s) => 8s = 16 => s = 2.0 metres',
              markType: 'A1',
              explanation: 'Award A1 for sliding distance s = 2.0 m'
            }
          ],
          totalMarks: 5,
          knecExaminerRule: 'Failure to include units (m/s, m) in the final answer forfeits the accuracy mark A1.',
          commonCandidateMistake: 'Forgetting to add the mass of the car to the mass of the truck when calculating common mass (6,000 kg).'
        }
      }
    ]
  }
];
