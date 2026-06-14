import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';

import { BorderRadius, SereneColors, Spacing, Typography } from '@/constants/theme';
import { useSetting, useSetSetting } from '@/hooks/useReadings';
import { resetDatabase } from '@/services/database';

export default function SettingsScreen() {
  const queryClient = useQueryClient();
  const { data: dailyGoalStr } = useSetting('daily_goal');
  const { mutate: updateSetting } = useSetSetting();
  const [goalModal, setGoalModal] = useState(false);
  const [goalInput, setGoalInput] = useState('');
  const [resetting, setResetting] = useState(false);

  const dailyGoal = Number(dailyGoalStr ?? '20');

  const openGoalModal = () => {
    setGoalInput(String(dailyGoal));
    setGoalModal(true);
  };

  const saveGoal = () => {
    const val = Math.max(1, Math.min(999, parseInt(goalInput, 10) || 20));
    updateSetting({ key: 'daily_goal', value: String(val) });
    setGoalModal(false);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Progress Belajar?',
      'Semua progress kartu hafalan akan dihapus. Riwayat sesi dan pengaturan lainnya tetap aman.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            setResetting(true);
            try {
              await resetDatabase();
              queryClient.invalidateQueries();
            } catch (e) {
              console.error('Reset failed:', e);
              Alert.alert('Gagal', `Terjadi kesalahan: ${e instanceof Error ? e.message : 'unknown'}`);
            } finally {
              setResetting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.spacer} />
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialIcons name="notifications" size={24} color={SereneColors.primary} style={styles.rowIcon} />
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Daily Reminder</Text>
              <Text style={styles.rowValue}>Before Fajr</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={SereneColors.outline} />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <MaterialIcons name="volume-up" size={24} color={SereneColors.primary} style={styles.rowIcon} />
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Audio Recitation</Text>
              <Text style={styles.rowValue}>Off</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={SereneColors.outline} />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <MaterialCommunityIcons name="format-size" size={24} color={SereneColors.primary} style={styles.rowIcon} />
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Arabic Font Size</Text>
              <Text style={styles.rowValue}>Medium</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={SereneColors.outline} />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learning</Text>
        <View style={styles.card}>
          <Pressable style={styles.row} onPress={openGoalModal}>
            <MaterialIcons name="sync" size={24} color={SereneColors.primary} style={styles.rowIcon} />
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Daily Goal</Text>
              <Text style={styles.rowValue}>{dailyGoal} words</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={SereneColors.outline} />
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.row} onPress={handleReset} disabled={resetting}>
            <MaterialIcons name="refresh" size={24} color={resetting ? SereneColors.outline : SereneColors.error} style={styles.rowIcon} />
            <View style={styles.rowContent}>
              <Text style={[styles.rowLabel, { color: resetting ? SereneColors.outline : SereneColors.error }]}>
                {resetting ? 'Resetting...' : 'Reset Data'}
              </Text>
              <Text style={styles.rowValue}>Hapus semua progress</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={SereneColors.outline} />
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialIcons name="info" size={24} color={SereneColors.primary} style={styles.rowIcon} />
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Version</Text>
              <Text style={styles.rowValue}>1.0.0</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <MaterialIcons name="favorite" size={24} color={SereneColors.primary} style={styles.rowIcon} />
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Made with love</Text>
              <Text style={styles.rowValue}>Sakinah Digital</Text>
            </View>
          </View>
        </View>
      </View>

      <Modal visible={goalModal} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setGoalModal(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Daily Goal</Text>
            <Text style={styles.modalSubtitle}>How many items per session?</Text>
            <TextInput
              style={styles.modalInput}
              value={goalInput}
              onChangeText={setGoalInput}
              keyboardType="number-pad"
              selectTextOnFocus
              autoFocus
            />
            <View style={styles.modalActions}>
              <Pressable style={styles.modalCancel} onPress={() => setGoalModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalSave} onPress={saveGoal}>
                <Text style={styles.modalSaveText}>Save</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
    marginBottom: Spacing.three,
  },
  spacer: {
    width: 40,
  },
  headerTitle: {
    ...Typography.headlineMd,
    color: SereneColors.primary,
  },
  section: {
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.four,
    gap: Spacing.three,
  },
  sectionTitle: {
    ...Typography.labelMd,
    color: SereneColors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: SereneColors.surfaceContainerLowest,
    borderRadius: BorderRadius.twoXl,
    padding: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
  },
  rowIcon: {
    width: 32,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    ...Typography.bodyMd,
    color: SereneColors.onSurface,
  },
  rowValue: {
    ...Typography.bodyMd,
    color: SereneColors.onSurfaceVariant,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: SereneColors.surfaceContainer,
    marginHorizontal: Spacing.three,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  modalCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: SereneColors.surface,
    borderRadius: BorderRadius.twoXl,
    padding: Spacing.five,
    gap: Spacing.three,
  },
  modalTitle: {
    ...Typography.headlineMd,
    color: SereneColors.primary,
    textAlign: 'center',
  },
  modalSubtitle: {
    ...Typography.bodyMd,
    color: SereneColors.onSurfaceVariant,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: SereneColors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.three,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: SereneColors.primary,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  modalCancel: {
    flex: 1,
    paddingVertical: Spacing.three,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    backgroundColor: SereneColors.surfaceContainerHigh,
  },
  modalCancelText: {
    ...Typography.labelMd,
    fontWeight: '600',
    color: SereneColors.onSurfaceVariant,
  },
  modalSave: {
    flex: 1,
    paddingVertical: Spacing.three,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    backgroundColor: SereneColors.primary,
  },
  modalSaveText: {
    ...Typography.labelMd,
    fontWeight: '700',
    color: SereneColors.onPrimary,
  },
});
