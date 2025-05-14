import { tables } from '@/constants';
import { boolean, date, integer, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const tradeApprovals = pgEnum("tradeApprovals", ["pending", "accepted", 'declined'])

export const usersTable = pgTable(tables.users, {
  id: uuid().primaryKey().defaultRandom().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: text().notNull().unique(),
  profilePiture: text(),
  favoriteProducts:text().array().default([]).notNull(),
});

export const productsTable = pgTable(tables.products, {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: text().notNull(),
  description: text().notNull(),
  picturesUrl: text().array().notNull(),
  value:integer(),
  available:boolean().default(true),
  owner:uuid().references(()=>usersTable.id),
  createdAt:date().defaultNow().notNull(),
});

export const tradesTable = pgTable(tables.trades, {
  id: uuid().primaryKey().defaultRandom().notNull(),
  requestedBy:uuid().references(()=>usersTable.id).notNull(),
  product:uuid().references(()=>productsTable.id).notNull(),
  productRequested:uuid().references(()=>productsTable.id).notNull(),
  approvalStatus:tradeApprovals().default("pending").notNull(),
  createdAt:timestamp().defaultNow().notNull(),
});

export const chatsTable = pgTable(tables.chats,{
    id: uuid().primaryKey().defaultRandom().notNull(),
    members:uuid().references(()=>usersTable.id).array().notNull(),
})

export const messagesTable = pgTable(tables.messages,{
    id: uuid().primaryKey().defaultRandom().notNull(),
    chat:uuid().references(()=>chatsTable.id).notNull(),
    text: text(),
    image:text(),
    createdAt: timestamp().defaultNow().notNull()
})


