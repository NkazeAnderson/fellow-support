import { tables } from "@/constants"
import { supabase } from "@/supabase"
import { populatedChats } from "@/types"
import { chatT, messageT, userT } from "@/zodSchema"
import { getUser } from "./users"


export const getChat =async (params:{id?:string, userId:string,}) => {
    let baseQuery = supabase.from(tables.chats)
    const baseQuerySelect = baseQuery.select().contains("members", [params.userId])

    if (params.id) {
        const {data} = await baseQuerySelect.eq("id", params.id).single()
        return await getMessage(data)
    }
    else{
       const {data}= (await baseQuerySelect) as {data:chatT[], error:any}
       const chats : populatedChats[]= []
       const error : any[] = []
       for(let chat of data) {
         const {data, error:retrivalError} = await getMessagesInChat({chat, userId:params.userId})
            chats.push(data)
            error.push(retrivalError)
       }
        return {data:chats, error}
    }
}

const getMessagesInChat = async ({chat, userId}:{chat:chatT, userId:string}) => {
       const error : any[] = []
        const otherMemberId = chat.members.find(item=>item !== userId)!
        const {data:messages, error:messageError} = await getMessage({chatId:chat.id}) as {data:messageT[], error:any}
        const {data:otherMember, error:userError} = await getUser({id:otherMemberId}) as {data:userT, error:any}
        error.push({messageError, userError})
        
        return {data:{...chat, messages, otherMember}, error}
       
}

export const getMessage =async (params:{id?:string, chatId:string}) => {
    let baseQuery = supabase.from(tables.messages)
    const baseQuerySelect = baseQuery.select().eq("chat", params.chatId)  

    if (params.id) {
        return await baseQuerySelect.eq("id", params.id).single()
    }
    else{
        return await baseQuerySelect
    }
}

export const insertUpdateDeleteChat = async (chat:Partial<chatT>, action: "update"|"insert"|"delete") => {
     const baseQuery = supabase.from(tables.chats)
    if (action === "insert") {
     return await  baseQuery.insert(chat)
    }
    else if (action === "update"){
        const {id, members, ...rest} = chat
       return await baseQuery.update(rest).eq("id", id)
    }
    else{
       return await baseQuery.delete().eq("id", chat.id)
    }
}

export const insertUpdateDeleteMessage = async (message:Partial<messageT>, action: "update"|"insert"|"delete") => {
     const baseQuery = supabase.from(tables.messages)
    if (action === "insert") {
     return await  baseQuery.insert(message)
    }
    else if (action === "update"){
        const {id, ...rest} = message
       return await baseQuery.update(rest).eq("id", id)
    }
    else{
       return await baseQuery.delete().eq("id", message.id)
    }
}