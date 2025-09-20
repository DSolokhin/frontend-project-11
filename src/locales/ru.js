// src/locales/ru.js
export default {
  translation: {
    // Общие элементы
    mainTitle: 'RSS агрегатор',
    mainLead: 'Начните читать RSS сегодня! Это легко, это красиво.',
    formInputLabel: 'Ссылка RSS',
    formSubmitButton: 'Добавить',
    formExample: 'Пример: https://lorem-rss.hexlet.app/feed',
    postsTitle: 'Посты',
    feedsTitle: 'Фиды',
    modalReadAll: 'Читать полностью',
    modalClose: 'Закрыть',

    // Сообщения об успехе
    success: 'RSS успешно загружен',

    // Сообщения об ошибках
    errors: {
      required: 'Не должно быть пустым',
      url: 'Ссылка должна быть валидным URL',
      notOneOf: 'RSS уже существует',
      network: 'Ошибка сети',
      parsing: 'Ресурс не содержит валидный RSS',
      unknown: 'Неизвестная ошибка'
    },

    // Состояния загрузки
    loading: 'Идет загрузка...'
  }
}
