import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { AppContext, AppContextT } from "@/context/AppContextProvider";
import { supabase } from "@/supabase";
import { LogOut } from "lucide-react-native";
import React, { useContext, useState } from "react";
import { View } from "react-native";
const Account = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const { user } = useContext(AppContext) as AppContextT;
  return (
    <View className="flex flex-1 bg-primary-0 p-2 justify-between">
      {user && (
        <>
          <Center>
            <Avatar size={"lg"}>
              <AvatarFallbackText className=" uppercase">{`${user.firstName.charAt(
                0
              )} ${user.lastName.charAt(0)}`}</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: user.profilePiture ?? undefined,
                }}
              />
            </Avatar>
            <Heading
              className=" capitalize"
              size="xs"
            >{`${user.firstName} ${user.lastName}`}</Heading>
          </Center>
        </>
      )}
      <Button
        disabled={loggingOut}
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
  );
};
export default Account;
