import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

const Privacy = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Privacy Policy",
        }}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Center>
          <Heading size="2xl" className="mb-4">
            Fellow Support Privacy Policy
          </Heading>
        </Center>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            1. Information We Collect
          </Heading>
          <Text className="mb-2">
            We collect the following personal information when you use the
            Fellow Support app:
          </Text>
          <Heading size="lg" className="mb-1">
            Account Information:
          </Heading>
          <Text className="mb-2">
            • Full Name{"\n"}• Email Address{"\n"}• Password (stored securely)
          </Text>
          <Heading size="lg" className="mb-1">
            Chats & Messaging:
          </Heading>
          <Text className="mb-2">
            Messages between users are stored in plain text to help us detect
            and prevent fraud.
          </Text>
          <Heading size="lg" className="mb-1">
            Location Data:
          </Heading>
          <Text>
            Your location is accessed on your device (frontend) to show nearby
            users.{"\n"}
            <Text bold>Note:</Text> We do <Text bold>not</Text> store or retain
            your location on our servers.
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            2. How We Use Your Information
          </Heading>
          <Text>
            We use the information we collect to:{"\n"}• Create and manage your
            user account{"\n"}• Facilitate communication and bartering between
            users{"\n"}• Detect, investigate, and prevent fraudulent or
            suspicious activity{"\n"}• Improve app functionality and user
            experience{"\n"}• Provide customer support
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            3. Sharing Your Information
          </Heading>
          <Text>
            We <Text bold>do not sell</Text> your personal data. We may share
            your data only when:{"\n"}• Required by law (e.g., court order or
            subpoena){"\n"}• Needed to investigate fraud, abuse, or violations
            of our Terms of Service{"\n"}• Necessary for providing essential
            services (e.g., cloud hosting), under strict confidentiality
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            4. Your Privacy Rights & Choices
          </Heading>
          <Text>
            You can:{"\n"}• Update or delete your profile information in the app
            {"\n"}• Request to delete your account and associated data by
            contacting us at <Text italic>[Insert Support Email]</Text>
            {"\n"}• Disable location access via your device settings (this may
            affect app features)
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            5. Data Security
          </Heading>
          <Text>
            We implement industry-standard safeguards to protect your
            information. However, no method of transmission over the internet or
            storage is completely secure. Please use a strong password and
            protect your device.
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            6. Children’s Privacy
          </Heading>
          <Text>
            Fellow Support is not intended for children under 13. We do not
            knowingly collect information from children. If we discover we have
            collected data from a child, we will delete it promptly.
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            7. Changes to This Policy
          </Heading>
          <Text>
            We may update this Privacy Policy from time to time. If we make
            material changes, we will notify you by posting the updated policy
            in the app and updating the “Effective Date” above.
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            8. Contact Us
          </Heading>
          <Text>
            If you have any questions or concerns about this Privacy Policy,
            please contact us:{"\n\n"}
            <Text bold>Email:</Text> [Insert Support Email]{"\n"}
            <Text bold>App Name:</Text> Fellow Support
          </Text>
        </Box>

        <Box className="mb-6">
          <Heading size="xl" className="mb-2">
            App Store Notes (Apple & Google Play compliance)
          </Heading>
          <Text>
            • This Privacy Policy will be linked in both stores.{"\n"}• The app
            does not request access to sensitive permissions beyond email login,
            basic profile info, and location (frontend only).{"\n"}• No personal
            data is sold or used for advertising purposes.
          </Text>
        </Box>
      </ScrollView>
    </>
  );
};

export default Privacy;
