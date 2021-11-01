import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TipoB from 'App/Models/TipoB'

export default class TipoBsController {

    public async index(ctx:HttpContextContract){
        return await TipoB.all();
    }

    public async store({request}:HttpContextContract){
        const tipoB = await TipoB.create({
            name: request.input('name')
        });

        
       return tipoB;
    }

     //Elimina un registro de Tipo
   async destroy({params}:HttpContextContract){
    const {id}=params;
    const tipo=await TipoB.find(id);
    await tipo?.delete();
    return tipo;
}

}
