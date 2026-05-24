package com.jennymakki.projectmanager.list;

import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.jennymakki.projectmanager.board.Board;
import com.jennymakki.projectmanager.board.BoardRepository;
import com.jennymakki.projectmanager.user.User;

@Service
public class TaskListService {

    private final TaskListRepository taskListRepository;
    private final BoardRepository boardRepository;

    public TaskListService(TaskListRepository taskListRepository,
            BoardRepository boardRepository) {
        this.taskListRepository = taskListRepository;
        this.boardRepository = boardRepository;
    }

    public TaskList createList(Long boardId, String name, User user) {

        Board board = boardRepository.findById(boardId)
                .orElseThrow();

        if (!board.getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("Not owner");
        }

        TaskList list = new TaskList(name, board);
        return taskListRepository.save(list);
    }

    public List<TaskList> getLists(Long boardId, User user) {

        Board board = boardRepository.findById(boardId)
                .orElseThrow();

        if (!board.getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("Not owner");
        }

        return taskListRepository.findByBoardId(boardId);
    }
}