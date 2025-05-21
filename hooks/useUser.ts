import { tables } from "@/constants";
import { supabase } from "@/supabase";
import { populatedChats, populatedTradesT } from "@/types";
import { getChat } from "@/utils/chats";
import { getTrade } from "@/utils/trades";
import { userT } from "@/zodSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export function useUser() {

    const [user, setUser] = useState<userT>()

    const [trades, setTrades] = useState<populatedTradesT[]>([])
   
    const [chats, setChats] = useState<populatedChats[]>([])
   
     useEffect(() => {
    supabase.auth.onAuthStateChange(async (e, session) => {
      if (session) {
        const { user } = session;
        if (user && user.email_confirmed_at) {
          const userRes = await supabase
            .from(tables.users)
            .select()
            .eq("id", user.id)
            .single();

     

          if (userRes.data ) {
            setUser(userRes.data);
          }
          router.replace("/tabs");
        } else if (user && !user.email_confirmed_at) {
          supabase.auth.resend({ email: user.email as string, type: "signup" });
        } else {
        }
      } else {
        AsyncStorage.getItem("onBoarded").then((res) => {
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

  useEffect(()=>{
    
    if (user) {
      getTrade({}).then(res=>{
      res.data &&  setTrades(res.data)
      })
      getChat({userId: user.id}).then(res=>{
        console.log({chats: res.data});
        
      res.data &&  setChats(res.data)
      })
    }
  },[user])

return {user, trades, chats}
}