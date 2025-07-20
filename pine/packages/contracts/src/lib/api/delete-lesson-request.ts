import { IsNotEmpty, IsString } from "class-validator";

export class DeleteLessonRequest {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
