import type { SQLiteDatabase } from 'expo-sqlite';

type ReadingData = {
  name: string; description: string; category: string;
  arabic_text: string; transliteration: string; translation: string;
};

type VerseData = {
  verse: number; arabic: string; transliteration: string;
  translation: string; meaning: string; words: { arabic: string; transliteration: string; translation: string; }[];
};

async function upsertReading(db: SQLiteDatabase, r: ReadingData, sortOrder: number): Promise<number> {
  const existing = await db.getFirstAsync<{ id: number }>('SELECT id FROM readings WHERE name = ?', r.name);
  if (existing) {
    await db.runAsync(
      'UPDATE readings SET description = ?, category = ?, sort_order = ?, arabic_text = ?, transliteration = ?, translation = ? WHERE id = ?',
      r.description, r.category, sortOrder, r.arabic_text, r.transliteration, r.translation, existing.id
    );
    return existing.id;
  }
  const result = await db.runAsync(
    'INSERT INTO readings (name, description, category, sort_order, arabic_text, transliteration, translation) VALUES (?, ?, ?, ?, ?, ?, ?)',
    r.name, r.description, r.category, sortOrder, r.arabic_text, r.transliteration, r.translation
  );
  return result.lastInsertRowId;
}

async function upsertVerse(db: SQLiteDatabase, readingId: number, v: VerseData): Promise<number> {
  const existing = await db.getFirstAsync<{ id: number }>(
    'SELECT id FROM verses WHERE reading_id = ? AND verse_number = ?', readingId, v.verse
  );
  if (existing) {
    await db.runAsync(
      'UPDATE verses SET arabic_text = ?, transliteration = ?, translation = ?, meaning = ?, sort_order = ? WHERE id = ?',
      v.arabic, v.transliteration, v.translation, v.meaning, v.verse, existing.id
    );
    return existing.id;
  }
  const result = await db.runAsync(
    'INSERT INTO verses (reading_id, verse_number, arabic_text, transliteration, translation, meaning, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
    readingId, v.verse, v.arabic, v.transliteration, v.translation, v.meaning, v.verse
  );
  return result.lastInsertRowId;
}

async function upsertWord(
  db: SQLiteDatabase, readingId: number, verseId: number,
  w: { arabic: string; transliteration: string; translation: string }, sortOrder: number,
): Promise<void> {
  const existing = await db.getFirstAsync<{ id: number }>(
    'SELECT id FROM words WHERE verse_id = ? AND sort_order = ?', verseId, sortOrder
  );
  if (existing) {
    await db.runAsync(
      'UPDATE words SET arabic_text = ?, transliteration = ?, translation = ? WHERE id = ?',
      w.arabic, w.transliteration, w.translation, existing.id
    );
  } else {
    await db.runAsync(
      'INSERT INTO words (verse_id, reading_id, arabic_text, transliteration, translation, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      verseId, readingId, w.arabic, w.transliteration, w.translation, sortOrder
    );
  }
}

async function seedReadingWithVerses(db: SQLiteDatabase, r: ReadingData, sortOrder: number, verses: VerseData[]) {
  const readingId = await upsertReading(db, r, sortOrder);
  for (const v of verses) {
    const verseId = await upsertVerse(db, readingId, v);
    for (let j = 0; j < v.words.length; j++) {
      await upsertWord(db, readingId, verseId, v.words[j], j + 1);
    }
  }
}

