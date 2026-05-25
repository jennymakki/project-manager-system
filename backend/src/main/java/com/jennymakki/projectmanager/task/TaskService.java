package com.jennymakki.projectmanager.task;

import java.time.LocalDateTime;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.jennymakki.projectmanager.list.TaskList;
import com.jennymakki.projectmanager.list.TaskListRepository;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,
            TaskListRepository taskListRepository,
            UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
        this.userRepository = userRepository;
    }

    public Task createTask(Long listId, String title, String description, User user) {

        TaskList list = taskListRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("List not found"));

        if (!list.getBoard().getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("Not owner");
        }

        Task task = new Task(title, description, list);
        return taskRepository.save(task);
    }

    public Page<Task> getTasks(Long listId, User user, Pageable pageable) {

        TaskList list = taskListRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("List not found"));

        if (!list.getBoard().getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("Not owner");
        }

        return taskRepository.findByTaskListId(listId, pageable);
    }

    public Task updateTask(Long taskId,
            String title,
            String description,
            TaskStatus status,
            Long assignedUserId,
            LocalDateTime dueDate,
            User user) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (!task.getTaskList().getBoard().getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("Not owner");
        }

        task.setTitle(title);
        task.setDescription(description);
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

    public void deleteTask(Long taskId, User user) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (!task.getTaskList().getBoard().getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("Not owner");
        }

        taskRepository.delete(task);
    }
}