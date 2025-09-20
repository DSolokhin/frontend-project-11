// src/i18n.js
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ru from './locales/ru.js'

const i18n = i18next.createInstance()

i18n
  .use(LanguageDetector)
  .init({
    debug: false,
    lng: 'ru',
    fallbackLng: 'ru',
    resources: {
      ru,
    },
  })

export default i18n
