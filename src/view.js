import onChange from 'on-change'

const createView = (state, form) => {
  const input = form.querySelector('#rss-url')
  const feedback = document.createElement('div')
  feedback.className = 'feedback'
  form.appendChild(feedback)

  const watchedState = onChange(state, (path, value) => {
    if (path === 'form.error') {
      if (value) {
        input.classList.add('is-invalid')
        feedback.textContent = value
        feedback.className = 'feedback text-danger mt-2'
      } else {
        input.classList.remove('is-invalid')
        feedback.textContent = ''
        feedback.className = 'feedback'
      }
    }

    if (path === 'form.processState' && value === 'finished') {
      form.reset()
      input.focus()
    }
  })

  return watchedState
}

export default createView

