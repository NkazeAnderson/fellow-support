import ImagePickerDrawerContent from "@/components/ImagePickerDrawerContent";
import Input from "@/components/Input";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Drawer, DrawerBackdrop } from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { AppContext, AppContextT } from "@/context/AppContextProvider";
import { uploadBase64ImageToSupabase } from "@/supabase/media";
import { populatedProductT } from "@/types";
import { handleSubmitErrorHandler } from "@/utils";
import { getProperty, insertUpdateDeleteProperty } from "@/utils/properties";
import { categoryT, productSchema } from "@/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePickerAsset } from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";
import { Camera, DollarSign, MapPin, Star, XCircle } from "lucide-react-native";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { z } from "zod";

const schema = productSchema.omit({
  id: true,
  createdAt: true,
  picturesUrl: true,
});

const AddProperty = () => {
  const { constantsFromDB, user, showToast } = useContext(
    AppContext
  ) as AppContextT;
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [images, setiImages] = useState<(ImagePickerAsset | string)[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [primaryImage, setPrimaryImage] = useState("");

  const {
    control,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
    getValues,
  } = useForm({
    //@ts-ignore
    resolver: zodResolver(schema),
    defaultValues: async () => {
      if (!id) {
        return {
          owner: user?.id,
          location: "Los Angeles, CA",
          available: true,
        };
      }
      const { data, error } = (await getProperty({ id })) as {
        data: populatedProductT;
        error: any;
      };

      if (!error) {
        const { subCategory, createdAt, picturesUrl, owner, ...res } = data;
        categoryForm.setValue("name", subCategory.category);
        setiImages(picturesUrl);
        setPrimaryImage(picturesUrl[0]);

        return { ...res, subCategory: subCategory.id, owner: owner.id };
      } else {
        showToast(
          "Error finding item",
          "We can't seem to find this item on our server",
          "error"
        );
      }
    },
  });

  const categoryForm = useForm<categoryT>();

  const selectedCategoryValue = categoryForm.watch("name");
  const selectedcategory = constantsFromDB.categories.find(
    (item) => item.name === selectedCategoryValue
  );

  const subCategories = constantsFromDB.subCategories.filter(
    (item) => item.category === selectedCategoryValue
  );

  const addProperty = async (data: z.infer<typeof schema>) => {
    try {
      let newOrderedImages: ImagePickerAsset[] = [];
      let previouslyUploadedImages: string[] = [];

      images.forEach((item) => {
        if (typeof item === "string") {
          if (item !== primaryImage) {
            return previouslyUploadedImages.push(item);
          }
          previouslyUploadedImages = [item, ...previouslyUploadedImages];
        } else {
          if (item.uri !== primaryImage) {
            return newOrderedImages.push(item);
          }
          newOrderedImages = [item, ...newOrderedImages];
        }
      });

      const imagePromises: Promise<string>[] = newOrderedImages.map((item) =>
        uploadBase64ImageToSupabase(item)
      );
      const picturesUrl = await Promise.all(imagePromises);
      const requestBody = {
        ...data,
        id,
        picturesUrl:
          previouslyUploadedImages.length &&
          previouslyUploadedImages[0] === primaryImage
            ? [...previouslyUploadedImages, ...picturesUrl]
            : [...picturesUrl, ...previouslyUploadedImages],
      };
      const res = await insertUpdateDeleteProperty(
        requestBody,
        id ? "update" : "insert"
      );
      console.log(res.error);

      if (!res.error) {
        showToast(
          "Success",
          `${id ? "Updated" : "Added"} successfully`,
          "success"
        );
      } else {
        showToast(
          "Failed",
          `Failed to ${id ? "updated" : "added"} property`,
          "success"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const categories = constantsFromDB.categories.map((item) => item.name);

  useEffect(() => {
    //@ts-ignore
    // setValue("subCategory", undefined);
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
                    key={typeof item === "string" ? item : item.assetId}
                    className="w-[30vw] aspect-square rounded-lg border relative elevation-md"
                  >
                    <Image
                      className="rounded-md"
                      size="full"
                      source={{
                        uri: typeof item === "string" ? item : item.uri,
                      }}
                      alt="image to add"
                    />
                    <Button
                      variant="link"
                      className="absolute right-0 p-2 bottom-0"
                      onPress={() =>
                        setPrimaryImage(
                          typeof item === "string" ? item : item.uri
                        )
                      }
                    >
                      <ButtonIcon
                        className={` stroke-yellow-400 ${
                          ((typeof item === "string" &&
                            primaryImage === item) ||
                            (typeof item !== "string" &&
                              primaryImage === item.uri)) &&
                          "fill-yellow-400"
                        }`}
                        as={Star}
                      />
                    </Button>
                    <Button
                      variant="solid"
                      action="negative"
                      className="absolute p-2 right-0 top-0 "
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
                options: categories.map((item) => ({
                  displayText: item,
                  value: item,
                })),
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
                  options: subCategories.map((item) => ({
                    displayText: item.name,
                    value: item.id,
                  })),
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
                specifics={{
                  type: "text",
                  iconLeft: { icon: DollarSign },
                  keyboardType: "number-pad",
                }}
                labelClassName="text-primary-600"
                errors={errors}
              />
            )}
          </VStack>
          <Box className="px-4 py-10">
            <Button
              onPress={handleSubmit(addProperty, handleSubmitErrorHandler)}
              disabled={isSubmitting}
            >
              <ButtonText>{id ? "Edit Property" : "Add Property"}</ButtonText>
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
        <ImagePickerDrawerContent
          callback={(res) => {
            if (res) {
              setiImages((prev) => {
                return [...res, ...prev];
              });
              !primaryImage && setPrimaryImage(res[0].uri);
            }
            setShowDrawer(false);
          }}
        />
      </Drawer>
      <Stack.Screen
        options={{ title: !id ? "Add new property" : "Edit Property" }}
      />
    </>
  );
};

export default AddProperty;
