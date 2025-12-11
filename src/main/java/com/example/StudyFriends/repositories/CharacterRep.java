package com.example.StudyFriends.repositories;

import com.example.StudyFriends.model.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRep extends JpaRepository<Character,Integer> {
}
