package com.jennymakki.projectmanager.task;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.jennymakki.projectmanager.comment.Comment;
import com.jennymakki.projectmanager.list.TaskList;
import com.jennymakki.projectmanager.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.TODO;

    @ManyToOne
    private TaskList taskList;

    @ManyToOne
    private User assignedTo;

    private LocalDateTime dueDate;

    @OneToMany(mappedBy = "task", orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public void setTaskList(TaskList taskList) {
    this.taskList = taskList;
}

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public Task() {
    }

    public Task(String title, String description, TaskList taskList) {
        this.title = title;
        this.description = description;
        this.taskList = taskList;
        this.status = TaskStatus.TODO;
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

    public TaskStatus getStatus() {
        return status;
    }

    public TaskList getTaskList() {
        return taskList;
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

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
