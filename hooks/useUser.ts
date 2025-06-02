import { supabase } from "@/supabase";
import { populatedChats, populatedTradesT } from "@/types";
import { messageT, userT } from "@/zodSchema";
import { useState } from "react";

  const OnlineChannel = supabase.channel("OnlineChannel")
export function useUser() {

    const [user, setUser] = useState<userT>()

    const [trades, setTrades] = useState<populatedTradesT[]>([])
   
    const [chats, setChats] = useState<populatedChats[]>([])
    
  //   const subscribedToOnline = useRef(false)
   
   

  // useEffect(()=>{
    
  //   if (user) {
    
   

  // //   !subscribedToOnline.current &&  OnlineChannel
  // // .on('presence', { event: 'sync' }, () => {
  // //   const newState = OnlineChannel.presenceState()
  // //   console.log('sync', newState)
  // // })
  // // .on('presence', { event: 'join' }, ({ key, newPresences }) => {
  // //   console.log('join', key, newPresences)
  // // })
  // // .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
  // //   console.log('leave', key, leftPresences)
  // // })
  // // .subscribe((status:REALTIME_SUBSCRIBE_STATES)=>{
  // //  if (REALTIME_SUBSCRIBE_STATES.SUBSCRIBED === status) {
    
  // //    subscribedToOnline.current = true
  // //  }
  // // })
  // // OnlineChannel.track({
  // //   userId: user.id
  // // })

  //   }

  // return ()=>{
  //   OnlineChannel.unsubscribe()
  // }

  //},[user])


  
    function updateUser(user:userT ) {
          setUser(user)
      }

      function updateTrades(trade:populatedTradesT | populatedTradesT[], remove?:boolean) {

        setTrades(prev=>{

          if (Array.isArray(trade)) {
              return [...prev, ...trade]
          }
          
          if (remove) {
            return  prev.filter(item=>item.id !== trade.id)
          }
          const index = prev.findIndex(item=>item.id === trade.id)
          if (index >= 0) {
              prev[index]=trade
            return  [...prev]
          }
          else {
            return  [trade, ...prev]
          }
        })
            
           
        }

      function updateChats(chat:populatedChats | populatedChats[] , remove?:boolean ) {
           setChats(prev=>{

             if (Array.isArray(chat)) {
                 return [...prev, ...chat]
             }
             
             if (remove) {
               return  prev.filter(item=>item.id !== chat.id)
             }
             const index = prev.findIndex(item=>item.id === chat.id)
             if (index >= 0) {
                 prev[index]=chat
               return  [...prev]
             }
             else {
               return [chat, ...prev]
             }
           })

           
        }

      function addMessageToChat(message: messageT) {
        setChats(prev=>{

          const chatIndex  = prev.findIndex(item=>item.id === message.chat)
          // debugger
          console.log(chatIndex);
          
          if (chatIndex <0) {
            return prev
          }
          else {
        const messages = prev[chatIndex].messages
          messages.push(message)
          prev[chatIndex].messages = messages
           return [...prev]
          }
        })
        }
      

return {user, trades, chats, updateUser, updateTrades, updateChats, addMessageToChat}
}