import { categoryT, subCategoryT } from "./zodSchema";

export type appConstantsFromDB = {
    categories: categoryT[];
    subCategories: subCategoryT[];
  }