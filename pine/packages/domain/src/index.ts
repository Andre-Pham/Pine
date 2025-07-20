import { TaskContract } from "@pine/contracts";

export class TaskRepository {
  async list(): Promise<TaskContract[]> {
    return [
      {
        id: "1",
        title: "New Task",
        completed: false,
        user_id: "1",
        created_at: new Date().toISOString(),
      },
    ];
  }

  async add(payload: Partial<TaskContract>): Promise<TaskContract> {
    // Replace with actual logic to add a task
    return {
      id: "1",
      title: payload.title || "New Task",
      completed: false,
      user_id: "1",
      created_at: new Date().toISOString(),
    };
  }
}

export * from "./lib";
