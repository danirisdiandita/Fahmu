import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

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

  await database.runAsync("INSERT OR IGNORE INTO user_settings (key, value) VALUES ('daily_goal', '20')");
  await database.runAsync("INSERT OR IGNORE INTO user_settings (key, value) VALUES ('onboarding_complete', 'false')");
}

export async function resetDatabase() {
  const database = await getDb();
  await database.execAsync('DELETE FROM learning_progress');
}
