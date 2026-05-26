export default function TaskCard({ task }) {
  return (
    <div className="bg-white p-2 rounded shadow">
      <p className="font-medium">{task.title}</p>
      {task.description && (
        <p className="text-sm text-gray-500">{task.description}</p>
      )}
    </div>
  );
}