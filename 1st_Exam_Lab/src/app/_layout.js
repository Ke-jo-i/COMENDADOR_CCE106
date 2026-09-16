import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#1E293B' }, headerTintColor: '#FFF' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="event/[id]" options={{ title: 'Event Details', headerBackTitle: 'Back' }} />
    </Stack>
  );
}