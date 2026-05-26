import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";

import ListColumn from "../components/ListColumn";

export default function BoardPage() {
  const { id } = useParams();

  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const boardRes = await axiosClient.get(`/boards/${id}`);
        const listsRes = await axiosClient.get(`/boards/${id}/lists`);

        setBoard(boardRes.data);
        setLists(listsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBoardData();
  }, [id]);

  if (!board) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{board.name}</h1>

      <div className="flex gap-4 overflow-x-auto">
        {lists.map((list) => (
          <ListColumn key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}