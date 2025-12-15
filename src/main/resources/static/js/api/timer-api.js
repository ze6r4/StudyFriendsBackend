
const API_BASE = 'http://localhost:8081/api';
const PLAYER_ID = 1;
// Функция для отображения сообщений об ошибках
function displayErrorMessage(containerId, message) {
    const errorContainer = document.getElementById(containerId);
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block'; // Показываем блок
        setTimeout(() => {
            errorContainer.textContent = '';
            errorContainer.style.display = 'none'; // Скрываем блок после 5 секунд
        }, 5000);
    } else {
        console.error(`Error container with ID '${containerId}' not found:`, message);
    }
}

// --- ОСНОВНАЯ ЛОГИКА КАСТОМНОГО СПИСКА ---

// Эта функция теперь инициализирует (или переинициализирует)
// отдельный кастомный выпадающий список.
// Она будет вызвана после загрузки данных с сервера.
function initializeCustomSelect(customSelect) {
    const selectButton = customSelect.querySelector(".select-button");
    const dropdown = customSelect.querySelector(".select-dropdown");
    const selectedValueSpan = customSelect.querySelector(".selected-value");
    // Важно: listItems пересчитываются каждый раз, т.к. DOM мог измениться
    const listItems = dropdown.querySelectorAll("li[role='option']"); 

    // Функция для переключения видимости выпадающего списка
    const toggleDropdown = (expand = null) => {
        const willBeOpen = expand !== null ? expand : dropdown.classList.contains("hidden");
        dropdown.classList.toggle("hidden", !willBeOpen);
        selectButton.setAttribute("aria-expanded", willBeOpen);
        // Если список закрывается, убедимся, что фокус возвращается на кнопку
        if (!willBeOpen) {
            selectButton.focus();
        }
    };

    // --- Установка начального выбранного значения и ARIA-атрибутов ---
    // Сначала сбрасываем все предыдущие выбранные состояния
    listItems.forEach(li => li.removeAttribute("aria-selected"));
    selectButton.removeAttribute("aria-activedescendant");

    if (listItems.length > 0) {
        const firstSelectableItem = Array.from(listItems).find(item => !item.classList.contains('no-select-item')); // Находим первый выбираемый элемент
        
        if (firstSelectableItem) {
            const firstItemTextSpan = firstSelectableItem.querySelector(".item-text");
            selectedValueSpan.textContent = firstItemTextSpan ? firstItemTextSpan.textContent : firstSelectableItem.textContent.trim();
            firstSelectableItem.setAttribute("aria-selected", "true");
            selectButton.setAttribute("aria-activedescendant", firstSelectableItem.id);
        } else {
            // Если элементов нет или все невыбираемые
            selectedValueSpan.textContent = "Нет доступных навыков";
        }
    } else {
        selectedValueSpan.textContent = "Выберите значение"; // Если список пуст
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ (Используем Event Delegation для li) ---

    // 1. Обработчик клика по кнопке (открытие/закрытие)
    // Предотвращаем двойное назначение обработчика
    if (!selectButton._hasClickListener) {
        selectButton.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleDropdown();
        });
        selectButton._hasClickListener = true; // Отмечаем, что обработчик назначен
    }


    // 2. Обработчик клика по выпадающему списку (делегирование для li и кнопок удаления)
    // Предотвращаем двойное назначение обработчика
    if (!dropdown._hasClickListener) {
        dropdown.addEventListener("click", (event) => {
            const target = event.target;
            const listItem = target.closest('li[role="option"]'); // Ищем родительский <li> с ролью option

            if (listItem) {
                // Если кликнули по кнопке удаления внутри <li>
                if (target.classList.contains('delete-item-btn')) {
                    event.stopPropagation(); // ОЧЕНЬ ВАЖНО: Остановить всплытие!
                    const itemName = listItem.querySelector(".item-text") ? listItem.querySelector(".item-text").textContent : listItem.textContent.trim();
                    const skillId = listItem.dataset.skillId;
                    console.log(`Кнопка "Удалить" нажата для элемента: "${itemName}" (ID: ${skillId || 'N/A'})`);
                    // Здесь могла бы быть логика удаления элемента из DOM
                    // Например: listItem.remove();
                    // Если элемент удаляется, ВАМ ПОТРЕБУЕТСЯ ПЕРЕИНИЦИАЛИЗИРОВАТЬ customSelect,
                    // чтобы обновить выбранное значение, если был удален текущий выбранный элемент.
                    // initializeCustomSelect(customSelect); // Вызовите это после удаления элемента
                } 
                // Если кликнули по самому <li> или его тексту (не по кнопке удаления)
                else if (!listItem.classList.contains('no-select-item')) { // Проверяем, что это выбираемый элемент
                    const selectedText = listItem.querySelector(".item-text") ? listItem.querySelector(".item-text").textContent : listItem.textContent.trim();
                    
                    selectedValueSpan.textContent = selectedText; // Обновляем текст в кнопке

                    // Обновляем aria-selected для доступности
                    listItems.forEach((li) => {
                        li.removeAttribute("aria-selected");
                    });
                    listItem.setAttribute("aria-selected", "true");

                    // Обновляем aria-activedescendant на кнопке
                    selectButton.setAttribute("aria-activedescendant", listItem.id);

                    toggleDropdown(false); // Скрываем выпадающий список
                }
            }
        });
        dropdown._hasClickListener = true; // Отмечаем, что обработчик назначен
    }
}

