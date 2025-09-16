const parseRss = (data) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(data, 'text/xml')
  
  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    throw new Error('errors.invalidRss')
  }

  const channel = doc.querySelector('channel')
  if (!channel) {
    throw new Error('errors.invalidRss')
  }

  const feed = {
    title: channel.querySelector('title')?.textContent || 'Без названия',
    description: channel.querySelector('description')?.textContent || 'Без описания',
  }

  const items = doc.querySelectorAll('item')
  const posts = Array.from(items).map((item) => ({
    title: item.querySelector('title')?.textContent || 'Без названия',
    link: item.querySelector('link')?.textContent || '#',
    description: item.querySelector('description')?.textContent || 'Без описания',
  }))

  return { feed, posts }
}

export default parseRss
