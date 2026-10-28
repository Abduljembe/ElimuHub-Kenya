export interface NounClassItem {
  ngeli: string;
  nominoMfano: string[];
  kiambishiUpatanishoUmoja: string;
  kiambishiUpatanishoWingi: string;
  sentensiMfanoUmoja: string;
  sentensiMfanoWingi: string;
  kanuniZaMtihani: string;
}

export interface FasihiSimuliziGenre {
  kipera: string;
  ufafanuzi: string;
  sifaKuu: string[];
  mifanoHalisiKenya: string[];
  umuhimuKijamii: string;
}

export interface UshairiRule {
  dhana: string;
  maelezo: string;
  mfano: string;
  mtegoWaMtihani: string;
}

export const NGELI_ZA_NOMINO: NounClassItem[] = [
  {
    ngeli: 'A - WA',
    nominoMfano: ['Mtu / Watu', 'Mwanafunzi / Wanafunzi', 'Kipepeo / Wipepeo', 'Kiongozi / Viongozi', 'Ng’ombe / Ng’ombe'],
    kiambishiUpatanishoUmoja: 'A - (Kitenzi), Yu - (Kivumishi kielekezi)',
    kiambishiUpatanishoWingi: 'WA -',
    sentensiMfanoUmoja: 'Mwanafunzi huyu anasoma kwa bidii.',
    sentensiMfanoWingi: 'Wanafunzi hawa wanasoma kwa bidii.',
    kanuniZaMtihani: 'Viumbe wote wenye uhai (hata wanyama na wadudu wenye kuanza na herufi K kama "Kipepeo", "Kiboko") huingizwa katika ngeli ya A-WA kwa upatanisho wa kisarufi (Kiboko huyu amekula, sio kiboko hiki!).'
  },
  {
    ngeli: 'KI - VI',
    nominoMfano: ['Kitabu / Vitabu', 'Kiti / Viti', 'Chakula / Vyakula', 'Kijiji / Vijiji', 'Chumba / Vyumba'],
    kiambishiUpatanishoUmoja: 'KI - (au CH- mbele ya irabu)',
    kiambishiUpatanishoWingi: 'VI - (au VY- mbele ya irabu)',
    sentensiMfanoUmoja: 'Chakula kitamu kimepikwa vizuri.',
    sentensiMfanoWingi: 'Vyakula vitamu vimepikwa vizuri.',
    kanuniZaMtihani: 'Pia hutumika kwa udogo wa nomino: e.g. Mlima -> Kilima, Mtoto -> Kitoto.'
  },
  {
    ngeli: 'LI - YA',
    nominoMfano: ['Jicho / Macho', 'Gari / Magari', 'Jani / Majani', 'Daraja / Madaraja', 'Barafu / Mabarafu'],
    kiambishiUpatanishoUmoja: 'LI -',
    kiambishiUpatanishoWingi: 'YA -',
    sentensiMfanoUmoja: 'Gari hili zuri limesafiri asubuhi.',
    sentensiMfanoWingi: 'Magari haya mazuri yamesafiri asubuhi.',
    kanuniZaMtihani: 'Hutumika pia kuonyesha ukubwa wa nomino: e.g. Nyumba -> Jumba (Jumba hili kubwa lilibomoka).'
  },
  {
    ngeli: 'I - ZI',
    nominoMfano: ['Nyumba / Nyumba', 'Nguo / Nguo', 'Kalamu / Kalamu', 'Sahani / Sahani', 'Redio / Redio'],
    kiambishiUpatanishoUmoja: 'I -',
    kiambishiUpatanishoWingi: 'ZI -',
    sentensiMfanoUmoja: 'Nyumba hii mpya imejengwa vizuri.',
    sentensiMfanoWingi: 'Nyumba hizi mpya zimejengwa vizuri.',
    kanuniZaMtihani: 'Nomino nyingi zisizobadilika maumbo katika umoja na wingi (zile zisizo na uhai) huwa katika ngeli hii.'
  },
  {
    ngeli: 'U - I',
    nominoMfano: ['Mti / Miti', 'Mkono / Mikono', 'Mto / Mito', 'Mswaki / Miswaki', 'Mlango / Milango'],
    kiambishiUpatanishoUmoja: 'U -',
    kiambishiUpatanishoWingi: 'I -',
    sentensiMfanoUmoja: 'Mti huu mrefu umeanguka.',
    sentensiMfanoWingi: 'Miti hii mirefu imeanguka.',
    kanuniZaMtihani: 'Hujumuisha miti, mimea na viungo vya mwili vinavyoanza na "M" katika umoja na "MI" katika wingi.'
  },
  {
    ngeli: 'U - YA',
    nominoMfano: ['Ugonjwa / Magonjwa', 'Upishi / Mapishi', 'Uhuru / Mahuru', 'Ulezi / Malezi'],
    kiambishiUpatanishoUmoja: 'U -',
    kiambishiUpatanishoWingi: 'YA -',
    sentensiMfanoUmoja: 'Ugonjwa huu mbaya umetibiwa.',
    sentensiMfanoWingi: 'Magonjwa haya mabaya yametibiwa.',
    kanuniZaMtihani: 'Nomino za hali au vitendo zianzazo na U katika umoja na kugeuka kuwa MA katika wingi.'
  },
  {
    ngeli: 'YA - YA',
    nominoMfano: ['Maji', 'Maziwa', 'Mafuta', 'Mavuta', 'Machozi'],
    kiambishiUpatanishoUmoja: 'YA -',
    kiambishiUpatanishoWingi: 'YA -',
    sentensiMfanoUmoja: 'Maji haya safi yametiririka mtoni.',
    sentensiMfanoWingi: 'Maji haya safi yametiririka mtoni.',
    kanuniZaMtihani: 'Nomino hizi hazina maumbo ya umoja wala wingi (mass nouns / majimaji). Huambatanishwa na kiambishi "YA" daima.'
  },
  {
    ngeli: 'KU',
    nominoMfano: ['Kusoma', 'Kuimba', 'Kucheza', 'Kula', 'Kusafiri'],
    kiambishiUpatanishoUmoja: 'KU -',
    kiambishiUpatanishoWingi: 'KU -',
    sentensiMfanoUmoja: 'Kusoma kwake kuzuri kumemletea ushindi.',
    sentensiMfanoWingi: 'Kusoma huku kumeleta mafanikio.',
    kanuniZaMtihani: 'Hii ni ngeli ya vitenzi-jina (infinitives zinazoanza na "ku-").'
  },
  {
    ngeli: 'PA - KU - MU',
    nominoMfano: ['Mahali (Pahali)', 'Kuhali', 'Mwahali'],
    kiambishiUpatanishoUmoja: 'PA (mahali dhahiri), KU (mahali kusikodhihirika), MU (ndani ya mahali)',
    kiambishiUpatanishoWingi: 'PA - KU - MU',
    sentensiMfanoUmoja: 'Hapa pamefagiliwa (PA); Kule kumesafishwa (KU); Mle mlimoingia mna giza (MU).',
    sentensiMfanoWingi: 'Pote, kote, mote panatunzwa.',
    kanuniZaMtihani: 'Ngeli pekee ya mahali. Watahiniwa wa KNEC hukosea kuchanganya "hapa panapendeza" na "kule kunapendeza".'
  }
];

