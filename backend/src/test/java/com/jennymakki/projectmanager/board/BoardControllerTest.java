package com.jennymakki.projectmanager.board;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

    @BeforeEach
    void setUp() {
        boardRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    @WithMockUser(username = "alice@test.com")
    void shouldCreateBoard() throws Exception {

        User user = new User("alice@test.com", "password");
        userRepository.save(user);

        String requestBody = """
                {
                    "name": "Project Board"
                }
                """;

        mockMvc.perform(post("/boards")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(username = "alice@test.com")
    void shouldGetBoardsForUser() throws Exception {

        User user = new User("alice@test.com", "password");
        userRepository.save(user);

        Board board1 = new Board("Board 1", user);
        Board board2 = new Board("Board 2", user);

        boardRepository.save(board1);
        boardRepository.save(board2);

        mockMvc.perform(get("/boards"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").exists())
                .andExpect(jsonPath("$[1].name").exists());
    }

    @Test
    @WithMockUser(username = "alice@test.com")
    void shouldGetBoardById_whenOwner() throws Exception {

        User user = new User("alice@test.com", "password");
        userRepository.save(user);

        Board board = new Board("My Board", user);
        board = boardRepository.save(board);

        mockMvc.perform(get("/boards/" + board.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("My Board"))
                .andExpect(jsonPath("$.id").value(board.getId()));
    }

    @Test
    @WithMockUser(username = "bob@test.com")
    void shouldReturnForbidden_whenNotOwner() throws Exception {

        User owner = new User("alice@test.com", "password");
        userRepository.save(owner);

        User otherUser = new User("bob@test.com", "password");
        userRepository.save(otherUser);

        Board board = new Board("Secret Board", owner);
        board = boardRepository.save(board);

        mockMvc.perform(get("/boards/" + board.getId()))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldReturnUnauthorized_whenNoAuth() throws Exception {

        mockMvc.perform(get("/boards/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "alice@test.com")
    void shouldUpdateBoard_whenOwner() throws Exception {

        User user = new User("alice@test.com", "password");
        userRepository.save(user);

        Board board = new Board("Old Name", user);
        board = boardRepository.save(board);

        String requestBody = """
                {
                    "name": "Updated Name"
                }
                """;

        mockMvc.perform(put("/boards/" + board.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Name"))
                .andExpect(jsonPath("$.id").value(board.getId()));
    }

    @Test
    @WithMockUser(username = "bob@test.com")
    void shouldReturnForbidden_whenNotOwnerUpdating() throws Exception {

        User owner = new User("alice@test.com", "password");
        userRepository.save(owner);

        User otherUser = new User("bob@test.com", "password");
        userRepository.save(otherUser);

        Board board = new Board("Secret Board", owner);
        board = boardRepository.save(board);

        String requestBody = """
                {
                    "name": "Hacked Name"
                }
                """;

        mockMvc.perform(put("/boards/" + board.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isForbidden());
    }
}