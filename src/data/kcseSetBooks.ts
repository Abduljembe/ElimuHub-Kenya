export interface SetBookChapter {
  title: string;
  summary: string;
  keyEvents: string[];
}

export interface CharacterProfile {
  name: string;
  role: string;
  traits: string[];
  significance: string;
}

export interface SetBookEssay {
  question: string;
  yearTested?: string;
  suggestedPoints: string[];
  markingAdvice: string;
}

export interface SetBookItem {
  id: string;
  title: string;
  author: string;
  genre: 'Play / Tamthilia' | 'Novel / Riwaya' | 'Short Story Anthology' | 'Oral Literature / Fasihi';
  language: 'English' | 'Kiswahili';
  curriculumCode: string;
  overview: string;
  setting: string;
  majorThemes: {
    theme: string;
    description: string;
    textualEvidence: string[];
  }[];
  characters: CharacterProfile[];
  stylisticDevices: {
    device: string;
    explanation: string;
    example: string;
  }[];
  sampleEssays: SetBookEssay[];
}

export const KCSE_SET_BOOKS: SetBookItem[] = [
  // 1. THE SAMARITAN (Play)
  {
    id: 'the-samaritan',
    title: 'The Samaritan',
    author: 'John Lara',
    genre: 'Play / Tamthilia',
    language: 'English',
    curriculumCode: 'KCSE 101/3 English Compulsory Play',
    overview:
      'The Samaritan dramatizes systemic corruption, abuse of power, environmental degradation, and the redemptive potential of youth-led digital technology in the fictional Maracas Municipality. Two high school students, Alvita and Montano, create a civic whistleblowing mobile app called "The Samaritan", which exposes the illicit embezzlement of public funds by Mayor Mossi-oa-Tunya and his municipal council cabal.',
    setting: 'Maracas Municipality, Maracas Municipal Council Headquarters, Sagrada Secondary School.',
    majorThemes: [
      {
        theme: 'Corruption, Greed and Embezzlement of Public Resources',
        description:
          'Public officials prioritize personal enrichment through procurement scandals, ghost worker payrolls, and inflated tenders at the expense of municipal service delivery.',
        textualEvidence: [
          'Mayor Mossi admits to inflating project costs, running substandard road projects, and taking kickbacks from municipal contractors.',
          'Inspector Bembe operates corrupt extortion checkpoints and abuses state police machinery to intimidate whistleblowers.',
          'Ted King and Seymour finance municipal elections through proceeds of drug peddling and supply contract kickbacks.'
        ]
      },
      {
        theme: 'Youth Empowerment and Technological Innovation',
        description:
          'Young learners utilize digital platforms to promote transparency, hold corrupt leaders accountable, and mobilize civic consciousness.',
        textualEvidence: [
          'Alvita and Montano develop "The Samaritan" mobile application with the guidance of their ethical teacher, Nicole.',
          'The mobile application goes viral, enabling ordinary Maracas citizens to upload documentary evidence of municipal corruption.'
        ]
      },
      {
        theme: 'Misuse of Power, Tyranny and Intimidation',
        description:
          'Leaders employ legal harassment, arbitrary arrests, and fabricated criminal charges to silence critics and maintain political hegemony.',
        textualEvidence: [
          'Inspector Bembe and Mayor Mossi arrest Nicole on trumped-up charges of inciting public unrest when she refuses to pull down the app.',
          'Mayor Mossi attempts to bribe Nicole with promotion to Director of Education in exchange for killing the app.'
        ]
      }
    ],
    characters: [
      {
        name: 'Nicole',
        role: 'Ethics and English/Literature teacher at Sagrada Secondary School',
        traits: ['Principled', 'Incorruptible', 'Courageous', 'Visionary'],
        significance:
          'Stands as the moral conscience of Maracas society. She mentors Alvita and Montano, rejects Mayor Mossi’s lucrative bribes, and fearlessly defends democratic accountability.'
      },
      {
        name: 'Mayor Mossi-oa-Tunya',
        role: 'Mayor of Maracas Municipality',
        traits: ['Corrupt', 'Paranoid', 'Vain', 'Dictatorial'],
        significance:
          'Embodiment of decayed municipal governance in Kenya and Africa. When threatened by the app, he attempts to pit council members against each other while plotting self-preservation.'
      },
      {
        name: 'Inspector Bembe',
        role: 'Municipal Police Inspector',
        traits: ['Brutal', 'Corrupt', 'Subservient', 'Superstitious'],
        significance:
          'Demonstrates how law enforcement agencies are weaponized by ruling elites to suppress legitimate democratic dissent.'
      },
      {
        name: 'Alvita & Montano',
        role: 'Students at Sagrada Secondary School',
        traits: ['Intelligent', 'Creative', 'Civically conscious', 'Resilient'],
        significance:
          'Represent the progressive young generation capable of utilizing technology to liberate society from historical bad governance.'
      }
    ],
    stylisticDevices: [
      {
        device: 'Dramatic Irony',
        explanation: 'The municipal leaders hold secret meetings plotting to dismantle the app without realizing that their crimes have already been recorded and uploaded.',
        example: 'Mayor Mossi’s councilors plot to impeach him while Mossi simultaneously plots to have them arrested.'
      },
      {
        device: 'Symbolism',
        explanation: 'The name "The Samaritan" evokes the biblical parable of the Good Samaritan rescuing a dying traveler.',
        example: 'The app symbolizes civic intervention to rescue Maracas Municipality from the clutches of greedy municipal thieves.'
      },
      {
        device: 'Satire and Humour',
        explanation: 'John Lara uses biting political satire to ridicule African political leaders who celebrate hollow awards while their municipalities crumble.',
        example: 'The lavish municipal celebration of the education award contrasts starkly with the stinking garbage heaps and broken roads of Maracas.'
      }
    ],
    sampleEssays: [
      {
        question:
          'Using illustrations from John Lara’s play "The Samaritan", write an essay explaining how technological innovation can be harnessed to combat bad governance in developing societies.',
        yearTested: 'KCSE Standard Mock',
        suggestedPoints: [
          'Introduction: Define technology as an equalizer and state thesis that digital tools dismantle state secrecy and empower citizens.',
          'Point 1: Alvita and Montano build The Samaritan app to document municipal graft and tender scams.',
          'Point 2: Citizens anonymously upload photographic and receipt evidence of ghost projects, bypassing corrupt police checkpoints.',
          'Point 3: The viral nature of the application thwarts Mayor Mossi’s attempt to ban or censor the investigation.',
          'Point 4: International anti-corruption agencies and the Anti-Corruption Bureau utilize the crowdsourced data to arrest corrupt officials.',
          'Conclusion: Reiterate that digital transparency is the ultimate antidote to autocratic municipal decay.'
        ],
        markingAdvice:
          'KNEC awards 3 marks for introduction, 12 marks for 4 well-illustrated body paragraphs with textual evidence, 2 marks for conclusion, and 3 marks for grammatical competence.'
      }
    ]
  },

  // 2. FATHERS OF NATIONS (Novel)
  {
    id: 'fathers-of-nations',
    title: 'Fathers of Nations',
    author: 'Paul B. Vitta',
    genre: 'Novel / Riwaya',
    language: 'English',
    curriculumCode: 'KCSE 101/3 English Compulsory Novel',
    overview:
      'Set against the backdrop of an African Union summit in Banjul, The Gambia, Fathers of Nations critiques post-colonial African political leadership, neo-colonial economic dependency, and intellectual disillusionment. Fifty heads of state gather to ratify "Way Omega", a neoliberal development blueprint favored by Western donors, while a covert underground movement lobbies for "Path Alpha", a citizen-centric, democratic alternative.',
    setting: 'The Pinnacle Hotel, Banjul, The Gambia; Nairobi, Kenya; Harare, Zimbabwe; Lagos, Nigeria.',
    majorThemes: [
      {
        theme: 'Poor Leadership and African Summit Politics',
        description:
          'African summits are satirized as theatrical gatherings of aging, narcissistic autocrats preoccupied with ceremonial protocols and lavish catering rather than tackling poverty and disease.',
        textualEvidence: [
          'Heads of state squabble over conference seating arrangements and minor protocol details while critical continental crises remain unaddressed.',
          'President Didomba and Chairman of the Summit manipulate procedures to silence reform-minded delegates.'
        ]
      },
      {
        theme: 'Disillusionment of the African Intellectual Class',
        description:
          'Educated scholars, doctors, and engineers are sidelined, impoverished, or persecuted by military regimes and political sycophants.',
        textualEvidence: [
          'Dr. Abiola Afolabi suffers public humiliation despite writing books advising the continent on economic integration.',
          'Professor Kimani loses his daughter in an avoidable road accident caused by reckless police driving, and his wife leaves him due to poverty caused by university salary cuts.',
          'Engineer Tahir has his eye gouged out in Libya during ideological political disputes.'
        ]
      },
      {
        theme: 'Citizen Agency vs Bureaucratic Imperialism',
        description:
          'The confrontation between donor-driven blueprints ("Way Omega") and homegrown progressive development ("Path Alpha").',
        textualEvidence: [
          'The Agency for Governance in Africa (AGDA) covertly mobilizes aggrieved citizens across different African nations to introduce Path Alpha to the summit.',
          'Mr. Longway guides the four core aggrieved professionals to challenge the monolithic summit consensus.'
        ]
      }
    ],
    characters: [
      {
        name: 'Professor Karanja Kimani',
        role: 'Former Economics lecturer at the University of Nairobi',
        traits: ['Intellectual', 'Grief-stricken', 'Resilient', 'Principled'],
        significance:
          'Represents Kenyan and African university scholars whose professional dignity is crushed by state underfunding, low pay, and systemic impunity.'
      },
      {
        name: 'Dr. Abiola Afolabi',
        role: 'Nigerian scholar and author of Way Omega advisory papers',
        traits: ['Eloquent', 'Pragmatic', 'Conflicted', 'Insightful'],
        significance:
          'Demonstrates the dilemma of African technocrats co-opted by state machinery who eventually realize the emptiness of bureaucratic declarations.'
      },
      {
        name: 'Comrade Melusi',
        role: 'Zimbabwean former liberation war combatant',
        traits: ['Patriotic', 'Disillusioned', 'Vengeful', 'Determined'],
        significance:
          'Symbolizes the betrayal of freedom fighters by post-independence African dictators who hijacked the liberation struggle for personal dynasty.'
      },
      {
        name: 'Fiona McKenzie',
        role: 'Investigative journalist with the Voice of America (VOA)',
        traits: ['Persistent', 'Inquisitive', 'Fearless', 'Professional'],
        significance:
          'Provides an objective media perspective probing behind the closed-door hypocrisies of African summit diplomacy.'
      }
    ],
    stylisticDevices: [
      {
        device: 'Flashback',
        explanation: 'Vitta employs extensive flashbacks to recount how each of the four Path Alpha delegates experienced personal tragedies in Kenya, Nigeria, Zimbabwe, and Libya.',
        example: 'Kimani’s recollection of his daughter Ruth’s fatal accident and his subsequent imprisonment for confronting MP Waluke.'
      },
      {
        device: 'Satire',
        explanation: 'The grandiose names and eccentric antics of heads of state are mocked to reveal the intellectual bankruptcy of the summit.',
        example: 'The "Method of the Coin" used by summits to break diplomatic deadlocks through a literal coin toss.'
      }
    ],
    sampleEssays: [
      {
        question:
          'Drawing illustrations from Paul B. Vitta’s novel "Fathers of Nations", write an essay showing how citizens in post-colonial Africa suffer from poor political governance.',
        yearTested: 'KCSE 101/3 Standard Prompt',
        suggestedPoints: [
          'Introduction: Poor governance inflicts profound social, economic, and psychological pain on ordinary African citizens.',
          'Point 1: Loss of human life and breakdown of public safety (Kimani’s daughter killed in a road accident caused by police recklessness).',
          'Point 2: Economic hardship and neglect of academia (university professors unpaid, leading to brain drain and family disintegration).',
          'Point 3: Political betrayal of liberation veterans (Comrade Melusi discarded into shanties while rulers hoard wealth).',
          'Point 4: Intolerance to free speech and bodily maiming (Engineer Tahir loses an eye in Libya for questioning orthodoxy).',
          'Conclusion: Reiterate that African development remains paralyzed until leaders replace self-interest with servant governance.'
        ],
        markingAdvice:
          'Focus on specific character actions. Ensure every point directly ties back to "suffering of ordinary citizens".'
      }
    ]
  },

  // 3. BEMBEA YA MAISHA (Tamthilia ya Kiswahili)
  {
    id: 'bembea-ya-maisha',
    title: 'Bembea ya Maisha',
    author: 'Timothy Arege',
    genre: 'Play / Tamthilia',
    language: 'Kiswahili',
    curriculumCode: 'KCSE 102/3 Fasihi ya Kiswahili Tamthilia Teule',
    overview:
      'Bembea ya Maisha ni tamthilia inayochambua mabadiliko ya kijamii, ndoa, migogoro ya kifamilia, nafasi ya mtoto wa kike, na changamoto za mfumo wa afya nchini Kenya. Maisha yanafananishwa na bembea—yenye kupanda juu na kushuka chini, yakiwa na furaha na huzuni. Yona na Sara wanapitia ndoa yenye changamoto za ulevi, ugonjwa na ukosefu wa mtoto wa kiume, lakini binti zao (Neema, Asna na Salome) wanathibitisha kuwa mtoto wa kike ni nguzo thabiti ya jamii.',
    setting: 'Kijijini na Mjini (Hospitalini na Nyumbani kwa Neema).',
    majorThemes: [
      {
        theme: 'Ubadilikaji wa Maisha (Falsafa ya Bembea)',
        description: 'Maisha hayasimami sehemu moja; leo unaweza kuwa juu kwenye kilele cha mafanikio na kesho ukashuka kwenye majaribu na masaibu.',
        textualEvidence: [
          'Yona alikuwa mwalimu mwenye hadhi na heshima lakini alipotumbukia kwenye ulevi alipoteza kazi na heshima.',
          'Sara alidharauliwa kijijini kwa kutopata watoto wa kiume, lakini baadaye binti zake ndio wanaomgharamia matibabu hospitalini.'
        ]
      },
      {
        theme: 'Nafasi ya Mtoto wa Kike na Elimu',
        description: 'Tamthilia inapinga mila potofu zinazomdhalilisha mtoto wa kike na kuonyesha kuwa elimu ya mtoto wa kike inaiokoa familia nzima.',
        textualEvidence: [
          'Wanakijiji walimkejeli Sara wakidai "amezaa tu wasichana", lakini Neema anapata kazi nzuri serikalini mjini na kuwa tegemeo kuu.',
          'Neema anagharamia matibabu ya mama yake katika hospitali za kisasa mjini na kuwasaidia wazazi wake kurejesha furaha.'
        ]
      },
      {
        theme: 'Changamoto za Ndoa na Ulevi',
        description: 'Ndoa inahitaji uvumilivu, msamaha na maelewano. Ulevi unaharibu uchumi wa familia na amani ya nyumbani.',
        textualEvidence: [
          'Yona anaposhindwa kuhimili shinikizo la wanakijiji kuhusu ukosefu wa mrithi wa kiume, anazama kwenye ulevi na kumpiga Sara.',
          'Sara anavumilia mateso hayo kwa heshima na mapenzi hadi Yona anapozinduka na kutubu makosa yake.'
        ]
      }
    ],
    characters: [
      {
        name: 'Sara',
        role: 'Mama mzazi wa Neema, Asna na Salome; mke wa Yona',
        traits: ['Mvumilivu', 'Mwenye upendo', 'Mcha Mungu', 'Mwenye busara'],
        significance:
          'Kielelezo cha mwanamke wa Kiafrika anayevumilia dhiki za ndoa na maradhi ya moyo, huku akiwawezesha wanawe kufikia upeo wa juu kimasomo.'
      },
      {
        name: 'Yona',
        role: 'Mume wa Sara na mwalimu mstaafu',
        traits: ['Mwenye majuto', 'Mwenye hasira za haraka hapo awali', 'Mwenye mapenzi ya dhati baada ya kuzinduka'],
        significance:
          'Anadhihirisha jinsi shinikizo za kiutamaduni zinavyoweza kumpelekea mwanamume mzuri kuingia kwenye janga la ulevi, na uwezekano wa kujirekebisha (reformation).'
      },
      {
        name: 'Neema',
        role: 'Kifungua mimba wa Yona na Sara; mke wa Bunju',
        traits: ['Mwenye bidii', 'Mwajibikaji', 'Mwenye shukrani', 'Mlezi'],
        significance:
          'Kielelezo cha mwanamke msomi na kiongozi anayewajibika kwa familia yake ya uzazi bila kuvunja ndoa yake mjini.'
      },
      {
        name: 'Bunju',
        role: 'Mume wa Neema',
        traits: ['Mchumi thabiti', 'Mwenye msimamo', 'Mwajibikaji'],
        significance:
          'Anaakisi migogoro ya ndoa za kisasa mjini, akisisitiza matumizi ya busara ya fedha na upangaji wa bajeti ya familia.'
      }
    ],
    stylisticDevices: [
      {
        device: 'Tashbihi na Jazanda (Metaphor of the Swing)',
        explanation: 'Jina "Bembea ya Maisha" ni jazanda kuu inayoashiria panda-shuka za maisha ya binadamu.',
        example: 'Yona anasema bembea inapopanda juu usijisahau maana lazima itarudi chini.'
      },
      {
        device: 'Methali na Nahau',
        explanation: 'Mwandishi anatumia methali za Kiswahili kuongeza uzito wa kimaadili na kutoa mawaidha.',
        example: '"Mvumilivu hula mbivu" na "Mtoto wa kike ni sawa na mtoto wa kiume".'
      }
    ],
    sampleEssays: [
      {
        question:
          'Jadili dhana ya bembea kama inavyojitokeza katika tamthilia ya "Bembea ya Maisha" ya Timothy Arege.',
        yearTested: 'Mtihani wa Kitaifa wa KCSE 102/3',
        suggestedPoints: [
          'Utangulizi: Fafanua maana ya bembea na ueleze jinsi inavyoashiria hali ya mabadiliko maishani (furaha na huzuni).',
          'Hoja 1: Hali ya Yona - kutoka kuwa mwalimu aliyeheshimika, kuingia ulevini, hadi kurejesha heshima uzeeni.',
          'Hoja 2: Hali ya Sara - kutoka mwanamke aliyedharauliwa kwa kuzaa wasichana pekee hadi kuwa mama anayegharamiwa na wasomi wake.',
          'Hoja 3: Hali ya afya - Sara alikuwa mwenye nguvu za kulima lakini baadaye anaugua ugonjwa sugu unaompeleka hospitalini mjini.',
          'Hoja 4: Hali ya Neema na Bunju - kusaidiwa na wazazi hapo awali na sasa wao ndio wanaosaidia vizazi vilivyotangulia.',
          'Hitimisho: Toa msimamo thabiti kwamba maisha ni mzunguko na binadamu hapaswi kukata tamaa.'
        ],
        markingAdvice:
          'Mtahiniwa azingatie utaratibu wa KNSE: Utangulizi (alama 2), Hoja 4 zenye ushahidi mwafaka (alama 4 kila moja = 16), na Hitimisho (alama 2). Jumla alama 20.'
      }
    ]
  },

  // 4. CHOZI LA HERI (Riwaya ya Kiswahili)
  {
    id: 'chozi-la-heri',
    title: 'Chozi la Heri',
    author: 'Assumpta K. Matei',
    genre: 'Novel / Riwaya',
    language: 'Kiswahili',
    curriculumCode: 'KCSE 102/3 Fasihi ya Kiswahili Riwaya Teule',
    overview:
      'Chozi la Heri ni riwaya inayomulika madhara ya vita vya baada ya uchaguzi mkuu, ukabila, ubomoaji wa makazi duni, biashara haramu ya watoto, na uthabiti wa wakimbizi wa ndani kwa ndani (IDPs). Licha ya maafa na masaibu makubwa, wahusika wakuu kama Ridhaa, Mwangeka, na Umu wanajikwamua kupitia elimu, msamaha na mshikamano wa kitaifa, wakibadilisha machozi ya huzuni kuwa machozi ya heri.',
    setting: 'Nchi ya Wahafidhina, Msitu wa Mamba, Kijiji cha Tuwache, Kaunti ya Chencheo.',
    majorThemes: [
      {
        theme: 'Athari za Ukabila na Vita vya Baada ya Uchaguzi',
        description: 'Ukabila unasababisha umwagikaji wa damu, uchomaji wa mali, vifo vya watoto na wazazi, na kulazimu maelfu ya wananchi kutorokea kambi za wakimbizi.',
        textualEvidence: [
          'Familia ya Ridhaa (mke wake Terry na wanawe Tila na Dick) inachomwa moto ndani ya jumba lao la kifahari na magenge ya kikabila.',
          'Wakazi wa mtaa wa Tuwache wanakimbilia msitu wa Mamba wakiwa hawana chakula wala mavazi baada ya nyumba zao kuteketezwa.'
        ]
      },
      {
        theme: 'Uvumilivu, Matumaini na Upatanisho',
        description: 'Binadamu hawezi kushindwa na dhiki za maisha iwapo atadumisha tumaini la kesho na kuwa tayari kusamehe maadui zake.',
        textualEvidence: [
          'Ridhaa anasimama kidete, anajenga upya maisha yake, na kuasili watoto mayatima waliopoteza wazazi vitani.',
          'Mwangeka na Apondi wanakumbatia watoto wa makabila mbalimbali na kuwaelimisha bila ubaguzi.'
        ]
      }
    ],
    characters: [
      {
        name: 'Ridhaa',
        role: 'Mhusika mkuu; daktari na mkulima mashuhuri',
        traits: ['Mvumilivu', 'Mkarimu', 'Mwenye msamaha', 'Jasiri'],
        significance:
          'Kielelezo cha mwananchi anayepoteza kila kitu kutokana na wimbi la ukabila lakini anachagua kupenda na kujenga upya jamii badala ya kulipiza kisasi.'
      },
      {
        name: 'Mwangeka',
        role: 'Mwanawe Ridhaa na ofisa mkuu wa jeshi la anga',
        traits: ['Mzalendo', 'Mwenye mapenzi ya dhati', 'Mwajibikaji'],
        significance:
          'Anawakilisha wanajeshi wazalendo wanaojitolea kulinda taifa na kuishi maisha ya uadilifu na utu.'
      },
      {
        name: 'Umu',
        role: 'Binti aliyenusurika kwenye mateso ya unyanyasaji wa watoto',
        traits: ['Mwenye bidii kimasomo', 'Mwenye ndoto kubwa', 'Mwenye shukrani'],
        significance:
          'Kielelezo cha watoto wa kike wanaoshinda dhiki za ubakaji na kutelekezwa na hatimaye kufanikiwa kupitia elimu.'
      }
    ],
    stylisticDevices: [
      {
        device: 'Sadfa (Coincidence)',
        explanation: 'Wahusika waliotengana katika misukosuko ya vita wanakutana miaka kadhaa baadaye katika mazingira yasiyotarajiwa.',
        example: 'Ridhaa anakutana na Mwangeka na watoto waliookolewa msituni wakiwa sasa wamebalehe na kujiunga na vyuo vikuu.'
      },
      {
        device: 'Mbinu Rejeshi (Flashback)',
        explanation: 'Kurejelea maisha ya amani kabla ya wanasiasa kupanda mbegu za chuki na uchaguzi mkuu.',
        example: 'Ridhaa anakumbuka siku aliyomwoa Terry na furaha ya watoto wao wakicheza bustanini kabla ya moto kuwateketeza.'
      }
    ],
    sampleEssays: [
      {
        question:
          'Ukabila ni donda ndugu linaloangamiza nchi nyingi barani Afrika. Thibitisha kauli hii kwa kurejelea riwaya ya "Chozi la Heri" ya Assumpta K. Matei.',
        yearTested: 'Mtihani wa Kitaifa wa KCSE 102/3',
        suggestedPoints: [
          'Utangulizi: Eleza maana ya ukabila na jinsi unavyosambaratisha umoja na maisha ya raia nchini Wahafidhina.',
          'Hoja 1: Mauaji ya kinyama ya familia ya Ridhaa nyumbani mwao bila kosa lolote ila kabila lao.',
          'Hoja 2: Kuharibiwa na kuporwa kwa mali za kibiashara na vibanda vya wananchi wa jamii ya wahamiaji.',
          'Hoja 3: Kutengana kwa familia na watoto kuwa mayatima wasio na wazazi msituni Mamba.',
          'Hoja 4: Mdororo wa kiuchumi na kusambaratika kwa sekta ya kilimo na utalii kutokana na machafuko.',
          'Hitimisho: Toa wito kwa jamii kuwachagua viongozi kwa misingi ya sera na utu badala ya koo na makabila.'
        ],
        markingAdvice:
          'Tathmini ushahidi wa mtahiniwa unaotoka riwayani. Mtindo wa kuorodhesha bila aya unapoteza alama za mtiririko.'
      }
    ]
  }
];
