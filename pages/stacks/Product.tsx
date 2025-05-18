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
import { AppContext, AppContextT } from "@/context/AppContextProvider";
import { Redirect, router, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  ArrowLeftRight,
  MapPin,
  PenLine,
  Share2,
  Trash,
} from "lucide-react-native";
import React, { useContext, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Product = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { properties, user } = useContext(AppContext) as AppContextT;

  const property = properties.find((item) => {
    return item.id === id;
  });

  const [showDrawer, setShowDrawer] = useState(false);

  if (!property || !user) {
    return <Redirect href={".."} />;
  }
  const isOwner = property.owner.id === user.id;
  return (
    <ScrollView className=" flex flex-1 bg-primary-0 relative ">
      <FlatList
        data={property.picturesUrl}
        renderItem={({ item }) => (
          <Box className="aspect-video relative w-[100vw]">
            <Image size="full" source={{ uri: item }} alt="Product image" />
          </Box>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
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
      <HStack space="sm" className=" items-center justify-center py-4">
        <Box className="p-1 rounded-full border border-primary-600 bg-primary-600"></Box>
        <Box className="p-1 rounded-full border border-primary-600"></Box>
        <Box className="p-1 rounded-full border border-primary-600"></Box>
      </HStack>
      <VStack space="lg" className="px-4">
        <Heading className=" capitalize">{property.name}</Heading>
        <Text>{property.description}</Text>
        {property.value && (
          <Text className=" text-center">
            <Text className="font-bold">${property.value}</Text> value
          </Text>
        )}
        <Heading size="md">Posted By</Heading>

        <HStack space="md" className=" items-center">
          <Avatar size={"lg"}>
            <AvatarFallbackText className=" uppercase">{`${property.owner.firstName.charAt(
              0
            )} ${property.owner.lastName.charAt(0)}`}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
            {<AvatarBadge />}
          </Avatar>
          <Box>
            <Heading
              size="sm"
              className=" capitalize"
            >{`${property.owner.firstName} ${property.owner.lastName}`}</Heading>
            <HStack>
              <Icon className="text-primary-800" as={MapPin} />
              <Text size="md">{property.location}</Text>
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

      <StatusBar translucent />
    </ScrollView>
  );
};
export default Product;