// --- ФУНКЦИИ ВЗАИМОДЕЙСТВИЯ С СЕРВЕРОМ ---

// Функция заполнения выпадающего списка данными с сервера
function populateSkillSelect(skills, customSelectId) {
    const customSelect = document.getElementById(customSelectId);
    if (!customSelect) {
        console.error(`Custom select with ID '${customSelectId}' not found.`);
        return;
    }

    const dropdownUl = customSelect.querySelector('.select-dropdown');
    const selectedValueSpan = customSelect.querySelector(".selected-value");
    const selectButton = customSelect.querySelector(".select-button");

    if (!dropdownUl) {
        console.error(`Dropdown UL not found inside custom select with ID '${customSelectId}'.`);
        return;
    }

    dropdownUl.innerHTML = ''; // Очищаем текущие элементы списка

    if (skills && skills.length > 0) {
        skills.forEach(skill => {
            const li = document.createElement('li');
            li.setAttribute('role', 'option');
            li.id = `skillOption-${skill.skillId}`; // Уникальный ID для каждого элемента

            // Сохраняем skillId как data-атрибут
            li.dataset.skillId = skill.skillId; 

            const itemTextSpan = document.createElement('span');
            itemTextSpan.classList.add('item-text');
            itemTextSpan.textContent = `${skill.name} (ID: ${skill.skillId}) - Уровень: ${skill.progress}`;
            li.appendChild(itemTextSpan);

            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('type', 'button');
            deleteButton.classList.add('delete-item-btn');
            deleteButton.setAttribute('aria-label', `Удалить ${skill.name}`);
            deleteButton.textContent = '✕';
            li.appendChild(deleteButton);

            dropdownUl.appendChild(li);
        });
    } else {
        // Если навыков нет, добавляем сообщение об этом
        const noItemsLi = document.createElement('li');
        noItemsLi.textContent = "Нет доступных навыков.";
        noItemsLi.classList.add('no-select-item'); // Добавляем класс, чтобы нельзя было выбрать
        noItemsLi.setAttribute('role', 'none'); // Не является выбираемым элементом для ARIA
        noItemsLi.style.fontStyle = 'italic';
        noItemsLi.style.cursor = 'default';
        dropdownUl.appendChild(noItemsLi);
    }

    // ВАЖНО: Переинициализируем кастомный список, чтобы назначить обработчики
    // событий на новые элементы и установить начальное выбранное значение.
    initializeCustomSelect(customSelect);
}


