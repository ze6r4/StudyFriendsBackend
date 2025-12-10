package com.example.StudyFriends.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "friendsvisit")
public class FriendVisit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "player_friend_id", nullable = false)
    private Friend playerFriend;

    @Column(name = "friend_action", nullable = false)
    private String friendAction;

    @ManyToOne
    @JoinColumn(name = "friend_pos_type", nullable = false)
    private Position friendPosType;
}