// src/view.js
import onChange from 'on-change'
import i18n from './i18n.js'

const createView = (state) => {
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    feedback: document.querySelector('.feedback'),
    submitButton: document.querySelector('[type="submit"]'),
    contentSection: document.getElementById('content-section'),
    feedsContainer: document.querySelector('.feeds-container'),
    postsContainer: document.querySelector('.posts-container'),
  }

  const renderFeeds = (feeds) => {
    if (feeds.length === 0) {
      return
    }

    const feedsHtml = `
      <ul class="list-group">
        ${feeds.map((feed) => `
          <li class="list-group-item border-0">
            <h4 class="h6 mb-1">${feed.title}</h4>
            <p class="text-muted small mb-0">${feed.description}</p>
          </li>
        `).join('')}
      </ul>
    `

    elements.feedsContainer.innerHTML = feedsHtml
  }

  const renderPosts = (posts, viewedPosts) => {
    if (posts.length === 0) {
      return
    }

    const postsHtml = `
      <ul class="list-group">
        ${posts.map((post) => {
          const isViewed = viewedPosts.has(post.id)

          return `
          <li class="list-group-item border-0">
            <div class="d-flex justify-content-between align-items-start">
              <a href="${post.link}" target="_blank" rel="noopener noreferrer" 
                 ${isViewed ? '' : 'class="fw-bold"'}
                 style="text-decoration: none;">
                ${post.title}
              </a>
              <button type="button" class="btn btn-outline-primary btn-sm ms-2" 
                      data-bs-toggle="modal" 
                      data-bs-target="#modal"
                      data-post-id="${post.id}"
                      data-post-title="${post.title}"
                      data-post-description="${post.description}"
                      data-post-link="${post.link}">
                Просмотр
              </button>
            </div>
          </li>
          `
        }).join('')}
      </ul>
    `

    elements.postsContainer.innerHTML = postsHtml

    const viewButtons = elements.postsContainer.querySelectorAll('[data-bs-toggle="modal"]')
    viewButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const postId = button.getAttribute('data-post-id')

        watchedState.viewedPosts.add(postId)

        const modalTitle = document.querySelector('.modal-title')
        const modalBody = document.querySelector('.modal-body')
        const modalLink = document.querySelector('.full-article')

        modalTitle.textContent = button.getAttribute('data-post-title')
        modalBody.textContent = button.getAttribute('data-post-description')
        modalLink.href = button.getAttribute('data-post-link')

        renderPosts(watchedState.posts, watchedState.viewedPosts)
      })
    })
  }

  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.state':
        if (value === 'sending') {
          elements.submitButton.disabled = true
          elements.input.readOnly = true
          elements.feedback.textContent = i18n.t('loading')
          elements.feedback.style.color = '#0d6efd'
          elements.feedback.style.display = 'block'
        }
        else if (value === 'finished') {
          elements.form.reset()
          elements.input.focus()
          elements.submitButton.disabled = false
          elements.input.readOnly = false
          elements.feedback.textContent = i18n.t('success')
          elements.feedback.style.color = '#198754'
          elements.feedback.style.display = 'block'
          setTimeout(() => {
            elements.feedback.textContent = ''
            elements.feedback.style.display = 'none'
          }, 3000)
        }
        else {
          elements.submitButton.disabled = false
          elements.input.readOnly = false
        }
        break

      case 'form.error':
        if (value) {
          elements.input.classList.add('is-invalid')
          elements.feedback.textContent = value
          elements.feedback.style.color = '#dc3545'
          elements.feedback.style.display = 'block'
        }
        else {
          elements.input.classList.remove('is-invalid')
          elements.feedback.textContent = ''
          elements.feedback.style.display = 'none'
        }
        break

      case 'feeds':
        if (value.length > 0 && elements.contentSection) {
          elements.contentSection.classList.remove('d-none')
        }
        renderFeeds(value)
        break

      case 'posts':
        renderPosts(value, watchedState.viewedPosts)
        break

      case 'viewedPosts':
        renderPosts(watchedState.posts, watchedState.viewedPosts)
        break

      default:
        break
    }
  })

  return { elements, watchedState }
}

export default createView
