import { TaskContract } from 'contracts';

export class TaskRepository {
  async list(): Promise<TaskContract[]> {
    return [];
  }
}
