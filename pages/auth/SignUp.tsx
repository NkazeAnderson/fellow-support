import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";

import Input from "@/components/Input";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { tables } from "@/constants";
import { AppContext, AppContextT } from "@/context/AppContextProvider";
import { supabase } from "@/supabase";
import { handleSubmitErrorHandler } from "@/utils";
import { userSchema } from "@/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Eye, EyeOffIcon, Lock, Mail } from "lucide-react-native";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const schema = userSchema
  .omit({ id: true, profilePiture: true, favoriteProducts: true })
  .merge(z.object({ password: z.string() }));
const SignUp = () => {
  const [showPassword, setshowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const toast = useToast();
  const appcontext = useContext(AppContext) as AppContextT;

  const signUp = async (data: z.infer<typeof schema>) => {
    const { email, password, firstName, lastName } = data;
    try {
      const userCount = await supabase
        .from(tables.users)
        .select()
        .eq("email", email.trim());
      console.log(userCount);

      if (!userCount.data?.length) {
        const userInfo = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: "fellowsupport://login/",
          },
        });
        console.log(userInfo);

        if (!userInfo.error) {
          appcontext.showToast(
            "Email Sent",
            "Validate your email to complete sign up",
            "success"
          );
          await supabase
            .from(tables.users)
            .insert({ id: userInfo.data.user?.id, email, firstName, lastName });
        } else {
          appcontext.showToast(
            "Error Signing You Up",
            "We are unable to sign you up at this time",
            "error"
          );
        }
      } else {
        appcontext.showToast(
          "Account Already Exist",
          "Already createdan account using this email",
          undefined,
          () => router.push("/login")
        );
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <SafeAreaView className="flex flex-1 bg-primary-50 px-4">
      <Heading size="2xl" className="text-center text-primary-600 py-10">
        Sign Up
      </Heading>
      <ScrollView className="flex flex-1" showsVerticalScrollIndicator={false}>
        <VStack space="md">
          <HStack space="md">
            <Box className="flex-1">
              <Input
                label="First Name"
                labelClassName="text-primary-600"
                control={control}
                name="firstName"
                errors={errors}
                specifics={{
                  type: "text",
                }}
              />
            </Box>
            <Box className="flex-1">
              <Input
                label="Last Name"
                labelClassName="text-primary-600"
                control={control}
                name="lastName"
                errors={errors}
                specifics={{
                  type: "text",
                }}
              />
            </Box>
          </HStack>
          <Input
            label="Email"
            labelClassName="text-primary-600"
            control={control}
            name="email"
            errors={errors}
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
            errors={errors}
            specifics={{
              type: !showPassword ? "password" : "text",
              iconLeft: {
                icon: Lock,
              },
              iconRight: {
                icon: showPassword ? Eye : EyeOffIcon,
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
            isDisabled={isSubmitting}
            onPress={handleSubmit(signUp, handleSubmitErrorHandler)}
          >
            {isSubmitting && <ButtonSpinner />}
            <ButtonText>Sign Up</ButtonText>
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
            <Button variant="outline" size="lg" isDisabled={isSubmitting}>
              <Image
                size="xs"
                source={require("@/assets/images/icons8-google-logo-48.png")}
                alt="logo"
              />
              <ButtonText>Google</ButtonText>
            </Button>
            <Button variant="outline" size="lg" isDisabled={isSubmitting}>
              <Image
                size="xs"
                source={require("@/assets/images/icons8-apple-logo-48.png")}
                alt="logo"
              />
              <ButtonText>Apple</ButtonText>
            </Button>
          </VStack>
        </VStack>
        <VStack space="md" className=" flex-1 py-5 justify-end items-center">
          <Text>
            Already have an account?{" "}
            <Link href="/login" className="text-primary-600">
              Log In
            </Link>
          </Text>
          <Text className="text-center text-typography-400">
            By signing up, you agree fellow support's{" "}
            <Link href="/terms" className="text-primary-600">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary-600">
              Privacy Policy
            </Link>
          </Text>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUp;
