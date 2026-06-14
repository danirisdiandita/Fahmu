# TRUTHY over Algorithm-Optimised

## Why

Everything runs locally — SQLite on-device, no network, no multi-tenant, single user. That means:

- **Readability > cleverness.** Choose the clearest, most direct code path. A complex index or cache layer adds maintenance cost for zero perceptible gain.
- **Correctness > micro-optimisation.** A slower query that returns the right answer is better than a fast query with edge-case bugs.
- **Maintainability > performance.** Anyone (including future you) should be able to read the code and understand the data flow without reverse-engineering an optimisation trick.

## What this means in practice

### Queries
- Write straight `SELECT *` when you need all columns. Don't prematurely column-limit unless profiling shows it matters.
- Use simple `WHERE` clauses. Avoid subqueries or CTEs just to shave off a few rows — SQLite on a local DB handles thousands of rows instantly.
- Don't add indices until you measure a real slow path.

### Spaced Repetition (SRS)
- Use a well-known, well-documented algorithm (FSRS via `ts-fsrs`).
- Store full state in SQLite so the algorithm is **deterministic** — given the same card state and rating, you always get the same result.
- Don't skip quality levels or shorten intervals for "efficiency". The algorithm's parameters are tuned for learning; changing them without data defeats the purpose.

### React Optimisation Hooks — Never Use
- **Never** use `useMemo`, `useCallback`, `React.memo`, `useTransition`, or `useDeferredValue`.
- These hooks exist for apps with huge trees or expensive computations. This app has neither.
- They add cognitive overhead, encourage stale closures, and hide bugs. A function re-created on every render is fine when the alternative is a `useCallback` that accidentally captures a stale variable.
- If a list re-renders, fix the data model or the component structure — don't slap `React.memo` on it.

### State Management
- Let TanStack Query handle caching and refetching. Don't hand-roll memoisation or skip queries to "save renders".
- `invalidateQueries` is cheap locally. Use it liberally after mutations to keep UI in sync.

### General
- Prefer `async/await` over callback chains, even if the latter is "faster" in a microbenchmark.
- Use clear variable names over abbreviated ones, even if it means longer lines.
- If you're choosing between three lines of straightforward code and one line of clever code, pick the three lines.
