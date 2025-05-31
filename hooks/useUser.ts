import { tables } from "@/constants";
import { supabase } from "@/supabase";
import { populatedChats, populatedTradesT } from "@/types";
import { getChat } from "@/utils/chats";
import { getTrade } from "@/utils/trades";
import { chatSchema, messageSchema, tradeSchema, userT } from "@/zodSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";

  const OnlineChannel = supabase.channel("OnlineChannel")
export function useUser() {

    const [user, setUser] = useState<userT>()

    const [trades, setTrades] = useState<populatedTradesT[]>([])
   
    const [chats, setChats] = useState<populatedChats[]>([])
    
    const subscribedToOnline = useRef(false)
   
     useEffect(() => {
    supabase.auth.onAuthStateChange(async (e, session) => {
   
      if (session) {
        const { user } = session;
       //  debugger
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
   

  //   !subscribedToOnline.current &&  OnlineChannel
  // .on('presence', { event: 'sync' }, () => {
  //   const newState = OnlineChannel.presenceState()
  //   console.log('sync', newState)
  // })
  // .on('presence', { event: 'join' }, ({ key, newPresences }) => {
  //   console.log('join', key, newPresences)
  // })
  // .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
  //   console.log('leave', key, leftPresences)
  // })
  // .subscribe((status:REALTIME_SUBSCRIBE_STATES)=>{
  //  if (REALTIME_SUBSCRIBE_STATES.SUBSCRIBED === status) {
    
  //    subscribedToOnline.current = true
  //  }
  // })
  // OnlineChannel.track({
  //   userId: user.id
  // })

    }

  return ()=>{
    OnlineChannel.unsubscribe()
  }

  },[user])


  async function updateStates({table, data}:{
    table: (typeof tables)[keyof typeof tables], data:any
  }) {
    console.log({table});
    if (!user) {
      return
    }
    
    switch (table) {
      case "Chats":
        const chatInfo = chatSchema.parse(data)
        if (chats.some(item=>item.id === chatInfo.id)) {
          
        }
        else {
          
           getChat({id:chatInfo.id, userId:user.id}).then(res=>{
            
            setChats(prev=>[...prev, ...res.data])
           })
        }
        break;

        case "Messages":
          const messageInfo = messageSchema.parse(data)
          setChats(prev=>prev.map((item)=>{
            if (item.id === messageInfo.chat) {
              item.messages.push(messageInfo)
            }
            return item
          }))
        break

        case "Trades":
          const tradeInfo = tradeSchema.parse(data)
          const trade = await getTrade({id:tradeInfo.id})
          
             setTrades(prev=>{
            if (prev.some(item=>item.id === trade.data?.id)) {
              return prev.map(item=>item.id === trade.data?.id ? trade.data : item)
            }
            return [trade.data, ...prev]
          })
      
        break
    
      default:
        break;
    }
  }
  

return {user, trades, chats, updateStates}
}