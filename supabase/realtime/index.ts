import { tables } from "@/constants";
import useProperty from "@/hooks/useProperty";
import { useUser } from "@/hooks/useUser";
import { populatedProductT, populatedTradesT } from "@/types";
import { getChat } from "@/utils/chats";
import { getProperty } from "@/utils/properties";
import { getTrade } from "@/utils/trades";
import { messageT, userT } from "@/zodSchema";
import { supabase } from "..";

export const productRealtimeChannel = (updateFunction: ReturnType<typeof useProperty>["updateProperty"], userId:string)=>{

   return supabase.channel("ProductRealTime")
    .on("postgres_changes", {
        event:"*",
        schema:"public",
        table: tables.products
    }, async(payload)=>{
      console.log(payload);
    if (payload.eventType === "DELETE"){
        updateFunction(payload.old as populatedProductT, true)
    }
    else if (payload.new.id) {
     const res = await getProperty({id: payload.new.id})
     if (res.data) {
        updateFunction(res.data, undefined, userId !== payload.new.owner)
     }
    }
    }
)
} 

export const userRealtimeChannel = (updateFunction: ReturnType<typeof useUser>["updateUser"], userId:string)=>{

   return supabase.channel("UserRealTime")
    .on("postgres_changes", {
        event:"UPDATE",
        schema:"public",
        table: tables.users,
        filter:`id=eq.${userId}`
    }, async(payload)=>{
          console.log(payload);
     if (payload.new) {
        updateFunction(payload.new as userT)
     }
    }
)
} 

export const chatRealtimeChannel = (updateFunction: ReturnType<typeof useUser>["updateChats"])=>{

   return supabase.channel("ChatRealTime")
    .on("postgres_changes", {
        event:"INSERT",
        schema:"public",
        table: tables.chats,
    }, async(payload)=>{
          console.log(payload);
     if (payload.new ) {
      const chat = await getChat({id: payload.new.id,userId:""})
    updateFunction(chat.data)
     }
    }
)
} 

export const messageRealtimeChannel = (updateFunction: ReturnType<typeof useUser>["addMessageToChat"], updateEntireChat:ReturnType<typeof useUser>["updateChats"])=>{

   return supabase.channel("MessageRealTime")
    .on("postgres_changes", {
        event:"INSERT",
        schema:"public",
        table: tables.messages,
    }, async(payload)=>{
        console.log(payload);
        
     if (payload.new ) {
        try {
            updateFunction(payload.new as messageT)
        } catch (error) {
            const chat = await getChat({id: payload.new.chat,userId:""})
            updateEntireChat(chat.data)
        }
     }
    }
)
} 

export const tradeRealtimeChannel = (updateFunction: ReturnType<typeof useUser>["updateTrades"])=>{

   return supabase.channel("TradeRealTime")
    .on("postgres_changes", {
        event:"*",
        schema:"public",
        table: tables.trades,
    }, async(payload)=>{
       if (payload.eventType === "DELETE") {
       return updateFunction(payload.old as populatedTradesT, true)
       } 
     if (payload.new ) {
         const trade = await getTrade({id: payload.new.id})
         updateFunction(trade.data)
     }
    }
)
} 