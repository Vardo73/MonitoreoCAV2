import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('airelimpio/map')
}).as('map')

//Views
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

//Controller Pollutant
Route.group(() => {
  Route.post('/store', 'PollutantsController.store')
  Route.post('/edit', 'PollutantsController.edit')
  Route.post('/delete', 'PollutantsController.delete')
}).prefix('/pollutant')


//Controller Model
Route.group(() => {
  Route.post('/store', 'ModelsController.store')
  Route.post('/delete', 'ModelsController.delete')
  Route.post('/edit', 'ModelsController.edit')
  Route.post('/showModel', 'ModelsController.showModel')
}).prefix('/model')


//Controller Station
Route.group(() => {
  Route.post('/store', 'StationsController.store')
  Route.post('/delete', 'StationsController.delete')
  Route.post('/edit', 'StationsController.edit')
  Route.post('/showStation', 'StationsController.showStation')
}).prefix('/station')


//Controller Data
Route.group(() => {
  Route.post('/report_day', 'DataController.reportDayJson')
  Route.post('/report_month', 'DataController.reportMonthJson')
  Route.get('/report/:station_id/:date', 'DataController.reportDayHTML')
  Route.get('/report_month/:station_id/:date', 'DataController.reportMonthHTML')
  Route.get('api/frontc3rk41r3/datosmoviles', 'DataController.API')
}).prefix('/data')