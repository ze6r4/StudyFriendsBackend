package com.example.StudyFriends.repositories;

import com.example.StudyFriends.model.PlayerItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerItemsRep extends JpaRepository<PlayerItem,Integer> {
}
