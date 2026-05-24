package com.jennymakki.projectmanager.list;

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

import com.jennymakki.projectmanager.board.Board;
import com.jennymakki.projectmanager.board.BoardRepository;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
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

    @BeforeEach
    void setUp() {
        taskListRepository.deleteAll();
        boardRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    @WithMockUser(username = "alice@test.com")
    void shouldCreateTaskList_whenOwner() throws Exception {

        User user = userRepository.save(new User("alice@test.com", "password"));
        Board board = boardRepository.save(new Board("Board", user));

        String body = """
                    {
                        "name": "To Do"
                    }
                """;

        mockMvc.perform(post("/boards/" + board.getId() + "/lists")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("To Do"));
    }

    @Test
    @WithMockUser(username = "alice@test.com")
    void shouldGetListsForBoard() throws Exception {

        User user = userRepository.save(new User("alice@test.com", "password"));
        Board board = boardRepository.save(new Board("Board", user));

        taskListRepository.save(new TaskList("List 1", board));
        taskListRepository.save(new TaskList("List 2", board));

        mockMvc.perform(get("/boards/" + board.getId() + "/lists"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    @WithMockUser(username = "bob@test.com")
    void shouldReturnForbidden_whenNotBoardOwner() throws Exception {

        User owner = userRepository.save(new User("alice@test.com", "password"));
        User other = userRepository.save(new User("bob@test.com", "password"));

        Board board = boardRepository.save(new Board("Board", owner));

        String body = """
                    {
                        "name": "Hack attempt"
                    }
                """;

        mockMvc.perform(post("/boards/" + board.getId() + "/lists")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldReturnUnauthorized_whenNoAuth() throws Exception {

        mockMvc.perform(get("/boards/1/lists"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "alice@test.com")
    void shouldUpdateTaskList_whenBoardOwner() throws Exception {

        User user = userRepository.save(
                new User("alice@test.com", "password"));

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
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Name"));
    }

    @Test
    @WithMockUser(username = "bob@test.com")
    void shouldReturnForbidden_whenNotBoardOwnerUpdatingList() throws Exception {

        User owner = userRepository.save(
                new User("alice@test.com", "password"));

        User other = userRepository.save(
                new User("bob@test.com", "password"));

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
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldReturnUnauthorized_whenNoAuthUpdatingList() throws Exception {

        String body = """
                    {
                        "name": "Updated"
                    }
                """;

        mockMvc.perform(put("/boards/1/lists/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isUnauthorized());
    }
}
