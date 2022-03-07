import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Contaminante from 'App/Models/Contaminante'


export default class ContaminantesController {
    
    
    public async index(ctx:HttpContextContract){
        return await Contaminante.all();
    }
    
    public async store({request}:HttpContextContract){

        const newUserSchema = schema.create({
            nameC:schema.string({},[
                rules.required()
            ])
        })

        try {
            const payload = await request.validate({
              schema: newUserSchema,
              messages: {
                required: 'El campo {{ field }} es requerido para registrar el Contaminante.'
              }
            })

            const contaminante= await Contaminante.create({
                name: request.input('nameC')
            });
            
            return [true,'Contaminante registrado con exito.'];

        } catch (error) {
            console.log(error);
            return [false,error]
        }

    }

    public async consulta({request, response,session}:HttpContextContract){
        const id:number=request.param('id')
        try {
            const contaminante=await Database
            .from('contaminantes')
            .select('contaminantes.name as NomC')
            .select('contaminantes.id as idC')
            .whereRaw('contaminantes.id=? ',[id]);


            const banderas=await Database
            .from('banderas')
            .join('tipo_bs', (query) => {
                query
                .on('tipo_bs.id', '=', 'banderas.tipo_id')
            })
            .select('banderas.id as IdBan')
            .select('banderas.name as NomB')
            .select('banderas.description as Des')
            .select('banderas.lim_oms as LimOMS')
            .select('banderas.lim_nom as LimNOM')
            .select('tipo_bs.name as NomT')
            .whereRaw('banderas.contaminante_id=? ',[id]);

            return [true,contaminante,banderas];

        } catch (error) {
            //console.log(error)
            return [error,'error']
        }
    }

    public async edit({request, response,session}:HttpContextContract){
        const newUserSchema = schema.create({
            name:schema.string({},[
                rules.required()
            ])
        })

        try {
            const payload = await request.validate({
              schema: newUserSchema,
              messages: {
                required: 'El campo {{ field }} es requerido para editar el Contaminante.'
              }
            })

            const contaminante= await Contaminante.findOrFail(request.input('id'))
            contaminante.name=request.input('name');

            await contaminante.save();
            
            
            return [true,'Contaminante editado con exito.'];

        } catch (error) {
            console.log(error);
            return [false,error]
        }

    }

     //Elimina un registro de Contaminante
    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const contaminante=await Contaminante.findOrFail(id);
            

            await Database.from('banderas')
            .whereRaw('banderas.contaminante_id=? ',[id]).delete();
            
            await contaminante.delete();
            return [true,'Contaminante eliminado con exito.'];
        } catch (error) {
            console.log(error);
            return [false,error]
        }
    }
}
