'use client';

import { Button } from "@/components/ui/button";
import { useListTasksQuery } from "@/store/tasksApi";

export default function Index() {
  const { data } = useListTasksQuery()

  console.log(JSON.stringify(data))

  return (
    <div>
      <div>
        <h1>
          <span> Hello there, </span>
          Welcome @pine/frontend 👋
        </h1>
      </div>

      <div className="w-12 h-12 bg-red-500" />

      <Button>Hello World</Button>
    </div>
  );
}
