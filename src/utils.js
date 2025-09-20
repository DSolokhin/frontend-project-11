// Генерация уникального ID
export const generateId = () => Math.random().toString(36).substr(2, 9)

// Нормализация постов с ID
export const normalizePosts = (posts, feedId) => {
  return posts.reduce((acc, post) => {
    const id = generateId()
    acc.entities[id] = {
      ...post,
      id,
      feedId,
      title: post.title || 'Без названия',
      link: post.link || '#',
      description: post.description || 'Без описания',
    }
    acc.ids.push(id)
    return acc
  }, { entities: {}, ids: [] })
}

// Нормализация фидов с ID
export const normalizeFeeds = (feeds) => {
  return feeds.reduce((acc, feed) => {
    const id = generateId()
    acc.entities[id] = {
      ...feed,
      id,
      title: feed.title || 'Без названия',
      description: feed.description || 'Без описания',
    }
    acc.ids.push(id)
    return acc
  }, { entities: {}, ids: [] })
}

// Денормализация для рендеринга
export const denormalizePosts = (postsState) => {
  return postsState.ids.map((id) => postsState.entities[id])
}

export const denormalizeFeeds = (feedsState) => {
  return feedsState.ids.map((id) => feedsState.entities[id])
}

