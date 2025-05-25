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
import {
  appConstantsFromDB,
  populatedChats,
  populatedProductT,
  populatedTradesT,
} from "@/types";
import { getProperty } from "@/utils/properties";
import { userT } from "@/zodSchema";
import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import { CheckCircle, Info, XCircle } from "lucide-react-native";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

const DbChannel = supabase.channel(`chat`);
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
  trades: populatedTradesT[];
  chats: populatedChats[];
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
  const { user, trades, chats, updateStates } = useUser();
  const subscribedToRealTime = useRef(false);

  const constantsFromDB = useRef<appConstantsFromDB>({
    categories: [],
    subCategories: [],
  });
  const setUpApp = async () => {
    const categoryPromise = supabase.from(tables.category).select();
    const subCategoryPromise = supabase.from(tables.subCategory).select();
    getProperty({}).then((res) => {
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
    return () => {};
  }, [user]);

  useEffect(() => {
    try {
      !subscribedToRealTime.current &&
        DbChannel.on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
          },
          (payload) => {
            console.log(payload);
            //@ts-ignore
            updateStates({ table: payload.table, data: payload.new });
            if (payload.table === tables.products) {
              //@ts-ignore
              getProperty({ id: payload.new?.id as string }).then((res) => {
                if (res.data?.id === user?.id) {
                  return setMyProperties((prev) => [res.data, ...prev]);
                }
                setProperties((prev) => [res.data, ...prev]);
              });
            }
          }
        ).subscribe((status, err) => {
          console.log({ status, err });

          if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
            subscribedToRealTime.current = true;
          }
        });

      setInterval(() => {
        !subscribedToRealTime.current &&
          DbChannel.subscribe((status, err) => {
            console.log({ status, err });

            if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
              subscribedToRealTime.current = true;
            }
          });
      }, 10000);
    } catch (error) {}

    return () => {
      console.log("Db un sub");
      DbChannel.unsubscribe();
      subscribedToRealTime.current = false;
    };
  }, []);

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
        trades,
        chats,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
