import Logo from "@/components/Logo";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";

import { Link, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Bell,
  Home,
  Mail,
  NotebookTabs,
  Plus,
  Search,
  UserCircle,
} from "lucide-react-native";
import React from "react";
const _layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerBackgroundContainerStyle: {
            backgroundColor: "#FFFAF5",
          },
          tabBarBackground: () => (
            <Box className="w-full h-full bg-green-600"></Box>
          ),
          headerBackground: () => (
            <Box className="w-full h-full bg-primary-0"></Box>
          ),
          tabBarStyle: {
            paddingHorizontal: 10,
            position: "relative",
          },
          animation: "shift",
          tabBarShowLabel: false,
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
            tabBarIcon: ({ focused }) => (
              <Box
                className={`${
                  focused ? "bg-primary-0 bottom-4" : ""
                } p-4 rounded-full relative`}
              >
                <Icon
                  className={`${
                    focused ? "text-green-500" : "text-primary-0"
                  } w-8 h-8 `}
                  as={Home}
                />
              </Box>
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            tabBarIcon: ({ focused }) => (
              <Box
                className={`${
                  focused ? "bg-primary-0 bottom-4" : ""
                } p-4 rounded-full relative`}
              >
                <Icon
                  className={`${
                    focused ? "text-green-500" : "text-primary-0"
                  } w-8 h-8 `}
                  as={Mail}
                />
              </Box>
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ focused }) => (
              <Box
                className={`${
                  focused ? "bg-primary-0 bottom-4" : ""
                } p-4 rounded-full relative`}
              >
                <Icon
                  className={`${
                    focused ? "text-green-500" : "text-primary-0"
                  } w-8 h-8 `}
                  as={Search}
                />
              </Box>
            ),
          }}
        />

        <Tabs.Screen
          name="trades"
          options={{
            title: "Trades",
            tabBarIcon: ({ focused }) => (
              <Box
                className={`${
                  focused ? "bg-primary-0 bottom-4" : ""
                } p-4 rounded-full relative`}
              >
                <Icon
                  className={`${
                    focused ? "text-green-500" : "text-primary-0"
                  } w-8 h-8 `}
                  as={NotebookTabs}
                />
              </Box>
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ focused }) => (
              <Box
                className={`${
                  focused ? "bg-primary-0 bottom-4" : ""
                } p-4 rounded-full relative`}
              >
                <Icon
                  className={`${
                    focused ? "text-green-500" : "text-primary-0"
                  } w-8 h-8 `}
                  as={UserCircle}
                />
              </Box>
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#FFFAF5" />
    </>
  );
};
export default _layout;
