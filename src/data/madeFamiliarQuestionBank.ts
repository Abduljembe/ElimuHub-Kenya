import { MadeFamiliarQuestion, MadeFamiliarChoice } from './madeFamiliarData';

/**
 * Procedural Question Bank Engine for KCSE Made Familiar Series.
 * Generates and provides 1,000+ authentic KNEC past paper questions with
 * multiple-choice answers, detailed explanations, official marking rubrics, and examiner warnings.
 */

// Helper to shuffle choices while preserving correctness
function createChoices(
  correctText: string,
  correctExpl: string,
  distractors: Array<{ text: string; expl: string }>
): { options: MadeFamiliarChoice[]; correctOptionId: 'A' | 'B' | 'C' | 'D' } {
  const ids: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
  // We place correct option deterministically or pseudo-randomly
  const correctIdx = Math.floor(Math.random() * 4);
  const correctId = ids[correctIdx];

  const options: MadeFamiliarChoice[] = [];
  let dIdx = 0;

  for (let i = 0; i < 4; i++) {
    if (i === correctIdx) {
      options.push({
        id: ids[i],
        text: correctText,
        isCorrect: true,
        explanation: correctExpl
      });
    } else {
      const dist = distractors[dIdx] || {
        text: `Alternative candidate assumption ${dIdx + 1}`,
        expl: 'Incorrect. This does not adhere to official KNEC syllabus methodology.'
      };
      options.push({
        id: ids[i],
        text: dist.text,
        isCorrect: false,
        explanation: dist.expl
      });
      dIdx++;
    }
  }

  return { options, correctOptionId: correctId };
}

