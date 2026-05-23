package com.jennymakki.projectmanager.board;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {

    @GetMapping("/boards")
    public String boards() {
        return "YOU MADE IT TO BOARDS!";
    }
}