# Migration Versioning Rule

## Why
Every schema change or data update must be **versioned** so existing users don't lose progress. Never delete-and-reinsert — always **upsert**.

## Versioned Migration System

Migrations live in `src/services/migrations.ts`. Each migration is a function keyed by version number.

```typescript
const migrations: Record<number, Migration> = {
  1: { desc: 'Initial seed', fn: seedInitialData },
  2: { desc: 'Add FSRS fields', fn: addFSRSFields },
};
```

### How it runs

1. `database.ts` initialises the DB schema (CREATE TABLE IF NOT EXISTS).
2. If the `readings` table is empty → runs all migrations from v1 to latest (fresh install).
3. If the `readings` table has data → runs only pending migrations where `version > current_schema_version`.
4. Each migration runs inside a **transaction** — if it fails, nothing changes.
5. After each migration succeeds, `schema_version` is updated.

### Rules for writing migrations

- **Never delete user data.** Don't `DELETE FROM learning_progress`. Don't `DROP TABLE`.
- **Always upsert.** Use `SELECT first, then INSERT or UPDATE` pattern:
  ```typescript
  const existing = await db.getFirstAsync('SELECT id FROM readings WHERE name = ?', name);
  if (existing) {
    await db.runAsync('UPDATE readings SET ... WHERE id = ?', ..., existing.id);
    return existing.id;
  }
  const result = await db.runAsync('INSERT INTO readings ... VALUES ...');
  return result.lastInsertRowId;
  ```
- **One concern per migration.** Don't bundle unrelated changes.
- **Bump `CURRENT_SCHEMA_VERSION`** after adding a new migration.
- **`seedData.ts`** is only for fresh installs. It should produce the exact same state as running all migrations in order.
- **`resetDatabase()`** in `database.ts` is the ONLY place that deletes data. It's called manually from Settings.

### Adding a new reading or data

1. Add the data to the `readings` array in `seedData.ts` (for fresh installs).
2. Create a migration function in `migrations.ts` that upserts the new data.
3. Bump `CURRENT_SCHEMA_VERSION` in `database.ts`.

### Version history

| Version | Description |
|---------|-------------|
| 1 | Initial schema + seed (10 readings, Al-Fatihah words) |
| 2 | Add Takbiratul Ihram word data |
| 3 | FSRS schema change |
| 4 | Add Doa Iftitah word data |
| 5 | Add Ruku', I'tidal, Sujud, Duduk, Tasyahhud Awal, Tasyahhud Akhir, Salam words |
| 6 | Add Niat, Ta'awudz, Basmalah, Aamiin, Doa Sebelum Salam, Al-Ikhlas, Al-Falaq, An-Nas |
| 7 | Rewrite to upsert-based migrations (current) |
