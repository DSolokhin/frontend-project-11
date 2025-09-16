import axios from 'axios'

const PROXY_URL = 'https://allorigins.hexlet.app/get'

const loadRss = (url) => {
  const proxyUrl = new URL(PROXY_URL)
  proxyUrl.searchParams.set('url', url)
  proxyUrl.searchParams.set('disableCache', 'true')

  return axios.get(proxyUrl.toString())
    .then((response) => {
      if (response.data.contents) {
        return response.data.contents
      }
      throw new Error('errors.network')
    })
    .catch(() => {
      throw new Error('errors.network')
    })
}

export default loadRss
