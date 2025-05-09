import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";

import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { FavouriteIcon, Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  ArrowLeftRight,
  MapPin,
  PenLine,
  Share2,
  Trash,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Product = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <ScrollView className=" flex flex-1 bg-primary-0 relative ">
      <Box className="aspect-video relative">
        <Image
          size="full"
          source={require("@/assets/images/pot.jpg")}
          alt="Product image"
        />
        <SafeAreaView className="absolute w-full">
          <HStack className=" justify-between items-center px-4">
            <Button
              className="bg-primary-600/10 aspect-square rounded-full"
              onPress={() => router.back()}
            >
              <ButtonIcon className=" text-primary-600" as={ArrowLeft} />
            </Button>
            <HStack space="xl">
              <Button className="bg-primary-600/10 aspect-square rounded-full">
                <ButtonIcon className=" text-primary-600" as={FavouriteIcon} />
              </Button>
              <Button className="bg-primary-600/10 aspect-square rounded-full">
                <ButtonIcon className=" text-primary-600" as={Share2} />
              </Button>
            </HStack>
          </HStack>
        </SafeAreaView>
      </Box>
      <HStack space="sm" className=" items-center justify-center py-4">
        <Box className="p-1 rounded-full border border-primary-600 bg-primary-600"></Box>
        <Box className="p-1 rounded-full border border-primary-600"></Box>
        <Box className="p-1 rounded-full border border-primary-600"></Box>
      </HStack>
      <VStack space="lg" className="px-4">
        <Heading>Ceramic Pot</Heading>
        <Text>
          Exercitation proident do tempor proident fugiat et amet velit nulla
          Lorem excepteur. Deserunt occaecat laborum consequat enim laborum
          dolor duis reprehenderit aute. Officia sit aliquip occaecat aliquip
          laborum qui consequat elit incididunt esse pariatur fugiat dolore.
          Laboris consequat adipisicing ullamco fugiat pariatur incididunt quis.
          Aute anim do id incididunt anim aute ut ex ut esse. Anim eu sint
          excepteur reprehenderit amet enim est officia esse aute aliqua.
        </Text>
        <Text className=" text-center">
          <Text className="font-bold">$45</Text> value
        </Text>
        <Heading size="md">Posted By</Heading>

        <HStack space="md" className=" items-center">
          <Avatar size={"lg"}>
            <AvatarFallbackText>""</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
            {<AvatarBadge />}
          </Avatar>
          <Box>
            <Heading size="sm">Mary Jane</Heading>
            <HStack>
              <Icon className="text-primary-800" as={MapPin} />
              <Text size="md">San Francisco, LA</Text>
            </HStack>
          </Box>
        </HStack>
      </VStack>

      <Box>
        {isOwner && (
          <Box className=" absolute w-full px-4 gap-4 py-10">
            <Button action="secondary">
              <ButtonIcon as={PenLine} />
              <ButtonText>Edit</ButtonText>
            </Button>
            <Button action="negative">
              <ButtonIcon as={Trash} />
              <ButtonText>Delete</ButtonText>
            </Button>
          </Box>
        )}
      </Box>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {!isOwner && (
        <Fab
          size={"lg"}
          placement="bottom right"
          onPress={() => setShowDrawer(true)}
        >
          <FabIcon className=" rotate-90" as={ArrowLeftRight} />
          <FabLabel>Trade</FabLabel>
        </Fab>
      )}
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
        size="sm"
        anchor="bottom"
      >
        <DrawerBackdrop />
        <DrawerContent className=" bg-primary-100 rounded-t-3xl">
          <DrawerHeader>
            <Heading size="lg">Select property to trade with</Heading>
          </DrawerHeader>
          <DrawerBody>
            <HStack className=" justify-between items-center">
              <HStack space="sm" className="items-center">
                <Image
                  className=" rounded-md"
                  size="xs"
                  source={require("@/assets/images/pot.jpg")}
                  alt="product image"
                />
                <Heading size="sm"> Ceramic Pot</Heading>
              </HStack>
              <Button size="sm">
                <ButtonIcon className=" rotate-90" as={ArrowLeftRight} />
                <ButtonText>Select</ButtonText>
              </Button>
            </HStack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              onPress={() => {
                setShowDrawer(false);
              }}
              className="flex-1"
            >
              <ButtonText>Close</ButtonText>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <HStack className=" justify-center my-1">
        <Button action="positive" onPress={() => setIsOwner(!isOwner)}>
          <ButtonText>Temporal</ButtonText>
        </Button>
      </HStack>

      <StatusBar translucent />
    </ScrollView>
  );
};
export default Product;
