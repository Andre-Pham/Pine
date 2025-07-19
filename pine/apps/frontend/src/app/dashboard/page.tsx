'use client';

import { useRouter } from 'next/navigation';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useListLessonsQuery } from '@/store/lesson-api';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export default function DashboardPage() {
  const token = useSelector((s: RootState) => s.auth.token);

  const router = useRouter();
  const supabase = useSupabaseClient();
  const session = useSession();

  const { data, isLoading, error } = useListLessonsQuery(undefined, {
    skip: token === '',
  });

  if (token === '') return <p>Loading auth…</p>;
  if (isLoading) return <p>Loading lessons…</p>;
  if (error) return <p>Oops: {String(error)}</p>;

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
      <div className="mt-8">{JSON.stringify(session?.user, null, 2)}</div>
    </div>
  );
}
