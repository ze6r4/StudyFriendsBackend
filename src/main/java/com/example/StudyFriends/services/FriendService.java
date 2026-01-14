package com.example.StudyFriends.services;

import com.example.StudyFriends.model.Friend;
import com.example.StudyFriends.repositories.FriendRep;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FriendService {
    private final FriendRep friendRep;

    public Optional<Friend> getFriendByIdAndPlayer(Long id, Long playerId){
        return friendRep.findFriend(id,playerId);
    }
    public List<Friend> getAllFriendsOfPlayer(Long playerId){
        return friendRep.findFriendsByPlayerId(playerId);
    }
}
