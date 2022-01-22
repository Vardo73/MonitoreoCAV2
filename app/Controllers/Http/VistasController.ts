import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contaminante from 'App/Models/Contaminante'
import Estacion from 'App/Models/Estacion';
import Modelo from 'App/Models/Modelo';
import TipoB from 'App/Models/TipoB'

export default class VistasController {
    public async Login ({view}:HttpContextContract){
        return view.render('auth/login');
    }

    public async Home({view}:HttpContextContract){
        return view.render('home');
    }

    public async Estaciones({view}:HttpContextContract){
        const modelos=await Modelo.all();
        const estaciones=await Estacion.all();
        return view.render('estaciones',{modelos,estaciones});
    }

    public async Contaminantes({view}:HttpContextContract){
        const contaminantes=await Contaminante.all();
        const tipos=await TipoB.all();
        
        //return tipos
        return view.render('contaminantes',{tipos,contaminantes});
    }
}
