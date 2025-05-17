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
import { AppContext, AppContextT } from "@/context/AppContextProvider";
import { categoryT, productSchema } from "@/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, DollarSign, MapPin, Star, XCircle } from "lucide-react-native";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const AddProperty = () => {
  const { constantsFromDB, user } = useContext(AppContext) as AppContextT;

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

  const selectedCategory = categoryForm.watch("name");

  const subCategories = constantsFromDB.subCategories
    .filter((item) => item.category === selectedCategory)
    .map((item) => item.name);

  const categories = constantsFromDB.categories.map((item) => item.name);

  useEffect(() => {
    //@ts-expect-error deletes the sub category from the form
    setValue("subCategory", undefined);
  }, [selectedCategory]);

  return (
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
          {selectedCategory && (
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
          />
          <Input
            control={control}
            name="value"
            label="Estimated value "
            specifics={{ type: "text", iconLeft: { icon: DollarSign } }}
            labelClassName="text-primary-600"
            errors={errors}
          />
        </VStack>
        <Box className="px-4 my-11">
          <Button>
            <ButtonText>Add Property</ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddProperty;
