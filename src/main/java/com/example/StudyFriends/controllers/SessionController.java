package com.example.StudyFriends.controllers;



import com.example.StudyFriends.model.Session;
import com.example.StudyFriends.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sessions")
@CrossOrigin(origins = "http://localhost:8081")
public class SessionController {
    private final SessionService service;

    public SessionController(SessionService service) {
        this.service = service;
    }

    @PostMapping
    public Session addBook(@RequestBody Session session) {
        return service.addSession(session);
    }
}
