import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('toLowerCase', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }

  options.mutate(value.toLowerCase())
})
