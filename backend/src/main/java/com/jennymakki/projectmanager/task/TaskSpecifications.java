package com.jennymakki.projectmanager.task;

import com.jennymakki.projectmanager.user.User;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

public class TaskSpecifications {

    public static Specification<Task> hasStatus(TaskStatus status) {
        return (root, query, cb) -> status == null
                ? null
                : cb.equal(root.get("status"), status);
    }

    public static Specification<Task> dueAfter(LocalDateTime from) {
        return (root, query, cb) -> from == null
                ? null
                : cb.greaterThanOrEqualTo(root.get("dueDate"), from);
    }

    public static Specification<Task> dueBefore(LocalDateTime to) {
        return (root, query, cb) -> to == null
                ? null
                : cb.lessThanOrEqualTo(root.get("dueDate"), to);
    }
    public static Specification<Task> belongsToUser(User user) {
        if (user == null) {
            return null;
        }
        return (root, query, cb) ->
                cb.equal(
                        root.get("taskList")
                                .get("board")
                                .get("owner")
                                .get("id"),
                        user.getId());
    }

    public static Specification<Task> titleContains(String search) {
        return (root, query, cb) -> search == null || search.isBlank()
                ? null
                : cb.like(
                        cb.lower(root.get("title")),
                        "%" + search.toLowerCase() + "%");
    }

}