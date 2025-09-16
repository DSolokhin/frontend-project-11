// src/main.js
import './styles.scss'
import 'bootstrap'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.rss-form')
    const feedback = document.querySelector('.feedback')
    
    // Инициализация модального окна Bootstrap
    const modalElement = document.getElementById('modal')
    const modal = new bootstrap.Modal(modalElement)
    
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        const url = formData.get('url')
        
        // Базовая валидация
        if (!isValidUrl(url)) {
            showFeedback('Введите корректный URL', 'danger')
            return;
        }
        
        // Здесь будет логика добавления RSS
        showFeedback('RSS успешно добавлен', 'success')
        form.reset()
        
        // Пример показа модального окна (можно удалить после теста)
        setTimeout(() => {
            showModal('Тестовая статья', 'Это тестовое описание статьи...', 'https://example.com')
        }, 1000)
    })
})

function isValidUrl(string) {
    try {
        new URL(string)
        return true;
    } catch (_) {
        return false
    }
}

function showFeedback(message, type) {
    const feedback = document.querySelector('.feedback')
    feedback.textContent = message
    feedback.className = `feedback m-0 position-absolute small text-${type}`
    
    // Автоматическое скрытие сообщения
    setTimeout(() => {
        feedback.textContent = ''
        feedback.className = 'feedback m-0 position-absolute small'
    }, 3000)
}

// Функция для показа модального окна
function showModal(title, content, link) {
    const modalTitle = document.querySelector('.modal-title')
    const modalBody = document.querySelector('.modal-body')
    const readAllButton = document.getElementById('modal-read-all')
    
    modalTitle.textContent = title
    modalBody.textContent = content
    readAllButton.href = link
    
    const modal = new bootstrap.Modal(document.getElementById('modal'))
    modal.show()
}