export const FASIHI_SIMULIZI_GENRES: FasihiSimuliziGenre[] = [
  {
    kipera: 'Mighani (Epics / Heroic Legends)',
    ufafanuzi: 'Hadithi za kishujaa zinazohusu matendo makuu ya mashujaa wa kihistoria waliotetea au kuokoa jamii zao vitani au mikononi mwa majanga.',
    sifaKuu: [
      'Mhusika mkuu huwa na nguvu na uwezo usio wa kawaida (superhuman qualities).',
      'Huhusu matukio halisi ya kihistoria yaliyoongezewa chumvi au mambo ya ajabu.',
      'Mhusika hukabiliwa na kifo cha fumbo au usaliti kutoka kwa mtu wa karibu.',
      'Hukuza uzalendo, ujasiri na mshikamano wa kijamii.'
    ],
    mifanoHalisiKenya: [
      'Shujaa Luanda Magere (wa jamii ya Wajaluo - mwili wa jiwe, kivuli kikiwa udhaifu wake).',
      'Koitalel arap Samoei (kiongozi wa Wanandi aliyepinga ujenzi wa reli ya ukoloni).',
      'Mekatilili wa Menza (mwanamke shujaa wa Wagiriama aliyepinga utawala wa kikoloni Pwani).'
    ],
    umuhimuKijamii: 'Hujenga ari ya uzalendo, kuonyesha uongozi wa kiadili, na kuhifadhi historia ya vita na mapambano ya jamii.'
  },
  {
    kipera: 'Visasili (Myths)',
    ufafanuzi: 'Hadithi za kiimani zinazoelezea asili ya ulimwengu, jamii, kifo, jua, mwezi na mila na desturi za jamii husika.',
    sifaKuu: [
      'Wahusika wake wakuu huwa miungu, mizimu, au binadamu wa mwanzo kabisa.',
      'Huchukuliwa kama ukweli mtakatifu (sacred truth) na wanajamii husika.',
      'Hufafanua mambo yasiyoelezeka kisayansi kama vile asili ya kifo na tofauti ya koo.'
    ],
    mifanoHalisiKenya: [
      'Hadithi ya Gikuyu na Mumbi kuumbwa na Mwene Nyaga (Ngai) kule Mlima Kirinyaga.',
      'Asili ya moto na ng’ombe katika jamii ya Wamaasai kushushwa kutoka mbinguni kupitia kamba ya ngozi.'
    ],
    umuhimuKijamii: 'Huimarisha mshikamano wa kiimani, huunganisha vizazi na asili yao, na kuhalalisha utawala na desturi za kitamaduni.'
  },
  {
    kipera: 'Nyimbo za Kijadi (Traditional Songs)',
    ufafanuzi: 'Fasihi simulizi inayoambatana na sauti, mahadhi, ala za muziki na maneno yenye ujumbe maalum kulingana na shughuli ya kijamii.',
    sifaKuu: [
      'Huwa na mahadhi na urudiaji wa beti au viitikio (chorus).',
      'Huambatana na ala za asili kama vile ngoma, pembe, kayamba, na marimba.',
      'Huakisi hisia halisi za waimbaji (furaha, huzuni, uchungu au matumaini).'
    ],
    mifanoHalisiKenya: [
      'Nyiso: Nyimbo zinazoimbwa wakati wa jando, tohara na upashaji tohara wa vijana kuwapa ujasiri.',
      'Kimai / Wawe: Nyimbo zinazoimbwa na wakulima au wavuvi wakiwa kazini kupunguza uchovu na kuongeza kasi ya kazi.',
      'Bembea / Bembelezi: Nyimbo za kumnyamazisha au kumlaza mtoto (lullabies).',
      'Mbolezi: Nyimbo za maombolezo wakati wa msiba au kifo kuwaliwaza wafiwa.'
    ],
    umuhimuKijamii: 'Huchochea kazi (motivation), hutoa burudani, hufariji wakati wa dhiki, na kurithisha maadili ya utu.'
  }
];

