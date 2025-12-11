package com.example.StudyFriends.repositories;

import com.example.StudyFriends.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRep extends JpaRepository<Skill,Integer> {
}
