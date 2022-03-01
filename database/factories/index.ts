import Factory from '@ioc:Adonis/Lucid/Factory'

import Post from 'App/Models/Post'
import User from 'App/Models/User'

import { PostStatus, UserType } from 'Contracts/enums'

export const PostFactory = Factory.define(Post, ({ faker }) => {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    slug: faker.lorem.slug(),
    content: faker.lorem.paragraphs(4),
    status: PostStatus.DRAFT,
  }
})
  .state('published', (post) => (post.status = PostStatus.PUBLIC))
  .state('draft', (post) => (post.status = PostStatus.DRAFT))
  .build()

export const UserFactory = Factory.define(User, ({ faker }) => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  return {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email(firstName, lastName, 'gmail.com'),
    password: '123123',
    type: UserType.VISIT,
  }
})
  .state('visit', (post) => (post.type = UserType.VISIT))
  .state('creator', (post) => (post.type = UserType.CREATOR))
  .relation('posts', () => PostFactory)
  .build()
