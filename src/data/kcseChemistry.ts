import { SubjectCourse } from '../types/curriculum';

export const KCSE_CHEMISTRY: SubjectCourse = {
  id: 'hs-chemistry',
  name: 'Chemistry',
  code: 'KCSE 233 / CBC STEM',
  level: 'highschool',
  category: 'Sciences',
  badge: 'KICD Core Science',
  description: 'Complete Kenyan high school chemistry syllabus covering all topics across Form 1 to Form 4: atomic structure, periodic table, bonding, salts, mole concept, gas laws, thermochemistry, equilibrium, electrochemistry, metallurgy, and organic chemistry.',
  simulationType: 'titration',
  topics: [
    // ================= FORM 1 =================
    {
      id: 'chem-f1-t1',
      title: 'Introduction to Chemistry & Laboratory Safety',
      formOrYear: 'Form 1',
      subtopics: [
        'Definition of chemistry and its branches (Physical, Organic, Inorganic, Analytical, Biochemistry)',
        'Laboratory apparatus, categories (measuring, heating, holding), and safety rules',
        'The Bunsen Burner: parts, non-luminous vs luminous flames, strike-back phenomenon'
      ],
      theoryOverview: 'Chemistry is the scientific study of the composition, structure, properties, and transformations of matter. Laboratory work requires mastery of apparatus (graduated cylinders, pipettes, burettes, conical flasks) and the Bunsen burner. The non-luminous flame (produced with open air hole) is hotter, non-sooty, and has a distinct pale blue inner cone where complete combustion occurs.',
      keyFormulas: ['Combustion of Gas: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O (Complete Combustion)'],
      kenyanApplication: 'LPG gas utilization in Kenyan homes and industrial furnaces in Athi River cement manufacturing.',
      examTips: 'In heating experiments, always use the non-luminous flame because it is hotter and does not leave soot on apparatus.'
    },
    {
      id: 'chem-f1-t2',
      title: 'Simple Classification of Substances',
      formOrYear: 'Form 1',
      subtopics: [
        'Physical and chemical changes: reversibility and mass conservation',
        'Elements, compounds, and mixtures: definitions and key differences',
        'Methods of separating mixtures: filtration, evaporation, simple and fractional distillation, crystallization, paper chromatography, sublimation, solvent extraction'
      ],
      theoryOverview: 'Matter exists as pure substances (elements and compounds) or mixtures. Separation techniques exploit differences in physical properties: fractional distillation separates miscible liquids with different boiling points using a fractionating column; paper chromatography separates dyes based on solubility in solvent and adsorption on paper (Rf values).',
      keyFormulas: ['Retardation Factor: Rf = Distance moved by solute / Distance moved by solvent front'],
      kenyanApplication: 'Crude oil refining at Kipevu (Mombasa) and harvesting of common salt from sea water at Malindi solar salt pans.',
      examTips: 'Glass beads in a fractionating column increase the surface area for condensation and evaporation, enhancing separation efficiency.'
    },
    {
      id: 'chem-f1-t3',
      title: 'Acids, Bases & Indicators',
      formOrYear: 'Form 1',
      subtopics: [
        'Properties of acids and bases: taste, electrical conductivity, effect on litmus',
        'Commercial and plant extract indicators (red cabbage, hibiscus petals)',
        'The pH scale: Universal Indicator, pH meter, acidic, neutral, and alkaline ranges',
        'Reactions of acids: with metals (producing H₂), with carbonates (producing CO₂ and water), with bases (neutralization)'
      ],
      theoryOverview: 'Acids are proton (H⁺) donors; bases are proton acceptors (or soluble alkalis producing OH⁻ ions). Universal indicator provides a continuous color spectrum from red (pH 1, strong acid) to green (pH 7, neutral) to purple (pH 14, strong alkali). Neutralization produces salt and water: H⁺(aq) + OH⁻(aq) → H₂O(l).',
      keyFormulas: ['Acid + Base → Salt + Water', 'Acid + Carbonate → Salt + Water + Carbon Dioxide'],
      kenyanApplication: 'Agricultural soil liming using slaked lime Ca(OH)₂ in Uasin Gishu to neutralize soil acidity and boost maize harvest.',
      examTips: 'Never say an indicator is "colorless" when litmus is in neutral solution (litmus is purple in neutral solutions).'
    },
    {
      id: 'chem-f1-t4',
      title: 'Air and Combustion',
      formOrYear: 'Form 1',
      subtopics: [
        'Composition of clean dry air: ~78% Nitrogen, ~21% Oxygen, ~0.9% Argon, ~0.04% CO₂',
        'Laboratory preparation of oxygen: catalytic decomposition of H₂O₂ with MnO₂ catalyst',
        'Combustion of elements in oxygen: metals form basic oxides; non-metals form acidic oxides',
        'Rusting: conditions (water and oxygen), composition of rust (Fe₂O₃·xH₂O), and prevention methods (galvanization, painting, sacrificial cathodic protection)'
      ],
      theoryOverview: 'Combustion is the rapid chemical reaction between a substance and oxygen releasing heat and light. Atmospheric oxygen percentage is determined experimentally by passing air over heated copper turnings: 2Cu(s) + O₂(g) → 2CuO(s), showing ~20-21% volume reduction. Rusting is electrochemical corrosion accelerated by salts and acids.',
      keyFormulas: [
        '2H₂O₂(aq) --(MnO₂)--> 2H₂O(l) + O₂(g)',
        'Rust: 4Fe(s) + 3O₂(g) + 2xH₂O(l) → 2Fe₂O₃·xH₂O(s)'
      ],
      kenyanApplication: 'Galvanization of corrugated iron sheets (Mabati) in Thika and industrial oxygen cylinders used in hospitals.',
      examTips: 'Oxygen is collected over water because it is only slightly soluble in water.'
    },
    {
      id: 'chem-f1-t5',
      title: 'Water and Hydrogen',
      formOrYear: 'Form 1',
      subtopics: [
        'Sources of water, water cycle, and tests for water: anhydrous copper(II) sulfate (white to blue) and cobalt(II) chloride paper (blue to pink)',
        'Laboratory preparation of hydrogen: reaction of zinc with dilute hydrochloric acid',
        'Physical and chemical properties of hydrogen: lightest gas, burns with "pop" sound',
        'Reduction of metal oxides (CuO, PbO, Fe₃O₄) using dry hydrogen stream'
      ],
      theoryOverview: 'Hydrogen is the simplest element. It acts as a reducing agent at elevated temperatures: CuO(s) + H₂(g) → Cu(s) + H₂O(l). Water is formed by burning hydrogen in oxygen: 2H₂(g) + O₂(g) → 2H₂O(l). Testing for purity of water requires verifying boiling point at 100°C and freezing point at 0°C at 1 atm.',
      keyFormulas: ['Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)', 'CuO(s) + H₂(g) → Cu(s) + H₂O(l)'],
      kenyanApplication: 'Electrolytic green hydrogen generation projects planned at Olkaria geothermal fields.',
      examTips: 'Dry hydrogen by passing through concentrated sulphuric acid or anhydrous calcium chloride before passing over heated metal oxides.'
    },

    // ================= FORM 2 =================
    {
      id: 'chem-f2-t1',
      title: 'Structure of the Atom & The Periodic Table',
      formOrYear: 'Form 2',
      subtopics: [
        'Sub-atomic particles: Protons, Neutrons, Electrons (charges, masses, locations)',
        'Atomic number (Z), Mass number (A), and Isotopes',
        'Electronic configuration of first 20 elements (energy levels: 2.8.8.2)',
        'The Periodic Table: Periods (number of occupied energy levels) and Groups (number of valence electrons)',
        'Ion formation: Cations (loss of electrons) and Anions (gain of electrons)'
      ],
      theoryOverview: 'Atoms consist of a dense positive nucleus surrounded by orbiting electrons. Isotopes are atoms of the same element with identical atomic numbers but different mass numbers due to differing neutrons. In the modern periodic table, elements are arranged in increasing atomic number; group number corresponds to valence electrons, determining chemical valence.',
      keyFormulas: [
        'Relative Atomic Mass: RAM = Σ (Isotopic mass × % abundance) / 100%',
        'Mass Number A = Protons (Z) + Neutrons (N)'
      ],
      kenyanApplication: 'Geological dating of volcanic ash layers in the Great Rift Valley using potassium-argon radioisotopes.',
      examTips: 'Electronic configurations must be written with dots between numbers, e.g. Sodium: 2.8.1; Chlorine: 2.8.7.'
    },
    {
      id: 'chem-f2-t2',
      title: 'Chemical Families: Patterns in Properties',
      formOrYear: 'Form 2',
      subtopics: [
        'Group I (Alkali Metals: Li, Na, K): reactivity with water, trends in atomic radius, ionization energy',
        'Group II (Alkaline Earth Metals: Mg, Ca, Ba): hardness, flame tests, basic oxides and hydroxides',
        'Group VII (Halogens: F, Cl, Br, I): displacement reactions, trend in physical states, oxidizing power',
        'Group VIII/0 (Noble Gases): electronic stability and chemical inertness'
      ],
      theoryOverview: 'Elements in the same group possess identical valence electron counts and exhibit periodic trends. In Group I, reactivity increases down the group because atomic radius increases and valence electrons are further from the nucleus, requiring lower first ionization energy. Conversely, in Group VII, reactivity decreases down the group as electronegativity declines.',
      keyFormulas: ['2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)', 'Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(l)'],
      kenyanApplication: 'Soda ash (Na₂CO₃) and table salt (NaCl) mineral mining in Lake Magadi.',
      examTips: 'Potassium reacts more vigorously with water than sodium, producing a lilac flame due to potassium vapor combustion.'
    },
    {
      id: 'chem-f2-t3',
      title: 'Structure and Bonding',
      formOrYear: 'Form 2',
      subtopics: [
        'Ionic bonding: electron transfer between metals and non-metals; giant ionic lattice (NaCl)',
        'Covalent bonding: sharing of electron pairs (H₂, O₂, N₂, CH₄); coordinate/dative bonds (NH₄⁺, H₃O⁺)',
        'Metallic bonding: positive metal cations in a sea of delocalized valence electrons',
        'Giant molecular structures (Diamond, Graphite, Silicon dioxide) vs Simple molecular structures (I₂, H₂O, CO₂)',
        'Intermolecular forces: weak van der Waals forces and strong hydrogen bonds'
      ],
      theoryOverview: 'Chemical bonding lowers system energy to achieve noble gas configurations. Giant ionic lattices possess high melting points and conduct electricity only in molten or aqueous states. Graphite has layered hexagonal rings with delocalized electrons that conduct electricity, and weak van der Waals forces between layers that act as a dry lubricant. Diamond has a rigid 3D tetrahedral network of sp³ hybridized carbon atoms, making it extremely hard.',
      keyFormulas: ['Lattice Energy ∝ (q₁ · q₂) / r (Electrostatic attraction)'],
      kenyanApplication: 'Graphite mining deposits in Kitui County used in electric vehicle battery anodes.',
      examTips: 'Graphite conducts electricity because each carbon atom is bonded to three others, leaving one delocalized electron per carbon atom free to migrate.'
    },
    {
      id: 'chem-f2-t4',
      title: 'Salts & Qualitative Analysis',
      formOrYear: 'Form 2',
      subtopics: [
        'Solubility rules of salts in water (All nitrates soluble, SPA salts soluble, sulfates, chlorides)',
        'Methods of preparing soluble salts (Acid + Metal, Acid + Insoluble base, Acid + Carbonate, Neutralization)',
        'Preparation of insoluble salts by double decomposition / ionic precipitation',
        'Action of heat on nitrates, carbonates, sulfates, and hydroxides',
        'Qualitative testing for cations (Zn²⁺, Al³⁺, Pb²⁺, Cu²⁺, Fe²⁺, Fe³⁺) using aqueous NaOH and NH₃'
      ],
      theoryOverview: 'A salt is a compound formed when the replaceable hydrogen ions of an acid are wholly or partially replaced by a metal or ammonium ion. Double decomposition is used to prepare insoluble salts: BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s) + 2NaCl(aq). Amphoteric hydroxides (Zn²⁺, Al³⁺, Pb²⁺) dissolve in excess 2M NaOH to form complex soluble aluminates, zincates, and plumbates.',
      keyFormulas: [
        'Thermal Decomposition: 2Pb(NO₃)₂(s) → 2PbO(s) + 4NO₂(g) + O₂(g)',
        'Amphoteric Zinc: Zn(OH)₂(s) + 2OH⁻(aq) → [Zn(OH)₄]²⁻(aq) (colourless)'
      ],
      kenyanApplication: 'Manufacture of alum (aluminium sulfate) by Nairobi City Water and Sewerage Company for municipal water flocculation.',
      examTips: 'Lead(II) ions (Pb²⁺) can be distinguished from Aluminium (Al³⁺) because Pb²⁺ forms a yellow precipitate with potassium iodide (KI), whereas Al³⁺ forms no precipitate.'
    },
    {
      id: 'chem-f2-t5',
      title: 'Carbon and Some of Its Compounds',
      formOrYear: 'Form 2',
      subtopics: [
        'Allotropes of carbon: Diamond and Graphite, amorphous forms (charcoal, soot)',
        'Chemical properties of carbon: reducing agent in metallurgy (extracting lead, copper, iron)',
        'Carbon(IV) oxide: laboratory preparation (marble chips + dilute HCl), properties, testing with limewater',
        'Carbon(II) oxide: preparation, toxicity, and reducing properties in the blast furnace',
        'The Carbon cycle and greenhouse effect'
      ],
      theoryOverview: 'Carbon forms allotropes with dramatically different physical properties. Carbon(IV) oxide turns calcium hydroxide (limewater) milky due to formation of insoluble calcium carbonate precipitate: Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l). On bubbling excess CO₂, the precipitate dissolves to form soluble calcium hydrogen carbonate: CaCO₃(s) + H₂O(l) + CO₂(g) → Ca(HCO₃)₂(aq).',
      keyFormulas: [
        'CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)',
        'CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s) + H₂O(l)'
      ],
      kenyanApplication: 'Carbon dioxide gas extraction from natural underground boreholes in Esageri (Baringo County) by Carbacid Kenya.',
      examTips: 'Never prepare CO₂ using dilute sulphuric acid with marble chips because an insoluble coating of calcium sulphate (CaSO₄) forms, coating the chips and terminating the reaction prematurely.'
    },

    // ================= FORM 3 =================
    {
      id: 'chem-f3-t1',
      title: 'Gas Laws',
      formOrYear: 'Form 3',
      subtopics: [
        'Boyle\'s Law: Pressure-Volume relationship at constant temperature: P₁V₁ = P₂V₂',
        'Charles\' Law: Volume-Temperature relationship at constant pressure: V₁/T₁ = V₂/T₂',
        'Combined Gas Law: (P₁V₁)/T₁ = (P₂V₂)/T₂ at Standard Temperature and Pressure (s.t.p. = 273K, 101.3 kPa)',
        'Graham\'s Law of Diffusion: Rate of diffusion is inversely proportional to square root of density or molar mass'
      ],
      theoryOverview: 'The kinetic theory of matter assumes ideal gas molecules have negligible volume and experience no intermolecular forces. Graham\'s Law explains why lighter gases diffuse faster: R₁/R₂ = √(M₂/M₁) = √(d₂/d₁). When concentrated NH₃ (M=17) and concentrated HCl (M=36.5) diffuse from opposite ends of a glass tube, white ammonium chloride fumes (NH₄Cl) form closer to the HCl end.',
      keyFormulas: [
        'Combined Gas Law: (P₁V₁) / T₁ = (P₂V₂) / T₂',
        'Graham\'s Law: Rate₁ / Rate₂ = √(Molar Mass₂ / Molar Mass₁)'
      ],
      kenyanApplication: 'Industrial compressed oxygen cylinders and carbonation pressure controls at Coca-Cola bottling plants in Nairobi.',
      examTips: 'Always convert temperatures into Kelvin (K = °C + 273) in all gas law calculations. Using Celsius gives zero marks.'
    },
    {
      id: 'chem-f3-t2',
      title: 'The Mole: Formulae and Stoichiometric Equations',
      formOrYear: 'Form 3',
      subtopics: [
        'The Mole concept and Avogadro\'s constant (L = 6.022 × 10²³)',
        'Molar mass, Relative Atomic Mass (RAM), and Relative Molecular Mass (RMM)',
        'Empirical formula (simplest whole number ratio) vs Molecular formula',
        'Molar gas volume: 22.4 dm³ at s.t.p. and 24.0 dm³ at room temperature and pressure (r.t.p.)',
        'Concentration of solutions: Molarity (moles/dm³) and Mass concentration (g/dm³)',
        'Volumetric titration stoichiometry: (Ma × Va) / na = (Mb × Vb) / nb'
      ],
      theoryOverview: 'A mole represents the amount of substance containing Avogadro\'s number of particles. Stoichiometric equations quantify mole ratios during chemical reactions, allowing calculations of theoretical yields, percentage purity, and water of crystallization.',
      keyFormulas: [
        'Moles = Mass (g) / RMM (g/mol)',
        'Moles of Gas = Volume (dm³) / 24.0 dm³ (at r.t.p.)',
        'Molarity M = (Mass in 1000cm³) / RMM'
      ],
      kenyanApplication: 'Fertilizer blending formulas (DAP, CAN, Urea) at Kel Chemicals Thika ensuring balanced NPK crop delivery.',
      examTips: 'In volumetric analysis, average only concordant titres within ±0.10 cm³. Never average the trial/rough titre.'
    },
    {
      id: 'chem-f3-t3',
      title: 'Organic Chemistry I (Hydrocarbons)',
      formOrYear: 'Form 3',
      subtopics: [
        'Hydrocarbons: Saturated (Alkanes) vs Unsaturated (Alkenes, Alkynes)',
        'IUPAC systematic nomenclature rules (prefix: meth, eth, prop, but, pent; suffix: -ane, -ene, -yne)',
        'Alkanes: fractional distillation of crude oil, substitution reactions with halogens (free radical chlorination)',
        'Alkenes: preparation of ethene by dehydration of ethanol with conc. H₂SO₄; addition reactions (hydrogenation, halogenation, hydration)',
        'Testing for unsaturation: bromine water (decolorized from brown to colorless) and acidified KMnO₄',
        'Alkynes: preparation of ethyne from calcium carbide (CaC₂ + 2H₂O → Ca(OH)₂ + C₂H₂), oxy-acetylene welding'
      ],
      theoryOverview: 'Organic chemistry studies carbon compounds. Alkanes (CnH2n+2) undergo substitution reactions. Alkenes (CnH2n) contain a reactive carbon-carbon double bond (C=C) that undergoes electrophilic addition across the π bond, instantly decolorizing reddish-brown bromine water without needing sunlight.',
      keyFormulas: [
        'Alkanes: CnH2n+2; Alkenes: CnH2n; Alkynes: CnH2n-2',
        'Dehydration: C₂H₅OH --(conc H₂SO₄, 180°C)--> C₂H₄ + H₂O'
      ],
      kenyanApplication: 'Oxy-acetylene high-temperature metal welding in Jua Kali artisan workshops across Kamukunji and Gikomba.',
      examTips: 'Differentiate test for alkanes vs alkenes: Alkenes decolorize bromine water instantly in the dark; Alkanes require ultraviolet light for substitution.'
    },
    {
      id: 'chem-f3-t4',
      title: 'Nitrogen and Its Compounds',
      formOrYear: 'Form 3',
      subtopics: [
        'Isolation of nitrogen from air (fractional distillation of liquid air)',
        'Laboratory preparation of nitrogen gas',
        'Oxides of nitrogen: N₂O (laughing gas), NO, NO₂ (brown gas)',
        'Ammonia: preparation (slaked lime + NH₄Cl), fountain experiment demonstrating extreme solubility',
        'The Haber Process: N₂ + 3H₂ ⇌ 2NH₃ (450°C, 200 atm, finely divided iron catalyst)',
        'Manufacture of Nitric(V) acid by Ostwald Process: catalytic oxidation of ammonia over platinum-rhodium gauze',
        'Pollution by nitrogenous fertilizers and eutrophication'
      ],
      theoryOverview: 'Nitrogen gas is inert due to a strong covalent triple bond (N≡N, 941 kJ/mol). The Haber Process synthesizes ammonia under compromised conditions (450°C, 200 atm, Fe catalyst). Nitric(V) acid is a powerful oxidizing agent; it oxidizes copper to copper(II) nitrate while being reduced to nitrogen(IV) oxide (brown fumes): Cu(s) + 4HNO₃(conc) → Cu(NO₃)₂(aq) + 2NO₂(g) + 2H₂O(l).',
      keyFormulas: [
        'Haber Process: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH = -92 kJ/mol)',
        'Ostwald Oxidation: 4NH₃(g) + 5O₂(g) --(Pt, 900°C)--> 4NO(g) + 6H₂O(g)'
      ],
      kenyanApplication: 'Ammonium nitrate fertilizer production at MEA Limited Nakuru and nitro-explosives in mining.',
      examTips: 'Ammonia is the only common alkaline gas; it turns moist red litmus paper blue.'
    },
    {
      id: 'chem-f3-t5',
      title: 'Sulphur and Its Compounds',
      formOrYear: 'Form 3',
      subtopics: [
        'Extraction of sulphur by the Frasch Process: superheated water (170°C), compressed air, and concentric pipes',
        'Allotropes of sulphur: Rhombic (stable below 96°C) and Monoclinic (needle-like, above 96°C)',
        'Sulphur(IV) oxide (SO₂): preparation, bleaching action by reduction (temporary, reversed by air oxidation)',
        'The Contact Process for industrial manufacture of Sulphuric(VI) acid: 2SO₂ + O₂ ⇌ 2SO₃ (450°C, 2-3 atm, V₂O₅ catalyst)',
        'Dilution of concentrated H₂SO₄ (always add acid to water slowly with stirring, never water to acid)'
      ],
      theoryOverview: 'In the Contact Process, SO₂ is catalytically oxidized to SO₃ using Vanadium(V) oxide (V₂O₅). SO₃ is absorbed in concentrated H₂SO₄ to form oleum (H₂S₂O₇), which is carefully diluted with water to produce 98% pure H₂SO₄. Concentrated H₂SO₄ acts as an acid, oxidizing agent, and powerful dehydrating agent (turning sugar into a rising black column of porous carbon).',
      keyFormulas: [
        'Contact Process: 2SO₂(g) + O₂(g) --(V₂O₅, 450°C)--> 2SO₃(g)',
        'Oleum Formation: SO₃(g) + H₂SO₄(l) → H₂S₂O₇(l)',
        'Dehydration of Sugar: C₁₂H₂₂O₁₁(s) --(conc H₂SO₄)--> 12C(s) + 11H₂O(g)'
      ],
      kenyanApplication: 'Production of battery electrolyte acid by East African Cables and manufacture of sulfate fertilizers in Thika.',
      examTips: 'Never dissolve SO₃ directly in water because the reaction is violently exothermic, producing a dense mist of sulphuric acid droplets that cannot condense.'
    },
    {
      id: 'chem-f3-t6',
      title: 'Chlorine and Its Compounds',
      formOrYear: 'Form 3',
      subtopics: [
        'Laboratory preparation of chlorine gas: oxidizing concentrated HCl using MnO₂ (with heating) or KMnO₄ (without heating)',
        'Physical and chemical properties of chlorine: greenish-yellow gas, poisonous, dense, soluble in water',
        'Bleaching action of chlorine water via hypochlorous acid (HOCl) by oxidation (permanent bleaching)',
        'Hydrogen chloride gas: preparation, fountain experiment, acidic properties in water vs non-polar methylbenzene',
        'Test for chloride ions (Cl⁻): white precipitate with AgNO₃ insoluble in dilute HNO₃, soluble in excess aqueous ammonia'
      ],
      theoryOverview: 'Chlorine is a strong oxidizing agent. Dissolving chlorine in water forms hydrochloric acid and chloric(I) acid (hypochlorous acid): Cl₂ + H₂O ⇌ HCl + HOCl. Chloric(I) acid oxidizes colored dye molecules to colorless products permanently: Dye + HOCl → (Dye + O) + HCl. Dry HCl dissolved in water dissociates into H⁺ and Cl⁻ ions (conducting electricity); dissolved in methylbenzene, it remains molecular (does not turn blue litmus red or conduct electricity).',
      keyFormulas: [
        'MnO₂(s) + 4HCl(conc) → MnCl₂(aq) + 2H₂O(l) + Cl₂(g)',
        'Ag⁺(aq) + Cl⁻(aq) → AgCl(s) (white precipitate)'
      ],
      kenyanApplication: 'Municipal drinking water chlorination by Nairobi Water and manufacture of sodium hypochlorite bleach (Jik).',
      examTips: 'Dry chlorine gas does not bleach dry litmus paper; moisture is strictly required to form chloric(I) acid.'
    },

    // ================= FORM 4 =================
    {
      id: 'chem-f4-t1',
      title: 'Energy Changes in Chemical & Physical Processes',
      formOrYear: 'Form 4',
      subtopics: [
        'Exothermic reactions (heat released, negative ΔH) vs Endothermic reactions (heat absorbed, positive ΔH)',
        'Energy level diagrams and activation energy (Ea)',
        'Standard enthalpy changes: Enthalpy of Formation (ΔHf°), Enthalpy of Combustion (ΔHc°), Enthalpy of Neutralization (ΔHneut°), Enthalpy of Displacement, Enthalpy of Solution and Hydration',
        'Hess\'s Law of Constant Heat Summation and energy cycle diagrams',
        'Lattice energy and hydration energy in ionic salt dissolution'
      ],
      theoryOverview: 'Thermochemistry quantifies thermal changes accompanying reactions. Heat change Q = m · c · ΔT. Standard enthalpy of neutralization between strong acids and strong alkalis is constant at approximately -57.2 kJ/mol because it simply represents: H⁺(aq) + OH⁻(aq) → H₂O(l). Hess\'s Law states that total enthalpy change is independent of the pathway taken from reactants to products: ΔH₁ = ΔH₂ + ΔH₃.',
      keyFormulas: [
        'Heat Released: Q = m · c · ΔT (where c = 4.2 J/g·K)',
        'Enthalpy Change: ΔH = -Q / moles of limiting reactant (kJ/mol)',
        'Hess\'s Law: ΔH_reaction = Σ ΔHf°(Products) - Σ ΔHf°(Reactants)'
      ],
      kenyanApplication: 'Calorific energy value determination of charcoal briquettes and bagasse biofuels in Western Kenya sugar mills.',
      examTips: 'Enthalpy of neutralization for weak acids (e.g. ethanoic acid) with strong bases is less than -57.2 kJ/mol because some heat energy is absorbed to dissociate the weak acid completely.'
    },
    {
      id: 'chem-f4-t2',
      title: 'Reaction Rates and Reversible Reactions (Equilibrium)',
      formOrYear: 'Form 4',
      subtopics: [
        'Collision theory and factors affecting reaction rates: Concentration, Temperature, Surface area, Catalysts, Light intensity',
        'Dynamic chemical equilibrium: forward rate equals reverse rate; concentrations remain constant',
        'Le Chatelier\'s Principle: effect of temperature, pressure, concentration, and catalysts on equilibrium position',
        'Industrial optimization of equilibrium: Haber Process and Contact Process'
      ],
      theoryOverview: 'For effective collisions, reactant particles must possess energy exceeding activation energy (Ea) with correct orientation. Le Chatelier\'s Principle states that when an external constraint is applied to a dynamic equilibrium, the system shifts in a direction that opposes the disturbance. Increasing pressure favors the side with fewer moles of gas; increasing temperature favors the endothermic direction.',
      keyFormulas: [
        'Rate of Reaction = Change in concentration / Time',
        'N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + 92 kJ (High pressure shifts equilibrium forward; moderate temperature 450°C optimizes rate vs yield)'
      ],
      kenyanApplication: 'Industrial process control in ethanol distilleries at Agro-Chemical and Food Company in Muhoroni.',
      examTips: 'A catalyst does NOT change the position of equilibrium or yield of products; it only speeds up the attainment of equilibrium by lowering activation energy.'
    },
    {
      id: 'chem-f4-t3',
      title: 'Electrochemistry',
      formOrYear: 'Form 4',
      subtopics: [
        'Electrochemical series and standard electrode potentials (E° measured against Standard Hydrogen Electrode SHE = 0.00 V)',
        'Electrochemical galvanic cells (Daniell Cell): functions of the salt bridge, E°cell = E°cathode - E°anode',
        'Electrolysis: molten electrolytes (Downs Cell for sodium) vs aqueous electrolytes',
        'Preferential discharge of ions: position in electrochemical series, concentration, nature of electrodes',
        'Quantitative electrolysis: Faraday\'s First and Second Laws (Q = I·t, m = ZIt, 1 Faraday = 96,500 C = 1 mole e⁻)',
        'Industrial applications: electroplating, purification of copper, anodizing of aluminium'
      ],
      theoryOverview: 'In galvanic cells, spontaneous chemical reactions generate electricity (anode = oxidation, cathode = reduction). Salt bridge maintains electrical neutrality by ion migration. In electrolysis, electrical energy drives non-spontaneous redox reactions. At the cathode, cations gain electrons; at the anode, anions lose electrons.',
      keyFormulas: [
        'E°cell = E°(reduction) - E°(oxidation)',
        'Q = I × t (Coulombs = Amperes × Seconds)',
        'Moles of electrons = Q / 96,500'
      ],
      kenyanApplication: 'Electrolytic refining of copper wire by East African Cables and sacrificial zinc cathodic protection on oil tankers in Kilindini Harbour.',
      examTips: 'Direction of electron flow in external circuit is always from anode (-ve terminal) to cathode (+ve terminal).'
    },
    {
      id: 'chem-f4-t4',
      title: 'Metals Extraction',
      formOrYear: 'Form 4',
      subtopics: [
        'Extraction of Sodium: Downs Cell (electrolysis of molten NaCl with CaCl₂ added to lower melting point from 801°C to 600°C)',
        'Extraction of Aluminium: Hall-Héroult Process (bauxite purification to alumina, electrolysis in molten cryolite Na₃AlF₆ at 950°C)',
        'Extraction of Iron: Blast Furnace (haematite Fe₂O₃, coke, limestone; zones of reduction and slag formation)',
        'Extraction of Zinc: Froth flotation, roasting of zinc blende (ZnS) to ZnO, reduction with coke or electrolytic recovery',
        'Extraction of Copper: Copper pyrites (CuFeS₂), smelting, blister copper, electrolytic refining'
      ],
      theoryOverview: 'Metals are extracted from ores based on reactivity: high reactivity metals (Na, Al) require electrolytic reduction; moderate reactivity metals (Zn, Fe, Pb) are reduced by carbon or carbon(II) oxide in furnaces; low reactivity metals occur native. In the blast furnace, coke burns to form CO₂, which reacts with coke to form reducing agent CO: Fe₂O₃(s) + 3CO(g) → 2Fe(l) + 3CO₂(g). Limestone (CaCO₃) removes silica impurities as molten slag (CaSiO₃).',
      keyFormulas: [
        'Iron Reduction: Fe₂O₃(s) + 3CO(g) → 2Fe(l) + 3CO₂(g)',
        'Slag Formation: CaO(s) + SiO₂(s) → CaSiO₃(l)',
        'Aluminium Cathode: Al³⁺ + 3e⁻ → Al(l)'
      ],
      kenyanApplication: 'Scrap metal recycling in rolling mills in Athi River and titanium mineral sands processing in Kwale County (Base Titanium).',
      examTips: 'Cryolite is added to molten alumina for two critical reasons: it lowers the melting point from 2050°C to ~950°C, and drastically improves electrical conductivity.'
    },
    {
      id: 'chem-f4-t5',
      title: 'Organic Chemistry II (Alkanols, Alkanoic Acids & Polymers)',
      formOrYear: 'Form 4',
      subtopics: [
        'Alkanols (Alcohols): functional group -OH, primary/secondary/tertiary, fermentation of glucose, oxidation to aldehydes and carboxylic acids',
        'Alkanoic acids (Carboxylic acids): functional group -COOH, weak acid dissociation, esterification with alkanols',
        'Esters: preparation, sweet fruity smells, uses in perfumes and food flavorings',
        'Soaps and Detergents: Saponification (hydrolysis of fats with NaOH), structure of soap (hydrophilic head + hydrophobic tail)',
        'Hard water action on soap (scum formation with Ca²⁺/Mg²⁺) vs soapless detergents',
        'Polymers and Polymerization: Addition polymerization (polyethene, PVC) vs Condensation polymerization (Nylon-6,6, Terylene)'
      ],
      theoryOverview: 'Alkanols undergo esterification with carboxylic acids in the presence of concentrated H₂SO₄ catalyst: R-COOH + R\'-OH ⇌ R-COO-R\' + H₂O. Soaps clean by emulsifying grease: hydrophobic hydrocarbon tails penetrate grease droplets, while hydrophilic carboxylate heads (-COO⁻Na⁺) interact with water, suspending grease as micelles.',
      keyFormulas: [
        'Esterification: CH₃COOH + C₂H₅OH --(conc H₂SO₄)--> CH₃COOC₂H₅ + H₂O (Ethyl ethanoate)',
        'Saponification: Fat + 3NaOH → Glycerol + 3 Soap molecules (Sodium stearate)'
      ],
      kenyanApplication: 'Manufacture of laundry soaps and detergents by Unilever Kenya and Bidco Africa in Thika.',
      examTips: 'Soapy detergents form scum in hard water (producing insoluble calcium stearate); soapless synthetic detergents do not form scum because their calcium salts are water-soluble.'
    }
  ],
  practicals: [
    {
      id: 'chem-p1',
      title: 'KCSE Chemistry Paper 3: Volumetric Titration & Qualitative Salt Analysis',
      objectives: [
        'Perform accurate volumetric titration to determine molarity and percentage purity',
        'Systematically identify cations and anions in an unknown salt mixture'
      ],
      apparatus: ['50cm³ Burette', '25cm³ Pipette', 'Conical flasks', '2M NaOH', '2M Aqueous NH₃', '0.1M Ba(NO₃)₂', '0.1M AgNO₃'],
      safetyHazards: ['Corrosive reagents: avoid skin contact.'],
      procedure: ['Fill burette with acid, pipette base, titrate to sharp endpoint.', 'Add NaOH dropwise then in excess to unknown salt solution.'],
      observationTable: {
        headers: ['Test', 'Observation', 'Inference'],
        sampleRows: [
          ['Salt + 2M NaOH dropwise', 'White precipitate formed', 'Mg²⁺, Ca²⁺, Zn²⁺, Al³⁺, Pb²⁺ present'],
          ['Add excess 2M NaOH', 'Precipitate dissolves to form colourless solution', 'Zn²⁺, Al³⁺, or Pb²⁺ confirmed'],
          ['Salt + Aqueous NH₃ in excess', 'Precipitate dissolves', 'Zn²⁺ confirmed']
        ]
      },
      calculationFormula: '(Ma × Va) / na = (Mb × Vb) / nb',
      expectedOutcome: 'Titre precision within ±0.05cm³ and flawless qualitative deduction.',
      vivaQuestions: ['Why is barium nitrate preferred over barium chloride when testing for sulfate in an unknown salt that might contain silver?']
    }
  ],
  exams: [
    {
      id: 'chem-e1',
      title: 'KCSE Chemistry Paper 1 (Full Theory Mock)',
      paperCode: '233/1',
      durationMinutes: 120,
      totalMarks: 80,
      instructions: ['Answer all questions in the spaces provided.'],
      questions: [
        {
          id: 'chem-q1',
          questionNumber: 1,
          questionText: 'A sample of sodium hydrogen carbonate was heated strongly until there was no further change in mass. Write a balanced chemical equation and calculate mass of Na₂CO₃ produced from 16.8g NaHCO₃. [3 marks]',
          marks: 3,
          sampleAnswer: '2NaHCO₃(s) → Na₂CO₃(s) + H₂O(g) + CO₂(g). Moles = 16.8/84 = 0.2 mol. Mass = 0.1 × 106 = 10.6 g.',
          markingScheme: ['Equation (1 mark)', 'Moles calculation (1 mark)', 'Final mass 10.6 g (1 mark)']
        }
      ]
    }
  ]
};
