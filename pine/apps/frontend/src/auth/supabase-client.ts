import { setToken } from '@/store/auth-slice';
import { store } from '@/store';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createPagesBrowserClient()

// Immediately fetch any existing session, then subscribe to changes
;(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  store.dispatch(setToken(session?.access_token ?? ''))
})()

supabase.auth.onAuthStateChange((_event, session) => {
  store.dispatch(setToken(session?.access_token ?? ''))
})