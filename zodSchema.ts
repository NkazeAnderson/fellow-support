import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { usersTable } from './supabase/database/schema';

export const userSchema = createSelectSchema(usersTable,
    {
        email:(schema)=>schema.email().toLowerCase().trim(),
        firstName:(schema)=>schema.toLowerCase().trim(),
        lastName:(schema)=>schema.toLowerCase().trim(),
    }
)

export type userT = z.infer<typeof userSchema>