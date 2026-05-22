package com.jennymakki.projectmanager.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jennymakki.projectmanager.auth.dto.AuthResponse;
import com.jennymakki.projectmanager.auth.dto.RegisterRequest;
import com.jennymakki.projectmanager.auth.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {

        authService.register(request.email, request.password);

        return ResponseEntity
                .status(201)
                .body(new AuthResponse("User created"));
    }
}