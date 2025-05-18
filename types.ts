import { categoryT, productT, subCategoryT, userT } from "./zodSchema";

export type appConstantsFromDB = {
    categories: categoryT[];
    subCategories: subCategoryT[];
  }

export type publicUserT = Pick<userT, "id"| "firstName" | "lastName">

export type populatedProductT  = Omit<productT, "owner" | "subCategory" > & {
  owner: publicUserT,
  subCategory: subCategoryT
}

export type withOutId<T extends {id:string}> = Omit<T, 'id'>