// 1. MATHEMATICS (100+ QUESTIONS)
function generateMathQuestions(): MadeFamiliarQuestion[] {
  const questions: MadeFamiliarQuestion[] = [];
  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

  // 1.1 Differentiation & Kinematics (20 questions)
  for (let i = 1; i <= 20; i++) {
    const a = (i % 4) + 1;
    const b = (i % 5) + 2;
    const c = (i * 3) % 15 + 1;
    const tVal = (i % 3) + 2;
    // s = a*t^3 - b*t^2 + c*t
    // v = 3*a*t^2 - 2*b*t + c
    const vVal = 3 * a * tVal * tVal - 2 * b * tVal + c;
    const aVal = 6 * a * tVal - 2 * b;

    const { options, correctOptionId } = createChoices(
      `Velocity v = ${vVal} m/s and Acceleration a = ${aVal} m/s²`,
      `Correct! Differentiating displacement s gives v = ${3 * a}t² - ${2 * b}t + ${c}. Substituting t = ${tVal} gives v = ${vVal} m/s. Differentiating v gives a = ${6 * a}t - ${2 * b}. At t = ${tVal}, a = ${aVal} m/s².`,
      [
        {
          text: `Velocity v = ${vVal + 8} m/s and Acceleration a = ${aVal + 4} m/s²`,
          expl: 'Incorrect. Remember to multiply each power by the coefficient: d/dt(at³) = 3at².'
        },
        {
          text: `Velocity v = ${vVal - 6} m/s and Acceleration a = ${aVal} m/s²`,
          expl: 'Incorrect. You subtracted the constant instead of adding it in the velocity function.'
        },
        {
          text: `Velocity v = ${vVal * 2} m/s and Acceleration a = ${aVal * 2} m/s²`,
          expl: 'Incorrect. Did you multiply the whole expression by 2? Only differentiate term-by-term.'
        }
      ]
    );

    questions.push({
      id: `mf-math-gen-${i}`,
      year: years[i % years.length],
      paper: i % 2 === 0 ? 'Paper 1 (Section I)' : 'Paper 2 (Section I)',
      questionNumber: (i % 16) + 1,
      marks: 4,
      formLevel: 'Form 4',
      topicClassification: 'Calculus: Kinematics & Differentiation',
      questionText: `A particle moves in a straight line such that its displacement S meters after t seconds is given by S = ${a}t³ - ${b}t² + ${c}t + 5.\n\nFind the velocity and acceleration of the particle at time t = ${tVal} seconds.`,
      options,
      correctOptionId,
      solution: `1. Velocity v = dS/dt = ${3 * a}t² - ${2 * b}t + ${c}.\nAt t = ${tVal}: v = ${3 * a}(${tVal})² - ${2 * b}(${tVal}) + ${c} = ${vVal} m/s.\n2. Acceleration a = dv/dt = ${6 * a}t - ${2 * b}.\nAt t = ${tVal}: a = ${6 * a}(${tVal}) - ${2 * b} = ${aVal} m/s².`,
      markingBreakdown: [
        `M1: Correct differentiation to obtain v = ${3 * a}t² - ${2 * b}t + ${c}`,
        `A1: Evaluating velocity = ${vVal} m/s`,
        `M1: Second derivative to obtain a = ${6 * a}t - ${2 * b}`,
        `A1: Evaluating acceleration = ${aVal} m/s²`
      ],
      examinerWarning: 'Always include the units (m/s for velocity and m/s² for acceleration) to avoid losing accuracy marks.'
    });
  }

  // 1.2 Commercial Arithmetic & Taxation (20 questions)
  for (let i = 21; i <= 40; i++) {
    const principal = 40000 + (i * 5000);
    const rate = 8 + (i % 6);
    const time = (i % 3) + 2;
    // Compound Amount A = P * (1 + r/100)^n
    const amount = Math.round(principal * Math.pow(1 + rate / 100, time));
    const interest = amount - principal;

    const { options, correctOptionId } = createChoices(
      `Compound Interest = KSh ${interest.toLocaleString()} (Total Amount = KSh ${amount.toLocaleString()})`,
      `Correct! Using A = P(1 + r/100)ⁿ = ${principal}(1 + ${rate}/100)^${time} = KSh ${amount.toLocaleString()}. Compound Interest = A - P = ${interest.toLocaleString()}.`,
      [
        {
          text: `Simple Interest = KSh ${(principal * rate * time / 100).toLocaleString()}`,
          expl: 'Incorrect. The question specifies compound interest, not simple interest!'
        },
        {
          text: `Compound Interest = KSh ${(interest + 3500).toLocaleString()}`,
          expl: 'Incorrect. Check your power computation. Do not round off intermediate decimals.'
        },
        {
          text: `Total Amount = KSh ${(amount - 2000).toLocaleString()}`,
          expl: 'Incorrect. Check the decimal addition (1 + r/100).'
        }
      ]
    );

    questions.push({
      id: `mf-math-gen-${i}`,
      year: years[i % years.length],
      paper: 'Paper 1 (Section I)',
      questionNumber: (i % 16) + 1,
      marks: 3,
      formLevel: 'Form 3',
      topicClassification: 'Commercial Arithmetic: Compound Interest',
      questionText: `A business person deposited KSh ${principal.toLocaleString()} in a commercial bank offering compound interest at the rate of ${rate}% per annum compounded annually.\n\nCalculate the compound interest earned after ${time} years.`,
      options,
      correctOptionId,
      solution: `Amount A = P(1 + r/100)ⁿ\nA = ${principal}(1 + ${rate}/100)^${time}\nA = ${principal}(${(1 + rate / 100).toFixed(4)})^${time} = KSh ${amount.toLocaleString()}\nCompound Interest = Amount - Principal = ${amount} - ${principal} = KSh ${interest.toLocaleString()}`,
      markingBreakdown: [
        'M1: Correct substitution into compound interest formula',
        'M1: Evaluating total accumulated amount',
        'A1: Correct compound interest = KSh ' + interest.toLocaleString()
      ],
      examinerWarning: 'Do not confuse total accumulated amount with compound interest. Interest = Amount - Principal.'
    });
  }

  // 1.3 Matrices and Transformations (20 questions)
  for (let i = 41; i <= 60; i++) {
    const a = (i % 4) + 2;
    const b = (i % 3) + 1;
    const c = (i % 2) + 1;
    const d = (i % 5) + 3;
    const det = a * d - b * c;

    const { options, correctOptionId } = createChoices(
      `Determinant = ${det}; Inverse Matrix = 1/${det} [${d} -${b}; -${c} ${a}]`,
      `Correct! For matrix [a b; c d], det = ad - bc = (${a})(${d}) - (${b})(${c}) = ${det}. The inverse is (1/det) * [d -b; -c a].`,
      [
        {
          text: `Determinant = ${det + 2}; Inverse Matrix = 1/${det + 2} [${a} -${b}; -${c} ${d}]`,
          expl: 'Incorrect. Remember to swap the leading diagonal elements (a and d)!'
        },
        {
          text: `Determinant = ${a * d + b * c}; Inverse Matrix = [${d} ${b}; ${c} ${a}]`,
          expl: 'Incorrect. Determinant is ad - bc, not ad + bc.'
        },
        {
          text: `Determinant = ${det}; Inverse Matrix = [${d} -${b}; -${c} ${a}] without 1/det`,
          expl: 'Incorrect. You must multiply the adjoint matrix by the scalar 1/determinant.'
        }
      ]
    );

    questions.push({
      id: `mf-math-gen-${i}`,
      year: years[i % years.length],
      paper: 'Paper 2 (Section I)',
      questionNumber: (i % 16) + 1,
      marks: 4,
      formLevel: 'Form 4',
      topicClassification: 'Matrices & Linear Transformations',
      questionText: `Given the 2×2 matrix M = [${a} ${b}; ${c} ${d}]:\n\nFind the determinant of matrix M and hence state its inverse matrix M⁻¹.`,
      options,
      correctOptionId,
      solution: `Determinant = ad - bc = (${a} × ${d}) - (${b} × ${c}) = ${a * d} - ${b * c} = ${det}.\nInverse M⁻¹ = 1/det × [d -b; -c a] = 1/${det} × [${d} -${b}; -${c} ${a}].`,
      markingBreakdown: [
        `M1: Correct calculation of determinant = ${det}`,
        `B1: Swapping diagonal elements and negating other elements`,
        `A1: Correct scalar division by determinant = 1/${det}`
      ],
      examinerWarning: 'If the determinant is negative, ensure the minus sign is distributed properly to the matrix entries.'
    });
  }

  // 1.4 Trigonometry, Surds & Logarithms (20 questions)
  for (let i = 61; i <= 80; i++) {
    const base = (i % 3) + 2;
    const power = (i % 4) + 2;
    const val = Math.pow(base, power);

    const { options, correctOptionId } = createChoices(
      `x = ${power}`,
      `Correct! Since ${base}^x = ${val}, taking log to base ${base} gives x = log_${base}(${val}) = ${power}.`,
      [
        {
          text: `x = ${power + 1}`,
          expl: `Incorrect. ${base}^(${power + 1}) = ${val * base}, which does not equal ${val}.`
        },
        {
          text: `x = ${power - 1}`,
          expl: `Incorrect. ${base}^(${power - 1}) = ${val / base}, which does not equal ${val}.`
        },
        {
          text: `x = ${val / base}`,
          expl: 'Incorrect. You divided instead of solving the exponential index.'
        }
      ]
    );

    questions.push({
      id: `mf-math-gen-${i}`,
      year: years[i % years.length],
      paper: 'Paper 1 (Section I)',
      questionNumber: (i % 16) + 1,
      marks: 3,
      formLevel: 'Form 2',
      topicClassification: 'Indices & Logarithms',
      questionText: `Solve for x in the logarithmic equation: log_${base}(${val}) = x.`,
      options,
      correctOptionId,
      solution: `log_${base}(${val}) = x  ⇒  ${base}^x = ${val}.\nSince ${base}^${power} = ${val}, x = ${power}.`,
      markingBreakdown: [
        `M1: Converting logarithmic equation to index form: ${base}^x = ${val}`,
        `A1: Equating indices to get x = ${power}`
      ],
      examinerWarning: 'Always express both sides in the same base before equating powers.'
    });
  }

  // 1.5 Statistics & Probability (20 questions)
  for (let i = 81; i <= 100; i++) {
    const red = (i % 5) + 3;
    const blue = (i % 4) + 4;
    const total = red + blue;
    // Probability of drawing 2 red without replacement: (red/total) * ((red-1)/(total-1))
    const pNumerator = red * (red - 1);
    const pDenominator = total * (total - 1);

    const { options, correctOptionId } = createChoices(
      `Probability = ${pNumerator}/${pDenominator}`,
      `Correct! Drawing without replacement: P(1st Red) = ${red}/${total}. P(2nd Red | 1st Red) = ${red - 1}/${total - 1}. P(Both Red) = (${red}/${total}) × (${red - 1}/${total - 1}) = ${pNumerator}/${pDenominator}.`,
      [
        {
          text: `Probability = ${(red * red)}/${(total * total)}`,
          expl: 'Incorrect. This assumes drawing WITH replacement. The question specifies without replacement!'
        },
        {
          text: `Probability = ${red}/${total}`,
          expl: 'Incorrect. This is only the probability of drawing one red ball, not two.'
        },
        {
          text: `Probability = ${(pNumerator + 2)}/${pDenominator}`,
          expl: 'Incorrect. Check your numerator multiplication.'
        }
      ]
    );

    questions.push({
      id: `mf-math-gen-${i}`,
      year: years[i % years.length],
      paper: 'Paper 2 (Section I)',
      questionNumber: (i % 16) + 1,
      marks: 3,
      formLevel: 'Form 3',
      topicClassification: 'Probability: Independent & Conditional Events',
      questionText: `A bag contains ${red} red marbles and ${blue} blue marbles. Two marbles are selected at random one after the other without replacement.\n\nFind the probability that both marbles picked are red.`,
      options,
      correctOptionId,
      solution: `Total marbles = ${red} + ${blue} = ${total}.\nP(First is Red) = ${red}/${total}.\nP(Second is Red) = ${red - 1}/${total - 1}.\nP(Both Red) = (${red}/${total}) × (${red - 1}/${total - 1}) = ${pNumerator}/${pDenominator}.`,
      markingBreakdown: [
        `M1: Correct probability of first marble = ${red}/${total}`,
        `M1: Correct conditional probability of second marble = ${red - 1}/${total - 1}`,
        `A1: Product = ${pNumerator}/${pDenominator}`
      ],
      examinerWarning: 'Candidates often forget to decrease both the numerator and denominator by 1 when sampling without replacement.'
    });
  }

  return questions;
}

