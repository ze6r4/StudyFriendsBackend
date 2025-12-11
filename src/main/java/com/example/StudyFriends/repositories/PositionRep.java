package com.example.StudyFriends.repositories;

import com.example.StudyFriends.model.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionRep extends JpaRepository<Position,Integer> {
}
