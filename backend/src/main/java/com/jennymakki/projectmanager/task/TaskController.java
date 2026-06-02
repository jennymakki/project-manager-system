package com.jennymakki.projectmanager.task;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.jennymakki.projectmanager.security.AuthUserResolver;
import com.jennymakki.projectmanager.task.dto.CreateTaskRequest;
import com.jennymakki.projectmanager.task.dto.MoveTaskRequest;
import com.jennymakki.projectmanager.task.dto.TaskDto;
import com.jennymakki.projectmanager.task.dto.UpdateTaskRequest;
import com.jennymakki.projectmanager.user.User;

@RestController
public class TaskController {

        private final TaskService taskService;
        private final AuthUserResolver authUserResolver;

        public TaskController(TaskService taskService,
                        AuthUserResolver authUserResolver) {
                this.taskService = taskService;
                this.authUserResolver = authUserResolver;
        }

        @PostMapping("/lists/{listId}/tasks")
        @ResponseStatus(HttpStatus.CREATED)
        public TaskDto createTask(
                        @PathVariable Long listId,
                        @RequestBody CreateTaskRequest request,
                        Authentication auth) {

                User user = authUserResolver.getUser(auth);

                return TaskDto.from(
                                taskService.createTask(listId,
                                                request.getTitle(),
                                                request.getDescription(),
                                                user));
        }

        @GetMapping("/lists/{listId}/tasks")
        public Page<TaskDto> getTasksByList(
                        @PathVariable Long listId,
                        @RequestParam(required = false) TaskStatus status,
                        @RequestParam(required = false) LocalDateTime from,
                        @RequestParam(required = false) LocalDateTime to,
                        @RequestParam(required = false) String search,
                        Pageable pageable,
                        Authentication auth) {

                User user = authUserResolver.getUser(auth);

                return taskService
                                .getTasks(listId, search, status, from, to, user, pageable)
                                .map(TaskDto::from);
        }

        @GetMapping("/boards/{boardId}/tasks")
        public List<TaskDto> getTasksByBoard(
                        @PathVariable Long boardId,
                        Authentication auth) {

                User user = authUserResolver.getUser(auth);

                return taskService.getTasksByBoard(boardId, user)
                                .stream()
                                .map(TaskDto::from)
                                .toList();
        }

        @PutMapping("/tasks/{taskId}")
        public TaskDto updateTask(
                        @PathVariable Long taskId,
                        @RequestBody UpdateTaskRequest request,
                        Authentication auth) {

                User user = authUserResolver.getUser(auth);

                return TaskDto.from(
                                taskService.updateTask(
                                                taskId,
                                                request.getTitle(),
                                                request.getDescription(),
                                                request.getStatus(),
                                                request.getAssignedUserId(),
                                                request.getDueDate(),
                                                request.getTaskListId(),
                                                user));
        }

        @PatchMapping("/tasks/{taskId}/move")
        public TaskDto moveTask(
                        @PathVariable Long taskId,
                        @RequestBody MoveTaskRequest request,
                        Authentication auth) {

                User user = authUserResolver.getUser(auth);

                return TaskDto.from(
                                taskService.moveTask(taskId, request.getTaskListId(), user));
        }

        @DeleteMapping("/tasks/{taskId}")
        @ResponseStatus(HttpStatus.NO_CONTENT)
        public void deleteTask(
                        @PathVariable Long taskId,
                        Authentication auth) {

                User user = authUserResolver.getUser(auth);

                taskService.deleteTask(taskId, user);
        }
}