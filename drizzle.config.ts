import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './supabase/database/schema.ts',
  out: './supabase/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://postgres@localhost/fellowsupport",
  },
});