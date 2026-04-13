import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(
  supabaseUrl,
  'cb11b4dc2896d44f9aa17dad4ae399d2577fdf7c48593798d7c17d998f75bc24',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
