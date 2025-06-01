import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import useProperty from "@/hooks/useProperty";
import { useUser } from "@/hooks/useUser";
import { CheckCircle, Info, XCircle } from "lucide-react-native";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

export interface AppContextT {
  showToast(
    heading: string,
    messages: string,
    action?: "error" | "warning" | "success" | "info" | "muted",
    onCloseComplete?: () => void
  ): void;
  userMethods: ReturnType<typeof useUser>;
  propertyMethods: ReturnType<typeof useProperty>;
  handleSupabaseResErrors<T extends supabaseResT<D>, D = T["data"]>(
    obj: T,
    customMessage?: string
  ): D;
}

type supabaseResT<T> = { error: unknown; data: T };

export const AppContext = createContext<null | AppContextT>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Wrap element with app context provider");
  }
  return context;
};

const AppContextProvider = (props: PropsWithChildren) => {
  const toast = useToast();
  const showToast: AppContextT["showToast"] = (
    heading,
    message,
    action,
    onCloseComplete
  ) => {
    toast.show({
      placement: "top",
      containerStyle: { marginTop: 30 },
      onCloseComplete,
      render: () => (
        <Toast action={action} variant="outline">
          <HStack space="md">
            <Icon
              className=""
              as={
                action === "success"
                  ? CheckCircle
                  : action === "error"
                  ? XCircle
                  : Info
              }
            />
            <Divider orientation="vertical" />
            <Box>
              <ToastTitle>{heading}</ToastTitle>
              <ToastDescription>{message}</ToastDescription>
            </Box>
          </HStack>
        </Toast>
      ),
    });
  };

  const userMethods = useUser();
  const propertyMethods = useProperty();

  const handleSupabaseResErrors: AppContextT["handleSupabaseResErrors"] = (
    res,
    customMessage?: string
  ) => {
    if (res.error) {
      console.error({ err: res.error });

      switch (typeof res.error) {
        case "object":
          if ("message" in res.error) {
            showToast(
              "Error",
              customMessage
                ? customMessage
                : typeof res.error.message == "string"
                ? res.error.message
                : "There was an error with your request",
              "error"
            );
          }
          break;

        default:
          break;
      }
    }
    return res.data;
  };

  useEffect(() => {
    console.log("Rendered");
  });
  return (
    <AppContext.Provider
      value={{
        showToast,
        userMethods,
        propertyMethods,
        handleSupabaseResErrors,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
