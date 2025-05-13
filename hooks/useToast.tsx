import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import React from "react";

export const useShowNewToast = (
  heading: string,
  message: string,
  id?: string,
  action?: "error" | "muted" | "warning" | "success" | "info",
  variant?: "solid" | "outline"
) => {
  const toast = useToast();
  console.log("in toast");

  toast.show({
    id,
    placement: "top",
    duration: 3000,

    render: ({ id }) => {
      const uniqueToastId = "toast-" + id;
      return (
        <Toast nativeID={uniqueToastId} action={action} variant={variant}>
          <ToastTitle>{heading}</ToastTitle>
          <ToastDescription>{message}</ToastDescription>
        </Toast>
      );
    },
  });
};