export const USHAIRI_RULES: UshairiRule[] = [
  {
    dhana: 'Bahari za Ushairi kulingana na Idadi ya Mishororo',
    maelezo: 'Uainishaji wa mashairi kulingana na idadi ya mishororo katika kila ubeti:\n• Tathlitha: Mishororo 3 kila ubeti.\n• Tarbia: Mishororo 4 kila ubeti (ya kawaida zaidi katika KCSE).\n• Takhmisa: Mishororo 5 kila ubeti.\n• Sudusia: Mishororo 6 kila ubeti.',
    mfano: 'Shairi lenye mishororo 4 katika kila ubeti huitwa Tarbia. Mstari wa mwisho unaitwa Kibwagizo/Kituo.',
    mtegoWaMtihani: 'Kama kituo hakibadiliki shairi lote, huitwa "Kituo Kinachorudiwa"; kikiwa kinabadilika ubeti hadi ubeti huitwa "Kituo Kigeuzi".'
  },
  {
    dhana: 'Uhuru wa Mshairi (Poetic License)',
    maelezo: 'Mbinu za kiisimu anazotumia mshairi kukiuka kanuni za kawaida za sarufi ili kutosheleza arudhi ya vina na mizani:\n• Mazida: Kurefusha neno (e.g. "enda" kuwa "enenda").\n• Inkisari: Kufupisha neno (e.g. "yake" kuwa "ye", "sikiliza" kuwa "sikiza").\n• Tabdila: Kubadilisha herufi (e.g. "sitaki" kuwa "sitaye").\n• Kubadili Mpangilio wa Maneno (Inversion): e.g. badala ya "mtoto analia", anaandika "analia mtoto" ili kupata vina vya mwisho.',
    mfano: '"Nami ntasema" badala ya "Nami nitasema" (Huu ni ufupisho/Inkisari kuoanisha mizani 8).',
    mtegoWaMtihani: 'Mtahiniwa anapotaja uhuru wa mshairi, LAZIMA aonyeshe neno la asili na jinsi lilivyofupishwa au kurefushwa!'
  }
];
