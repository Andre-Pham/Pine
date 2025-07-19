"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useListTasksQuery, useAddTaskMutation } from "@/store/tasksApi";
import { useAuthUser } from "@/auth/use-auth-user";
import { TaskContract } from "@pine/contracts";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthUser();
  
  const { data: tasks, error, isLoading, refetch } = useListTasksQuery();
  const [addTask, addResult] = useAddTaskMutation();

  useEffect(() => {
    if (user === null) {
      // Not logged in, redirect to login
      router.push("/login");
    }
  }, [user, router]);

  const handleAddTask = async () => {
    const title = prompt("New task title:");
    if (!title) return;
    try {
      // Call the RTK mutation to add task
      await addTask({ title, completed: false } as Partial<TaskContract>).unwrap();
      refetch();  // refresh the list after adding
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const handleToggle = async (task: TaskContract) => {
    // We might implement this via an API call as well (toggleComplete mutation)
    // For now, we assume we have an endpoint and perhaps an RTK mutation for it.
    try {
      await fetch(`/api/tasks/${task.id}/toggle`, { method: 'POST' });
      refetch();
    } catch (err) {
      console.error("Failed to toggle task", err);
    }
  };

  const handleDelete = async (task: TaskContract) => {
    if (!confirm(`Delete task "${task.title}"?`)) return;
    try {
      await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
      refetch();
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  if (!user) {
    return <p>Redirecting...</p>; // or a loading state
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      {error && <p className="text-red-500">Error loading tasks.</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mb-4">
          {tasks?.map(task => (
            <li key={task.id} className="flex items-center justify-between mb-2">
              <span 
                onClick={() => handleToggle(task)}
                className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}>
                {task.title}
              </span>
              <div>
                <button onClick={() => handleToggle(task)} className="mr-2 text-blue-500">
                  {task.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button onClick={() => handleDelete(task)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleAddTask} className="px-4 py-2 bg-green-600 text-white rounded">Add Task</button>
    </div>
  );
}
