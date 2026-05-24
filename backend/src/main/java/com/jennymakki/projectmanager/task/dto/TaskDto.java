package com.jennymakki.projectmanager.task.dto;

import com.jennymakki.projectmanager.task.Task;

public class TaskDto {

    private Long id;
    private String title;
    private String description;
    private String status;
    private Long taskListId;

    public TaskDto(Long id, String title, String description, String status, Long taskListId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.taskListId = taskListId;
    }

    public static TaskDto from(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus().name(),
                task.getTaskList().getId()
        );
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public Long getTaskListId() { return taskListId; }
}