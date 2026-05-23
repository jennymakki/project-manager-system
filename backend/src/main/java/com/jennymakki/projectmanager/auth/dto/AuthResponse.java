package com.jennymakki.projectmanager.auth.dto;

public class AuthResponse {
    public String token;

    public AuthResponse(String token) {
        this.token = token;
    }
}