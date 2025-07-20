"use client";
import { Provider } from "react-redux";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../auth/supabase-client";
import { store } from "../store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Provider store={store}>{children}</Provider>
    </SessionContextProvider>
  );
}
