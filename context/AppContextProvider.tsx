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
import { tables } from "@/constants";
import { supabase } from "@/supabase";
import { appConstantsFromDB } from "@/types";
import { userT } from "@/zodSchema";
import { CheckCircle, Info, XCircle } from "lucide-react-native";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

export interface AppContextT {
  showToast(
    heading: string,
    messages: string,
    action?: "error" | "warning" | "success" | "info" | "muted",
    onCloseComplete?: () => void
  ): void;
  user?: userT;
  constantsFromDB: appConstantsFromDB;
}

export const AppContext = createContext<null | AppContextT>(null);

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

  const [user, setUser] = useState<userT>();

  const constantsFromDB = useRef<appConstantsFromDB>({
    categories: [],
    subCategories: [],
  });
  const getCategoriesInfo = async () => {
    const categoryPromise = supabase.from(tables.category).select();
    const subCategoryPromise = supabase.from(tables.subCategory).select();
    const [categoryRes, subCategoryRes] = await Promise.all([
      categoryPromise,
      subCategoryPromise,
    ]);

    if (categoryRes.data && subCategoryRes.data) {
      constantsFromDB.current = {
        categories: categoryRes.data,
        subCategories: subCategoryRes.data,
      };
    }
  };

  useEffect(() => {
    getCategoriesInfo();
  }, []);

  useEffect(() => {
    console.log("Rendered");
  });
  return (
    <AppContext.Provider
      value={{ showToast, user, constantsFromDB: constantsFromDB.current }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
