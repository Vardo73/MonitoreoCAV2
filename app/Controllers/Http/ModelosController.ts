import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Modelo from 'App/Models/Modelo'
import ContaminanteModelo from 'App/Models/ContaminanteModelo'

export default class ModelosController {
    public async index(ctx:HttpContextContract){
        return await Modelo.all();
    }

    public async store({request}:HttpContextContract){
        try {
            let contaminantes= request.input('contaminantes');
            const modelo= await Modelo.create({
                name: request.input('name'),
                description:request.input('description')
            });
            let idM=modelo.id
            contaminantes.forEach(async element => {
                const contMod= await ContaminanteModelo.create({
                    contaminante_id: element,
                    modelo_id:idM
                });
            });
    
            return [true,'Modelo registrado con exito.'];
            
        } catch (error) {
            console.log(error)
        }
    }

    public async consulta({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const modelo=await Modelo.findOrFail(id);
            const relacion=await Database
            .from('contaminante_modelos')
            .select('contaminante_modelos.contaminante_id')
            .whereRaw('contaminante_modelos.modelo_id=? ',[id])


            return [modelo,relacion]

        } catch (error) {
            
            console.log(error);
        }
    }

    public async edit({request}:HttpContextContract){
        const id=request.input('id');
        const name=request.input('name');
        const description=request.input('description');
        let contaminantes= request.input('contaminantes');
        let aux: any[]=[];
        try {
            
            const modelo=await Modelo.findOrFail(id);
            modelo.name=name;
            modelo.description=description;
            
            await modelo.save()

            
            const relacion=await Database
            .from('contaminante_modelos')
            .select('contaminante_modelos.contaminante_id')
            .select('contaminante_modelos.id')
            .whereRaw('contaminante_modelos.modelo_id=? ',[id])

            relacion.forEach( async element => {
                aux.push(element.contaminante_id)
                if(!contaminantes.includes(element.contaminante_id)){
                    const mod=await ContaminanteModelo.findOrFail(element.id);
                    await mod.delete();
                }
            });

            contaminantes.forEach( async element => {
                if(!aux.includes(element)){
                    const contMod= await ContaminanteModelo.create({
                        contaminante_id: element,
                        modelo_id:id
                    });
                }
            });


            return [true,'Modelo actualizado con exito.'];

        } catch (error) {
            console.log(error)
        }


        
    }

     //Elimina un registro de Tipo
    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        try {

            await Database.from('contaminante_modelos')
            .whereRaw('contaminante_modelos.modelo_id=? ',[id]).delete()

            const modelo=await Modelo.findOrFail(id);
            await modelo.delete();
            return [true,'Modelo eliminado con exito.'];
        } catch (error) {
            console.log(error);
            return [false,error]
        }
    }

}
