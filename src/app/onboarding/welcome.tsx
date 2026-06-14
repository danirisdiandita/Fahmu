import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { BorderRadius, SereneColors, Spacing, Typography } from '@/constants/theme';

export default function OnboardingWelcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.brand}>Sholat Khusyuk</Text>
      </View>

      <View style={styles.heroSection}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80' }}
            style={styles.heroImage}
          />
          <View style={styles.imageOverlay} />
        </View>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.bottomContent}>
          <Text style={styles.title}>Ibadah Lebih Bermakna</Text>
          <Text style={styles.subtitle}>
            Pahami setiap kata yang Anda ucapkan untuk meraih kekhusyukan yang mendalam.
          </Text>

          <View style={styles.dots}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <Pressable style={styles.primaryButton} onPress={() => router.push('/onboarding/fitur')}>
            <Text style={styles.primaryButtonText}>Lanjut</Text>
          </Pressable>

          <Pressable onPress={() => router.push('/(tabs)')}>
            <Text style={styles.skipText}>Lewati</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SereneColors.background,
  },
  topSection: {
    paddingTop: 48,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    zIndex: 10,
  },
  brand: {
    ...Typography.headlineMd,
    color: SereneColors.primary,
    fontWeight: '700',
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },
  imageContainer: {
    width: '100%',
    maxWidth: 320,
    aspectRatio: 4 / 5,
    borderRadius: BorderRadius.twoXl,
    overflow: 'hidden',
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(6, 78, 59, 0.2)',
  },
  bottomSheet: {
    backgroundColor: SereneColors.surfaceContainerLowest,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: Spacing.four,
    paddingTop: 40,
    paddingBottom: 48,
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },
  bottomContent: {
    maxWidth: 400,
    alignSelf: 'center',
    gap: Spacing.three,
    alignItems: 'center',
  },
  title: {
    ...Typography.headlineLgMobile,
    color: SereneColors.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.bodyLg,
    color: SereneColors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: Spacing.two,
  },
  dots: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 24,
  },
  dotActive: {
    width: 32,
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: SereneColors.secondary,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: SereneColors.surfaceContainerHighest,
  },
  primaryButton: {
    width: '100%',
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
  skipText: {
    ...Typography.labelMd,
    color: SereneColors.onSurfaceVariant,
    paddingVertical: Spacing.two,
  },
});
