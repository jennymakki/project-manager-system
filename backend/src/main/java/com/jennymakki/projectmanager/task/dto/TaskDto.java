package com.jennymakki.projectmanager.task.dto;

import com.jennymakki.projectmanager.task.Task;

public class TaskDto {

    private Long id;
    private String title;
    private String description;
    private String status;
    private Long taskListId;

    private Long assignedToId;
    private String dueDate;

    public TaskDto(Long id,
            String title,
            String description,
            String status,
            Long taskListId,
            Long assignedToId,
            String dueDate) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.taskListId = taskListId;
        this.assignedToId = assignedToId;
        this.dueDate = dueDate;
    }

    public static TaskDto from(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus().name(),
                task.getTaskList().getId(),
                task.getAssignedTo() != null ? task.getAssignedTo().getId() : null,
                task.getDueDate() != null ? task.getDueDate().toString() : null);
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public Long getTaskListId() {
        return taskListId;
    }

    public Long getAssignedToId() {
        return assignedToId;
    }

    public String getDueDate() {
        return dueDate;
    }
}