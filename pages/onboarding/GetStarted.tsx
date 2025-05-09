import Logo from "@/components/Logo";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { ArrowRightIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const GetStarted = () => {
  return (
    <Box className=" flex flex-1 bg-primary-300 px-4 ">
      <SafeAreaView className="flex flex-1">
        <Center className="py-5">
          <Logo />
        </Center>

        <Heading className="text-white uppercase text-center py-2">
          Fellow Support
        </Heading>
        <Text className="text-white capitalize text-center py-2 italics">
          Barter what you have for what you want....
        </Text>
        <Box className="py-10">
          <Box className="aspect-video rounded-full">
            <Image
              source={require("@/assets/images/get-started-vector.png")}
              size="full"
              borderRadius={9999}
              alt="vector"
            />
          </Box>
        </Box>
        <VStack className="flex-1 justify-end py-8">
          <Link href={"/(auth)/signup"} asChild>
            <Button className="w-full">
              <ButtonText>Get Started</ButtonText>
              <ButtonIcon as={ArrowRightIcon} />
            </Button>
          </Link>
        </VStack>
      </SafeAreaView>
    </Box>
  );
};

export default GetStarted;
