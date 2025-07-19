import { Lesson } from '@pine/contracts';
import { supabase } from './supabase/client';

export class LessonRepository {
  async list(userId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('lesson')
      .select('*')
      .eq('user_id', userId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
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

  async update(
    id: string,
    userId: string,
    name: string | undefined,
    isCompleted: boolean | undefined
  ): Promise<void> {
    if (name === undefined && isCompleted === undefined) {
      return;
    }
    const { error } = await supabase
      .from('lesson')
      .update({
        ...(name !== undefined ? { lesson_name: name } : {}),
        ...(isCompleted !== undefined
          ? { completed_at: isCompleted ? new Date().toISOString() : null }
          : {}),
      })
      .eq('id', id)
      .eq('user_id', userId);
    if (error) throw new Error(error.message);
  }

  async delete(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('lesson')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', userId);
    if (error) throw new Error(error.message);
  }
}
