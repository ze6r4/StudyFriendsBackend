// js/session-settings.js
const API_BASE = 'http://localhost:8081/api';

async function startSession() {
    // Получаем значения из формы
    const workMinutes = parseInt(document.getElementById('workMinutes').value);
    const restMinutes = parseInt(document.getElementById('restMinutes').value);
    const cycles = parseInt(document.getElementById('cyclesAmount').value);
    const characterId = parseInt(document.getElementById('selectFriend').value);
    const skillId = parseInt(document.getElementById('selectSkill').value);
    
    // Формируем данные для отправки
    const sessionData = {
        workMinutes: workMinutes,
        restMinutes: restMinutes,
        cycles: cycles,
        characterId: characterId,
        skillId: skillId,
        playerId: 1 // Временное значение
    };
    
    console.log('Отправляемые данные:', sessionData);
    
    try {
        // Отправляем запрос на сервер
        const response = await fetch(`${API_BASE}/session/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sessionData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Сессия создана:', result);
        
        // Переход на страницу таймера с ID сессии
        window.location.href = `timer.html?sessionId=${result.sessionId}`;
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при создании сессии: ' + error.message);
    }
}

// Делаем функцию глобально доступной для кнопки
window.startSession = startSession;