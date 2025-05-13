import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
const Messages = () => {
  const isOnline = false;
  return (
    <View className="flex flex-1 bg-primary-0">
      <TouchableOpacity
        onPress={() => {
          router.push("/stacks/messages");
        }}
      >
        <HStack space="md" className=" p-2 border-b border-primary-600">
          <Avatar size={"md"}>
            <AvatarFallbackText>""</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
            {isOnline && <AvatarBadge />}
          </Avatar>
          <Box className="flex-1">
            <HStack className=" items-center justify-between ">
              <Heading size="md">Mary Jane</Heading>
              <Text size="sm">4 mins ago</Text>
            </HStack>
            <Text className=" text-typography-600" numberOfLines={2}>
              Irure magna ea cillum Lorem ad eiusmod elit irure elit
              exercitation eiusmod est. Irure voluptate pariatur aliqua eiusmod
              nostrud mollit laboris. Irure exercitation duis anim dolore. Id
              excepteur anim mollit officia aliqua qui tempor et veniam
              adipisicing laboris deserunt ea. Ullamco sunt laborum in ullamco
              nostrud ullamco commodo excepteur. Incididunt ad in nisi irure eu.
              Amet in deserunt irure dolor excepteur id qui ad et exercitation
              aliqua nisi adipisicing consectetur.
            </Text>
          </Box>
        </HStack>
      </TouchableOpacity>
    </View>
  );
};
export default Messages;
