import { SubjectCourse } from '../types/curriculum';

export const KCSE_BIOLOGY: SubjectCourse = {
  id: 'hs-biology',
  name: 'Biology',
  code: 'KCSE 231 / CBC STEM',
  level: 'highschool',
  category: 'Sciences',
  badge: 'KICD Core Science',
  description: 'Complete Kenyan high school biology syllabus covering all 17 topics across Form 1 to Form 4: cell physiology, anatomy, nutrition, transport, gaseous exchange, excretion, classification, ecology, reproduction, genetics, evolution, reception & response, and support & movement.',
  simulationType: 'osmosis',
  topics: [
    // ================= FORM 1 =================
    {
      id: 'bio-f1-t1',
      title: 'Introduction to Biology',
      formOrYear: 'Form 1',
      subtopics: [
        'Definition of biology and its main branches (Botany, Zoology, Microbiology, Genetics, Anatomy)',
        'Characteristics of living organisms (Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition - MRS GREN)',
        'Significance of biology in health, medicine, agriculture, and environmental conservation',
        'Scientific inquiry method: Observation, Hypothesis, Experimentation, Conclusion'
      ],
      theoryOverview: 'Biology (from Greek bios = life, logos = study) is the scientific study of life. Living organisms are characterized by seven vital physiological processes (Nutrition, Respiration, Gaseous Exchange, Excretion, Growth and Development, Reproduction, and Irritability/Sensitivity). Biology provides the foundation for careers in Medicine, Nursing, Agronomy, Pharmacy, Veterinary Medicine, and Biotechnology.',
      keyFormulas: [
        'Magnification = Drawing Size / Actual Size',
        'Field of View (mm) = Measured diameter under low power objective'
      ],
      kenyanApplication: 'Kenya Medical Research Institute (KEMRI) biomedical innovations and Kenya Wildlife Service (KWS) conservation of endangered species.',
      examTips: 'Always remember to state all seven characteristics of living things. When defining excretion, emphasize removal of metabolic waste products, distinct from egestion (removal of undigested matter).'
    },
    {
      id: 'bio-f1-t2',
      title: 'Classification I',
      formOrYear: 'Form 1',
      subtopics: [
        'Magnification using hand lenses and calculation of linear magnification',
        'External features of plants and animals used for grouping organisms',
        'Taxonomic hierarchy of classification: Kingdom, Phylum/Division, Class, Order, Family, Genus, Species',
        'Binomial nomenclature rules (Carl Linnaeus): Genus capitalized, species in lowercase, underlined when handwritten'
      ],
      theoryOverview: 'Classification is the grouping of living organisms based on evolutionary relationships and shared structural characteristics. Carl Linnaeus established binomial nomenclature where each organism has two scientific names: Genus and species (e.g. Zea mays for maize, Homo sapiens for humans, Panthera leo for lion).',
      keyFormulas: [
        'Linear Magnification M = Length of drawing / Actual length of specimen',
        'Hierarchy Mnemonic: Keep Plates Clean Or Family Gets Sick (Kingdom, Phylum, Class, Order, Family, Genus, Species)'
      ],
      kenyanApplication: 'Botanical classification of Kenyan medicinal plants at the National Museums of Kenya Herbarium.',
      examTips: 'KNEC strictly penalizes failing to underline handwritten scientific names separately (e.g. Zea mays must be written as Zea mays with two separate underlines).'
    },
    {
      id: 'bio-f1-t3',
      title: 'The Cell (Structure & Functions)',
      formOrYear: 'Form 1',
      subtopics: [
        'The light microscope: parts, functions, handling, and care',
        'Preparation of temporary wet mounts (onion epidermal peel)',
        'Structure of plant and animal cells under light vs electron microscope',
        'Functions of cell organelles: Nucleus, Mitochondria, Ribosomes, Endoplasmic Reticulum, Golgi apparatus, Chloroplasts, Vacuole, Cell Wall'
      ],
      theoryOverview: 'The cell is the basic structural and functional unit of all living organisms. Electron microscopy reveals ultra-structural components: double-membraned mitochondria for ATP generation, chloroplasts for photosynthesis, lysosomes for intracellular digestion, and the semi-permeable cell membrane maintaining homeostasis. Plant cells possess a cellulose cell wall, large central sap vacuole, and plastids, which are absent in animal cells.',
      keyFormulas: [
        'Total Magnification = Eyepiece Magnification × Objective Lens Magnification',
        '1 mm = 1,000 micrometres (µm)'
      ],
      kenyanApplication: 'Microscopic malaria blood smear diagnosis in Kenyan county referral hospital laboratories.',
      examTips: 'Never confuse the cell wall (freely permeable, structural cellulose) with the cell membrane (selectively permeable, phospholipid bilayer).'
    },
    {
      id: 'bio-f1-t4',
      title: 'Cell Physiology (Diffusion, Osmosis & Active Transport)',
      formOrYear: 'Form 1',
      subtopics: [
        'Structure and properties of the cell membrane (Fluid Mosaic Model)',
        'Diffusion: factors affecting diffusion rate (temperature, concentration gradient, surface area)',
        'Osmosis in plant tissue (turgor pressure, wall pressure, plasmolysis, wilting)',
        'Osmosis in animal tissue (haemolysis and crenation of erythrocytes)',
        'Active transport: role of carrier proteins, ATP energy, and respiratory inhibitors'
      ],
      theoryOverview: 'Cell physiology investigates the transport of substances across biological membranes. Diffusion is movement of solutes from high to low concentration. Osmosis is water movement from high water potential (hypotonic) to low water potential (hypertonic) across a selectively permeable membrane. Active transport moves ions against concentration gradients utilizing metabolic energy (ATP).',
      keyFormulas: [
        'Water Potential: Ψ = Ψs + Ψp (Solute potential + Pressure potential)',
        'At incipient plasmolysis: Ψp = 0, therefore Ψ = Ψs'
      ],
      kenyanApplication: 'Saline soil management in irrigation schemes at Perkerra (Baringo) and oral rehydration therapy (ORT) for pediatric cholera treatment.',
      examTips: 'In Paper 3 potato cylinder questions, remember that cells in hypotonic solutions gain mass and become turgid; cells in hypertonic solutions lose water, become flaccid, and lose mass.'
    },
    {
      id: 'bio-f1-t5',
      title: 'Nutrition in Plants and Animals',
      formOrYear: 'Form 1',
      subtopics: [
        'Autotrophic nutrition: Photosynthesis stages (Light stage photolysis, Dark stage carbon fixation)',
        'Internal and external leaf adaptations for photosynthesis',
        'Heterotrophic nutrition: Herbivores, Carnivores, Omnivores, Parasites, Saprophytes',
        'Human digestive system: teeth dental formulas, mechanical digestion, chemical enzymatic breakdown',
        'Enzymes: properties, mechanism of action, effect of pH, temperature, and inhibitors',
        'Assimilation of food, balanced diet, deficiency diseases (Kwashiorkor, Marasmus, Scurvy, Rickets)'
      ],
      theoryOverview: 'Autotrophs synthesize organic molecules from carbon dioxide and water using light energy: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Heterotrophic digestion breaks down macromolecules (proteins to amino acids by pepsin/trypsin; starch to glucose by salivary/pancreatic amylase and maltase; lipids to fatty acids and glycerol by bile emulsification and lipase). Absorption occurs in the ileum via villi and microvilli into blood capillaries and central lacteals.',
      keyFormulas: [
        'Adult Human Dental Formula: i 2/2, c 1/1, pm 2/2, m 3/3 = 32 teeth',
        'Rate of Photosynthesis = Volume of Oxygen evolved / Time (min)'
      ],
      kenyanApplication: 'Fortification of maize meal and cooking oil with Vitamin A and Iron enforced by the Kenya Bureau of Standards (KEBS).',
      examTips: 'Bile is not an enzyme; it contains bile salts that mechanically emulsify fats into tiny droplets to increase surface area for pancreatic lipase action.'
    },

    // ================= FORM 2 =================
    {
      id: 'bio-f2-t1',
      title: 'Transport in Plants and Animals',
      formOrYear: 'Form 2',
      subtopics: [
        'Internal structure of monocotyledonous and dicotyledonous roots and stems',
        'Xylem vessels and tracheids: water and mineral salt conduction via root pressure, capillarity, transpiration pull',
        'Phloem sieve tubes and companion cells: translocation of photosynthates (mass flow hypothesis)',
        'Transpiration: factors affecting rate (humidity, temperature, light, wind) and potometer experiments',
        'Mammalian circulatory system: structure of human heart, cardiac cycle, double circulation (systemic and pulmonary)',
        'Blood composition: plasma, erythrocytes, leucocytes (phagocytes and lymphocytes), platelets',
        'ABO blood group system and Rhesus factor compatibility'
      ],
      theoryOverview: 'Transport systems circulate respiratory gases, nutrients, and waste products. In plants, transpiration pull creates negative tension in xylem water columns held by cohesion and adhesion (Dixon and Joly theory). In mammals, the myogenic four-chambered heart pumps blood through pulmonary and systemic circuits. Deoxygenated blood enters the right atrium via vena cava, passes to the right ventricle, and is pumped to the lungs via the pulmonary artery.',
      keyFormulas: [
        'Rate of Transpiration = (Distance moved by bubble × Cross-section area of capillary) / Time',
        'Cardiac Output = Heart Rate (beats/min) × Stroke Volume (ml/beat)'
      ],
      kenyanApplication: 'Kenya National Blood Transfusion Service (KNBTS) blood donor screening and transfusion matching.',
      examTips: 'The left ventricle has much thicker muscular walls than the right ventricle because it must generate high hydrostatic pressure to pump blood throughout the systemic circulation to the entire body.'
    },
    {
      id: 'bio-f2-t2',
      title: 'Gaseous Exchange in Plants and Animals',
      formOrYear: 'Form 2',
      subtopics: [
        'Types and characteristics of respiratory surfaces across organisms',
        'Gaseous exchange in plants: stomata, lenticels, pneumatophores, and cuticle',
        'Mechanism of stomatal opening and closing (photosynthetic theory and potassium ion flux hypothesis)',
        'Gaseous exchange in insects (tracheal system and spiracles)',
        'Gaseous exchange in bony fish: gills, gill filaments, gill rakers, counter-current flow mechanism',
        'Gaseous exchange in amphibians: cutaneous (skin), buccopharyngeal cavity, and lungs',
        'Human respiratory system: trachea, bronchi, bronchioles, alveoli, diaphragm, and intercostal muscles'
      ],
      theoryOverview: 'Efficient respiratory surfaces exhibit four universal adaptations: large surface area to volume ratio, thin epithelial membrane (short diffusion distance), moist surface to dissolve gases, and dense capillary vascularization. Fish utilize counter-current flow where blood and water flow in opposite directions across gill lamellae, maintaining a concentration gradient across the entire length (extracting >80% of dissolved oxygen).',
      keyFormulas: [
        'Inhalation: Diaphragm contracts & flattens, External intercostals contract → Thoracic volume increases → Pressure decreases → Air rushes in',
        'Exhalation: Diaphragm relaxes & domes, Internal intercostals contract → Volume decreases → Pressure increases → Air expelled'
      ],
      kenyanApplication: 'Management of respiratory tract infections and occupational silica dust hazards in limestone quarries in Bamburi, Mombasa.',
      examTips: 'Always specify the counter-current exchange mechanism in fish gills and explain why it is superior to concurrent flow.'
    },
    {
      id: 'bio-f2-t3',
      title: 'Respiration',
      formOrYear: 'Form 2',
      subtopics: [
        'Distinction between respiration and gaseous exchange',
        'Aerobic respiration: Glycolysis in cytoplasm, Krebs cycle and oxidative phosphorylation in mitochondrial cristae',
        'Anaerobic respiration in plants (alcoholic fermentation: ethanol + CO₂ + 2 ATP) and animals (lactic acid fermentation: lactate + 2 ATP)',
        'Oxygen debt and muscle fatigue recovery',
        'Respiratory Quotient (RQ) for carbohydrates, lipids, and proteins',
        'Factors affecting respiration rate (temperature, substrate concentration, physical activity)'
      ],
      theoryOverview: 'Cellular respiration is the enzymatic breakdown of organic substrates to release energy stored as ATP (Adenosine Triphosphate). Aerobic respiration yields 36–38 ATP per glucose molecule: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP. Anaerobic respiration occurs in oxygen deficits; in mammalian muscles, pyruvate is reduced to lactic acid, creating an oxygen debt repaid during recovery hyperventilation.',
      keyFormulas: [
        'Respiratory Quotient: RQ = Volume of CO₂ produced / Volume of O₂ consumed',
        'Carbohydrate RQ = 1.0; Lipid RQ ≈ 0.7; Protein RQ ≈ 0.8'
      ],
      kenyanApplication: 'High-altitude endurance athletic training in Iten (Elgeyo Marakwet) stimulating erythropoiesis and mitochondrial enzyme density.',
      examTips: 'When defining oxygen debt, state: "The additional amount of oxygen required to oxidize accumulated lactic acid in the liver to carbon dioxide and water, or convert it back to glycogen."'
    },
    {
      id: 'bio-f2-t4',
      title: 'Excretion and Homeostasis',
      formOrYear: 'Form 2',
      subtopics: [
        'Excretion in plants: transpiration, guttation, shedding of leaves, commercial secondary metabolites (tannins, quinine, caffeine)',
        'Excretion in animals: contractile vacuoles in Amoeba, flame cells, Malpighian tubules in insects, kidneys in mammals',
        'Structure of the mammalian kidney: cortex, medulla, pelvis, ureter',
        'The Nephron: ultrafiltration in Bowman\'s capsule, selective reabsorption in proximal convoluted tubule, counter-current multiplier in Loop of Henle',
        'Hormonal regulation of osmoregulation: Antidiuretic Hormone (ADH / Vasopressin) and Aldosterone',
        'Homeostasis: Negative feedback mechanisms controlling blood glucose (insulin and glucagon by islets of Langerhans)',
        'Thermoregulation: Skin response to heat (vasodilation, sweating) and cold (vasoconstriction, shivering, arrector pili erection)'
      ],
      theoryOverview: 'Homeostasis is the maintenance of a dynamic, constant internal environment. The kidney performs excretion (removal of urea, uric acid, creatinine) and osmoregulation (water and salt balance). Ultrafiltration occurs in the glomerulus under high hydrostatic pressure due to afferent arteriole having wider lumen than efferent arteriole. ADH from posterior pituitary increases water permeability of collecting ducts, producing concentrated urine.',
      keyFormulas: [
        'Negative Feedback: Stimulus → Receptor → Control Center → Effector → Response (reverses disturbance)',
        'Blood Glucose Homeostasis: Insulin lowers glucose (glycogenesis); Glucagon elevates glucose (glycogenolysis)'
      ],
      kenyanApplication: 'Dialysis and kidney transplantation units at Kenyatta National Hospital, and diabetes management clinics across Kenya.',
      examTips: 'Do not confuse diabetes mellitus (insulin deficiency / high blood sugar) with diabetes insipidus (ADH deficiency / failure of water reabsorption producing copious dilute urine).'
    },

    // ================= FORM 3 =================
    {
      id: 'bio-f3-t1',
      title: 'Classification II',
      formOrYear: 'Form 3',
      subtopics: [
        'The five kingdoms of living organisms: Monera, Protoctista, Fungi, Plantae, Animalia',
        'Characteristics of major plant divisions: Bryophyta, Pteridophyta, Spermatophyta (Gymnospermae and Angiospermae)',
        'Characteristics of major animal phyla: Arthropoda (Arachnida, Crustacea, Insecta, Chilopoda, Diplopoda), Chordata',
        'Construction and use of biological identification keys: Dichotomous keys (indented and numbered paired couplets)'
      ],
      theoryOverview: 'Modern classification groups all biodiversity into five kingdoms based on cellular organization (prokaryotic vs eukaryotic) and nutrition mode. Arthropods are characterized by segmented bodies, chitinous jointed exoskeletons, and bilateral symmetry. Insects possess 3 body parts, 3 pairs of legs, and tracheal breathing; Arachnids possess 2 body parts (cephalothorax and abdomen) and 4 pairs of walking legs.',
      keyFormulas: [
        'Dichotomous Key Construction Rules: Use observable external morphological features; avoid subjective or variable characteristics (e.g. size, age); each couplet must have two mutually exclusive options (a and b).'
      ],
      kenyanApplication: 'Biodiversity identification and invasive insect pest tracking (e.g. Desert Locust invasions in northern Kenya) by ICIPE.',
      examTips: 'In dichotomous keys, always end each step with either the name of the organism or the next number to proceed to. Never leave dead ends.'
    },
    {
      id: 'bio-f3-t2',
      title: 'Ecology',
      formOrYear: 'Form 3',
      subtopics: [
        'Concepts of ecology: Biosphere, Ecosystem, Community, Population, Habitat, Ecological Niche',
        'Biotic factors (predation, competition, parasitism, mutualism, saprophytism) and Abiotic factors (light, temperature, rainfall, pH, salinity)',
        'Trophic levels, food chains, food webs, and ecological pyramids of numbers, biomass, and energy',
        'Nutrient recycling: Nitrogen cycle (fixation, nitrification, denitrification) and Carbon cycle',
        'Ecological population sampling techniques: Quadrats, Belt transects, Line transects, Lincoln-Petersen capture-recapture index',
        'Pollution types, greenhouse effect, global warming, eutrophication, and environmental conservation in Kenya'
      ],
      theoryOverview: 'Ecology is the study of interrelationships between living organisms and their physical environment. Energy enters ecosystems through producers via photosynthesis (1-2% capture efficiency) and flows unidirectionally through trophic levels with ~90% dissipation as metabolic heat and waste at each stage. Nitrogen-fixing bacteria (Rhizobium in leguminous root nodules) convert atmospheric N₂ into ammonium ions.',
      keyFormulas: [
        'Capture-Recapture: Total Population N = (n₁ × n₂) / m₂',
        'Percentage Frequency = (Number of quadrats with species / Total quadrats thrown) × 100%',
        'Population Density = Total count / Total sampled area'
      ],
      kenyanApplication: 'Kenya Wildlife Service (KWS) wildlife censuses in Tsavo and Masai Mara, and combating eutrophication in Lake Victoria caused by agricultural runoff.',
      examTips: 'Pyramids of energy are always upright and never inverted because energy is lost as heat at each progressive trophic level in accordance with the second law of thermodynamics.'
    },
    {
      id: 'bio-f3-t3',
      title: 'Reproduction in Plants and Animals',
      formOrYear: 'Form 3',
      subtopics: [
        'Cell division: Mitosis (stages, significance in growth/repair) vs Meiosis (gametogenesis, crossing over, reduction division)',
        'Asexual reproduction: binary fission, spore formation, budding, natural vegetative propagation (rhizomes, stolons, tubers, bulbs)',
        'Sexual reproduction in flowering plants: flower structure, insect vs wind pollination adaptations, double fertilization, seed and fruit formation',
        'Human reproductive anatomy: male (testes, epididymis, vas deferens, prostate) and female (ovaries, fallopian tubes, uterus, cervix)',
        'The menstrual cycle: hormonal interplay of FSH, Estrogen, LH, and Progesterone',
        'Fertilization, implantation, placenta structure and endocrine functions, gestation, and parturition',
        'Sexually Transmitted Infections (STIs): HIV/AIDS, Gonorrhoea, Syphilis, and reproductive healthcare'
      ],
      theoryOverview: 'Reproduction ensures continuity of species. Mitosis produces 2 genetically identical diploid daughter cells; Meiosis produces 4 genetically varied haploid gametes. In angiosperms, double fertilization occurs: one sperm nucleus fuses with the egg cell to form a diploid zygote (2n), while the second sperm fuses with two polar nuclei to form a triploid endosperm (3n). In human reproduction, LH surge triggers ovulation on day 14; progesterone maintains the endometrium for implantation.',
      keyFormulas: [
        'Mitosis: 2n → 2n (2 identical diploid cells)',
        'Meiosis: 2n → n (4 genetically diverse haploid gametes)',
        'Double Fertilization: Sperm (n) + Egg (n) = Zygote (2n); Sperm (n) + 2 Polar Nuclei (2n) = Endosperm (3n)'
      ],
      kenyanApplication: 'Tissue culture banana propagation by KALRO and maternal healthcare delivery under the Ministry of Health.',
      examTips: 'The placenta does not allow direct mixing of maternal and fetal blood; exchange occurs across capillary walls by diffusion to prevent agglutination and protect delicate fetal capillaries from maternal high blood pressure.'
    },
    {
      id: 'bio-f3-t4',
      title: 'Growth and Development',
      formOrYear: 'Form 3',
      subtopics: [
        'Concepts of growth (irreversible increase in size and dry mass) and development (specialization/differentiation)',
        'Seed structure: testa, micropyle, cotyledon, plumule, radicle',
        'Seed dormancy causes and breaking methods (scarification, cold treatment, gibberellin)',
        'Germination conditions: water, oxygen, suitable temperature; Epigeal vs Hypogeal germination',
        'Primary growth (apical meristems) and secondary growth (vascular cambium and cork cambium)',
        'Plant growth hormones: auxins, gibberellins, cytokinins, ethylene, abscisic acid; Apical dominance',
        'Growth and development in insects: Complete metamorphosis (Egg → Larva → Pupa → Adult) vs Incomplete metamorphosis (Egg → Nymph → Adult)'
      ],
      theoryOverview: 'Growth involves cell division, elongation, and differentiation. In epigeal germination (e.g. bean), the hypocotyl elongates rapidly, pulling cotyledons above soil surface. In hypogeal germination (e.g. maize), the epicotyl elongates, leaving cotyledons below ground. Auxins produced in shoot tips diffuse down and promote cell elongation, while inhibiting lateral bud development (apical dominance).',
      keyFormulas: [
        'Relative Growth Rate: RGR = (ln W₂ - ln W₁) / (t₂ - t₁)',
        'Auxin action: High concentration stimulates shoot elongation but inhibits root elongation'
      ],
      kenyanApplication: 'Pruning of tea bushes in Kericho to break apical dominance and promote lateral flush shooting.',
      examTips: 'Dry mass is the most accurate measure of true biological growth because it excludes variable water content; however, it requires killing the specimen.'
    },

    // ================= FORM 4 =================
    {
      id: 'bio-f4-t1',
      title: 'Genetics',
      formOrYear: 'Form 4',
      subtopics: [
        'Concepts of genetics: Genes, Alleles, Genotype, Phenotype, Dominance, Recessiveness, Homozygous, Heterozygous',
        'Mendelian genetics: First Law of Segregation (Monohybrid crosses 3:1 ratio) and Second Law of Independent Assortment',
        'Non-Mendelian inheritance: Incomplete dominance, Co-dominance (ABO blood groups), Multiple alleles',
        'Sex determination in humans (XX female, XY male) and Sex-linked genes (Haemophilia, Red-Green color blindness)',
        'DNA and RNA structure: nucleotides, base-pairing rules (Adenine-Thymine, Guanine-Cytosine), genetic code',
        'Mutations: Gene mutations (Sickle-cell anaemia, Albinism) and Chromosomal aberrations (Down\'s syndrome, Turner\'s syndrome)'
      ],
      theoryOverview: 'Genetics is the study of heredity and variation. In monohybrid inheritance with complete dominance, crossing two heterozygotes yields a 3:1 phenotypic ratio and 1:2:1 genotypic ratio. ABO blood groups exhibit co-dominance between alleles I^A and I^B, both dominant over recessive I^O. Sex-linked traits are carried on the non-homologous portion of the X chromosome, expressing more frequently in males because they possess only one X chromosome.',
      keyFormulas: [
        'Monohybrid Heterozygous Cross: Tt × Tt → 1 TT : 2 Tt : 1 tt (3 Dominant : 1 Recessive)',
        'Co-dominance Blood Cross: I^A I^B × I^A I^O → I^A I^A, I^A I^O, I^A I^B, I^B I^O'
      ],
      kenyanApplication: 'Sickle cell trait screening in western Kenya where sickle-cell trait (HbA HbS) confers selective resistance against severe malaria.',
      examTips: 'Always label your genetic diagrams completely: Parental Phenotypes, Parental Genotypes, Gametes (circled), Punnett Square, Offspring Genotypes, Offspring Phenotypes and Ratios.'
    },
    {
      id: 'bio-f4-t2',
      title: 'Evolution',
      formOrYear: 'Form 4',
      subtopics: [
        'Theories of origin of life and biological evolution: Special Creation, Chemical Evolution, Organic Evolution',
        'Jean-Baptiste Lamarck\'s theory of inheritance of acquired characteristics and its scientific disproof',
        'Charles Darwin\'s theory of evolution by Natural Selection: overproduction, struggle for existence, variation, survival of the fittest',
        'Evidence for organic evolution: Fossil records, Comparative anatomy (Homologous vs Analogous structures), Comparative embryology, Vestigial structures, Biogeography, Molecular DNA homology',
        'Modern examples of natural selection: Industrial melanism in peppered moths, Antibiotic resistance in bacteria, Pesticide resistance in mosquitoes'
      ],
      theoryOverview: 'Evolution is the gradual directional change in the inherited traits of biological populations over successive generations. Natural selection acts on pre-existing genetic variations; individuals possessing adaptive advantages have higher reproductive fitness, passing advantageous alleles to offspring. Homologous structures (e.g. pentadactyl limb of mammals, birds, whales) share common embryonic origin and divergent evolution; analogous structures (e.g. wings of bird vs insect) reflect convergent evolution under similar selection pressures.',
      keyFormulas: [
        'Hardy-Weinberg Equilibrium: p² + 2pq + q² = 1 (where p = dominant allele freq, q = recessive allele freq)',
        'Divergent Evolution: Homologous structures adapted to different ecological niches'
      ],
      kenyanApplication: 'World-renowned hominid fossil discoveries at Koobi Fora (Lake Turkana) by the Leakey family documenting human evolutionary origins.',
      examTips: 'Clearly distinguish homologous structures (common origin, different functions = divergent evolution) from analogous structures (different origin, similar functions = convergent evolution).'
    },
    {
      id: 'bio-f4-t3',
      title: 'Reception, Response & Coordination in Plants and Animals',
      formOrYear: 'Form 4',
      subtopics: [
        'Irritability in plants: Tropisms (phototropism, geotropism, hydrotropism, thigmotropism) and Nastic movements',
        'Role of auxins in plant tropisms: Cholodny-Went model of unilateral light and gravity redistribution',
        'Mammalian nervous system: Central Nervous System (Brain and Spinal cord) and Peripheral Nervous System',
        'Structure and function of neurons: Sensory, Relay, and Motor neurons; Synaptic transmission and neurotransmitters (Acetylcholine)',
        'Reflex arc and reflex actions: Simple reflex vs Conditioned reflex',
        'Sensory organs: The Mammalian Eye (structure, accommodation, defects: myopia, hypermetropia, astigmatism, cataracts)',
        'The Mammalian Ear: Hearing mechanism and balance/posture (semicircular canals and vestibular apparatus)',
        'Endocrine system: Hormones, Pituitary master gland, Thyroid (thyroxine), Adrenal (adrenaline), Pancreas (insulin/glucagon)'
      ],
      theoryOverview: 'Coordination ensures integrated physiological responses. In plants, unilateral light causes auxins to migrate to the shaded side of shoot tips; high auxin promotes cell elongation on the shaded side, causing the shoot to bend towards light (positive phototropism). In animals, impulses travel electrically along axon membranes via saltatory conduction along nodes of Ranvier, and chemically across synaptic clefts via neurotransmitters.',
      keyFormulas: [
        'Resting Potential (-70 mV) → Action Potential (+40 mV) upon depolarization via Na⁺ influx',
        'Accommodation for Close Vision: Ciliary muscles contract → Suspensory ligaments slacken → Lens becomes more convex'
      ],
      kenyanApplication: 'Cataract outreach surgical camps by the Fred Hollows Foundation in rural Kenyan counties.',
      examTips: 'In eye accommodation for near vision: remember C-C-S-F: Ciliary muscle Contracts, Suspensory ligament Slackens, Fat/convex lens.'
    },
    {
      id: 'bio-f4-t4',
      title: 'Support and Movement in Plants and Animals',
      formOrYear: 'Form 4',
      subtopics: [
        'Support in plants: Turgor pressure in parenchyma, mechanical tissue (collenchyma, sclerenchyma, xylem vessels)',
        'Importance of locomotion and support in animals: food seeking, mate searching, predator avoidance',
        'Mammalian skeleton: Axial skeleton (skull, vertebral column, ribs, sternum) and Appendicular skeleton (pectoral girdle, pelvic girdle, limbs)',
        'Structure of typical vertebrae: Cervical, Thoracic, Lumbar, Sacral, Caudal',
        'Joints: Immovable (sutures), Slightly movable, Synovial movable joints (Ball-and-socket, Hinge, Pivot)',
        'Structure of synovial joints: articular cartilage, synovial membrane, synovial fluid, ligaments',
        'Muscles: Skeletal (striated/voluntary), Smooth (involuntary), Cardiac; Antagonistic muscle pairs (Biceps and Triceps)'
      ],
      theoryOverview: 'Locomotion in mammals is mediated by the musculoskeletal system. The axial skeleton protects delicate organs (brain in cranium, spinal cord in neural canal of vertebrae, heart/lungs in rib cage). Movement at synovial joints is powered by antagonistic skeletal muscles attached to bones via inelastic tendons. When the biceps brachii contracts (flexor), the triceps relaxes, bending the forearm at the elbow hinge joint.',
      keyFormulas: [
        'Vertebral Formula of Human: C7, T12, L5, S5 (fused), Cd4 (fused) = 33 vertebrae',
        'Cervical Atlas Vertebra: Large neural canal, absent centrum, broad wing-like transverse processes for nodding'
      ],
      kenyanApplication: 'Sports medicine and biomechanics of Kenyan middle and long-distance Olympic runners.',
      examTips: 'Tendons connect muscle to bone and are inelastic; ligaments connect bone to bone at joints and are elastic to allow controlled articulation.'
    }
  ],
  practicals: [
    {
      id: 'bio-p1',
      title: 'KCSE Biology Paper 3: Food Tests, Osmosis, and Mammalian Organ Dissection',
      objectives: [
        'Perform food tests for reducing sugars, non-reducing sugars, starch, proteins, and lipids',
        'Examine and draw transverse sections of dicotyledonous and monocotyledonous stems under microscope',
        'Identify structures and functions of dissected mammalian heart, kidney, or eye specimen'
      ],
      apparatus: [
        'Benedict\'s solution, Iodine solution, Biuret reagents (1% CuSO₄ + 10% NaOH), DCPIP solution, Ethanol',
        'Boiling tubes, test tube rack, test tube holder, water bath / Bunsen burner',
        'Razor blades / scalpel, white tile, hand lens, light microscope',
        'Fresh mammalian heart / kidney specimen'
      ],
      safetyHazards: ['Scalpel sharps caution: cut away from body.', 'Boiling water bath burn hazard.'],
      procedure: [
        'Test for Reducing Sugars: Add 2cm³ Benedict\'s to 2cm³ food extract, heat in water bath to boiling. Color change from blue → green → yellow → orange/brick-red precipitate indicates reducing sugar.',
        'Test for Proteins: Add 2cm³ 10% NaOH to food extract, then add 2-3 drops 1% CuSO₄. Purple/violet color confirms peptide bonds.',
        'Test for Starch: Add 2 drops Iodine solution. Blue-black color confirms starch.',
        'Mammalian Heart Dissection: Identify coronary artery, vena cava, aorta, pulmonary artery. Slice longitudinally to observe thicker left ventricular muscular wall and tricuspid/bicuspid valves.'
      ],
      observationTable: {
        headers: ['Food Substance Tested', 'Reagent Added', 'Procedure', 'Observation', 'Conclusion'],
        sampleRows: [
          ['Reducing Sugars', 'Benedict\'s Solution', 'Boil in water bath', 'Orange / Brick-red precipitate', 'Reducing sugars present'],
          ['Starch', 'Iodine Solution', 'Add 2 drops', 'Blue-black coloration', 'Starch present'],
          ['Proteins', 'Biuret Reagents (NaOH + CuSO₄)', 'Mix thoroughly', 'Purple / Violet color', 'Proteins present'],
          ['Vitamin C (Ascorbic acid)', 'DCPIP Solution', 'Add extract dropwise', 'DCPIP decolorized to clear', 'Vitamin C present']
        ],
      },
      calculationFormula: 'Linear Magnification = Length of drawing in mm / Actual specimen length in mm',
      expectedOutcome: 'Mastery of KNEC Paper 3 biological practical procedures, accurate drawings with continuous clear lines, and zero shading.',
      vivaQuestions: [
        'Why must sodium hydrogen carbonate be added during the test for non-reducing sugars after boiling with dilute hydrochloric acid?',
        'Why are drawings with broken lines or artistic shading penalized in KNEC biology practicals?'
      ]
    }
  ],
  exams: [
    {
      id: 'bio-e1',
      title: 'KCSE Biology Paper 2 (Theory Mock Exam)',
      paperCode: '231/2',
      durationMinutes: 120,
      totalMarks: 80,
      instructions: ['Answer ALL questions in Section A and question 6 in Section B.'],
      questions: [
        {
          id: 'bio-q1',
          questionNumber: 1,
          questionText: 'State three structural adaptations of the alveolus in mammalian lungs that facilitate rapid gaseous exchange. [3 marks]',
          marks: 3,
          sampleAnswer: '1. One-cell-thick epithelial wall providing a very short diffusion pathway for O₂ and CO₂.\n2. Highly folded structure creating an immense surface area-to-volume ratio.\n3. Dense network of blood capillaries carrying away oxygenated blood, maintaining a steep concentration gradient.\n4. Moist inner lining that dissolves gases before diffusion.',
          markingScheme: [
            'Thin squamous epithelium / short diffusion distance (1 mark)',
            'Large surface area created by millions of spherical alveoli (1 mark)',
            'Rich capillary supply maintaining steep concentration gradient (1 mark)'
          ]
        }
      ]
    }
  ]
};
