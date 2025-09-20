// src/api.js
import axios from 'axios'

export const fetchRSS = (url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`

  return axios.get(proxyUrl, { timeout: 10000 })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Ошибка сети')
      }
      if (!response.data.contents) {
        throw new Error('Пустой ответ от сервера')
      }
      return response.data.contents
    })
    .catch((error) => {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Таймаут запроса')
      }
      throw new Error('Ошибка сети')
    })
}
