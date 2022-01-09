import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateUserValidator from 'App/Validators/CreateUserValidator'

import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()

    response.ok(users)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)

    const user = await User.create({ ...data, type: 'visit' })

    response.created(user)
  }
}
