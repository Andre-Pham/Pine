'use client';

import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useListLessonsQuery } from '@/store/lesson-api';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const { data, isLoading } = useListLessonsQuery();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {isLoading ? <>Loading</> : <>Loaded</>}
      <div>{JSON.stringify(data)}</div>
      <button onClick={handleLogout} className="btn-primary">
        Logout
      </button>
    </div>
  );
}
