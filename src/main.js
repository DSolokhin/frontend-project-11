// src/main.js
import './styles.scss';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.rss-form');
    const feedback = document.querySelector('.feedback');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const url = formData.get('url');
        
        // Базовая валидация
        if (!isValidUrl(url)) {
            showFeedback('Введите корректный URL', 'danger');
            return;
        }
        
        // Здесь будет логика добавления RSS
        showFeedback('RSS успешно добавлен', 'success');
        form.reset();
    });
});

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function showFeedback(message, type) {
    const feedback = document.querySelector('.feedback');
    feedback.textContent = message;
    feedback.className = `feedback m-0 position-absolute small text-${type}`;
    
    // Автоматическое скрытие сообщения
    setTimeout(() => {
        feedback.textContent = '';
        feedback.className = 'feedback m-0 position-absolute small';
    }, 3000);
}
