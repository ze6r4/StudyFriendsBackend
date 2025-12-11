// js/session-settings.js
const API_BASE = 'http://localhost:8081/api/sessions';

async function startSession() {
    // Получаем значения из формы
    const workMinutes = parseInt(document.getElementById('workMinutes').value);
    const restMinutes = parseInt(document.getElementById('restMinutes').value);
    const cycles = parseInt(document.getElementById('cyclesAmount').value);
    const characterId = parseInt(document.getElementById('selectFriend').value);
    const skillId = parseInt(document.getElementById('selectSkill').value);

    // Формируем данные для отправки
    const sessionPostData = {
        playerId: 1,
        friendId: characterId,
        skillId: skillId
    };

    console.log('Отправляемые данные:', sessionPostData);

    try {
         const response = await fetch(API_BASE, { // Используйте переменную напрямую
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sessionPostData)
            });

        if (!response.ok) {
            let errorText = "";
            try {
                errorText = await response.text(); // читаем тело ошибки
            } catch (e) {
                errorText = "Не удалось прочитать тело ошибки";
            }

            throw new Error(
                `HTTP error ${response.status}\n\nОтвет сервера:\n${errorText}`
            );
        }

        const result = await response.json();
        console.log('Сессия создана:', result);

        // Переход на страницу таймера с ID сессии
        //window.location.href = `timer.html?sessionId=${result.sessionId}`;

    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при создании сессии: ' + error.message);
    }

    // сохранение продолжительности сессии, особенно totalPlanned
    const sessionData = {
            startTime: new Date().toISOString(),
            workMinutes: workMinutes,
            restMinutes: restMinutes,
            cycles: cycles,
            totalPlanned: (workMinutes + restMinutes) * cycles
        };

        localStorage.setItem('currentSession', JSON.stringify(sessionData));
}

// Делаем функцию глобально доступной для кнопки
window.startSession = startSession;
