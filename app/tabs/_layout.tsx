import Logo from "@/components/Logo";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";

import { Link, Tabs } from "expo-router";
import { Bell, Plus } from "lucide-react-native";
import React from "react";
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerBackgroundContainerStyle: {
          backgroundColor: "#FFFAF5",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerRight: () => (
            <HStack space="md" className=" items-center pr-4">
              <Link href={"/stacks/add"} asChild>
                <Button className="rounded-full aspect-square">
                  <ButtonIcon
                    className=" font-bold"
                    stroke={"white"}
                    as={Plus}
                  />
                </Button>
              </Link>
              <Button variant="link">
                <ButtonIcon as={Bell} />
              </Button>
              <Avatar size={"md"}>
                <AvatarFallbackText>""</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                />
              </Avatar>
            </HStack>
          ),
          headerLeft: () => <Logo />,
          title: "",
        }}
      />
    </Tabs>
  );
};
export default _layout;
