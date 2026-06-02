package com.jennymakki.projectmanager.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final SecretKey key = Keys.hmacShaKeyFor(
            "mySuperSecretKeymySuperSecretKey12345"
                    .getBytes());

    public String generateToken(Long userId, String email) {

        return Jwts.builder()
                .subject(email)
                .claim("userId", userId)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(key)
                .compact();
    }

public boolean isTokenValid(String token) {
    try {
        Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token);
        return true;
    } catch (Exception e) {
        return false;
    }
}

public Claims extractAllClaims(String token) {
    return Jwts.parser()
        .verifyWith(key)
        .build()
        .parseSignedClaims(token)
        .getPayload();
}

public String extractEmail(String token) {
    return extractAllClaims(token).getSubject();
}

public Long extractUserId(String token) {
    return extractAllClaims(token).get("userId", Long.class);
}
}