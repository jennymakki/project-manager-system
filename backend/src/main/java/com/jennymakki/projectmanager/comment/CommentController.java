package com.jennymakki.projectmanager.comment;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jennymakki.projectmanager.comment.dto.CommentResponse;
import com.jennymakki.projectmanager.comment.dto.CreateCommentRequest;
import com.jennymakki.projectmanager.security.AuthUserResolver;
import com.jennymakki.projectmanager.user.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final AuthUserResolver authUserResolver;

    @PostMapping("/tasks/{taskId}/comments")
    public ResponseEntity<CommentResponse> addComment(
            @PathVariable Long taskId,
            @RequestBody CreateCommentRequest request,
            Authentication auth) {

        User user = authUserResolver.getUser(auth);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(commentService.addComment(taskId, request, user));
    }

    @GetMapping("/tasks/{taskId}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(
            @PathVariable Long taskId) {

        return ResponseEntity.ok(commentService.getCommentsByTask(taskId));
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId,
            Authentication auth) {

        User user = authUserResolver.getUser(auth);

        commentService.deleteComment(commentId, user);

        return ResponseEntity.noContent().build();
    }
}