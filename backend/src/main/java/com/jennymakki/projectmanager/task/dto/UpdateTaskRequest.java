package com.jennymakki.projectmanager.task.dto;

import com.jennymakki.projectmanager.task.TaskStatus;

public class UpdateTaskRequest {

    private String title;
    private String description;
    private TaskStatus status;

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
}