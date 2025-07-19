import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateLessonRequest {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name: string | undefined;

  @IsOptional()
  @IsBoolean()
  readonly isComplete: boolean | undefined;

  constructor(id: string, name: string | undefined, isComplete: boolean | undefined) {
    this.id = id
    this.name = name;
    this.isComplete = isComplete;
  }
}
