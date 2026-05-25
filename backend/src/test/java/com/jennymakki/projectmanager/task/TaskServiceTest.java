package com.jennymakki.projectmanager.task;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.jennymakki.projectmanager.board.Board;
import com.jennymakki.projectmanager.board.BoardRepository;
import com.jennymakki.projectmanager.list.TaskList;
import com.jennymakki.projectmanager.list.TaskListRepository;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@SpringBootTest
@Transactional
class TaskServiceTest {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldAssignUserToTask() {

        User owner = userRepository.save(new User("owner@test.com", "pw"));
        User assignee = userRepository.save(new User("user@test.com", "pw"));

        Board board = boardRepository.save(new Board("Board", owner));
        TaskList list = taskListRepository.save(new TaskList("List", board));

        Task task = taskRepository.save(new Task("Task", "Desc", list));

        Task updated = taskService.updateTask(
                task.getId(),
                "Task",
                "Desc",
                TaskStatus.TODO,
                assignee.getId(),
                null,
                owner
        );

        assertNotNull(updated.getAssignedTo());
        assertEquals(assignee.getId(), updated.getAssignedTo().getId());
    }

    @Test
    void shouldRejectPastDueDate() {

        User owner = userRepository.save(new User("owner@test.com", "pw"));

        Board board = boardRepository.save(new Board("Board", owner));
        TaskList list = taskListRepository.save(new TaskList("List", board));

        Task task = taskRepository.save(new Task("Task", "Desc", list));

        LocalDateTime pastDate = LocalDateTime.now().minusDays(1);

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> taskService.updateTask(
                        task.getId(),
                        "Task",
                        "Desc",
                        TaskStatus.TODO,
                        null,
                        pastDate,
                        owner
                )
        );

        assertEquals("Due date cannot be in the past", ex.getMessage());
    }

    @Test
    void shouldThrowWhenUserNotOwner() {

        User owner = userRepository.save(new User("owner@test.com", "pw"));
        User hacker = userRepository.save(new User("hacker@test.com", "pw"));

        Board board = boardRepository.save(new Board("Board", owner));
        TaskList list = taskListRepository.save(new TaskList("List", board));

        Task task = taskRepository.save(new Task("Task", "Desc", list));

        assertThrows(
                org.springframework.security.access.AccessDeniedException.class,
                () -> taskService.updateTask(
                        task.getId(),
                        "Hacked",
                        "Hacked",
                        TaskStatus.DONE,
                        null,
                        null,
                        hacker
                )
        );
    }
}