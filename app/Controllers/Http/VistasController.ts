import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contaminante from 'App/Models/Contaminante'
import Database from '@ioc:Adonis/Lucid/Database'
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
        const estaciones=await Database
            .from('estacions')
            .join('modelos', (query) => {
                query
                .on('estacions.modelo_id', '=', 'modelos.id')
            })
            .select('estacions.id')
            .select('estacions.name ')
            .select('estacions.channel as channel')
            .select('estacions.apikey as apikey')
            .select('modelos.name as nomM')
            .select('modelos.id as idM')
        
        const relacion=await Database
        .from('contaminante_modelos')
        .join('contaminantes', (query) => {
            query
            .on('contaminantes.id', '=', 'contaminante_modelos.contaminante_id')
        })
        .select('contaminante_modelos.contaminante_id')
        .select('contaminantes.name')
        .select('contaminante_modelos.modelo_id')
           
        return view.render('estaciones',{modelos,estaciones,relacion});
    }

    public async Contaminantes({view}:HttpContextContract){
        const tipos=await TipoB.all();
        
        const contaminantes=await Database
        .from('contaminantes')
        .select('contaminantes.name')
        .select('contaminantes.id')


        const banderas=await Database
        .from('banderas')
        .join('tipo_bs', (query) => {
            query
            .on('tipo_bs.id', '=', 'banderas.tipo_id')
        })
        .select('banderas.id')
        .select('banderas.name')
        .select('banderas.description')
        .select('banderas.lim_oms as LimOMS')
        .select('banderas.lim_nom as LimNOM')
        .select('banderas.contaminante_id as idC')
        .select('tipo_bs.name as NomT')
        .select('tipo_bs.id as idT')
        
        //return tipos
        return view.render('contaminantes',{tipos,contaminantes,banderas});
    }
    
    public async Modelos({view}:HttpContextContract){
        const modelos=await Modelo.all();
        const contaminantes=await Contaminante.all();
        const relacion=await Database
        .from('contaminante_modelos')
        .join('contaminantes', (query) => {
            query
            .on('contaminantes.id', '=', 'contaminante_modelos.contaminante_id')
        })
        .select('contaminante_modelos.contaminante_id')
        .select('contaminantes.name')
        .select('contaminante_modelos.modelo_id')

        return view.render('modelos',{modelos,contaminantes,relacion});
    }

    public async Csv({view}:HttpContextContract){

        return view.render('csv');
    }
    
    public async Clima({view}:HttpContextContract){

        return view.render('clima');
    }
}
