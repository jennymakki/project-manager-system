package com.jennymakki.projectmanager.list;

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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.jennymakki.projectmanager.board.Board;
import com.jennymakki.projectmanager.board.BoardRepository;
import com.jennymakki.projectmanager.security.JwtService;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
class TaskListControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private JwtService jwtService;

    private String token(User user) {
        return jwtService.generateToken(user.getId(), user.getEmail());
    }

    @Test
    void shouldCreateTaskList_whenOwner() throws Exception {

        User user = userRepository.save(
                new User("alice@test.com", "password"));

        String jwt = token(user);

        Board board = boardRepository.save(
                new Board("Board", user));

        String body = """
        {
            "name": "To Do"
        }
        """;

        mockMvc.perform(post("/boards/" + board.getId() + "/lists")
                .header("Authorization", "Bearer " + jwt)
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("To Do"));
    }

    @Test
    void shouldGetListsForBoard() throws Exception {

        User user = userRepository.save(
                new User("alice@test.com", "password"));

        String jwt = token(user);

        Board board = boardRepository.save(
                new Board("Board", user));

        taskListRepository.save(new TaskList("List 1", board));
        taskListRepository.save(new TaskList("List 2", board));

        mockMvc.perform(get("/boards/" + board.getId() + "/lists")
                .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void shouldReturnForbidden_whenNotBoardOwner() throws Exception {

        User owner = userRepository.save(
                new User("alice@test.com", "password"));

        User bob = userRepository.save(
                new User("bob@test.com", "password"));

        String jwt = token(bob);

        Board board = boardRepository.save(
                new Board("Board", owner));

        String body = """
        {
            "name": "Hack attempt"
        }
        """;

        mockMvc.perform(post("/boards/" + board.getId() + "/lists")
                .header("Authorization", "Bearer " + jwt)
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldReturnUnauthorized_whenNoAuth() throws Exception {

        mockMvc.perform(get("/boards/999/lists"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldUpdateTaskList_whenBoardOwner() throws Exception {

        User user = userRepository.save(
                new User("alice@test.com", "password"));

        String jwt = token(user);

        Board board = boardRepository.save(
                new Board("Board", user));

        TaskList list = taskListRepository.save(
                new TaskList("Old Name", board));

        String body = """
        {
            "name": "Updated Name"
        }
        """;

        mockMvc.perform(put("/boards/" + board.getId() + "/lists/" + list.getId())
                .header("Authorization", "Bearer " + jwt)
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Name"));
    }

    @Test
    void shouldReturnForbidden_whenNotBoardOwnerUpdatingList() throws Exception {

        User owner = userRepository.save(
                new User("alice@test.com", "password"));

        User bob = userRepository.save(
                new User("bob@test.com", "password"));

        String jwt = token(bob);

        Board board = boardRepository.save(
                new Board("Board", owner));

        TaskList list = taskListRepository.save(
                new TaskList("Secret List", board));

        String body = """
        {
            "name": "Hacked"
        }
        """;

        mockMvc.perform(put("/boards/" + board.getId() + "/lists/" + list.getId())
                .header("Authorization", "Bearer " + jwt)
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldReturnUnauthorized_whenNoAuthUpdatingList() throws Exception {

        mockMvc.perform(put("/boards/999/lists/999")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                {
                    "name": "Updated"
                }
                """))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldDeleteTaskList_whenBoardOwner() throws Exception {

        User user = userRepository.save(
                new User("alice@test.com", "password"));

        String jwt = token(user);

        Board board = boardRepository.save(
                new Board("Board", user));

        TaskList list = taskListRepository.save(
                new TaskList("To Delete", board));

        mockMvc.perform(delete("/boards/" + board.getId() + "/lists/" + list.getId())
                .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isNoContent());
    }

    @Test
    void shouldReturnForbidden_whenNotBoardOwnerDeletingList() throws Exception {

        User owner = userRepository.save(
                new User("alice@test.com", "password"));

        User bob = userRepository.save(
                new User("bob@test.com", "password"));

        String jwt = token(bob);

        Board board = boardRepository.save(
                new Board("Board", owner));

        TaskList list = taskListRepository.save(
                new TaskList("Secret", board));

        mockMvc.perform(delete("/boards/" + board.getId() + "/lists/" + list.getId())
                .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldReturnUnauthorized_whenNoAuthDeletingList() throws Exception {

        mockMvc.perform(delete("/boards/999/lists/999"))
                .andExpect(status().isUnauthorized());
    }
}