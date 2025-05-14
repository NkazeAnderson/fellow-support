import { Database } from "@/database.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { z } from "zod";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(z.string().parse(process.env.EXPO_PUBLIC_SUPABASE_URL) , z.string().parse(process.env.EXPO_PUBLIC_SUPABASE_API_KEY), {
    auth:{
        storage:AsyncStorage,
        autoRefreshToken: true,    persistSession: true,    detectSessionInUrl: false,
    }
})