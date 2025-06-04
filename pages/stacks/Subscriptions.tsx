import Button from "@/components/Button";
import { Box } from "@/components/ui/box";
import { ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView } from "react-native";

const Subscriptions = () => {
  return (
    <>
      <HStack space="sm" className=" items-baseline px-2 py-4">
        <Heading size="xs">Current plan:</Heading>
        <Heading size="xl">Free</Heading>
      </HStack>
      <ScrollView
        className="p-4 flex-1 bg-primary-50"
        showsVerticalScrollIndicator={false}
      >
        <Heading className="text-center py-4" size="2xl">
          Plans
        </Heading>
        <VStack space="3xl">
          <Box className=" border-primary-600 text-orange-600/85 border rounded-lg overflow-hidden relative">
            <LinearGradient
              // Background Linear Gradient
              colors={["rgba(234,88,12,0.7)", "rgba(234,88,12,0.2)"]}
              style={{ position: "absolute", width: "100%", height: "100%" }}
              start={{ x: 0, y: 0.1 }}
            />
            <Box className=" bg-primary-600 p-2">
              <HStack className=" items-center justify-between">
                <Heading className=" text-white" size="xl">
                  Free
                </Heading>
                <Heading className=" text-white" size="xl">
                  $0
                </Heading>
              </HStack>
              <Center>
                <Text className="text-typography-300">Includes</Text>
              </Center>
            </Box>
            <Box className=" p-4 gap-4">
              <Text>✔️ 1 Trade Per Week</Text>
              <Text>✔️ 1 Chat Per Week</Text>
              <Text>✔️ Unlimited Listings</Text>
            </Box>
            <HStack className=" justify-center py-3">
              <Button>
                <ButtonText>Choose Plan</ButtonText>
              </Button>
            </HStack>
          </Box>

          <Box className=" border-primary-600 text-orange-600/85 border rounded-lg overflow-hidden relative">
            <LinearGradient
              // Background Linear Gradient
              colors={["rgba(234,88,12,0.7)", "rgba(234,88,12,0.2)"]}
              style={{ position: "absolute", width: "100%", height: "100%" }}
              start={{ x: 0, y: 0.1 }}
            />
            <Box className=" bg-primary-600 p-2">
              <HStack className=" items-center justify-between">
                <Heading className=" text-white" size="xl">
                  Premium
                </Heading>
                <Heading className=" text-white" size="xl">
                  $10 / month
                </Heading>
              </HStack>
              <Center>
                <Text className="text-typography-300">Includes</Text>
              </Center>
            </Box>
            <Box className=" p-4 gap-4">
              <Text>✔️ Unlimited Trades</Text>
              <Text>✔️ Unlimited Chats</Text>
              <Text>✔️ Unlimited Listings</Text>
            </Box>
            <HStack className=" justify-center py-3">
              <Button>
                <ButtonText>Choose Plan</ButtonText>
              </Button>
            </HStack>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
};

export default Subscriptions;
