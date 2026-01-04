package com.example.StudyFriends.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Применить ко всем эндпоинтам
                        .allowedOrigins("*") // Разрешить все источники
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Разрешенные методы
                        .allowedHeaders("*") // Разрешить все заголовки
                        .allowCredentials(false) // Для '*' origins credentials должны быть false
                        .maxAge(3600); // Кэширование preflight запросов на 1 час
            }
        };
    }
}