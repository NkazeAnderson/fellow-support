import Input from "@/components/Input";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { AppContext, AppContextT } from "@/context/AppContextProvider";
import { pickImage } from "@/utils/camera";
import { categoryT, productSchema } from "@/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Camera,
  DollarSign,
  GalleryVertical,
  MapPin,
  Star,
  XCircle,
} from "lucide-react-native";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const AddProperty = () => {
  const { constantsFromDB, user } = useContext(AppContext) as AppContextT;

  const [images, setiImages] = useState<string[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [primaryImage, setPrimaryImage] = useState("");

  const {
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(productSchema.omit({ id: true })),
    defaultValues: {
      owner: user?.id,
      location: "Los Angeles, CA",
    },
  });

  const categoryForm = useForm<categoryT>();

  const selectedCategoryValue = categoryForm.watch("name");
  const selectedcategory = constantsFromDB.categories.find(
    (item) => item.name === selectedCategoryValue
  );

  const subCategories = constantsFromDB.subCategories
    .filter((item) => item.category === selectedCategoryValue)
    .map((item) => item.name);

  const categories = constantsFromDB.categories.map((item) => item.name);

  useEffect(() => {
    //@ts-expect-error deletes the sub category from the form
    setValue("subCategory", undefined);
  }, [selectedCategoryValue]);

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}
        className=" flex flex-1 "
      >
        <ScrollView className="flex flex-1 ">
          <VStack space="md" className="p-4">
            <Input
              control={control}
              name="name"
              label="Name"
              specifics={{ type: "text" }}
              labelClassName="text-primary-600"
              errors={errors}
            />
            <Input
              control={control}
              name="description"
              label="Description"
              specifics={{ type: "textArea" }}
              labelClassName="text-primary-600"
              errors={errors}
            />
            <Heading size="sm" className="text-primary-600">
              Images
            </Heading>
            <HStack space="sm" className="mt-2">
              <TouchableOpacity
                className="w-[30vw] aspect-square rounded-lg border "
                onPress={() => setShowDrawer(!showDrawer)}
              >
                <Center className="w-full h-full">
                  <Icon as={Camera} />
                  <Text>Add</Text>
                </Center>
              </TouchableOpacity>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={images}
                renderItem={({ item }) => (
                  <Box
                    key={item}
                    className="w-[30vw] aspect-square rounded-lg border relative elevation-md"
                  >
                    <Image
                      className="rounded-md"
                      size="full"
                      source={{ uri: item }}
                      alt="image to add"
                    />
                    <Button
                      variant="link"
                      className="absolute right-0 p-2 "
                      onPress={() => setPrimaryImage(item)}
                    >
                      <ButtonIcon
                        className={` stroke-yellow-400 ${
                          primaryImage === item && "fill-yellow-400"
                        }`}
                        as={Star}
                      />
                    </Button>
                    <Button
                      variant="link"
                      action="negative"
                      className="absolute p-2 right-0 -top-10 z-30"
                      onPress={() =>
                        setiImages((prev) =>
                          prev.filter((value) => value !== item)
                        )
                      }
                    >
                      <ButtonIcon as={XCircle} />
                    </Button>
                  </Box>
                )}
                ItemSeparatorComponent={() => <Box className="p-2"></Box>}
              />
            </HStack>

            <Input
              control={categoryForm.control}
              name="name"
              label="Category"
              specifics={{
                type: "select",
                options: categories,
                placeholder: "Select a category",
                className: "py-0",
              }}
              labelClassName="text-primary-600"
              errors={categoryForm.formState.errors}
            />
            {selectedCategoryValue && (
              <Input
                control={control}
                name="subCategory"
                label="Sub Category"
                specifics={{
                  type: "select",
                  options: subCategories,
                  placeholder: "Select a Subcategory",
                  className: "py-0",
                }}
                labelClassName="text-primary-600"
                errors={errors}
              />
            )}
            <Input
              control={control}
              name="location"
              label="City"
              specifics={{ type: "text", iconLeft: { icon: MapPin } }}
              labelClassName="text-primary-600"
              errors={errors}
              isDisabled
            />
            {selectedcategory?.estimatableValue && (
              <Input
                control={control}
                name="value"
                label="Estimated value "
                specifics={{ type: "text", iconLeft: { icon: DollarSign } }}
                labelClassName="text-primary-600"
                errors={errors}
              />
            )}
          </VStack>
          <Box className="px-4 py-10">
            <Button>
              <ButtonText>Add Property</ButtonText>
            </Button>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
        size="sm"
        anchor="bottom"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <Heading className="text-primary-900" size="lg">
              Select image source
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <HStack className=" justify-around items-center">
              <TouchableOpacity
                className="w-[20vw] aspect-square rounded-lg border border-primary-400"
                onPress={() =>
                  pickImage({ useCamera: true }).then((res) => {
                    if (res) {
                      setiImages((prev) => {
                        return [res.uri, ...prev];
                      });
                      !primaryImage && setPrimaryImage(res.uri);
                    }
                    setShowDrawer(false);
                  })
                }
              >
                <Center className="w-full h-full">
                  <Icon className=" text-primary-400" as={Camera} />
                  <Text className="text-primary-400">Camera</Text>
                </Center>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-[20vw] aspect-square rounded-lg border border-primary-400"
                onPress={() =>
                  pickImage({ useCamera: false }).then((res) => {
                    if (res) {
                      setiImages((prev) => {
                        return [res.uri, ...prev];
                      });
                      !primaryImage && setPrimaryImage(res.uri);
                    }
                    setShowDrawer(false);
                  })
                }
              >
                <Center className="w-full h-full">
                  <Icon className=" text-primary-400" as={GalleryVertical} />
                  <Text className="text-primary-400">Gallery</Text>
                </Center>
              </TouchableOpacity>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddProperty;
