package com.jennymakki.projectmanager.user;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("Should save user correctly")
    void shouldSaveUser() {

        User user = new User(
                "test@test.com",
                "password123");

        User savedUser = userRepository.save(user);

        assertThat(savedUser.getId()).isNotNull();
        assertThat(savedUser.getEmail()).isEqualTo("test@test.com");
    }

    @Test
    @DisplayName("Should not allow duplicate emails")
    void shouldNotAllowDuplicateEmails() {

        User user1 = new User(
                "duplicate@test.com",
                "password123");

        User user2 = new User(
                "duplicate@test.com",
                "password456");

        userRepository.save(user1);

        assertThrows(
                DataIntegrityViolationException.class,
                () -> userRepository.saveAndFlush(user2));
    }
}