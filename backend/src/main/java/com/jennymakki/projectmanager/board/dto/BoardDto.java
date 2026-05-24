package com.jennymakki.projectmanager.board.dto;

import com.jennymakki.projectmanager.board.Board;

public class BoardDto {

    private final Long id;
    private final String name;

    public BoardDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static BoardDto from(Board board) {
        return new BoardDto(
                board.getId(),
                board.getName());
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}