import './styles/main.css'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rss-form')
  const urlInput = document.getElementById('rss-url')

  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    const url = urlInput.value.trim()
    
    if (!url) {
      showError('Пожалуйста, введите URL RSS потока')
      return
    }

    console.log('Добавляем RSS:', url)
    urlInput.value = ''
  }

  const showError = (message) => {
    const errorDiv = document.createElement('div')
    errorDiv.className = 'alert alert-danger mt-3'
    errorDiv.textContent = message
    errorDiv.setAttribute('role', 'alert')
    
    form.parentNode.appendChild(errorDiv)
    
    setTimeout(() => {
      errorDiv.remove()
    }, 3000)
  }

  form.addEventListener('submit', handleFormSubmit)
})
