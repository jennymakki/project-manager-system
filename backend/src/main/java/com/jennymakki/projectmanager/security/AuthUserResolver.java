package com.jennymakki.projectmanager.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.jennymakki.projectmanager.user.User;
import com.jennymakki.projectmanager.user.UserRepository;

@Component
public class AuthUserResolver {

    private final UserRepository userRepository;

    public AuthUserResolver(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(Authentication auth) {
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String email = userDetails.getUsername();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}