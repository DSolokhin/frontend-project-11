// src/main.js
import './styles.scss'
import 'bootstrap'
import onChange from 'on-change'
import validateUrl from './validator.js'
import createView from './view.js'
import i18n from './i18n.js'

const app = () => {
  console.log('App starting...')
  
  const state = {
    form: {
      state: 'filling',
      error: null
    },
    feeds: [],
    posts: []
  }

  const { elements, watchedState } = createView(state)
  console.log('Watched state created:', watchedState)

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('Form submitted')
    
    const formData = new FormData(elements.form)
    const url = formData.get('url').trim()
    console.log('URL to validate:', url)

    watchedState.form.state = 'sending'
    watchedState.form.error = null

    try {
      console.log('Validating URL...')
      await validateUrl(watchedState, url)
      console.log('Validation passed')
      
      watchedState.feeds.push({ 
        url, 
        title: 'Новый RSS', 
        description: '' 
      })
      watchedState.form.state = 'finished'
      
    } catch (error) {
      console.log('Validation error:', error.message)
      watchedState.form.error = error.message
      watchedState.form.state = 'filling'
    }
  })

  elements.input.addEventListener('input', () => {
    if (watchedState.form.error) {
      watchedState.form.error = null
    }
  })
}

// Запускаем сразу, без ожидания initialized
document.addEventListener('DOMContentLoaded', app)
