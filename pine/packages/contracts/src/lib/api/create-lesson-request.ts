import { IsNotEmpty, IsString } from "class-validator";

export class CreateLessonRequest {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
