import { JsonController, Get, Post, Param, Body } from 'routing-controllers';
import { TaskRepository } from 'domain'; // import from our domain lib (to create next)
import { TaskContract } from 'contracts'; // import types from contracts lib

@JsonController('/tasks')
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

  // (You could add other endpoints: e.g. delete or toggle complete status)
}
