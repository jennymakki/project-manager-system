import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import TaskCard from "./TaskCard";

export default function ListColumn({ list }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosClient.get(`/lists/${list.id}/tasks`);
        setTasks(res.data.content || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [list.id]);

  const createTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await axiosClient.post(
        `/lists/${list.id}/tasks`,
        { title, description: "" }
      );

      setTasks((prev) => [...prev, res.data]);
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-72 bg-gray-100 p-3 rounded">
      <h3 className="font-bold mb-2">{list.name}</h3>

      <div className="flex gap-2 mb-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 p-1 border rounded"
        />

        <button
          onClick={createTask}
          className="bg-blue-500 text-white px-2 rounded"
        >
          +
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}