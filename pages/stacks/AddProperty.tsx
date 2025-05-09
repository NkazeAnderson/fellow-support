import Input from "@/components/Input";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Camera, DollarSign, Star, XCircle } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const AddProperty = () => {
  const { control } = useForm();
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}
    >
      <ScrollView>
        <VStack space="md" className="p-4">
          <Input
            control={control}
            name="name"
            label="Name"
            specifics={{ type: "text" }}
            labelClassName="text-primary-600"
          />
          <Input
            control={control}
            name="description"
            label="Description"
            specifics={{ type: "textArea" }}
            labelClassName="text-primary-600"
          />
          <Heading size="sm" className="text-primary-600">
            Images
          </Heading>
          <HStack space="sm" className="mt-2">
            <Box className="w-[30vw] aspect-square rounded-lg border">
              <Center className="w-full h-full">
                <Icon as={Camera} />
                <Text>Add</Text>
              </Center>
            </Box>
            <Box className="w-[30vw] aspect-square rounded-lg border relative elevation-md">
              <Image
                className="rounded-md"
                size="full"
                source={require("@/assets/images/pot.jpg")}
                alt="image to add"
              />
              <Button variant="link" className="absolute right-2 ">
                <ButtonIcon as={Star} />
              </Button>
              <Button
                variant="link"
                action="negative"
                className="absolute right-2 -top-10 "
              >
                <ButtonIcon as={XCircle} />
              </Button>
            </Box>
          </HStack>
          <Input
            control={control}
            name="value"
            label="Estimated value "
            specifics={{ type: "text", iconLeft: { icon: DollarSign } }}
            labelClassName="text-primary-600"
          />
          <Button className="mt-11">
            <ButtonText>Add Property</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddProperty;
