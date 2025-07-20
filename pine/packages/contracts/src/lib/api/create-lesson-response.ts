import { Type } from "class-transformer";

export class CreateLessonResponse {
  readonly id: string;

  readonly userId: string;

  readonly name: string;

  @Type(() => Date)
  readonly createdAt: Date;

  @Type(() => Date)
  readonly completedAt: Date | undefined;

  @Type(() => Date)
  readonly deletedAt: Date | undefined;

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
