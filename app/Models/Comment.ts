import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
} from '@ioc:Adonis/Lucid/Orm'

import User from './User'
import Post from './Post'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public post_id: number

  @column()
  public created_id: number

  @column()
  public message: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'created_id',
    onQuery: (query) => query.select(['id', 'name']),
  })
  public created: BelongsTo<typeof User>

  @belongsTo(() => Post, {
    foreignKey: 'post_id',
  })
  public comments: BelongsTo<typeof Post>
}
