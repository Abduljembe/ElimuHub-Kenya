import { SubjectCourse } from '../types/curriculum';
import { KCSE_BIOLOGY } from './kcseBiology';
import { KCSE_CHEMISTRY } from './kcseChemistry';
import { KCSE_PHYSICS } from './kcsePhysics';
import { KCSE_MATHEMATICS } from './kcseMathematics';
import { KCSE_AGRICULTURE, KCSE_GEOGRAPHY, KCSE_BUSINESS_STUDIES } from './kcseAppliedHumanities';

export const KCSE_COMPUTER_STUDIES: SubjectCourse = {
  id: 'hs-computer-studies',
  name: 'Computer Studies',
  title: 'Computer Studies (KNEC KCSE)',
  code: 'KCSE 451 / CBC ICT',
  category: 'Computing & Tech',
  level: 'highschool',
  badge: 'KICD Technical Core',
  simulationType: 'algorithms',
  description:
    'Complete Kenya National Curriculum (KICD/KNEC) Computer Studies covering Form 1 to Form 4: Computer Systems, Hardware, Operating Systems, Word Processing, Spreadsheets, Databases, DTP, Networking, Data Representation, Systems Analysis & Design, Programming (Pascal/C++/Python), and Cyber Ethics.',
  learningOutcomes: [
    'Explain internal computer architecture: CPU (ALU, CU, Registers), System Bus, and Memory hierarchies.',
    'Execute advanced practical formulas, nested IFs, VLOOKUPs, and pivot charts in Microsoft Excel.',
    'Design relational database schemas with primary/foreign keys and SQL queries in Microsoft Access.',
    'Construct structured program flowcharts, pseudocode algorithms, and implement control structures.',
    'Design local area network (LAN) topologies, IP addressing schemes, subnetting, and network security protocols.'
  ],
  topics: [
    {
      id: 'cs-f1-t1',
      title: 'Introduction to Computers & Computer Systems',
      formOrYear: 'Form 1',
      subtopics: ['Definition of computer and data vs information', 'Evolution and generations of computers (1st to 5th generation)', 'Classification of computers (by size, functionality, and purpose)', 'Physical parts: Input devices, Central Processing Unit (CPU), Output devices, Secondary storage', 'Computer laboratory safety, layout, UPS, and ergonomics'],
      theoryOverview:
        'A computer is an electronic device that accepts input data, processes it according to stored instructions, and produces meaningful output. Generations: 1st (Vacuum tubes), 2nd (Transistors), 3rd (Integrated Circuits), 4th (VLSI microprocessors), 5th (Artificial Intelligence and parallel computing).',
      kenyanApplication: 'Kenya Digital Literacy Programme (DLP) laptops deployed in public primary and secondary schools across all 47 counties.',
      examTips: 'Differentiate between cold booting (starting computer from power off state) and warm booting (restarting computer using Ctrl+Alt+Del or reset button).'
    },
    {
      id: 'cs-f1-t2',
      title: 'Operating Systems & File Management',
      formOrYear: 'Form 1',
      subtopics: ['Functions of an Operating System (Processor, Memory, Device, File management)', 'Types of OS interfaces: Command Line Interface (CLI) vs Graphical User Interface (GUI)', 'Files, directories, folder tree hierarchies and file extensions (.docx, .xlsx, .accdb, .pdf, .exe)', 'Disk management: formatting, partitioning, defragmentation, disk cleanup'],
      theoryOverview:
        'An Operating System acts as the intermediary between computer hardware and application software. Disk defragmentation reorganizes scattered file clusters into contiguous sectors to improve read/write access speed. CLI requires typed syntax commands, whereas GUI uses WIMP (Windows, Icons, Menus, Pointers).',
      kenyanApplication: 'Huduma Kenya biometric citizen registration kiosks running specialized hardened OS builds.',
      examTips: 'KNEC often asks candidates to identify the file extension associated with each application software.'
    },
    {
      id: 'cs-f2-t1',
      title: 'Word Processing & Desktop Publishing (DTP)',
      formOrYear: 'Form 2',
      subtopics: ['Word processing features: formatting, tables, mail merge, footnotes, header/footer', 'Mail merge components: Main document, Data source, Merged document', 'DTP layout: master pages, text frames, leading, kerning, tracking, drop caps, graphic layering', 'Differences between word processors and desktop publishers'],
      theoryOverview:
        'Word processors focus on text flow and document editing. Desktop publishers (e.g. Adobe InDesign, MS Publisher) focus on precise pixel/point layout, typography, and graphic placement for publications. Mail merge automates mass customized letters by linking fields from a data source.',
      kenyanApplication: 'Printing and publication of Kenya Gazette notices and national curriculum textbooks by Kenya Literature Bureau (KLB).',
      examTips: 'Outline the steps of mail merge in order: 1. Create main document; 2. Create or select data source; 3. Insert merge fields; 4. Preview and merge.'
    },
    {
      id: 'cs-f2-t2',
      title: 'Electronic Spreadsheets (Formulas, Functions & Charts)',
      formOrYear: 'Form 2',
      subtopics: ['Worksheet grid: rows, columns, cells, active cell, range coordinates', 'Data types: labels, values, formulas, dates', 'Cell referencing: Relative (A1), Absolute ($A$1), Mixed ($A1 or A$1)', 'Built-in functions: SUM, AVERAGE, COUNT, COUNTIF, MAX, MIN, IF, Nested IF, VLOOKUP', 'Chart types: column, bar, pie, line charts and trendline analysis'],
      theoryOverview:
        'Spreadsheets manipulate numerical and financial data in tabular grids. Absolute cell referencing ($A$1) anchors the row and column coordinates so that dragging or copying the formula maintains the exact reference cell without shifting.',
      keyFormulas: [
        'Nested IF syntax: =IF(condition1, value_if_true, IF(condition2, value2, value_if_false))',
        'VLOOKUP syntax: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])'
      ],
      kenyanApplication: 'Payroll calculations, PAYE deductions, and financial statement modeling across Kenyan commercial enterprises.',
      examTips: 'Remember that EVERY formula in a spreadsheet MUST begin with an equals sign (=), otherwise the software treats it as a text label!'
    },
    {
      id: 'cs-f3-t1',
      title: 'Database Management Systems (DBMS)',
      formOrYear: 'Form 3',
      subtopics: ['Database concepts: Table, Record, Field, Primary key, Foreign key, Candidate key', 'Database models: Flat-file vs Relational Database Management System (RDBMS)', 'Relationships: One-to-One (1:1), One-to-Many (1:N), Many-to-Many (M:N)', 'Database objects: Tables, Queries (Select, Update, Append, Delete), Forms, Reports', 'Data validation rules, input masks, and referential integrity'],
      theoryOverview:
        'An RDBMS organizes data into normalized tables linked by foreign keys, eliminating data redundancy and update anomalies. Referential integrity enforces that a foreign key in a child table must match an existing primary key in the parent table. Queries retrieve filtered records meeting criteria.',
      keyFormulas: [
        'Criteria syntax: >1000, Like "N*", Between #01/01/2024# And #31/12/2024#'
      ],
      kenyanApplication: 'National Integrated Identity Management System (NIIMS / Maisha Namba) and Kenya Police criminal record databases.',
      examTips: 'KNEC Paper 2 practical always features a comprehensive Database question requiring table relationships, calculated fields in queries, customized forms, and grouped summary reports.'
    },
    {
      id: 'cs-f3-t2',
      title: 'Data Representation & Binary Arithmetic',
      formOrYear: 'Form 3',
      subtopics: ['Number systems: Decimal (base 10), Binary (base 2), Octal (base 8), Hexadecimal (base 16)', 'Conversions between number bases', 'Binary addition, subtraction using One’s Complement and Two’s Complement', 'Character coding schemes: BCD, EBCDIC, ASCII (7-bit and 8-bit), Unicode (UTF-8, UTF-16)'],
      theoryOverview:
        'Digital computers represent all data using binary digits (bits: 0 and 1). Two’s complement is the standard method for signed integer arithmetic: invert all bits (One’s complement) and add 1. Hexadecimal is used as a shorthand for binary (1 hex digit = 4 binary bits / nibble).',
      keyFormulas: [
        'Two’s complement of binary number = (One’s complement) + 1',
        '8 bits = 1 Byte, 1024 Bytes = 1 KB, 1024 KB = 1 MB, 1024 MB = 1 GB'
      ],
      kenyanApplication: 'Color hex code representation (#FF5733) in Kenyan web software; IP address binary masking in network routing.',
      examTips: 'Show all division/multiplication steps clearly when converting between number bases. Do not just write the final answer!'
    },
    {
      id: 'cs-f3-t3',
      title: 'Data Communication & Computer Networks',
      formOrYear: 'Form 3',
      subtopics: ['Elements of communication: sender, transmission medium, protocol, receiver', 'Transmission media: Bounded/Guided (Twisted pair UTP/STP, Coaxial, Fiber optic) vs Unbounded/Unguided (Radio, Microwave, Satellite, Infrared)', 'Network topologies: Star, Bus, Ring, Mesh, Tree, Hybrid', 'Network hardware: NIC, Hub, Switch, Router, Modem, Gateway, Bridge', 'OSI 7-Layer reference model vs TCP/IP model', 'Network security: Firewalls, encryption, authentication, VPN'],
      theoryOverview:
        'A computer network connects autonomous devices to share data and hardware peripherals. Fiber optic cables transmit data as light pulses through total internal reflection, offering immune electromagnetic interference and massive bandwidth. Switches operate at Data Link Layer (Layer 2) using MAC addresses; Routers operate at Network Layer (Layer 3) using IP addresses.',
      kenyanApplication: 'National Optic Fibre Backbone Infrastructure (NOFBI) connecting all Kenyan sub-county headquarters.',
      examTips: 'Contrast Hub vs Switch: A hub broadcasts incoming packets to ALL ports causing collisions; a switch reads the MAC address and directs packets ONLY to the destination port.'
    },
    {
      id: 'cs-f4-t1',
      title: 'Systems Analysis and Design (SDLC)',
      formOrYear: 'Form 4',
      subtopics: ['System development life cycle (SDLC) stages: Problem recognition, Feasibility study, System analysis, System design, System construction/coding, System testing, Implementation, Maintenance', 'Information gathering techniques: Interviews, questionnaires, observation, document review', 'System documentation: User manual vs Technical documentation', 'System changeover strategies: Direct/crash, Parallel, Phased/pilot'],
      theoryOverview:
        'SDLC is the systematic methodology for engineering enterprise information systems. Parallel changeover runs both the old system and the new system concurrently, providing the highest reliability and lowest operational risk despite duplicated labor and computing costs.',
      kenyanApplication: 'Kenya Revenue Authority transition from legacy tax filing systems to the modern unified iTax and e-TIMS platforms.',
      examTips: 'Know the 4 types of feasibility: Technical (hardware/software available?), Economic (cost-benefit?), Operational (will users accept it?), Legal (data compliance?).'
    },
    {
      id: 'cs-f4-t2',
      title: 'Programming Principles & Algorithm Design',
      formOrYear: 'Form 4',
      subtopics: ['Program development cycle: Problem definition, Algorithm design, Coding, Testing/debugging, Documentation', 'Algorithm representation: Flowcharts (symbols: terminal, process, decision, I/O, connectors) and Pseudocode', 'Control structures: Sequence, Selection (IF-THEN-ELSE, CASE), Iteration/Looping (WHILE-DO, REPEAT-UNTIL, FOR)', 'Programming paradigms: Machine code, Assembly language, High-level procedural, Object-Oriented Programming (OOP)', 'Errors: Syntax, Logical, Runtime errors'],
      theoryOverview:
        'An algorithm is a finite, step-by-step sequence of unambiguous instructions to solve a computational problem. Flowcharts use standardized ANSI symbols (diamonds for decisions, parallelograms for input/output, rectangles for calculations). Logic errors produce incorrect output without triggering syntax compilation errors.',
      keyFormulas: [
        'Linear search time complexity: O(n)',
        'Binary search time complexity: O(log n)'
      ],
      kenyanApplication: 'Software development in Nairobi’s Silicon Savannah (Kilimani, Westlands) powering digital fintech and logistics startups.',
      examTips: 'In flowcharts, every decision diamond MUST have exactly two outgoing arrows labeled "YES" and "NO" (or "TRUE" and "FALSE").'
    }
  ],
  practicals: [
    {
      id: 'cs-prac-1',
      title: 'Relational Database Schema Design & SQL Queries (KNEC Paper 2)',
      objectives: [
        'Create a relational database containing Student, Course, and Enrollment tables.',
        'Enforce primary keys, foreign keys, and referential integrity.',
        'Construct queries with calculated fields, parameter filters, and generate an executive summary report.'
      ],
      apparatus: ['Computer workstation running Microsoft Access or PostgreSQL', 'KNEC Practical Question Paper', 'Flash drive for file submission'],
      safetyHazards: ['Save database frequently to prevent data loss during power fluctuations.'],
      procedure: [
        'Open Microsoft Access and create a blank database named KCSE_STUDENT_EXAM.',
        'Design tblStudents with fields: StudentID (PK, Short Text), FullName (Short Text), Form (Number), KCPE_Marks (Number).',
        'Design tblScores with fields: ScoreID (PK, AutoNumber), StudentID (FK), Math (Number), Chem (Number), Bio (Number).',
        'Establish a One-to-Many relationship between tblStudents and tblScores with Referential Integrity enabled.',
        'Create query qryTotalGrades calculating Total = [Math]+[Chem]+[Bio] and Average = [Total]/3.',
        'Generate a grouped report by Form displaying summary averages.'
      ],
      observationTable: {
        headers: ['StudentID', 'FullName', 'Form', 'Math', 'Chem', 'Bio', 'Total', 'Average'],
        sampleRows: [
          ['STD001', 'Kipchoge Keino', '4', '85', '78', '90', '253', '84.3'],
          ['STD002', 'Wangari Maathai', '4', '92', '88', '94', '274', '91.3'],
          ['STD003', 'Grace Ogot', '4', '74', '80', '82', '236', '78.7']
        ]
      },
      calculationFormula: 'Calculated Field syntax: Total: [Math] + [Chem] + [Bio]; Average: [Total] / 3.',
      expectedOutcome: 'A fully normalized relational database displaying zero data redundancy with automated SQL query calculations.',
      vivaQuestions: [
        'What is referential integrity and why is it essential? (It prevents orphaned records by ensuring child table foreign keys match parent primary keys).',
        'What is the difference between a table and a query? (A table physically stores data in records and fields; a query dynamically retrieves and computes data from tables).'
      ]
    }
  ],
  exams: [
    {
      id: 'kcse-cs-mock-p1',
      title: 'KCSE Computer Studies Paper 1 (Theory)',
      paperCode: '451/1',
      durationMinutes: 150,
      totalMarks: 100,
      instructions: [
        'Write your name and index number in the spaces provided.',
        'This paper consists of two sections: Section A (40 marks) and Section B (60 marks).',
        'Answer all questions in Section A and question 16 (compulsory programming) and any other three questions from Section B.'
      ],
      questions: [
        {
          id: 'cs-q1',
          questionNumber: 1,
          questionText: 'Differentiate between a character printer and a page printer, giving one example of each.',
          marks: 3,
          sampleAnswer:
            'A character printer prints one character at a time across the page (e.g. Dot Matrix printer or Daisy wheel printer).\nA page printer processes and prints an entire page at once into memory before outputting (e.g. Laser printer).',
          markingScheme: [
            'Award 1 mark for clear description of character printer',
            'Award 1 mark for clear description of page printer',
            'Award ½ mark each for valid examples (Max 3 marks)'
          ]
        },
        {
          id: 'cs-q2',
          questionNumber: 2,
          questionText: 'Convert the decimal number 53.625₁₀ to its binary equivalent.',
          marks: 3,
          sampleAnswer:
            'Integer part (53):\n53 ÷ 2 = 26 rem 1\n26 ÷ 2 = 13 rem 0\n13 ÷ 2 = 6 rem 1\n6 ÷ 2 = 3 rem 0\n3 ÷ 2 = 1 rem 1\n1 ÷ 2 = 0 rem 1\nReading upwards: 110101₂\n\nFractional part (0.625):\n0.625 × 2 = 1.25 -> 1\n0.25 × 2 = 0.50 -> 0\n0.50 × 2 = 1.00 -> 1\nReading downwards: .101₂\n\nCombined: 53.625₁₀ = 110101.101₂.',
          markingScheme: [
            'M1: Correct integer division = 110101',
            'M1: Correct fractional multiplication = .101',
            'A1: 110101.101₂'
          ]
        }
      ]
    }
  ]
};

