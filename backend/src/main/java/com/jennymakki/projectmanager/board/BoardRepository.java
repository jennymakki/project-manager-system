package com.jennymakki.projectmanager.board;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jennymakki.projectmanager.user.User;

public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findByOwner(User owner);
}