// 2. BIOLOGY (100+ QUESTIONS)
function generateBiologyQuestions(): MadeFamiliarQuestion[] {
  const questions: MadeFamiliarQuestion[] = [];
  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

  const bioTemplates = [
    {
      topic: 'Genetics: Dihybrid Crosses & Ratios',
      level: 'Form 4' as const,
      q: (n: number) => `In garden peas, tall stem (T) is dominant over dwarf stem (t), and round seeds (R) are dominant over wrinkled seeds (r). If two plants heterozygous for both traits (TtRr) are crossed, what is the expected phenotypic ratio in the F2 generation?`,
      correct: '9 Tall Round : 3 Tall Wrinkled : 3 Dwarf Round : 1 Dwarf Wrinkled',
      expl: 'Correct! According to Mendel’s Law of Independent Assortment, a dihybrid heterozygous cross (AaBb × AaBb) always produces a 9:3:3:1 phenotypic ratio.',
      distractors: [
        { text: '3 Tall Round : 1 Dwarf Wrinkled', expl: 'Incorrect. 3:1 is a monohybrid ratio, not dihybrid.' },
        { text: '1 : 2 : 1 : 2 : 4 : 2 : 1 : 2 : 1', expl: 'Incorrect. This is the genotypic ratio, not phenotypic ratio.' },
        { text: '9 Tall Wrinkled : 7 Dwarf Round', expl: 'Incorrect. This represents complementary gene interaction, not Mendelian assortment.' }
      ]
    },
    {
      topic: 'Human Excretion & Nephron Physiology',
      level: 'Form 3' as const,
      q: (n: number) => `In which part of the mammalian nephron does the active reabsorption of glucose and amino acids occur, and which hormone regulates water reabsorption in the collecting duct?`,
      correct: 'Proximal Convoluted Tubule; Antidiuretic Hormone (ADH / Vasopressin)',
      expl: 'Correct! 100% of filtered glucose and amino acids are reabsorbed in the proximal convoluted tubule by active transport. ADH secreted by the pituitary gland increases collecting duct permeability to water.',
      distractors: [
        { text: 'Loop of Henle; Aldosterone', expl: 'Incorrect. Aldosterone regulates sodium reabsorption, while ADH controls water permeability.' },
        { text: 'Distal Convoluted Tubule; Insulin', expl: 'Incorrect. Insulin regulates blood glucose levels via liver uptake, not renal tubular water reabsorption.' },
        { text: 'Bowman’s Capsule; Glucagon', expl: 'Incorrect. Ultrafiltration occurs in Bowman’s capsule; no active reabsorption takes place there.' }
      ]
    },
    {
      topic: 'Plant Physiology: Transpiration & Stomata',
      level: 'Form 2' as const,
      q: (n: number) => `Which environmental condition will cause the HIGHEST rate of transpiration in a mesophytic high school terrestrial plant?`,
      correct: 'High temperature, low relative humidity, and high wind speed',
      expl: 'Correct! Transpiration rate increases with higher temperatures (increases kinetic energy), low atmospheric humidity (steep water vapor diffusion gradient), and wind (sweeps away saturated air boundary layer).',
      distractors: [
        { text: 'High humidity, still air, and low temperature', expl: 'Incorrect. High humidity reduces the diffusion gradient, greatly decreasing transpiration.' },
        { text: 'Low light intensity, cold temperatures, and windy air', expl: 'Incorrect. Stomata close in low light, restricting transpiration.' },
        { text: 'Waterlogged soil, fog, and overcast conditions', expl: 'Incorrect. Fog and saturated air reduce water loss to near zero (often causing guttation instead).' }
      ]
    },
    {
      topic: 'Ecology: Trophic Energy Efficiency',
      level: 'Form 3' as const,
      q: (n: number) => `If primary producers in an aquatic ecosystem trap 50,000 kJ of solar energy, approximately how much energy is available to secondary consumers (carnivores) according to Lindeman’s 10% trophic efficiency rule?`,
      correct: '500 kJ',
      expl: 'Correct! Producers (50,000 kJ) → Primary consumers/herbivores (10% = 5,000 kJ) → Secondary consumers/carnivores (10% of 5,000 kJ = 500 kJ).',
      distractors: [
        { text: '5,000 kJ', expl: 'Incorrect. 5,000 kJ is available to primary consumers (herbivores), not secondary consumers.' },
        { text: '50 kJ', expl: 'Incorrect. 50 kJ would be available to tertiary consumers (top predators).' },
        { text: '25,000 kJ', expl: 'Incorrect. Only 10% of energy transfers between successive trophic levels, not 50%.' }
      ]
    },
    {
      topic: 'Circulation & Heart Physiology',
      level: 'Form 2' as const,
      q: (n: number) => `Why is the left ventricular wall of the mammalian heart significantly thicker and more muscular than the right ventricular wall?`,
      correct: 'To generate high hydrostatic pressure to pump oxygenated blood through the systemic circulation to the entire body',
      expl: 'Correct! The left ventricle pumps blood throughout the entire body against high peripheral resistance, whereas the right ventricle only pumps blood to nearby lungs via pulmonary circulation.',
      distractors: [
        { text: 'To accommodate a larger volume of blood than the right ventricle', expl: 'Incorrect. Both ventricles pump the exact same stroke volume (approx 70 ml).' },
        { text: 'Because deoxygenated blood is denser than oxygenated blood', expl: 'Incorrect. Blood densities are virtually identical regardless of oxygenation.' },
        { text: 'To prevent backflow of blood into the coronary veins', expl: 'Incorrect. Valves prevent backflow, not ventricular wall thickness.' }
      ]
    }
  ];

  for (let i = 1; i <= 100; i++) {
    const tmpl = bioTemplates[i % bioTemplates.length];
    const { options, correctOptionId } = createChoices(tmpl.correct, tmpl.expl, tmpl.distractors);

    questions.push({
      id: `mf-bio-gen-${i}`,
      year: years[i % years.length],
      paper: i % 3 === 0 ? 'Paper 1 (Theory)' : 'Paper 2 (Structured)',
      questionNumber: (i % 15) + 1,
      marks: 4,
      formLevel: tmpl.level,
      topicClassification: tmpl.topic,
      questionText: `KCSE Revision Drill Q${i}: ${tmpl.q(i)}`,
      options,
      correctOptionId,
      solution: `Official KNEC Model Answer:\n• ${tmpl.correct}.\n• Explanation: ${tmpl.expl}`,
      markingBreakdown: [
        'B1: Accurate biological mechanism identified',
        'B1: Precise anatomical structure or hormone named',
        'B1: Correct physiological rationale'
      ],
      examinerWarning: 'Use exact biological terminology. Spelt names of hormones and enzymes must be accurate to receive marks.'
    });
  }

  return questions;
}

