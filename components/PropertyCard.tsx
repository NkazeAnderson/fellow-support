import { useAppContext } from "@/context/AppContextProvider";
import { populatedProductT } from "@/types";
import { insertUpdateDeleteUser } from "@/utils/users";
import { router } from "expo-router";
import { MapPin, Share2 } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Share } from "react-native";
import Button from "./Button";
import { Badge, BadgeText } from "./ui/badge";
import { Box } from "./ui/box";
import { ButtonIcon } from "./ui/button";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { FavouriteIcon, Icon } from "./ui/icon";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import UserAvatar from "./UserAvatar";

const PropertyCard = ({ property }: { property: populatedProductT }) => {
  const {
    userMethods: { user },
  } = useAppContext();
  const [submittingLike, setSubmittingLike] = useState(false);
  return (
    <Pressable
      className="border border-primary-200 rounded-2xl relative"
      onPress={() => {
        router.push(`/stacks/product/${property.id}`);
      }}
    >
      {property.value && (
        <Badge
          className="absolute top-4 right-4 z-10"
          variant={"solid"}
          action={"error"}
          size={"md"}
        >
          <BadgeText>${property.value} value</BadgeText>
        </Badge>
      )}
      <Box className="aspect-video overflow-hidden">
        <Image
          size="full"
          source={{ uri: property.picturesUrl[0] }}
          alt="Product image"
          className="rounded-t-2xl"
        />
      </Box>
      <Box className="p-4 border-t border-primary-600 bg-primary-100 rounded-b-2xl">
        <Heading className=" capitalize text-primary-600">
          {property.name}
        </Heading>
        <Text numberOfLines={2} className="text-typography-600">
          {property.description}
        </Text>
        <HStack space="md" className=" justify-between items-center">
          <HStack space="md" className="items-center">
            <UserAvatar user={property.owner} />
            <Box className="pt-2">
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

          <HStack space="md" className=" items-center">
            <Button
              variant="link"
              isSubmitting={submittingLike}
              onPress={async () => {
                if (!user) {
                  return;
                }
                setSubmittingLike(true);
                if (!user.favoriteProducts) {
                  await insertUpdateDeleteUser(
                    { id: user.id, favoriteProducts: [property.id] },
                    "update"
                  );
                } else if (user.favoriteProducts.includes(property.id)) {
                  await insertUpdateDeleteUser(
                    {
                      id: user.id,
                      favoriteProducts: user.favoriteProducts.filter(
                        (item) => item !== property.id
                      ),
                    },
                    "update"
                  );
                } else {
                  await insertUpdateDeleteUser(
                    {
                      id: user.id,
                      favoriteProducts: [...user.favoriteProducts, property.id],
                    },
                    "update"
                  );
                }
                setSubmittingLike(false);
              }}
            >
              <ButtonIcon
                className={`w-6 h-6 ${
                  user?.favoriteProducts?.includes(property.id) &&
                  "fill-primary-600"
                } `}
                as={FavouriteIcon}
              />
            </Button>
            <Button
              onPress={(e) => {
                Share.share({
                  message: `Check out this product available on Fellow Support bartering platform. https://fellow.support?productid=${property.id}`,
                });
                e.stopPropagation();
              }}
              variant="link"
            >
              <ButtonIcon className="w-6 h-6" as={Share2} />
            </Button>
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default PropertyCard;
