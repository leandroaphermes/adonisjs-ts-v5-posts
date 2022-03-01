import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoryPost extends BaseSchema {
  protected tableName = 'category_post'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('category_id')
        .notNullable()
        .unsigned()
        .references('categories.id')
        .index()
      table
        .integer('post_id')
        .notNullable()
        .unsigned()
        .references('posts.id')
        .index()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
