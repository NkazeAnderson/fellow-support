import { tables } from "@/constants";
import { supabase } from "@/supabase";
import { productT, userT } from "@/zodSchema";
import { useEffect, useState } from "react";

export function useProperty(user:userT) {

    const [properties, setProperties] = useState<productT[]>([])
    const [myProperties, setMyProperties] = useState<productT[]>([])

    useEffect(()=>{
        supabase.from(tables.products).select().limit(10).then(res=>{
            !res.error && setProperties(res.data)
        })
        supabase.from(tables.products).select().eq("owner",user.id ).then(res=>{
            !res.error && setMyProperties(res.data)
        })
    },[])

    return {properties, myProperties}
    
}