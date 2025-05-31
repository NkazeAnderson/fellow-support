import { tables } from "@/constants"
import { supabase } from "@/supabase"
import { remoteConstantsT } from "@/types"
import { categorySchema, categoryT, subCategorySchema, subCategoryT } from "@/zodSchema"
import { getEntityFromAsyncStore, saveToEntityToAsyncStore } from "."

export let categories: categoryT[] = []
export let subCategories: subCategoryT[] = []


export const getRemoteConstant =async (params:{id:string, type:remoteConstantsT}) => {
    let category: categoryT 
    let subCategory: subCategoryT 

    switch (params.type) {
        case tables.subCategory:
            const subCategoryFromMemory = subCategories.find(item=>item.id === params.id)
            if (subCategoryFromMemory) return subCategoryFromMemory
              const cachedData = await getEntityFromAsyncStore(tables.subCategory, params.id, 15)
            if (cachedData) {
                subCategory = subCategorySchema.passthrough().parse(cachedData) 
                subCategories.push(subCategory)
                return subCategory
            }
            
    const dataFromServer = await supabase.from(tables.users).select("*").eq("id", params.id).single()
    subCategory = subCategorySchema.passthrough().parse(dataFromServer) 
    subCategories.push(subCategory)
    saveToEntityToAsyncStore(tables.subCategory, subCategory.id, subCategory)
    return subCategory
        case tables.category:
            const categoryFromMemory = categories.find(item=>item.name === params.id)
            if (categoryFromMemory) return categoryFromMemory
              const cachedCategoryData = await getEntityFromAsyncStore(tables.category, params.id, 15)
            if (cachedData) {
                category = categorySchema.passthrough().parse(cachedCategoryData) 
                categories.push(category)
                return category
            }
            
    const categoryFromServer = await supabase.from(tables.users).select("*").eq("id", params.id).single()
    category = categorySchema.passthrough().parse(categoryFromServer) 
    categories.push(category)
    saveToEntityToAsyncStore(tables.category, category.name, category)
    return category
        default:
            throw new Error("Remote config does not exist");
            
    }

}

export const getAllRemoteConst = async ()=>{
 const categoryPromise = supabase.from(tables.category).select();
     const subCategoryPromise = supabase.from(tables.subCategory).select();
       const [categoryRes, subCategoryRes] =
      await Promise.all([
        categoryPromise,
        subCategoryPromise,
      ]);
    categories = categorySchema.array().parse(categoryRes.data)
    subCategories = subCategorySchema.array().parse(subCategoryRes.data)
    return {categories,subCategories}
}