package com.jennymakki.projectmanager.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.jennymakki.projectmanager.board.dto.BoardDto;
import com.jennymakki.projectmanager.board.dto.CreateBoardRequest;
import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@RestController
public class BoardController {

    private final BoardService boardService;
    private final UserRepository userRepository;

    public BoardController(BoardService boardService,
            UserRepository userRepository) {
        this.boardService = boardService;
        this.userRepository = userRepository;
    }

    @PostMapping("/boards")
    @ResponseStatus(HttpStatus.CREATED)
    public Board createBoard(
            @RequestBody CreateBoardRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return boardService.createBoard(request.getName(), user);
    }

    @GetMapping("/boards")
    public List<BoardDto> getBoards(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return boardService.getBoardsForUser(user)
                .stream()
                .map(BoardDto::from)
                .toList();
    }

    @GetMapping("/boards/{id}")
    public BoardDto getBoardById(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        Board board = boardService.getBoardById(id, user);

        return BoardDto.from(board);
    }

    @PutMapping("/boards/{id}")
    public BoardDto updateBoard(
            @PathVariable Long id,
            @RequestBody CreateBoardRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        Board updated = boardService.updateBoard(id, request.getName(), user);

        return BoardDto.from(updated);
    }

    @DeleteMapping("/boards/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBoard(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        boardService.deleteBoard(id, user);
    }
}