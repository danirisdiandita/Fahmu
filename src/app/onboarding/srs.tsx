import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BorderRadius, SereneColors, Spacing, Typography } from '@/constants/theme';

export default function OnboardingSRS() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.progressDots}>
        <View style={styles.dotInactive} />
        <View style={styles.dotInactive} />
        <View style={styles.dotActiveWide} />
        <View style={styles.dotInactive} />
      </View>

      <View style={styles.content}>
        <View style={styles.graphCard}>
          <View style={styles.svgContainer}>
            <View style={styles.gridLineH} />
            <View style={styles.gridLineV} />
            <View style={styles.peakLine} />
            <View style={styles.peak1} />
            <View style={styles.peak2} />
            <View style={styles.peak3} />
            <View style={styles.peak4} />
            <View style={styles.labelContainer}>
              <Text style={styles.graphLabel}>Hari 1</Text>
              <Text style={styles.graphLabel}>Hari 3</Text>
              <Text style={styles.graphLabel}>Hari 7</Text>
              <Text style={styles.graphLabel}>Hari 14</Text>
            </View>
          </View>
          <View style={styles.iconCircle}>
            <MaterialIcons name="auto-awesome" size={32} color={SereneColors.onPrimaryContainer} />
          </View>
        </View>
      </View>

      <View style={styles.textSection}>
        <Text style={styles.title}>Ingatan yang Kuat</Text>
        <Text style={styles.subtitle}>
          Sistem Spaced Repetition memastikan apa yang Anda pelajari hari ini akan tetap diingat selamanya.
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <Pressable onPress={() => router.push('/(tabs)')}>
            <Text style={styles.skipText}>Lewati</Text>
          </Pressable>
          <Pressable style={styles.primaryButton} onPress={() => router.push('/onboarding/gratis')}>
            <Text style={styles.primaryButtonText}>Lanjut</Text>
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
    paddingTop: 48,
    paddingHorizontal: Spacing.four,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 48,
  },
  dotActiveWide: {
    width: 32,
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: SereneColors.secondary,
  },
  dotInactive: {
    width: 6,
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: SereneColors.surfaceContainerHighest,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphCard: {
    width: '100%',
    maxWidth: 400,
    aspectRatio: 4 / 5,
    backgroundColor: SereneColors.surfaceContainerLowest,
    borderRadius: BorderRadius.twoXl,
    borderTopWidth: 2,
    borderTopColor: SereneColors.secondary,
    padding: Spacing.five,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  svgContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  gridLineH: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    height: 1,
    backgroundColor: SereneColors.surfaceContainer,
  },
  gridLineV: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    top: 10,
    width: 1,
    backgroundColor: SereneColors.surfaceContainer,
  },
  peakLine: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    height: 3,
    backgroundColor: SereneColors.secondary,
    borderRadius: 2,
  },
  peak1: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: SereneColors.secondaryContainer,
  },
  peak2: {
    position: 'absolute',
    bottom: 100,
    left: 90,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: SereneColors.secondaryContainer,
  },
  peak3: {
    position: 'absolute',
    bottom: 100,
    left: 200,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: SereneColors.secondaryContainer,
  },
  peak4: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: SereneColors.secondaryContainer,
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  graphLabel: {
    fontSize: 10,
    fontFamily: 'Manrope',
    fontWeight: '600',
    color: SereneColors.onSurfaceVariant,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: SereneColors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  textSection: {
    alignItems: 'center',
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
    paddingHorizontal: Spacing.four,
  },
  footer: {
    paddingBottom: 40,
    paddingTop: 48,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    maxWidth: 400,
    alignSelf: 'center',
  },
  skipText: {
    ...Typography.labelMd,
    color: SereneColors.onSurfaceVariant,
    paddingHorizontal: Spacing.four,
  },
  primaryButton: {
    flex: 2,
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
