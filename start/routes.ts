import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('airelimpio/map')
})

//Vistas
Route.get('/station', 'StationsController.show').as('station').middleware('auth')
Route.get('/model', 'ModelsController.show').as('model').middleware('auth')
Route.get('/pollutant', 'PollutantsController.show').as('pollutant').middleware('auth')
Route.get('/report', 'DataController.show').as('report').middleware('auth')
Route.get('/ca-admin', 'UsersController.showLogin').middleware('guest')

//Controller User
Route.group(() => {
  Route.get('auth/logout', 'UsersController.logout').as('logout').middleware('auth')
  Route.post('auth/login', 'UsersController.login').as('login')

  Route.get('/all', 'UsersController.index')
  Route.post('/store', 'UsersController.store')
  Route.post('/delete', 'UsersController.delete')
  Route.post('/someone', 'UsersController.someone')
}).prefix('/user')
