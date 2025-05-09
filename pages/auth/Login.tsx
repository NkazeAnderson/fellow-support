import { Button, ButtonText } from "@/components/ui/button";

import Input from "@/components/Input";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link, router } from "expo-router";
import { Eye, EyeOffIcon, Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
const Login = () => {
  const [showPassword, setshowPassword] = useState(false);
  const { control } = useForm();
  return (
    <SafeAreaView className="flex flex-1 bg-primary-50 px-4">
      <Heading size="2xl" className="text-center text-primary-600 py-10">
        Log In
      </Heading>
      <VStack space="md">
        <Input
          label="Email"
          labelClassName="text-primary-600"
          control={control}
          name="email"
          specifics={{
            type: "text",
            iconLeft: {
              icon: Mail,
            },
          }}
        />
        <Input
          label="Password"
          control={control}
          labelClassName="text-primary-600"
          name="password"
          specifics={{
            type: showPassword ? "password" : "text",
            iconLeft: {
              icon: Lock,
            },
            iconRight: {
              icon: !showPassword ? Eye : EyeOffIcon,
              onIconPress: () => setshowPassword((p) => !p),
            },
          }}
        />
      </VStack>
      <Box className="py-10">
        <Button
          action={"primary"}
          variant={"solid"}
          size={"lg"}
          isDisabled={false}
          onPress={() => router.push("/tabs")}
        >
          <ButtonText>Log In</ButtonText>
        </Button>
      </Box>

      <VStack space="4xl">
        <HStack space="md" className=" justify-center items-center">
          <Box className="flex-grow">
            <Divider />
          </Box>
          <Heading size="xs">OR</Heading>
          <Box className="flex-grow">
            <Divider />
          </Box>
        </HStack>
        <Center>
          <Text className="text-typography-400">Continue with</Text>
        </Center>
        <VStack space="2xl">
          <Button variant="outline" size="lg">
            <Image
              size="xs"
              source={require("@/assets/images/icons8-google-logo-48.png")}
              alt="logo"
            />
            <ButtonText>Google</ButtonText>
          </Button>
          <Button variant="outline" size="lg">
            <Image
              size="xs"
              source={require("@/assets/images/icons8-apple-logo-48.png")}
              alt="logo"
            />
            <ButtonText>Apple</ButtonText>
          </Button>
        </VStack>
      </VStack>
      <VStack space="xl" className=" flex-1 pb-10 justify-end items-center">
        <Text>
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary-600">
            Sign Up
          </Link>
        </Text>
        <Text className="text-center text-typography-400">
          By using this product, you agree fellow support's{" "}
          <Link href="/terms" className="text-primary-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary-600">
            Privacy Policy
          </Link>
        </Text>
      </VStack>
    </SafeAreaView>
  );
};
export default Login;
