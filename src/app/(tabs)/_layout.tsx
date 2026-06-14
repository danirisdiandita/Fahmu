import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

import { SereneColors, Typography } from '@/constants/theme';

type IconName = keyof typeof MaterialIcons.glyphMap;

function TabIcon({ name, focused }: { name: IconName; focused: boolean }) {
  return (
    <View style={{
      width: 40,
      height: 28,
      borderRadius: 14,
      backgroundColor: focused ? SereneColors.secondaryContainer : 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: focused ? 12 : 0,
    }}>
      <MaterialIcons
        name={name}
        size={20}
        color={focused ? SereneColors.onSecondaryContainer : SereneColors.onSurfaceVariant}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: SereneColors.surface,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 80,
          paddingBottom: 16,
          paddingTop: 8,
        },
        tabBarActiveTintColor: SereneColors.onSecondaryContainer,
        tabBarInactiveTintColor: SereneColors.onSurfaceVariant,
        tabBarLabelStyle: {
          ...Typography.labelMd,
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Focus',
          tabBarIcon: ({ focused }) => <TabIcon name="auto-awesome" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          title: 'Lessons',
          tabBarIcon: ({ focused }) => <TabIcon name="menu-book" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ focused }) => <TabIcon name="leaderboard" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabIcon name="person" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
