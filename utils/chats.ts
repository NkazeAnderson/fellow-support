import { tables } from "@/constants"
import { supabase } from "@/supabase"
import { populatedChats } from "@/types"
import { chatT, messageT } from "@/zodSchema"


export const getChat =async (params:{id?:string, userId:string, otherMember?:string}) => {
    let baseQuery = supabase.from(tables.chats)
    const baseQuerySelect = baseQuery.select("*, member1 ( firstName, lastName, id, profilePiture), member2 ( firstName, lastName, id, profilePiture)").or(`member1.eq.${params.userId},member2.eq.${params.userId}`)
    if (params.id) {
        const {data} = await baseQuerySelect.eq("id", params.id).single()
        return await getMessage(data)
    }
    else{
       const res= (await baseQuerySelect) as {data:populatedChats[], error:any}
       const chats : populatedChats[]= []
       const error : any[] = []
       for(let chat of res.data) {
         const {data, error:retrivalError} = await getMessagesInChat({chat, userId:params.userId})
            chats.push(data)
            error.push(retrivalError)
       }
        return {data:chats, error}
    }
}

export const getSpecificChat = async (member1:string, member2:string)=>{
    let res = await supabase.from(tables.chats).select("*, member1 ( firstName, lastName, id, profilePiture), member2 ( firstName, lastName, id, profilePiture)").eq("member1", member1).eq("member2", member2).single()
    if (!res.data) {
        res = await supabase.from(tables.chats).select("*, member1 ( firstName, lastName, id, profilePiture), member2 ( firstName, lastName, id, profilePiture)").eq("member1", member2).eq("member2", member1).single()
    }
    return res
}

const getMessagesInChat = async ({chat, userId}:{chat:Omit<populatedChats, "messages">, userId:string}) => {
        const {data:messages, error} = await getMessage({chatId:chat.id}) as {data:messageT[], error:any}
        return {data:{...chat, messages, }, error}    
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
    // else if (action === "update"){
    //     const {id, members, ...rest} = chat
    //    return await baseQuery.update(rest).eq("id", id)
    // }
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