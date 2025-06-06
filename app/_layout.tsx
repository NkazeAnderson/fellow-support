import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import AppContextProvider from "@/context/AppContextProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as Linking from "expo-linking";
import TimeAgo from "javascript-time-ago";

import { supabase } from "@/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import en from "javascript-time-ago/locale/en";
import { useEffect, useLayoutEffect } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const url = Linking.useURL();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useLayoutEffect(() => {
    TimeAgo.addDefaultLocale(en);

    return () => {
      supabase.removeAllChannels();
    };
  }, []);
  if (url) {
    console.log(url);
  }

  useEffect(() => {
    if (!loaded) return;
    supabase.auth.onAuthStateChange(async (e, session) => {
      if (session) {
        const { user } = session;
        if (user && user.email_confirmed_at) {
          router.replace("/tabs");
        } else {
          router.replace("/login");
        }
      } else {
        AsyncStorage.getItem("onBoarded").then((res) => {
          if (res) {
            router.replace("/login");
          } else {
            router.replace("/get-started");
          }
        });
      }
    });

    return () => {
      // supabase.auth.signOut();
      // console.log("logged out");
    };
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AppContextProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="+not-found" />
          </Stack>
        </AppContextProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
