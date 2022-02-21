import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'
import Comment from 'App/Models/Comment'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public created_id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public slug: string

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'created_id',
    onQuery: (query) => query.select(['id', 'name']),
  })
  public created: BelongsTo<typeof User>

  @hasMany(() => Comment, {
    foreignKey: 'post_id',
  })
  public comments: HasMany<typeof Comment>
}
