import { addNewSkillToDropdown } from './custom-select.html.js';
import { updateSliderUi } from './ui.js';

const addSkillModal = document.getElementById('addSkillModal');
const closeAddSkillModal = document.getElementById('closeAddSkillModal');
const newSkillLevel = document.getElementById('newSkillLevel');
const skillLevelValue = document.getElementById('skillLevelValue');
const saveSkillBtn = document.getElementById('saveSkillBtn');
const newSkillName = document.getElementById('newSkillName');

/**
 * Открывает модалку для добавления навыка
 * @param {HTMLElement} customSelect — dropdown, куда добавляем новый навык
 */
export function openAddSkillModal(customSelect) {
  addSkillModal.classList.remove('hidden');
  newSkillName.value = '';
  newSkillLevel.value = 5;
  skillLevelValue.textContent = '5';
  newSkillName.focus();
  updateSliderUi(newSkillLevel);

  saveSkillBtn.onclick = () => {

    const skill = {
                name: newSkillName.value.trim(),
                level: parseInt(newSkillLevel.value, 10),
                isActive: true
            };
    if (!name) {
      alert("Введите название навыка!");
      return;
    }
    addNewSkillToDropdown(customSelect, skill);
    addSkillModal.classList.add('hidden');
  };
}

// закрытие модалки
closeAddSkillModal.addEventListener('click', () => {
  addSkillModal.classList.add('hidden');
});

// обновление значения ползунка
newSkillLevel.addEventListener('input', () => {
  skillLevelValue.textContent = newSkillLevel.value;
});
