package com.example.StudyFriends.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "player")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Integer coins;

    @ManyToOne
    @JoinColumn(name = "appearance_id")
    private Appearance appearance;

    @OneToMany(mappedBy = "player",fetch = FetchType.EAGER)
    private List<Friend> friends = new ArrayList<>();

    @OneToMany(mappedBy = "player")
    private List<Skill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "player")
    private List<PlayerItem> items = new ArrayList<>();
}