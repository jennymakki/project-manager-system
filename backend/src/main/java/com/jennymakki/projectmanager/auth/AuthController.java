package com.jennymakki.projectmanager.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jennymakki.projectmanager.auth.dto.AuthResponse;
import com.jennymakki.projectmanager.auth.dto.LoginRequest;
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
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {

        authService.register(request.email, request.password);

        return ResponseEntity.status(201).body("User created");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        String token = authService.login(request.email, request.password);

        return ResponseEntity.ok(new AuthResponse(token));
    }
}