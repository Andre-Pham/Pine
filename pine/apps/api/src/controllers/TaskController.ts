import { JsonController, Get, Post, Body } from "routing-controllers";
import { TaskRepository } from "@pine/domain";
import { TaskContract } from "@pine/contracts";

@JsonController("/tasks")
export class TaskController {
  private repo = new TaskRepository();

  @Get()
  async listTasks(): Promise<TaskContract[]> {
    // Ideally, filter by current user (if auth implemented); for now, fetch all:
    return await this.repo.list();
  }

  @Post()
  async addTask(@Body() payload: Partial<TaskContract>): Promise<TaskContract> {
    // We expect payload to contain at least a title (Task title)
    return await this.repo.add(payload);
  }
}
