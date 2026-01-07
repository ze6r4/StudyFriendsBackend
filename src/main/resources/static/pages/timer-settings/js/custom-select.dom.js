export const ADD_ITEM_ID = 'add-skill-item';

/* =======================
   DOM helpers
======================= */

export function getSelectElements(customSelect) {
  return {
    button: customSelect.querySelector('.select-button'),
    dropdown: customSelect.querySelector('.select-dropdown'),
    value: customSelect.querySelector('.selected-value')
  };
}
export function setDropdownState(customSelect, isOpen) {
  const { dropdown, button } = getSelectElements(customSelect);
  dropdown.classList.toggle('hidden', !isOpen);
  button.setAttribute('aria-expanded', isOpen);
}

export function toggleDropdown(customSelect) {
  const { dropdown } = getSelectElements(customSelect);
  setDropdownState(customSelect, dropdown.classList.contains('hidden'));
}

export function selectItem(customSelect, item) {
  if (!item || item.id === ADD_ITEM_ID) return;

  const { button, value } = getSelectElements(customSelect);

  customSelect
    .querySelectorAll('li[role="option"]')
    .forEach(li => li.removeAttribute('aria-selected'));

  item.setAttribute('aria-selected', 'true');
  value.textContent = item.querySelector('.item-text').textContent;
  button.setAttribute('aria-activedescendant', item.id);

  setDropdownState(customSelect, false);
}

export function selectFirstItem(customSelect) {
  selectItem(customSelect, customSelect.querySelector('li[role="option"]'));
}
