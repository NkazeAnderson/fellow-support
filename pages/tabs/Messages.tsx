import TimeAgo from "@/components/TimeAgo";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import UserAvatar from "@/components/UserAvatar";
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
        data={chats.filter((item) => item.messages.length)}
        ListEmptyComponent={() => <Text>No messages in here yet</Text>}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                router.push(`/stacks/messages?chatId=${item.id}`);
              }}
            >
              <HStack space="md" className=" p-2 border-b border-primary-600">
                <UserAvatar user={item.otherMember} />
                <Box className="flex-1">
                  <HStack className=" items-center justify-between ">
                    <Heading
                      size="md"
                      className=" capitalize"
                    >{`${item.otherMember.firstName} ${item.otherMember.lastName}`}</Heading>
                    <TimeAgo
                      date={item.messages[item.messages.length - 1].createdAt}
                    />
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
