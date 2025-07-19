import {
  JsonController,
  Get,
  Post,
  Body,
  CurrentUser,
  Authorized,
  OnUndefined,
} from 'routing-controllers';
import { LessonRepository } from '@pine/domain';
import {
  CreateLessonRequest,
  CreateLessonResponse,
  DeleteLessonRequest,
  Lesson,
  ListLessonsResponse,
  ListLessonsResponsePayload,
  UpdateLessonRequest,
} from '@pine/contracts';
import { v4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';

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
            lesson.completedAt
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

  @Post('/update')
  @Authorized()
  @OnUndefined(StatusCodes.NO_CONTENT)
  async update(
    @CurrentUser() user: { id: string },
    @Body() payload: UpdateLessonRequest
  ) {
    this.lessonRepository.update(
      payload.id,
      user.id,
      undefined,
      payload.isComplete
    );
  }

  @Post('/delete')
  @Authorized()
  @OnUndefined(StatusCodes.NO_CONTENT)
  async delete(
    @CurrentUser() user: { id: string },
    @Body() payload: DeleteLessonRequest
  ) {
    this.lessonRepository.delete(payload.id, user.id)
  }
}