const readings: ReadingData[] = [
  { name: 'Niat Sholat', description: 'Bermaksud karena Allah', category: 'pembukaan', arabic_text: 'أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى', transliteration: 'Ushalli fardhash shubhi rak\'ataini mustaqbilal qiblati adaa\'an lillahi ta\'ala', translation: 'Aku niat sholat fardhu Subuh dua rakaat menghadap kiblat karena Allah Ta\'ala' },
  { name: 'Takbiratul Ihram', description: 'Niat & Pembukaan', category: 'pembukaan', arabic_text: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', translation: 'Allah Maha Besar' },
  { name: 'Doa Iftitah', description: 'Pujian Pembuka', category: 'pembukaan', arabic_text: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ', transliteration: 'Subhanakallahumma wa bihamdika wa tabarakasmuka wa ta\'ala jadduka wa la ilaha ghairuk', translation: 'Maha Suci Engkau Ya Allah, dengan memuji-Mu, Maha Berkah Nama-Mu, Maha Tinggi Kemuliaan-Mu, tidak ada Tuhan selain Engkau' },
  { name: 'Ta\'awudz', description: 'Mohon Perlindungan', category: 'pembukaan', arabic_text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ', transliteration: 'A\'udzu billahi minasy syaithanir rajim', translation: 'Aku berlindung kepada Allah dari setan yang terkutuk' },
  { name: 'Basmalah', description: 'Dengan Nama Allah', category: 'pembukaan', arabic_text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Bismillahirrahmanirrahim', translation: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang' },
  { name: 'Al-Fatihah', description: 'Ummul Kitab', category: 'bacaan', arabic_text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', transliteration: 'Alhamdu lillahi rabbil \'alamin', translation: 'Segala puji bagi Allah, Tuhan semesta alam' },
  { name: 'Aamiin', description: 'Kabulkanlah', category: 'bacaan', arabic_text: 'آمِينَ', transliteration: 'Aamiin', translation: 'Kabulkanlah Ya Allah' },
  { name: 'Al-Ikhlas', description: 'Surah ke-112', category: 'surah', arabic_text: 'قُلْ هُوَ اللَّهُ أَحَدٌ', transliteration: 'Qul huwallahu ahad', translation: 'Katakanlah, Dialah Allah Yang Maha Esa' },
  { name: 'Al-Falaq', description: 'Surah ke-113', category: 'surah', arabic_text: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', transliteration: 'Qul a\'udzu birabbil falaq', translation: 'Katakanlah, aku berlindung kepada Tuhan yang menguasai waktu subuh' },
  { name: 'An-Nas', description: 'Surah ke-114', category: 'surah', arabic_text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', transliteration: 'Qul a\'udzu birabbin nas', translation: 'Katakanlah, aku berlindung kepada Tuhan manusia' },
  { name: 'Ruku\'', description: 'Ketundukan Hati', category: 'gerakan', arabic_text: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ', transliteration: 'Subhana rabbiyal \'azimi wa bihamdih', translation: 'Maha Suci Tuhanku yang Maha Agung dan dengan memuji-Nya' },
  { name: 'I\'tidal', description: 'Bangun dari Ruku\'', category: 'gerakan', arabic_text: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ', transliteration: 'Sami\'allahu liman hamidah', translation: 'Semoga Allah mendengar orang yang memuji-Nya' },
  { name: 'Sujud', description: 'Kedekatan Tertinggi', category: 'gerakan', arabic_text: 'سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ', transliteration: 'Subhana rabbiyal a\'la wa bihamdih', translation: 'Maha Suci Tuhanku yang Maha Tinggi dan dengan memuji-Nya' },
  { name: 'Duduk di Antara Dua Sujud', description: 'Permohonan Ampunan', category: 'gerakan', arabic_text: 'رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي', transliteration: 'Rabbighfir li warhamni wajburni warfa\'ni warzuqni wahdini', translation: 'Ya Tuhanku, ampunilah aku, rahmatilah aku, perbaikilah aku, angkatlah derajatku, berilah rezeki dan petunjuk kepadaku' },
  { name: 'Tahiyat Awal', description: 'Syahadat Pertama', category: 'tasyahhud', arabic_text: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ', transliteration: 'Attahiyyatu lillahi wassalawatu wattayyibat', translation: 'Segala penghormatan, keberkahan, dan kebaikan hanya milik Allah' },
  { name: 'Tahiyat Akhir', description: 'Syahadat Kedua', category: 'tasyahhud', arabic_text: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ', transliteration: 'Allahumma shalli \'ala muhammadin wa \'ala ali muhammad', translation: 'Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan keluarga Nabi Muhammad' },
  { name: 'Doa Sebelum Salam', description: 'Mohon Kebaikan Dunia Akhirat', category: 'penutup', arabic_text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', transliteration: 'Rabbana atina fid dunya hasanah wa fil akhirati hasanah wa qina \'adzaban nar', translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan akhirat, lindungilah kami dari siksa neraka' },
  { name: 'Salam', description: 'Penutup Sholat', category: 'penutup', arabic_text: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ', transliteration: 'Assalamu\'alaikum warahmatullah', translation: 'Semoga keselamatan dan rahmat Allah dilimpahkan kepadamu' },
];

const versesByReading: Record<string, VerseData[]> = {
  'Niat Sholat': [
    { verse: 1, arabic: 'أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى', transliteration: 'Ushalli fardhash shubhi rak\'ataini mustaqbilal qiblati adaa\'an lillahi ta\'ala', translation: 'Aku niat sholat fardhu Subuh dua rakaat menghadap kiblat karena Allah Ta\'ala', meaning: 'Niat sholat Subuh.', words: [
      { arabic: 'أُصَلِّي', transliteration: 'Ushalli', translation: 'Aku niat sholat' },
      { arabic: 'فَرْضَ', transliteration: 'Fardha', translation: 'fardhu' },
      { arabic: 'الصُّبْحِ', transliteration: 'Ash-shubhi', translation: 'Subuh' },
      { arabic: 'رَكْعَتَيْنِ', transliteration: 'Rak\'ataini', translation: 'dua rakaat' },
      { arabic: 'مُسْتَقْبِلَ', transliteration: 'Mustaqbila', translation: 'menghadap' },
      { arabic: 'الْقِبْلَةِ', transliteration: 'Al-qiblati', translation: 'kiblat' },
      { arabic: 'أَدَاءً', transliteration: 'Adaa\'an', translation: 'dengan sungguh-sungguh' },
      { arabic: 'لِلَّهِ', transliteration: 'Lillahi', translation: 'karena Allah' },
      { arabic: 'تَعَالَى', transliteration: 'Ta\'ala', translation: 'Ta\'ala' },
    ] },
  ],
  'Takbiratul Ihram': [
    { verse: 1, arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', translation: 'Allah Maha Besar', meaning: 'Pernyataan kebesaran Allah yang menandai dimulainya sholat.', words: [
      { arabic: 'اللَّهُ', transliteration: 'Allahu', translation: 'Allah' },
      { arabic: 'أَكْبَرُ', transliteration: 'Akbar', translation: 'Maha Besar' },
    ] },
  ],
  'Doa Iftitah': [
    { verse: 1, arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ', transliteration: 'Subhanakallahumma wa bihamdika wa tabarakasmuka wa ta\'ala jadduka wa la ilaha ghairuk', translation: 'Maha Suci Engkau Ya Allah, dengan memuji-Mu, Maha Berkah Nama-Mu, Maha Tinggi Kemuliaan-Mu, tidak ada Tuhan selain Engkau', meaning: 'Doa pembuka yang memuji kebesaran Allah dan mengakui keesaan-Nya.', words: [
      { arabic: 'سُبْحَانَكَ', transliteration: 'Subhanaka', translation: 'Maha Suci Engkau' },
      { arabic: 'اللَّهُمَّ', transliteration: 'Allahumma', translation: 'Ya Allah' },
      { arabic: 'وَبِحَمْدِكَ', transliteration: 'Wa bihamdika', translation: 'dan dengan memuji-Mu' },
      { arabic: 'وَتَبَارَكَ', transliteration: 'Wa tabaraka', translation: 'dan Maha Berkah' },
      { arabic: 'اسْمُكَ', transliteration: 'Ismuka', translation: 'Nama-Mu' },
      { arabic: 'وَتَعَالَى', transliteration: 'Wa ta\'ala', translation: 'dan Maha Tinggi' },
      { arabic: 'جَدُّكَ', transliteration: 'Jadduka', translation: 'Kemuliaan-Mu' },
      { arabic: 'وَلَا', transliteration: 'Wa la', translation: 'dan tidak' },
      { arabic: 'إِلَهَ', transliteration: 'Ilaha', translation: 'Tuhan' },
      { arabic: 'غَيْرُكَ', transliteration: 'Ghairuka', translation: 'selain Engkau' },
    ] },
  ],
  'Ta\'awudz': [
    { verse: 1, arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ', transliteration: 'A\'udzu billahi minasy syaithanir rajim', translation: 'Aku berlindung kepada Allah dari setan yang terkutuk', meaning: 'Permohonan perlindungan dari godaan setan.', words: [
      { arabic: 'أَعُوذُ', transliteration: 'A\'udzu', translation: 'Aku berlindung' },
      { arabic: 'بِاللَّهِ', transliteration: 'Billahi', translation: 'kepada Allah' },
      { arabic: 'مِنَ', transliteration: 'Mina', translation: 'dari' },
      { arabic: 'الشَّيْطَانِ', transliteration: 'Asy-syaithani', translation: 'setan' },
      { arabic: 'الرَّجِيمِ', transliteration: 'Ar-rajimi', translation: 'yang terkutuk' },
    ] },
  ],
  'Basmalah': [
    { verse: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Bismillahirrahmanirrahim', translation: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang', meaning: 'Ayat pembuka yang mengajarkan untuk memulai segala sesuatu dengan nama Allah.', words: [
      { arabic: 'بِسْمِ', transliteration: 'Bismi', translation: 'Dengan nama' },
      { arabic: 'اللَّهِ', transliteration: 'Allahi', translation: 'Allah' },
      { arabic: 'الرَّحْمَٰنِ', transliteration: 'Ar-Rahmani', translation: 'Yang Maha Pengasih' },
      { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Rahimi', translation: 'Yang Maha Penyayang' },
    ] },
  ],
  'Al-Fatihah': [
    { verse: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Bismillahirrahmanirrahim', translation: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang', meaning: 'Ayat pembuka yang mengajarkan untuk memulai segala sesuatu dengan nama Allah.', words: [
      { arabic: 'بِسْمِ', transliteration: 'Bismi', translation: 'Dengan nama' },
      { arabic: 'اللَّهِ', transliteration: 'Allahi', translation: 'Allah' },
      { arabic: 'الرَّحْمَٰنِ', transliteration: 'Ar-Rahmani', translation: 'Yang Maha Pengasih' },
      { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Rahimi', translation: 'Yang Maha Penyayang' },
    ] },
    { verse: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', transliteration: 'Alhamdu lillahi rabbil \'alamin', translation: 'Segala puji bagi Allah, Tuhan semesta alam', meaning: 'Pujian sempurna hanya milik Allah, penguasa dan pemelihara seluruh alam.', words: [
      { arabic: 'الْحَمْدُ', transliteration: 'Alhamdu', translation: 'Segala puji' },
      { arabic: 'لِلَّهِ', transliteration: 'Lillahi', translation: 'Bagi Allah' },
      { arabic: 'رَبِّ', transliteration: 'Rabbil', translation: 'Tuhan' },
      { arabic: 'الْعَالَمِينَ', transliteration: 'Al-\'alamin', translation: 'Semesta alam' },
    ] },
    { verse: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Arrahmanirrahim', translation: 'Yang Maha Pengasih lagi Maha Penyayang', meaning: 'Allah memiliki sifat kasih sayang yang meliputi seluruh ciptaan-Nya.', words: [
      { arabic: 'الرَّحْمَٰنِ', transliteration: 'Ar-Rahmani', translation: 'Yang Maha Pengasih' },
      { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Rahimi', translation: 'Yang Maha Penyayang' },
    ] },
    { verse: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', transliteration: 'Maliki yawmiddin', translation: 'Yang menguasai hari pembalasan', meaning: 'Allah adalah satu-satunya penguasa di hari kiamat nanti.', words: [
      { arabic: 'مَالِكِ', transliteration: 'Maliki', translation: 'Yang menguasai' },
      { arabic: 'يَوْمِ', transliteration: 'Yawmi', translation: 'Hari' },
      { arabic: 'الدِّينِ', transliteration: 'Ad-Dini', translation: 'Pembalasan' },
    ] },
    { verse: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', transliteration: 'Iyyaka na\'budu wa iyyaka nasta\'in', translation: 'Hanya kepada Engkau kami menyembah dan hanya kepada Engkau kami memohon pertolongan', meaning: 'Pernyataan tauhid dan tawakal yang sempurna hanya kepada Allah.', words: [
      { arabic: 'إِيَّاكَ', transliteration: 'Iyyaka', translation: 'Hanya kepada Engkau' },
      { arabic: 'نَعْبُدُ', transliteration: 'Na\'budu', translation: 'Kami menyembah' },
      { arabic: 'وَإِيَّاكَ', transliteration: 'Wa iyyaka', translation: 'Dan hanya kepada Engkau' },
      { arabic: 'نَسْتَعِينُ', transliteration: 'Nasta\'in', translation: 'Kami memohon pertolongan' },
    ] },
    { verse: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', transliteration: 'Ihdinas siratal mustaqim', translation: 'Tunjukilah kami jalan yang lurus', meaning: 'Permohonan petunjuk untuk tetap berada di jalan kebenaran.', words: [
      { arabic: 'اهْدِنَا', transliteration: 'Ihdina', translation: 'Tunjukilah kami' },
      { arabic: 'الصِّرَاطَ', transliteration: 'As-Sirata', translation: 'Jalan' },
      { arabic: 'الْمُسْتَقِيمَ', transliteration: 'Al-Mustaqima', translation: 'Yang lurus' },
    ] },
    { verse: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', transliteration: 'Siratal ladzina an\'amta \'alaihim ghairil maghdubi \'alaihim waladhdhallin', translation: 'Jalan orang-orang yang telah Engkau beri nikmat, bukan jalan mereka yang dimurkai dan bukan pula jalan mereka yang sesat', meaning: 'Permohonan untuk mengikuti jalan orang-orang beriman dan terhindar dari kesesatan.', words: [
      { arabic: 'صِرَاطَ', transliteration: 'Sirata', translation: 'Jalan' },
      { arabic: 'الَّذِينَ', transliteration: 'Alladzina', translation: 'Orang-orang yang' },
      { arabic: 'أَنْعَمْتَ', transliteration: 'An\'amta', translation: 'Engkau beri nikmat' },
      { arabic: 'عَلَيْهِمْ', transliteration: '\'Alaihim', translation: 'Kepada mereka' },
      { arabic: 'غَيْرِ', transliteration: 'Ghairi', translation: 'Bukan' },
      { arabic: 'الْمَغْضُوبِ', transliteration: 'Al-Maghdubi', translation: 'Yang dimurkai' },
      { arabic: 'عَلَيْهِمْ', transliteration: '\'Alaihim', translation: 'Kepada mereka' },
      { arabic: 'وَلَا', transliteration: 'Wa la', translation: 'Dan tidak' },
      { arabic: 'الضَّالِّينَ', transliteration: 'Ad-Dhallin', translation: 'Orang-orang yang sesat' },
    ] },
  ],
  'Aamiin': [
    { verse: 1, arabic: 'آمِينَ', transliteration: 'Aamiin', translation: 'Kabulkanlah Ya Allah', meaning: 'Permohonan agar doa dikabulkan oleh Allah.', words: [
      { arabic: 'آمِينَ', transliteration: 'Aamiin', translation: 'Kabulkanlah' },
    ] },
  ],
  'Al-Ikhlas': [
    { verse: 1, arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', transliteration: 'Qul huwallahu ahad', translation: 'Katakanlah, Dialah Allah Yang Maha Esa', meaning: 'Perintah untuk menyatakan keesaan Allah.', words: [
      { arabic: 'قُلْ', transliteration: 'Qul', translation: 'Katakanlah' },
      { arabic: 'هُوَ', transliteration: 'Huwa', translation: 'Dialah' },
      { arabic: 'اللَّهُ', transliteration: 'Allahu', translation: 'Allah' },
      { arabic: 'أَحَدٌ', transliteration: 'Ahad', translation: 'Yang Maha Esa' },
    ] },
    { verse: 2, arabic: 'اللَّهُ الصَّمَدُ', transliteration: 'Allahush shamad', translation: 'Allah tempat meminta segala sesuatu', meaning: 'Allah adalah tempat bergantung seluruh makhluk.', words: [
      { arabic: 'اللَّهُ', transliteration: 'Allahu', translation: 'Allah' },
      { arabic: 'الصَّمَدُ', transliteration: 'As-shamadu', translation: 'tempat meminta' },
    ] },
    { verse: 3, arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', transliteration: 'Lam yalid wa lam yulad', translation: 'Dia tidak beranak dan tidak diperanakkan', meaning: 'Allah tidak ada awal dan tidak ada akhir.', words: [
      { arabic: 'لَمْ', transliteration: 'Lam', translation: 'tidak' },
      { arabic: 'يَلِدْ', transliteration: 'Yalid', translation: 'beranak' },
      { arabic: 'وَلَمْ', transliteration: 'Wa lam', translation: 'dan tidak' },
      { arabic: 'يُولَدْ', transliteration: 'Yulad', translation: 'diperanakkan' },
    ] },
    { verse: 4, arabic: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ', transliteration: 'Wa lam yakullahu kufuwan ahad', translation: 'Dan tidak ada sesuatu yang setara dengan Dia', meaning: 'Tidak ada yang menyamai Allah dalam segala hal.', words: [
      { arabic: 'وَلَمْ', transliteration: 'Wa lam', translation: 'dan tidak' },
      { arabic: 'يَكُنْ', transliteration: 'Yakun', translation: 'ada' },
      { arabic: 'لَهُ', transliteration: 'Lahu', translation: 'bagi-Nya' },
      { arabic: 'كُفُوًا', transliteration: 'Kufuwan', translation: 'yang setara' },
      { arabic: 'أَحَدٌ', transliteration: 'Ahad', translation: 'seorang pun' },
    ] },
  ],
  'Al-Falaq': [
    { verse: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', transliteration: 'Qul a\'udzu birabbil falaq', translation: 'Katakanlah, aku berlindung kepada Tuhan yang menguasai waktu subuh', meaning: 'Permohonan perlindungan kepada Allah dari segala kejahatan.', words: [
      { arabic: 'قُلْ', transliteration: 'Qul', translation: 'Katakanlah' },
      { arabic: 'أَعُوذُ', transliteration: 'A\'udzu', translation: 'aku berlindung' },
      { arabic: 'بِرَبِّ', transliteration: 'Birabbi', translation: 'kepada Tuhan' },
      { arabic: 'الْفَلَقِ', transliteration: 'Al-falaqi', translation: 'waktu subuh' },
    ] },
    { verse: 2, arabic: 'مِنْ شَرِّ مَا خَلَقَ', transliteration: 'Min syarri ma khalaq', translation: 'Dari kejahatan makhluk yang Dia ciptakan', meaning: 'Berlindung dari kejahatan seluruh ciptaan Allah.', words: [
      { arabic: 'مِنْ', transliteration: 'Min', translation: 'dari' },
      { arabic: 'شَرِّ', transliteration: 'Syarri', translation: 'kejahatan' },
      { arabic: 'مَا', transliteration: 'Ma', translation: 'apa yang' },
      { arabic: 'خَلَقَ', transliteration: 'Khalaqa', translation: 'Dia ciptakan' },
    ] },
    { verse: 3, arabic: 'وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ', transliteration: 'Wa min syarri ghasiqin idza waqab', translation: 'Dan dari kejahatan malam apabila telah gelap gulita', meaning: 'Berlindung dari kejahatan yang datang di malam hari.', words: [
      { arabic: 'وَمِنْ', transliteration: 'Wa min', translation: 'dan dari' },
      { arabic: 'شَرِّ', transliteration: 'Syarri', translation: 'kejahatan' },
      { arabic: 'غَاسِقٍ', transliteration: 'Ghasiqin', translation: 'malam yang gelap' },
      { arabic: 'إِذَا', transliteration: 'Idza', translation: 'apabila' },
      { arabic: 'وَقَبَ', transliteration: 'Waqaba', translation: 'telah gelap' },
    ] },
    { verse: 4, arabic: 'وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', transliteration: 'Wa min syarrin naffatsati fil \'uqad', translation: 'Dan dari kejahatan wanita-wanita tukang sihir yang meniup ikatan', meaning: 'Berlindung dari kejahatan sihir.', words: [
      { arabic: 'وَمِنْ', transliteration: 'Wa min', translation: 'dan dari' },
      { arabic: 'شَرِّ', transliteration: 'Syarri', translation: 'kejahatan' },
      { arabic: 'النَّفَّاثَاتِ', transliteration: 'An-naffatsati', translation: 'yang meniup' },
      { arabic: 'فِي', transliteration: 'Fi', translation: 'pada' },
      { arabic: 'الْعُقَدِ', transliteration: 'Al-\'uqadi', translation: 'ikatan' },
    ] },
    { verse: 5, arabic: 'وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ', transliteration: 'Wa min syarri hasidin idza hasad', translation: 'Dan dari kejahatan orang yang dengki apabila ia dengki', meaning: 'Berlindung dari kejahatan kedengkian.', words: [
      { arabic: 'وَمِنْ', transliteration: 'Wa min', translation: 'dan dari' },
      { arabic: 'شَرِّ', transliteration: 'Syarri', translation: 'kejahatan' },
      { arabic: 'حَاسِدٍ', transliteration: 'Hasidin', translation: 'orang yang dengki' },
      { arabic: 'إِذَا', transliteration: 'Idza', translation: 'apabila' },
      { arabic: 'حَسَدَ', transliteration: 'Hasada', translation: 'ia dengki' },
    ] },
  ],
  'An-Nas': [
    { verse: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', transliteration: 'Qul a\'udzu birabbin nas', translation: 'Katakanlah, aku berlindung kepada Tuhan manusia', meaning: 'Permohonan perlindungan kepada Tuhan seluruh manusia.', words: [
      { arabic: 'قُلْ', transliteration: 'Qul', translation: 'Katakanlah' },
      { arabic: 'أَعُوذُ', transliteration: 'A\'udzu', translation: 'aku berlindung' },
      { arabic: 'بِرَبِّ', transliteration: 'Birabbi', translation: 'kepada Tuhan' },
      { arabic: 'النَّاسِ', transliteration: 'An-nasi', translation: 'manusia' },
    ] },
    { verse: 2, arabic: 'مَلِكِ النَّاسِ', transliteration: 'Malikin nas', translation: 'Raja manusia', meaning: 'Allah adalah raja seluruh manusia.', words: [
      { arabic: 'مَلِكِ', transliteration: 'Maliki', translation: 'Raja' },
      { arabic: 'النَّاسِ', transliteration: 'An-nasi', translation: 'manusia' },
    ] },
    { verse: 3, arabic: 'إِلَٰهِ النَّاسِ', transliteration: 'Ilahin nas', translation: 'Sembahan manusia', meaning: 'Allah adalah Tuhan yang disembah manusia.', words: [
      { arabic: 'إِلَٰهِ', transliteration: 'Ilahi', translation: 'Tuhan' },
      { arabic: 'النَّاسِ', transliteration: 'An-nasi', translation: 'manusia' },
    ] },
    { verse: 4, arabic: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', transliteration: 'Min syarril waswasil khannas', translation: 'Dari kejahatan bisikan setan yang bersembunyi', meaning: 'Berlindung dari bisikan setan yang datang diam-diam.', words: [
      { arabic: 'مِنْ', transliteration: 'Min', translation: 'dari' },
      { arabic: 'شَرِّ', transliteration: 'Syarri', translation: 'kejahatan' },
      { arabic: 'الْوَسْوَاسِ', transliteration: 'Al-waswasi', translation: 'bisikan' },
      { arabic: 'الْخَنَّاسِ', transliteration: 'Al-khannasi', translation: 'yang bersembunyi' },
    ] },
    { verse: 5, arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', transliteration: 'Alladzi yuwaswisu fi shudurin nas', translation: 'Yang membisikkan kejahatan ke dalam dada manusia', meaning: 'Setan membisikkan godaan ke dalam hati manusia.', words: [
      { arabic: 'الَّذِي', transliteration: 'Alladzi', translation: 'yang' },
      { arabic: 'يُوَسْوِسُ', transliteration: 'Yuwaswisu', translation: 'membisikkan' },
      { arabic: 'فِي', transliteration: 'Fi', translation: 'ke dalam' },
      { arabic: 'صُدُورِ', transliteration: 'Shuduri', translation: 'dada' },
      { arabic: 'النَّاسِ', transliteration: 'An-nasi', translation: 'manusia' },
    ] },
    { verse: 6, arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ', transliteration: 'Minal jinnati wan nas', translation: 'Dari golongan jin dan manusia', meaning: 'Setan berasal dari kalangan jin dan manusia.', words: [
      { arabic: 'مِنَ', transliteration: 'Mina', translation: 'dari' },
      { arabic: 'الْجِنَّةِ', transliteration: 'Al-jinnati', translation: 'jin' },
      { arabic: 'وَالنَّاسِ', transliteration: 'Wan-nasi', translation: 'dan manusia' },
    ] },
  ],
  'Ruku\'': [
    { verse: 1, arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ', transliteration: 'Subhana rabbiyal \'azimi wa bihamdih', translation: 'Maha Suci Tuhanku yang Maha Agung dan dengan memuji-Nya', meaning: 'Mengagungkan Allah saat ruku\' dengan mengakui kebesaran-Nya.', words: [
      { arabic: 'سُبْحَانَ', transliteration: 'Subhana', translation: 'Maha Suci' },
      { arabic: 'رَبِّيَ', transliteration: 'Rabbiya', translation: 'Tuhanku' },
      { arabic: 'الْعَظِيمِ', transliteration: 'Al-\'azimi', translation: 'Yang Maha Agung' },
      { arabic: 'وَبِحَمْدِهِ', transliteration: 'Wa bihamdih', translation: 'dan dengan memuji-Nya' },
    ] },
  ],
  'I\'tidal': [
    { verse: 1, arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ', transliteration: 'Sami\'allahu liman hamidah', translation: 'Semoga Allah mendengar orang yang memuji-Nya', meaning: 'Pernyataan bahwa Allah mendengar hamba-Nya yang memuji-Nya.', words: [
      { arabic: 'سَمِعَ', transliteration: 'Sami\'a', translation: 'Mendengar (Allah)' },
      { arabic: 'اللَّهُ', transliteration: 'Allahu', translation: 'Allah' },
      { arabic: 'لِمَنْ', transliteration: 'Liman', translation: 'orang yang' },
      { arabic: 'حَمِدَهُ', transliteration: 'Hamidah', translation: 'memuji-Nya' },
    ] },
    { verse: 2, arabic: 'رَبَّنَا لَكَ الْحَمْدُ', transliteration: 'Rabbana lakal hamdu', translation: 'Ya Tuhan kami, bagi-Mu segala puji', meaning: 'Tambahan doa setelah bangun dari ruku\'.', words: [
      { arabic: 'رَبَّنَا', transliteration: 'Rabbana', translation: 'Ya Tuhan kami' },
      { arabic: 'لَكَ', transliteration: 'Laka', translation: 'bagi-Mu' },
      { arabic: 'الْحَمْدُ', transliteration: 'Al-hamdu', translation: 'segala puji' },
    ] },
  ],
  'Sujud': [
    { verse: 1, arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ', transliteration: 'Subhana rabbiyal a\'la wa bihamdih', translation: 'Maha Suci Tuhanku yang Maha Tinggi dan dengan memuji-Nya', meaning: 'Mengagungkan Allah saat sujud dengan mengakui ketinggian-Nya.', words: [
      { arabic: 'سُبْحَانَ', transliteration: 'Subhana', translation: 'Maha Suci' },
      { arabic: 'رَبِّيَ', transliteration: 'Rabbiya', translation: 'Tuhanku' },
      { arabic: 'الْأَعْلَى', transliteration: 'Al-a\'la', translation: 'Yang Maha Tinggi' },
      { arabic: 'وَبِحَمْدِهِ', transliteration: 'Wa bihamdih', translation: 'dan dengan memuji-Nya' },
    ] },
  ],
  'Duduk di Antara Dua Sujud': [
    { verse: 1, arabic: 'رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي', transliteration: 'Rabbighfir li warhamni wajburni warfa\'ni warzuqni wahdini', translation: 'Ya Tuhanku, ampunilah aku, rahmatilah aku, perbaikilah aku, angkatlah derajatku, berilah rezeki dan petunjuk kepadaku', meaning: 'Permohonan lengkap seorang hamba kepada Rabb-nya saat duduk di antara dua sujud.', words: [
      { arabic: 'رَبِّ', transliteration: 'Rabb', translation: 'Ya Tuhanku' },
      { arabic: 'اغْفِرْ', transliteration: 'Ighfir', translation: 'ampunilah' },
      { arabic: 'لِي', transliteration: 'Li', translation: 'aku' },
      { arabic: 'وَارْحَمْنِي', transliteration: 'Warhamni', translation: 'dan rahmatilah aku' },
      { arabic: 'وَاجْبُرْنِي', transliteration: 'Wajburni', translation: 'dan perbaikilah aku' },
      { arabic: 'وَارْفَعْنِي', transliteration: 'Warfa\'ni', translation: 'dan angkatlah derajatku' },
      { arabic: 'وَارْزُقْنِي', transliteration: 'Warzuqni', translation: 'dan berilah rezeki aku' },
      { arabic: 'وَاهْدِنِي', transliteration: 'Wahdini', translation: 'dan berilah petunjuk aku' },
    ] },
  ],
  'Tahiyat Awal': [
    { verse: 1, arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ', transliteration: 'Attahiyyatu lillahi wassalawatu wattayyibat', translation: 'Segala penghormatan, ibadah, dan kebaikan hanya milik Allah', meaning: 'Pernyataan penghormatan dan pengakuan bahwa segala ibadah hanya untuk Allah.', words: [
      { arabic: 'التَّحِيَّاتُ', transliteration: 'Attahiyyatu', translation: 'Segala penghormatan' },
      { arabic: 'لِلَّهِ', transliteration: 'Lillahi', translation: 'milik Allah' },
      { arabic: 'وَالصَّلَوَاتُ', transliteration: 'Wassalawatu', translation: 'dan segala ibadah' },
      { arabic: 'وَالطَّيِّبَاتُ', transliteration: 'Wattayyibat', translation: 'dan segala kebaikan' },
    ] },
    { verse: 2, arabic: 'السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ', transliteration: 'Assalamu \'alaika ayyuhan nabiyyu warahmatullahi wabarakatuh', translation: 'Semoga keselamatan tercurah kepadamu wahai Nabi, serta rahmat Allah dan keberkahan-Nya', meaning: 'Salam kepada Nabi Muhammad SAW.', words: [
      { arabic: 'السَّلَامُ', transliteration: 'Assalamu', translation: 'Semoga keselamatan' },
      { arabic: 'عَلَيْكَ', transliteration: '\'Alaika', translation: 'atasmu' },
      { arabic: 'أَيُّهَا', transliteration: 'Ayyuha', translation: 'wahai' },
      { arabic: 'النَّبِيُّ', transliteration: 'An-nabiyyu', translation: 'Nabi' },
      { arabic: 'وَرَحْمَةُ', transliteration: 'Warahmatu', translation: 'dan rahmat' },
      { arabic: 'اللَّهِ', transliteration: 'Allahi', translation: 'Allah' },
      { arabic: 'وَبَرَكَاتُهُ', transliteration: 'Wabarakatuh', translation: 'dan keberkahan-Nya' },
    ] },
    { verse: 3, arabic: 'السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ', transliteration: 'Assalamu \'alaina wa \'ala \'ibadillahish shalihin', translation: 'Semoga keselamatan tercurah kepada kami dan hamba-hamba Allah yang saleh', meaning: 'Salam kepada seluruh hamba Allah yang saleh.', words: [
      { arabic: 'السَّلَامُ', transliteration: 'Assalamu', translation: 'Semoga keselamatan' },
      { arabic: 'عَلَيْنَا', transliteration: '\'Alaina', translation: 'atas kami' },
      { arabic: 'وَعَلَى', transliteration: 'Wa \'ala', translation: 'dan atas' },
      { arabic: 'عِبَادِ', transliteration: '\'Ibad', translation: 'hamba-hamba' },
      { arabic: 'اللَّهِ', transliteration: 'Allahi', translation: 'Allah' },
      { arabic: 'الصَّالِحِينَ', transliteration: 'Ash-shalihin', translation: 'yang saleh' },
    ] },
    { verse: 4, arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ', transliteration: 'Asyhadu an la ilaha illallahu wa asyhadu anna muhammadan rasulullah', translation: 'Aku bersaksi bahwa tidak ada Tuhan selain Allah dan aku bersaksi bahwa Nabi Muhammad adalah utusan Allah', meaning: 'Dua kalimat syahadat sebagai inti dari tasyahhud.', words: [
      { arabic: 'أَشْهَدُ', transliteration: 'Asyhadu', translation: 'Aku bersaksi' },
      { arabic: 'أَنْ', transliteration: 'An', translation: 'bahwa' },
      { arabic: 'لَا', transliteration: 'La', translation: 'tidak ada' },
      { arabic: 'إِلَهَ', transliteration: 'Ilaha', translation: 'Tuhan' },
      { arabic: 'إِلَّا', transliteration: 'Illa', translation: 'selain' },
      { arabic: 'اللَّهُ', transliteration: 'Allahu', translation: 'Allah' },
      { arabic: 'وَأَشْهَدُ', transliteration: 'Wa asyhadu', translation: 'dan aku bersaksi' },
      { arabic: 'أَنَّ', transliteration: 'Anna', translation: 'bahwa' },
      { arabic: 'مُحَمَّدًا', transliteration: 'Muhammadan', translation: 'Nabi Muhammad' },
      { arabic: 'رَسُولُ', transliteration: 'Rasulu', translation: 'utusan' },
      { arabic: 'اللَّهِ', transliteration: 'Allahi', translation: 'Allah' },
    ] },
  ],
  'Tahiyat Akhir': [
    { verse: 1, arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ', transliteration: 'Allahumma shalli \'ala muhammadin wa \'ala ali muhammad', translation: 'Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan keluarga Nabi Muhammad', meaning: 'Shalawat kepada Nabi Muhammad dan keluarganya.', words: [
      { arabic: 'اللَّهُمَّ', transliteration: 'Allahumma', translation: 'Ya Allah' },
      { arabic: 'صَلِّ', transliteration: 'Shalli', translation: 'limpahkanlah rahmat' },
      { arabic: 'عَلَى', transliteration: '\'Ala', translation: 'kepada' },
      { arabic: 'مُحَمَّدٍ', transliteration: 'Muhammadin', translation: 'Nabi Muhammad' },
      { arabic: 'وَعَلَى', transliteration: 'Wa \'ala', translation: 'dan kepada' },
      { arabic: 'آلِ', transliteration: 'Ali', translation: 'keluarga' },
      { arabic: 'مُحَمَّدٍ', transliteration: 'Muhammadin', translation: 'Muhammad' },
    ] },
    { verse: 2, arabic: 'كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ', transliteration: 'Kama shallaita \'ala ibrahima wa \'ala ali ibrahim', translation: 'Sebagaimana Engkau telah melimpahkan rahmat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim', meaning: 'Menyamakan shalawat kepada Muhammad dengan shalawat kepada Ibrahim.', words: [
      { arabic: 'كَمَا', transliteration: 'Kama', translation: 'sebagaimana' },
      { arabic: 'صَلَّيْتَ', transliteration: 'Shallaita', translation: 'Engkau telah melimpahkan rahmat' },
      { arabic: 'عَلَى', transliteration: '\'Ala', translation: 'kepada' },
      { arabic: 'إِبْرَاهِيمَ', transliteration: 'Ibrahima', translation: 'Nabi Ibrahim' },
      { arabic: 'وَعَلَى', transliteration: 'Wa \'ala', translation: 'dan kepada' },
      { arabic: 'آلِ', transliteration: 'Ali', translation: 'keluarga' },
      { arabic: 'إِبْرَاهِيمَ', transliteration: 'Ibrahima', translation: 'Ibrahim' },
    ] },
    { verse: 3, arabic: 'إِنَّكَ حَمِيدٌ مَجِيدٌ', transliteration: 'Innaka hamidun majid', translation: 'Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia', meaning: 'Penutup shalawat dengan pujian kepada Allah.', words: [
      { arabic: 'إِنَّكَ', transliteration: 'Innaka', translation: 'Sesungguhnya Engkau' },
      { arabic: 'حَمِيدٌ', transliteration: 'Hamidun', translation: 'Maha Terpuji' },
      { arabic: 'مَجِيدٌ', transliteration: 'Majidun', translation: 'Maha Mulia' },
    ] },
    { verse: 4, arabic: 'اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ', transliteration: 'Allahumma barik \'ala muhammadin wa \'ala ali muhammad', translation: 'Ya Allah, berkahilah Nabi Muhammad dan keluarga Nabi Muhammad', meaning: 'Permohonan keberkahan untuk Nabi dan keluarganya.', words: [
      { arabic: 'اللَّهُمَّ', transliteration: 'Allahumma', translation: 'Ya Allah' },
      { arabic: 'بَارِكْ', transliteration: 'Barik', translation: 'berkahilah' },
      { arabic: 'عَلَى', transliteration: '\'Ala', translation: 'kepada' },
      { arabic: 'مُحَمَّدٍ', transliteration: 'Muhammadin', translation: 'Nabi Muhammad' },
      { arabic: 'وَعَلَى', transliteration: 'Wa \'ala', translation: 'dan kepada' },
      { arabic: 'آلِ', transliteration: 'Ali', translation: 'keluarga' },
      { arabic: 'مُحَمَّدٍ', transliteration: 'Muhammadin', translation: 'Muhammad' },
    ] },
    { verse: 5, arabic: 'كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ', transliteration: 'Kama barakta \'ala ibrahima wa \'ala ali ibrahim', translation: 'Sebagaimana Engkau telah memberkahi Nabi Ibrahim dan keluarga Nabi Ibrahim', meaning: 'Menyamakan keberkahan kepada Muhammad dengan keberkahan kepada Ibrahim.', words: [
      { arabic: 'كَمَا', transliteration: 'Kama', translation: 'sebagaimana' },
      { arabic: 'بَارَكْتَ', transliteration: 'Barakta', translation: 'Engkau telah memberkahi' },
      { arabic: 'عَلَى', transliteration: '\'Ala', translation: 'kepada' },
      { arabic: 'إِبْرَاهِيمَ', transliteration: 'Ibrahima', translation: 'Nabi Ibrahim' },
      { arabic: 'وَعَلَى', transliteration: 'Wa \'ala', translation: 'dan kepada' },
      { arabic: 'آلِ', transliteration: 'Ali', translation: 'keluarga' },
      { arabic: 'إِبْرَاهِيمَ', transliteration: 'Ibrahima', translation: 'Ibrahim' },
    ] },
    { verse: 6, arabic: 'إِنَّكَ حَمِيدٌ مَجِيدٌ', transliteration: 'Innaka hamidun majid', translation: 'Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia', meaning: 'Penutup shalawat dengan pujian kepada Allah.', words: [
      { arabic: 'إِنَّكَ', transliteration: 'Innaka', translation: 'Sesungguhnya Engkau' },
      { arabic: 'حَمِيدٌ', transliteration: 'Hamidun', translation: 'Maha Terpuji' },
      { arabic: 'مَجِيدٌ', transliteration: 'Majidun', translation: 'Maha Mulia' },
    ] },
  ],
  'Doa Sebelum Salam': [
    { verse: 1, arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', transliteration: 'Rabbana atina fid dunya hasanah wa fil akhirati hasanah wa qina \'adzaban nar', translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan akhirat, dan lindungilah kami dari siksa neraka', meaning: 'Doa memohon kebaikan dunia akhirat dan perlindungan dari siksa neraka.', words: [
      { arabic: 'رَبَّنَا', transliteration: 'Rabbana', translation: 'Ya Tuhan kami' },
      { arabic: 'آتِنَا', transliteration: 'Atina', translation: 'berilah kami' },
      { arabic: 'فِي', transliteration: 'Fi', translation: 'di' },
      { arabic: 'الدُّنْيَا', transliteration: 'Ad-dunya', translation: 'dunia' },
      { arabic: 'حَسَنَةً', transliteration: 'Hasanah', translation: 'kebaikan' },
      { arabic: 'وَفِي', transliteration: 'Wa fi', translation: 'dan di' },
      { arabic: 'الْآخِرَةِ', transliteration: 'Al-akhirati', translation: 'akhirat' },
      { arabic: 'حَسَنَةً', transliteration: 'Hasanah', translation: 'kebaikan' },
      { arabic: 'وَقِنَا', transliteration: 'Wa qina', translation: 'dan lindungilah kami' },
      { arabic: 'عَذَابَ', transliteration: '\'Adzaba', translation: 'siksa' },
      { arabic: 'النَّارِ', transliteration: 'An-nari', translation: 'neraka' },
    ] },
  ],
  'Salam': [
    { verse: 1, arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ', transliteration: 'Assalamu\'alaikum warahmatullah', translation: 'Semoga keselamatan dan rahmat Allah dilimpahkan kepadamu', meaning: 'Salam penutup sebagai doa keselamatan bagi yang mendengar.', words: [
      { arabic: 'السَّلَامُ', transliteration: 'Assalamu', translation: 'Semoga keselamatan' },
      { arabic: 'عَلَيْكُمْ', transliteration: '\'Alaikum', translation: 'atas kalian' },
      { arabic: 'وَرَحْمَةُ', transliteration: 'Warahmatu', translation: 'dan rahmat' },
      { arabic: 'اللَّهِ', transliteration: 'Allahi', translation: 'Allah' },
    ] },
  ],
};

