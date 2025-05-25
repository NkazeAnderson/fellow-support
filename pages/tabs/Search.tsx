import Input from "@/components/Input";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon, SearchIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { populatedProductT } from "@/types";
import { handleSubmitErrorHandler } from "@/utils";
import { getProperty } from "@/utils/properties";
import { router } from "expo-router";
import { ListFilter, MapPin } from "lucide-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FlatList, Pressable, View } from "react-native";
const Search = () => {
  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
  } = useForm<{ searchText: string }>();

  const [searchResults, setSearchResults] = useState<populatedProductT[]>([]);

  const search = async ({ searchText }: { searchText: string }) => {
    const { data, error } = await getProperty({
      searchText,
    });

    data && setSearchResults(data);
  };
  return (
    <View className="p-4 gap-4 flex flex-1 bg-primary-0">
      <FlatList
        data={searchResults}
        ListHeaderComponent={() => (
          <>
            <>
              <Input
                control={control}
                name="searchText"
                specifics={{
                  type: "text",
                  placeholder: "Search... ",
                  iconRight: {
                    icon: SearchIcon,
                    onIconPress: handleSubmit(search),
                  },
                  keyboardType: "web-search",
                  returnKeyType: "search",
                  onSubmitEditing: handleSubmit(
                    search,
                    handleSubmitErrorHandler
                  ),
                }}
                isDisabled={isSubmitting}
                errors={errors}
              />

              <HStack space="2xl" className=" justify-between items-center">
                <Heading>Results</Heading>
                <Heading className=" text-typography-600 capitalize" size="xs">
                  {getValues("searchText") ?? ""}
                </Heading>
                <Button className="px-4" variant="link">
                  <ButtonIcon as={ListFilter} />
                </Button>
              </HStack>
              {isSubmitting && <Spinner />}
            </>
          </>
        )}
        renderItem={({ item }) => {
          return (
            <Pressable
              className="w-1/2 p-1 items-stretch"
              onPress={() => {
                router.push(`/stacks/product/${item.id}`);
              }}
            >
              <Box className="bg-background-200 relative">
                <Box className=" aspect-square">
                  <Image
                    size="full"
                    source={{ uri: item.picturesUrl[0] }}
                    alt="product image"
                  />
                </Box>
                <Box className="p-2 gap-2">
                  <Heading numberOfLines={2} className=" text-primary-600">
                    {item.name}
                  </Heading>
                  <HStack space="sm">
                    <Icon className=" text-primary-800" as={MapPin} />
                    <Text className="text-typography-600" numberOfLines={2}>
                      {item.location}
                    </Text>
                  </HStack>
                </Box>
                <Badge
                  className=" absolute top-2 right-2 z-10"
                  variant="solid"
                  action="info"
                >
                  <BadgeText>New</BadgeText>
                </Badge>
              </Box>
            </Pressable>
          );
        }}
        ListEmptyComponent={() => <Text>No results</Text>}
        numColumns={2}
        initialNumToRender={10}
      />
    </View>
  );
};
export default Search;
