import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { readingService, type DueItemWithContent, type Reading, type Verse, type Word, type StudySession } from '@/services/readingService';

export const useReadings = () => {
  return useQuery<Reading[]>({
    queryKey: ['readings'],
    queryFn: readingService.getReadings,
  });
};

export const useReading = (id: number | null) => {
  return useQuery<Reading | null>({
    queryKey: ['reading', id],
    queryFn: () => readingService.getReadingById(id!),
    enabled: id !== null,
  });
};

export const useVerses = (readingId: number | null) => {
  return useQuery<Verse[]>({
    queryKey: ['verses', readingId],
    queryFn: () => readingService.getVersesByReadingId(readingId!),
    enabled: readingId !== null,
  });
};

export const useVerse = (id: number | null) => {
  return useQuery<Verse | null>({
    queryKey: ['verse', id],
    queryFn: () => readingService.getVerseById(id!),
    enabled: id !== null,
  });
};

export const useWordsByVerse = (verseId: number | null) => {
  return useQuery<Word[]>({
    queryKey: ['words', 'verse', verseId],
    queryFn: () => readingService.getWordsByVerseId(verseId!),
    enabled: verseId !== null,
  });
};

export const useWordsByReading = (readingId: number | null) => {
  return useQuery<Word[]>({
    queryKey: ['words', 'reading', readingId],
    queryFn: () => readingService.getWordsByReadingId(readingId!),
    enabled: readingId !== null,
  });
};

export const useProgress = (entityType: string, entityId: number) => {
  return useQuery({
    queryKey: ['progress', entityType, entityId],
    queryFn: () => readingService.getProgress(entityType, entityId),
  });
};

export const useAllProgress = () => {
  return useQuery({
    queryKey: ['progress'],
    queryFn: readingService.getAllProgress,
  });
};

export const useDueItems = () => {
  return useQuery<DueItemWithContent[]>({
    queryKey: ['dueItems'],
    queryFn: readingService.getDueItemsWithContent,
  });
};

export const useUpsertProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ entityType, entityId, quality }: { entityType: string; entityId: number; quality: number }) =>
      readingService.upsertProgress(entityType, entityId, quality),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
      queryClient.invalidateQueries({ queryKey: ['dueItems'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['readingProgressStats'] });
    },
  });
};

export const useReadingProgressStats = () => {
  return useQuery({
    queryKey: ['readingProgressStats'],
    queryFn: readingService.getReadingProgressStats,
  });
};

export const useDailyActivity = () => {
  return useQuery({
    queryKey: ['dailyActivity'],
    queryFn: readingService.getDailyActivity,
  });
};

export const useDailyCounts = () => {
  return useQuery({
    queryKey: ['dailyCounts'],
    queryFn: readingService.getDailyCounts,
  });
};

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: readingService.getStats,
  });
};

export const useLogStudySession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ wordsStudied, wordsMastered, durationMinutes }: { wordsStudied: number; wordsMastered: number; durationMinutes: number }) =>
      readingService.logStudySession(wordsStudied, wordsMastered, durationMinutes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['dailyActivity'] });
    },
  });
};

export const useSetting = (key: string) => {
  return useQuery<string | null>({
    queryKey: ['setting', key],
    queryFn: () => readingService.getSetting(key),
  });
};

export const useSetSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) =>
      readingService.setSetting(key, value),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['setting', variables.key] });
      queryClient.invalidateQueries({ queryKey: ['dailyCounts'] });
    },
  });
};
