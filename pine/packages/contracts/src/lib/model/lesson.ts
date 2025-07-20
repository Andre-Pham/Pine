export interface Lesson {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  completedAt: Date | undefined;
  deletedAt: Date | undefined;
}
