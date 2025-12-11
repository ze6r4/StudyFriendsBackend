package com.example.StudyFriends.repositories;

import com.example.StudyFriends.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemsRep extends JpaRepository<Item,Integer> {
}
