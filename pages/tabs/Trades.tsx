import TimeAgo from "@/components/TimeAgo";

import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import UserAvatar from "@/components/UserAvatar";
import { AppContext, AppContextT } from "@/context/AppContextProvider";
import { insertUpdateDeleteProperty } from "@/utils/properties";
import { insertUpdateDeleteTrade } from "@/utils/trades";
import { router } from "expo-router";
import { MapPin, MessageCircle, RefreshCcwDot } from "lucide-react-native";
import React, { useContext } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
const Trades = () => {
  const {
    userMethods: { trades, chats, user },
  } = useContext(AppContext) as AppContextT;

  return (
    <View className="flex flex-1 bg-primary-0 p-4">
      <FlatList
        data={trades}
        renderItem={({ item }) => {
          const userToDisplay =
            user?.id === item.requestedBy
              ? item.productRequested.owner
              : item.product.owner;
          return (
            <VStack
              space="md"
              className="py-4 border border-primary-200 bg-primary-100 rounded-lg mb-4"
            >
              <HStack className=" justify-between items-center px-2">
                <HStack space="md" className=" items-center">
                  <UserAvatar user={userToDisplay} />
                  <Box>
                    <Heading size="md" className=" capitalize">
                      {userToDisplay.firstName + " " + userToDisplay.lastName}
                    </Heading>
                    <HStack>
                      <Icon as={MapPin} />
                      <Text>{item.product.location}</Text>
                    </HStack>
                  </Box>
                </HStack>

                <TimeAgo date={item.createdAt} />
              </HStack>
              <HStack className=" relative ">
                <Box className="flex-1 z-10">
                  <TouchableOpacity
                    className="aspect-square border-y border-r border-primary-200 rounded-r-2xl"
                    onPress={() =>
                      router.push(`/stacks/product/${item.productRequested.id}`)
                    }
                  >
                    <Image
                      size="full"
                      source={{ uri: item.productRequested.picturesUrl[0] }}
                      alt="product picture"
                      className="rounded-r-2xl"
                    />
                  </TouchableOpacity>
                </Box>
                <Box className="flex-1 z-10">
                  <TouchableOpacity
                    className="aspect-square border-y border-l border-primary-200 rounded-l-2xl"
                    onPress={() =>
                      router.push(`/stacks/product/${item.product.id}`)
                    }
                  >
                    <Image
                      size="full"
                      source={{ uri: item.product.picturesUrl[0] }}
                      alt="product picture"
                      className="rounded-l-2xl"
                    />
                  </TouchableOpacity>
                </Box>
                <Box className="absolute w-full h-full">
                  <VStack className=" h-full items-center justify-center">
                    <Box className="bg-primary-500 rounded-full p-4 z-30">
                      <Icon className="text-white w-5 h-5" as={RefreshCcwDot} />
                    </Box>
                  </VStack>
                </Box>
              </HStack>
              <Text className=" text-typography-600 px-2">
                {`Requested ${item.productRequested.name.toLowerCase()} in exchange for ${
                  item.product.name
                }`}
              </Text>
              <HStack className=" justify-between items-center px-2">
                <HStack space="sm">
                  {item.approvalStatus === "accepted" ? (
                    <Heading size="xs" className="text-green-600">
                      Accepted
                    </Heading>
                  ) : item.approvalStatus === "declined" ? (
                    <Heading size="xs" className="text-red-600">
                      Declined
                    </Heading>
                  ) : item.requestedBy === user?.id ? (
                    <Heading size="xs" className="text-primary-600">
                      {item.approvalStatus}
                    </Heading>
                  ) : (
                    <Button
                      action="negative"
                      size="sm"
                      onPress={() => {
                        insertUpdateDeleteTrade(
                          { id: item.id, approvalStatus: "declined" },
                          "update"
                        );
                      }}
                    >
                      <ButtonText>Decline</ButtonText>
                    </Button>
                  )}
                  {item.requestedBy !== user?.id &&
                  item.productRequested.available &&
                  item.approvalStatus === "pending" ? (
                    <Button
                      action="secondary"
                      size="sm"
                      onPress={() => {
                        insertUpdateDeleteProperty(
                          { id: item.id, available: false },
                          "update"
                        );
                      }}
                    >
                      <ButtonText>Mark as Unavailable</ButtonText>
                    </Button>
                  ) : !item.productRequested.available &&
                    item.requestedBy !== user?.id ? (
                    <Heading size="xs" className="text-gray-600">
                      Unavailable
                    </Heading>
                  ) : (
                    <></>
                  )}
                </HStack>

                <Button
                  size="sm"
                  onPress={(e) => {
                    router.push(
                      `/stacks/messages?member=${JSON.stringify(userToDisplay)}`
                    );

                    e.stopPropagation();
                  }}
                >
                  <ButtonIcon as={MessageCircle} />
                  <ButtonText>Chat</ButtonText>
                </Button>
              </HStack>
            </VStack>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default Trades;
