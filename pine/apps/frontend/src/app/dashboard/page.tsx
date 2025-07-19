'use client';

import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useListLessonsQuery } from '@/store/lesson-api';
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  LoadingSpinnerCentered,
} from '@/components/ui';
import { CreateLessonDialog } from './components';
import { Check, Trash2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const { data: lessonsResponse, isLoading: isLessonsLoading } =
    useListLessonsQuery();
  const lessons = lessonsResponse?.lessons ?? [];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="max-w-4xl mx-auto my-32">
      <div className="flex justify-between flex-wrap mx-8 gap-2">
        <h1 className="text-4xl font-bold">Lessons dashboard</h1>
        <div className="flex items-center gap-2">
          <CreateLessonDialog />
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      {isLessonsLoading ? (
        <LoadingSpinnerCentered height="200px" />
      ) : (
        <div className="mt-6 flex flex-col gap-4 mx-8">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className='gap-4'>
              <CardHeader>
                <CardTitle>{lesson.name}</CardTitle>
                <CardDescription>
                  Created {lesson.createdAt.toLocaleString()}
                </CardDescription>
                <CardAction>
                  <Button
                    variant="link"
                    leftElement={<Trash2 />}
                    className="text-red-700"
                  >
                    Delete
                  </Button>
                </CardAction>
              </CardHeader>
              {lesson.completedAt ? (
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Button
                      className="bg-green-600"
                      leftElement={<Check className="size-4" />}
                    >
                      Completed!
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <CardContent>
                  <Button>Mark as complete</Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
