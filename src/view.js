import onChange from 'on-change'
import i18next from 'i18next'

const createView = (state, form, i18nInstance) => {
  const input = form.querySelector('#rss-url')
  const feedback = document.createElement('div')
  feedback.className = 'feedback'
  form.appendChild(feedback)

  const renderHeader = () => {
    const header = document.querySelector('h1')
    if (header) {
      header.textContent = i18nInstance.t('header')
    }
  }

  const renderFormLabels = () => {
    const title = form.querySelector('.card-title')
    const label = form.querySelector('.form-label')
    const button = form.querySelector('.btn')
    const placeholder = form.querySelector('#rss-url')

    if (title) title.textContent = i18nInstance.t('form.title')
    if (label) label.textContent = i18nInstance.t('form.label')
    if (button) button.textContent = i18nInstance.t('form.submit')
    if (placeholder) placeholder.placeholder = i18nInstance.t('form.placeholder')
  }

  const watchedState = onChange(state, (path, value) => {
    if (path === 'form.error') {
      if (value) {
        input.classList.add('is-invalid')
        feedback.textContent = i18nInstance.t(value.key || value)
        feedback.className = 'feedback text-danger mt-2'
      } else {
        input.classList.remove('is-invalid')
        feedback.textContent = ''
        feedback.className = 'feedback'
      }
    }

    if (path === 'form.processState') {
      if (value === 'finished') {
        form.reset()
        input.focus()
        // Показываем успешное сообщение на 3 секунды
        feedback.textContent = i18nInstance.t('form.success')
        feedback.className = 'feedback text-success mt-2'
        setTimeout(() => {
          feedback.textContent = ''
          feedback.className = 'feedback'
        }, 3000)
      }
      
      if (value === 'error') {
        feedback.className = 'feedback text-danger mt-2'
      }
    }
  })

  // Первоначальный рендер текстов
  renderHeader()
  renderFormLabels()

  return watchedState
}

export default createView
