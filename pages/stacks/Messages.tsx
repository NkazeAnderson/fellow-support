import ImagePickerDrawerContent from "@/components/ImagePickerDrawerContent";
import Input from "@/components/Input";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Drawer, DrawerBackdrop } from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { AppContext, AppContextT } from "@/context/AppContextProvider";
import { uploadBase64ImageToSupabase } from "@/supabase/media";
import { handleSubmitErrorHandler } from "@/utils";
import { insertUpdateDeleteMessage } from "@/utils/chats";
import { messageSchema } from "@/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePickerAsset } from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import {
  EllipsisVertical,
  Paperclip,
  Send,
  XCircle,
} from "lucide-react-native";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FlatList, View } from "react-native";
import { z } from "zod";

const schema = messageSchema.omit({ id: true, createdAt: true });

const Messages = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const { chats, user, trades } = useContext(AppContext) as AppContextT;
  const [showDrawer, setShowDrawer] = useState(false);
  const [images, setImages] = useState<ImagePickerAsset[]>([]);

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      chat: chatId,
      sentBy: user?.id,
      images: [],
      text: "",
    },
  });

  const sendMessage = async (data: Partial<z.infer<typeof schema>>) => {
    const remotePaths: string[] = [];
    if (!images.length) {
      delete data.images;
    } else {
      for (let image of images) {
        const res = await uploadBase64ImageToSupabase(image);
        remotePaths.push(res);
      }
      data.images = remotePaths;
    }
    if (!data.text) {
      delete data.text;
    }
    if (!data.text && !data.images?.length) {
      return;
    }
    const res = await insertUpdateDeleteMessage(data, "insert");
    if (!res.error) {
      setValue("text", "");
      setValue("images", []);
      setImages([]);
    }
  };

  const chat = chats.find((item) => item.id === chatId)!;

  return (
    <>
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
              <Heading
                size="sm"
                className="capitalize"
              >{`${chat.otherMember.firstName} ${chat.otherMember.lastName}`}</Heading>
              <HStack space="xs" className=" items-center">
                <Box className="w-1 h-1 rounded-full bg-green-600"></Box>
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
        <FlatList
          className=" gap-2 flex flex-1"
          showsVerticalScrollIndicator={false}
          data={chat.messages}
          renderItem={({ item }) => {
            return (
              <>
                <HStack
                  className={` mb-4 ${
                    item.sentBy === user?.id && "justify-end"
                  }`}
                >
                  <Box
                    className={
                      item.sentBy === user?.id
                        ? "w-11/12 bg-gray-100 p-2 rounded-md"
                        : "w-11/12 bg-primary-100 p-2 rounded-md"
                    }
                  >
                    {Boolean(item.text) && (
                      <Text className=" text-typography-600">{item.text}</Text>
                    )}
                    {Boolean(item.images?.length) &&
                      item.images?.map((uri, index) => (
                        <Box key={index} className="aspect-square p-2">
                          <Image
                            size="full"
                            source={{ uri }}
                            className="rounded-md"
                            alt="image in message"
                          />
                        </Box>
                      ))}
                  </Box>
                </HStack>
              </>
            );
          }}
        />
        <Box>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <Box className=" relative mr-2">
                <Button
                  size="sm"
                  variant="link"
                  action="negative"
                  onPress={() => {
                    setImages((prev) =>
                      prev.filter((asset) => asset.uri !== item.uri)
                    );
                  }}
                >
                  <ButtonIcon as={XCircle} />
                </Button>
                <Image size="lg" source={{ uri: item.uri }} alt="New image" />
              </Box>
            )}
            horizontal
          />
        </Box>
        <Input
          control={control}
          name="text"
          specifics={{
            type: "text",
            iconRight: {
              icon: Send,
              onIconPress: handleSubmit(sendMessage, handleSubmitErrorHandler),
            },
            iconLeft: {
              icon: Paperclip,
              onIconPress: () => {
                setShowDrawer(!showDrawer);
              },
            },
            placeholder: "Text...",
          }}
          errors={errors}
        />
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
          callback={(res) => {
            if (res) {
              setImages((prev) => (prev ? [...res, ...prev] : [...res]));
            }
            setShowDrawer(false);
          }}
        />
      </Drawer>
    </>
  );
};

export default Messages;
