import { createEmptyCard, fsrs, type FSRS, type Grade, Rating, type Card as FSRSCard } from 'ts-fsrs';
import { allReadings, allVerses, allWords } from '@/data/readings';
import { getDb } from './database';

export type Reading = {
  id: number;
  name: string;
  description: string;
  category: string;
  sort_order: number;
  arabic_text: string;
  transliteration: string;
  translation: string;
};

export type Verse = {
  id: number;
  reading_id: number;
  verse_number: number;
  arabic_text: string;
  transliteration: string;
  translation: string;
  meaning: string;
};

export type Word = {
  id: number;
  verse_id: number;
  reading_id: number;
  arabic_text: string;
  transliteration: string;
  translation: string;
  sort_order: number;
};

export type LearningProgress = {
  id: number;
  entity_type: 'word' | 'verse';
  entity_id: number;
  stability: number;
  difficulty: number;
  state: number;
  due: string | null;
  last_review: string | null;
  reps: number;
  lapses: number;
  learning_steps: number;
  last_quality: number | null;
};

export type StudySession = {
  id: number;
  words_studied: number;
  words_mastered: number;
  duration_minutes: number;
  created_at: string;
};

export type DueItemWithContent = {
  progress_id: number;
  entity_type: 'word' | 'verse';
  entity_id: number;
  reading_id: number;
  reading_name: string;
  arabic_text: string;
  transliteration: string;
  translation: string;
  meaning: string | null;
  stability: number;
  difficulty: number;
  state: number;
  due: string;
  reps: number;
  lapses: number;
};

const scheduler: FSRS = fsrs();

function qualityToRating(quality: number): Grade {
  if (quality <= 1) return Rating.Again as Grade;
  if (quality === 2) return Rating.Hard as Grade;
  if (quality === 3) return Rating.Good as Grade;
  return Rating.Easy as Grade;
}

function cardToRow(entityType: string, entityId: number, card: FSRSCard, quality: number) {
  return [
    entityType,
    entityId,
    card.stability,
    card.difficulty,
    card.state,
    card.due.toISOString(),
    card.last_review?.toISOString() ?? null,
    card.reps,
    card.lapses,
    card.learning_steps,
    quality,
  ];
}

