package com.jennymakki.projectmanager.board;

import org.junit.jupiter.api.BeforeEach;
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

import com.jennymakki.projectmanager.security.JwtService;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BoardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        boardRepository.deleteAll();
        userRepository.deleteAll();
    }

    private String token(User user) {
        return jwtService.generateToken(user.getId(), user.getEmail());
    }

    @Test
    void shouldCreateBoard() throws Exception {

        User user = userRepository.save(
                new User("alice@test.com", "password"));

        String jwt = token(user);

        String requestBody = """
        {
            "name": "Project Board"
        }
        """;

        mockMvc.perform(post("/boards")
                .header("Authorization", "Bearer " + jwt)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isCreated());
    }

    @Test
    void shouldGetBoardsForUser() throws Exception {

        User user = userRepository.save(
                new User("alice@test.com", "password"));

        String jwt = token(user);

        boardRepository.save(new Board("Board 1", user));
        boardRepository.save(new Board("Board 2", user));

        mockMvc.perform(get("/boards")
                .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").exists())
                .andExpect(jsonPath("$[1].name").exists());
    }

    @Test
    void shouldGetBoardById_whenOwner() throws Exception {

        User user = userRepository.save(
                new User("alice@test.com", "password"));

        String jwt = token(user);

        Board board = boardRepository.save(
                new Board("My Board", user));

        mockMvc.perform(get("/boards/" + board.getId())
                .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("My Board"))
                .andExpect(jsonPath("$.id").value(board.getId()));
    }

    @Test
    void shouldReturnForbidden_whenNotOwner() throws Exception {

        User owner = userRepository.save(
                new User("alice@test.com", "password"));

        User otherUser = userRepository.save(
                new User("bob@test.com", "password"));

        String jwt = token(otherUser);

        Board board = boardRepository.save(
                new Board("Secret Board", owner));

        mockMvc.perform(get("/boards/" + board.getId())
                .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldReturnUnauthorized_whenNoAuth() throws Exception {

        mockMvc.perform(get("/boards/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldUpdateBoard_whenOwner() throws Exception {

        User user = userRepository.save(
                new User("alice@test.com", "password"));

        String jwt = token(user);

        Board board = boardRepository.save(
                new Board("Old Name", user));

        String requestBody = """
        {
            "name": "Updated Name"
        }
        """;

        mockMvc.perform(put("/boards/" + board.getId())
                .header("Authorization", "Bearer " + jwt)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Name"))
                .andExpect(jsonPath("$.id").value(board.getId()));
    }

    @Test
    void shouldReturnForbidden_whenNotOwnerUpdating() throws Exception {

        User owner = userRepository.save(
                new User("alice@test.com", "password"));

        User otherUser = userRepository.save(
                new User("bob@test.com", "password"));

        String jwt = token(otherUser);

        Board board = boardRepository.save(
                new Board("Secret Board", owner));

        String requestBody = """
        {
            "name": "Hacked Name"
        }
        """;

        mockMvc.perform(put("/boards/" + board.getId())
                .header("Authorization", "Bearer " + jwt)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldDeleteBoard_whenOwner() throws Exception {

        User user = userRepository.save(
                new User("alice@test.com", "password"));

        String jwt = token(user);

        Board board = boardRepository.save(
                new Board("To Delete", user));

        mockMvc.perform(delete("/boards/" + board.getId())
                .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isNoContent());
    }

    @Test
    void shouldReturnForbidden_whenNotOwnerDeleting() throws Exception {

        User owner = userRepository.save(
                new User("alice@test.com", "password"));

        User otherUser = userRepository.save(
                new User("bob@test.com", "password"));

        String jwt = token(otherUser);

        Board board = boardRepository.save(
                new Board("Secret Board", owner));

        mockMvc.perform(delete("/boards/" + board.getId())
                .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldReturnUnauthorized_whenNoAuthDeleting() throws Exception {

        mockMvc.perform(delete("/boards/1"))
                .andExpect(status().isUnauthorized());
    }
}