package com.jennymakki.projectmanager.board;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jennymakki.projectmanager.user.User;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public List<Board> getBoardsForUser(User user) {
        return boardRepository.findByOwner(user);
    }

    public Board createBoard(String name, User owner) {

    Board board = new Board(name, owner);

    return boardRepository.save(board);
}

}