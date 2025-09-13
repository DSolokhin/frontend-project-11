import './styles/main.css'
import validateUrl from './validation.js'
import createView from './view.js'
import i18n from './i18n.js'

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('rss-form')
  
  const state = {
    form: {
      processState: 'filling',
      error: null,
    },
    feeds: [],
  }

  // Инициализация i18next
  const i18nInstance = await i18n()
  const watchedState = createView(state, form, i18nInstance)

  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const url = formData.get('url').trim()

    // Сбрасываем ошибки
    watchedState.form.error = null
    watchedState.form.processState = 'validating'

    validateUrl(url, state.feeds)
      .then((validUrl) => {
        watchedState.form.processState = 'sending'
        return Promise.resolve(validUrl)
      })
      .then((validUrl) => {
        // Здесь будет логика добавления RSS
        console.log('Добавляем RSS:', validUrl)
        watchedState.feeds.push(validUrl)
        watchedState.form.processState = 'finished'
      })
      .catch((error) => {
        const errorKey = error.message?.key || error.message
        watchedState.form.error = { key: errorKey }
        watchedState.form.processState = 'error'
      })
  }

  form.addEventListener('submit', handleFormSubmit)
})
