import { useNavigate } from "react-router-dom";

export default function BoardCard({ board }) {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
      onClick={() => navigate(`/boards/${board.id}`)}
    >
      <h2 className="font-semibold">{board.name}</h2>
    </div>
  );
}