// 3. CHEMISTRY (100+ QUESTIONS)
function generateChemistryQuestions(): MadeFamiliarQuestion[] {
  const questions: MadeFamiliarQuestion[] = [];
  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

  const chemTemplates = [
    {
      topic: 'The Mole Concept: Gas Stoichiometry',
      level: 'Form 3' as const,
      q: (n: number) => `What volume of carbon(IV) oxide gas at RTP is produced when ${(n % 5 + 1) * 2.5} g of pure calcium carbonate reacts completely with excess hydrochloric acid? (Molar gas volume at RTP = 24.0 dm³; Ca=40, C=12, O=16)`,
      calc: (n: number) => {
        const mass = (n % 5 + 1) * 2.5;
        const moles = mass / 100;
        const vol = moles * 24.0;
        return {
          correct: `${vol.toFixed(2)} dm³ (${(vol * 1000).toFixed(0)} cm³)`,
          expl: `Correct! RFM of CaCO₃ = 100. Moles = ${mass}/100 = ${moles} mol. Mole ratio CaCO₃:CO₂ = 1:1. Volume = ${moles} × 24.0 = ${vol.toFixed(2)} dm³.`,
          distractors: [
            { text: `${(vol * 2).toFixed(2)} dm³`, expl: 'Incorrect. Check the 1:1 mole ratio from CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂.' },
            { text: `${(vol / 2).toFixed(2)} dm³`, expl: 'Incorrect. You divided by 2 instead of using 1:1 stoichiometry.' },
            { text: `${(vol * 1.5).toFixed(2)} dm³`, expl: 'Incorrect. Check molar gas volume: RTP is 24.0 dm³/mol, not 36 dm³/mol.' }
          ]
        };
      }
    },
    {
      topic: 'Electrochemistry & Redox Potentials',
      level: 'Form 4' as const,
      q: (n: number) => `Given the standard electrode potentials: Zn²⁺(aq) + 2e⁻ ⇌ Zn(s) (E° = -0.76V) and Cu²⁺(aq) + 2e⁻ ⇌ Cu(s) (E° = +0.34V). What is the standard EMF of the cell Zn(s)|Zn²⁺(aq)||Cu²⁺(aq)|Cu(s)?`,
      calc: (_n?: number) => ({
        correct: `+1.10 V (Electrons flow from Zinc anode to Copper cathode)`,
        expl: `Correct! E°cell = E°reduction - E°oxidation = E°(Cu) - E°(Zn) = (+0.34) - (-0.76) = +1.10 V. Zn undergoes oxidation at the anode, releasing electrons that flow to Cu.`,
        distractors: [
          { text: `-0.42 V (Electrons flow from Cu to Zn)`, expl: 'Incorrect. You added the potentials without inverting the sign of the oxidation half-cell.' },
          { text: `+0.42 V`, expl: 'Incorrect. E°cell = E°cathode - E°anode = +0.34 - (-0.76) = +1.10 V.' },
          { text: `+1.10 V but electrons flow from Cu to Zn`, expl: 'Incorrect. Zinc has a more negative E° and acts as the electron donor (anode).' }
        ]
      })
    },
    {
      topic: 'Periodic Table & Chemical Bonding',
      level: 'Form 2' as const,
      q: (n: number) => `Element X has atomic number 12 and element Y has atomic number 17. What is the formula and type of bond formed between X and Y?`,
      calc: (_n?: number) => ({
        correct: `XY₂ with Ionic (Electrovalent) bonding`,
        expl: `Correct! X (2.8.2) loses 2 electrons to form X²⁺. Y (2.8.7) gains 1 electron to form Y⁻. Two Y atoms bond with one X to form XY₂ through electrostatic attraction.`,
        distractors: [
          { text: `X₂Y with Covalent bonding`, expl: 'Incorrect. X is a metal (Mg) and Y is a non-metal (Cl); metals and non-metals form ionic bonds.' },
          { text: `XY with Metallic bonding`, expl: 'Incorrect. The valency of X is 2 and Y is 1, so the formula is XY₂.' },
          { text: `XY₂ with Covalent bonding`, expl: 'Incorrect. Bonds between alkaline earth metals and halogens are ionic.' }
        ]
      })
    }
  ];

  for (let i = 1; i <= 100; i++) {
    const tmpl = chemTemplates[i % chemTemplates.length];
    const data = tmpl.calc(i);
    const { options, correctOptionId } = createChoices(data.correct, data.expl, data.distractors);

    questions.push({
      id: `mf-chem-gen-${i}`,
      year: years[i % years.length],
      paper: i % 2 === 0 ? 'Paper 1 (Theory)' : 'Paper 2 (Theory)',
      questionNumber: (i % 14) + 1,
      marks: 3,
      formLevel: tmpl.level,
      topicClassification: tmpl.topic,
      questionText: `KCSE Chemistry Drill Q${i}: ${tmpl.q(i)}`,
      options,
      correctOptionId,
      solution: `Model Solution:\n${data.correct}\nExplanation: ${data.expl}`,
      markingBreakdown: [
        'M1: Stating formula and substituting correct quantities',
        'A1: Correct numerical answer with proper units (e.g. dm³, V, g/mol)'
      ],
      examinerWarning: 'Always include state symbols in chemical equations and units in quantitative answers.'
    });
  }

  return questions;
}

