import ImagePickerDrawerContent from "@/components/ImagePickerDrawerContent";
import Input from "@/components/Input";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Drawer, DrawerBackdrop, DrawerContent } from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import UserAvatar from "@/components/UserAvatar";
import { AppContext, AppContextT } from "@/context/AppContextProvider";
import { uploadBase64ImageToSupabase } from "@/supabase/media";
import { handleSubmitErrorHandler } from "@/utils";
import { insertUpdateDeleteMessage } from "@/utils/chats";
import { insertUpdateDeleteTrade } from "@/utils/trades";
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
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FlatList, ScrollView, View } from "react-native";
import { z } from "zod";

const schema = messageSchema.omit({ id: true, createdAt: true });

const Messages = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const { chats, user, trades, showToast } = useContext(
    AppContext
  ) as AppContextT;
  const [showDrawer, setShowDrawer] = useState(false);
  const [images, setImages] = useState<ImagePickerAsset[]>([]);
  const messagesFlatlistRef = useRef<FlatList | null>(null);
  const chat = chats.find((item) => item.id === chatId)!;
  const [showTrades, setShowTrades] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      messagesFlatlistRef &&
        chat.messages.length &&
        messagesFlatlistRef.current?.scrollToIndex({
          index: chat.messages.length - 1,
        });
    }, 100);
  }, [chats]);

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

  return (
    <>
      <View className=" p-4 flex flex-1 bg-primary-0 gap-4 relative">
        <HStack space="md" className=" justify-between items-center">
          <HStack space="md" className="items-center">
            <UserAvatar user={chat.otherMember} />
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
          ref={messagesFlatlistRef}
          onScrollToIndexFailed={(info) => {
            setTimeout(() => {
              messagesFlatlistRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            }, 500);
          }}
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
                      //@ts-ignore
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
          <FlatList
            data={[""]}
            renderItem={({ item }) => (
              <Box className=" relative mr-2">
                <Button
                  size="sm"
                  action="positive"
                  onPress={() => {
                    setShowTrades(true);
                    setShowDrawer(true);
                  }}
                >
                  <ButtonText>Show Pending Trades</ButtonText>
                </Button>
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
            returnKeyType: "send",
            onSubmitEditing: handleSubmit(
              sendMessage,
              handleSubmitErrorHandler
            ),
          }}
          errors={errors}
        />
      </View>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
          setShowTrades(false);
        }}
        size="sm"
        anchor="bottom"
      >
        <DrawerBackdrop />
        {showTrades ? (
          <DrawerContent className="h-[60vh] rounded-t-lg bg-primary-50">
            <ScrollView>
              {trades
                .filter((item) => item.approvalStatus === "pending")
                .map((item) => (
                  <HStack
                    key={item.id}
                    space="lg"
                    className=" items-center my-4 "
                  >
                    <VStack space="sm" className="flex-1">
                      <HStack space="sm" className=" items-end">
                        <Image
                          size="xs"
                          source={{ uri: item.product.picturesUrl[0] }}
                          alt="image pic"
                          borderRadius={10}
                        />
                        <Heading
                          size="sm"
                          className="text-primary-600 italic capitalize"
                        >{`${item.product.name} `}</Heading>
                      </HStack>
                      <Divider />
                      <HStack space="sm" className=" items-start">
                        <Image
                          size="xs"
                          source={{ uri: item.productRequested.picturesUrl[0] }}
                          alt="image pic"
                          borderRadius={10}
                        />
                        <Heading
                          size="sm"
                          className="text-primary-600 italic capitalize "
                        >{`${item.productRequested.name} `}</Heading>
                      </HStack>
                    </VStack>
                    <VStack space="md">
                      <Button
                        size="sm"
                        action="positive"
                        onPress={() => {
                          insertUpdateDeleteTrade(
                            { id: item.id, approvalStatus: "accepted" },
                            "update"
                          ).then(() => {
                            setShowDrawer(false);
                            showToast(
                              "Accepted",
                              `You accepted a trade with ${item.requestedBy.firstName}`,
                              "success"
                            );
                          });
                        }}
                      >
                        <ButtonText>Accept</ButtonText>
                      </Button>
                      <Divider />
                      <Button
                        size="sm"
                        action="negative"
                        onPress={() => {
                          insertUpdateDeleteTrade(
                            { id: item.id, approvalStatus: "declined" },
                            "update"
                          ).then(() => {
                            setShowDrawer(false);
                            showToast(
                              "Declined",
                              `You declined a trade with ${item.requestedBy.firstName}`
                            );
                          });
                        }}
                      >
                        <ButtonText>Decline</ButtonText>
                      </Button>
                    </VStack>
                  </HStack>
                ))}
            </ScrollView>
          </DrawerContent>
        ) : (
          <ImagePickerDrawerContent
            callback={(res) => {
              if (res) {
                setImages((prev) => (prev ? [...res, ...prev] : [...res]));
              }
              setShowDrawer(false);
            }}
          />
        )}
      </Drawer>
    </>
  );
};

export default Messages;
