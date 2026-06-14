import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, I18nManager, Pressable, StyleSheet, Text, View } from 'react-native';

import { ArabicFont, BorderRadius, SereneColors, Spacing, Typography } from '@/constants/theme';
import { useDueItems, useLogStudySession, useUpsertProgress } from '@/hooks/useReadings';

export default function ReviewScreen() {
  const router = useRouter();
  const { data: dueItems, isLoading, isError } = useDueItems();
  const { mutate: saveProgress } = useUpsertProgress();
  const { mutate: logSession } = useLogStudySession();

  const flipAnim = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const sessionStartRef = useRef(Date.now());
  const itemsReviewedRef = useRef(0);
  const [itemsReviewed, setItemsReviewed] = useState(0);

  const currentItem = dueItems?.[currentIndex] ?? null;
  const totalItems = dueItems?.length ?? 0;

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
    saveProgress({ entityType: currentItem.entity_type, entityId: currentItem.entity_id, quality });
    itemsReviewedRef.current += 1;
    setItemsReviewed(itemsReviewedRef.current);
    goNext();
  };

  const goNext = () => {
    resetFlip();
    if (currentIndex < totalItems - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishSession();
    }
  };

  const finishSession = () => {
    const durationMinutes = Math.round((Date.now() - sessionStartRef.current) / 60000);
    logSession({ wordsStudied: itemsReviewedRef.current, wordsMastered: itemsReviewedRef.current, durationMinutes: Math.max(1, durationMinutes) });
    setSessionDone(true);
  };

  if (sessionDone) {
    return (
      <View style={styles.container}>
        <View style={styles.centeredState}>
          <View style={styles.completeIcon}>
            <MaterialIcons name="check-circle" size={64} color={SereneColors.secondaryFixed} />
          </View>
          <Text style={styles.completeTitle}>Review Complete! 🎉</Text>
          <Text style={styles.completeSubtitle}>
            You reviewed {itemsReviewed} item{itemsReviewed !== 1 ? 's' : ''} just now. Keep up the great work!
          </Text>
          <Pressable style={styles.continueButton} onPress={() => router.back()}>
            <Text style={styles.continueButtonText}>Back to Dashboard</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={SereneColors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Review</Text>
        <View style={styles.backButton} />
      </View>

      {isLoading && (
        <View style={styles.centeredState}>
          <MaterialIcons name="hourglass-top" size={48} color={SereneColors.primaryContainer} />
          <Text style={styles.centeredText}>Loading...</Text>
        </View>
      )}

      {isError && (
        <View style={styles.centeredState}>
          <MaterialIcons name="error-outline" size={48} color={SereneColors.error} />
          <Text style={styles.centeredText}>Failed to load review items</Text>
        </View>
      )}

      {!isLoading && !isError && totalItems === 0 && (
        <View style={styles.centeredState}>
          <MaterialIcons name="check-circle" size={48} color={SereneColors.secondaryFixed} />
          <Text style={styles.centeredText}>No items due for review!</Text>
          <Text style={styles.centeredSub}>Come back later to reinforce your memory.</Text>
          <Pressable style={styles.continueButton} onPress={() => router.back()}>
            <Text style={styles.continueButtonText}>Back to Dashboard</Text>
          </Pressable>
        </View>
      )}

      {!isLoading && !isError && totalItems > 0 && currentItem && (
        <View style={styles.contentWrapper}>
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Review Progress</Text>
              <Text style={styles.progressCount}>{currentIndex + 1}/{totalItems}</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${((currentIndex) / totalItems) * 100}%` }]} />
            </View>
          </View>

          <View style={styles.readingContext}>
            <MaterialIcons name="menu-book" size={16} color={SereneColors.onSurfaceVariant} />
            <Text style={styles.readingContextText}>{currentItem.reading_name}</Text>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>{currentItem.entity_type === 'word' ? 'Word' : 'Verse'}</Text>
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
                      {currentItem.transliteration ? (
                        <Text style={styles.transliterationText}>{currentItem.transliteration}</Text>
                      ) : null}
                    </View>
                  )}
                  <View style={styles.cardBadge}>
                    <MaterialIcons name="auto-awesome" size={20} color={SereneColors.primaryContainer} />
                    <Text style={styles.cardBadgeText}>Review</Text>
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
                        {currentItem.meaning ? (
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
  progressSection: {
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.three,
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
  readingContext: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.four,
    gap: Spacing.two,
  },
  readingContextText: {
    ...Typography.bodyMd,
    color: SereneColors.onSurfaceVariant,
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: SereneColors.secondaryContainer,
    borderRadius: BorderRadius.full,
  },
  typeBadgeText: {
    ...Typography.labelMd,
    fontSize: 11,
    color: SereneColors.onSecondaryContainer,
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
  centeredState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  centeredText: {
    ...Typography.headlineMd,
    color: SereneColors.onSurfaceVariant,
    textAlign: 'center',
  },
  centeredSub: {
    ...Typography.bodyMd,
    color: SereneColors.onSurfaceVariant,
    textAlign: 'center',
  },
  completeIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: SereneColors.secondaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  completeTitle: {
    ...Typography.headlineLgMobile,
    color: SereneColors.onSurface,
    textAlign: 'center',
  },
  completeSubtitle: {
    ...Typography.bodyMd,
    color: SereneColors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: Spacing.six,
  },
  continueButton: {
    marginTop: Spacing.four,
    paddingHorizontal: Spacing.six,
    paddingVertical: Spacing.three,
    backgroundColor: SereneColors.primary,
    borderRadius: BorderRadius.xl,
  },
  continueButtonText: {
    ...Typography.labelMd,
    color: SereneColors.onPrimary,
  },
});
