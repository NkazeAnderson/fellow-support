import ImagePickerDrawerContent from "@/components/ImagePickerDrawerContent";
import { Box } from "@/components/ui/box";

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Drawer, DrawerBackdrop } from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { FavouriteIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import UserAvatar from "@/components/UserAvatar";
import { useAppContext } from "@/context/AppContextProvider";
import { supabase } from "@/supabase";
import { uploadBase64ImageToSupabase } from "@/supabase/media";
import { insertUpdateDeleteUser } from "@/utils/users";
import { ImagePickerAsset } from "expo-image-picker";
import { Link } from "expo-router";
import {
  Boxes,
  CheckCheck,
  ChevronRight,
  CreditCard,
  LogOut,
  SwitchCamera,
  UserCircle,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
const Account = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const {
    userMethods: { user },
  } = useAppContext();
  const [image, setImage] = useState<ImagePickerAsset>();
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <>
      <View className="flex flex-1 bg-primary-0 p-2 justify-between">
        {user && (
          <Box className=" gap-4">
            <Center>
              <Box className="relative">
                <UserAvatar user={user} size="xl" />
                <Box className="absolute bottom-0 -right-14">
                  <Button
                    variant="link"
                    onPress={() => {
                      !image
                        ? setShowDrawer(true)
                        : uploadBase64ImageToSupabase(image).then(
                            async (res) => {
                              await insertUpdateDeleteUser(
                                { id: user.id, profilePiture: res },
                                "update"
                              );
                              setImage(undefined);
                            }
                          );
                    }}
                  >
                    {!image ? (
                      <ButtonIcon className=" w-8 h-8" as={SwitchCamera} />
                    ) : (
                      <ButtonIcon className=" w-8 h-8" as={CheckCheck} />
                    )}
                    {/* <ButtonText>Change</ButtonText> */}
                  </Button>
                </Box>
              </Box>
              <Heading
                className=" capitalize"
                size="xs"
              >{`${user.firstName} ${user.lastName}`}</Heading>
            </Center>
            <VStack>
              <Link href={"/tabs"} asChild>
                <Pressable className="py-3">
                  <HStack className=" items-center justify-between">
                    <HStack space="md" className="items-center">
                      <Icon as={UserCircle} />
                      <Text>Profile</Text>
                    </HStack>
                    <Icon as={ChevronRight} />
                  </HStack>
                </Pressable>
              </Link>

              <Link href={"/stacks/my-products"} asChild>
                <Pressable className="py-3">
                  <HStack className=" items-center justify-between">
                    <HStack space="md" className="items-center">
                      <Icon as={Boxes} />
                      <Text>My Properties</Text>
                    </HStack>
                    <Icon as={ChevronRight} />
                  </HStack>
                </Pressable>
              </Link>

              <Link href={"/stacks/my-products"} asChild>
                <Pressable className="py-3">
                  <HStack className=" items-center justify-between">
                    <HStack space="md" className="items-center">
                      <Icon as={FavouriteIcon} />
                      <Text>Favorite Properties</Text>
                    </HStack>
                    <Icon as={ChevronRight} />
                  </HStack>
                </Pressable>
              </Link>

              <Link href={"/stacks/my-products"} asChild>
                <Pressable className="py-3">
                  <HStack className=" items-center justify-between">
                    <HStack space="md" className="items-center">
                      <Icon as={CreditCard} />
                      <Text>Subscription</Text>
                    </HStack>
                    <Icon as={ChevronRight} />
                  </HStack>
                </Pressable>
              </Link>
            </VStack>
          </Box>
        )}
        <Box className=" gap-2">
          <Link href={"/privacy"} asChild>
            <Button variant="link" action="secondary">
              <ButtonText>Privacy</ButtonText>
            </Button>
          </Link>
          <Link href={"/terms"} asChild>
            <Button variant="link" action="secondary">
              <ButtonText>Terms of use</ButtonText>
            </Button>
          </Link>
          <Button
            disabled={loggingOut}
            action="secondary"
            onPress={() => {
              setLoggingOut(true);
              supabase.auth.signOut().then((res) => {
                !res.error && setLoggingOut(false);
              });
            }}
          >
            <ButtonText>Sign Out</ButtonText>
            <ButtonIcon as={LogOut} />
          </Button>
        </Box>
      </View>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
        size="sm"
        anchor="bottom"
      >
        <DrawerBackdrop />
        <ImagePickerDrawerContent
          options={{ allowMultiple: false }}
          callback={(res) => {
            if (res) {
              setImage(res[0]);
            }
            setShowDrawer(false);
          }}
        />
      </Drawer>
    </>
  );
};
export default Account;
