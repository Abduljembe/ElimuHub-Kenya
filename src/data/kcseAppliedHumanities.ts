import { SubjectCourse } from '../types/curriculum';

export const KCSE_AGRICULTURE: SubjectCourse = {
  id: 'hs-agriculture',
  name: 'Agriculture',
  title: 'Agriculture (KNEC KCSE)',
  code: 'KCSE 443 / CBC Applied',
  courseCode: 'KCSE 443',
  category: 'Applied & Technical',
  level: 'highschool',
  academicLevel: 'highschool',
  badge: 'KICD Applied Science',
  description:
    'Comprehensive Kenya National Curriculum (KICD/KNEC) Agriculture covering all Form 1 to Form 4 topics: Crop Production, Soil Science, Livestock Husbandry, Farm Power & Machinery, Agricultural Economics, and Farm Structures, aligned with KNEC Paper 1 & 2 guidelines.',
  learningOutcomes: [
    'Apply soil fertility management, soil sampling techniques, and organic/inorganic fertilizer calculations.',
    'Execute best practices for Kenyan cash crops (tea, coffee, pyrethrum, sugarcane) and staple cereals (maize, sorghum).',
    'Diagnose livestock diseases, vaccination schedules, parasite control (ticks, tsetse), and breeding management.',
    'Operate and maintain farm power systems: internal combustion engines, tractor implements, and renewable farm energy.',
    'Construct farm structures: zero-grazing units, crushes, grain stores, and barbed wire fences.',
    'Prepare farm financial records: balance sheets, profit and loss statements, and enterprise budgets.'
  ],
  topics: [
    {
      id: 'agri-f1-t1',
      title: 'Introduction to Agriculture & Factors Influencing It',
      formOrYear: 'Form 1',
      subtopics: ['Branches of agriculture (Crop farming, Livestock, Agricultural engineering, Agricultural economics)', 'Farming systems (extensive, intensive, subsistence, commercial)', 'Climatic factors: rainfall amount, reliability, distribution; temperature, wind, light', 'Biotic factors: pests, parasites, predators, pollinators, nitrogen-fixing bacteria', 'Edaphic (soil) factors: soil texture, structure, pH, organic matter'],
      theoryOverview:
        'Agriculture is the science and art of crop cultivation and animal husbandry. In Kenya, agriculture contributes ~33% of GDP and employs over 70% of the rural workforce. Production is heavily governed by ecological agro-ecological zones (AEZ I to AEZ VI) determined by rainfall and elevation.',
      kenyanApplication: 'Tea production in high-altitude volcanic soils of Kericho and Murang’a; pastoral cattle keeping in ASAL counties like Kajiado and Garissa.',
      examTips: 'KNEC frequently asks students to distinguish between rainfall reliability and rainfall distribution, and how wind influences crop lodging and pest dispersal.'
    },
    {
      id: 'agri-f1-t2',
      title: 'Soil Fertility I (Organic Manures) & Farm Tools',
      formOrYear: 'Form 1',
      subtopics: ['Characteristics of a fertile soil', 'Loss of soil fertility: leaching, soil erosion, monocropping, change in pH', 'Organic manures: Farm Yard Manure (FYM), Compost manure, Green manure', 'Preparation and storage of FYM and compost heap/pit method', 'Identification, use, and maintenance of garden, workshop, livestock and masonry tools'],
      theoryOverview:
        'Soil fertility is the capacity of soil to provide essential plant nutrients in proper amounts and balance. Organic manure improves soil structure, water retention, and microbial biodiversity. In compost preparation, alternating layers of dry vegetation, green foliage, manure, wood ash, and garden soil accelerate microbial decomposition.',
      kenyanApplication: 'Organic vegetable composting by smallholders in Kiambu supplying fresh Nairobi grocery markets; zero-waste dairy manure biogas digesters.',
      examTips: 'State the role of each layer in a compost heap: Wood ash provides potassium and reduces acidity; Garden soil introduces decomposing microorganisms; Farmyard manure provides nitrogen starter food.'
    },
    {
      id: 'agri-f2-t1',
      title: 'Soil Fertility II (Inorganic Fertilizers) & Land Reclamation',
      formOrYear: 'Form 2',
      subtopics: ['Essential plant elements: Macronutrients (N, P, K, Ca, Mg, S) and Micronutrients (Fe, Zn, Cu, B, Mo, Mn)', 'Inorganic fertilizers: straight vs compound fertilizers', 'Fertilizer ratio and fertilizer grade calculations (e.g. NPK 17:17:17, DAP 18:46:0, CAN 26% N)', 'Methods of fertilizer application: broadcasting, placement, side-dressing, foliar spraying, fertigation', 'Soil sampling and testing procedures', 'Drainage and irrigation systems in Kenya'],
      theoryOverview:
        'Inorganic fertilizers supply concentrated plant nutrients. Nitrogen promotes vegetative leafy growth and chlorophyll synthesis (deficiency causes chlorosis). Phosphorus stimulates root development and early crop establishment (deficiency causes purple leaves). Potassium confers disease resistance and stalk strength. CAN (Calcium Ammonium Nitrate) is neutral and ideal for top-dressing acidic soils.',
      keyFormulas: [
        'Fertilizer element mass = (Grade percentage / 100) × Total fertilizer mass',
        'Amount of fertilizer required = (Recommended nutrient rate / Percentage grade) × 100'
      ],
      kenyanApplication: 'Subsidized fertilizer distribution (NPK, DAP) by the Kenya government through the National Cereals and Produce Board (NCPB); Mwea Tebere rice paddy flood irrigation.',
      examTips: 'In fertilizer calculations: DAP provides both Nitrogen (18%) and Phosphorus (46% P₂O₅). Always account for the secondary nutrient contribution when balancing fertilizer blends.'
    },
    {
      id: 'agri-f2-t2',
      title: 'Crop Production II: Planting & Field Practices',
      formOrYear: 'Form 2',
      subtopics: ['Selection and preparation of planting materials (seeds, cuttings, suckers, crowns, tubers)', 'Seed dormancy and breaking methods', 'Planting: spacing, seed rate, depth of planting', 'Nursery practices: preparation of nursery bed, pruning, watering, hardening off, transplanting', 'Field management: thinning, gapping, weeding, rogueing, earthing up, mulching, staking, pruning (tea, coffee, tomato)'],
      theoryOverview:
        'Correct planting depth ensures optimal moisture and avoids rodent destruction (rule of thumb: plant at a depth 2 to 3 times the seed diameter). Hardening off prepares seedlings in the nursery for the harsher field environment by gradually reducing watering and shade 1-2 weeks before transplanting.',
      kenyanApplication: 'Coffee pruning (single stem vs multiple stem system) in Nyeri and Kirinyaga cooperatives; certified hybrid maize planting in Trans-Nzoia.',
      examTips: 'Differentiate between thinning (removing excess seedlings to attain correct spacing) and rogueing (uprooting and destroying diseased or off-type crops to prevent disease spread).'
    },
    {
      id: 'agri-f3-t1',
      title: 'Livestock Production III: Selection and Breeding',
      formOrYear: 'Form 3',
      subtopics: ['Reproduction in cattle, sheep, goats, pigs, poultry', 'Estrous cycle, heat detection signs in cattle, gestation periods', 'Artificial Insemination (AI) vs natural mating: advantages and semen preservation in liquid nitrogen (-196°C)', 'Breeding systems: inbreeding, linebreeding, outcrossing, crossbreeding, upgrading', 'Selection methods: tandem, independent culling, selection index'],
      theoryOverview:
        'Livestock breeding aims to improve genetic potential for milk, meat, wool, or egg production. Signs of standing heat in cows include: standing to be mounted, clear mucus discharge from vulva, bellowing, drop in milk yield, and restlessness. Insemination should occur 12-18 hours after onset of heat (AM-PM rule).',
      kenyanApplication: 'Kenya Animal Genetic Resources Centre (KAGRC) in Kabete producing and distributing semen straws to dairy farmers in Central and Rift Valley.',
      examTips: 'Memorize the gestation periods: Cow = 280-285 days (~9 months); Ewe/Doe = 150 days (~5 months); Sow = 114 days (3 months, 3 weeks, 3 days); Hen = 21 days incubation.'
    },
    {
      id: 'agri-f3-t2',
      title: 'Livestock Health & Disease Control',
      formOrYear: 'Form 3',
      subtopics: ['Predisposing factors to diseases', 'Classification of diseases: bacterial, viral, protozoan, nutritional', 'Bacterial diseases: Anthrax, Blackquarter, Mastitis, Brucellosis', 'Viral diseases: Foot and Mouth Disease (FMD), Rinderpest, Newcastle, Gumboro', 'Protozoan tick-borne diseases: East Coast Fever (ECF), Anaplasmosis, Babesiosis (Redwater), Heartwater', 'Parasites: Ticks (one-host, two-host, three-host lifecycle) and tsetse fly control (dipping, spraying)'],
      theoryOverview:
        'Disease reduces animal productivity and can cause high mortality. Tick-borne diseases are a major barrier to dairy improvement in Kenya. East Coast Fever (Theileria parva) is transmitted by the brown ear tick (Rhipicephalus appendiculatus) and characterized by swollen parotid lymph nodes, high fever, and pulmonary edema. Control requires acaricide dipping in plunge dips or spray races.',
      kenyanApplication: 'Routine communal cattle dipping in Western Kenya; foot-and-mouth disease quarantine rings enforced by the Directorate of Veterinary Services.',
      examTips: 'For Anthrax (Bacillus anthracis): Do NOT open or perform a post-mortem on a carcass suspected of anthrax! The bacteria form resistant spores upon exposure to atmospheric oxygen.'
    },
    {
      id: 'agri-f4-t1',
      title: 'Livestock Production V: Poultry & Livestock Rearing',
      formOrYear: 'Form 4',
      subtopics: ['Parts of an egg and incubator management', 'Brooding management of chicks: temperature, litter, feeder/drinker layout', 'Rearing systems: free-range, deep litter, battery cage system', 'Feeding layers (layers mash) and broilers (broiler starter, broiler finisher)', 'Egg abnormalities and cannibalism control (debeaking)', 'Apiary management: modern Kenya Top Bar Hive (KTBH), Langstroth hive, honey harvesting'],
      theoryOverview:
        'Poultry production provides high feed conversion efficiency. Brooding requires artificial heat (~35°C in the first week, reduced by 3°C weekly until feathering). Deep litter must be kept dry with wood shavings to prevent coccidiosis. Debeaking prevents feather pecking, vent pecking, and egg eating.',
      kenyanApplication: 'Commercial broiler and layer enterprises in Thika and Nakuru supplying supermarkets; beekeeping in Kitui and Baringo for acacia honey exports.',
      examTips: 'Explain the behavior of chicks around a brooder stove: If crowding near heat source -> temperature is too low; If moving far away to periphery -> temperature is too high; If even distribution -> temperature is ideal.'
    },
    {
      id: 'agri-f4-t2',
      title: 'Farm Power, Machinery & Farm Structures',
      formOrYear: 'Form 4',
      subtopics: ['Sources of farm power: human, animal, wind, water, solar, electrical, internal combustion engine', 'Two-stroke vs four-stroke petrol and diesel engine cycles', 'Tractor transmission, cooling, lubrication, fuel, and electrical systems', 'Tractor implements: disc plow, moldboard plow, subsoiler, harrows, seed drills', 'Farm structures: fences, crushes, dip tanks, silos, zero-grazing units, grain cribs'],
      theoryOverview:
        'Four-stroke cycle involves: 1. Induction/Intake; 2. Compression; 3. Power (Combustion); 4. Exhaust. Diesel engines use compression ignition (high compression ratio ~16:1 to 20:1) without spark plugs, making them more fuel efficient and durable for heavy farm traction work.',
      kenyanApplication: 'Tractor mechanized plowing and harvesting in vast wheat farms of Narok; solar water pumping installations across Laikipia ranches.',
      examTips: 'Compare disc plow vs moldboard plow: Disc plow is used in virgin, stony, root-filled, or sticky soils because discs roll over obstacles; Moldboard plow leaves a cleaner, completely inverted furrow in obstacle-free soils.'
    },
    {
      id: 'agri-f4-t3',
      title: 'Agricultural Economics II: Accounts, Budgets & Marketing',
      formOrYear: 'Form 4',
      subtopics: ['Farm financial records: Purchase records, sales records, production records, inventory', 'Financial statements: Cash Analysis Book, Balance Sheet, Profit and Loss Account', 'Partial budget vs Complete budget', 'Agricultural marketing: functions, marketing boards in Kenya (KTDA, Coffee Board, Pyrethrum Board, New KCC)', 'Agricultural cooperatives: principles, formation, benefits and challenges'],
      theoryOverview:
        'A Balance Sheet shows the financial solvency of a farm business at a specific calendar date: Assets = Liabilities + Net Worth (Owner’s Equity). A Partial Budget evaluates financial implications of minor operational changes using four quadrants: Extra Costs, Revenue Lost, Extra Revenue, and Costs Saved: Net Change = (Extra Revenue + Costs Saved) - (Extra Costs + Revenue Lost).',
      keyFormulas: [
        'Net Worth = Total Assets - Total Liabilities',
        'Working Capital = Current Assets - Current Liabilities',
        'Net Change in Partial Budget = (Extra Revenue + Saved Costs) - (Extra Costs + Foregone Revenue)'
      ],
      kenyanApplication: 'Kenya Tea Development Agency (KTDA) smallholder bonus payout calculations; dairy cooperative societies in Murang’a and Nandi.',
      examTips: 'If the net change in a partial budget is POSITIVE, the proposed farm enterprise change is economically viable and should be adopted!'
    }
  ],
  practicals: [
    {
      id: 'agri-prac-1',
      title: 'Soil Physical Properties and Soil Texture by Sedimentation',
      objectives: [
        'Determine soil texture class using the measuring cylinder sedimentation method.',
        'Calculate percentage sand, silt, and clay.',
        'Determine soil pH using universal indicator solution and color chart.'
      ],
      apparatus: ['Measuring cylinder (250 ml)', 'Soil sample from school farm', 'Calgon solution (sodium hexametaphosphate dispersing agent)', 'Soil testing kit / Universal indicator', 'Stirring rod and timer'],
      safetyHazards: ['Wash hands thoroughly after handling soil to avoid biological pathogens.'],
      procedure: [
        'Place 50 g of dry sieved soil into a 250 ml measuring cylinder.',
        'Add 10 ml of Calgon dispersing agent and fill with distilled water to 200 ml.',
        'Cover and shake vigorously for 2 minutes to disperse soil aggregates.',
        'Place cylinder on a level table. Sand settles after 1 minute; silt settles after 2 hours; clay remains in suspension and settles after 24-48 hours.',
        'Measure the thickness of each settled layer and calculate percentages.'
      ],
      observationTable: {
        headers: ['Soil Fraction', 'Settling Time', 'Layer Thickness (cm)', 'Percentage (%)'],
        sampleRows: [
          ['Sand', '1 minute', '2.4 cm', '48.0%'],
          ['Silt', '2 hours', '1.6 cm', '32.0%'],
          ['Clay', '48 hours', '1.0 cm', '20.0%']
        ]
      },
      calculationFormula: 'Percentage = (Layer thickness / Total sediment height) × 100%. Total = 5.0 cm => Sand 48%, Silt 32%, Clay 20% (Loam soil on textural triangle).',
      expectedOutcome: 'Soil textural classification identified as Loam or Sandy Clay Loam; pH = 6.2 (slightly acidic, optimal for most Kenyan crops).',
      vivaQuestions: [
        'Why is sodium hexametaphosphate (Calgon) added? (To break down soil aggregates into individual sand, silt, and clay particles).',
        'What is the agricultural significance of high clay content? (High water-holding capacity and cation exchange capacity, but poor drainage and aeration).'
      ]
    }
  ],
  exams: [
    {
      id: 'kcse-agri-mock-p1',
      title: 'KCSE Agriculture Paper 1 (Crop Production & Soil Science)',
      paperCode: '443/1',
      durationMinutes: 120,
      totalMarks: 90,
      instructions: [
        'Write your name and index number in the spaces provided.',
        'This paper consists of three sections: A (30 marks), B (20 marks), and C (40 marks).',
        'Answer all questions in Section A and B, and any two questions from Section C.'
      ],
      questions: [
        {
          id: 'agri-q1',
          questionNumber: 1,
          questionText: 'State four advantages of using farmyard manure over inorganic fertilizers in crop production.',
          marks: 2,
          sampleAnswer:
            '1. Improves soil structure and soil crumb formation.\n2. Increases the soil water-holding capacity.\n3. Provides food and habitat for beneficial soil microbes.\n4. Releases nutrients slowly over a long period with residual effects.\n5. Moderates soil temperature and buffers soil pH.',
          markingScheme: [
            'Award ½ mark each for any 4 correct points (Max 2 marks)'
          ]
        },
        {
          id: 'agri-q2',
          questionNumber: 2,
          questionText: 'A farmer is advised to apply 200 kg of CAN (26% N) per hectare to a maize crop. Calculate the mass of actual nitrogen supplied per hectare.',
          marks: 2,
          sampleAnswer: 'Mass of Nitrogen = (26 / 100) × 200 kg = 52 kg of Nitrogen.',
          markingScheme: [
            'M1: Correct substitution: (26/100) × 200',
            'A1: 52 kg N (with units)'
          ]
        }
      ]
    }
  ]
};

