import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator'

export default class PostsController {
  public async index({ response }: HttpContextContract) {
    const posts = await Post.all()

    response.ok(posts)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreatePostValidator)

    const post = await Post.create(data)

    await post.load('created')

    response.created(post)
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
