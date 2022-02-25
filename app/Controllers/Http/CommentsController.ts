import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'

import Comment from 'App/Models/Comment'
import CreateCommentValidator from 'App/Validators/CreateCommentValidator'
import UpdateCommentValidator from 'App/Validators/UpdateCommentValidator'

export default class CommentsController {
  public async index({ response }: HttpContextContract) {
    const comments = await Comment.all()

    response.ok(comments)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateCommentValidator)

    const comment = await Comment.create(payload)

    response.created(comment)
  }

  public async show({ params, response }: HttpContextContract) {
    if (!params.id) throw new NotFoundException('Comment not found')

    const comment = await Comment.findOrFail(params.id)

    response.ok(comment)
  }

  public async update({
    request,
    params,
    response,
  }: HttpContextContract) {
    if (!params.id) throw new NotFoundException('Comment not found')

    const payload = await request.validate(UpdateCommentValidator)

    const comment = await Comment.findOrFail(params.id)

    await comment.merge(payload).save()

    response.ok(comment)
  }

  public async destroy({ params, response }: HttpContextContract) {
    if (!params.id) throw new NotFoundException('Comment not found')

    const comment = await Comment.findOrFail(params.id)

    await comment.delete()

    response.noContent()
  }
}
