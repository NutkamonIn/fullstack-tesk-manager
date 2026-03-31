"use client";

import { useEffect,useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [task, setTask] = useState("");

  // load tasks
  const loadTasks = async () => {
    const res = await fetch("/api/tasks");
    const json = await res.json();
    setData(json.tasks);
  };
  useEffect(() => {
    loadTasks();
  }, []);
  // add task
  const addTask = async () => {
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });

    setTask("");
    loadTasks();
  };
  // delete task
  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks?id=${id}`, {
      method:"DELETE",
    });
    loadTasks();
  };

  return (
    <main className="p-10 min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold">Task Manager</h1>

      {/* input */}
      <div className="mt-4 flex gap-2">
        <input
          value={task ?? ""}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add task..."
          className="
          border px-3 py-2 rounded 
          bg-white text-black placeholder-gray-400
          dark:bg-gray-800 dark:text-white dark:placholder-gray-500
          "
        />

        <button
          onClick={addTask}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add
        </button>
      </div>

      <button
        onClick={loadTasks}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Load Tasks
      </button>
      {/* delete */}
      <div className="mt-6 space-y-2">
        {data.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>{t.text}</span>

            <button
              onClick={() => deleteTask(t.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}