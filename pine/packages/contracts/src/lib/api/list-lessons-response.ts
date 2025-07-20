import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class ListLessonsResponsePayload {
  readonly id: string;
  
  readonly userId: string;

  readonly name: string;

  @Type(() => Date)
  readonly createdAt: Date;

  @Type(() => Date)
  readonly completedAt: Date | undefined;

  constructor(
    id: string,
    userId: string,
    name: string,
    createdAt: Date,
    completedAt: Date | undefined
  ) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
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
