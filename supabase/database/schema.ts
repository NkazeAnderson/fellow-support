import { tables } from '@/constants';
import { eq } from 'drizzle-orm';
import { boolean, date, integer, pgEnum, pgTable, pgView, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const tradeApprovals = pgEnum("tradeApprovals", ["pending", "accepted", 'declined'])

export const usersTable = pgTable(tables.users, {
  id: uuid().primaryKey().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: text().notNull().unique(),
  profilePiture: text(),
  favoriteProducts:uuid().array(),
  subscriptionExpirationDate: date({mode:"string"})
});

export const productCategoriesTable = pgTable(tables.category, {
   name: text().primaryKey().unique().notNull(),
   estimatableValue: boolean().default(false)
})

export const productSubCategoriesTable = pgTable(tables.subCategory, {
  id: uuid().primaryKey().defaultRandom().notNull(),
   name: text().notNull(),
   category: text().notNull().references(()=>productCategoriesTable.name),
})

export const productsTable = pgTable(tables.products, {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: text().notNull(),
  description: text().notNull(),
  picturesUrl: text().array().notNull(),
  value:integer(),
  available:boolean().default(true).notNull(),
  owner:uuid().references(()=>usersTable.id).notNull(),
  createdAt:date({mode:"string"}).defaultNow().notNull(),
  subCategory:uuid().notNull().references(()=>productSubCategoriesTable.id), 
  location: text().notNull()
});

export const tradesTable = pgTable(tables.trades, {
  id: uuid().primaryKey().defaultRandom().notNull(),
  requestedBy:uuid().references(()=>usersTable.id).notNull(),
  product:uuid().references(()=>productsTable.id).notNull(),
  productRequested:uuid().references(()=>productsTable.id).notNull(),
  approvalStatus:tradeApprovals().default("pending").notNull(),
  location:text().notNull(),
  createdAt:timestamp({mode:"string"}).defaultNow().notNull(),
});

export const chatsTable = pgTable(tables.chats,{
    id: uuid().primaryKey().defaultRandom().notNull(),
    member1:uuid().references(()=>usersTable.id).notNull(),
    member2:uuid().references(()=>usersTable.id).notNull(),
})

export const messagesTable = pgTable(tables.messages,{
    id: uuid().primaryKey().defaultRandom().notNull(),
    chat:uuid().references(()=>chatsTable.id).notNull(),
    text: text(),
    images:text().array(),
    sentBy:uuid().references(()=>usersTable.id).notNull(),
    createdAt: timestamp({mode:"string"}).defaultNow().notNull()
})


//Views

export const productsView = pgView("products_view").as((qb) => qb.select().from(productsTable).innerJoin(productSubCategoriesTable, eq(productsTable.subCategory, productSubCategoriesTable.id)));
