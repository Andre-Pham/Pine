'use client';

import { useRouter } from 'next/navigation';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  useCreateLessonMutation,
  useListLessonsQuery,
} from '@/store/lesson-api';
import { CreateLessonRequest } from '@pine/contracts';
import { Button } from '@/components/ui';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const session = useSession();

  const { data, isLoading } = useListLessonsQuery();

  const [createLesson, { isLoading: isCreateLessonLoading }] =
    useCreateLessonMutation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {isLoading || isCreateLessonLoading ? <>Loading</> : <>Loaded</>}
      <div>{JSON.stringify(data)}</div>
      <Button
        onClick={async () => {
          await createLesson(new CreateLessonRequest('New lesson'));
        }}
      >
        Create
      </Button>
      <button onClick={handleLogout} className="btn-primary">
        Logout
      </button>
      <div className="mt-8">{JSON.stringify(session?.user, null, 2)}</div>
    </div>
  );
}
