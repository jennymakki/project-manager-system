package com.jennymakki.projectmanager.list.dto;

import com.jennymakki.projectmanager.list.TaskList;

public class TaskListDto {

    private Long id;
    private String name;

    public TaskListDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static TaskListDto from(TaskList list) {
        return new TaskListDto(list.getId(), list.getName());
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}