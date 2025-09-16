// src/view.js
import onChange from 'on-change'

const createView = (state) => {
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    feedback: document.querySelector('.feedback'), // Используем существующий элемент
    submitButton: document.querySelector('[type="submit"]'),
    contentSection: document.getElementById('content-section')
  }

  console.log('Feedback element:', elements.feedback) // Проверка

  const watchedState = onChange(state, (path, value) => {
    console.log('State changed:', path, value)
    
    switch (path) {
      case 'form.state':
        if (value === 'sending') {
          elements.submitButton.disabled = true
          elements.input.readOnly = true
        } else if (value === 'finished') {
          elements.form.reset()
          elements.input.focus()
          elements.submitButton.disabled = false
          elements.input.readOnly = false
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
          elements.feedback.style.display = 'block'
          elements.feedback.style.color = '#ff6b6b' // Яркий красный для темного фона
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
