import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useLoadFonts } from '@/hooks/useLoadFonts';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useLoadFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbf9f5' }}>
        <ActivityIndicator size="large" color="#003527" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="learn/[id]" options={{ presentation: 'fullScreenModal' }} />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