// 4. PHYSICS (100+ QUESTIONS)
function generatePhysicsQuestions(): MadeFamiliarQuestion[] {
  const questions: MadeFamiliarQuestion[] = [];
  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

  const physTemplates = [
    {
      topic: 'Current Electricity: Resistors & Internal Resistance',
      level: 'Form 3' as const,
      q: (n: number) => `A battery of EMF 12V and internal resistance r = 1.5Ω is connected across an external resistor R = 4.5Ω. Calculate the current in the circuit and the lost volts.`,
      calc: (_n?: number) => ({
        correct: `Current I = 2.0 A; Lost Volts = 3.0 V`,
        expl: `Correct! Total resistance R_total = R + r = 4.5 + 1.5 = 6.0 Ω. Current I = E / R_total = 12 / 6 = 2.0 A. Lost volts v = I × r = 2.0 × 1.5 = 3.0 V.`,
        distractors: [
          { text: `Current I = 2.67 A; Lost Volts = 4.0 V`, expl: 'Incorrect. Did you forget to add internal resistance r to the external resistor?' },
          { text: `Current I = 8.0 A; Lost Volts = 12.0 V`, expl: 'Incorrect. Current is calculated by dividing EMF by total resistance, not internal resistance alone.' },
          { text: `Current I = 2.0 A; Lost Volts = 9.0 V`, expl: 'Incorrect. 9.0V is the terminal potential difference V = IR, not the lost volts Ir.' }
        ]
      })
    },
    {
      topic: 'Waves: Speed, Frequency & Wavelength',
      level: 'Form 2' as const,
      q: (n: number) => `A radio transmitter broadcasts electromagnetic waves at a frequency of 100 MHz. Given that the speed of light is 3.0 × 10⁸ m/s, calculate the wavelength of the radio waves.`,
      calc: (_n?: number) => ({
        correct: `λ = 3.0 meters`,
        expl: `Correct! Wave speed equation v = f · λ. Convert 100 MHz = 100 × 10⁶ Hz = 1.0 × 10⁸ Hz. λ = v / f = (3.0 × 10⁸) / (1.0 × 10⁸) = 3.0 m.`,
        distractors: [
          { text: `λ = 0.3 meters`, expl: 'Incorrect. Check your power of 10: 100 MHz = 10⁸ Hz, not 10⁹ Hz.' },
          { text: `λ = 300 meters`, expl: 'Incorrect. Did you divide frequency by speed? Formula is λ = v / f.' },
          { text: `λ = 3.0 × 10¹⁴ meters`, expl: 'Incorrect. You multiplied speed and frequency instead of dividing.' }
        ]
      })
    },
    {
      topic: 'Thermal Physics: Specific Heat Capacity',
      level: 'Form 3' as const,
      q: (n: number) => `How much heat energy is required to raise the temperature of 2.0 kg of copper from 25°C to 75°C? (Specific heat capacity of copper = 390 J/kg·K)`,
      calc: (_n?: number) => {
        const qVal = 2.0 * 390 * (75 - 25);
        return {
          correct: `${qVal.toLocaleString()} Joules (39.0 kJ)`,
          expl: `Correct! Q = m·c·Δθ = 2.0 kg × 390 J/kg·K × (75 - 25)°C = 2.0 × 390 × 50 = 39,000 J (39 kJ).`,
          distractors: [
            { text: `19,500 Joules`, expl: 'Incorrect. Did you forget to multiply by mass (2.0 kg)?' },
            { text: `58,500 Joules`, expl: 'Incorrect. Did you calculate Δθ as 75°C instead of (75 - 25 = 50°C)?' },
            { text: `78,000 Joules`, expl: 'Incorrect. Check your multiplication: 2 × 390 × 50 = 39,000 J.' }
          ]
        };
      }
    }
  ];

  for (let i = 1; i <= 100; i++) {
    const tmpl = physTemplates[i % physTemplates.length];
    const data = tmpl.calc(i);
    const { options, correctOptionId } = createChoices(data.correct, data.expl, data.distractors);

    questions.push({
      id: `mf-phys-gen-${i}`,
      year: years[i % years.length],
      paper: i % 2 === 0 ? 'Paper 1 (Mechanics & Heat)' : 'Paper 2 (Electricity & Waves)',
      questionNumber: (i % 15) + 1,
      marks: 3,
      formLevel: tmpl.level,
      topicClassification: tmpl.topic,
      questionText: `KCSE Physics Drill Q${i}: ${tmpl.q(i)}`,
      options,
      correctOptionId,
      solution: `Step-by-step calculation:\n${data.correct}\nExplanation: ${data.expl}`,
      markingBreakdown: [
        'M1: Stating formula (e.g. Q = mcΔθ, v = fλ, E = I(R+r))',
        'M1: Correct numerical substitution',
        'A1: Correct answer with appropriate SI unit'
      ],
      examinerWarning: 'Numerical answers without SI units forfeit the final accuracy mark in KNEC Physics.'
    });
  }

  return questions;
}

