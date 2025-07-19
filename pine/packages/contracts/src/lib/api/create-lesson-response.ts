import { Type } from 'class-transformer';

export class CreateLessonResponse {
  id: string;
  userId: string;
  name: string;
  @Type(() => Date)
  createdAt: Date;
  @Type(() => Date)
  completedAt: Date | undefined;
  @Type(() => Date)
  deletedAt: Date | undefined;

  constructor(
    id: string,
    userId: string,
    name: string,
    createdAt: Date,
    completedAt: Date | undefined,
    deletedAt: Date | undefined
  ) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    this.deletedAt = deletedAt;
  }
}
