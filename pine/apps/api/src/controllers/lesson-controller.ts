import {
  JsonController,
  Get,
  Post,
  Body,
  CurrentUser,
  Authorized,
} from 'routing-controllers';
import { LessonRepository } from '@pine/domain';
import {
  CreateLessonRequest,
  CreateLessonResponse,
  Lesson,
  ListLessonsResponse,
  ListLessonsResponsePayload,
} from '@pine/contracts';
import { v4 } from 'uuid';

@JsonController('/lesson')
export class LessonController {
  private lessonRepository = new LessonRepository();

  @Get('/list')
  @Authorized()
  async list(
    @CurrentUser() user: { id: string }
  ): Promise<ListLessonsResponse> {
    const lessons = await this.lessonRepository.list(user.id);
    return new ListLessonsResponse(
      lessons.map(
        (lesson) =>
          new ListLessonsResponsePayload(
            lesson.id,
            lesson.userId,
            lesson.name,
            lesson.createdAt,
            lesson.completedAt,
            lesson.deletedAt
          )
      )
    );
  }

  @Post('/create')
  @Authorized()
  async create(
    @CurrentUser() user: { id: string },
    @Body() payload: CreateLessonRequest
  ): Promise<CreateLessonResponse> {
    const lesson: Lesson = {
      id: v4(),
      userId: user.id,
      name: payload.name,
      createdAt: new Date(),
      completedAt: undefined,
      deletedAt: undefined,
    };
    return this.lessonRepository.create(lesson);
  }
}
