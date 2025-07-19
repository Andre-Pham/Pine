// packages/domain/src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY! // use anon key here; we’ll scope with RLS below
);
