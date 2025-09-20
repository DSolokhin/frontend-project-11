// src/i18n.js
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const i18n = i18next.createInstance()

i18n
  .use(LanguageDetector)
  .init({
    debug: true, // Включим дебаг для отладки
    fallbackLng: 'ru',
    resources: {
      ru: {
        translation: {
          // Сообщения об ошибках
          errors: {
            required: 'Не должно быть пустым',
            url: 'Ссылка должна быть валидным URL',
            notOneOf: 'RSS уже существует',
          },
          // Сообщения о состоянии
          loading: 'Идет загрузка...',
          success: 'RSS успешно загружен',
        },
      },
    },
  })

export default i18n
