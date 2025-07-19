'use client';
import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Provider store={store}>{children}</Provider>;
    </SessionContextProvider>
  );
}
