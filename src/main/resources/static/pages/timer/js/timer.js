// ==================== КОНФИГУРАЦИЯ ====================
const sessionDataStr = localStorage.getItem('currentSession');
const sessionData = sessionDataStr ? JSON.parse(sessionDataStr) : null;

// Значения по умолчанию
const DEFAULT_WORK = 25 * 60;
const DEFAULT_BREAK = 5 * 60;
const DEFAULT_CYCLES = 4;
const DEFAULT_PLAYER_ID = 1;
const DEFAULT_SKILL_ID = null;
const DEFAULT_FRIEND_ID = null;

// Инициализация параметров (главная проблема была здесь!)
const WORK_TIME = sessionData?.workMinutes ? sessionData.workMinutes * 60 : DEFAULT_WORK;
const BREAK_TIME = sessionData?.restMinutes ? sessionData.restMinutes * 60 : DEFAULT_BREAK;
const TOTAL_CYCLES = sessionData?.cycles || DEFAULT_CYCLES;
const PLAYER_ID = sessionData?.playerId || DEFAULT_PLAYER_ID;
const SKILL_ID = sessionData?.skillId || DEFAULT_SKILL_ID;
const FRIEND_ID = sessionData?.friendId || DEFAULT_FRIEND_ID;

 document.addEventListener('DOMContentLoaded', function() {
            const minutesEl = document.getElementById('timer-minutes');
            const secondsEl = document.getElementById('timer-seconds');
            const startBtn = document.getElementById('startBtn');
            const resetBtn = document.getElementById('giveupBtn');

            const STORAGE_KEY = 'timerEndTime';
            let animationFrameId = null;

            // Функция для сохранения времени окончания в localStorage
            function setEndTime(minutes) {
                const endTime = new Date().getTime() + (minutes * 60 * 1000);
                localStorage.setItem(STORAGE_KEY, endTime.toString());
                return endTime;
            }

            // Функция для получения времени окончания из localStorage
            function getEndTime() {
                const stored = localStorage.getItem(STORAGE_KEY);
                return stored ? parseInt(stored) : null;
            }

            // Функция обновления таймера (как в статье)
            function updateTimer() {
                const endTime = getEndTime();
                if (!endTime) {
                    stopTimer();
                    return;
                }

                const now = new Date().getTime();
                const difference = endTime - now; // Как в статье!

                if (difference <= 0) {
                    // Время истекло
                    minutesEl.textContent = '00';
                    secondsEl.textContent = '00';
                    //timerCompleteEl.style.display = 'block';
                    localStorage.removeItem(STORAGE_KEY);
                    stopTimer();
                    return;
                }

                // Конвертируем разницу в миллисекундах в минуты и секунды
                const totalSeconds = Math.floor(difference / 1000);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;

                // Обновляем отображение
                minutesEl.textContent = minutes.toString().padStart(2, '0');
                secondsEl.textContent = seconds.toString().padStart(2, '0');

                // Запускаем следующий кадр анимации (альтернатива setInterval)
                animationFrameId = requestAnimationFrame(updateTimer);
            }

            // Запуск таймера
            function startTimer(minutes = WORK_TIME) {
                //timerCompleteEl.style.display = 'none';
                setEndTime(minutes);

                // Останавливаем предыдущую анимацию, если она есть
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }

                // Запускаем обновление
                updateTimer();
            }

            // Остановка таймера
            function stopTimer() {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }

            // Сброс таймера
            function resetTimer() {
                stopTimer();
                localStorage.removeItem(STORAGE_KEY);
                minutesEl.textContent = '50';
                secondsEl.textContent = '00';
                //timerCompleteEl.style.display = 'none';
            }

            // Проверяем, есть ли активный таймер при загрузке страницы
            function checkExistingTimer() {
                const endTime = getEndTime();
                if (endTime) {
                    const now = new Date().getTime();
                    if (endTime > now) {
                        // Таймер все еще активен
                        startTimer();
                    } else {
                        // Таймер истек
                        localStorage.removeItem(STORAGE_KEY);
                    }
                }
            }

            // Обработчики событий
            startBtn.addEventListener('click', () => startTimer(50));
            resetBtn.addEventListener('click', resetTimer);

            // Проверяем существующий таймер при загрузке
            checkExistingTimer();

            // Останавливаем анимацию при скрытии вкладки (оптимизация)
            document.addEventListener('visibilitychange', function() {
                if (document.hidden) {
                    stopTimer();
                } else if (getEndTime()) {
                    updateTimer();
                }
            });
        });