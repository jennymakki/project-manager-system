package com.jennymakki.projectmanager.board;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@DataJpaTest
class BoardRepositoryTest {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldFindBoardsByOwner() {

        User user1 = userRepository.save(new User("alice@test.com", "password"));
        User user2 = userRepository.save(new User("bob@test.com", "password"));

        Board board1 = new Board("Board 1", user1);
        Board board2 = new Board("Board 2", user1);
        Board board3 = new Board("Board 3", user2);

        boardRepository.save(board1);
        boardRepository.save(board2);
        boardRepository.save(board3);

        List<Board> result = boardRepository.findByOwner(user1);

        assertThat(result).hasSize(2);
        assertThat(result)
                .extracting(Board::getName)
                .containsExactlyInAnyOrder("Board 1", "Board 2");
    }
}