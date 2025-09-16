// src/view.js
import onChange from 'on-change'
import i18n from './i18n.js'

const createView = (state) => {
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    feedback: document.querySelector('.feedback'),
    submitButton: document.querySelector('[type="submit"]'),
    contentSection: document.getElementById('content-section')
  }

  console.log('Elements found:', elements)

  const watchedState = onChange(state, (path, value) => {
    console.log('State changed:', path, value)
    
    switch (path) {
      case 'form.state':
        if (value === 'sending') {
          elements.submitButton.disabled = true
          elements.input.readOnly = true
          elements.feedback.textContent = i18n.t('loading')
          elements.feedback.style.color = '#0d6efd'
          elements.feedback.style.display = 'block'
        } else if (value === 'finished') {
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
        } else {
          elements.submitButton.disabled = false
          elements.input.readOnly = false
        }
        break
        
      case 'form.error':
        console.log('Error to display:', value)
        if (value) {
          elements.input.classList.add('is-invalid')
          elements.feedback.textContent = value
          elements.feedback.style.color = '#ff6b6b'
          elements.feedback.style.display = 'block'
        } else {
          elements.input.classList.remove('is-invalid')
          elements.feedback.textContent = ''
          elements.feedback.style.display = 'none'
        }
        break
        
      case 'feeds':
        if (value.length > 0 && elements.contentSection) {
          elements.contentSection.classList.remove('d-none')
        }
        break
        
      default:
        break
    }
  })

  return { elements, watchedState }
}

export default createView
