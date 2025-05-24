import ImagePickerDrawerContent from "@/components/ImagePickerDrawerContent";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Drawer, DrawerBackdrop } from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { AppContext, AppContextT } from "@/context/AppContextProvider";
import { supabase } from "@/supabase";
import { uploadBase64ImageToSupabase } from "@/supabase/media";
import { insertUpdateDeleteUser } from "@/utils/users";
import { ImagePickerAsset } from "expo-image-picker";
import { CheckCheck, LogOut, SwitchCamera } from "lucide-react-native";
import React, { useContext, useState } from "react";
import { View } from "react-native";
const Account = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const { user } = useContext(AppContext) as AppContextT;
  const [image, setImage] = useState<ImagePickerAsset>();
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <>
      <View className="flex flex-1 bg-primary-0 p-2 justify-between">
        {user && (
          <>
            <Center>
              <Box className="relative">
                <Avatar size={"lg"}>
                  <AvatarFallbackText className=" uppercase">{`${user.firstName.charAt(
                    0
                  )} ${user.lastName.charAt(0)}`}</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: image?.uri
                        ? image.uri
                        : user.profilePiture ?? undefined,
                    }}
                  />
                </Avatar>
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
          </>
        )}
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
