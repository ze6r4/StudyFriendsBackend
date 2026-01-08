// notes-storage.js

const NOTES_STORAGE_KEY = 'userNotesContent';

document.addEventListener('DOMContentLoaded', () => {
    const notesEl = document.getElementById('notesContent');
    if (!notesEl) return;

    // 🔹 Восстановление заметок
    const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
    if (savedNotes) {
        notesEl.innerHTML = savedNotes;
    }

    // 🔹 Автосохранение при любом изменении
    let saveTimeout;

    notesEl.addEventListener('input', () => {
        // debounce — чтобы не писать в storage на каждый символ
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            localStorage.setItem(NOTES_STORAGE_KEY, notesEl.innerHTML);
        }, 300);
    });
});
