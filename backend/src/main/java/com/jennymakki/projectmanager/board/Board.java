package com.jennymakki.projectmanager.board;

import java.util.ArrayList;
import java.util.List;

import com.jennymakki.projectmanager.list.TaskList;
import com.jennymakki.projectmanager.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(optional = false)
    private User owner;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<TaskList> lists = new ArrayList<>();

    public Board() {
    }

    public Board(String name, User owner) {
        this.name = name;
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public User getOwner() {
        return owner;
    }

    public void setName(String name) {
        this.name = name;
    }
}
