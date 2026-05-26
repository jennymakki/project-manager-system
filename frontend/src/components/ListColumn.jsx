import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import TaskCard from "./TaskCard";

export default function ListColumn({ list }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosClient.get(`/lists/${list.id}/tasks`);
        setTasks(res.data.content);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [list.id]);

  return (
    <div className="w-72 bg-gray-100 p-3 rounded">
      <h3 className="font-bold mb-2">{list.name}</h3>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}