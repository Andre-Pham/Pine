import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class ListLessonsResponsePayload {
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

export class ListLessonsResponse {
  @Type(() => ListLessonsResponsePayload)
  @ValidateNested()
  readonly lessons: ListLessonsResponsePayload[];

  constructor(lessons: ListLessonsResponsePayload[]) {
    this.lessons = lessons;
  }
}
