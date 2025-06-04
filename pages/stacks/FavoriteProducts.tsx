import Button from "@/components/Button";
import PropertyCard from "@/components/PropertyCard";
import { Box } from "@/components/ui/box";
import { ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { useAppContext } from "@/context/AppContextProvider";
import { Link } from "expo-router";
import { Search } from "lucide-react-native";
import React from "react";
import { FlatList, View } from "react-native";

const FavoriteProducts = () => {
  const {
    propertyMethods: { properties },
    userMethods: { user },
  } = useAppContext();
  return (
    <View className="p-2 bg-primary-0 flex flex-1">
      <FlatList
        data={properties.filter((item) =>
          user?.favoriteProducts?.includes(item.id)
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Box className="mb-2">
            <PropertyCard key={item.id} property={item} />
          </Box>
        )}
        ListEmptyComponent={() => (
          <Center className="flex-1">
            <Text>You haven't liked any products yet!</Text>
            <Link href={"/tabs/search"} asChild>
              <Button>
                <ButtonText>Search Product</ButtonText>
                <ButtonIcon as={Search} />
              </Button>
            </Link>
          </Center>
        )}
      />
    </View>
  );
};
export default FavoriteProducts;
