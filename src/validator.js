// src/validator.js
import * as yup from 'yup'

export default (state, url) => {
  const urlLists = state.feeds.map(feed => feed.url)
  const schema = yup
    .string()
    .url('Ссылка должна быть валидным URL')
    .required('Не должно быть пустым')
    .notOneOf(urlLists, 'RSS уже существует')
  
  return schema.validate(url)
}
