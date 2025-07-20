import {
  JsonController,
  Get,
  Post,
  Body,
  CurrentUser,
  Authorized,
  OnUndefined,
} from "routing-controllers";
import { LessonRepository } from "@pine/domain";
import {
  CreateLessonRequest,
  CreateLessonResponse,
  DeleteLessonRequest,
  ListLessonsResponse,
  ListLessonsResponsePayload,
  UpdateLessonRequest,
} from "@pine/contracts";
import { StatusCodes } from "http-status-codes";

@JsonController("/lesson")
export class LessonController {
  private lessonRepository = new LessonRepository();

  @Get("/list")
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

  @Post("/create")
  @Authorized()
  async create(
    @CurrentUser() user: { id: string },
    @Body() payload: CreateLessonRequest
  ): Promise<CreateLessonResponse> {
    return this.lessonRepository.create(user.id, payload.name);
  }

  @Post("/update")
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

  @Post("/delete")
  @Authorized()
  @OnUndefined(StatusCodes.NO_CONTENT)
  async delete(
    @CurrentUser() user: { id: string },
    @Body() payload: DeleteLessonRequest
  ) {
    this.lessonRepository.delete(payload.id, user.id);
  }
}
