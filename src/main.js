// src/main.js
import './styles.scss'
import 'bootstrap'
import validateUrl from './validator.js'
import createView from './view.js'
import { fetchRSS } from './api.js'
import { parseRSS } from './parser.js'

const app = () => {
  const state = {
    form: {
      state: 'filling',
      error: null,
    },
    feeds: [],
    posts: [],
    viewedPosts: new Set(),
    updateProcess: {
      state: 'idle',
    },
  }

  const { elements, watchedState } = createView(state)

  const addFeed = (url, feedData, postsData) => {
    const feedId = Date.now().toString()

    const feed = {
      id: feedId,
      url,
      title: feedData.title,
      description: feedData.description,
    }

    const posts = postsData.map((post) => ({
      id: `${feedId}-${post.link}`,
      feedId,
      title: post.title,
      link: post.link,
      description: post.description,
    }))

    watchedState.feeds.push(feed)
    watchedState.posts = [...watchedState.posts, ...posts]
  }

  const updateFeeds = () => {
    if (watchedState.feeds.length === 0) {
      setTimeout(updateFeeds, 5000)
      return
    }

    watchedState.updateProcess.state = 'updating'

    const updatePromises = watchedState.feeds.map((feed) =>
      fetchRSS(feed.url)
        .then((xmlString) => {
          const { posts: newPosts } = parseRSS(xmlString)
          const existingPostLinks = watchedState.posts
            .filter((post) => post.feedId === feed.id)
            .map((post) => post.link)

          const uniqueNewPosts = newPosts.filter((post) =>
            !existingPostLinks.includes(post.link),
          )

          if (uniqueNewPosts.length > 0) {
            const postsToAdd = uniqueNewPosts.map((post) => ({
              id: `${feed.id}-${post.link}`,
              feedId: feed.id,
              title: post.title,
              link: post.link,
              description: post.description,
            }))

            watchedState.posts = [...postsToAdd, ...watchedState.posts]
          }
        })
        .catch((error) => {
          console.error(`Error updating feed ${feed.title}:`, error.message)
        }),
    )

    Promise.allSettled(updatePromises).then(() => {
      watchedState.updateProcess.state = 'idle'
      setTimeout(updateFeeds, 5000)
    })
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

      if (watchedState.feeds.length === 1) {
        setTimeout(updateFeeds, 5000)
      }
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

  setTimeout(updateFeeds, 5000)
}

export default app

document.addEventListener('DOMContentLoaded', app)
