package com.jennymakki.projectmanager.comment;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.jennymakki.projectmanager.board.Board;
import com.jennymakki.projectmanager.board.BoardRepository;
import com.jennymakki.projectmanager.comment.dto.CommentResponse;
import com.jennymakki.projectmanager.comment.dto.CreateCommentRequest;
import com.jennymakki.projectmanager.list.TaskList;
import com.jennymakki.projectmanager.list.TaskListRepository;
import com.jennymakki.projectmanager.task.Task;
import com.jennymakki.projectmanager.task.TaskRepository;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@SpringBootTest
@Transactional
class CommentServiceTest {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Test
    void shouldAddCommentToTask() {

        User user = userRepository.save(new User("alice@test.com", "pw"));

        Board board = boardRepository.save(new Board("Board", user));

        TaskList list = taskListRepository.save(new TaskList("List", board));

        Task task = taskRepository.save(new Task("Task", "Desc", list));

        CreateCommentRequest request =
                new CreateCommentRequest("Nice task");

        CommentResponse response =
                commentService.addComment(task.getId(), request, user);

        assertEquals("Nice task", response.content());
    }

    @Test
    void shouldThrowWhenCommentIsEmpty() {

        User user = userRepository.save(new User("alice@test.com", "pw"));

        Board board = boardRepository.save(new Board("Board", user));

        TaskList list = taskListRepository.save(new TaskList("List", board));

        Task task = taskRepository.save(new Task("Task", "Desc", list));

        CreateCommentRequest request =
                new CreateCommentRequest("");

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> commentService.addComment(task.getId(), request, user)
        );

        assertEquals("Comment cannot be empty", ex.getMessage());
    }

    @Test
    void shouldGetCommentsForTask() {

        User user = userRepository.save(new User("alice@test.com", "pw"));

        Board board = boardRepository.save(new Board("Board", user));

        TaskList list = taskListRepository.save(new TaskList("List", board));

        Task task = taskRepository.save(new Task("Task", "Desc", list));

        commentRepository.save(
                new Comment(
                        null,
                        "Comment 1",
                        task,
                        user,
                        java.time.LocalDateTime.now()
                )
        );

        commentRepository.save(
                new Comment(
                        null,
                        "Comment 2",
                        task,
                        user,
                        java.time.LocalDateTime.now()
                )
        );

        List<CommentResponse> comments =
                commentService.getCommentsByTask(task.getId());

        assertEquals(2, comments.size());
    }

    @Test
    void shouldDeleteOwnComment() {

        User user = userRepository.save(new User("alice@test.com", "pw"));

        Board board = boardRepository.save(new Board("Board", user));

        TaskList list = taskListRepository.save(new TaskList("List", board));

        Task task = taskRepository.save(new Task("Task", "Desc", list));

        Comment comment = commentRepository.save(
                new Comment(
                        null,
                        "Comment",
                        task,
                        user,
                        java.time.LocalDateTime.now()
                )
        );

        commentService.deleteComment(comment.getId(), user);

        assertEquals(false,
                commentRepository.findById(comment.getId()).isPresent());
    }

    @Test
    void shouldThrowWhenDeletingOthersComment() {

        User owner = userRepository.save(new User("owner@test.com", "pw"));

        User hacker = userRepository.save(new User("hacker@test.com", "pw"));

        Board board = boardRepository.save(new Board("Board", owner));

        TaskList list = taskListRepository.save(new TaskList("List", board));

        Task task = taskRepository.save(new Task("Task", "Desc", list));

        Comment comment = commentRepository.save(
                new Comment(
                        null,
                        "Secret",
                        task,
                        owner,
                        java.time.LocalDateTime.now()
                )
        );

        assertThrows(
                org.springframework.security.access.AccessDeniedException.class,
                () -> commentService.deleteComment(comment.getId(), hacker)
        );
    }
}