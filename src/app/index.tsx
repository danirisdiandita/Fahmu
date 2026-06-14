import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useSetting } from '@/hooks/useReadings';

export default function Index() {
  const { data: onboardingComplete, isLoading } = useSetting('onboarding_complete');

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbf9f5' }}>
        <ActivityIndicator size="large" color="#003527" />
      </View>
    );
  }

  if (onboardingComplete === 'true') {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/onboarding/welcome" />;
}
