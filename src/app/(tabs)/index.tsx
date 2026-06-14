import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BorderRadius, SereneColors, Spacing, Typography } from '@/constants/theme';
import { useDailyCounts, useDueItems, useReadings, useStats } from '@/hooks/useReadings';

export default function DashboardScreen() {
  const router = useRouter();
  const { data: readings } = useReadings();
  const { data: stats } = useStats();
  const { data: dailyActivity } = useDailyCounts();
  const streak = dailyActivity ? (() => {
    let count = 0;
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      d.setDate(d.getDate() - (i === 0 ? 0 : 1));
      const dateStr = d.toISOString().split('T')[0];
      const hasActivity = dailyActivity.some((a) => a.date === dateStr);
      if (hasActivity) count++;
      else break;
    }
    return count;
  })() : 0;
  const { data: dueItems } = useDueItems();
  const dueCount = dueItems?.length ?? 0;

  const masteredWords = stats?.wordsMastered ?? 0;
  const totalWords = stats?.totalWords ?? 0;
  const progressPercent = totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' }}
            style={styles.avatarImage}
          />
        </View>
        <Text style={styles.title}>Sholat Khusyuk</Text>
        <Pressable style={styles.settingsButton}>
          <MaterialIcons name="settings" size={24} color={SereneColors.onSurfaceVariant} />
        </Pressable>
      </View>

      <View style={styles.welcomeSection}>
        <View>
          <Text style={styles.greeting}>Assalamu'alaikum,</Text>
          <Text style={styles.greetingSub}>May your heart find peace today.</Text>
        </View>
        <View style={styles.streakBadge}>
          <MaterialCommunityIcons name="fire" size={20} color={SereneColors.secondary} />
          <Text style={styles.streakText}>{streak ?? '0'} DAYS</Text>
          <Text style={styles.streakLabel}>Prayer Streak</Text>
        </View>
      </View>

      <Pressable style={styles.heroCard} onPress={() => router.push('/learn/6')}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&q=80' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <View style={styles.heroBadge}>
            <MaterialIcons name="play-circle" size={18} color={SereneColors.onSecondaryContainer} />
            <Text style={styles.heroBadgeText}>CONTINUE PATH</Text>
          </View>
          <View>
            <Text style={styles.heroLabel}>Current Focus</Text>
            <Text style={styles.heroTitle}>Meaning of Al-Fatihah</Text>
          </View>
          <View style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Start Next Lesson</Text>
          </View>
        </View>
      </Pressable>

      <View style={styles.srsSection}>
        <View style={styles.srsHeader}>
          <Text style={styles.sectionTitle}>Ready to Review</Text>
          {dueCount > 0 && (
            <View style={styles.srsBadge}>
              <Text style={styles.srsBadgeText}>{dueCount} ITEM{dueCount !== 1 ? 'S' : ''}</Text>
            </View>
          )}
        </View>
        <Pressable style={styles.srsCard} onPress={() => dueCount > 0 ? router.push('/review') : null}>
          <View style={styles.srsIcon}>
            <MaterialIcons name="sync" size={28} color={SereneColors.onSecondaryContainer} />
          </View>
          <View style={styles.srsTextContent}>
            <Text style={styles.srsTitle}>Spaced Repetition</Text>
            <Text style={styles.srsSubtitle}>{dueCount > 0 ? 'Review due items to reinforce your memory.' : 'All caught up! Start a new lesson to build more memories.'}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={SereneColors.primaryContainer} />
        </Pressable>
      </View>

      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityGrid}>
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <MaterialIcons name="history" size={20} color={SereneColors.primary} />
              <Text style={styles.activityLabel}>Last Studied</Text>
            </View>
            <Text style={styles.activityTitle}>{stats?.sessions?.[0] ? `${stats.sessions[0].words_studied} items studied` : 'No sessions yet'}</Text>
            <Text style={styles.activityPercent}>{stats?.sessions?.[0] ? `${stats.sessions[0].words_mastered} mastered` : 'Start your first lesson'}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: stats?.sessions?.[0] ? `${Math.round((stats.sessions[0].words_mastered / Math.max(stats.sessions[0].words_studied, 1)) * 100)}%` as any : '0%' }]} />
            </View>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.circleProgress}>
              <View style={styles.circleBg} />
              <View style={[styles.circleFill, { transform: [{ rotate: `${(progressPercent / 100) * 360}deg` }] }]} />
              <View style={styles.circleInner}>
                <Text style={styles.circleText}>{progressPercent}%</Text>
              </View>
            </View>
            <Text style={styles.circleLabel}>Course Progress</Text>
          </View>
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
  title: {
    ...Typography.headlineMd,
    color: SereneColors.primary,
    fontWeight: '700',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
  },
  greeting: {
    ...Typography.headlineLgMobile,
    color: SereneColors.onSurface,
  },
  greetingSub: {
    ...Typography.bodyMd,
    color: SereneColors.onSurfaceVariant,
  },
  streakBadge: {
    alignItems: 'flex-end',
  },
  streakText: {
    ...Typography.labelMd,
    fontWeight: '700',
    color: SereneColors.secondary,
  },
  streakLabel: {
    fontSize: 10,
    letterSpacing: 1,
    color: SereneColors.outline,
    textTransform: 'uppercase',
  },
  heroCard: {
    marginHorizontal: Spacing.four,
    aspectRatio: 4 / 5,
    borderRadius: BorderRadius.twoXl,
    overflow: 'hidden',
    marginBottom: Spacing.five,
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(6, 78, 59, 0.6)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Spacing.five,
    gap: Spacing.three,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(254, 214, 91, 0.9)',
    borderRadius: BorderRadius.full,
    gap: 6,
  },
  heroBadgeText: {
    ...Typography.labelMd,
    fontSize: 12,
    color: SereneColors.onSecondaryContainer,
  },
  heroLabel: {
    ...Typography.labelMd,
    color: SereneColors.primaryFixed,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    ...Typography.headlineLgMobile,
    color: '#ffffff',
  },
  heroButton: {
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroButtonText: {
    ...Typography.labelMd,
    color: SereneColors.primary,
  },
  srsSection: {
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.five,
    gap: Spacing.three,
  },
  srsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...Typography.headlineMd,
    color: SereneColors.onSurface,
  },
  srsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: SereneColors.secondaryFixed,
    borderRadius: BorderRadius.full,
  },
  srsBadgeText: {
    ...Typography.labelMd,
    fontSize: 12,
    color: SereneColors.onSecondaryFixed,
  },
  srsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SereneColors.surfaceContainerLow,
    borderRadius: BorderRadius.twoXl,
    borderTopWidth: 2,
    borderTopColor: SereneColors.secondaryFixed,
    padding: Spacing.four,
    gap: Spacing.three,
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  srsIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: SereneColors.secondaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  srsTextContent: {
    flex: 1,
  },
  srsTitle: {
    ...Typography.bodyMd,
    fontWeight: '700',
    color: SereneColors.onSurface,
  },
  srsSubtitle: {
    fontSize: 14,
    color: SereneColors.onSurfaceVariant,
  },
  activitySection: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  activityGrid: {
    gap: Spacing.three,
  },
  activityCard: {
    backgroundColor: SereneColors.surfaceContainerLowest,
    borderRadius: BorderRadius.twoXl,
    borderWidth: 1,
    borderColor: SereneColors.surfaceContainerHigh,
    padding: Spacing.four,
    height: 192,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  activityLabel: {
    ...Typography.labelMd,
    fontSize: 11,
    color: SereneColors.outline,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  activityTitle: {
    ...Typography.headlineMd,
    fontSize: 18,
    color: SereneColors.onSurface,
  },
  activityPercent: {
    fontSize: 13,
    color: SereneColors.onSurfaceVariant,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: SereneColors.surfaceContainer,
    borderRadius: BorderRadius.full,
  },
  progressFill: {
    height: '100%',
    backgroundColor: SereneColors.primary,
    borderRadius: BorderRadius.full,
  },
  progressCard: {
    backgroundColor: SereneColors.surfaceContainerLowest,
    borderRadius: BorderRadius.twoXl,
    borderWidth: 1,
    borderColor: SereneColors.surfaceContainerHigh,
    padding: Spacing.four,
    height: 192,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  circleProgress: {
    width: 96,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBg: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 6,
    borderColor: SereneColors.surfaceContainer,
  },
  circleFill: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 6,
    borderColor: SereneColors.secondary,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  circleInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: SereneColors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    ...Typography.displaySm,
    fontSize: 20,
    color: SereneColors.primary,
  },
  circleLabel: {
    ...Typography.labelMd,
    fontSize: 12,
    color: SereneColors.onSurfaceVariant,
    marginTop: Spacing.three,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
});
