package com.jennymakki.projectmanager.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

public void register(String email, String password) {

    if (userRepository.findByEmail(email).isPresent()) {
        throw new RuntimeException("Email already exists");
    }

    String hashedPassword = passwordEncoder.encode(password);

    User user = new User(email, hashedPassword);
    userRepository.save(user);
}
}