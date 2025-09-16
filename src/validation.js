const validateUrl = (url, feeds) => {
  return new Promise((resolve, reject) => {
    if (!url || url.trim() === '') {
      reject(new Error('Не должно быть пустым'))
      return
    }

    try {
      new URL(url)
    } catch (error) {
      reject(new Error('Ссылка должна быть валидным URL'))
      return
    }

    if (feeds.includes(url)) {
      reject(new Error('RSS уже существует'))
      return
    }

    if (!url.includes('rss') && !url.includes('feed') && !url.includes('.xml')) {
      reject(new Error('Ресурс не содержит валидный RSS'))
      return
    }

    resolve(url)
  })
}

export default validateUrl
