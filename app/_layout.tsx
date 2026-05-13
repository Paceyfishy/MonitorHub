import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="products" />
      <Stack.Screen name="ReviewModal" 
      options={{ 
        presentation: 'transparentModal', // MANDATORY
        animation: 'fade', // Or 'slide_from_bottom'
        headerShown: false,
      }}/>
      

    </Stack>
  );
}