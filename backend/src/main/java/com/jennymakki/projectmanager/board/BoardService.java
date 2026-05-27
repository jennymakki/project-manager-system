package com.jennymakki.projectmanager.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found"));

        User owner = board.getOwner();

        if (owner == null || !owner.getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not owner");
        }

        return board;
    }

    public Board updateBoard(Long id, String name, User user) {

        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Board not found"));

        if (!board.getOwner().getEmail().equals(user.getEmail())) {
            throw new AccessDeniedException("Not owner");
        }

        board.setName(name);

        return boardRepository.save(board);
    }

    public void deleteBoard(Long id, User user) {

        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Board not found"));

        if (!board.getOwner().getEmail().equals(user.getEmail())) {
            throw new AccessDeniedException("Not owner");
        }

        boardRepository.delete(board);
    }
}