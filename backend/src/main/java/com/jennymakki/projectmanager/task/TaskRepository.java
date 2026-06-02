package com.jennymakki.projectmanager.task;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface TaskRepository extends
        JpaRepository<Task, Long>,
        JpaSpecificationExecutor<Task> {

    Page<Task> findByTaskListId(Long taskListId, Pageable pageable);

    @Query("""
        select t from Task t
        where t.taskList.board.id = :boardId
    """)
    List<Task> findByBoardId(Long boardId);
}