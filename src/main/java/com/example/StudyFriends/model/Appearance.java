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
@Table(name = "appearance")
public class Appearance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "skin_color")
    private String skinColor;

    @Column(name = "top_clothes")
    private String topClothes;

    @Column(name = "bottom_clothes")
    private String bottomClothes;

    @Column
    private String additions;

    @Column
    private String eyes;

    @Column
    private String nose;

    @Column
    private String mouth;

    @Column
    private String hair;

    @Column(name = "hair_color")
    private String hairColor;

    @OneToMany(mappedBy = "appearance")
    private List<Player> players = new ArrayList<>();
}