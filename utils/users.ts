import { tables } from "@/constants"
import { supabase } from "@/supabase"
import { publicUserT } from "@/types"
import { publicUserSchema, userT } from "@/zodSchema"
import { getEntityFromAsyncStore, saveToEntityToAsyncStore } from "."

export const users: publicUserT[] = []


export const getUser =async (params:{id:string}) => {
    let user: publicUserT 

    const userFromMemory = users.find(item=>item.id === params.id)
    if (userFromMemory) return userFromMemory
    let baseQuery = supabase.from(tables.users)
    const cachedData = await getEntityFromAsyncStore(tables.users, params.id, 15)
    if (cachedData) {
        user = publicUserSchema.passthrough().parse(cachedData) 
        users.push(user)
        return user
    }
    const baseQuerySelect = baseQuery.select(" firstName, lastName, id, profilePiture")
    const dataFromServer = await baseQuerySelect.eq("id", params.id).single()
    user = publicUserSchema.passthrough().parse(dataFromServer) 
    users.push(user)
    saveToEntityToAsyncStore(tables.users, user.id, user)
    return user
}

export const insertUpdateDeleteUser = async (user:Partial<userT>, action: "update"|"insert"|"delete") => {
     const baseQuery = supabase.from(tables.users)
    if (action === "insert") {
     return await  baseQuery.insert(user)
    }
    else if (action === "update"){
        const {id, ...rest} = user
       return await baseQuery.update(rest).eq("id", id)
    }
    else{
       return await baseQuery.delete().eq("id", user.id)
    }
}
