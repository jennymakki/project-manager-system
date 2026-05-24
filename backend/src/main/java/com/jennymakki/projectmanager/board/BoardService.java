package com.jennymakki.projectmanager.board;

import java.util.List;

import org.springframework.security.access.AccessDeniedException;
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

    public Board getBoardById(Long id, User user) {

        Board board = boardRepository.findById(id)
                .orElseThrow();

        User owner = board.getOwner();

        if (owner == null || !owner.getId().equals(user.getId())) {
            throw new org.springframework.security.access.AccessDeniedException("Not owner");
        }

        return board;
    }

    public Board updateBoard(Long id, String name, User user) {

        Board board = boardRepository.findById(id)
                .orElseThrow();

        if (!board.getOwner().getEmail().equals(user.getEmail())) {
            throw new AccessDeniedException("Not owner");
        }

        board.setName(name);

        return boardRepository.save(board);
    }
}