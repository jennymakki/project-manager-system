package com.jennymakki.projectmanager.board;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@DataJpaTest
class BoardServiceTest {

    private BoardService boardService;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        boardService = new BoardService(boardRepository);
    }

    @Test
    void shouldReturnBoardsForSpecificUser() {

        User user1 = userRepository.save(new User("alice@test.com", "password"));
        User user2 = userRepository.save(new User("bob@test.com", "password"));

        boardRepository.save(new Board("Board 1", user1));
        boardRepository.save(new Board("Board 2", user1));
        boardRepository.save(new Board("Board 3", user2));

        List<Board> result = boardService.getBoardsForUser(user1);

        assertThat(result).hasSize(2);
    }
}