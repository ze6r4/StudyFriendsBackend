package com.example.StudyFriends.services;

import com.example.StudyFriends.exceptions.ResourceNotFoundException;
import com.example.StudyFriends.model.Player;
import com.example.StudyFriends.model.Skill;
import com.example.StudyFriends.repositories.PlayerRep;
import com.example.StudyFriends.repositories.SkillRep;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SkillService {
    private final SkillRep skillRep;
    private final PlayerRep playerRep;

    public Skill addSkill(Skill skill){
        return skillRep.save(skill);
    }
    public Optional<Skill> getSkillById(Integer id){
        return skillRep.findById(id);
    }
    public List<Skill> getAllSkillsOfPlayer(Integer playerId) {

        Player player = playerRep.findById(playerId)
                .orElseThrow(() -> new ResourceNotFoundException("Player", playerId));
        return player.getSkills();
    }

}
