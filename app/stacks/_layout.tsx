import { Box } from "@/components/ui/box";
import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackground: () => (
          <Box className=" w-full h-full bg-primary-0"></Box>
        ),
      }}
    />
  );
};

export default _layout;
