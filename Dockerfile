# 1. Стадия сборки (Builder)
FROM maven:3.8.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
# Эта строка кэширует зависимости, ускоряя последующие сборки
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# 2. Финальная стадия (Runtime) - ИСПРАВЛЕННАЯ
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Копируем JAR-файл из стадии сборки
COPY --from=builder /app/target/*.jar app.jar
# Открываем порт
EXPOSE 8081
# Команда для запуска
ENTRYPOINT ["java", "-jar", "app.jar"]
