import { defineConfig } from 'drizzle-kit';


export default defineConfig({
  schema: './supabase/database/schema.ts',
  out: './supabase/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_CONNECTION_STRING as string,
  },
});