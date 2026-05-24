package com.jennymakki.projectmanager.board;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
}