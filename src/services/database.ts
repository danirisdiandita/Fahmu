import * as SQLite from 'expo-sqlite';
import { seedData } from './seedData';

let db: SQLite.SQLiteDatabase | null = null;

const CURRENT_SCHEMA_VERSION = 6;

export async function getDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('khusyuk.db');
    await initializeDatabase(db);
  }
  return db;
}

async function initializeDatabase(database: SQLite.SQLiteDatabase) {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS readings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT,
      sort_order INTEGER,
      arabic_text TEXT,
      transliteration TEXT,
      translation TEXT
    );

    CREATE TABLE IF NOT EXISTS verses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reading_id INTEGER NOT NULL,
      verse_number INTEGER NOT NULL,
      arabic_text TEXT NOT NULL,
      transliteration TEXT,
      translation TEXT NOT NULL,
      meaning TEXT,
      sort_order INTEGER,
      FOREIGN KEY (reading_id) REFERENCES readings(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      verse_id INTEGER,
      reading_id INTEGER NOT NULL,
      arabic_text TEXT NOT NULL,
      transliteration TEXT,
      translation TEXT NOT NULL,
      sort_order INTEGER,
      FOREIGN KEY (verse_id) REFERENCES verses(id) ON DELETE CASCADE,
      FOREIGN KEY (reading_id) REFERENCES readings(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS learning_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entity_type TEXT NOT NULL,
      entity_id INTEGER NOT NULL,
      stability REAL DEFAULT 0,
      difficulty REAL DEFAULT 0,
      state INTEGER DEFAULT 0,
      due TEXT,
      last_review TEXT,
      reps INTEGER DEFAULT 0,
      lapses INTEGER DEFAULT 0,
      learning_steps INTEGER DEFAULT 0,
      last_quality INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS study_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      words_studied INTEGER DEFAULT 0,
      words_mastered INTEGER DEFAULT 0,
      duration_minutes INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const schemaVersion = await database.getFirstAsync<{ value: string }>(
    "SELECT value FROM user_settings WHERE key = 'schema_version'"
  );

  if (!schemaVersion) {
    await seedData(database);
    await database.runAsync(
      "INSERT OR REPLACE INTO user_settings (key, value) VALUES ('schema_version', ?)",
      String(CURRENT_SCHEMA_VERSION)
    );
  } else if (Number(schemaVersion.value) < CURRENT_SCHEMA_VERSION) {
    await database.execAsync('BEGIN');
    try {
      await database.execAsync('PRAGMA foreign_keys = OFF');
      await database.execAsync('DELETE FROM words');
      await database.execAsync('DELETE FROM verses');
      await database.execAsync('DELETE FROM readings');
      await database.execAsync('DELETE FROM learning_progress');
      await database.execAsync('PRAGMA foreign_keys = ON');
      await seedData(database);
      await database.runAsync(
        "INSERT OR REPLACE INTO user_settings (key, value) VALUES ('schema_version', ?)",
        String(CURRENT_SCHEMA_VERSION)
      );
      await database.execAsync('COMMIT');
    } catch (e) {
      await database.execAsync('ROLLBACK');
      console.error('Migration failed, rolling back:', e);
    }
  }
}

export async function resetDatabase() {
  const database = await getDb();
  await database.execAsync('DELETE FROM learning_progress');
  await database.runAsync(
    "INSERT OR REPLACE INTO user_settings (key, value) VALUES ('schema_version', ?)",
    String(CURRENT_SCHEMA_VERSION)
  );
}
