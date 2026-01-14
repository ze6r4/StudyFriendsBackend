package com.example.StudyFriends.controllers;

import com.example.StudyFriends.dto.CharacterDto;
import com.example.StudyFriends.services.CharacterService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/characters")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:8081")
public class CharacterController {

    @Autowired
    private final CharacterService characterService;

    @GetMapping("/{id}")
    public ResponseEntity<CharacterDto> getCharacter(@PathVariable Long id) {
        return characterService.getCharacterById(id)
                .map(CharacterDto::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
