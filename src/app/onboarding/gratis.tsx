import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BorderRadius, SereneColors, Spacing, Typography } from '@/constants/theme';
import { useSetSetting } from '@/hooks/useReadings';

export default function OnboardingGratis() {
  const router = useRouter();
  const { mutate: setSetting } = useSetSetting();

  const handleStart = () => {
    setSetting({ key: 'onboarding_complete', value: 'true' });
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGlow1} />
      <View style={styles.backgroundGlow2} />

      <View style={styles.content}>
        <View style={styles.illustrationArea}>
          <View style={styles.outerRing1} />
          <View style={styles.outerRing2} />
          <View style={styles.innerCircle}>
            <MaterialIcons name="favorite" size={80} color={SereneColors.secondary} />
          </View>
          <View style={styles.floatingIcon1}>
            <MaterialCommunityIcons name="hand-heart-outline" size={24} color={SereneColors.primary} />
          </View>
          <View style={styles.floatingIcon2}>
            <MaterialIcons name="groups" size={20} color={SereneColors.primary} />
          </View>
        </View>

        <View style={styles.textSection}>
          <Text style={styles.title}>100% Gratis untuk Semua</Text>
          <Text style={styles.subtitle}>
            Aplikasi ini didedikasikan untuk umat. Tanpa biaya, tanpa iklan. Fokus sepenuhnya pada ibadah Anda.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.progressDots}>
          <View style={styles.dotInactive} />
          <View style={styles.dotInactive} />
          <View style={styles.dotInactive} />
          <View style={styles.dotActiveWide} />
        </View>
        <Pressable style={styles.primaryButton} onPress={handleStart}>
          <Text style={styles.primaryButtonText}>Mulai Sekarang</Text>
        </Pressable>
        <Text style={styles.footerBrand}>Sakinah Digital Foundation</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SereneColors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  backgroundGlow1: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: SereneColors.secondaryContainer,
    opacity: 0.1,
  },
  backgroundGlow2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: SereneColors.primaryContainer,
    opacity: 0.08,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    width: '100%',
    maxWidth: 400,
  },
  illustrationArea: {
    width: 256,
    height: 256,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  outerRing1: {
    position: 'absolute',
    width: 256,
    height: 256,
    borderRadius: 128,
    borderWidth: 1,
    borderColor: SereneColors.secondary,
    opacity: 0.1,
    transform: [{ scale: 1.1 }],
  },
  outerRing2: {
    position: 'absolute',
    width: 256,
    height: 256,
    borderRadius: 128,
    borderWidth: 1,
    borderColor: SereneColors.secondary,
    opacity: 0.05,
    transform: [{ scale: 1.25 }],
  },
  innerCircle: {
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: SereneColors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 8,
    borderWidth: 2,
    borderColor: SereneColors.secondary,
    opacity: 0.1,
  },
  floatingIcon1: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: SereneColors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    transform: [{ rotate: '12deg' }],
  },
  floatingIcon2: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SereneColors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    transform: [{ rotate: '-6deg' }],
  },
  textSection: {
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
  footer: {
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingBottom: 48,
    paddingTop: 32,
    alignItems: 'center',
    gap: 24,
    maxWidth: 400,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 12,
  },
  dotActiveWide: {
    width: 32,
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: SereneColors.secondaryContainer,
  },
  dotInactive: {
    width: 6,
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: SereneColors.surfaceContainerHighest,
  },
  primaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: SereneColors.primaryContainer,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: SereneColors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    ...Typography.labelMd,
    color: SereneColors.onPrimary,
  },
  footerBrand: {
    fontSize: 12,
    fontWeight: '500',
    color: SereneColors.outline,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
});
