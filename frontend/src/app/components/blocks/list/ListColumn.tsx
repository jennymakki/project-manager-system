import { useEffect, useState } from "react";
import axiosClient from "../../../../lib/api/axiosClient";
import TaskCard from "../task/task-card";
import type { List } from "../../../../types/list";
import type { Task } from "../../../../types/task";

export default function ListColumn({ list }: { list: List }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axiosClient.get(`/lists/${list.id}/tasks`);
      setTasks(res.data.content || []);
    };

    fetchTasks();
  }, [list.id]);

  const createTask = async () => {
    if (!title.trim()) return;

    const res = await axiosClient.post(`/lists/${list.id}/tasks`, {
      title,
      description: "",
    });

    setTasks((prev) => [...prev, res.data]);
    setTitle("");
  };

  return (
    <div className="w-72 bg-gray-100 p-3 rounded">
      <h3 className="font-bold mb-2">{list.name}</h3>

      <div className="flex gap-2 mb-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-1 border rounded"
        />

        <button onClick={createTask}>+</button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}