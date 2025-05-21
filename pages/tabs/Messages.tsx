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
import { AppContext, AppContextT } from "@/context/AppContextProvider";
import { router } from "expo-router";
import React, { useContext } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
const Messages = () => {
  const isOnline = false;
  const { chats } = useContext(AppContext) as AppContextT;
  return (
    <View className="flex flex-1 bg-primary-0">
      <FlatList
        data={chats}
        ListEmptyComponent={() => <Text>No messages in here yet</Text>}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                router.push(`/stacks/messages?chatId=${item.id}`);
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
                    <Heading
                      size="md"
                      className=" capitalize"
                    >{`${item.otherMember.firstName} ${item.otherMember.lastName}`}</Heading>
                    <Text size="sm">4 mins ago</Text>
                  </HStack>
                  {Boolean(
                    item.messages.length &&
                      item.messages[item.messages.length - 1].text
                  ) && (
                    <Text className=" text-typography-600" numberOfLines={2}>
                      {item.messages[item.messages.length - 1].text}
                    </Text>
                  )}
                </Box>
              </HStack>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default Messages;
