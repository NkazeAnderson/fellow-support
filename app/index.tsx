import Logo from "@/components/Logo";
import { Box } from "@/components/ui/box";
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
      <Box className=" animate-pulse">
        <Logo />
      </Box>
    </Center>
  );
};

export default index;
