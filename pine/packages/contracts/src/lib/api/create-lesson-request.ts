import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
