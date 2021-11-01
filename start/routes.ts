import Route from '@ioc:Adonis/Core/Route'

//CONTROLLER VISTAS
Route.group(()=>{
  Route.get('/login','VistasController.Login').middleware('guest')
  Route.get('/','VistasController.Home').middleware('auth')
});

//Controller User
Route.group(()=>{
  Route.get('auth/logout','UsersController.logout').as('logout').middleware('auth');
  Route.post('auth/login','UsersController.login').as('login');

  Route.get('/all','UsersController.index');
  Route.post('/add','UsersController.store');
  Route.post('/delete','UsersController.delete');
  Route.post('/alguien','UsersController.alguien');
}).prefix('/user');

