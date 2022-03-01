import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator'
export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    const categories = await Category.all()

    response.ok(categories)
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateCategoryValidator)

    const category = await Category.create(payload)

    response.created(category)
  }

  public async show({ params, response }: HttpContextContract) {
    const category = await Category.query()
      .where('id', params.id)
      .firstOrFail()

    response.ok(category)
  }

  public async update({
    request,
    params,
    response,
  }: HttpContextContract) {
    if (!params.id) throw new NotFoundException('Category not found')

    const payload = await request.validate(UpdateCategoryValidator)

    const category = await Category.findOrFail(params.id)

    await category.merge(payload).save()

    response.ok(category)
  }

  public async destroy({ params, response }: HttpContextContract) {
    if (!params.id) throw new NotFoundException('Category not found')

    const category = await Category.findOrFail(params.id)

    await category.delete()

    response.noContent()
  }
}