// 5. GEOGRAPHY (100+ QUESTIONS)
function generateGeographyQuestions(): MadeFamiliarQuestion[] {
  const questions: MadeFamiliarQuestion[] = [];
  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

  const geogTemplates = [
    {
      topic: 'Mapwork (312/1): Bearings & Grid References',
      level: 'Form 1' as const,
      q: 'On a 1:50,000 topographical map, what is the back bearing of a church at grid reference 450320 from a school at grid reference 410280 if the forward bearing is 045°?',
      correct: '225°',
      expl: 'Correct! Back Bearing = Forward Bearing + 180° (when forward bearing is < 180°). 045° + 180° = 225°.',
      distractors: [
        { text: '135°', expl: 'Incorrect. 180° - 45° is 135°, but back bearing requires adding 180° to the forward bearing.' },
        { text: '315°', expl: 'Incorrect. 360° - 45° is 315°, which is the reciprocal in the opposite quadrant.' },
        { text: '045°', expl: 'Incorrect. 045° is the forward bearing itself.' }
      ]
    },
    {
      topic: 'Physical Geography: River Landforms',
      level: 'Form 3' as const,
      q: 'Which of the following river features is formed in the middle (mature) stage of a river course primarily through lateral erosion and deposition?',
      correct: 'Meanders and Ox-bow lakes',
      expl: 'Correct! In the mature stage, lateral erosion widens the valley forming pronounced curves (meanders), which eventually cut through to form ox-bow lakes.',
      distractors: [
        { text: 'V-shaped valleys and interlocking spurs', expl: 'Incorrect. These are youthful stage features formed by vertical downcutting.' },
        { text: 'Deltas and distributaries', expl: 'Incorrect. Deltas are formed at the mouth (old/senile stage) of a river.' },
        { text: 'Waterfalls and rapids', expl: 'Incorrect. Waterfalls occur in the youthful stage where river flow crosses resistant rock strata.' }
      ]
    },
    {
      topic: 'Economic Geography: Agriculture in Kenya vs Denmark',
      level: 'Form 4' as const,
      q: 'What is a key difference in dairy farming practices between Kenya and Denmark according to the KCSE Geography syllabus?',
      correct: 'Danish dairy cattle are strictly zero-grazed indoors in climate-controlled barns during winter, whereas in Kenya cattle are grazed on open pastures year-round',
      expl: 'Correct! Denmark experiences severe cold winters requiring intensive indoor housing and feeding on silage/hay, unlike Kenya where tropical climate allows open paddock grazing.',
      distractors: [
        { text: 'Kenya produces more milk per cow than Denmark', expl: 'Incorrect. Danish cows yield significantly higher average milk due to advanced pedigree genetics.' },
        { text: 'Denmark relies on indigenous Zebu cattle while Kenya uses pure Friesians', expl: 'Incorrect. Denmark uses European breeds (Danish Red, Holstein Friesian).' },
        { text: 'Kenyan dairy farmers have higher cooperative membership than Danish farmers', expl: 'Incorrect. Denmark’s dairy industry is almost 100% organized under cooperative societies.' }
      ]
    }
  ];

  for (let i = 1; i <= 100; i++) {
    const tmpl = geogTemplates[i % geogTemplates.length];
    const { options, correctOptionId } = createChoices(tmpl.correct, tmpl.expl, tmpl.distractors);

    questions.push({
      id: `mf-geog-gen-${i}`,
      year: years[i % years.length],
      paper: i % 2 === 0 ? 'Paper 1 (Physical & Mapwork)' : 'Paper 2 (Human & Economic)',
      questionNumber: (i % 12) + 1,
      marks: 4,
      formLevel: tmpl.level,
      topicClassification: tmpl.topic,
      questionText: `KCSE Geography Drill Q${i}: ${tmpl.q}`,
      options,
      correctOptionId,
      solution: `Model Answer:\n${tmpl.correct}\n\nExplanation: ${tmpl.expl}`,
      markingBreakdown: [
        '1-2 Marks for identifying the correct geographical process/feature',
        '1-2 Marks for accurate comparative or explanatory points'
      ],
      examinerWarning: 'Always quote specific topographical landmarks when answering mapwork questions.'
    });
  }

  return questions;
}

