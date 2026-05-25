package com.jennymakki.projectmanager.comment;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jennymakki.projectmanager.comment.dto.CommentResponse;
import com.jennymakki.projectmanager.comment.dto.CreateCommentRequest;
import com.jennymakki.projectmanager.task.Task;
import com.jennymakki.projectmanager.task.TaskRepository;
import com.jennymakki.projectmanager.user.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;

    @Transactional
    public CommentResponse addComment(Long taskId,
            CreateCommentRequest request,
            User user) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (request.content() == null || request.content().isBlank()) {
            throw new IllegalArgumentException("Comment cannot be empty");
        }

        Comment comment = Comment.builder()
                .content(request.content().trim())
                .task(task)
                .author(user)
                .createdAt(LocalDateTime.now())
                .build();

        Comment saved = commentRepository.save(comment);

        return mapToResponse(saved);
    }

    public List<CommentResponse> getCommentsByTask(Long taskId) {

        return commentRepository.findByTaskId(taskId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public void deleteComment(Long commentId, User user) {

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getAuthor().getId().equals(user.getId())) {
            throw new AccessDeniedException("Not allowed to delete this comment");
        }

        commentRepository.delete(comment);
    }

    private CommentResponse mapToResponse(Comment comment) {

        return new CommentResponse(
                comment.getId(),
                comment.getContent(),
                comment.getAuthor().getEmail(),
                comment.getCreatedAt());
    }
}