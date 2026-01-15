import { createClient } from '@supabase/supabase-js'
import { type Database } from '@/types/db'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabaseStorage = import.meta.env.VITE_SUPABASE_MAIN_STORAGE

export const supabaseStorageUrl = `${supabaseUrl}${supabaseStorage}`

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