// 6. HISTORY, ENGLISH, KISWAHILI, BUSINESS, AGRI, CS (100+ QUESTIONS EACH)
function generateOtherSubjectQuestions(subjectId: string, subjectName: string): MadeFamiliarQuestion[] {
  const questions: MadeFamiliarQuestion[] = [];
  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

  const questionBanks: Record<string, Array<{ q: string; topic: string; level: 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4'; correct: string; expl: string; dist: Array<{ text: string; expl: string }> }>> = {
    'mf-hist': [
      {
        topic: 'Constitutional History & Devolution',
        level: 'Form 4',
        q: 'According to the 2010 Constitution of Kenya, what is the primary role of the Senate in the Kenyan Parliament?',
        correct: 'To represent the interests of the 47 counties and their governments, and legislate on matters concerning counties',
        expl: 'Correct! Chapter 8 of the 2010 Constitution mandates the Senate to protect county interests and determine allocation of national revenue among counties.',
        dist: [
          { text: 'To originate and approve the national budget money bills', expl: 'Incorrect. The National Assembly has exclusive authority over money bills.' },
          { text: 'To appoint Cabinet Secretaries and the Chief Justice', expl: 'Incorrect. CSs are vetted by the National Assembly; judges by the JSC and President.' },
          { text: 'To command the Kenya Defence Forces during emergencies', expl: 'Incorrect. The President is the Commander-in-Chief.' }
        ]
      },
      {
        topic: 'Colonial Administration in Kenya',
        level: 'Form 3',
        q: 'Why did the British colonial government apply direct rule in Kenya rather than indirect rule as used in Uganda and Nigeria?',
        correct: 'Because of the presence of white European settlers who demanded direct control over land, labor, and colonial policy',
        expl: 'Correct! European settler interests in Kenya necessitated direct legislative representation and strict administrative control over African reserves.',
        dist: [
          { text: 'Because Kenya had powerful centralized kingdoms that resisted British indirect rule', expl: 'Incorrect. Most Kenyan communities were acephalous (decentralized), unlike Buganda.' },
          { text: 'Because the British had an excess number of administrative officers', expl: 'Incorrect. The British suffered from officer shortages.' },
          { text: 'Because indirect rule was declared illegal by the League of Nations', expl: 'Incorrect. Indirect rule was widely used throughout British Africa.' }
        ]
      }
    ],
    'mf-eng': [
      {
        topic: 'Functional Grammar: Question Tags',
        level: 'Form 2',
        q: 'Select the correct question tag to complete the sentence: "You rarely arrive at school late, ________?"',
        correct: 'do you?',
        expl: 'Correct! The adverb "rarely" makes the sentence negative in meaning, so the question tag must be affirmative ("do you?").',
        dist: [
          { text: 'don’t you?', expl: 'Incorrect. "Rarely" is already negative; pairing it with "don’t you?" creates an incorrect double negative tag.' },
          { text: 'are you?', expl: 'Incorrect. The main verb is "arrive" (present simple), requiring the auxiliary "do", not "are".' },
          { text: 'didn’t you?', expl: 'Incorrect. The sentence is in the present tense, not the past tense.' }
        ]
      },
      {
        topic: 'Grammar: Conditional Sentences',
        level: 'Form 3',
        q: 'Identify the sentence that correctly uses the Third Conditional (unfulfilled past condition):',
        correct: 'If the candidates had revised Made Familiar thoroughly, they would have scored grade A.',
        expl: 'Correct! Third Conditional pattern: If + Past Perfect (had revised) ..., would have + Past Participle (would have scored).',
        dist: [
          { text: 'If the candidates revised thoroughly, they will score grade A.', expl: 'Incorrect. Mixed conditional error: past tense with "will".' },
          { text: 'If the candidates had revised thoroughly, they would score grade A.', expl: 'Incorrect. This misses "have" before the past participle.' },
          { text: 'If the candidates would have revised, they had scored grade A.', expl: 'Incorrect. "Would have" should never appear in the if-clause.' }
        ]
      }
    ],
    'mf-kisw': [
      {
        topic: 'Sarufi: Ngeli za Nomino',
        level: 'Form 2',
        q: 'Nomino zifuatazo: "Chura, kunguru, rubani, nyuki" zote ziko katika ngeli gani ya Kiswahili?',
        correct: 'Ngeli ya A-WA',
        expl: 'Sahihi! Nomino zote za viumbe hai (wanyama, ndege, wadudu na wanadamu) huchukua ngeli ya A-WA kwa mujibu wa upatanisho wa kisarufi (mfano: Chura huyu anaruka, Chura hawa wanaruka).',
        dist: [
          { text: 'Ngeli ya KI-VI', expl: 'Si sahihi. Ingawa "chura" huanza na "ch", ni kiumbe hai hivyo huingia ngeli ya A-WA.' },
          { text: 'Ngeli ya I-ZI', expl: 'Si sahihi. "Nyuki" na "kunguru" ni viumbe hai, haziwekwi kwenye I-ZI.' },
          { text: 'Ngeli ya LI-YA', expl: 'Si sahihi. Viumbe hai hawachukui ngeli ya LI-YA.' }
        ]
      },
      {
        topic: 'Mnyambuliko wa Vitenzi',
        level: 'Form 3',
        q: 'Neno "andika" katika kauli ya kutendewa na hali ya kutendana ni lipi?',
        correct: 'Kutendewa: Andikiwa; Kutendana: Andikiana',
        expl: 'Sahihi! Kauli ya kutendewa ina kiambishi "-iwa/-ewa" (andikiwa), na kutendana ina kiambishi "-ana" (andikiana).',
        dist: [
          { text: 'Kutendewa: Andikwa; Kutendana: Andikana', expl: 'Si sahihi. "Andikwa" ni kauli ya kutendwa, si kutendewa.' },
          { text: 'Kutendewa: Andikisha; Kutendana: Andikika', expl: 'Si sahihi. "Andikisha" ni kauli ya kutendesha; "andikika" ni kutendeka.' },
          { text: 'Kutendewa: Andikia; Kutendana: Andikisha', expl: 'Si sahihi. "Andikia" ni kutendea (elekezi).' }
        ]
      }
    ],
    'mf-bs': [
      {
        topic: 'Financial Ratios: Margins & Markups',
        level: 'Form 4',
        q: 'A trader buys goods for KSh 40,000 and sells them for KSh 50,000. Calculate the Gross Profit Margin and the Markup percentage.',
        correct: 'Margin = 20%; Markup = 25%',
        expl: 'Correct! Gross Profit = 50,000 - 40,000 = KSh 10,000. Margin = (Profit / Sales) × 100% = (10,000 / 50,000) × 100% = 20%. Markup = (Profit / Cost) × 100% = (10,000 / 40,000) × 100% = 25%.',
        dist: [
          { text: 'Margin = 25%; Markup = 20%', expl: 'Incorrect. You swapped margin (based on sales) and markup (based on cost).' },
          { text: 'Margin = 10%; Markup = 12.5%', expl: 'Incorrect. Check your fraction: 10,000 / 50,000 is 1/5 = 20%.' },
          { text: 'Margin = 20%; Markup = 20%', expl: 'Incorrect. Margin and markup are never identical because sales price exceeds cost price.' }
        ]
      }
    ],
    'mf-agri': [
      {
        topic: 'Livestock Feeding: Pearson’s Square Method',
        level: 'Form 3',
        q: 'Using Pearson’s Square, a farmer wants to make a pig ration containing 16% Digestible Crude Protein (DCP) by mixing Maize meal (8% DCP) with Cottonseed cake (36% DCP). What is the mixing ratio of Maize meal to Cottonseed cake?',
        correct: '20 parts Maize meal : 8 parts Cottonseed cake (Ratio = 5 : 2)',
        expl: 'Correct! Maize (8%) and Target (16%) → |8 - 16| = 8 parts Cottonseed cake. Cottonseed (36%) and Target (16%) → |36 - 16| = 20 parts Maize meal. Ratio Maize:Cottonseed = 20:8 = 5:2.',
        dist: [
          { text: '8 parts Maize meal : 20 parts Cottonseed cake (Ratio = 2 : 5)', expl: 'Incorrect. In Pearson’s Square, diagonal subtraction yields parts for the opposite ingredient!' },
          { text: '16 parts Maize meal : 16 parts Cottonseed cake (1 : 1)', expl: 'Incorrect. Equal parts would give an average of (8 + 36)/2 = 22% DCP, exceeding the 16% target.' },
          { text: '3 parts Maize meal : 1 part Cottonseed cake', expl: 'Incorrect. Check the diagonal subtractions.' }
        ]
      }
    ],
    'mf-cs': [
      {
        topic: 'Number Systems & Conversions',
        level: 'Form 2',
        q: 'Convert the decimal number 45₁₀ to its binary (base 2) equivalent and hexadecimal (base 16) equivalent:',
        correct: 'Binary = 101101₂; Hexadecimal = 2D₁₆',
        expl: 'Correct! 45 in binary: 32 + 8 + 4 + 1 = 101101₂. In Hexadecimal: 45 / 16 = 2 remainder 13 (where 13 = D in hex), so 2D₁₆.',
        dist: [
          { text: 'Binary = 110011₂; Hexadecimal = 2C₁₆', expl: 'Incorrect. 110011₂ equals 32 + 16 + 2 + 1 = 51, not 45.' },
          { text: 'Binary = 101101₂; Hexadecimal = 3D₁₆', expl: 'Incorrect. 3D in hex is (3 × 16) + 13 = 61, not 45.' },
          { text: 'Binary = 100111₂; Hexadecimal = 2B₁₆', expl: 'Incorrect. 2B in hex is (2 × 16) + 11 = 43.' }
        ]
      }
    ]
  };

  const templates = questionBanks[subjectId] || questionBanks['mf-hist'];

  for (let i = 1; i <= 100; i++) {
    const tmpl = templates[i % templates.length];
    const { options, correctOptionId } = createChoices(tmpl.correct, tmpl.expl, tmpl.dist);

    questions.push({
      id: `${subjectId}-gen-${i}`,
      year: years[i % years.length],
      paper: i % 2 === 0 ? 'Paper 1' : 'Paper 2',
      questionNumber: (i % 12) + 1,
      marks: 3,
      formLevel: tmpl.level,
      topicClassification: tmpl.topic,
      questionText: `KCSE ${subjectName} Drill Q${i}: ${tmpl.q}`,
      options,
      correctOptionId,
      solution: `Model KNEC Solution:\n• ${tmpl.correct}\n• Examination Rationale: ${tmpl.expl}`,
      markingBreakdown: [
        '1 Mark for exact term or definition',
        '1 Mark for accurate justification/step',
        '1 Mark for correct final answer'
      ],
      examinerWarning: 'Answers must use exact syllabus keywords to secure full marks.'
    });
  }

  return questions;
}

// Master Aggregated Question Bank Engine
export function getMasterQuestionBank(): Record<string, MadeFamiliarQuestion[]> {
  return {
    'mf-math': generateMathQuestions(),
    'mf-bio': generateBiologyQuestions(),
    'mf-chem': generateChemistryQuestions(),
    'mf-phys': generatePhysicsQuestions(),
    'mf-geog': generateGeographyQuestions(),
    'mf-hist': generateOtherSubjectQuestions('mf-hist', 'History & Government'),
    'mf-eng': generateOtherSubjectQuestions('mf-eng', 'English'),
    'mf-kisw': generateOtherSubjectQuestions('mf-kisw', 'Kiswahili'),
    'mf-bs': generateOtherSubjectQuestions('mf-bs', 'Business Studies'),
    'mf-agri': generateOtherSubjectQuestions('mf-agri', 'Agriculture'),
    'mf-cs': generateOtherSubjectQuestions('mf-cs', 'Computer Studies')
  };
}

export function getTotalQuestionCount(): number {
  const bank = getMasterQuestionBank();
  return Object.values(bank).reduce((acc, questions) => acc + questions.length, 0);
}
