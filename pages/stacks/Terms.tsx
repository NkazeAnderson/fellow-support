import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

const Terms = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Terms of Service",
        }}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Center>
          <Heading size="2xl" className="mb-4">
            Terms of Service
          </Heading>
        </Center>

        <Box className="mb-4">
          <Heading size="lg" className="mb-2">
            Fellow Support – User Agreement
          </Heading>
          <Text bold>Effective Date:</Text> <Text>[Insert Date]</Text>
        </Box>

        <Box className="mb-6">
          <Text className="mb-2">
            Welcome to Fellow Support! By creating an account or using our app,
            you agree to the following Terms of Service (“Terms”). Please read
            them carefully. If you do not agree to these Terms, do not use the
            app.
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            1. Acceptance of Terms
          </Heading>
          <Text>
            By accessing or using Fellow Support, you agree to be bound by these
            Terms and all applicable laws and regulations. If you do not accept
            these Terms, you may not use the platform.
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            2. Eligibility
          </Heading>
          <Text>
            You must be at least 13 years old (or 18+, depending on local laws)
            to use Fellow Support. If you are under the legal age of majority in
            your jurisdiction, your use of the app must be supervised by a
            parent or legal guardian.
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            3. User Responsibilities
          </Heading>
          <Text>
            By using Fellow Support, you agree to:
            {"\n"}• Provide accurate, respectful, and lawful listings.
            {"\n"}• Only engage in voluntary and consensual trades with other
            users.
            {"\n"}• Refrain from:
            {"\n"} - Selling or soliciting money.
            {"\n"} - Impersonating others.
            {"\n"} - Engaging in abusive, fraudulent, or illegal behavior.
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            4. Platform Rights
          </Heading>
          <Text>
            We reserve the right to:
            {"\n"}• Remove content or suspend accounts that violate these Terms
            or our community guidelines.
            {"\n"}• Modify or update the app at any time for user experience
            improvements, legal compliance, or security reasons.
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            5. Trade Disputes
          </Heading>
          <Text>
            Fellow Support is a platform that connects users for bartering. We{" "}
            <Text bold>do not</Text> verify the value or authenticity of items
            or services traded. In the event of a dispute:
            {"\n"}• We encourage users to resolve issues through in-app
            messaging and ratings/reviews.
            {"\n"}• Fellow Support does <Text bold>not</Text> guarantee or
            insure exchanges and is not liable for any loss, damage, or
            disagreement resulting from user trades.
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            6. Termination of Service
          </Heading>
          <Text>
            We may suspend, restrict, or terminate your access to the app
            without notice if:
            {"\n"}• You violate these Terms
            {"\n"}• Your behavior harms the platform or its community
            {"\n"}• We are required to do so by law
            {"\n\n"}You may also delete your account at any time within the app
            or by contacting support at <Text bold>[Insert Support Email]</Text>
            .
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            7. Changes to These Terms
          </Heading>
          <Text>
            We may update these Terms from time to time. When we do, we will
            revise the “Effective Date” above. Continued use of the app after
            changes means you accept the new Terms.
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            8. Contact Us
          </Heading>
          <Text>
            For questions or concerns about these Terms, please contact:
            {"\n"}
            <Text bold>Email:</Text> [Insert Support Email]
            {"\n"}
            <Text bold>App Name:</Text> Fellow Support
          </Text>
        </Box>
      </ScrollView>
    </>
  );
};

export default Terms;
