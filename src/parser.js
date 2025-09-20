// src/parser.js
export const parseRSS = (xmlString) => {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml')
  
  const parseError = xmlDoc.querySelector('parsererror')
  if (parseError) {
    throw new Error('Ресурс не содержит валидный RSS')
  }

  const channel = xmlDoc.querySelector('channel')
  const feed = {
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  }

  const items = xmlDoc.querySelectorAll('item')
  const posts = Array.from(items).map((item) => ({
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
    description: item.querySelector('description')?.textContent || '',
  }))

  return { feed, posts }
}
