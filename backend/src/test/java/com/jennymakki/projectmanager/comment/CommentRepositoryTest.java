package com.jennymakki.projectmanager.comment;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.jennymakki.projectmanager.board.Board;
import com.jennymakki.projectmanager.board.BoardRepository;
import com.jennymakki.projectmanager.list.TaskList;
import com.jennymakki.projectmanager.list.TaskListRepository;
import com.jennymakki.projectmanager.task.Task;
import com.jennymakki.projectmanager.task.TaskRepository;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@DataJpaTest
class CommentRepositoryTest {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void shouldFindCommentsByTaskId() {

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
                        LocalDateTime.now()
                )
        );

        commentRepository.save(
                new Comment(
                        null,
                        "Comment 2",
                        task,
                        user,
                        LocalDateTime.now()
                )
        );

        List<Comment> comments = commentRepository.findByTaskId(task.getId());

        assertThat(comments).hasSize(2);
    }
}