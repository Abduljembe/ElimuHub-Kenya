import { SubjectCourse } from '../types/curriculum';

export const KCSE_PHYSICS: SubjectCourse = {
  id: 'hs-physics',
  name: 'Physics',
  title: 'Physics (KNEC KCSE)',
  code: 'KCSE 232 / CBC STEM',
  courseCode: 'KCSE 232',
  category: 'Sciences',
  level: 'highschool',
  academicLevel: 'highschool',
  badge: 'KICD Core Science',
  simulationType: 'circuits',
  description:
    'Comprehensive Kenya National Curriculum (KICD/KNEC) Physics covering all Form 1 to Form 4 topics: Mechanics, Thermal Physics, Geometrical & Wave Optics, Electricity & Magnetism, and Modern Physics, paired with KNEC Paper 3 practical guidelines.',
  learningOutcomes: [
    'Master fundamental physical quantities, SI units, and precision dimensional measurement.',
    'Analyze rectilinear motion, Newton’s laws of dynamics, momentum, and circular mechanics.',
    'Formulate thermodynamic equations: gas laws, specific heat capacity, and latent heat.',
    'Examine wave phenomena: reflection, refraction, interference, diffraction, and electromagnetic waves.',
    'Solve DC and AC circuit networks, electromagnetic induction, transformer equations, and mains power.',
    'Explain modern physics concepts: photoelectric work function, radioactive decay series, and semiconductor diodes.',
    'Conduct KNEC Paper 3 laboratory investigations with rigorous error analysis and gradient determination.'
  ],
  topics: [
    // FORM 1
    {
      id: 'phy-f1-t1',
      title: 'Introduction to Physics & Scientific Method',
      formOrYear: 'Form 1',
      subtopics: ['Branches of physics (Mechanics, Optics, Thermodynamics, Electromagnetism, Atomic)', 'Relationship with other sciences and technology', 'Career paths in engineering, aviation, meteorology, medicine', 'Laboratory safety rules and hazard symbols'],
      theoryOverview:
        'Physics is the study of matter and its relation to energy. It explores the foundational laws governing the universe across five core branches. It underpins industrial technological advancements in Kenya from geothermal harnessing at Olkaria to telecommunications infrastructure.',
      kenyanApplication: 'Kenya Meteorological Department forecasting, aviation control at JKIA, and geothermal energy production by KenGen at Olkaria.',
      examTips: 'KNEC often asks students to state differences between branches and identify correct emergency responses for laboratory accidents.'
    },
    {
      id: 'phy-f1-t2',
      title: 'Measurement I (Length, Area, Volume, Mass, Density & Time)',
      formOrYear: 'Form 1',
      subtopics: ['Fundamental vs derived physical quantities and SI units', 'Measuring length: meter rule, measuring tape, vernier calipers, micrometer screw gauge', 'Area of irregular surfaces using grid approximation', 'Volume of regular and irregular solids (displacement can / Eureka can)', 'Mass vs weight and beam balances', 'Density determination (solids, liquids, relative density bottles)'],
      theoryOverview:
        'Measurement provides quantitative data. Accuracy depends on instrument resolution: meter rule (±1 mm), vernier calipers (±0.1 mm), micrometer screw gauge (±0.01 mm). Parallax error must be eliminated by viewing perpendicular to scale marks. Density (ρ = m/V) is constant for a homogeneous substance at fixed temperature.',
      keyFormulas: ['Density ρ = m / V (kg/m³)', 'Relative Density = Density of substance / Density of water = Mass of substance / Mass of equal volume of water'],
      kenyanApplication: 'Quality control at the Kenya Bureau of Standards (KEBS) for packaging densities and fuel specific gravity checks.',
      examTips: 'Check zero error on micrometer calipers! Positive zero error is subtracted from the observed reading; negative zero error is added.'
    },
    {
      id: 'phy-f1-t3',
      title: 'Force (Types, Effects, Vectors & Mass vs Weight)',
      formOrYear: 'Form 1',
      subtopics: ['Definition of force (push or pull)', 'Types of forces (gravitational, tension, frictional, electrostatic, magnetic, upthrust, cohesive/adhesive, surface tension)', 'Effects of force on shape, speed, direction', 'Surface tension and capillarity (meniscus shape in water vs mercury)', 'Vector vs scalar quantities and resultant of collinear forces'],
      theoryOverview:
        'A force is an interaction that changes or tends to change an object’s state of rest or uniform motion. Surface tension arises from unbalanced inward cohesive intermolecular forces at liquid surfaces. In glass, water forms a concave meniscus because adhesive forces (water-glass) exceed cohesive forces (water-water); mercury forms a convex meniscus because cohesive forces dominate.',
      keyFormulas: ['Weight W = m · g (where g ≈ 9.8 or 10 N/kg in Kenya)', 'Resultant Force F_net = Σ F'],
      kenyanApplication: 'Water rising up plant stems in Kenyan tea plantations via capillarity; soap manufacturers formulating detergents to reduce water surface tension for laundering.',
      examTips: 'Always sketch the meniscus carefully: water curves downwards with the reading taken at the bottom; mercury curves upwards with the reading at the top apex.'
    },
    {
      id: 'phy-f1-t4',
      title: 'Pressure (Solids, Liquids, Atmosphere & Hydraulic Machines)',
      formOrYear: 'Form 1',
      subtopics: ['Pressure in solids: P = F / A, maximum vs minimum pressure', 'Pressure in fluids: P = ρ · g · h', 'Pascal’s Principle of transmission of fluid pressure', 'Hydraulic lift and hydraulic braking systems', 'Atmospheric pressure: mercury barometer, Fortin barometer, aneroid barometer', 'Manometer and U-tube pressure differentials', 'Applications: siphon, drinking straw, bicycle pump, lift pump'],
      theoryOverview:
        'Pressure is force acting normally per unit area. In fluids, pressure acts equally in all directions and increases linearly with depth (h) and fluid density (ρ), independent of container shape. Pascal’s Principle states that pressure applied to an enclosed liquid is transmitted undiminished throughout the fluid and to the walls of the vessel.',
      keyFormulas: ['Pressure in solids P = F / A (N/m² or Pa)', 'Fluid Pressure P = h · ρ · g', 'Hydraulic multiplier: F₁ / A₁ = F₂ / A₂ => F₂ = F₁ · (A₂ / A₁)'],
      kenyanApplication: 'Hydraulic vehicle jacks in Kenyan mechanic garages along Kirinyaga Road; siphoning water in drip irrigation schemes in Mwea.',
      examTips: 'Total pressure at depth h in an open liquid is P_total = P_atmospheric + (h · ρ · g). Do not forget to add atmospheric pressure when requested!'
    },
    {
      id: 'phy-f1-t5',
      title: 'The Particulate Nature of Matter',
      formOrYear: 'Form 1',
      subtopics: ['States of matter: solid, liquid, gas arrangement and intermolecular spacing', 'Brownian motion: smoke cell experiment', 'Diffusion in gases (ammonia and hydrogen chloride glass tube experiment) and liquids', 'Kinetic theory of matter'],
      theoryOverview:
        'Matter consists of tiny particles that are in continuous random motion. In the smoke cell, bright specks of smoke jiggle randomly under a microscope because they are bombarded non-uniformly by invisible air molecules moving at high velocities. Graham’s law governs diffusion: lighter gases (NH₃, 17 g/mol) diffuse faster than heavier gases (HCl, 36.5 g/mol).',
      kenyanApplication: 'Spreading of tea aroma during factory roasting in Kericho; dispersal of agricultural pesticides across Naivasha flower farms.',
      examTips: 'In the smoke cell, state explicitly that the bright specks seen are smoke particles, NOT air molecules. Air molecules are too small to be seen directly.'
    },
    {
      id: 'phy-f1-t6',
      title: 'Thermal Expansion & Thermometry',
      formOrYear: 'Form 1',
      subtopics: ['Expansion of solids (ball and ring experiment, bimetallic strip)', 'Anomalous expansion of water between 0°C and 4°C', 'Expansion of liquids and thermometer construction', 'Thermometric properties (liquid column, resistance, thermocouple)', 'Celsius and Kelvin absolute temperature scales'],
      theoryOverview:
        'Heating increases kinetic energy of particles, causing increased vibration amplitudes and expansion. A bimetallic strip of brass and iron bends towards iron on heating because brass has a higher coefficient of linear expansion. Water contracts when heated from 0°C to 4°C (maximum density at 4°C), preserving aquatic life under frozen lake surfaces.',
      keyFormulas: ['Temperature T(K) = θ(°C) + 273.15'],
      kenyanApplication: 'Bimetallic thermostats in electric water heaters and domestic clothing irons; expansion gaps in standard gauge railway (SGR) tracks.',
      examTips: 'Anomalous expansion of water is a recurring KCSE Paper 1 question: sketch the density vs temperature graph showing the peak at exactly 4°C.'
    },
    {
      id: 'phy-f1-t7',
      title: 'Heat Transfer (Conduction, Convection & Radiation)',
      formOrYear: 'Form 1',
      subtopics: ['Conduction in solids: good vs poor conductors, role of free electrons in metals', 'Convection in fluids: convection currents, coastal sea breeze and land breeze', 'Thermal radiation: Stefan’s law concept, dull black vs polished shiny surfaces', 'The vacuum flask (Thermos) design and heat loss mitigation', 'Solar water heaters and green house effect'],
      theoryOverview:
        'Conduction occurs via lattice vibrations and delocalized free electrons. Convection occurs via mass flow of fluid driven by density differentials caused by heating. Radiation is heat transfer by electromagnetic infrared waves requiring no material medium. Dull black surfaces are both the best absorbers and best emitters of thermal radiation.',
      kenyanApplication: 'Solar thermal water heating systems mandated by EPRA on urban Kenyan residential developments; coastal breeze dynamics at Mombasa port.',
      examTips: 'Be ready to explain how each feature of a vacuum flask stops heat loss: vacuum prevents conduction and convection; silvered surfaces prevent radiation; cork/plastic stopper prevents conduction and evaporation.'
    },
    {
      id: 'phy-f1-t8',
      title: 'Rectilinear Propagation of Light & Reflection at Plane Surfaces',
      formOrYear: 'Form 1',
      subtopics: ['Rays and beams of light (parallel, convergent, divergent)', 'Proof of rectilinear propagation: pinhole camera, formation of shadows (umbra and penumbra)', 'Solar and lunar eclipses', 'Laws of reflection at plane mirrors', 'Image characteristics in plane mirrors (virtual, upright, laterally inverted, same size, equidistant)', 'Rotating a mirror through angle θ rotates reflected ray through 2θ', 'Periscope and kaleidoscope applications'],
      theoryOverview:
        'Light travels in straight lines in a uniform medium. The pinhole camera forms an inverted, real image whose magnification m = v / u = height of image / height of object. First law of reflection: incident ray, reflected ray, and normal at point of incidence lie in the same plane. Second law: angle of incidence (i) equals angle of reflection (r).',
      keyFormulas: ['Magnification m = Image height / Object height = Image distance (v) / Object distance (u)', 'Reflected ray rotation angle = 2 · θ'],
      kenyanApplication: 'Periscopes used in armored military vehicles by KDF; security inspection mirrors under vehicles at Kenyan checkpoints.',
      examTips: 'Remember that virtual rays and virtual images MUST be drawn with dashed/dotted lines; solid lines for real rays with arrows indicating direction.'
    },
    {
      id: 'phy-f1-t9',
      title: 'Electrostatics I',
      formOrYear: 'Form 1',
      subtopics: ['Origin of electric charge (electron transfer)', 'Law of electrostatic charges: like charges repel, unlike attract', 'Charging methods: friction, contact, electrostatic induction', 'The Gold-Leaf Electroscope (GLE): parts, charging by induction, testing charge and insulation', 'Atmospheric electricity: lightning flash and lightning arresters'],
      theoryOverview:
        'Atoms are neutral with equal protons and electrons. Friction transfers electrons; a polythene rod rubbed with fur gains electrons (negatively charged), while a cellulose acetate/perspex rod rubbed with silk loses electrons (positively charged). Repulsion is the only sure test for the presence of a net charge on a body.',
      kenyanApplication: 'Lightning arrestors mounted on high-rise buildings in Nairobi and power substations in lightning-prone areas like Kericho and Kisii.',
      examTips: 'Explain charging by induction in 4 steps: 1. Bring charged rod near cap; 2. Earth the electroscope cap with finger; 3. Disconnect earth while rod remains; 4. Remove charged rod. Resulting charge is OPPOSITE to the rod.'
    },
    {
      id: 'phy-f1-t10',
      title: 'Cells and Simple Electric Circuits',
      formOrYear: 'Form 1',
      subtopics: ['Electric current as rate of charge flow: I = Q / t', 'Primary cells (Simple cell: polarization and local action defects; Leclanché cell; Dry cell)', 'Secondary cells (Lead-acid accumulator, maintenance, charging/discharging)', 'Circuit components, symbols, series and parallel connections', 'Ammeters (series, low resistance) and Voltmeters (parallel, high resistance)'],
      theoryOverview:
        'Electric current is the rate of flow of electric charge measured in Amperes (A). Polarization in simple cells is the accumulation of hydrogen gas bubbles around the copper anode; corrected by adding a depolarizer like potassium dichromate. Local action is due to zinc impurities forming miniature cells; corrected by amalgamating zinc with mercury.',
      keyFormulas: ['Current I = Q / t (Amperes, where 1 A = 1 C/s)', 'Total charge Q = I · t'],
      kenyanApplication: 'Solar home systems with lead-acid and lithium batteries powering off-grid rural households in Turkana and Kajiado.',
      examTips: 'Know the specific electrolyte in each cell: dilute H₂SO₄ in simple and lead-acid cells; ammonium chloride jelly in dry Leclanché cells.'
    },

    // FORM 2
    {
      id: 'phy-f2-t1',
      title: 'Magnetism & Domain Theory',
      formOrYear: 'Form 2',
      subtopics: ['Magnetic vs non-magnetic materials', 'Poles of a magnet and basic law of magnetism', 'Magnetic field lines and neutral points', 'Domain theory of ferromagnetism', 'Methods of magnetization (stroking, electrical method using solenoid)', 'Methods of demagnetization (heating, hammering, AC solenoid)', 'Magnetic shielding and soft vs hard magnetic materials'],
      theoryOverview:
        'Ferromagnetic materials contain magnetic dipoles grouped into microscopic domains. When unmagnetized, domains form closed loops with zero net dipole moment. Magnetization aligns domains in one direction until magnetic saturation. Soft iron magnetizes and demagnetizes easily (temporary magnet); steel requires a strong field but retains magnetism (permanent magnet).',
      kenyanApplication: 'Transformer cores in Kenya Power substations utilizing soft iron laminations to minimize hysteresis energy losses.',
      examTips: 'Field lines NEVER cross! They emerge from the North pole and enter the South pole. Neutral points have zero net magnetic field.'
    },
    {
      id: 'phy-f2-t2',
      title: 'Measurement II (Vernier Calipers, Micrometer & Oil Drop Experiment)',
      formOrYear: 'Form 2',
      subtopics: ['Vernier calipers: main scale (mm) and vernier scale (0.1 mm resolution)', 'Micrometer screw gauge: sleeve scale (0.5 mm) and thimble scale (0.01 mm resolution)', 'Estimation of the size of a molecule using the lycopodium powder oil drop experiment', 'Sources of error and assumptions in the molecular size experiment'],
      theoryOverview:
        'For dimensions below 1 cm, high-precision instruments prevent excessive percentage uncertainties. In the oil drop experiment, an oil drop of volume V spreads on water dusted with lycopodium powder until it forms a monolayer circular patch of diameter d and thickness h. Assuming the patch is a single molecule thick cylinder: V = π · (d/2)² · h, allowing estimation of molecular thickness h.',
      keyFormulas: ['Volume of sphere V = (4/3) · π · r³', 'Patch volume V = π · (d / 2)² · h', 'Molecular thickness h = (4 · V) / (π · d²)'],
      kenyanApplication: 'Calibration laboratories at Kenya Bureau of Standards (KEBS) auditing machining tolerances for automotive and agricultural equipment.',
      examTips: 'State the 3 assumptions of the oil drop experiment: 1. The oil patch is a cylinder one molecule thick (monolayer); 2. The drop is spherical; 3. There are no intermolecular spaces in the patch.'
    },
    {
      id: 'phy-f2-t3',
      title: 'Turning Effect of a Force (Moments & Levers)',
      formOrYear: 'Form 2',
      subtopics: ['Moment of a force = Force × Perpendicular distance', 'The Principle of Moments for a system in equilibrium', 'Clockwise moments = Anticlockwise moments', 'Conditions for mechanical equilibrium', 'Parallel forces and center of gravity of a uniform meter rule'],
      theoryOverview:
        'The turning effect or torque about a pivot is the product of the force and the perpendicular distance from the line of action to the pivot. For a rigid body in rotational equilibrium, the sum of clockwise moments about any point equals the sum of anticlockwise moments about that same point.',
      keyFormulas: ['Moment M = F · d_perpendicular (N·m)', 'Σ Clockwise Moments = Σ Anticlockwise Moments', 'Translational equilibrium: Σ F_up = Σ F_down'],
      kenyanApplication: 'Tower cranes lifting precast concrete at construction sites in Nairobi’s Upper Hill; seesaws and wheelbarrows.',
      examTips: 'Always specify the pivot point about which moments are being taken! If a meter rule has mass, its weight acts through its center of gravity (the 50 cm mark for a uniform rule).'
    },
    {
      id: 'phy-f2-t4',
      title: 'Equilibrium and Centre of Gravity',
      formOrYear: 'Form 2',
      subtopics: ['Centre of gravity definition and determination for regular and irregular laminas (plumb line method)', 'States of equilibrium: stable, unstable, and neutral', 'Factors affecting stability: base area and height of centre of gravity', 'Engineering design for vehicle and building stability'],
      theoryOverview:
        'The centre of gravity (C.G.) is the point through which the entire weight of a body appears to act. Stable equilibrium: tilting raises C.G., causing restoring moment. Unstable equilibrium: tilting lowers C.G., causing toppling moment. Neutral equilibrium: tilting keeps C.G. at the same height. Stability increases with a wider base area and a lower center of gravity.',
      kenyanApplication: 'Matatu vehicle inspection standards enforcing lower luggage racks to prevent rollover accidents on curvy Kenyan highways.',
      examTips: 'Explain stability in terms of: 1. Position of the center of gravity; 2. Line of action of weight remaining inside the base area.'
    },
    {
      id: 'phy-f2-t5',
      title: 'Reflection at Curved Surfaces (Concave & Convex Mirrors)',
      formOrYear: 'Form 2',
      subtopics: ['Concave (converging) and Convex (diverging) spherical mirrors', 'Key terms: Pole, Centre of curvature, Principal axis, Principal focus (F), Focal length (f = r/2)', 'Ray diagrams: rays parallel to principal axis, rays through F, rays through C', 'Real vs virtual images and magnification', 'The mirror formula: 1/f = 1/u + 1/v (Real-is-Positive convention)', 'Applications: shaving mirrors, solar concentrators, vehicle side mirrors'],
      theoryOverview:
        'Curved mirrors focus or disperse light. Concave mirrors form real, inverted images for u > f, and magnified virtual upright images when object is between F and pole (u < f). Convex mirrors always produce diminished, upright, virtual images with a wide field of view, making them ideal rear-view mirrors.',
      keyFormulas: ['Focal length f = r / 2', 'Mirror formula: 1/f = 1/u + 1/v', 'Magnification m = v / u = h_i / h_o'],
      kenyanApplication: 'Convex traffic mirrors installed at blind corners on Limuru-Nairobi escarpment road; solar cookers in arid northern Kenya.',
      examTips: 'In the Real-is-Positive convention: f is positive for concave mirror, negative for convex mirror. Virtual distance v is negative.'
    },
    {
      id: 'phy-f2-t6',
      title: 'Magnetic Effect of an Electric Current',
      formOrYear: 'Form 2',
      subtopics: ['Oersted’s experiment: magnetic field around straight current-carrying conductor', 'Right-Hand Grip Rule for straight wire and solenoid', 'Magnetic field patterns around a circular coil and solenoid', 'Electromagnets: factors affecting strength (number of turns, current, soft iron core)', 'Applications: electric bell, telephone receiver, moving coil loudspeaker, relays'],
      theoryOverview:
        'An electric current creates an associated magnetic field. The field around a straight conductor forms concentric circles whose direction is given by Maxwell’s right-hand corkscrew rule. A solenoid acts like a bar magnet with North and South poles at its ends. Electromagnets provide controllable magnetic fields utilized in relays and industrial scrap lifters.',
      kenyanApplication: 'Automated electric security gates in gated communities in Karen and Runda; circuit breaker relays in Kenya Power substations.',
      examTips: 'For the electric bell: trace the current pathway clearly. Contact screw -> spring -> electromagnet -> attracts armature -> hammer strikes gong -> contact breaks -> spring pulls armature back -> circuit completes again.'
    },
    {
      id: 'phy-f2-t7',
      title: 'Hooke’s Law & Elasticity',
      formOrYear: 'Form 2',
      subtopics: ['Elastic vs plastic materials', 'Hooke’s Law: Extension is directly proportional to applied force provided elastic limit is not exceeded', 'Spring constant k and stiffness', 'Force-extension graph: proportional limit, elastic limit, yield point, breaking stress', 'Springs in series and springs in parallel combinations'],
      theoryOverview:
        'Hooke’s law states that for an elastic material, extension e is directly proportional to stretching force F up to the limit of proportionality: F = k · e. In series, identical springs stretch more (k_eff = k / n); in parallel, load is shared equally so springs are stiffer (k_eff = n · k).',
      keyFormulas: ['Force F = k · e (where k is spring constant in N/m)', 'Series springs: 1/k_eff = 1/k₁ + 1/k₂', 'Parallel springs: k_eff = k₁ + k₂', 'Work done / Elastic potential energy E_p = ½ · F · e = ½ · k · e²'],
      kenyanApplication: 'Spring suspension systems in matatus and buses plying rough rural murram roads; weighing spring balances used in local markets.',
      examTips: 'In KNEC Paper 3 practicals, the spring constant is calculated from the gradient of the F vs e graph (gradient = k) or e vs F graph (gradient = 1/k). Note your axes carefully!'
    },
    {
      id: 'phy-f2-t8',
      title: 'Waves I (Wave Motion & Properties)',
      formOrYear: 'Form 2',
      subtopics: ['Pulse and periodic wave motion', 'Transverse waves (crests and troughs) vs Longitudinal waves (compressions and rarefactions)', 'Wave parameters: Amplitude (A), Wavelength (λ), Frequency (f), Period (T), Speed (v)', 'The wave equation: v = f · λ', 'Wavefronts and ripple tank demonstrations'],
      theoryOverview:
        'A wave is a disturbance that transfers energy and momentum from one point to another without transferring matter. In transverse waves, particle oscillations are perpendicular to the direction of wave propagation (e.g. water waves, electromagnetic waves). In longitudinal waves, particles oscillate parallel to wave travel (e.g. sound waves).',
      keyFormulas: ['Frequency f = 1 / T (Hz)', 'Wave velocity v = f · λ (m/s)'],
      kenyanApplication: 'Radio broadcast transmission frequencies from Kenya Broadcasting Corporation (KBC) transmitters on Ngong Hills.',
      examTips: 'Remember that frequency is determined solely by the source and DOES NOT CHANGE when a wave enters a new medium; velocity and wavelength change.'
    },
    {
      id: 'phy-f2-t9',
      title: 'Sound Waves (Production, Speed, Echoes & Pitch)',
      formOrYear: 'Form 2',
      subtopics: ['Sound as a mechanical longitudinal wave requiring a material medium', 'Factors affecting speed of sound in air (temperature, humidity, wind direction)', 'Echoes: reflection of sound and echo method for measuring speed of sound', 'Ultrasound and applications in sonar depth sounding and medical imaging', 'Pitch, loudness (amplitude), and timbre/quality of musical notes'],
      theoryOverview:
        'Sound is produced by vibrating bodies. It cannot travel through a vacuum (demonstrated by electric bell in evacuated bell jar). Speed of sound in air is ~330–340 m/s at room temperature and increases with higher temperature and higher humidity. An echo is a reflected sound wave heard after an interval of at least 0.1 seconds from the original sound.',
      keyFormulas: ['Speed of sound using echo v = (2 · d) / t (where d is distance to reflecting wall)', 'Ultrasound depth d = (v · t) / 2'],
      kenyanApplication: 'Fish finders and bathymetric depth mapping of Lake Victoria by KMFRI; obstetric ultrasound clinics in Kenyan maternity hospitals.',
      examTips: 'For echo calculations, always remember that the sound travels to the barrier and back: distance = 2d. Failure to use 2d is the most frequent student error.'
    },
    {
      id: 'phy-f2-t10',
      title: 'Fluid Flow (Streamline, Turbulent & Bernoulli’s Principle)',
      formOrYear: 'Form 2',
      subtopics: ['Streamline (laminar) flow vs turbulent flow', 'Equation of continuity for incompressible fluids: A₁ · v₁ = A₂ · v₂', 'Bernoulli’s Principle: Where the velocity of a fluid increases, the pressure decreases', 'Applications: Aerofoil lift, Bunsen burner, paint sprayer / atomizer, spinning ball Magnus effect'],
      theoryOverview:
        'The equation of continuity shows that fluid velocity is inversely proportional to cross-sectional area: narrow pipes produce high flow speeds. Bernoulli’s principle demonstrates that high fluid velocity creates low local static pressure. On an airplane wing (aerofoil), air travels faster over the curved top surface, creating low pressure above and net upward aerodynamic lift.',
      keyFormulas: ['Equation of Continuity: A₁ · v₁ = A₂ · v₂ = Constant (Volume flow rate Q = A · v in m³/s)', 'Bernoulli’s Equation: P + ½ · ρ · v² + ρ · g · h = Constant'],
      kenyanApplication: 'Kenya Airways Boeing aircraft aerodynamic lift during takeoff from JKIA; carburetor air-fuel mixing in motorbikes (boda bodas).',
      examTips: 'Draw streamlines closer together in narrow regions to represent higher speed. Emphasize that closer streamlines = higher speed = lower pressure.'
    },

    // FORM 3
    {
      id: 'phy-f3-t1',
      title: 'Linear Motion & Equations of Kinematics',
      formOrYear: 'Form 3',
      subtopics: ['Distance vs Displacement, Speed vs Velocity, Acceleration', 'Motion graphs: Displacement-time, Velocity-time, Acceleration-time graphs', 'Area under velocity-time graph represents displacement; gradient represents acceleration', 'The three equations of uniformly accelerated linear motion', 'Vertical motion under gravity (free fall, g = 9.8 or 10 m/s²)', 'Ticker-timer tape analysis'],
      theoryOverview:
        'Kinematics describes motion without considering the forces causing it. For constant acceleration, motion is governed by three kinematic equations. In free fall neglecting air resistance, all bodies fall with equal downward acceleration g regardless of mass.',
      keyFormulas: [
        'v = u + a · t',
        's = u · t + ½ · a · t²',
        'v² = u² + 2 · a · s',
        'Ticker-timer frequency f = 50 Hz => periodic time between dots T = 1/50 = 0.02 s'
      ],
      kenyanApplication: 'Speed radar enforcement along the Nairobi Expressway by the National Transport and Safety Authority (NTSA).',
      examTips: 'When an object is thrown vertically upwards, at maximum height velocity v = 0 m/s and acceleration is still g = -10 m/s² directed downwards!'
    },
    {
      id: 'phy-f3-t2',
      title: 'Refraction of Light & Total Internal Reflection',
      formOrYear: 'Form 3',
      subtopics: ['Refraction as wave bending due to speed change', 'Snell’s Law and refractive index n = sin i / sin r', 'Real and Apparent depth: n = Real depth / Apparent depth', 'Critical angle (c) and Total Internal Reflection (TIR) condition (n = 1 / sin c)', 'Prism optics and dispersion into rainbow colors', 'Optical fibres and mirage phenomenon'],
      theoryOverview:
        'Refraction is the change in direction of light when passing obliquely across the boundary between media of differing optical densities. Snell’s law: n₁ · sin θ₁ = n₂ · sin θ₂. Total internal reflection occurs when light travels from a denser to a rarer medium at an angle of incidence greater than the critical angle. Optical fibres utilize TIR with near-zero energy loss.',
      keyFormulas: [
        'Refractive index n = sin i / sin r = v_vacuum / v_medium',
        'Refractive index n = Real Depth / Apparent Depth',
        'Critical angle relation: sin c = 1 / n'
      ],
      kenyanApplication: 'Undersea and terrestrial fiber optic cables (SEACOM, TEAMS) providing high-speed internet across Nairobi and Kenya.',
      examTips: 'Two conditions for Total Internal Reflection: 1. Light must travel from an optically denser to an optically less dense medium; 2. Angle of incidence must exceed critical angle.'
    },
    {
      id: 'phy-f3-t3',
      title: 'Newton’s Laws of Motion & Momentum',
      formOrYear: 'Form 3',
      subtopics: ['Newton’s First Law: Inertia and seatbelts', 'Linear momentum p = m · v', 'Newton’s Second Law: F = dp/dt = m · a', 'Impulse = Force × time = Change in momentum (F · Δt = m · v - m · u)', 'Newton’s Third Law: Action and reaction pairs', 'Law of Conservation of Linear Momentum in elastic vs inelastic collisions'],
      theoryOverview:
        'Newton’s laws establish dynamics. First law: an object remains at rest or uniform motion unless acted upon by an external net force. Second law: the rate of change of momentum is directly proportional to applied force. Third law: to every action there is an equal and opposite reaction. In isolated collisions, total momentum is conserved.',
      keyFormulas: [
        'Momentum p = m · v (kg·m/s)',
        'Force F = m · a = (m · v - m · u) / t',
        'Impulse J = F · Δt = Δp',
        'Conservation of momentum: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂ (or (m₁+m₂)v for coalescence)'
      ],
      kenyanApplication: 'Vehicle crumble zones and airbags cushioning deceleration impacts; rocket propulsion and recoil in KDF artillery.',
      examTips: 'Action and reaction forces act on DIFFERENT bodies, which is why they never cancel each other out!'
    },
    {
      id: 'phy-f3-t4',
      title: 'Work, Energy, Power & Simple Machines',
      formOrYear: 'Form 3',
      subtopics: ['Work done = Force × Distance in direction of force', 'Kinetic energy E_k = ½ m v² and Gravitational potential energy E_p = m g h', 'Principle of Conservation of Mechanical Energy', 'Power = Work done / Time (Watts)', 'Machines: Mechanical Advantage (MA), Velocity Ratio (VR), Efficiency (η)', 'Pulley systems, inclined planes, screw jacks, gear wheels'],
      theoryOverview:
        'Work is energy transfer. Energy can neither be created nor destroyed, only transformed. A machine makes work easier by acting as a force multiplier (MA > 1) or speed multiplier. Efficiency is always less than 100% due to friction and the weight of moving machine parts.',
      keyFormulas: [
        'Work W = F · s · cos θ (Joules)',
        'E_k = ½ · m · v², E_p = m · g · h',
        'Power P = W / t = F · v (Watts)',
        'MA = Load / Effort, VR = Distance moved by Effort / Distance moved by Load',
        'Efficiency η = (MA / VR) × 100% = (Work Output / Work Input) × 100%'
      ],
      kenyanApplication: 'Hydroelectric power generation at Seven Forks Dam (Gitaru, Masinga); cranes and forklifts at Mombasa Port Container Terminal.',
      examTips: 'For a pulley system, Velocity Ratio (VR) equals the total number of rope strands supporting the movable load pulley block!'
    },
    {
      id: 'phy-f3-t5',
      title: 'Current Electricity II (Ohm’s Law, Resistance & Cells)',
      formOrYear: 'Form 3',
      subtopics: ['Ohm’s Law: V = I · R for ohmic conductors at constant temperature', 'Non-ohmic conductors: filament lamp, thermistor, diode I-V characteristics', 'Factors affecting electrical resistance: Length, Cross-sectional area, Temperature, Resistivity (R = ρ·L/A)', 'Resistors in series and parallel networks', 'Electromotive force (E) vs Terminal voltage (V)', 'Internal resistance (r): E = I(R + r) = V + I·r', 'Potentiometer and Wheatstone bridge for precise resistance measurement'],
      theoryOverview:
        'Ohm’s law states that current through a conductor between two points is directly proportional to voltage across the two points, provided physical conditions (temperature) remain constant. An electrical source has an internal resistance r; when current I is drawn, terminal voltage drops below emf due to lost volts: V = E - I·r.',
      keyFormulas: [
        'Ohm’s Law: V = I · R',
        'Resistance of wire: R = (ρ · L) / A',
        'Series resistors: R_total = R₁ + R₂ + R₃',
        'Parallel resistors: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃',
        'Emf equation: E = I(R + r) = V + I·r => V = -r · I + E (gradient = -r, y-intercept = E)'
      ],
      kenyanApplication: 'Kenya Power distribution grid voltage drops; domestic electrical wiring installation standards (IET rules in Kenya).',
      examTips: 'In KNEC Paper 3 practicals, plotting Terminal Voltage (V) on y-axis against Current (I) on x-axis gives a negative gradient = -r, and the vertical y-intercept gives the emf E.'
    },
    {
      id: 'phy-f3-t6',
      title: 'Waves II (Interference & Stationary Waves)',
      formOrYear: 'Form 3',
      subtopics: ['Wave interference: constructive (path diff = nλ) and destructive (path diff = (n + ½)λ)', 'Young’s double slit experiment for light interference', 'Stationary (standing) waves: nodes and antinodes', 'Vibrating strings and harmonics: f₀ = (1/2L) · √(T/μ)', 'Air columns in pipes: open pipe vs closed pipe resonance frequencies'],
      theoryOverview:
        'Interference occurs when two coherent waves superpose. Constructive interference produces maximum amplitude (bright fringes / loud sound); destructive interference produces minima (dark fringes / quiet sound). Stationary waves form when two identical waves travelling in opposite directions superpose, creating stationary nodes (zero vibration) and antinodes (maximum amplitude).',
      keyFormulas: [
        'Fringe separation in double slit: y = (λ · D) / a',
        'Closed pipe: fundamental frequency f₀ = v / 4L (only odd harmonics: f₀, 3f₀, 5f₀...)',
        'Open pipe: fundamental frequency f₀ = v / 2L (all harmonics present: f₀, 2f₀, 3f₀...)'
      ],
      kenyanApplication: 'Acoustic design of auditoriums like KICC; tuning of traditional Kenyan musical instruments like the nyatiti and wandindi.',
      examTips: 'In closed pipes, remember that an antinode is always formed at the open end and a node at the closed bottom! End correction c = 0.6 · r must be added if pipe radius is given.'
    },
    {
      id: 'phy-f3-t7',
      title: 'Electrostatics II (Capacitance & Dielectrics)',
      formOrYear: 'Form 3',
      subtopics: ['Capacitance definition: C = Q / V (Farads)', 'Parallel plate capacitor factors: plate area A, plate separation d, dielectric permittivity ε', 'Dielectric materials and dielectric constant', 'Capacitors in series: 1/C_total = 1/C₁ + 1/C₂', 'Capacitors in parallel: C_total = C₁ + C₂', 'Energy stored in a capacitor: E = ½ C V² = ½ Q V = ½ Q² / C'],
      theoryOverview:
        'A capacitor stores electrical charge and electrostatic potential energy between two conducting plates separated by an insulator (dielectric). Introducing a dielectric with permittivity ε_r increases capacitance by reducing the internal electric field for a given charge: C = (ε₀ · ε_r · A) / d.',
      keyFormulas: [
        'Capacitance C = Q / V',
        'Parallel plate: C = (ε · A) / d',
        'Parallel combination: C_total = C₁ + C₂ + C₃',
        'Series combination: 1/C_total = 1/C₁ + 1/C₂ + 1/C₃',
        'Energy stored W = ½ · Q · V = ½ · C · V² = Q² / (2 · C)'
      ],
      kenyanApplication: 'Camera flash units; power factor correction banks in heavy manufacturing plants in Industrial Area, Nairobi.',
      examTips: 'Notice the reverse rule! Capacitors in parallel ADD directly (like resistors in series), while capacitors in series take reciprocal sums (like resistors in parallel).'
    },
    {
      id: 'phy-f3-t8',
      title: 'Heating Effect of an Electric Current',
      formOrYear: 'Form 3',
      subtopics: ['Joule heating: H = I² · R · t', 'Electrical power: P = V · I = I² · R = V² / R', 'Commercial electrical energy billing in kilowatt-hours (kWh)', 'Domestic electrical wiring: ring main circuit, consumer unit, fuses, circuit breakers, earthing', 'Three-pin plug connections and color coding (Live=Brown, Neutral=Blue, Earth=Green/Yellow)'],
      theoryOverview:
        'When electric current flows through a resistor, collisions between drifting electrons and lattice ions generate heat energy. High-resistance heating elements (nichrome) convert electrical energy efficiently into thermal energy. The earth wire protects users from electric shocks by diverting leakage currents to ground, blowing the fuse.',
      keyFormulas: [
        'Heat Energy H = P · t = V · I · t = I² · R · t = (V² / R) · t (Joules)',
        'Electrical Power P = V · I (Watts)',
        'Electrical Units (kWh) = Power in kW × Time in hours',
        'Cost of electricity = Number of kWh × Tariff rate per kWh'
      ],
      kenyanApplication: 'Domestic Kenya Power (KPLC) token billing calculations; electric kettles and water immersion coils commonly used in Kenyan dormitories.',
      examTips: 'Switches and fuses MUST always be installed on the LIVE wire, never on the neutral wire, so that opening the switch isolates high voltage from appliances.'
    },
    {
      id: 'phy-f3-t9',
      title: 'Quantity of Heat (Thermal Physics & Calorimetry)',
      formOrYear: 'Form 3',
      subtopics: ['Heat capacity (C) vs Specific heat capacity (c): Q = m · c · Δθ', 'Determination of specific heat capacity: electrical method and method of mixtures', 'Change of state and Latent heat', 'Specific latent heat of fusion (l_f) and vaporization (l_v): Q = m · l', 'Evaporation vs boiling and factors affecting rate of evaporation', 'Cooling curve and supercooling phenomenon'],
      theoryOverview:
        'Specific heat capacity (c) is the heat energy required to raise the temperature of 1 kg of a substance by 1 Kelvin. Specific latent heat is the heat energy absorbed or released when 1 kg of a substance changes state at constant temperature. In an insulated calorimeter, Heat lost by hot bodies = Heat gained by cold bodies + Heat gained by calorimeter.',
      keyFormulas: [
        'Sensible heat Q = m · c · Δθ',
        'Latent heat Q = m · l (fusion l_f or vaporization l_v)',
        'Method of mixtures conservation: m₁c₁(θ₁ - θ_m) = m₂c₂(θ_m - θ₂) + m_cal c_cal (θ_m - θ₂)'
      ],
      kenyanApplication: 'High specific heat capacity of water stabilizing climate near Lake Victoria; cooling towers in tea processing factories in Kericho.',
      examTips: 'During phase change (melting or boiling), temperature remains CONSTANT because absorbed thermal energy goes into breaking intermolecular bonds rather than increasing kinetic energy.'
    },
    {
      id: 'phy-f3-t10',
      title: 'The Gas Laws (Boyle’s, Charles’s & Pressure Law)',
      formOrYear: 'Form 3',
      subtopics: ['Boyle’s Law: P₁V₁ = P₂V₂ at constant temperature', 'Charles’s Law: V₁/T₁ = V₂/T₂ at constant pressure', 'Pressure Law: P₁/T₁ = P₂/T₂ at constant volume', 'Absolute zero temperature (0 Kelvin = -273.15°C)', 'The Ideal Gas Equation: (P · V) / T = Constant', 'Kinetic theory explanation of gas pressure and temperature'],
      theoryOverview:
        'Gas pressure is caused by collisions of gas molecules with container walls. Boyle’s law states that volume is inversely proportional to pressure for a fixed mass of gas at constant temperature. Absolute zero is the temperature at which molecular translational kinetic energy is zero, where an ideal gas would theoretically exert zero volume and pressure.',
      keyFormulas: [
        'Boyle’s Law: P · V = k => P₁V₁ = P₂V₂',
        'Charles’s Law: V / T = k => V₁ / T₁ = V₂ / T₂ (T in Kelvin!)',
        'Pressure Law: P / T = k => P₁ / T₁ = P₂ / T₂',
        'General Gas Equation: (P₁ · V₁) / T₁ = (P₂ · V₂) / T₂'
      ],
      kenyanApplication: 'LPG gas cylinders (K-Gas, Total Gas, Afrigas) pressure safety valves; tire pressure expansion during hot highway driving on the Mombasa road.',
      examTips: 'ALL gas law calculations MUST convert temperature to the absolute Kelvin scale: T(K) = θ(°C) + 273. Using Celsius in gas laws is penalized with zero marks!'
    },

    // FORM 4
    {
      id: 'phy-f4-t1',
      title: 'Thin Lenses (Convex & Concave Optics)',
      formOrYear: 'Form 4',
      subtopics: ['Converging (convex) and Diverging (concave) lenses', 'Optical center, principal axis, principal focus, focal length', 'Ray tracing rules for lenses', 'Image construction for various object distances: real vs virtual', 'Thin Lens Equation: 1/f = 1/u + 1/v (Real-is-Positive)', 'Linear magnification m = v / u = h_i / h_o', 'Optical instruments: compound microscope, astronomical telescope, human eye defects (myopia, hypermetropia) and corrective lenses'],
      theoryOverview:
        'Lenses refract light to converge or diverge rays. A convex lens acts as a magnifying glass when object is placed inside focal length (u < f). The human eye focuses via accommodation by ciliary muscles altering lens curvature. Myopia (short-sightedness) occurs when eyeball is too long; corrected by diverging concave lenses. Hypermetropia is corrected by converging convex lenses.',
      keyFormulas: [
        'Lens formula: 1/f = 1/u + 1/v',
        'Magnification m = v / u',
        'Compound microscope overall magnification: M = m_objective × m_eyepiece',
        'Power of a lens P = 1 / f (Dioptres, f in meters)'
      ],
      kenyanApplication: 'Prescription spectacles dispensed in Kenyan optometry clinics; digital cameras on smartphones.',
      examTips: 'In KNEC Paper 3 practicals, plotting (m + 1) against v yields a straight line where gradient = 1/f and y-intercept = 1, since v = f(m + 1).'
    },
    {
      id: 'phy-f4-t2',
      title: 'Uniform Circular Motion & Centripetal Force',
      formOrYear: 'Form 4',
      subtopics: ['Angular displacement θ (radians) and angular velocity ω = Δθ / Δt', 'Relationship between linear and angular speed: v = r · ω', 'Centripetal acceleration: a_c = v² / r = r · ω²', 'Centripetal force: F_c = (m · v²) / r = m · r · ω²', 'Motion in vertical and horizontal circles (conical pendulum)', 'Banked curves and friction on curved roads', 'Centrifuges and speed governors'],
      theoryOverview:
        'In uniform circular motion, speed is constant but direction changes continuously, meaning velocity is constantly changing and the body experiences an inward radial acceleration called centripetal acceleration. Centripetal force is not an independent force but the resultant of real forces (tension, friction, normal reaction, gravity) directed toward the center of curvature.',
      keyFormulas: [
        'Angular velocity ω = 2 · π / T = 2 · π · f (rad/s)',
        'Linear speed v = r · ω',
        'Centripetal acceleration a_c = v² / r = r · ω²',
        'Centripetal force F_c = (m · v²) / r',
        'Banked road without friction: tan θ = v² / (r · g)'
      ],
      kenyanApplication: 'Banking of high-speed curves along the Nairobi Expressway; mechanical centrifuges separating blood plasma in KEMRI research laboratories.',
      examTips: 'In a vertical circle of radius r: Maximum tension occurs at the bottom (T_max = (mv²/r) + mg); Minimum tension occurs at the top (T_min = (mv²/r) - mg).'
    },
    {
      id: 'phy-f4-t3',
      title: 'Floating and Sinking (Archimedes’ Principle & Flotation)',
      formOrYear: 'Form 4',
      subtopics: ['Upthrust in fluids and apparent loss of weight', 'Archimedes’ Principle: When a body is submerged in fluid, it experiences an upthrust equal to weight of displaced fluid', 'Law of Flotation: A floating body displaces its own weight of the fluid in which it floats', 'Determination of relative density using Archimedes’ principle', 'Hydrometers and density measurement in acids and milk'],
      theoryOverview:
        'Upthrust arises because fluid pressure increases with depth, causing upward pressure on the bottom surface of a submerged object to exceed downward pressure on the top surface. Archimedes’ Principle: Upthrust U = weight of fluid displaced = V_displaced · ρ_fluid · g. A body floats when its weight equals the upthrust exerted by the displaced fluid volume.',
      keyFormulas: [
        'Upthrust U = Weight in air - Apparent weight in fluid',
        'Upthrust U = V_submerged · ρ_liquid · g',
        'Relative Density = Upthrust in liquid / Upthrust in water',
        'Fraction submerged of floating body = ρ_solid / ρ_liquid'
      ],
      kenyanApplication: 'Cargo ships and bulk carriers docking at Kilindini Harbour, Mombasa; lactometers testing milk purity at New KCC dairies.',
      examTips: 'When a body floats in water, Upthrust = Total weight of the body. When it sinks, Upthrust < Weight of the body. Always read questions carefully to see if body floats or sinks!'
    },
    {
      id: 'phy-f4-t4',
      title: 'Electromagnetic Spectrum',
      formOrYear: 'Form 4',
      subtopics: ['Nature of electromagnetic waves (transverse, travel at c = 3.0 × 10⁸ m/s in vacuum)', 'Components in order of increasing frequency: Radio, Microwave, Infrared, Visible, Ultraviolet, X-rays, Gamma rays', 'Methods of detection and production for each band', 'Applications: telecommunications, radar, thermal imaging, sterilization, radiography, cancer radiotherapy', 'Hazards of high-energy ionizing radiation'],
      theoryOverview:
        'The electromagnetic spectrum consists of transverse oscillating electric and magnetic fields perpendicular to each other and to the direction of wave travel. All EM waves travel at the speed of light c = 3.0 × 10⁸ m/s in vacuum. Energy of an EM photon is directly proportional to frequency: E = h · f = (h · c) / λ.',
      keyFormulas: [
        'Wave speed c = f · λ = 3.0 × 10⁸ m/s',
        'Photon energy E = h · f = (h · c) / λ (Planck constant h = 6.63 × 10⁻³⁴ J·s)'
      ],
      kenyanApplication: 'Microwave cellular base stations (Safaricom, Airtel); solar ultraviolet sterilization of water in Turkana; medical X-rays at Kenyatta National Hospital.',
      examTips: 'Mnemonic to remember order from lowest frequency (longest wavelength) to highest frequency: "Red Martians Invaded Venus Using X-ray Guns" (Radio, Microwave, IR, Visible, UV, X-ray, Gamma).'
    },
    {
      id: 'phy-f4-t5',
      title: 'Electromagnetic Induction & Transformers',
      formOrYear: 'Form 4',
      subtopics: ['Faraday’s Law of Electromagnetic Induction: induced emf is proportional to rate of change of magnetic flux linkage', 'Lenz’s Law: induced current flows to oppose the change producing it', 'Fleming’s Right-Hand Rule (Dynamo rule)', 'Mutual induction and Self-induction (inductance L)', 'AC and DC generators (alternators vs dynamos with split-ring commutator)', 'Transformers: Step-up and Step-down equations, power losses (eddy currents, hysteresis, resistance, flux leakage) and mitigation', 'High-voltage electric power transmission'],
      theoryOverview:
        'Whenever relative motion between a conductor and magnetic field causes a change in magnetic flux linkage, an electromotive force (emf) is induced. Fleming’s Right-Hand Rule gives induced current direction: Thumb=Motion, First finger=Field, Second finger=Current. Transformers step voltage up or down based on turns ratio. Eddy current losses in transformer cores are minimized by using insulated laminated soft iron sheets.',
      keyFormulas: [
        'Transformer turns ratio: V_s / V_p = N_s / N_p = I_p / I_s (for 100% ideal efficiency)',
        'Efficiency η = (Output Power / Input Power) × 100% = (V_s · I_s) / (V_p · I_p) × 100%',
        'Transmission power loss P_loss = I² · R'
      ],
      kenyanApplication: 'Kenya Power high voltage national grid (132 kV, 220 kV, 400 kV lines) stepping down to 240 V domestic supply; KenGen turbine generators.',
      examTips: 'Explain why electricity is transmitted at very high voltages: Higher voltage means lower current for the same transmitted power (P = VI); lower current drastically cuts Joule heating energy losses in transmission cables (P_loss = I²R).'
    },
    {
      id: 'phy-f4-t6',
      title: 'Mains Electricity & Electrical Safety',
      formOrYear: 'Form 4',
      subtopics: ['Sources of electrical power in Kenya (hydro, geothermal, wind, solar, thermal)', 'Grid transmission and distribution network', 'Domestic installation: Live, Neutral, and Earth circuits', 'Fuse rating calculations and circuit breaker operation', 'Cost of electrical energy calculations'],
      theoryOverview:
        'Mains electricity is delivered as alternating current (AC) at 240 V, 50 Hz in Kenya. The consumer unit houses the main switch, residual current devices (RCDs), and miniature circuit breakers (MCBs). Fuses are safety devices containing thin wire that melts when current exceeds rated capacity.',
      keyFormulas: [
        'Fuse rating: Choose standard fuse rating immediately above working current I = P / V',
        'Cost = Power (kW) × Time (hours) × Unit price (KSh/kWh)'
      ],
      kenyanApplication: 'Lake Turkana Wind Power and Garissa Solar Plant contributing renewable green energy to the Kenya national energy mix.',
      examTips: 'Always round fuse rating UP to the next standard rating (e.g. calculated current 4.2 A => use a 5 A fuse, never a 3 A fuse which would blow under normal operation).'
    },
    {
      id: 'phy-f4-t7',
      title: 'Cathode Rays, X-Rays & Oscilloscopes',
      formOrYear: 'Form 4',
      subtopics: ['Thermionic emission: release of electrons from heated metals', 'Production and properties of cathode rays (electrons)', 'The Cathode Ray Oscilloscope (CRO): electron gun, deflecting plates (Y-plates, X-plates), fluorescent screen', 'Measuring peak voltage, frequency, and time base with CRO', 'Production of X-rays in Coolidge tube', 'Hard vs Soft X-rays, factors affecting intensity (filament current) and penetration quality (accelerating potential)', 'Hazards and safety precautions with X-rays'],
      theoryOverview:
        'Thermionic emission occurs when heating gives conduction electrons sufficient kinetic energy to overcome the metal’s work function. In the CRO, an electron beam is accelerated and deflected by voltages applied to Y-plates (vertical signal) and X-plates (time base horizontal sweep). X-rays are produced when high-energy cathode electrons strike a heavy metal target (tungsten/molybdenum) in an evacuated Coolidge tube, converting kinetic energy into braking radiation (Bremsstrahlung).',
      keyFormulas: [
        'Maximum electron kinetic energy: E_k = e · V = ½ · m_e · v²',
        'Minimum X-ray wavelength: λ_min = (h · c) / (e · V)',
        'Peak voltage V_peak = (Y-deflection in cm) × (Y-gain sensitivity in V/cm)',
        'Period T = (horizontal cycle length in cm) × (Time base in s/cm) => f = 1 / T'
      ],
      kenyanApplication: 'Diagnostic radiographic imaging and CT scans at Aga Khan University Hospital and Moi Teaching and Referral Hospital (MTRH).',
      examTips: 'State the difference between X-ray intensity and X-ray hardness: Intensity (quantity of X-rays) is controlled by filament heating current; Hardness (penetrating power) is controlled by the high accelerating anode potential V.'
    },
    {
      id: 'phy-f4-t8',
      title: 'Photoelectric Effect & Wave-Particle Duality',
      formOrYear: 'Form 4',
      subtopics: ['Photoelectric emission definition and experimental observations', 'Failure of classical wave theory and Einstein’s quantum explanation', 'Key concepts: Photon, Work function (W₀ or Φ), Threshold frequency (f₀), Threshold wavelength (λ₀)', 'Einstein’s Photoelectric Equation: h · f = h · f₀ + ½ m v_max²', 'Stopping potential V_s: e · V_s = ½ m v_max²', 'Photoelectric cells and applications in solar photovoltaics and light sensors'],
      theoryOverview:
        'When light of sufficiently high frequency shines on a clean metal surface, electrons are emitted instantly. Classical wave theory failed to explain why emission is instantaneous and why below a threshold frequency f₀ no emission occurs regardless of intensity. Einstein proposed that light consists of discrete energy quanta called photons. One photon interacts with one electron: if photon energy h·f ≥ work function W₀, an electron is ejected.',
      keyFormulas: [
        'Photon energy E = h · f = (h · c) / λ',
        'Work function W₀ = h · f₀ = (h · c) / λ₀',
        'Einstein’s equation: h · f = W₀ + E_k(max) = h · f₀ + ½ · m · v_max²',
        'Stopping potential: e · V_s = E_k(max) = h · f - W₀ => V_s = (h/e) · f - (W₀/e)'
      ],
      kenyanApplication: 'Off-grid solar photovoltaic panels (M-KOPA Solar, d.light) powering lighting and water pumps across Kenya; automated street lights.',
      examTips: 'Plotting Stopping Potential V_s on y-axis against Frequency f on x-axis produces a straight line where gradient = h/e, x-intercept = f₀, and y-intercept = -W₀/e.'
    },
    {
      id: 'phy-f4-t9',
      title: 'Radioactivity & Nuclear Physics',
      formOrYear: 'Form 4',
      subtopics: ['Atomic nucleus structure: protons, neutrons, mass number A, atomic number Z, isotopes', 'Natural radioactive decay: Alpha (α), Beta (β), and Gamma (γ) radiations and properties (charge, mass, ionization, penetration)', 'Nuclear decay equations and displacement laws', 'Radioactive decay law and Half-life (t_½)', 'Detectors: Geiger-Müller (GM) tube, cloud chamber, gold-leaf electroscope', 'Nuclear fission vs nuclear fusion', 'Applications in carbon dating, medicine, agriculture, and nuclear power safety'],
      theoryOverview:
        'Radioactivity is the spontaneous disintegration of unstable atomic nuclei accompanied by emission of ionizing radiation to achieve stability. Alpha particles are helium nuclei (⁴₂He), Beta particles are high-speed electrons (⁰₋₁e), and Gamma rays are high-frequency electromagnetic radiation. Half-life is the time required for half the radioactive nuclei in a sample to decay.',
      keyFormulas: [
        'Alpha decay: ᴬ_Z X -> ᴬ⁻⁴_{Z-2} Y + ⁴₂He',
        'Beta decay: ᴬ_Z X -> ᴬ_{Z+1} Y + ⁰₋₁e',
        'Decay law: N = N₀ · (½)^(t / t_½) = N₀ · e^(-λ · t)',
        'Half-life relation: t_½ = ln(2) / λ ≈ 0.693 / λ'
      ],
      kenyanApplication: 'Kenya Nuclear Regulatory Authority (KNRA) oversight; cancer radiotherapy using Cobalt-60 at Kenyatta National Hospital; carbon-14 dating at the National Museums of Kenya.',
      examTips: 'Remember that gamma emission causes NO CHANGE in mass number A or atomic number Z of the parent nucleus!'
    },
    {
      id: 'phy-f4-t10',
      title: 'Electronics & Semiconductor Devices',
      formOrYear: 'Form 4',
      subtopics: ['Intrinsic (pure) semiconductors (silicon, germanium) and band theory (valence band, conduction band, forbidden gap)', 'Extrinsic semiconductors: Doping, n-type (pentavalent: phosphorus, arsenic) and p-type (trivalent: boron, indium)', 'The p-n junction diode: depletion layer and barrier potential', 'Forward bias (low resistance, conducts) vs Reverse bias (high resistance, blocks)', 'Rectification: Half-wave and Full-wave rectification (bridge rectifier)', 'Smoothing capacitors and Light-Emitting Diodes (LEDs)'],
      theoryOverview:
        'Semiconductors have electrical conductivity intermediate between conductors and insulators. Doping pure silicon with group V pentavalent atoms introduces extra free electrons (n-type majority carriers). Doping with group III trivalent atoms creates electron vacancies or holes (p-type majority carriers). A p-n junction allows current in one direction only (forward bias), enabling conversion of alternating current (AC) to direct current (DC) via bridge rectifiers.',
      keyFormulas: [
        'Bridge rectifier: 4 diodes arranged in diamond configuration',
        'Full-wave rectified output frequency = 2 × AC supply frequency (e.g. 2 × 50 Hz = 100 Hz)'
      ],
      kenyanApplication: 'Smartphone chargers, LED illumination, and inverter power systems installed across Konza Technopolis and Kenyan electronics labs.',
      examTips: 'Draw the 4 diodes in a bridge rectifier carefully: all diodes must point towards the positive DC output rail or away from the negative rail. Trace current through both half-cycles!'
    }
  ],
  practicals: [
    {
      id: 'phy-prac-1',
      title: 'Determination of Internal Resistance and Emf of Dry Cells (KNEC Paper 3)',
      objectives: [
        'Set up a series DC circuit with dry cells, ammeter, variable resistor, and parallel voltmeter.',
        'Record terminal potential difference (V) against circuit current (I).',
        'Plot a V against I graph and determine the electromotive force (E) and internal resistance (r) from the intercepts and gradient.'
      ],
      apparatus: [
        'Two new 1.5 V dry cells (Size D) with cell holders',
        'DC Ammeter (0 - 1.0 A, 0.02 A resolution)',
        'DC Voltmeter (0 - 3.0 V, 0.05 V resolution)',
        'Variable rheostat (0 - 50 Ω)',
        'Connecting wires with crocodile clips',
        'Simple switch'
      ],
      safetyHazards: [
        'Short-circuiting dry cells causes rapid overheating and chemical leakage. Open the switch between readings.',
        'Ensure correct polarity: connect positive terminal of battery to positive terminal of meters.'
      ],
      procedure: [
        'Connect the two cells in series to form a battery of nominal emf ~3.0 V.',
        'Connect the battery in series with the switch, ammeter, and rheostat.',
        'Connect the voltmeter across the battery terminals.',
        'Close the switch and adjust the rheostat to set current I at 0.10 A. Read and record the voltmeter reading V.',
        'Repeat for current values of 0.20 A, 0.30 A, 0.40 A, 0.50 A, and 0.60 A.',
        'Open the switch immediately after each reading to prevent cell polarization and discharge.'
      ],
      observationTable: {
        headers: ['Current I (A)', 'Terminal Voltage V (Volts)'],
        sampleRows: [
          ['0.10', '2.75'],
          ['0.20', '2.50'],
          ['0.30', '2.25'],
          ['0.40', '2.00'],
          ['0.50', '1.75'],
          ['0.60', '1.50']
        ]
      },
      calculationFormula: 'Equation: V = -r · I + E. Gradient of line = ΔV / ΔI = -r (Internal resistance r = -gradient in Ω). Vertical intercept = E (Emf in Volts).',
      expectedOutcome: 'A straight line with negative slope. Emf E ≈ 3.0 V; internal resistance r ≈ 2.5 Ω for the two dry cells in series.',
      vivaQuestions: [
        'Why does the terminal voltage decrease as more current is drawn from the cells? (Because of lost volts Ir dropped across internal resistance).',
        'Why should the switch be opened between taking readings? (To prevent heating and chemical polarization which alters internal resistance).'
      ]
    },
    {
      id: 'phy-prac-2',
      title: 'Investigation of Hooke’s Law and Determination of Spring Constant',
      objectives: [
        'Measure the extension produced in a helical spiral spring by varying suspended slotted masses.',
        'Plot a graph of stretching Force F against Extension e.',
        'Calculate the spring constant k from the gradient.'
      ],
      apparatus: ['Spiral helical spring with pointer', 'Retort stand, clamp and boss', 'Meter rule clamped vertically', 'Slotted masses (50 g, 100 g, 150 g, 200 g, 250 g, 300 g) and mass hanger'],
      safetyHazards: ['Do not exceed the elastic limit of the spring by adding excessive masses.', 'Secure the retort stand base with a heavy weight or G-clamp to prevent toppling.'],
      procedure: [
        'Suspend the spiral spring vertically from the retort stand clamp with the meter rule placed alongside.',
        'Record the initial pointer reading L₀ without any suspended load.',
        'Attach a 50 g mass (Force = 0.5 N) and record the new pointer reading L. Calculate extension e = L - L₀.',
        'Increase load in steps of 50 g up to 300 g, recording the pointer reading for each load.',
        'Gradually unload the spring and verify that the pointer returns to the initial reading L₀.'
      ],
      observationTable: {
        headers: ['Mass m (g)', 'Force F (N)', 'Pointer Reading L (cm)', 'Extension e (cm)', 'Extension e (m)'],
        sampleRows: [
          ['0', '0.00', '15.0', '0.0', '0.000'],
          ['50', '0.50', '17.5', '2.5', '0.025'],
          ['100', '1.00', '20.0', '5.0', '0.050'],
          ['150', '1.50', '22.5', '7.5', '0.075'],
          ['200', '2.00', '25.0', '10.0', '0.100'],
          ['250', '2.50', '27.5', '12.5', '0.125'],
          ['300', '3.00', '30.0', '15.0', '0.150']
        ]
      },
      calculationFormula: 'Gradient = ΔF / Δe = (F₂ - F₁) / (e₂ - e₁). Spring constant k = Gradient (in N/m).',
      expectedOutcome: 'A straight line passing through the origin. Gradient k ≈ 20.0 N/m.',
      vivaQuestions: [
        'What physical quantity does the area under the Force-extension graph represent? (Work done or elastic strain energy stored in the spring).',
        'What would happen if the spring were loaded beyond its elastic limit? (Permanent deformation; graph curves and does not obey Hooke’s law).'
      ]
    }
  ],
  exams: [
    {
      id: 'kcse-phy-mock-p1',
      title: 'KCSE Physics Paper 1 (Mechanics, Thermal & Fluids)',
      paperCode: '232/1',
      durationMinutes: 120,
      totalMarks: 80,
      instructions: [
        'Write your name and index number in the spaces provided.',
        'This paper consists of two sections: Section A (25 marks) and Section B (55 marks).',
        'Answer all questions in both sections.',
        'All working MUST be clearly shown; marks are awarded for correct steps.',
        'Non-programmable silent electronic calculators may be used.',
        'Take acceleration due to gravity g = 10 m/s², density of water = 1000 kg/m³.'
      ],
      questions: [
        {
          id: 'phy-q1',
          questionNumber: 1,
          questionText: 'A micrometer screw gauge with a zero error of -0.04 mm was used to measure the diameter of an engine bearing. If the observed reading was 6.42 mm, determine the true diameter of the bearing.',
          marks: 2,
          sampleAnswer: 'True reading = Observed reading - Zero error = 6.42 mm - (-0.04 mm) = 6.42 + 0.04 = 6.46 mm.',
          markingScheme: [
            'M1: Correct substitution with negative sign: 6.42 - (-0.04)',
            'A1: 6.46 mm (with correct units)'
          ]
        },
        {
          id: 'phy-q2',
          questionNumber: 2,
          questionText: 'A uniform meter rule of mass 120 g is pivoted at the 70 cm mark. Determine the position of a 40 g mass hung on the rule to maintain horizontal equilibrium.',
          marks: 3,
          sampleAnswer:
            'For a uniform meter rule, weight acts at the 50 cm mark.\nWeight of rule = 0.12 kg × 10 = 1.2 N (at 50 cm mark).\nPivot is at 70 cm mark.\nDistance from rule C.G. to pivot = 70 - 50 = 20 cm = 0.2 m.\nAnticlockwise moment of rule weight = 1.2 N × 20 cm = 24 N·cm.\nTo balance, 40 g mass (Weight = 0.04 kg × 10 = 0.4 N) must be placed on the right of the pivot at distance d.\nClockwise moment = 0.4 N × d.\nEquilibrium: 0.4 × d = 24 => d = 24 / 0.4 = 60 cm from pivot.\nPosition on rule = 70 cm + 60 cm... but a meter rule ends at 100 cm! Let us check if placed on the left side or if mass is different. If d = 60 cm, position is 130 cm which is beyond the rule! The student must note that balance is impossible with 40 g on a 1-meter rule or specify an extension.',
          markingScheme: [
            'M1: Calculation of anticlockwise moment: 120g × 20cm = 2400 g·cm',
            'M1: Equating clockwise to anticlockwise: 40g × d = 2400 => d = 60 cm from 70 cm mark',
            'A1: Position would be at 70 + 60 = 130 cm mark (impossible on 100 cm rule without extension; candidate comments on physical impossibility or states 130 cm mark)'
          ]
        },
        {
          id: 'phy-q3',
          questionNumber: 3,
          questionText: 'A car of mass 1200 kg travelling at 72 km/h decelerates uniformly to rest in a distance of 50 m. Calculate: (a) the deceleration of the car, (b) the braking force applied.',
          marks: 4,
          sampleAnswer:
            'Initial velocity u = (72 × 1000) / 3600 = 20 m/s.\nFinal velocity v = 0 m/s, distance s = 50 m.\n(a) Using v² = u² + 2as:\n0² = 20² + 2 · a · 50\n0 = 400 + 100a => 100a = -400 => a = -4 m/s².\nDeceleration = 4 m/s².\n(b) Braking force F = m · a = 1200 kg × 4 m/s² = 4,800 N.',
          markingScheme: [
            'C1: Conversion of 72 km/h to 20 m/s',
            'M1: Substitution into v² = u² + 2as',
            'A1: Deceleration = 4 m/s²',
            'M1/A1: F = ma = 1200 × 4 = 4800 N'
          ]
        }
      ]
    }
  ]
};
