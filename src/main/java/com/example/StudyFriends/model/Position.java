package com.example.StudyFriends.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "postypes")
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long x;

    @Column(nullable = false)
    private Long y;

    @OneToMany(mappedBy = "posType")
    private List<Item> items = new ArrayList<>();

    @OneToMany(mappedBy = "friendPosType")
    private List<FriendVisit> friendVisits = new ArrayList<>();
}