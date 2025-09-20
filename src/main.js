// src/main.js
import './styles.scss'
import 'bootstrap'
import onChange from 'on-change'
import validateUrl from './validator.js'
import createView from './view.js'
import { fetchRSS } from './api.js'
import { parseRSS } from './parser.js'

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

  const addFeed = (url, feedData, postsData) => {
    const feedId = Date.now().toString()
    
    const feed = {
      id: feedId,
      url,
      title: feedData.title,
      description: feedData.description
    }

    const posts = postsData.map(post => ({
      id: Date.now().toString() + Math.random().toString(),
      feedId,
      title: post.title,
      link: post.link,
      description: post.description
    }))

    watchedState.feeds.push(feed)
    watchedState.posts = [...watchedState.posts, ...posts]
  }

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const formData = new FormData(elements.form)
    const url = formData.get('url').trim()

    watchedState.form.state = 'sending'
    watchedState.form.error = null

    try {
      await validateUrl(watchedState, url)
      
      const xmlString = await fetchRSS(url)
      const { feed, posts } = parseRSS(xmlString)
      
      addFeed(url, feed, posts)
      watchedState.form.state = 'finished'
      
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = error.message === 'Ресурс не содержит валидный RSS' 
        ? 'Ресурс не содержит валидный RSS'
        : error.message === 'Ошибка сети'
          ? 'Ошибка сети'
          : error.message
      
      watchedState.form.error = errorMessage
      watchedState.form.state = 'filling'
    }
  })

  elements.input.addEventListener('input', () => {
    if (watchedState.form.error) {
      watchedState.form.error = null
    }
  })
}

export default app

document.addEventListener('DOMContentLoaded', app)
