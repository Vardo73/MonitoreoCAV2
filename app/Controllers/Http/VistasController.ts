import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VistasController {
    public async Login ({view}:HttpContextContract){
        return view.render('auth/login');
    }

    public async Home({view}:HttpContextContract){
        return view.render('home');
    }
}
