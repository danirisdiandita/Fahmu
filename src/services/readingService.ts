import { createEmptyCard, fsrs, type FSRS, type Grade, Rating, type Card as FSRSCard } from 'ts-fsrs';
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
    const db = await getDb();
    return db.getAllAsync('SELECT * FROM readings ORDER BY sort_order');
  },

  getReadingById: async (id: number): Promise<Reading | null> => {
    const db = await getDb();
    const row = await db.getFirstAsync<Reading>('SELECT * FROM readings WHERE id = ?', id);
    return row ?? null;
  },

  getVersesByReadingId: async (readingId: number): Promise<Verse[]> => {
    const db = await getDb();
    return db.getAllAsync('SELECT * FROM verses WHERE reading_id = ? ORDER BY verse_number', readingId);
  },

  getVerseById: async (id: number): Promise<Verse | null> => {
    const db = await getDb();
    const row = await db.getFirstAsync<Verse>('SELECT * FROM verses WHERE id = ?', id);
    return row ?? null;
  },

  getWordsByVerseId: async (verseId: number): Promise<Word[]> => {
    const db = await getDb();
    return db.getAllAsync('SELECT * FROM words WHERE verse_id = ? ORDER BY sort_order', verseId);
  },

  getWordsByReadingId: async (readingId: number): Promise<Word[]> => {
    const db = await getDb();
    return db.getAllAsync('SELECT * FROM words WHERE reading_id = ? ORDER BY sort_order', readingId);
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
    const totalWords = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM words'
    );
    const sessions = await db.getAllAsync<StudySession>(
      'SELECT * FROM study_sessions ORDER BY created_at DESC LIMIT 30'
    );
    const masteredCount = wordsMastered?.count ?? 0;
    return {
      wordsMastered: masteredCount,
      wordsLearning: wordsLearning?.count ?? 0,
      totalWords: totalWords?.count ?? 0,
      retentionRate: totalWords?.count
        ? Math.round((masteredCount / (totalWords?.count ?? 1)) * 100)
        : 0,
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
    const db = await getDb();
    const now = new Date().toISOString();
    return db.getAllAsync(
      `SELECT lp.id as progress_id, lp.entity_type, lp.entity_id,
              lp.stability, lp.difficulty, lp.state, lp.due, lp.reps, lp.lapses,
              w.arabic_text, w.translation, w.transliteration, NULL as meaning,
              w.reading_id, r.name as reading_name
       FROM learning_progress lp
       JOIN words w ON lp.entity_type = 'word' AND lp.entity_id = w.id
       JOIN readings r ON w.reading_id = r.id
       WHERE lp.due IS NOT NULL AND lp.due <= ?
       UNION ALL
       SELECT lp.id as progress_id, lp.entity_type, lp.entity_id,
              lp.stability, lp.difficulty, lp.state, lp.due, lp.reps, lp.lapses,
              v.arabic_text, v.translation, v.transliteration, v.meaning,
              v.reading_id, r.name as reading_name
       FROM learning_progress lp
       JOIN verses v ON lp.entity_type = 'verse' AND lp.entity_id = v.id
       JOIN readings r ON v.reading_id = r.id
       WHERE lp.due IS NOT NULL AND lp.due <= ?
       ORDER BY due`,
      now, now
    );
  },

  getReadingProgressStats: async (): Promise<{ reading_id: number; total: number; mastered: number; learning: number }[]> => {
    const db = await getDb();
    return db.getAllAsync(
      `SELECT w.reading_id,
              COUNT(*) as total,
              COALESCE(SUM(CASE WHEN lp.state = 2 THEN 1 ELSE 0 END), 0) as mastered,
              COALESCE(SUM(CASE WHEN lp.state IN (0,1,3) THEN 1 ELSE 0 END), 0) as learning
       FROM words w
       LEFT JOIN learning_progress lp ON lp.entity_type = 'word' AND lp.entity_id = w.id
       GROUP BY w.reading_id
       ORDER BY w.reading_id`
    );
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
