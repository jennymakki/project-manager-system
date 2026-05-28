import axiosClient from "../../../lib/api/axiosClient";
import type { Board } from "../../../types/board";
import type { List } from "../../../types/list";

export const getBoards = () =>
  axiosClient.get<Board[]>("/boards");

export const createBoard = (name: string) =>
  axiosClient.post<Board>("/boards", { name });

export const getBoard = (id: string) =>
  axiosClient.get<Board>(`/boards/${id}`);

export const getBoardLists = (id: string) =>
  axiosClient.get<List[]>(`/boards/${id}/lists`);