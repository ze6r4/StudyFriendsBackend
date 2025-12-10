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
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "pos_type", nullable = false)
    private Position posType;

    @OneToMany(mappedBy = "item")
    private List<PlayerItem> playerItems = new ArrayList<>();
}