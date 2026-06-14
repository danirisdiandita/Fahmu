# TanStack Query & SQLite Architecture Rule

## Overview
This project uses a strict architecture for data management: **TanStack Query + Expo SQLite**. 
There is **NO external API/Backend**. All data is persisted locally in an SQLite database.

## 1. Services Folder (`/services`)
- All database interactions must reside in the `services` folder.
- Each service file should represent a logical entity (e.g., `habitService.ts`).
- Methods should use `expo-sqlite` to perform CRUD operations.
- Methods MUST return a Promise that resolves to the data or void.

## 2. Hooks Folder (`/hooks`)
- For every method created in a service, a corresponding custom hook MUST be created in the `hooks` folder (e.g., `useHabits.ts`).
- These hooks must use **TanStack Query** (`useQuery`, `useMutation`) to wrap the service calls.
- This ensures data synchronization, caching, and loading states are handled consistently across the UI.

## 3. Data Flow
`UI Component` -> `Custom Hook (hooks/)` -> `TanStack Query` -> `Domain Service (services/)` -> `Expo SQLite`

## Example Pattern

**Service (`services/habitService.ts`):**
```typescript
import * as SQLite from 'expo-sqlite';

export const habitService = {
  getHabits: async () => {
    const db = await SQLite.openDatabaseAsync('habits.db');
    return await db.getAllAsync('SELECT * FROM habits');
  },
  // ...
};
```

**Hook (`hooks/useHabits.ts`):**
```typescript
import { useQuery } from '@tanstack/react-query';
import { habitService } from '../services/habitService';

export const useHabits = () => {
  return useQuery({
    queryKey: ['habits'],
    queryFn: habitService.getHabits,
  });
};
```