export const readingService = {
  getReadings: async (): Promise<Reading[]> => {
    return [...allReadings].sort((a, b) => a.sort_order - b.sort_order);
  },

  getReadingById: async (id: number): Promise<Reading | null> => {
    return allReadings.find((r) => r.id === id) ?? null;
  },

  getVersesByReadingId: async (readingId: number): Promise<Verse[]> => {
    return allVerses
      .filter((v) => v.reading_id === readingId)
      .sort((a, b) => a.verse_number - b.verse_number);
  },

  getVerseById: async (id: number): Promise<Verse | null> => {
    return allVerses.find((v) => v.id === id) ?? null;
  },

  getWordsByVerseId: async (verseId: number): Promise<Word[]> => {
    return allWords
      .filter((w) => w.verse_id === verseId)
      .sort((a, b) => a.sort_order - b.sort_order);
  },

  getWordsByReadingId: async (readingId: number): Promise<Word[]> => {
    return allWords
      .filter((w) => w.reading_id === readingId)
      .sort((a, b) => a.sort_order - b.sort_order);
  },

  getProgress: async (entityType: string, entityId: number): Promise<LearningProgress | null> => {
    const db = await getDb();
    const row = await db.getFirstAsync<LearningProgress>(
      'SELECT * FROM learning_progress WHERE entity_type = ? AND entity_id = ?',
      entityType,
      entityId
    );
    return row ?? null;
  },

  getAllProgress: async (): Promise<LearningProgress[]> => {
    const db = await getDb();
    return db.getAllAsync('SELECT * FROM learning_progress');
  },

  upsertProgress: async (
    entityType: string,
    entityId: number,
    quality: number
  ): Promise<void> => {
    const db = await getDb();
    const now = new Date();
    const rating = qualityToRating(quality);
    const existing = await readingService.getProgress(entityType, entityId);

    let card: FSRSCard;

    if (existing) {
      const fsrsCard: FSRSCard = {
        due: existing.due ? new Date(existing.due) : now,
        stability: existing.stability,
        difficulty: existing.difficulty,
        elapsed_days: existing.due
          ? Math.floor((now.getTime() - new Date(existing.due).getTime()) / 86400000)
          : 0,
        scheduled_days: existing.due
          ? Math.floor((now.getTime() - new Date(existing.due).getTime()) / 86400000)
          : 0,
        reps: existing.reps,
        lapses: existing.lapses,
        learning_steps: existing.learning_steps,
        state: existing.state as 0 | 1 | 2 | 3,
        last_review: existing.last_review ? new Date(existing.last_review) : undefined,
      };
      card = scheduler.next(fsrsCard, now, rating).card;
    } else {
      card = scheduler.next(createEmptyCard(now), now, rating).card;
    }

    const row = cardToRow(entityType, entityId, card, quality);

    if (existing) {
      await db.runAsync(
        `UPDATE learning_progress SET stability = ?, difficulty = ?, state = ?, due = ?, last_review = ?, reps = ?, lapses = ?, learning_steps = ?, last_quality = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        ...row, existing.id
      );
    } else {
      await db.runAsync(
        `INSERT INTO learning_progress (entity_type, entity_id, stability, difficulty, state, due, last_review, reps, lapses, learning_steps, last_quality) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        ...row
      );
    }
  },

  getStats: async () => {
    const db = await getDb();
    const wordsMastered = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM learning_progress WHERE state = 2 AND entity_type = 'word'"
    );
    const wordsLearning = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM learning_progress WHERE state IN (0,1,3) AND entity_type = 'word'"
    );
    const totalWords = allWords.length;
    const sessions = await db.getAllAsync<StudySession>(
      'SELECT * FROM study_sessions ORDER BY created_at DESC LIMIT 30'
    );
    const masteredCount = wordsMastered?.count ?? 0;
    return {
      wordsMastered: masteredCount,
      wordsLearning: wordsLearning?.count ?? 0,
      totalWords,
      retentionRate: totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0,
      sessions,
    };
  },

  getDueItems: async (): Promise<LearningProgress[]> => {
    const db = await getDb();
    return db.getAllAsync(
      "SELECT * FROM learning_progress WHERE due IS NOT NULL AND due <= ? ORDER BY due",
      new Date().toISOString()
    );
  },

  getDueItemsWithContent: async (): Promise<DueItemWithContent[]> => {
    const dueItems = await readingService.getDueItems();

    return dueItems.map((lp) => {
      if (lp.entity_type === 'word') {
        const word = allWords.find((w) => w.id === lp.entity_id);
        const reading = word ? allReadings.find((r) => r.id === word.reading_id) : null;
        return {
          progress_id: lp.id,
          entity_type: lp.entity_type,
          entity_id: lp.entity_id,
          reading_id: word?.reading_id ?? 0,
          reading_name: reading?.name ?? 'Unknown',
          arabic_text: word?.arabic_text ?? '',
          transliteration: word?.transliteration ?? '',
          translation: word?.translation ?? '',
          meaning: null,
          stability: lp.stability,
          difficulty: lp.difficulty,
          state: lp.state,
          due: lp.due ?? '',
          reps: lp.reps,
          lapses: lp.lapses,
        };
      }
      const verse = allVerses.find((v) => v.id === lp.entity_id);
      const reading = verse ? allReadings.find((r) => r.id === verse.reading_id) : null;
      return {
        progress_id: lp.id,
        entity_type: lp.entity_type,
        entity_id: lp.entity_id,
        reading_id: verse?.reading_id ?? 0,
        reading_name: reading?.name ?? 'Unknown',
        arabic_text: verse?.arabic_text ?? '',
        transliteration: verse?.transliteration ?? '',
        translation: verse?.translation ?? '',
        meaning: verse?.meaning ?? null,
        stability: lp.stability,
        difficulty: lp.difficulty,
        state: lp.state,
        due: lp.due ?? '',
        reps: lp.reps,
        lapses: lp.lapses,
      };
    });
  },

  getReadingProgressStats: async (): Promise<{ reading_id: number; total: number; mastered: number; learning: number }[]> => {
    const allProgress = await readingService.getAllProgress();
    const readingMap = new Map<number, { total: number; mastered: number; learning: number }>();

    for (const word of allWords) {
      const stats = readingMap.get(word.reading_id) ?? { total: 0, mastered: 0, learning: 0 };
      stats.total++;
      const progress = allProgress.find((p) => p.entity_type === 'word' && p.entity_id === word.id);
      if (progress) {
        if (progress.state === 2) stats.mastered++;
        else stats.learning++;
      }
      readingMap.set(word.reading_id, stats);
    }

    return allReadings
      .filter((r) => readingMap.has(r.id))
      .map((r) => ({ reading_id: r.id, ...readingMap.get(r.id)! }));
  },

  getDailyActivity: async (): Promise<{ date: string; count: number }[]> => {
    const db = await getDb();
    return db.getAllAsync(
      `SELECT DATE(created_at) as date, SUM(words_studied) as count
       FROM study_sessions
       GROUP BY DATE(created_at)
       ORDER BY date DESC
       LIMIT 90`
    );
  },

  getDailyCounts: async (): Promise<{ date: string; count: number }[]> => {
    const db = await getDb();
    const rows = await db.getAllAsync<{ key: string; value: string }>(
      "SELECT key, value FROM user_settings WHERE key LIKE 'daily_count_%' ORDER BY key DESC LIMIT 90"
    );
    return rows.map((r) => ({
      date: r.key.replace('daily_count_', ''),
      count: parseInt(r.value, 10) || 0,
    }));
  },

  logStudySession: async (wordsStudied: number, wordsMastered: number, durationMinutes: number): Promise<void> => {
    const db = await getDb();
    await db.runAsync(
      'INSERT INTO study_sessions (words_studied, words_mastered, duration_minutes) VALUES (?, ?, ?)',
      wordsStudied, wordsMastered, durationMinutes
    );
  },

  getSetting: async (key: string): Promise<string | null> => {
    const db = await getDb();
    const row = await db.getFirstAsync<{ value: string }>('SELECT value FROM user_settings WHERE key = ?', key);
    return row?.value ?? null;
  },

  setSetting: async (key: string, value: string): Promise<void> => {
    const db = await getDb();
    await db.runAsync(
      'INSERT OR REPLACE INTO user_settings (key, value) VALUES (?, ?)',
      key, value
    );
  },
};
