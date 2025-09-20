// src/validator.js
import * as yup from 'yup'
import i18n from './i18n.js'

yup.setLocale({
  string: {
    url: () => i18n.t('errors.url'),
    required: () => i18n.t('errors.required'),
  },
  mixed: {
    notOneOf: () => i18n.t('errors.notOneOf'),
  },
})

export default (state, url) => {
  const urlLists = state.feeds.map((feed) => feed.url)
  const schema = yup
    .string()
    .url()
    .required()
    .notOneOf(urlLists)
  
  return schema.validate(url)
}
