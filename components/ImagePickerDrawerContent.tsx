import { pickImage, PickImageOptions } from "@/utils/camera";
import { ImagePickerAsset } from "expo-image-picker";
import { Camera, GalleryVertical } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Center } from "./ui/center";
import { DrawerBody, DrawerContent, DrawerHeader } from "./ui/drawer";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Icon } from "./ui/icon";

const ImagePickerDrawerContent = ({
  callback,
  options,
}: {
  callback: (image: ImagePickerAsset[] | null) => void;
  options?: Omit<PickImageOptions, "useCamera">;
}) => {
  return (
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
              pickImage({ useCamera: true, includeBase64: true }).then((res) =>
                callback(res)
              )
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
              pickImage({ useCamera: false, includeBase64: true }).then((res) =>
                callback(res)
              )
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
  );
};

export default ImagePickerDrawerContent;
