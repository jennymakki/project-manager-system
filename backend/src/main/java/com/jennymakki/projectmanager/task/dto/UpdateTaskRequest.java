package com.jennymakki.projectmanager.task.dto;

import java.time.LocalDateTime;

import com.jennymakki.projectmanager.task.TaskStatus;

public class UpdateTaskRequest {

    private String title;
    private String description;
    private TaskStatus status;
    private Long assignedUserId;
    private LocalDateTime dueDate;

    public Long getAssignedUserId() {
        return assignedUserId;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public UpdateTaskRequest() {
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    private Long taskListId;

    public Long getTaskListId() {
        return taskListId;
    }

    public void setTaskListId(Long taskListId) {
        this.taskListId = taskListId;
    }
}