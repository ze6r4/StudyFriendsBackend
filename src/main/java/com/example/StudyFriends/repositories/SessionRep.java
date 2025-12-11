package com.example.StudyFriends.repositories;

import com.example.StudyFriends.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRep extends JpaRepository<Session, Integer> {


}