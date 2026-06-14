import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { I18nManager, Pressable, StyleSheet, Text, View } from 'react-native';

import { ArabicFont, BorderRadius, SereneColors, Spacing, Typography } from '@/constants/theme';

export default function OnboardingFitur() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="chevron-left" size={24} color={SereneColors.onSurface} />
        </Pressable>
        <Text style={styles.step}>Step 2 of 4</Text>
        <Pressable onPress={() => router.push('/(tabs)')}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.flashcardStack}>
          <View style={styles.cardBack1} />
          <View style={styles.cardBack2} />
          <View style={styles.cardMain}>
            <Text style={styles.cardLabel}>TAKBIRATUL IHRAM</Text>
            <View style={styles.cardContent}>
              <Text style={styles.arabicText}>أكبر</Text>
              <View style={styles.divider} />
              <Text style={styles.transliteration}>Akbar</Text>
            </View>
            <View style={styles.meaningBadge}>
              <Text style={styles.meaningText}>Maha Besar</Text>
            </View>
            <View style={styles.cardFooter}>
              <MaterialIcons name="undo" size={20} color={SereneColors.primary} />
              <View style={styles.footerDots}>
                <View style={styles.dotActive} />
                <View style={styles.dotInactive} />
                <View style={styles.dotInactive} />
              </View>
              <MaterialIcons name="check-circle" size={20} color={SereneColors.primary} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.textSection}>
        <Text style={styles.title}>Belajar Per Kata & Ayat</Text>
        <Text style={styles.subtitle}>
          Metode flashcard interaktif untuk membantu Anda menghafal arti bacaan sholat dengan mudah.
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.progressDots}>
          <View style={styles.dotInactive} />
          <View style={styles.dotActiveWide} />
          <View style={styles.dotInactive} />
          <View style={styles.dotInactive} />
        </View>
        <Pressable style={styles.primaryButton} onPress={() => router.push('/onboarding/srs')}>
          <Text style={styles.primaryButtonText}>Lanjut</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SereneColors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: Spacing.four,
    backgroundColor: SereneColors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  step: {
    ...Typography.labelMd,
    color: SereneColors.onSurfaceVariant,
  },
  skip: {
    ...Typography.labelMd,
    color: SereneColors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },
  flashcardStack: {
    width: '100%',
    maxWidth: 320,
    aspectRatio: 4 / 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBack1: {
    position: 'absolute',
    width: '80%',
    height: '70%',
    backgroundColor: SereneColors.surfaceContainerLow,
    borderRadius: BorderRadius.twoXl,
    transform: [{ rotate: '-6deg' }],
    opacity: 0.4,
    top: 16,
  },
  cardBack2: {
    position: 'absolute',
    width: '85%',
    height: '75%',
    backgroundColor: SereneColors.surfaceContainerHigh,
    borderRadius: BorderRadius.twoXl,
    transform: [{ rotate: '3deg' }],
    opacity: 0.6,
    top: 8,
  },
  cardMain: {
    width: '90%',
    height: '85%',
    backgroundColor: SereneColors.surfaceContainerLowest,
    borderRadius: BorderRadius.twoXl,
    borderTopWidth: 2,
    borderTopColor: SereneColors.secondaryContainer,
    padding: Spacing.five,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 8,
  },
  cardLabel: {
    ...Typography.labelMd,
    color: SereneColors.onSurfaceVariant,
    letterSpacing: 2,
    marginBottom: 16,
  },
  cardContent: {
    alignItems: 'center',
    gap: 12,
  },
  arabicText: {
    fontSize: 48,
    color: SereneColors.primary,
    fontFamily: ArabicFont,
    lineHeight: 72,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'rtl',
    textAlign: 'center',
  },
  divider: {
    width: 48,
    height: 2,
    backgroundColor: SereneColors.secondaryContainer,
  },
  transliteration: {
    ...Typography.bodyLg,
    color: SereneColors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  meaningBadge: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: SereneColors.surfaceContainerLow,
    borderRadius: BorderRadius.full,
  },
  meaningText: {
    ...Typography.labelMd,
    color: SereneColors.primaryContainer,
  },
  cardFooter: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0.3,
  },
  footerDots: {
    flexDirection: 'row',
    gap: 4,
  },
  dotActive: {
    width: 6,
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: SereneColors.primary,
  },
  dotInactive: {
    width: 6,
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: SereneColors.outlineVariant,
  },
  dotActiveWide: {
    width: 32,
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: SereneColors.primary,
  },
  textSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    marginBottom: 32,
  },
  title: {
    ...Typography.headlineLgMobile,
    color: SereneColors.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.bodyMd,
    color: SereneColors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 280,
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingBottom: 40,
    paddingTop: 24,
    alignItems: 'center',
    gap: 24,
    backgroundColor: SereneColors.surface,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    maxWidth: 400,
    height: 48,
    backgroundColor: SereneColors.primary,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    ...Typography.labelMd,
    color: SereneColors.onPrimary,
  },
});
