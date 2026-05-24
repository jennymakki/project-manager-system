package com.jennymakki.projectmanager.task;

import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.jennymakki.projectmanager.list.TaskList;
import com.jennymakki.projectmanager.list.TaskListRepository;
import com.jennymakki.projectmanager.user.User;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    public TaskService(TaskRepository taskRepository,
            TaskListRepository taskListRepository) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    public Task createTask(Long listId, String title, String description, User user) {

        TaskList list = taskListRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (!list.getBoard().getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("Not owner");
        }

        Task task = new Task(title, description, list);
        return taskRepository.save(task);
    }

    public List<Task> getTasks(Long listId, User user) {

        TaskList list = taskListRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (!list.getBoard().getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("Not owner");
        }

        return taskRepository.findByTaskListId(listId);
    }

    public Task updateTask(Long taskId, String title, String description, TaskStatus status, User user) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (!task.getTaskList().getBoard().getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("Not owner");
        }

        task.setTitle(title);
        task.setDescription(description);
        task.setStatus(status);

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