export const KCSE_HISTORY: SubjectCourse = {
  id: 'hs-history',
  name: 'History & Government',
  title: 'History and Government (KNEC KCSE)',
  code: 'KCSE 311 / CBC Humanities',
  category: 'Humanities',
  level: 'highschool',
  badge: 'KICD Humanities Core',
  description:
    'Comprehensive Kenya National Curriculum (KICD/KNEC) History and Government covering Form 1 to Form 4: Early Man, Kenyan Communities up to 19th Century, National Integration, Democracy & Human Rights, Colonial Rule in Kenya, Struggle for Independence, Devolution & the 2010 Constitution, and World Wars & International Organizations.',
  learningOutcomes: [
    'Analyze archaeological evidence for the origin of early man in the East African Rift Valley.',
    'Examine migration, settlement, and social/economic organization of Kenyan linguistic groups.',
    'Trace constitutional development from the colonial era through 1963 independence to the 2010 Constitution.',
    'Explain the structure and functions of the three arms of Kenyan government: Legislature, Executive, and Judiciary.',
    'Evaluate county governance, revenue sharing, and principles of public participation under the devolved system.'
  ],
  topics: [
    {
      id: 'hist-f1-t1',
      title: 'Introduction to History, Early Man & Kenyan Communities to 19th Century',
      formOrYear: 'Form 1',
      subtopics: ['Sources of history: oral traditions, archaeology, written sources, linguistics', 'Evolution of early man: Australopithecus, Homo habilis, Homo erectus, Homo sapiens; Olduvai Gorge and Koobi Fora discoveries', 'Migration and settlement of Kenyan communities: Bantu, Nilotes, Cushites', 'Socio-economic and political organization of traditional Kenyan societies (Agikuyu, Ameru, Luo, Maasai, Borana, Mijikenda)'],
      theoryOverview:
        'Kenya and the East African Rift Valley are internationally recognized as the Cradle of Humankind due to fossil hominid discoveries by Louis and Mary Leakey and Richard Leakey at Koobi Fora (Lake Turkana), Olorgesailie, and Rusinga Island. Pre-colonial Kenyan societies operated decentralized or age-set based governance with rich customary dispute resolution mechanisms.',
      kenyanApplication: 'Archaeological heritage preserved at the National Museums of Kenya and World Heritage prehistoric sites.',
      examTips: 'KNEC examiners often ask candidates to state advantages and limitations of oral tradition as a historical source.'
    },
    {
      id: 'hist-f2-t1',
      title: 'Trade, Transport, Communication & Democracy in Kenya',
      formOrYear: 'Form 2',
      subtopics: ['Trans-Saharan trade and Indian Ocean trade (monsoon winds, dhows, commodities, Swahili city-states)', 'Industrial revolution in Europe and factors leading to European colonization of Africa', 'Concept of citizenship, rights, freedoms, and civic responsibilities in Kenya', 'Democracy: direct vs indirect democracy, principles of democratic governance', 'Human rights: Universal Declaration of Human Rights and Kenya Bill of Rights (Chapter 4 of 2010 Constitution)'],
      theoryOverview:
        'The Indian Ocean trade connected coastal Kenya to Arabia, Persia, India, and China, leading to the rise of Islamic coastal city-states (Mombasa, Kilwa, Malindi, Lamu) and the development of the Kiswahili language. The Kenyan 2010 Constitution enshrines an expansive Bill of Rights guaranteeing socio-economic and political entitlements.',
      kenyanApplication: 'Fort Jesus historic landmark; Kenya National Commission on Human Rights (KNCHR) oversight.',
      examTips: 'Memorize the core provisions of the Bill of Rights in the 2010 Constitution: right to life, equality, human dignity, privacy, fair trial, and economic-social rights (health, education, clean environment).'
    },
    {
      id: 'hist-f3-t1',
      title: 'Colonial Administration, Resistance & Collaboration in Kenya',
      formOrYear: 'Form 3',
      subtopics: ['Scramble and partition of East Africa: Berlin Conference (1884-1885)', 'British establishment of colonial rule in Kenya: IBEAC Company, declaring the East Africa Protectorate (1895)', 'African responses: Armed resistance (Nandi under Koitalel arap Samoei, Giriama under Mekatilili wa Menza, Bukusu) vs Collaboration (Mumias of Wanga, Maasai under Lenana)', 'Colonial economic policies: land alienation, white highlands, hut and poll taxes, Kipande registration system, forced labor', 'Colonial social policies: education, health, racial segregation'],
      theoryOverview:
        'British colonial imposition triggered diverse African responses. The Nandi sustained active military resistance for over a decade (1895-1905) utilizing guerrilla tactics in rugged terrain. The 1904 and 1911 Anglo-Maasai treaties alienated high-potential grazing lands (Laikipia and Rift Valley) to European settlers.',
      kenyanApplication: 'Historical land injustice investigations by the National Land Commission (NLC).',
      examTips: 'Explain reasons for Nandi resistance: defense of political independence, protection of ancestral grazing lands, military confidence, and the Orkoiyot’s prophecy warning of an iron snake (railway).'
    },
    {
      id: 'hist-f4-t1',
      title: 'The 2010 Constitution, Devolved Government & Electoral Process',
      formOrYear: 'Form 4',
      subtopics: ['Features of the 2010 Kenyan Constitution: Sovereignty of the people, Supremacy of the Constitution', 'The three arms of national government: Legislature (National Assembly & Senate), Executive (President, Deputy President, Cabinet), Judiciary (Supreme Court, Court of Appeal, High Court, subordinate courts)', 'Devolution: 47 County Governments, County Assembly, County Executive Committee, Council of Governors', 'Independent commissions: IEBC, SRC, TSC, CRA, JSC', 'Public finance: Equalization fund, equitable share, County revenue allocation'],
      theoryOverview:
        'The Constitution of Kenya 2010 restructured governance from a highly centralized presidency to a two-tier devolved system consisting of the National Government and 47 County Governments. Devolution decentralizes resources, promotes equitable regional development, and guarantees citizen participation in decision making.',
      kenyanApplication: 'Devolved health centers, county roads, and local agriculture managed by County Governors across all 47 counties.',
      examTips: 'Differentiate between the National Assembly (represents constituencies, passes national legislation, approves national budget) and the Senate (protects interests of counties and their governments).'
    }
  ],
  practicals: [],
  exams: [
    {
      id: 'kcse-hist-mock-p1',
      title: 'KCSE History and Government Paper 1',
      paperCode: '311/1',
      durationMinutes: 150,
      totalMarks: 100,
      instructions: [
        'Write your name and index number in the spaces provided.',
        'This paper consists of three sections: A (25 marks), B (45 marks), and C (30 marks).',
        'Answer all questions in Section A, three questions from Section B, and two questions from Section C.'
      ],
      questions: [
        {
          id: 'hist-q1',
          questionNumber: 1,
          questionText: 'State two archaeological sites in Kenya where remains of Australopithecus have been discovered.',
          marks: 2,
          sampleAnswer: '1. Koobi Fora (near Lake Turkana)\n2. Olorgesailie\n3. Rusinga Island\n4. Fort Ternan',
          markingScheme: [
            'Award 1 mark each for any two correct sites (Max 2 marks)'
          ]
        }
      ]
    }
  ]
};

export const HIGH_SCHOOL_COURSES: SubjectCourse[] = [
  KCSE_BIOLOGY,
  KCSE_CHEMISTRY,
  KCSE_PHYSICS,
  KCSE_MATHEMATICS,
  KCSE_AGRICULTURE,
  KCSE_GEOGRAPHY,
  KCSE_BUSINESS_STUDIES,
  KCSE_COMPUTER_STUDIES,
  KCSE_HISTORY
];
