import type { Reading, Verse, Word } from '@/services/readingService';

interface ReadingInput {
  name: string;
  description: string;
  category: string;
  arabic_text: string;
  transliteration: string;
  translation: string;
  verses: VerseInput[];
}

interface VerseInput {
  verse_number: number;
  arabic_text: string;
  transliteration: string;
  translation: string;
  meaning: string;
  words: WordInput[];
}

interface WordInput {
  arabic_text: string;
  transliteration: string;
  translation: string;
}

const readingsData: ReadingInput[] = [
  {
    name: 'Niat Sholat',
    description: 'Bermaksud karena Allah',
    category: 'pembukaan',
    arabic_text:
      '\u0623\u064f\u0635\u064e\u0644\u0650\u0651\u064a \u0641\u064e\u0631\u0652\u0636\u064e \u0627\u0644\u0635\u064f\u0651\u0628\u0652\u062d\u0650 \u0631\u064e\u0643\u0652\u0639\u064e\u062a\u064e\u064a\u0652\u0646\u0650 \u0645\u064f\u0633\u0652\u062a\u064e\u0642\u0652\u0628\u0650\u0644\u064e \u0627\u0644\u0652\u0642\u0650\u0628\u0652\u0644\u064e\u0629\u0650 \u0623\u064e\u062f\u064e\u0627\u0621\u064b \u0644\u0650\u0644\u064e\u0651\u0647\u0650 \u062a\u064e\u0639\u064e\u0627\u0644\u064e\u0649',
    transliteration:
      "Ushalli fardhash shubhi rak'ataini mustaqbilal qiblati adaa'an lillahi ta'ala",
    translation:
      "Aku niat sholat fardhu Subuh dua rakaat menghadap kiblat karena Allah Ta'ala",
    verses: [
      {
        verse_number: 1,
        arabic_text:
          '\u0623\u064f\u0635\u064e\u0644\u0650\u0651\u064a \u0641\u064e\u0631\u0652\u0636\u064e \u0627\u0644\u0635\u064f\u0651\u0628\u0652\u062d\u0650 \u0631\u064e\u0643\u0652\u0639\u064e\u062a\u064e\u064a\u0652\u0646\u0650 \u0645\u064f\u0633\u0652\u062a\u064e\u0642\u0652\u0628\u0650\u0644\u064e \u0627\u0644\u0652\u0642\u0650\u0628\u0652\u0644\u064e\u0629\u0650 \u0623\u064e\u062f\u064e\u0627\u0621\u064b \u0644\u0650\u0644\u064e\u0651\u0647\u0650 \u062a\u064e\u0639\u064e\u0627\u0644\u064e\u0649',
        transliteration:
          "Ushalli fardhash shubhi rak'ataini mustaqbilal qiblati adaa'an lillahi ta'ala",
        translation:
          "Aku niat sholat fardhu Subuh dua rakaat menghadap kiblat karena Allah Ta'ala",
        meaning: 'Niat sholat Subuh.',
        words: [
          { arabic_text: '\u0623\u064f\u0635\u064e\u0644\u0650\u0651\u064a', transliteration: 'Ushalli', translation: 'Aku niat sholat' },
          { arabic_text: '\u0641\u064e\u0631\u0652\u0636\u064e', transliteration: 'Fardha', translation: 'fardhu' },
          { arabic_text: '\u0627\u0644\u0635\u064f\u0651\u0628\u0652\u062d\u0650', transliteration: 'Ash-shubhi', translation: 'Subuh' },
          { arabic_text: '\u0631\u064e\u0643\u0652\u0639\u064e\u062a\u064e\u064a\u0652\u0646\u0650', transliteration: "Rak'ataini", translation: 'dua rakaat' },
          { arabic_text: '\u0645\u064f\u0633\u0652\u062a\u064e\u0642\u0652\u0628\u0650\u0644\u064e', transliteration: 'Mustaqbila', translation: 'menghadap' },
          { arabic_text: '\u0627\u0644\u0652\u0642\u0650\u0628\u0652\u0644\u064e\u0629\u0650', transliteration: 'Al-qiblati', translation: 'kiblat' },
          { arabic_text: '\u0623\u064e\u062f\u064e\u0627\u0621\u064b', transliteration: "Adaa'an", translation: 'dengan sungguh-sungguh' },
          { arabic_text: '\u0644\u0650\u0644\u064e\u0651\u0647\u0650', transliteration: 'Lillahi', translation: 'karena Allah' },
          { arabic_text: '\u062a\u064e\u0639\u064e\u0627\u0644\u064e\u0649', transliteration: "Ta'ala", translation: "Ta'ala" },
        ],
      },
    ],
  },
  {
    name: 'Takbiratul Ihram',
    description: 'Niat & Pembukaan',
    category: 'pembukaan',
    arabic_text: '\u0627\u0644\u0644\u064e\u0651\u0647\u064f \u0623\u064e\u0643\u0652\u0628\u064e\u0631\u064f',
    transliteration: 'Allahu Akbar',
    translation: 'Allah Maha Besar',
    verses: [],
  },
  {
    name: 'Doa Iftitah',
    description: 'Pujian Pembuka',
    category: 'pembukaan',
    arabic_text:
      '\u0633\u064f\u0628\u0652\u062d\u064e\u0627\u0646\u064e\u0643\u064e \u0627\u0644\u0644\u064e\u0651\u0647\u064f\u0645\u064e\u0651 \u0648\u064e\u0628\u0650\u062d\u064e\u0645\u0652\u062f\u0650\u0643\u064e \u0648\u064e\u062a\u064e\u0628\u064e\u0627\u0631\u064e\u0643\u064e \u0627\u0633\u0652\u0645\u064f\u0643\u064e \u0648\u064e\u062a\u064e\u0639\u064e\u0627\u0644\u064e\u0649 \u062c\u064e\u062f\u064f\u0651\u0643\u064e \u0648\u064e\u0644\u064e\u0627 \u0625\u0650\u0644\u064e\u0647\u064e \u063a\u064e\u064a\u0652\u0631\u064f\u0643\u064e',
    transliteration:
      "Subhanakallahumma wa bihamdika wa tabarakasmuka wa ta'ala jadduka wa la ilaha ghairuk",
    translation:
      "Maha Suci Engkau Ya Allah, dengan memuji-Mu, Maha Berkah Nama-Mu, Maha Tinggi Kemuliaan-Mu, tidak ada Tuhan selain Engkau",
    verses: [],
  },
  {
    name: "Ta'awudz",
    description: 'Mohon Perlindungan',
    category: 'pembukaan',
    arabic_text:
      '\u0623\u064e\u0639\u064f\u0648\u0630\u064f \u0628\u0650\u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0645\u0650\u0646\u064e \u0627\u0644\u0634\u064e\u0651\u064a\u0652\u0637\u064e\u0627\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062c\u0650\u064a\u0645\u0650',
    transliteration: "A'udzu billahi minasy syaithanir rajim",
    translation: 'Aku berlindung kepada Allah dari setan yang terkutuk',
    verses: [],
  },
  {
    name: 'Basmalah',
    description: 'Dengan Nama Allah',
    category: 'pembukaan',
    arabic_text:
      '\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650',
    transliteration: 'Bismillahirrahmanirrahim',
    translation: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang',
    verses: [],
  },
  {
    name: 'Al-Fatihah',
    description: 'Ummul Kitab',
    category: 'bacaan',
    arabic_text:
      '\u0627\u0644\u0652\u062d\u064e\u0645\u0652\u062f\u064f \u0644\u0650\u0644\u064e\u0651\u0647\u0650 \u0631\u064e\u0628\u0650\u0651 \u0627\u0644\u0652\u0639\u064e\u0627\u0644\u064e\u0645\u0650\u064a\u0646\u064e',
    transliteration: "Alhamdu lillahi rabbil 'alamin",
    translation: 'Segala puji bagi Allah, Tuhan semesta alam',
    verses: [
      {
        verse_number: 1,
        arabic_text:
          '\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650',
        transliteration: 'Bismillahirrahmanirrahim',
        translation: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang',
        meaning:
          'Ayat pembuka yang mengajarkan untuk memulai segala sesuatu dengan nama Allah.',
        words: [
          { arabic_text: '\u0628\u0650\u0633\u0652\u0645\u0650', transliteration: 'Bismi', translation: 'Dengan nama' },
          { arabic_text: '\u0627\u0644\u0644\u064e\u0651\u0647\u0650', transliteration: 'Allahi', translation: 'Allah' },
          {
            arabic_text: '\u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650',
            transliteration: 'Ar-Rahmani',
            translation: 'Yang Maha Pengasih',
          },
          {
            arabic_text: '\u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650',
            transliteration: 'Ar-Rahimi',
            translation: 'Yang Maha Penyayang',
          },
        ],
      },
      {
        verse_number: 2,
        arabic_text:
          '\u0627\u0644\u0652\u062d\u064e\u0645\u0652\u062f\u064f \u0644\u0650\u0644\u064e\u0651\u0647\u0650 \u0631\u064e\u0628\u0650\u0651 \u0627\u0644\u0652\u0639\u064e\u0627\u0644\u064e\u0645\u0650\u064a\u0646\u064e',
        transliteration: "Alhamdu lillahi rabbil 'alamin",
        translation: 'Segala puji bagi Allah, Tuhan semesta alam',
        meaning:
          'Pujian sempurna hanya milik Allah, penguasa dan pemelihara seluruh alam.',
        words: [
          { arabic_text: '\u0627\u0644\u0652\u062d\u064e\u0645\u0652\u062f\u064f', transliteration: 'Alhamdu', translation: 'Segala puji' },
          { arabic_text: '\u0644\u0650\u0644\u064e\u0651\u0647\u0650', transliteration: 'Lillahi', translation: 'Bagi Allah' },
          { arabic_text: '\u0631\u064e\u0628\u0650\u0651', transliteration: 'Rabbil', translation: 'Tuhan' },
          {
            arabic_text: '\u0627\u0644\u0652\u0639\u064e\u0627\u0644\u064e\u0645\u0650\u064a\u0646\u064e',
            transliteration: "Al-'alamin",
            translation: 'Semesta alam',
          },
        ],
      },
      {
        verse_number: 3,
        arabic_text:
          '\u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650',
        transliteration: 'Arrahmanirrahim',
        translation: 'Yang Maha Pengasih lagi Maha Penyayang',
        meaning:
          'Allah memiliki sifat kasih sayang yang meliputi seluruh ciptaan-Nya.',
        words: [
          {
            arabic_text: '\u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650',
            transliteration: 'Ar-Rahmani',
            translation: 'Yang Maha Pengasih',
          },
          {
            arabic_text: '\u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650',
            transliteration: 'Ar-Rahimi',
            translation: 'Yang Maha Penyayang',
          },
        ],
      },
      {
        verse_number: 4,
        arabic_text:
          '\u0645\u064e\u0627\u0644\u0650\u0643\u0650 \u064a\u064e\u0648\u0652\u0645\u0650 \u0627\u0644\u062f\u0650\u0651\u064a\u0646\u0650',
        transliteration: 'Maliki yawmiddin',
        translation: 'Yang menguasai hari pembalasan',
        meaning:
          'Allah adalah satu-satunya penguasa di hari kiamat nanti.',
        words: [
          { arabic_text: '\u0645\u064e\u0627\u0644\u0650\u0643\u0650', transliteration: 'Maliki', translation: 'Yang menguasai' },
          { arabic_text: '\u064a\u064e\u0648\u0652\u0645\u0650', transliteration: 'Yawmi', translation: 'Hari' },
          { arabic_text: '\u0627\u0644\u062f\u0650\u0651\u064a\u0646\u0650', transliteration: 'Ad-Dini', translation: 'Pembalasan' },
        ],
      },
      {
        verse_number: 5,
        arabic_text:
          '\u0625\u0650\u064a\u064e\u0651\u0627\u0643\u064e \u0646\u064e\u0639\u0652\u0628\u064f\u062f\u064f \u0648\u064e\u0625\u0650\u064a\u064e\u0651\u0627\u0643\u064e \u0646\u064e\u0633\u0652\u062a\u064e\u0639\u0650\u064a\u0646\u064f',
        transliteration: "Iyyaka na'budu wa iyyaka nasta'in",
        translation:
          'Hanya kepada Engkau kami menyembah dan hanya kepada Engkau kami memohon pertolongan',
        meaning:
          'Pernyataan tauhid dan tawakal yang sempurna hanya kepada Allah.',
        words: [
          { arabic_text: '\u0625\u0650\u064a\u064e\u0651\u0627\u0643\u064e', transliteration: 'Iyyaka', translation: 'Hanya kepada Engkau' },
          { arabic_text: '\u0646\u064e\u0639\u0652\u0628\u064f\u062f\u064f', transliteration: "Na'budu", translation: 'Kami menyembah' },
          {
            arabic_text: '\u0648\u064e\u0625\u0650\u064a\u064e\u0651\u0627\u0643\u064e',
            transliteration: 'Wa iyyaka',
            translation: 'Dan hanya kepada Engkau',
          },
          {
            arabic_text: '\u0646\u064e\u0633\u0652\u062a\u064e\u0639\u0650\u064a\u0646\u064f',
            transliteration: "Nasta'in",
            translation: 'Kami memohon pertolongan',
          },
        ],
      },
      {
        verse_number: 6,
        arabic_text:
          '\u0627\u0647\u0652\u062f\u0650\u0646\u064e\u0627 \u0627\u0644\u0635\u0650\u0651\u0631\u064e\u0627\u0637\u064e \u0627\u0644\u0652\u0645\u064f\u0633\u0652\u062a\u064e\u0642\u0650\u064a\u0645\u064e',
        transliteration: 'Ihdinas siratal mustaqim',
        translation: 'Tunjukilah kami jalan yang lurus',
        meaning:
          'Permohonan petunjuk untuk tetap berada di jalan kebenaran.',
        words: [
          { arabic_text: '\u0627\u0647\u0652\u062f\u0650\u0646\u064e\u0627', transliteration: 'Ihdina', translation: 'Tunjukilah kami' },
          { arabic_text: '\u0627\u0644\u0635\u0650\u0651\u0631\u064e\u0627\u0637\u064e', transliteration: 'As-Sirata', translation: 'Jalan' },
          { arabic_text: '\u0627\u0644\u0652\u0645\u064f\u0633\u0652\u062a\u064e\u0642\u0650\u064a\u0645\u064e', transliteration: 'Al-Mustaqima', translation: 'Yang lurus' },
        ],
      },
      {
        verse_number: 7,
        arabic_text:
          '\u0635\u0650\u0631\u064e\u0627\u0637\u064e \u0627\u0644\u064e\u0651\u0630\u0650\u064a\u0646\u064e \u0623\u064e\u0646\u0652\u0639\u064e\u0645\u0652\u062a\u064e \u0639\u064e\u0644\u064e\u064a\u0652\u0647\u0650\u0645\u0652 \u063a\u064e\u064a\u0652\u0631\u0650 \u0627\u0644\u0652\u0645\u064e\u063a\u0652\u0636\u064f\u0648\u0628\u0650 \u0639\u064e\u0644\u064e\u064a\u0652\u0647\u0650\u0645\u0652 \u0648\u064e\u0644\u064e\u0627 \u0627\u0644\u0636\u064e\u0651\u0627\u0644\u0650\u0651\u064a\u0646\u064e',
        transliteration:
          "Siratal ladzina an'amta 'alaihim ghairil maghdubi 'alaihim waladhdhallin",
        translation:
          'Jalan orang-orang yang telah Engkau beri nikmat, bukan jalan mereka yang dimurkai dan bukan pula jalan mereka yang sesat',
        meaning:
          'Permohonan untuk mengikuti jalan orang-orang beriman dan terhindar dari kesesatan.',
        words: [
          { arabic_text: '\u0635\u0650\u0631\u064e\u0627\u0637\u064e', transliteration: 'Sirata', translation: 'Jalan' },
          {
            arabic_text: '\u0627\u0644\u064e\u0651\u0630\u0650\u064a\u0646\u064e',
            transliteration: 'Alladzina',
            translation: 'Orang-orang yang',
          },
          { arabic_text: '\u0623\u064e\u0646\u0652\u0639\u064e\u0645\u0652\u062a\u064e', transliteration: "An'amta", translation: 'Engkau beri nikmat' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u064a\u0652\u0647\u0650\u0645\u0652', transliteration: "'Alaihim", translation: 'Kepada mereka' },
          { arabic_text: '\u063a\u064e\u064a\u0652\u0631\u0650', transliteration: 'Ghairi', translation: 'Bukan' },
          {
            arabic_text: '\u0627\u0644\u0652\u0645\u064e\u063a\u0652\u0636\u064f\u0648\u0628\u0650',
            transliteration: 'Al-Maghdubi',
            translation: 'Yang dimurkai',
          },
          { arabic_text: '\u0639\u064e\u0644\u064e\u064a\u0652\u0647\u0650\u0645\u0652', transliteration: "'Alaihim", translation: 'Kepada mereka' },
          { arabic_text: '\u0648\u064e\u0644\u064e\u0627', transliteration: 'Wa la', translation: 'Dan tidak' },
          {
            arabic_text: '\u0627\u0644\u0636\u064e\u0651\u0627\u0644\u0650\u0651\u064a\u0646\u064e',
            transliteration: 'Ad-Dhallin',
            translation: 'Orang-orang yang sesat',
          },
        ],
      },
    ],
  },
  {
    name: 'Aamiin',
    description: 'Kabulkanlah',
    category: 'bacaan',
    arabic_text: '\u0622\u0645\u0650\u064a\u0646\u064e',
    transliteration: 'Aamiin',
    translation: 'Kabulkanlah Ya Allah',
    verses: [],
  },
  {
    name: 'Al-Ikhlas',
    description: 'Surah ke-112',
    category: 'surah',
    arabic_text:
      '\u0642\u064f\u0644\u0652 \u0647\u064f\u0648\u064e \u0627\u0644\u0644\u064e\u0651\u0647\u064f \u0623\u064e\u062d\u064e\u062f\u064c',
    transliteration: 'Qul huwallahu ahad',
    translation: "Katakanlah, Dialah Allah Yang Maha Esa",
    verses: [],
  },
  {
    name: 'Al-Falaq',
    description: 'Surah ke-113',
    category: 'surah',
    arabic_text:
      '\u0642\u064f\u0644\u0652 \u0623\u064e\u0639\u064f\u0648\u0630\u064f \u0628\u0650\u0631\u064e\u0628\u0650\u0651 \u0627\u0644\u0652\u0641\u064e\u0644\u064e\u0642\u0650',
    transliteration: "Qul a'udzu birabbil falaq",
    translation:
      'Katakanlah, aku berlindung kepada Tuhan yang menguasai waktu subuh',
    verses: [],
  },
  {
    name: 'An-Nas',
    description: 'Surah ke-114',
    category: 'surah',
    arabic_text:
      '\u0642\u064f\u0644\u0652 \u0623\u064e\u0639\u064f\u0648\u0630\u064f \u0628\u0650\u0631\u064e\u0628\u0650\u0651 \u0627\u0644\u0646\u064e\u0651\u0627\u0633\u0650',
    transliteration: "Qul a'udzu birabbin nas",
    translation: 'Katakanlah, aku berlindung kepada Tuhan manusia',
    verses: [],
  },
  {
    name: "Ruku'",
    description: 'Ketundukan Hati',
    category: 'gerakan',
    arabic_text:
      '\u0633\u064f\u0628\u0652\u062d\u064e\u0627\u0646\u064e \u0631\u064e\u0628\u0650\u0651\u064a\u064e \u0627\u0644\u0652\u0639\u064e\u0638\u0650\u064a\u0645\u0650 \u0648\u064e\u0628\u0650\u062d\u064e\u0645\u0652\u062f\u0650\u0647\u0650',
    transliteration: "Subhana rabbiyal 'azimi wa bihamdih",
    translation: 'Maha Suci Tuhanku yang Maha Agung dan dengan memuji-Nya',
    verses: [],
  },
  {
    name: "I'tidal",
    description: "Bangun dari Ruku'",
    category: 'gerakan',
    arabic_text:
      '\u0633\u064e\u0645\u0650\u0639\u064e \u0627\u0644\u0644\u064e\u0651\u0647\u064f \u0644\u0650\u0645\u064e\u0646\u0652 \u062d\u064e\u0645\u0650\u062f\u064e\u0647\u064f',
    transliteration: "Sami'allahu liman hamidah",
    translation: 'Semoga Allah mendengar orang yang memuji-Nya',
    verses: [],
  },
  {
    name: 'Sujud',
    description: 'Kedekatan Tertinggi',
    category: 'gerakan',
    arabic_text:
      '\u0633\u064f\u0628\u0652\u062d\u064e\u0627\u0646\u064e \u0631\u064e\u0628\u0650\u0651\u064a\u064e \u0627\u0644\u0652\u0623\u064e\u0639\u0652\u0644\u064e\u0649 \u0648\u064e\u0628\u0650\u062d\u064e\u0645\u0652\u062f\u0650\u0647\u0650',
    transliteration: "Subhana rabbiyal a'la wa bihamdih",
    translation: 'Maha Suci Tuhanku yang Maha Tinggi dan dengan memuji-Nya',
    verses: [],
  },
  {
    name: 'Duduk di Antara Dua Sujud',
    description: 'Permohonan Ampunan',
    category: 'gerakan',
    arabic_text:
      '\u0631\u064e\u0628\u0650\u0651 \u0627\u063a\u0652\u0641\u0650\u0631\u0652 \u0644\u0650\u064a \u0648\u064e\u0627\u0631\u0652\u062d\u064e\u0645\u0652\u0646\u0650\u064a \u0648\u064e\u0627\u062c\u0652\u0628\u064f\u0631\u0652\u0646\u0650\u064a \u0648\u064e\u0627\u0631\u0652\u0641\u064e\u0639\u0652\u0646\u0650\u064a \u0648\u064e\u0627\u0631\u0652\u0632\u064f\u0642\u0652\u0646\u0650\u064a \u0648\u064e\u0627\u0647\u0652\u062f\u0650\u0646\u0650\u064a',
    transliteration:
      "Rabbighfir li warhamni wajburni warfa'ni warzuqni wahdini",
    translation: 'Ya Tuhanku, ampunilah aku, rahmatilah aku, cukupkanlah aku...',
    verses: [],
  },
  {
    name: 'Tahiyat Awal',
    description: 'Syahadat Pertama',
    category: 'tasyahhud',
    arabic_text:
      '\u0627\u0644\u062a\u064e\u0651\u062d\u0650\u064a\u064e\u0651\u0627\u062a\u064f \u0644\u0650\u0644\u064e\u0651\u0647\u0650 \u0648\u064e\u0627\u0644\u0635\u064e\u0651\u0644\u064e\u0648\u064e\u0627\u062a\u064f \u0648\u064e\u0627\u0644\u0637\u064e\u0651\u064a\u0650\u0651\u0628\u064e\u0627\u062a\u064f',
    transliteration: 'Attahiyyatu lillahi wassalawatu wattayyibat',
    translation:
      'Segala penghormatan, keberkahan, dan kebaikan hanya milik Allah',
    verses: [
      {
        verse_number: 1,
        arabic_text:
          '\u0627\u0644\u062a\u064e\u0651\u062d\u0650\u064a\u064e\u0651\u0627\u062a\u064f \u0644\u0650\u0644\u064e\u0651\u0647\u0650 \u0648\u064e\u0627\u0644\u0635\u064e\u0651\u0644\u064e\u0648\u064e\u0627\u062a\u064f \u0648\u064e\u0627\u0644\u0637\u064e\u0651\u064a\u0650\u0651\u0628\u064e\u0627\u062a\u064f',
        transliteration: 'Attahiyyatu lillahi wassalawatu wattayyibat',
        translation:
          'Segala penghormatan, keberkahan, dan kebaikan hanya milik Allah',
        meaning:
          'Pengakuan bahwa segala penghormatan dan kebaikan hanya milik Allah.',
        words: [
          {
            arabic_text: '\u0627\u0644\u062a\u064e\u0651\u062d\u0650\u064a\u064e\u0651\u0627\u062a\u064f',
            transliteration: 'Attahiyyatu',
            translation: 'Segala penghormatan',
          },
          { arabic_text: '\u0644\u0650\u0644\u064e\u0651\u0647\u0650', transliteration: 'Lillahi', translation: 'hanya milik Allah' },
          {
            arabic_text: '\u0648\u064e\u0627\u0644\u0635\u064e\u0651\u0644\u064e\u0648\u064e\u0627\u062a\u064f',
            transliteration: 'Washshalawatu',
            translation: 'dan keberkahan',
          },
          {
            arabic_text: '\u0648\u064e\u0627\u0644\u0637\u064e\u0651\u064a\u0650\u0651\u0628\u064e\u0627\u062a\u064f',
            transliteration: 'Waththayyibatu',
            translation: 'dan kebaikan',
          },
        ],
      },
      {
        verse_number: 2,
        arabic_text:
          '\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064e \u0623\u064e\u064a\u064f\u0651\u0647\u064e\u0627 \u0627\u0644\u0646\u064e\u0651\u0628\u0650\u064a\u064f\u0651 \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f \u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0648\u064e\u0628\u064e\u0631\u064e\u0643\u064e\u0627\u062a\u064f\u0647\u064f',
        transliteration:
          "Assalamu 'alaika ayyuhan nabiyyu wa rahmatullahi wa barakatuh",
        translation:
          'Semoga keselamatan tercurah kepadamu wahai Nabi, serta rahmat dan keberkahan Allah',
        meaning: 'Salam penghormatan kepada Nabi Muhammad SAW.',
        words: [
          { arabic_text: '\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f', transliteration: 'Assalamu', translation: 'Semoga keselamatan' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064e', transliteration: "'Alaika", translation: 'tercurah kepadamu' },
          { arabic_text: '\u0623\u064e\u064a\u064f\u0651\u0647\u064e\u0627', transliteration: 'Ayyuha', translation: 'wahai' },
          { arabic_text: '\u0627\u0644\u0646\u064e\u0651\u0628\u0650\u064a\u064f\u0651', transliteration: 'Annabiyyu', translation: 'Nabi' },
          { arabic_text: '\u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f', transliteration: 'Wa rahmatu', translation: 'dan rahmat' },
          { arabic_text: '\u0627\u0644\u0644\u064e\u0651\u0647\u0650', transliteration: 'Allahi', translation: 'Allah' },
          { arabic_text: '\u0648\u064e\u0628\u064e\u0631\u064e\u0643\u064e\u0627\u062a\u064f\u0647\u064f', transliteration: 'Wa barakatuhu', translation: 'dan keberkahan-Nya' },
        ],
      },
      {
        verse_number: 3,
        arabic_text:
          '\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0646\u064e\u0627 \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0639\u0650\u0628\u064e\u0627\u062f\u0650 \u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0627\u0644\u0635\u064e\u0651\u0627\u0644\u0650\u062d\u0650\u064a\u0646\u064e',
        transliteration:
          "Assalamu 'alaina wa 'ala 'ibadillahis shalihin",
        translation:
          'Semoga keselamatan tercurah kepada kami dan hamba-hamba Allah yang saleh',
        meaning:
          'Doa keselamatan untuk diri sendiri dan seluruh hamba Allah yang saleh.',
        words: [
          { arabic_text: '\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f', transliteration: 'Assalamu', translation: 'Semoga keselamatan' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u064a\u0652\u0646\u064e\u0627', transliteration: "'Alaina", translation: 'tercurah kepada kami' },
          { arabic_text: '\u0648\u064e\u0639\u064e\u0644\u064e\u0649', transliteration: "Wa 'ala", translation: 'dan kepada' },
          { arabic_text: '\u0639\u0650\u0628\u064e\u0627\u062f\u0650', transliteration: "'Ibadi", translation: 'hamba-hamba' },
          { arabic_text: '\u0627\u0644\u0644\u064e\u0651\u0647\u0650', transliteration: 'Allahi', translation: 'Allah' },
          {
            arabic_text: '\u0627\u0644\u0635\u064e\u0651\u0627\u0644\u0650\u062d\u0650\u064a\u0646\u064e',
            transliteration: 'Ashshalihin',
            translation: 'yang saleh',
          },
        ],
      },
      {
        verse_number: 4,
        arabic_text:
          '\u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064e\u0646\u0652 \u0644\u064e\u0627 \u0625\u0650\u0644\u064e\u0647\u064e \u0625\u0650\u0644\u064e\u0651\u0627 \u0627\u0644\u0644\u064e\u0651\u0647\u064f \u0648\u064e\u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064e\u0646\u064e\u0651 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064b\u0627 \u0631\u064e\u0633\u064f\u0648\u0644\u064f \u0627\u0644\u0644\u064e\u0651\u0647\u0650',
        transliteration:
          "Asyhadu an la ilaha illallah wa asyhadu anna Muhammadan rasulullah",
        translation:
          'Aku bersaksi bahwa tidak ada Tuhan selain Allah dan aku bersaksi bahwa Nabi Muhammad adalah utusan Allah',
        meaning: 'Pengakuan syahadat tauhid dan syahadat rasul.',
        words: [
          { arabic_text: '\u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f', transliteration: 'Asyhadu', translation: 'Aku bersaksi' },
          { arabic_text: '\u0623\u064e\u0646\u0652', transliteration: 'An', translation: 'bahwa' },
          { arabic_text: '\u0644\u064e\u0627', transliteration: 'La', translation: 'tidak ada' },
          { arabic_text: '\u0625\u0650\u0644\u064e\u0647\u064e', transliteration: 'Ilaha', translation: 'Tuhan' },
          { arabic_text: '\u0625\u0650\u0644\u064e\u0651\u0627', transliteration: 'Illa', translation: 'selain' },
          { arabic_text: '\u0627\u0644\u0644\u064e\u0651\u0647\u064f', transliteration: 'Allah', translation: 'Allah' },
          { arabic_text: '\u0648\u064e\u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f', transliteration: 'Wa asyhadu', translation: 'dan aku bersaksi' },
          { arabic_text: '\u0623\u064e\u0646\u064e\u0651', transliteration: 'Anna', translation: 'bahwa' },
          { arabic_text: '\u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064b\u0627', transliteration: 'Muhammadan', translation: 'Nabi Muhammad' },
          { arabic_text: '\u0631\u064e\u0633\u064f\u0648\u0644\u064f', transliteration: 'Rasulu', translation: 'adalah utusan' },
          { arabic_text: '\u0627\u0644\u0644\u064e\u0651\u0647\u0650', transliteration: 'Allahi', translation: 'Allah' },
        ],
      },
    ],
  },
  {
    name: 'Tahiyat Akhir',
    description: 'Syahadat Lengkap',
    category: 'tasyahhud',
    arabic_text:
      '\u0627\u0644\u062a\u064e\u0651\u062d\u0650\u064a\u064e\u0651\u0627\u062a\u064f \u0627\u0644\u0652\u0645\u064f\u0628\u064e\u0627\u0631\u064e\u0643\u064e\u0627\u062a\u064f \u0627\u0644\u0635\u064e\u0651\u0644\u064e\u0648\u064e\u0627\u062a\u064f \u0627\u0644\u0637\u064e\u0651\u064a\u0650\u0651\u0628\u064e\u0627\u062a\u064f \u0644\u0650\u0644\u064e\u0651\u0647\u0650\u060c \u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064e \u0623\u064e\u064a\u064f\u0651\u0647\u064e\u0627 \u0627\u0644\u0646\u064e\u0651\u0628\u0650\u064a\u064f\u0651 \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f \u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0648\u064e\u0628\u064e\u0631\u064e\u0643\u064e\u0627\u062a\u064f\u0647\u064f\u060c \u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0646\u064e\u0627 \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0639\u0650\u0628\u064e\u0627\u062f\u0650 \u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0627\u0644\u0635\u064e\u0651\u0627\u0644\u0650\u062d\u0650\u064a\u0646\u064e\u060c \u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064e\u0646\u0652 \u0644\u064e\u0627 \u0625\u0650\u0644\u064e\u0647\u064e \u0625\u0650\u0644\u064e\u0651\u0627 \u0627\u0644\u0644\u064e\u0651\u0647\u064f \u0648\u064e\u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064e\u0646\u064e\u0651 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064b\u0627 \u0631\u064e\u0633\u064f\u0648\u0644\u064f \u0627\u0644\u0644\u064e\u0651\u0647\u0650\u060c \u0627\u0644\u0644\u064e\u0651\u0647\u064f\u0645\u064e\u0651 \u0635\u064e\u0644\u0650\u0651 \u0639\u064e\u0644\u064e\u0649 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064d \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0622\u0644\u0650 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064d\u060c \u0643\u064e\u0645\u064e\u0627 \u0635\u064e\u0644\u064e\u0651\u064a\u0652\u062a\u064e \u0639\u064e\u0644\u064e\u0649 \u0625\u0650\u0628\u0652\u0631\u064e\u0627\u0647\u0650\u064a\u0645\u064e \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0622\u0644\u0650 \u0625\u0650\u0628\u0652\u0631\u064e\u0627\u0647\u0650\u064a\u0645\u064e\u060c \u0625\u0650\u0646\u064e\u0651\u0643\u064e \u062d\u064e\u0645\u0650\u064a\u062f\u064c \u0645\u064e\u062c\u0650\u064a\u062f\u064c\u060c \u0627\u0644\u0644\u064e\u0651\u0647\u064f\u0645\u064e\u0651 \u0628\u064e\u0627\u0631\u0650\u0643\u0652 \u0639\u064e\u0644\u064e\u0649 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064d \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0622\u0644\u0650 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064d\u060c \u0643\u064e\u0645\u064e\u0627 \u0628\u064e\u0627\u0631\u064e\u0643\u0652\u062a\u064e \u0639\u064e\u0644\u064e\u0649 \u0625\u0650\u0628\u0652\u0631\u064e\u0627\u0647\u0650\u064a\u0645\u064e \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0622\u0644\u0650 \u0625\u0650\u0628\u0652\u0631\u064e\u0627\u0647\u0650\u064a\u0645\u064e\u060c \u0625\u0650\u0646\u064e\u0651\u0643\u064e \u062d\u064e\u0645\u0650\u064a\u062f\u064c \u0645\u064e\u062c\u0650\u064a\u062f\u064c',
    transliteration: 'Attahiyyatul mubarakatus...',
    translation:
      'Segala penghormatan yang diberkahi, ibadah, dan kebaikan hanyalah milik Allah. Semoga keselamatan tercurah kepadamu wahai Nabi, serta rahmat dan keberkahan Allah. Semoga keselamatan tercurah kepada kami dan hamba-hamba Allah yang saleh. Aku bersaksi bahwa tidak ada Tuhan selain Allah dan aku bersaksi bahwa Nabi Muhammad adalah utusan Allah. Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana Engkau telah melimpahkan rahmat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, berkahilah Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana Engkau telah memberkahi Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
    verses: [
      {
        verse_number: 1,
        arabic_text:
          '\u0627\u0644\u062a\u064e\u0651\u062d\u0650\u064a\u064e\u0651\u0627\u062a\u064f \u0627\u0644\u0652\u0645\u064f\u0628\u064e\u0627\u0631\u064e\u0643\u064e\u0627\u062a\u064f \u0627\u0644\u0635\u064e\u0651\u0644\u064e\u0648\u064e\u0627\u062a\u064f \u0627\u0644\u0637\u064e\u0651\u064a\u0650\u0651\u0628\u064e\u0627\u062a\u064f \u0644\u0650\u0644\u064e\u0651\u0647\u0650',
        transliteration: "Attahiyyatul mubarakatus shalawatut tayyibatu lillah",
        translation:
          'Segala penghormatan yang diberkahi, ibadah, dan kebaikan hanyalah milik Allah',
        meaning:
          'Pengakuan bahwa segala penghormatan yang diberkahi hanyalah milik Allah.',
        words: [
          { arabic_text: '\u0627\u0644\u062a\u064e\u0651\u062d\u0650\u064a\u064e\u0651\u0627\u062a\u064f', transliteration: 'Attahiyyatul', translation: 'Segala penghormatan' },
          { arabic_text: '\u0627\u0644\u0652\u0645\u064f\u0628\u064e\u0627\u0631\u064e\u0643\u064e\u0627\u062a\u064f', transliteration: 'Mubarakatus', translation: 'yang diberkahi' },
          { arabic_text: '\u0627\u0644\u0635\u064e\u0651\u0644\u064e\u0648\u064e\u0627\u062a\u064f', transliteration: 'Shalawatut', translation: 'segala rahmat' },
          { arabic_text: '\u0627\u0644\u0637\u064e\u0651\u064a\u0650\u0651\u0628\u064e\u0627\u062a\u064f', transliteration: 'Thayyibatu', translation: 'segala kebaikan' },
          { arabic_text: '\u0644\u0650\u0644\u064e\u0651\u0647\u0650', transliteration: 'Lillah', translation: 'hanya milik Allah' },
        ],
      },
      {
        verse_number: 2,
        arabic_text:
          '\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064e \u0623\u064e\u064a\u064f\u0651\u0647\u064e\u0627 \u0627\u0644\u0646\u064e\u0651\u0628\u0650\u064a\u064f\u0651 \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f \u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0648\u064e\u0628\u064e\u0631\u064e\u0643\u064e\u0627\u062a\u064f\u0647\u064f',
        transliteration:
          "Assalamu 'alaika ayyuhan nabiyyu wa rahmatullahi wa barakatuh",
        translation:
          'Semoga keselamatan tercurah kepadamu wahai Nabi, serta rahmat dan keberkahan Allah',
        meaning: 'Salam penghormatan kepada Nabi Muhammad SAW.',
        words: [
          { arabic_text: '\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f', transliteration: 'Assalamu', translation: 'Semoga keselamatan' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064e', transliteration: "'Alaika", translation: 'tercurah kepadamu' },
          { arabic_text: '\u0623\u064e\u064a\u064f\u0651\u0647\u064e\u0627', transliteration: 'Ayyuha', translation: 'wahai' },
          { arabic_text: '\u0627\u0644\u0646\u064e\u0651\u0628\u0650\u064a\u064f\u0651', transliteration: 'Annabiyyu', translation: 'Nabi' },
          { arabic_text: '\u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f', transliteration: 'Wa rahmatu', translation: 'dan rahmat' },
          { arabic_text: '\u0627\u0644\u0644\u064e\u0651\u0647\u0650', transliteration: 'Allahi', translation: 'Allah' },
          { arabic_text: '\u0648\u064e\u0628\u064e\u0631\u064e\u0643\u064e\u0627\u062a\u064f\u0647\u064f', transliteration: 'Wa barakatuhu', translation: 'dan keberkahan-Nya' },
        ],
      },
      {
        verse_number: 3,
        arabic_text:
          '\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0646\u064e\u0627 \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0639\u0650\u0628\u064e\u0627\u062f\u0650 \u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0627\u0644\u0635\u064e\u0651\u0627\u0644\u0650\u062d\u0650\u064a\u0646\u064e',
        transliteration:
          "Assalamu 'alaina wa 'ala 'ibadillahis shalihin",
        translation:
          'Semoga keselamatan tercurah kepada kami dan hamba-hamba Allah yang saleh',
        meaning:
          'Doa keselamatan untuk diri sendiri dan seluruh hamba Allah yang saleh.',
        words: [
          { arabic_text: '\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f', transliteration: 'Assalamu', translation: 'Semoga keselamatan' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u064a\u0652\u0646\u064e\u0627', transliteration: "'Alaina", translation: 'tercurah kepada kami' },
          { arabic_text: '\u0648\u064e\u0639\u064e\u0644\u064e\u0649', transliteration: "Wa 'ala", translation: 'dan kepada' },
          { arabic_text: '\u0639\u0650\u0628\u064e\u0627\u062f\u0650', transliteration: "'Ibadi", translation: 'hamba-hamba' },
          { arabic_text: '\u0627\u0644\u0644\u064e\u0651\u0647\u0650', transliteration: 'Allahi', translation: 'Allah' },
          {
            arabic_text: '\u0627\u0644\u0635\u064e\u0651\u0627\u0644\u0650\u062d\u0650\u064a\u0646\u064e',
            transliteration: 'Ashshalihin',
            translation: 'yang saleh',
          },
        ],
      },
      {
        verse_number: 4,
        arabic_text:
          '\u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064e\u0646\u0652 \u0644\u064e\u0627 \u0625\u0650\u0644\u064e\u0647\u064e \u0625\u0650\u0644\u064e\u0651\u0627 \u0627\u0644\u0644\u064e\u0651\u0647\u064f',
        transliteration: "Asyhadu an la ilaha illallah",
        translation:
          'Aku bersaksi bahwa tidak ada Tuhan selain Allah',
        meaning: 'Pengakuan syahadat tauhid.',
        words: [
          { arabic_text: '\u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f', transliteration: 'Asyhadu', translation: 'Aku bersaksi' },
          { arabic_text: '\u0623\u064e\u0646\u0652', transliteration: 'An', translation: 'bahwa' },
          { arabic_text: '\u0644\u064e\u0627', transliteration: 'La', translation: 'tidak ada' },
          { arabic_text: '\u0625\u0650\u0644\u064e\u0647\u064e', transliteration: 'Ilaha', translation: 'Tuhan' },
          { arabic_text: '\u0625\u0650\u0644\u064e\u0651\u0627 \u0627\u0644\u0644\u064e\u0651\u0647\u064f', transliteration: 'Illallah', translation: 'selain Allah' },
        ],
      },
      {
        verse_number: 5,
        arabic_text:
          '\u0648\u064e\u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064e\u0646\u064e\u0651 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064b\u0627 \u0631\u064e\u0633\u064f\u0648\u0644\u064f \u0627\u0644\u0644\u064e\u0651\u0647\u0650',
        transliteration: "Wa asyhadu anna Muhammadan rasulullah",
        translation:
          'Dan aku bersaksi bahwa Nabi Muhammad adalah utusan Allah',
        meaning: 'Pengakuan syahadat rasul.',
        words: [
          { arabic_text: '\u0648\u064e\u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f', transliteration: 'Wa asyhadu', translation: 'Dan aku bersaksi' },
          { arabic_text: '\u0623\u064e\u0646\u064e\u0651', transliteration: 'Anna', translation: 'bahwa' },
          { arabic_text: '\u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064b\u0627', transliteration: 'Muhammadan', translation: 'Nabi Muhammad' },
          { arabic_text: '\u0631\u064e\u0633\u064f\u0648\u0644\u064f', transliteration: 'Rasulu', translation: 'adalah utusan' },
          { arabic_text: '\u0627\u0644\u0644\u064e\u0651\u0647\u0650', transliteration: 'Allahi', translation: 'Allah' },
        ],
      },
      {
        verse_number: 6,
        arabic_text:
          '\u0627\u0644\u0644\u064e\u0651\u0647\u064f\u0645\u064e\u0651 \u0635\u064e\u0644\u0650\u0651 \u0639\u064e\u0644\u064e\u0649 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064d \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0622\u0644\u0650 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064d',
        transliteration: "Allahumma shalli 'ala Muhammad wa 'ala ali Muhammad",
        translation:
          'Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan keluarga Nabi Muhammad',
        meaning: 'Shalawat kepada Nabi Muhammad dan keluarganya.',
        words: [
          { arabic_text: '\u0627\u0644\u0644\u064e\u0651\u0647\u064f\u0645\u064e\u0651', transliteration: 'Allahumma', translation: 'Ya Allah' },
          { arabic_text: '\u0635\u064e\u0644\u0650\u0651', transliteration: 'Shalli', translation: 'limpahkanlah rahmat' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u0649', transliteration: "'Ala", translation: 'kepada' },
          { arabic_text: '\u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064d', transliteration: 'Muhammadin', translation: 'Nabi Muhammad' },
          { arabic_text: '\u0648\u064e', transliteration: 'Wa', translation: 'dan' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u0649', transliteration: "'Ala", translation: 'kepada' },
          { arabic_text: '\u0622\u0644\u0650', transliteration: 'Ali', translation: 'keluarga' },
          { arabic_text: '\u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064d', transliteration: 'Muhammadin', translation: 'Nabi Muhammad' },
        ],
      },
      {
        verse_number: 7,
        arabic_text:
          '\u0643\u064e\u0645\u064e\u0627 \u0635\u064e\u0644\u064e\u0651\u064a\u0652\u062a\u064e \u0639\u064e\u0644\u064e\u0649 \u0625\u0650\u0628\u0652\u0631\u064e\u0627\u0647\u0650\u064a\u0645\u064e \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0622\u0644\u0650 \u0625\u0650\u0628\u0652\u0631\u064e\u0627\u0647\u0650\u064a\u0645\u064e',
        transliteration:
          "Kama shallaita 'ala Ibrahima wa 'ala ali Ibrahima",
        translation:
          'Sebagaimana Engkau telah melimpahkan rahmat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim',
        meaning: 'Perbandingan shalawat sebagaimana diberikan kepada Nabi Ibrahim.',
        words: [
          { arabic_text: '\u0643\u064e\u0645\u064e\u0627', transliteration: 'Kama', translation: 'Sebagaimana' },
          { arabic_text: '\u0635\u064e\u0644\u064e\u0651\u064a\u0652\u062a\u064e', transliteration: 'Shallaita', translation: 'Engkau limpahkan rahmat' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u0649', transliteration: "'Ala", translation: 'kepada' },
          { arabic_text: '\u0625\u0650\u0628\u0652\u0631\u064e\u0627\u0647\u0650\u064a\u0645\u064e', transliteration: 'Ibrahima', translation: 'Nabi Ibrahim' },
          { arabic_text: '\u0648\u064e', transliteration: 'Wa', translation: 'dan' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u0649', transliteration: "'Ala", translation: 'kepada' },
          { arabic_text: '\u0622\u0644\u0650', transliteration: 'Ali', translation: 'keluarga' },
          { arabic_text: '\u0625\u0650\u0628\u0652\u0631\u064e\u0627\u0647\u0650\u064a\u0645\u064e', transliteration: 'Ibrahima', translation: 'Nabi Ibrahim' },
        ],
      },
      {
        verse_number: 8,
        arabic_text:
          '\u0625\u0650\u0646\u064e\u0651\u0643\u064e \u062d\u064e\u0645\u0650\u064a\u062f\u064c \u0645\u064e\u062c\u0650\u064a\u062f\u064c',
        transliteration: 'Innaka hamidun majid',
        translation:
          'Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia',
        meaning:
          'Penutup shalawat dengan memuji sifat Allah Yang Maha Terpuji dan Maha Mulia.',
        words: [
          { arabic_text: '\u0625\u0650\u0646\u064e\u0651\u0643\u064e', transliteration: 'Innaka', translation: 'Sesungguhnya Engkau' },
          { arabic_text: '\u062d\u064e\u0645\u0650\u064a\u062f\u064c', transliteration: 'Hamidun', translation: 'Maha Terpuji' },
          { arabic_text: '\u0645\u064e\u062c\u0650\u064a\u062f\u064c', transliteration: 'Majidun', translation: 'Maha Mulia' },
        ],
      },
      {
        verse_number: 9,
        arabic_text:
          '\u0627\u0644\u0644\u064e\u0651\u0647\u064f\u0645\u064e\u0651 \u0628\u064e\u0627\u0631\u0650\u0643\u0652 \u0639\u064e\u0644\u064e\u0649 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064d \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0622\u0644\u0650 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064d',
        transliteration: "Allahumma barik 'ala Muhammad wa 'ala ali Muhammad",
        translation:
          'Ya Allah, berkahilah Nabi Muhammad dan keluarga Nabi Muhammad',
        meaning: 'Doa keberkahan untuk Nabi Muhammad dan keluarganya.',
        words: [
          { arabic_text: '\u0627\u0644\u0644\u064e\u0651\u0647\u064f\u0645\u064e\u0651', transliteration: 'Allahumma', translation: 'Ya Allah' },
          { arabic_text: '\u0628\u064e\u0627\u0631\u0650\u0643\u0652', transliteration: 'Barik', translation: 'berkahilah' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u0649', transliteration: "'Ala", translation: 'kepada' },
          { arabic_text: '\u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064d', transliteration: 'Muhammadin', translation: 'Nabi Muhammad' },
          { arabic_text: '\u0648\u064e', transliteration: 'Wa', translation: 'dan' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u0649', transliteration: "'Ala", translation: 'kepada' },
          { arabic_text: '\u0622\u0644\u0650', transliteration: 'Ali', translation: 'keluarga' },
          { arabic_text: '\u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064d', transliteration: 'Muhammadin', translation: 'Nabi Muhammad' },
        ],
      },
      {
        verse_number: 10,
        arabic_text:
          '\u0643\u064e\u0645\u064e\u0627 \u0628\u064e\u0627\u0631\u064e\u0643\u0652\u062a\u064e \u0639\u064e\u0644\u064e\u0649 \u0625\u0650\u0628\u0652\u0631\u064e\u0627\u0647\u0650\u064a\u0645\u064e \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0622\u0644\u0650 \u0625\u0650\u0628\u0652\u0631\u064e\u0627\u0647\u0650\u064a\u0645\u064e \u0625\u0650\u0646\u064e\u0651\u0643\u064e \u062d\u064e\u0645\u0650\u064a\u062f\u064c \u0645\u064e\u062c\u0650\u064a\u062f\u064c',
        transliteration:
          "Kama barakta 'ala Ibrahima wa 'ala ali Ibrahima innaka hamidun majid",
        translation:
          'Sebagaimana Engkau telah memberkahi Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
        meaning:
          'Perbandingan doa keberkahan sebagaimana diberikan kepada Nabi Ibrahim.',
        words: [
          { arabic_text: '\u0643\u064e\u0645\u064e\u0627', transliteration: 'Kama', translation: 'Sebagaimana' },
          { arabic_text: '\u0628\u064e\u0627\u0631\u064e\u0643\u0652\u062a\u064e', transliteration: 'Barakta', translation: 'Engkau berkahi' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u0649', transliteration: "'Ala", translation: 'kepada' },
          { arabic_text: '\u0625\u0650\u0628\u0652\u0631\u064e\u0627\u0647\u0650\u064a\u0645\u064e', transliteration: 'Ibrahima', translation: 'Nabi Ibrahim' },
          { arabic_text: '\u0648\u064e', transliteration: 'Wa', translation: 'dan' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u0649', transliteration: "'Ala", translation: 'kepada' },
          { arabic_text: '\u0622\u0644\u0650', transliteration: 'Ali', translation: 'keluarga' },
          { arabic_text: '\u0625\u0650\u0628\u0652\u0631\u064e\u0627\u0647\u0650\u064a\u0645\u064e', transliteration: 'Ibrahima', translation: 'Nabi Ibrahim' },
          { arabic_text: '\u0625\u0650\u0646\u064e\u0651\u0643\u064e', transliteration: 'Innaka', translation: 'Sesungguhnya Engkau' },
          { arabic_text: '\u062d\u064e\u0645\u0650\u064a\u062f\u064c', transliteration: 'Hamidun', translation: 'Maha Terpuji' },
          { arabic_text: '\u0645\u064e\u062c\u0650\u064a\u062f\u064c', transliteration: 'Majidun', translation: 'Maha Mulia' },
        ],
      },
    ],
  },
  {
    name: 'Doa Sebelum Salam',
    description: 'Mohon Kebaikan Dunia Akhirat',
    category: 'penutup',
    arabic_text:
      '\u0631\u064e\u0628\u064e\u0651\u0646\u064e\u0627 \u0622\u062a\u0650\u0646\u064e\u0627 \u0641\u0650\u064a \u0627\u0644\u062f\u064f\u0651\u0646\u0652\u064a\u064e\u0627 \u062d\u064e\u0633\u064e\u0646\u064e\u0629\u064b \u0648\u064e\u0641\u0650\u064a \u0627\u0644\u0652\u0622\u062e\u0650\u0631\u064e\u0629\u0650 \u062d\u064e\u0633\u064e\u0646\u064e\u0629\u064b \u0648\u064e\u0642\u0650\u0646\u064e\u0627 \u0639\u064e\u0630\u064e\u0627\u0628\u064e \u0627\u0644\u0646\u064e\u0651\u0627\u0631\u0650',
    transliteration: 'Rabbana atina fid dunya hasanah...',
    translation:
      'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka',
    verses: [
      {
        verse_number: 1,
        arabic_text:
          '\u0631\u064e\u0628\u064e\u0651\u0646\u064e\u0627 \u0622\u062a\u0650\u0646\u064e\u0627 \u0641\u0650\u064a \u0627\u0644\u062f\u064f\u0651\u0646\u0652\u064a\u064e\u0627 \u062d\u064e\u0633\u064e\u0646\u064e\u0629\u064b \u0648\u064e\u0641\u0650\u064a \u0627\u0644\u0652\u0622\u062e\u0650\u0631\u064e\u0629\u0650 \u062d\u064e\u0633\u064e\u0646\u064e\u0629\u064b \u0648\u064e\u0642\u0650\u0646\u064e\u0627 \u0639\u064e\u0630\u064e\u0627\u0628\u064e \u0627\u0644\u0646\u064e\u0651\u0627\u0631\u0650',
        transliteration:
          "Rabbana atina fid dunya hasanah wa fil akhirati hasanah wa qina 'adzaban nar",
        translation:
          'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka',
        meaning:
          'Doa untuk memohon kebaikan di dunia dan akhirat serta perlindungan dari api neraka.',
        words: [
          { arabic_text: '\u0631\u064e\u0628\u064e\u0651\u0646\u064e\u0627', transliteration: 'Rabbana', translation: 'Ya Tuhan kami' },
          { arabic_text: '\u0622\u062a\u0650\u0646\u064e\u0627', transliteration: 'Atina', translation: 'berilah kami' },
          { arabic_text: '\u0641\u0650\u064a', transliteration: 'Fi', translation: 'di' },
          { arabic_text: '\u0627\u0644\u062f\u064f\u0651\u0646\u0652\u064a\u064e\u0627', transliteration: 'Addunya', translation: 'dunia' },
          { arabic_text: '\u062d\u064e\u0633\u064e\u0646\u064e\u0629\u064b', transliteration: 'Hasanah', translation: 'kebaikan' },
          { arabic_text: '\u0648\u064e\u0641\u0650\u064a', transliteration: 'Wa fi', translation: 'dan di' },
          { arabic_text: '\u0627\u0644\u0652\u0622\u062e\u0650\u0631\u064e\u0629\u0650', transliteration: 'Al-akhirati', translation: 'akhirat' },
          { arabic_text: '\u062d\u064e\u0633\u064e\u0646\u064e\u0629\u064b', transliteration: 'Hasanah', translation: 'kebaikan' },
          { arabic_text: '\u0648\u064e\u0642\u0650\u0646\u064e\u0627', transliteration: 'Wa qina', translation: 'dan peliharalah kami' },
          { arabic_text: '\u0639\u064e\u0630\u064e\u0627\u0628\u064e', transliteration: "'Adzaba", translation: 'siksa' },
          { arabic_text: '\u0627\u0644\u0646\u064e\u0651\u0627\u0631\u0650', transliteration: 'An-nar', translation: 'neraka' },
        ],
      },
    ],
  },
  {
    name: 'Salam',
    description: 'Penutup Sholat',
    category: 'penutup',
    arabic_text:
      '\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064f\u0645\u0652 \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f \u0627\u0644\u0644\u064e\u0651\u0647\u0650',
    transliteration: "Assalamu'alaikum warahmatullah",
    translation:
      'Semoga keselamatan dan rahmat Allah dilimpahkan kepadamu',
    verses: [
      {
        verse_number: 1,
        arabic_text:
          '\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064f\u0645\u0652 \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f \u0627\u0644\u0644\u064e\u0651\u0647\u0650',
        transliteration: "Assalamu'alaikum warahmatullah",
        translation:
          'Semoga keselamatan dan rahmat Allah dilimpahkan kepadamu',
        meaning:
          'Salam penutup sholat sebagai doa keselamatan dan rahmat.',
        words: [
          { arabic_text: '\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f', transliteration: 'Assalamu', translation: 'Semoga keselamatan' },
          { arabic_text: '\u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064f\u0645\u0652', transliteration: "'Alaikum", translation: 'tercurah kepadamu' },
          { arabic_text: '\u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f', transliteration: 'Wa rahmatu', translation: 'dan rahmat' },
          { arabic_text: '\u0627\u0644\u0644\u064e\u0651\u0647\u0650', transliteration: 'Allahi', translation: 'Allah' },
        ],
      },
    ],
  },
];

let verseIdCounter = 1;
let wordIdCounter = 1;

const allVerses: Verse[] = [];
const allWords: Word[] = [];

const allReadings: Reading[] = readingsData.map((r, idx) => {
  const readingId = idx + 1;

  for (const v of r.verses) {
    const verseId = verseIdCounter++;

    for (let wi = 0; wi < v.words.length; wi++) {
      const w = v.words[wi];
      allWords.push({
        id: wordIdCounter++,
        verse_id: verseId,
        reading_id: readingId,
        arabic_text: w.arabic_text,
        transliteration: w.transliteration,
        translation: w.translation,
        sort_order: wi + 1,
      });
    }

    allVerses.push({
      id: verseId,
      reading_id: readingId,
      verse_number: v.verse_number,
      arabic_text: v.arabic_text,
      transliteration: v.transliteration,
      translation: v.translation,
      meaning: v.meaning,
    });
  }

  return {
    id: readingId,
    name: r.name,
    description: r.description,
    category: r.category,
    sort_order: readingId,
    arabic_text: r.arabic_text,
    transliteration: r.transliteration,
    translation: r.translation,
  };
});

export { allReadings, allVerses, allWords };
