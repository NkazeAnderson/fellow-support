import { CloseIcon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { Box } from "@/components/ui/box";
import { ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { FavouriteIcon, Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import UserAvatar from "@/components/UserAvatar";
import { useAppContext } from "@/context/AppContextProvider";
import { insertUpdateDeleteProperty } from "@/utils/properties";
import { insertUpdateDeleteTrade } from "@/utils/trades";
import { tradeT } from "@/zodSchema";
import { Redirect, router, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  ArrowLeftRight,
  MapPin,
  PenLine,
  Share2,
  Trash,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
let timeout: NodeJS.Timeout | null | number = null;
const Product = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  const {
    userMethods: { user, chats },
    propertyMethods: { properties },
    showToast,
  } = useAppContext();
  const flatListRef = useRef<FlatList>(null);
  const loadedSlider = useRef(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  console.log(id);

  const property = properties.find((item) => item.id === id);
  console.log(property, properties);

  const {
    control,
    formState: { errors },
    watch,
  } = useForm<{
    searchText: string;
  }>();
  const tradeForm = useForm<tradeT>({
    defaultValues: {
      requestedBy: user?.id,
      productRequested: id,
    },
  });
  const [showDrawer, setShowDrawer] = useState(false);
  const searchText = watch("searchText");

  useEffect(() => {
    if (flatListRef.current && !timeout) {
      timeout = setInterval(() => {
        if (flatListRef.current && property) {
          flatListRef.current.scrollToIndex({
            index:
              currentImageIndex === property.picturesUrl.length - 1
                ? 0
                : currentImageIndex + 1,
            animated: true,
          });
        }
      }, 5000);
    }
    return () => {
      timeout && clearTimeout(timeout);
      timeout = null;
    };
  }, [flatListRef.current, currentImageIndex]);
  if (!user) {
    return <Redirect href={".."}></Redirect>;
  }
  if (!property) {
    return <Center className=" flex-1"></Center>;
  }
  const isOwner = property.owner.id === user.id;
  return (
    <>
      <ScrollView className=" flex flex-1 bg-primary-0 relative ">
        <FlatList
          ref={flatListRef}
          data={property.picturesUrl}
          renderItem={({ item }) => (
            <Box className="aspect-video relative w-[100vw]">
              <Image
                size="full"
                source={{
                  uri: item,
                }}
                alt="Product image"
              />
            </Box>
          )}
          horizontal
          pagingEnabled
          onViewableItemsChanged={({ viewableItems }) => {
            if (loadedSlider.current) {
              timeout && clearInterval(timeout);
              viewableItems.length === 1 &&
                setCurrentImageIndex(viewableItems[0].index ?? 0);
              timeout = null;
            } else {
              loadedSlider.current = true;
            }
          }}
          showsHorizontalScrollIndicator={false}
        />
        <SafeAreaView className="absolute w-full">
          <HStack className=" justify-between items-center px-4">
            <Button
              className="bg-primary-600/10 aspect-square rounded-full"
              onPress={() => router.back()}
            >
              <ButtonIcon className=" text-primary-600" as={ArrowLeft} />
            </Button>
            <HStack space="xl">
              <Button className="bg-primary-600/10 aspect-square rounded-full">
                <ButtonIcon className=" text-primary-600" as={FavouriteIcon} />
              </Button>
              <Button className="bg-primary-600/10 aspect-square rounded-full">
                <ButtonIcon className=" text-primary-600" as={Share2} />
              </Button>
            </HStack>
          </HStack>
        </SafeAreaView>
        <HStack space="sm" className=" items-center justify-center py-4">
          {property.picturesUrl.map((_, index) => (
            <Box
              key={index}
              className={`p-1 rounded-full border border-primary-600 ${
                currentImageIndex === index && "bg-primary-600"
              }`}
            ></Box>
          ))}
        </HStack>
        <VStack space="lg" className="px-4">
          <Heading className=" capitalize">{property.name}</Heading>
          <Text>{property.description}</Text>
          {property.value && (
            <Text className=" text-center">
              <Text className="font-bold">${property.value}</Text> value
            </Text>
          )}
          <Heading size="md">Posted By</Heading>

          <HStack space="md" className=" items-center">
            <UserAvatar user={property.owner} size="lg" />
            <Box>
              <Heading
                size="sm"
                className=" capitalize"
              >{`${property.owner.firstName} ${property.owner.lastName}`}</Heading>
              <HStack>
                <Icon className="text-primary-800" as={MapPin} />
                <Text size="md">{property.location}</Text>
              </HStack>
            </Box>
          </HStack>
        </VStack>

        <Box>
          {isOwner && (
            <Box className=" w-full px-4 gap-4 py-10">
              <Button
                action="secondary"
                onPress={() => {
                  router.push({
                    pathname: "/stacks/add",
                    params: {
                      id,
                    },
                  });
                }}
              >
                <ButtonIcon as={PenLine} />
                <ButtonText>Edit</ButtonText>
              </Button>
              <Button action="negative" onPress={() => setShowModal(true)}>
                <ButtonIcon as={Trash} />
                <ButtonText>Delete</ButtonText>
              </Button>
            </Box>
          )}
        </Box>
      </ScrollView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {!isOwner && (
        <Fab
          size={"lg"}
          placement="bottom right"
          onPress={() => setShowDrawer(true)}
          className="bottom-10"
        >
          <FabIcon className=" rotate-90" as={ArrowLeftRight} />
          <FabLabel>Trade</FabLabel>
        </Fab>
      )}
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
        size="sm"
        anchor="bottom"
      >
        <DrawerBackdrop />
        <DrawerContent className=" bg-primary-100 rounded-t-3xl h-[60vh]">
          <DrawerHeader>
            <VStack space="md" className=" w-full">
              <Heading size="lg">Select property to trade with</Heading>
              <Input
                control={control}
                name="searchText"
                errors={errors}
                specifics={{
                  type: "text",
                  placeholder: "Filter",
                }}
              />
            </VStack>
          </DrawerHeader>
          <DrawerBody>
            <ScrollView className=" h-[60%]">
              {properties
                .filter((item) => item.owner.id === user.id)
                .filter((item) =>
                  searchText
                    ? item.name.toLowerCase().includes(searchText.toLowerCase())
                    : true
                )
                .map((item, index) => {
                  return (
                    <HStack
                      key={index}
                      className=" justify-between items-center my-1"
                    >
                      <HStack space="sm" className="items-center">
                        <Image
                          className=" rounded-md"
                          size="xs"
                          source={{
                            uri: item.picturesUrl[0],
                          }}
                          alt="product image"
                        />
                        <Heading size="sm">{item.name}</Heading>
                      </HStack>
                      <Button
                        size="sm"
                        onPress={tradeForm.handleSubmit(
                          async (data) => {
                            data.product = item.id;
                            const res = await insertUpdateDeleteTrade(
                              data,
                              "insert"
                            );
                            if (!res.error) {
                              showToast(
                                "Success",
                                "Started a trade with " + item.name,
                                "success"
                              );
                              setShowDrawer(false);
                            } else {
                              showToast(
                                "Failed",
                                "Failed to open a traded trade"
                              );
                            }
                          },
                          (e) => {
                            console.log({
                              e,
                            });
                          }
                        )}
                        isSubmitting={tradeForm.formState.isSubmitting}
                        disabled={tradeForm.formState.isSubmitting}
                      >
                        <ButtonIcon
                          className=" rotate-90"
                          as={ArrowLeftRight}
                        />
                        <ButtonText>Select</ButtonText>
                      </Button>
                    </HStack>
                  );
                })}
            </ScrollView>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Modal
        isOpen={showModal}
        onClose={() => {
          !isDeleting && setShowModal(false);
        }}
        className=" border-2 border-red-700/50 rounded-2xl"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Confirm action</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Are you sure you'll like to delete this item?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              className="mr-3"
              onPress={() => {
                !isDeleting && setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="negative"
              className="border-0"
              isSubmitting={isDeleting}
              onPress={() => {
                setIsDeleting(true);
                insertUpdateDeleteProperty({ id }, "delete")
                  .then(() => {
                    showToast(
                      "Deleted",
                      `${property.name} was successfully deleted`,
                      "warning"
                    );
                    router.back();
                  })
                  .finally(() => {
                    setIsDeleting(false);
                  });
              }}
            >
              <ButtonText>Yes, Delete!</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <StatusBar translucent />
    </>
  );
};
export default Product;
