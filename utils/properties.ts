import { tables } from "@/constants"
import { supabase } from "@/supabase"
import { productT } from "@/zodSchema"


export const getProperty =async (params:{id?:string, ownerId?:string, searchText?:string}) => {
    let baseQuery = supabase.from(tables.products)
    const baseQuerySelect = baseQuery.select("*, subCategory (*) , owner ( firstName, lastName, id, profilePiture)")
    
    if (params.id) {
        return await baseQuerySelect.eq("id", params.id).single()
    }
    else if(params.ownerId){
        
        return await baseQuerySelect.eq("owner", params.ownerId)
    }
    else if(params.searchText){
        const searchText = params.searchText.trim()
        const res: {data:any[], error:any[]} = {data:[], error:[]}
        const tokens = searchText.split(" ")
        for(let item of tokens) {
            baseQuery = supabase.from(tables.products)
            const token = item.trim()
            
            const {data, error} = await baseQuerySelect.or(`name.ilike.%${token}%, description.ilike.%${token}%, location.ilike.%${token}%`)
            console.log(token, data, error);
            if (data) {
                res.data = [...res.data, ...data ]
            }
            else if (error) {
                
                res.error = [...res.error,error ]
            }
            else{}
        }
        return res
    }
    else{
        return await baseQuerySelect
    }
}

export const insertUpdateDeleteProperty = async (product:Partial<productT>, action: "update"|"insert"|"delete") => {
     const baseQuery = supabase.from(tables.products)
    if (action === "insert") {
     return await  baseQuery.insert(product)
    }
    else if (action === "update"){
        const {id, ...rest} = product
       return await baseQuery.update(rest).eq("id", id)
    }
    else{
       return await baseQuery.delete().eq("id", product.id)
    }
}