package com.example.StudyFriends.services;

import com.example.StudyFriends.model.Session;
import com.example.StudyFriends.repositories.SessionRep;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
public class SessionService {
    private final SessionRep sessionRep;

    public Session addSession(Session session) {
        return sessionRep.save(session);
    }

    public List<Session> getAllSessions() {
        return sessionRep.findAll();
    }

    public Optional<Session> getBookById(Long id) {
        return sessionRep.findById(id);
    }
}