export const KCSE_GEOGRAPHY: SubjectCourse = {
  id: 'hs-geography',
  name: 'Geography',
  title: 'Geography (KNEC KCSE)',
  code: 'KCSE 312 / CBC Humanities',
  courseCode: 'KCSE 312',
  category: 'Humanities',
  level: 'highschool',
  academicLevel: 'highschool',
  badge: 'KICD Humanities',
  description:
    'Comprehensive Kenya National Curriculum (KICD/KNEC) Geography covering all Form 1 to Form 4 topics: Physical Geography, Map Work & Topographical Surveying, Photograph Work, Climatology, Geomorphology, Economic Geography, Forestry, Mining, Agriculture, Industry, and Environmental Management.',
  learningOutcomes: [
    'Interpret 1:50,000 topographical survey maps: grid references, contour gradients, cross-sections, intervisibility, and drainage patterns.',
    'Analyze internal and external land-forming processes: faulting, folding, vulcanicity, weathering, mass wasting, river action, and glaciation.',
    'Evaluate climatic systems: atmospheric circulation, ITCZ, tropical cyclones, and Kenya’s climatic zones.',
    'Assess economic resource management: commercial forestry, deep-sea vs inland fisheries, mineral extraction, and renewable energy.',
    'Compare industrial and agricultural development models between Kenya and global benchmarks (Netherlands, Japan, Switzerland).'
  ],
  topics: [
    {
      id: 'geo-f1-t1',
      title: 'Introduction to Geography & The Earth and the Solar System',
      formOrYear: 'Form 1',
      subtopics: ['Branches: Physical, Human, and Practical Geography', 'The Solar System: planets, sun, asteroids, meteors, comets', 'The Earth: size, spherical shape proofs (ship over horizon, circumnavigation, lunar eclipse, satellite photos)', 'Earth rotation (day and night, deflection of winds, Coriolis effect)', 'Earth revolution (four seasons, varying lengths of day and night, solstices and equinoxes)', 'Structure of the Earth: Crust (Sial and Sima), Mantle (Asthenosphere), Core (Barysphere / Nife)'],
      theoryOverview:
        'Geography is the study of the earth as the home of humankind. The Earth rotates on its tilted axis (23.5°) from west to east once in 24 hours, producing Coriolis deflection of winds. Revolution around the sun in an elliptical orbit once in 365.25 days produces seasonal variation in daylight and solar insolation.',
      kenyanApplication: 'Kenya’s equatorial location (0°) resulting in near-equal 12-hour day and night throughout the year, with negligible seasonal temperature variation.',
      examTips: 'Explain Coriolis effect: Winds are deflected to the right in the Northern Hemisphere and to the left in the Southern Hemisphere. At the Equator, Coriolis force is zero.'
    },
    {
      id: 'geo-f1-t2',
      title: 'Weather and Climate & Field Work',
      formOrYear: 'Form 1',
      subtopics: ['Weather elements: temperature, precipitation, humidity, atmospheric pressure, wind, sunshine, cloud cover', 'The Stevenson Screen: construction, instruments (maximum/minimum thermometer, wet and dry bulb hygrometer)', 'Rainfall types: relief (orographic), convectional, frontal (cyclonic)', 'Factors influencing weather and climate: latitude, altitude, distance from sea, ocean currents, winds, aspect', 'Stages of conducting geographical field work: preparation, data collection, presentation'],
      theoryOverview:
        'Weather is the atmospheric condition of a place over a short period; climate is the average weather over 30-35 years. The Stevenson screen is painted white to reflect radiant solar heat, has louvered sides for free air circulation, and is raised 1.21 m above ground to avoid ground radiation.',
      kenyanApplication: 'Orographic rainfall on the windward slopes of Mount Kenya and Aberdares, leaving the Laikipia plateau in a dry rain shadow.',
      examTips: 'If the depression of the wet bulb thermometer is ZERO (wet bulb reading equals dry bulb reading), relative humidity is 100% (air is saturated).'
    },
    {
      id: 'geo-f2-t1',
      title: 'Internal Land-Forming Processes: Faulting, Folding & Vulcanicity',
      formOrYear: 'Form 2',
      subtopics: ['Plate tectonics theory: constructive, destructive, transform plate margins', 'Faulting: tension, compression, and shear forces; formation of the Great Rift Valley, block mountains (horsts), tilt blocks', 'Folding: anticlines, synclines, overfolds, recumbent folds; fold mountain belts', 'Vulcanicity: intrusive features (batholiths, dykes, sills, laccoliths) and extrusive features (composite volcanoes, shield volcanoes, caldera, crater lakes, geysers, fumaroles)', 'Earthquakes: causes, seismic waves (P, S, L waves), Richter scale, seismograph'],
      theoryOverview:
        'Tectonic forces originate within the Earth’s interior. The Great Rift Valley was formed by either tensional forces pulling the crust apart (dropping central blocks) or compressional forces pushing side blocks upwards over a central block. Intrusive igneous features form when magma solidifies underground; extrusive features form when lava erupts onto the surface.',
      kenyanApplication: 'The Gregory Rift Valley running through Kenya; Menengai Caldera, Mount Longonot, and geothermal fumaroles tapped at Olkaria.',
      examTips: 'Know the difference between a dyke and a sill: A dyke cuts DISCORDANTLY across rock strata (nearly vertical); a sill is CONCORDANT, lying parallel to bedding planes.'
    },
    {
      id: 'geo-f2-t2',
      title: 'Map Work & Topographical Map Interpretation',
      formOrYear: 'Form 2',
      subtopics: ['Scale conversion: statement, representative fraction (RF), linear scale', 'Grid reference: 4-figure and 6-figure coordinates (Eastings before Northings)', 'Bearing and direction: true bearing, magnetic bearing, magnetic declination', 'Distance measurement: straight lines and winding paths/rivers using string or straight paper edge', 'Area calculation of irregular features using square grid counting', 'Contour interpretation: slopes (even, concave, convex, stepped), relief landforms (valleys, spurs, ridges, cols, saddles)', 'Calculating gradient: Gradient = Vertical Interval (VI) / Horizontal Equivalent (HE)'],
      theoryOverview:
        'Topographical survey maps (usually 1:50,000 in Kenya) portray natural and human-made features. On a 1:50,000 map, 2 cm represents 1 km on the ground (1 grid square = 1 km²). Vertical Interval (VI) between contours is typically 20 m or 50 feet. Contours close together represent steep slopes; far apart represent gentle slopes.',
      keyFormulas: [
        'Gradient = Vertical Interval (m) / Horizontal Equivalent (m)',
        'Area of irregular shape = Full squares + (Half squares / 2) km²'
      ],
      kenyanApplication: 'Survey of Kenya standard topographical sheets (e.g. Y731 Series: Kisumu East, Nairobi, Kericho sheets).',
      examTips: 'Always quote Eastings first, then Northings ("walk into the house before climbing the stairs")! 6-figure grid reference requires estimating tenths of a grid square.'
    },
    {
      id: 'geo-f3-t1',
      title: 'External Land-Forming Processes: Rivers, Weathering & Mass Wasting',
      formOrYear: 'Form 3',
      subtopics: ['Weathering: physical (mechanical exfoliation, frost action), chemical (carbonation, hydration, oxidation), biological', 'Mass wasting: slow (soil creep, solifluction) vs rapid (landslides, mudflows, rock falls)', 'River systems: hydrological cycle, river drainage patterns (dendritic, trellis, radial, centripetal)', 'River erosion processes: hydraulic action, abrasion/corrasion, attrition, solution', 'River courses: Youthful stage (V-shaped valleys, gorges, waterfalls, rapids), Mature stage (meanders, ox-bow lakes, flood plains), Old stage (deltas, braided channels, levees)'],
      theoryOverview:
        'External processes denude and reshape the land surface through weathering, erosion, transportation, and deposition. Rivers erode by four mechanisms. In the youthful stage, vertical corrasion dominates. In the mature stage, lateral erosion widens the valley. In the senile stage, deposition dominates, forming fertile alluvial plains.',
      kenyanApplication: 'River Tana delta on the Indian Ocean; catastrophic Murang’a and West Pokot landslides during heavy El Niño rains.',
      examTips: 'Drainage patterns are heavily tested: Radial flows outwards in all directions from a central volcanic cone (e.g. Mount Kenya); Centripetal flows inwards into a central depression (e.g. Lake Nakuru).'
    },
    {
      id: 'geo-f3-t2',
      title: 'Economic Geography: Agriculture, Forestry & Mining',
      formOrYear: 'Form 3',
      subtopics: ['Commercial crop farming in Kenya: Tea, Coffee, Sugarcane (growing conditions, processing, marketing, challenges)', 'Comparison of wheat farming in Kenya and the Canadian Prairies', 'Livestock farming: Dairy farming in Kenya vs Denmark; Beef farming in Kenya vs Argentina', 'Forestry: indigenous vs exotic softwoods; management and conservation in Kenya vs Canada', 'Mining: soda ash at Lake Magadi, fluorspar in Kerio Valley, titanium at Kwale, oil exploration in Lokichar'],
      theoryOverview:
        'Primary economic activities exploit natural resources. Kenya’s dairy farming operates in high-potential highlands with smallholder cooperatives, whereas Denmark utilizes highly mechanized cooperative zero-grazing with year-round silage feeding. Soda ash (trona / Na₂CO₃·NaHCO₃·2H₂O) at Lake Magadi is dredged and calcined for export.',
      kenyanApplication: 'Lake Magadi soda ash extraction by Tata Chemicals; Base Titanium operations in Kwale County; Kenya Forest Service (KFS) logging moratoriums.',
      examTips: 'When comparing Kenya and foreign countries (e.g. Kenya vs Denmark dairy, or Kenya vs Canada forestry), always use COMPARATIVE transition words ("Whereas in Kenya..., in Canada...") to secure full marks!'
    },
    {
      id: 'geo-f4-t1',
      title: 'Industry, Energy & Environmental Management',
      formOrYear: 'Form 4',
      subtopics: ['Factors influencing industrial location: raw materials, energy, labor, transport, markets, government policy', 'Cottage industries (Jua Kali) in Kenya: significance and challenges', 'Industrialization comparison: Kenya vs Japan', 'Energy resources: non-renewable (petroleum, coal) vs renewable (hydroelectric, geothermal, wind, solar, biomass)', 'Environmental hazards: floods, drought, pollution (air, water, land, noise), pests and epidemics', 'Management and conservation strategies: NEMA regulations, reforestation, terracing, afforestation'],
      theoryOverview:
        'Industrialization drives economic transformation. Japan lacks domestic mineral and fossil fuel resources but became an industrial superpower due to advanced technological expertise, skilled labor, maritime shipping access, and capital. Kenya relies heavily on renewable energy: geothermal (~45%), hydro (~30%), wind (~15%), and solar.',
      kenyanApplication: 'Konza Technopolis smart city; Lake Turkana Wind Power project; National Environment Management Authority (NEMA) plastic bag ban.',
      examTips: 'Explain why Kenya is expanding geothermal energy: It is renewable, environmentally clean, available 24/7 without being affected by droughts, and Kenya has abundant Rift Valley steam reservoirs.'
    }
  ],
  practicals: [],
  exams: [
    {
      id: 'kcse-geo-mock-p1',
      title: 'KCSE Geography Paper 1 (Physical Geography & Map Work)',
      paperCode: '312/1',
      durationMinutes: 165,
      totalMarks: 100,
      instructions: [
        'Write your name and index number in the spaces provided.',
        'This paper consists of two sections: Section A (25 marks) and Section B (75 marks).',
        'Answer all questions in Section A. In Section B, answer question 6 (compulsory map work) and any other two questions.'
      ],
      questions: [
        {
          id: 'geo-q1',
          questionNumber: 1,
          questionText: '(a) What is the difference between weather and climate? (2 marks)\n(b) State three reasons why a Stevenson screen is painted white. (3 marks)',
          marks: 5,
          sampleAnswer:
            '(a) Weather is the condition of the atmosphere of a specific place over a short period of time (e.g. hours or days), whereas climate is the average weather condition of a large area recorded over a prolonged period of 30 to 35 years.\n(b) 1. To reflect incoming solar radiant heat away from the screen.\n2. To prevent the interior of the screen from absorbing heat, ensuring thermometers record true ambient air temperature.\n3. White paint protects the wooden casing from rapid weathering and decay.',
          markingScheme: [
            'Award 2 marks for clear distinction with time element (short period vs 30-35 years)',
            'Award 1 mark each for any 3 valid reasons why it is painted white (Max 3 marks)'
          ]
        }
      ]
    }
  ]
};

