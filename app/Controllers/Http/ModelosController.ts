import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Modelo from 'App/Models/Modelo'

export default class ModelosController {
    public async index(ctx:HttpContextContract){
        return await Modelo.all();
    }

    public async store({request}:HttpContextContract){
        const modelo= await Modelo.create({
            name: request.input('name')
        });

        return modelo;
    }

     //Elimina un registro de Tipo
    public async destroy({params}:HttpContextContract){
        const {id}=params;
        const modelo=await Modelo.find(id);
        await modelo?.delete();
        return modelo;
    }
}
