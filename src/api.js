// src/api.js
import axios from 'axios'

export const fetchRSS = (url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`
  
  return axios.get(proxyUrl)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Ошибка сети')
      }
      return response.data.contents
    })
}