export const KCSE_BUSINESS_STUDIES: SubjectCourse = {
  id: 'hs-business',
  name: 'Business Studies',
  title: 'Business Studies (KNEC KCSE)',
  code: 'KCSE 565 / CBC Commerce',
  courseCode: 'KCSE 565',
  category: 'Economics & Commerce',
  level: 'highschool',
  academicLevel: 'highschool',
  badge: 'KICD Commercial',
  simulationType: 'economics',
  description:
    'Comprehensive Kenya National Curriculum (KICD/KNEC) Business Studies covering all Form 1 to Form 4 topics: Commerce, Accounting, Economics, Entrepreneurship, Government & Business, Financial Statements, Public Finance, Money & Banking, and International Trade.',
  learningOutcomes: [
    'Analyze business environments, consumer satisfaction, and entrepreneurial opportunity recognition.',
    'Distinguish business legal entities in Kenya: sole proprietorship, partnerships, limited companies, and cooperatives.',
    'Record accounting transactions in books of original entry, two-column/three-column cash books, and general ledgers.',
    'Prepare final financial statements: Trading, Profit & Loss Account, and Balance Sheet according to GAAP.',
    'Examine macroeconomic concepts: demand and supply equilibrium, inflation dynamics, national income, and public finance.',
    'Evaluate international trade: balance of trade, balance of payments, exchange rates, and regional integration (EAC, COMESA).'
  ],
  topics: [
    {
      id: 'bst-f1-t1',
      title: 'Introduction to Business, Business & Its Environment & Entrepreneurship',
      formOrYear: 'Form 1',
      subtopics: ['Meaning and purpose of business activities; Goods vs Services', 'Economic resources: natural, human, man-made; scarcity, choice, and opportunity cost', 'Internal environment (business structure, culture, resources) vs External environment (macro and micro)', 'Entrepreneurship: characteristics of an entrepreneur, generation of business ideas, business plans'],
      theoryOverview:
        'Business satisfies human needs and wants using scarce economic resources. Opportunity cost is the value of the next best alternative forgone when a choice is made. Internal environmental factors are under the control of the business, while external factors (political, economic, sociocultural, technological, legal) must be adapted to.',
      kenyanApplication: 'Micro, small, and medium enterprises (MSMEs) driving Kenya’s informal sector (Jua Kali); Youth Enterprise Development Fund grants.',
      examTips: 'Clearly distinguish between a need (essential for survival: food, water, shelter) and a want (luxury desire: smartphones, perfumes).'
    },
    {
      id: 'bst-f2-t1',
      title: 'Forms of Business Units & Government in Business',
      formOrYear: 'Form 2',
      subtopics: ['Sole proprietorship: characteristics, advantages and disadvantages', 'Partnerships: Partnership Act, deed of partnership, dissolution', 'Incorporated companies: Private vs Public Limited Companies (shares, prospectus, AGM, limited liability)', 'Cooperative societies: principles of cooperation, types of cooperatives in Kenya (SACCOs, marketing cooperatives)', 'State corporations (Parastatals): reasons for government involvement, privatization'],
      theoryOverview:
        'Business units have distinct legal personalities and liability structures. In limited liability companies, shareholders are only liable to the extent of their unpaid share capital; personal assets are protected. SACCOs (Savings and Credit Cooperative Organizations) pool members’ savings to provide low-interest credit.',
      kenyanApplication: 'Kenya Commercial Bank (KCB), Safaricom PLC (public companies on Nairobi Securities Exchange); Stima SACCO, Harambee SACCO.',
      examTips: 'State the difference between private and public companies: Private company (minimum 1, maximum 50 members; shares not traded publicly); Public company (minimum 7, no maximum; shares freely transferable on NSE).'
    },
    {
      id: 'bst-f3-t1',
      title: 'Demand and Supply & The Product Market',
      formOrYear: 'Form 3',
      subtopics: ['Law of Demand: price and quantity demanded; demand curve (negative slope)', 'Factors influencing demand (income, tastes, substitutes, complements, population, advertising)', 'Law of Supply: price and quantity supplied; supply curve (positive slope)', 'Factors influencing supply (cost of production, technology, weather, government policy)', 'Market equilibrium: equilibrium price (P_e) and equilibrium quantity (Q_e)', 'Excess demand (shortages) and excess supply (surpluses)', 'Government intervention: price ceilings (maximum prices) and price floors (minimum prices)'],
      theoryOverview:
        'The law of demand states that, ceteris paribus, as the price of a good increases, quantity demanded decreases. The law of supply states that as price increases, quantity supplied increases. Market equilibrium occurs at the intersection where quantity demanded equals quantity supplied: Q_d = Q_s.',
      keyFormulas: [
        'Demand function: Q_d = a - b · P',
        'Supply function: Q_s = c + d · P',
        'Equilibrium condition: Q_d = Q_s => a - b · P_e = c + d · P_e'
      ],
      kenyanApplication: 'EPRA maximum retail price caps on fuel (super petrol, diesel, kerosene); minimum wage price floors set by the Ministry of Labour.',
      examTips: 'Differentiate between a "change in quantity demanded" (movement along the same demand curve due to price change) and a "change in demand" (shift of the entire curve due to non-price factors)!'
    },
    {
      id: 'bst-f3-t2',
      title: 'Financial Statements I: Trading, Profit & Loss Account and Balance Sheet',
      formOrYear: 'Form 3',
      subtopics: ['Purpose of financial statements', 'Trading Account: Opening stock, Purchases, Carriage inwards, Return outwards, Cost of Goods Sold (COGS), Closing stock, Gross Profit', 'Profit and Loss Account: Operating expenses (rent, salaries, electricity, depreciation), Gross profit + other revenues = Net Profit', 'Balance Sheet: Fixed assets, Current assets, Capital, Long-term liabilities, Current liabilities', 'Working capital (Current Assets - Current Liabilities) and Capital employed'],
      theoryOverview:
        'Financial statements report business financial performance and position. Cost of Goods Available for Sale = Opening Stock + Net Purchases. Cost of Goods Sold (COGS) = Cost of Goods Available - Closing Stock. Gross Profit = Net Sales - COGS. Balance Sheet balances: Assets = Capital + Liabilities.',
      keyFormulas: [
        'COGS = Opening Stock + Net Purchases + Carriage Inwards - Closing Stock',
        'Gross Profit = Net Sales - COGS',
        'Net Profit = Gross Profit + Other Incomes - Total Operating Expenses',
        'Balance Sheet Equation: Assets = Capital + Liabilities'
      ],
      kenyanApplication: 'Audited financial reporting by firms listed on the Nairobi Securities Exchange (NSE) adhering to IFRS standards.',
      examTips: 'Carriage INWARDS is added to Purchases in the Trading Account (it directly increases cost of acquiring goods), whereas carriage OUTWARDS is an operating selling expense in the Profit & Loss Account!'
    },
    {
      id: 'bst-f4-t1',
      title: 'Public Finance, Taxation & National Income',
      formOrYear: 'Form 4',
      subtopics: ['Sources of government revenue: tax revenue vs non-tax revenue', 'Principles / Canons of taxation (Equity, Certainty, Convenience, Economy, Flexibility)', 'Direct taxes (PAYE, corporation tax) vs Indirect taxes (VAT, excise duty, customs duty)', 'Government expenditure: recurrent vs development expenditure', 'National budget: balanced, surplus, deficit budget; financing deficits', 'National Income: GDP, GNP, NNP; measurement methods (Output, Income, Expenditure methods)'],
      theoryOverview:
        'Public finance deals with government revenue generation and expenditure allocation. Kenya Revenue Authority (KRA) administers direct and indirect taxes. The national budget is read annually in June by the Cabinet Secretary for the National Treasury. GDP is the monetary value of all finished goods and services produced within a country’s borders in a year.',
      keyFormulas: [
        'Expenditure Method: GDP = C + I + G + (X - M)',
        'GNP = GDP + Net Factor Income from Abroad (NFIA)',
        'Fiscal Deficit = Total Government Expenditure - Total Government Revenue'
      ],
      kenyanApplication: 'Kenya national budget presented to Parliament; KRA domestic tax mobilization and revenue targets; standard 16% Value Added Tax (VAT).',
      examTips: 'Distinguish between progressive tax (tax rate increases as income increases, e.g. PAYE) and regressive tax (takes a higher percentage of income from low earners, e.g. flat VAT on basic goods).'
    },
    {
      id: 'bst-f4-t2',
      title: 'International Trade & Economic Integration',
      formOrYear: 'Form 4',
      subtopics: ['Reasons for international trade (resource endowment differences, comparative advantage)', 'Terms of trade: Net barter terms of trade = (Export price index / Import price index) × 100', 'Balance of Trade (visible exports - visible imports)', 'Balance of Payments (current account, capital account, financial account)', 'Trade restrictions: tariffs, quotas, subsidies, embargoes', 'Regional economic integration: East African Community (EAC), COMESA, AfCFTA benefits and challenges'],
      theoryOverview:
        'International trade allows nations to consume beyond their domestic production possibilities. A favorable balance of trade occurs when visible exports exceed visible imports. The East African Community (EAC) common market allows free movement of goods, labor, services, and capital among member states.',
      keyFormulas: [
        'Terms of Trade (TOT) = (Price Index of Exports / Price Index of Imports) × 100',
        'Balance of Trade = Visible Exports - Visible Imports',
        'Current Account Balance = (Visible + Invisible Exports) - (Visible + Invisible Imports)'
      ],
      kenyanApplication: 'Horticultural exports to the European Union through JKIA cargo terminals; cross-border trade with Uganda and Tanzania via the EAC single customs territory.',
      examTips: 'Explain the difference between Balance of Trade (only visible physical goods) and Balance of Payments (comprehensive record including visible goods, invisible services, and capital transfers)!'
    }
  ],
  practicals: [],
  exams: [
    {
      id: 'kcse-bst-mock-p1',
      title: 'KCSE Business Studies Paper 1',
      paperCode: '565/1',
      durationMinutes: 120,
      totalMarks: 100,
      instructions: [
        'Write your name and index number in the spaces provided.',
        'Answer all 25 questions in the spaces provided after each question.'
      ],
      questions: [
        {
          id: 'bst-q1',
          questionNumber: 1,
          questionText: 'State four internal environmental factors that may positively influence the success of a business enterprise.',
          marks: 4,
          sampleAnswer:
            '1. Adequate financial capital enabling business expansion and cash flow stability.\n2. Highly skilled, trained, and motivated workforce.\n3. Modern and efficient technology/machinery enhancing productivity.\n4. Clear, competent, and ethical business management leadership.\n5. Favorable internal business culture and strong team morale.',
          markingScheme: [
            'Award 1 mark each for any 4 correct internal factors (Max 4 marks)'
          ]
        }
      ]
    }
  ]
};
