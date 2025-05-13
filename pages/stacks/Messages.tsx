import Input from "@/components/Input";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { EllipsisVertical, Paperclip, Send } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";

const Messages = () => {
  const { control } = useForm();
  return (
    <View className=" p-4 flex flex-1 bg-primary-0 gap-4 relative">
      <HStack space="md" className=" justify-between items-center">
        <HStack space="md" className="items-center">
          <Avatar size={"md"}>
            <AvatarFallbackText>""</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
          </Avatar>
          <Box className="pt-2">
            <Heading size="sm">Mary Jane</Heading>
            <HStack>
              <Box className="p-1 rounded-full bg-green-600"></Box>
              <Text size="xs">Online</Text>
            </HStack>
          </Box>
        </HStack>

        <HStack space="md" className=" items-center">
          <Button variant="link">
            <ButtonIcon as={EllipsisVertical} />
          </Button>
        </HStack>
      </HStack>
      <ScrollView
        className=" gap-2 flex flex-1"
        showsVerticalScrollIndicator={false}
      >
        <HStack className=" mb-4">
          <Box className="w-11/12 bg-primary-100 p-2 rounded-md">
            <Text className=" text-typography-600">
              Aute tempor nostrud id eiusmod ea sint et est consequat ea amet
              officia deserunt dolor. Amet irure voluptate nostrud ullamco ex
              ipsum ipsum nulla nostrud tempor officia dolor enim. Lorem officia
              nulla magna nulla. Nulla in incididunt proident ad ad laborum
              dolor est id ullamco proident commodo laborum. Cillum nulla
              officia pariatur esse consectetur incididunt amet mollit. Pariatur
              commodo incididunt tempor tempor adipisicing Lorem eiusmod
              consectetur ad minim. Enim officia quis nostrud cupidatat non elit
              exercitation aliqua elit veniam cupidatat labore aliqua ullamco.
            </Text>
          </Box>
        </HStack>

        <HStack className=" justify-end">
          <Box className="w-11/12 bg-gray-100 p-2 rounded-md">
            <Text className=" text-typography-600">
              Aute tempor nostrud id eiusmod ea sint et est consequat ea amet
              officia deserunt dolor. Amet irure voluptate nostrud ullamco ex
              ipsum ipsum nulla nostrud tempor officia dolor enim. Lorem officia
              nulla magna nulla. Nulla in incididunt proident ad ad laborum
              dolor est id ullamco proident commodo laborum. Cillum nulla
              officia pariatur esse consectetur incididunt amet mollit. Pariatur
              commodo incididunt tempor tempor adipisicing Lorem eiusmod
              consectetur ad minim. Enim officia quis nostrud cupidatat non elit
              exercitation aliqua elit veniam cupidatat labore aliqua ullamco.
            </Text>
          </Box>
        </HStack>
      </ScrollView>
      <Input
        control={control}
        name="text"
        specifics={{
          type: "text",
          iconRight: { icon: Send },
          iconLeft: { icon: Paperclip },
          placeholder: "Text...",
        }}
      />
    </View>
  );
};

export default Messages;
