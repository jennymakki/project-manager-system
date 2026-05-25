package com.jennymakki.projectmanager.comment.dto;

import java.time.LocalDateTime;

public record CommentResponse(
        Long id,
        String content,
        String author,
        LocalDateTime createdAt
) {
}