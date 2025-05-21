import { categoryT, chatT, messageT, productT, subCategoryT, tradeT, userT } from "./zodSchema";

export type appConstantsFromDB = {
    categories: categoryT[];
    subCategories: subCategoryT[];
  }

export type publicUserT = Pick<userT, "id"| "firstName" | "lastName"| "profilePiture">

export type populatedProductT  = Omit<productT, "owner" | "subCategory" > & {
  owner: publicUserT,
  subCategory: subCategoryT
}

export type populatedTradesT  = Omit<tradeT, "product" | "productRequested" | "requestedBy" > & {
  product: productT,
  productRequested: productT,
  requestedBy: publicUserT
}

export type populatedChats  = chatT & {
  messages: messageT[],
  otherMember: publicUserT
}

export type withOutId<T extends {id:string}> = Omit<T, 'id'>