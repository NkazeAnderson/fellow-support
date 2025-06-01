import { tables } from "@/constants";
import { supabase } from "@/supabase";
import { populatedChats, populatedTradesT } from "@/types";
import { getChat } from "@/utils/chats";
import { getTrade } from "@/utils/trades";
import { chatSchema, messageSchema, tradeSchema, userT } from "@/zodSchema";
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


  async function updateUserChatTrades({table, data}:{
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
  
    function updateUser(user:userT ) {
          setUser(user)
      }

      function updateTrades(trade:populatedTradesT | populatedTradesT[], remove?:boolean) {
            
            if (Array.isArray(trade)) {
                setTrades(prev=>[...prev, ...trade])
                return 
            }
            
            if (remove) {
              return  setTrades(trades.filter(item=>item.id !== trade.id))
            }
            const index = trades.findIndex(item=>item.id === trade.id)
            if (index >= 0) {
                trades[index]=trade
              return  setTrades([...trades])
            }
            else {
              return  setTrades([trade, ...trades])
            }
           
        }

      function updateChats(chat:populatedChats | populatedChats[], remove?:boolean) {
            
            if (Array.isArray(chat)) {
                setChats(prev=>[...prev, ...chat])
                return 
            }
            
            if (remove) {
              return  setChats(chats.filter(item=>item.id !== chat.id))
            }
            const index = chats.findIndex(item=>item.id === chat.id)
            if (index >= 0) {
                chats[index]=chat
              return  setChats([...chats])
            }
            else {
              return  setChats([chat, ...chats])
            }
           
        }

return {user, trades, chats, updateUser, updateTrades, updateChats}
}