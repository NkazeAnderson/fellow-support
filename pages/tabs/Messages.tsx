import TimeAgo from "@/components/TimeAgo";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import UserAvatar from "@/components/UserAvatar";
import { useAppContext } from "@/context/AppContextProvider";
import { router } from "expo-router";
import { Image } from "lucide-react-native";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
const Messages = () => {
  const isOnline = false;
  const {
    userMethods: { chats, user },
  } = useAppContext();
  return (
    <View className="flex flex-1 bg-primary-0">
      <FlatList
        data={chats.filter((item) => item.messages.length)}
        ListEmptyComponent={() => <Text>No messages in here yet</Text>}
        renderItem={({ item }) => {
          const otherMember =
            item.member1.id === user?.id ? item.member2 : item.member1;
          return (
            <TouchableOpacity
              onPress={() => {
                router.push(
                  `/stacks/messages?member=${JSON.stringify(otherMember)}`
                );
              }}
            >
              <HStack space="md" className=" p-2 border-b border-primary-600">
                <UserAvatar user={otherMember} />
                <Box className="flex-1">
                  <HStack className=" items-center justify-between ">
                    <Heading
                      size="md"
                      className=" capitalize"
                    >{`${otherMember.firstName} ${otherMember.lastName}`}</Heading>
                    <TimeAgo
                      date={item.messages[item.messages.length - 1].createdAt}
                    />
                  </HStack>
                  {Boolean(
                    item.messages.length &&
                      item.messages[item.messages.length - 1].text
                  ) ? (
                    <Text className=" text-typography-600" numberOfLines={2}>
                      {item.messages[item.messages.length - 1].text}
                    </Text>
                  ) : item.messages.length &&
                    item.messages[item.messages.length - 1].images ? (
                    <Icon as={Image} />
                  ) : (
                    <></>
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
