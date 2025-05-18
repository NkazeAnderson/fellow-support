import { Grid, GridItem } from "@/components/ui/grid";

import Input from "@/components/Input";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon, SearchIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { ListFilter, MapPin } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
const Search = () => {
  const {
    control,
    formState: { errors },
  } = useForm();
  return (
    <View className="p-4 gap-4">
      <Input
        control={control}
        name="searchTerm"
        specifics={{
          type: "text",
          placeholder: "Search... ",
          iconRight: {
            icon: SearchIcon,
          },
        }}
        errors={errors}
      />

      <HStack space="2xl" className=" justify-between items-center">
        <Heading>Results</Heading>
        <Heading className=" text-typography-600 capitalize" size="xs">
          Ceramic Pot
        </Heading>
        <Button className="px-4" variant="link">
          <ButtonIcon as={ListFilter} />
        </Button>
      </HStack>

      <Grid
        className="gap-2"
        _extra={{
          className: "grid-cols-2",
        }}
      >
        <GridItem
          className="bg-background-200 relative"
          _extra={{
            className: "col-span-1",
          }}
        >
          <Box className=" aspect-square">
            <Image
              size="full"
              source={require("@/assets/images/pot.jpg")}
              alt="product image"
            />
          </Box>
          <Box className="p-2 gap-2">
            <Heading numberOfLines={2} className=" text-primary-600">
              Ceramic Pot
            </Heading>
            <HStack space="sm">
              <Icon className=" text-primary-800" as={MapPin} />
              <Text className="text-typography-600" numberOfLines={2}>
                San Francisco, LA
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
        </GridItem>
      </Grid>
    </View>
  );
};
export default Search;
