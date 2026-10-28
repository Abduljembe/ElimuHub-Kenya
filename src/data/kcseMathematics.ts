import { SubjectCourse } from '../types/curriculum';

export const KCSE_MATHEMATICS: SubjectCourse = {
  id: 'hs-mathematics',
  name: 'Mathematics',
  title: 'Mathematics Alternative A (KNEC KCSE)',
  code: 'KCSE 121 / CBC Core',
  courseCode: 'KCSE 121',
  category: 'Mathematics',
  level: 'highschool',
  academicLevel: 'highschool',
  badge: 'KICD Core Compulsory',
  description:
    'Comprehensive Kenya National Curriculum (KICD/KNEC) Mathematics covering all Form 1 to Form 4 core topics: Arithmetic, Algebra, Geometry, Trigonometry, Matrices, Vectors, Commercial Arithmetic, Statistics, Probability, Longitudes & Latitudes, and Calculus.',
  learningOutcomes: [
    'Perform rigorous calculations involving integers, fractions, indices, surds, and logarithms.',
    'Solve linear, simultaneous, and quadratic equations via algebraic methods, factorization, and matrix inverses.',
    'Apply geometric theorems for circles, angles, polygons, loci, 3D projections, and transformations.',
    'Master trigonometry: acute ratios, unit circle, sine rule, cosine rule, and trigonometric graphs.',
    'Execute commercial arithmetic: PAYE income tax brackets, compound interest, appreciation, and hire purchase.',
    'Compute descriptive statistics: mean, median, standard deviation, variance, and cumulative frequency ogives.',
    'Calculate spherical geometry distances on the Earth’s surface in nautical miles and kilometers.',
    'Formulate linear programming inequalities and optimize objective profit functions.',
    'Differentiate polynomials to determine tangents, normals, and turning points, and integrate to calculate areas under curves.'
  ],
  topics: [
    // FORM 1
    {
      id: 'math-f1-t1',
      title: 'Natural Numbers, Factors, GCD & LCM',
      formOrYear: 'Form 1',
      subtopics: ['Place values and total values', 'Prime factorization and index notation', 'Divisibility tests for 2, 3, 4, 5, 6, 8, 9, 10, 11', 'Greatest Common Divisor (GCD) and Least Common Multiple (LCM)', 'Word problems involving simultaneous intervals and sharing'],
      theoryOverview:
        'Natural numbers are counting numbers starting from 1. Every composite number can be uniquely expressed as a product of prime factors. The GCD is the product of common prime factors with their lowest powers; LCM is the product of all prime factors with their highest powers. Real-world applications include finding synchronization times for flashing traffic lights or bell intervals.',
      keyFormulas: [
        'Divisibility by 3 or 9: Sum of digits must be divisible by 3 or 9',
        'Divisibility by 11: Difference between sum of digits in odd positions and even positions is 0 or multiple of 11',
        'GCD(a, b) × LCM(a, b) = a × b'
      ],
      kenyanApplication: 'Coordinating matatu dispatch schedules from Nairobi central termini; tea packaging batch sizing in Kericho factories.',
      examTips: 'Express numbers in prime factor form using indices first (e.g. 72 = 2³ × 3²). This prevents calculation errors when finding GCD and LCM.'
    },
    {
      id: 'math-f1-t2',
      title: 'Fractions, Decimals, Squares & Square Roots',
      formOrYear: 'Form 1',
      subtopics: ['Proper, improper and mixed fractions', 'Order of operations (BODMAS / PEMDAS)', 'Terminating and recurring decimals to vulgar fractions', 'Squares from mathematical tables and factorization', 'Square roots by prime factorization and long division method'],
      theoryOverview:
        'Fractions represent parts of a whole. When evaluating multi-operational numerical expressions, BODMAS rule must be strictly applied. To convert recurring decimals like 0.777... to a vulgar fraction: let r = 0.777..., then 10r = 7.777... => 9r = 7 => r = 7/9.',
      keyFormulas: [
        'BODMAS: Brackets, Orders/Of, Division, Multiplication, Addition, Subtraction',
        'Recurring decimal conversion: r = 0.4̇5̇ => 100r - r = 45 => 99r = 45 => r = 45/99 = 5/11'
      ],
      kenyanApplication: 'Land division calculations for family parcel inheritances in rural Kenya; currency exchange and banking decimal roundings.',
      examTips: 'In KCSE Section 1, evaluated fractions must always be given in their simplest form as mixed numbers or irreducible vulgar fractions.'
    },
    {
      id: 'math-f1-t3',
      title: 'Algebraic Expressions & Linear Equations',
      formOrYear: 'Form 1',
      subtopics: ['Simplification of algebraic expressions', 'Expansion of brackets', 'Factorization by grouping and common terms', 'Forming and solving single-variable linear equations', 'Linear equations involving fractional coefficients and word problems'],
      theoryOverview:
        'Algebra uses symbols to represent unknown numbers. Like terms have identical variable components with matching powers and can be combined by adding or subtracting coefficients. Linear equations are first-degree algebraic statements where the highest variable exponent is 1.',
      keyFormulas: [
        'Distributive law: a(b + c) = ab + ac',
        'Factorization by grouping: ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)'
      ],
      kenyanApplication: 'Formulating cost equations for mobile money transaction tariffs and small business inventory accounting in Nairobi markets.',
      examTips: 'When clearing fractions in linear equations, multiply EVERY term on both sides by the LCM of the denominators to avoid arithmetic mistakes.'
    },
    {
      id: 'math-f1-t4',
      title: 'Rates, Ratios, Percentages and Proportions',
      formOrYear: 'Form 1',
      subtopics: ['Rates: speed, consumption, population density', 'Ratios: sharing quantities in given ratios, increasing/decreasing by ratios', 'Percentages: percentage increase, decrease, profit and loss', 'Direct and inverse proportions', 'Compound rates and work-rate word problems'],
      theoryOverview:
        'A rate compares two quantities of different dimensions (e.g. speed in km/h). A ratio compares quantities of the same unit and has no dimensions. In work-rate problems, if person A finishes a task in x days and B finishes in y days, together they complete (1/x + 1/y) of the task per day.',
      keyFormulas: [
        'Average Speed = Total Distance / Total Time',
        'Combined work rate: 1/T = 1/t₁ + 1/t₂',
        'Percentage Change = (New Value - Old Value) / Old Value × 100%'
      ],
      kenyanApplication: 'Foreign currency exchange rate calculations at Kenyan commercial banks; agricultural yield per acre in Rift Valley farms.',
      examTips: 'For work-rate problems (e.g. taps filling a water tank), always find the fraction filled per unit time (per hour or minute) first!'
    },
    {
      id: 'math-f1-t5',
      title: 'Measurement: Length, Area, Volume, Capacity & Mass',
      formOrYear: 'Form 1',
      subtopics: ['Perimeter and area of plane figures (rectangles, triangles, parallelograms, trapeziums, circles)', 'Arc length and area of sectors', 'Volume of cuboids, prisms, and cylinders', 'Capacity units (liters, milliliters) and relationship: 1 liter = 1000 cm³', 'Mass, weight, and density (ρ = m/V)'],
      theoryOverview:
        'Measurement quantifies physical boundaries. The area of a trapezium is given by ½(a + b)h. For a circular sector of angle θ in degrees: Arc length = (θ/360) × 2πr; Sector Area = (θ/360) × πr². Capacity measures liquid volume: 1 m³ = 1000 liters, and 1 liter = 1000 cm³ = 1 dm³.',
      keyFormulas: [
        'Area of trapezium = ½ · (a + b) · h',
        'Area of circle = π · r², Circumference = 2 · π · r',
        'Volume of cylinder = π · r² · h, Total Surface Area = 2πr² + 2πrh',
        '1 liter = 1,000 cm³, 1 m³ = 1,000 liters'
      ],
      kenyanApplication: 'Sizing municipal water storage tanks in Eldoret; measuring land acreage in hectares (1 ha = 10,000 m²) for title deeds.',
      examTips: 'Pay close attention to whether a cylinder is open at one end, open at both ends (pipe), or closed at both ends when computing surface area!'
    },
    {
      id: 'math-f1-t6',
      title: 'Commercial Arithmetic I (Profit, Loss, Discount & Commission)',
      formOrYear: 'Form 1',
      subtopics: ['Cost price (CP), selling price (SP), profit and loss', 'Percentage profit and percentage loss calculated on Cost Price', 'Discounts, marked price (MP), cash price', 'Sales commission and salesperson earnings', 'Currency conversions and bank buying/selling rates'],
      theoryOverview:
        'Commercial arithmetic applies math to commerce and finance. Profit = SP - CP. Percentage profit is ALWAYS calculated with respect to Cost Price CP: % Profit = (Profit / CP) × 100%. Commercial banks buy foreign currency from customers at the buying rate and sell at the higher selling rate.',
      keyFormulas: [
        'Percentage Profit = [(SP - CP) / CP] × 100%',
        'Selling Price = CP × (1 + % Profit / 100)',
        'Discount = Marked Price - Cash Price',
        'Bank exchange rule: When a customer converts USD to KSh, bank BUYS (use Buying Rate). When converting KSh to USD, bank SELLS (use Selling Rate).'
      ],
      kenyanApplication: 'Forex bureau transactions in Westlands, Nairobi; mobile retailer wholesale/retail profit margin calculations.',
      examTips: 'Always remember the bank perspective: The bank sells to you at the higher Selling Rate and buys from you at the lower Buying Rate!'
    },
    {
      id: 'math-f1-t7',
      title: 'Coordinates, Linear Graphs & Geometric Constructions',
      formOrYear: 'Form 1',
      subtopics: ['Cartesian plane: x-axis, y-axis, coordinates (x, y)', 'Plotting linear equations: table of values, drawing straight lines', 'Intercepts on axes', 'Angles: acute, obtuse, reflex, complementary (sum=90°), supplementary (sum=180°)', 'Angles associated with parallel lines: alternate, corresponding, allied/co-interior', 'Geometric construction with compass and straight edge: angle bisectors, perpendicular bisectors, 60°, 30°, 45°, 90° angles'],
      theoryOverview:
        'The Cartesian coordinate plane maps pairs of real numbers to geometric points. A linear graph has the equation y = mx + c. Compass constructions require strict geometric methods without protractors: bisecting a line segment, constructing 60° via equilateral triangles, and bisecting to obtain 30° and 15°.',
      keyFormulas: [
        'Midpoint of line segment: M = ((x₁ + x₂) / 2, (y₁ + y₂) / 2)',
        'Sum of interior angles of an n-sided polygon = (2n - 4) × 90° = (n - 2) × 180°',
        'Sum of exterior angles of any polygon = 360°'
      ],
      kenyanApplication: 'Cadastral land boundary surveys conducted by Survey of Kenya; architectural foundation grid layout.',
      examTips: 'Do NOT erase construction arcs! KNEC examiners award marks for visible construction arcs produced using a sharp pair of compasses.'
    },

    // FORM 2
    {
      id: 'math-f2-t1',
      title: 'Cubes, Cube Roots, Reciprocals, Indices & Logarithms',
      formOrYear: 'Form 2',
      subtopics: ['Cubes and cube roots from mathematical tables', 'Reciprocals from tables and decimal evaluations', 'Laws of indices: multiplication, division, zero index, negative indices, fractional indices', 'Standard form / scientific notation A × 10ⁿ', 'Logarithms to base 10: characteristics and mantissa', 'Logarithmic computations of products, quotients, roots and powers'],
      theoryOverview:
        'Indices represent repeated multiplication. The four-figure mathematical tables provide logarithms to base 10. The characteristic is the integer part determined from standard form (A × 10ⁿ has characteristic n), and the mantissa is the positive decimal fraction found in the tables.',
      keyFormulas: [
        'aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ',
        'a⁰ = 1, a⁻ⁿ = 1 / aⁿ, a^(1/n) = ⁿ√a',
        'log₁₀(A × B) = log₁₀ A + log₁₀ B',
        'log₁₀(A / B) = log₁₀ A - log₁₀ B',
        'log₁₀(Aⁿ) = n · log₁₀ A'
      ],
      kenyanApplication: 'Decibel scale measurements in environmental noise monitoring by NEMA; seismic magnitude scale calculations at Chiromo seismology lab.',
      examTips: 'In logarithmic computation tables, always show the four columns clearly: Number, Logarithm, Characteristics, and Anti-logarithm step.'
    },
    {
      id: 'math-f2-t2',
      title: 'Equations of Straight Lines (Gradient, Intercepts & Perpendiculars)',
      formOrYear: 'Form 2',
      subtopics: ['Gradient (slope) of a straight line: m = (y₂ - y₁) / (x₂ - x₁)', 'Equation in form y = mx + c and double-intercept form x/a + y/b = 1', 'Equation of a line given gradient and one point, or two points', 'Parallel lines condition: m₁ = m₂', 'Perpendicular lines condition: m₁ × m₂ = -1', 'Perpendicular bisector of a line segment'],
      theoryOverview:
        'The gradient measures steepness and direction. Two distinct lines are parallel if and only if their gradients are equal. Two lines are perpendicular if the product of their gradients is -1 (negative reciprocals: m₂ = -1/m₁). The perpendicular bisector passes through the midpoint at right angles.',
      keyFormulas: [
        'Gradient m = (y₂ - y₁) / (x₂ - x₁)',
        'Line equation: y - y₁ = m(x - x₁)',
        'Parallel lines: m₁ = m₂',
        'Perpendicular lines: m₁ · m₂ = -1 => m₂ = -1 / m₁',
        'Distance between points: d = √[(x₂ - x₁)² + (y₂ - y₁)²]'
      ],
      kenyanApplication: 'Highway alignment design along the Mau Summit-Rironi dual carriage way; slope gradients for drainage conduits.',
      examTips: 'To find the perpendicular bisector: 1. Find midpoint M; 2. Find gradient m₁ of line; 3. Compute perpendicular gradient m₂ = -1/m₁; 4. Form equation using M and m₂.'
    },
    {
      id: 'math-f2-t3',
      title: 'Quadratic Expressions & Equations I',
      formOrYear: 'Form 2',
      subtopics: ['Expansion of algebraic products: (a + b)², (a - b)², (a + b)(a - b)', 'Difference of two squares: a² - b² = (a - b)(a + b)', 'Factorization of quadratic expressions of the form ax² + bx + c', 'Solving quadratic equations by factorization', 'Word problems leading to quadratic equations'],
      theoryOverview:
        'A quadratic expression has the form ax² + bx + c where a ≠ 0. To factorize by splitting the middle term: find two factors whose product is ac and whose sum is b. The difference of two squares is an essential identity frequently tested in algebraic simplification.',
      keyFormulas: [
        '(a + b)² = a² + 2ab + b²',
        '(a - b)² = a² - 2ab + b²',
        'a² - b² = (a + b)(a - b)',
        'If pq = 0, then p = 0 or q = 0 (Zero Product Property)'
      ],
      kenyanApplication: 'Calculating projectile trajectories and maximum height clearance for telecommunication masts.',
      examTips: 'Look out for expressions with common factors first before factoring quadratics, e.g. 2x² - 18 = 2(x² - 9) = 2(x - 3)(x + 3).'
    },
    {
      id: 'math-f2-t4',
      title: 'Similarity, Enlargement & Pythagoras Theorem',
      formOrYear: 'Form 2',
      subtopics: ['Scale factor of enlargement k (positive and negative)', 'Linear scale factor (LSF), Area scale factor (ASF = k²), Volume scale factor (VSF = k³)', 'Center of enlargement on the Cartesian plane', 'Properties of similar triangles (AA, SAS, SSS)', 'Pythagoras theorem: a² + b² = c² in right-angled triangles and applications'],
      theoryOverview:
        'Two figures are similar if their corresponding angles are equal and corresponding sides are in the same ratio k (Linear Scale Factor). When a figure is scaled by k, its surface area changes by k² (Area Scale Factor) and its volume changes by k³ (Volume Scale Factor). Negative enlargement rotates the object through 180° through the center of enlargement.',
      keyFormulas: [
        'LSF = k = Length of image / Length of object',
        'ASF = k² = Area of image / Area of object',
        'VSF = k³ = Volume of image / Volume of object',
        'Pythagoras: c = √(a² + b²)'
      ],
      kenyanApplication: 'Scale models of architectural projects by NCA (National Construction Authority); hydraulic dam miniature testing.',
      examTips: 'If given the ratio of masses of similar solids made of the same material, this equals the Volume Scale Factor (VSF = k³). Take the cube root to get LSF k before finding surface area (ASF = k²)!'
    },
    {
      id: 'math-f2-t5',
      title: 'Trigonometric Ratios I (SOH CAH TOA)',
      formOrYear: 'Form 2',
      subtopics: ['Sine, Cosine, and Tangent of acute angles in right-angled triangles', 'SOH CAH TOA definitions', 'Trigonometric tables for angles between 0° and 90°', 'Angles of elevation and depression', 'Bearings and distances solved using right-angled triangles'],
      theoryOverview:
        'Trigonometric ratios relate the angles and side lengths of right-angled triangles. Sin θ = Opposite / Hypotenuse, Cos θ = Adjacent / Hypotenuse, Tan θ = Opposite / Adjacent. The angle of elevation is measured upwards from the horizontal; the angle of depression is measured downwards from the horizontal.',
      keyFormulas: [
        'sin θ = Opp / Hyp, cos θ = Adj / Hyp, tan θ = Opp / Adj',
        'tan θ = sin θ / cos θ',
        'sin² θ + cos² θ = 1',
        'Angle of elevation from A to B = Angle of depression from B to A (alternate angles)'
      ],
      kenyanApplication: 'Surveying elevation heights of Mount Kenya peaks; forestry estimation of tree timber heights in Mau Forest.',
      examTips: 'Always sketch the triangle and mark the horizontal line explicitly when dealing with angles of elevation or depression!'
    },
    {
      id: 'math-f2-t6',
      title: 'Linear Inequalities I & Linear Motion',
      formOrYear: 'Form 2',
      subtopics: ['Inequality symbols (<, >, ≤, ≥) on a number line', 'Solving simple and compound linear inequalities', 'Forming linear inequalities from word statements', 'Linear motion: distance, displacement, speed, velocity, uniform acceleration', 'Relative speed: bodies travelling towards each other vs in the same direction'],
      theoryOverview:
        'Inequalities define ranges of values. Multiplying or dividing an inequality by a negative number REVERSES the inequality symbol. For relative speed: when two bodies move towards each other, relative speed = v₁ + v₂; when moving in the same direction, relative speed = |v₁ - v₂|.',
      keyFormulas: [
        'If ax < b and a < 0 => x > b / a',
        'Relative speed (opposite directions) = v₁ + v₂',
        'Relative speed (same direction) = v₁ - v₂ (where v₁ > v₂)',
        'Time to overtake / meet = Distance between bodies / Relative speed'
      ],
      kenyanApplication: 'Overtaking calculations and speed regulations on single-lane roads between Nakuru and Eldoret.',
      examTips: 'Whenever you divide by a negative number in an inequality, remember to flip the sign immediately: -2x ≤ 6 => x ≥ -3.'
    },
    {
      id: 'math-f2-t7',
      title: 'Statistics I (Frequency Distributions, Mean, Median & Mode)',
      formOrYear: 'Form 2',
      subtopics: ['Collection and organization of data, tally marks', 'Ungrouped vs grouped frequency tables', 'Class intervals, class limits, class boundaries, class midpoints (x)', 'Measures of central tendency: Mean (Σfx / Σf), Mode, Median', 'Histograms (frequency density = frequency / class width) and frequency polygons'],
      theoryOverview:
        'Statistics summarizes quantitative data. For grouped data, the mean is estimated using midpoints x: x̄ = Σ(f·x) / Σf. In a histogram with unequal class intervals, height of rectangle represents frequency density, so the area of the rectangle is proportional to frequency.',
      keyFormulas: [
        'Mean x̄ = Σ(f · x) / Σf',
        'Assumed mean formula: x̄ = A + [Σ(f · d) / Σf] (where d = x - A)',
        'Frequency density = Frequency / Class width'
      ],
      kenyanApplication: 'Kenya National Bureau of Statistics (KNBS) census data processing and national demographic reporting.',
      examTips: 'On a histogram, always plot frequency against class boundaries (NOT class limits), and ensure there are no gaps between bars.'
    },
    {
      id: 'math-f2-t8',
      title: 'Angle Properties of Circles & Vectors I',
      formOrYear: 'Form 2',
      subtopics: ['Angle subtended at center is twice angle at circumference', 'Angle in a semicircle is a right angle (90°)', 'Angles in the same segment are equal', 'Opposite angles of a cyclic quadrilateral sum to 180°', 'Introduction to vectors: column vectors (x, y)ᵀ, magnitude |v| = √(x² + y²), vector addition and scalar multiplication'],
      theoryOverview:
        'Circle theorems describe geometric angle relationships within circular geometry. An inscribed angle subtending the same arc as a central angle is half the central angle: θ_circumference = ½ θ_center. A cyclic quadrilateral has all four vertices on the circle circumference; its opposite angles are supplementary.',
      keyFormulas: [
        'Central angle = 2 × Circumference angle subtended by same arc',
        'Cyclic quadrilateral: ∠A + ∠C = 180°, ∠B + ∠D = 180°',
        'Vector magnitude |a| = √(x² + y²)',
        'Unit vector = a / |a|'
      ],
      kenyanApplication: 'Satellite orbit positioning and navigation tracking across Eastern Africa by the Kenya Space Agency.',
      examTips: 'When asked to give reasons in circle geometry questions, state the theorem explicitly (e.g. "angle in a semicircle is 90°" or "opposite angles of cyclic quad are supplementary").'
    },

    // FORM 3
    {
      id: 'math-f3-t1',
      title: 'Quadratic Expressions & Equations II',
      formOrYear: 'Form 3',
      subtopics: ['Perfect squares and completing the square method', 'Derivation and use of the Quadratic Formula: x = [-b ± √(b² - 4ac)] / 2a', 'Discriminant D = b² - 4ac and nature of roots (real distinct, equal, or complex)', 'Graphical solution of quadratic equations: roots, axis of symmetry x = -b/2a, vertex', 'Simultaneous equations where one is linear and one is quadratic'],
      theoryOverview:
        'Completing the square transforms ax² + bx + c into a(x + p)² + q. The discriminant D = b² - 4ac determines root behavior: D > 0 gives two distinct real roots; D = 0 gives two equal real roots (perfect square); D < 0 gives no real roots. Simultaneous linear-quadratic systems are solved by substitution.',
      keyFormulas: [
        'Quadratic formula: x = [-b ± √(b² - 4ac)] / (2 · a)',
        'Completing square: x² + (b/a)x + (b / 2a)² = (x + b/2a)²',
        'Axis of symmetry: x = -b / (2 · a)'
      ],
      kenyanApplication: 'Parabolic antenna dish focal geometry at Longonot Earth Station; structural suspension bridge cable design.',
      examTips: 'Give roots to the specified degree of accuracy (e.g. "correct to 2 decimal places" or "4 significant figures"). Failure to round correctly loses the final accuracy mark!'
    },
    {
      id: 'math-f3-t2',
      title: 'Approximations and Errors',
      formOrYear: 'Form 3',
      subtopics: ['Rounding off and truncating numbers', 'Absolute error = ½ × smallest unit of measurement', 'Maximum and minimum possible values (limits of accuracy)', 'Relative error = Absolute error / Actual value', 'Percentage error = Relative error × 100%', 'Propagation of errors in addition, subtraction, multiplication, and division'],
      theoryOverview:
        'Every physical measurement contains experimental uncertainty. The absolute error of a measurement made to the nearest unit is half that unit (e.g. 5.4 cm has error ±0.05 cm). In multiplication/division of quantities P = x · y, maximum percentage error is the sum of percentage errors of the individual measurements: % error in P ≈ % error in x + % error in y.',
      keyFormulas: [
        'Absolute error = ½ × unit of measure',
        'Relative error = Absolute error / True value',
        'Percentage error = (Absolute error / True value) × 100%',
        'Maximum difference = Max value - Min value',
        'For product P = a · b: Max % error ≈ % error(a) + % error(b)'
      ],
      kenyanApplication: 'Standardization limits at the Kenya Bureau of Standards (KEBS) for consumer commodity weights and volume dispensations.',
      examTips: 'To find maximum possible error in a difference (A - B): Max value = A_max - B_min; Min value = A_min - B_max.'
    },
    {
      id: 'math-f3-t3',
      title: 'Trigonometry II (Unit Circle, Graphs, Sine & Cosine Rules)',
      formOrYear: 'Form 3',
      subtopics: ['Trigonometric ratios of angles beyond 90° (0° to 360°) using the unit circle', 'Signs of trig ratios in the 4 quadrants (CAST rule)', 'Trigonometric identities: sin² θ + cos² θ = 1, tan θ = sin θ / cos θ', 'The Sine Rule: a / sin A = b / sin B = c / sin C = 2R', 'The Cosine Rule: a² = b² + c² - 2bc cos A', 'Area of non-right angled triangle = ½ a b sin C', 'Trigonometric wave graphs: amplitude, period, and phase of y = a sin(bx + c) and y = a cos(bx + c)'],
      theoryOverview:
        'The CAST rule determines trigonometric signs: 1st quadrant (All positive), 2nd (Sine positive), 3rd (Tan positive), 4th (Cosine positive). The Sine Rule solves triangles given ASA or SSA. The Cosine Rule solves triangles given SAS (two sides and included angle) or SSS (three sides).',
      keyFormulas: [
        'Sine Rule: a / sin A = b / sin B = c / sin C',
        'Cosine Rule: a² = b² + c² - 2 · b · c · cos A',
        'cos A = (b² + c² - a²) / (2 · b · c)',
        'Area of triangle = ½ · a · b · sin C',
        'Trig graph period: For y = sin(bx), Period = 360° / b'
      ],
      kenyanApplication: 'Triangulation navigation by Kenya Defence Forces and geodetic surveying by the Regional Centre for Mapping of Resources for Development (RCMRD).',
      examTips: 'Check for the ambiguous case of the Sine Rule when given two sides and an acute non-included angle opposite the shorter side!'
    },
    {
      id: 'math-f3-t4',
      title: 'Surds & Further Logarithms',
      formOrYear: 'Form 3',
      subtopics: ['Order of surds and rational vs irrational numbers', 'Simplification of surds: √(ab) = √a · √b', 'Rationalizing the denominator using conjugate surds: (a + √b)(a - √b) = a² - b', 'Logarithmic equations with different bases using change of base formula: log_b a = (log_c a) / (log_c b)', 'Solving exponential equations using logarithms'],
      theoryOverview:
        'A surd is an irrational root that cannot be expressed as a vulgar fraction. Rationalizing the denominator removes square roots from the divisor by multiplying both numerator and denominator by the conjugate surd. To solve 2^(x+1) = 5^(x-1), take logs to base 10 on both sides.',
      keyFormulas: [
        'Conjugate: (√a + √b)(√a - √b) = a - b',
        'Rationalization: 1 / (√a + √b) = (√a - √b) / (a - b)',
        'Change of base: log_a b = (log₁₀ b) / (log₁₀ a)',
        'log_a(x) = y <=> aʸ = x'
      ],
      kenyanApplication: 'Cryptographic algorithms in Kenyan fintech platforms (M-Pesa, banking APIs) utilizing discrete logarithms.',
      examTips: 'Never leave a surd in the denominator in Section 1 questions; always multiply by the conjugate to rationalize!'
    },
    {
      id: 'math-f3-t5',
      title: 'Commercial Arithmetic II (Compound Interest, PAYE & Hire Purchase)',
      formOrYear: 'Form 3',
      subtopics: ['Compound interest formula: A = P(1 + r/100)ⁿ', 'Appreciation and depreciation: A = P(1 - r/100)ⁿ', 'Hire purchase: Deposit + Total monthly installments; carrying charge and interest rate', 'Income tax (PAYE): Taxable income, gross salary, allowances, progressive tax brackets', 'Personal relief, insurance relief, and net tax payable'],
      theoryOverview:
        'Commercial arithmetic II covers personal and corporate financial transactions in Kenya. Compound interest reinvests earned interest. Hire purchase allows purchasing assets over time at a higher total cost. PAYE is progressive: taxable income is divided into tax slabs taxed at escalating percentages; net tax = gross tax - reliefs.',
      keyFormulas: [
        'Compound amount: A = P · (1 + r / 100)ⁿ',
        'Depreciation: Book value V = P · (1 - r / 100)ⁿ',
        'Hire purchase total = Cash Deposit + (Number of installments × Value per installment)',
        'Carrying charge = Hire Purchase Price - Cash Price',
        'Net Tax = Total Gross Tax calculated from brackets - Total Reliefs (Personal relief KSh 2,400/month)',
        'Net Pay = Gross Income - (PAYE + NSSF + SHIF / NHIF + Housing Levy)'
      ],
      kenyanApplication: 'Kenya Revenue Authority (KRA) iTax monthly payroll tax calculations; SACCO loan repayment amortization schedules.',
      examTips: 'Pay close attention to whether the income is given per month or per annum! Tax brackets given per year must not be applied directly to monthly salaries without converting.'
    },
    {
      id: 'math-f3-t6',
      title: 'Circles: Chords, Tangents & Alternate Segment Theorem',
      formOrYear: 'Form 3',
      subtopics: ['Length of chords, perpendicular bisector from center bisects chord', 'Intersecting chords theorem: internal intersection (AP · PB = CP · PD) and external intersection', 'Secant-tangent theorem: PT² = PA · PB', 'Tangent to a circle is perpendicular to radius at point of contact', 'Alternate Segment Theorem: angle between tangent and chord equals angle in alternate segment', 'Common internal and external tangents to two circles'],
      theoryOverview:
        'When two chords AB and CD intersect inside a circle at P: AP × PB = CP × PD. When two secants meet at an external point P: PA × PB = PC × PD. The secant-tangent theorem states that the square of the tangent length from external point P equals the product of the external secant segments: PT² = PA × PB.',
      keyFormulas: [
        'Internal chords: AP · PB = CP · PD',
        'Secant-Tangent: PT² = PA · PB',
        'Alternate segment: Angle between tangent and chord = Angle subtended by chord in alternate segment'
      ],
      kenyanApplication: 'Mechanical gear meshing design and circular drive belt tensioning in agro-processing equipment.',
      examTips: 'In the secant-tangent theorem PT² = PA · PB, remember that PB is the ENTIRE secant length from external point P to the far side of the circle, NOT just the chord length AB!'
    },
    {
      id: 'math-f3-t7',
      title: 'Matrices I & 2×2 Determinants and Inverses',
      formOrYear: 'Form 3',
      subtopics: ['Order of matrices (rows × columns)', 'Matrix addition, subtraction, and scalar multiplication', 'Matrix multiplication (compatibility condition)', 'Identity matrix I', 'Determinant of 2×2 matrix: det(A) = ad - bc', 'Singular matrices (det = 0, no inverse)', 'Inverse of 2×2 matrix: A⁻¹ = (1/det) · [d, -b; -c, a]', 'Solving simultaneous linear equations using matrix inverse method'],
      theoryOverview:
        'A matrix is a rectangular array of numbers. Matrix multiplication AB is possible only when columns in A equal rows in B. A 2×2 matrix A = [a, b; c, d] has determinant ad - bc. If det(A) ≠ 0, its inverse A⁻¹ satisfies A · A⁻¹ = I. Multiplying a system AX = B by A⁻¹ gives the solution X = A⁻¹B.',
      keyFormulas: [
        'Determinant of [a b; c d] = a·d - b·c',
        'Inverse: A⁻¹ = [1 / (ad - bc)] · [d  -b; -c  a]',
        'Matrix solution: [x; y] = A⁻¹ · [k₁; k₂]'
      ],
      kenyanApplication: 'Computer graphics transformations and structural stiffness matrices in engineering analyses.',
      examTips: 'Check for singular matrices: if a question states that a matrix has NO inverse, set the determinant ad - bc = 0 and solve for the unknown parameter!'
    },
    {
      id: 'math-f3-t8',
      title: 'Formulae and Variations (Direct, Inverse, Joint & Partial)',
      formOrYear: 'Form 3',
      subtopics: ['Transposition of formulae and changing the subject', 'Direct variation: y ∝ x => y = k · x', 'Inverse variation: y ∝ 1/x => y = k / x', 'Joint variation: y ∝ x · z² => y = k · x · z²', 'Partial variation: y = k₁ + k₂ · x or y = k₁ · x + k₂ / z', 'Percentage changes in dependent variables due to percentage shifts in independent variables'],
      theoryOverview:
        'Variation describes mathematical dependencies. Partial variation involves a sum of two or more parts, one of which may be constant (e.g. taxi fare = base fee + per km charge). When independent variables change by percentages, substitute the new values (e.g. x becomes 1.1x for a 10% increase) to find the resulting percentage change.',
      keyFormulas: [
        'Direct: y = k · x',
        'Inverse: y = k / x',
        'Joint: y = k · x · z',
        'Partial: y = c + k · x or y = k₁ · x + k₂ · z'
      ],
      kenyanApplication: 'Electricity billing tariffs combining a fixed standing charge with a consumption-variable fuel-energy charge; matatu transport operating costs.',
      examTips: 'For partial variation, you will always be given two pairs of values to set up two simultaneous equations to solve for the two constants k₁ and k₂!'
    },
    {
      id: 'math-f3-t9',
      title: 'Sequences and Series (AP and GP)',
      formOrYear: 'Form 3',
      subtopics: ['Arithmetic Progression (AP): First term a, common difference d', 'nth term of an AP: Tₙ = a + (n - 1)d', 'Sum of first n terms of an AP: Sₙ = (n/2)[2a + (n - 1)d] = (n/2)(a + L)', 'Geometric Progression (GP): First term a, common ratio r', 'nth term of a GP: Tₙ = a · rⁿ⁻¹', 'Sum of first n terms of a GP: Sₙ = a(rⁿ - 1) / (r - 1) or a(1 - rⁿ) / (1 - r)', 'Sum to infinity of convergent GP (|r| < 1): S_∞ = a / (1 - r)'],
      theoryOverview:
        'An AP has a constant difference between consecutive terms. A GP has a constant ratio between consecutive terms. An infinite GP converges to a finite sum S_∞ if and only if |r| < 1. Applications include savings schemes with annual increment and biological bacterial reproduction.',
      keyFormulas: [
        'AP nth term: Tₙ = a + (n - 1) · d',
        'AP Sum: Sₙ = (n / 2) · [2a + (n - 1) · d]',
        'GP nth term: Tₙ = a · rⁿ⁻¹',
        'GP Sum: Sₙ = [a · (rⁿ - 1)] / (r - 1) for r > 1',
        'GP Sum to Infinity: S_∞ = a / (1 - r) for -1 < r < 1'
      ],
      kenyanApplication: 'Sinking fund deposits for Kenyan SACCO retirement schemes; radioactive decay half-life series.',
      examTips: 'When given 3 consecutive terms of a GP, equate the common ratios: T₂ / T₁ = T₃ / T₂. This forms a quadratic equation to solve for the unknown.'
    },
    {
      id: 'math-f3-t10',
      title: 'Binomial Expansions & Probability',
      formOrYear: 'Form 3',
      subtopics: ['Pascal’s triangle coefficients up to power n = 6', 'Binomial expansion of (a + b)ⁿ and (1 + x)ⁿ', 'Using binomial expansions to evaluate arithmetic approximations like (1.02)⁶', 'Experimental vs theoretical probability: P(A) = n(A) / n(S)', 'Mutually exclusive events: P(A or B) = P(A) + P(B)', 'Independent events: P(A and B) = P(A) × P(B)', 'Tree diagrams for sampling with replacement and without replacement'],
      theoryOverview:
        'The Binomial theorem expands algebraic powers of binomials using Pascal’s triangle coefficients: 1, (1, 1), (1, 2, 1), (1, 3, 3, 1), (1, 4, 6, 4, 1), (1, 5, 10, 10, 5, 1). In probability, tree diagrams map multi-stage outcomes. In sampling without replacement, the total sample space decreases by 1 in the second draw.',
      keyFormulas: [
        'Expansion: (a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴',
        'P(A′) = 1 - P(A) (Complementary event)',
        'Independent events: P(A ∩ B) = P(A) · P(B)',
        'Combined: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)'
      ],
      kenyanApplication: 'Quality testing in tea auction grading; agricultural rainfall probability modeling for crop insurance in Kitui.',
      examTips: 'In probability tree diagrams without replacement, make sure you reduce BOTH the numerator and the denominator by 1 for subsequent draws of the same color!'
    },

    // FORM 4
    {
      id: 'math-f4-t1',
      title: 'Matrices and Transformations',
      formOrYear: 'Form 4',
      subtopics: ['Matrix transformations on the Cartesian plane: Reflection, Rotation, Enlargement, Shear, Stretch', 'Finding the matrix of transformation using unit square vectors I(1, 0) and J(0, 1)', 'Determinant of transformation matrix equals Area Scale Factor', 'Negative determinant implies negative orientation (reversal of sense/reflection)', 'Successive transformations and matrix multiplication order: T₂ followed by T₁ is represented by T₁ · T₂', 'Inverse transformation matrix reverses original transformation'],
      theoryOverview:
        'A 2×2 transformation matrix transforms point (x, y) into image (x′, y′) via [x′; y′] = M · [x; y]. To find matrix M, determine coordinates of unit vectors after transformation: M = [T(1, 0), T(0, 1)]. Determinant of M equals Area Scale Factor; if det(M) is negative, the transformation involves a reflection.',
      keyFormulas: [
        'Transformation: [x′; y′] = [a  b; c  d] · [x; y]',
        'Area Scale Factor ASF = |det(M)| = |ad - bc|',
        'Area of Image = |det(M)| × Area of Object',
        'Combined transformation: If T₁ is performed first followed by T₂, composite matrix = T₂ · T₁'
      ],
      kenyanApplication: 'Computer-aided design (CAD) spatial rendering; GIS mapping transformations at Regional Centre for Mapping.',
      examTips: 'Order of matrix multiplication matters! If transformation A is followed by transformation B, the combined transformation matrix is B × A (NOT A × B)!'
    },
    {
      id: 'math-f4-t2',
      title: 'Statistics II (Standard Deviation, Variance & Ogives)',
      formOrYear: 'Form 4',
      subtopics: ['Measures of dispersion: Range, Quartiles (Q₁, Q₂, Q₃), Interquartile range (IQR = Q₃ - Q₁), Semi-interquartile range', 'Cumulative frequency tables and plotting cumulative frequency curve (Ogive)', 'Estimating median, quartiles, deciles, and percentiles from an Ogive', 'Variance s² = Σf(x - x̄)² / Σf = [Σfx² / Σf] - (x̄)²', 'Standard deviation s = √Variance', 'Using an assumed mean A to compute standard deviation'],
      theoryOverview:
        'Standard deviation measures the average dispersion of data points around the mean. The cumulative frequency curve (ogive) plots cumulative frequency against upper class boundaries. The lower quartile Q₁ is at the 25% rank (N/4), median Q₂ is at 50% (N/2), and upper quartile Q₃ is at 75% (3N/4).',
      keyFormulas: [
        'Variance s² = [Σ(f · x²) / Σf] - (x̄)²',
        'Standard Deviation s = √Variance',
        'Interquartile Range IQR = Q₃ - Q₁',
        'Semi-interquartile range = (Q₃ - Q₁) / 2'
      ],
      kenyanApplication: 'Analyzing coffee auction price volatility at Nairobi Coffee Exchange; KCSE national exam standardization bell curves.',
      examTips: 'When plotting an ogive, always plot cumulative frequency against UPPER CLASS BOUNDARIES (not midpoints!), and start the curve from the lower boundary of the first class on the horizontal axis!'
    },
    {
      id: 'math-f4-t3',
      title: 'Loci & Geometric Constructions',
      formOrYear: 'Form 4',
      subtopics: ['Definition of locus as path traced by a point moving under given geometric constraints', 'Locus of points equidistant from two fixed points (perpendicular bisector)', 'Locus of points at a constant distance from a fixed point (circle)', 'Locus of points at a constant distance from a straight line (parallel lines)', 'Locus of points equidistant from two intersecting lines (angle bisector)', 'Constant angle subtended by a chord locus (arc of a circle)', 'Shading feasible regions satisfying multiple geometric loci inequalities'],
      theoryOverview:
        'A locus is a set of points satisfying specific geometric conditions. The locus of points at distance r from line AB is two parallel lines at distance r on either side, rounded by semicircles at the ends. The locus of points where chord AB subtends constant angle θ is a circular arc constructed on AB.',
      keyFormulas: [
        'Equidistant from A and B => Perpendicular bisector of AB',
        'Equidistant from lines AB and BC => Angle bisector of ∠ABC',
        'Distance ≤ d from point P => Region inside circle radius d centered at P'
      ],
      kenyanApplication: 'Town planning zoning setbacks and road reserve demarcations by the Nairobi City County.',
      examTips: 'Loci questions award marks for construction arcs! Use a sharp pencil and leave all construction lines visible. Shade the required region clearly as instructed.'
    },
    {
      id: 'math-f4-t4',
      title: 'Three Dimensional Geometry (Projections & Angles)',
      formOrYear: 'Form 4',
      subtopics: ['3D figures: cuboids, right pyramids, tetrahedrons, prisms, cones', 'Orthogonal projection of a line onto a plane', 'Angle between a line and a plane', 'Angle between two intersecting planes (dihedral angle)', 'Skew lines and distance between planes', 'Calculating lengths and angles in 3D using Pythagoras theorem and trigonometry'],
      theoryOverview:
        'The angle between a line and a plane is the angle between the line and its orthogonal projection on that plane. The angle between two intersecting planes is the angle between two lines, one in each plane, drawn perpendicular to the common line of intersection at the same point.',
      keyFormulas: [
        'Length of 3D diagonal in cuboid: d = √(L² + W² + H²)',
        'Angle θ between line VA and horizontal base plane: cos θ = (Length of projection of VA) / VA'
      ],
      kenyanApplication: 'Roof truss load bearing angles and solar panel tilt optimization angles in Kenyan architectural building design.',
      examTips: 'Always sketch the 2D right-angled triangle extracted from the 3D solid before calculating! Identify the right angle clearly.'
    },
    {
      id: 'math-f4-t5',
      title: 'Longitudes and Latitudes (Spherical Navigation)',
      formOrYear: 'Form 4',
      subtopics: ['Earth as a sphere: radius R ≈ 6370 km, Equator, Greenwich Meridian (0°)', 'Great circles (Equator, meridians of longitude) vs Small circles (parallels of latitude)', 'Distance along a great circle: d = (θ / 360) × 2πR = 60 · θ nautical miles (nm)', 'Distance along a small circle of latitude α: d = (θ / 360) × 2πR cos α = 60 · θ cos α nm', 'Speed in knots (1 knot = 1 nautical mile per hour)', 'Local time difference: 1° of longitude corresponds to 4 minutes (Earth rotates 360° in 24 hours)', 'Time zones, eastwards gain time (+), westwards lose time (-)'],
      theoryOverview:
        'The Earth rotates 360° on its axis in 24 hours, so 15° longitude corresponds to 1 hour (1° = 4 minutes). Places to the east are ahead in time. A nautical mile (nm) is the distance subtended by an angle of 1 minute (1/60°) along a great circle: 1° great circle = 60 nautical miles. Along a parallel of latitude α, distance = 60 · θ · cos α nm.',
      keyFormulas: [
        'Great circle distance: d = 60 · θ nautical miles (where θ is angular difference in degrees)',
        'Great circle distance: d = (θ / 360) · 2 · π · R km',
        'Small circle distance: d = 60 · θ · cos α nautical miles',
        'Small circle distance: d = (θ / 360) · 2 · π · R · cos α km',
        'Time difference = Longitude difference in degrees × 4 minutes'
      ],
      kenyanApplication: 'Flight navigation flight planning from Nairobi JKIA to London Heathrow or Dubai by Kenya Airways pilots.',
      examTips: 'Look closely at the unit requested! If distance is asked in nautical miles (nm), use 60θ or 60θ cos α. If asked in kilometers, use (θ/360) × 2πR where R = 6370 km!'
    },
    {
      id: 'math-f4-t6',
      title: 'Linear Programming (Optimization & Feasible Region)',
      formOrYear: 'Form 4',
      subtopics: ['Forming linear inequalities from real-world business constraints', 'Graphing linear inequalities and shading unwanted regions to leave feasible region clear', 'Integral coordinates within feasible region', 'Objective profit/cost function: P = ax + by', 'Finding optimal solution using search line method or testing corner vertices'],
      theoryOverview:
        'Linear programming optimizes a linear objective function subject to linear constraints. In the KNEC KCSE syllabus, candidates MUST shade the UNWANTED regions so that the feasible region R remains unshaded (clear). The optimal solution is found either by testing corner vertices of R or sliding an objective search line ax + by = k parallel to itself.',
      keyFormulas: [
        'Non-negativity constraints: x ≥ 0, y ≥ 0',
        'Feasible region R: The clear, unshaded polygon satisfying all constraints simultaneously',
        'Search line method: Draw line ax + by = k for a convenient k, slide parallel to find furthest vertex in R for maximum profit'
      ],
      kenyanApplication: 'Optimizing crop planting acreage (maize vs beans) for maximum revenue subject to seed budget and labor constraints in Uasin Gishu.',
      examTips: 'KNEC marking convention strictly requires candidates to SHADE THE UNWANTED REGION so that the feasible region R is left clean and unshaded. Invert this and you lose graph marks!'
    },
    {
      id: 'math-f4-t7',
      title: 'Calculus I: Differentiation (Gradients, Tangents & Maxima)',
      formOrYear: 'Form 4',
      subtopics: ['Concept of gradient function dy/dx as limiting rate of change', 'Differentiation of polynomials: if y = a·xⁿ, dy/dx = n·a·xⁿ⁻¹', 'Gradient of a curve at a specific point', 'Equations of tangent and normal to a curve: m_normal = -1 / m_tangent', 'Stationary (turning) points: dy/dx = 0', 'Distinguishing maximum and minimum turning points using second derivative (d²y/dx²) or sign changes of dy/dx', 'Kinematics: displacement s(t), velocity v = ds/dt, acceleration a = dv/dt'],
      theoryOverview:
        'Differentiation finds the instantaneous rate of change of a function. The derivative dy/dx gives the gradient of the tangent to the curve. The normal is perpendicular to the tangent: m_tangent × m_normal = -1. At stationary points, dy/dx = 0; if d²y/dx² < 0 it is a local maximum; if d²y/dx² > 0 it is a local minimum.',
      keyFormulas: [
        'Derivative rule: d/dx(a · xⁿ) = n · a · xⁿ⁻¹',
        'Tangent equation: y - y₁ = m · (x - x₁) where m = (dy/dx)|_(x₁)',
        'Normal equation: y - y₁ = (-1 / m) · (x - x₁)',
        'Stationary point condition: dy/dx = 0',
        'Kinematics: Velocity v = ds/dt, Acceleration a = dv/dt = d²s/dt²'
      ],
      kenyanApplication: 'Maximizing profit margins in industrial chemical manufacturing; rocket acceleration and braking deceleration profilers.',
      examTips: 'To determine whether a turning point is a maximum or minimum: calculate d²y/dx². If d²y/dx² is negative, it is a maximum! If positive, it is a minimum.'
    },
    {
      id: 'math-f4-t8',
      title: 'Calculus II: Integration (Area Under Curve & Trapezoidal Rule)',
      formOrYear: 'Form 4',
      subtopics: ['Integration as reverse process of differentiation', 'Indefinite integrals: ∫ a·xⁿ dx = [a/(n + 1)] xⁿ⁺¹ + C (for n ≠ -1)', 'Finding constant of integration C given a boundary point', 'Definite integrals: ∫[a to b] f(x) dx = F(b) - F(a)', 'Area under a curve bounded by x-axis and vertical lines x = a, x = b', 'Area between two intersecting curves', 'Trapezoidal rule / mid-ordinate rule for numerical area approximation: Area ≈ ½ h [(y₀ + yₙ) + 2(y₁ + y₂ + ... + yₙ₋₁)]', 'Kinematics: displacement s = ∫ v dt, velocity v = ∫ a dt'],
      theoryOverview:
        'Integration calculates accumulated totals and areas under curves. The fundamental theorem of calculus connects differentiation and integration. The trapezoidal rule approximates area by dividing the region into n vertical strips of equal width h: Area ≈ ½ h [ends + 2(middles)].',
      keyFormulas: [
        'Indefinite integral: ∫ a · xⁿ dx = [a / (n + 1)] · xⁿ⁺¹ + c',
        'Definite integral: Area = ∫[a to b] y dx = [F(x)]_a^b = F(b) - F(a)',
        'Trapezoidal Rule: Area ≈ ½ · h · [(y₀ + yₙ) + 2(y₁ + y₂ + y₃ + ... + yₙ₋₁)] where h = (b - a) / n',
        'Kinematics: s = ∫ v dt, v = ∫ a dt'
      ],
      kenyanApplication: 'Civil engineering earthwork excavation volume calculations; reservoir water volume integration for Sondu Miriu Hydro Station.',
      examTips: 'When finding area between a curve and the x-axis, if part of the curve dips below the x-axis, integrate the positive and negative portions separately and sum their absolute values, otherwise they will cancel out!'
    }
  ],
  practicals: [
    {
      id: 'math-prac-1',
      title: 'Geometric Loci and Area Optimization on Grid',
      objectives: [
        'Construct a scale drawing of a plot of land bounded by given lines and coordinates.',
        'Construct loci of moving boundaries (bisectors, fixed distances, constant angles).',
        'Locate points satisfying simultaneous constraints and calculate bounded area using coordinate and integration methods.'
      ],
      apparatus: ['Mathematical instrument set (pair of compasses, divider, 30cm ruler, set squares)', 'Sharp 2H and HB drawing pencils', 'Graph paper with 1mm grid', 'Four-figure mathematical tables'],
      safetyHazards: ['Use compasses with care to avoid puncture injuries. Ensure pencil is securely clamped.'],
      procedure: [
        'Draw line segment AB = 8.0 cm representing an 80-meter field boundary.',
        'Using compasses only, construct ∠ABC = 60° and mark point C such that BC = 7.0 cm.',
        'Construct the perpendicular bisector of AB.',
        'Construct the locus of points equidistant from lines AB and BC (angle bisector of ∠ABC).',
        'Construct the locus of points 3.0 cm from line AC.',
        'Identify and shade region R inside triangle ABC closer to AB than BC and at least 3.0 cm from AC.'
      ],
      observationTable: {
        headers: ['Geometric Property', 'Calculated / Measured Value', 'Tolerance Allowed by KNEC'],
        sampleRows: [
          ['Length of AC', '7.55 cm (75.5 m)', '± 0.1 cm'],
          ['Angle ∠ACB', '66.5°', '± 1.0°'],
          ['Area of triangle ABC', '24.25 cm²', '± 0.5 cm²']
        ]
      },
      calculationFormula: 'Area = ½ · a · b · sin C = ½ · 8.0 · 7.0 · sin 60° = 28 · 0.8660 = 24.25 cm².',
      expectedOutcome: 'A precise geometric drawing with all construction arcs visible. Shaded region correctly bounded by bisectors.',
      vivaQuestions: [
        'Why must construction arcs be left visible? (They provide proof of geometric construction without using a protractor).',
        'How does the angle bisector ensure points are equidistant from the arms? (Every point on the bisector forms congruent right triangles with perpendiculars to the two rays).'
      ]
    }
  ],
  exams: [
    {
      id: 'kcse-math-mock-p1',
      title: 'KCSE Mathematics Paper 1 (Section I & II)',
      paperCode: '121/1',
      durationMinutes: 150,
      totalMarks: 100,
      instructions: [
        'Write your name and index number in the spaces provided.',
        'This paper consists of two sections: Section I (50 marks) and Section II (50 marks).',
        'Answer all questions in Section I and any five questions from Section II.',
        'Show all the steps in your calculations, giving your answers at each stage in the spaces provided.',
        'Non-programmable silent electronic calculators and KNEC mathematical tables may be used except where stated otherwise.'
      ],
      questions: [
        {
          id: 'math-q1',
          questionNumber: 1,
          questionText: 'Evaluate without using a calculator or mathematical tables: [ -12 ÷ (-3) × 4 - (-15) ] / [ -5 × 6 ÷ 2 + (-5) ].',
          marks: 3,
          sampleAnswer:
            'Numerator:\n-12 ÷ (-3) = 4\n4 × 4 = 16\n16 - (-15) = 16 + 15 = 31.\n\nDenominator:\n-5 × 6 = -30\n-30 ÷ 2 = -15\n-15 + (-5) = -15 - 5 = -20.\n\nResult = 31 / (-20) = -31/20 = -1 ¹¹/₂₀ = -1.55.',
          markingScheme: [
            'M1: Evaluation of numerator = 31',
            'M1: Evaluation of denominator = -20',
            'A1: Correct simplified answer = -31/20 or -1.55'
          ]
        },
        {
          id: 'math-q2',
          questionNumber: 2,
          questionText: 'Simplify the expression: (4x² - 9y²) / (2x² - 5xy + 3y²).',
          marks: 3,
          sampleAnswer:
            'Numerator is a difference of two squares:\n4x² - 9y² = (2x - 3y)(2x + 3y).\n\nDenominator: 2x² - 5xy + 3y².\nProduct = 2 × 3 = 6; Sum = -5. Factors are -2 and -3.\n2x² - 2xy - 3xy + 3y² = 2x(x - y) - 3y(x - y) = (2x - 3y)(x - y).\n\nExpression = [(2x - 3y)(2x + 3y)] / [(2x - 3y)(x - y)].\nCancel common factor (2x - 3y):\n= (2x + 3y) / (x - y).',
          markingScheme: [
            'M1: Factorizing numerator = (2x - 3y)(2x + 3y)',
            'M1: Factorizing denominator = (2x - 3y)(x - y)',
            'A1: Simplified result = (2x + 3y) / (x - y)'
          ]
        },
        {
          id: 'math-q3',
          questionNumber: 3,
          questionText: 'A Kenyan employee earns a basic salary of KSh 40,000 and a house allowance of KSh 12,000 per month. He is entitled to a personal tax relief of KSh 2,400 per month. The monthly PAYE tax rates are: 0 - 24,000 @ 10%, 24,001 - 32,333 @ 25%, above 32,333 @ 30%. Calculate his net monthly PAYE tax.',
          marks: 4,
          sampleAnswer:
            'Taxable Gross Income = Basic + House Allowance = 40,000 + 12,000 = KSh 52,000.\n\nTax per slab:\nSlab 1 (1st 24,000): 24,000 × 10% = KSh 2,400\nSlab 2 (next 8,333): 8,333 × 25% = KSh 2,083.25\nRemaining income = 52,000 - 32,333 = KSh 19,667\nSlab 3 (above 32,333): 19,667 × 30% = KSh 5,900.10\n\nTotal Gross Tax = 2,400 + 2,083.25 + 5,900.10 = KSh 10,383.35.\nNet Tax = Gross Tax - Personal Relief = 10,383.35 - 2,400 = KSh 7,983.35.',
          markingScheme: [
            'M1: Taxable income = 52,000',
            'M1: Correct computation of first two slabs (2,400 + 2,083.25)',
            'M1: Third slab computation: 19,667 × 30% = 5,900.10',
            'A1: Net tax after deducting 2,400 relief = KSh 7,983.35'
          ]
        }
      ]
    }
  ]
};
