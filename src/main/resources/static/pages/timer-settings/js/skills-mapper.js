export function mapSkillsFromDom(customSelect, playerId) {
  return Array.from(
    customSelect.querySelectorAll('.select-dropdown li')
  )
  // фильтруем кнопку "Добавить навык"
  .filter(li => !li.classList.contains('add-skill-item'))
  .map(li => {
    const skillId =
      li.dataset.skillId
        ? Number(li.dataset.skillId)
        : Number(li.id.replace('skillOption', ''));

    const name = li.querySelector('.item-text')?.textContent.trim();
    const progress = Number(li.dataset.progress ?? 0);
    const isActive = 1;

    return {
      skillId,
      playerId,
      name,
      progress,
      isActive
    };
  });
}
