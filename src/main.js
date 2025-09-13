import './styles/main.css'
import validateUrl from './validation.js'
import createView from './view.js'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rss-form')
  const input = document.getElementById('rss-url')
  
  const state = {
    form: {
      processState: 'filling',
      error: null,
    },
    feeds: [],
  }

  const watchedState = createView(state, form)

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
        watchedState.form.error = error.message
        watchedState.form.processState = 'error'
      })
  }

  form.addEventListener('submit', handleFormSubmit)
})
