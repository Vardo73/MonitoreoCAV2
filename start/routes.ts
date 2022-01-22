import Route from '@ioc:Adonis/Core/Route'

//CONTROLLER VISTAS
Route.group(()=>{
  Route.get('/login','VistasController.Login').middleware('guest')
  Route.get('/','VistasController.Home').as('home').middleware('auth')
  Route.get('/estaciones','VistasController.Estaciones').as('estaciones').middleware('auth');
  Route.get('/contaminantes','VistasController.Contaminantes').as('contaminantes').middleware('auth');
});

//Controller User
Route.group(()=>{
  Route.get('auth/logout','UsersController.logout').as('logout').middleware('auth');
  Route.post('auth/login','UsersController.login').as('login');

  Route.get('/all','UsersController.index');
  Route.post('/store','UsersController.store')
  Route.post('/delete','UsersController.delete');
  Route.post('/alguien','UsersController.alguien');
}).prefix('/user');

//Controller Tipo Bandera
Route.group(()=>{
  Route.get('/all','TipoBsController.index');
  Route.post('/store','TipoBsController.store');
  Route.post('/delete','TipoBsController.delete');
}).prefix('/tipob');

//Controller Tipo datos
Route.group(()=>{
  Route.get('/all','TiposController.index');
  Route.post('/store','TiposController.store');
  Route.post('/delete','TiposController.delete');
}).prefix('/tipo');

//Controller Localidad
Route.group(()=>{
  Route.get('/all','LocalidadsController.index');
  Route.post('/store','LocalidadsController.store');
  Route.post('/delete','LocalidadsController.delete');
}).prefix('/localidad');

//Controller Modelo
Route.group(()=>{
  Route.get('/all','ModelosController.index');
  Route.post('/store','ModelosController.store');
  Route.post('/delete','ModelosController.delete');
}).prefix('/modelo');

//Controller Contaminante
Route.group(()=>{
  Route.get('/all','ContaminantesController.index');
  Route.get('/consulta/:id','ContaminantesController.consulta');
  Route.post('/store','ContaminantesController.store').as('AgregaContaminante');
  Route.post('/edit','ContaminantesController.edit');
  Route.post('/delete','ContaminantesController.delete');
  
  Route.post('/bandera/store','BanderasController.store');
  Route.post('/bandera/delete','BanderasController.delete');
}).prefix('/contaminante');

//Controller Estaciones
Route.group(()=>{
  Route.get('/all','EstacionesController.index');
  Route.get('/consulta/:id','EstacionesController.consulta');
  Route.post('/store','EstacionesController.store');
  Route.post('/delete','EstacionesController.delete');
}).prefix('/estacion');
