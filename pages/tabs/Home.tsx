import PropertyCard from "@/components/PropertyCard";
import { Box } from "@/components/ui/box";
import { useAppContext } from "@/context/AppContextProvider";
import React from "react";
import { FlatList, View } from "react-native";
const Home = () => {
  const {
    propertyMethods: { properties },
  } = useAppContext();
  return (
    <View className="p-2 bg-primary-0 flex flex-1">
      <FlatList
        data={properties}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Box className="mb-2">
            <PropertyCard key={item.id} property={item} />
          </Box>
        )}
      />
    </View>
  );
};
export default Home;
