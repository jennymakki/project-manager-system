package com.jennymakki.projectmanager.task;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.jennymakki.projectmanager.board.Board;
import com.jennymakki.projectmanager.board.BoardRepository;
import com.jennymakki.projectmanager.list.TaskList;
import com.jennymakki.projectmanager.list.TaskListRepository;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    public TaskService(
            TaskRepository taskRepository,
            TaskListRepository taskListRepository,
            UserRepository userRepository,
            BoardRepository boardRepository) {

        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
    }

    public Task createTask(Long listId, String title, String description, User user) {

        TaskList list = taskListRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("List not found"));

        validateBoardOwner(list.getBoard(), user);

        Task task = new Task(title, description, list);
        return taskRepository.save(task);
    }

    public Page<Task> getTasks(
            Long listId,
            String search,
            TaskStatus status,
            LocalDateTime from,
            LocalDateTime to,
            User user,
            Pageable pageable) {

        TaskList list = taskListRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("List not found"));

        validateBoardOwner(list.getBoard(), user);

        Specification<Task> spec = Specification
                .where(TaskSpecifications.belongsToUser(user))
                .and(TaskSpecifications.titleContains(search))
                .and(TaskSpecifications.hasStatus(status))
                .and(TaskSpecifications.dueAfter(from))
                .and(TaskSpecifications.dueBefore(to))
                .and((root, query, cb) -> cb.equal(root.get("taskList").get("id"), listId));

        return taskRepository.findAll(spec, pageable);
    }

    public List<Task> getTasksByBoard(Long boardId, User user) {

        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("Board not found"));

        validateBoardOwner(board, user);

        return taskRepository.findByBoardId(boardId);
    }

    public Task updateTask(
            Long taskId,
            String title,
            String description,
            TaskStatus status,
            Long assignedUserId,
            LocalDateTime dueDate,
            Long taskListId,
            User user) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        validateBoardOwner(task.getTaskList().getBoard(), user);

        if (taskListId != null) {
            TaskList newList = taskListRepository.findById(taskListId)
                    .orElseThrow(() -> new IllegalArgumentException("List not found"));
            task.setTaskList(newList);
        }

        if (title != null)
            task.setTitle(title);
        if (description != null)
            task.setDescription(description);
        if (status != null)
            task.setStatus(status);

        if (assignedUserId != null) {
            User assigned = userRepository.findById(assignedUserId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));
            task.setAssignedTo(assigned);
        }

        if (dueDate != null) {
            if (dueDate.isBefore(LocalDateTime.now())) {
                throw new IllegalArgumentException("Due date cannot be in the past");
            }
            task.setDueDate(dueDate);
        }

        return taskRepository.save(task);
    }

    public Task moveTask(Long taskId, Long newListId, User user) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (!task.getTaskList().getBoard().getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("Not owner");
        }

        TaskList newList = taskListRepository.findById(newListId)
                .orElseThrow(() -> new IllegalArgumentException("List not found"));

        task.setTaskList(newList);

        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId, User user) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        validateBoardOwner(task.getTaskList().getBoard(), user);

        taskRepository.delete(task);
    }

    private void validateBoardOwner(Board board, User user) {

        if (board == null ||
                board.getOwner() == null ||
                board.getOwner().getId() == null ||
                !board.getOwner().getId().equals(user.getId())) {

            throw new AccessDeniedException("Not owner of board");
        }
    }
}