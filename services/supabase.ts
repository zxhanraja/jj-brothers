
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pezqbokcfbzakjthxkkr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Wh8WHcyfBx3J78fc2aNNLg_rTTNN3P6';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
