import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import React, { createContext, PropsWithChildren } from "react";

export const AppContext = createContext<null | { showToast(): void }>(null);

const AppContextProvider = (props: PropsWithChildren) => {
  const toast = useToast();
  const showToast = () => {
    toast.show({
      placement: "top",
      containerStyle: { marginTop: 30 },
      render: () => (
        <Toast action="success">
          <ToastTitle>Hi</ToastTitle>
          <ToastDescription>Welcome</ToastDescription>
        </Toast>
      ),
    });
  };
  return (
    <AppContext.Provider value={{ showToast }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
