package com.jennymakki.projectmanager.list;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {

    List<TaskList> findByBoardId(Long boardId);
}