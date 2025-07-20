import { supabase } from "./supabase-client";
import { lessonApi } from "@/store/lesson-api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      setIsLoggingOut(false);
    } else {
      dispatch(lessonApi.util.resetApiState());
      router.push("/login");
    }
  }, [dispatch, router]);

  return { logout, isLoggingOut };
};
