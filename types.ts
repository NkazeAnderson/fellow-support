import { tables } from "./constants";
import { categoryT, messageT, productT, subCategoryT, tradeT, userT } from "./zodSchema";

export type appConstantsFromDB = {
    categories: categoryT[];
    subCategories: subCategoryT[];
  }

export type publicUserT = Pick<userT, "id"| "firstName" | "lastName"| "profilePiture">

export type populatedProductT  = Omit<productT, "owner" | "subCategory" > & {
  owner: publicUserT,
  subCategory: subCategoryT
}

export type populatedTradesT  = Omit<tradeT, "product" | "productRequested"  > & {
  product: populatedProductT,
  productRequested: populatedProductT,
}

export type populatedChats  ={
  messages: messageT[],
  member1: publicUserT,
  member2: publicUserT,
  id:string
}

export type withOutId<T extends {id:string}> = Omit<T, 'id'>

export type tablesKeyT = (keyof typeof tables )

export type tablesValueT = typeof tables[tablesKeyT]

export type remoteConstantsT = Extract<tablesValueT , "Category" | "SubCategory" >

export type asyncStoreDataT = {
  meta: {
    savedAt: string 
  },
  data: Record<string, any>
}