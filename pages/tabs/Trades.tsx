import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";

import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { MapPin, MessageCircle, RefreshCcwDot } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
const Trades = () => {
  return (
    <View className="flex flex-1 bg-primary-0 p-4">
      <VStack
        space="md"
        className="py-4 border border-primary-200 bg-primary-100 rounded-lg"
      >
        <HStack className=" justify-between items-center px-2">
          <HStack space="md" className=" items-center">
            <Avatar size={"md"}>
              <AvatarFallbackText>""</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              />
            </Avatar>
            <Box>
              <Heading size="md">Mary Jane</Heading>
              <HStack>
                <Icon as={MapPin} />
                <Text>Memphis, TN</Text>
              </HStack>
            </Box>
          </HStack>

          <Text>4 mins ago</Text>
        </HStack>
        <HStack className=" relative ">
          <Box className="flex-1 z-10">
            <TouchableOpacity className="aspect-square border-y border-r border-primary-200 rounded-r-2xl">
              <Image
                size="full"
                source={require("@/assets/images/pot.jpg")}
                alt="product picture"
                className="rounded-r-2xl"
              />
            </TouchableOpacity>
          </Box>
          <Box className="flex-1 z-10">
            <TouchableOpacity className="aspect-square border-y border-l border-primary-200 rounded-l-2xl">
              <Image
                size="full"
                source={require("@/assets/images/pot.jpg")}
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
          Requested ceramic plant pot in exchange for an Italian hand bag
        </Text>
        <HStack className=" justify-between items-center px-2">
          <HStack space="sm">
            <Button action="negative" size="sm">
              <ButtonText>Decline</ButtonText>
            </Button>
            <Button action="secondary" size="sm">
              <ButtonText>Mark as Unavailable</ButtonText>
            </Button>
          </HStack>

          <Button size="sm">
            <ButtonIcon as={MessageCircle} />
            <ButtonText>Chat</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </View>
  );
};
export default Trades;
