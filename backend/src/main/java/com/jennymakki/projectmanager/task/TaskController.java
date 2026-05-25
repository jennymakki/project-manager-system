package com.jennymakki.projectmanager.task;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.jennymakki.projectmanager.task.dto.CreateTaskRequest;
import com.jennymakki.projectmanager.task.dto.TaskDto;
import com.jennymakki.projectmanager.task.dto.UpdateTaskRequest;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@RestController
public class TaskController {

        private final TaskService taskService;
        private final UserRepository userRepository;

        public TaskController(TaskService taskService,
                        UserRepository userRepository) {
                this.taskService = taskService;
                this.userRepository = userRepository;
        }

        @PostMapping("/lists/{listId}/tasks")
        @ResponseStatus(HttpStatus.CREATED)
        public TaskDto createTask(
                        @PathVariable Long listId,
                        @RequestBody CreateTaskRequest request,
                        Authentication auth) {

                User user = userRepository.findByEmail(auth.getName())
                                .orElseThrow(() -> new RuntimeException("User not found"));

                return TaskDto.from(
                                taskService.createTask(listId, request.getTitle(), request.getDescription(), user));
        }

        @GetMapping("/lists/{listId}/tasks")
        public Page<TaskDto> getTasks(
                        @PathVariable Long listId,

                        @RequestParam(required = false) TaskStatus status,

                        @RequestParam(required = false) LocalDateTime from,

                        @RequestParam(required = false) LocalDateTime to,

                        @RequestParam(required = false) String search,

                        Pageable pageable,

                        Authentication auth) {

                User user = userRepository.findByEmail(auth.getName())
                                .orElseThrow(() -> new RuntimeException("User not found"));

                return taskService.getTasks(
                                listId,
                                search,
                                status,
                                from,
                                to,
                                user,
                                pageable)
                                .map(TaskDto::from);
        }

        @PutMapping("/tasks/{taskId}")
        public TaskDto updateTask(
                        @PathVariable Long taskId,
                        @RequestBody UpdateTaskRequest request,
                        Authentication auth) {
                User user = userRepository.findByEmail(auth.getName())
                                .orElseThrow(() -> new RuntimeException("User not found"));

                return TaskDto.from(
                                taskService.updateTask(
                                                taskId,
                                                request.getTitle(),
                                                request.getDescription(),
                                                request.getStatus(),
                                                request.getAssignedUserId(),
                                                request.getDueDate(),
                                                user));
        }

        @DeleteMapping("/tasks/{taskId}")
        @ResponseStatus(HttpStatus.NO_CONTENT)
        public void deleteTask(
                        @PathVariable Long taskId,
                        Authentication auth) {

                User user = userRepository.findByEmail(auth.getName())
                                .orElseThrow(() -> new RuntimeException("User not found"));

                taskService.deleteTask(taskId, user);
        }
}