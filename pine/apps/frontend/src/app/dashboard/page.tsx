'use client';

import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  useDeleteLessonMutation,
  useListLessonsQuery,
  useUpdateLessonMutation,
} from '@/store/lesson-api';
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
import { CircleCheck, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { DeleteLessonRequest, UpdateLessonRequest } from '@pine/contracts';
import { toast } from 'sonner';
import { useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [deletingId, setDeletingId] = useState<string>();
  const [updatingId, setUpdatingId] = useState<string>();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [updateLesson] = useUpdateLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();
  const {
    data: lessonsResponse,
    refetch: refetchLessons,
    isLoading: isLessonsLoading,
  } = useListLessonsQuery();
  const lessons = lessonsResponse?.lessons ?? [];

  const handleUpdateLesson = async (id: string, isCompleted: boolean) => {
    setUpdatingId(id);
    const { error } = await updateLesson(
      new UpdateLessonRequest(id, undefined, isCompleted)
    );
    // Refetch so state is reflected immediately upon loading being completed
    await refetchLessons();
    setUpdatingId(undefined);
    if (error) {
      toast.error('Failed to update lesson');
      return;
    }
  };

  const handleDeleteLesson = async (id: string) => {
    setDeletingId(id);
    const { error } = await deleteLesson(new DeleteLessonRequest(id));
    // Refetch so state is reflected immediately upon loading being completed
    await refetchLessons();
    setDeletingId(undefined);
    if (error) {
      toast.error('Failed to delete lesson');
      return;
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      setIsLoggingOut(false);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-32">
      <div className="flex justify-between flex-wrap mx-8 gap-2">
        <h1 className="text-4xl font-bold">Lessons dashboard</h1>
        <div className="flex items-center gap-2">
          <CreateLessonDialog />
          <Button onClick={handleLogout} isLoading={isLoggingOut}>
            Logout
          </Button>
        </div>
      </div>

      {isLessonsLoading ? (
        <LoadingSpinnerCentered height="200px" />
      ) : (
        <div className="mt-6 flex flex-col gap-4 mx-8">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="gap-4">
              <CardHeader>
                <CardTitle>{lesson.name}</CardTitle>
                <CardDescription>
                  Created{' '}
                  {format(new Date(lesson.createdAt), 'do MMMM, h:mm a')}
                </CardDescription>
                <CardAction>
                  <Button
                    variant="link"
                    leftElement={<Trash2 />}
                    className="text-red-700"
                    onClick={async () => {
                      await handleDeleteLesson(lesson.id);
                    }}
                    isLoading={deletingId === lesson.id}
                  >
                    Delete
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                {lesson.completedAt ? (
                  <div className="flex items-center gap-2">
                    <Button
                      className="bg-green-600"
                      leftElement={<CircleCheck className="size-4" />}
                      onClick={async () => {
                        await handleUpdateLesson(lesson.id, false);
                      }}
                      isLoading={updatingId === lesson.id}
                    >
                      Completed!
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={async () => {
                      await handleUpdateLesson(lesson.id, true);
                    }}
                    isLoading={updatingId === lesson.id}
                  >
                    Mark as complete
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
