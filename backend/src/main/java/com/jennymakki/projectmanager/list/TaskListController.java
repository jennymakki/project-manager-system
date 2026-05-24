package com.jennymakki.projectmanager.list;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.jennymakki.projectmanager.list.dto.CreateTaskListRequest;
import com.jennymakki.projectmanager.list.dto.TaskListDto;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@RestController
@RequestMapping("/boards/{boardId}/lists")
public class TaskListController {

    private final TaskListService taskListService;
    private final UserRepository userRepository;

    public TaskListController(TaskListService taskListService,
            UserRepository userRepository) {
        this.taskListService = taskListService;
        this.userRepository = userRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskListDto create(
            @PathVariable Long boardId,
            @RequestBody CreateTaskListRequest request,
            Authentication auth) {

        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow();

        TaskList list = taskListService.createList(boardId, request.getName(), user);

        return TaskListDto.from(list);
    }

    @GetMapping
    public List<TaskListDto> getAll(
            @PathVariable Long boardId,
            Authentication auth) {

        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow();

        return taskListService.getLists(boardId, user)
                .stream()
                .map(TaskListDto::from)
                .toList();
    }
}