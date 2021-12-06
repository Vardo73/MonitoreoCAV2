import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contaminante from 'App/Models/Contaminante'
import TipoB from 'App/Models/TipoB'

export default class VistasController {
    public async Login ({view}:HttpContextContract){
        return view.render('auth/login');
    }

    public async Home({view}:HttpContextContract){
        return view.render('home');
    }

    public async Estaciones({view}:HttpContextContract){
        return view.render('estaciones');
    }

    public async Contaminantes({view}:HttpContextContract){
        const contaminantes=await Contaminante.all();
        const tipos=await TipoB.all();
        
        //return tipos
        return view.render('contaminantes',{tipos,contaminantes});
    }
}