// Функция загрузки навыков с сервера
async function loadSkills(playerId = 1) {
    const customSelect = document.getElementById('selectSkill');
    const selectedValueSpan = customSelect.querySelector(".selected-value");
    const dropdownUl = customSelect.querySelector('.select-dropdown');
    
    // Показываем индикатор загрузки
    selectedValueSpan.textContent = 'Загрузка...';
    dropdownUl.innerHTML = '<li id="loadingMessage" role="none" class="no-select-item" style="font-style: italic; cursor: default;">Загрузка навыков...</li>';
    customSelect.querySelector('.select-button').setAttribute('aria-activedescendant', 'loadingMessage');


    try {
        // Для демонстрации API_BASE возвращает массив постов,
        // Мы его преобразуем в фейковые навыки.
        // Замените на ваш реальный fetch запрос.
        const response = await fetch(`${API_BASE}?userId=${playerId}`); 
        
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        // Преобразуем данные в формат навыков (для демонстрации с JSONPlaceholder)
        const skills = data.map((item, index) => ({
            skillId: item.id,
            name: item.title.substring(0, 20), // Используем заголовок как имя навыка
            progress: Math.floor(Math.random() * 100) // Случайный прогресс
        }));

        populateSkillSelect(skills, 'selectSkill'); // Заполняем наш кастомный список
        displayErrorMessage('selectSkillError', ''); // Очищаем сообщение об ошибке
    } catch (error) {
        console.error("Ошибка загрузки навыков:", error);
        selectedValueSpan.textContent = 'Ошибка загрузки'; // Показываем ошибку в заголовке
        dropdownUl.innerHTML = '<li role="none" class="no-select-item" style="color: red;">Ошибка: Не удалось загрузить навыки.</li>';
        displayErrorMessage('selectSkillError', `Не удалось загрузить навыки: ${error.message}`);
        initializeCustomSelect(customSelect); // Переинициализируем, чтобы обновить состояние
    }
}

// --- Инициализация при загрузке DOM ---
document.addEventListener('DOMContentLoaded', () => {
    // Получаем все кастомные списки (если их несколько)
    const allCustomSelects = document.querySelectorAll(".custom-select");

    // Глобальный обработчик клика по документу для скрытия выпадающих списков
    // Этот обработчик устанавливается один раз при загрузке страницы.
    document.addEventListener("click", (event) => {
        allCustomSelects.forEach((customSelect) => {
            const dropdown = customSelect.querySelector(".select-dropdown");
            const selectButton = customSelect.querySelector(".select-button");

            if (!dropdown.classList.contains("hidden") && !customSelect.contains(event.target)) {
                dropdown.classList.add("hidden");
                selectButton.setAttribute("aria-expanded", "false");
                // Убедимся, что фокус возвращается на кнопку при закрытии
                selectButton.focus();
            }
        });
    });

    // Загружаем навыки для кастомного списка с ID 'selectSkill' при загрузке страницы
    loadSkills(1); // playerId = 1. Предполагаем, что custom-selects уже в DOM.
});


//POST - запрос
async function startSession() {

    // Читаем значения прямо перед отправкой
    const sessionData = {
        workMinutes: parseInt(document.getElementById('workMinutes').value, 10),
        restMinutes: parseInt(document.getElementById('restMinutes').value, 10),
        cycles: parseInt(document.getElementById('cyclesAmount').value, 10),
        playerId: PLAYER_ID,
        friendId: parseInt(document.getElementById('selectFriend').value, 10),
        skillId: parseInt(document.getElementById('selectSkill').value, 10)
    };

    try {
        const response = await fetch(`${API_BASE}/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sessionData)
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const result = await response.json();
        console.log('Сессия создана!', result);

        // window.location.href = `timer.html?sessionId=${result.sessionId}`;

    } catch (error) {
        errorMessage(error);
    }

    localStorage.setItem(`currentSession${PLAYER_ID}`, JSON.stringify(sessionData));
}

window.startSession = startSession;

function errorMessage(error) {
    console.error('Ошибка:', error);
    alert(`🤕Ой-ой-ой... Вот что случилось:\n${error.message}`);
}