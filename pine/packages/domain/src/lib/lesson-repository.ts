import { Lesson } from '@pine/contracts';
import { supabase } from './supabase/client';

export class LessonRepository {
  async list(userId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('lesson')
      .select('*')
      .eq('user_id', userId);
    if (error) throw new Error(error.message);
    return data.map((lesson) => ({
      id: lesson.id,
      userId: lesson.user_id,
      name: lesson.lesson_name,
      createdAt: new Date(lesson.created_at),
      completedAt: lesson.completed_at
        ? new Date(lesson.completed_at)
        : undefined,
      deletedAt: lesson.deleted_at ? new Date(lesson.deleted_at) : undefined,
    }));
  }

  async create(lesson: Lesson): Promise<Lesson> {
    const { data, error } = await supabase
      .from('lesson')
      .insert({
        id: lesson.id,
        user_id: lesson.userId,
        lesson_name: lesson.name,
        created_at: lesson.createdAt.toISOString(),
        completed_at: lesson.completedAt?.toISOString() ?? undefined,
        deleted_at: lesson.deletedAt?.toISOString() ?? undefined,
      })
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
}
