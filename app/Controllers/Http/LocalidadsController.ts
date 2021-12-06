import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Localidad from 'App/Models/Localidad'

export default class LocalidadsController {
    public async index(ctx:HttpContextContract){
        return await Localidad.all();
    }

    public async store({request}:HttpContextContract){
        const localidad= await Localidad.create({
            name: request.input('name')
        });

        
       return localidad;
    }

     //Elimina un registro de Tipo
    public async destroy({params}:HttpContextContract){
        const {id}=params;
        const localidad=await Localidad.find(id);
        await localidad?.delete();
        return localidad;
    }
}