type MigrationFn = (db: SQLiteDatabase) => Promise<void>;

const migrations: Record<number, { desc: string; fn: MigrationFn }> = {
  1: {
    desc: 'Initial seed — all 18 readings with verses and words',
    fn: async (db) => {
      for (let i = 0; i < readings.length; i++) {
        const r = readings[i];
        const verses = versesByReading[r.name];
        if (verses) {
          await seedReadingWithVerses(db, r, i + 1, verses);
        } else {
          await upsertReading(db, r, i + 1);
        }
      }
      await db.runAsync("INSERT OR IGNORE INTO user_settings (key, value) VALUES ('onboarding_complete', 'false')");
      await db.runAsync("INSERT OR IGNORE INTO user_settings (key, value) VALUES ('streak', '0')");
      await db.runAsync("INSERT OR IGNORE INTO user_settings (key, value) VALUES ('daily_goal', '20')");
    },
  },
};

export const LATEST_MIGRATION = Math.max(...Object.keys(migrations).map(Number));

export async function runMigrations(db: SQLiteDatabase, fromVersion: number) {
  const versions = Object.keys(migrations).map(Number).sort((a, b) => a - b);
  for (const version of versions) {
    if (version > fromVersion) {
      const migration = migrations[version];
      await db.execAsync('BEGIN');
      try {
        await migration.fn(db);
        await db.runAsync(
          "INSERT OR REPLACE INTO user_settings (key, value) VALUES ('schema_version', ?)",
          String(version)
        );
        await db.execAsync('COMMIT');
      } catch (e) {
        await db.execAsync('ROLLBACK');
        console.error(`Migration v${version} (${migration.desc}) failed:`, e);
        throw e;
      }
    }
  }
}
