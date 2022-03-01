import Route from '@ioc:Adonis/Core/Route'

Route.resource('comments', 'CommentsController').apiOnly()
