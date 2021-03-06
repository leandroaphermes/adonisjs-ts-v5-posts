import BaseSchema from '@ioc:Adonis/Lucid/Schema'

import { PostStatus } from 'Contracts/enums'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('created_id')
        .unsigned()
        .references('users.id')
        .notNullable()
        .onDelete('RESTRICT')
      table.string('title').notNullable()
      table.string('slug').notNullable().unique()
      table.string('description').notNullable()
      table.text('content').notNullable()
      table
        .enu('status', Object.values(PostStatus))
        .notNullable()
        .defaultTo('draft')
        .index()
      table.timestamp('published_at', { useTz: true }).nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
