import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BorderRadius, SereneColors, Spacing, Typography } from '@/constants/theme';
import { useReadingProgressStats, useReadings } from '@/hooks/useReadings';

export default function LessonsScreen() {
  const router = useRouter();
  const { data: readings, isLoading } = useReadings();
  const { data: progressStats } = useReadingProgressStats();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' }}
            style={styles.avatarImage}
          />
        </View>
        <Text style={styles.headerTitle}>Sholat Khusyuk</Text>
        <Pressable style={styles.settingsButton}>
          <MaterialIcons name="settings" size={24} color={SereneColors.primary} />
        </Pressable>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.pageTitle}>Kurikulum Bacaan</Text>
        <Text style={styles.pageSubtitle}>Sempurnakan setiap rukun sholat Anda dengan pemahaman mendalam.</Text>

        <View style={styles.heroCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroBadge}>Progress Keseluruhan</Text>
            <View style={styles.heroProgress}>
              <Text style={styles.heroPercent}>{progressStats ? Math.round(progressStats.reduce((s, r) => s + r.mastered, 0) / Math.max(progressStats.reduce((s, r) => s + r.total, 0), 1) * 100) : 0}% Selesai</Text>
              <View style={styles.heroBar}>
                <View style={[styles.heroBarFill, { width: `${progressStats ? Math.round(progressStats.reduce((s, r) => s + r.mastered, 0) / Math.max(progressStats.reduce((s, r) => s + r.total, 0), 1) * 100) : 0}%` as any }]} />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.list}>
        {isLoading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          readings?.map((reading, index) => {
            const stats = progressStats?.find((s) => s.reading_id === reading.id);
            const mastered = stats?.mastered ?? 0;
            const total = stats?.total ?? 1;
            const pct = Math.round((mastered / total) * 100);
            const isMastered = pct === 100;
            const progress = pct;

            return (
              <Pressable
                key={reading.id}
                style={[styles.listItem, isMastered && styles.listItemMastered]}
                onPress={() => router.push(`/learn/${reading.id}`)}
              >
                <View style={styles.listItemTop}>
                  <View style={styles.listItemLeft}>
                    <View style={[styles.listIcon, isMastered && styles.listIconMastered]}>
                      {isMastered ? (
                        <MaterialIcons name="check" size={20} color={SereneColors.secondaryFixed} />
                      ) : (
                        <Text style={styles.listNumber}>{String(index + 1).padStart(2, '0')}</Text>
                      )}
                    </View>
                    <View>
                      <Text style={styles.listTitle}>{reading.name}</Text>
                      <Text style={styles.listDesc}>{reading.description}</Text>
                    </View>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color={SereneColors.outline} />
                </View>
                <View style={styles.progressRow}>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, {
                      width: `${progress}%` as any,
                      backgroundColor: isMastered ? SereneColors.primary : SereneColors.secondary,
                    }]} />
                  </View>
                  <Text style={[styles.progressText, {
                    color: isMastered ? SereneColors.primary : SereneColors.secondary,
                  }]}>{pct}%</Text>
                </View>
              </Pressable>
            );
          })
        )}
      </View>

      <View style={styles.featuredCard}>
        <View style={styles.featuredGlow} />
        <View style={styles.featuredContent}>
          <Text style={styles.featuredBadge}>PELAJARAN KHUSUS</Text>
          <Text style={styles.featuredTitle}>Makna Mendalam Al-Fatihah</Text>
          <Text style={styles.featuredDesc}>
            Jelajahi setiap ayat dalam Al-Fatihah untuk mencapai kekhusyukan yang belum pernah Anda rasakan sebelumnya.
          </Text>
          <Pressable style={styles.featuredButton} onPress={() => router.push('/learn/6')}>
            <Text style={styles.featuredButtonText}>Mulai Belajar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: SereneColors.background,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    height: 48,
    marginTop: 48,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: SereneColors.outlineVariant,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    ...Typography.headlineMd,
    color: SereneColors.primary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    marginBottom: Spacing.five,
  },
  pageTitle: {
    ...Typography.headlineLgMobile,
    color: SereneColors.primary,
    marginBottom: Spacing.two,
  },
  pageSubtitle: {
    ...Typography.bodyMd,
    color: SereneColors.onSurfaceVariant,
    marginBottom: Spacing.four,
  },
  heroCard: {
    width: '100%',
    aspectRatio: 21 / 9,
    borderRadius: BorderRadius.twoXl,
    overflow: 'hidden',
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 8,
    borderTopWidth: 2,
    borderTopColor: SereneColors.secondaryFixed,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.four,
    backgroundColor: 'rgba(0, 53, 39, 0.6)',
  },
  heroBadge: {
    ...Typography.labelMd,
    color: SereneColors.secondaryFixed,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: Spacing.half,
  },
  heroProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroPercent: {
    ...Typography.headlineMd,
    color: '#ffffff',
  },
  heroBar: {
    width: 128,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.full,
  },
  heroBarFill: {
    height: '100%',
    backgroundColor: SereneColors.secondaryFixed,
    borderRadius: BorderRadius.full,
  },
  list: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },
  loadingText: {
    ...Typography.bodyMd,
    color: SereneColors.onSurfaceVariant,
    textAlign: 'center',
  },
  listItem: {
    backgroundColor: SereneColors.surfaceContainerLowest,
    padding: Spacing.four,
    borderRadius: BorderRadius.twoXl,
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 4,
  },
  listItemMastered: {
    backgroundColor: SereneColors.surfaceContainerLow,
    borderTopWidth: 2,
    borderTopColor: SereneColors.secondaryFixed,
  },
  listItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.three,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SereneColors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listIconMastered: {
    backgroundColor: SereneColors.primary,
  },
  listNumber: {
    ...Typography.labelMd,
    color: SereneColors.primary,
  },
  listTitle: {
    ...Typography.headlineMd,
    color: SereneColors.primary,
  },
  listDesc: {
    ...Typography.labelMd,
    color: SereneColors.onSurfaceVariant,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  progressBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: SereneColors.surfaceVariant,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  progressText: {
    ...Typography.labelMd,
  },
  featuredCard: {
    marginHorizontal: Spacing.four,
    backgroundColor: SereneColors.primaryContainer,
    borderRadius: BorderRadius.twoXl,
    padding: Spacing.five,
    overflow: 'hidden',
  },
  featuredGlow: {
    position: 'absolute',
    right: -32,
    top: -32,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: SereneColors.secondaryContainer,
    opacity: 0.08,
  },
  featuredContent: {
    gap: Spacing.three,
  },
  featuredBadge: {
    ...Typography.labelMd,
    color: SereneColors.secondaryFixed,
    marginBottom: Spacing.two,
  },
  featuredTitle: {
    ...Typography.headlineLg,
    color: SereneColors.primaryFixed,
  },
  featuredDesc: {
    ...Typography.bodyMd,
    color: SereneColors.onPrimaryContainer,
    opacity: 0.8,
  },
  featuredButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: SereneColors.secondaryFixed,
    borderRadius: BorderRadius.full,
  },
  featuredButtonText: {
    ...Typography.labelMd,
    color: SereneColors.onSecondaryFixed,
  },
});
