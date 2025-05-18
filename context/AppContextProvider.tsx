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
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/supabase";
import { appConstantsFromDB, populatedProductT } from "@/types";
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
  properties: populatedProductT[];
  myProperties: populatedProductT[];
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

  const [properties, setProperties] = useState<populatedProductT[]>([]);
  const [myProperties, setMyProperties] = useState<populatedProductT[]>([]);
  const { user } = useUser();

  const constantsFromDB = useRef<appConstantsFromDB>({
    categories: [],
    subCategories: [],
  });
  const setUpApp = async () => {
    const categoryPromise = supabase.from(tables.category).select();
    const subCategoryPromise = supabase.from(tables.subCategory).select();
    supabase
      .from(tables.products)
      .select("*, subCategory (*) , owner ( firstName, lastName, id)")
      .then((res) => {
        if (res.data as populatedProductT[]) {
          setProperties(res.data!);
        } else {
          console.log(res.error);
        }
      });
    const productPromise = supabase.from(tables.products).select().limit(10);
    const myProductsPromise = supabase
      .from(tables.products)
      .select()
      .eq("owner", user?.id)
      .limit(10);
    const [categoryRes, subCategoryRes, productsRes, myProductsRes] =
      await Promise.all([
        categoryPromise,
        subCategoryPromise,
        productPromise,
        myProductsPromise,
      ]);

    if (
      categoryRes.data &&
      subCategoryRes.data &&
      productsRes.data &&
      myProductsRes.data
    ) {
      constantsFromDB.current = {
        categories: categoryRes.data,
        subCategories: subCategoryRes.data,
      };

      setMyProperties(myProductsRes.data);
    }
  };

  useEffect(() => {
    if (user) {
      setUpApp();
    }
  }, [user]);

  useEffect(() => {
    console.log("Rendered");
  });
  return (
    <AppContext.Provider
      value={{
        showToast,
        user,
        constantsFromDB: constantsFromDB.current,
        properties,
        myProperties,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
