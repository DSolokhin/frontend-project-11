// src/parser.js
export const parseRSS = (xmlString) => {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml')

  const parseError = xmlDoc.querySelector('parsererror')
  if (parseError) {
    throw new Error('Ресурс не содержит валидный RSS')
  }

  const channel = xmlDoc.querySelector('channel')
  if (!channel) {
    throw new Error('Ресурс не содержит валидный RSS')
  }

  const getTextContent = (element, selector) => {
    const found = element.querySelector(selector)
    return found ? found.textContent : ''
  }

  const feed = {
    title: getTextContent(channel, 'title'),
    description: getTextContent(channel, 'description'),
  }

  const items = xmlDoc.querySelectorAll('item')
  const posts = Array.from(items).map(item => ({
    title: getTextContent(item, 'title'),
    link: getTextContent(item, 'link'),
    description: getTextContent(item, 'description'),
  }))

  return { feed, posts }
}
