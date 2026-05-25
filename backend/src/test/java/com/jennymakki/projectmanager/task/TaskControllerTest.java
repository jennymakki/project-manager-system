package com.jennymakki.projectmanager.task;

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
import org.springframework.transaction.annotation.Transactional;

import com.jennymakki.projectmanager.board.Board;
import com.jennymakki.projectmanager.board.BoardRepository;
import com.jennymakki.projectmanager.list.TaskList;
import com.jennymakki.projectmanager.list.TaskListRepository;
import com.jennymakki.projectmanager.security.JwtService;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class TaskControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private BoardRepository boardRepository;

        @Autowired
        private TaskListRepository taskListRepository;

        @Autowired
        private TaskRepository taskRepository;

        @Autowired
        private JwtService jwtService;

        private String token(User user) {
                return jwtService.generateToken(user.getId(), user.getEmail());
        }

        @Test
        void shouldCreateTask() throws Exception {

                User user = userRepository.save(new User("alice@test.com", "password"));
                String jwt = token(user);

                Board board = boardRepository.save(new Board("Board", user));
                TaskList list = taskListRepository.save(new TaskList("List", board));

                String body = """
                                {
                                    "title": "My Task",
                                    "description": "Some desc"
                                }
                                """;

                mockMvc.perform(post("/lists/" + list.getId() + "/tasks")
                                .header("Authorization", "Bearer " + jwt)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.title").value("My Task"))
                                .andExpect(jsonPath("$.status").value("TODO"));
        }

        @Test
        void shouldGetTasks() throws Exception {

                User user = userRepository.save(new User("alice@test.com", "password"));
                String jwt = token(user);

                Board board = boardRepository.save(new Board("Board", user));
                TaskList list = taskListRepository.save(new TaskList("List", board));

                taskRepository.save(new Task("T1", "D1", list));
                taskRepository.save(new Task("T2", "D2", list));

                mockMvc.perform(get("/lists/" + list.getId() + "/tasks")
                                .header("Authorization", "Bearer " + jwt))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.length()").value(2));
        }

        @Test
        void shouldUpdateTask() throws Exception {

                User user = userRepository.save(new User("alice@test.com", "password"));
                String jwt = token(user);

                Board board = boardRepository.save(new Board("Board", user));
                TaskList list = taskListRepository.save(new TaskList("List", board));

                Task task = taskRepository.save(new Task("Old Title", "Old Desc", list));

                String body = """
                                {
                                    "title": "New Title",
                                    "description": "New Desc",
                                    "status": "DONE"
                                }
                                """;

                mockMvc.perform(put("/tasks/" + task.getId())
                                .header("Authorization", "Bearer " + jwt)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.title").value("New Title"))
                                .andExpect(jsonPath("$.status").value("DONE"));
        }

        @Test
        void shouldDeleteTask() throws Exception {

                User user = userRepository.save(new User("alice@test.com", "password"));
                String jwt = token(user);

                Board board = boardRepository.save(new Board("Board", user));
                TaskList list = taskListRepository.save(new TaskList("List", board));

                Task task = taskRepository.save(new Task("Task", "Desc", list));

                mockMvc.perform(delete("/tasks/" + task.getId())
                                .header("Authorization", "Bearer " + jwt))
                                .andExpect(status().isNoContent());
        }

        @Test
        void shouldReturnForbidden_whenNotOwner() throws Exception {

                User owner = userRepository.save(new User("alice@test.com", "password"));
                User bob = userRepository.save(new User("bob@test.com", "password"));

                String jwt = token(bob);

                Board board = boardRepository.save(new Board("Board", owner));
                TaskList list = taskListRepository.save(new TaskList("List", board));

                Task task = taskRepository.save(new Task("Task", "Desc", list));

                String body = """
                                {
                                    "title": "Hack",
                                    "description": "Try",
                                    "status": "DONE"
                                }
                                """;

                mockMvc.perform(put("/tasks/" + task.getId())
                                .header("Authorization", "Bearer " + jwt)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body))
                                .andExpect(status().isForbidden());
        }

        @Test
        void shouldReturnUnauthorized_whenNoAuth() throws Exception {

                mockMvc.perform(get("/lists/1/tasks"))
                                .andExpect(status().isUnauthorized());
        }
}