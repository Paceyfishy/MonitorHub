import { router, Stack, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { UserProvider, useUser } from "@/context/UserContext";

function RootNavigator() {
    const segments = useSegments();
    const { currentUser, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const currentScreen = segments[1];

    if (!currentUser && !inAuthGroup) {
      router.replace("/(auth)/login");
      
    } else if (currentUser && inAuthGroup && currentScreen !== "register") {
      router.replace("/(tabs)");
    }
  }, [currentUser, loading, segments]);

  if (loading) {
    return null;
  }

  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="allMonitors"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="allReviews"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="allMonitorReviews"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="editReviewModal"
          options={{
            presentation: "fullScreenModal",
            headerShown: false,
          }}
        />
      </Stack>
    </UserProvider>
  );
}


export default function RootLayout() {
  return (
    <UserProvider>
      <RootNavigator />
    </UserProvider>
  );
  
}
