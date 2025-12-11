package com.example.StudyFriends.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
class ErrorResponse {
    private String code;
    private String message;
    private LocalDateTime timestamp;
}