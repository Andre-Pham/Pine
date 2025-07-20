import "reflect-metadata";

export interface TaskContract {
  id: string;
  title: string;
  completed: boolean;
  user_id: string;
  created_at?: string;
}

export interface UserContract {
  id: string;
  email: string;
}

export * from "./lib";
