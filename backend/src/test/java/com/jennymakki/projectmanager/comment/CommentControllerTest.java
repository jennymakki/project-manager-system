package com.jennymakki.projectmanager.comment;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.transaction.annotation.Transactional;

import com.jennymakki.projectmanager.board.Board;
import com.jennymakki.projectmanager.board.BoardRepository;
import com.jennymakki.projectmanager.list.TaskList;
import com.jennymakki.projectmanager.list.TaskListRepository;
import com.jennymakki.projectmanager.security.JwtService;
import com.jennymakki.projectmanager.task.Task;
import com.jennymakki.projectmanager.task.TaskRepository;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class CommentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

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

    private String token(User user) {
        return jwtService.generateToken(user.getId(), user.getEmail());
    }

    @Test
    void shouldCreateComment() throws Exception {

        User user = userRepository.save(new User("alice@test.com", "pw"));

        String jwt = token(user);

        Board board = boardRepository.save(new Board("Board", user));

        TaskList list = taskListRepository.save(new TaskList("List", board));

        Task task = taskRepository.save(new Task("Task", "Desc", list));

        String body = """
                {
                    "content": "Nice comment"
                }
                """;

        mockMvc.perform(post("/tasks/" + task.getId() + "/comments")
                        .header("Authorization", "Bearer " + jwt)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated());
    }

    @Test
    void shouldGetComments() throws Exception {

        User user = userRepository.save(new User("alice@test.com", "pw"));

        String jwt = token(user);

        Board board = boardRepository.save(new Board("Board", user));

        TaskList list = taskListRepository.save(new TaskList("List", board));

        Task task = taskRepository.save(new Task("Task", "Desc", list));

        commentRepository.save(
                new Comment(
                        null,
                        "Comment",
                        task,
                        user,
                        LocalDateTime.now()
                )
        );

        mockMvc.perform(get("/tasks/" + task.getId() + "/comments")
                        .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isOk());
    }

    @Test
    void shouldDeleteComment() throws Exception {

        User user = userRepository.save(new User("alice@test.com", "pw"));

        String jwt = token(user);

        Board board = boardRepository.save(new Board("Board", user));

        TaskList list = taskListRepository.save(new TaskList("List", board));

        Task task = taskRepository.save(new Task("Task", "Desc", list));

        Comment comment = commentRepository.save(
                new Comment(
                        null,
                        "Comment",
                        task,
                        user,
                        LocalDateTime.now()
                )
        );

        mockMvc.perform(delete("/comments/" + comment.getId())
                        .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isNoContent());
    }

    @Test
    void shouldReturnUnauthorizedWhenNoAuth() throws Exception {

        mockMvc.perform(get("/tasks/1/comments"))
                .andExpect(status().isUnauthorized());
    }
}