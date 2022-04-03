import Route from '@ioc:Adonis/Core/Route'

Route.resource('posts', 'PostsController').apiOnly()

Route.group(() => {
  Route.put('/:id/update-status', 'PostsController.updateStatus')
}).prefix('/posts')
