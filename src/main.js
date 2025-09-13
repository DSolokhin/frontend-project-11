import './styles/main.css'
import validateUrl from './validation.js'
import createView from './view.js'
import initI18n from './i18n.js'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rss-form')
  
  const state = {
    form: {
      processState: 'filling',
      error: null,
    },
    feeds: [],
  }

  // Инициализируем i18next и только потом создаем view
  initI18n().then((i18nInstance) => {
    const watchedState = createView(state, form, i18nInstance)

    const handleFormSubmit = (event) => {
      event.preventDefault()
      
      const formData = new FormData(event.target)
      const url = formData.get('url').trim()

      watchedState.form.error = null
      watchedState.form.processState = 'validating'

      validateUrl(url, state.feeds, i18nInstance)
        .then((validUrl) => {
          watchedState.form.processState = 'sending'
          return Promise.resolve(validUrl)
        })
        .then((validUrl) => {
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
})
