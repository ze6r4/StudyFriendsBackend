package com.example.StudyFriends.repositories;

import com.example.StudyFriends.model.FriendVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendVisitRep extends JpaRepository<FriendVisit, Integer> {
}
