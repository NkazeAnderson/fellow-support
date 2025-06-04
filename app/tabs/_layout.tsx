import Logo from "@/components/Logo";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import UserAvatar from "@/components/UserAvatar";
import { tables } from "@/constants";
import { useAppContext } from "@/context/AppContextProvider";
import { supabase } from "@/supabase";
import {
  chatRealtimeChannel,
  messageRealtimeChannel,
  productRealtimeChannel,
  tradeRealtimeChannel,
  userRealtimeChannel,
} from "@/supabase/realtime";
import { populatedProductT } from "@/types";
import { getChat } from "@/utils/chats";
import { getProperty } from "@/utils/properties";
import { getAllRemoteConst } from "@/utils/remoteConstants";
import { getTrade } from "@/utils/trades";

import { Link, router, Tabs } from "expo-router";
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
import React, { useEffect, useRef } from "react";
const DbChannel = supabase.channel(`RealTime`);
const _layout = () => {
  const {
    userMethods: {
      user,
      updateChats,
      updateTrades,
      updateUser,
      addMessageToChat,
    },
    propertyMethods: { updateProperty },
  } = useAppContext();

  const loaded = useRef(false);

  useEffect(() => {
    if (!user || loaded.current) return;

    getTrade({}).then((res) => {
      res.data && updateTrades(res.data);
    });
    getChat({ userId: user.id }).then((res) => {
      console.log({ chats: res.data });
      res.data && updateChats(res.data);
    });

    getProperty({}).then((res) => {
      if (res.data as populatedProductT[]) {
        updateProperty(res.data!);
        // Todo : Refactor to only pull when needed
        getProperty({ ownerId: user.id }).then((myPropertiesRes) => {
          const data = myPropertiesRes.data as populatedProductT[];
          if (data) {
            const unlisted: populatedProductT[] = [];
            data.forEach((item) => {
              if (
                !res.data.some(
                  (property: populatedProductT) => property.id === item.id
                )
              ) {
                unlisted.push(item);
                updateProperty(unlisted);
              }
            });
          }
        });
        user.favoriteProducts &&
          getProperty({ favorites: user.favoriteProducts }).then(
            (myPropertiesRes) => {
              const data = myPropertiesRes.data as populatedProductT[];
              if (data) {
                const unlisted: populatedProductT[] = [];
                data.forEach((item) => {
                  if (
                    !res.data.some(
                      (property: populatedProductT) => property.id === item.id
                    )
                  ) {
                    unlisted.push(item);
                    updateProperty(unlisted);
                  }
                });
              }
            }
          );
      } else {
        console.log(res.error);
      }
    });
    loaded.current = true;
  }, [user]);

  useEffect(() => {
    getAllRemoteConst();
    supabase.auth
      .getUser()
      .then(async (res) => {
        if (res.data && res.data.user) {
          const userRes = await supabase
            .from(tables.users)
            .select()
            .eq("id", res.data.user.id)
            .single();

          if (userRes.data) {
            updateUser(userRes.data);

            productRealtimeChannel(updateProperty, userRes.data.id).subscribe(
              (status, err) => {
                console.log("Product RealTime Subscription", { status, err });
              }
            );
            userRealtimeChannel(updateUser, userRes.data.id).subscribe(
              (status, err) => {
                console.log("User RealTime Subscription", { status, err });
              }
            );
            chatRealtimeChannel(updateChats).subscribe((status, err) => {
              console.log("Chat RealTime Subscription", { status, err });
            });
            chatRealtimeChannel(updateChats).subscribe((status, err) => {
              console.log("Chat RealTime Subscription", { status, err });
            });
            messageRealtimeChannel(addMessageToChat, updateChats).subscribe(
              (status, err) => {
                console.log("Message RealTime Subscription", { status, err });
              }
            );
            tradeRealtimeChannel(updateTrades).subscribe((status, err) => {
              console.log("Trade RealTime Subscription", { status, err });
            });
          } else {
            console.log("Failed to get user info", res);
            router.back();
          }
        }
      })
      .catch((e) => {
        console.log(e);
        router.back();
      });

    return () => {
      supabase.removeAllChannels();
    };
  }, []);

  if (!user) {
    return (
      <Center className=" flex-1">
        <Box className=" animate-pulse">
          <Logo />
        </Box>
      </Center>
    );
  }

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
                {user && (
                  <Link href={"/tabs/account"}>
                    <UserAvatar user={user} />
                  </Link>
                )}
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
