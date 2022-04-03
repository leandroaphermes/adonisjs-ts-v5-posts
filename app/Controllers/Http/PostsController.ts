import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import NotFoundException from 'App/Exceptions/NotFoundException'

import CreatePostValidator from 'App/Validators/CreatePostValidator'
import UpdatePostValidator from 'App/Validators/UpdatePostValidator'

import Post from 'App/Models/Post'
import UpdatePostStatusValidator from 'App/Validators/UpdatePostStatusValidator'
import { PostStatus } from 'Contracts/enums'
import { DateTime } from 'luxon'

export default class PostsController {
  public async index({ response }: HttpContextContract) {
    const posts = await Post.query()
      .preload('categories')
      .preload('created')

    response.ok(posts)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePostValidator)

    const post = await Post.create(payload)

    await post.load('created')
    await post.load('comments')
    await post.load('categories')

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

    await post.merge(payload).save()

    response.ok(post)
  }

  public async destroy({ params, response }: HttpContextContract) {
    if (!params.id) throw new NotFoundException('Post not found')

    const post = await Post.findOrFail(params.id)

    await post.delete()

    response.noContent()
  }

  public async updateStatus({
    request,
    params,
    response,
  }: HttpContextContract) {
    if (!params.id) throw new NotFoundException('Post not found')

    const payload = await request.validate(UpdatePostStatusValidator)

    const post = await Post.findOrFail(params.id)

    const publishedAt = [
      PostStatus.PUBLIC,
      PostStatus.PRIVATE,
    ].includes(payload.status)
      ? DateTime.local()
      : undefined

    await post
      .merge({
        ...payload,
        publishedAt: publishedAt,
      })
      .save()

    response.ok(post)
  }
}
