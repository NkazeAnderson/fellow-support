import { publicUserT } from "@/types";
import React from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "./ui/avatar";

const UserAvatar = ({
  user,
  isOnline,
  size = "md",
}: {
  user: publicUserT;
  isOnline?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | undefined;
}) => {
  return (
    <Avatar size={size}>
      <AvatarFallbackText>{`${user.firstName} ${user.lastName}`}</AvatarFallbackText>
      <AvatarImage
        source={{
          uri: user.profilePiture ?? undefined,
        }}
      />
      {isOnline && <AvatarBadge />}
    </Avatar>
  );
};

export default UserAvatar;
