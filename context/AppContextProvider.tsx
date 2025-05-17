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
import AsyncStore from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
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

  supabase.auth.getUser().then((res) => console.log({ res }));

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (e, session) => {
      if (session) {
        const { user } = session;
        if (user && user.email_confirmed_at) {
          const userPromise = supabase
            .from(tables.users)
            .select()
            .eq("id", user.id)
            .single();

          const categoryPromise = supabase.from(tables.category).select();
          const subCategoryPromise = supabase.from(tables.subCategory).select();
          const [userRes, categoryRes, subCategoryRes] = await Promise.all([
            userPromise,
            categoryPromise,
            subCategoryPromise,
          ]);

          if (userRes.data && categoryRes.data && subCategoryRes.data) {
            setUser(userRes.data);
            constantsFromDB.current = {
              categories: categoryRes.data,
              subCategories: subCategoryRes.data,
            };

            console.log({
              categories: categoryRes.data,
              subCategories: subCategoryRes.data,
            });
          }
          router.replace("/tabs");
        } else if (user && !user.email_confirmed_at) {
          supabase.auth.resend({ email: user.email as string, type: "signup" });
        } else {
        }
      } else {
        AsyncStore.getItem("onBoarded").then((res) => {
          if (res) {
            router.replace("/login");
          } else {
            router.replace("/get-started");
          }
        });
      }
    });
    return () => {
      // supabase.auth.signOut();
      // console.log("logged out");
    };
  }, []);
  return (
    <AppContext.Provider
      value={{ showToast, user, constantsFromDB: constantsFromDB.current }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
