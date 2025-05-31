import Logo from "@/components/Logo";
import { Center } from "@/components/ui/center";
import { supabase } from "@/supabase";
import React, { useEffect } from "react";

const index = () => {
  const onPath = true;
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      console.log("got data");
    });
    return () => {};
  }, []);
  return (
    <Center className="flex-1">
      <Logo />
    </Center>
  );
};

export default index;
