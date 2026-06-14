import { MaterialIcons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BorderRadius, SereneColors, Spacing, Typography } from '@/constants/theme';
import { useDailyCounts, useSetting, useStats } from '@/hooks/useReadings';

export default function StatsScreen() {
  const { data: stats } = useStats();
  const { data: dailyCounts } = useDailyCounts();
  const { data: dailyGoalStr } = useSetting('daily_goal');
  const dailyGoal = Number(dailyGoalStr ?? '20');

  const mastered = stats?.wordsMastered ?? 0;
  const learning = stats?.wordsLearning ?? 0;
  const total = stats?.totalWords ?? 0;
  const retention = stats?.retentionRate ?? 0;
  const relearning = Math.max(0, total - mastered - learning);

  const heatmapLevels = ['#e4e2de', '#b0f0d6', '#80bea6', '#2b6954', '#003527'];
  const today = new Date();
  const quarter = dailyGoal * 0.25;
  const half = dailyGoal * 0.5;
  const threeQuarter = dailyGoal * 0.75;
  const heatmapCells = Array.from({ length: 84 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (83 - i));
    const dateStr = d.toISOString().split('T')[0];
    const counts = dailyCounts?.find((a) => a.date === dateStr);
    const count = counts?.count ?? 0;
    const level = count === 0 ? 0 : count <= quarter ? 1 : count <= half ? 2 : count <= threeQuarter ? 3 : 4;
    return { date: dateStr, level, count };
  });

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' }}
            style={styles.avatarImage}
          />
        </View>
        <Text style={styles.headerTitle}>Stats</Text>
        <Pressable style={styles.settingsButton}>
          <MaterialIcons name="settings" size={24} color={SereneColors.primary} />
        </Pressable>
      </View>

      <View style={styles.summarySection}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryLabel}>Journey Progress</Text>
          <Text style={styles.summaryTitle}>Deepening Connection</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MaterialIcons name="auto-awesome" size={24} color={SereneColors.primary} />
            <Text style={styles.statLabel}>Words Mastered</Text>
            <Text style={styles.statValue}>{mastered}</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="analytics" size={24} color={SereneColors.secondary} />
            <Text style={styles.statLabel}>Retention Rate</Text>
            <Text style={styles.statValue}>{retention}%</Text>
          </View>
        </View>
      </View>

      <View style={styles.masterySection}>
        <Text style={styles.sectionTitle}>Mastery Breakdown</Text>
        <View style={styles.masteryCard}>
          <View style={styles.multiBar}>
            <View style={[styles.barSegment, { flex: mastered, backgroundColor: SereneColors.primary }]} />
            <View style={[styles.barSegment, { flex: learning, backgroundColor: SereneColors.secondaryContainer }]} />
            <View style={[styles.barSegment, { flex: relearning, backgroundColor: SereneColors.outlineVariant }]} />
          </View>

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: SereneColors.primary }]} />
              <View style={styles.legendRow}>
                <Text style={styles.legendLabel}>Mastered</Text>
                <Text style={styles.legendValue}>{mastered} words</Text>
              </View>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: SereneColors.secondaryContainer }]} />
              <View style={styles.legendRow}>
                <Text style={styles.legendLabel}>Learning</Text>
                <Text style={styles.legendValue}>{learning} words</Text>
              </View>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: SereneColors.outlineVariant }]} />
              <View style={styles.legendRow}>
                <Text style={styles.legendLabel}>Relearning</Text>
                <Text style={styles.legendValue}>{relearning} words</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.heatmapSection}>
        <View style={styles.heatmapHeader}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <Text style={styles.heatmapPeriod}>Last 3 Months</Text>
        </View>
        <View style={styles.heatmapCard}>
          <View style={styles.heatmapGrid}>
            {heatmapCells.map((cell, i) => (
              <View
                key={i}
                style={[styles.heatmapCell, { backgroundColor: heatmapLevels[cell.level] }]}
              />
            ))}
          </View>
          <View style={styles.heatmapLegend}>
            <Text style={styles.heatmapLegendText}>Less Focus</Text>
            <View style={styles.heatmapDots}>
              {heatmapLevels.map((color, i) => (
                <View key={i} style={[styles.heatmapDot, { backgroundColor: color }]} />
              ))}
            </View>
            <Text style={styles.heatmapLegendText}>High Focus</Text>
          </View>
        </View>
      </View>

      <View style={styles.quoteSection}>
        <Text style={styles.quote}>
          "Verily, in the remembrance of Allah do hearts find rest."
        </Text>
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
  summarySection: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },
  summaryHeader: {
    alignItems: 'center',
    gap: Spacing.half,
  },
  summaryLabel: {
    ...Typography.labelMd,
    color: SereneColors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryTitle: {
    ...Typography.displaySm,
    color: SereneColors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  statCard: {
    flex: 1,
    backgroundColor: SereneColors.surfaceContainerLow,
    padding: Spacing.four,
    borderRadius: BorderRadius.twoXl,
    borderTopWidth: 2,
    borderTopColor: 'rgba(254, 214, 91, 0.3)',
    gap: Spacing.two,
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 4,
  },
  statLabel: {
    ...Typography.labelMd,
    color: SereneColors.onSurfaceVariant,
  },
  statValue: {
    ...Typography.headlineLg,
    color: SereneColors.primary,
    marginTop: Spacing.half,
  },
  masterySection: {
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.five,
    gap: Spacing.three,
  },
  sectionTitle: {
    ...Typography.headlineMd,
    color: SereneColors.primary,
  },
  masteryCard: {
    backgroundColor: SereneColors.surfaceContainerLowest,
    padding: Spacing.four,
    borderRadius: BorderRadius.twoXl,
    gap: Spacing.four,
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 4,
  },
  multiBar: {
    height: 12,
    width: '100%',
    backgroundColor: SereneColors.surfaceContainer,
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  barSegment: {
    height: '100%',
  },
  legend: {
    gap: Spacing.three,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendLabel: {
    ...Typography.bodyMd,
  },
  legendValue: {
    ...Typography.labelMd,
    fontWeight: '700',
  },
  heatmapSection: {
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.five,
    gap: Spacing.three,
  },
  heatmapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heatmapPeriod: {
    ...Typography.labelMd,
    color: SereneColors.onSurfaceVariant,
  },
  heatmapCard: {
    backgroundColor: SereneColors.surfaceContainerLow,
    padding: Spacing.four,
    borderRadius: BorderRadius.twoXl,
    borderTopWidth: 2,
    borderTopColor: 'rgba(254, 214, 91, 0.3)',
    gap: Spacing.three,
    shadowColor: SereneColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 4,
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  heatmapCell: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  heatmapLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heatmapLegendText: {
    fontSize: 10,
    color: SereneColors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heatmapDots: {
    flexDirection: 'row',
    gap: 4,
  },
  heatmapDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  quoteSection: {
    padding: Spacing.five,
    alignItems: 'center',
  },
  quote: {
    ...Typography.headlineMd,
    fontStyle: 'italic',
    color: SereneColors.onSurfaceVariant,
    opacity: 0.8,
    textAlign: 'center',
  },
});
