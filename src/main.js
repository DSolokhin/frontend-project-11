// src/main.js
import './styles.scss'
import 'bootstrap'
import onChange from 'on-change'
import validateUrl from './validator.js'
import createView from './view.js'

const app = () => {
  const state = {
    form: {
      state: 'filling',
      error: null
    },
    feeds: [],
    posts: []
  }

  const { elements, watchedState } = createView(state)

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const formData = new FormData(elements.form)
    const url = formData.get('url').trim()

    watchedState.form.state = 'sending'
    watchedState.form.error = null

    try {
      await validateUrl(watchedState, url)
      
      // Здесь будет логика добавления RSS
      watchedState.feeds.push({ 
        url, 
        title: 'Новый RSS', 
        description: '' 
      })
      watchedState.form.state = 'finished'
      
    } catch (error) {
      watchedState.form.error = error.message
      watchedState.form.state = 'filling'
    }
  })

  // Очищаем ошибки при изменении input
  elements.input.addEventListener('input', () => {
    if (watchedState.form.error) {
      watchedState.form.error = null
    }
  })
}

export default app

document.addEventListener('DOMContentLoaded', app)
