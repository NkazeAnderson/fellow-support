import { tables } from "@/constants"
import { supabase } from "@/supabase"
import { userT } from "@/zodSchema"


export const getUser =async (params:{id:string}) => {
    let baseQuery = supabase.from(tables.users)
    const baseQuerySelect = baseQuery.select(" firstName, lastName, id, profilePiture")
    return await baseQuerySelect.eq("id", params.id).single()
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
