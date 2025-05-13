import { createClient } from '@supabase/supabase-js';
import { z } from "zod";

// Create a single supabase client for interacting with your database
export const supabase = createClient(z.string().parse(process.env.EXPO_PUBLIC_SUPABASE_URL) , z.string().parse(process.env.EXPO_PUBLIC_SUPABASE_API_KEY))