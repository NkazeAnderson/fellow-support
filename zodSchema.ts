import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { chatsTable, messagesTable, productCategoriesTable, productsTable, productSubCategoriesTable, tradesTable, usersTable } from './supabase/database/schema';

export const userSchema = createSelectSchema(usersTable,
    {
        email:(schema)=>schema.email().toLowerCase().trim(),
        firstName:(schema)=>schema.toLowerCase().trim(),
        lastName:(schema)=>schema.toLowerCase().trim(),
        subscriptionExpirationDate:(schema)=>schema.nullish()
    }
)

export const productSchema = createSelectSchema(productsTable,{
    value:(schema)=>schema.nullish()
    })

export const categorySchema = createSelectSchema(productCategoriesTable)
export const subCategorySchema = createSelectSchema(productSubCategoriesTable)
export const tradeSchema = createSelectSchema(tradesTable)
export const chatSchema = createSelectSchema(chatsTable)
export const messageSchema = createSelectSchema(messagesTable)

export type userT = z.infer<typeof userSchema>
export type productT = z.infer<typeof productSchema>
export type categoryT = z.infer<typeof categorySchema>
export type subCategoryT = z.infer<typeof subCategorySchema>
export type tradeT = z.infer<typeof tradeSchema>
export type chatT = z.infer<typeof chatSchema>
export type messageT = z.infer<typeof messageSchema>