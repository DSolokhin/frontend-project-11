import * as yup from 'yup'
import i18next from 'i18next'

const setupYupLocale = () => {
  yup.setLocale({
    string: {
      url: () => ({ key: 'errors.url' }),
    },
    mixed: {
      required: () => ({ key: 'errors.required' }),
      notOneOf: () => ({ key: 'errors.notOneOf' }),
    },
  })
}

const validateUrl = (url, feeds) => {
  setupYupLocale()
  
  const schema = yup.string()
    .required()
    .url()
    .notOneOf(feeds)

  return schema.validate(url)
}

export default validateUrl
