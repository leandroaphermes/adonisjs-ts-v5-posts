import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePostValidator from 'App/Validators/CreatePostValidator'

import Post from 'App/Models/Post'
import UpdatePostValidator from 'App/Validators/UpdatePostValidator'
import NotFoundException from 'App/Exceptions/NotFoundException'

export default class PostsController {
  public async index({ response }: HttpContextContract) {
    const posts = await Post.all()

    response.ok(posts)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePostValidator)

    const post = await Post.create(payload)

    await post.load('created')
    await post.load('comments')

    response.created(post)
  }

  public async show({ params, response }: HttpContextContract) {
    const post = await Post.query()
      .where('id', params.id)
      .preload('created')
      .preload('comments')
      .firstOrFail()

    response.ok(post)
  }

  public async update({
    request,
    params,
    response,
  }: HttpContextContract) {
    if (!params.id) throw new NotFoundException('Post not found')

    const payload = await request.validate(UpdatePostValidator)

    const post = await Post.findOrFail(params.id)

    post.merge(payload)

    await post.save()

    response.ok(post)
  }

  public async destroy({ params, response }: HttpContextContract) {
    if (!params.id) throw new NotFoundException('Post not found')

    const post = await Post.findOrFail(params.id)

    await post.delete()

    response.noContent()
  }
}
