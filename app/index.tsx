import { Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const index = () => {
  const onboarded = false;

  if (!onboarded) {
    return <Redirect href={"/(onboarding)/get-started"} />;
  }
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;
