import { BadgeText } from "@/components/ui/badge";

import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { FavouriteIcon, Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { MapPin, Share2 } from "lucide-react-native";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
const Home = () => {
  return (
    <ScrollView className="p-2 bg-primary-0 flex flex-1">
      <TouchableOpacity
        className="border border-primary-200 rounded-2xl relative"
        onPress={() => {
          router.push("/stacks/product/1");
        }}
      >
        <Badge
          className="absolute top-4 right-4 z-10"
          variant={"solid"}
          action={"error"}
          size={"md"}
        >
          <BadgeText>$45 value</BadgeText>
        </Badge>
        <Box className="aspect-video overflow-hidden">
          <Image
            size="full"
            source={require("@/assets/images/pot.jpg")}
            alt="Product image"
            className="rounded-t-2xl"
          />
        </Box>
        <Box className="p-4 border-t border-primary-600 bg-primary-100 rounded-b-2xl">
          <Heading className=" capitalize text-primary-600">
            Product Name
          </Heading>
          <Text numberOfLines={2} className="text-typography-600">
            Lorem eu aliquip enim amet cillum sunt voluptate consectetur
            consectetur ad aliquip sit sint. Veniam cupidatat nisi nostrud
            nostrud deserunt eu consequat. Dolor culpa aute proident mollit
            Lorem anim laborum velit sint est fugiat ipsum. Irure veniam
            consequat pariatur aute elit culpa fugiat ea.
          </Text>
          <HStack space="md" className=" justify-between items-center">
            <HStack space="md" className="items-center">
              <Avatar size={"md"}>
                <AvatarFallbackText>""</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                />
              </Avatar>
              <Box className="pt-2">
                <Heading size="sm">Mary Jane</Heading>
                <HStack>
                  <Icon className="text-primary-800" as={MapPin} />
                  <Text size="md">San Francisco, LA</Text>
                </HStack>
              </Box>
            </HStack>

            <HStack space="md" className=" items-center">
              <Button variant="link">
                <ButtonIcon as={FavouriteIcon} />
              </Button>
              <Button variant="link">
                <ButtonIcon as={Share2} />
              </Button>
            </HStack>
          </HStack>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity
        className="border border-primary-200 rounded-2xl relative"
        onPress={() => {
          router.push("/stacks/product/1");
        }}
      >
        <Badge
          className="absolute top-4 right-4 z-10"
          variant={"solid"}
          action={"error"}
          size={"md"}
        >
          <BadgeText>$45 value</BadgeText>
        </Badge>
        <Box className="aspect-video overflow-hidden">
          <Image
            size="full"
            source={require("@/assets/images/pot.jpg")}
            alt="Product image"
            className="rounded-t-2xl"
          />
        </Box>
        <Box className="p-4 border-t border-primary-600 bg-primary-100 rounded-b-2xl">
          <Heading className=" capitalize text-primary-600">
            Product Name
          </Heading>
          <Text numberOfLines={2} className="text-typography-600">
            Lorem eu aliquip enim amet cillum sunt voluptate consectetur
            consectetur ad aliquip sit sint. Veniam cupidatat nisi nostrud
            nostrud deserunt eu consequat. Dolor culpa aute proident mollit
            Lorem anim laborum velit sint est fugiat ipsum. Irure veniam
            consequat pariatur aute elit culpa fugiat ea.
          </Text>
          <HStack space="md" className=" justify-between items-center">
            <HStack space="md" className="items-center">
              <Avatar size={"md"}>
                <AvatarFallbackText>""</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                />
              </Avatar>
              <Box className="pt-2">
                <Heading size="sm">Mary Jane</Heading>
                <HStack>
                  <Icon className="text-primary-800" as={MapPin} />
                  <Text size="md">San Francisco, LA</Text>
                </HStack>
              </Box>
            </HStack>

            <HStack space="md" className=" items-center">
              <Button variant="link">
                <ButtonIcon as={FavouriteIcon} />
              </Button>
              <Button variant="link">
                <ButtonIcon as={Share2} />
              </Button>
            </HStack>
          </HStack>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity
        className="border border-primary-200 rounded-2xl relative"
        onPress={() => {
          router.push("/stacks/product/1");
        }}
      >
        <Badge
          className="absolute top-4 right-4 z-10"
          variant={"solid"}
          action={"error"}
          size={"md"}
        >
          <BadgeText>$45 value</BadgeText>
        </Badge>
        <Box className="aspect-video overflow-hidden">
          <Image
            size="full"
            source={require("@/assets/images/pot.jpg")}
            alt="Product image"
            className="rounded-t-2xl"
          />
        </Box>
        <Box className="p-4 border-t border-primary-600 bg-primary-100 rounded-b-2xl">
          <Heading className=" capitalize text-primary-600">
            Product Name
          </Heading>
          <Text numberOfLines={2} className="text-typography-600">
            Lorem eu aliquip enim amet cillum sunt voluptate consectetur
            consectetur ad aliquip sit sint. Veniam cupidatat nisi nostrud
            nostrud deserunt eu consequat. Dolor culpa aute proident mollit
            Lorem anim laborum velit sint est fugiat ipsum. Irure veniam
            consequat pariatur aute elit culpa fugiat ea.
          </Text>
          <HStack space="md" className=" justify-between items-center">
            <HStack space="md" className="items-center">
              <Avatar size={"md"}>
                <AvatarFallbackText>""</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                />
              </Avatar>
              <Box className="pt-2">
                <Heading size="sm">Mary Jane</Heading>
                <HStack>
                  <Icon className="text-primary-800" as={MapPin} />
                  <Text size="md">San Francisco, LA</Text>
                </HStack>
              </Box>
            </HStack>

            <HStack space="md" className=" items-center">
              <Button variant="link">
                <ButtonIcon as={FavouriteIcon} />
              </Button>
              <Button variant="link">
                <ButtonIcon as={Share2} />
              </Button>
            </HStack>
          </HStack>
        </Box>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Home;
