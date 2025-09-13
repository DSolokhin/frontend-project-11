import * as yup from 'yup'

const setupYupLocale = (i18nInstance) => {
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

const validateUrl = (url, feeds, i18nInstance) => {
  setupYupLocale(i18nInstance)
  
  const schema = yup.string()
    .required()
    .url()
    .notOneOf(feeds)

  return schema.validate(url)
}

export default validateUrl
