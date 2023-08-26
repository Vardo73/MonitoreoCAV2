import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('airelimpio/map')
}).as('map')

//Views
Route.get('/ca-admin', 'UsersController.showLogin').middleware('guest')

Route.get('/station', 'StationsController.show').as('station').middleware('auth')
Route.get('/fwop', 'StationsController.showFWOP').as('stationFWOP').middleware('auth')
Route.get('/model', 'ModelsController.show').as('model').middleware('auth')
Route.get('/suburb', 'SuburbsController.show').as('suburb').middleware('auth')
Route.get('/ailment', 'AilmentsController.show').as('ailment').middleware('auth')
Route.get('/location', 'LocationsController.show').as('location').middleware('auth')
Route.get('/pollutant', 'PollutantsController.show').as('pollutant').middleware('auth')
Route.get('/report', 'DataController.show').as('report').middleware('auth')
Route.get('/json', 'DataController.showJson').as('json').middleware('auth')
Route.get('/sponsor', 'SponsorsController.show').as('sponsor').middleware('auth')
Route.get('/calendar', 'DataController.calendar').as('calendar').middleware('auth')

Route.get('/historics/:station_id', 'StationsController.historics').as('historics')
Route.get('/historics_fwop/:station_id', 'StationsController.historicsFWOP').as('historicsfwop')
Route.get('/mapa-salud', 'LocationsController.showMap').as('mapAilments')
Route.get('/mapa-calonia', 'SuburbsController.showMap').as('mapSuburb')

//APP MOVIL 
Route.group(() => {
  Route.post('/data_day', 'DataController.dataHAppMovil')
  Route.get('/stations', 'StationsController.AppMovilStation')
  Route.post('/data_month', 'DataController.dataMAppMovil')
}).prefix('/appmovil')

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


//Controller Ailment
Route.group(() => {
  Route.post('/store', 'AilmentsController.store')
  Route.post('/edit', 'AilmentsController.edit')
  Route.post('/showAilment', 'AilmentsController.showAilment')
  Route.post('/delete', 'AilmentsController.delete')
  Route.post('/storeAilLoc', 'AilmentsController.storeAilLoc')
}).prefix('/ailment')

//Controller Location
Route.group(() => {
  Route.post('/store', 'LocationsController.store')
  Route.post('/edit', 'LocationsController.edit')
  Route.post('/delete', 'LocationsController.delete')
  Route.get('/map', 'LocationsController.LocationsMap')
  Route.get('/LocAil/:location_id', 'LocationsController.LocAil')
}).prefix('/location')

//Controller Model
Route.group(() => {
  Route.post('/store', 'ModelsController.store')
  Route.post('/delete', 'ModelsController.delete')
  Route.post('/edit', 'ModelsController.edit')
  Route.post('/showModel', 'ModelsController.showModel')
}).prefix('/model')

//Controller Suburb
Route.group(() => {
  Route.post('/store', 'SuburbsController.store')
  Route.post('/delete', 'SuburbsController.delete')
  Route.post('/edit', 'SuburbsController.edit')
  Route.post('/showSuburb', 'SuburbsController.showSuburb')
  Route.get('/map', 'SuburbsController.SuburbMap')
  Route.get('/sub_poll/:suburb_id', 'SuburbsController.SubPoll')
}).prefix('/suburb')

//Controller Subscriber
Route.group(() => {
  Route.post('/store', 'SubscribersController.store')
}).prefix('/subscriber')

//Controller Sponsor
Route.group(() => {
  Route.post('/store', 'SponsorsController.store')
  Route.post('/delete', 'SponsorsController.delete')
}).prefix('/sponsor')

//Controller Station
Route.group(() => {
  /*Purple-Air*/
  Route.post('/store', 'StationsController.store')
  Route.post('/edit', 'StationsController.edit')

  /*FWOP*/
  Route.post('/storefwop', 'StationsController.storeFWOP')
  Route.post('/editfwop', 'StationsController.editFWOP')

  /*General*/
  Route.post('/showStation', 'StationsController.showStation')
  Route.get('/map', 'StationsController.StationsMap')
  Route.post('/delete', 'StationsController.delete')
  Route.post('/active', 'StationsController.active')
}).prefix('/station')


//Controller Data
Route.group(() => {
  Route.post('/report_day', 'DataController.reportDayJson')
  Route.post('/report_month', 'DataController.reportMonthJson')
  Route.post('/report_calendar', 'DataController.reportCalendarJson')
  Route.post('/report_year', 'DataController.reportYearJson')
  Route.get('/report/:station_id/:date', 'DataController.reportDayHTML')
  Route.get('/report_month/:station_id/:date', 'DataController.reportMonthHTML')
  Route.get('/report_year/:station_id/:date', 'DataController.reportYearHTML')

  
  Route.post('/fwop', 'DataController.storeDataFwop')
}).prefix('/data')