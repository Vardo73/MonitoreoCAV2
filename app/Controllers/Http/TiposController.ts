import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tipo from 'App/Models/Tipo'

export default class TiposController {
    public async index(ctx:HttpContextContract){
        return await Tipo.all();
    }

    public async store({request}:HttpContextContract){
        const tipo= await Tipo.create({
            name: request.input('name')
        });

        
       return tipo;
    }

     //Elimina un registro de Tipo
    public async destroy({params}:HttpContextContract){
        const {id}=params;
        const tipo=await Tipo.find(id);
        await tipo?.delete();
        return tipo;
    }
}
