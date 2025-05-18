import { categoryT, subCategoryT } from "./zodSchema";

export type appConstantsFromDB = {
    categories: categoryT[];
    subCategories: subCategoryT[];
  }

export type withOutId<T extends {id:string}> = Omit<T, 'id'>