import { createSelectSchema } from 'drizzle-zod';
import { usersTable } from './supabase/database/schema';

export const userSchema = createSelectSchema(usersTable,
    {
        email:(schema)=>schema.email()
    }
)