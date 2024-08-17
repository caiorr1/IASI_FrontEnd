import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* Adicione outras telas aqui, se necessário */}
    </Stack>
  );
}
