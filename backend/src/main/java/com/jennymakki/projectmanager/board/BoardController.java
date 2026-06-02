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
import com.jennymakki.projectmanager.security.AuthUserResolver;
import com.jennymakki.projectmanager.user.User;

@RestController
public class BoardController {

    private final BoardService boardService;
    private final AuthUserResolver authUserResolver;

    public BoardController(BoardService boardService,
                            AuthUserResolver authUserResolver) {
        this.boardService = boardService;
        this.authUserResolver = authUserResolver;
    }

    @PostMapping("/boards")
    @ResponseStatus(HttpStatus.CREATED)
    public BoardDto createBoard(
            @RequestBody CreateBoardRequest request,
            Authentication auth) {

        User user = authUserResolver.getUser(auth);

        return BoardDto.from(
                boardService.createBoard(request.getName(), user));
    }

    @GetMapping("/boards")
    public List<BoardDto> getBoards(Authentication auth) {

        User user = authUserResolver.getUser(auth);

        return boardService.getBoardsForUser(user)
                .stream()
                .map(BoardDto::from)
                .toList();
    }

    @GetMapping("/boards/{id}")
    public BoardDto getBoardById(
            @PathVariable Long id,
            Authentication auth) {

        User user = authUserResolver.getUser(auth);

        return BoardDto.from(boardService.getBoardById(id, user));
    }

    @PutMapping("/boards/{id}")
    public BoardDto updateBoard(
            @PathVariable Long id,
            @RequestBody CreateBoardRequest request,
            Authentication auth) {

        User user = authUserResolver.getUser(auth);

        return BoardDto.from(
                boardService.updateBoard(id, request.getName(), user));
    }

    @DeleteMapping("/boards/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBoard(
            @PathVariable Long id,
            Authentication auth) {

        User user = authUserResolver.getUser(auth);

        boardService.deleteBoard(id, user);
    }
}