import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, I18nManager, Pressable, StyleSheet, Text, View } from 'react-native';

import { ArabicFont, BorderRadius, SereneColors, Spacing, Typography } from '@/constants/theme';
import { useReading, useSetting, useUpsertProgress, useVerses, useWordsByReading } from '@/hooks/useReadings';

export default function LearnScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const readingId = parseInt(id, 10);

  const { data: reading, isLoading: readingLoading, isError: readingError } = useReading(readingId);
  const { data: verses, isLoading: versesLoading } = useVerses(readingId);
  const { data: words, isLoading: wordsLoading } = useWordsByReading(readingId);
  const { data: dailyGoalSetting } = useSetting('daily_goal');
  const { mutate: saveProgress } = useUpsertProgress();

  const flipAnim = useRef(new Animated.Value(0)).current;
  const [mode, setMode] = useState<'word' | 'verse'>('word');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const items = mode === 'word' ? words ?? [] : verses ?? [];
  const currentItem = items[currentIndex] ?? null;

  const flipToBack = () => {
    Animated.timing(flipAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowButtons(true));
    setFlipped(true);
  };

  const resetFlip = () => {
    flipAnim.setValue(0);
    setFlipped(false);
    setShowButtons(false);
  };

  const handleTap = () => {
    if (!flipped) flipToBack();
  };

  const handleQuality = (quality: number) => {
    if (!currentItem) return;
    saveProgress({ entityType: mode, entityId: currentItem.id, quality });
    goNext();
  };

  const goNext = () => {
    resetFlip();
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.back();
    }
  };

  const isWordMode = mode === 'word';
  const isLoading = readingLoading || versesLoading || wordsLoading;
  const totalItems = items.length;
  const dailyGoal = Number(dailyGoalSetting ?? '20');
  const studiedToday = Math.min(currentIndex, dailyGoal);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={SereneColors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>{reading?.name ?? 'Loading...'}</Text>
        <View style={styles.backButton} />
      </View>

      {isLoading && !readingError && (
        <View style={styles.centeredState}>
          <MaterialIcons name="hourglass-top" size={48} color={SereneColors.primaryContainer} />
          <Text style={styles.centeredText}>Memuat...</Text>
        </View>
      )}

      {readingError && (
        <View style={styles.centeredState}>
          <MaterialIcons name="error-outline" size={48} color={SereneColors.error} />
          <Text style={styles.centeredText}>Gagal memuat bacaan</Text>
        </View>
      )}

      {!isLoading && !readingError && totalItems === 0 && (
        <View style={styles.centeredState}>
          <MaterialIcons name="library-books" size={48} color={SereneColors.primaryContainer} />
          <Text style={styles.centeredText}>Belum ada data</Text>
        </View>
      )}

      {!isLoading && !readingError && totalItems > 0 && (
        <View style={styles.contentWrapper}>
          <View style={styles.toggleRow}>
            <Pressable
              style={[styles.toggleButton, isWordMode && styles.toggleActive]}
              onPress={() => { setMode('word'); setCurrentIndex(0); resetFlip(); }}
            >
              <Text style={[styles.toggleText, isWordMode && styles.toggleTextActive]}>Per Word</Text>
            </Pressable>
            <Pressable
              style={[styles.toggleButton, !isWordMode && styles.toggleActive]}
              onPress={() => { setMode('verse'); setCurrentIndex(0); resetFlip(); }}
            >
              <Text style={[styles.toggleText, !isWordMode && styles.toggleTextActive]}>Per Verse</Text>
            </Pressable>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Daily Goal</Text>
              <Text style={styles.progressCount}>{studiedToday}/{dailyGoal} {isWordMode ? 'Words' : 'Verses'}</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min((studiedToday / dailyGoal) * 100, 100)}%` }]} />
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Pressable style={styles.card} onPress={handleTap}>
              <View style={styles.cardInner}>
                <Animated.View
                  pointerEvents={flipped ? 'none' : 'auto'}
                  style={[styles.cardFace, { opacity: flipAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }]}
                >
                  <Text style={styles.cardHint}>Tap to reveal</Text>
                  {currentItem && (
                    <View style={styles.cardTextContent}>
                      <Text style={styles.arabicText}>{currentItem.arabic_text}</Text>
                      {'transliteration' in currentItem && currentItem.transliteration ? (
                        <Text style={styles.transliterationText}>{currentItem.transliteration}</Text>
                      ) : null}
                    </View>
                  )}
                  <View style={styles.cardBadge}>
                    <MaterialIcons name="auto-awesome" size={20} color={SereneColors.primaryContainer} />
                    <Text style={styles.cardBadgeText}>Active Learning</Text>
                  </View>
                </Animated.View>

                {flipped && (
                  <Animated.View
                    style={[styles.cardFace, styles.cardBack, { opacity: flipAnim }]}
                  >
                    <Text style={styles.cardBackLabel}>Meaning</Text>
                    {currentItem && (
                      <View style={styles.cardBackContent}>
                        <Text style={styles.translationText}>{currentItem.translation}</Text>
                        {'meaning' in currentItem && currentItem.meaning ? (
                          <Text style={styles.meaningText}>{currentItem.meaning}</Text>
                        ) : null}
                      </View>
                    )}
                    <View style={styles.cardDivider} />
                  </Animated.View>
                )}
              </View>
            </Pressable>

            <View style={[styles.actionRow, flipped && showButtons && styles.actionRowVisible]}>
              <Pressable style={styles.actionButton} onPress={() => handleQuality(1)}>
                <View style={[styles.actionIcon, { backgroundColor: 'rgba(186, 26, 26, 0.1)' }]}>
                  <MaterialIcons name="refresh" size={24} color={SereneColors.error} />
                </View>
                <Text style={[styles.actionLabel, { color: SereneColors.error }]}>AGAIN</Text>
              </Pressable>
              <Pressable style={styles.actionButton} onPress={() => handleQuality(2)}>
                <View style={[styles.actionIcon, { backgroundColor: 'rgba(115, 92, 0, 0.1)' }]}>
                  <MaterialIcons name="fitness-center" size={24} color={SereneColors.secondary} />
                </View>
                <Text style={[styles.actionLabel, { color: SereneColors.secondary }]}>HARD</Text>
              </Pressable>
              <Pressable style={styles.actionButton} onPress={() => handleQuality(3)}>
                <View style={[styles.actionIcon, { backgroundColor: 'rgba(0, 53, 39, 0.1)' }]}>
                  <MaterialIcons name="thumb-up" size={24} color={SereneColors.primary} />
                </View>
                <Text style={[styles.actionLabel, { color: SereneColors.primary }]}>GOOD</Text>
              </Pressable>
              <Pressable style={styles.actionButton} onPress={() => handleQuality(5)}>
                <View style={[styles.actionIcon, { backgroundColor: 'rgba(32, 47, 64, 0.1)' }]}>
                  <MaterialIcons name="bolt" size={24} color={SereneColors.tertiary} />
                </View>
                <Text style={[styles.actionLabel, { color: SereneColors.tertiary }]}>EASY</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <MaterialIcons name="auto-awesome" size={24} color={SereneColors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Focus</Text>
        </Pressable>
        <Pressable style={[styles.navItem, styles.navItemActive]}>
          <MaterialIcons name="menu-book" size={24} color={SereneColors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Lessons</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <MaterialIcons name="leaderboard" size={24} color={SereneColors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Stats</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <MaterialIcons name="person" size={24} color={SereneColors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SereneColors.background,
    paddingTop: 48,
  },
  contentWrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    height: 48,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.headlineMd,
    color: SereneColors.primary,
    fontWeight: '700',
  },
  toggleRow: {
    flexDirection: 'row',
    marginHorizontal: Spacing.four,
    marginTop: Spacing.three,
    marginBottom: Spacing.four,
    backgroundColor: SereneColors.surfaceContainerLow,
    borderRadius: BorderRadius.full,
    padding: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: Spacing.three,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: SereneColors.secondaryContainer,
  },
  toggleText: {
    ...Typography.labelMd,
    color: SereneColors.onSurfaceVariant,
  },
  toggleTextActive: {
    color: SereneColors.onSecondaryContainer,
  },
  progressSection: {
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.five,
    gap: Spacing.two,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressLabel: {
    ...Typography.labelMd,
    color: SereneColors.onSurfaceVariant,
  },
  progressCount: {
    ...Typography.labelMd,
    color: SereneColors.primary,
  },
  progressBar: {
    height: 6,
    backgroundColor: SereneColors.surfaceContainerHighest,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: SereneColors.secondaryFixed,
    borderRadius: BorderRadius.full,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    aspectRatio: 4 / 5,
    maxHeight: 480,
  },
  cardInner: {
    flex: 1,
    borderRadius: BorderRadius.twoXl,
    backgroundColor: SereneColors.surfaceContainerLowest,
    borderTopWidth: 2,
    borderTopColor: SereneColors.secondaryFixed,
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
    elevation: 10,
  },
  cardFace: {
    ...StyleSheet.absoluteFill,
    padding: Spacing.five,
    paddingBottom: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.twoXl,
    backgroundColor: SereneColors.surfaceContainerLowest,
  },
  cardHint: {
    ...Typography.labelMd,
    color: SereneColors.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 48,
  },
  cardTextContent: {
    alignItems: 'center',
    gap: Spacing.three,
  },
  arabicText: {
    fontSize: 48,
    lineHeight: 80,
    color: SereneColors.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'rtl',
    fontFamily: ArabicFont,
  },
  transliterationText: {
    ...Typography.bodyLg,
    color: SereneColors.onSurfaceVariant,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  cardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: 48,
    opacity: 0.4,
  },
  cardBadgeText: {
    ...Typography.labelMd,
    color: SereneColors.primaryContainer,
  },
  cardBack: {
    backgroundColor: SereneColors.surfaceContainerLow,
    borderTopWidth: 2,
    borderTopColor: SereneColors.secondaryFixed,
  },
  cardBackLabel: {
    ...Typography.labelMd,
    color: SereneColors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 48,
  },
  cardBackContent: {
    alignItems: 'center',
    gap: Spacing.three,
  },
  translationText: {
    ...Typography.headlineLg,
    color: SereneColors.primaryContainer,
    textAlign: 'center',
  },
  meaningText: {
    ...Typography.bodyMd,
    color: SereneColors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: Spacing.three,
  },
  cardDivider: {
    width: 48,
    height: 2,
    backgroundColor: SereneColors.secondaryFixed,
    borderRadius: BorderRadius.full,
    marginTop: 48,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    transform: [{ translateY: 16 }],
  },
  actionRowVisible: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
  },
  actionIcon: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  actionLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: SereneColors.surface,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  navItemActive: {
    backgroundColor: SereneColors.secondaryContainer,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 16,
  },
  navLabel: {
    ...Typography.labelMd,
    fontSize: 10,
    color: SereneColors.onSurfaceVariant,
  },
  centeredState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  centeredText: {
    ...Typography.bodyMd,
    color: SereneColors.onSurfaceVariant,
    textAlign: 'center',
  },
});
