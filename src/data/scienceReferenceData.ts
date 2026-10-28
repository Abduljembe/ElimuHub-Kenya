export interface ChemicalElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  ram: number; // Relative Atomic Mass
  period: number;
  group: number;
  category: 'alkali-metal' | 'alkaline-earth' | 'transition-metal' | 'post-transition' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble-gas' | 'actinide';
  electronConfig: string;
  oxidationStates: string;
  valency: number;
  flameColor?: string;
  appearance: string;
  kenyanOccurrenceOrUse: string;
}

export interface StandardElectrodePotential {
  halfReaction: string;
  standardPotentialVolts: number;
  type: 'reducing-agent' | 'oxidizing-agent' | 'reference';
}

export interface PhysicalConstant {
  symbol: string;
  name: string;
  value: string;
  units: string;
  knecSignificance: string;
}

export const PERIODIC_ELEMENTS: ChemicalElement[] = [
  { atomicNumber: 1, symbol: 'H', name: 'Hydrogen', ram: 1.008, period: 1, group: 1, category: 'nonmetal', electronConfig: '1s¹', oxidationStates: '+1, -1', valency: 1, appearance: 'Colorless, odorless diatomic gas', kenyanOccurrenceOrUse: 'Fertilizer synthesis (Haber process) at Kel Chemicals Thika; green hydrogen projects.' },
  { atomicNumber: 2, symbol: 'He', name: 'Helium', ram: 4.003, period: 1, group: 18, category: 'noble-gas', electronConfig: '1s²', oxidationStates: '0', valency: 0, appearance: 'Colorless, inert gas', kenyanOccurrenceOrUse: 'Weather balloons launched by Kenya Meteorological Department, Dagoretti Corner.' },
  { atomicNumber: 3, symbol: 'Li', name: 'Lithium', ram: 6.94, period: 2, group: 1, category: 'alkali-metal', electronConfig: '[He] 2s¹', oxidationStates: '+1', valency: 1, flameColor: 'Crimson red', appearance: 'Soft silvery alkali metal', kenyanOccurrenceOrUse: 'Lithium-ion solar storage batteries used in off-grid rural solar systems.' },
  { atomicNumber: 4, symbol: 'Be', name: 'Beryllium', ram: 9.012, period: 2, group: 2, category: 'alkaline-earth', electronConfig: '[He] 2s²', oxidationStates: '+2', valency: 2, appearance: 'Steel-gray hard metal', kenyanOccurrenceOrUse: 'Aerospace structural alloys in telecommunication satellite transponders.' },
  { atomicNumber: 5, symbol: 'B', name: 'Boron', ram: 10.81, period: 2, group: 13, category: 'metalloid', electronConfig: '[He] 2s² 2p¹', oxidationStates: '+3', valency: 3, flameColor: 'Bright green', appearance: 'Dark brown metalloid powder', kenyanOccurrenceOrUse: 'Borax glass manufacture and micronutrient foliar spray in Kenyan coffee farming.' },
  { atomicNumber: 6, symbol: 'C', name: 'Carbon', ram: 12.011, period: 2, group: 14, category: 'nonmetal', electronConfig: '[He] 2s² 2p²', oxidationStates: '+4, +2, -4', valency: 4, appearance: 'Diamond (transparent hard), Graphite (black slippery conductor)', kenyanOccurrenceOrUse: 'Charcoal briquettes; graphite lubricants; carbon credits in Kenya forest conservation.' },
  { atomicNumber: 7, symbol: 'N', name: 'Nitrogen', ram: 14.007, period: 2, group: 15, category: 'nonmetal', electronConfig: '[He] 2s² 2p³', oxidationStates: '-3, +3, +5', valency: 3, appearance: 'Colorless, inert diatomic gas (78% of air)', kenyanOccurrenceOrUse: 'Liquid nitrogen (-196°C) for bull semen preservation at KAGRC Kabete; CAN fertilizers.' },
  { atomicNumber: 8, symbol: 'O', name: 'Oxygen', ram: 15.999, period: 2, group: 16, category: 'nonmetal', electronConfig: '[He] 2s² 2p⁴', oxidationStates: '-2', valency: 2, appearance: 'Colorless gas, supports combustion (relights glowing splint)', kenyanOccurrenceOrUse: 'Medical oxygen plants installed across 47 county referral hospitals (e.g., Hewatele).' },
  { atomicNumber: 9, symbol: 'F', name: 'Fluorine', ram: 18.998, period: 2, group: 17, category: 'halogen', electronConfig: '[He] 2s² 2p⁵', oxidationStates: '-1', valency: 1, appearance: 'Pale yellow toxic reactive gas', kenyanOccurrenceOrUse: 'Fluorspar (CaF₂) mineral mining in Kerio Valley, Elgeyo Marakwet County.' },
  { atomicNumber: 10, symbol: 'Ne', name: 'Neon', ram: 20.18, period: 2, group: 18, category: 'noble-gas', electronConfig: '[He] 2s² 2p⁶', oxidationStates: '0', valency: 0, appearance: 'Colorless gas, glows reddish-orange in discharge tubes', kenyanOccurrenceOrUse: 'Commercial advertising illumination signs in Nairobi CBD and Westlands.' },
  { atomicNumber: 11, symbol: 'Na', name: 'Sodium', ram: 22.99, period: 3, group: 1, category: 'alkali-metal', electronConfig: '[Ne] 3s¹', oxidationStates: '+1', valency: 1, flameColor: 'Persistent golden yellow', appearance: 'Soft silvery metal cut with knife, stored under kerosene/paraffin', kenyanOccurrenceOrUse: 'Trona / Soda Ash (Na₂CO₃) dredged from Lake Magadi by Tata Chemicals; table salt in Malindi.' },
  { atomicNumber: 12, symbol: 'Mg', name: 'Magnesium', ram: 24.305, period: 3, group: 2, category: 'alkaline-earth', electronConfig: '[Ne] 3s²', oxidationStates: '+2', valency: 2, flameColor: 'Brilliant blinding white', appearance: 'Silvery-white ductile metal ribbon', kenyanOccurrenceOrUse: 'Central atom in chlorophyll of green tea leaves; magnesium oxide antacid suspensions.' },
  { atomicNumber: 13, symbol: 'Al', name: 'Aluminium', ram: 26.982, period: 3, group: 13, category: 'post-transition', electronConfig: '[Ne] 3s² 3p¹', oxidationStates: '+3', valency: 3, appearance: 'Lightweight silvery metal, oxide amphoteric', kenyanOccurrenceOrUse: 'Overhead high-voltage Kenya Power transmission cables; mabati roofing sheets.' },
  { atomicNumber: 14, symbol: 'Si', name: 'Silicon', ram: 28.085, period: 3, group: 14, category: 'metalloid', electronConfig: '[Ne] 3s² 3p²', oxidationStates: '+4', valency: 4, appearance: 'Dark lustrous gray semiconductor', kenyanOccurrenceOrUse: 'Photovoltaic solar cell wafers manufactured for Kenyan solar mini-grids; quartz sand in glass.' },
  { atomicNumber: 15, symbol: 'P', name: 'Phosphorus', ram: 30.974, period: 3, group: 15, category: 'nonmetal', electronConfig: '[Ne] 3s² 3p³', oxidationStates: '+5, +3, -3', valency: 3, appearance: 'White phosphorus (stored under water) or red phosphorus powder', kenyanOccurrenceOrUse: 'DAP (Di-Ammonium Phosphate) planting fertilizer in maize farming in Eldoret.' },
  { atomicNumber: 16, symbol: 'S', name: 'Sulphur', ram: 32.06, period: 3, group: 16, category: 'nonmetal', electronConfig: '[Ne] 3s² 3p⁴', oxidationStates: '+6, +4, -2', valency: 2, flameColor: 'Blue flame with choking SO₂ fumes', appearance: 'Yellow crystalline solid, allotropes (rhombic, monoclinic)', kenyanOccurrenceOrUse: 'Contact Process production of sulphuric acid (H₂SO₄); vulcanization of rubber tires.' },
  { atomicNumber: 17, symbol: 'Cl', name: 'Chlorine', ram: 35.45, period: 3, group: 17, category: 'halogen', electronConfig: '[Ne] 3s² 3p⁵', oxidationStates: '-1, +1, +5, +7', valency: 1, appearance: 'Greenish-yellow dense suffocating gas, bleaches moist litmus paper', kenyanOccurrenceOrUse: 'Municipal drinking water disinfection by Nairobi Water and Sewerage Company.' },
  { atomicNumber: 18, symbol: 'Ar', name: 'Argon', ram: 39.948, period: 3, group: 18, category: 'noble-gas', electronConfig: '[Ne] 3s² 3p⁶', oxidationStates: '0', valency: 0, appearance: 'Colorless, inert gas (0.9% of air)', kenyanOccurrenceOrUse: 'Inert shielding gas for TIG welding in Industrial Area, Nairobi.' },
  { atomicNumber: 19, symbol: 'K', name: 'Potassium', ram: 39.098, period: 3, group: 1, category: 'alkali-metal', electronConfig: '[Ar] 4s¹', oxidationStates: '+1', valency: 1, flameColor: 'Delicate Lilac / Purple', appearance: 'Soft silvery metal, reacts violently with cold water with lilac flame', kenyanOccurrenceOrUse: 'Potassium chloride (KCl) and NPK top-dressing fertilizer for Kericho tea plantations.' },
  { atomicNumber: 20, symbol: 'Ca', name: 'Calcium', ram: 40.078, period: 4, group: 2, category: 'alkaline-earth', electronConfig: '[Ar] 4s²', oxidationStates: '+2', valency: 2, flameColor: 'Brick-red / Orange-red', appearance: 'Dull gray metal, reacts steadily with cold water producing cloudy Ca(OH)₂', kenyanOccurrenceOrUse: 'Limestone (CaCO₃) quarries in Athi River, Bamburi (Mombasa), and Tororo supplying cement.' },
  { atomicNumber: 24, symbol: 'Cr', name: 'Chromium', ram: 51.996, period: 4, group: 6, category: 'transition-metal', electronConfig: '[Ar] 3d⁵ 4s¹', oxidationStates: '+6, +3, +2', valency: 3, appearance: 'Steely-gray lustrous metal, dichromate (Cr₂O₇²⁻) is orange and turns green on reduction', kenyanOccurrenceOrUse: 'Leather tanning in Athi River EPZ; potassium dichromate lab oxidizing agent.' },
  { atomicNumber: 25, symbol: 'Mn', name: 'Manganese', ram: 54.938, period: 4, group: 7, category: 'transition-metal', electronConfig: '[Ar] 3d⁵ 4s²', oxidationStates: '+7, +4, +2', valency: 2, appearance: 'Silvery metal, MnO₂ catalyst in H₂O₂ decomposition, KMnO₄ deep purple', kenyanOccurrenceOrUse: 'Dry cell battery depolarizer (MnO₂); KMnO₄ volumetric redox titration in KNEC practicals.' },
  { atomicNumber: 26, symbol: 'Fe', name: 'Iron', ram: 55.845, period: 4, group: 8, category: 'transition-metal', electronConfig: '[Ar] 3d⁶ 4s²', oxidationStates: '+2 (green), +3 (brown)', valency: 2, appearance: 'Lustrous silvery magnetic metal, rusts to Fe₂O₃·xH₂O in moist air', kenyanOccurrenceOrUse: 'Standard Gauge Railway (SGR) tracks; rebar steel manufactured by Devki Steel.' },
  { atomicNumber: 29, symbol: 'Cu', name: 'Copper', ram: 63.546, period: 4, group: 11, category: 'transition-metal', electronConfig: '[Ar] 3d¹⁰ 4s¹', oxidationStates: '+2 (blue), +1', valency: 2, flameColor: 'Blue-green', appearance: 'Reddish-brown ductile metal, high electrical conductivity', kenyanOccurrenceOrUse: 'Domestic electrical cables; brass alloy plumbing fixtures.' },
  { atomicNumber: 30, symbol: 'Zn', name: 'Zinc', ram: 65.38, period: 4, group: 12, category: 'transition-metal', electronConfig: '[Ar] 3d¹⁰ 4s²', oxidationStates: '+2', valency: 2, appearance: 'Bluish-white metal, amphoteric oxide (ZnO yellow when hot, white when cold)', kenyanOccurrenceOrUse: 'Galvanizing corrugated iron sheets (mabati) to prevent rusting in Mabati Rolling Mills.' },
  { atomicNumber: 56, symbol: 'Ba', name: 'Barium', ram: 137.33, period: 6, group: 2, category: 'alkaline-earth', electronConfig: '[Xe] 6s²', oxidationStates: '+2', valency: 2, flameColor: 'Apple green', appearance: 'Silvery metal, BaSO₄ insoluble white precipitate', kenyanOccurrenceOrUse: 'Barium meal X-ray contrast radiography at Kenyatta National Hospital; Ba(NO₃)₂ test for SO₄²⁻.' },
  { atomicNumber: 82, symbol: 'Pb', name: 'Lead', ram: 207.2, period: 6, group: 14, category: 'post-transition', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', oxidationStates: '+2, +4', valency: 2, appearance: 'Dense bluish-gray soft metal, amphoteric', kenyanOccurrenceOrUse: 'Lead-acid accumulator batteries (Chloride Exide Kenya); radiation shielding in X-ray rooms.' }
];

export const STANDARD_ELECTRODE_POTENTIALS: StandardElectrodePotential[] = [
  { halfReaction: 'Li⁺(aq) + e⁻ ⇌ Li(s)', standardPotentialVolts: -3.04, type: 'reducing-agent' },
  { halfReaction: 'K⁺(aq) + e⁻ ⇌ K(s)', standardPotentialVolts: -2.92, type: 'reducing-agent' },
  { halfReaction: 'Ca²⁺(aq) + 2e⁻ ⇌ Ca(s)', standardPotentialVolts: -2.87, type: 'reducing-agent' },
  { halfReaction: 'Na⁺(aq) + e⁻ ⇌ Na(s)', standardPotentialVolts: -2.71, type: 'reducing-agent' },
  { halfReaction: 'Mg²⁺(aq) + 2e⁻ ⇌ Mg(s)', standardPotentialVolts: -2.37, type: 'reducing-agent' },
  { halfReaction: 'Al³⁺(aq) + 3e⁻ ⇌ Al(s)', standardPotentialVolts: -1.66, type: 'reducing-agent' },
  { halfReaction: 'Zn²⁺(aq) + 2e⁻ ⇌ Zn(s)', standardPotentialVolts: -0.76, type: 'reducing-agent' },
  { halfReaction: 'Fe²⁺(aq) + 2e⁻ ⇌ Fe(s)', standardPotentialVolts: -0.44, type: 'reducing-agent' },
  { halfReaction: 'Pb²⁺(aq) + 2e⁻ ⇌ Pb(s)', standardPotentialVolts: -0.13, type: 'reducing-agent' },
  { halfReaction: '2H⁺(aq) + 2e⁻ ⇌ H₂(g) (Standard Hydrogen Electrode)', standardPotentialVolts: 0.00, type: 'reference' },
  { halfReaction: 'Cu²⁺(aq) + 2e⁻ ⇌ Cu(s)', standardPotentialVolts: +0.34, type: 'oxidizing-agent' },
  { halfReaction: 'I₂(s) + 2e⁻ ⇌ 2I⁻(aq)', standardPotentialVolts: +0.54, type: 'oxidizing-agent' },
  { halfReaction: 'Fe³⁺(aq) + e⁻ ⇌ Fe²⁺(aq)', standardPotentialVolts: +0.77, type: 'oxidizing-agent' },
  { halfReaction: 'Ag⁺(aq) + e⁻ ⇌ Ag(s)', standardPotentialVolts: +0.80, type: 'oxidizing-agent' },
  { halfReaction: 'Br₂(l) + 2e⁻ ⇌ 2Br⁻(aq)', standardPotentialVolts: +1.07, type: 'oxidizing-agent' },
  { halfReaction: 'Cr₂O₇²⁻(aq) + 14H⁺ + 6e⁻ ⇌ 2Cr³⁺ + 7H₂O', standardPotentialVolts: +1.33, type: 'oxidizing-agent' },
  { halfReaction: 'Cl₂(g) + 2e⁻ ⇌ 2Cl⁻(aq)', standardPotentialVolts: +1.36, type: 'oxidizing-agent' },
  { halfReaction: 'MnO₄⁻(aq) + 8H⁺ + 5e⁻ ⇌ Mn²⁺ + 4H₂O', standardPotentialVolts: +1.51, type: 'oxidizing-agent' },
  { halfReaction: 'F₂(g) + 2e⁻ ⇌ 2F⁻(aq)', standardPotentialVolts: +2.87, type: 'oxidizing-agent' }
];

export const PHYSICAL_CONSTANTS: PhysicalConstant[] = [
  { symbol: 'g', name: 'Acceleration due to gravity (Kenya average)', value: '9.80 N/kg (often 10.0 N/kg in KCSE)', units: 'm/s² or N/kg', knecSignificance: 'Standard gravitational field strength used in mechanics and hydraulic pressure.' },
  { symbol: 'c', name: 'Speed of light in vacuum', value: '3.00 × 10⁸', units: 'm/s', knecSignificance: 'Universal speed limit for electromagnetic waves and photon optics (c = fλ).' },
  { symbol: 'h', name: 'Planck constant', value: '6.626 × 10⁻³⁴', units: 'J·s', knecSignificance: 'Photon energy in Photoelectric Effect and X-ray minimum wavelength (E = hf).' },
  { symbol: 'e', name: 'Elementary electric charge', value: '1.602 × 10⁻¹⁹', units: 'C', knecSignificance: 'Charge on a single electron or proton; stopping potential e·Vs = Ek(max).' },
  { symbol: 'N_A', name: 'Avogadro constant', value: '6.022 × 10²³', units: 'mol⁻¹', knecSignificance: 'Number of particles in 1 mole of substance in Chemistry volumetric calculations.' },
  { symbol: 'R', name: 'Universal molar gas constant', value: '8.314', units: 'J/(mol·K)', knecSignificance: 'Ideal Gas Equation (PV = nRT) in Form 3 Gas Laws.' },
  { symbol: 'm_e', name: 'Rest mass of electron', value: '9.109 × 10⁻³¹', units: 'kg', knecSignificance: 'Cathode rays and thermionic emission acceleration in CRO.' },
  { symbol: 'F', name: 'Faraday constant', value: '96,500', units: 'C/mol', knecSignificance: 'Quantity of electricity carried by 1 mole of electrons during electrolysis (Q = It = nF).' },
  { symbol: 'ρ_water', name: 'Density of pure water', value: '1,000 (or 1.00 g/cm³)', units: 'kg/m³', knecSignificance: 'Archimedes principle upthrust and specific heat capacity water calculations.' },
  { symbol: 'c_water', name: 'Specific heat capacity of water', value: '4,200', units: 'J/(kg·K)', knecSignificance: 'Thermal physics method of mixtures and calorimetry.' }
];
